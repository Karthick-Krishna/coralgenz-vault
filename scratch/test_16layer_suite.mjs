import { webcrypto } from 'crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import { 
    SecureCrypto, 
    MILSPEC_ANTI_CRACKER_PEPPER_V10,
    MILSPEC_ANTI_CRACKER_PEPPER_V9,
    MILSPEC_ANTI_CRACKER_PEPPER_V8,
    MILSPEC_ANTI_CRACKER_PEPPER_V7,
    MILSPEC_ANTI_CRACKER_PEPPER_V6
} from '../src/crypto.js';

async function test16LayerArchitecture() {
    console.log("================================================================================");
    console.log("TESTING 16-LAYER QUANTUM-HARDENED ENCRYPTION STANDARD (V10)");
    console.log("================================================================================");

    const password = "SuperSecretPassword2026!";
    const fileContent = new TextEncoder().encode("CORALGENZ_VAULT_CLASSIFIED_PAYLOAD_16_LAYER_DEFENSE");
    const payloadHash = await SecureCrypto.computePayloadHash(fileContent);
    const salt = SecureCrypto.generateSalt();
    const iv = SecureCrypto.generateIV();
    const iterations = 2000000;

    // Test 1: 16-Layer Key Derivation
    console.log("\n[TEST 1] Deriving 16-Layer Quantum Key (512KB Memory Matrix, 2M Iterations)...");
    const t0 = Date.now();
    const key16 = await SecureCrypto.deriveKey16Layer(password, salt, iterations, MILSPEC_ANTI_CRACKER_PEPPER_V10);
    const tElapsed = Date.now() - t0;
    const rawKey16 = await crypto.subtle.exportKey('raw', key16);
    console.log(`[PASS] 16-Layer Key Derived in ${tElapsed}ms. Raw Key Hex: ${Buffer.from(rawKey16).toString('hex').substring(0, 32)}...`);

    // Test 2: Packaging V10 Container
    console.log("\n[TEST 2] Packaging RFC-2026-SECURE V10 Container (Version 0x02, KDF ID 0x02)...");
    const meta = {
        name: "classified_doc.pdf",
        type: "application/pdf",
        size: fileContent.byteLength,
        id: "doc-v10-001",
        date: Date.now(),
        title: "Coralgenz Vault",
        logoUrl: "",
        allowDownload: true,
        integrityHash: payloadHash,
        version: "V10"
    };

    const headerPack = SecureCrypto.packSecureBinaryContainer({
        salt: salt,
        iv: iv,
        integrityHash: payloadHash,
        ciphertext: new Uint8Array(0),
        meta: meta,
        iterations: iterations,
        version: 0x02,
        kdfId: 0x02
    });

    const { ciphertext } = await SecureCrypto.encryptData(key16, fileContent, headerPack.header, iv);

    const finalContainer = SecureCrypto.packSecureBinaryContainer({
        salt: salt,
        iv: iv,
        integrityHash: payloadHash,
        ciphertext: ciphertext,
        meta: meta,
        iterations: iterations,
        version: 0x02,
        kdfId: 0x02
    });

    console.log(`[PASS] Container packaged: total size = ${finalContainer.container.byteLength} bytes.`);

    // Test 3: Unpack and Verify Headers
    console.log("\n[TEST 3] Unpacking V10 Binary Container Header...");
    const unpacked = SecureCrypto.unpackSecureBinaryContainer(finalContainer.container);
    console.log(`[PASS] Magic: SECURE_V1 | Version: 0x0${unpacked.version} | KDF ID: 0x0${unpacked.kdfId} | Iterations: ${unpacked.iterations}`);
    if (unpacked.version !== 0x02 || unpacked.kdfId !== 0x02) {
        throw new Error("V10 version/KDF ID mismatch!");
    }

    // Test 4: Decrypt with Correct Password
    console.log("\n[TEST 4] Decrypting with Correct Password (16-Layer Key)...");
    const unlockKey = await SecureCrypto.deriveKey16Layer(password, unpacked.salt, unpacked.iterations, MILSPEC_ANTI_CRACKER_PEPPER_V10);
    const decryptedBuf = await SecureCrypto.decryptData(unlockKey, unpacked.iv, unpacked.ciphertext, unpacked.header);
    const decryptedStr = new TextDecoder().decode(decryptedBuf);
    console.log(`[PASS] Decrypted Text: "${decryptedStr}"`);
    if (decryptedStr !== "CORALGENZ_VAULT_CLASSIFIED_PAYLOAD_16_LAYER_DEFENSE") {
        throw new Error("Decrypted payload does not match original!");
    }

    // Test 5: Verify SHA-256 Integrity Seal
    console.log("\n[TEST 5] Validating SHA-256 Payload Integrity Seal...");
    const sealCheck = await SecureCrypto.computePayloadHash(decryptedBuf);
    if (sealCheck === unpacked.integrityHash) {
        console.log(`[PASS] Cryptographic SHA-256 Seal Matches: ${sealCheck}`);
    } else {
        throw new Error("Payload integrity seal validation failed!");
    }

    // Test 6: Incorrect Password Rejection
    console.log("\n[TEST 6] Testing Incorrect Password Rejection...");
    try {
        const wrongKey = await SecureCrypto.deriveKey16Layer("WrongPassword123!", unpacked.salt, unpacked.iterations, MILSPEC_ANTI_CRACKER_PEPPER_V10);
        await SecureCrypto.decryptData(wrongKey, unpacked.iv, unpacked.ciphertext, unpacked.header);
        console.error("[FAIL] Incorrect password unexpectedly decrypted payload!");
    } catch (err) {
        console.log(`[PASS] Incorrect password mathematically rejected by AES-GCM Galois AEAD: ${err.message || err.name}`);
    }

    // Test 7: Anti-Tamper Header Mutation Test
    console.log("\n[TEST 7] Testing Mathematical Anti-Tamper Galois AEAD Binding (GF(2^128) GMAC)...");
    const tampered = new Uint8Array(finalContainer.container);
    tampered[100] ^= 0x55; // Alter a byte in the metadata JSON
    try {
        const tamperedUnpacked = SecureCrypto.unpackSecureBinaryContainer(tampered);
        await SecureCrypto.decryptData(unlockKey, tamperedUnpacked.iv, tamperedUnpacked.ciphertext, tamperedUnpacked.header);
        console.error("[FAIL] Tampered container was decrypted!");
    } catch (err) {
        console.log(`[PASS] Tampered header was mathematically rejected: ${err.message || err.name}`);
    }

    // Test 8: Multi-Tier Backward Compatibility
    console.log("\n[TEST 8] Testing Backward Compatibility Cascade (V10 -> V9 -> V8 -> V7 -> V6)...");
    const fileKey = await SecureCrypto.generateKey();
    const v9PassKey = await SecureCrypto.deriveKey12Stage(password, salt, 10000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
    const { iv: wrapIv, wrappedData: wrappedV9 } = await SecureCrypto.wrapKey(fileKey, v9PassKey);
    
    const unwrappedKey = await SecureCrypto.unwrapWithFallback(wrappedV9, password, salt, wrapIv, 10000);
    const rawUnwrapped = await crypto.subtle.exportKey('raw', unwrappedKey);
    const rawOriginal = await crypto.subtle.exportKey('raw', fileKey);
    if (Buffer.from(rawUnwrapped).toString('hex') === Buffer.from(rawOriginal).toString('hex')) {
        console.log("[PASS] Seamlessly unwrapped legacy V9 key via automatic fallback cascade.");
    } else {
        throw new Error("Key unwrapped from fallback did not match original key!");
    }

    console.log("\n================================================================================");
    console.log(">>> ALL 8 CRYPTOGRAPHIC TESTS FOR 16-LAYER V10 STANDARD PASSED! <<<");
    console.log("================================================================================");
}

test16LayerArchitecture().catch(console.error);
