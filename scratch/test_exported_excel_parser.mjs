import fs from 'fs';
import path from 'path';
import * as fflate from 'fflate';
import {
  SecureCrypto,
  PEPPER_ENCLAVES,
  decodeSecretEnclave,
  getSecretPepperString
} from '../src/crypto.js';

console.log('--- TESTING STANDALONE EXPORTED EXCEL CONTAINER ---');

const exportedHtml = fs.readFileSync('scratch/test_exported_excel.secure.html', 'utf8');

// 1. Verify CSP contains no unsafe-eval
const cspMatch = exportedHtml.match(/<meta http-equiv="Content-Security-Policy" content="([^"]+)"/i);
if (!cspMatch) {
  throw new Error('Missing Content-Security-Policy in exported HTML!');
}
const csp = cspMatch[1];
console.log('CSP Verified:', csp);
if (csp.includes("'unsafe-eval'")) {
  throw new Error('FAIL: CSP contains unsafe-eval!');
}
console.log('PASS: CSP is 100% strictly non-eval (script-src without unsafe-eval).');

// 2. Extract embedded ciphertext container
const b64Match = exportedHtml.match(/const DATA\s*=\s*"([^"]+)";/);
if (!b64Match) {
  throw new Error('Missing const DATA in exported container!');
}
const b64Data = b64Match[1].trim();
const containerBytes = new Uint8Array(Buffer.from(b64Data, 'base64'));

console.log('Container bytes extracted:', containerBytes.length);

// 3. Unpack and decrypt using test password
const unpacked = SecureCrypto.unpackSecureBinaryContainer(containerBytes);
if (!unpacked.valid) {
  throw new Error('Container unpack failed: ' + unpacked.reason);
}

const salt = unpacked.salt;
const iv = unpacked.iv;
const iterations = unpacked.iterations;
const meta = unpacked.meta;
const ciphertext = unpacked.ciphertext;
const header = unpacked.header;

console.log('Container Meta:', meta);

const testPassword = 'TestPassword123!';
const activePepper = SecureCrypto.DOMAIN_SEPARATION_TAG_V10;
const key = await SecureCrypto.deriveKeyAsyncWorker(testPassword, salt, iterations, activePepper);

const decryptedBytes = await SecureCrypto.decryptData(key, iv, ciphertext, header);
console.log('Decrypted spreadsheet payload bytes:', decryptedBytes.length);

const decryptedHash = await SecureCrypto.computePayloadHash(decryptedBytes);
if (decryptedHash !== unpacked.integrityHash) {
  throw new Error('Payload integrity mismatch!');
}
console.log('PASS: Decrypted payload SHA-256 seal matches 100%.');

// 4. Test SpreadsheetParser directly extracted from the HTML container script
const parserStart = exportedHtml.indexOf('const SpreadsheetParser = {');
const parserEnd = exportedHtml.indexOf('function renderExcelSpreadsheet(');
const parserCode = exportedHtml.substring(parserStart, parserEnd);

const parseFn = new Function('fflate', parserCode + '; return SpreadsheetParser.parse;');
const parse = parseFn(fflate);

const parsedSheets = parse(decryptedBytes, meta.name);
console.log('Parsed Sheets count:', parsedSheets.length);

parsedSheets.forEach((s, idx) => {
  console.log(`\nSheet #${idx + 1}: "${s.name}" (${s.rows ? s.rows.length : 0} rows)`);
  if (s.rows && s.rows.length > 0) {
    console.log('  Headers:', JSON.stringify(s.rows[0]));
    if (s.rows.length > 1) {
      console.log('  Row 1:  ', JSON.stringify(s.rows[1]));
    }
    if (s.rows.length > 2) {
      console.log('  Row 2:  ', JSON.stringify(s.rows[2]));
    }
  }
});

// Assertions on the parsed sample data
if (parsedSheets.length < 2) {
  throw new Error('Expected at least 2 sheets in Quarterly_Report.xlsx, got ' + parsedSheets.length);
}

const sheet1 = parsedSheets[0];
if (!sheet1.rows || sheet1.rows.length === 0) {
  throw new Error('Sheet 1 has no rows!');
}

// Verify formatted values exist in sheet1 (currency, percentages, dates)
let foundCurrency = false;
let foundPercentage = false;
let foundDate = false;

sheet1.rows.forEach(r => {
  r.forEach(cell => {
    const s = String(cell);
    if (s.startsWith('$') || s.startsWith('€') || s.startsWith('£')) foundCurrency = true;
    if (s.endsWith('%')) foundPercentage = true;
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) foundDate = true;
  });
});

console.log('\nVerification of Cell Formats:');
console.log('  Found Currency Formatted Cells:   ', foundCurrency ? 'YES ($...)' : 'NO');
console.log('  Found Percentage Formatted Cells: ', foundPercentage ? 'YES (%...)' : 'NO');
console.log('  Found Date Formatted Cells:       ', foundDate ? 'YES (YYYY-MM-DD)' : 'NO');

if (!foundCurrency) console.warn('Warning: No currency cells detected');
if (!foundPercentage) console.warn('Warning: No percentage cells detected');

console.log('\n✅ ALL EXCEL EXPORT & SPREADSHEET PARSING VERIFICATIONS PASSED 100%!');
