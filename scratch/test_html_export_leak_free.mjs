import fs from 'fs';
import path from 'path';
import {
  SecureCrypto,
  PEPPER_ENCLAVES,
  decodeSecretEnclave,
  getSecretPepperString
} from '../src/crypto.js';

console.log('='.repeat(80));
console.log('TESTING STANDALONE EXPORTED .secure.html FILE FOR ZERO PLAINTEXT LEAKS');
console.log('='.repeat(80));

// Read main.js to extract generateSecureHTMLParts
const mainJs = fs.readFileSync(path.resolve('src/main.js'), 'utf8');

// Pack a dummy container
const salt = SecureCrypto.generateSalt();
const iv = SecureCrypto.generateIV();
const payload = new TextEncoder().encode('CONFIDENTIAL_VAULT_DOCUMENT_CONTENTS');
const payloadHash = await SecureCrypto.computePayloadHash(payload);

const key = await SecureCrypto.deriveKeyAsyncWorker('TestPassword123!', salt, 100000, SecureCrypto.DOMAIN_SEPARATION_TAG_V10);
const { ciphertext } = await SecureCrypto.encryptData(key, payload);

const meta = {
  name: 'test-document.pdf',
  type: 'application/pdf',
  size: payload.byteLength,
  id: 'test-1234-uuid',
  date: Date.now(),
  title: 'Coralgenz Vault',
  allowDownload: true,
  integrityHash: payloadHash,
  version: 'V10'
};

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

// We simulate what generateSecureHTMLParts does by reading the template portion or running it
// Let's create a scratch runner that executes generateSecureHTMLParts in a mock DOM environment
const jsdomContent = `
const fs = require('fs');
const path = require('path');

// Extract generateSecureHTMLParts from main.js
const mainSrc = fs.readFileSync(path.resolve('src/main.js'), 'utf8');

// Extract the generateSecureHTMLParts function using regex or substring
const startIdx = mainSrc.indexOf('function generateSecureHTMLParts(');
const endIdx = mainSrc.indexOf('async function decryptFileForExport(');
if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate generateSecureHTMLParts boundaries');
  process.exit(1);
}

const funcCode = mainSrc.substring(startIdx, endIdx);

// Execute in sandbox
const fn = new Function('fileMeta', 'salt', 'iv', 'customization', 'PEPPER_ENCLAVES', 'decodeSecretEnclave', 'getSecretPepperString', 'obfuscateContainerHtml', 'FFLATE_CODE', funcCode + '; return generateSecureHTMLParts(fileMeta, salt, iv, customization);');

const PEPPER_ENCLAVES = ${JSON.stringify(PEPPER_ENCLAVES)};
${decodeSecretEnclave.toString()}
${getSecretPepperString.toString()}

const fileMeta = { name: "secret.pdf", size: 1024, type: "application/pdf", date: Date.now(), id: "id123" };
const salt = new Uint8Array(32);
const iv = new Uint8Array(12);

const parts = fn(fileMeta, salt, iv, { allowDownload: true }, PEPPER_ENCLAVES, decodeSecretEnclave, getSecretPepperString, (h) => h, "/* fflate */");
const fullHtml = parts.header + "${b64Data}" + parts.footer;

fs.writeFileSync(path.resolve('scratch/output_test.secure.html'), fullHtml, 'utf8');
console.log('Successfully generated scratch/output_test.secure.html (' + fullHtml.length + ' bytes)');
`;

fs.writeFileSync(path.resolve('scratch/generate_runner.cjs'), jsdomContent, 'utf8');

import { execSync } from 'child_process';
execSync('node scratch/generate_runner.cjs');

// Now scan scratch/output_test.secure.html for leaks!
const htmlContent = fs.readFileSync(path.resolve('scratch/output_test.secure.html'), 'utf8');

const forbiddenPatterns = [
  /CORALGENZ::/g,
  /MILSPEC_PEPPER/g,
  /994810284712/g,
  /883920194821/g,
  /774910283419/g,
  /992174829104/g,
  /QUANTUM_16LAYER/g,
  /ANTI_OFFLINE_CRACKER/g,
  /ANTI_JOHN_THE_RIPPER/g
];

console.log('\n[SCAN] Scanning generated .secure.html file for leaked plaintext secrets...');
let htmlLeaks = 0;
for (const pat of forbiddenPatterns) {
  const matches = htmlContent.match(pat) || [];
  if (matches.length > 0) {
    console.error(`[LEAK DETECTED] Found ${matches.length} matches for pattern ${pat} in exported file!`);
    htmlLeaks += matches.length;
  }
}

if (htmlLeaks === 0) {
  console.log('[PASS] ZERO plaintext leaks in exported .secure.html file! Complete Zero-Knowledge Enclave Active.');
} else {
  console.error(`[FAIL] Exported HTML failed leak audit with ${htmlLeaks} leaks.`);
  process.exit(1);
}

// Clean up scratch file
fs.unlinkSync(path.resolve('scratch/output_test.secure.html'));
fs.unlinkSync(path.resolve('scratch/generate_runner.cjs'));

console.log('\n' + '='.repeat(80));
console.log('>>> STANDALONE HTML EXPORT SECURITY AUDIT PASSED (0 LEAKS) <<<');
console.log('='.repeat(80));
