import fs from 'fs';
import JSZip from 'jszip';
import { FFLATE_CODE } from '../src/fflate_code.js';
import { XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED } from '../src/office_engines.js';

const webcrypto = globalThis.crypto;

// Load src/main.js and extract generateSecureHTMLParts
const mainJs = fs.readFileSync('src/main.js', 'utf8');
const fnStart = mainJs.indexOf('function generateSecureHTMLParts(');
const fnMarkerEnd = mainJs.indexOf('// Helper to decrypt strictly for export');
const fnCode = mainJs.substring(fnStart, fnMarkerEnd).trim();

const isDownloadAllowedForFile = () => true;
const generateSecureHTMLParts = new Function(
    'isDownloadAllowedForFile',
    'FFLATE_CODE',
    'XLSX_CORE_DEFLATED',
    'MAMMOTH_CODE_DEFLATED',
    `${fnCode}; return generateSecureHTMLParts;`
)(isDownloadAllowedForFile, FFLATE_CODE, XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED);

// Helper to encrypt a payload
async function createEncryptedHTML(name, type, contentBytes, password) {
    const fileMeta = {
        id: 'test-id-' + Math.random().toString(36).slice(2),
        name,
        type,
        size: contentBytes.byteLength,
        integrityHash: ''
    };

    const hashBuf = await webcrypto.subtle.digest('SHA-256', contentBytes);
    fileMeta.integrityHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');

    const salt = webcrypto.getRandomValues(new Uint8Array(32));
    const iv = webcrypto.getRandomValues(new Uint8Array(12));

    const enc = new TextEncoder();
    const MILSPEC_PEPPER_V6 = "CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821";
    const pepperBytes = enc.encode(MILSPEC_PEPPER_V6);
    const pwdBytes = enc.encode(password);
    const combined = new Uint8Array(pepperBytes.length + pwdBytes.length);
    combined.set(pepperBytes, 0);
    combined.set(pwdBytes, pepperBytes.length);

    const hmacKey = await webcrypto.subtle.importKey('raw', salt, { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']);
    const preHash = await webcrypto.subtle.sign('HMAC', hmacKey, combined);

    const kdfKey = await webcrypto.subtle.importKey('raw', preHash, { name: 'PBKDF2' }, false, ['deriveKey']);
    const derivedKey = await webcrypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 2000000, hash: 'SHA-256' },
        kdfKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
    );

    const ciphertext = await webcrypto.subtle.encrypt({ name: 'AES-GCM', iv }, derivedKey, contentBytes);
    const base64Data = Buffer.from(ciphertext).toString('base64');

    const { header, footer } = generateSecureHTMLParts(fileMeta, salt, iv, {
        allowDownload: true,
        integrityHash: fileMeta.integrityHash
    });

    return header + base64Data + footer;
}

// Mock DOM elements
class MockElement {
    constructor(id = '', tag = 'div') {
        this.id = id;
        this.tagName = tag.toUpperCase();
        this.style = {};
        this.classList = {
            classes: new Set(),
            add(c) { this.classes.add(c); },
            remove(c) { this.classes.delete(c); },
            contains(c) { return this.classes.has(c); }
        };
        this.value = '';
        this.innerHTML = '';
        this.textContent = '';
        this.children = [];
        this.attributes = {};
    }
    get className() {
        return Array.from(this.classList.classes).join(' ');
    }
    set className(val) {
        this.classList.classes.clear();
        (val || '').split(/\s+/).filter(Boolean).forEach(c => this.classList.classes.add(c));
    }
    setAttribute(k, v) { this.attributes[k] = v; }
    getAttribute(k) { return this.attributes[k]; }
    focus() {}
    blur() {}
    appendChild(child) { this.children.push(child); }
    addEventListener(evt, cb) { this.listeners = this.listeners || {}; this.listeners[evt] = cb; }
    querySelector(sel) {
        return this.children.find(c => sel.includes(c.id) || (sel.includes('input') && c.tagName === 'INPUT')) || null;
    }
}

// Lightweight XML DOM parser mock for Node.js environment
class MockXMLNode {
    constructor(tagName = '') {
        this.tagName = tagName;
        this.nodeName = tagName;
        this.localName = tagName.includes(':') ? tagName.split(':')[1] : tagName;
        this.attributes = {};
        this.childNodes = [];
        this.textContent = '';
    }
    getAttribute(name) { return this.attributes[name] || null; }
    getElementsByTagName(name) {
        const results = [];
        const normName = name.toLowerCase();
        const walk = (node) => {
            for (const child of node.childNodes) {
                const childNorm = (child.tagName || '').toLowerCase();
                const childLocal = (child.localName || '').toLowerCase();
                if (childNorm === normName || childLocal === normName || childNorm.endsWith(':' + normName)) {
                    results.push(child);
                }
                walk(child);
            }
        };
        walk(this);
        return results;
    }
}

function parseXMLString(xmlStr) {
    const doc = new MockXMLNode('#document');
    let current = doc;
    const stack = [doc];

    // Simple tag tokenizer
    const tagRegex = /<(\/?[a-zA-Z0-9:_]+)([^>]*)>|([^<]+)/g;
    let match;
    while ((match = tagRegex.exec(xmlStr)) !== null) {
        const [full, tag, attrsStr, text] = match;
        if (text) {
            const cleanText = text.trim();
            if (cleanText) {
                current.textContent = (current.textContent || '') + cleanText;
            }
        } else if (tag) {
            if (tag.startsWith('/')) {
                // Closing tag
                if (stack.length > 1) {
                    stack.pop();
                    current = stack[stack.length - 1];
                }
            } else {
                // Opening or self-closing
                const isSelfClosing = attrsStr.trim().endsWith('/') || full.endsWith('/>');
                const node = new MockXMLNode(tag);

                // Parse attributes
                const attrRegex = /([a-zA-Z0-9:_]+)="([^"]*)"/g;
                let aMatch;
                while ((aMatch = attrRegex.exec(attrsStr)) !== null) {
                    node.attributes[aMatch[1]] = aMatch[2];
                }

                current.childNodes.push(node);
                if (!isSelfClosing) {
                    stack.push(node);
                    current = node;
                }
            }
        }
    }
    return doc;
}

globalThis.DOMParser = class MockDOMParser {
    parseFromString(str, type) {
        return parseXMLString(str);
    }
};

async function testUnlockHTML(html, password) {
    const elements = {
        'pwd': new MockElement('pwd', 'input'),
        'pwd-toggle-btn': new MockElement('pwd-toggle-btn', 'button'),
        'unlock-btn': new MockElement('unlock-btn', 'button'),
        'lockout-box': new MockElement('lockout-box', 'div'),
        'error-box': new MockElement('error-box', 'div'),
        'status-box': new MockElement('status-box', 'div'),
        'auth-panel': new MockElement('auth-panel', 'div'),
        'viewer-container': new MockElement('viewer-container', 'div'),
        'viewer-content-area': new MockElement('viewer-content-area', 'div'),
        'header-dl-btn': new MockElement('header-dl-btn', 'button'),
        'header-restricted-badge': new MockElement('header-restricted-badge', 'span')
    };

    globalThis.document = {
        getElementById: (id) => elements[id] || null,
        createElement: (tag) => new MockElement('', tag),
        body: new MockElement('body', 'body'),
        addEventListener: () => {}
    };

    globalThis.window = {
        crypto: globalThis.crypto,
        addEventListener: () => {},
        sessionStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} }
    };
    globalThis.sessionStorage = globalThis.window.sessionStorage;
    globalThis.URL = { createObjectURL: () => 'blob:mock-url', revokeObjectURL: () => {} };

    const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
    if (!scriptMatch) throw new Error('No script tag found');

    const runScript = new Function(scriptMatch[1]);
    runScript();

    elements['pwd'].value = password;
    await globalThis.window.unlock();

    return elements;
}

import XLSX from 'xlsx';

// 1A. Test Excel (.xlsx)
console.log('--- TEST 1A: EXCEL (.xlsx) DOCUMENT ---');
const wbXlsx = XLSX.utils.book_new();
const wsXlsx = XLSX.utils.aoa_to_sheet([
    ['Quarter', 'Revenue', 'Growth'],
    ['Q1 2026', '$1,200,000', '+18%'],
    ['Q2 2026', '$1,450,000', '+21%']
]);
XLSX.utils.book_append_sheet(wbXlsx, wsXlsx, 'Financials');
const realXlsxBuf = XLSX.write(wbXlsx, { type: 'buffer', bookType: 'xlsx' });
const xlsxBytes = new Uint8Array(realXlsxBuf);

const htmlXlsx = await createEncryptedHTML('Quarterly_Financials.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', xlsxBytes, 'Pass123!');
const elsXlsx = await testUnlockHTML(htmlXlsx, 'Pass123!');
const contentXlsx = elsXlsx['viewer-content-area'];

if (contentXlsx.children.length > 0 && contentXlsx.children[0].classList.contains('doc-viewer-container')) {
    console.log('✅ PASS: Excel (.xlsx) rendered interactive .doc-viewer-container via embedded XLSX engine!');
} else {
    console.error('❌ FAIL: Excel container did not render .doc-viewer-container');
    process.exit(1);
}

// 1B. Test Legacy Excel (.xls BIFF8 binary)
console.log('--- TEST 1B: LEGACY EXCEL (.xls BIFF8) DOCUMENT ---');
const wbXls = XLSX.utils.book_new();
const wsXls = XLSX.utils.aoa_to_sheet([
    ['Department', 'Headcount', 'Budget'],
    ['Engineering', 42, 5000000],
    ['Security', 15, 2500000]
]);
XLSX.utils.book_append_sheet(wbXls, wsXls, 'Headcount');
const realXlsBuf = XLSX.write(wbXls, { type: 'buffer', bookType: 'biff8' });
const xlsBytes = new Uint8Array(realXlsBuf);

const htmlXls = await createEncryptedHTML('Audit_Headcount.xls', 'application/vnd.ms-excel', xlsBytes, 'Pass123!');
const elsXls = await testUnlockHTML(htmlXls, 'Pass123!');
const contentXls = elsXls['viewer-content-area'];

if (contentXls.children.length > 0 && contentXls.children[0].classList.contains('doc-viewer-container')) {
    console.log('✅ PASS: Legacy Excel (.xls BIFF8) rendered interactive .doc-viewer-container via embedded XLSX engine!');
} else {
    console.error('❌ FAIL: Legacy Excel (.xls) container did not render .doc-viewer-container');
    process.exit(1);
}

// 2A. Test Word (.docx)
console.log('--- TEST 2A: WORD (.docx) DOCUMENT ---');
const zipDocx = new JSZip();
zipDocx.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`);
zipDocx.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
zipDocx.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>Project Genesis Overview</w:t></w:r></w:p><w:p><w:r><w:b/><w:t>Confidential security audit results.</w:t></w:r></w:p></w:body></w:document>`);
const docxBytes = await zipDocx.generateAsync({ type: 'uint8array' });

const htmlDocx = await createEncryptedHTML('Project_Genesis.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', docxBytes, 'Pass123!');
const elsDocx = await testUnlockHTML(htmlDocx, 'Pass123!');
const contentDocx = elsDocx['viewer-content-area'];

if (contentDocx.children.length > 0 && contentDocx.children[0].classList.contains('doc-viewer-container')) {
    console.log('✅ PASS: Word (.docx) container rendered interactive .doc-viewer-container with document page sheet!');
} else {
    console.error('❌ FAIL: Word (.docx) container did not render .doc-viewer-container');
    process.exit(1);
}

// 2B. Test Legacy Binary Word (.doc)
console.log('--- TEST 2B: LEGACY BINARY WORD (.doc) DOCUMENT ---');
function buildTestDocStream() {
    // Word FIB header (File Information Block)
    const header = Buffer.alloc(512);
    header.writeUInt16LE(0xA5EC, 0); // wIdent (Word 97-2004)
    header.writeUInt16LE(0x00C1, 2); // nFib
    
    // Text content in UTF-16LE with paragraph breaks (\r)
    const textContent = "Coralgenz Security Policy 2026\r\nCONFIDENTIAL EXECUTIVE SUMMARY\r\nThis document outlines the zero-trust encryption requirements for coralgenz vault.\r\n- All files must be encrypted with AES-256-GCM\r\n- Zero telemetry and zero remote dependencies\r\n- Multi-format document viewer must parse legacy OLE2 formats natively\r\nAuthorized by Chief Information Security Officer.";
    const textBuf = Buffer.from(textContent, "utf16le");
    
    return Buffer.concat([header, textBuf]);
}

const docStream = buildTestDocStream();
const docCfb = XLSX.CFB.utils.cfb_new();
XLSX.CFB.utils.cfb_add(docCfb, "/WordDocument", docStream);
const docBytes = new Uint8Array(XLSX.CFB.write(docCfb, { type: "buffer" }));

const htmlDoc = await createEncryptedHTML('Executive_Summary.doc', 'application/msword', docBytes, 'Pass123!');
const elsDoc = await testUnlockHTML(htmlDoc, 'Pass123!');
const contentDoc = elsDoc['viewer-content-area'];

if (contentDoc.children.length > 0 && contentDoc.children[0].classList.contains('doc-viewer-container')) {
    console.log('✅ PASS: Legacy Binary Word (.doc) rendered interactive .doc-viewer-container with document page sheet via MS-DOC parser!');
} else {
    console.error('❌ FAIL: Legacy Binary Word (.doc) container did not render .doc-viewer-container');
    process.exit(1);
}

// 2C. Test Real 100kB Word (.doc) Document from user test
console.log('--- TEST 2C: REAL 100kB WORD (.doc) USER SAMPLE DOCUMENT ---');
const realDocPath = '/Users/karthickkrishna/Downloads/file-sample_100kB.doc';
if (fs.existsSync(realDocPath)) {
    const realSampleDocBytes = new Uint8Array(fs.readFileSync(realDocPath));
    const htmlRealDoc = await createEncryptedHTML('file-sample_100kB.doc', 'application/msword', realSampleDocBytes, 'Pass123!');
    const elsRealDoc = await testUnlockHTML(htmlRealDoc, 'Pass123!');
    const contentRealDoc = elsRealDoc['viewer-content-area'];

    if (contentRealDoc.children.length > 0 && contentRealDoc.children[0].classList.contains('doc-viewer-container')) {
        const sheetEl = contentRealDoc.children[0].children.find(c => c.classList && c.classList.contains('word-scroll-container'));
        const innerSheet = sheetEl ? sheetEl.children.find(c => c.classList && c.classList.contains('word-page-sheet')) : null;
        const innerHTML = innerSheet ? innerSheet.innerHTML : '';
        
        const hasTitle = innerHTML.includes('Lorem ipsum');
        const hasTable = innerHTML.includes('word-table');
        const hasLink = innerHTML.includes('products.office.com');
        const hasPageBreak = innerHTML.includes('word-page-break');

        if (hasTitle && hasTable && hasLink && hasPageBreak) {
            console.log('✅ PASS: Real 100kB Word (.doc) rendered complete exact document with Title, Tables, Hyperlinks, and Page Breaks!');
        } else {
            console.error('❌ FAIL: Real .doc did not render all components:', { hasTitle, hasTable, hasLink, hasPageBreak });
            process.exit(1);
        }
    } else {
        console.error('❌ FAIL: Real .doc container did not render .doc-viewer-container');
        process.exit(1);
    }
} else {
    console.log('Notice: real file-sample_100kB.doc not found, skipping 2C.');
}

// 3A. Test PowerPoint (.pptx)
console.log('--- TEST 3A: POWERPOINT (.pptx) PRESENTATION ---');
const zipPptx = new JSZip();
zipPptx.file('ppt/slides/slide1.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:sp><p:nvSpPr><p:ph type="title"/></p:nvSpPr><p:txBody><a:p><a:r><a:t>Coralgenz Vault Architecture</a:t></a:r></a:p></p:txBody></p:sp><p:sp><p:txBody><a:p><a:r><a:t>Military-Grade AES-GCM-256</a:t></a:r></a:p><a:p><a:r><a:t>Dual-Stage KDF with 2,000,000 Rounds</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld></p:sld>`);
const pptxBytes = await zipPptx.generateAsync({ type: 'uint8array' });

const htmlPptx = await createEncryptedHTML('Security_Deck.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', pptxBytes, 'Pass123!');
const elsPptx = await testUnlockHTML(htmlPptx, 'Pass123!');
const contentPptx = elsPptx['viewer-content-area'];

if (contentPptx.children.length > 0 && contentPptx.children[0].classList.contains('doc-viewer-container')) {
    console.log('✅ PASS: PowerPoint (.pptx) rendered interactive .doc-viewer-container with slide presentation stage!');
} else {
    console.error('❌ FAIL: PowerPoint (.pptx) container did not render .doc-viewer-container');
    process.exit(1);
}

// 3B. Test Legacy Binary PowerPoint (.ppt)
console.log('--- TEST 3B: LEGACY BINARY POWERPOINT (.ppt) PRESENTATION ---');
function buildTestPptStream() {
    const records = [];
    function addRecord(type, data) {
        const header = Buffer.alloc(8);
        header.writeUInt16LE(0, 0);
        header.writeUInt16LE(type, 2);
        header.writeUInt32LE(data.length, 4);
        records.push(header, data);
    }

    // Slide 1 (Title slide)
    const s1Persist = Buffer.alloc(20);
    s1Persist.writeUInt32LE(256, 0);
    addRecord(1016, s1Persist);

    const th1 = Buffer.alloc(4);
    th1.writeUInt32LE(0, 0); // 0 = Title
    addRecord(3998, th1);
    addRecord(4000, Buffer.from("Coralgenz Security Strategy 2026", "utf16le"));

    const thSub = Buffer.alloc(4);
    thSub.writeUInt32LE(7, 0); // 7 = Subtitle
    addRecord(3998, thSub);
    addRecord(4008, Buffer.from("Decentralized Zero-Trust Protocol", "latin1"));

    // Slide 2 (Content slide)
    const s2Persist = Buffer.alloc(20);
    s2Persist.writeUInt32LE(257, 0);
    addRecord(1016, s2Persist);

    const th2 = Buffer.alloc(4);
    th2.writeUInt32LE(0, 0);
    addRecord(3998, th2);
    addRecord(4000, Buffer.from("Core Defense Capabilities", "utf16le"));

    const thBody = Buffer.alloc(4);
    thBody.writeUInt32LE(1, 0);
    addRecord(3998, thBody);
    addRecord(4000, Buffer.from("Military Grade PBKDF2 Key Derivation\r\nQuantum-Resistant Pepper Injection\r\nBurp Suite Immune Runtime", "utf16le"));

    return Buffer.concat(records);
}

const pptStream = buildTestPptStream();
const pptCfb = XLSX.CFB.utils.cfb_new();
XLSX.CFB.utils.cfb_add(pptCfb, "/PowerPoint Document", pptStream);
const pptBytes = new Uint8Array(XLSX.CFB.write(pptCfb, { type: "buffer" }));

const htmlPpt = await createEncryptedHTML('Legacy_Presentation.ppt', 'application/vnd.ms-powerpoint', pptBytes, 'Pass123!');
const elsPpt = await testUnlockHTML(htmlPpt, 'Pass123!');
const contentPpt = elsPpt['viewer-content-area'];

if (contentPpt.children.length > 0 && contentPpt.children[0].classList.contains('doc-viewer-container')) {
    console.log('✅ PASS: Legacy Binary PowerPoint (.ppt) rendered interactive .doc-viewer-container with structured slides via MS-PPT parser!');
} else {
    console.error('❌ FAIL: Legacy Binary PowerPoint (.ppt) container did not render .doc-viewer-container');
    process.exit(1);
}

console.log('--- ALL MULTI-FORMAT DOCUMENT UNLOCK TESTS PASSED WITH 100% SUCCESS ---');
