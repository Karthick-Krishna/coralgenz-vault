import { SecureCrypto } from '../src/crypto.js';

// Test harness for export format selection and decryption
async function runTests() {
  console.log('Running Export Format and Decryption Verification Suite...\n');

  // 1. Create a test payload
  const testPayload = new TextEncoder().encode('Confidential Vault Document Contents 2026 - Crystal Clear Quality');
  const password = 'TestSuperPassword123!';
  const salt = SecureCrypto.generateSalt();
  const iv = SecureCrypto.generateIV();
  const payloadHash = await SecureCrypto.computePayloadHash(testPayload);
  const derivedKey = await SecureCrypto.deriveKey16Layer(password, salt, 2000000);

  // 2. Package pure .secure container
  const meta = {
    name: 'test_doc.txt',
    format: 'SECURE_STANDARD_V10',
    specification: 'RFC-2026-SECURE',
    standardExtension: '.secure',
    universalRunnerExtension: '.secure.html',
    engine: 'coralgenz-vault-v10',
    type: 'text/plain',
    size: testPayload.byteLength,
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

  // AES-256-GCM with header as AAD
  const { ciphertext } = await SecureCrypto.encryptData(derivedKey, testPayload, headerPack.header, iv);

  const fullContainer = SecureCrypto.packSecureBinaryContainer({
    salt,
    iv,
    integrityHash: payloadHash,
    ciphertext,
    meta,
    iterations: 2000000,
    version: 0x02,
    kdfId: 0x02
  });

  // Check magic bytes (9 bytes: 'SECURE_V1')
  const magic = new TextDecoder().decode(fullContainer.container.slice(0, 9));
  console.assert(magic === 'SECURE_V1', `Magic bytes should be SECURE_V1, got: ${magic}`);
  console.log('✓ Pure .secure binary container starts with correct magic bytes (SECURE_V1)');

  // 3. Unpack pure container
  const unpacked = SecureCrypto.unpackSecureBinaryContainer(fullContainer.container);
  console.assert(unpacked !== null, 'Unpack container should succeed');
  console.assert(unpacked.meta.name === 'test_doc.txt', 'Metadata name should match');
  console.log('✓ Unpacking pure .secure container successfully extracted metadata');

  // 4. Decrypt container using header as AAD
  const decrypted = await SecureCrypto.decryptData(derivedKey, unpacked.iv, unpacked.ciphertext, unpacked.header);
  const decryptedText = new TextDecoder().decode(decrypted);
  console.assert(decryptedText === 'Confidential Vault Document Contents 2026 - Crystal Clear Quality', 'Decrypted text must match');
  console.log('✓ Decrypted .secure container with Galois AAD authentication matches original payload');

  // 5. Test decryptFileForExport logic simulation
  // Simulate fileRecord saved in vault after container unlock
  const freshFileKey = await SecureCrypto.generateKey();
  const fileIv = SecureCrypto.generateIV();
  const { ciphertext: encContent } = await SecureCrypto.encryptData(freshFileKey, decrypted, null, fileIv);
  const { iv: keyWrapIv, wrappedData } = await SecureCrypto.wrapKey(freshFileKey, derivedKey);

  const fileRecord = {
    id: 'test-rec-1',
    name: 'test_doc.txt.secure',
    type: 'text/plain',
    size: decrypted.byteLength,
    iv: fileIv,
    content: encContent,
    keys: [{ type: 'password', data: wrappedData, salt: salt, iv: keyWrapIv }],
    containerHeader: null
  };

  // Simulate decryptFileForExport unwrapping and decrypting
  const passKeyEntry = fileRecord.keys.find(k => k.type === 'password');
  const unwrappedKey = await SecureCrypto.unwrapWithFallback(passKeyEntry.data, password, passKeyEntry.salt, passKeyEntry.iv);
  const exportDecrypted = await SecureCrypto.decryptData(unwrappedKey, fileRecord.iv, fileRecord.content);
  console.assert(new TextDecoder().decode(exportDecrypted) === decryptedText, 'Export decryption must match');
  console.log('✓ Vault fileRecord export decryption simulation succeeded');

  console.log('\nAll export tests PASSED successfully!');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
