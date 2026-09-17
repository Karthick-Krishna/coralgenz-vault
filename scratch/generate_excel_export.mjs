import fs from 'fs';
import path from 'path';
import {
  SecureCrypto,
  PEPPER_ENCLAVES,
  decodeSecretEnclave,
  getSecretPepperString
} from '../src/crypto.js';

// 1. Read sample Quarterly_Report.xlsx
const fileBytes = fs.readFileSync('scratch/sample_docs/Quarterly_Report.xlsx');
const payload = new Uint8Array(fileBytes);
const payloadHash = await SecureCrypto.computePayloadHash(payload);
const salt = SecureCrypto.generateSalt();
const iv = SecureCrypto.generateIV();
const testPassword = 'TestPassword123!';

const key = await SecureCrypto.deriveKeyAsyncWorker(testPassword, salt, 2000000, SecureCrypto.DOMAIN_SEPARATION_TAG_V10);

const meta = {
  name: 'Quarterly_Report.xlsx',
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  size: payload.byteLength,
  id: 'excel-test-uuid',
  date: Date.now(),
  title: 'Secure Vault',
  allowDownload: true,
  integrityHash: payloadHash,
  version: 'V10'
};

const headerPack = SecureCrypto.packSecureBinaryContainer({
  salt,
  iv,
  integrityHash: payloadHash,
  ciphertext: new Uint8Array(0),
  meta,
  iterations: 2000000,
  version: 0x02,
  kdfId: 0x02
});

const { ciphertext } = await SecureCrypto.encryptData(key, payload, headerPack.header, iv);

const containerPack = SecureCrypto.packSecureBinaryContainer({
  salt,
  iv,
  integrityHash: payloadHash,
  ciphertext,
  meta,
  iterations: 2000000,
  version: 0x02,
  kdfId: 0x02
});

const b64Data = Buffer.from(containerPack.container).toString('base64');

// Extract generateSecureHTMLParts from src/main.js
const mainSrc = fs.readFileSync(path.resolve('src/main.js'), 'utf8');
const startIdx = mainSrc.indexOf('function generateSecureHTMLParts(');
const endIdx = mainSrc.indexOf('async function decryptFileForExport(');
const funcCode = mainSrc.substring(startIdx, endIdx);

// Also extract FFLATE_CODE and office engines
const { FFLATE_CODE } = await import('../src/fflate_code.js');
const { XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED } = await import('../src/office_engines.js');

const fn = new Function(
  'fileMeta', 'salt', 'iv', 'customization', 'PEPPER_ENCLAVES', 'decodeSecretEnclave', 'getSecretPepperString', 'FFLATE_CODE', 'XLSX_CORE_DEFLATED', 'MAMMOTH_CODE_DEFLATED',
  funcCode + '; return generateSecureHTMLParts(fileMeta, salt, iv, customization);'
);

const parts = fn(meta, salt, iv, { allowDownload: true, title: 'Secure Vault' }, PEPPER_ENCLAVES, decodeSecretEnclave, getSecretPepperString, FFLATE_CODE, XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED);
const finalHtml = parts.header + b64Data + parts.footer;

fs.writeFileSync(path.resolve('scratch/test_exported_excel.secure.html'), finalHtml, 'utf8');
console.log('Successfully wrote scratch/test_exported_excel.secure.html (' + finalHtml.length + ' bytes)');
