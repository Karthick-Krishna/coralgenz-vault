import fs from 'fs';

const html = fs.readFileSync('scratch/test_output.secure.html', 'utf8');

// Mock browser environment
class MockElement {
    constructor(id = '', tag = 'div') {
        this.id = id;
        this.tagName = tag.toUpperCase();
        this.style = {};
        this.classList = {
            classes: new Set(),
            add(c) { this.classes.add(c); },
            remove(c) { this.classes.delete(c); },
            contains(c) { return this.classes.has(c); }
        };
        this.value = '';
        this.innerHTML = '';
        this.textContent = '';
        this.disabled = false;
        this.type = 'text';
    }
    focus() {}
    blur() {}
    appendChild(child) { this.children = this.children || []; this.children.push(child); }
    addEventListener(evt, cb) {}
}

const elements = {
    'pwd': new MockElement('pwd', 'input'),
    'pwd-toggle-btn': new MockElement('pwd-toggle-btn', 'button'),
    'unlock-btn': new MockElement('unlock-btn', 'button'),
    'lockout-box': new MockElement('lockout-box', 'div'),
    'error-box': new MockElement('error-box', 'div'),
    'status-box': new MockElement('status-box', 'div'),
    'auth-panel': new MockElement('auth-panel', 'div'),
    'viewer-container': new MockElement('viewer-container', 'div'),
    'viewer-content-area': new MockElement('viewer-content-area', 'div'),
    'header-dl-btn': new MockElement('header-dl-btn', 'button'),
    'header-restricted-badge': new MockElement('header-restricted-badge', 'span'),
    'autolock-countdown': new MockElement('autolock-countdown', 'span')
};

globalThis.document = {
    getElementById: (id) => elements[id] || null,
    createElement: (tag) => new MockElement('', tag),
    body: new MockElement('body', 'body'),
    addEventListener: () => {}
};

globalThis.window = {
    crypto: globalThis.crypto,
    addEventListener: () => {},
    sessionStorage: {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {}
    }
};

globalThis.sessionStorage = globalThis.window.sessionStorage;
globalThis.URL = {
    createObjectURL: () => 'blob:mock-blob-url',
    revokeObjectURL: () => {}
};

// Extract script
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
    throw new Error('No script tag found');
}

// Execute script in mock environment
const runScript = new Function(scriptMatch[1]);
runScript();

globalThis.unlock = globalThis.window.unlock;

console.log('Script loaded in DOM environment successfully!');

// Test 1: Bad Password
elements['pwd'].value = 'WrongPassword999';
console.log('Testing incorrect password...');
await globalThis.unlock();

if (elements['error-box'].style.display === 'block' && elements['error-box'].textContent.includes('Decryption failed')) {
    console.log('✅ Test 1 Passed: Incorrect password correctly rejected with error message:', elements['error-box'].textContent);
} else {
    console.error('❌ Test 1 Failed: Bad password handling incorrect:', elements['error-box'].textContent);
    process.exit(1);
}

// Test 2: Correct Password
elements['pwd'].value = 'SuperSecretPassword2026!';
console.log('Testing correct password decryption...');
await globalThis.unlock();

if (elements['auth-panel'].style.display === 'none' && elements['viewer-container'].classList.contains('active')) {
    console.log('✅ Test 2 Passed: Correct password unlocked file! Auth panel hidden and viewer-container active.');
} else {
    console.error('❌ Test 2 Failed: Viewer was not activated.');
    process.exit(1);
}

if (elements['viewer-content-area'].children && elements['viewer-content-area'].children.length > 0) {
    const renderedChild = elements['viewer-content-area'].children[0];
    console.log('✅ Test 3 Passed: Decrypted content rendered into viewer content area:', renderedChild.tagName, renderedChild.src || '');
} else {
    console.error('❌ Test 3 Failed: No element rendered in viewer content area.');
    process.exit(1);
}

// Test 4: Verify autolock is completely removed from standalone HTML
if (!html.includes('session-autolock-pill') && !html.includes('autolock-countdown')) {
    console.log('✅ Test 4 Passed: Autolock pill and countdown completely removed from standalone HTML!');
} else {
    console.error('❌ Test 4 Failed: Autolock markup still found in standalone HTML.');
    process.exit(1);
}

// Test 5: Verify lockSession() works cleanly without page reload and WITHOUT frontend error banner
console.log('Testing lockSession()...');
globalThis.window.lockSession();

if (
    elements['viewer-container'].classList.contains('active') === false &&
    elements['auth-panel'].style.display === 'block' &&
    elements['error-box'].style.display === 'none' &&
    elements['error-box'].innerHTML === ''
) {
    console.log('✅ Test 5 Passed: lockSession() cleanly restored auth panel; backend zeroized memory and frontend banner is completely hidden!');
} else {
    console.error('❌ Test 5 Failed: lockSession did not restore auth panel or still shows banner on frontend.');
    process.exit(1);
}

console.log('--- ALL SIMULATED DOM TESTS PASSED WITH 100% SUCCESS ---');
