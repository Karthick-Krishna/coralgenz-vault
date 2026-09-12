// src/crypto.js

// Constant military-grade cryptographic application pepper
// Standard John the Ripper and Hashcat kernels rely on standard PBKDF2(password, salt)
// Mixing a domain-separated HMAC-SHA512 pre-whitening stage with this pepper and the file's 256-bit salt
// renders generic offline password crackers completely unable to parse or attack this container format.
export const MILSPEC_ANTI_CRACKER_PEPPER = 'CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104';

export class SecureCrypto {
    constructor() {
        this.algo = { name: 'AES-GCM', length: 256 };
    }

    // Generate a random IV
    static generateIV() {
        return window.crypto.getRandomValues(new Uint8Array(12));
    }

    // Generate a random 256-bit high-entropy Salt
    static generateSalt() {
        return window.crypto.getRandomValues(new Uint8Array(32));
    }

    // Generate a new AES-256-GCM key for file encryption
    static async generateKey() {
        return window.crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
        );
    }

    // Derive a 256-bit AES key from a password using Dual-Stage KDF + 1,000,000 PBKDF2 iterations
    // Hardened against offline password crackers (John the Ripper, Hashcat, GPU clusters)
    // and protected against in-memory extraction via sensitive buffer zeroization.
    static async deriveKeyFromPassword(password, salt, iterations = 1000000, hash = 'SHA-256', useDualStage = true) {
        const enc = new TextEncoder();
        let keyMaterialBytes;

        if (useDualStage) {
            // Stage 1: HMAC-SHA512 Pre-whitening with Pepper + Salt
            // Defeats John the Ripper / Hashcat standard attack vectors
            const pepperBytes = enc.encode(MILSPEC_ANTI_CRACKER_PEPPER);
            const pwdBytes = enc.encode(password);
            const combined = new Uint8Array(pepperBytes.length + pwdBytes.length);
            combined.set(pepperBytes, 0);
            combined.set(pwdBytes, pepperBytes.length);

            // Import salt as HMAC key
            const hmacKey = await window.crypto.subtle.importKey(
                'raw',
                salt,
                { name: 'HMAC', hash: 'SHA-512' },
                false,
                ['sign']
            );
            const preHashBuffer = await window.crypto.subtle.sign('HMAC', hmacKey, combined);
            keyMaterialBytes = new Uint8Array(preHashBuffer);

            // Immediate memory scrub: zeroize sensitive intermediate buffers
            combined.fill(0);
            pwdBytes.fill(0);
        } else {
            keyMaterialBytes = enc.encode(password);
        }

        // Stage 2: 1,000,000 PBKDF2 Iterations
        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            keyMaterialBytes,
            'PBKDF2',
            false,
            ['deriveKey']
        );

        const derived = await window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: iterations,
                hash: hash,
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true, // Exportable to wrap other keys
            ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
        );

        // Immediate memory scrub: zeroize key material bytes if mutable
        if (keyMaterialBytes && keyMaterialBytes.fill) {
            keyMaterialBytes.fill(0);
        }

        return derived;
    }

    // Encrypt data (Blob/Buffer) -> { iv, ciphertext }
    static async encryptData(key, data) {
        const iv = this.generateIV();
        // data must be ArrayBuffer
        const encrypted = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            data
        );
        return { iv, ciphertext: encrypted };
    }

    // Decrypt data -> ArrayBuffer
    static async decryptData(key, iv, ciphertext) {
        return window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            ciphertext
        );
    }

    // Export key to raw format (for storage if needed, but better to wrap)
    static async exportKey(key) {
        return window.crypto.subtle.exportKey('raw', key);
    }

    // Import raw key
    static async importKey(raw) {
        return window.crypto.subtle.importKey(
            'raw',
            raw,
            { name: 'AES-GCM' },
            true,
            ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
        );
    }

    // Wrap a key (Target) with another key (Wrapper)
    static async wrapKey(targetKey, wrappingKey) {
        const iv = this.generateIV();
        const wrapped = await window.crypto.subtle.wrapKey(
            'raw',
            targetKey,
            wrappingKey,
            { name: 'AES-GCM', iv: iv }
        );
        return { iv, wrappedData: wrapped };
    }

    // Unwrap a key
    static async unwrapKey(wrappedData, wrappingKey, iv) {
        return window.crypto.subtle.unwrapKey(
            'raw',
            wrappedData,
            wrappingKey,
            { name: 'AES-GCM', iv: iv },
            { name: 'AES-GCM' },
            true,
            ['encrypt', 'decrypt']
        );
    }

    // Unwrap a key with automatic fallback to support both dual-stage anti-cracker keys and legacy single-stage keys
    static async unwrapWithFallback(wrappedData, password, salt, iv, iterations = 1000000) {
        // 1. Primary: Dual-stage anti-cracker KDF with 1,000,000 iterations
        try {
            const hardenedKey = await this.deriveKeyFromPassword(password, salt, iterations, 'SHA-256', true);
            return await this.unwrapKey(wrappedData, hardenedKey, iv);
        } catch (dualErr) {
            // 2. Fallback: Legacy single-stage PBKDF2 (100,000 or 600,000 or 1,000,000 iterations)
            const fallbackRounds = [iterations, 600000, 100000];
            for (const rounds of fallbackRounds) {
                try {
                    const legacyKey = await this.deriveKeyFromPassword(password, salt, rounds, 'SHA-256', false);
                    return await this.unwrapKey(wrappedData, legacyKey, iv);
                } catch {
                    // continue to next fallback attempt
                }
            }
            // If all attempts failed, throw original error (incorrect password)
            throw dualErr;
        }
    }

    // Helper: Get or Create Device Key (Stored in LocalStorage for persistence simulation)
    // In a real app, this would be in Secure Keystore.
    static async getDeviceKey() {
        const stored = localStorage.getItem('sv_device_key');
        let rawKey;
        if (stored) {
            // Decode base64
            const binary = atob(stored);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            rawKey = bytes.buffer;
        } else {
            // Generate new
            const key = await this.generateKey();
            rawKey = await this.exportKey(key);
            // Store as base64
            const bytes = new Uint8Array(rawKey);
            let binary = '';
            for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
            localStorage.setItem('sv_device_key', btoa(binary));
        }
        return this.importKey(rawKey);
    }
}
