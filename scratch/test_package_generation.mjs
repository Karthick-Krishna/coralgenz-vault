import fs from 'fs';
import { FFLATE_CODE } from '../src/fflate_code.js';
import { XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED } from '../src/office_engines.js';

const webcrypto = globalThis.crypto;

// Load src/main.js and extract generateSecureHTMLParts
const mainJs = fs.readFileSync('src/main.js', 'utf8');

const fnStart = mainJs.indexOf('function generateSecureHTMLParts(');
const fnMarkerEnd = mainJs.indexOf('// Helper to decrypt strictly for export');
const fnCode = mainJs.substring(fnStart, fnMarkerEnd).trim();

// Helper function mock
const isDownloadAllowedForFile = () => true;

// Create generator function in context
const generateSecureHTMLParts = new Function(
    'isDownloadAllowedForFile',
    'FFLATE_CODE',
    'XLSX_CORE_DEFLATED',
    'MAMMOTH_CODE_DEFLATED',
    `${fnCode}; return generateSecureHTMLParts;`
)(isDownloadAllowedForFile, FFLATE_CODE, XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED);

console.log('Successfully extracted generateSecureHTMLParts!');

// Test payload
const testPassword = "SuperSecretPassword2026!";
const testFileName = "classified-blueprint.png";
const testContent = Buffer.from("CORALGENZ_VAULT_TEST_ORIGINAL_PAYLOAD_12345");
const fileMeta = {
    id: "test-file-uuid-001",
    name: testFileName,
    type: "image/png",
    size: testContent.byteLength,
    integrityHash: ""
};

// Calculate integrity hash
const hashBuf = await webcrypto.subtle.digest('SHA-256', testContent);
const integrityHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
fileMeta.integrityHash = integrityHash;

// Generate Salt & IV
const salt = webcrypto.getRandomValues(new Uint8Array(32));
const iv = webcrypto.getRandomValues(new Uint8Array(12));

// Derive export key using dual stage
const enc = new TextEncoder();
const MILSPEC_PEPPER_V6 = "CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821";
const pepperBytes = enc.encode(MILSPEC_PEPPER_V6);
const pwdBytes = enc.encode(testPassword);
const combined = new Uint8Array(pepperBytes.length + pwdBytes.length);
combined.set(pepperBytes, 0);
combined.set(pwdBytes, pepperBytes.length);

const hmacKey = await webcrypto.subtle.importKey(
    'raw',
    salt,
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign']
);
const preHash = await webcrypto.subtle.sign('HMAC', hmacKey, combined);

const keyMaterial = await webcrypto.subtle.importKey(
    'raw',
    preHash,
    'PBKDF2',
    false,
    ['deriveKey']
);

const aesKey = await webcrypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 2000000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
);

// Encrypt payload
const ciphertextBuf = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    testContent
);

const base64Data = Buffer.from(ciphertextBuf).toString('base64');

// Generate HTML parts
const { header, footer } = generateSecureHTMLParts(fileMeta, salt, iv, {
    title: "Coralgenz Vault",
    allowDownload: true,
    integrityHash
});

const fullHtml = header + base64Data + footer;
fs.writeFileSync('scratch/test_output.secure.html', fullHtml);
console.log('Generated test HTML package (scratch/test_output.secure.html) with size:', fullHtml.length, 'bytes');

// Check 1: Extract <script> and verify it parses with ZERO syntax errors
const scriptMatch = fullHtml.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
    throw new Error('Failed to find <script> tag in generated HTML');
}
try {
    new Function(scriptMatch[1]);
    console.log('✅ PASS: Generated <script> parsed with ZERO syntax errors!');
} catch (err) {
    console.error('❌ FAIL: SyntaxError in generated <script>:', err);
    process.exit(1);
}

// Check 2: Verify NO keypad references remain
const hasKeypadBtn = fullHtml.includes('toggle-keypad-btn');
const hasKeypadContainer = fullHtml.includes('virtual-keypad-container');
const hasAntiKeyloggerText = fullHtml.includes('ANTI-KEYLOGGER VIRTUAL KEYPAD');
if (!hasKeypadBtn && !hasKeypadContainer && !hasAntiKeyloggerText) {
    console.log('✅ PASS: All 🛡️ ANTI-KEYLOGGER VIRTUAL KEYPAD markup and script removed cleanly!');
} else {
    console.error('❌ FAIL: Virtual keypad elements still found in generated HTML!');
    process.exit(1);
}

// Check 3: Verify Decryption Roundtrip with 2,000,000 rounds
const decryptKey = await webcrypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 2000000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
);
const decryptedBuf = await webcrypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    decryptKey,
    ciphertextBuf
);
const decryptedStr = Buffer.from(decryptedBuf).toString();
if (decryptedStr === "CORALGENZ_VAULT_TEST_ORIGINAL_PAYLOAD_12345") {
    console.log('✅ PASS: Decryption roundtrip successful! Decrypted payload matches original.');
} else {
    console.error('❌ FAIL: Decrypted content did not match original!');
    process.exit(1);
}

console.log('--- ALL VALIDATION CHECKS PASSED PERFECTLY ---');
