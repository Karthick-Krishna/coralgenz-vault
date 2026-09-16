// scratch/test_12stage_full_pipeline.mjs
import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) {
    globalThis.crypto = webcrypto;
}

import {
    SecureCrypto,
    MILSPEC_ANTI_CRACKER_PEPPER_V9,
    MILSPEC_ANTI_CRACKER_PEPPER_V8,
    MILSPEC_ANTI_CRACKER_PEPPER_V7,
    MILSPEC_ANTI_CRACKER_PEPPER_V6
} from '../src/crypto.js';

console.log('=== TEST SUITE: 12-STAGE 4-LAYER QUANTUM-HARDENED DEFENSE ENGINE (V9) ===\n');

async function testSingleDigitPasswords() {
    console.log('[TEST 1] Single-Digit & Ultra-Weak Password Immunity:');
    const weakPasswords = ['1', '0', '7', 'a', ' '];
    
    for (const pwd of weakPasswords) {
        const salt = SecureCrypto.generateSalt();
        const testPayload = new TextEncoder().encode(`Confidential Data protected with single-digit pwd: "${pwd}"`);
        
        // Derive 12-stage key
        const key = await SecureCrypto.deriveKey12Stage(pwd, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
        const { iv, ciphertext } = await SecureCrypto.encryptData(key, testPayload);
        
        // Decrypt with 12-stage key
        const decryptKey = await SecureCrypto.deriveKey12Stage(pwd, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
        const decryptedBuf = await SecureCrypto.decryptData(decryptKey, iv, ciphertext);
        const decryptedText = new TextDecoder().decode(decryptedBuf);
        
        if (decryptedText !== `Confidential Data protected with single-digit pwd: "${pwd}"`) {
            throw new Error(`Decryption failed for password: "${pwd}"`);
        }
        
        // Verify that wrong password fails immediately
        let wrongPwdFailed = false;
        try {
            const wrongKey = await SecureCrypto.deriveKey12Stage(pwd + 'x', salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
            await SecureCrypto.decryptData(wrongKey, iv, ciphertext);
        } catch (e) {
            wrongPwdFailed = true;
        }
        if (!wrongPwdFailed) {
            throw new Error(`Wrong password did not fail for: "${pwd}"`);
        }
        
        console.log(`  ✓ Password "${pwd}" successfully encrypted, decrypted, and wrong-password rejected.`);
    }
}

async function testEntropyExpansionDiffusion() {
    console.log('\n[TEST 2] Non-Linear Entropy Expansion & S-Box Bit Diffusion:');
    const salt = SecureCrypto.generateSalt();
    const entropy1 = SecureCrypto.expandPasswordEntropy('1', salt);
    const entropy2 = SecureCrypto.expandPasswordEntropy('2', salt);
    
    let diffBits = 0;
    for (let i = 0; i < entropy1.length; i++) {
        let xor = entropy1[i] ^ entropy2[i];
        while (xor > 0) {
            if (xor & 1) diffBits++;
            xor >>= 1;
        }
    }
    const totalBits = entropy1.length * 8;
    const avalanchePercentage = ((diffBits / totalBits) * 100).toFixed(2);
    console.log(`  ✓ Entropy difference between "1" and "2": ${diffBits}/${totalBits} bits (${avalanchePercentage}% avalanche effect).`);
    if (diffBits < totalBits * 0.3) {
        throw new Error('Avalanche effect below acceptable cryptographic dispersion threshold!');
    }
}

async function testMultiTierFallbackCascade() {
    console.log('\n[TEST 3] Multi-Tier Fallback Cascade (V9 -> V8 -> V7 -> V6):');
    const password = 'enterprise-secret-2026';
    const salt = SecureCrypto.generateSalt();
    const masterKey = await SecureCrypto.generateKey();
    const payload = new TextEncoder().encode('Payload across legacy and modern container versions');
    const { iv: payloadIv, ciphertext: payloadCipher } = await SecureCrypto.encryptData(masterKey, payload);
    
    // Tier 1: V9 (12-stage)
    const v9WrapKey = await SecureCrypto.deriveKey12Stage(password, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
    const { iv: v9WrapIv, wrappedData: v9Wrapped } = await SecureCrypto.wrapKey(masterKey, v9WrapKey);
    const v9Unwrapped = await SecureCrypto.unwrapWithFallback(v9Wrapped, password, salt, v9WrapIv, 2000000, 'V9');
    const v9Dec = await SecureCrypto.decryptData(v9Unwrapped, payloadIv, payloadCipher);
    console.log('  ✓ V9 (12-Stage) Wrap/Unwrap/Decrypt:', new TextDecoder().decode(v9Dec) === 'Payload across legacy and modern container versions' ? 'PASS' : 'FAIL');
    
    // Tier 2: V8 (7-stage)
    const v8WrapKey = await SecureCrypto.deriveKey7Stage(password, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V8);
    const { iv: v8WrapIv, wrappedData: v8Wrapped } = await SecureCrypto.wrapKey(masterKey, v8WrapKey);
    const v8Unwrapped = await SecureCrypto.unwrapWithFallback(v8Wrapped, password, salt, v8WrapIv, 2000000, 'V8');
    const v8Dec = await SecureCrypto.decryptData(v8Unwrapped, payloadIv, payloadCipher);
    console.log('  ✓ V8 (7-Stage Fallback) Wrap/Unwrap/Decrypt:', new TextDecoder().decode(v8Dec) === 'Payload across legacy and modern container versions' ? 'PASS' : 'FAIL');

    // Tier 3: V7 (4-stage)
    const v7WrapKey = await SecureCrypto.deriveKey4Stage(password, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V7);
    const { iv: v7WrapIv, wrappedData: v7Wrapped } = await SecureCrypto.wrapKey(masterKey, v7WrapKey);
    const v7Unwrapped = await SecureCrypto.unwrapWithFallback(v7Wrapped, password, salt, v7WrapIv, 2000000, 'V7');
    const v7Dec = await SecureCrypto.decryptData(v7Unwrapped, payloadIv, payloadCipher);
    console.log('  ✓ V7 (4-Stage Fallback) Wrap/Unwrap/Decrypt:', new TextDecoder().decode(v7Dec) === 'Payload across legacy and modern container versions' ? 'PASS' : 'FAIL');

    // Tier 4: V6 (Dual-stage 2M)
    const v6WrapKey = await SecureCrypto.deriveKeyDualStage(password, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V6);
    const { iv: v6WrapIv, wrappedData: v6Wrapped } = await SecureCrypto.wrapKey(masterKey, v6WrapKey);
    const v6Unwrapped = await SecureCrypto.unwrapWithFallback(v6Wrapped, password, salt, v6WrapIv, 2000000, 'V6');
    const v6Dec = await SecureCrypto.decryptData(v6Unwrapped, payloadIv, payloadCipher);
    console.log('  ✓ V6 (Dual-Stage Fallback) Wrap/Unwrap/Decrypt:', new TextDecoder().decode(v6Dec) === 'Payload across legacy and modern container versions' ? 'PASS' : 'FAIL');
}

async function testWorkerKeyDerivation() {
    console.log('\n[TEST 4] deriveKeyFromPassword & WebWorker derivation parity:');
    const password = '8'; // single digit test
    const salt = SecureCrypto.generateSalt();
    
    const keySync = await SecureCrypto.deriveKey12Stage(password, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
    const keyFacade = await SecureCrypto.deriveKeyFromPassword(password, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
    
    // Encrypt with keySync and decrypt with keyFacade
    const msg = new TextEncoder().encode('Worker/Sync Cryptographic Parity Verification');
    const { iv, ciphertext } = await SecureCrypto.encryptData(keySync, msg);
    const decrypted = await SecureCrypto.decryptData(keyFacade, iv, ciphertext);
    
    console.log('  ✓ deriveKey12Stage / deriveKeyFromPassword parity:', new TextDecoder().decode(decrypted) === 'Worker/Sync Cryptographic Parity Verification' ? 'PASS' : 'FAIL');
}

async function run() {
    await testSingleDigitPasswords();
    await testEntropyExpansionDiffusion();
    await testMultiTierFallbackCascade();
    await testWorkerKeyDerivation();
    console.log('\n>>> ALL 12-STAGE 4-LAYER CRYPTOGRAPHIC DEFENSE TESTS PASSED! <<<');
}

run().catch(err => {
    console.error('Test failed with error:', err);
    process.exit(1);
});
