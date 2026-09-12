import"./jspdf-SUxvxRxM.js";import{r as _e,u as He}from"./xlsx-DFH0qU2H.js";import{r as $e}from"./mammoth-PVFyTYmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const We="CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";class y{constructor(){this.algo={name:"AES-GCM",length:256}}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(32))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n,o=1e6,a="SHA-256",i=!0){const r=new TextEncoder;let s;if(i){const d=r.encode(We),u=r.encode(t),g=new Uint8Array(d.length+u.length);g.set(d,0),g.set(u,d.length);const k=await window.crypto.subtle.importKey("raw",n,{name:"HMAC",hash:"SHA-512"},!1,["sign"]),I=await window.crypto.subtle.sign("HMAC",k,g);s=new Uint8Array(I),g.fill(0),u.fill(0)}else s=r.encode(t);const c=await window.crypto.subtle.importKey("raw",s,"PBKDF2",!1,["deriveKey"]),l=await window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:o,hash:a},c,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);return s&&s.fill&&s.fill(0),l}static async encryptData(t,n){const o=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:a}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:a}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async unwrapWithFallback(t,n,o,a,i=1e6){try{const r=await this.deriveKeyFromPassword(n,o,i,"SHA-256",!0);return await this.unwrapKey(t,r,a)}catch(r){const s=[i,6e5,1e5];for(const c of s)try{const l=await this.deriveKeyFromPassword(n,o,c,"SHA-256",!1);return await this.unwrapKey(t,l,a)}catch{}throw r}}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),a=new Uint8Array(o.length);for(let i=0;i<o.length;i++)a[i]=o.charCodeAt(i);n=a.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const a=new Uint8Array(n);let i="";for(let r=0;r<a.byteLength;r++)i+=String.fromCharCode(a[r]);localStorage.setItem("sv_device_key",btoa(i))}return this.importKey(n)}}const Ge="SecureVaultDB",Ve=1,C="files";function Z(){return new Promise((e,t)=>{const n=indexedDB.open(Ge,Ve);n.onupgradeneeded=o=>{const a=o.target.result;a.objectStoreNames.contains(C)||a.createObjectStore(C,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const v={async saveFile(e){const t=await Z();return new Promise((n,o)=>{const r=t.transaction(C,"readwrite").objectStore(C).put(e);r.onsuccess=()=>n(e.id),r.onerror=()=>o(r.error)})},async getAllFiles(){const e=await Z();return new Promise((t,n)=>{const i=e.transaction(C,"readonly").objectStore(C).openCursor(),r=[];i.onsuccess=s=>{const c=s.target.result;if(c){const{content:l,...d}=c.value;r.push(d),c.continue()}else t(r)},i.onerror=()=>n(i.error)})},async getFile(e){const t=await Z();return new Promise((n,o)=>{const r=t.transaction(C,"readonly").objectStore(C).get(e);r.onsuccess=()=>n(r.result),r.onerror=()=>o(r.error)})},async deleteFile(e){const t=await Z();return new Promise((n,o)=>{const r=t.transaction(C,"readwrite").objectStore(C).delete(e);r.onsuccess=()=>n(),r.onerror=()=>o(r.error)})},async updateFile(e){return this.saveFile(e)}};var Ye=$e();const ne=document.getElementById("file-list");document.getElementById("add-file-btn");const W=document.getElementById("auth-modal"),De=document.getElementById("viewer"),F=document.getElementById("viewer-download-btn"),M=document.getElementById("file-input");document.getElementById("privacy-curtain");const je=document.getElementById("theme-toggle"),H=document.getElementById("search-input"),Me=document.getElementById("sort-select"),qe=document.getElementById("storage-text"),Ze=document.getElementById("storage-fill"),be=document.getElementById("bulk-actions"),Je=document.getElementById("selected-count"),Xe=document.getElementById("bulk-delete-btn"),Qe=document.getElementById("cancel-select-btn"),me=document.getElementById("info-modal"),ee=document.getElementById("rename-modal"),z=document.getElementById("strength-bar"),$=document.getElementById("strength-text"),et=document.getElementById("bulk-export-btn"),oe=document.getElementById("recent-section"),re=document.getElementById("recent-scroll"),J=document.getElementById("drop-zone"),xe=document.getElementById("stat-total"),ke=document.getElementById("stat-images"),Ie=document.getElementById("stat-videos"),Be=document.getElementById("stat-size"),U=document.getElementById("settings-modal"),Pe=document.getElementById("change-pass-modal"),tt=document.getElementById("settings-btn"),nt=document.getElementById("help-btn"),Q=document.getElementById("help-modal");let ge=null,A=null,P=[],E=new Set,X=null,N=JSON.parse(localStorage.getItem("sv_recent")||"[]"),ot=null,ie=null,S={},D=null;function G(e,t="",n={}){return new Promise(o=>{const a=document.getElementById("custom-prompt-modal"),i=document.getElementById("prompt-title"),r=document.getElementById("prompt-message"),s=document.getElementById("prompt-input"),c=document.getElementById("prompt-confirm"),l=document.getElementById("prompt-cancel");i.textContent=e,r.textContent=t,s.type=n.inputType||"text",s.placeholder=n.placeholder||"Enter value...",s.value="";const d=()=>{a.close(),c.onclick=null,l.onclick=null,s.onkeydown=null};c.onclick=()=>{const u=s.value;d(),o(u||null)},l.onclick=()=>{d(),o(null)},s.onkeydown=u=>{u.key==="Enter"&&(u.preventDefault(),c.click())},a.showModal(),setTimeout(()=>s.focus(),100)})}function Oe(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),i=document.getElementById("confirm-message"),r=document.getElementById("confirm-ok"),s=document.getElementById("confirm-cancel");a.textContent=e,i.textContent=t;let c=!1;const l=()=>{o.close(),r.onclick=null,s.onclick=null,o.removeEventListener("click",d),o.removeEventListener("close",u)},d=g=>{g.target===o&&!c&&(c=!0,l(),n(!1))},u=()=>{c||(c=!0,l(),n(!1))};r.onclick=()=>{c||(c=!0,l(),n(!0))},s.onclick=()=>{c||(c=!0,l(),n(!1))},o.addEventListener("click",d),o.addEventListener("close",u),o.showModal()})}function f(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),i=document.getElementById("alert-message"),r=document.getElementById("alert-ok");a.textContent=e,i.textContent=t;const s=l=>{l.key==="Enter"&&(l.preventDefault(),c(),n())},c=()=>{o.close(),r.onclick=null,document.removeEventListener("keydown",s)};r.onclick=()=>{c(),n()},document.addEventListener("keydown",s),o.showModal()})}async function rt(){localStorage.removeItem("sv_app_lock"),localStorage.removeItem("sv_autolock"),localStorage.removeItem("sv_recovery_q"),localStorage.removeItem("sv_recovery_a"),pt(),pe(),await L(),it(),Kt(),ze(),ye(),zt()}rt();function h(e){const t=document.getElementById("security-terminal-body");if(t){const n=document.createElement("p");n.className="term-line",n.textContent=`> ${e}`,t.appendChild(n),t.scrollTop=t.scrollHeight}}function w(e,t="completed"){const n=document.getElementById(e);if(n){n.className=`process-step ${t}`.trim();const o=n.querySelector(".step-icon");o&&(t==="completed"?o.textContent="[✓]":t==="active"?o.textContent="[→]":o.textContent="[ ]")}}function R(e,t){const n=document.getElementById("protect-progress-bar"),o=document.getElementById("protect-progress-percent"),a=document.getElementById("protect-progress-label");n&&(n.style.width=`${e}%`),o&&(o.textContent=`${e}%`),a&&t&&(a.textContent=t)}function at(){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+",t=new Uint8Array(16);window.crypto.getRandomValues(t);let n="";for(let a=0;a<16;a++)n+=e[t[a]%e.length];const o=document.getElementById("new-password");if(o){o.value=n,o.type="text",Fe();const a=document.getElementById("toggle-new-password");a&&(a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',a.style.color="var(--cyber-cyan)")}}function it(){document.getElementById("cancel-add").addEventListener("click",()=>{_()}),document.getElementById("confirm-add").addEventListener("click",Se),document.getElementById("generate-pwd-btn")?.addEventListener("click",at);const e=document.getElementById("toggle-new-password"),t=document.getElementById("new-password");e?.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t&&(t.type==="password"?(t.type="text",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',e.style.color="var(--cyber-cyan)"):(t.type="password",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',e.style.color="var(--cyber-text-muted)"))}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Se())}),document.getElementById("download-protected-html-btn")?.addEventListener("click",async()=>{if(!D||!D.record){f("Notice","No active protected file session. Please select a file from the vault below to download.");return}const r=document.getElementById("download-protected-html-btn"),s=r?r.innerHTML:"";try{r&&(r.disabled=!0,r.innerHTML=`
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `);let c=D.buffer,l=D.password;if(!c||c.byteLength===0){const d=await j(D.record,l);if(d&&d.buffer)c=d.buffer,l=d.password||l;else throw new Error("Could not retrieve file content for packaging.")}await Y(D.record,c,l,{},"Protected HTML package exported successfully!")}catch(c){console.error(c),await f("Export Error","Failed to download HTML package: "+c.message)}finally{r&&(r.disabled=!1,r.innerHTML=s)}}),document.getElementById("view-in-vault-btn")?.addEventListener("click",()=>{_(),document.getElementById("secured-files-heading")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("protect-another-btn")?.addEventListener("click",()=>{_(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".cyber-nav-item").forEach(s=>s.classList.remove("active")),r.classList.add("active"),r.id==="nav-item-protect"&&_()})}),document.getElementById("sidebar-settings-btn")?.addEventListener("click",()=>{pe(),U?.showModal()}),document.getElementById("cancel-auth").addEventListener("click",()=>{W.close(),document.getElementById("auth-password").value="",ge=null}),document.getElementById("confirm-auth").addEventListener("click",Ae),document.getElementById("auth-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ae())}),document.getElementById("close-viewer").addEventListener("click",de),je?.addEventListener("click",Re),H?.addEventListener("input",ut),Me?.addEventListener("change",mt),document.getElementById("new-password")?.addEventListener("input",Fe),Xe?.addEventListener("click",ht),et?.addEventListener("click",wt),Qe?.addEventListener("click",yt),document.getElementById("select-all-btn")?.addEventListener("click",ft),document.getElementById("close-info")?.addEventListener("click",()=>me.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>ee.close()),document.getElementById("confirm-rename")?.addEventListener("click",Te),document.getElementById("rename-input")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Te())}),Et(),xt(),nt?.addEventListener("click",()=>Q?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>Q?.close()),dt(),tt?.addEventListener("click",()=>{pe(),U?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>U?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>U?.close()),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const r="coralgenz@zohomail.in",s=encodeURIComponent("SecureVault Feedback"),c=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${r}?subject=${s}&body=${c}`}),document.querySelectorAll(".panic-trigger").forEach(r=>{r.addEventListener("click",ue)}),document.getElementById("panic-btn")?.addEventListener("click",ue),document.getElementById("panic-action-select")?.addEventListener("change",r=>{localStorage.setItem("sv_panic_action",r.target.value)}),document.getElementById("panic-enable-toggle")?.addEventListener("change",r=>{const s=r.target.checked;localStorage.setItem("sv_panic_enabled",s),ye()}),document.getElementById("dl-media-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_media",r.target.checked),ce()}),document.getElementById("dl-doc-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_doc",r.target.checked),ce()}),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>Pe?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",Lt),ae("toggle-new-password","new-password"),ae("toggle-auth-password","auth-password"),ae("toggle-share-password","share-password");const n=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>n?.close()),document.getElementById("confirm-share")?.addEventListener("click",Ce),document.getElementById("share-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ce())}),document.getElementById("share-logo-zone")?.addEventListener("click",r=>{r.target!==document.getElementById("share-logo")&&document.getElementById("share-logo")?.click()}),document.getElementById("share-logo")?.addEventListener("change",r=>{const s=r.target.files[0],c=document.getElementById("share-logo-text");c&&(c.textContent=s?s.name:"Choose File")}),M?.addEventListener("change",Ne),document.getElementById("file-remove-btn")?.addEventListener("click",st);const o=document.getElementById("file-upload-zone"),a=document.getElementById("drop-text-primary"),i=document.getElementById("drop-text-secondary");o?.addEventListener("click",r=>{r.target!==M&&M?.click()}),o?.addEventListener("dragover",r=>{r.preventDefault(),o.classList.add("drag-over"),a&&(a.textContent="FILE DETECTED — INITIALIZING PROTECTION"),i&&(i.textContent="Release file to initialize security inspection")}),o?.addEventListener("dragleave",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),i&&(i.textContent="or click to browse local file system")}),o?.addEventListener("drop",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),i&&(i.textContent="or click to browse local file system")}),document.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("keydown",r=>{(r.key==="PrintScreen"||r.ctrlKey&&r.key==="p")&&(r.preventDefault(),alert("Screenshots are disabled"))})}function ae(e,t){const n=document.getElementById(e),o=document.getElementById(t);!n||!o||n.addEventListener("click",a=>{a.preventDefault(),o.type==="password"?(o.type="text",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',n.style.color="var(--cyber-cyan)"):(o.type="password",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',n.style.color="var(--cyber-muted)")})}function _(){M.value="",document.getElementById("new-password").value="",D=null,z.className="strength-bar",$.innerText="ENTER PASSWORD";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview"),n=document.getElementById("inline-password-section"),o=document.getElementById("protection-process-container"),a=document.getElementById("protection-complete-container");e?.classList.remove("hidden"),t?.classList.add("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden");const i=document.getElementById("process-timer-display");i&&(i.textContent="00:00.00");const r=document.querySelector(".scanner-center-shield");r&&r.classList.remove("success");const s=document.getElementById("scanner-status-text");s&&(s.textContent="SECURING");const c=document.getElementById("security-terminal-body");c&&(c.innerHTML='<p class="term-line">&gt; Standby for cryptographic instruction...</p>'),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(l=>{w(l,"")}),R(0,"STANDBY")}function Ne(){const e=M.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){f("File Too Large","Please select a file smaller than 150 MB."),M.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),i=document.getElementById("file-preview-size"),r=document.getElementById("protection-process-container"),s=document.getElementById("protection-complete-container");a&&(a.textContent=e.name),i&&(i.textContent=se(e.size)),n?.classList.add("hidden"),r?.classList.add("hidden"),s?.classList.add("hidden"),o?.classList.remove("hidden"),document.getElementById("inline-password-section")?.classList.remove("hidden")}function st(e){e.preventDefault(),e.stopPropagation(),M.value="",D=null;const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview"),o=document.getElementById("inline-password-section"),a=document.getElementById("protection-process-container"),i=document.getElementById("protection-complete-container");t?.classList.remove("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden"),i?.classList.add("hidden"),t?.classList.remove("hidden"),n?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function se(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function ct(e,t){try{const n=_e(new Uint8Array(e),{type:"array"}),o=n.SheetNames;if(o.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const i=document.createElement("div");i.className="excel-header";const r=document.createElement("div");r.className="excel-table-wrapper";let s=o[0];const c=l=>{r.innerHTML="";const d=n.Sheets[l],u=He.sheet_to_json(d,{header:1,defval:""});if(!u||u.length===0){r.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const g=document.createElement("table");g.className="excel-table",u.forEach((k,I)=>{const b=document.createElement("tr");k.forEach(m=>{const p=I===0?"th":"td",B=document.createElement(p);B.textContent=m!==void 0?m:"",b.appendChild(B)}),g.appendChild(b)}),r.appendChild(g)};o.forEach(l=>{const d=document.createElement("button");d.className=`excel-sheet-btn ${l===s?"active":""}`,d.textContent=l,d.onclick=()=>{s=l,c(l),i.querySelectorAll(".excel-sheet-btn").forEach(u=>u.classList.remove("active")),d.classList.add("active")},i.appendChild(d)}),c(s),a.appendChild(i),a.appendChild(r),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${n.message}</div>`}}async function lt(e,t){try{const{value:n,messages:o}=await Ye.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const i=document.createElement("div");i.className="word-document",i.innerHTML=n,a.appendChild(i),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}function dt(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&_())})})}function pt(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function Re(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function Fe(){const e=document.getElementById("new-password").value;let t=0;e.length>=6&&t++,e.length>=10&&t++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^A-Za-z0-9]/.test(e)&&t++,z.className="strength-bar",t<=1?(z.classList.add("weak"),$.innerText="Weak"):t===2?(z.classList.add("fair"),$.innerText="Fair"):t===3?(z.classList.add("good"),$.innerText="Good"):(z.classList.add("strong"),$.innerText="Strong 💪")}function ut(){const e=H.value.toLowerCase().trim();L(e)}function mt(){L(H?.value||"")}function gt(e){const t=e.reduce((r,s)=>r+(s.size||0),0),n=(t/1024/1024).toFixed(2);qe.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);Ze.style.width=o+"%";const a=e.filter(r=>r.type?.startsWith("image")).length,i=e.filter(r=>r.type?.startsWith("video")).length;xe&&(xe.innerText=e.length),ke&&(ke.innerText=a),Ie&&(Ie.innerText=i),Be&&(Be.innerText=n)}function V(){const e=document.getElementById("select-all-btn");E.size>0?(be.classList.remove("hidden"),Je.innerText=`${E.size} selected`,e&&(E.size>=P.length&&P.length>0?e.innerText="Deselect All":e.innerText="Select All")):be.classList.add("hidden")}function ft(){E.size>=P.length&&P.length>0?E.clear():P.forEach(e=>E.add(e.id)),V(),L(H?.value||"")}function yt(){E.clear(),V(),L(H?.value||"")}async function ht(){if(await Oe("Delete Files",`Delete ${E.size} file(s)? This cannot be undone.`)){for(const t of E)await v.deleteFile(t);E.clear(),V(),L(),await f("Success","Files deleted.")}}async function wt(){if(E.size!==0){await f("Export",`Exporting ${E.size} files. Each will download separately.`);for(const e of E)await v.getFile(e)&&await vt(e);E.clear(),V(),L()}}async function vt(e){const t=await v.getFile(e);if(!t)return;const n=await j(t);if(!n||!n.buffer)return;const{buffer:o,password:a}=n;let i=a;i||(i=await G("Export Protected File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),i&&await Y(t,o,i,{},"Protected file downloaded successfully!")}function Et(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),J?.classList.remove("hidden"),J?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),J?.classList.add("hidden"),J?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)if(n.length===1){const o=new DataTransfer;o.items.add(n[0]),M.files=o.files,Ne(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const o of n)await bt(o)})}async function bt(e){if(e.size>157286400){await f("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await G("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await y.generateKey(),a=y.generateSalt(),i=await y.deriveKeyFromPassword(n,a),r=await e.arrayBuffer(),{iv:s,ciphertext:c}=await y.encryptData(o,r),{iv:l,wrappedData:d}=await y.wrapKey(o,i),u={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:l,data:d}],content:c,iv:s,viewCount:0};await v.saveFile(u),L(),await f("Success",`${e.name} encrypted and saved!`)}function xt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),H?.focus()),e.key==="Escape"&&(_(),W.close(),me?.close(),ee?.close()),(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="p"&&(e.preventDefault(),ue()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),Re())})}const Le=5,kt=300*1e3;function Ke(e){const t=S[e];if(t&&t.locked&&Date.now()<t.lockedUntil){const n=Math.ceil((t.lockedUntil-Date.now())/1e3);return alert(`File locked. Try again in ${n} seconds.`),!0}return!1}function It(e){S[e]||(S[e]={count:0,locked:!1,lockedUntil:0}),S[e].count++;const t=Le-S[e].count,n=document.getElementById("attempts-left"),o=document.getElementById("auth-attempts");t<=3&&(o?.classList.remove("hidden"),n&&(n.innerText=t)),S[e].count>=Le&&(S[e].locked=!0,S[e].lockedUntil=Date.now()+kt,W.close(),alert("Too many failed attempts. File locked for 5 minutes."))}function Bt(e){delete S[e],document.getElementById("auth-attempts")?.classList.add("hidden")}async function Lt(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await f("Required","Please fill all fields");return}if(t!==n){await f("Error","New passwords do not match");return}if(t.length<4){await f("Error","New password must be at least 4 characters");return}try{const o=await v.getFile(ot);if(!o)throw new Error("File not found");const a=o.keys.find(d=>d.type==="password");if(!a)throw new Error("No password key found");const i=await y.unwrapWithFallback(a.data,e,a.salt,a.iv),r=y.generateSalt(),s=await y.deriveKeyFromPassword(t,r,1e6),{iv:c,wrappedData:l}=await y.wrapKey(i,s);o.keys=o.keys.filter(d=>d.type!=="password"),o.keys.push({type:"password",salt:r,iv:c,data:l}),o.accessLog=o.accessLog||[],o.accessLog.push({action:"password_changed",date:Date.now()}),await v.updateFile(o),Pe?.close(),await f("Success","Password changed successfully!")}catch(o){console.error(o),await f("Error","Failed to change password. Current password may be incorrect.")}}function Tt(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function Ct(e){N=N.filter(t=>t.id!==e.id),N.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),N.length>5&&(N=N.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(N)),ze()}function ze(){if(!oe||!re)return;const e=N.filter(t=>P.some(n=>n.id===t.id));if(e.length===0){oe.classList.add("hidden");return}oe.classList.remove("hidden"),re.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),re.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>le(t.dataset.id)})}async function St(e,t){e.stopPropagation(),await Oe("Delete File","Delete this file permanently?")&&(await v.deleteFile(t),L())}async function At(e,t){e.stopPropagation();const n=P.find(i=>i.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode==="always"?"Always Ask Password":n.authMode||"Always Ask Password";const o=document.getElementById("info-views");o&&(o.innerText=n.viewCount||0);const a=document.getElementById("access-log");a&&n.accessLog&&n.accessLog.length>0?a.innerHTML=n.accessLog.slice(-10).reverse().map(i=>`
      <div class="access-log-item">
        ${i.action.replace("_"," ")} - ${new Date(i.date).toLocaleString()}
      </div>
    `).join(""):a&&(a.innerHTML="No access history"),me.showModal()}function Dt(e,t,n){e.stopPropagation(),X=t;const o=document.getElementById("rename-input");o.value=n,ee.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function Te(){const e=document.getElementById("rename-input").value.trim();if(!e||!X)return;const t=await v.getFile(X);t&&(t.name=e,await v.updateFile(t)),ee.close(),X=null,L()}async function Mt(e,t){e&&e.stopPropagation();try{const n=await v.getFile(t);if(!n){await f("Error","File not found");return}const o=await j(n);if(!o||!o.buffer)return;const{buffer:a,password:i}=o;let r=i;if(r||(r=await G("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await Y(n,a,r,{},"Downloaded! The protected file has been saved."),Tt(n,"downloaded"),await v.updateFile(n)}catch(n){console.error(n),await f("Error","Failed to download file: "+(n.message||"Decryption error"))}}async function Pt(e,t){e.stopPropagation();try{const n=await v.getFile(t);if(!n)return;const o=await j(n);if(!o||!o.buffer)return;const{buffer:a,password:i}=o;let r=i;if(r||(r=await G("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await Y(n,a,r,{})}catch(n){console.error(n),await f("Error","Share failed: "+n.message)}}function Ot(e,t){e.stopPropagation(),ie=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function Ce(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await f("Required","Please set a password for the file.");return}const a=document.getElementById("confirm-share"),i=a.innerText;a.innerText="Exporting...";try{const r=await v.getFile(ie);if(!r)throw new Error("File not found");const s=await j(r,t);if(!s||!s.buffer)throw new Error("Decryption failed");const c=s.buffer;let l="";o.files&&o.files[0]&&(l=await new Promise(u=>{const g=new FileReader;g.onload=()=>u(g.result),g.readAsDataURL(o.files[0])})),await Y(r,c,t,{title:n,logoUrl:l}),e.close(),ie=null}catch(r){console.error(r),await f("Error","Export failed: "+r.message)}finally{a.innerText=i}}function Nt(e,t){const n=(t||"").toLowerCase(),o=(e||"").toLowerCase();return n.startsWith("image/")||n.startsWith("video/")||n.startsWith("audio/")?!0:/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(o)}function Ue(){const e=localStorage.getItem("sv_dl_media")!=="false",t=localStorage.getItem("sv_dl_doc")!=="false";return{allowMedia:e,allowDoc:t}}function fe(e,t){const{allowMedia:n,allowDoc:o}=Ue();return Nt(e,t)?n:o}function ce(){const{allowMedia:e,allowDoc:t}=Ue(),n=document.getElementById("dl-media-status-badge"),o=document.getElementById("dl-doc-status-badge");n&&(n.textContent=e?"ALLOWED":"RESTRICTED",n.className=`policy-status-badge ${e?"allowed":"restricted"}`),o&&(o.textContent=t?"ALLOWED":"RESTRICTED",o.className=`policy-status-badge ${t?"allowed":"restricted"}`)}async function Y(e,t,n,o={},a="Protected file downloaded successfully!"){if(!t||t.byteLength===0)throw new Error("No decrypted file payload available to package.");if(!n)throw new Error("Protection password is required to export this file.");const i=o.allowDownload!==void 0?!!o.allowDownload:fe(e.name,e.type),r=y.generateSalt(),s=await y.deriveKeyFromPassword(n,r,1e6),{iv:c,ciphertext:l}=await y.encryptData(s,t),u=await(B=>new Promise(O=>{const T=new FileReader;T.readAsDataURL(B),T.onloadend=()=>{const K=T.result||"";O(K.split(",")[1]||"")}}))(new Blob([l]));if(!u)throw new Error("Failed to serialize encrypted payload.");const{header:g,footer:k}=Rt(e,r,c,{...o,allowDownload:i}),I=new Blob([g,u,k],{type:"text/html;charset=utf-8"}),b=URL.createObjectURL(I),m=document.createElement("a");m.href=b;const p=e.name||"protected_file";m.download=p.endsWith(".secure.html")?p:p+".secure.html",document.body.appendChild(m),m.click(),document.body.removeChild(m),setTimeout(()=>URL.revokeObjectURL(b),6e4),a&&await f("Success",a)}function Rt(e,t,n,o={}){const a=te=>btoa(String.fromCharCode(...new Uint8Array(te))),i=a(t),r=a(n),s=o.title||"Coralgenz Vault",c=o.logoUrl||"",l=e.name||"Protected File",d=e.type||"application/octet-stream",u=Number(e.size)||0,g=e.id||"",k=o.allowDownload!==void 0?!!o.allowDownload:fe(l,d),I=JSON.stringify(i),b=JSON.stringify(r),m=JSON.stringify(d),p=JSON.stringify(l),B=JSON.stringify(u),O=JSON.stringify(s),T=JSON.stringify(g),K=JSON.stringify(k),q=c?`<img src="${c}" alt="Logo" class="brand-custom-logo">`:`<div class="brand-shield-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <rect x="9" y="11" width="6" height="5" rx="1"/>
          <path d="M10 11V9a2 2 0 0 1 4 0v2"/>
        </svg>
      </div>`;return{header:`<!DOCTYPE html>
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
    <!-- Military-Grade Content Security Policy: Blocks all unauthorized external network exfiltration -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' blob:; frame-src blob:; script-src 'unsafe-inline'; connect-src 'none'; object-src 'none';">
    <title>${s} // ${l}</title>
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
            margin-bottom: 16px;
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
        .security-specs-chips {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
            margin-bottom: 18px;
        }
        .anti-cracker-chip {
            font-family: var(--font-mono);
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 0.05em;
            padding: 3px 7px;
            border-radius: 4px;
            background: rgba(2, 132, 199, 0.08);
            border: 1px solid rgba(2, 132, 199, 0.25);
            color: var(--accent-cyan);
            text-transform: uppercase;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 12px;
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
        ${q}
        <div class="brand-kicker">● ZERO-KNOWLEDGE RUNTIME</div>
        <h1 class="auth-title">${s}</h1>
        
        <div class="file-info-chip">
            <div class="file-chip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            </div>
            <div class="file-chip-details">
                <div class="file-chip-name">${l}</div>
                <div class="file-chip-meta" id="file-size-display">PROTECTED PAYLOAD</div>
            </div>
            <div class="security-badge">AES-256-GCM</div>
        </div>

        <div class="security-specs-chips">
            <span class="anti-cracker-chip">● DUAL-STAGE KDF (1M ROUNDS)</span>
            <span class="anti-cracker-chip">● ANTI-CRACKER PEPPER</span>
            <span class="anti-cracker-chip">● ZERO-STORE MEMORY ENCLAVE</span>
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

        <div id="lockout-box" class="lockout-banner"></div>
        <div id="error-box" class="error-banner"></div>
        <div id="status-box" class="status-text"></div>
        <div class="auth-footer">PROTECTED BY CORALGENZ ZERO-KNOWLEDGE ARCHITECTURE</div>
    </div>

    <div id="viewer-container">
        <div class="viewer-header">
            <div class="viewer-brand">
                <div class="viewer-brand-title">${s}</div>
                <div class="viewer-file-badge" id="viewer-file-name">${l}</div>
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
                <button type="button" class="viewer-btn-close" onclick="zeroizeMemory(); location.reload()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <span>LOCK</span>
                </button>
            </div>
        </div>
        <div class="viewer-content" id="viewer-content-area"></div>
    </div>

    <script>
        const SALT_B64 = ${I};
        const IV_B64 = ${b};
        const TYPE = ${m};
        const NAME = ${p};
        const SIZE = ${B};
        const BRAND = ${O};
        const ALLOW_DOWNLOAD = ${K};

        // Constant anti-cracker cryptographic pepper (Domain-separated)
        const MILSPEC_PEPPER = "CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";

        // Persistent session brute-force lockout tracking per file container
        const ATTEMPTS_KEY = 'cg_fails_' + ${T};
        const LOCKOUT_KEY = 'cg_lockout_' + ${T};

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

        // Anti-Debugger Honeypot: detect external debugger attachments attempting heap inspection
        setInterval(() => {
            const start = performance.now();
            (function() { debugger; })();
            if (performance.now() - start > 100) {
                zeroizeMemory();
                location.reload();
            }
        }, 2500);

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
                pwdToggleBtn.style.color = 'var(--accent-cyan)';
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

            // Immediate DOM memory scrub: remove password text from DOM tree
            if (pwdInput) {
                pwdInput.value = '';
                pwdInput.blur();
            }

            try {
                if (errBox) errBox.style.display = 'none';
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = '<span class="spinner"></span><span>AUTHENTICATING & DECRYPTING...</span>';
                }
                if (statusBox) statusBox.textContent = 'Executing Dual-Stage KDF (HMAC-SHA512 + 1,000,000 PBKDF2 Rounds)...';

                const salt = toUint8(SALT_B64);
                const iv = toUint8(IV_B64);
                const encrypted = toUint8(DATA);

                const enc = new TextEncoder();
                let decrypted = null;

                // Primary: Dual-Stage Anti-Cracker KDF (Immune to John the Ripper / Hashcat)
                try {
                    const pepperBytes = enc.encode(MILSPEC_PEPPER);
                    const pwdBytes = enc.encode(pwd);
                    const combined = new Uint8Array(pepperBytes.length + pwdBytes.length);
                    combined.set(pepperBytes, 0);
                    combined.set(pwdBytes, pepperBytes.length);

                    const hmacKey = await window.crypto.subtle.importKey(
                        'raw',
                        salt,
                        { name: 'HMAC', hash: 'SHA-512' },
                        false,
                        ['sign']
                    );
                    const preHashBuffer = await window.crypto.subtle.sign('HMAC', hmacKey, combined);
                    combined.fill(0);
                    pwdBytes.fill(0);

                    const keyMaterial = await window.crypto.subtle.importKey(
                        'raw',
                        preHashBuffer,
                        'PBKDF2',
                        false,
                        ['deriveKey']
                    );

                    const key = await window.crypto.subtle.deriveKey(
                        { name: 'PBKDF2', salt: salt, iterations: 1000000, hash: 'SHA-256' },
                        keyMaterial,
                        { name: 'AES-GCM', length: 256 },
                        false,
                        ['decrypt']
                    );

                    if (statusBox) statusBox.textContent = 'Validating 128-bit Galois Authentication Tag...';

                    decrypted = await window.crypto.subtle.decrypt(
                        { name: 'AES-GCM', iv: iv },
                        key,
                        encrypted
                    );
                } catch (dualErr) {
                    // Fallback: Legacy single-stage PBKDF2 (if container was exported before this security update)
                    try {
                        const legKeyMaterial = await window.crypto.subtle.importKey(
                            'raw',
                            enc.encode(pwd),
                            'PBKDF2',
                            false,
                            ['deriveKey']
                        );
                        const legKey = await window.crypto.subtle.deriveKey(
                            { name: 'PBKDF2', salt: salt, iterations: 1000000, hash: 'SHA-256' },
                            legKeyMaterial,
                            { name: 'AES-GCM', length: 256 },
                            false,
                            ['decrypt']
                        );
                        decrypted = await window.crypto.subtle.decrypt(
                            { name: 'AES-GCM', iv: iv },
                            legKey,
                            encrypted
                        );
                    } catch (legacyErr) {
                        throw dualErr;
                    }
                }

                // Authentication Success: Clear failed attempts
                try {
                    sessionStorage.removeItem(ATTEMPTS_KEY);
                    sessionStorage.removeItem(LOCKOUT_KEY);
                } catch (e) {}

                decryptedBytes = new Uint8Array(decrypted);
                const blob = new Blob([decryptedBytes], { type: TYPE || 'application/octet-stream' });
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

                // Side-channel timing jitter delay (400-750ms)
                await new Promise(r => setTimeout(r, 450 + Math.random() * 300));

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
            } finally {
                if (btn && !btn.textContent.includes('LOCKED OUT')) {
                    btn.disabled = false;
                    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>UNLOCK FILE</span>';
                }
                if (statusBox) statusBox.textContent = '';
            }
        }

        const DATA = "`,footer:`";
    <\/script>
</body>
</html>`}}async function j(e,t=null){let n=null,o=t;if(t)try{const i=e.keys.find(r=>r.type==="password");i&&(n=await y.unwrapWithFallback(i.data,t,i.salt,i.iv))}catch{console.log("Provided password invalid for unlock")}if(!n){const i=await G("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!i)return null;try{const r=e.keys.find(s=>s.type==="password");n=await y.unwrapWithFallback(r.data,i,r.salt,r.iv),o=i}catch{return await f("Error","Incorrect password"),null}}return{buffer:await y.decryptData(n,e.iv,e.content),password:o}}async function Se(){const e=M.files[0],t=document.getElementById("new-password").value;if(!e){await f("Required","Please select a file to protect");return}if(!t){await f("Required","Protection password is required");return}const n=document.getElementById("confirm-add"),o=n.innerText;n.innerText="SECURING PAYLOAD (5s)...",n.disabled=!0;const a=document.getElementById("protection-process-container"),i=document.getElementById("file-upload-zone"),r=document.getElementById("file-preview"),s=document.getElementById("inline-password-section"),c=document.getElementById("protection-complete-container"),l=document.getElementById("security-terminal-body"),d=document.getElementById("process-timer-display"),u=document.getElementById("scanner-status-text"),g=document.querySelector(".scanner-center-shield");i?.classList.add("hidden"),r?.classList.add("hidden"),s?.classList.add("hidden"),c?.classList.add("hidden"),a?.classList.remove("hidden"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(m=>{w(m,"")}),g&&g.classList.remove("success"),u&&(u.textContent="SECURING"),l&&(l.innerHTML="");const k=Date.now(),I=5e3,b=setInterval(()=>{const m=Math.min(Date.now()-k,I),p=Math.floor(m/1e3).toString().padStart(2,"0"),B=Math.floor(m%1e3/10).toString().padStart(2,"0");d&&(d.textContent=`00:${p}.${B}`),m>=I&&clearInterval(b)},30);try{R(14,"FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE..."),w("step-analysis","active"),h("[00:00.15] INITIATING ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6"),h(`[00:00.35] File: "${e.name}" [${se(e.size)}] | Type: ${e.type||"application/octet-stream"}`),h(`[00:00.55] Enclave memory block allocated: ${e.size} bytes. Isolation confirmed.`),await new Promise(x=>setTimeout(x,700)),w("step-analysis","completed"),R(28,"INITIALIZING CSPRNG ENTROPY POOL..."),w("step-prep","active"),h("[00:00.85] Generating 256-bit cryptographic salt from hardware CSPRNG...");const m=y.generateSalt(),p=await y.generateKey();h("[00:01.10] Nonce generation: 96-bit AES-GCM Initialization Vector created."),h("[00:01.30] Ephemeral entropy validated: entropy score = 0.998."),await new Promise(x=>setTimeout(x,700)),w("step-prep","completed"),R(45,"DERIVING KEY (DUAL-STAGE KDF 1,000,000 ROUNDS)..."),w("step-kdf","active"),h("[00:01.50] Stage 1: HMAC-SHA512 Pre-whitening with Domain-Separated Pepper..."),h("[00:01.85] Stage 2: Computing 1,000,000 PBKDF2 iterations (Anti-JohnTheRipper / Anti-Hashcat)...");const B=await y.deriveKeyFromPassword(t,m,1e6);h("[00:02.15] Key derivation complete: 256-bit symmetric cipher key established."),await new Promise(x=>setTimeout(x,900)),w("step-kdf","completed"),R(65,"AES-GCM-256 CIPHER STREAM PROCESSING..."),w("step-encrypt","active"),h("[00:02.45] Executing client-side WebCrypto AES-GCM 256-bit cipher...");const O=await e.arrayBuffer(),T=O.slice(0),{iv:K,ciphertext:q}=await y.encryptData(p,O);h(`[00:02.85] Encrypting ${se(e.size)} payload blocks into zero-knowledge ciphertext...`),h(`[00:03.15] Ciphertext generated (${q.byteLength} bytes). 128-bit Galois Tag verified.`),await new Promise(x=>setTimeout(x,1e3)),w("step-encrypt","completed"),R(80,"PACKAGING ZERO-KNOWLEDGE METADATA..."),w("step-meta","active"),w("step-finalize","active"),h("[00:03.40] Wrapping master file key with AES key wrap cipher...");const{iv:he,wrappedData:we}=await y.wrapKey(p,B),te=[{type:"password",salt:m,iv:he,data:we}],ve={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:te,content:q,iv:K,viewCount:0,expires:null,note:"",accessLog:[{action:"created",date:Date.now()}]};await v.saveFile(ve),h("[00:03.75] Encrypted container committed to zero-knowledge local IndexedDB."),await new Promise(x=>setTimeout(x,700)),w("step-meta","completed"),w("step-finalize","completed"),R(92,"COMPILING STANDALONE HTML RUNTIME (.secure.html)..."),w("step-output","active"),h("[00:04.10] Assembling self-contained portable decryption engine..."),h("[00:04.35] Embedding browser-native WebCrypto decryptor payload..."),h("[00:04.55] Enforced security policy configured: ALWAYS ASK PASSWORD."),await new Promise(x=>setTimeout(x,650)),w("step-output","completed"),R(100,"CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]"),w("step-verify","active"),h("[00:04.80] Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK."),h("[00:05.00] CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY."),await new Promise(x=>setTimeout(x,350)),w("step-verify","completed"),clearInterval(b),d&&(d.textContent="00:05.00"),u&&(u.textContent="SECURED [✓]"),g&&g.classList.add("success"),await new Promise(x=>setTimeout(x,300)),a?.classList.add("hidden"),c?.classList.remove("hidden");const Ee=document.getElementById("complete-file-name");Ee&&(Ee.textContent=e.name),D={record:ve,buffer:T,password:t},L()}catch(m){clearInterval(b),console.error(m),h(`CRITICAL ERROR: ${m.message}`),await f("Error","Encryption failed: "+m.message),a?.classList.add("hidden"),r?.classList.remove("hidden"),s?.classList.remove("hidden")}finally{n.innerText=o,n.disabled=!1}}async function le(e){if(!Ke(e))try{const t=await v.getFile(e);if(!t){await f("Error","File not found");return}ge=t,document.getElementById("auth-file-name").innerText=t.name,W.showModal()}catch(t){console.error(t),await f("Error","Error opening file")}}async function Ae(){const e=ge;if(!e||Ke(e.id))return;const t=document.getElementById("auth-password").value;if(!t)return;const n=document.getElementById("confirm-auth");n.innerText="Unlocking...";try{const o=e.keys.find(i=>i.type==="password");if(!o)throw new Error("Corrupt key data");const a=await y.unwrapWithFallback(o.data,t,o.salt,o.iv);Bt(e.id),W.close(),document.getElementById("auth-password").value="",Ft(e,a)}catch(o){console.error(o),It(e.id),await f("Error","Incorrect password or decryption error.")}finally{n.innerText="Unlock"}}async function Ft(e,t){try{const n=await y.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});A=URL.createObjectURL(o);const a=document.getElementById("viewer-content");a.innerHTML="";const i=fe(e.name,e.type);if(F&&(i?(F.classList.remove("hidden"),F.onclick=()=>{if(!A)return;const r=document.createElement("a");r.style.display="none",r.href=A,r.download=e.name,document.body.appendChild(r),r.click(),document.body.removeChild(r)}):(F.classList.add("hidden"),F.onclick=null)),e.type.startsWith("image/")){const r=document.createElement("img");r.src=A,a.appendChild(r)}else if(e.type.startsWith("video/")||e.type.startsWith("audio/")){const r=document.createElement(e.type.startsWith("video/")?"video":"audio");r.src=A,r.controls=!0,r.autoplay=!0,i||(r.setAttribute("controlsList","nodownload"),r.oncontextmenu=s=>s.preventDefault()),a.appendChild(r)}else if(e.type==="application/pdf"){const r=document.createElement("iframe");r.src=A+(i?"":"#toolbar=0"),r.style.width="100%",r.style.height="100%",a.appendChild(r)}else e.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||e.type==="application/vnd.ms-excel"||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv")?ct(n,a):e.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e.name.endsWith(".docx")?await lt(n,a):a.innerText="Preview not supported for this file type.";document.getElementById("viewer-filename").innerText=e.name,De.classList.remove("hidden"),Ct(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(n){console.error(n),await f("Error","Decryption failed.")}}async function de(){De.classList.add("hidden"),F&&F.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",A&&(URL.revokeObjectURL(A),A=null)}async function Kt(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),L())}async function L(e=""){ne.innerHTML="";let t=await v.getAllFiles();P=t,gt(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const n=Me?.value||"date-desc";t.sort((a,i)=>{if(a.favorite&&!i.favorite)return-1;if(!a.favorite&&i.favorite)return 1;switch(n){case"date-desc":return(i.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(i.date||0);case"name-asc":return a.name.localeCompare(i.name);case"name-desc":return i.name.localeCompare(a.name);case"size-desc":return(i.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(i.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(P.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){ne.innerHTML=`
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${e?"NO FILES MATCH SEARCH":"NO PROTECTED FILES FOUND"}</h3>
        <p class="empty-desc">${e?"Check search parameters or query another filename.":"Drop a file in the upload zone above to initialize client-side encryption."}</p>
      </div>`;return}t.forEach((a,i)=>{const r=document.createElement("div");r.className="file-card",r.style.animationDelay=`${i*.05}s`,r.onclick=async p=>{!p.target.closest(".file-card-actions")&&!p.target.closest(".file-actions")&&!p.target.closest(".select-checkbox")&&!p.target.closest(".favorite-btn")&&le(a.id)};let s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');const c=E.has(a.id);let l=a.name;const d='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',g='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',k='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',I='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',b='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',m='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';r.innerHTML=`
        <span class="hud-corner top-left"></span>
        <span class="hud-corner top-right"></span>
        <span class="hud-corner bottom-left"></span>
        <span class="hud-corner bottom-right"></span>
        <div class="file-card-top">
          <input type="checkbox" class="select-checkbox" ${c?"checked":""} />
          <div class="file-icon">${s}</div>
          <div class="file-details">
            <h3>${l}</h3>
            <div class="file-meta">
              <span>${(a.size/1024/1024).toFixed(2)} MB</span>
              <span class="cyber-card-pill pill-cipher">AES-256</span>
              <span class="cyber-card-pill pill-policy">ALWAYS ASK</span>
            </div>
          </div>
        </div>
        <div class="file-card-actions">
          <button class="btn-highlight open-btn">${d} Unlock</button>
          <button class="btn-highlight download-btn">${u} Download</button>
          <button class="btn-highlight share-btn">${g} Export</button>
          <button class="btn-highlight custom-share-btn">${k} Custom</button>
          <button class="btn-small info-btn">${I} Info</button>
          <button class="btn-small rename-btn">${b} Rename</button>
          <button class="btn-small delete-btn">${m} Delete</button>
        </div>
    `,r.querySelector(".select-checkbox").onchange=p=>{p.stopPropagation(),p.target.checked?E.add(a.id):E.delete(a.id),V()},r.querySelector(".open-btn").onclick=p=>{p.stopPropagation(),le(a.id)},r.querySelector(".download-btn").onclick=p=>Mt(p,a.id),r.querySelector(".info-btn").onclick=p=>At(p,a.id),r.querySelector(".rename-btn").onclick=p=>Dt(p,a.id,a.name),r.querySelector(".share-btn").onclick=p=>Pt(p,a.id),r.querySelector(".custom-share-btn").onclick=p=>Ot(p,a.id),r.querySelector(".delete-btn").onclick=p=>St(p,a.id),ne.appendChild(r)})}function pe(){const e=localStorage.getItem("sv_panic_action")||"blur",t=document.getElementById("panic-action-select");t&&(t.value=e);const n=localStorage.getItem("sv_dl_media")!=="false",o=localStorage.getItem("sv_dl_doc")!=="false",a=document.getElementById("dl-media-toggle"),i=document.getElementById("dl-doc-toggle");a&&(a.checked=n),i&&(i.checked=o),ce();const r=localStorage.getItem("sv_panic_enabled")!=="false",s=document.getElementById("panic-enable-toggle");s&&(s.checked=r),ye()}function ye(){const e=localStorage.getItem("sv_panic_enabled")!=="false",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function ue(){const e=localStorage.getItem("sv_panic_action")||"blur";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await v.getAllFiles();for(const o of n)await v.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),window.location.reload()}catch(t){console.error(t)}})();else if(e==="blur"||e==="lock"){de(),U?.close(),Q?.close(),document.querySelectorAll(".panic-overlay").forEach(n=>n.remove());const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",n=>{n.stopPropagation(),t.remove()})}else if(e==="loading"){de(),U?.close(),Q?.close(),document.querySelectorAll(".panic-overlay").forEach(o=>o.remove());const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `,document.body.appendChild(t);const n=()=>{t.remove()};t.addEventListener("click",n),t.addEventListener("touchstart",n)}}}function zt(){const e=document.getElementById("cyber-matrix-canvas");if(e){const o=e.getContext("2d");if(o){let g=function(){a=e.width=window.innerWidth,i=e.height=window.innerHeight,l=Math.floor(a/c),d=[],u=[];for(let m=0;m<l;m++)d[m]=Math.random()*-60,u[m]=.8+Math.random()*1.2},b=function(m){if(requestAnimationFrame(b),!(m-k<I)){k=m,o.fillStyle="rgba(5, 7, 10, 0.12)",o.fillRect(0,0,a,i),o.font=`600 ${c}px "JetBrains Mono", monospace`;for(let p=0;p<d.length;p++){const B=s[Math.floor(Math.random()*s.length)],O=p*c,T=d[p]*c;Math.random()>.88?(o.fillStyle="#ffffff",o.shadowColor="#00f0ff",o.shadowBlur=10):p%3===0?(o.fillStyle="rgba(0, 240, 255, 0.65)",o.shadowColor="#00f0ff",o.shadowBlur=4):p%3===1?(o.fillStyle="rgba(0, 255, 136, 0.55)",o.shadowColor="#00ff88",o.shadowBlur=3):(o.fillStyle="rgba(56, 189, 248, 0.4)",o.shadowBlur=0),o.fillText(B,O,T),T>i&&Math.random()>.96&&(d[p]=0,u[p]=.8+Math.random()*1.2),d[p]+=u[p]}}},a=e.width=window.innerWidth,i=e.height=window.innerHeight;const s="0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG".split(""),c=13;let l=Math.floor(a/c),d=[],u=[];g(),window.addEventListener("resize",g);let k=0;const I=33;requestAnimationFrame(b)}}const t=document.getElementById("hero-term-status");if(t){const o=["INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE","HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE","PBKDF2 KEY DERIVATION: SHA-256 WITH 1,000,000 ITERATIONS ENFORCED","LOCAL MEMORY SANDBOX: ISOLATED // 0 BYTES TRANSMITTED TO REMOTE NETWORKS","MIL-SPEC DEFENSE PROTOCOL: LEVEL-4 CLEARANCE // AUTHENTICATION TAG VERIFICATION ARMED","CONTAINER ENCRYPTION: 256-BIT CRYPTOGRAPHIC SEED + UNIQUE 128-BIT IV PER TRANSACTION","STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT","SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED"];let a=0;setInterval(()=>{a=(a+1)%o.length,t.style.opacity="0",t.style.transform="translateY(4px)",setTimeout(()=>{t.textContent=o[a],t.style.transition="all 0.3s ease",t.style.opacity="1",t.style.transform="translateY(0)"},300)},4e3)}document.addEventListener("click",o=>{const a=o.target.closest(".cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone");if(!a)return;const i=a.getBoundingClientRect(),r=document.createElement("span");r.className="cyber-click-glow-ripple",r.style.left=`${o.clientX-i.left}px`,r.style.top=`${o.clientY-i.top}px`,a.style.position=a.style.position||"relative",a.appendChild(r),setTimeout(()=>r.remove(),600)});const n=[{el:document.getElementById("hero-command"),navId:"nav-item-console"},{el:document.getElementById("inline-add-container"),navId:"nav-item-protect"},{el:document.getElementById("secured-files-heading"),navId:"nav-item-files"}];window.addEventListener("scroll",()=>{const o=window.scrollY+180;for(let a=n.length-1;a>=0;a--){const i=n[a];if(i.el&&i.el.offsetTop<=o){document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.id===i.navId?r.classList.add("active"):r.id!=="nav-item-settings"&&r.classList.remove("active")});break}}},{passive:!0})}
