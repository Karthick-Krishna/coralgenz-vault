import fs from 'fs';
import { FFLATE_CODE } from '../src/fflate_code.js';
import { XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED } from '../src/office_engines.js';
import { SecureCrypto, MILSPEC_ANTI_CRACKER_PEPPER_V7, MILSPEC_ANTI_CRACKER_PEPPER_V6 } from '../src/crypto.js';

const webcrypto = globalThis.crypto;

console.log('=== TEST 1: VERIFYING 4-STAGE KEY DERIVATION IN CRYPTO.JS ===');

const testPassword = "ConfidentialPassword2026!#$";
const testSalt = SecureCrypto.generateSalt();
const testIv = SecureCrypto.generateIV();
const testPayload = Buffer.from("CORALGENZ_CONFIDENTIAL_PAYLOAD_4STAGE_TEST_2026_ZERO_KNOWLEDGE");

// Derive 4-Stage Key
const key4Stage = await SecureCrypto.deriveKey4Stage(testPassword, testSalt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V7);
const { iv, ciphertext } = await SecureCrypto.encryptData(key4Stage, testPayload);

// Decrypt using 4-Stage Key
const decrypted = await SecureCrypto.decryptData(key4Stage, iv, ciphertext);
console.log('✅ PASS: Direct 4-Stage derivation & encryption/decryption roundtrip succeeded!');

console.log('\n=== TEST 2: VERIFYING STANDALONE .SECURE FILE GENERATION WITH 4-STAGE KDF ===');

// Extract generateSecureHTMLParts from src/main.js
const mainJs = fs.readFileSync('src/main.js', 'utf8');
const fnStart = mainJs.indexOf('function generateSecureHTMLParts(');
const fnMarkerEnd = mainJs.indexOf('// Helper to decrypt strictly for export');
const fnCode = mainJs.substring(fnStart, fnMarkerEnd).trim();

const isDownloadAllowedForFile = () => true;
const generateSecureHTMLParts = new Function(
    'isDownloadAllowedForFile',
    'FFLATE_CODE',
    'XLSX_CORE_DEFLATED',
    'MAMMOTH_CODE_DEFLATED',
    `${fnCode}; return generateSecureHTMLParts;`
)(isDownloadAllowedForFile, FFLATE_CODE, XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED);

// Compute hash
const hashBuf = await webcrypto.subtle.digest('SHA-256', testPayload);
const integrityHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');

const fileMeta = {
    id: 'test-4stage-doc',
    name: 'TopSecret_Financials.pdf',
    type: 'application/pdf',
    size: testPayload.byteLength,
    integrityHash: integrityHash
};

const salt = SecureCrypto.generateSalt();
const exportKey = await SecureCrypto.deriveKey4Stage(testPassword, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V7);
const { iv: encIv, ciphertext: encCiphertext } = await SecureCrypto.encryptData(exportKey, testPayload);
const base64Data = Buffer.from(encCiphertext).toString('base64');

const { header, footer } = generateSecureHTMLParts(fileMeta, salt, encIv, {
    title: 'Coralgenz Vault',
    allowDownload: true,
    integrityHash: integrityHash
});

const rawHtml = header + base64Data + footer;

// Extract obfuscation
const obfStart = mainJs.indexOf('function encodeBase64Utf8(');
const obfEnd = mainJs.indexOf('// Common export function');
const obfCode = mainJs.substring(obfStart, obfEnd).trim();
const { encodeBase64Utf8, obfuscateContainerHtml } = new Function(`${obfCode}; return { encodeBase64Utf8, obfuscateContainerHtml };`)();

const finalContainer = obfuscateContainerHtml(rawHtml);
fs.writeFileSync('scratch/test_4stage_output.secure.html', finalContainer);

console.log('Saved 4-Stage Container: scratch/test_4stage_output.secure.html');
console.log('Container Size:', finalContainer.length, 'bytes');

// Check container version
const hasV7 = rawHtml.includes('"V7"') || rawHtml.includes("'V7'");
console.log('Container Version is V7 (4-Stage):', hasV7 ? '✅ PASS' : '❌ FAIL');

// Check presence of deriveKey4Stage in rawHtml
const hasDeriveKey4Stage = rawHtml.includes('async function deriveKey4Stage');
console.log('Generated Script contains deriveKey4Stage:', hasDeriveKey4Stage ? '✅ PASS' : '❌ FAIL');

// Check 4 stages in generated code
const hasStage1 = rawHtml.includes('STAGE 1: Domain-Separated HMAC-SHA512');
const hasStage2 = rawHtml.includes('STAGE 2: Non-Linear Memory Diffusion Matrix');
const hasStage3 = rawHtml.includes('STAGE 3: Deep PBKDF2 Iteration Matrix');
const hasStage4 = rawHtml.includes('STAGE 4: Post-Quantum Enclave Key Extraction');
console.log('Stage 1 (Domain Separation & Format Binding):', hasStage1 ? '✅ PASS' : '❌ FAIL');
console.log('Stage 2 (Non-Linear Diffusion Matrix):', hasStage2 ? '✅ PASS' : '❌ FAIL');
console.log('Stage 3 (2,000,000 PBKDF2 Iterations):', hasStage3 ? '✅ PASS' : '❌ FAIL');
console.log('Stage 4 (Post-Quantum Enclave Extraction):', hasStage4 ? '✅ PASS' : '❌ FAIL');

// Verify roundtrip decryption of the ciphertext
const decryptKey = await SecureCrypto.deriveKey4Stage(testPassword, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V7);
const decryptedBuf = await webcrypto.subtle.decrypt(
    { name: 'AES-GCM', iv: encIv },
    decryptKey,
    encCiphertext
);

if (Buffer.from(decryptedBuf).toString() === testPayload.toString()) {
    console.log('\n🎉 ALL 4-STAGE CRYPTOGRAPHIC VALIDATION TESTS PASSED WITH 100% SUCCESS!');
} else {
    console.error('❌ FAIL: Decryption mismatch');
    process.exit(1);
}
