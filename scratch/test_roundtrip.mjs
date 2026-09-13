import crypto from 'node:crypto';

const webcrypto = globalThis.crypto;

const MILSPEC_PEPPER_V6 = "CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821";

async function deriveKeyDualStage(pwdStr, saltBytes, pepperStr, rounds) {
    const enc = new TextEncoder();
    const pepperBytes = enc.encode(pepperStr);
    const pwdBytes = enc.encode(pwdStr);
    const combined = new Uint8Array(pepperBytes.length + pwdBytes.length);
    combined.set(pepperBytes, 0);
    combined.set(pwdBytes, pepperBytes.length);

    const hmacKey = await webcrypto.subtle.importKey(
        'raw',
        saltBytes,
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
    );
    const preHash = await webcrypto.subtle.sign('HMAC', hmacKey, combined);
    combined.fill(0);
    pwdBytes.fill(0);

    const keyMaterial = await webcrypto.subtle.importKey(
        'raw',
        preHash,
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return await webcrypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: saltBytes, iterations: rounds, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
}

async function run() {
    console.log('Testing Dual-Stage KDF 2,000,000 rounds roundtrip...');
    const pwd = "TestPassword123!@#";
    const salt = webcrypto.getRandomValues(new Uint8Array(32));
    const iv = webcrypto.getRandomValues(new Uint8Array(12));
    const secretMessage = new TextEncoder().encode("Hello Coralgenz Vault! Zero Knowledge Test Payload.");

    console.time('Derive Key (2,000,000 iterations)');
    const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V6, 2000000);
    console.timeEnd('Derive Key (2,000,000 iterations)');

    // Encrypt
    const ciphertext = await webcrypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        secretMessage
    );
    console.log('Ciphertext byte length:', ciphertext.byteLength);

    // Decrypt using newly derived key from same password
    console.time('Decryption Key Derivation (2,000,000 iterations)');
    const decryptKey = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V6, 2000000);
    console.timeEnd('Decryption Key Derivation (2,000,000 iterations)');

    const decrypted = await webcrypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        decryptKey,
        ciphertext
    );

    const decryptedText = new TextDecoder().decode(decrypted);
    console.log('Decrypted text matches:', decryptedText === "Hello Coralgenz Vault! Zero Knowledge Test Payload.");
    console.log('Decrypted content:', decryptedText);
}

run().catch(console.error);
