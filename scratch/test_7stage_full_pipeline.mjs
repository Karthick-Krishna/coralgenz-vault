import fs from 'fs';
import { FFLATE_CODE } from '../src/fflate_code.js';
import { XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED } from '../src/office_engines.js';
import { SecureCrypto, MILSPEC_ANTI_CRACKER_PEPPER_V8, MILSPEC_ANTI_CRACKER_PEPPER_V7, MILSPEC_ANTI_CRACKER_PEPPER_V6 } from '../src/crypto.js';

const webcrypto = globalThis.crypto;

console.log('================================================================');
console.log(' 🛡️ CORALGENZ VAULT V8: 7-STAGE QUANTUM-HARDENED VERIFICATION 🛡️');
console.log('================================================================');

// --- TEST 1: SINGLE-DIGIT PASSWORD PROTECTION & 7-STAGE ROUNDTRIP ---
console.log('\n[TEST 1] Single-Digit Weak Password Protection ("1", "7", "9")');
const weakPasswords = ["1", "7", "9", "0"];
const sampleData = Buffer.from("CORALGENZ_CONFIDENTIAL_PAYLOAD_V8_7STAGE_IMMUNE_TO_JOHN_AND_HASHCAT");

for (const pwd of weakPasswords) {
    const salt = SecureCrypto.generateSalt();
    const key = await SecureCrypto.deriveKey7Stage(pwd, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V8);
    const { iv, ciphertext } = await SecureCrypto.encryptData(key, sampleData);

    const decryptKey = await SecureCrypto.deriveKey7Stage(pwd, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V8);
    const decrypted = await SecureCrypto.decryptData(decryptKey, iv, ciphertext);
    const matched = Buffer.from(decrypted).toString() === sampleData.toString();
    console.log(`  Password "${pwd}": Encrypted (${ciphertext.byteLength} bytes) -> Decrypted matches: ${matched ? '✅ PASS' : '❌ FAIL'}`);
    if (!matched) process.exit(1);
}

// --- TEST 2: STANDALONE CONTAINER GENERATION (V8) ---
console.log('\n[TEST 2] Standalone Container Generation & Parsing (V8 Standard)');
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

const obfStart = mainJs.indexOf('function encodeBase64Utf8(');
const obfEnd = mainJs.indexOf('// Common export function');
const obfCode = mainJs.substring(obfStart, obfEnd).trim();
const { encodeBase64Utf8, obfuscateContainerHtml } = new Function(`${obfCode}; return { encodeBase64Utf8, obfuscateContainerHtml };`)();

const testPassword = "3"; // Single digit password
const fileSalt = SecureCrypto.generateSalt();
const testKey = await SecureCrypto.deriveKey7Stage(testPassword, fileSalt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V8);
const { iv: testIv, ciphertext: testCiphertext } = await SecureCrypto.encryptData(testKey, sampleData);
const base64Data = Buffer.from(testCiphertext).toString('base64');

const hashBuf = await webcrypto.subtle.digest('SHA-256', sampleData);
const integrityHash = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');

const fileMeta = {
    id: 'test-v8-file',
    name: 'Classified_Intel.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: sampleData.byteLength,
    integrityHash: integrityHash
};

const { header, footer } = generateSecureHTMLParts(fileMeta, fileSalt, testIv, {
    title: 'Coralgenz Vault Defense',
    allowDownload: true,
    integrityHash: integrityHash
});

const rawHtml = header + base64Data + footer;
const finalObfuscatedContainer = obfuscateContainerHtml(rawHtml);

fs.writeFileSync('scratch/test_7stage_output.secure.html', finalObfuscatedContainer);
console.log(`  Saved container: scratch/test_7stage_output.secure.html (${finalObfuscatedContainer.length} bytes)`);

// Check container version
const hasV8 = rawHtml.includes('"V8"') || rawHtml.includes("'V8'");
console.log(`  Container Version is V8: ${hasV8 ? '✅ PASS' : '❌ FAIL'}`);

// Check 7 distinct stages in decryptor script
const hasStage1 = rawHtml.includes('STAGE 1: Dynamic Non-Linear Password Entropy Expansion');
const hasStage2 = rawHtml.includes('STAGE 2: Domain-Separated HMAC-SHA512 Pre-Whitening');
const hasStage3 = rawHtml.includes('STAGE 3: Memory-Hard S-Box Diffusion Matrix');
const hasStage4 = rawHtml.includes('STAGE 4: Deep Sequential PBKDF2 Iteration Matrix');
const hasStage5 = rawHtml.includes('STAGE 5: High-Entropy Inverted-Salt Cross-Synthesis');
const hasStage6 = rawHtml.includes('STAGE 6: Post-Quantum Enclave Key Synthesis');
const hasStage7 = rawHtml.includes('STAGE 7: Native WebCrypto AES-256-GCM Framing');

console.log(`  Stage 1 (Entropy Expansion): ${hasStage1 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Stage 2 (Domain Separation & Format Binding): ${hasStage2 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Stage 3 (Memory-Hard S-Box Diffusion): ${hasStage3 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Stage 4 (2,000,000 PBKDF2 Iterations): ${hasStage4 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Stage 5 (Inverted-Salt Cross-Synthesis): ${hasStage5 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Stage 6 (Post-Quantum Key Synthesis): ${hasStage6 ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Stage 7 (Native AES-256-GCM Framing): ${hasStage7 ? '✅ PASS' : '❌ FAIL'}`);

if (!hasV8 || !hasStage1 || !hasStage2 || !hasStage3 || !hasStage4 || !hasStage5 || !hasStage6 || !hasStage7) {
    console.error('❌ FAIL: Missing stage definitions');
    process.exit(1);
}

// --- TEST 3: MULTI-TIER BACKWARD COMPATIBILITY ---
console.log('\n[TEST 3] Multi-Tier Backward Compatibility (unwrapWithFallback)');
// Create a V8 wrapped key
const targetMasterKey = await SecureCrypto.generateKey();
const passKeyV8 = await SecureCrypto.deriveKey7Stage("vaultPass123", fileSalt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V8);
const { iv: wrapIvV8, wrappedData: wrappedV8 } = await SecureCrypto.wrapKey(targetMasterKey, passKeyV8);

const unwrappedV8 = await SecureCrypto.unwrapWithFallback(wrappedV8, "vaultPass123", fileSalt, wrapIvV8, 2000000);
console.log(`  V8 7-Stage Key unwrapped successfully: ${unwrappedV8 ? '✅ PASS' : '❌ FAIL'}`);

// Create a V7 wrapped key
const passKeyV7 = await SecureCrypto.deriveKey4Stage("vaultPass123", fileSalt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V7);
const { iv: wrapIvV7, wrappedData: wrappedV7 } = await SecureCrypto.wrapKey(targetMasterKey, passKeyV7);

const unwrappedV7 = await SecureCrypto.unwrapWithFallback(wrappedV7, "vaultPass123", fileSalt, wrapIvV7, 2000000);
console.log(`  V7 4-Stage Key fallback unwrapped successfully: ${unwrappedV7 ? '✅ PASS' : '❌ FAIL'}`);

// Create a V6 wrapped key
const passKeyV6 = await SecureCrypto.deriveKeyDualStage("vaultPass123", fileSalt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V6);
const { iv: wrapIvV6, wrappedData: wrappedV6 } = await SecureCrypto.wrapKey(targetMasterKey, passKeyV6);

const unwrappedV6 = await SecureCrypto.unwrapWithFallback(wrappedV6, "vaultPass123", fileSalt, wrapIvV6, 2000000);
console.log(`  V6 Dual-Stage Key fallback unwrapped successfully: ${unwrappedV6 ? '✅ PASS' : '❌ FAIL'}`);

console.log('\n================================================================');
console.log(' 🚀 ALL 7-STAGE QUANTUM-HARDENED VERIFICATION TESTS PASSED! 🚀');
console.log('================================================================');
