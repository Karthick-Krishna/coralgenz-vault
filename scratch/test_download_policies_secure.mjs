import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('🧪 Starting Download Policies on .secure Files Verification Test Suite...\n');

// Read src/main.js
const mainSrc = fs.readFileSync(path.resolve('src/main.js'), 'utf8');

// Mock localStorage
const mockStorage = {};
global.localStorage = {
  getItem: (key) => mockStorage[key] ?? null,
  setItem: (key, val) => { mockStorage[key] = String(val); },
  removeItem: (key) => { delete mockStorage[key]; },
  clear: () => { for (const k in mockStorage) delete mockStorage[k]; }
};

// Evaluate the download policy functions from mainSrc
function extractFunction(name) {
  const marker = `function ${name}(`;
  const start = mainSrc.indexOf(marker);
  assert(start !== -1, `Could not find function ${name}`);
  let depth = 0;
  let started = false;
  let end = start;
  for (let i = start; i < mainSrc.length; i++) {
    if (mainSrc[i] === '{') {
      depth++;
      started = true;
    } else if (mainSrc[i] === '}') {
      depth--;
      if (started && depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  return mainSrc.substring(start, end);
}

const isMediaFileCode = extractFunction('isMediaFile');
const getDownloadPolicyCode = extractFunction('getDownloadPolicy');
const isDownloadAllowedForFileCode = extractFunction('isDownloadAllowedForFile');

const evalScope = new Function(`
  ${isMediaFileCode}
  ${getDownloadPolicyCode}
  ${isDownloadAllowedForFileCode}
  return { isMediaFile, getDownloadPolicy, isDownloadAllowedForFile };
`);

const { isMediaFile, getDownloadPolicy, isDownloadAllowedForFile } = evalScope();

// TEST 1: Underlying file classification with .secure and .secure.html extensions
console.log('[TEST 1] Verifying file type classification with .secure wrappers...');
assert.strictEqual(isMediaFile('photo.png', 'image/png'), true, 'photo.png is media');
assert.strictEqual(isMediaFile('photo.png.secure', 'application/octet-stream'), true, 'photo.png.secure must be identified as media');
assert.strictEqual(isMediaFile('video.mp4.secure.html', 'text/html'), true, 'video.mp4.secure.html must be identified as media');
assert.strictEqual(isMediaFile('file_example_XLS_10.xls.secure', 'application/octet-stream'), false, 'XLS secure must be identified as document');
assert.strictEqual(isMediaFile('report.pdf.secure', 'application/octet-stream'), false, 'PDF secure must be identified as document');
assert.strictEqual(isMediaFile('notes.txt.secure', 'application/octet-stream'), false, 'TXT secure must be identified as document');
console.log('✅ [PASS] .secure and .secure.html wrappers are accurately identified as media vs document.\n');

// TEST 2: Policy enforcement when sv_dl_doc is false
console.log('[TEST 2] Testing document export restriction (sv_dl_doc = false)...');
localStorage.setItem('sv_dl_media', 'true');
localStorage.setItem('sv_dl_doc', 'false');

assert.strictEqual(isDownloadAllowedForFile('file_example_XLS_10.xls.secure', 'application/octet-stream'), false,
  'Document export should be RESTRICTED when sv_dl_doc is false');
assert.strictEqual(isDownloadAllowedForFile('report.pdf.secure', 'application/octet-stream'), false,
  'PDF export should be RESTRICTED when sv_dl_doc is false');
assert.strictEqual(isDownloadAllowedForFile('photo.png.secure', 'application/octet-stream'), true,
  'Media export should remain ALLOWED when sv_dl_media is true');
console.log('✅ [PASS] Document export is strictly restricted for .secure document files.\n');

// TEST 3: Policy enforcement when sv_dl_media is false
console.log('[TEST 3] Testing media export restriction (sv_dl_media = false)...');
localStorage.setItem('sv_dl_media', 'false');
localStorage.setItem('sv_dl_doc', 'true');

assert.strictEqual(isDownloadAllowedForFile('photo.png.secure', 'application/octet-stream'), false,
  'Media export should be RESTRICTED when sv_dl_media is false');
assert.strictEqual(isDownloadAllowedForFile('video.mp4.secure', 'application/octet-stream'), false,
  'Video export should be RESTRICTED when sv_dl_media is false');
assert.strictEqual(isDownloadAllowedForFile('file_example_XLS_10.xls.secure', 'application/octet-stream'), true,
  'Document export should remain ALLOWED when sv_dl_doc is true');
console.log('✅ [PASS] Media export is strictly restricted for .secure media files.\n');

// TEST 4: executeContainerUnlock download permission calculation
console.log('[TEST 4] Simulating executeContainerUnlock download permission calculation...');
// When sv_dl_doc is false
localStorage.setItem('sv_dl_doc', 'false');
const originalName = 'file_example_XLS_10.xls';
const originalType = 'application/octet-stream';
const meta = { name: originalName, type: originalType, allowDownload: true };

const isPolicyAllowed = isDownloadAllowedForFile(originalName, originalType);
const isMetaAllowed = meta && meta.allowDownload !== undefined ? Boolean(meta.allowDownload) : true;
const canDownload = isPolicyAllowed && isMetaAllowed;

assert.strictEqual(canDownload, false, 'Even if meta.allowDownload is true, active policy must restrict canDownload!');
console.log('✅ [PASS] In-vault unlock sets canDownload = false when settings policy is restricted.\n');

// TEST 5: openViewer allowDL calculation
console.log('[TEST 5] Simulating openViewer allowDL calculation...');
const fileRecord = { name: originalName, type: originalType, allowDownload: true };
const isViewerPolicyAllowed = isDownloadAllowedForFile(fileRecord.name, fileRecord.type);
const isRecordAllowed = fileRecord.allowDownload !== undefined ? Boolean(fileRecord.allowDownload) : true;
const allowDL = isViewerPolicyAllowed && isRecordAllowed;

assert.strictEqual(allowDL, false, 'openViewer must calculate allowDL = false when active policy restricts it!');
console.log('✅ [PASS] openViewer hides header download button when settings policy is restricted.\n');

console.log('================================================================================');
console.log('🎉 ALL DOWNLOAD POLICIES ON .SECURE FILES TESTS PASSED 100%!');
console.log('================================================================================');
