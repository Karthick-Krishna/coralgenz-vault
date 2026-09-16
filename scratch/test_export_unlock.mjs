import { readFileSync, writeFileSync } from 'fs';
import { webcrypto } from 'node:crypto';
if (!globalThis.crypto) {
    globalThis.crypto = webcrypto;
}
import { JSDOM } from 'jsdom';
import { SecureCrypto, MILSPEC_ANTI_CRACKER_PEPPER_V9 } from '../src/crypto.js';

// 1. Generate an HTML payload by simulating exportSecureFile
// First, we need to extract `generateSecureHTMLParts` from main.js
const mainJsCode = readFileSync('../src/main.js', 'utf-8');
const generateFnRegex = /function generateSecureHTMLParts[\s\S]+?(?=\n\n\/\/ Common export function)/m;
const generateFnCode = mainJsCode.match(generateFnRegex)[0];

const evaluateFn = new Function('fileMeta', 'salt', 'iv', 'customization', `
    const isDownloadAllowedForFile = () => true;
    const escapeHTML = (str) => str;
    ${generateFnCode}
    return generateSecureHTMLParts(fileMeta, salt, iv, customization);
`);

async function run() {
    const password = 'test';
    const payload = new TextEncoder().encode('Hello, world!');
    const salt = SecureCrypto.generateSalt();
    const exportKey = await SecureCrypto.deriveKey12Stage(password, salt, 2000000, MILSPEC_ANTI_CRACKER_PEPPER_V9);
    
    // We use encryptData in the same way main.js does
    const { iv, ciphertext } = await SecureCrypto.encryptData(exportKey, payload);
    
    const { header, footer } = evaluateFn({ name: 'test.secure.html', type: 'text/plain', size: payload.byteLength, id: '123' }, salt, iv, { allowDownload: true, integrityHash: 'mock' });
    
    const base64Data = Buffer.from(ciphertext).toString('base64');
    const rawHtml = header + base64Data + footer;
    
    // Obfuscate (simulating what exportSecureFile does)
    function encodeBase64Utf8(str) {
      const bytes = new TextEncoder().encode(str);
      let binary = '';
      const len = bytes.byteLength;
      for (let i = 0; i < len; i += 32000) {
        const chunk = bytes.subarray(i, Math.min(i + 32000, len));
        binary += String.fromCharCode.apply(null, chunk);
      }
      return btoa(binary);
    }
    const obfuscatedHTML = `<!DOCTYPE html><html><body><script>
      var payload = "${encodeBase64Utf8(rawHtml)}";
      var text = atob(payload);
      var len = text.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) bytes[i] = text.charCodeAt(i);
      var decoded = (new TextDecoder()).decode(bytes);
      document.write(decoded);
    </script></body></html>`;
    
    writeFileSync('scratch/exported.secure.html', obfuscatedHTML);
    console.log('Exported scratch/exported.secure.html');
}
run().catch(console.error);
