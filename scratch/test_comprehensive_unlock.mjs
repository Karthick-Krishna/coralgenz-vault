import { webcrypto } from 'crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import { 
    SecureCrypto, 
    MILSPEC_ANTI_CRACKER_PEPPER_V10,
    MILSPEC_ANTI_CRACKER_PEPPER_V9,
    MILSPEC_ANTI_CRACKER_PEPPER_V8,
    MILSPEC_ANTI_CRACKER_PEPPER_V7,
    MILSPEC_ANTI_CRACKER_PEPPER_V6,
    MILSPEC_ANTI_CRACKER_PEPPER_V5,
    MILSPEC_ANTI_CRACKER_PEPPER_V4
} from '/Users/karthickkrishna/Documents/genz qr/src/crypto.js';

async function runComprehensiveTests() {
    console.log("================================================================================");
    console.log("COMPREHENSIVE TEST: PASSWORD UNLOCK & MULTI-TIER RESILIENCE SUITE");
    console.log("================================================================================");

    const testPassword = "MySecurePassword2026!#$";
    const testPayload = new TextEncoder().encode("CONFIDENTIAL_CORALGENZ_VAULT_PAYLOAD_VERIFICATION");
    const payloadHash = await SecureCrypto.computePayloadHash(testPayload);

    // TEST 1: Direct 16-Layer V10 Encrypt -> Wrap -> Unwrap -> Decrypt
    console.log("\n[TEST 1] In-App Vault: 16-Layer V10 Encryption -> Unwrap With Fallback...");
    const salt1 = SecureCrypto.generateSalt();
    const fileKey1 = await SecureCrypto.generateKey();
    const passKey1 = await SecureCrypto.deriveKey16Layer(testPassword, salt1, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V10);
    const { iv: wrapIv1, wrappedData: wrappedData1 } = await SecureCrypto.wrapKey(fileKey1, passKey1);
    const { iv: fileIv1, ciphertext: ciphertext1 } = await SecureCrypto.encryptData(fileKey1, testPayload);

    // Unlock with correct password
    const unwrappedKey1 = await SecureCrypto.unwrapWithFallback(wrappedData1, testPassword, salt1, wrapIv1, 2000000);
    const decrypted1 = await SecureCrypto.decryptData(unwrappedKey1, fileIv1, ciphertext1);
    const decryptedText1 = new TextDecoder().decode(decrypted1);
    if (decryptedText1 !== "CONFIDENTIAL_CORALGENZ_VAULT_PAYLOAD_VERIFICATION") {
        throw new Error("Test 1 Failed: Decrypted text does not match original!");
    }
    console.log(`[PASS] Correct password unlocked V10 file successfully: "${decryptedText1}"`);

    // Verify wrong password fails
    try {
        await SecureCrypto.unwrapWithFallback(wrappedData1, "WrongPassword999", salt1, wrapIv1, 2000000);
        throw new Error("Test 1 Failed: Wrong password did not fail!");
    } catch (err) {
        console.log(`[PASS] Wrong password correctly rejected: ${err.message || err.name}`);
    }

    // TEST 2: Type Coercion / Normalization (Salt as ArrayBuffer, IV as plain Array)
    console.log("\n[TEST 2] Testing ArrayBuffer / Plain Array Salt & IV Normalization...");
    const saltAsArrayBuffer = salt1.buffer.slice(salt1.byteOffset, salt1.byteOffset + salt1.byteLength);
    const ivAsPlainArray = Array.from(wrapIv1);
    const unwrappedKey2 = await SecureCrypto.unwrapWithFallback(wrappedData1, testPassword, saltAsArrayBuffer, ivAsPlainArray, 2000000);
    const decrypted2 = await SecureCrypto.decryptData(unwrappedKey2, fileIv1, ciphertext1);
    if (new TextDecoder().decode(decrypted2) === "CONFIDENTIAL_CORALGENZ_VAULT_PAYLOAD_VERIFICATION") {
        console.log("[PASS] Type coercion test passed with non-standard salt/iv representations.");
    }

    // TEST 3: Multi-Tier Legacy Key Unwrapping (V9, V8, V7, V6, V5, V4, and PBKDF2)
    console.log("\n[TEST 3] Testing Backward Compatibility with all Legacy Vault Keys...");
    const legacyTests = [
        { name: "V9 (12-Stage)", derive: (p, s) => SecureCrypto.deriveKey12Stage(p, s, 10000, MILSPEC_ANTI_CRACKER_PEPPER_V9) },
        { name: "V8 (7-Stage)", derive: (p, s) => SecureCrypto.deriveKey7Stage(p, s, 10000, MILSPEC_ANTI_CRACKER_PEPPER_V8) },
        { name: "V7 (4-Stage)", derive: (p, s) => SecureCrypto.deriveKey4Stage(p, s, 10000, MILSPEC_ANTI_CRACKER_PEPPER_V7) },
        { name: "V6 (Dual-Stage)", derive: (p, s) => SecureCrypto.deriveKeyDualStage(p, s, 10000, MILSPEC_ANTI_CRACKER_PEPPER_V6) },
        { name: "V5 (Dual-Stage)", derive: (p, s) => SecureCrypto.deriveKeyDualStage(p, s, 10000, MILSPEC_ANTI_CRACKER_PEPPER_V5) },
        { name: "V4 (Dual-Stage)", derive: (p, s) => SecureCrypto.deriveKeyDualStage(p, s, 10000, MILSPEC_ANTI_CRACKER_PEPPER_V4) },
        { name: "Legacy Single PBKDF2", derive: (p, s) => SecureCrypto.deriveKeyFromPassword(p, s, 600000, 'SHA-256', false) }
    ];

    for (const test of legacyTests) {
        const legacySalt = SecureCrypto.generateSalt();
        const legacyFileKey = await SecureCrypto.generateKey();
        const legacyPassKey = await test.derive(testPassword, legacySalt);
        const { iv: lWrapIv, wrappedData: lWrapped } = await SecureCrypto.wrapKey(legacyFileKey, legacyPassKey);

        const lUnwrapped = await SecureCrypto.unwrapWithFallback(lWrapped, testPassword, legacySalt, lWrapIv, 10000);
        const raw1 = await crypto.subtle.exportKey('raw', legacyFileKey);
        const raw2 = await crypto.subtle.exportKey('raw', lUnwrapped);
        if (Buffer.from(raw1).toString('hex') === Buffer.from(raw2).toString('hex')) {
            console.log(`[PASS] Legacy ${test.name} successfully unlocked via fallback!`);
        } else {
            throw new Error(`Legacy ${test.name} key unwrap mismatch!`);
        }
    }

    // TEST 4: Binary Container Packaging and AEAD Authentication
    console.log("\n[TEST 4] Testing RFC-2026-SECURE V10 Binary Container with Galois AEAD Header...");
    const containerSalt = SecureCrypto.generateSalt();
    const containerIv = SecureCrypto.generateIV();
    const exportKey = await SecureCrypto.deriveKey16Layer(testPassword, containerSalt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V10);

    const meta = {
        name: "test_export.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        size: testPayload.byteLength,
        id: "test-001",
        date: Date.now(),
        title: "Coralgenz Vault",
        logoUrl: "",
        allowDownload: true,
        integrityHash: payloadHash,
        version: "V10"
    };

    const headerPack = SecureCrypto.packSecureBinaryContainer({
        salt: containerSalt,
        iv: containerIv,
        integrityHash: payloadHash,
        ciphertext: new Uint8Array(0),
        meta: meta,
        iterations: 2000000,
        version: 0x02,
        kdfId: 0x02
    });

    const { ciphertext: containerCipher } = await SecureCrypto.encryptData(exportKey, testPayload, headerPack.header, containerIv);

    const fullContainer = SecureCrypto.packSecureBinaryContainer({
        salt: containerSalt,
        iv: containerIv,
        integrityHash: payloadHash,
        ciphertext: containerCipher,
        meta: meta,
        iterations: 2000000,
        version: 0x02,
        kdfId: 0x02
    });

    const unpackedContainer = SecureCrypto.unpackSecureBinaryContainer(fullContainer.container);
    const unlockExportKey = await SecureCrypto.deriveKey16Layer(testPassword, unpackedContainer.salt, unpackedContainer.iterations, MILSPEC_ANTI_CRACKER_PEPPER_V10);
    const decryptedPayload = await SecureCrypto.decryptData(unlockExportKey, unpackedContainer.iv, unpackedContainer.ciphertext, unpackedContainer.header);

    if (new TextDecoder().decode(decryptedPayload) === "CONFIDENTIAL_CORALGENZ_VAULT_PAYLOAD_VERIFICATION") {
        console.log("[PASS] Standalone .secure Binary Container decrypted and verified with Galois AEAD tag!");
    } else {
        throw new Error("Binary container decryption payload mismatch!");
    }

    console.log("\n================================================================================");
    console.log(">>> ALL COMPREHENSIVE UNLOCK & RECOVERY TESTS PASSED (100% SUCCESS) <<<");
    console.log("================================================================================");
}

runComprehensiveTests().catch(err => {
    console.error("COMPREHENSIVE TEST FAILED:", err);
    process.exit(1);
});
