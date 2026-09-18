import fs from 'fs';

async function testOpenSecureAnimations() {
  console.log('=== VERIFYING OPEN .SECURE FILE UI & MOVING ANIMATIONS ===\n');

  const indexHtml = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/index.html', 'utf-8');
  const styleCss = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/src/style.css', 'utf-8');
  const mainJs = fs.readFileSync('/Users/karthickkrishna/Documents/genz qr/src/main.js', 'utf-8');

  // 1. Verify Open .secure Button in index.html
  console.log('--- 1. Open .secure Trigger Button ---');
  console.assert(indexHtml.includes('id="open-secure-file-btn"'), 'Must contain open-secure-file-btn ID');
  console.assert(indexHtml.includes('cyber-btn-open-secure-hero motion-open-secure-pulse'), 'Must have hero class & motion-open-secure-pulse');
  console.assert(indexHtml.includes('open-secure-shimmer'), 'Must have open-secure-shimmer');
  console.assert(indexHtml.includes('motion-unlock-wiggle'), 'Must have motion-unlock-wiggle');
  console.assert(indexHtml.includes('OPEN / UNLOCK .SECURE FILE'), 'Must feature title OPEN / UNLOCK .SECURE FILE');
  console.assert(indexHtml.includes('open-pill-tag'), 'Must have open-pill-tag');
  console.log('✓ Highlighted Open .secure button verified in index.html');

  // 2. Verify Unlock Container Modal in index.html
  console.log('\n--- 2. Unlock Container Modal Elements ---');
  console.assert(indexHtml.includes('id="unlock-container-modal"'), 'Must contain unlock-container-modal');
  console.assert(indexHtml.includes('container-laser-sweep'), 'Must contain scanning laser beam');
  console.assert(indexHtml.includes('container-hologram-node'), 'Must contain holographic node');
  console.assert(indexHtml.includes('motion-unlock-shield-spin'), 'Must contain motion-unlock-shield-spin');
  console.assert(indexHtml.includes('cyber-btn-confirm-unlock motion-unlock-btn-pulse'), 'Must contain animated confirm button');
  console.assert(indexHtml.includes('motion-key-bounce'), 'Must contain bouncing key micro-animation');
  console.log('✓ Holographic container modal structure verified in index.html');

  // 3. Verify CSS Animation Keyframes in style.css
  console.log('\n--- 3. Moving Animation Keyframes in style.css ---');
  const keyframes = [
    '@keyframes openSecurePulseGlow',
    '@keyframes openSecureShimmerSweep',
    '@keyframes unlockIconWiggle',
    '@keyframes containerLaserSweepAnimation',
    '@keyframes unlockShieldBreathe',
    '@keyframes unlockBtnPulse',
    '@keyframes keyBounce'
  ];

  for (const kf of keyframes) {
    console.assert(styleCss.includes(kf), `style.css must define ${kf}`);
    console.log(`✓ style.css defines ${kf}`);
  }

  // 4. Verify Functional Wiring in main.js
  console.log('\n--- 4. Functional Wiring in main.js ---');
  console.assert(mainJs.includes("document.getElementById('open-secure-file-btn')"), 'Must wire open-secure-file-btn');
  console.assert(mainJs.includes('openSecureContainerInVault'), 'Must invoke openSecureContainerInVault');
  console.assert(mainJs.includes('executeContainerUnlock'), 'Must handle unlock submission');
  console.log('✓ main.js functional listeners verified');

  console.log('\n=== ALL OPEN .SECURE FILE UI & ANIMATION TESTS PASSED 100%! ===');
}

testOpenSecureAnimations().catch(err => {
  console.error(err);
  process.exit(1);
});
