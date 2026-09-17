import fs from 'fs';
import * as fflate from 'fflate';

const fileBytes = fs.readFileSync('scratch/sample_docs/Quarterly_Report.xlsx');
const bytes = new Uint8Array(fileBytes);
const name = 'Quarterly_Report.xlsx';

let sheets = [];

// Step 2 OpenXML parsing:
const isZip = bytes.length > 4 && bytes[0] === 0x50 && bytes[1] === 0x4B;
console.log('isZip:', isZip);

if (isZip && fflate && fflate.unzipSync) {
    try {
        const files = fflate.unzipSync(bytes);
        console.log('Unzipped files:', Object.keys(files));
        const sharedStrings = [];
        const ssFile = files['xl/sharedStrings.xml'] || files['xl/SharedStrings.xml'];
        if (ssFile) {
            console.log('sharedStrings.xml found');
        } else {
            console.log('sharedStrings.xml NOT found in this XLSX');
        }

        const wbFile = files['xl/workbook.xml'] || files['xl/Workbook.xml'];
        const sheetMeta = [];
        if (wbFile) {
            const wbXml = (new TextDecoder()).decode(wbFile);
            console.log('workbook.xml:', wbXml);
            // In browser DOMParser:
            // But let's check regex or parser
            const sheetMatches = wbXml.matchAll(/<sheet[^>]*name="([^"]+)"[^>]*sheetId="([^"]+)"/g);
            for (const m of sheetMatches) {
                sheetMeta.push({ name: m[1], id: m[2] });
            }
        }
        console.log('sheetMeta:', sheetMeta);

        sheetMeta.forEach((sm, smIdx) => {
            const possiblePaths = [
                sm.path,
                'xl/worksheets/sheet' + sm.id + '.xml',
                'xl/worksheets/sheet' + (smIdx + 1) + '.xml',
                'xl/worksheets/Sheet' + (smIdx + 1) + '.xml'
            ].filter(Boolean);

            let sheetFile = null;
            for (let p of possiblePaths) {
                if (files[p]) { sheetFile = files[p]; break; }
            }

            if (sheetFile) {
                const sheetXml = (new TextDecoder()).decode(sheetFile);
                console.log(`\n--- Sheet ${sm.name} (length: ${sheetXml.length}) ---`);
                console.log(sheetXml.substring(0, 500));
            }
        });
    } catch (e) {
        console.error('Error:', e);
    }
}
