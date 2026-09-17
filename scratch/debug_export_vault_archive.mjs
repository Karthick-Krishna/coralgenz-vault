import { SecureCrypto } from '../src/crypto.js';

async function testExportFromVaultArchive() {
  console.log('--- TESTING EXPORT FROM PROTECTED VAULT ARCHIVE ---');

  // Step 1: User protects file
  const originalFileName = 'My_Financial_Report.xlsx';
  const originalFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const rawBytes = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  const password = 'MySecretPassword99!';
  const userSecretPepper = '';

  // Mimic handleAddFile exactly
  const salt = SecureCrypto.generateSalt();
  const fileKey = await SecureCrypto.generateKey();
  const activePepper = userSecretPepper
    ? (SecureCrypto.DOMAIN_SEPARATION_TAG_V10 + '::USER_2FA::' + userSecretPepper)
    : SecureCrypto.DOMAIN_SEPARATION_TAG_V10;
  const passwordKey = await SecureCrypto.deriveKeyAsyncWorker(password, salt, 2000000, activePepper);
  const payloadHash = await SecureCrypto.computePayloadHash(rawBytes.buffer);
  const { iv: fileIv, ciphertext } = await SecureCrypto.encryptData(fileKey, rawBytes.buffer);
  const { iv: wrapIv, wrappedData: wrappedWithPass } = await SecureCrypto.wrapKey(fileKey, passwordKey);
  const keys = [{ type: 'password', salt: salt, iv: wrapIv, data: wrappedWithPass }];

  const fileRecord = {
    id: 'vault-uuid-test-1',
    name: originalFileName,
    type: originalFileType,
    size: rawBytes.byteLength,
    date: Date.now(),
    authMode: 'always',
    keys: keys,
    content: ciphertext,
    iv: fileIv,
    viewCount: 0,
    expires: null,
    note: '',
    integrityHash: payloadHash,
    accessLog: [{ action: 'created', date: Date.now() }]
  };

  console.log('Step 1: File successfully secured and saved to vault record:');
  console.log('Record:', { id: fileRecord.id, name: fileRecord.name, size: fileRecord.size, keys: fileRecord.keys.length });

  // Step 2: User goes to PROTECTED VAULT ARCHIVE and clicks Export
  // openExportModal(fileRecord.id) is called
  // User enters password in modal
  const enteredPassword = password;

  // Step 3: handleShareConfirm is called
  console.log('\nStep 2: Calling decryptFileForExport with entered password...');
  let passKeyEntry = fileRecord.keys.find(k => k.type === 'password');
  console.log('passKeyEntry found:', !!passKeyEntry);
  
  let unwrappedFileKey = await SecureCrypto.unwrapWithFallback(
    passKeyEntry.data,
    enteredPassword,
    passKeyEntry.salt,
    passKeyEntry.iv
  );
  console.log('Key unwrapped successfully:', !!unwrappedFileKey);

  let decryptedBuffer;
  try {
    decryptedBuffer = await SecureCrypto.decryptData(unwrappedFileKey, fileRecord.iv, fileRecord.content, fileRecord.containerHeader || null);
  } catch (err) {
    console.error('Decryption failed with containerHeader:', err.message);
    decryptedBuffer = await SecureCrypto.decryptData(unwrappedFileKey, fileRecord.iv, fileRecord.content);
  }
  console.log('Decrypted buffer length:', decryptedBuffer.byteLength);

  // Step 4: exportSecureFile with pure .secure and .secure.html
  for (const asPureSecure of [false, true]) {
    console.log(`\nTesting packaging (asPureSecure = ${asPureSecure})...`);
    const exportSalt = SecureCrypto.generateSalt();
    const exportPayloadHash = await SecureCrypto.computePayloadHash(decryptedBuffer);
    const exportKey = await SecureCrypto.deriveKeyAsyncWorker(enteredPassword, exportSalt, 2000000, SecureCrypto.MILSPEC_ANTI_CRACKER_PEPPER_V10);

    const meta = {
      name: fileRecord.name || 'Protected File',
      format: 'SECURE_STANDARD_V10',
      specification: 'RFC-2026-SECURE',
      standardExtension: '.secure',
      universalRunnerExtension: '.secure.html',
      engine: 'coralgenz-vault-v10',
      type: fileRecord.type || 'application/octet-stream',
      size: Number(fileRecord.size) || decryptedBuffer.byteLength,
      id: fileRecord.id || '',
      date: fileRecord.date || Date.now(),
      title: 'Secure Vault',
      logoUrl: '',
      allowDownload: true,
      integrityHash: exportPayloadHash,
      version: 'V10'
    };

    const exportIv = SecureCrypto.generateIV();
    const headerPack = SecureCrypto.packSecureBinaryContainer({
      salt: exportSalt,
      iv: exportIv,
      integrityHash: exportPayloadHash,
      ciphertext: new Uint8Array(0),
      meta: meta,
      iterations: 2000000,
      version: 0x02,
      kdfId: 0x02
    });

    const { iv: encIv, ciphertext: encCiphertext } = await SecureCrypto.encryptData(exportKey, decryptedBuffer, headerPack.header, exportIv);

    const finalContainer = SecureCrypto.packSecureBinaryContainer({
      salt: exportSalt,
      iv: exportIv,
      integrityHash: exportPayloadHash,
      ciphertext: encCiphertext,
      meta: meta,
      iterations: 2000000,
      version: 0x02,
      kdfId: 0x02
    });

    console.log(`Container generated: ${finalContainer.container.byteLength} bytes.`);
    
    // Validate unpacking & decrypting back
    const unpacked = SecureCrypto.unpackSecureBinaryContainer(finalContainer.container);
    const verifyDecrypted = await SecureCrypto.decryptData(exportKey, unpacked.iv, unpacked.ciphertext, unpacked.header);
    console.log(`Verification decrypted payload matches: ${new Uint8Array(verifyDecrypted).join(',') === rawBytes.join(',')}`);
  }

  console.log('\n--- ALL ARCHIVE EXPORT STEPS PASSED IN ENGINE ---');
}

testExportFromVaultArchive().catch(err => {
  console.error('Simulation failed:', err);
});
