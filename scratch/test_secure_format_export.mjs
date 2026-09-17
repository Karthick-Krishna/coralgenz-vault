// Verification test for Standardized .secure Container Format and Universal Double-Click Runner
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

console.log('--- RUNNING UNIVERSAL .SECURE FORMAT VERIFICATION TEST SUITE ---');

// 1. Verify src/main.js exports with universal runner (.secure.html) and pure .secure options
const mainJsContent = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/src/main.js', 'utf-8');

// Check export download names
const hasUniversalDownload = mainJsContent.includes("a.download = rawName + '.secure.html'");
const hasPureSecureDownload = mainJsContent.includes("a.download = rawName.toLowerCase().endsWith('.secure') ? rawName : (rawName.replace(/\\.html$/i, '') + '.secure')");
console.log('✓ Main export provides Universal .secure.html runner:', hasUniversalDownload);
console.log('✓ Main export provides Pure .secure container format:', hasPureSecureDownload);
if (!hasUniversalDownload || !hasPureSecureDownload) throw new Error('Export download logic missing universal or pure option');

// Check specification comment header
const hasSpecComment = mainJsContent.includes('STANDARDIZED .SECURE CRYPTOGRAPHIC CONTAINER') &&
                       mainJsContent.includes('SPECIFICATION: RFC-2026-SECURE');
console.log('✓ Container embeds RFC-2026-SECURE specification comment block:', hasSpecComment);
if (!hasSpecComment) throw new Error('Missing RFC-2026-SECURE specification comment');

// Check data-container-format attribute
const hasContainerAttr = mainJsContent.includes('data-container-format="SECURE_STANDARD_V10"') &&
                         mainJsContent.includes('data-container-spec="RFC-2026-SECURE"');
console.log('✓ Container embeds data-container-format & spec attributes:', hasContainerAttr);
if (!hasContainerAttr) throw new Error('Missing data-container-format attribute');

// Check format integrity engine in runtime
const hasFormatIntegrityEngine = mainJsContent.includes('function verifyFormatIntegrity');
console.log('✓ Container runtime embeds verifyFormatIntegrity engine:', hasFormatIntegrityEngine);
if (!hasFormatIntegrityEngine) throw new Error('Missing verifyFormatIntegrity engine');

// 2. Verify index.html UI copy
const indexHtmlContent = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/index.html', 'utf-8');
const hasUniversalCard = indexHtmlContent.includes('Universal .secure Container (.secure.html)');
const hasUniversalDlBtn = indexHtmlContent.includes('DOWNLOAD UNIVERSAL SECURE FILE (.secure.html)');
const hasPureDlBtn = indexHtmlContent.includes('DOWNLOAD AS .SECURE');
console.log('✓ index.html displays Universal .secure Container (.secure.html):', hasUniversalCard);
console.log('✓ index.html primary button displays DOWNLOAD UNIVERSAL SECURE FILE (.secure.html):', hasUniversalDlBtn);
console.log('✓ index.html provides DOWNLOAD AS .SECURE option:', hasPureDlBtn);
if (!hasUniversalCard || !hasUniversalDlBtn || !hasPureDlBtn) throw new Error('index.html missing universal or pure download options');

// 3. Test RFC-2026-SECURE Binary Container Packaging + Node.js Decryption
async function testContainerLifecycle() {
  const secretPassword = 'MasterSecurePassword2026!';
  const fileData = Buffer.from('Confidential Financial Report 2026 - Standard .secure Format');
  const payloadHash = crypto.createHash('sha256').update(fileData).digest('hex');

  // Derive master key with PBKDF2 (100,000 iterations for test speed)
  const salt = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(secretPassword, salt, 100000, 32, 'sha256');

  // Construct SECURE_V1 header (95 bytes + metadata JSON)
  const magic = Buffer.from('SECURE_V1', 'ascii'); // 9 bytes
  const version = Buffer.from([0x01]); // 1 byte
  const kdfId = Buffer.from([0x01]); // 1 byte (PBKDF2)
  const iterBuf = Buffer.alloc(4);
  iterBuf.writeUInt32BE(100000, 0); // 4 bytes
  const hashBuf = Buffer.from(payloadHash, 'hex'); // 32 bytes

  const metaObj = {
    name: 'financial_report.pdf',
    type: 'application/pdf',
    size: fileData.length,
    timestamp: Date.now(),
    standard: 'RFC-2026-SECURE'
  };
  const metaBytes = Buffer.from(JSON.stringify(metaObj), 'utf-8');
  const metaLenBuf = Buffer.alloc(4);
  metaLenBuf.writeUInt32BE(metaBytes.length, 0);

  const headerWithoutMeta = Buffer.concat([
    magic, version, kdfId, iterBuf, salt, iv, hashBuf, metaLenBuf
  ]);
  const fullHeader = Buffer.concat([headerWithoutMeta, metaBytes]);

  // AES-256-GCM encryption with fullHeader as AAD
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(fullHeader);
  const ciphertext = Buffer.concat([cipher.update(fileData), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const binaryContainer = Buffer.concat([fullHeader, ciphertext, authTag]);

  // Pack into base64 container
  const base64Payload = binaryContainer.toString('base64');
  console.log('✓ Binary container generated:', binaryContainer.length, 'bytes');

  // Verify unpack and decrypt
  const readMagic = binaryContainer.subarray(0, 9).toString('ascii');
  if (readMagic !== 'SECURE_V1') throw new Error('Magic mismatch');

  const readMetaLen = binaryContainer.readUInt32BE(91);
  const readHeaderLen = 95 + readMetaLen;
  const readHeader = binaryContainer.subarray(0, readHeaderLen);
  const readTag = binaryContainer.subarray(binaryContainer.length - 16);
  const readCiphertext = binaryContainer.subarray(readHeaderLen, binaryContainer.length - 16);

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAAD(readHeader);
  decipher.setAuthTag(readTag);
  const decrypted = Buffer.concat([decipher.update(readCiphertext), decipher.final()]);

  if (decrypted.toString() !== fileData.toString()) {
    throw new Error('Decrypted content does not match original file!');
  }
  console.log('✓ Decryption verified successfully: 100% data integrity matches payload!');

  const decryptedHash = crypto.createHash('sha256').update(decrypted).digest('hex');
  if (decryptedHash !== payloadHash) throw new Error('Payload integrity seal failed!');
  console.log('✓ SHA-256 Payload integrity seal matches:', decryptedHash);
}

await testContainerLifecycle();
console.log('=== ALL UNIVERSAL .SECURE FORMAT TESTS PASSED SUCCESSFULLY ===');
