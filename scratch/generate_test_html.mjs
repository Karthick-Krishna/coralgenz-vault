import fs from 'fs';
import * as XLSX from 'xlsx';
import { webcrypto } from 'crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;
import { SecureCrypto } from '../src/crypto.js';

// Load the main.js file to extract generateSecureHTMLParts
const mainjs = fs.readFileSync('../src/main.js', 'utf8');

// We can't easily extract generateSecureHTMLParts because it relies on MAMMOTH_CODE_DEFLATED, XLSX_CORE_DEFLATED etc.
// Instead, let's just grep the css and HTML generation directly from main.js to inspect it.
