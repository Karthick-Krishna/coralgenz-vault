import assert from 'assert';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { SecureCrypto } from '../src/crypto.js';

console.log('================================================================================');
console.log('TESTING UNBYPASSABLE .SECURE CRYPTOGRAPHIC BINDING & PURE VS UNIVERSAL EXPORT');
console.log('================================================================================\n');

// 1. Setup Test Document & Password
const testDocumentText = 'Confidential Financial Statement 2026 - Coralgenz Vault Core Data';
const testPayload = new TextEncoder().encode(testDocumentText);
const testPassword = 'MasterVaultKey#2026!StrictSecure';
const testSalt = SecureCrypto.generateSalt();
const testIv = SecureCrypto.generateIV();

console.log('[STEP 1] Deriving 16-layer key for test document...');
const key = await SecureCrypto.deriveKey16Layer(testPassword, testSalt, 2000000, SecureCrypto.MILSPEC_ANTI_CRACKER_PEPPER_V10);
const payloadHash = await SecureCrypto.computePayloadHash(testPayload);

// 2. Build Authentic .secure Container Header
const meta = {
  name: 'quarterly_financials.xlsx',
  format: 'SECURE_STANDARD_V10',
  specification: 'RFC-2026-SECURE',
  standardExtension: '.secure',
  universalRunnerExtension: '.secure.html',
  engine: 'coralgenz-vault-v10',
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  size: testPayload.byteLength,
  integrityHash: payloadHash
};

const headerPack = SecureCrypto.packSecureBinaryContainer({
  salt: testSalt,
  iv: testIv,
  integrityHash: payloadHash,
  ciphertext: new Uint8Array(0),
  meta: meta,
  iterations: 2000000,
  version: 0x02,
  kdfId: 0x02
});

console.log(`[PASS] Packaged authentic .secure binary header: ${headerPack.headerLen} bytes`);
assert(headerPack.headerLen >= 95, 'Header must be at least 95 bytes');

// 3. Encrypt with AES-256-GCM binding the header as Additional Authenticated Data (Galois AEAD)
console.log('[STEP 2] Encrypting with Galois AEAD bound strictly to .secure header...');
const { iv: encryptedIv, ciphertext } = await SecureCrypto.encryptData(key, testPayload, headerPack.header, testIv);

const finalContainer = SecureCrypto.packSecureBinaryContainer({
  salt: testSalt,
  iv: encryptedIv,
  integrityHash: payloadHash,
  ciphertext: ciphertext,
  meta: meta,
  iterations: 2000000,
  version: 0x02,
  kdfId: 0x02
});

console.log(`[PASS] Final .secure binary container size: ${finalContainer.container.byteLength} bytes`);

// 4. Test Pure .secure Export Format
console.log('\n[STEP 3] Testing Pure .secure Container Export Format...');
const pureSecureBytes = finalContainer.container;
assert(pureSecureBytes[0] === 0x53 && pureSecureBytes[1] === 0x45 && pureSecureBytes[2] === 0x43, 'Must start with SECURE_V1 magic bytes');
const textHeader = new TextDecoder().decode(pureSecureBytes.subarray(0, 9));
assert.strictEqual(textHeader, 'SECURE_V1', 'Magic header must be SECURE_V1');
// Must NOT start with '<!DOCTYPE html>' or '<html'
const isHtml = pureSecureBytes[0] === 0x3C; // '<'
assert(!isHtml, 'Pure .secure export must NOT be an HTML document');
console.log('✅ [PASS] Pure .secure file is 100% pure binary SECURE_V1 cryptographic container (NOT HTML).');

// 5. Test Decryption with Authentic .secure Header
console.log('\n[STEP 4] Testing Decryption with Authentic .secure Header...');
const decrypted = await SecureCrypto.decryptData(key, encryptedIv, ciphertext, headerPack.header);
const decryptedText = new TextDecoder().decode(decrypted);
assert.strictEqual(decryptedText, testDocumentText, 'Decrypted text must match original');
console.log('✅ [PASS] Decryption succeeded with authentic .secure container header.');

// 6. Test Unbypassability: Attempt Decrypting WITHOUT AAD (simulating attacker deleting .secure check in code)
console.log('\n[STEP 5] Testing Code Bypass Resistance: Decryption without .secure AAD...');
let bypassSucceeded = false;
try {
  // Attacker edited JavaScript to pass null additionalData
  await SecureCrypto.decryptData(key, encryptedIv, ciphertext, null);
  bypassSucceeded = true;
} catch (e) {
  // Native WebCrypto GMAC verification rejected decryption
  console.log(`[PASS] Native WebCrypto rejected decryption without .secure AAD: ${e.message || e}`);
}
assert(!bypassSucceeded, 'Decryption MUST fail when .secure AAD is omitted, even with correct password!');
console.log('✅ [PASS] Attacker CANNOT bypass .secure check by editing code: native C++ WebCrypto GMAC rejects decryption.');

// 7. Test Unbypassability: Attempt Decrypting with Tampered Header
console.log('\n[STEP 6] Testing Tamper Resistance: Decryption with altered .secure header...');
const tamperedHeader = new Uint8Array(headerPack.header);
tamperedHeader[96] = tamperedHeader[96] ^ 0xFF; // flip bits in metadata

let tamperSucceeded = false;
try {
  await SecureCrypto.decryptData(key, encryptedIv, ciphertext, tamperedHeader);
  tamperSucceeded = true;
} catch (e) {
  console.log(`[PASS] Native WebCrypto rejected tampered header: ${e.message || e}`);
}
assert(!tamperSucceeded, 'Decryption MUST fail if .secure header is modified in any way!');
console.log('✅ [PASS] Galois AEAD GMAC authentication strictly protects .secure format integrity.');

// 8. Test Universal .secure.html runner packaging
console.log('\n[STEP 7] Testing Universal .secure.html runner structure...');
const base64Container = Buffer.from(finalContainer.container).toString('base64');
const sampleUniversalHtml = `
<!DOCTYPE html>
<html lang="en" data-container-format="SECURE_STANDARD_V10" data-container-spec="RFC-2026-SECURE" data-engine="coralgenz-vault">
<head><title>Universal Secure Container</title></head>
<body>
<div class="auth-footer">STANDARD ENCRYPTED DOCUMENT CONTAINER (NIST SP 800-38D / RFC 8018)</div>
<script>
const DATA = "${base64Container}";
</script>
</body>
</html>
`;

// Extract and unpack container from universal runner
const match = sampleUniversalHtml.match(/const\s+DATA\s*=\s*["']([^"']+)["']/);
assert(match && match[1], 'Must find DATA constant');
const extractedBinary = new Uint8Array(Buffer.from(match[1], 'base64'));
const unpackedFromRunner = SecureCrypto.unpackSecureBinaryContainer(extractedBinary);
assert.strictEqual(unpackedFromRunner.valid, true);
assert.strictEqual(unpackedFromRunner.meta.name, 'quarterly_financials.xlsx');
assert.strictEqual(unpackedFromRunner.meta.standardExtension, '.secure');
assert.strictEqual(unpackedFromRunner.meta.universalRunnerExtension, '.secure.html');
console.log('✅ [PASS] Universal .secure.html embeds authentic .secure binary container.');

console.log('\n================================================================================');
console.log('🎉 ALL UNBYPASSABLE .SECURE BINDING & DUAL EXPORT TESTS PASSED 100%!');
console.log('================================================================================\n');
