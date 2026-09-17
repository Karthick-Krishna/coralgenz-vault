import assert from 'assert';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

console.log('🧪 Starting In-Vault .secure Container & Decryption Test Suite...\n');

// 1. Validate Web App Manifest and File Handlers
const manifestPath = path.resolve('/Users/karthickkrishna/Documents/genz qr/public/manifest.webmanifest');
assert(fs.existsSync(manifestPath), 'manifest.webmanifest must exist');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
console.log('✓ manifest.webmanifest successfully parsed');
assert(manifest.file_handlers && manifest.file_handlers.length > 0, 'manifest must define file_handlers');
const handler = manifest.file_handlers[0];
assert(handler.accept['application/x-secure-container']?.includes('.secure'), 'handler must accept .secure');
assert(handler.accept['text/html']?.includes('.secure.html'), 'handler must accept .secure.html');
console.log('✓ File handling API registered for .secure and .secure.html');

// 2. Emulate 16-Layer Key Derivation and Encryption (same as src/main.js & crypto.js)
const MAGIC_BYTES = new Uint8Array([0x53, 0x45, 0x43, 0x55, 0x52, 0x45, 0x5F, 0x56, 0x31]); // "SECURE_V1"

function deriveKey16Layers(password, salt, pepper = '') {
  let material = Buffer.from(password + (pepper ? `::${pepper}` : ''), 'utf8');
  let currentSalt = salt;

  // 16 layers of alternating KDFs
  for (let round = 1; round <= 16; round++) {
    const iter = 10000 + round * 1000;
    const hmac = crypto.createHmac('sha384', currentSalt);
    hmac.update(material);
    material = hmac.digest();

    material = crypto.pbkdf2Sync(material, currentSalt, 1000, 32, 'sha256');

    const nextSaltHash = crypto.createHash('sha256');
    nextSaltHash.update(currentSalt);
    nextSaltHash.update(material);
    currentSalt = nextSaltHash.digest();
  }

  return crypto.pbkdf2Sync(material, currentSalt, 10000, 32, 'sha256');
}

// 3. Create Sample Document (.xlsx dummy data)
const samplePayload = Buffer.from('PK\x03\x04Test Excel Document Data for Coralgenz Vault Validation ' + Date.now());
const testPassword = 'CyberVaultSuperSecurePassword2026!';
const testSalt = crypto.randomBytes(32);
const testIv = crypto.randomBytes(12);

const derivedKey = deriveKey16Layers(testPassword, testSalt);

// Encrypt payload with AES-256-GCM
const cipher = crypto.createCipheriv('aes-256-gcm', derivedKey, testIv);
const ciphertext = Buffer.concat([cipher.update(samplePayload), cipher.final()]);
const authTag = cipher.getAuthTag();
const encryptedPayloadWithTag = Buffer.concat([ciphertext, authTag]);

// Calculate SHA-256 integrity seal
const sha256Seal = crypto.createHash('sha256').update(samplePayload).digest('hex');

// Pack into binary container
const metadata = {
  name: 'financial_report_q3.xlsx',
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  size: samplePayload.length,
  integrityHash: sha256Seal,
  saltB64: testSalt.toString('base64'),
  ivB64: testIv.toString('base64'),
  exportedAt: new Date().toISOString(),
  engine: 'coralgenz-vault-v10'
};

const metaJson = Buffer.from(JSON.stringify(metadata), 'utf8');
const metaLenBuf = Buffer.alloc(4);
metaLenBuf.writeUInt32BE(metaJson.length, 0);

const binaryContainer = Buffer.concat([
  Buffer.from(MAGIC_BYTES),
  metaLenBuf,
  metaJson,
  testSalt,
  testIv,
  encryptedPayloadWithTag
]);

console.log(`✓ Binary .secure container packed: ${binaryContainer.length} bytes`);

// 4. Test Unpacking Binary Container
function unpackBinaryContainer(buffer) {
  const magic = buffer.subarray(0, 9);
  assert(Buffer.compare(magic, Buffer.from(MAGIC_BYTES)) === 0, 'Magic bytes must match SECURE_V1');
  
  const metaLen = buffer.readUInt32BE(9);
  const metaStart = 13;
  const metaEnd = metaStart + metaLen;
  const parsedMeta = JSON.parse(buffer.subarray(metaStart, metaEnd).toString('utf8'));
  
  const salt = buffer.subarray(metaEnd, metaEnd + 32);
  const iv = buffer.subarray(metaEnd + 32, metaEnd + 44);
  const encryptedPayload = buffer.subarray(metaEnd + 44);
  
  return { metadata: parsedMeta, salt, iv, encryptedPayload };
}

const unpacked = unpackBinaryContainer(binaryContainer);
assert.strictEqual(unpacked.metadata.name, 'financial_report_q3.xlsx');
assert.strictEqual(unpacked.metadata.size, samplePayload.length);
assert.strictEqual(unpacked.metadata.integrityHash, sha256Seal);
assert(Buffer.compare(unpacked.salt, testSalt) === 0);
assert(Buffer.compare(unpacked.iv, testIv) === 0);
console.log('✓ Successfully unpacked binary container metadata, salt, iv, and payload');

// 5. Test Decryption with 16-Layer Key
const unlockKey = deriveKey16Layers(testPassword, unpacked.salt);
const encTag = unpacked.encryptedPayload.subarray(unpacked.encryptedPayload.length - 16);
const encData = unpacked.encryptedPayload.subarray(0, unpacked.encryptedPayload.length - 16);

const decipher = crypto.createDecipheriv('aes-256-gcm', unlockKey, unpacked.iv);
decipher.setAuthTag(encTag);
const decrypted = Buffer.concat([decipher.update(encData), decipher.final()]);

assert(Buffer.compare(decrypted, samplePayload) === 0, 'Decrypted buffer must match original payload');
console.log('✓ Decryption succeeded! Decrypted content matches original binary bytes');

// Verify integrity hash
const verifiedHash = crypto.createHash('sha256').update(decrypted).digest('hex');
assert.strictEqual(verifiedHash, sha256Seal, 'Decrypted payload SHA-256 must match sealed container hash');
console.log('✓ SHA-256 forensic seal verification PASSED');

// 6. Test Decryption Failure with Wrong Password
let failed = false;
try {
  const wrongKey = deriveKey16Layers('WrongPassword123!', unpacked.salt);
  const badDecipher = crypto.createDecipheriv('aes-256-gcm', wrongKey, unpacked.iv);
  badDecipher.setAuthTag(encTag);
  Buffer.concat([badDecipher.update(encData), badDecipher.final()]);
} catch (e) {
  failed = true;
}
assert(failed, 'AES-GCM authentication must fail when wrong password is supplied');
console.log('✓ Authentication tag rejection on wrong password PASSED');

// 7. Test .secure.html base64 envelope parsing
const htmlEnvelope = `
<!DOCTYPE html>
<html>
<head><title>Test Container</title></head>
<body>
<div id="secure-binary-container" style="display:none;" data-encoding="base64">${binaryContainer.toString('base64')}</div>
</body>
</html>
`;

// Extract binary container from HTML envelope
const base64Regex = /data-encoding="base64">([A-Za-z0-9+/=]+)<\/div>/;
const match = htmlEnvelope.match(base64Regex);
assert(match, 'Must find base64 container element');
const parsedFromHtml = Buffer.from(match[1], 'base64');
const unpackedFromHtml = unpackBinaryContainer(parsedFromHtml);
assert.strictEqual(unpackedFromHtml.metadata.name, 'financial_report_q3.xlsx');
console.log('✓ Successfully parsed and validated binary container from .secure.html envelope');

console.log('\n========================================');
console.log('🎉 ALL IN-VAULT .SECURE CONTAINER TESTS PASSED!');
console.log('========================================\n');
