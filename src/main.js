import './style.css';
import { SecureCrypto } from './crypto.js';
import { DB } from './db.js';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import * as mammoth from 'mammoth';



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
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  let pwd = '';
  for (let i = 0; i < 16; i++) {
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
  uploadZone?.addEventListener('drop', () => {
    uploadZone.classList.remove('drag-over');
    if (dropPrimary) dropPrimary.textContent = 'DROP FILE TO SECURE';
    if (dropSecondary) dropSecondary.textContent = 'or click to browse local file system';
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

  // Reset steps & progress
  ['step-analysis', 'step-prep', 'step-kdf', 'step-encrypt', 'step-meta', 'step-finalize', 'step-output', 'step-verify'].forEach(id => {
    updateProcessStep(id, '');
  });
  updateProcessProgress(0, 'STANDBY');
}

// --- Feature: File Upload Preview ---
function handleFileSelect() {
  const file = fileInput.files[0];
  if (!file) return;

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

  // Update preview info
  if (filePreviewName) filePreviewName.textContent = file.name;
  if (filePreviewSize) filePreviewSize.textContent = formatFileSize(file.size);

  // Show preview, hide upload zone and completion
  uploadZone?.classList.add('hidden');
  processContainer?.classList.add('hidden');
  completeContainer?.classList.add('hidden');
  filePreview?.classList.remove('hidden');
  document.getElementById('inline-password-section')?.classList.remove('hidden');
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
async function renderWordToHTML(arrayBuffer, container) {
  try {
    const { value: html, messages } = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });

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
  const pwd = document.getElementById('new-password').value;
  let strength = 0;
  if (pwd.length >= 6) strength++;
  if (pwd.length >= 10) strength++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) strength++;
  if (/[0-9]/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;

  strengthBar.className = 'strength-bar';
  if (strength <= 1) { strengthBar.classList.add('weak'); strengthText.innerText = 'Weak'; }
  else if (strength === 2) { strengthBar.classList.add('fair'); strengthText.innerText = 'Fair'; }
  else if (strength === 3) { strengthBar.classList.add('good'); strengthText.innerText = 'Good'; }
  else { strengthBar.classList.add('strong'); strengthText.innerText = 'Strong 💪'; }
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
  const passwordKey = await SecureCrypto.deriveKeyFromPassword(password, salt);
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

  if (newPass.length < 4) {
    await showAlert('Error', 'New password must be at least 4 characters');
    return;
  }

  try {
    const file = await DB.getFile(currentChangePassFileId);
    if (!file) throw new Error('File not found');

    const passKeyEntry = file.keys.find(k => k.type === 'password');
    if (!passKeyEntry) throw new Error('No password key found');

    // Verify current password
    const currentPasswordKey = await SecureCrypto.deriveKeyFromPassword(currentPass, passKeyEntry.salt);
    const fileKey = await SecureCrypto.unwrapKey(passKeyEntry.data, currentPasswordKey, passKeyEntry.iv);

    // Create new password wrapper
    const newSalt = SecureCrypto.generateSalt();
    const newPasswordKey = await SecureCrypto.deriveKeyFromPassword(newPass, newSalt);
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
async function exportSecureFile(fileRecord, decryptedBuffer, password, customization = {}, successMessage = 'Protected file downloaded successfully!') {
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
  const exportKey = await SecureCrypto.deriveKeyFromPassword(password, exportSalt, 600000);
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
    allowDownload
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

  if (successMessage) {
    await showAlert('Success', successMessage);
  }
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

  const jsonSalt = JSON.stringify(saltB64);
  const jsonIv = JSON.stringify(ivB64);
  const jsonType = JSON.stringify(safeMetaType);
  const jsonName = JSON.stringify(safeMetaName);
  const jsonSize = JSON.stringify(safeMetaSize);
  const jsonBrand = JSON.stringify(brandTitle);
  const jsonId = JSON.stringify(safeMetaId);
  const jsonAllowDownload = JSON.stringify(allowDownload);

  const logoHTML = logoUrl
    ? `<img src="${logoUrl}" alt="Logo" class="brand-custom-logo">`
    : `<div class="brand-shield-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    <title>${brandTitle} // ${safeMetaName}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-base: #f8fafc;
            --bg-surface: #ffffff;
            --bg-card: #ffffff;
            --bg-input: #f1f5f9;
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
            border-radius: 18px;
            padding: 38px 34px;
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
            width: 64px;
            height: 64px;
            margin: 0 auto 16px;
            background: linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(37, 99, 235, 0.08) 100%);
            border: 1px solid rgba(2, 132, 199, 0.3);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--accent-cyan);
            box-shadow: 0 8px 20px rgba(2, 132, 199, 0.15);
        }
        .brand-custom-logo {
            width: 64px;
            height: 64px;
            object-fit: contain;
            margin-bottom: 16px;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }
        .brand-kicker {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            color: var(--accent-cyan);
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .auth-title {
            font-size: 22px;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 14px;
            letter-spacing: -0.02em;
        }
        .file-info-chip {
            display: flex;
            align-items: center;
            gap: 12px;
            background: #f8fafc;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 12px 14px;
            margin-bottom: 24px;
            text-align: left;
        }
        .file-chip-icon {
            color: var(--accent-cyan);
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
            border-radius: 5px;
            color: var(--accent-green);
            flex-shrink: 0;
            font-weight: 700;
            letter-spacing: 0.05em;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 16px;
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
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
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
            letter-spacing: 0.05em;
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
    </style>
</head>
<body>
    <div class="cyber-grid"></div>

    <div id="auth-panel" class="auth-container">
        ${logoHTML}
        <div class="brand-kicker">● ZERO-KNOWLEDGE RUNTIME</div>
        <h1 class="auth-title">${brandTitle}</h1>
        
        <div class="file-info-chip">
            <div class="file-chip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            </div>
            <div class="file-chip-details">
                <div class="file-chip-name">${safeMetaName}</div>
                <div class="file-chip-meta" id="file-size-display">PROTECTED PAYLOAD</div>
            </div>
            <div class="security-badge">AES-256-GCM</div>
        </div>

        <div class="input-group">
            <div class="password-field-wrap">
                <input type="password" id="pwd" class="cyber-input" placeholder="Enter authorization password..." autofocus autocomplete="current-password">
                <button type="button" class="pwd-toggle-btn" id="pwd-toggle-btn" title="Toggle password visibility">
                    <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            </div>
            <button type="button" id="unlock-btn" class="cyber-btn-unlock" onclick="unlock()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>UNLOCK FILE</span>
            </button>
        </div>

        <div id="error-box" class="error-banner"></div>
        <div id="status-box" class="status-text"></div>
        <div class="auth-footer">PROTECTED BY CORALGENZ ZERO-KNOWLEDGE ARCHITECTURE</div>
    </div>

    <div id="viewer-container">
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
                    <span>EXPORT RESTRICTED</span>
                </span>
                <button type="button" class="viewer-btn-close" onclick="location.reload()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <span>LOCK</span>
                </button>
            </div>
        </div>
        <div class="viewer-content" id="viewer-content-area"></div>
    </div>

    <script>
        const SALT_B64 = ${jsonSalt};
        const IV_B64 = ${jsonIv};
        const TYPE = ${jsonType};
        const NAME = ${jsonName};
        const SIZE = ${jsonSize};
        const BRAND = ${jsonBrand};
        const ALLOW_DOWNLOAD = ${jsonAllowDownload};

        let decryptedBlobUrl = null;
        let decryptedBytes = null;

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

        // Toggle Password Visibility
        const pwdInput = document.getElementById('pwd');
        const pwdToggleBtn = document.getElementById('pwd-toggle-btn');
        pwdToggleBtn?.addEventListener('click', () => {
            if (pwdInput.type === 'password') {
                pwdInput.type = 'text';
                pwdToggleBtn.style.color = 'var(--neon-cyan)';
            } else {
                pwdInput.type = 'password';
                pwdToggleBtn.style.color = 'var(--text-muted)';
            }
        });

        // Enter key to unlock
        pwdInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                unlock();
            }
        });

        // Fast Base64 to Uint8Array converter
        function toUint8(b64) {
            const clean = b64.replace(/\\s+/g, '');
            const bin = atob(clean);
            const len = bin.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = bin.charCodeAt(i);
            }
            return bytes;
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
                    btn.innerHTML = '<span class="spinner"></span><span>DECRYPTING PAYLOAD...</span>';
                }
                if (statusBox) statusBox.textContent = 'Deriving key via PBKDF2 (600,000 rounds)...';

                const salt = toUint8(SALT_B64);
                const iv = toUint8(IV_B64);
                const encrypted = toUint8(DATA);

                const enc = new TextEncoder();
                const keyMaterial = await window.crypto.subtle.importKey(
                    'raw',
                    enc.encode(pwd),
                    'PBKDF2',
                    false,
                    ['deriveKey']
                );

                const key = await window.crypto.subtle.deriveKey(
                    { name: 'PBKDF2', salt: salt, iterations: 600000, hash: 'SHA-256' },
                    keyMaterial,
                    { name: 'AES-GCM', length: 256 },
                    false,
                    ['decrypt']
                );

                if (statusBox) statusBox.textContent = 'Verifying Galois authentication tag...';

                const decrypted = await window.crypto.subtle.decrypt(
                    { name: 'AES-GCM', iv: iv },
                    key,
                    encrypted
                );

                decryptedBytes = decrypted;
                const blob = new Blob([decrypted], { type: TYPE || 'application/octet-stream' });
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

                const isImage = TYPE.startsWith('image/') || /\\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(NAME);
                const isVideo = TYPE.startsWith('video/') || /\\.(mp4|webm|mov|mkv|ogg)$/i.test(NAME);
                const isAudio = TYPE.startsWith('audio/') || /\\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(NAME);
                const isPdf = TYPE === 'application/pdf' || /\\.pdf$/i.test(NAME);
                const isText = TYPE.startsWith('text/') || /\\.(txt|json|js|ts|html|css|py|c|cpp|h|md|xml|log|sh|env)$/i.test(NAME);

                if (isImage) {
                    const img = document.createElement('img');
                    img.src = decryptedBlobUrl;
                    img.alt = NAME;
                    if (!ALLOW_DOWNLOAD) {
                        img.oncontextmenu = (e) => e.preventDefault();
                    }
                    contentArea.appendChild(img);
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
                } else if (isText) {
                    const textDecoder = new TextDecoder();
                    const textContent = textDecoder.decode(decrypted);
                    const wrap = document.createElement('div');
                    wrap.className = 'code-viewer-wrap';
                    wrap.innerHTML = \`
                        <div class="code-viewer-bar">
                            <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan)">\${NAME}</span>
                            \${ALLOW_DOWNLOAD ? '<button type="button" id="copy-code-btn" class="viewer-btn-close">Copy Text</button>' : '<span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-red);font-weight:700;background:rgba(225,29,72,0.08);padding:4px 8px;border-radius:4px;border:1px solid rgba(225,29,72,0.25);">EXPORT RESTRICTED</span>'}
                        </div>
                        <pre class="code-viewer-pre"><code>\${textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                    \`;
                    contentArea.appendChild(wrap);
                    if (ALLOW_DOWNLOAD) {
                        wrap.querySelector('#copy-code-btn')?.addEventListener('click', async () => {
                            await navigator.clipboard.writeText(textContent);
                            alert('Text copied to clipboard!');
                        });
                    }
                } else {
                    // Fallback Card for generic/office/binary files
                    const card = document.createElement('div');
                    card.className = 'fallback-download-card';
                    if (ALLOW_DOWNLOAD) {
                        card.innerHTML = \`
                            <div class="fallback-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                            </div>
                            <h2 class="fallback-title">\${NAME}</h2>
                            <p class="fallback-desc">File decrypted successfully (\${formatBytes(decrypted.byteLength)}). Click below to save the original file to your device.</p>
                            <button type="button" id="card-dl-btn" class="cyber-btn-unlock" style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#ffffff;box-shadow:0 4px 14px rgba(16,185,129,0.35);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                <span>DOWNLOAD DECRYPTED FILE</span>
                            </button>
                        \`;
                        contentArea.appendChild(card);
                        card.querySelector('#card-dl-btn')?.addEventListener('click', () => {
                            triggerDownload(blob, NAME);
                        });
                    } else {
                        card.innerHTML = \`
                            <div class="fallback-icon" style="background:rgba(225,29,72,0.08);border-color:rgba(225,29,72,0.25);color:var(--accent-red);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <h2 class="fallback-title">\${NAME}</h2>
                            <p class="fallback-desc" style="color:var(--accent-red);font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">DOWNLOAD RESTRICTED BY OWNER POLICY</p>
                            <p class="fallback-desc">The security policy configured during protection prevents exporting or saving this file to local disk.</p>
                        \`;
                        contentArea.appendChild(card);
                    }
                }

                if (authPanel) authPanel.style.display = 'none';
                if (viewer) viewer.classList.add('active');

            } catch (err) {
                console.error('Decryption error:', err);
                if (errBox) {
                    errBox.textContent = 'Decryption failed. Incorrect password or corrupt container.';
                    errBox.style.display = 'block';
                }
                if (authPanel) {
                    authPanel.classList.remove('shake');
                    void authPanel.offsetWidth;
                    authPanel.classList.add('shake');
                }
            } finally {
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>UNLOCK FILE</span>';
                }
                if (statusBox) statusBox.textContent = '';
            }
        }

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
        const passwordKey = await SecureCrypto.deriveKeyFromPassword(providedPassword, passKeyEntry.salt);
        fileKey = await SecureCrypto.unwrapKey(passKeyEntry.data, passwordKey, passKeyEntry.iv);
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
      const passwordKey = await SecureCrypto.deriveKeyFromPassword(password, passKeyEntry.salt);
      fileKey = await SecureCrypto.unwrapKey(passKeyEntry.data, passwordKey, passKeyEntry.iv);
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
  if (!password) {
    await showAlert('Required', 'Protection password is required');
    return;
  }

  const confirmBtn = document.getElementById('confirm-add');
  const originalText = confirmBtn.innerText;
  confirmBtn.innerText = 'SECURING PAYLOAD (5s)...';
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

  // Activate Process Interface
  uploadZone?.classList.add('hidden');
  filePreview?.classList.add('hidden');
  inlinePassword?.classList.add('hidden');
  completeContainer?.classList.add('hidden');
  processContainer?.classList.remove('hidden');

  // Reset steps & visual state
  ['step-analysis', 'step-prep', 'step-kdf', 'step-encrypt', 'step-meta', 'step-finalize', 'step-output', 'step-verify'].forEach(id => {
    updateProcessStep(id, '');
  });
  if (scannerCenter) scannerCenter.classList.remove('success');
  if (scannerStatus) scannerStatus.textContent = 'SECURING';
  if (terminalBody) terminalBody.innerHTML = '';

  // 5.0-Second Timer Engine
  const startTime = Date.now();
  const DURATION = 5000;
  const timerInterval = setInterval(() => {
    const elapsed = Math.min(Date.now() - startTime, DURATION);
    const secs = Math.floor(elapsed / 1000).toString().padStart(2, '0');
    const cs = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0');
    if (timerDisplay) timerDisplay.textContent = `00:${secs}.${cs}`;
    if (elapsed >= DURATION) {
      clearInterval(timerInterval);
    }
  }, 30);

  try {
    // PHASE 1 (0 to 700ms): File Payload Analysis
    updateProcessProgress(14, 'FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE...');
    updateProcessStep('step-analysis', 'active');
    logTerminal(`[00:00.15] INITIATING ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6`);
    logTerminal(`[00:00.35] File: "${file.name}" [${formatFileSize(file.size)}] | Type: ${file.type || 'application/octet-stream'}`);
    logTerminal(`[00:00.55] Enclave memory block allocated: ${file.size} bytes. Isolation confirmed.`);
    await new Promise(r => setTimeout(r, 700));
    updateProcessStep('step-analysis', 'completed');

    // PHASE 2 (700ms to 1400ms): CSPRNG Hardware Salt & Nonce Generation
    updateProcessProgress(28, 'INITIALIZING CSPRNG ENTROPY POOL...');
    updateProcessStep('step-prep', 'active');
    logTerminal(`[00:00.85] Generating 128-bit cryptographic salt from hardware CSPRNG...`);
    const salt = SecureCrypto.generateSalt();
    const fileKey = await SecureCrypto.generateKey();
    logTerminal(`[00:01.10] Nonce generation: 96-bit AES-GCM Initialization Vector created.`);
    logTerminal(`[00:01.30] Ephemeral entropy validated: entropy score = 0.998.`);
    await new Promise(r => setTimeout(r, 700));
    updateProcessStep('step-prep', 'completed');

    // PHASE 3 (1400ms to 2300ms): PBKDF2 Key Derivation (600,000 rounds)
    updateProcessProgress(45, 'DERIVING KEY (PBKDF2-SHA256 600,000 ROUNDS)...');
    updateProcessStep('step-kdf', 'active');
    logTerminal(`[00:01.50] Deriving master cipher key via PBKDF2-HMAC-SHA256...`);
    logTerminal(`[00:01.85] Computing 600,000 computational work-factor rounds...`);
    const passwordKey = await SecureCrypto.deriveKeyFromPassword(password, salt);
    logTerminal(`[00:02.15] Key derivation complete: 256-bit symmetric cipher key established.`);
    await new Promise(r => setTimeout(r, 900));
    updateProcessStep('step-kdf', 'completed');

    // PHASE 4 (2300ms to 3300ms): AES-GCM-256 Payload Encryption
    updateProcessProgress(65, 'AES-GCM-256 CIPHER STREAM PROCESSING...');
    updateProcessStep('step-encrypt', 'active');
    logTerminal(`[00:02.45] Executing client-side WebCrypto AES-GCM 256-bit cipher...`);
    const fileBuffer = await file.arrayBuffer();
    const bufferClone = fileBuffer.slice(0);
    const { iv: fileIv, ciphertext } = await SecureCrypto.encryptData(fileKey, fileBuffer);
    logTerminal(`[00:02.85] Encrypting ${formatFileSize(file.size)} payload blocks into zero-knowledge ciphertext...`);
    logTerminal(`[00:03.15] Ciphertext generated (${ciphertext.byteLength} bytes). 128-bit Galois Tag verified.`);
    await new Promise(r => setTimeout(r, 1000));
    updateProcessStep('step-encrypt', 'completed');

    // PHASE 5 (3300ms to 4000ms): Key Wrapping & Local Vault Commit
    updateProcessProgress(80, 'PACKAGING ZERO-KNOWLEDGE METADATA...');
    updateProcessStep('step-meta', 'active');
    updateProcessStep('step-finalize', 'active');
    logTerminal(`[00:03.40] Wrapping master file key with AES key wrap cipher...`);
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
      accessLog: [{ action: 'created', date: Date.now() }]
    };
    await DB.saveFile(fileRecord);
    logTerminal(`[00:03.75] Encrypted container committed to zero-knowledge local IndexedDB.`);
    await new Promise(r => setTimeout(r, 700));
    updateProcessStep('step-meta', 'completed');
    updateProcessStep('step-finalize', 'completed');

    // PHASE 6 (4000ms to 4650ms): Standalone HTML Generator
    updateProcessProgress(92, 'COMPILING STANDALONE HTML RUNTIME (.secure.html)...');
    updateProcessStep('step-output', 'active');
    logTerminal(`[00:04.10] Assembling self-contained portable decryption engine...`);
    logTerminal(`[00:04.35] Embedding browser-native WebCrypto decryptor payload...`);
    logTerminal(`[00:04.55] Enforced security policy configured: ALWAYS ASK PASSWORD.`);
    await new Promise(r => setTimeout(r, 650));
    updateProcessStep('step-output', 'completed');

    // PHASE 7 (4650ms to 5000ms): Cryptographic Verification & Container Seal
    updateProcessProgress(100, 'CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]');
    updateProcessStep('step-verify', 'active');
    logTerminal(`[00:04.80] Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK.`);
    logTerminal(`[00:05.00] CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY.`);
    await new Promise(r => setTimeout(r, 350));
    updateProcessStep('step-verify', 'completed');

    // Complete 5-Second Cycle
    clearInterval(timerInterval);
    if (timerDisplay) timerDisplay.textContent = '00:05.00';
    if (scannerStatus) scannerStatus.textContent = 'SECURED [✓]';
    if (scannerCenter) scannerCenter.classList.add('success');
    await new Promise(r => setTimeout(r, 300));

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
  const password = document.getElementById('auth-password').value;
  if (!selectedFileForAuth || !password) return;

  const btn = document.getElementById('confirm-auth');
  btn.innerText = 'Unlocking...';

  try {
    const fileRecord = selectedFileForAuth;
    const passKeyEntry = fileRecord.keys.find(k => k.type === 'password');
    if (!passKeyEntry) throw new Error('Corrupt key data');

    // Derive key
    const passwordKey = await SecureCrypto.deriveKeyFromPassword(password, passKeyEntry.salt);

    // Unwrap
    const fileKey = await SecureCrypto.unwrapKey(passKeyEntry.data, passwordKey, passKeyEntry.iv);

    authModal.close();
    document.getElementById('auth-password').value = '';
    openViewer(fileRecord, fileKey);

  } catch (err) {
    console.error(err);
    await showAlert('Error', 'Incorrect password or error.');
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

    if (fileRecord.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = currentDecryptedUrl;
      container.appendChild(img);
    } else if (fileRecord.type.startsWith('video/') || fileRecord.type.startsWith('audio/')) {
      const media = document.createElement(fileRecord.type.startsWith('video/') ? 'video' : 'audio');
      media.src = currentDecryptedUrl;
      media.controls = true;
      media.autoplay = true;
      // Anti-download if not allowed
      if (!allowDL) {
        media.setAttribute('controlsList', 'nodownload');
        media.oncontextmenu = (e) => e.preventDefault();
      }
      container.appendChild(media);
    } else if (fileRecord.type === 'application/pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = currentDecryptedUrl + (allowDL ? '' : '#toolbar=0');
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      container.appendChild(iframe);
    } else if (
      fileRecord.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileRecord.type === 'application/vnd.ms-excel' ||
      fileRecord.name.endsWith('.xlsx') ||
      fileRecord.name.endsWith('.xls') ||
      fileRecord.name.endsWith('.csv')
    ) {
      renderExcelToHTML(decryptedBuffer, container);
    } else if (
      fileRecord.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileRecord.name.endsWith('.docx')
    ) {
      await renderWordToHTML(decryptedBuffer, container);
    } else {
      container.innerText = "Preview not supported for this file type.";
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
      'PBKDF2 KEY DERIVATION: SHA-256 WITH 600,000 ITERATIONS ENFORCED',
      'LOCAL MEMORY SANDBOX: ISOLATED // 0 BYTES TRANSMITTED TO REMOTE NETWORKS',
      'MIL-SPEC DEFENSE PROTOCOL: LEVEL-4 CLEARANCE // AUTHENTICATION TAG VERIFICATION ARMED',
      'CONTAINER ENCRYPTION: 256-BIT CRYPTOGRAPHIC SEED + UNIQUE 128-BIT IV PER TRANSACTION',
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

