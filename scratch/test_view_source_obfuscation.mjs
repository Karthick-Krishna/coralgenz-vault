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

// Test payload
const testPassword = "SecretPassword2026!";
const testFileName = "idealab.png";
const testContent = Buffer.from("CORALGENZ_VAULT_TEST_IDEALAB_ORIGINAL_IMAGE_BYTES_12345");
const fileMeta = {
    id: "test-idealab-uuid",
    name: testFileName,
    type: "image/png",
    size: testContent.byteLength,
    integrityHash: ""
};

// Calculate integrity hash
const hashBuf = await webcrypto.subtle.digest('SHA-256', testContent);
const integrityHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
fileMeta.integrityHash = integrityHash;

const salt = webcrypto.getRandomValues(new Uint8Array(32));
const iv = webcrypto.getRandomValues(new Uint8Array(12));

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
    { name: 'PBKDF2', salt: salt, iterations: 2000000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
);

const cipherBuf = await webcrypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    aesKey,
    testContent
);

const base64Ciphertext = Buffer.from(cipherBuf).toString('base64');

const { header, footer } = generateSecureHTMLParts(fileMeta, salt, iv, {
    integrityHash: integrityHash,
    allowDownload: true
});

const fullHtml = header + base64Ciphertext + footer;

// Extract encodeBase64Utf8 and obfuscateContainerHtml from src/main.js
const obfStart = mainJs.indexOf('function encodeBase64Utf8(');
const obfEnd = mainJs.indexOf('// Common export function');
const obfCode = mainJs.substring(obfStart, obfEnd).trim();

const { encodeBase64Utf8, obfuscateContainerHtml } = new Function(`${obfCode}; return { encodeBase64Utf8, obfuscateContainerHtml };`)();

const obfuscatedHtml = obfuscateContainerHtml(fullHtml);
fs.writeFileSync('scratch/idealab.png.secure.html', obfuscatedHtml);

console.log('Saved obfuscated file: scratch/idealab.png.secure.html');
console.log('File size:', obfuscatedHtml.length, 'bytes');

// Verify that source code is hidden when viewing the file
const lines = obfuscatedHtml.split('\n');
console.log('Total visible lines in view-source:', lines.length);
console.log('Does view-source contain plain "unlock()"?', obfuscatedHtml.includes('function unlock(') ? 'FAIL (Exposed)' : 'PASS (Hidden)');
console.log('Does view-source contain plain CSS classes like ".auth-container"?', obfuscatedHtml.includes('.auth-container {') ? 'FAIL (Exposed)' : 'PASS (Hidden)');
console.log('Does view-source contain plain document metadata?', obfuscatedHtml.includes('safeMetaName') ? 'FAIL (Exposed)' : 'PASS (Hidden)');

// Verify that the payload decodes back to valid HTML
const payloadMatch = obfuscatedHtml.match(/var payload = "([^"]+)";/);
if (!payloadMatch) {
    throw new Error('Payload match failed');
}
const decodedBack = Buffer.from(payloadMatch[1], 'base64').toString('utf-8');
if (decodedBack === fullHtml) {
    console.log('✅ PASS: Decoded payload matches original 100%!');
} else {
    throw new Error('Decoded payload mismatch');
}
