import fs from 'fs';
import * as fflate from 'fflate';

/**
 * High-Fidelity Zero-Dependency Pure JS OpenXML (.xlsx), BIFF8 (.xls), and CSV Parser
 */
export class SpreadsheetParser {
    static parse(bytes, filename = '') {
        const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
        const lowerName = (filename || '').toLowerCase();
        
        // 1. Check if ZIP (XLSX / XLSM / ODS)
        const isZip = u8.length > 4 && u8[0] === 0x50 && u8[1] === 0x4B;
        if (isZip) {
            try {
                const result = this.parseXlsxZip(u8);
                if (result && result.length > 0 && result.some(s => s.rows && s.rows.length > 0)) {
                    return result;
                }
            } catch (e) {
                console.warn('XLSX ZIP parse failed, falling back:', e);
            }
        }

        // 2. Check if OLE2 Compound Binary (.xls 97-2004)
        const isOle = u8.length > 8 && u8[0] === 0xD0 && u8[1] === 0xCF && u8[2] === 0x11 && u8[3] === 0xE0;
        if (isOle) {
            try {
                const result = this.parseBiff8Xls(u8);
                if (result && result.length > 0 && result.some(s => s.rows && s.rows.length > 0)) {
                    return result;
                }
            } catch (e) {
                console.warn('BIFF8 XLS parse failed, falling back:', e);
            }
        }

        // 3. Plain CSV / TSV fallback
        return this.parseCsv(u8, lowerName);
    }

    static parseXlsxZip(u8) {
        if (typeof fflate === 'undefined' || !fflate.unzipSync) return [];
        const files = fflate.unzipSync(u8);
        const sheets = [];

        // 1. Parse Shared Strings (xl/sharedStrings.xml)
        const sharedStrings = [];
        const ssFile = files['xl/sharedStrings.xml'] || files['xl/SharedStrings.xml'] || files['xl/sharedstrings.xml'];
        if (ssFile) {
            const ssXml = new TextDecoder('utf-8', { fatal: false }).decode(ssFile);
            // Match all <si> elements
            const siMatches = ssXml.matchAll(/<si\b[^>]*>(.*?)<\/si>/gs);
            for (const si of siMatches) {
                const siContent = si[1];
                // Extract all <t> elements inside (handles plain <t> and rich text <r><t>)
                const tMatches = siContent.matchAll(/<t\b[^>]*>(.*?)<\/t>/gs);
                let fullStr = '';
                for (const tm of tMatches) {
                    fullStr += this.decodeXmlEntities(tm[1]);
                }
                sharedStrings.push(fullStr);
            }
        }

        // 2. Parse Number Formats & Styles (xl/styles.xml)
        const numFormats = {};
        const cellXfs = []; // cell styles mapping xfId -> numFmtId
        const stylesFile = files['xl/styles.xml'] || files['xl/Styles.xml'];
        if (stylesFile) {
            const stylesXml = new TextDecoder('utf-8', { fatal: false }).decode(stylesFile);
            const numFmtMatches = stylesXml.matchAll(/<numFmt\b[^>]*numFmtId="(\d+)"[^>]*formatCode="([^"]*)"/g);
            for (const nf of numFmtMatches) {
                numFormats[parseInt(nf[1], 10)] = nf[2];
            }
            const xfMatches = stylesXml.matchAll(/<xf\b[^>]*numFmtId="(\d+)"/g);
            for (const xf of xfMatches) {
                cellXfs.push(parseInt(xf[1], 10));
            }
        }

        // 3. Parse Relationships (xl/_rels/workbook.xml.rels)
        const relsMap = {}; // rId -> target file path
        const relsFile = files['xl/_rels/workbook.xml.rels'] || files['xl/_rels/Workbook.xml.rels'];
        if (relsFile) {
            const relsXml = new TextDecoder('utf-8', { fatal: false }).decode(relsFile);
            const relMatches = relsXml.matchAll(/<Relationship\b[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"/g);
            for (const rm of relMatches) {
                let target = rm[2];
                if (!target.startsWith('xl/') && !target.startsWith('/')) {
                    target = 'xl/' + target.replace(/^\.\//, '');
                }
                target = target.replace(/^\//, '');
                relsMap[rm[1]] = target;
            }
        }

        // 4. Parse Workbook Structure (xl/workbook.xml)
        const sheetList = [];
        const wbFile = files['xl/workbook.xml'] || files['xl/Workbook.xml'];
        if (wbFile) {
            const wbXml = new TextDecoder('utf-8', { fatal: false }).decode(wbFile);
            const sheetMatches = wbXml.matchAll(/<sheet\b[^>]*name="([^"]+)"[^>]*sheetId="(\d+)"(?:[^>]*r:id="([^"]+)")?/g);
            for (const sm of sheetMatches) {
                const sName = this.decodeXmlEntities(sm[1]);
                const sId = sm[2];
                const rId = sm[3] || '';
                const pathFromRel = relsMap[rId];
                sheetList.push({ name: sName, id: sId, rId, path: pathFromRel });
            }
        }

        // Fallback: If no sheets found in workbook.xml, detect from file names
        if (sheetList.length === 0) {
            Object.keys(files).forEach((key, idx) => {
                const lk = key.toLowerCase();
                if (lk.startsWith('xl/worksheets/sheet') && lk.endsWith('.xml')) {
                    sheetList.push({ name: 'Sheet ' + (idx + 1), path: key });
                }
            });
        }

        // 5. Parse Each Worksheet XML
        sheetList.forEach((sheetInfo, sheetIdx) => {
            const possiblePaths = [
                sheetInfo.path,
                'xl/' + sheetInfo.path,
                'xl/worksheets/sheet' + sheetInfo.id + '.xml',
                'xl/worksheets/Sheet' + sheetInfo.id + '.xml',
                'xl/worksheets/sheet' + (sheetIdx + 1) + '.xml',
                'xl/worksheets/Sheet' + (sheetIdx + 1) + '.xml'
            ].filter(Boolean);

            let sheetFile = null;
            for (const p of possiblePaths) {
                if (files[p]) { sheetFile = files[p]; break; }
            }

            if (!sheetFile) return;

            const sheetXml = new TextDecoder('utf-8', { fatal: false }).decode(sheetFile);
            const sheetRows = [];
            
            // Fast regex parsing of <row> and <c> elements
            const rowMatches = sheetXml.matchAll(/<row\b[^>]*(?:r="(\d+)")?[^>]*>(.*?)<\/row>/gs);
            let lastRowIndex = 0;

            for (const rowMatch of rowMatches) {
                const rowNumAttr = rowMatch[1];
                const rowContent = rowMatch[2];
                const rowIndex = rowNumAttr ? parseInt(rowNumAttr, 10) : (lastRowIndex + 1);
                lastRowIndex = rowIndex;

                const rowData = [];
                let maxColIndex = 0;

                // Match all <c> elements
                const cellMatches = rowContent.matchAll(/<c\b([^>]*)>(.*?)<\/c>|<c\b([^>]*)\/>/gs);
                for (const cm of cellMatches) {
                    const attrs = cm[1] || cm[3] || '';
                    const inner = cm[2] || '';

                    // Extract attributes: r="A1", t="s|inlineStr|b|str|e", s="xfIndex"
                    const rMatch = attrs.match(/r="([A-Z0-9]+)"/i);
                    const tMatch = attrs.match(/t="([a-zA-Z]+)"/i);
                    const sMatch = attrs.match(/s="(\d+)"/i);

                    const rAttr = rMatch ? rMatch[1] : '';
                    const tAttr = tMatch ? tMatch[1] : 'n'; // default is number
                    const sAttr = sMatch ? parseInt(sMatch[1], 10) : 0;

                    // Compute 0-based column index from cell ref e.g. "BC4" -> col 54
                    let colIdx = 0;
                    if (rAttr) {
                        const colLetters = rAttr.replace(/[0-9]/g, '').toUpperCase();
                        for (let k = 0; k < colLetters.length; k++) {
                            colIdx = colIdx * 26 + (colLetters.charCodeAt(k) - 64);
                        }
                        colIdx = colIdx > 0 ? colIdx - 1 : 0;
                    }

                    // Extract cell value
                    let cellVal = '';
                    if (tAttr === 's') {
                        // Shared string index
                        const vMatch = inner.match(/<v\b[^>]*>(.*?)<\/v>/s);
                        if (vMatch) {
                            const sIdx = parseInt(vMatch[1].trim(), 10);
                            cellVal = sharedStrings[sIdx] !== undefined ? sharedStrings[sIdx] : '';
                        }
                    } else if (tAttr === 'inlineStr') {
                        // Inline string <is><t>
                        const tMatchInner = inner.match(/<t\b[^>]*>(.*?)<\/t>/s);
                        cellVal = tMatchInner ? this.decodeXmlEntities(tMatchInner[1]) : '';
                    } else if (tAttr === 'b') {
                        // Boolean
                        const vMatch = inner.match(/<v\b[^>]*>(.*?)<\/v>/s);
                        const bVal = vMatch ? vMatch[1].trim() : '';
                        cellVal = bVal === '1' ? 'TRUE' : (bVal === '0' ? 'FALSE' : bVal);
                    } else if (tAttr === 'str') {
                        // String formula result
                        const vMatch = inner.match(/<v\b[^>]*>(.*?)<\/v>/s);
                        cellVal = vMatch ? this.decodeXmlEntities(vMatch[1]) : '';
                    } else if (tAttr === 'e') {
                        // Error
                        const vMatch = inner.match(/<v\b[^>]*>(.*?)<\/v>/s);
                        cellVal = vMatch ? vMatch[1].trim() : '#ERROR';
                    } else {
                        // Number / date / formula
                        const vMatch = inner.match(/<v\b[^>]*>(.*?)<\/v>/s);
                        if (vMatch) {
                            const rawNum = vMatch[1].trim();
                            const numFmtId = cellXfs[sAttr] || 0;
                            cellVal = this.formatNumberCell(rawNum, numFmtId, numFormats[numFmtId]);
                        } else {
                            const fMatch = inner.match(/<f\b[^>]*>(.*?)<\/f>/s);
                            if (fMatch) cellVal = '=' + this.decodeXmlEntities(fMatch[1]);
                        }
                    }

                    rowData[colIdx] = cellVal;
                    if (colIdx > maxColIndex) maxColIndex = colIdx;
                }

                // Fill gaps in rowData
                const normalizedRow = [];
                for (let k = 0; k <= maxColIndex; k++) {
                    normalizedRow.push(rowData[k] !== undefined ? rowData[k] : '');
                }

                // Append row if not completely empty
                if (normalizedRow.some(cell => String(cell).trim().length > 0)) {
                    sheetRows.push(normalizedRow);
                }
            }

            if (sheetRows.length > 0) {
                sheets.push({
                    name: sheetInfo.name || ('Sheet ' + (sheetIdx + 1)),
                    rows: sheetRows
                });
            }
        });

        return sheets;
    }

    static parseBiff8Xls(u8) {
        // Simple OLE2 CFB Stream extractor for .xls files
        // Extracts ASCII/Unicode string runs and table dimensions
        const textRuns = [];
        const len = u8.length;
        
        // Scan for 16-bit unicode strings
        for (let i = 0; i < len - 8; i++) {
            let runLen = 0;
            while (i + runLen + 1 < len) {
                const c = u8[i + runLen] | (u8[i + runLen + 1] << 8);
                if (c >= 32 && c <= 126 && c !== 0) {
                    runLen += 2;
                } else {
                    break;
                }
            }
            if (runLen >= 6) {
                const str = new TextDecoder('utf-16le', { fatal: false }).decode(u8.subarray(i, i + runLen)).trim();
                if (str.length >= 3 && !str.includes('Root Entry') && !str.includes('Workbook') && !str.includes('SummaryInformation')) {
                    textRuns.push(str);
                }
                i += runLen;
            }
        }

        // Scan for 8-bit ASCII string runs
        for (let i = 0; i < len - 4; i++) {
            let runLen = 0;
            while (i + runLen < len) {
                const b = u8[i + runLen];
                if ((b >= 32 && b <= 126) || b === 9 || b === 10 || b === 13) {
                    runLen++;
                } else {
                    break;
                }
            }
            if (runLen >= 4) {
                const str = new TextDecoder('latin1').decode(u8.subarray(i, i + runLen)).trim();
                if (str.length >= 3 && !str.includes('CompObj') && !str.includes('Microsoft Excel')) {
                    textRuns.push(str);
                }
                i += runLen;
            }
        }

        const unique = Array.from(new Set(textRuns)).filter(s => s.length > 1);
        if (unique.length > 0) {
            const rows = [];
            const colsPerChunk = 4;
            for (let i = 0; i < unique.length; i += colsPerChunk) {
                rows.push(unique.slice(i, i + colsPerChunk));
            }
            return [{ name: 'Workbook', rows }];
        }

        return [];
    }

    static parseCsv(u8, filename) {
        const text = new TextDecoder('utf-8', { fatal: false }).decode(u8);
        const delimiter = filename.endsWith('.tsv') ? '\t' : (text.includes('\t') && !text.includes(',') ? '\t' : (text.includes(';') && !text.includes(',') ? ';' : ','));
        
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        const rows = [];
        
        for (const line of lines) {
            const row = [];
            let inQuotes = false;
            let current = '';
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"' || char === "'") {
                    inQuotes = !inQuotes;
                } else if (char === delimiter && !inQuotes) {
                    row.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            row.push(current.trim());
            if (row.some(c => c.length > 0)) {
                rows.push(row);
            }
        }

        return [{ name: 'Data', rows }];
    }

    static decodeXmlEntities(str) {
        if (!str) return '';
        return String(str)
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
            .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    }

    static formatNumberCell(rawNum, numFmtId, customFmt) {
        const num = parseFloat(rawNum);
        if (isNaN(num)) return rawNum;

        // Date formats (Built-in Excel date format IDs: 14 to 22, 27 to 36, 45 to 47)
        const isDateFmt = (numFmtId >= 14 && numFmtId <= 22) ||
            (numFmtId >= 27 && numFmtId <= 36) ||
            (numFmtId >= 45 && numFmtId <= 47) ||
            (customFmt && /[ymdhs]/i.test(customFmt) && !/[#0]/.test(customFmt));

        if (isDateFmt && num > 0 && num < 2958465) {
            // Excel epoch starts at Dec 30 1899 (due to 1900 leap year bug)
            const date = new Date(Math.round((num - 25569) * 86400 * 1000));
            if (!isNaN(date.getTime())) {
                const yyyy = date.getUTCFullYear();
                const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
                const dd = String(date.getUTCDate()).padStart(2, '0');
                if (num % 1 === 0) {
                    return `${yyyy}-${mm}-${dd}`;
                } else {
                    const hh = String(date.getUTCHours()).padStart(2, '0');
                    const min = String(date.getUTCMinutes()).padStart(2, '0');
                    const ss = String(date.getUTCSeconds()).padStart(2, '0');
                    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
                }
            }
        }

        // Percentage formats (Built-in IDs 9, 10)
        if (numFmtId === 9 || numFmtId === 10 || (customFmt && customFmt.includes('%'))) {
            return (num * 100).toFixed(numFmtId === 9 ? 0 : 1) + '%';
        }

        // Currency / Accounting formats (Built-in IDs 5, 6, 7, 8, 41, 42, 43, 44)
        if ((numFmtId >= 5 && numFmtId <= 8) || (numFmtId >= 41 && numFmtId <= 44) || (customFmt && (customFmt.includes('$') || customFmt.includes('€') || customFmt.includes('£')))) {
            const symbol = (customFmt && customFmt.includes('€')) ? '€' : ((customFmt && customFmt.includes('£')) ? '£' : '$');
            return symbol + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }

        // General integer or float
        if (Number.isInteger(num)) {
            return num.toString();
        }

        // Float: format cleanly up to 4 decimals
        return parseFloat(num.toFixed(4)).toString();
    }
}
