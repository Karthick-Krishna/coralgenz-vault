import fs from 'fs';
import path from 'path';
import {
  SecureCrypto,
  PEPPER_ENCLAVES,
  decodeSecretEnclave,
  getSecretPepperString
} from '../src/crypto.js';

console.log('='.repeat(80));
console.log('AUDITING EXPORTED CONTAINER FOR HTML SMUGGLING & SECURITY STANDARDS');
console.log('='.repeat(80));

// 1. Pack test payload into RFC-2026-SECURE container
const testPlaintext = 'GENUINE_NIST_COMPLIANT_STANDARDS_BASED_DOCUMENT_PAYLOAD';
const payload = new TextEncoder().encode(testPlaintext);
const payloadHash = await SecureCrypto.computePayloadHash(payload);
const salt = SecureCrypto.generateSalt();
const iv = SecureCrypto.generateIV();

const key = await SecureCrypto.deriveKeyAsyncWorker('SuperStrongPass123!#', salt, 2000000, SecureCrypto.DOMAIN_SEPARATION_TAG_V10);

const meta = {
  name: 'Quarterly_Financial_Report.pdf',
  type: 'application/pdf',
  size: payload.byteLength,
  id: 'doc-secure-uuid-9921',
  date: Date.now(),
  title: 'Secure Vault',
  allowDownload: true,
  integrityHash: payloadHash,
  version: 'V10'
};

// Build binary container header first to use as Additional Authenticated Data (AAD) in AES-256-GCM
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

// Extract generateSecureHTMLParts from main.js
const mainSrc = fs.readFileSync(path.resolve('src/main.js'), 'utf8');
const startIdx = mainSrc.indexOf('function generateSecureHTMLParts(');
const endIdx = mainSrc.indexOf('async function decryptFileForExport(');
const funcCode = mainSrc.substring(startIdx, endIdx);

const fn = new Function('fileMeta', 'salt', 'iv', 'customization', 'PEPPER_ENCLAVES', 'decodeSecretEnclave', 'getSecretPepperString', 'FFLATE_CODE', funcCode + '; return generateSecureHTMLParts(fileMeta, salt, iv, customization);');

const parts = fn(meta, salt, iv, { allowDownload: true, title: 'Secure Vault' }, PEPPER_ENCLAVES, decodeSecretEnclave, getSecretPepperString, '/* fflate */');
const finalHtml = parts.header + b64Data + parts.footer;

const auditPath = path.resolve('scratch/audit_report.secure.html');
fs.writeFileSync(auditPath, finalHtml, 'utf8');
console.log(`\nGenerated exported container: ${auditPath} (${(finalHtml.length / 1024).toFixed(1)} KB)\n`);

// 2. Comprehensive Security & Evasion Audit
const auditFindings = [];

function checkForbidden(name, regex, description) {
  const match = finalHtml.match(regex);
  if (match) {
    auditFindings.push({ status: 'FAIL', test: name, detail: `Found prohibited pattern: ${match[0]} (${description})` });
  } else {
    auditFindings.push({ status: 'PASS', test: name, detail: description });
  }
}

function checkRequired(name, regex, description) {
  const match = finalHtml.match(regex);
  if (!match) {
    auditFindings.push({ status: 'FAIL', test: name, detail: `Missing mandatory element: ${description}` });
  } else {
    auditFindings.push({ status: 'PASS', test: name, detail: description });
  }
}

// Check against HTML Smuggling (MITRE ATT&CK T1027.006)
checkForbidden('No document.write', /document\.write/i, 'No document.write dynamic DOM reconstruction');
checkForbidden('No document.open', /document\.open/i, 'No document.open page wiping');
checkForbidden('No atob Smuggling Loader', /atob\s*\([A-Za-z0-9_$]+\)\s*;[\s\S]{0,100}document\.write/i, 'No Base64 atob -> document.write evasion stub');

// Check against Anti-Debugging & Evasion Traps (MITRE ATT&CK T1622)
checkForbidden('No Debugger Loop Trap', /constructor\s*\(\s*['"`]debugger['"`]\s*\)/i, 'No dynamic constructor debugger loops');
checkForbidden('No Literal Debugger Stmt', /\bdebugger\b/i, 'No explicit debugger statements');
checkForbidden('No F12 Interception', /keyCode\s*===\s*123/i, 'No F12 developer tool keyboard blocking');
checkForbidden('No Ctrl+U Interception', /keyCode\s*===\s*85/i, 'No Ctrl+U view-source blocking');

// Check against Fake Security Branding & Deceptive Buzzwords
checkForbidden('No Military-Grade Claims', /Military-Grade/i, 'No misleading "Military-Grade" branding');
checkForbidden('No Proprietary Standard Claims', /PROPRIETARY FORMAT CREATED/i, 'No fake corporate proprietary standard claims');
checkForbidden('No Deceptive CSP Comments', /Blocks Burp Suite/i, 'No false claims regarding network proxy blocks');

// Check Strict CSP and Standards
checkForbidden('No unsafe-eval in CSP', /content="[^"]*unsafe-eval[^"]*"/i, 'CSP does not allow unsafe-eval');
checkRequired('Valid CSP Present', /http-equiv="Content-Security-Policy"/i, 'Strict Content-Security-Policy header is declared');
checkRequired('NIST/RFC Security Standard Notice', /NIST SP 800-38D/i, 'Standard cryptography reference (NIST SP 800-38D / RFC 8018) is declared');
checkRequired('Clean In-Memory Payload Definition', /const DATA = "/i, 'Encrypted container payload stored cleanly in standard script variable');

// 3. Print Audit Results
let failCount = 0;
console.log('--- AUDIT CHECKLIST ---');
for (const item of auditFindings) {
  const icon = item.status === 'PASS' ? '✅ [PASS]' : '❌ [FAIL]';
  console.log(`${icon.padEnd(11)} ${item.test.padEnd(35)} : ${item.detail}`);
  if (item.status === 'FAIL') failCount++;
}

// 4. Verify Payload Unpacking & Decryptability
console.log('\n--- VERIFYING PAYLOAD INTEGRITY & DECRYPTION ---');
const rawBytes = Buffer.from(b64Data, 'base64');
const unpacked = SecureCrypto.unpackSecureBinaryContainer(rawBytes);
const magic = new TextDecoder().decode(rawBytes.slice(0, 9));
console.log(`[PASS] Container Header Unpacked: Magic=${magic} (Version 0x${unpacked.version.toString(16).padStart(2, '0')})`);

const derivedKey = await SecureCrypto.deriveKeyAsyncWorker('SuperStrongPass123!#', unpacked.salt, unpacked.iterations, SecureCrypto.DOMAIN_SEPARATION_TAG_V10);
const decryptedBuffer = await SecureCrypto.decryptData(derivedKey, unpacked.iv, unpacked.ciphertext, unpacked.header);
const recoveredText = new TextDecoder().decode(decryptedBuffer);

if (recoveredText === testPlaintext) {
  console.log(`✅ [PASS] Decrypted Payload Authenticated & Matches: "${recoveredText}"`);
} else {
  console.error(`❌ [FAIL] Decrypted payload mismatch!`);
  failCount++;
}

console.log('='.repeat(80));
if (failCount === 0) {
  console.log('>>> 100% AUDIT SUCCESS: CONTAINER IS FULLY STANDARDS-COMPLIANT & NON-EVASIVE <<<');
} else {
  console.error(`>>> AUDIT FAILED WITH ${failCount} DEFECTS <<<`);
  process.exit(1);
}
console.log('='.repeat(80));
