import fs from 'fs';
import path from 'path';
import {
  SecureCrypto,
  PEPPER_ENCLAVES,
  decodeSecretEnclave,
  getSecretPepperString
} from '../src/crypto.js';

console.log('='.repeat(80));
console.log('VERIFYING ENCRYPTED SECRET PEPPER ENCLAVES & 2FA KEY SALT SUITE');
console.log('='.repeat(80));

// --- TEST 1: Verify Enclave PRF Reversibility in Volatile RAM ---
console.log('\n[TEST 1] Testing Enclave PRF Dynamic Deciphering...');
let enclaveFailures = 0;
for (const [key, encB64] of Object.entries(PEPPER_ENCLAVES)) {
  const plainBytes = decodeSecretEnclave(encB64);
  const plainStr = new TextDecoder().decode(plainBytes);
  plainBytes.fill(0); // Test zeroization
  if (!plainStr.startsWith('CORALGENZ::')) {
    console.error(`[FAIL] Enclave ${key} did not decipher to expected format: ${plainStr}`);
    enclaveFailures++;
  }
}
if (enclaveFailures === 0) {
  console.log(`[PASS] All ${Object.keys(PEPPER_ENCLAVES).length} secret enclaves decipher correctly in RAM.`);
} else {
  process.exit(1);
}

// --- TEST 2: Verify Source Code has ZERO plaintext pepper strings ---
console.log('\n[TEST 2] Verifying 0 Plaintext Pepper Occurrences in src/crypto.js and src/main.js...');
const cryptoSrc = fs.readFileSync(path.resolve('src/crypto.js'), 'utf8');
const mainSrc = fs.readFileSync(path.resolve('src/main.js'), 'utf8');

const forbiddenPatterns = [
  /CORALGENZ::MILSPEC_V10/g,
  /CORALGENZ::FORMAT::STANDARD/g,
  /CORALGENZ::LAYER3/g,
  /CORALGENZ::LAYER5/g,
  /CORALGENZ::LAYER6/g,
  /CORALGENZ::LAYER8/g,
  /CORALGENZ::LAYER9/g,
  /CORALGENZ::STAGE/g,
  /994810284712/g,
  /883920194821/g
];

let leaksFound = 0;
for (const pat of forbiddenPatterns) {
  const cMatches = cryptoSrc.match(pat) || [];
  const mMatches = mainSrc.match(pat) || [];
  if (cMatches.length > 0) {
    console.error(`[LEAK] Pattern ${pat} found in src/crypto.js (${cMatches.length} times)`);
    leaksFound += cMatches.length;
  }
  if (mMatches.length > 0) {
    console.error(`[LEAK] Pattern ${pat} found in src/main.js (${mMatches.length} times)`);
    leaksFound += mMatches.length;
  }
}

if (leaksFound === 0) {
  console.log('[PASS] ZERO plaintext pepper or domain separation strings found in source code!');
} else {
  console.error(`[FAIL] Found ${leaksFound} plaintext leaks in source files.`);
  process.exit(1);
}

// --- TEST 3: Verify 2FA User Secret Pepper Key Derivation & Isolation ---
console.log('\n[TEST 3] Testing 2FA User Secret Pepper Isolation & Decryption...');
const password = 'QuantumPassword!2026';
const userPepper = 'MySuperSecretHardwareKeyPepper#77';
const salt = SecureCrypto.generateSalt();
const payload = new TextEncoder().encode('CLASSIFIED_TOP_SECRET_DUAL_SHIELDED_DATA');

const defaultPepper = SecureCrypto.DOMAIN_SEPARATION_TAG_V10;
const combinedPepper = defaultPepper + '::USER_2FA::' + userPepper;

// 1. Derive key with default pepper
const keyDefault = await SecureCrypto.deriveKeyAsyncWorker(password, salt, 100000, defaultPepper);

// 2. Derive key with 2FA pepper
const key2FA = await SecureCrypto.deriveKeyAsyncWorker(password, salt, 100000, combinedPepper);

// 3. Encrypt payload with 2FA key
const iv = SecureCrypto.generateIV();
const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key2FA, payload);

// 4. Try decrypting with default key (no 2FA pepper) -> MUST FAIL
let defaultAttemptFailed = false;
try {
  await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, keyDefault, encrypted);
} catch (e) {
  defaultAttemptFailed = true;
}

if (defaultAttemptFailed) {
  console.log('[PASS] Decryption without 2FA secret pepper was mathematically REJECTED.');
} else {
  console.error('[FAIL] Decryption without 2FA secret pepper unexpectedly succeeded!');
  process.exit(1);
}

// 5. Try decrypting with WRONG 2FA pepper -> MUST FAIL
const wrongCombinedPepper = defaultPepper + '::USER_2FA::WrongPepperValue';
const keyWrong2FA = await SecureCrypto.deriveKeyAsyncWorker(password, salt, 100000, wrongCombinedPepper);

let wrongPepperFailed = false;
try {
  await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, keyWrong2FA, encrypted);
} catch (e) {
  wrongPepperFailed = true;
}

if (wrongPepperFailed) {
  console.log('[PASS] Decryption with incorrect 2FA pepper was mathematically REJECTED.');
} else {
  console.error('[FAIL] Decryption with incorrect 2FA pepper unexpectedly succeeded!');
  process.exit(1);
}

// 6. Decrypt with correct password AND correct 2FA pepper -> MUST SUCCEED
const keyCorrect2FA = await SecureCrypto.deriveKeyAsyncWorker(password, salt, 100000, combinedPepper);
const decryptedBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, keyCorrect2FA, encrypted);
const decryptedText = new TextDecoder().decode(decryptedBuf);

if (decryptedText === 'CLASSIFIED_TOP_SECRET_DUAL_SHIELDED_DATA') {
  console.log(`[PASS] Decryption with correct 2FA secret pepper SUCCEEDED: "${decryptedText}"`);
} else {
  console.error('[FAIL] Decrypted text mismatch: ' + decryptedText);
  process.exit(1);
}

console.log('\n' + '='.repeat(80));
console.log('>>> ALL ENCLAVE & 2FA PEPPER TESTS PASSED WITH 100% FIDELITY <<<');
console.log('='.repeat(80));
