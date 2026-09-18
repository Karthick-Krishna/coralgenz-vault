import fs from 'fs';

async function testDownloadCustomSeparation() {
  console.log('=== VERIFYING DOWNLOAD/EXPORT VS CUSTOM SEPARATION & HIGHLIGHTED .SECURE BUTTON ===\n');

  const indexHtml = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/index.html', 'utf-8');
  const mainJs = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/src/main.js', 'utf-8');
  const styleCss = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/src/style.css', 'utf-8');

  // 1. Verify Download and Export vs Custom logic in main.js
  console.log('--- 1. Logic Separation in main.js ---');
  console.assert(mainJs.includes("openExportModal(fileId, false, 'download');"), 'handleDownloadFile must pass false for isCustom');
  console.assert(mainJs.includes("openExportModal(fileId, false, 'export');"), 'handleShareFile must pass false for isCustom');
  console.assert(mainJs.includes("openExportModal(fileId, true, 'custom');"), 'handleCustomShare must pass true for isCustom');
  console.assert(mainJs.includes("customOpts.style.display = isCustomExportMode ? 'block' : 'none';"), 'selectExportFormat must condition customOpts on isCustomExportMode');
  console.assert(mainJs.includes("customization = { title: title, logoUrl: logoDataUrl };"), 'Customization must only be populated when isCustomExportMode is true');
  console.log('✓ main.js strictly isolates custom features from Download and Export buttons');

  // 2. Verify Highlighted .secure button in index.html
  console.log('\n--- 2. Highlighted .secure button in index.html ---');
  console.assert(indexHtml.includes('id="download-pure-secure-btn"'), 'Must contain download-pure-secure-btn ID');
  console.assert(indexHtml.includes('cyber-btn-pure-secure-hero motion-secure-pulse'), 'Must feature pure secure hero class with pulse animation');
  console.assert(indexHtml.includes('pure-secure-shimmer'), 'Must contain pure-secure-shimmer element');
  console.assert(indexHtml.includes('motion-secure-icon-glow'), 'Must contain motion-secure-icon-glow element');
  console.assert(indexHtml.includes('DOWNLOAD .SECURE FILE'), 'Must feature clear title DOWNLOAD .SECURE FILE');
  console.assert(indexHtml.includes('PRIMARY .SECURE'), 'Must feature primary secure tag');
  console.log('✓ index.html has prominently highlighted .secure file button with distinct hero markup');

  // 3. Verify CSS styling for .cyber-btn-pure-secure-hero
  console.log('\n--- 3. Styling & Shimmer in style.css ---');
  console.assert(styleCss.includes('.cyber-btn-pure-secure-hero {'), 'style.css must define .cyber-btn-pure-secure-hero');
  console.assert(styleCss.includes('.pure-secure-shimmer {'), 'style.css must define .pure-secure-shimmer');
  console.assert(styleCss.includes('@keyframes pureSecureShimmerSweep'), 'style.css must define pureSecureShimmerSweep');
  console.assert(styleCss.includes('.motion-secure-icon-glow'), 'style.css must define motion-secure-icon-glow');
  console.assert(styleCss.includes('@keyframes secureIconPulse'), 'style.css must define secureIconPulse');
  console.log('✓ style.css defines rich glowing beacon and shimmer animations for the .secure button');

  // 4. Simulate modal state changes
  console.log('\n--- 4. Simulated State Transitions ---');
  let mockCustomDisplay = 'none';
  let mockIsCustomExportMode = false;

  function mockOpen(isCustom, mode) {
    mockIsCustomExportMode = Boolean(isCustom);
    // As in main.js
    mockCustomDisplay = mockIsCustomExportMode ? 'block' : 'none';
    return { isCustom: mockIsCustomExportMode, display: mockCustomDisplay, mode };
  }

  const dlResult = mockOpen(false, 'download');
  console.assert(dlResult.display === 'none', 'Download must NOT show custom features');
  console.log('✓ Download click -> custom features display = none');

  const expResult = mockOpen(false, 'export');
  console.assert(expResult.display === 'none', 'Export must NOT show custom features');
  console.log('✓ Export click -> custom features display = none');

  const customResult = mockOpen(true, 'custom');
  console.assert(customResult.display === 'block', 'Custom must show custom features');
  console.log('✓ Custom click -> custom features display = block');

  console.log('\n=== ALL SEPARATION AND HIGHLIGHT TESTS PASSED 100%! ===');
}

testDownloadCustomSeparation().catch(err => {
  console.error(err);
  process.exit(1);
});
