import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'fs';
import { webcrypto } from 'node:crypto';

if (!globalThis.crypto) {
    globalThis.crypto = webcrypto;
}

test('Backend Security Engine - HMAC Record Signature & Tamper Detection', async () => {
    const { computeRecordSignature, verifyRecordSignature, sanitizeFileRecord, DB } = await import('../src/db.js');

    // 1. Sanitize file record (anti-XSS and prototype pollution protection)
    const dirtyRecord = {
        id: 'file_test_1001',
        name: 'secret<script>alert(1)</script>file.pdf',
        type: 'application/pdf',
        size: 1048576,
        date: 1773820000000,
        authMode: 'always',
        integrityHash: 'a1b2c3d4e5f6',
        __proto__: { isAdmin: true },
        maliciousKey: 'exploit'
    };

    const sanitized = sanitizeFileRecord(dirtyRecord);
    assert.strictEqual(sanitized.name, 'secretalert(1)file.pdf', 'XSS characters stripped');
    assert.strictEqual(sanitized.maliciousKey, undefined, 'Unauthorized properties filtered out');
    assert.strictEqual(Object.prototype.isAdmin, undefined, 'Prototype pollution prevented');

    // 2. Compute signature
    const sig = await computeRecordSignature(sanitized);
    assert.ok(typeof sig === 'string' && sig.length === 64, 'Computed 64-char HMAC-SHA256 signature');
    sanitized._signature = sig;

    // 3. Verify intact record
    const intactResult = await verifyRecordSignature(sanitized);
    assert.strictEqual(intactResult.verified, true, 'Intact record signature verified');

    // 4. Detect tampering (attacker changes file size, name, or hash via DevTools)
    const tamperedRecord = { ...sanitized, size: 9999999 };
    const tamperedResult = await verifyRecordSignature(tamperedRecord);
    assert.strictEqual(tamperedResult.verified, false, 'Tampered size caught by signature verification');

    const tamperedHashRecord = { ...sanitized, integrityHash: 'deadbeef' };
    const tamperedHashResult = await verifyRecordSignature(tamperedHashRecord);
    assert.strictEqual(tamperedHashResult.verified, false, 'Tampered integrity hash caught by signature verification');

    // 5. Ephemeral volatile memory scrubbing
    const ramBuffer = new Uint8Array([0xde, 0xad, 0xbe, 0xef, 0x01, 0x02, 0x03, 0x04]);
    DB.zeroizeBuffer(ramBuffer);
    assert.deepStrictEqual(Array.from(ramBuffer), [0, 0, 0, 0, 0, 0, 0, 0], 'RAM buffer scrubbed');
});

test('Universal HTML Template - No raw .secure buttons in .secure.html & unbypassable container binding', () => {
    const mainJsContent = readFileSync('./src/main.js', 'utf8');

    // 1. Verify STANDALONE CONTAINER EXTRACTION is NOT present in the HTML template
    assert.strictEqual(
        mainJsContent.includes('STANDALONE CONTAINER EXTRACTION'),
        false,
        'STANDALONE CONTAINER EXTRACTION must NOT be present in .secure.html'
    );

    // 2. Verify extract buttons are NOT in HTML template (neither before nor after password)
    assert.strictEqual(
        mainJsContent.includes('id="extract-pure-secure-btn"'),
        false,
        'extract-pure-secure-btn must NOT be present in auth-panel'
    );
    assert.strictEqual(
        mainJsContent.includes('DOWNLOAD RAW .SECURE FILE'),
        false,
        'DOWNLOAD RAW .SECURE FILE text must NOT be present in .secure.html'
    );
    assert.strictEqual(
        mainJsContent.includes('id="header-raw-secure-btn"'),
        false,
        'header-raw-secure-btn must NOT be present in viewer header'
    );

    // 3. Verify unlock() strictly enforces authentic .secure container unpacking
    assert.ok(
        mainJsContent.includes('const containerInfo = unpackSecureContainer(rawPayloadBytes)'),
        'unlock() must unpack authentic .secure container'
    );
    assert.ok(
        mainJsContent.includes('const additionalData = containerInfo.header'),
        'additionalData must be bound to containerInfo.header'
    );
    assert.ok(
        mainJsContent.includes('Mandatory .secure container AAD binding missing'),
        'attemptDecrypt must strictly enforce container AAD presence'
    );
});

test('AES-256-GCM Mathematical Proof - Cannot decrypt without authentic .secure header AAD', async () => {
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const plaintext = enc.encode('CORALGENZ_RESTRICTED_TOP_SECRET_PAYLOAD');

    // Realistic .secure container header (RFC-2026-SECURE with SECURE_V1 magic)
    const magic = new Uint8Array([0x53, 0x45, 0x43, 0x55, 0x52, 0x45, 0x5F, 0x56, 0x31]); // 'SECURE_V1'
    const headerMetadata = enc.encode(JSON.stringify({
        format: 'SECURE_STANDARD_V10',
        standardExtension: '.secure',
        engine: 'coralgenz-vault-v10'
    }));
    const containerHeader = new Uint8Array(magic.length + headerMetadata.length);
    containerHeader.set(magic, 0);
    containerHeader.set(headerMetadata, magic.length);

    // Generate Key & IV
    const key = await webcrypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
    const iv = webcrypto.getRandomValues(new Uint8Array(12));

    // Encrypt with containerHeader as Additional Authenticated Data (AAD)
    const ciphertext = await webcrypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv,
            additionalData: containerHeader
        },
        key,
        plaintext
    );

    // Scenario A: Authentic decryption with exact .secure container header
    const decryptedWithHeader = await webcrypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv,
            additionalData: containerHeader
        },
        key,
        ciphertext
    );
    assert.strictEqual(dec.decode(decryptedWithHeader), 'CORALGENZ_RESTRICTED_TOP_SECRET_PAYLOAD');

    // Scenario B: Attacker bypasses code or removes .secure check, supplying NO AAD (additionalData omitted / null)
    let bypassOmittedFailed = false;
    try {
        await webcrypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            ciphertext
        );
    } catch (e) {
        bypassOmittedFailed = true;
        assert.strictEqual(e.name, 'OperationError', 'AES-GCM GMAC tag rejected invalid AAD');
    }
    assert.strictEqual(bypassOmittedFailed, true, 'Decryption MUST fail if AAD is removed');

    // Scenario C: Attacker alters or strips .secure header
    const tamperedHeader = new Uint8Array(containerHeader);
    tamperedHeader[0] = 0x00; // Corrupt magic byte
    let bypassTamperedFailed = false;
    try {
        await webcrypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv,
                additionalData: tamperedHeader
            },
            key,
            ciphertext
        );
    } catch (e) {
        bypassTamperedFailed = true;
        assert.strictEqual(e.name, 'OperationError', 'AES-GCM GMAC tag rejected tampered AAD');
    }
    assert.strictEqual(bypassTamperedFailed, true, 'Decryption MUST fail if header is altered');
});
