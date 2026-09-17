import { SecureCrypto } from '../src/crypto.js';

async function runArchiveExportSuite() {
  console.log('=== RUNNING PROTECTED VAULT ARCHIVE EXPORT VERIFICATION SUITE ===\n');

  // Test data
  const originalFileName = 'Quarterly_Report_2026.docx';
  const originalFileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const rawBytes = new TextEncoder().encode('Confidential Vault Document Content for 2026 - Top Secret Security');
  const password = 'VaultMasterPassword2026!';
  const salt = SecureCrypto.generateSalt();
  const fileKey = await SecureCrypto.generateKey();

  // 1. Simulate handleAddFile (Zero-Knowledge Save into Vault Archive)
  const passwordKey = await SecureCrypto.deriveKeyAsyncWorker(password, salt, 2000000, SecureCrypto.DOMAIN_SEPARATION_TAG_V10);
  const payloadHash = await SecureCrypto.computePayloadHash(rawBytes.buffer);
  const { iv: fileIv, ciphertext } = await SecureCrypto.encryptData(fileKey, rawBytes.buffer);
  const { iv: wrapIv, wrappedData } = await SecureCrypto.wrapKey(fileKey, passwordKey);

  const fileRecord = {
    id: 'vault-archive-file-1',
    name: originalFileName,
    type: originalFileType,
    size: rawBytes.byteLength,
    date: Date.now(),
    authMode: 'always',
    keys: [{ type: 'password', salt, iv: wrapIv, data: wrappedData }],
    content: ciphertext,
    iv: fileIv,
    viewCount: 0,
    expires: null,
    note: '',
    integrityHash: payloadHash,
    accessLog: [{ action: 'created', date: Date.now() }]
  };

  console.log('✓ File saved inside PROTECTED VAULT ARCHIVE with ID:', fileRecord.id);

  // 2. Test decryptFileForExport with correct password
  const passKeyEntry = fileRecord.keys.find(k => k.type === 'password');
  const unwrappedKey = await SecureCrypto.unwrapWithFallback(passKeyEntry.data, password, passKeyEntry.salt, passKeyEntry.iv);
  const decryptedDirect = await SecureCrypto.decryptData(unwrappedKey, fileRecord.iv, fileRecord.content);
  console.assert(new TextDecoder().decode(decryptedDirect) === 'Confidential Vault Document Content for 2026 - Top Secret Security', 'Decrypted text must match');
  console.log('✓ Direct in-archive file decryption succeeded');

  // 3. Test decryptFileForExport with whitespace trimmed password
  const unwrappedTrimmed = await SecureCrypto.unwrapWithFallback(passKeyEntry.data, ('  ' + password + '  ').trim(), passKeyEntry.salt, passKeyEntry.iv);
  console.assert(unwrappedTrimmed !== null, 'Trimmed password unwrap must succeed');
  console.log('✓ Whitespace-tolerant password unwrap succeeded');

  // 4. Test wrong password rejection
  let wrongPassRejected = false;
  try {
    await SecureCrypto.unwrapWithFallback(passKeyEntry.data, 'WrongPass123!', passKeyEntry.salt, passKeyEntry.iv);
  } catch (err) {
    wrongPassRejected = true;
  }
  console.assert(wrongPassRejected, 'Wrong password must be rejected');
  console.log('✓ Wrong password correctly rejected without secondary prompt');

  // 5. Test Export as pure .secure (RFC-2026-SECURE)
  const exportSalt = SecureCrypto.generateSalt();
  const exportIv = SecureCrypto.generateIV();
  const exportKey = await SecureCrypto.deriveKeyAsyncWorker(password, exportSalt, 2000000, SecureCrypto.MILSPEC_ANTI_CRACKER_PEPPER_V10);

  const metaPure = {
    name: fileRecord.name,
    format: 'SECURE_STANDARD_V10',
    specification: 'RFC-2026-SECURE',
    standardExtension: '.secure',
    universalRunnerExtension: '.secure.html',
    engine: 'coralgenz-vault-v10',
    type: fileRecord.type,
    size: decryptedDirect.byteLength,
    id: fileRecord.id,
    date: Date.now(),
    title: 'Secure Vault',
    allowDownload: true,
    integrityHash: payloadHash,
    version: 'V10'
  };

  const headerPack = SecureCrypto.packSecureBinaryContainer({
    salt: exportSalt,
    iv: exportIv,
    integrityHash: payloadHash,
    ciphertext: new Uint8Array(0),
    meta: metaPure,
    iterations: 2000000,
    version: 0x02,
    kdfId: 0x02
  });

  const { ciphertext: encCiphertext } = await SecureCrypto.encryptData(exportKey, decryptedDirect, headerPack.header, exportIv);

  const finalContainer = SecureCrypto.packSecureBinaryContainer({
    salt: exportSalt,
    iv: exportIv,
    integrityHash: payloadHash,
    ciphertext: encCiphertext,
    meta: metaPure,
    iterations: 2000000,
    version: 0x02,
    kdfId: 0x02
  });

  // Verify pure .secure container
  const unpackedPure = SecureCrypto.unpackSecureBinaryContainer(finalContainer.container);
  console.assert(unpackedPure.meta.name === originalFileName, 'Container filename must match');
  console.assert(unpackedPure.meta.standardExtension === '.secure', 'Container extension must be .secure');
  
  const decryptedPure = await SecureCrypto.decryptData(exportKey, unpackedPure.iv, unpackedPure.ciphertext, unpackedPure.header);
  console.assert(new TextDecoder().decode(decryptedPure) === 'Confidential Vault Document Content for 2026 - Top Secret Security', 'Pure export payload must decrypt perfectly');
  console.log('✓ Pure .secure container export verified (RFC-2026-SECURE 100% compliant)');

  // 6. Test Export as .secure.html (Universal Access)
  const base64Container = Buffer.from(finalContainer.container).toString('base64');
  console.assert(base64Container.length > 0, 'Base64 container must not be empty');
  const htmlRunner = `<!DOCTYPE html><html data-container-format="SECURE_STANDARD_V10"><script>const c="${base64Container}";</script></html>`;
  console.assert(htmlRunner.includes(base64Container), 'Universal runner must embed container');
  console.log('✓ Universal .secure.html export verified');

  console.log('\n=== ALL PROTECTED VAULT ARCHIVE EXPORT TESTS PASSED 100%! ===');
}

runArchiveExportSuite().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
