// Test format integrity verification for .secure containers

function verifyFormatIntegrityMock(mockLocation) {
    try {
        const protocol = mockLocation.protocol;
        const path = decodeURIComponent(mockLocation.pathname || mockLocation.href || '');
        const cleanPath = path.split('?')[0].split('#')[0];
        
        if (cleanPath && cleanPath !== '/' && !cleanPath.endsWith('/')) {
            const rawName = cleanPath.split('/').pop() || '';
            if (rawName && rawName.includes('.')) {
                const lowerRaw = rawName.toLowerCase();
                // If opened locally (file:) or ends in .html/.htm, it MUST contain .secure
                if (protocol === 'file:' || lowerRaw.endsWith('.html') || lowerRaw.endsWith('.htm')) {
                    if (!lowerRaw.includes('.secure')) {
                        return { valid: false, filename: rawName };
                    }
                }
            }
        }
    } catch (e) {}
    return { valid: true, filename: '' };
}

const testCases = [
    { name: "Local valid .secure.html", loc: { protocol: "file:", pathname: "/Users/test/audit.xlsx.secure.html" }, expected: true },
    { name: "Local stripped .secure (renamed to .html)", loc: { protocol: "file:", pathname: "/Users/test/audit.xlsx.html" }, expected: false },
    { name: "Local renamed plain html", loc: { protocol: "file:", pathname: "/C:/Users/test/hacked.html" }, expected: false },
    { name: "Local valid with spaces and copy suffix", loc: { protocol: "file:", pathname: "/Users/test/doc (1).secure.html" }, expected: true },
    { name: "Web hosted valid .secure.html", loc: { protocol: "https:", pathname: "/vault/shared/report.pdf.secure.html" }, expected: true },
    { name: "Web hosted stripped .secure", loc: { protocol: "https:", pathname: "/vault/shared/report.pdf.html" }, expected: false },
    { name: "Blob URL in memory", loc: { protocol: "blob:", pathname: "blob:https://vault.coralgenz.co.in/uuid-1234" }, expected: true }
];

console.log("=== RUNNING .SECURE FORMAT INTEGRITY TESTS ===");
let passed = 0;
for (const tc of testCases) {
    const res = verifyFormatIntegrityMock(tc.loc);
    const ok = res.valid === tc.expected;
    if (ok) {
        console.log(`✅ PASS: ${tc.name} -> valid=${res.valid}`);
        passed++;
    } else {
        console.error(`❌ FAIL: ${tc.name} -> expected valid=${tc.expected} but got ${res.valid}`);
    }
}

if (passed === testCases.length) {
    console.log(`\n🎉 ALL ${passed} FORMAT TAMPER TESTS PASSED!`);
} else {
    process.exit(1);
}
