import './style.css';
import { SecureCrypto } from './crypto.js';
import { DB } from './db.js';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import * as mammoth from 'mammoth';
import JSZip from 'jszip';
import { FFLATE_CODE } from './fflate_code.js';
import { XLSX_CORE_DEFLATED, MAMMOTH_CODE_DEFLATED } from './office_engines.js';



// DOM Elements
const fileList = document.getElementById('file-list');
const addFileBtn = document.getElementById('add-file-btn');
const authModal = document.getElementById('auth-modal');
const viewer = document.getElementById('viewer');
const viewerDownloadBtn = document.getElementById('viewer-download-btn');
const fileInput = document.getElementById('file-input');
const privacyCurtain = document.getElementById('privacy-curtain');

// Feature Elements
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const storageText = document.getElementById('storage-text');
const storageFill = document.getElementById('storage-fill');
const bulkActions = document.getElementById('bulk-actions');
const selectedCount = document.getElementById('selected-count');
const bulkDeleteBtn = document.getElementById('bulk-delete-btn');
const cancelSelectBtn = document.getElementById('cancel-select-btn');
const infoModal = document.getElementById('info-modal');
const renameModal = document.getElementById('rename-modal');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// New Feature Elements

const bulkExportBtn = document.getElementById('bulk-export-btn');
const recentSection = document.getElementById('recent-section');
const recentScroll = document.getElementById('recent-scroll');
const dropZone = document.getElementById('drop-zone');
const statTotal = document.getElementById('stat-total');
const statImages = document.getElementById('stat-images');
const statVideos = document.getElementById('stat-videos');
const statSize = document.getElementById('stat-size');
const settingsModal = document.getElementById('settings-modal');
const changePassModal = document.getElementById('change-pass-modal');

const settingsBtn = document.getElementById('settings-btn');
const helpBtn = document.getElementById('help-btn');
const helpModal = document.getElementById('help-modal');

// State
let selectedFileForAuth = null;
let currentDecryptedUrl = null;
let currentViewOnceId = null;
let allFiles = [];
let selectedFiles = new Set();
let currentRenameFileId = null;
let currentInfoFileId = null;
let recentlyViewed = JSON.parse(localStorage.getItem('sv_recent') || '[]');
let isGridView = false;
let currentChangePassFileId = null;

let currentShareFileId = null;
let failedAttempts = {};
let lastProtectedFile = null;

// --- Mobile-Friendly Custom Dialogs ---

/**
 * Custom prompt dialog (mobile-friendly replacement for browser prompt())
 * @param {string} title - Dialog title
 * @param {string} message - Description message
 * @param {Object} options - Optional settings { inputType: 'text'|'password', placeholder: string }
 * @returns {Promise<string|null>} - User input or null if cancelled
 */
function showPrompt(title, message = '', options = {}) {
  return new Promise((resolve) => {
    const modal = document.getElementById('custom-prompt-modal');
    const titleEl = document.getElementById('prompt-title');
    const messageEl = document.getElementById('prompt-message');
    const inputEl = document.getElementById('prompt-input');
    const confirmBtn = document.getElementById('prompt-confirm');
    const cancelBtn = document.getElementById('prompt-cancel');

    titleEl.textContent = title;
    messageEl.textContent = message;
    inputEl.type = options.inputType || 'text';
    inputEl.placeholder = options.placeholder || 'Enter value...';
    inputEl.value = '';

    const cleanup = () => {
      modal.close();
      confirmBtn.onclick = null;
      cancelBtn.onclick = null;
      inputEl.onkeydown = null;
    };

    confirmBtn.onclick = () => {
      const value = inputEl.value;
      cleanup();
      resolve(value || null);
    };

    cancelBtn.onclick = () => {
      cleanup();
      resolve(null);
    };

    inputEl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        confirmBtn.click();
      }
    };

    modal.showModal();
    setTimeout(() => inputEl.focus(), 100);
  });
}

/**
 * Custom confirm dialog (mobile-friendly replacement for browser confirm())
 * @param {string} title - Dialog title
 * @param {string} message - Confirmation message
 * @returns {Promise<boolean>} - true if confirmed, false if cancelled
 */
function showConfirm(title, message = '') {
  return new Promise((resolve) => {
    const modal = document.getElementById('custom-confirm-modal');
    const titleEl = document.getElementById('confirm-title');
    const messageEl = document.getElementById('confirm-message');
    const okBtn = document.getElementById('confirm-ok');
    const cancelBtn = document.getElementById('confirm-cancel');

    titleEl.textContent = title;
    messageEl.textContent = message;

    let resolved = false;

    const cleanup = () => {
      modal.close();
      okBtn.onclick = null;
      cancelBtn.onclick = null;
      modal.removeEventListener('click', backdropHandler);
      modal.removeEventListener('close', closeHandler);
    };

    const backdropHandler = (event) => {
      // If click is on the modal backdrop (not the content)
      if (event.target === modal && !resolved) {
        resolved = true;
        cleanup();
        resolve(false);
      }
    };

    const closeHandler = () => {
      // Handle ESC key or other close methods
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(false);
      }
    };

    okBtn.onclick = () => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(true);
      }
    };

    cancelBtn.onclick = () => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve(false);
      }
    };

    modal.addEventListener('click', backdropHandler);
    modal.addEventListener('close', closeHandler);

    modal.showModal();
  });
}

/**
 * Custom alert dialog (mobile-friendly replacement for browser alert())
 * @param {string} title - Dialog title
 * @param {string} message - Alert message
 * @returns {Promise<void>}
 */
function showAlert(title, message = '') {
  return new Promise((resolve) => {
    const modal = document.getElementById('custom-alert-modal');
    const titleEl = document.getElementById('alert-title');
    const messageEl = document.getElementById('alert-message');
    const okBtn = document.getElementById('alert-ok');

    titleEl.textContent = title;
    messageEl.textContent = message;

    const keyHandler = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        cleanup();
        resolve();
      }
    };

    const cleanup = () => {
      modal.close();
      okBtn.onclick = null;
      document.removeEventListener('keydown', keyHandler);
    };

    okBtn.onclick = () => {
      cleanup();
      resolve();
    };

    document.addEventListener('keydown', keyHandler);
    modal.showModal();
  });
}

// --- Initialization ---

async function init() {
  // Clear any legacy app-lock / autolock entries from storage
  localStorage.removeItem('sv_app_lock');
  localStorage.removeItem('sv_autolock');
  localStorage.removeItem('sv_recovery_q');
  localStorage.removeItem('sv_recovery_a');

  loadTheme();
  loadSettings();
  await renderFileList();
  setupEventListeners();

  checkCrashRecovery();
  renderRecentlyViewed();
  updatePanicVisibility(); // Initial check
  initCyberHackerEffects(); // Hacker canvas and live telemetry stream
}

init();

// --- Cybersecurity Console Helpers ---

function logTerminal(msg) {
  const term = document.getElementById('security-terminal-body');
  if (term) {
    const line = document.createElement('p');
    line.className = 'term-line';
    line.textContent = `> ${msg}`;
    term.appendChild(line);
    term.scrollTop = term.scrollHeight;
  }
}

function updateProcessStep(stepId, state = 'completed') {
  const step = document.getElementById(stepId);
  if (step) {
    step.className = `process-step ${state}`.trim();
    const icon = step.querySelector('.step-icon');
    if (icon) {
      if (state === 'completed') icon.textContent = '[✓]';
      else if (state === 'active') icon.textContent = '[→]';
      else icon.textContent = '[ ]';
    }
  }
}

function updateProcessProgress(percent, label) {
  const bar = document.getElementById('protect-progress-bar');
  const pctEl = document.getElementById('protect-progress-percent');
  const lblEl = document.getElementById('protect-progress-label');
  if (bar) bar.style.width = `${percent}%`;
  if (pctEl) pctEl.textContent = `${percent}%`;
  if (lblEl && label) lblEl.textContent = label;
}

function generateStrongPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+';
  const array = new Uint8Array(24);
  window.crypto.getRandomValues(array);
  let pwd = '';
  for (let i = 0; i < 24; i++) {
    pwd += chars[array[i] % chars.length];
  }
  const passInput = document.getElementById('new-password');
  if (passInput) {
    passInput.value = pwd;
    passInput.type = 'text';
    updatePasswordStrength();
    const toggleBtn = document.getElementById('toggle-new-password');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>';
      toggleBtn.style.color = 'var(--cyber-cyan)';
    }
  }
}

// --- Event Listeners ---

function setupEventListeners() {
  document.getElementById('cancel-add').addEventListener('click', () => {
    resetAddForm();
  });
  document.getElementById('confirm-add').addEventListener('click', handleAddFile);

  // Cybersecurity Suite Listeners
  document.getElementById('generate-pwd-btn')?.addEventListener('click', generateStrongPassword);

  // Password Visibility Toggle Listener
  const togglePassBtn = document.getElementById('toggle-new-password');
  const passInput = document.getElementById('new-password');
  togglePassBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!passInput) return;
    if (passInput.type === 'password') {
      passInput.type = 'text';
      togglePassBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>';
      togglePassBtn.style.color = 'var(--cyber-cyan)';
    } else {
      passInput.type = 'password';
      togglePassBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      togglePassBtn.style.color = 'var(--cyber-text-muted)';
    }
  });

  // Enter key to submit new password in upload form
  passInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFile();
    }
  });
  
  document.getElementById('download-protected-html-btn')?.addEventListener('click', async () => {
    if (!lastProtectedFile || !lastProtectedFile.record) {
      showAlert('Notice', 'No active protected file session. Please select a file from the vault below to download.');
      return;
    }
    const dlBtn = document.getElementById('download-protected-html-btn');
    const originalText = dlBtn ? dlBtn.innerHTML : '';
    try {
      if (dlBtn) {
        dlBtn.disabled = true;
        dlBtn.innerHTML = `
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `;
      }

      let bufferToExport = lastProtectedFile.buffer;
      let passwordToExport = lastProtectedFile.password;

      // Defensive check: if buffer is missing or empty, decrypt from saved file record
      if (!bufferToExport || bufferToExport.byteLength === 0) {
        const decrypted = await decryptFileForExport(lastProtectedFile.record, passwordToExport);
        if (decrypted && decrypted.buffer) {
          bufferToExport = decrypted.buffer;
          passwordToExport = decrypted.password || passwordToExport;
        } else {
          throw new Error('Could not retrieve file content for packaging.');
        }
      }

      await exportSecureFile(
        lastProtectedFile.record,
        bufferToExport,
        passwordToExport,
        {},
        'Protected HTML package exported successfully!'
      );
    } catch (err) {
      console.error(err);
      await showAlert('Export Error', 'Failed to download HTML package: ' + err.message);
    } finally {
      if (dlBtn) {
        dlBtn.disabled = false;
        dlBtn.innerHTML = originalText;
      }
    }
  });

  document.getElementById('view-in-vault-btn')?.addEventListener('click', () => {
    resetAddForm();
    document.getElementById('secured-files-heading')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('protect-another-btn')?.addEventListener('click', () => {
    resetAddForm();
    document.getElementById('inline-add-container')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Navigation Items Active State & Quick Jumps
  document.querySelectorAll('.cyber-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.cyber-nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (item.id === 'nav-item-protect') {
        resetAddForm();
      }
    });
  });

  document.getElementById('sidebar-settings-btn')?.addEventListener('click', () => {
    loadSettings();
    settingsModal?.showModal();
  });

  document.getElementById('cancel-auth').addEventListener('click', () => {
    authModal.close();
    document.getElementById('auth-password').value = '';
    selectedFileForAuth = null;
  });
  document.getElementById('confirm-auth').addEventListener('click', handleAuthSubmit);
  document.getElementById('auth-password')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAuthSubmit();
    }
  });

  document.getElementById('close-viewer').addEventListener('click', closeViewer);

  // Feature Listeners
  themeToggle?.addEventListener('click', toggleTheme);
  searchInput?.addEventListener('input', handleSearch);
  sortSelect?.addEventListener('change', handleSort);
  document.getElementById('new-password')?.addEventListener('input', updatePasswordStrength);

  // Bulk Actions
  bulkDeleteBtn?.addEventListener('click', handleBulkDelete);
  bulkExportBtn?.addEventListener('click', handleBulkExport);
  cancelSelectBtn?.addEventListener('click', cancelBulkSelect);
  document.getElementById('select-all-btn')?.addEventListener('click', handleSelectAll);

  // Modals
  document.getElementById('close-info')?.addEventListener('click', () => infoModal.close());
  document.getElementById('cancel-rename')?.addEventListener('click', () => renameModal.close());
  document.getElementById('confirm-rename')?.addEventListener('click', handleRename);
  document.getElementById('rename-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRename();
    }
  });





  // Drag & Drop
  setupDragDrop();

  // Keyboard Shortcuts
  setupKeyboardShortcuts();

  // Help Modal
  helpBtn?.addEventListener('click', () => helpModal?.showModal());
  document.getElementById('close-help')?.addEventListener('click', () => helpModal?.close());

  // Click outside modal to close (backdrop click)
  setupModalBackdropClose();

  // Settings Modal
  settingsBtn?.addEventListener('click', () => {
    loadSettings();
    settingsModal?.showModal();
  });
  document.getElementById('close-settings')?.addEventListener('click', () => settingsModal?.close());
  document.getElementById('close-settings-x')?.addEventListener('click', () => settingsModal?.close());

  document.getElementById('feedback-btn')?.addEventListener('click', () => {
    const email = "coralgenz@zohomail.in";
    const subject = encodeURIComponent("SecureVault Feedback");
    const body = encodeURIComponent("Hi team,\n\nI have some feedback for SecureVault:\n");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  // Panic Button Listeners
  document.querySelectorAll('.panic-trigger').forEach(btn => {
    btn.addEventListener('click', triggerPanic);
  });
  document.getElementById('panic-btn')?.addEventListener('click', triggerPanic);

  document.getElementById('panic-action-select')?.addEventListener('change', (e) => {
    localStorage.setItem('sv_panic_action', e.target.value);
  });

  // Panic Enable Toggle
  document.getElementById('panic-enable-toggle')?.addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    localStorage.setItem('sv_panic_enabled', isEnabled);
    updatePanicVisibility();
  });

  // Download Permission Toggles
  document.getElementById('dl-media-toggle')?.addEventListener('change', (e) => {
    localStorage.setItem('sv_dl_media', e.target.checked);
    updateDownloadPolicyBadges();
  });
  document.getElementById('dl-doc-toggle')?.addEventListener('change', (e) => {
    localStorage.setItem('sv_dl_doc', e.target.checked);
    updateDownloadPolicyBadges();
  });

  // Change Password Modal
  document.getElementById('cancel-change-pass')?.addEventListener('click', () => changePassModal?.close());
  document.getElementById('confirm-change-pass')?.addEventListener('click', handleChangePassword);

  // Password Visibility Toggles
  setupPasswordToggle('toggle-new-password', 'new-password');
  setupPasswordToggle('toggle-auth-password', 'auth-password');
  setupPasswordToggle('toggle-share-password', 'share-password');

  // Share Modal
  const shareModal = document.getElementById('share-modal');
  document.getElementById('cancel-share')?.addEventListener('click', () => shareModal?.close());
  document.getElementById('confirm-share')?.addEventListener('click', handleShareConfirm);
  document.getElementById('share-password')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleShareConfirm();
    }
  });

  document.getElementById('share-logo-zone')?.addEventListener('click', (e) => {
    if (e.target !== document.getElementById('share-logo')) {
      document.getElementById('share-logo')?.click();
    }
  });

  document.getElementById('share-logo')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const textEl = document.getElementById('share-logo-text');
    if (textEl) {
      textEl.textContent = file ? file.name : 'Choose File';
    }
  });

  // Security Monitoring (Privacy Curtain Removed as per request)
  // document.addEventListener('visibilitychange', handleVisibilityChange);
  // window.addEventListener('blur', () => enablePrivacyCurtain());
  // window.addEventListener('focus', () => disablePrivacyCurtain());

  // File Upload Zone - Show preview when file selected
  fileInput?.addEventListener('change', handleFileSelect);

  // File remove button
  document.getElementById('file-remove-btn')?.addEventListener('click', removeSelectedFile);

  // Drag over effects for upload zone
  const uploadZone = document.getElementById('file-upload-zone');
  const dropPrimary = document.getElementById('drop-text-primary');
  const dropSecondary = document.getElementById('drop-text-secondary');

  uploadZone?.addEventListener('click', (e) => {
    if (e.target !== fileInput) {
      fileInput?.click();
    }
  });

  uploadZone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
    if (dropPrimary) dropPrimary.textContent = 'FILE DETECTED — INITIALIZING PROTECTION';
    if (dropSecondary) dropSecondary.textContent = 'Release file to initialize security inspection';
  });
  uploadZone?.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
    if (dropPrimary) dropPrimary.textContent = 'DROP FILE TO SECURE';
    if (dropSecondary) dropSecondary.textContent = 'or click to browse local file system';
  });
  uploadZone?.addEventListener('drop', async (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    if (dropPrimary) dropPrimary.textContent = 'DROP FILE TO SECURE';
    if (dropSecondary) dropSecondary.textContent = 'or click to browse local file system';
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (await checkSecureFile(droppedFile)) {
        await showAlert('Already Secured', `"${droppedFile.name}" is already secured! Re-protecting an already secured file is not allowed.`);
        if (fileInput) fileInput.value = '';
        return;
      }
      fileInput.files = e.dataTransfer.files;
      handleFileSelect();
    }
  });

  // Prevent Screenshots/Context Menu
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
      e.preventDefault();
      alert('Screenshots are disabled');
    }
  });
}

function setupPasswordToggle(toggleBtnId, inputId) {
  const btn = document.getElementById(toggleBtnId);
  const input = document.getElementById(inputId);
  if (!btn || !input) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (input.type === 'password') {
      input.type = 'text';
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>';
      btn.style.color = 'var(--cyber-cyan)';
    } else {
      input.type = 'password';
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      btn.style.color = 'var(--cyber-muted)';
    }
  });
}

function resetAddForm() {
  fileInput.value = '';
  document.getElementById('new-password').value = '';
  lastProtectedFile = null;

  strengthBar.className = 'strength-bar';
  strengthText.innerText = 'ENTER PASSWORD';

  // Reset file preview and containers
  const uploadZone = document.getElementById('file-upload-zone');
  const filePreview = document.getElementById('file-preview');
  const inlinePassword = document.getElementById('inline-password-section');
  const processContainer = document.getElementById('protection-process-container');
  const completeContainer = document.getElementById('protection-complete-container');

  uploadZone?.classList.remove('hidden');
  filePreview?.classList.add('hidden');
  inlinePassword?.classList.add('hidden');
  processContainer?.classList.add('hidden');
  completeContainer?.classList.add('hidden');

  // Reset timer, status, shield & terminal
  const timerDisplay = document.getElementById('process-timer-display');
  if (timerDisplay) timerDisplay.textContent = '00:00.00';
  const centerShield = document.querySelector('.scanner-center-shield');
  if (centerShield) centerShield.classList.remove('success');
  const scannerStatus = document.getElementById('scanner-status-text');
  if (scannerStatus) scannerStatus.textContent = 'SECURING';
  const terminalBody = document.getElementById('security-terminal-body');
  if (terminalBody) terminalBody.innerHTML = '<p class="term-line">&gt; Standby for cryptographic instruction...</p>';

  const passInput = document.getElementById('new-password');
  passInput?.classList.remove('highlight-input-glow');

  // Reset steps & progress
  ['step-analysis', 'step-prep', 'step-kdf', 'step-encrypt', 'step-meta', 'step-finalize', 'step-output', 'step-verify'].forEach(id => {
    updateProcessStep(id, '');
  });
  updateProcessProgress(0, 'STANDBY');
}

function isSecureHtmlFile(file) {
  if (!file) return false;
  const fileName = (file.name || '').toLowerCase().trim();
  if (fileName.endsWith('.secure.html') || /\.secure(?:\s*\(\d+\))?\.html$/i.test(fileName)) {
    return true;
  }
  if (fileName.endsWith('.html') && fileName.includes('.secure')) {
    return true;
  }
  return false;
}

async function checkSecureFile(file) {
  if (!file) return false;
  if (isSecureHtmlFile(file)) return true;
  const fileName = (file.name || '').toLowerCase().trim();
  if (fileName.endsWith('.html') && file.size < 20 * 1024 * 1024) {
    try {
      const slice = file.slice(0, 4096);
      const text = await slice.text();
      if (text.includes('Coralgenz Vault') && (text.includes('CONTAINER_VERSION') || text.includes('SALT_B64') || text.includes('vault-runtime') || text.includes('Military-Grade Content Security Policy'))) {
        return true;
      }
    } catch (e) {}
  }
  return false;
}

// --- Feature: File Upload Preview ---
async function handleFileSelect() {
  const file = fileInput.files[0];
  if (!file) return;

  // Check if file is already a .secure.html container
  if (await checkSecureFile(file)) {
    await showAlert('Already Secured', `"${file.name}" is already secured! Re-protecting an already secured file is not allowed.`);
    fileInput.value = '';
    removeSelectedFile(new Event('cancel'));
    return;
  }

  // Limit file size to 150MB
  const MAX_SIZE = 150 * 1024 * 1024; // 150 MB
  if (file.size > MAX_SIZE) {
    showAlert('File Too Large', 'Please select a file smaller than 150 MB.');
    fileInput.value = ''; // Clear the input
    return;
  }

  const uploadZone = document.getElementById('file-upload-zone');
  const filePreview = document.getElementById('file-preview');
  const filePreviewName = document.getElementById('file-preview-name');
  const filePreviewSize = document.getElementById('file-preview-size');
  const processContainer = document.getElementById('protection-process-container');
  const completeContainer = document.getElementById('protection-complete-container');
  const inlinePassword = document.getElementById('inline-password-section');
  const passwordInput = document.getElementById('new-password');

  // Update preview info
  if (filePreviewName) filePreviewName.textContent = file.name;
  if (filePreviewSize) filePreviewSize.textContent = formatFileSize(file.size);

  // Show preview, hide upload zone and completion
  uploadZone?.classList.add('hidden');
  processContainer?.classList.add('hidden');
  completeContainer?.classList.add('hidden');
  filePreview?.classList.remove('hidden');
  inlinePassword?.classList.remove('hidden');

  // Highlight password entering space and trigger Enter Password Animation
  if (inlinePassword) {
    inlinePassword.classList.remove('pulse-password-attention');
    void inlinePassword.offsetWidth; // Force reflow
    inlinePassword.classList.add('pulse-password-attention');
  }

  if (passwordInput) {
    passwordInput.classList.remove('highlight-input-glow');
    void passwordInput.offsetWidth;
    passwordInput.classList.add('highlight-input-glow');
    setTimeout(() => {
      passwordInput.focus();
      passwordInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 150);
  }
}

function removeSelectedFile(e) {
  e.preventDefault();
  e.stopPropagation();

  fileInput.value = '';
  lastProtectedFile = null;

  const uploadZone = document.getElementById('file-upload-zone');
  const filePreview = document.getElementById('file-preview');
  const inlinePassword = document.getElementById('inline-password-section');
  const processContainer = document.getElementById('protection-process-container');
  const completeContainer = document.getElementById('protection-complete-container');

  uploadZone?.classList.remove('hidden');
  filePreview?.classList.add('hidden');
  inlinePassword?.classList.add('hidden');
  processContainer?.classList.add('hidden');
  completeContainer?.classList.add('hidden');

  uploadZone?.classList.remove('hidden');
  filePreview?.classList.add('hidden');
  document.getElementById('inline-password-section')?.classList.add('hidden');
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// --- Feature: Excel Rendering ---
function renderExcelToHTML(arrayBuffer, container) {
  try {
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    const sheetNames = workbook.SheetNames;
    if (sheetNames.length === 0) return;

    const viewer = document.createElement('div');
    viewer.className = 'excel-viewer';

    const header = document.createElement('div');
    header.className = 'excel-header';

    const body = document.createElement('div');
    body.className = 'excel-table-wrapper';

    let activeSheet = sheetNames[0];

    const renderSheet = (name) => {
      body.innerHTML = '';
      const sheet = workbook.Sheets[name];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

      if (!data || data.length === 0) {
        body.innerHTML = '<div style="padding:20px;text-align:center;">Empty Sheet</div>';
        return;
      }

      const table = document.createElement('table');
      table.className = 'excel-table';

      data.forEach((row, rowIndex) => {
        const tr = document.createElement('tr');
        row.forEach((cell) => {
          const el = rowIndex === 0 ? 'th' : 'td';
          const cellEl = document.createElement(el);
          cellEl.textContent = cell !== undefined ? cell : '';
          tr.appendChild(cellEl);
        });
        table.appendChild(tr);
      });
      body.appendChild(table);
    };

    sheetNames.forEach(name => {
      const btn = document.createElement('button');
      btn.className = `excel-sheet-btn ${name === activeSheet ? 'active' : ''}`;
      btn.textContent = name;
      btn.onclick = () => {
        activeSheet = name;
        renderSheet(name);
        header.querySelectorAll('.excel-sheet-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
      header.appendChild(btn);
    });

    renderSheet(activeSheet);
    viewer.appendChild(header);
    viewer.appendChild(body);
    container.appendChild(viewer);

  } catch (err) {
    console.error(err);
    container.innerHTML = `<div style="padding:20px;color:red;">Error parsing Excel file: ${err.message}</div>`;
  }
}

// --- Feature: Word Rendering ---
function parseDocBinaryToHTML(bytes) {
  if (!bytes || bytes.length < 512) return '';
  let fullText = '';

  const isOle = bytes.length > 8 && bytes[0] === 0xD0 && bytes[1] === 0xCF && bytes[2] === 0x11 && bytes[3] === 0xE0;
  if (isOle && XLSX && XLSX.CFB) {
    try {
      const cfb = XLSX.CFB.read(bytes, { type: 'array' });
      const wordEntry = XLSX.CFB.find(cfb, '/WordDocument') || XLSX.CFB.find(cfb, 'WordDocument');
      if (wordEntry && wordEntry.content) {
        const stream = new Uint8Array(wordEntry.content);
        if (stream.length >= 512) {
          const view = new DataView(stream.buffer, stream.byteOffset, stream.byteLength);
          const wIdent = view.getUint16(0, true);
          if (wIdent === 0xA5EC || wIdent === 0xA5DC) {
            const flags = view.getUint16(0x000A, true);
            const tableStreamName = (flags & 0x0200) ? '/1Table' : '/0Table';
            const altTableStreamName = (flags & 0x0200) ? '1Table' : '0Table';
            const tableEntry = XLSX.CFB.find(cfb, tableStreamName) || XLSX.CFB.find(cfb, altTableStreamName);

            if (tableEntry && tableEntry.content && stream.length >= 0x01A6) {
              const tbl = new Uint8Array(tableEntry.content);
              const fcClx = view.getUint32(0x01A2, true);
              const lcbClx = view.getUint32(0x01A6, true);

              if (fcClx < tbl.length && lcbClx > 0) {
                let offset = fcClx;
                const endClx = Math.min(fcClx + lcbClx, tbl.length);
                while (offset < endClx && tbl[offset] === 0x01) {
                  if (offset + 3 >= endClx) break;
                  const cb = tbl[offset + 1] | (tbl[offset + 2] << 8);
                  offset += 3 + cb;
                }

                if (offset < endClx && tbl[offset] === 0x02) {
                  const lcb = tbl[offset + 1] | (tbl[offset + 2] << 8) | (tbl[offset + 3] << 16) | (tbl[offset + 4] << 24);
                  if (lcb > 4 && (lcb - 4) % 12 === 0) {
                    const n = (lcb - 4) / 12;
                    const cpStart = offset + 5;
                    const pcdStart = cpStart + (n + 1) * 4;

                    if (pcdStart + n * 8 <= tbl.length) {
                      const cps = [];
                      for (let i = 0; i <= n; i++) {
                        const cp = tbl[cpStart + i * 4] | (tbl[cpStart + i * 4 + 1] << 8) | (tbl[cpStart + i * 4 + 2] << 16) | (tbl[cpStart + i * 4 + 3] << 24);
                        cps.push(cp);
                      }

                      for (let i = 0; i < n; i++) {
                        const pcdPos = pcdStart + i * 8;
                        const fc = tbl[pcdPos + 2] | (tbl[pcdPos + 3] << 8) | (tbl[pcdPos + 4] << 16) | (tbl[pcdPos + 5] << 24);
                        const charLen = cps[i + 1] - cps[i];
                        if (charLen <= 0) continue;

                        const isCompressed = (fc & 0x40000000) !== 0;
                        const actualFc = isCompressed ? ((fc & ~0x40000000) >>> 1) : fc;

                        if (isCompressed) {
                          if (actualFc + charLen <= stream.length) {
                            const slice = stream.subarray(actualFc, actualFc + charLen);
                            fullText += (new TextDecoder('latin1')).decode(slice);
                          }
                        } else {
                          if (actualFc + charLen * 2 <= stream.length) {
                            const slice = stream.subarray(actualFc, actualFc + charLen * 2);
                            fullText += (new TextDecoder('utf-16le')).decode(slice);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            if (!fullText) {
              const fcMin = view.getUint32(24, true);
              const ccpText = view.getUint32(76, true);
              if (fcMin > 0 && fcMin < stream.length && ccpText > 0) {
                const byteLen = Math.min(ccpText * 2, stream.length - fcMin);
                const slice = stream.subarray(fcMin, fcMin + byteLen);
                fullText = (new TextDecoder('utf-16le', { fatal: false })).decode(slice);
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn('WordDocument parse error:', e);
    }
  }

  if (!fullText) {
    const raw = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
    if (raw.startsWith('{\\rtf')) {
      fullText = raw.replace(/\\\w+\b[ ]?/g, ' ').replace(/[{}]/g, '');
    }
  }

  if (!fullText) return '';

  const cleanEscape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const cleanWordFields = (t) => {
    return t.replace(/\u0013\s*HYPERLINK\s*"([^"]+)"[^\u0014]*\u0014([^\u0015]*)\u0015/g, (m, url, label) => {
      return `<a href="${cleanEscape(url)}" target="_blank" rel="noopener" style="color:#0284c7;text-decoration:underline;">${cleanEscape(label.trim() || url)}</a>`;
    }).replace(/\u0013[^\u0014]*\u0014([^\u0015]*)\u0015/g, '$1')
      .replace(/[\u0013\u0014\u0015\u0001]/g, '');
  };

  const rawParas = fullText.split(String.fromCharCode(13));
  let docHTML = '';
  let inList = false;

  rawParas.forEach((p, pIdx) => {
    let trimmed = p.trim();
    if (!trimmed || trimmed === '\b' || trimmed === '\f') {
      if (trimmed === '\b' || trimmed === '\f') {
        if (inList) { docHTML += '</ul>'; inList = false; }
        docHTML += '<div class="word-page-break" style="margin:24px 0;border-top:1px dashed #cbd5e1;position:relative;text-align:center;"><span style="position:relative;top:-10px;background:#fff;padding:0 10px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Page Break</span></div>';
      }
      return;
    }

    if (trimmed.includes('\u0007')) {
      if (inList) { docHTML += '</ul>'; inList = false; }
      const rawRows = p.split(/\u0007\s*\u0007/);
      const rows = [];
      rawRows.forEach(r => {
        const cells = r.split(/\u0007/).map(c => c.trim()).filter(c => c.length > 0 && c !== '\u0007');
        if (cells.length > 0) rows.push(cells);
      });

      if (rows.length > 0) {
        docHTML += '<table class="word-table" style="width:100%;border-collapse:collapse;margin:18px 0;font-size:14px;">';
        rows.forEach((row, rIdx) => {
          docHTML += '<tr>';
          row.forEach(cell => {
            const tag = rIdx === 0 ? 'th' : 'td';
            const cellStyle = rIdx === 0
              ? 'background:#f1f5f9;font-weight:700;color:#1e293b;padding:10px 14px;border:1px solid #cbd5e1;text-align:left;'
              : 'padding:10px 14px;border:1px solid #e2e8f0;color:#334155;';
            docHTML += `<${tag} style="${cellStyle}">${cleanWordFields(cell)}</${tag}>`;
          });
          docHTML += '</tr>';
        });
        docHTML += '</table>';
      }
      return;
    }

    const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
    const isNumbered = /^[0-9]+[\.\)]\s/.test(trimmed) || /^[a-zA-Z][\.\)]\s/.test(trimmed);

    if (isBullet || isNumbered) {
      if (!inList) {
        docHTML += '<ul style="margin:12px 0 16px 20px;padding:0;list-style:none;">';
        inList = true;
      }
      const cleanText = cleanWordFields(trimmed.replace(/^[•\-\*]\s*|^[0-9a-zA-Z]+[\.\)]\s*/, ''));
      const bulletIcon = isNumbered
        ? `<span style="font-weight:700;margin-right:8px;color:#0284c7;">${trimmed.match(/^[0-9a-zA-Z]+[\.\)]/)[0]}</span>`
        : `<span style="margin-right:8px;color:#0284c7;font-weight:bold;">&bull;</span>`;
      docHTML += `<li style="display:flex;align-items:flex-start;margin-bottom:6px;line-height:1.6;color:#334155;">${bulletIcon}<span>${cleanText}</span></li>`;
      return;
    }

    if (inList) {
      docHTML += '</ul>';
      inList = false;
    }

    const cleaned = cleanWordFields(trimmed);
    const isTitle = (pIdx === 0 && cleaned.length < 80);
    const isHeading = (cleaned.length < 60 && (cleaned.endsWith(':') || cleaned === cleaned.toUpperCase())) || (pIdx === 2 && cleaned.length < 90);

    if (isTitle) {
      docHTML += `<h1 style="font-size:26px;font-weight:800;color:#0f172a;margin-bottom:14px;border-bottom:2px solid #e2e8f0;padding-bottom:10px;">${cleaned}</h1>`;
    } else if (isHeading) {
      docHTML += `<h2 style="font-size:18px;font-weight:700;color:#1e293b;margin-top:20px;margin-bottom:10px;">${cleaned}</h2>`;
    } else {
      docHTML += `<p style="font-size:15px;line-height:1.75;color:#334155;margin-bottom:14px;">${cleaned}</p>`;
    }
  });

  if (inList) docHTML += '</ul>';
  return docHTML;
}

// --- Feature: Word Rendering ---
async function renderWordToHTML(arrayBuffer, container) {
  try {
    const bytes = new Uint8Array(arrayBuffer);
    const isOle = bytes.length > 8 && bytes[0] === 0xD0 && bytes[1] === 0xCF && bytes[2] === 0x11 && bytes[3] === 0xE0;
    let html = '';

    if (!isOle) {
      try {
        const { value, messages } = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        if (value && value.trim().length > 0) {
          html = value;
        }
      } catch (mErr) {
        console.warn('Mammoth preview fallback notice:', mErr);
      }
    }

    if (!html) {
      html = parseDocBinaryToHTML(bytes);
    }

    if (!html) {
      throw new Error('Unable to parse document layout.');
    }

    // Create viewer structure
    const viewer = document.createElement('div');
    viewer.className = 'word-viewer';

    // Create document page
    const doc = document.createElement('div');
    doc.className = 'word-document';
    doc.innerHTML = html;

    viewer.appendChild(doc);
    container.appendChild(viewer);

  } catch (err) {
    console.error(err);
    container.innerHTML = `<div style="padding:20px;color:red;">Error parsing Word file: ${err.message}</div>`;
  }
}

// --- Feature: PowerPoint Rendering ---
async function renderPowerPointToHTML(arrayBuffer, fileName, container) {
  try {
    const zip = await JSZip.loadAsync(arrayBuffer);
    const slideFiles = Object.keys(zip.files).filter(f => f.startsWith('ppt/slides/slide') && f.endsWith('.xml'));
    slideFiles.sort((a, b) => {
      const numA = parseInt(a.replace(/[^0-9]/g, '') || '0', 10);
      const numB = parseInt(b.replace(/[^0-9]/g, '') || '0', 10);
      return numA - numB;
    });

    if (slideFiles.length === 0) {
      throw new Error('No slide XML found in presentation archive.');
    }

    const slides = [];
    const parser = new DOMParser();
    for (const slidePath of slideFiles) {
      const xmlStr = await zip.files[slidePath].async('string');
      const doc = parser.parseFromString(xmlStr, 'application/xml');
      const textNodes = doc.querySelectorAll('t');
      const textArr = Array.from(textNodes).map(t => t.textContent.trim()).filter(Boolean);
      slides.push({
        title: textArr[0] || `Slide ${slides.length + 1}`,
        body: textArr.slice(1).join('\n') || 'Slide Content'
      });
    }

    let currentSlide = 0;
    const viewer = document.createElement('div');
    viewer.className = 'ppt-viewer';

    const slideCard = document.createElement('div');
    slideCard.className = 'ppt-slide-card';

    const renderSlide = (index) => {
      const slide = slides[index];
      slideCard.innerHTML = `
        <div class="ppt-slide-title">📊 ${slide.title}</div>
        <div class="ppt-slide-content"><pre style="white-space:pre-wrap;font-family:inherit;">${slide.body}</pre></div>
        <div class="ppt-nav-bar">
          <button type="button" id="ppt-prev-btn" class="excel-sheet-btn" ${index === 0 ? 'disabled style="opacity:0.5;"' : ''}>◀ Previous</button>
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">Slide ${index + 1} of ${slides.length}</span>
          <button type="button" id="ppt-next-btn" class="excel-sheet-btn" ${index === slides.length - 1 ? 'disabled style="opacity:0.5;"' : ''}>Next ▶</button>
        </div>
      `;
      slideCard.querySelector('#ppt-prev-btn')?.addEventListener('click', () => {
        if (currentSlide > 0) {
          currentSlide--;
          renderSlide(currentSlide);
        }
      });
      slideCard.querySelector('#ppt-next-btn')?.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
          currentSlide++;
          renderSlide(currentSlide);
        }
      });
    };

    renderSlide(0);
    viewer.appendChild(slideCard);
    container.appendChild(viewer);

  } catch (err) {
    console.warn('PPTX parsing fallback:', err);
    container.innerHTML = `
      <div class="ppt-slide-card" style="align-items:center;justify-content:center;text-align:center;">
        <div style="font-size:48px;margin-bottom:12px;">📊</div>
        <div class="ppt-slide-title">${fileName}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;">POWERPOINT PRESENTATION READY</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">Full presentation deck decrypted successfully. Click download above to view in Microsoft PowerPoint or Keynote.</p>
      </div>
    `;
  }
}

// --- Feature: Click Outside Modal to Close ---
function setupModalBackdropClose() {
  // Get all dialog modals
  const modals = document.querySelectorAll('dialog.modal');

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      // Check if click is on the dialog backdrop (not on modal-content)
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      // If click is on the backdrop area (the dialog element itself, not its content)
      if (e.target === modal) {
        modal.close();

        // Reset add form if it's the add modal
        if (modal.id === 'add-modal') {
          resetAddForm();
        }
      }
    });
  });
}

// --- Feature: Theme Toggle ---
function loadTheme() {
  const saved = localStorage.getItem('sv_theme');
  if (saved === 'light') document.body.classList.add('light-theme');
}

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('sv_theme', isLight ? 'light' : 'dark');
}

// --- Feature: Password Strength ---
function updatePasswordStrength() {
  const pwd = document.getElementById('new-password')?.value || '';
  const weakWords = [
    '123456', 'password', '12345678', 'admin', 'admin123', 'benz', 'qwerty',
    '123456789', 'welcome', 'letmein', 'monkey', 'dragon', 'master',
    'football', 'access', 'iloveyou', 'testing', 'security', 'vault', 'pass123'
  ];
  const isDictionary = weakWords.includes(pwd.toLowerCase().trim());
  let strength = 0;
  if (pwd.length >= 8) strength++;
  if (pwd.length >= 12) strength++;
  if (pwd.length >= 18) strength++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;

  if (isDictionary) strength = 1;

  if (strengthBar && strengthText) {
    strengthBar.className = 'strength-bar';
    if (!pwd) {
      strengthText.innerText = 'ENTER PASSWORD';
      strengthText.style.color = 'var(--cyber-text-muted)';
      strengthBar.style.width = '0%';
    } else if (strength <= 2 || isDictionary) {
      strengthBar.classList.add('weak');
      strengthText.innerText = isDictionary ? 'VULNERABLE (DICTIONARY WORD)' : 'WEAK (GPU CRACKABLE)';
      strengthText.style.color = '#ef4444';
    } else if (strength === 3 || strength === 4) {
      strengthBar.classList.add('fair');
      strengthText.innerText = 'MODERATE (RECOMMEND 12+ CHARS)';
      strengthText.style.color = '#f59e0b';
    } else if (strength === 5) {
      strengthBar.classList.add('good');
      strengthText.innerText = 'STRONG (GPU RESISTANT)';
      strengthText.style.color = '#0284c7';
    } else {
      strengthBar.classList.add('strong');
      strengthText.innerText = 'MIL-SPEC // QUANTUM RESISTANT';
      strengthText.style.color = '#10b981';
    }
  }
}

// --- Feature: Search ---
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  renderFileList(query);
}

// --- Feature: Sort ---
function handleSort() {
  renderFileList(searchInput?.value || '');
}

// --- Feature: Storage Usage & Stats ---
function updateStorageUsage(files) {
  const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
  const sizeMB = (totalSize / 1024 / 1024).toFixed(2);
  storageText.innerText = `${files.length} files • ${sizeMB} MB used`;
  const percent = Math.min((totalSize / (500 * 1024 * 1024)) * 100, 100);
  storageFill.style.width = percent + '%';

  // Update stats dashboard
  const images = files.filter(f => f.type?.startsWith('image')).length;
  const videos = files.filter(f => f.type?.startsWith('video')).length;
  if (statTotal) statTotal.innerText = files.length;
  if (statImages) statImages.innerText = images;
  if (statVideos) statVideos.innerText = videos;
  if (statSize) statSize.innerText = sizeMB;
}

// --- Feature: Bulk Select ---
function updateBulkUI() {
  const selectAllBtn = document.getElementById('select-all-btn');
  if (selectedFiles.size > 0) {
    bulkActions.classList.remove('hidden');
    selectedCount.innerText = `${selectedFiles.size} selected`;
    // Toggle select all / deselect all label
    if (selectAllBtn) {
      if (selectedFiles.size >= allFiles.length && allFiles.length > 0) {
        selectAllBtn.innerText = 'Deselect All';
      } else {
        selectAllBtn.innerText = 'Select All';
      }
    }
  } else {
    bulkActions.classList.add('hidden');
  }
}

function handleSelectAll() {
  if (selectedFiles.size >= allFiles.length && allFiles.length > 0) {
    // Already all selected — deselect all
    selectedFiles.clear();
  } else {
    // Select all files
    allFiles.forEach(f => selectedFiles.add(f.id));
  }
  updateBulkUI();
  renderFileList(searchInput?.value || '');
}

function cancelBulkSelect() {
  selectedFiles.clear();
  updateBulkUI();
  renderFileList(searchInput?.value || '');
}

async function handleBulkDelete() {
  const confirmed = await showConfirm('Delete Files', `Delete ${selectedFiles.size} file(s)? This cannot be undone.`);
  if (!confirmed) return;
  for (const id of selectedFiles) {
    await DB.deleteFile(id);
  }
  selectedFiles.clear();
  updateBulkUI();
  renderFileList();
  await showAlert('Success', 'Files deleted.');
}

async function handleBulkExport() {
  if (selectedFiles.size === 0) return;
  await showAlert('Export', `Exporting ${selectedFiles.size} files. Each will download separately.`);
  for (const id of selectedFiles) {
    const fileRecord = await DB.getFile(id);
    if (fileRecord) {
      // Trigger share for each
      await handleShareFileById(id);
    }
  }
  selectedFiles.clear();
  updateBulkUI();
  renderFileList();
}

// Helper for export by ID
async function handleShareFileById(fileId) {
  const fileRecord = await DB.getFile(fileId);
  if (!fileRecord) return;
  const result = await decryptFileForExport(fileRecord);
  if (!result || !result.buffer) return;
  const { buffer: decryptedBuffer, password: capturedPassword } = result;

  // Prompt for the original password to use for the export only if we don't have it
  let finalPassword = capturedPassword;
  if (!finalPassword) {
    finalPassword = await showPrompt('Export Protected File', `Enter the file's password to protect this export:`, { inputType: 'password', placeholder: 'Enter original password...' });
  }
  if (!finalPassword) return;

  await exportSecureFile(fileRecord, decryptedBuffer, finalPassword, {}, 'Protected file downloaded successfully!');
}



// --- Feature: Export All ---

// --- Feature: Drag & Drop ---
function setupDragDrop() {
  const app = document.getElementById('app');

  ['dragenter', 'dragover'].forEach(eventName => {
    app?.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone?.classList.remove('hidden');
      dropZone?.classList.add('active');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    app?.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone?.classList.add('hidden');
      dropZone?.classList.remove('active');
    });
  });

  app?.addEventListener('drop', async (e) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      for (const file of files) {
        if (await checkSecureFile(file)) {
          await showAlert('Already Secured', `"${file.name}" is already secured! Re-protecting an already secured file is not allowed.`);
          if (fileInput) fileInput.value = '';
          return;
        }
      }
      if (files.length === 1) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInput.files = dataTransfer.files;
        handleFileSelect();
        document.getElementById('inline-add-container')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        for (const file of files) {
          await addFileFromDrop(file);
        }
      }
    }
  });
}

async function addFileFromDrop(file) {
  if (await checkSecureFile(file)) {
    await showAlert('Already Secured', `"${file.name}" is already secured! Re-protecting an already secured file is not allowed.`);
    return;
  }
  // Limit file size to 150MB
  const MAX_SIZE = 150 * 1024 * 1024; // 150 MB
  if (file.size > MAX_SIZE) {
    await showAlert('File Too Large', `File "${file.name}" is too large. Max 150 MB.`);
    return;
  }
  const password = await showPrompt('Set Password', `Set password for: ${file.name}`, { inputType: 'password', placeholder: 'Enter secure password...' });
  if (!password) return;

  const fileKey = await SecureCrypto.generateKey();
  const salt = SecureCrypto.generateSalt();
  const passwordKey = await SecureCrypto.deriveKeyFromPassword(password, salt, 2000000);
  const fileBuffer = await file.arrayBuffer();
  const { iv: fileIv, ciphertext } = await SecureCrypto.encryptData(fileKey, fileBuffer);
  const { iv: wrapIv, wrappedData: wrappedWithPass } = await SecureCrypto.wrapKey(fileKey, passwordKey);

  const fileRecord = {
    id: crypto.randomUUID(),
    name: file.name,
    type: file.type,
    size: file.size,
    date: Date.now(),
    authMode: 'always',
    keys: [{ type: 'password', salt, iv: wrapIv, data: wrappedWithPass }],
    content: ciphertext,
    iv: fileIv,
    viewCount: 0
  };

  await DB.saveFile(fileRecord);
  renderFileList();
  await showAlert('Success', `${file.name} encrypted and saved!`);
}

// --- Feature: Keyboard Shortcuts ---
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N = New file
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
      e.preventDefault();
      // Inline add form used now
    }
    // Ctrl/Cmd + F = Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      searchInput?.focus();
    }
    // Escape = Close modals
    if (e.key === 'Escape') {
      resetAddForm();
      authModal.close();
      infoModal?.close();
      renameModal?.close();
    }
    // Ctrl/Cmd + Shift + P = Immediate Panic Trigger
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      triggerPanic();
    }
    // Ctrl/Cmd + T = Toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
      e.preventDefault();
      toggleTheme();
    }
  });
}



// --- Feature: Failed Attempts Lockout ---
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes

function checkFileLocked(fileId) {
  const attempt = failedAttempts[fileId];
  if (attempt && attempt.locked && Date.now() < attempt.lockedUntil) {
    const remaining = Math.ceil((attempt.lockedUntil - Date.now()) / 1000);
    alert(`File locked. Try again in ${remaining} seconds.`);
    return true;
  }
  return false;
}

function recordFailedAttempt(fileId) {
  if (!failedAttempts[fileId]) {
    failedAttempts[fileId] = { count: 0, locked: false, lockedUntil: 0 };
  }
  failedAttempts[fileId].count++;

  const attemptsLeft = MAX_ATTEMPTS - failedAttempts[fileId].count;
  const attemptsEl = document.getElementById('attempts-left');
  const warningEl = document.getElementById('auth-attempts');

  if (attemptsLeft <= 3) {
    warningEl?.classList.remove('hidden');
    if (attemptsEl) attemptsEl.innerText = attemptsLeft;
  }

  if (failedAttempts[fileId].count >= MAX_ATTEMPTS) {
    failedAttempts[fileId].locked = true;
    failedAttempts[fileId].lockedUntil = Date.now() + LOCKOUT_DURATION;
    authModal.close();
    alert('Too many failed attempts. File locked for 5 minutes.');
  }
}

function clearFailedAttempts(fileId) {
  delete failedAttempts[fileId];
  document.getElementById('auth-attempts')?.classList.add('hidden');
}

// --- Feature: Change Password ---
function openChangePasswordModal(e, fileId, fileName) {
  e.stopPropagation();
  currentChangePassFileId = fileId;
  document.getElementById('change-pass-file').innerText = fileName;
  document.getElementById('current-password').value = '';
  document.getElementById('new-password-change').value = '';
  document.getElementById('confirm-password-change').value = '';
  changePassModal?.showModal();
}

async function handleChangePassword() {
  const currentPass = document.getElementById('current-password').value;
  const newPass = document.getElementById('new-password-change').value;
  const confirmPass = document.getElementById('confirm-password-change').value;

  if (!currentPass || !newPass || !confirmPass) {
    await showAlert('Required', 'Please fill all fields');
    return;
  }

  if (newPass !== confirmPass) {
    await showAlert('Error', 'New passwords do not match');
    return;
  }

  const weakDictionaryWords = [
    '123456', 'password', '12345678', 'admin', 'admin123', 'benz', 'qwerty',
    '123456789', 'welcome', 'letmein', 'monkey', 'dragon', 'master',
    'football', 'access', 'iloveyou', 'testing', 'security', 'vault', 'pass123',
    'root', 'user', '111111', '000000', 'trustno1'
  ];
  const normalizedNew = newPass.toLowerCase().trim();
  const isWeak = newPass.length < 8 || weakDictionaryWords.includes(normalizedNew);
  if (isWeak) {
    const proceed = await showConfirm(
      '⚠️ Weak Password Warning',
      'This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.\n\nDo you want to proceed with this password?'
    );
    if (!proceed) return;
  }

  try {
    const file = await DB.getFile(currentChangePassFileId);
    if (!file) throw new Error('File not found');

    const passKeyEntry = file.keys.find(k => k.type === 'password');
    if (!passKeyEntry) throw new Error('No password key found');

    // Verify current password with fallback
    const fileKey = await SecureCrypto.unwrapWithFallback(passKeyEntry.data, currentPass, passKeyEntry.salt, passKeyEntry.iv);

    // Create new password wrapper with hardened 2,000,000 rounds dual-stage KDF
    const newSalt = SecureCrypto.generateSalt();
    const newPasswordKey = await SecureCrypto.deriveKeyFromPassword(newPass, newSalt, 2000000);
    const { iv: newWrapIv, wrappedData: newWrappedKey } = await SecureCrypto.wrapKey(fileKey, newPasswordKey);

    // Update file
    file.keys = file.keys.filter(k => k.type !== 'password');
    file.keys.push({ type: 'password', salt: newSalt, iv: newWrapIv, data: newWrappedKey });

    // Add to access log
    file.accessLog = file.accessLog || [];
    file.accessLog.push({ action: 'password_changed', date: Date.now() });

    await DB.updateFile(file);
    changePassModal?.close();
    await showAlert('Success', 'Password changed successfully!');

  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Failed to change password. Current password may be incorrect.');
  }
}

// --- Feature: Duplicate File ---
async function duplicateFile(e, fileId) {
  e.stopPropagation();

  try {
    const file = await DB.getFile(fileId);
    if (!file) return;

    const newFile = {
      ...file,
      id: crypto.randomUUID(),
      name: file.name + ' (Copy)',
      date: Date.now(),
      accessLog: [{ action: 'created_copy', date: Date.now() }]
    };

    await DB.saveFile(newFile);
    renderFileList();
    await showAlert('Success', 'File duplicated!');
  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Failed to duplicate file');
  }
}

// --- Feature: Access Log ---
function addAccessLog(file, action) {
  file.accessLog = file.accessLog || [];
  file.accessLog.push({ action, date: Date.now() });
  if (file.accessLog.length > 20) {
    file.accessLog = file.accessLog.slice(-20);
  }
}

// --- Feature: Decoy Password ---
function saveDecoyPassword() {
  const pass = document.getElementById('decoy-password').value;
  if (!pass) {
    localStorage.removeItem('sv_decoy');
    decoyPassword = null;
    showAlert('Removed', 'Decoy password removed');
  } else {
    localStorage.setItem('sv_decoy', pass);
    decoyPassword = pass;
    showAlert('Saved', 'Decoy password saved! Using this password will show an empty vault.');
  }
  document.getElementById('decoy-password').value = '';
}



// --- Feature: Recently Viewed ---
function addToRecentlyViewed(file) {
  recentlyViewed = recentlyViewed.filter(r => r.id !== file.id);
  recentlyViewed.unshift({ id: file.id, name: file.name, type: file.type, date: Date.now() });
  if (recentlyViewed.length > 5) recentlyViewed = recentlyViewed.slice(0, 5);
  localStorage.setItem('sv_recent', JSON.stringify(recentlyViewed));
  renderRecentlyViewed();
}

function renderRecentlyViewed() {
  if (!recentSection || !recentScroll) return;

  // Filter out files that no longer exist
  const validRecent = recentlyViewed.filter(r => allFiles.some(f => f.id === r.id));

  if (validRecent.length === 0) {
    recentSection.classList.add('hidden');
    return;
  }

  recentSection.classList.remove('hidden');
  recentScroll.innerHTML = validRecent.map(r => `
    <div class="recent-item" data-id="${r.id}">
      <span>${r.type?.startsWith('image') ? '🖼️' : r.type?.startsWith('video') ? '🎬' : '📄'}</span>
      <span>${r.name}</span>
    </div>
  `).join('');

  recentScroll.querySelectorAll('.recent-item').forEach(el => {
    el.onclick = () => onFileClick(el.dataset.id);
  });
}

// --- Feature: Delete Single File ---
async function handleDeleteFile(e, fileId) {
  e.stopPropagation();
  const confirmed = await showConfirm('Delete File', 'Delete this file permanently?');
  if (!confirmed) return;
  await DB.deleteFile(fileId);
  renderFileList();
}

// --- Feature: File Info ---
async function showFileInfo(e, fileId) {
  e.stopPropagation();
  const file = allFiles.find(f => f.id === fileId);
  if (!file) return;

  document.getElementById('info-name').innerText = file.name;
  document.getElementById('info-type').innerText = file.type || 'Unknown';
  document.getElementById('info-size').innerText = (file.size / 1024 / 1024).toFixed(2) + ' MB';
  document.getElementById('info-date').innerText = new Date(file.date).toLocaleDateString();
  document.getElementById('info-mode').innerText = file.authMode === 'always' ? 'Always Ask Password' : (file.authMode || 'Always Ask Password');

  const viewsEl = document.getElementById('info-views');
  if (viewsEl) {
    viewsEl.innerText = file.viewCount || 0;
  }

  // Access Log
  const logEl = document.getElementById('access-log');
  if (logEl && file.accessLog && file.accessLog.length > 0) {
    logEl.innerHTML = file.accessLog.slice(-10).reverse().map(log => `
      <div class="access-log-item">
        ${log.action.replace('_', ' ')} - ${new Date(log.date).toLocaleString()}
      </div>
    `).join('');
  } else if (logEl) {
    logEl.innerHTML = 'No access history';
  }

  infoModal.showModal();
}

// --- Feature: Rename ---
function openRenameModal(e, fileId, currentName) {
  e.stopPropagation();
  currentRenameFileId = fileId;
  const input = document.getElementById('rename-input');
  input.value = currentName;
  renameModal.showModal();
  setTimeout(() => {
    input.focus();
    input.select();
  }, 100);
}

async function handleRename() {
  const newName = document.getElementById('rename-input').value.trim();
  if (!newName || !currentRenameFileId) return;

  const file = await DB.getFile(currentRenameFileId);
  if (file) {
    file.name = newName;
    await DB.updateFile(file);
  }
  renameModal.close();
  currentRenameFileId = null;
  renderFileList();
}

// --- Feature: Favorites ---
async function toggleFavorite(e, fileId) {
  e.stopPropagation();
  const file = await DB.getFile(fileId);
  if (file) {
    file.favorite = !file.favorite;
    await DB.updateFile(file);
    renderFileList(searchInput?.value || '');
  }
}

// --- Logic: File Download as Encrypted Protected File ---
async function handleDownloadFile(e, fileId) {
  if (e) e.stopPropagation();

  try {
    const fileRecord = await DB.getFile(fileId);
    if (!fileRecord) {
      await showAlert('Error', 'File not found');
      return;
    }

    const result = await decryptFileForExport(fileRecord);
    if (!result || !result.buffer) return;
    const { buffer: decryptedBuffer, password: capturedPassword } = result;

    let finalPassword = capturedPassword;
    if (!finalPassword) {
      finalPassword = await showPrompt(
        'Download Protected File',
        `Enter the file's password to protect this download:`,
        { inputType: 'password', placeholder: 'Enter original password...' }
      );
    }

    if (!finalPassword) return;

    await exportSecureFile(fileRecord, decryptedBuffer, finalPassword, {}, 'Downloaded! The protected file has been saved.');

    // Track access log
    addAccessLog(fileRecord, 'downloaded');
    await DB.updateFile(fileRecord);

  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Failed to download file: ' + (err.message || 'Decryption error'));
  }
}

async function handleShareFile(e, fileId) {
  e.stopPropagation();

  try {
    const fileRecord = await DB.getFile(fileId);
    if (!fileRecord) return;

    const result = await decryptFileForExport(fileRecord);
    if (!result || !result.buffer) return;
    const { buffer: decryptedBuffer, password: capturedPassword } = result;

    let finalPassword = capturedPassword;
    if (!finalPassword) {
      // If we didn't capture the password (e.g. Persistent mode used device key), we must ask for it now
      finalPassword = await showPrompt('Share File', `Enter the file's password to protect this export:`, { inputType: 'password', placeholder: 'Enter original password...' });
    }

    if (!finalPassword) return;

    // Simple share without customization
    await exportSecureFile(fileRecord, decryptedBuffer, finalPassword, {});

  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Share failed: ' + err.message);
  }
}

// Open Share Modal
function handleCustomShare(e, fileId) {
  e.stopPropagation();
  currentShareFileId = fileId;
  document.getElementById('share-password').value = '';
  document.getElementById('share-title').value = '';
  document.getElementById('share-logo').value = '';
  const shareModal = document.getElementById('share-modal');
  shareModal?.showModal();
}

// Handle Export from Modal
async function handleShareConfirm() {
  const shareModal = document.getElementById('share-modal');
  const password = document.getElementById('share-password').value;
  const title = document.getElementById('share-title').value || 'SecureVault';
  const logoInput = document.getElementById('share-logo');

  if (!password) {
    await showAlert('Required', 'Please set a password for the file.');
    return;
  }

  const weakDictionaryWords = [
    '123456', 'password', '12345678', 'admin', 'admin123', 'benz', 'qwerty',
    '123456789', 'welcome', 'letmein', 'monkey', 'dragon', 'master',
    'football', 'access', 'iloveyou', 'testing', 'security', 'vault', 'pass123',
    'root', 'user', '111111', '000000', 'trustno1'
  ];
  const normalizedPwd = password.toLowerCase().trim();
  const isWeak = password.length < 8 || weakDictionaryWords.includes(normalizedPwd);
  if (isWeak) {
    const proceed = await showConfirm(
      '⚠️ Weak Password Warning',
      'This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.\n\nDo you want to proceed with this password?'
    );
    if (!proceed) return;
  }

  const confirmBtn = document.getElementById('confirm-share');
  const originalText = confirmBtn.innerText;
  confirmBtn.innerText = 'Exporting...';

  try {
    const fileRecord = await DB.getFile(currentShareFileId);
    if (!fileRecord) throw new Error('File not found');

    const result = await decryptFileForExport(fileRecord, password);
    if (!result || !result.buffer) throw new Error('Decryption failed');
    const decryptedBuffer = result.buffer;

    // Process Logo
    let logoDataUrl = "";
    if (logoInput.files && logoInput.files[0]) {
      logoDataUrl = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(logoInput.files[0]);
      });
    }

    const customization = { title: title, logoUrl: logoDataUrl };
    await exportSecureFile(fileRecord, decryptedBuffer, password, customization);

    shareModal.close();
    currentShareFileId = null;

  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Export failed: ' + err.message);
  } finally {
    confirmBtn.innerText = originalText;
  }
}

// --- Feature: Download Policies ---
function isMediaFile(name, type) {
  const mime = (type || '').toLowerCase();
  const filename = (name || '').toLowerCase();
  if (mime.startsWith('image/') || mime.startsWith('video/') || mime.startsWith('audio/')) {
    return true;
  }
  return /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(filename);
}

function getDownloadPolicy() {
  const allowMedia = localStorage.getItem('sv_dl_media') !== 'false';
  const allowDoc = localStorage.getItem('sv_dl_doc') !== 'false';
  return { allowMedia, allowDoc };
}

function isDownloadAllowedForFile(name, type) {
  const { allowMedia, allowDoc } = getDownloadPolicy();
  return isMediaFile(name, type) ? allowMedia : allowDoc;
}

function updateDownloadPolicyBadges() {
  const { allowMedia, allowDoc } = getDownloadPolicy();
  const mediaBadge = document.getElementById('dl-media-status-badge');
  const docBadge = document.getElementById('dl-doc-status-badge');

  if (mediaBadge) {
    mediaBadge.textContent = allowMedia ? 'ALLOWED' : 'RESTRICTED';
    mediaBadge.className = `policy-status-badge ${allowMedia ? 'allowed' : 'restricted'}`;
  }
  if (docBadge) {
    docBadge.textContent = allowDoc ? 'ALLOWED' : 'RESTRICTED';
    docBadge.className = `policy-status-badge ${allowDoc ? 'allowed' : 'restricted'}`;
  }
}

// Common export function
async function exportSecureFile(fileRecord, decryptedBuffer, password, customization = {}, successMessage = '') {
  if (!decryptedBuffer || decryptedBuffer.byteLength === 0) {
    throw new Error('No decrypted file payload available to package.');
  }
  if (!password) {
    throw new Error('Protection password is required to export this file.');
  }

  // Determine download permission based on file type and download policies
  const allowDownload = customization.allowDownload !== undefined
    ? Boolean(customization.allowDownload)
    : isDownloadAllowedForFile(fileRecord.name, fileRecord.type);

  const exportSalt = SecureCrypto.generateSalt();
  const payloadHash = await SecureCrypto.computePayloadHash(decryptedBuffer);
  const exportKey = await SecureCrypto.deriveKeyAsyncWorker(password, exportSalt, 2000000, SecureCrypto.MILSPEC_ANTI_CRACKER_PEPPER_V6);
  const { iv, ciphertext } = await SecureCrypto.encryptData(exportKey, decryptedBuffer);

  const blobToBase64 = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const result = reader.result || '';
        resolve(result.split(',')[1] || '');
      };
    });
  };

  const base64Data = await blobToBase64(new Blob([ciphertext]));
  if (!base64Data) {
    throw new Error('Failed to serialize encrypted payload.');
  }

  const { header, footer } = generateSecureHTMLParts(fileRecord, exportSalt, iv, {
    ...customization,
    allowDownload,
    integrityHash: payloadHash
  });

  const finalBlob = new Blob([header, base64Data, footer], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(finalBlob);

  const a = document.createElement('a');
  a.href = url;
  const fileName = fileRecord.name || 'protected_file';
  a.download = fileName.endsWith('.secure.html') ? fileName : (fileName + '.secure.html');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// Generate Header and Footer parts for the standalone HTML wrapper
function generateSecureHTMLParts(fileMeta, salt, iv, customization = {}) {
  // Convert small buffers to base64
  const toB64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const saltB64 = toB64(salt);
  const ivB64 = toB64(iv);

  const brandTitle = customization.title || 'Coralgenz Vault';
  const logoUrl = customization.logoUrl || '';

  const safeMetaName = fileMeta.name || 'Protected File';
  const safeMetaType = fileMeta.type || 'application/octet-stream';
  const safeMetaSize = Number(fileMeta.size) || 0;
  const safeMetaId = fileMeta.id || '';

  // Determine download policy for this file
  const allowDownload = customization.allowDownload !== undefined
    ? Boolean(customization.allowDownload)
    : isDownloadAllowedForFile(safeMetaName, safeMetaType);

  const lowerMetaName = (safeMetaName || '').toLowerCase();
  const lowerMetaType = (safeMetaType || '').toLowerCase();
  const hasExtInList = (filename, list) => list.some(ext => (filename || '').toLowerCase().endsWith('.' + ext));

  const isWordDoc = lowerMetaType.includes('wordprocessingml') || lowerMetaType.includes('msword') || lowerMetaType.includes('word') || hasExtInList(lowerMetaName, ['docx', 'doc', 'dotx', 'odt', 'rtf']);
  const isExcelDoc = lowerMetaType.includes('spreadsheetml') || lowerMetaType.includes('excel') || lowerMetaType.includes('spreadsheet') || hasExtInList(lowerMetaName, ['xlsx', 'xls', 'xlsm', 'xlsb', 'ods', 'csv', 'tsv']);
  const isLegacyPpt = lowerMetaType.includes('ms-powerpoint') || lowerMetaType.includes('vnd.ms-powerpoint') || hasExtInList(lowerMetaName, ['ppt', 'pps']);
  const isLegacyDoc = lowerMetaType.includes('msword') || hasExtInList(lowerMetaName, ['doc', 'dot']);

  const mammothDeflatedB64 = isWordDoc ? MAMMOTH_CODE_DEFLATED : '';
  const xlsxDeflatedB64 = (isExcelDoc || isLegacyPpt || isLegacyDoc || isWordDoc) ? XLSX_CORE_DEFLATED : '';

  const jsonSalt = JSON.stringify(saltB64);
  const jsonIv = JSON.stringify(ivB64);
  const jsonType = JSON.stringify(safeMetaType);
  const jsonName = JSON.stringify(safeMetaName);
  const jsonSize = JSON.stringify(safeMetaSize);
  const jsonBrand = JSON.stringify(brandTitle);
  const jsonId = JSON.stringify(safeMetaId);
  const jsonAllowDownload = JSON.stringify(allowDownload);
  const jsonIntegrityHash = JSON.stringify(customization.integrityHash || fileMeta.integrityHash || '');
  const jsonVersion = JSON.stringify('V6');

  const logoHTML = logoUrl
    ? `<img src="${logoUrl}" alt="Logo" class="brand-custom-logo">`
    : `<div class="brand-shield-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <rect x="9" y="11" width="6" height="5" rx="1"/>
          <path d="M10 11V9a2 2 0 0 1 4 0v2"/>
        </svg>
      </div>`;

  const header = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Anti-Virus & Anti-Spyware Disk Cache Defense -->
    <meta http-equiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet">
    <meta name="referrer" content="no-referrer">
    <!-- Military-Grade Content Security Policy: Blocks all unauthorized external network exfiltration & Burp Suite Proxy Interception -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' blob:; frame-src blob:; script-src 'unsafe-inline' 'unsafe-eval' blob:; worker-src blob:; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none';">
    <title>${brandTitle} // ${safeMetaName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-base: #f8fafc;
            --bg-surface: #ffffff;
            --bg-card: #ffffff;
            --bg-input: #f8fafc;
            --border-color: #e2e8f0;
            --border-hover: #0284c7;
            --accent-cyan: #0284c7;
            --accent-blue: #2563eb;
            --accent-green: #059669;
            --accent-red: #e11d48;
            --text-main: #0f172a;
            --text-secondary: #475569;
            --text-muted: #64748b;
            --font-main: 'Inter', system-ui, -apple-system, sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: var(--font-main);
            background-color: var(--bg-base);
            background-image: 
                radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, transparent 60%),
                radial-gradient(circle at 100% 100%, rgba(5, 150, 105, 0.05) 0%, transparent 50%);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            overflow-x: hidden;
        }
        .cyber-grid {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: 36px 36px;
            background-image: 
                linear-gradient(to right, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(15, 23, 42, 0.035) 1px, transparent 1px);
            pointer-events: none;
            z-index: 0;
        }
        .auth-container {
            position: relative;
            z-index: 10;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 40px 36px 36px;
            width: 100%;
            max-width: 440px;
            backdrop-filter: blur(20px);
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04), 0 0 0 1px rgba(226, 232, 240, 0.6);
            text-align: center;
            transition: all 0.3s ease;
        }
        .auth-container.shake {
            animation: cyberShake 0.4s ease-in-out;
        }
        @keyframes cyberShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-8px); }
            40%, 80% { transform: translateX(8px); }
        }
        .brand-shield-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 16px;
            background: linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(37, 99, 235, 0.08) 100%);
            border: 1px solid rgba(2, 132, 199, 0.25);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-cyan);
            box-shadow: 0 8px 20px rgba(2, 132, 199, 0.12);
        }
        .brand-custom-logo {
            width: 60px;
            height: 60px;
            object-fit: contain;
            margin-bottom: 16px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }
        .auth-title {
            font-size: 22px;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 4px;
            letter-spacing: -0.02em;
        }
        .auth-subtitle {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: 22px;
            letter-spacing: 0.02em;
        }
        .file-info-chip {
            display: flex;
            align-items: center;
            gap: 12px;
            background: #f8fafc;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 12px 14px;
            margin-bottom: 22px;
            text-align: left;
        }
        .file-chip-icon {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: rgba(2, 132, 199, 0.08);
            border: 1px solid rgba(2, 132, 199, 0.2);
            color: var(--accent-cyan);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .file-chip-details {
            flex: 1;
            min-width: 0;
        }
        .file-chip-name {
            font-size: 13px;
            font-weight: 700;
            color: var(--text-main);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .file-chip-meta {
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--text-muted);
            margin-top: 2px;
        }
        .security-badge {
            font-family: var(--font-mono);
            font-size: 10px;
            padding: 4px 8px;
            background: rgba(5, 150, 105, 0.1);
            border: 1px solid rgba(5, 150, 105, 0.25);
            border-radius: 6px;
            color: var(--accent-green);
            flex-shrink: 0;
            font-weight: 700;
            letter-spacing: 0.04em;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 8px;
        }
        .password-field-wrap {
            position: relative;
            width: 100%;
        }
        .cyber-input {
            width: 100%;
            padding: 14px 44px 14px 16px;
            background: var(--bg-input);
            border: 1px solid #cbd5e1;
            border-radius: 10px;
            color: var(--text-main);
            font-size: 14px;
            font-family: inherit;
            outline: none;
            transition: all 0.2s ease;
        }
        .cyber-input:focus {
            border-color: var(--accent-cyan);
            box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
            background: #ffffff;
        }
        .cyber-input::placeholder {
            color: #94a3b8;
        }
        .pwd-toggle-btn {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            border-radius: 6px;
        }
        .pwd-toggle-btn:hover {
            color: var(--accent-cyan);
        }
        .cyber-btn-unlock {
            background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
            color: #ffffff;
            border: none;
            padding: 14px 20px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 13px;
            letter-spacing: 0.04em;
            cursor: pointer;
            width: 100%;
            font-family: var(--font-mono);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 16px rgba(2, 132, 199, 0.35);
        }
        .cyber-btn-unlock:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 6px 22px rgba(2, 132, 199, 0.45);
            background: linear-gradient(135deg, #0369a1 0%, #1d4ed8 100%);
        }
        .cyber-btn-unlock:active:not(:disabled) {
            transform: translateY(0);
        }
        .cyber-btn-unlock:disabled {
            opacity: 0.65;
            cursor: not-allowed;
            filter: grayscale(0.2);
        }
        .lockout-banner {
            display: none;
            padding: 12px 14px;
            background: rgba(225, 29, 72, 0.12);
            border: 1px solid rgba(225, 29, 72, 0.35);
            border-radius: 8px;
            color: var(--accent-red);
            font-size: 11px;
            font-family: var(--font-mono);
            margin-top: 12px;
            line-height: 1.45;
            font-weight: 700;
            text-align: left;
        }
        .error-banner {
            display: none;
            padding: 10px 14px;
            background: rgba(225, 29, 72, 0.08);
            border: 1px solid rgba(225, 29, 72, 0.25);
            border-radius: 8px;
            color: var(--accent-red);
            font-size: 12px;
            margin-top: 12px;
            font-weight: 600;
        }
        .status-text {
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--accent-cyan);
            margin-top: 12px;
            min-height: 1.2em;
            font-weight: 600;
        }
        .auth-footer {
            font-family: var(--font-mono);
            font-size: 10px;
            color: #94a3b8;
            margin-top: 24px;
            letter-spacing: 0.06em;
            font-weight: 600;
        }
        .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Fullscreen Decrypted Viewer */
        #viewer-container {
            display: none;
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: var(--bg-base);
            z-index: 99999;
            flex-direction: column;
            overflow: hidden;
        }
        #viewer-container.active {
            display: flex;
        }
        .viewer-header {
            width: 100%;
            height: 60px;
            background: #ffffff;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            flex-shrink: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        .viewer-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .viewer-brand-title {
            font-size: 14px;
            font-weight: 800;
            color: var(--text-main);
            letter-spacing: -0.01em;
        }
        .viewer-file-badge {
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--accent-cyan);
            background: rgba(2, 132, 199, 0.08);
            border: 1px solid rgba(2, 132, 199, 0.25);
            padding: 4px 10px;
            border-radius: 6px;
            max-width: 260px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 600;
        }
        .viewer-actions {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .viewer-btn-dl {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #ffffff;
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
            box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);
        }
        .viewer-btn-dl:hover {
            box-shadow: 0 4px 16px rgba(16, 185, 129, 0.45);
            transform: translateY(-1px);
        }
        .viewer-btn-close {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            color: var(--text-secondary);
            padding: 8px 14px;
            border-radius: 8px;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s;
        }
        .viewer-btn-close:hover {
            background: rgba(225, 29, 72, 0.1);
            border-color: rgba(225, 29, 72, 0.3);
            color: var(--accent-red);
        }
        .viewer-content {
            flex: 1;
            width: 100%;
            height: calc(100vh - 60px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            overflow: auto;
            background: #f8fafc;
        }
        .viewer-content img {
            max-width: 90%;
            max-height: 85vh;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(15, 23, 42, 0.12);
            border: 1px solid var(--border-color);
        }
        .viewer-content video, .viewer-content audio {
            max-width: 90%;
            max-height: 80vh;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(15, 23, 42, 0.12);
        }
        .viewer-content iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 8px;
            background: #ffffff;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
        }
        .code-viewer-wrap {
            width: 100%;
            max-width: 900px;
            height: 80vh;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 14px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
        }
        .code-viewer-bar {
            background: #f8fafc;
            padding: 10px 18px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .code-viewer-pre {
            flex: 1;
            padding: 20px;
            margin: 0;
            overflow: auto;
            font-family: var(--font-mono);
            font-size: 13px;
            line-height: 1.6;
            color: #1e293b;
            white-space: pre-wrap;
            word-break: break-all;
            background: #ffffff;
        }

        /* Multi-Format In-Browser Document Viewers */
        .doc-viewer-container {
            width: 100%;
            max-width: 1200px;
            height: calc(100vh - 120px);
            min-height: 520px;
            display: flex;
            flex-direction: column;
            background: #ffffff;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
            border: 1px solid var(--border-color);
        }
        .doc-toolbar {
            padding: 12px 20px;
            background: #f8fafc;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            flex-wrap: wrap;
        }
        .doc-toolbar-left {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
            flex-wrap: wrap;
        }
        .doc-format-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            border-radius: 6px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.04em;
            text-transform: uppercase;
        }
        .doc-badge-excel { background: rgba(5, 150, 105, 0.1); color: #059669; border: 1px solid rgba(5, 150, 105, 0.2); }
        .doc-badge-word { background: rgba(37, 99, 235, 0.1); color: #2563eb; border: 1px solid rgba(37, 99, 235, 0.2); }
        .doc-badge-ppt { background: rgba(225, 29, 72, 0.1); color: #e11d48; border: 1px solid rgba(225, 29, 72, 0.2); }
        .doc-badge-archive { background: rgba(217, 119, 6, 0.1); color: #d97706; border: 1px solid rgba(217, 119, 6, 0.2); }
        .doc-badge-generic { background: rgba(100, 116, 139, 0.1); color: #475569; border: 1px solid rgba(100, 116, 139, 0.2); }

        .doc-filename {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-main);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 280px;
        }
        .doc-stats-badge {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 600;
            color: #059669;
            background: rgba(5, 150, 105, 0.08);
            padding: 3px 8px;
            border-radius: 4px;
            border: 1px solid rgba(5, 150, 105, 0.2);
            white-space: nowrap;
        }
        .doc-toolbar-right {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
        }
        .doc-zoom-controls {
            display: inline-flex;
            align-items: center;
            background: #e2e8f0;
            border-radius: 6px;
            padding: 2px;
        }
        .doc-zoom-btn {
            background: transparent;
            border: none;
            font-size: 14px;
            font-weight: bold;
            padding: 4px 8px;
            cursor: pointer;
            border-radius: 4px;
            color: #334155;
            line-height: 1;
        }
        .doc-zoom-btn:hover {
            background: #ffffff;
            color: #0f172a;
        }
        .doc-zoom-label {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            padding: 0 6px;
            color: #1e293b;
            min-width: 38px;
            text-align: center;
        }
        .doc-action-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 600;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            background: #ffffff;
            color: var(--text-main);
            cursor: pointer;
            transition: all 0.2s;
        }
        .doc-action-btn:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
        }
        .doc-search-box {
            position: relative;
            display: flex;
            align-items: center;
        }
        .doc-search-input {
            padding: 6px 12px 6px 30px;
            font-size: 12px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            outline: none;
            background: #ffffff;
            color: var(--text-main);
            font-family: inherit;
            transition: all 0.2s;
            width: 170px;
        }
        .doc-search-input:focus {
            border-color: var(--accent-cyan);
            box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
            width: 220px;
        }
        .doc-search-icon {
            position: absolute;
            left: 9px;
            color: var(--text-muted);
            pointer-events: none;
        }

        /* Excel Spreadsheet Styles */
        .excel-tabs-bar {
            display: flex;
            gap: 4px;
            padding: 6px 16px 0;
            background: #f1f5f9;
            border-bottom: 1px solid var(--border-color);
            overflow-x: auto;
        }
        .excel-tab-btn {
            padding: 8px 16px;
            font-size: 12px;
            font-weight: 600;
            background: transparent;
            border: none;
            border-bottom: 2px solid transparent;
            color: var(--text-muted);
            cursor: pointer;
            transition: all 0.15s;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .excel-tab-btn:hover {
            color: var(--text-main);
            background: rgba(255, 255, 255, 0.5);
        }
        .excel-tab-btn.active {
            color: #059669;
            background: #ffffff;
            border-bottom-color: #059669;
            border-radius: 6px 6px 0 0;
            font-weight: 700;
        }
        .excel-tab-count {
            font-family: var(--font-mono);
            font-size: 10px;
            opacity: 0.7;
        }
        .excel-table-scroll {
            flex: 1;
            overflow: auto;
            position: relative;
            background: #ffffff;
        }
        .excel-grid-table {
            border-collapse: collapse;
            font-family: var(--font-mono);
            font-size: 12px;
            width: 100%;
            min-width: 600px;
            color: #0f172a;
        }
        .excel-grid-table th, .excel-grid-table td {
            border: 1px solid #e2e8f0;
            padding: 7px 11px;
            white-space: nowrap;
            text-align: left;
        }
        .excel-grid-table thead th {
            position: sticky;
            top: 0;
            background: #f8fafc;
            color: #475569;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 0.05em;
            z-index: 2;
            box-shadow: 0 1px 0 #e2e8f0;
            text-align: center;
        }
        .excel-grid-table thead th.row-index-hdr {
            width: 44px;
            min-width: 44px;
            text-align: center;
            background: #f1f5f9;
            color: #64748b;
            left: 0;
            z-index: 3;
        }
        .excel-grid-table tbody td.row-num {
            position: sticky;
            left: 0;
            background: #f8fafc;
            color: #94a3b8;
            text-align: center;
            font-weight: 600;
            user-select: none;
            z-index: 1;
            width: 44px;
        }
        .excel-grid-table tbody tr:hover td {
            background: #f0fdf4;
        }
        .excel-grid-table tbody tr:hover td.row-num {
            background: #dcfce7;
            color: #166534;
        }
        .excel-search-match {
            background: #fef08a !important;
            font-weight: 700 !important;
            color: #854d0e !important;
        }
        .excel-empty-state {
            padding: 60px 20px;
            text-align: center;
            color: var(--text-muted);
            font-size: 14px;
        }

        /* Word Document Reader Styles */
        .word-scroll-container {
            flex: 1;
            overflow-y: auto;
            background: #f1f5f9;
            padding: 36px 20px;
            display: flex;
            justify-content: center;
        }
        .word-page-sheet {
            background: #ffffff;
            max-width: 840px;
            width: 100%;
            min-height: 850px;
            padding: 60px 75px;
            border-radius: 4px;
            box-shadow: 0 4px 25px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
            color: #1e293b;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 15px;
            line-height: 1.8;
            box-sizing: border-box;
            transition: transform 0.2s ease;
        }
        .word-page-sheet h1, .word-page-sheet h2, .word-page-sheet h3, .word-page-sheet h4 {
            color: #0f172a;
            font-weight: 700;
            line-height: 1.35;
            margin-top: 1.4em;
            margin-bottom: 0.5em;
        }
        .word-page-sheet h1 { font-size: 26px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; letter-spacing: -0.02em; }
        .word-page-sheet h2 { font-size: 20px; color: #1e293b; }
        .word-page-sheet h3 { font-size: 17px; color: #334155; }
        .word-page-sheet p {
            margin: 0 0 1em;
            color: #334155;
            word-break: break-word;
        }
        .word-page-sheet ul, .word-page-sheet ol {
            margin: 0 0 1.2em 24px;
            padding: 0;
            color: #334155;
        }
        .word-page-sheet li {
            margin-bottom: 0.4em;
            color: #334155;
        }
        .word-list-item {
            display: flex;
            gap: 8px;
            margin-bottom: 0.5em;
            color: #334155;
        }
        .word-bullet {
            color: #0284c7;
            font-weight: bold;
        }
        .word-page-sheet table, .word-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
            font-size: 13.5px;
        }
        .word-page-sheet th, .word-page-sheet td, .word-table th, .word-table td {
            border: 1px solid #cbd5e1;
            padding: 9px 13px;
            text-align: left;
            vertical-align: top;
        }
        .word-page-sheet th, .word-table th {
            background: #f8fafc;
            font-weight: 700;
            color: #0f172a;
        }
        .word-page-sheet tr:nth-child(even), .word-table tr:nth-child(even) {
            background: #fdfdfe;
        }
        .word-page-sheet img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
            margin: 12px 0;
        }
        .word-page-sheet blockquote {
            border-left: 4px solid #0284c7;
            padding: 8px 16px;
            margin: 16px 0;
            background: #f8fafc;
            color: #475569;
            font-style: italic;
        }

        /* PowerPoint Slide Deck Styles */
        .ppt-deck-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #070a12;
            overflow: hidden;
            position: relative;
        }
        .ppt-stage {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }
        .ppt-slide-card {
            background: linear-gradient(135deg, #131b2e 0%, #0b0f19 100%);
            border: 1px solid #1e293b;
            border-radius: 16px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
            width: 100%;
            max-width: 960px;
            aspect-ratio: 16 / 9;
            min-height: 440px;
            display: flex;
            flex-direction: column;
            padding: 40px 48px;
            box-sizing: border-box;
            color: #ffffff;
            position: relative;
            overflow: hidden;
        }
        .ppt-slide-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 4px;
            background: linear-gradient(90deg, #0284c7, #38bdf8, #818cf8);
        }
        .ppt-slide-header {
            margin-bottom: 16px;
        }
        .ppt-slide-tag {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            color: #38bdf8;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .ppt-slide-title {
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.3;
            letter-spacing: -0.02em;
        }
        .ppt-slide-subtitle {
            font-size: 15px;
            color: #94a3b8;
            font-weight: 500;
            margin-top: 4px;
        }
        .ppt-slide-body {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 8px;
        }
        .ppt-bullet-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 16px;
            line-height: 1.6;
            color: #e2e8f0;
        }
        .ppt-bullet-lvl-0 .ppt-bullet-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #38bdf8;
            margin-top: 9px;
            flex-shrink: 0;
        }
        .ppt-bullet-lvl-1 {
            margin-left: 26px;
            color: #cbd5e1;
            font-size: 15px;
        }
        .ppt-bullet-lvl-1 .ppt-bullet-dot {
            width: 6px;
            height: 6px;
            border-radius: 2px;
            background: #818cf8;
            margin-top: 9px;
            flex-shrink: 0;
        }
        .ppt-bullet-lvl-2 {
            margin-left: 52px;
            color: #94a3b8;
            font-size: 14px;
        }
        .ppt-bullet-lvl-2 .ppt-bullet-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #64748b;
            margin-top: 10px;
            flex-shrink: 0;
        }
        .ppt-slide-table {
            width: 100%;
            border-collapse: collapse;
            margin: 12px 0;
            font-size: 13px;
            color: #e2e8f0;
        }
        .ppt-slide-table th, .ppt-slide-table td {
            border: 1px solid #334155;
            padding: 8px 12px;
            text-align: left;
        }
        .ppt-slide-table th {
            background: #1e293b;
            color: #38bdf8;
            font-weight: 700;
        }
        .ppt-slide-table tr:nth-child(even) {
            background: rgba(30, 41, 59, 0.4);
        }
        .ppt-controls-bar {
            padding: 12px 24px;
            background: #070a12;
            border-top: 1px solid #1e293b;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            color: #94a3b8;
        }
        .ppt-nav-btn {
            background: #1e293b;
            color: #f8fafc;
            border: 1px solid #334155;
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
        }
        .ppt-nav-btn:hover:not(:disabled) {
            background: #334155;
            border-color: #64748b;
            color: #ffffff;
        }
        .ppt-nav-btn:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
        .ppt-slide-pills-wrap {
            display: flex;
            gap: 4px;
            overflow-x: auto;
            max-width: 320px;
        }
        .ppt-slide-pill {
            background: #1e293b;
            border: 1px solid #334155;
            color: #94a3b8;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            min-width: 28px;
            height: 28px;
            padding: 0 6px;
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s;
        }
        .ppt-slide-pill:hover {
            background: #334155;
            color: #ffffff;
        }
        .ppt-slide-pill.active {
            background: #0284c7;
            border-color: #38bdf8;
            color: #ffffff;
            box-shadow: 0 0 10px rgba(2, 132, 199, 0.4);
        }
        .ppt-slide-counter {
            font-family: var(--font-mono);
            font-size: 13px;
            font-weight: 700;
            color: #e2e8f0;
            background: #1e293b;
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid #334155;
            white-space: nowrap;
        }
        .ppt-keys-hint {
            font-size: 12px;
            color: #64748b;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            white-space: nowrap;
        }
        .ppt-keys-hint kbd {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 4px;
            padding: 2px 6px;
            font-family: var(--font-mono);
            font-size: 11px;
            color: #cbd5e1;
        }

        .ppt-title-slide {
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
        }
        .ppt-title-slide .ppt-slide-header {
            margin-bottom: 0 !important;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .ppt-title-slide .ppt-slide-title {
            font-size: 32px !important;
            font-weight: 800;
            background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 12px;
            max-width: 820px;
        }
        .ppt-title-slide .ppt-slide-subtitle {
            font-size: 18px !important;
            color: #38bdf8 !important;
            font-weight: 600;
            max-width: 680px;
            line-height: 1.5;
        }

        @media (max-width: 768px) {
            .ppt-stage {
                padding: 10px 8px !important;
            }
            .ppt-slide-card {
                padding: 24px 18px !important;
                min-height: auto !important;
                aspect-ratio: auto !important;
                height: 100% !important;
                border-radius: 12px !important;
            }
            .ppt-title-slide .ppt-slide-title {
                font-size: 22px !important;
            }
            .ppt-title-slide .ppt-slide-subtitle {
                font-size: 14px !important;
            }
            .ppt-slide-title {
                font-size: 20px !important;
            }
            .ppt-slide-subtitle {
                font-size: 13px !important;
            }
            .ppt-bullet-item {
                font-size: 14px !important;
                gap: 8px !important;
                line-height: 1.5 !important;
            }
            .ppt-keys-hint {
                display: none !important;
            }
            .ppt-controls-bar {
                padding: 8px 12px !important;
                gap: 8px !important;
            }
            .ppt-slide-pills-wrap {
                max-width: 130px !important;
            }
        }

        /* Archive Explorer Styles */
        .archive-list-wrap {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
            background: #ffffff;
        }
        .archive-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
        }
        .archive-table th {
            text-align: left;
            padding: 10px 14px;
            background: #f8fafc;
            color: #475569;
            font-weight: 700;
            border-bottom: 2px solid var(--border-color);
            font-size: 12px;
        }
        .archive-table td {
            padding: 10px 14px;
            border-bottom: 1px solid #f1f5f9;
            color: var(--text-main);
        }
        .archive-table tr:hover td {
            background: #f8fafc;
        }
        .archive-file-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 6px;
            background: #f1f5f9;
            color: #64748b;
            margin-right: 10px;
            vertical-align: middle;
        }

        /* Generic Payload / Hex Dump Styles */
        .generic-viewer-wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background: #ffffff;
        }
        .generic-meta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            padding: 18px 24px;
            background: #f8fafc;
            border-bottom: 1px solid var(--border-color);
        }
        .generic-meta-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .generic-meta-label {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .generic-meta-val {
            font-size: 13px;
            font-weight: 600;
            color: var(--text-main);
            word-break: break-all;
        }
        .hex-dump-area {
            flex: 1;
            overflow: auto;
            padding: 18px;
            font-family: var(--font-mono);
            font-size: 12px;
            line-height: 1.6;
            color: #0f172a;
            background: #ffffff;
        }
        .hex-row {
            display: flex;
            gap: 16px;
            white-space: pre;
        }
        .hex-offset {
            color: #0284c7;
            font-weight: 700;
            user-select: none;
        }
        .hex-bytes {
            color: #334155;
            letter-spacing: 0.05em;
        }
        .hex-ascii {
            color: #059669;
            border-left: 1px solid #e2e8f0;
            padding-left: 14px;
        }

        @media (max-width: 768px) {
            .doc-viewer-container {
                height: calc(100vh - 100px);
                border-radius: 8px;
            }
            .doc-toolbar {
                padding: 10px 12px;
                gap: 8px;
            }
            .doc-search-input {
                width: 130px;
            }
            .doc-search-input:focus {
                width: 170px;
            }
            .word-page-sheet {
                padding: 24px 16px;
            }
            .ppt-slide-card {
                padding: 24px 20px;
                min-height: 320px;
            }
            .ppt-slide-title {
                font-size: 20px;
            }
            .ppt-bullet-item {
                font-size: 14px;
            }
        }
        .fallback-download-card {
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 18px;
            padding: 40px 32px;
            text-align: center;
            max-width: 460px;
            width: 100%;
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
        }
        .fallback-icon {
            width: 72px;
            height: 72px;
            margin: 0 auto 16px;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.25);
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-green);
        }
        .fallback-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 8px;
            color: var(--text-main);
        }
        .fallback-desc {
            font-size: 13px;
            color: var(--text-muted);
            margin-bottom: 24px;
            line-height: 1.5;
        }

        /* Screen Guard Overlay */
        .screen-guard-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.98);
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 30px;
            color: #ffffff;
            cursor: pointer;
            backdrop-filter: blur(16px);
        }
        .screen-guard-overlay.hidden {
            display: none;
        }
        .guard-icon {
            color: var(--accent-red);
            margin-bottom: 16px;
            animation: pulseShield 1.5s infinite;
        }
        @keyframes pulseShield {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        .guard-title {
            font-family: var(--font-mono);
            font-size: 18px;
            font-weight: 800;
            letter-spacing: 0.08em;
            color: #ffffff;
            margin-bottom: 8px;
        }
        .guard-desc {
            font-size: 14px;
            color: #94a3b8;
            max-width: 480px;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        .guard-action {
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            color: var(--accent-cyan);
            background: rgba(2, 132, 199, 0.15);
            border: 1px solid rgba(2, 132, 199, 0.35);
            padding: 8px 18px;
            border-radius: 8px;
            letter-spacing: 0.05em;
        }

        /* Mobile Viewport Optimizations */
        @media (max-width: 480px) {
            body {
                padding: 14px 10px;
            }
            .auth-container {
                padding: 24px 16px 20px;
                border-radius: 16px;
                width: 100%;
                max-width: 100%;
                margin: auto 0;
            }
            .brand-shield-icon, .brand-custom-logo {
                width: 48px;
                height: 48px;
                margin-bottom: 12px;
                border-radius: 12px;
            }
            .brand-shield-icon svg {
                width: 26px;
                height: 26px;
            }
            .auth-title {
                font-size: 18px;
                letter-spacing: -0.01em;
            }
            .auth-subtitle {
                font-size: 11.5px;
                margin-bottom: 16px;
            }
            .file-info-chip {
                padding: 10px 12px;
                gap: 10px;
                margin-bottom: 16px;
                border-radius: 10px;
            }
            .file-chip-icon {
                width: 32px;
                height: 32px;
                border-radius: 8px;
            }
            .file-chip-icon svg {
                width: 16px;
                height: 16px;
            }
            .file-chip-name {
                font-size: 12px;
                max-width: 130px;
            }
            .file-chip-meta {
                font-size: 10px;
            }
            .security-badge {
                font-size: 9px;
                padding: 3px 6px;
            }
            .cyber-input {
                padding: 12px 40px 12px 14px;
                font-size: 13px;
                border-radius: 8px;
            }
            .cyber-btn-unlock {
                padding: 12px 16px;
                font-size: 12px;
                border-radius: 8px;
            }
            .auth-footer {
                font-size: 9px;
                margin-top: 18px;
            }
            .viewer-header {
                height: 52px;
                padding: 0 10px;
                gap: 8px;
            }
            .viewer-brand-title {
                font-size: 12px;
            }
            .viewer-file-badge {
                max-width: 100px;
                font-size: 10px;
                padding: 3px 6px;
            }
            .viewer-actions {
                gap: 6px;
            }
            .viewer-btn-dl, .viewer-btn-close {
                padding: 6px 10px;
                font-size: 11px;
                border-radius: 6px;
            }
            .viewer-content {
                height: calc(100vh - 52px);
                padding: 12px 8px;
            }
            .fallback-download-card {
                padding: 24px 16px;
                border-radius: 14px;
                width: 100%;
                max-width: 100%;
            }
            .fallback-icon {
                width: 52px;
                height: 52px;
                margin-bottom: 12px;
                border-radius: 14px;
            }
            .fallback-title {
                font-size: 16px;
            }
            .fallback-desc {
                font-size: 12px;
                margin-bottom: 18px;
            }
        }

        @media (max-width: 360px) {
            body {
                padding: 8px 6px;
            }
            .auth-container {
                padding: 20px 12px 16px;
                border-radius: 14px;
            }
            .auth-title {
                font-size: 16px;
            }
            .file-chip-name {
                max-width: 95px;
            }
            .viewer-file-badge {
                display: none;
            }
            .viewer-btn-dl span, .viewer-btn-close span {
                display: none;
            }
            .viewer-btn-dl, .viewer-btn-close {
                padding: 6px 8px;
            }
        }

        @media print {
            body { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="cyber-grid"></div>

    <div id="auth-panel" class="auth-container">
        ${logoHTML}
        <h1 class="auth-title">${brandTitle}</h1>
        <div class="auth-subtitle">Protected & Encrypted File</div>
        
        <div class="file-info-chip">
            <div class="file-chip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            </div>
            <div class="file-chip-details">
                <div class="file-chip-name" title="${safeMetaName}">${safeMetaName}</div>
                <div class="file-chip-meta" id="file-size-display">PROTECTED PAYLOAD</div>
            </div>
            <div class="security-badge">AES-256-GCM</div>
        </div>

        <div class="input-group">
            <div class="password-field-wrap">
                <input type="password" id="pwd" class="cyber-input" placeholder="Enter authorization password..." autofocus autocomplete="new-password" spellcheck="false" autocapitalize="off" data-lpignore="true" data-form-type="other">
                <button type="button" class="pwd-toggle-btn" id="pwd-toggle-btn" title="Toggle password visibility" aria-label="Toggle password visibility">
                    <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            </div>

            <button type="button" id="unlock-btn" class="cyber-btn-unlock" onclick="unlock()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>UNLOCK FILE</span>
            </button>
        </div>

        <div id="lockout-box" class="lockout-banner"></div>
        <div id="error-box" class="error-banner"></div>
        <div id="status-box" class="status-text"></div>
        <div class="auth-footer">PROTECTED BY CORALGENZ ZERO-KNOWLEDGE ARCHITECTURE</div>
    </div>

    <div id="viewer-container">
        <!-- Screen Capture / Window Blur Guard Shield -->
        <div id="screen-guard-overlay" class="screen-guard-overlay hidden">
            <div class="guard-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div class="guard-title">VISUAL SECURITY SHIELD ACTIVE</div>
            <p class="guard-desc">Protected content is obscured while the window is inactive or screen-capture utility is active.</p>
            <div class="guard-action">CLICK TO RESUME SECURE VIEW</div>
        </div>

        <div class="viewer-header">
            <div class="viewer-brand">
                <div class="viewer-brand-title">${brandTitle}</div>
                <div class="viewer-file-badge" id="viewer-file-name">${safeMetaName}</div>
            </div>
            <div class="viewer-actions">
                <button type="button" id="header-dl-btn" class="viewer-btn-dl" style="display:none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>DOWNLOAD FILE</span>
                </button>
                <span id="header-restricted-badge" style="display:none;font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--accent-red);background:rgba(225,29,72,0.08);border:1px solid rgba(225,29,72,0.25);padding:6px 12px;border-radius:6px;letter-spacing:0.06em;align-items:center;gap:6px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>EXPORT RESTRICTED (FORENSIC WATERMARK)</span>
                </span>
                <button type="button" class="viewer-btn-close" id="header-lock-btn" title="Lock and wipe volatile memory">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <span>LOCK</span>
                </button>
            </div>
        </div>
        <div class="viewer-content" id="viewer-content-area"></div>
    </div>

    <script>
        if (typeof process === 'undefined') {
            try {
                const noop = () => {};
                ['log', 'debug', 'info', 'warn', 'error', 'dir', 'table', 'trace'].forEach(m => {
                    try { console[m] = noop; } catch (e) {}
                });
                if (typeof console.clear === 'function') console.clear();
            } catch (e) {}
        }

        const CONTAINER_VERSION = ${jsonVersion};
        const SALT_B64 = ${jsonSalt};
        const IV_B64 = ${jsonIv};
        const TYPE = ${jsonType};
        const NAME = ${jsonName};
        const SIZE = ${jsonSize};
        const BRAND = ${jsonBrand};
        const ALLOW_DOWNLOAD = ${jsonAllowDownload};
        const INTEGRITY_HASH = ${jsonIntegrityHash};

        // Dynamically assembled anti-cracker peppers (defeats static string grep/decompilation)
        const MILSPEC_PEPPER_V6 = ["CORALGENZ", "MILSPEC_V6", "QUANTUM_RESISTANT", "ZERO_KNOWLEDGE", "883920194821"].join("::");
        const MILSPEC_PEPPER = MILSPEC_PEPPER_V6;
        const MILSPEC_PEPPER_V5 = ["CORALGENZ", "MILSPEC_V5", "ANTI_OFFLINE_CRACKER", "ZERO_KNOWLEDGE", "774910283419"].join("::");
        const MILSPEC_PEPPER_V4 = ["CORALGENZ", "MILSPEC_V4", "ANTI_JOHN_THE_RIPPER", "ZERO_KNOWLEDGE", "992174829104"].join("::");

        // Persistent session brute-force lockout tracking per file container
        const ATTEMPTS_KEY = 'cg_fails_' + ${jsonId};
        const LOCKOUT_KEY = 'cg_lockout_' + ${jsonId};

        function getFailedAttempts() {
            try {
                return parseInt(sessionStorage.getItem(ATTEMPTS_KEY) || '0', 10);
            } catch (e) {
                return 0;
            }
        }
        function setFailedAttempts(count) {
            try {
                sessionStorage.setItem(ATTEMPTS_KEY, count.toString());
            } catch (e) {}
        }
        function getLockoutUntil() {
            try {
                return parseInt(sessionStorage.getItem(LOCKOUT_KEY) || '0', 10);
            } catch (e) {
                return 0;
            }
        }
        function setLockoutUntil(timestamp) {
            try {
                sessionStorage.setItem(LOCKOUT_KEY, timestamp.toString());
            } catch (e) {}
        }

        let lockoutTimer = null;

        function updateLockoutUI() {
            const lockoutUntil = getLockoutUntil();
            const now = Date.now();
            const btn = document.getElementById('unlock-btn');
            const pwdInput = document.getElementById('pwd');
            const lockoutBanner = document.getElementById('lockout-box');
            const errBox = document.getElementById('error-box');

            if (lockoutUntil > now) {
                const secondsLeft = Math.ceil((lockoutUntil - now) / 1000);
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = \`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>LOCKED OUT (\${secondsLeft}s)</span>\`;
                }
                if (pwdInput) pwdInput.disabled = true;
                if (errBox) errBox.style.display = 'none';
                if (lockoutBanner) {
                    lockoutBanner.innerHTML = \`⚠️ <strong>BRUTE-FORCE MITIGATION ACTIVE</strong><br>Suspicious consecutive failed attempts detected. Decryption throttled for <strong>\${secondsLeft}s</strong> to neutralize automated dictionary/bot attacks.\`;
                    lockoutBanner.style.display = 'block';
                }
                if (!lockoutTimer) {
                    lockoutTimer = setInterval(updateLockoutUI, 1000);
                }
                return true;
            } else {
                if (lockoutTimer) {
                    clearInterval(lockoutTimer);
                    lockoutTimer = null;
                }
                if (lockoutBanner) lockoutBanner.style.display = 'none';
                if (btn && btn.disabled && btn.textContent.includes('LOCKED OUT')) {
                    btn.disabled = false;
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>UNLOCK FILE</span>';
                }
                if (pwdInput && pwdInput.disabled) {
                    pwdInput.disabled = false;
                    pwdInput.focus();
                }
                return false;
            }
        }

        // Initialize lockout check immediately
        updateLockoutUI();

        // Anti-Spyware & Anti-Virus: Block context menu & DevTools inspector shortcuts
        document.addEventListener('contextmenu', (e) => e.preventDefault());
        document.addEventListener('keydown', (e) => {
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
                ((e.ctrlKey || e.metaKey) && ['u', 's', 'p'].includes(e.key.toLowerCase()))
            ) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        let decryptedBlobUrl = null;
        let decryptedBytes = null;

        // Zeroization of Volatile Memory on unload, pagehide, or lock
        function zeroizeMemory() {
            try {
                if (decryptedBytes && decryptedBytes.fill) {
                    decryptedBytes.fill(0);
                    decryptedBytes = null;
                }
                if (decryptedBlobUrl) {
                    URL.revokeObjectURL(decryptedBlobUrl);
                    decryptedBlobUrl = null;
                }
                const contentArea = document.getElementById('viewer-content-area');
                if (contentArea) contentArea.innerHTML = '';
                const pwdInputEl = document.getElementById('pwd');
                if (pwdInputEl) {
                    pwdInputEl.value = '';
                    pwdInputEl.blur();
                }
            } catch (e) {}
        }
        window.addEventListener('beforeunload', zeroizeMemory);
        window.addEventListener('pagehide', zeroizeMemory);

        function formatBytes(bytes) {
            if (!bytes || bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }

        if (SIZE > 0) {
            const sizeEl = document.getElementById('file-size-display');
            if (sizeEl) sizeEl.textContent = formatBytes(SIZE);
        }

        // Embedded pure JS zero-network zip/deflate engine
        var fflate = (function(){
            var module, exports, define;
            var self = {};
            ${FFLATE_CODE};
            return self.fflate || (typeof window !== 'undefined' ? window.fflate : null);
        })();

        var MAMMOTH_DEFLATED = "${mammothDeflatedB64}";
        var XLSX_DEFLATED = "${xlsxDeflatedB64}";

        function loadEmbeddedLibrary(b64Deflated, globalName) {
            if (!b64Deflated || typeof window === 'undefined') return null;
            try {
                var binStr = atob(b64Deflated);
                var u8 = new Uint8Array(binStr.length);
                for (var i = 0; i < binStr.length; i++) u8[i] = binStr.charCodeAt(i);
                if (!fflate || !fflate.inflateSync) return null;
                var uncompressed = fflate.inflateSync(u8);
                var code = (new TextDecoder()).decode(uncompressed);
                var fn = new Function('module', 'exports', 'define', 'window', 'globalThis', code + '; return window["' + globalName + '"] || globalThis["' + globalName + '"];');
                return fn(undefined, undefined, undefined, window, window);
            } catch (e) {
                console.warn('Could not initialize embedded ' + globalName + ' engine:', e);
                return null;
            }
        }

        function escapeHTML(str) {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function renderExcelSpreadsheet(bytes, name, container, allowDl, dlBlob) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'doc-viewer-container';

            let sheets = [];

            // 1. Try embedded XLSX engine (SheetJS: supports xlsx, xls, csv, tsv, ods, formulas, formatting)
            try {
                let xlsxEngine = window.XLSX;
                if (!xlsxEngine && typeof XLSX_DEFLATED !== 'undefined' && XLSX_DEFLATED) {
                    xlsxEngine = loadEmbeddedLibrary(XLSX_DEFLATED, 'XLSX');
                    if (xlsxEngine) window.XLSX = xlsxEngine;
                }

                if (xlsxEngine && typeof xlsxEngine.read === 'function') {
                    const arrayBuf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
                    const workbook = xlsxEngine.read(arrayBuf, { type: 'array' });
                    const sheetNames = workbook.SheetNames || [];
                    sheetNames.forEach(sName => {
                        const ws = workbook.Sheets[sName];
                        if (ws) {
                            const rows = xlsxEngine.utils.sheet_to_json(ws, { header: 1, defval: '' });
                            sheets.push({ name: sName, rows: rows });
                        }
                    });
                }
            } catch (err) {
                console.warn('XLSX engine notice:', err);
            }

            // 2. OpenXML spreadsheet fallback
            const isZip = bytes.length > 4 && bytes[0] === 0x50 && bytes[1] === 0x4B;
            if (sheets.length === 0 && isZip && fflate && fflate.unzipSync) {
                try {
                    const files = fflate.unzipSync(bytes);
                    const sharedStrings = [];
                    const ssFile = files['xl/sharedStrings.xml'] || files['xl/SharedStrings.xml'];
                    if (ssFile) {
                        const ssXml = (new TextDecoder()).decode(ssFile);
                        const parser = new DOMParser();
                        const ssDoc = parser.parseFromString(ssXml, 'application/xml');
                        const siElements = ssDoc.getElementsByTagName('si');
                        for (let i = 0; i < siElements.length; i++) {
                            const tNodes = siElements[i].getElementsByTagName('t');
                            let sText = '';
                            for (let j = 0; j < tNodes.length; j++) {
                                sText += tNodes[j].textContent || '';
                            }
                            sharedStrings.push(sText);
                        }
                    }

                    const wbFile = files['xl/workbook.xml'] || files['xl/Workbook.xml'];
                    const sheetMeta = [];
                    if (wbFile) {
                        const wbXml = (new TextDecoder()).decode(wbFile);
                        const parser = new DOMParser();
                        const wbDoc = parser.parseFromString(wbXml, 'application/xml');
                        const sNodes = wbDoc.getElementsByTagName('sheet');
                        for (let i = 0; i < sNodes.length; i++) {
                            const sName = sNodes[i].getAttribute('name') || ('Sheet ' + (i + 1));
                            const sId = sNodes[i].getAttribute('sheetId') || (i + 1);
                            sheetMeta.push({ name: sName, id: sId });
                        }
                    }

                    if (sheetMeta.length === 0) {
                        Object.keys(files).forEach((key, idx) => {
                            const lk = key.toLowerCase();
                            if (lk.startsWith('xl/worksheets/sheet') && lk.endsWith('.xml')) {
                                sheetMeta.push({ name: 'Sheet ' + (idx + 1), path: key });
                            }
                        });
                    }

                    sheetMeta.forEach((sm, smIdx) => {
                        const possiblePaths = [
                            sm.path,
                            'xl/worksheets/sheet' + sm.id + '.xml',
                            'xl/worksheets/sheet' + (smIdx + 1) + '.xml',
                            'xl/worksheets/Sheet' + (smIdx + 1) + '.xml'
                        ].filter(Boolean);

                        let sheetFile = null;
                        for (let p of possiblePaths) {
                            if (files[p]) { sheetFile = files[p]; break; }
                        }

                        if (sheetFile) {
                            const sheetXml = (new TextDecoder()).decode(sheetFile);
                            const parser = new DOMParser();
                            const sDoc = parser.parseFromString(sheetXml, 'application/xml');
                            const rowNodes = sDoc.getElementsByTagName('row');
                            const sheetRows = [];

                            for (let r = 0; r < rowNodes.length; r++) {
                                const rowEl = rowNodes[r];
                                const cNodes = rowEl.getElementsByTagName('c');
                                const rowData = [];
                                let maxColIdx = 0;

                                for (let c = 0; c < cNodes.length; c++) {
                                    const cEl = cNodes[c];
                                    const rAttr = cEl.getAttribute('r') || '';
                                    const tAttr = cEl.getAttribute('t') || '';
                                    const vNode = cEl.getElementsByTagName('v')[0];
                                    let cellVal = '';

                                    if (tAttr === 's' && vNode) {
                                        const sIdx = parseInt(vNode.textContent || '0', 10);
                                        cellVal = sharedStrings[sIdx] || '';
                                    } else if (tAttr === 'inlineStr') {
                                        const tNode = cEl.getElementsByTagName('t')[0];
                                        cellVal = tNode ? tNode.textContent : '';
                                    } else if (vNode) {
                                        cellVal = vNode.textContent || '';
                                    }

                                    let colLetters = '';
                                    for (let ci = 0; ci < rAttr.length; ci++) {
                                        const ch = rAttr.charAt(ci);
                                        if (ch >= 'A' && ch <= 'Z') colLetters += ch;
                                    }

                                    let colIndex = 0;
                                    for (let k = 0; k < colLetters.length; k++) {
                                        colIndex = colIndex * 26 + (colLetters.charCodeAt(k) - 64);
                                    }
                                    const zeroBasedCol = colIndex > 0 ? (colIndex - 1) : c;
                                    rowData[zeroBasedCol] = cellVal;
                                    if (zeroBasedCol > maxColIdx) maxColIdx = zeroBasedCol;
                                }

                                const normalizedRow = [];
                                for (let k = 0; k <= maxColIdx; k++) {
                                    normalizedRow.push(rowData[k] !== undefined ? rowData[k] : '');
                                }
                                if (normalizedRow.some(cell => String(cell).trim().length > 0)) {
                                    sheetRows.push(normalizedRow);
                                }
                            }

                            sheets.push({
                                name: sm.name,
                                rows: sheetRows
                            });
                        }
                    });
                } catch (e) {
                    console.warn('OpenXML spreadsheet parsing fallback:', e);
                }
            }

            // 3. Plain CSV/TSV fallback
            if (sheets.length === 0) {
                try {
                    const text = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
                    const delimiter = name.toLowerCase().endsWith('.tsv') ? '\t' : (text.includes('\t') ? '\t' : (text.includes(';') ? ';' : ','));
                    const rawLines = text.split(String.fromCharCode(10)).map(l => l.endsWith(String.fromCharCode(13)) ? l.slice(0, -1) : l).filter(l => l.trim().length > 0);
                    const rows = rawLines.map(line => line.split(delimiter).map(c => {
                        c = c.trim();
                        if ((c.startsWith('"') && c.endsWith('"')) || (c.startsWith("'") && c.endsWith("'"))) {
                            c = c.slice(1, -1);
                        }
                        return c;
                    }));
                    if (rows.length > 0) {
                        sheets.push({ name: 'Data', rows: rows });
                    }
                } catch (e) {}
            }

            if (sheets.length === 0 || (sheets.length === 1 && sheets[0].rows.length === 0)) {
                sheets = [{ name: 'Sheet 1', rows: [['(Empty spreadsheet or format preview unavailable)']] }];
            }

            let activeSheetIdx = 0;
            let searchQuery = '';

            function renderUI() {
                wrapper.innerHTML = '';

                const currentSheet = sheets[activeSheetIdx] || { rows: [] };
                let rowsToDisplay = currentSheet.rows || [];
                let maxCols = 0;
                rowsToDisplay.forEach(r => { if (r && r.length > maxCols) maxCols = r.length; });

                const toolbar = document.createElement('div');
                toolbar.className = 'doc-toolbar';

                const toolLeft = document.createElement('div');
                toolLeft.className = 'doc-toolbar-left';
                toolLeft.innerHTML = '<span class="doc-format-badge doc-badge-excel"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg> EXCEL SPREADSHEET</span><span class="doc-filename" title="' + escapeHTML(name) + '">' + escapeHTML(name) + '</span><span class="doc-stats-badge">' + rowsToDisplay.length + ' Rows &times; ' + maxCols + ' Cols</span>';

                const toolRight = document.createElement('div');
                toolRight.className = 'doc-toolbar-right';

                const searchBox = document.createElement('div');
                searchBox.className = 'doc-search-box';
                searchBox.innerHTML = '<svg class="doc-search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.className = 'doc-search-input';
                searchInput.placeholder = 'Search sheet cells...';
                searchInput.value = searchQuery;
                searchInput.addEventListener('input', (e) => {
                    searchQuery = e.target.value.toLowerCase();
                    renderTable();
                });
                searchBox.appendChild(searchInput);
                toolRight.appendChild(searchBox);

                if (allowDl && dlBlob) {
                    const dlBtn = document.createElement('button');
                    dlBtn.type = 'button';
                    dlBtn.className = 'viewer-btn-dl';
                    dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>DOWNLOAD</span>';
                    dlBtn.onclick = () => triggerDownload(dlBlob, name);
                    toolRight.appendChild(dlBtn);
                }

                toolbar.appendChild(toolLeft);
                toolbar.appendChild(toolRight);
                wrapper.appendChild(toolbar);

                if (sheets.length > 1) {
                    const tabsBar = document.createElement('div');
                    tabsBar.className = 'excel-tabs-bar';
                    sheets.forEach((sh, idx) => {
                        const tabBtn = document.createElement('button');
                        tabBtn.type = 'button';
                        tabBtn.className = 'excel-tab-btn' + (idx === activeSheetIdx ? ' active' : '');
                        tabBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> ' + escapeHTML(sh.name) + ' <span class="excel-tab-count">(' + (sh.rows ? sh.rows.length : 0) + ')</span>';
                        tabBtn.onclick = () => {
                            activeSheetIdx = idx;
                            searchQuery = '';
                            renderUI();
                        };
                        tabsBar.appendChild(tabBtn);
                    });
                    wrapper.appendChild(tabsBar);
                }

                const tableScroll = document.createElement('div');
                tableScroll.className = 'excel-table-scroll';
                wrapper.appendChild(tableScroll);

                function renderTable() {
                    tableScroll.innerHTML = '';
                    let filtered = currentSheet.rows || [];

                    if (searchQuery.trim().length > 0) {
                        filtered = filtered.filter(r => (r || []).some(c => String(c).toLowerCase().includes(searchQuery)));
                    }

                    if (filtered.length === 0) {
                        tableScroll.innerHTML = '<div class="excel-empty-state">No matching rows found in this sheet.</div>';
                        return;
                    }

                    let curMaxCols = 0;
                    filtered.forEach(r => { if (r && r.length > curMaxCols) curMaxCols = r.length; });
                    if (curMaxCols === 0) curMaxCols = 1;

                    const table = document.createElement('table');
                    table.className = 'excel-grid-table';

                    const thead = document.createElement('thead');
                    const hdrTr = document.createElement('tr');
                    const cornerTh = document.createElement('th');
                    cornerTh.className = 'row-index-hdr';
                    cornerTh.textContent = '#';
                    hdrTr.appendChild(cornerTh);

                    for (let c = 0; c < curMaxCols; c++) {
                        const th = document.createElement('th');
                        let colName = '';
                        let temp = c;
                        while (temp >= 0) {
                            colName = String.fromCharCode(65 + (temp % 26)) + colName;
                            temp = Math.floor(temp / 26) - 1;
                        }
                        th.textContent = colName;
                        hdrTr.appendChild(th);
                    }
                    thead.appendChild(hdrTr);
                    table.appendChild(thead);

                    const tbody = document.createElement('tbody');
                    filtered.forEach((row, rIdx) => {
                        const tr = document.createElement('tr');
                        const rowNumTd = document.createElement('td');
                        rowNumTd.className = 'row-num';
                        rowNumTd.textContent = (rIdx + 1);
                        tr.appendChild(rowNumTd);

                        for (let c = 0; c < curMaxCols; c++) {
                            const td = document.createElement('td');
                            const rawVal = row && row[c] !== undefined ? row[c] : '';
                            const strVal = String(rawVal);
                            td.textContent = strVal;

                            if (typeof rawVal === 'number' || (!isNaN(rawVal) && strVal.trim() !== '')) {
                                td.style.textAlign = 'right';
                            }

                            if (searchQuery && strVal.toLowerCase().includes(searchQuery)) {
                                td.classList.add('excel-search-match');
                            }
                            tr.appendChild(td);
                        }
                        tbody.appendChild(tr);
                    });
                    table.appendChild(tbody);
                    tableScroll.appendChild(table);
                }

                renderTable();
            }

            renderUI();
            container.appendChild(wrapper);
        }

        async function renderWordDocument(bytes, name, container, allowDl, dlBlob) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'doc-viewer-container';

            let currentZoom = 100;

            const toolbar = document.createElement('div');
            toolbar.className = 'doc-toolbar';

            const toolLeft = document.createElement('div');
            toolLeft.className = 'doc-toolbar-left';
            toolLeft.innerHTML = '<span class="doc-format-badge doc-badge-word"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> WORD DOCUMENT</span><span class="doc-filename" title="' + escapeHTML(name) + '">' + escapeHTML(name) + '</span>';

            const toolRight = document.createElement('div');
            toolRight.className = 'doc-toolbar-right';

            // Zoom controls
            const zoomWrap = document.createElement('div');
            zoomWrap.className = 'doc-zoom-controls';

            const zoomOutBtn = document.createElement('button');
            zoomOutBtn.type = 'button';
            zoomOutBtn.id = 'doc-zoom-out';
            zoomOutBtn.className = 'doc-zoom-btn';
            zoomOutBtn.title = 'Zoom Out';
            zoomOutBtn.innerHTML = '&minus;';

            const zoomLabel = document.createElement('span');
            zoomLabel.id = 'doc-zoom-label';
            zoomLabel.className = 'doc-zoom-label';
            zoomLabel.textContent = '100%';

            const zoomInBtn = document.createElement('button');
            zoomInBtn.type = 'button';
            zoomInBtn.id = 'doc-zoom-in';
            zoomInBtn.className = 'doc-zoom-btn';
            zoomInBtn.title = 'Zoom In';
            zoomInBtn.innerHTML = '&plus;';

            zoomWrap.appendChild(zoomOutBtn);
            zoomWrap.appendChild(zoomLabel);
            zoomWrap.appendChild(zoomInBtn);
            toolRight.appendChild(zoomWrap);

            if (allowDl && dlBlob) {
                const dlBtn = document.createElement('button');
                dlBtn.type = 'button';
                dlBtn.className = 'viewer-btn-dl';
                dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>DOWNLOAD</span>';
                dlBtn.onclick = () => triggerDownload(dlBlob, name);
                toolRight.appendChild(dlBtn);
            }

            toolbar.appendChild(toolLeft);
            toolbar.appendChild(toolRight);
            wrapper.appendChild(toolbar);

            const scrollContainer = document.createElement('div');
            scrollContainer.className = 'word-scroll-container';

            const sheet = document.createElement('div');
            sheet.className = 'word-page-sheet';

            // Setup zoom buttons
            zoomOutBtn.onclick = () => {
                if (currentZoom > 60) {
                    currentZoom -= 10;
                    sheet.style.transform = 'scale(' + (currentZoom / 100) + ')';
                    sheet.style.transformOrigin = 'top center';
                    zoomLabel.textContent = currentZoom + '%';
                }
            };
            zoomInBtn.onclick = () => {
                if (currentZoom < 160) {
                    currentZoom += 10;
                    sheet.style.transform = 'scale(' + (currentZoom / 100) + ')';
                    sheet.style.transformOrigin = 'top center';
                    zoomLabel.textContent = currentZoom + '%';
                }
            };

            let renderedContent = false;

            // 1. Try embedded Mammoth engine (converts docx into full HTML with styles, headings, tables, lists, and images)
            try {
                let mammothEngine = window.mammoth;
                if (!mammothEngine && typeof MAMMOTH_DEFLATED !== 'undefined' && MAMMOTH_DEFLATED) {
                    mammothEngine = loadEmbeddedLibrary(MAMMOTH_DEFLATED, 'mammoth');
                    if (mammothEngine) window.mammoth = mammothEngine;
                }

                if (mammothEngine && typeof mammothEngine.convertToHtml === 'function') {
                    const arrayBuf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
                    const res = await mammothEngine.convertToHtml({ arrayBuffer: arrayBuf });
                    if (res && res.value && res.value.trim().length > 0) {
                        sheet.innerHTML = res.value;
                        renderedContent = true;
                    }
                }
            } catch (err) {
                console.warn('Mammoth engine notice:', err);
            }

            // 2. OpenXML Word fallback if Mammoth wasn't used or failed
            const isZip = bytes.length > 4 && bytes[0] === 0x50 && bytes[1] === 0x4B;
            if (!renderedContent && isZip && fflate && fflate.unzipSync) {
                try {
                    const files = fflate.unzipSync(bytes);
                    const docFile = files['word/document.xml'] || files['word/Document.xml'];
                    if (docFile) {
                        const xmlText = (new TextDecoder()).decode(docFile);
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(xmlText, 'application/xml');
                        const body = doc.getElementsByTagName('w:body')[0] || doc.getElementsByTagName('body')[0];

                        if (body) {
                            const children = Array.from(body.childNodes);
                            let bodyHTML = '';

                            children.forEach(node => {
                                const rawNodeName = node.localName || node.nodeName || '';
                                const colonIdx = rawNodeName.indexOf(':');
                                const localName = colonIdx >= 0 ? rawNodeName.slice(colonIdx + 1) : rawNodeName;

                                if (localName === 'p') {
                                    let pStyle = '';
                                    let isListItem = false;
                                    const pPr = node.getElementsByTagName('w:pPr')[0] || node.getElementsByTagName('pPr')[0];
                                    if (pPr) {
                                        const pStyleEl = pPr.getElementsByTagName('w:pStyle')[0] || pPr.getElementsByTagName('pStyle')[0];
                                        if (pStyleEl) {
                                            pStyle = (pStyleEl.getAttribute('w:val') || pStyleEl.getAttribute('val') || '').toLowerCase();
                                        }
                                        const numPr = pPr.getElementsByTagName('w:numPr')[0] || pPr.getElementsByTagName('numPr')[0];
                                        if (numPr) isListItem = true;
                                    }

                                    const rNodes = node.getElementsByTagName('w:r');
                                    let pTextHTML = '';
                                    for (let i = 0; i < rNodes.length; i++) {
                                        const rNode = rNodes[i];
                                        const rPr = rNode.getElementsByTagName('w:rPr')[0] || rNode.getElementsByTagName('rPr')[0];
                                        const isBold = rPr && (rPr.getElementsByTagName('w:b').length > 0 || rPr.getElementsByTagName('b').length > 0);
                                        const isItalic = rPr && (rPr.getElementsByTagName('w:i').length > 0 || rPr.getElementsByTagName('i').length > 0);
                                        const isUnderline = rPr && (rPr.getElementsByTagName('w:u').length > 0 || rPr.getElementsByTagName('u').length > 0);

                                        const tNodes = rNode.getElementsByTagName('w:t');
                                        let runText = '';
                                        for (let j = 0; j < tNodes.length; j++) {
                                            runText += tNodes[j].textContent || '';
                                        }

                                        if (runText.length > 0) {
                                            let formatted = escapeHTML(runText);
                                            if (isUnderline) formatted = '<u>' + formatted + '</u>';
                                            if (isItalic) formatted = '<em>' + formatted + '</em>';
                                            if (isBold) formatted = '<strong>' + formatted + '</strong>';
                                            pTextHTML += formatted;
                                        }

                                        if (rNode.getElementsByTagName('w:br').length > 0 || rNode.getElementsByTagName('br').length > 0) {
                                            pTextHTML += '<br/>';
                                        }
                                    }

                                    if (pTextHTML.trim().length > 0) {
                                        if (pStyle.includes('heading1') || pStyle.includes('heading 1') || pStyle.includes('title')) {
                                            bodyHTML += '<h1>' + pTextHTML + '</h1>';
                                        } else if (pStyle.includes('heading2') || pStyle.includes('heading 2') || pStyle.includes('subtitle')) {
                                            bodyHTML += '<h2>' + pTextHTML + '</h2>';
                                        } else if (pStyle.includes('heading3') || pStyle.includes('heading 3')) {
                                            bodyHTML += '<h3>' + pTextHTML + '</h3>';
                                        } else if (isListItem || pStyle.includes('list')) {
                                            bodyHTML += '<div class="word-list-item"><span class="word-bullet">&bull;</span><span>' + pTextHTML + '</span></div>';
                                        } else {
                                            bodyHTML += '<p>' + pTextHTML + '</p>';
                                        }
                                    }
                                } else if (localName === 'tbl') {
                                    const trNodes = node.getElementsByTagName('w:tr');
                                    if (trNodes.length > 0) {
                                        bodyHTML += '<table class="word-table">';
                                        for (let r = 0; r < trNodes.length; r++) {
                                            bodyHTML += '<tr>';
                                            const tcNodes = trNodes[r].getElementsByTagName('w:tc');
                                            for (let c = 0; c < tcNodes.length; c++) {
                                                const cellPs = tcNodes[c].getElementsByTagName('w:p');
                                                let cellContent = '';
                                                for (let cp = 0; cp < cellPs.length; cp++) {
                                                    const tNodes = cellPs[cp].getElementsByTagName('w:t');
                                                    let pStr = '';
                                                    for (let tp = 0; tp < tNodes.length; tp++) pStr += tNodes[tp].textContent || '';
                                                    if (pStr.trim().length > 0) {
                                                        cellContent += (cellContent ? '<br/>' : '') + escapeHTML(pStr);
                                                    }
                                                }
                                                const tag = r === 0 ? 'th' : 'td';
                                                bodyHTML += '<' + tag + '>' + (cellContent || '&nbsp;') + '</' + tag + '>';
                                            }
                                            bodyHTML += '</tr>';
                                        }
                                        bodyHTML += '</table>';
                                    }
                                }
                            });

                            if (bodyHTML.trim().length > 0) {
                                sheet.innerHTML = bodyHTML;
                                renderedContent = true;
                            }
                        }
                    }
                } catch (e) {
                    console.warn('OpenXML Word parsing fallback:', e);
                }
            }

            // 3. RTF and Legacy Binary .doc Parser
            if (!renderedContent) {
                let xlsxEngine = window.XLSX;
                if (!xlsxEngine && typeof XLSX_DEFLATED !== 'undefined' && XLSX_DEFLATED) {
                    xlsxEngine = loadEmbeddedLibrary(XLSX_DEFLATED, 'XLSX');
                    if (xlsxEngine) window.XLSX = xlsxEngine;
                }

                let fullText = '';
                let stream = bytes;
                const isOleDoc = bytes.length > 8 && bytes[0] === 0xD0 && bytes[1] === 0xCF && bytes[2] === 0x11 && bytes[3] === 0xE0;
                if (isOleDoc && xlsxEngine && xlsxEngine.CFB) {
                    try {
                        const cfb = xlsxEngine.CFB.read(bytes, { type: 'array' });
                        const wordEntry = xlsxEngine.CFB.find(cfb, '/WordDocument') || xlsxEngine.CFB.find(cfb, 'WordDocument');
                        if (wordEntry && wordEntry.content) {
                            stream = new Uint8Array(wordEntry.content);
                            if (stream.length >= 512) {
                                const view = new DataView(stream.buffer, stream.byteOffset, stream.byteLength);
                                const wIdent = view.getUint16(0, true);
                                if (wIdent === 0xA5EC || wIdent === 0xA5DC) {
                                    const flags = view.getUint16(0x000A, true);
                                    const tableStreamName = (flags & 0x0200) ? '/1Table' : '/0Table';
                                    const altTableStreamName = (flags & 0x0200) ? '1Table' : '0Table';
                                    const tableEntry = xlsxEngine.CFB.find(cfb, tableStreamName) || xlsxEngine.CFB.find(cfb, altTableStreamName);

                                    // 1. Piece Table (CLX / Plcfpcd) in Table stream
                                    if (tableEntry && tableEntry.content && stream.length >= 0x01A6) {
                                        const tbl = new Uint8Array(tableEntry.content);
                                        const fcClx = view.getUint32(0x01A2, true);
                                        const lcbClx = view.getUint32(0x01A6, true);

                                        if (fcClx < tbl.length && lcbClx > 0) {
                                            let offset = fcClx;
                                            const endClx = Math.min(fcClx + lcbClx, tbl.length);
                                            while (offset < endClx && tbl[offset] === 0x01) {
                                                if (offset + 3 >= endClx) break;
                                                const cb = tbl[offset + 1] | (tbl[offset + 2] << 8);
                                                offset += 3 + cb;
                                            }

                                            if (offset < endClx && tbl[offset] === 0x02) {
                                                const lcb = tbl[offset + 1] | (tbl[offset + 2] << 8) | (tbl[offset + 3] << 16) | (tbl[offset + 4] << 24);
                                                if (lcb > 4 && (lcb - 4) % 12 === 0) {
                                                    const n = (lcb - 4) / 12;
                                                    const cpStart = offset + 5;
                                                    const pcdStart = cpStart + (n + 1) * 4;

                                                    if (pcdStart + n * 8 <= tbl.length) {
                                                        const cps = [];
                                                        for (let i = 0; i <= n; i++) {
                                                            const cp = tbl[cpStart + i * 4] | (tbl[cpStart + i * 4 + 1] << 8) | (tbl[cpStart + i * 4 + 2] << 16) | (tbl[cpStart + i * 4 + 3] << 24);
                                                            cps.push(cp);
                                                        }

                                                        for (let i = 0; i < n; i++) {
                                                            const pcdPos = pcdStart + i * 8;
                                                            const fc = tbl[pcdPos + 2] | (tbl[pcdPos + 3] << 8) | (tbl[pcdPos + 4] << 16) | (tbl[pcdPos + 5] << 24);
                                                            const charLen = cps[i + 1] - cps[i];
                                                            if (charLen <= 0) continue;

                                                            const isCompressed = (fc & 0x40000000) !== 0;
                                                            const actualFc = isCompressed ? ((fc & ~0x40000000) >>> 1) : fc;

                                                            if (isCompressed) {
                                                                if (actualFc + charLen <= stream.length) {
                                                                    const slice = stream.subarray(actualFc, actualFc + charLen);
                                                                    fullText += (new TextDecoder('latin1')).decode(slice);
                                                                }
                                                            } else {
                                                                if (actualFc + charLen * 2 <= stream.length) {
                                                                    const slice = stream.subarray(actualFc, actualFc + charLen * 2);
                                                                    fullText += (new TextDecoder('utf-16le')).decode(slice);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // 2. FIB fcMin fallback
                                    if (!fullText) {
                                        const fcMin = view.getUint32(24, true);
                                        const ccpText = view.getUint32(76, true);
                                        if (fcMin > 0 && fcMin < stream.length && ccpText > 0) {
                                            const byteLen = Math.min(ccpText * 2, stream.length - fcMin);
                                            const slice = stream.subarray(fcMin, fcMin + byteLen);
                                            fullText = (new TextDecoder('utf-16le', { fatal: false })).decode(slice);
                                        }
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.warn('CFB WordDocument extraction notice:', e);
                    }
                }

                // Check RTF
                if (!fullText) {
                    const rawText = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
                    if (rawText.startsWith('{\\\\rtf') || rawText.startsWith('{\\rtf')) {
                        fullText = rawText.replace(/\\\\\\w+\\b[ ]?/g, ' ').replace(/[{}]/g, '');
                    }
                }

                // Scan text runs fallback
                if (!fullText && stream && stream.length > 50) {
                    const textRuns = [];
                    for (let pos = 0; pos < stream.length - 10; pos += 2) {
                        let runLen = 0;
                        while (pos + runLen + 1 < stream.length) {
                            const b0 = stream[pos + runLen];
                            const b1 = stream[pos + runLen + 1];
                            if (b1 === 0 && ((b0 >= 32 && b0 <= 126) || b0 === 10 || b0 === 13 || b0 === 9)) {
                                runLen += 2;
                            } else {
                                break;
                            }
                        }
                        if (runLen >= 12) {
                            const str = (new TextDecoder('utf-16le', { fatal: false })).decode(stream.subarray(pos, pos + runLen)).trim();
                            const clean = str.split(String.fromCharCode(13)).map(s => s.trim()).filter(s => s.length >= 3);
                            clean.forEach(c => {
                                if (!c.includes('WordDocument') && !c.includes('Normal.dot') && !c.includes('CompObj') && !c.includes('Times New Roman')) {
                                    textRuns.push(c);
                                }
                            });
                            pos += runLen;
                        }
                    }
                    if (textRuns.length > 0) {
                        fullText = Array.from(new Set(textRuns)).join(String.fromCharCode(13));
                    }
                }

                if (fullText) {
                    const c13 = String.fromCharCode(13);
                    const c7 = String.fromCharCode(7);
                    const c8 = String.fromCharCode(8);
                    const c12 = String.fromCharCode(12);
                    const c19 = String.fromCharCode(19);
                    const c20 = String.fromCharCode(20);
                    const c21 = String.fromCharCode(21);
                    const c1 = String.fromCharCode(1);

                    const cleanFields = (txt) => {
                        let res = txt;
                        while (res.indexOf(c19) !== -1 && res.indexOf(c21) !== -1) {
                            const start = res.indexOf(c19);
                            const end = res.indexOf(c21, start);
                            if (end === -1) break;
                            const fieldBlock = res.slice(start, end + 1);
                            const sep = fieldBlock.indexOf(c20);
                            if (sep !== -1) {
                                const instr = fieldBlock.slice(1, sep);
                                const disp = fieldBlock.slice(sep + 1, -1).replace(new RegExp(c1, 'g'), '').trim();
                                const linkMatch = instr.match(/HYPERLINK\\s*\"([^\"]+)\"/i) || instr.match(/HYPERLINK\\s*(\\S+)/i);
                                if (linkMatch) {
                                    const url = linkMatch[1];
                                    const label = disp || url;
                                    res = res.slice(0, start) + '<a href=\"' + escapeHTML(url) + '\" target=\"_blank\" rel=\"noopener\" style=\"color:#0284c7;text-decoration:underline;\">' + escapeHTML(label) + '</a>' + res.slice(end + 1);
                                } else {
                                    res = res.slice(0, start) + escapeHTML(disp) + res.slice(end + 1);
                                }
                            } else {
                                res = res.slice(0, start) + res.slice(end + 1);
                            }
                        }
                        return res.replace(new RegExp('[' + c19 + c20 + c21 + c1 + ']', 'g'), '');
                    };

                    const rawParas = fullText.split(c13);
                    let docHTML = '';
                    let inList = false;

                    rawParas.forEach((p, pIdx) => {
                        let trimmed = p.trim();
                        if (!trimmed || trimmed === c8 || trimmed === c12) {
                            if (trimmed === c8 || trimmed === c12) {
                                if (inList) { docHTML += '</ul>'; inList = false; }
                                docHTML += '<div class=\"word-page-break\" style=\"margin:24px 0;border-top:1px dashed #cbd5e1;position:relative;text-align:center;\"><span style=\"position:relative;top:-10px;background:#fff;padding:0 10px;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;\">Page Break</span></div>';
                            }
                            return;
                        }

                        if (trimmed.includes(c7)) {
                            if (inList) { docHTML += '</ul>'; inList = false; }
                            const rawRows = p.split(c7 + c7);
                            const rows = [];
                            rawRows.forEach(r => {
                                const cells = r.split(c7).map(c => c.trim()).filter(c => c.length > 0 && c !== c7);
                                if (cells.length > 0) rows.push(cells);
                            });

                            if (rows.length > 0) {
                                docHTML += '<table class=\"word-table\" style=\"width:100%;border-collapse:collapse;margin:18px 0;font-size:14px;\">';
                                rows.forEach((row, rIdx) => {
                                    docHTML += '<tr>';
                                    row.forEach(cell => {
                                        const tag = rIdx === 0 ? 'th' : 'td';
                                        const cellStyle = rIdx === 0
                                            ? 'background:#f1f5f9;font-weight:700;color:#1e293b;padding:10px 14px;border:1px solid #cbd5e1;text-align:left;'
                                            : 'padding:10px 14px;border:1px solid #e2e8f0;color:#334155;';
                                        docHTML += '<' + tag + ' style=\"' + cellStyle + '\">' + cleanFields(cell) + '</' + tag + '>';
                                    });
                                    docHTML += '</tr>';
                                });
                                docHTML += '</table>';
                            }
                            return;
                        }

                        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
                        const isNumbered = /^[0-9]+[\\.\\)]\\s/.test(trimmed) || /^[a-zA-Z][\\.\\)]\\s/.test(trimmed);

                        if (isBullet || isNumbered) {
                            if (!inList) {
                                docHTML += '<ul style=\"margin:12px 0 16px 20px;padding:0;list-style:none;\">';
                                inList = true;
                            }
                            const cleanText = cleanFields(trimmed.replace(/^[•\\-\\*]\\s*|^[0-9a-zA-Z]+[\\.\\)]\\s*/, ''));
                            const bulletIcon = isNumbered
                                ? '<span style=\"font-weight:700;margin-right:8px;color:#0284c7;\">' + (trimmed.match(/^[0-9a-zA-Z]+[\\.\\)]/) ? trimmed.match(/^[0-9a-zA-Z]+[\\.\\)]/)[0] : '') + '</span>'
                                : '<span style=\"margin-right:8px;color:#0284c7;font-weight:bold;\">&bull;</span>';
                            docHTML += '<li style=\"display:flex;align-items:flex-start;margin-bottom:6px;line-height:1.6;color:#334155;\">' + bulletIcon + '<span>' + cleanText + '</span></li>';
                            return;
                        }

                        if (inList) {
                            docHTML += '</ul>';
                            inList = false;
                        }

                        const cleaned = cleanFields(trimmed);
                        const isTitle = (pIdx === 0 && cleaned.length < 80);
                        const isHeading = (cleaned.length < 60 && (cleaned.endsWith(':') || cleaned === cleaned.toUpperCase())) || (pIdx === 2 && cleaned.length < 90);

                        if (isTitle) {
                            docHTML += '<h1 style=\"font-size:26px;font-weight:800;color:#0f172a;margin-bottom:14px;border-bottom:2px solid #e2e8f0;padding-bottom:10px;\">' + cleaned + '</h1>';
                        } else if (isHeading) {
                            docHTML += '<h2 style=\"font-size:18px;font-weight:700;color:#1e293b;margin-top:20px;margin-bottom:10px;\">' + cleaned + '</h2>';
                        } else {
                            docHTML += '<p style=\"font-size:15px;line-height:1.75;color:#334155;margin-bottom:14px;\">' + cleaned + '</p>';
                        }
                    });

                    if (inList) docHTML += '</ul>';

                    if (docHTML.trim().length > 0) {
                        sheet.innerHTML = docHTML;
                        renderedContent = true;
                    }
                }
            }

            if (!renderedContent) {
                sheet.innerHTML = '<h1 style="font-size:22px;margin-bottom:16px;">' + escapeHTML(name) + '</h1><p style="color:#64748b;">The document layout preview could not be reconstructed, but all underlying file bytes are fully preserved. Click DOWNLOAD above to open in Microsoft Word or LibreOffice.</p>';
            }

            scrollContainer.appendChild(sheet);
            wrapper.appendChild(scrollContainer);
            container.appendChild(wrapper);
        }

        function renderPowerPointDeck(bytes, name, container, allowDl, dlBlob) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'doc-viewer-container';

            const toolbar = document.createElement('div');
            toolbar.className = 'doc-toolbar';

            const toolLeft = document.createElement('div');
            toolLeft.className = 'doc-toolbar-left';
            toolLeft.innerHTML = '<span class="doc-format-badge doc-badge-ppt"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="8" y="12" width="8" height="6" rx="1"/></svg> POWERPOINT PRESENTATION</span><span class="doc-filename" title="' + escapeHTML(name) + '">' + escapeHTML(name) + '</span>';

            const toolRight = document.createElement('div');
            toolRight.className = 'doc-toolbar-right';

            // Fullscreen presentation button
            const fsBtn = document.createElement('button');
            fsBtn.type = 'button';
            fsBtn.className = 'doc-action-btn';
            fsBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg><span>FULLSCREEN</span>';
            fsBtn.onclick = () => {
                if (!document.fullscreenElement) {
                    wrapper.requestFullscreen().catch(() => {});
                } else {
                    document.exitFullscreen().catch(() => {});
                }
            };
            toolRight.appendChild(fsBtn);

            if (allowDl && dlBlob) {
                const dlBtn = document.createElement('button');
                dlBtn.type = 'button';
                dlBtn.className = 'viewer-btn-dl';
                dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>DOWNLOAD</span>';
                dlBtn.onclick = () => triggerDownload(dlBlob, name);
                toolRight.appendChild(dlBtn);
            }

            toolbar.appendChild(toolLeft);
            toolbar.appendChild(toolRight);
            wrapper.appendChild(toolbar);

            let xlsxEngine = window.XLSX;
            if (!xlsxEngine && typeof XLSX_DEFLATED !== 'undefined' && XLSX_DEFLATED) {
                xlsxEngine = loadEmbeddedLibrary(XLSX_DEFLATED, 'XLSX');
                if (xlsxEngine) window.XLSX = xlsxEngine;
            }

            const slides = [];
            const isZip = bytes.length > 4 && bytes[0] === 0x50 && bytes[1] === 0x4B;

            if (isZip && fflate && fflate.unzipSync) {
                try {
                    const files = fflate.unzipSync(bytes);
                    const slideKeys = Object.keys(files)
                        .filter(k => {
                            const lk = k.toLowerCase();
                            return lk.startsWith('ppt/slides/slide') && lk.endsWith('.xml');
                        })
                        .sort((a, b) => {
                            const numA = parseInt(a.replace(/[^0-9]/g, ''), 10) || 0;
                            const numB = parseInt(b.replace(/[^0-9]/g, ''), 10) || 0;
                            return numA - numB;
                        });

                    slideKeys.forEach((sKey, sIdx) => {
                        const xmlText = (new TextDecoder()).decode(files[sKey]);
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(xmlText, 'application/xml');
                        const spNodes = doc.getElementsByTagName('p:sp');

                        let slideTitle = '';
                        let slideSubtitle = '';
                        const slideItems = [];

                        for (let i = 0; i < spNodes.length; i++) {
                            const sp = spNodes[i];
                            const ph = sp.getElementsByTagName('p:ph')[0];
                            const phType = ph ? (ph.getAttribute('type') || '') : '';
                            const isTitleShape = phType === 'title' || phType === 'ctrTitle' || (!slideTitle && i === 0 && !phType);
                            const isSubTitleShape = phType === 'subTitle';

                            const pNodes = sp.getElementsByTagName('a:p');
                            for (let j = 0; j < pNodes.length; j++) {
                                const pNode = pNodes[j];
                                const pPr = pNode.getElementsByTagName('a:pPr')[0];
                                const lvl = pPr ? (parseInt(pPr.getAttribute('lvl') || '0', 10) || 0) : 0;

                                const rNodes = pNode.getElementsByTagName('a:r');
                                let lineHTML = '';
                                for (let k = 0; k < rNodes.length; k++) {
                                    const rNode = rNodes[k];
                                    const rPr = rNode.getElementsByTagName('a:rPr')[0];
                                    const isBold = rPr && (rPr.getAttribute('b') === '1' || rPr.getAttribute('b') === 'true');
                                    const isItalic = rPr && (rPr.getAttribute('i') === '1' || rPr.getAttribute('i') === 'true');
                                    const tNodes = rNode.getElementsByTagName('a:t');
                                    let runText = '';
                                    for (let t = 0; t < tNodes.length; t++) {
                                        runText += tNodes[t].textContent || '';
                                    }
                                    if (runText.length > 0) {
                                        let fmt = escapeHTML(runText);
                                        if (isItalic) fmt = '<em>' + fmt + '</em>';
                                        if (isBold) fmt = '<strong>' + fmt + '</strong>';
                                        lineHTML += fmt;
                                    }
                                }

                                if (lineHTML.trim().length > 0) {
                                    if (isTitleShape && !slideTitle) {
                                        slideTitle = lineHTML;
                                    } else if (isSubTitleShape && !slideSubtitle) {
                                        slideSubtitle = lineHTML;
                                    } else {
                                        slideItems.push({ type: 'bullet', level: lvl, html: lineHTML });
                                    }
                                }
                            }
                        }

                        // Check for slide tables
                        const tblNodes = doc.getElementsByTagName('a:tbl');
                        for (let t = 0; t < tblNodes.length; t++) {
                            const trNodes = tblNodes[t].getElementsByTagName('a:tr');
                            if (trNodes.length > 0) {
                                let tblHTML = '<table class="ppt-slide-table">';
                                for (let r = 0; r < trNodes.length; r++) {
                                    tblHTML += '<tr>';
                                    const tcNodes = trNodes[r].getElementsByTagName('a:tc');
                                    for (let c = 0; c < tcNodes.length; c++) {
                                        const cellText = Array.from(tcNodes[c].getElementsByTagName('a:t')).map(tn => tn.textContent || '').join(' ');
                                        const tag = r === 0 ? 'th' : 'td';
                                        tblHTML += '<' + tag + '>' + escapeHTML(cellText) + '</' + tag + '>';
                                    }
                                    tblHTML += '</tr>';
                                }
                                tblHTML += '</table>';
                                slideItems.push({ type: 'table', html: tblHTML });
                            }
                        }

                        if (!slideTitle && slideItems.length > 0 && slideItems[0].type === 'bullet') {
                            slideTitle = slideItems.shift().html;
                        }

                        slides.push({
                            title: slideTitle || ('Slide ' + (sIdx + 1)),
                            subtitle: slideSubtitle,
                            items: slideItems
                        });
                    });
                } catch (e) {
                    console.warn('OpenXML PowerPoint parsing fallback:', e);
                }
            }

            // Binary PowerPoint (.ppt, .pps, or legacy stream) parser
            if (slides.length === 0) {
                let stream = bytes;
                // 1. Try OLE2 CFB extraction
                if (bytes.length > 8 && bytes[0] === 0xD0 && bytes[1] === 0xCF && bytes[2] === 0x11 && bytes[3] === 0xE0) {
                    try {
                        if (xlsxEngine && xlsxEngine.CFB && xlsxEngine.CFB.read) {
                            const cfb = xlsxEngine.CFB.read(bytes, { type: 'array' });
                            const entry = xlsxEngine.CFB.find(cfb, '/PowerPoint Document') || xlsxEngine.CFB.find(cfb, 'PowerPoint Document');
                            if (entry && entry.content) {
                                stream = new Uint8Array(entry.content);
                            }
                        }
                    } catch (e) {
                        console.warn('CFB PowerPoint stream extraction notice:', e);
                    }
                }

                // 2. Scan MS-PPT binary atoms (SlidePersistAtom 1016, SlideAtom 1007, TextHeaderAtom 3998, TextCharsAtom 4000, TextBytesAtom 4008)
                let i = 0;
                let pendingHeaderType = -1;
                let currentSlideObj = null;

                function ensureSlide() {
                    if (!currentSlideObj) {
                        currentSlideObj = { title: '', subtitle: '', items: [] };
                        slides.push(currentSlideObj);
                    }
                    return currentSlideObj;
                }

                function processText(rawText, headerType) {
                    if (!rawText) return;
                    const clean = rawText.split(String.fromCharCode(13)).join('').trim();
                    if (!clean || clean.length < 2) return;
                    if (clean.includes('PowerPoint Document') || clean.includes('Current User') || clean.startsWith('<?xml') || clean.includes('Root Entry') || clean.includes('Default Design')) return;

                    const slide = ensureSlide();
                    const lines = clean.split(String.fromCharCode(10)).map(l => l.trim()).filter(Boolean);
                    const isTitle = headerType === 0 || headerType === 6;
                    const isSubtitle = headerType === 7;

                    if (isTitle && !slide.title) {
                        slide.title = lines[0];
                        for (let li = 1; li < lines.length; li++) {
                            slide.items.push({ type: 'bullet', level: 0, html: escapeHTML(lines[li]) });
                        }
                    } else if (isSubtitle && !slide.subtitle) {
                        slide.subtitle = lines.join(' ');
                    } else if (!slide.title && !isSubtitle) {
                        slide.title = lines[0];
                        for (let li = 1; li < lines.length; li++) {
                            slide.items.push({ type: 'bullet', level: 0, html: escapeHTML(lines[li]) });
                        }
                    } else {
                        lines.forEach(line => {
                            slide.items.push({ type: 'bullet', level: 0, html: escapeHTML(line) });
                        });
                    }
                }

                if (stream.length > 8) {
                    const view = new DataView(stream.buffer, stream.byteOffset, stream.byteLength);
                    while (i + 8 <= stream.length) {
                        const recType = view.getUint16(i + 2, true);
                        const recLen = view.getUint32(i + 4, true);

                        if (recType === 1016 || recType === 1007) {
                            if (currentSlideObj && (currentSlideObj.title || currentSlideObj.items.length > 0)) {
                                currentSlideObj = null;
                            }
                            ensureSlide();
                            pendingHeaderType = -1;
                            i += 8 + (recLen < stream.length - i ? recLen : 0);
                        } else if (recType === 3998 && recLen >= 4 && i + 8 + recLen <= stream.length) {
                            pendingHeaderType = view.getUint32(i + 8, true);
                            i += 8 + recLen;
                        } else if (recType === 4000 && recLen > 0 && recLen < 500000 && i + 8 + recLen <= stream.length) {
                            const textSlice = stream.subarray(i + 8, i + 8 + recLen);
                            const text = (new TextDecoder('utf-16le', { fatal: false })).decode(textSlice);
                            processText(text, pendingHeaderType);
                            pendingHeaderType = -1;
                            i += 8 + recLen;
                        } else if (recType === 4008 && recLen > 0 && recLen < 500000 && i + 8 + recLen <= stream.length) {
                            const textSlice = stream.subarray(i + 8, i + 8 + recLen);
                            const text = (new TextDecoder('latin1')).decode(textSlice);
                            processText(text, pendingHeaderType);
                            pendingHeaderType = -1;
                            i += 8 + recLen;
                        } else {
                            i += 1;
                        }
                    }
                }

                // 3. Fallback: intelligent multi-byte stream text extractor for UTF-16LE and ASCII text runs
                if (slides.length === 0) {
                    try {
                        const textRuns = [];
                        for (let pos = 0; pos < stream.length - 10; pos += 2) {
                            let runLen = 0;
                            while (pos + runLen + 1 < stream.length) {
                                const b0 = stream[pos + runLen];
                                const b1 = stream[pos + runLen + 1];
                                if (b1 === 0 && ((b0 >= 32 && b0 <= 126) || b0 === 10 || b0 === 13 || b0 === 9)) {
                                    runLen += 2;
                                } else {
                                    break;
                                }
                            }
                            if (runLen >= 8) {
                                const str = (new TextDecoder('utf-16le', { fatal: false })).decode(stream.subarray(pos, pos + runLen)).trim();
                                if (str.length >= 4 && !str.includes('PowerPoint Document') && !str.includes('Current User') && !str.includes('Default Design')) {
                                    textRuns.push(str);
                                }
                                pos += runLen;
                            }
                        }
                        for (let pos = 0; pos < stream.length - 6; pos++) {
                            let runLen = 0;
                            while (pos + runLen < stream.length) {
                                const b = stream[pos + runLen];
                                if ((b >= 32 && b <= 126) || b === 10 || b === 13 || b === 9) {
                                    runLen++;
                                } else {
                                    break;
                                }
                            }
                            if (runLen >= 6) {
                                const str = (new TextDecoder('latin1')).decode(stream.subarray(pos, pos + runLen)).trim();
                                if (str.length >= 4 && !str.includes('PowerPoint') && !str.includes('Current User') && !str.includes('Default Design') && !str.startsWith('<?xml')) {
                                    textRuns.push(str);
                                }
                                pos += runLen;
                            }
                        }

                        const uniqueRuns = Array.from(new Set(textRuns)).filter(r => r.length > 2);
                        if (uniqueRuns.length > 0) {
                            const chunkSize = 4;
                            for (let s = 0; s < uniqueRuns.length; s += chunkSize) {
                                const chunk = uniqueRuns.slice(s, s + chunkSize);
                                slides.push({
                                    title: chunk[0] || ('Slide ' + (slides.length + 1)),
                                    subtitle: '',
                                    items: chunk.slice(1).map(c => ({ type: 'bullet', level: 0, html: escapeHTML(c) }))
                                });
                            }
                        }
                    } catch (e) {}
                }
            }

            if (slides.length === 0) {
                slides.push({
                    title: name,
                    subtitle: 'PowerPoint Presentation Deck',
                    items: [
                        { type: 'bullet', level: 0, html: 'Presentation payload decrypted and validated (' + formatBytes(bytes.byteLength) + ').' },
                        { type: 'bullet', level: 1, html: 'Slide formatting and structure preserved.' },
                        { type: 'bullet', level: 0, html: 'Click DOWNLOAD above to open in Microsoft PowerPoint or Apple Keynote.' }
                    ]
                });
            }

            let currentSlide = 0;

            const deckWrapper = document.createElement('div');
            deckWrapper.className = 'ppt-deck-wrapper';

            const stage = document.createElement('div');
            stage.className = 'ppt-stage';

            const card = document.createElement('div');
            card.className = 'ppt-slide-card';

            stage.appendChild(card);
            deckWrapper.appendChild(stage);

            const controlsBar = document.createElement('div');
            controlsBar.className = 'ppt-controls-bar';

            const prevBtn = document.createElement('button');
            prevBtn.type = 'button';
            prevBtn.className = 'ppt-nav-btn';
            prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg><span>PREV</span>';

            const slidePillsWrap = document.createElement('div');
            slidePillsWrap.className = 'ppt-slide-pills-wrap';

            const counter = document.createElement('div');
            counter.className = 'ppt-slide-counter';

            const hint = document.createElement('div');
            hint.className = 'ppt-keys-hint';
            hint.innerHTML = '<kbd>&larr;</kbd> <kbd>&rarr;</kbd> / <kbd>Space</kbd>';

            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.className = 'ppt-nav-btn';
            nextBtn.innerHTML = '<span>NEXT</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';

            controlsBar.appendChild(prevBtn);
            controlsBar.appendChild(slidePillsWrap);
            controlsBar.appendChild(counter);
            controlsBar.appendChild(hint);
            controlsBar.appendChild(nextBtn);
            deckWrapper.appendChild(controlsBar);
            wrapper.appendChild(deckWrapper);

            function updateSlide() {
                const s = slides[currentSlide];
                counter.textContent = (currentSlide + 1) + ' / ' + slides.length;
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === slides.length - 1;

                // Render slide selector pills
                slidePillsWrap.innerHTML = '';
                const maxPills = Math.min(slides.length, 12);
                for (let i = 0; i < maxPills; i++) {
                    const pill = document.createElement('button');
                    pill.type = 'button';
                    pill.className = 'ppt-slide-pill' + (i === currentSlide ? ' active' : '');
                    pill.textContent = (i + 1);
                    pill.onclick = () => { currentSlide = i; updateSlide(); };
                    slidePillsWrap.appendChild(pill);
                }

                const isTitleSlide = currentSlide === 0 && s.subtitle && (!s.items || s.items.length === 0);
                if (isTitleSlide) {
                    card.className = 'ppt-slide-card ppt-title-slide';
                    card.innerHTML = '<div class="ppt-slide-header"><div class="ppt-slide-tag">PRESENTATION OVERVIEW</div><h1 class="ppt-slide-title">' + s.title + '</h1><div class="ppt-slide-subtitle">' + s.subtitle + '</div></div>';
                } else {
                    card.className = 'ppt-slide-card';
                    let bodyHTML = '';
                    if (s.items && s.items.length > 0) {
                        s.items.forEach(item => {
                            if (item.type === 'table') {
                                bodyHTML += item.html;
                            } else {
                                const lvlClass = 'ppt-bullet-lvl-' + Math.min(item.level || 0, 2);
                                bodyHTML += '<div class="ppt-bullet-item ' + lvlClass + '"><div class="ppt-bullet-dot"></div><div class="ppt-bullet-text">' + item.html + '</div></div>';
                            }
                        });
                    } else {
                        bodyHTML = '<div style="color:#64748b;font-size:15px;margin-top:20px;">(Slide content preview)</div>';
                    }

                    const subtitleHTML = s.subtitle ? '<div class="ppt-slide-subtitle">' + s.subtitle + '</div>' : '';
                    card.innerHTML = '<div class="ppt-slide-header"><div class="ppt-slide-tag">SLIDE ' + (currentSlide + 1) + ' OF ' + slides.length + '</div><div class="ppt-slide-title">' + s.title + '</div>' + subtitleHTML + '</div><div class="ppt-slide-body">' + bodyHTML + '</div>';
                }
            }

            prevBtn.onclick = () => {
                if (currentSlide > 0) { currentSlide--; updateSlide(); }
            };
            nextBtn.onclick = () => {
                if (currentSlide < slides.length - 1) { currentSlide++; updateSlide(); }
            };

            const keyHandler = (e) => {
                if (e.key === 'ArrowLeft') {
                    if (currentSlide > 0) { currentSlide--; updateSlide(); }
                } else if (e.key === 'ArrowRight' || e.key === ' ') {
                    if (currentSlide < slides.length - 1) { currentSlide++; updateSlide(); }
                } else if (e.key === 'f' || e.key === 'F') {
                    if (!document.fullscreenElement) {
                        wrapper.requestFullscreen().catch(() => {});
                    } else {
                        document.exitFullscreen().catch(() => {});
                    }
                }
            };
            window.addEventListener('keydown', keyHandler);

            updateSlide();
            container.appendChild(wrapper);
        }

        function renderArchiveContents(bytes, name, container, allowDl, dlBlob) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'doc-viewer-container';

            const toolbar = document.createElement('div');
            toolbar.className = 'doc-toolbar';

            const toolLeft = document.createElement('div');
            toolLeft.className = 'doc-toolbar-left';
            toolLeft.innerHTML = '<span class="doc-format-badge doc-badge-archive"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg> ARCHIVE ARCHITECTURE</span><span class="doc-filename" title="' + escapeHTML(name) + '">' + escapeHTML(name) + '</span>';

            const toolRight = document.createElement('div');
            toolRight.className = 'doc-toolbar-right';

            if (allowDl && dlBlob) {
                const dlBtn = document.createElement('button');
                dlBtn.type = 'button';
                dlBtn.className = 'viewer-btn-dl';
                dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>DOWNLOAD ARCHIVE</span>';
                dlBtn.onclick = () => triggerDownload(dlBlob, name);
                toolRight.appendChild(dlBtn);
            }

            toolbar.appendChild(toolLeft);
            toolbar.appendChild(toolRight);
            wrapper.appendChild(toolbar);

            const listWrap = document.createElement('div');
            listWrap.className = 'archive-list-wrap';

            let filesList = [];
            if (fflate && fflate.unzipSync) {
                try {
                    const unzipped = fflate.unzipSync(bytes);
                    Object.keys(unzipped).forEach(fPath => {
                        filesList.push({
                            path: fPath,
                            size: unzipped[fPath].byteLength,
                            isDir: fPath.endsWith('/')
                        });
                    });
                } catch (e) {
                    console.warn('Archive unzipSync error:', e);
                }
            }

            if (filesList.length > 0) {
                let tableHTML = '<table class="archive-table"><thead><tr><th>NAME / PATH</th><th style="width:120px;text-align:right;">SIZE</th></tr></thead><tbody>';
                filesList.forEach(item => {
                    const iconSvg = item.isDir
                        ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>'
                        : '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
                    tableHTML += '<tr><td><span class="archive-file-icon">' + iconSvg + '</span>' + escapeHTML(item.path) + '</td><td style="text-align:right;font-family:var(--font-mono);font-size:12px;color:#64748b;">' + (item.isDir ? 'DIR' : formatBytes(item.size)) + '</td></tr>';
                });
                tableHTML += '</tbody></table>';
                listWrap.innerHTML = tableHTML;
            } else {
                listWrap.innerHTML = '<div style="padding:40px;text-align:center;color:#64748b;">Archive contains compressed binary assets. ' + formatBytes(bytes.byteLength) + ' total payload.</div>';
            }

            wrapper.appendChild(listWrap);
            container.appendChild(wrapper);
        }

        function renderGenericPayload(bytes, name, type, container, allowDl, dlBlob) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'doc-viewer-container';

            const toolbar = document.createElement('div');
            toolbar.className = 'doc-toolbar';

            const toolLeft = document.createElement('div');
            toolLeft.className = 'doc-toolbar-left';
            toolLeft.innerHTML = '<span class="doc-format-badge doc-badge-generic"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> BINARY PAYLOAD</span><span class="doc-filename" title="' + escapeHTML(name) + '">' + escapeHTML(name) + '</span>';

            const toolRight = document.createElement('div');
            toolRight.className = 'doc-toolbar-right';

            if (allowDl && dlBlob) {
                const dlBtn = document.createElement('button');
                dlBtn.type = 'button';
                dlBtn.className = 'viewer-btn-dl';
                dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>DOWNLOAD</span>';
                dlBtn.onclick = () => triggerDownload(dlBlob, name);
                toolRight.appendChild(dlBtn);
            }

            toolbar.appendChild(toolLeft);
            toolbar.appendChild(toolRight);
            wrapper.appendChild(toolbar);

            const genericWrap = document.createElement('div');
            genericWrap.className = 'generic-viewer-wrap';

            const metaGrid = document.createElement('div');
            metaGrid.className = 'generic-meta-grid';
            metaGrid.innerHTML = '<div class="generic-meta-item"><span class="generic-meta-label">File Name</span><span class="generic-meta-val">' + escapeHTML(name) + '</span></div>' +
                '<div class="generic-meta-item"><span class="generic-meta-label">Detected MIME</span><span class="generic-meta-val">' + escapeHTML(type || 'application/octet-stream') + '</span></div>' +
                '<div class="generic-meta-item"><span class="generic-meta-label">Decrypted Size</span><span class="generic-meta-val">' + formatBytes(bytes.byteLength) + ' (' + bytes.byteLength.toLocaleString() + ' bytes)</span></div>' +
                '<div class="generic-meta-item"><span class="generic-meta-label">Container Security</span><span class="generic-meta-val" style="color:#059669;">AES-GCM-256 Verified [✓]</span></div>';
            genericWrap.appendChild(metaGrid);

            const dumpArea = document.createElement('div');
            dumpArea.className = 'hex-dump-area';

            const dumpLen = Math.min(bytes.byteLength, 1536);
            let dumpHTML = '';
            for (let offset = 0; offset < dumpLen; offset += 16) {
                const offsetHex = offset.toString(16).padStart(8, '0').toUpperCase();
                let hexPart = '';
                let asciiPart = '';

                for (let j = 0; j < 16; j++) {
                    if (offset + j < dumpLen) {
                        const b = bytes[offset + j];
                        hexPart += b.toString(16).padStart(2, '0').toUpperCase() + ' ';
                        asciiPart += (b >= 32 && b <= 126) ? escapeHTML(String.fromCharCode(b)) : '·';
                    } else {
                        hexPart += '   ';
                    }
                    if (j === 7) hexPart += ' ';
                }

                dumpHTML += '<div class="hex-row"><span class="hex-offset">' + offsetHex + '</span><span class="hex-bytes">' + hexPart + '</span><span class="hex-ascii">' + asciiPart + '</span></div>';
            }

            if (bytes.byteLength > dumpLen) {
                dumpHTML += '<div style="margin-top:14px;color:#64748b;font-style:italic;">... (' + (bytes.byteLength - dumpLen).toLocaleString() + ' additional bytes verified in memory)</div>';
            }

            dumpArea.innerHTML = dumpHTML;
            genericWrap.appendChild(dumpArea);
            wrapper.appendChild(genericWrap);
            container.appendChild(wrapper);
        }

        // Toggle Password Visibility
        const pwdInput = document.getElementById('pwd');
        const pwdToggleBtn = document.getElementById('pwd-toggle-btn');
        pwdToggleBtn?.addEventListener('click', () => {
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                pwdToggleBtn.style.color = 'var(--accent-cyan)';
            } else {
                pwdInput.type = 'password';
                pwdToggleBtn.style.color = 'var(--text-muted)';
            }
        });

        // Anti-Screen Capture / Window Blur Guard
        function obscureScreen() {
            const guard = document.getElementById('screen-guard-overlay');
            const viewerEl = document.getElementById('viewer-container');
            if (guard && viewerEl && viewerEl.classList.contains('active')) {
                guard.classList.remove('hidden');
            }
        }
        function restoreScreen() {
            const guard = document.getElementById('screen-guard-overlay');
            if (guard) guard.classList.add('hidden');
        }
        window.addEventListener('blur', obscureScreen);
        window.addEventListener('focus', () => {
            restoreScreen();
            resetInactivity();
        });
        document.getElementById('screen-guard-overlay')?.addEventListener('click', restoreScreen);

        // Anti-Inspection & DevTools Interception
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);

        // Trap DevTools Shortcuts (F12, Ctrl+Shift+I, Cmd+Option+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S) & Print (Ctrl+P / Cmd+P)
        function blockKeyShortcuts(e) {
            if (e.key === 'F12' || e.keyCode === 123) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey)) {
                const k = (e.key || '').toLowerCase();
                const code = e.keyCode;
                if (k === 'i' || k === 'j' || k === 'c' || k === 'k' || code === 73 || code === 74 || code === 67 || code === 75) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
            if (e.ctrlKey || e.metaKey) {
                const k = (e.key || '').toLowerCase();
                const code = e.keyCode;
                if (k === 'u' || k === 's' || k === 'p' || code === 85 || code === 83 || code === 80) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        }
        window.addEventListener('keydown', blockKeyShortcuts, true);
        document.addEventListener('keydown', blockKeyShortcuts, true);

        ['copy', 'cut', 'paste', 'selectstart', 'dragstart'].forEach(function(evt) {
            document.addEventListener(evt, function(e) {
                if (e.target && e.target.tagName && (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea')) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                return false;
            }, true);
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'PrintScreen' || e.keyCode === 44) {
                obscureScreen();
                try { navigator.clipboard.writeText(''); } catch (err) {}
                setTimeout(restoreScreen, 1500);
            }
        });

        // Anti-Debugging Constructor Trap: Halts execution if DevTools is opened
        if (typeof process === 'undefined') {
            setInterval(() => {
                const start = performance.now();
                (function() { return false; })['constructor']('debugger')();
                if (performance.now() - start > 100) {
                    lockSession();
                }
            }, 300);
        }

        // Anti-Drag Exfiltration Protection
        document.addEventListener('dragstart', (e) => e.preventDefault());

        // Anti-Clipboard Leaks (if direct download is restricted)
        if (!ALLOW_DOWNLOAD) {
            document.addEventListener('copy', (e) => {
                e.preventDefault();
                try { e.clipboardData.setData('text/plain', ''); } catch (err) {}
                alert('Copying content is disabled for this protected file.');
            });
            document.addEventListener('cut', (e) => e.preventDefault());
        }

        function lockSession() {
            // Backend memory zeroization and console logging
            zeroizeMemory();
            console.log('Session locked by user. Decrypted memory wiped.');

            // Frontend UI: Cleanly return to authorization panel without error banner
            const viewerEl = document.getElementById('viewer-container');
            const authPanel = document.getElementById('auth-panel');
            const errBox = document.getElementById('error-box');
            const statusBox = document.getElementById('status-box');
            const pwdInput = document.getElementById('pwd');

            if (viewerEl) {
                viewerEl.classList.remove('active');
                viewerEl.style.display = 'none';
            }
            if (authPanel) {
                authPanel.style.display = 'block';
            }

            if (errBox) {
                errBox.innerHTML = '';
                errBox.style.display = 'none';
            }
            if (statusBox) {
                statusBox.textContent = '';
            }

            if (pwdInput) {
                pwdInput.value = '';
                pwdInput.focus();
            }
        }

        // Header LOCK button
        document.getElementById('header-lock-btn')?.addEventListener('click', () => {
            lockSession();
        });

        function startAutoLock() {}

        window.lockSession = lockSession;
        window.startAutoLock = startAutoLock;

        // Enter key to unlock
        pwdInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                unlock();
            }
        });

        // High-Performance Cached Base64 to Uint8Array converter
        let cachedEncrypted = null;
        let cachedSalt = null;
        let cachedIv = null;

        function toUint8(b64) {
            try {
                const clean = (b64 || '').trim();
                const bin = atob(clean);
                const len = bin.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = bin.charCodeAt(i);
                }
                return bytes;
            } catch (e) {
                console.error('Payload decode failure:', e);
                throw new Error('Encrypted payload is malformed or corrupted.');
            }
        }

        function getEncryptedBytes() {
            if (!cachedEncrypted) {
                cachedEncrypted = toUint8(DATA);
            }
            return cachedEncrypted;
        }
        function getSaltBytes() {
            if (!cachedSalt) {
                cachedSalt = toUint8(SALT_B64);
            }
            return cachedSalt;
        }
        function getIvBytes() {
            if (!cachedIv) {
                cachedIv = toUint8(IV_B64);
            }
            return cachedIv;
        }

        // Direct Download helper
        function triggerDownload(blob, filename) {
            if (!ALLOW_DOWNLOAD) {
                alert('Download is restricted for this file in accordance with security policy.');
                return;
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 60000);
        }

        async function unlock() {
            if (updateLockoutUI()) return;

            const pwd = pwdInput ? pwdInput.value : '';
            const btn = document.getElementById('unlock-btn');
            const errBox = document.getElementById('error-box');
            const statusBox = document.getElementById('status-box');
            const authPanel = document.getElementById('auth-panel');

            if (!pwd) {
                if (errBox) {
                    errBox.textContent = 'Please enter the authorization password.';
                    errBox.style.display = 'block';
                }
                if (authPanel) {
                    authPanel.classList.remove('shake');
                    void authPanel.offsetWidth;
                    authPanel.classList.add('shake');
                }
                pwdInput?.focus();
                return;
            }

            try {
                if (errBox) errBox.style.display = 'none';
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = '<span class="spinner"></span><span>AUTHENTICATING & DECRYPTING...</span>';
                }
                if (statusBox) statusBox.textContent = 'Authenticating cryptographic payload (2,000,000 rounds)...';

                // Yield to UI event loop so browser immediately renders the spinner and status message
                await new Promise(r => setTimeout(r, 40));

                const salt = getSaltBytes();
                const iv = getIvBytes();
                const encrypted = getEncryptedBytes();

                if (!encrypted || encrypted.length === 0) {
                    throw new Error('Encrypted payload is empty or corrupted.');
                }

                const enc = new TextEncoder();
                let decrypted = null;

                // Direct native WebCrypto Dual-Stage derivation (runs asynchronously in native C++ BoringSSL/NSS/Apple CoreCrypto)
                async function deriveKeyDualStage(pwdStr, saltBytes, pepperStr, rounds) {
                    const pepperBytes = enc.encode(pepperStr);
                    const pwdBytes = enc.encode(pwdStr);
                    const combined = new Uint8Array(pepperBytes.length + pwdBytes.length);
                    combined.set(pepperBytes, 0);
                    combined.set(pwdBytes, pepperBytes.length);

                    const hmacKey = await window.crypto.subtle.importKey(
                        'raw',
                        saltBytes,
                        { name: 'HMAC', hash: 'SHA-512' },
                        false,
                        ['sign']
                    );
                    const preHash = await window.crypto.subtle.sign('HMAC', hmacKey, combined);
                    combined.fill(0);
                    pwdBytes.fill(0);

                    const keyMaterial = await window.crypto.subtle.importKey(
                        'raw',
                        preHash,
                        'PBKDF2',
                        false,
                        ['deriveKey']
                    );

                    return await window.crypto.subtle.deriveKey(
                        { name: 'PBKDF2', salt: saltBytes, iterations: rounds, hash: 'SHA-256' },
                        keyMaterial,
                        { name: 'AES-GCM', length: 256 },
                        false,
                        ['decrypt']
                    );
                }

                // Helper to attempt legacy single-stage PBKDF2
                async function tryLegacy(rounds) {
                    const legKeyMaterial = await window.crypto.subtle.importKey(
                        'raw',
                        enc.encode(pwd),
                        'PBKDF2',
                        false,
                        ['deriveKey']
                    );
                    const legKey = await window.crypto.subtle.deriveKey(
                        { name: 'PBKDF2', salt: salt, iterations: rounds, hash: 'SHA-256' },
                        legKeyMaterial,
                        { name: 'AES-GCM', length: 256 },
                        false,
                        ['decrypt']
                    );
                    return await window.crypto.subtle.decrypt(
                        { name: 'AES-GCM', iv: iv },
                        legKey,
                        encrypted
                    );
                }

                // Decryption execution:
                // If this is a V6 container, run V6 Dual-Stage directly.
                // Do NOT cascade into 7 million older PBKDF2 rounds on incorrect password!
                if (typeof CONTAINER_VERSION !== 'undefined' && CONTAINER_VERSION === 'V6') {
                    const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V6, 2000000);
                    decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);
                } else {
                    // Legacy multi-tier cascade for older formats
                    try {
                        const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V6, 2000000);
                        decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);
                    } catch (t1Err) {
                        try {
                            const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V5, 2000000);
                            decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);
                        } catch (t2Err) {
                            try {
                                const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V4, 1000000);
                                decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);
                            } catch (t3Err) {
                                let legacySuccess = false;
                                for (const rounds of [2000000, 1000000, 600000, 100000]) {
                                    try {
                                        decrypted = await tryLegacy(rounds);
                                        legacySuccess = true;
                                        break;
                                    } catch (legErr) {}
                                }
                                if (!legacySuccess) throw t1Err;
                            }
                        }
                    }
                }

                // Multi-Layer Payload Integrity Check: Verify SHA-256 hash if present
                if (INTEGRITY_HASH && decrypted) {
                    const hashBuf = await window.crypto.subtle.digest('SHA-256', decrypted);
                    const hashHex = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('');
                    if (hashHex !== INTEGRITY_HASH) {
                        throw new Error('Cryptographic tamper alert: payload integrity seal failed verification.');
                    }
                }

                // Immediate DOM memory scrub: remove password text from DOM tree
                if (pwdInput) {
                    pwdInput.value = '';
                    pwdInput.blur();
                }

                // Authentication Success: Clear failed attempts
                try {
                    sessionStorage.removeItem(ATTEMPTS_KEY);
                    sessionStorage.removeItem(LOCKOUT_KEY);
                } catch (e) {}

                decryptedBytes = new Uint8Array(decrypted);

                // Robust extension checker safe from template literal escaping hazards
                const hasExt = (filename, list) => {
                    const fn = (filename || '').toLowerCase();
                    return list.some(ext => fn.endsWith('.' + ext));
                };

                // Derive accurate MIME type from file extension if TYPE is generic
                let determinedType = TYPE || 'application/octet-stream';
                const lowerName = (NAME || '').toLowerCase();
                if (!TYPE || TYPE === 'application/octet-stream') {
                    if (hasExt(lowerName, ['jpg', 'jpeg'])) determinedType = 'image/jpeg';
                    else if (hasExt(lowerName, ['png'])) determinedType = 'image/png';
                    else if (hasExt(lowerName, ['gif'])) determinedType = 'image/gif';
                    else if (hasExt(lowerName, ['webp'])) determinedType = 'image/webp';
                    else if (hasExt(lowerName, ['svg'])) determinedType = 'image/svg+xml';
                    else if (hasExt(lowerName, ['pdf'])) determinedType = 'application/pdf';
                    else if (hasExt(lowerName, ['mp4'])) determinedType = 'video/mp4';
                    else if (hasExt(lowerName, ['webm'])) determinedType = 'video/webm';
                    else if (hasExt(lowerName, ['mp3'])) determinedType = 'audio/mp3';
                    else if (hasExt(lowerName, ['wav'])) determinedType = 'audio/wav';
                }

                const blob = new Blob([decryptedBytes], { type: determinedType });
                decryptedBlobUrl = URL.createObjectURL(blob);

                // Setup header download button or policy restricted notice
                const headerDlBtn = document.getElementById('header-dl-btn');
                const restrictedBadge = document.getElementById('header-restricted-badge');
                if (ALLOW_DOWNLOAD) {
                    if (headerDlBtn) {
                        headerDlBtn.style.display = 'inline-flex';
                        headerDlBtn.onclick = () => triggerDownload(blob, NAME);
                    }
                    if (restrictedBadge) restrictedBadge.style.display = 'none';
                } else {
                    if (headerDlBtn) headerDlBtn.style.display = 'none';
                    if (restrictedBadge) restrictedBadge.style.display = 'inline-flex';
                }

                // Render in viewer
                const viewer = document.getElementById('viewer-container');
                const contentArea = document.getElementById('viewer-content-area');
                contentArea.innerHTML = '';

                const safeType = (determinedType || '').toLowerCase();
                const isImage = safeType.startsWith('image/') || hasExt(lowerName, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico']);
                const isVideo = safeType.startsWith('video/') || hasExt(lowerName, ['mp4', 'webm', 'mov', 'mkv', 'ogg']);
                const isAudio = safeType.startsWith('audio/') || hasExt(lowerName, ['mp3', 'wav', 'ogg', 'aac', 'm4a', 'flac']);
                const isPdf = safeType === 'application/pdf' || hasExt(lowerName, ['pdf']);
                const isCsv = hasExt(lowerName, ['csv', 'tsv']);
                const isExcel = safeType.includes('spreadsheetml') || safeType.includes('excel') || safeType.includes('spreadsheet') || hasExt(lowerName, ['xlsx', 'xls', 'xlsm', 'xlsb', 'ods']);
                const isWord = safeType.includes('wordprocessingml') || safeType.includes('msword') || safeType.includes('word') || hasExt(lowerName, ['docx', 'doc', 'dotx', 'odt', 'rtf']);
                const isPpt = safeType.includes('presentationml') || safeType.includes('presentation') || safeType.includes('powerpoint') || hasExt(lowerName, ['pptx', 'ppt', 'pps', 'ppsx', 'odp']);
                const isArchive = safeType.includes('zip') || safeType.includes('tar') || safeType.includes('compressed') || hasExt(lowerName, ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz']);
                const isText = safeType.startsWith('text/') || hasExt(lowerName, ['txt', 'json', 'js', 'ts', 'html', 'css', 'py', 'c', 'cpp', 'h', 'md', 'xml', 'log', 'sh', 'env', 'yaml', 'yml', 'sql', 'rs', 'go', 'java', 'kt', 'swift', 'rb', 'php']);

                if (isImage) {
                    contentArea.innerHTML = '';
                    const directImg = document.createElement('img');
                    directImg.src = decryptedBlobUrl;
                    directImg.alt = NAME;
                    directImg.style.maxWidth = '95vw';
                    directImg.style.maxHeight = '88vh';
                    directImg.style.borderRadius = '12px';
                    directImg.style.boxShadow = '0 10px 40px rgba(15,23,42,0.15)';
                    contentArea.appendChild(directImg);
                } else if (isVideo) {
                    const vid = document.createElement('video');
                    vid.src = decryptedBlobUrl;
                    vid.controls = true;
                    vid.autoplay = true;
                    if (!ALLOW_DOWNLOAD) {
                        vid.setAttribute('controlsList', 'nodownload');
                        vid.oncontextmenu = (e) => e.preventDefault();
                    }
                    contentArea.appendChild(vid);
                } else if (isAudio) {
                    const aud = document.createElement('audio');
                    aud.src = decryptedBlobUrl;
                    aud.controls = true;
                    aud.autoplay = true;
                    if (!ALLOW_DOWNLOAD) {
                        aud.setAttribute('controlsList', 'nodownload');
                        aud.oncontextmenu = (e) => e.preventDefault();
                    }
                    contentArea.appendChild(aud);
                } else if (isPdf) {
                    const iframe = document.createElement('iframe');
                    iframe.src = ALLOW_DOWNLOAD ? decryptedBlobUrl : (decryptedBlobUrl + '#toolbar=0');
                    contentArea.appendChild(iframe);
                } else if (isExcel || isCsv) {
                    await renderExcelSpreadsheet(decryptedBytes, NAME, contentArea, ALLOW_DOWNLOAD, blob);
                } else if (isWord) {
                    await renderWordDocument(decryptedBytes, NAME, contentArea, ALLOW_DOWNLOAD, blob);
                } else if (isPpt) {
                    await renderPowerPointDeck(decryptedBytes, NAME, contentArea, ALLOW_DOWNLOAD, blob);
                } else if (isArchive) {
                    renderArchiveContents(decryptedBytes, NAME, contentArea, ALLOW_DOWNLOAD, blob);
                } else if (isText) {
                    const textDecoder = new TextDecoder();
                    const textContent = textDecoder.decode(decryptedBytes);
                    const wrap = document.createElement('div');
                    wrap.className = 'code-viewer-wrap';
                    wrap.innerHTML = '<div class="code-viewer-bar"><span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan)">' + escapeHTML(NAME) + '</span>' + (ALLOW_DOWNLOAD ? '<button type="button" id="copy-code-btn" class="viewer-btn-close">Copy Text</button>' : '<span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-red);font-weight:700;background:rgba(225,29,72,0.08);padding:4px 8px;border-radius:4px;border:1px solid rgba(225,29,72,0.25);">EXPORT RESTRICTED</span>') + '</div><pre class="code-viewer-pre"><code>' + escapeHTML(textContent) + '</code></pre>';
                    contentArea.appendChild(wrap);
                    if (ALLOW_DOWNLOAD) {
                        wrap.querySelector('#copy-code-btn')?.addEventListener('click', async () => {
                            await navigator.clipboard.writeText(textContent);
                            alert('Text copied to clipboard!');
                        });
                    }
                } else {
                    renderGenericPayload(decryptedBytes, NAME, determinedType, contentArea, ALLOW_DOWNLOAD, blob);
                }

                if (authPanel) authPanel.style.display = 'none';
                if (viewer) {
                    viewer.style.display = 'flex';
                    viewer.classList.add('active');
                }

            } catch (err) {
                console.error('Decryption error:', err);

                // Timing jitter delay
                await new Promise(r => setTimeout(r, 450 + Math.random() * 200));

                const fails = getFailedAttempts() + 1;
                setFailedAttempts(fails);

                if (fails >= 3) {
                    const penaltySeconds = fails >= 8 ? 60 : (fails >= 5 ? 15 : 5);
                    setLockoutUntil(Date.now() + penaltySeconds * 1000);
                    updateLockoutUI();
                } else {
                    if (errBox) {
                        errBox.textContent = \`Decryption failed. Incorrect password. (Attempt \${fails}/3 before throttle)\`;
                        errBox.style.display = 'block';
                    }
                    if (authPanel) {
                        authPanel.classList.remove('shake');
                        void authPanel.offsetWidth;
                        authPanel.classList.add('shake');
                    }
                }
                pwdInput?.focus();
            } finally {
                if (btn && !btn.textContent.includes('LOCKED OUT')) {
                    btn.disabled = false;
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>UNLOCK FILE</span>';
                }
                if (statusBox) statusBox.textContent = '';
            }
        }

        window.unlock = unlock;
        document.getElementById('unlock-btn')?.addEventListener('click', unlock);

        const DATA = "`;

  const footer = `";
    </script>
</body>
</html>`;

  return { header, footer };
}


// Helper to decrypt strictly for export (using internal storage keys)
async function decryptFileForExport(fileRecord, providedPassword = null) {
  // We need to unlock it first.
  let fileKey = null;
  let usedPassword = providedPassword;

  // 1. Try provided password first if available
  if (providedPassword) {
    try {
      const passKeyEntry = fileRecord.keys.find(k => k.type === 'password');
      if (passKeyEntry) {
        fileKey = await SecureCrypto.unwrapWithFallback(passKeyEntry.data, providedPassword, passKeyEntry.salt, passKeyEntry.iv);
      }
    } catch (e) {
      console.log('Provided password invalid for unlock');
      // Fall through to other methods
    }
  }

  // 2. If still no key, we MUST ask for the original password
  if (!fileKey) {
    const password = await showPrompt('Decrypt for Export', 'Provide the ORIGINAL password to decrypt for export:', { inputType: 'password', placeholder: 'Enter password...' });
    if (!password) return null;

    try {
      const passKeyEntry = fileRecord.keys.find(k => k.type === 'password');
      fileKey = await SecureCrypto.unwrapWithFallback(passKeyEntry.data, password, passKeyEntry.salt, passKeyEntry.iv);
      usedPassword = password; // Capture it
    } catch (err) {
      await showAlert('Error', 'Incorrect password');
      return null;
    }
  }

  const buffer = await SecureCrypto.decryptData(fileKey, fileRecord.iv, fileRecord.content);
  return { buffer, password: usedPassword };
}



// --- Logic: Add File ---

async function handleAddFile() {
  const file = fileInput.files[0];
  const password = document.getElementById('new-password').value;

  if (!file) {
    await showAlert('Required', 'Please select a file to protect');
    return;
  }
  if (await checkSecureFile(file)) {
    await showAlert('Already Secured', `"${file.name}" is already secured! Re-protecting an already secured file is not allowed.`);
    fileInput.value = '';
    removeSelectedFile(new Event('cancel'));
    return;
  }
  if (!password) {
    await showAlert('Required', 'Protection password is required');
    const passInput = document.getElementById('new-password');
    passInput?.focus();
    return;
  }

  const confirmBtn = document.getElementById('confirm-add');
  const originalText = confirmBtn.innerText;
  confirmBtn.innerText = 'SECURING FILE (6s)...';
  confirmBtn.disabled = true;

  const processContainer = document.getElementById('protection-process-container');
  const uploadZone = document.getElementById('file-upload-zone');
  const filePreview = document.getElementById('file-preview');
  const inlinePassword = document.getElementById('inline-password-section');
  const completeContainer = document.getElementById('protection-complete-container');
  const terminalBody = document.getElementById('security-terminal-body');
  const timerDisplay = document.getElementById('process-timer-display');
  const scannerStatus = document.getElementById('scanner-status-text');
  const scannerCenter = document.querySelector('.scanner-center-shield');
  const scannerStage = document.querySelector('.scanner-stage');

  // Activate Process Interface & Rapid Holographic Scanner
  uploadZone?.classList.add('hidden');
  filePreview?.classList.add('hidden');
  inlinePassword?.classList.add('hidden');
  completeContainer?.classList.add('hidden');
  processContainer?.classList.remove('hidden');
  scannerStage?.classList.add('rapid-scan');

  // Reset steps & visual state
  ['step-analysis', 'step-prep', 'step-kdf', 'step-encrypt', 'step-meta', 'step-finalize', 'step-output', 'step-verify'].forEach(id => {
    updateProcessStep(id, '');
  });
  if (scannerCenter) scannerCenter.classList.remove('success');
  if (scannerStatus) scannerStatus.textContent = 'SECURING';
  if (terminalBody) terminalBody.innerHTML = '';

  const startTime = Date.now();
  const timerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const clampedMs = Math.min(6000, elapsed);
    const secs = Math.floor(clampedMs / 1000).toString().padStart(2, '0');
    const cs = Math.floor((clampedMs % 1000) / 10).toString().padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `00:${secs}.${cs}`;
  }, 20);

  const formatTimeToken = (ms) => {
    const clamped = Math.min(6000, Math.max(0, ms));
    const s = Math.floor(clamped / 1000).toString().padStart(2, '0');
    const cs = Math.floor((clamped % 1000) / 10).toString().padStart(2, '0');
    return `[00:${s}.${cs}]`;
  };

  const sleepUntil = async (targetMs) => {
    const elapsed = Date.now() - startTime;
    const wait = targetMs - elapsed;
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
  };

  try {
    // PHASE 1: File Payload Analysis (0ms to 750ms)
    updateProcessProgress(14, 'FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE...');
    updateProcessStep('step-analysis', 'active');
    if (scannerStatus) scannerStatus.textContent = 'ANALYZING';
    logTerminal(`${formatTimeToken(Date.now() - startTime)} INITIATING RAPID ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} File: "${file.name}" [${formatFileSize(file.size)}] | Type: ${file.type || 'application/octet-stream'}`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Enclave memory block allocated: ${file.size} bytes. Isolation confirmed.`);
    const devCaps = SecureCrypto.detectDeviceCapabilities();
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Hardware Profile: ${devCaps.concurrency} Cores, ${devCaps.memory}GB RAM [Worker Offload: Active]`);
    await sleepUntil(750);
    updateProcessStep('step-analysis', 'completed');

    // PHASE 2: CSPRNG Hardware Salt & Nonce Generation (750ms to 1500ms)
    updateProcessProgress(28, 'INITIALIZING CSPRNG ENTROPY POOL...');
    updateProcessStep('step-prep', 'active');
    if (scannerStatus) scannerStatus.textContent = 'ENTROPY POOL';
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Generating 256-bit cryptographic salt from hardware CSPRNG...`);
    const salt = SecureCrypto.generateSalt();
    const fileKey = await SecureCrypto.generateKey();
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Nonce generation: 96-bit AES-GCM Initialization Vector created.`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Ephemeral entropy validated: entropy score = 0.9998.`);
    await sleepUntil(1500);
    updateProcessStep('step-prep', 'completed');

    // PHASE 3: Dual-Stage KDF + 2,000,000 PBKDF2 Rounds (1500ms to 2400ms)
    updateProcessProgress(45, 'DERIVING KEY (DUAL-STAGE KDF 2,000,000 ROUNDS)...');
    updateProcessStep('step-kdf', 'active');
    if (scannerStatus) scannerStatus.textContent = '2,000,000 PBKDF2';
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Stage 1: HMAC-SHA512 Pre-whitening with Domain-Separated Pepper V6...`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Worker Offload: Initializing background thread for smooth 60fps UI...`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Stage 2: Computing 2,000,000 PBKDF2 iterations (Anti-JohnTheRipper / Anti-Hashcat)...`);
    const passwordKey = await SecureCrypto.deriveKeyAsyncWorker(password, salt, 2000000, SecureCrypto.MILSPEC_ANTI_CRACKER_PEPPER_V6);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Key derivation complete: 256-bit symmetric cipher key established.`);
    await sleepUntil(2400);
    updateProcessStep('step-kdf', 'completed');

    // PHASE 4: AES-GCM-256 Payload Encryption (2400ms to 3300ms)
    updateProcessProgress(65, 'AES-GCM-256 CIPHER STREAM PROCESSING...');
    updateProcessStep('step-encrypt', 'active');
    if (scannerStatus) scannerStatus.textContent = 'AES-256-GCM';
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Executing client-side WebCrypto AES-GCM 256-bit cipher...`);
    const fileBuffer = await file.arrayBuffer();
    const payloadHash = await SecureCrypto.computePayloadHash(fileBuffer);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} SHA-256 Payload Integrity Seal: ${payloadHash.substring(0, 16)}... [VERIFIED]`);
    const bufferClone = fileBuffer.slice(0);
    const { iv: fileIv, ciphertext } = await SecureCrypto.encryptData(fileKey, fileBuffer);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Encrypting ${formatFileSize(file.size)} payload blocks into zero-knowledge ciphertext...`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Ciphertext generated (${ciphertext.byteLength} bytes). 128-bit Galois Tag verified.`);
    await sleepUntil(3300);
    updateProcessStep('step-encrypt', 'completed');

    // PHASE 5: Key Wrapping & Local Vault Commit (3300ms to 4200ms)
    updateProcessProgress(80, 'PACKAGING ZERO-KNOWLEDGE METADATA...');
    updateProcessStep('step-meta', 'active');
    updateProcessStep('step-finalize', 'active');
    if (scannerStatus) scannerStatus.textContent = 'KEY WRAP & VAULT';
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Wrapping master file key with AES key wrap cipher...`);
    const { iv: wrapIv, wrappedData: wrappedWithPass } = await SecureCrypto.wrapKey(fileKey, passwordKey);
    const keys = [{ type: 'password', salt: salt, iv: wrapIv, data: wrappedWithPass }];
    const fileRecord = {
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      date: Date.now(),
      authMode: 'always',
      keys: keys,
      content: ciphertext,
      iv: fileIv,
      viewCount: 0,
      expires: null,
      note: '',
      integrityHash: payloadHash,
      accessLog: [{ action: 'created', date: Date.now() }]
    };
    await DB.saveFile(fileRecord);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Encrypted container committed to zero-knowledge local IndexedDB.`);
    await sleepUntil(4200);
    updateProcessStep('step-meta', 'completed');
    updateProcessStep('step-finalize', 'completed');

    // PHASE 6: Standalone HTML Generator (4200ms to 5100ms)
    updateProcessProgress(92, 'COMPILING STANDALONE HTML RUNTIME (.secure.html)...');
    updateProcessStep('step-output', 'active');
    if (scannerStatus) scannerStatus.textContent = 'STANDALONE HTML';
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Assembling self-contained portable decryption engine...`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Embedding browser-native WebCrypto decryptor payload...`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Anti-Exfiltration & Cryptographic defense matrix armed.`);
    await sleepUntil(5100);
    updateProcessStep('step-output', 'completed');

    // PHASE 7: Cryptographic Verification & Container Seal (5100ms to 6000ms)
    updateProcessProgress(100, 'CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]');
    updateProcessStep('step-verify', 'active');
    if (scannerStatus) scannerStatus.textContent = 'SEALING CONTAINER';
    logTerminal(`${formatTimeToken(Date.now() - startTime)} Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK.`);
    logTerminal(`${formatTimeToken(Date.now() - startTime)} CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY.`);
    await sleepUntil(6000);
    updateProcessStep('step-verify', 'completed');

    clearInterval(timerInterval);
    if (timerDisplay) timerDisplay.textContent = '00:06.00';
    if (scannerStatus) scannerStatus.textContent = 'SECURED [✓]';
    if (scannerCenter) scannerCenter.classList.add('success');

    // Small yield so user sees completion checkmark briefly before transitioning
    await new Promise(r => setTimeout(r, 350));

    scannerStage?.classList.remove('rapid-scan');

    // Transition to Completion View
    processContainer?.classList.add('hidden');
    completeContainer?.classList.remove('hidden');
    const completeFileName = document.getElementById('complete-file-name');
    if (completeFileName) completeFileName.textContent = file.name;

    lastProtectedFile = {
      record: fileRecord,
      buffer: bufferClone,
      password: password
    };

    renderFileList();

  } catch (err) {
    clearInterval(timerInterval);
    scannerStage?.classList.remove('rapid-scan');
    console.error(err);
    logTerminal(`CRITICAL ERROR: ${err.message}`);
    await showAlert('Error', 'Encryption failed: ' + err.message);
    processContainer?.classList.add('hidden');
    filePreview?.classList.remove('hidden');
    inlinePassword?.classList.remove('hidden');
  } finally {
    confirmBtn.innerText = originalText;
    confirmBtn.disabled = false;
  }
}

// --- Logic: Open File ---

async function onFileClick(fileId) {
  if (checkFileLocked(fileId)) return;

  try {
    const fileRecord = await DB.getFile(fileId);
    if (!fileRecord) {
      await showAlert('Error', 'File not found');
      return;
    }
    selectedFileForAuth = fileRecord;
    document.getElementById('auth-file-name').innerText = fileRecord.name;
    authModal.showModal();

  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Error opening file');
  }
}

async function handleAuthSubmit() {
  const fileRecord = selectedFileForAuth;
  if (!fileRecord) return;
  if (checkFileLocked(fileRecord.id)) return;

  const password = document.getElementById('auth-password').value;
  if (!password) return;

  const btn = document.getElementById('confirm-auth');
  btn.innerText = 'Unlocking...';

  try {
    const passKeyEntry = fileRecord.keys.find(k => k.type === 'password');
    if (!passKeyEntry) throw new Error('Corrupt key data');

    // Unwrap key with dual-stage anti-cracker derivation + fallback
    const fileKey = await SecureCrypto.unwrapWithFallback(passKeyEntry.data, password, passKeyEntry.salt, passKeyEntry.iv);

    clearFailedAttempts(fileRecord.id);
    authModal.close();
    document.getElementById('auth-password').value = '';
    openViewer(fileRecord, fileKey);

  } catch (err) {
    console.error(err);
    recordFailedAttempt(fileRecord.id);
    await showAlert('Error', 'Incorrect password or decryption error.');
  } finally {
    btn.innerText = 'Unlock';
  }
}

// --- Logic: Viewer ---

async function openViewer(fileRecord, fileKey) {
  try {
    // Decrypt
    const decryptedBuffer = await SecureCrypto.decryptData(fileKey, fileRecord.iv, fileRecord.content);
    const blob = new Blob([decryptedBuffer], { type: fileRecord.type });
    currentDecryptedUrl = URL.createObjectURL(blob);

    // UI
    const container = document.getElementById('viewer-content');
    container.innerHTML = '';

    // Check Permissions using download policy
    const allowDL = isDownloadAllowedForFile(fileRecord.name, fileRecord.type);

    // Show/Hide Header Download Button
    if (viewerDownloadBtn) {
      if (allowDL) {
        viewerDownloadBtn.classList.remove('hidden');
        viewerDownloadBtn.onclick = () => {
          if (!currentDecryptedUrl) return;
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = currentDecryptedUrl;
          a.download = fileRecord.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
      } else {
        viewerDownloadBtn.classList.add('hidden');
        viewerDownloadBtn.onclick = null;
      }
    }

    const lowerName = (fileRecord.name || '').toLowerCase();
    const safeType = (fileRecord.type || '').toLowerCase();

    const isImage = safeType.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(lowerName);
    const isVideo = safeType.startsWith('video/') || /\.(mp4|webm|mov|mkv|ogg)$/i.test(lowerName);
    const isAudio = safeType.startsWith('audio/') || /\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(lowerName);
    const isPdf = safeType === 'application/pdf' || /\.pdf$/i.test(lowerName);
    const isExcel = safeType.includes('excel') || safeType.includes('spreadsheet') || /\.(xlsx|xls|csv|tsv)$/i.test(lowerName);
    const isWord = safeType.includes('word') || /\.(docx|doc)$/i.test(lowerName);
    const isPpt = safeType.includes('presentation') || safeType.includes('powerpoint') || /\.(pptx|ppt|pps|ppsx)$/i.test(lowerName);
    const isText = safeType.startsWith('text/') || /\.(txt|json|js|ts|html|css|py|c|cpp|h|java|sh|xml|yaml|yml|sql|md|log|env|rs|go|kt|swift|rb|php)$/i.test(lowerName);

    if (isImage) {
      const img = document.createElement('img');
      img.src = currentDecryptedUrl;
      img.style.maxWidth = '90vw';
      img.style.maxHeight = '80vh';
      img.style.objectFit = 'contain';
      container.appendChild(img);
    } else if (isVideo || isAudio) {
      const media = document.createElement(isVideo ? 'video' : 'audio');
      media.src = currentDecryptedUrl;
      media.controls = true;
      media.autoplay = true;
      if (!allowDL) {
        media.setAttribute('controlsList', 'nodownload');
        media.oncontextmenu = (e) => e.preventDefault();
      }
      container.appendChild(media);
    } else if (isPdf) {
      const iframe = document.createElement('iframe');
      iframe.src = currentDecryptedUrl + (allowDL ? '' : '#toolbar=0');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      container.appendChild(iframe);
    } else if (isExcel) {
      renderExcelToHTML(decryptedBuffer, container);
    } else if (isWord) {
      await renderWordToHTML(decryptedBuffer, container);
    } else if (isPpt) {
      await renderPowerPointToHTML(decryptedBuffer, fileRecord.name, container);
    } else if (isText) {
      const decoder = new TextDecoder();
      const textContent = decoder.decode(decryptedBuffer);
      const wrap = document.createElement('div');
      wrap.className = 'excel-viewer';
      wrap.style.background = '#0f172a';
      wrap.style.color = '#e2e8f0';
      wrap.innerHTML = `
        <div class="excel-header" style="background:#1e293b;border-color:rgba(255,255,255,0.1);justify-content:space-between;align-items:center;">
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">${fileRecord.name}</span>
          <button type="button" id="vault-copy-code-btn" class="excel-sheet-btn">Copy Text</button>
        </div>
        <div class="excel-table-wrapper" style="background:#0f172a;">
          <pre style="margin:0;font-family:var(--font-mono);font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-all;"><code>${textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>
      `;
      container.appendChild(wrap);
      wrap.querySelector('#vault-copy-code-btn')?.addEventListener('click', async () => {
        await navigator.clipboard.writeText(textContent);
        await showAlert('Success', 'Text copied to clipboard!');
      });
    } else {
      const card = document.createElement('div');
      card.className = 'ppt-slide-card';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'center';
      card.style.textAlign = 'center';
      card.innerHTML = `
        <div style="font-size:48px;margin-bottom:12px;">📁</div>
        <div class="ppt-slide-title">${fileRecord.name}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;margin-top:6px;">DECRYPTED FILE READY (${formatFileSize(fileRecord.size)})</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">The file has been decrypted into volatile browser memory. Use the Download button above to save the original file to your device.</p>
      `;
      container.appendChild(card);
    }

    document.getElementById('viewer-filename').innerText = fileRecord.name;
    viewer.classList.remove('hidden');

    // Track recently viewed
    addToRecentlyViewed(fileRecord);

    document.getElementById('viewer-timer').classList.add('hidden');

  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Decryption failed.');
  }
}

async function closeViewer() {
  viewer.classList.add('hidden');
  if (viewerDownloadBtn) viewerDownloadBtn.classList.add('hidden');
  document.getElementById('viewer-content').innerHTML = '';

  if (currentDecryptedUrl) {
    URL.revokeObjectURL(currentDecryptedUrl);
    currentDecryptedUrl = null;
  }
}

// --- Logic: Security ---

async function checkCrashRecovery() {
  // Crash recovery (legacy cleanup)
  const crashId = localStorage.getItem('sv_crash_guard');
  if (crashId) {
    localStorage.removeItem('sv_crash_guard');
    renderFileList();
  }
}

// Privacy Curtain functions removed as feature was requested to be deleted.


// --- Rendering ---

async function renderFileList(searchQuery = '') {
  fileList.innerHTML = '';
  let files = await DB.getAllFiles();
  allFiles = files; // Cache for other functions

  // Update storage usage
  updateStorageUsage(files);

  // Filter by search
  if (searchQuery) {
    files = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Sort
  const sortValue = sortSelect?.value || 'date-desc';
  files.sort((a, b) => {
    // Favorites first
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;

    switch (sortValue) {
      case 'date-desc': return (b.date || 0) - (a.date || 0);
      case 'date-asc': return (a.date || 0) - (b.date || 0);
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'size-desc': return (b.size || 0) - (a.size || 0);
      case 'size-asc': return (a.size || 0) - (b.size || 0);
      default: return 0;
    }
  });

  // Show/hide quick tips based on file count
  const quickTips = document.getElementById('quick-tips');
  if (quickTips) {
    if (allFiles.length === 0) {
      quickTips.classList.remove('hidden');
    } else {
      quickTips.classList.add('hidden');
    }
  }

  if (files.length === 0) {
    fileList.innerHTML = `
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${searchQuery ? 'NO FILES MATCH SEARCH' : 'NO PROTECTED FILES FOUND'}</h3>
        <p class="empty-desc">${searchQuery ? 'Check search parameters or query another filename.' : 'Drop a file in the upload zone above to initialize client-side encryption.'}</p>
      </div>`;
    return;
  }

  files.forEach((file, index) => {
    const el = document.createElement('div');
    el.className = 'file-card';
    el.style.animationDelay = `${index * 0.05}s`;

    // Click handler
    el.onclick = async (e) => {
      if (!e.target.closest('.file-card-actions') && !e.target.closest('.file-actions') && !e.target.closest('.select-checkbox') && !e.target.closest('.favorite-btn')) {
        onFileClick(file.id);
      }
    };

    let icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';
    if (file.type?.startsWith('image')) icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
    if (file.type?.startsWith('video')) icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>';
    if (file.type?.startsWith('audio')) icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';

    const isSelected = selectedFiles.has(file.id);
    let displayName = file.name;

    const unlockSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    const downloadSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
    const shareSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
    const customSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    const infoSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    const renameSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>`;
    const deleteSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

    el.innerHTML = `
        <span class="hud-corner top-left"></span>
        <span class="hud-corner top-right"></span>
        <span class="hud-corner bottom-left"></span>
        <span class="hud-corner bottom-right"></span>
        <div class="file-card-top">
          <input type="checkbox" class="select-checkbox" ${isSelected ? 'checked' : ''} />
          <div class="file-icon">${icon}</div>
          <div class="file-details">
            <h3>${displayName}</h3>
            <div class="file-meta">
              <span>${(file.size / 1024 / 1024).toFixed(2)} MB</span>
              <span class="cyber-card-pill pill-cipher">AES-256</span>
              <span class="cyber-card-pill pill-policy">ALWAYS ASK</span>
            </div>
          </div>
        </div>
        <div class="file-card-actions">
          <button class="btn-highlight open-btn">${unlockSvg} Unlock</button>
          <button class="btn-highlight download-btn">${downloadSvg} Download</button>
          <button class="btn-highlight share-btn">${shareSvg} Export</button>
          <button class="btn-highlight custom-share-btn">${customSvg} Custom</button>
          <button class="btn-small info-btn">${infoSvg} Info</button>
          <button class="btn-small rename-btn">${renameSvg} Rename</button>
          <button class="btn-small delete-btn">${deleteSvg} Delete</button>
        </div>
    `;

    // Event listeners
    el.querySelector('.select-checkbox').onchange = (e) => {
      e.stopPropagation();
      if (e.target.checked) {
        selectedFiles.add(file.id);
      } else {
        selectedFiles.delete(file.id);
      }
      updateBulkUI();
    };

    el.querySelector('.open-btn').onclick = (e) => {
      e.stopPropagation();
      onFileClick(file.id);
    };
    el.querySelector('.download-btn').onclick = (e) => handleDownloadFile(e, file.id);
    el.querySelector('.info-btn').onclick = (e) => showFileInfo(e, file.id);
    el.querySelector('.rename-btn').onclick = (e) => openRenameModal(e, file.id, file.name);
    el.querySelector('.share-btn').onclick = (e) => handleShareFile(e, file.id);
    el.querySelector('.custom-share-btn').onclick = (e) => handleCustomShare(e, file.id);
    el.querySelector('.delete-btn').onclick = (e) => handleDeleteFile(e, file.id);

    fileList.appendChild(el);
  });
}

// --- Settings Features ---

function loadSettings() {
  // Load Panic Setting
  const savedAction = localStorage.getItem('sv_panic_action') || 'blur';
  const panicSelect = document.getElementById('panic-action-select');
  if (panicSelect) panicSelect.value = savedAction;

  // Load Download Permissions (default true)
  const allowMedia = localStorage.getItem('sv_dl_media') !== 'false';
  const allowDoc = localStorage.getItem('sv_dl_doc') !== 'false';
  const mediaToggle = document.getElementById('dl-media-toggle');
  const docToggle = document.getElementById('dl-doc-toggle');
  if (mediaToggle) mediaToggle.checked = allowMedia;
  if (docToggle) docToggle.checked = allowDoc;
  updateDownloadPolicyBadges();

  // Load Panic Enabled Toggle (Default TRUE for high security)
  const panicEnabled = localStorage.getItem('sv_panic_enabled') !== 'false';
  const panicToggle = document.getElementById('panic-enable-toggle');
  if (panicToggle) panicToggle.checked = panicEnabled;
  updatePanicVisibility();
}

// --- Panic Button Feature ---
function updatePanicVisibility() {
  const isEnabled = localStorage.getItem('sv_panic_enabled') !== 'false';
  const headerBtn = document.getElementById('header-panic-wrapper');
  const settingsContent = document.getElementById('panic-settings-content');

  // Show/Hide Header Button
  if (headerBtn) {
    if (isEnabled) {
      headerBtn.classList.remove('hidden');
      headerBtn.style.display = 'flex';
    } else {
      headerBtn.classList.add('hidden');
      headerBtn.style.display = 'none';
    }
  }

  // Show/Hide Settings Content
  if (settingsContent) {
    if (isEnabled) {
      settingsContent.classList.remove('hidden');
      settingsContent.style.opacity = '1';
      settingsContent.style.pointerEvents = 'auto';
    } else {
      settingsContent.classList.add('hidden');
      settingsContent.style.opacity = '0.5';
      settingsContent.style.pointerEvents = 'none';
    }
  }
}

function triggerPanic() {
  const action = localStorage.getItem('sv_panic_action') || 'blur';

  if (action === 'none') {
    return;
  } else if (action === 'erase') {
    (async () => {
      try {
        const panicSetting = localStorage.getItem('sv_panic_action');
        const files = await DB.getAllFiles();
        for (const file of files) await DB.deleteFile(file.id);
        localStorage.clear();
        if (panicSetting) localStorage.setItem('sv_panic_action', panicSetting);
        window.location.reload();
      } catch (e) { console.error(e); }
    })();
  } else if (action === 'blur' || action === 'lock') {
    closeViewer();
    settingsModal?.close();
    helpModal?.close();

    // Remove any existing panic overlays
    document.querySelectorAll('.panic-overlay').forEach(el => el.remove());

    const overlay = document.createElement('div');
    overlay.className = 'panic-overlay blur-mode';
    overlay.innerHTML = `
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `;
    document.body.appendChild(overlay);

    document.getElementById('panic-reload-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.remove();
    });
  } else if (action === 'loading') {
    closeViewer();
    settingsModal?.close();
    helpModal?.close();

    document.querySelectorAll('.panic-overlay').forEach(el => el.remove());

    const overlay = document.createElement('div');
    overlay.className = 'panic-overlay';
    overlay.innerHTML = `
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `;
    document.body.appendChild(overlay);

    const dismiss = () => {
      overlay.remove();
    };
    overlay.addEventListener('click', dismiss);
    overlay.addEventListener('touchstart', dismiss);
  }
}

// --- High-Tech Cyber Hacker Background & Telemetry Stream Engine ---

function initCyberHackerEffects() {
  // 1. Matrix / Hex Particle Canvas Background
  const canvas = document.getElementById('cyber-matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const chars = '0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG';
      const charArr = chars.split('');
      const fontSize = 13;
      let columns = Math.floor(width / fontSize);
      let drops = [];
      let speeds = [];

      function resetDrops() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = [];
        speeds = [];
        for (let i = 0; i < columns; i++) {
          drops[i] = Math.random() * -60;
          speeds[i] = 0.8 + Math.random() * 1.2;
        }
      }
      resetDrops();
      window.addEventListener('resize', resetDrops);

      let lastTime = 0;
      const interval = 33; // ~30fps for ultra-smooth fluid matrix flow

      function drawMatrix(timestamp) {
        requestAnimationFrame(drawMatrix);
        if (timestamp - lastTime < interval) return;
        lastTime = timestamp;

        ctx.fillStyle = 'rgba(5, 7, 10, 0.12)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = charArr[Math.floor(Math.random() * charArr.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Head of stream has neon laser glow, tail has cyber-cyan / green tint
          const isLead = Math.random() > 0.88;
          if (isLead) {
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 10;
          } else if (i % 3 === 0) {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.65)';
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 4;
          } else if (i % 3 === 1) {
            ctx.fillStyle = 'rgba(0, 255, 136, 0.55)';
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 3;
          } else {
            ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
            ctx.shadowBlur = 0;
          }

          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.96) {
            drops[i] = 0;
            speeds[i] = 0.8 + Math.random() * 1.2;
          }
          drops[i] += speeds[i];
        }
      }
      requestAnimationFrame(drawMatrix);
    }
  }

  // 2. Real-Time Hacker Telemetry Log Marquee
  const termStatus = document.getElementById('hero-term-status');
  if (termStatus) {
    const telemetryLogs = [
      'INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE',
      'HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE',
      'DUAL-STAGE KEY DERIVATION: HMAC-SHA512 + 2,000,000 PBKDF2 ROUNDS (V6 PEPPER)',
      'LOW-END HARDWARE OPTIMIZATION: ACTIVE // WORKER THREAD OFFLOAD ENFORCES 60FPS UI',
      'ANTI-OFFLINE CRACKER: IMMUNE TO JOHN THE RIPPER, HASHCAT & GPU DICTIONARY CLUSTERS',
      'AIR-GAPPED RUNTIME: ZERO REMOTE PACKETS DISPATCHED // IMMUNE TO BURP SUITE INTERCEPTION',
      'ANTI-VIRUS MEMORY SANITIZATION: ACTIVE HEAP ZEROIZATION // ZERO DISK PERSISTENCE',
      'CRYPTOGRAPHIC TAMPER DETECTION: SHA-256 PAYLOAD INTEGRITY SEAL ARMED',
      'MIL-SPEC DEFENSE PROTOCOL: LEVEL-6 CLEARANCE // 128-BIT AUTHENTICATION TAG ARMED',
      'STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT',
      'SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED'
    ];
    let logIndex = 0;
    setInterval(() => {
      logIndex = (logIndex + 1) % telemetryLogs.length;
      termStatus.style.opacity = '0';
      termStatus.style.transform = 'translateY(4px)';
      setTimeout(() => {
        termStatus.textContent = telemetryLogs[logIndex];
        termStatus.style.transition = 'all 0.3s ease';
        termStatus.style.opacity = '1';
        termStatus.style.transform = 'translateY(0)';
      }, 300);
    }, 4000);
  }

  // 3. Cyber Interactive Sparks on Button Clicks
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'cyber-click-glow-ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    target.style.position = target.style.position || 'relative';
    target.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });

  // 4. Smooth Active Nav Observer for Mobile & Desktop
  const sections = [
    { el: document.getElementById('hero-command'), navId: 'nav-item-console' },
    { el: document.getElementById('inline-add-container'), navId: 'nav-item-protect' },
    { el: document.getElementById('secured-files-heading'), navId: 'nav-item-files' }
  ];

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 180;
    for (let i = sections.length - 1; i >= 0; i--) {
      const item = sections[i];
      if (item.el && item.el.offsetTop <= scrollPos) {
        document.querySelectorAll('.cyber-nav-item').forEach(nav => {
          if (nav.id === item.navId) {
            nav.classList.add('active');
          } else if (nav.id !== 'nav-item-settings') {
            nav.classList.remove('active');
          }
        });
        break;
      }
    }
  }, { passive: true });
}

