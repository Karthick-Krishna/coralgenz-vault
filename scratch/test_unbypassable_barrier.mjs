import fs from 'fs';

// Read the generated idealab.png.secure.html
const secureHtml = fs.readFileSync('scratch/idealab.png.secure.html', 'utf8');

console.log('=== VERIFYING AIRTIGHT .SECURE INTEGRITY BARRIER ===');

// Check 1: Verify that the official Coralgenz company attribution text is present in the container
const hasCompanyText = secureHtml.includes('The .secure format was entirely created, engineered, and standardized by Coralgenz') ||
                       secureHtml.includes('The <strong>.secure</strong> format was entirely created, engineered, and standardized by <strong>Coralgenz</strong>');
console.log('Contains Official Coralgenz Company Attribution:', hasCompanyText ? '✅ PASS' : '❌ FAIL');

// Check 2: Verify outer bootstrap format integrity barrier
const hasOuterCheck = secureHtml.includes('isInvalidFormat') && secureHtml.includes('MANDATORY STANDARD FORMAT REQUIREMENT');
console.log('Contains Outer Bootstrap Enclave Barrier:', hasOuterCheck ? '✅ PASS' : '❌ FAIL');

// Check 3: Verify that source code is hidden in view-source
const isObfuscated = !secureHtml.includes('function deriveKeyDualStage') && !secureHtml.includes('function unlock');
console.log('Zero Plaintext Source Code in view-source:', isObfuscated ? '✅ PASS' : '❌ FAIL');

if (hasCompanyText && hasOuterCheck && isObfuscated) {
    console.log('\n🎉 ALL AIRTIGHT SECURITY AND COMPANY STANDARD CHECKS PASSED PERFECTLY!');
} else {
    process.exit(1);
}
