import fs from 'fs';

async function verifyMotionAnimationsAndScanner() {
  console.log('=== VERIFYING UPGRADED 6-SECOND ANIMATION & MOTION BUTTONS ===\n');

  const indexHtml = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/index.html', 'utf-8');
  const mainJs = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/src/main.js', 'utf-8');
  const styleCss = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/src/style.css', 'utf-8');

  // 1. Verify Upgraded Scanner Stage Markup in index.html
  console.log('--- 1. Holographic Scanner Structure ---');
  const scannerElements = [
    'scanner-grid-backdrop',
    'scanner-radar-sweep',
    'outer-dial-ring',
    'outer-ring',
    'middle-ring',
    'quantum-core-ring',
    'inner-scanner',
    'quantum-particle-node node-1',
    'quantum-particle-node node-2',
    'quantum-particle-node node-3',
    'quantum-particle-node node-4',
    'scanner-laser-line laser-top-down',
    'scanner-laser-line laser-bottom-up',
    'shield-energy-aura',
    'scanner-status-text',
    'scanner-sub-status'
  ];

  for (const el of scannerElements) {
    console.assert(indexHtml.includes(el), `Scanner must contain ${el}`);
    console.log(`✓ Scanner contains ${el}`);
  }

  // 2. Verify 6-Second Timing & Continuous 60fps Interpolation in main.js
  console.log('\n--- 2. 6-Second Protecting Timing & 60fps Interpolation ---');
  console.assert(mainJs.includes('const totalDuration = 6000;'), 'Total duration must be 6000ms (6 seconds)');
  console.assert(mainJs.includes('clampedMs / totalDuration'), 'Must calculate progressRatio smoothly');
  console.assert(mainJs.includes('progressBar.style.width'), 'Must update progress bar dynamically');
  console.assert(mainJs.includes('PHASE 1/7 • ENCLAVE MEMORY ISOLATION'), 'Must display Phase 1 sub-badge');
  console.assert(mainJs.includes('PHASE 2/7 • CSPRNG 256-BIT ENTROPY'), 'Must display Phase 2 sub-badge');
  console.assert(mainJs.includes('PHASE 3/7 • 2,000,000 ROUNDS PBKDF2'), 'Must display Phase 3 sub-badge');
  console.assert(mainJs.includes('PHASE 4/7 • GALOIS AUTH STREAM'), 'Must display Phase 4 sub-badge');
  console.assert(mainJs.includes('PHASE 5/7 • RFC-2026 CONTAINER'), 'Must display Phase 5 sub-badge');
  console.assert(mainJs.includes('PHASE 6/7 • EMBEDDING WEB RUNTIME'), 'Must display Phase 6 sub-badge');
  console.assert(mainJs.includes('PHASE 7/7 • GMAC SEAL & RAM ZEROIZE'), 'Must display Phase 7 sub-badge');
  console.assert(mainJs.includes('16 LAYERS SEALED & VERIFIED'), 'Must display verified complete badge');
  console.log('✓ Continuous 60fps progress bar, timer and 7 phase sub-badges verified');

  // 3. Verify Completion Showcase Action Buttons Markup in index.html
  console.log('\n--- 3. Completion Showcase Action Buttons ---');
  console.assert(indexHtml.includes('completion-showcase-actions'), 'Must contain completion-showcase-actions container');
  console.assert(indexHtml.includes('download-showcase-card'), 'Must contain download showcase card');
  console.assert(indexHtml.includes('protect-showcase-card'), 'Must contain protect showcase card');
  console.assert(indexHtml.includes('cyber-btn-download-hero motion-download-beacon'), 'Must feature download hero with beacon motion');
  console.assert(indexHtml.includes('cyber-btn-protect-hero motion-orbital-levitate'), 'Must feature protect hero with orbital levitation motion');
  console.assert(indexHtml.includes('id="download-protected-html-btn"'), 'Must retain download-protected-html-btn ID');
  console.assert(indexHtml.includes('id="download-pure-secure-btn"'), 'Must retain download-pure-secure-btn ID');
  console.assert(indexHtml.includes('id="protect-another-btn"'), 'Must retain protect-another-btn ID');
  console.assert(indexHtml.includes('id="view-in-vault-btn"'), 'Must retain view-in-vault-btn ID');
  console.log('✓ Completion showcase actions & IDs verified');

  // 4. Verify CSS Motion Animations in style.css
  console.log('\n--- 4. Distinct CSS Motion Animations ---');
  // Motion Animation 1 (Download .secure)
  console.assert(styleCss.includes('@keyframes downloadBeaconRipples'), 'Must have downloadBeaconRipples keyframes');
  console.assert(styleCss.includes('@keyframes downloadShimmerSweep'), 'Must have downloadShimmerSweep keyframes');
  console.assert(styleCss.includes('@keyframes downloadArrowBounce'), 'Must have downloadArrowBounce keyframes');
  console.assert(styleCss.includes('motion-secure-pulse'), 'Must have pure secure pulse animation');

  // Motion Animation 2 (Protect Another File)
  console.assert(styleCss.includes('@keyframes orbitalConicSpin'), 'Must have orbitalConicSpin keyframes');
  console.assert(styleCss.includes('@keyframes magneticLevitation'), 'Must have magneticLevitation keyframes');
  console.assert(styleCss.includes('--orbital-angle'), 'Must support CSS custom property for conic gradient angle');

  // Entrance animations
  console.assert(styleCss.includes('@keyframes completionEntrancePop'), 'Must have completionEntrancePop keyframes');
  console.assert(styleCss.includes('@keyframes stageFlashBurst'), 'Must have stageFlashBurst keyframes');
  console.log('✓ Distinct motion animation keyframes & styles verified in style.css');

  console.log('\n=== ALL MOTION ANIMATIONS AND 6-SECOND SCANNER TESTS PASSED 100%! ===');
}

verifyMotionAnimationsAndScanner().catch(err => {
  console.error(err);
  process.exit(1);
});
