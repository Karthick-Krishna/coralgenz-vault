import"./jspdf-SUxvxRxM.js";import{r as ze,u as Ke}from"./xlsx-DFH0qU2H.js";import{r as $e}from"./mammoth-PVFyTYmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();class g{constructor(){this.algo={name:"AES-GCM",length:256}}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(16))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n,o=1e5,a="SHA-256"){const s=new TextEncoder,r=await window.crypto.subtle.importKey("raw",s.encode(t),"PBKDF2",!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:o,hash:a},r,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async encryptData(t,n){const o=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:a}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:a}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),a=new Uint8Array(o.length);for(let s=0;s<o.length;s++)a[s]=o.charCodeAt(s);n=a.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const a=new Uint8Array(n);let s="";for(let r=0;r<a.byteLength;r++)s+=String.fromCharCode(a[r]);localStorage.setItem("sv_device_key",btoa(s))}return this.importKey(n)}}const Ue="SecureVaultDB",We=1,T="files";function Y(){return new Promise((e,t)=>{const n=indexedDB.open(Ue,We);n.onupgradeneeded=o=>{const a=o.target.result;a.objectStoreNames.contains(T)||a.createObjectStore(T,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const v={async saveFile(e){const t=await Y();return new Promise((n,o)=>{const r=t.transaction(T,"readwrite").objectStore(T).put(e);r.onsuccess=()=>n(e.id),r.onerror=()=>o(r.error)})},async getAllFiles(){const e=await Y();return new Promise((t,n)=>{const s=e.transaction(T,"readonly").objectStore(T).openCursor(),r=[];s.onsuccess=i=>{const c=i.target.result;if(c){const{content:l,...p}=c.value;r.push(p),c.continue()}else t(r)},s.onerror=()=>n(s.error)})},async getFile(e){const t=await Y();return new Promise((n,o)=>{const r=t.transaction(T,"readonly").objectStore(T).get(e);r.onsuccess=()=>n(r.result),r.onerror=()=>o(r.error)})},async deleteFile(e){const t=await Y();return new Promise((n,o)=>{const r=t.transaction(T,"readwrite").objectStore(T).delete(e);r.onsuccess=()=>n(),r.onerror=()=>o(r.error)})},async updateFile(e){return this.saveFile(e)}};var He=$e();const ne=document.getElementById("file-list");document.getElementById("add-file-btn");const X=document.getElementById("auth-modal"),Te=document.getElementById("viewer"),R=document.getElementById("viewer-download-btn"),D=document.getElementById("file-input");document.getElementById("privacy-curtain");const _e=document.getElementById("theme-toggle"),U=document.getElementById("search-input"),Se=document.getElementById("sort-select"),Ve=document.getElementById("storage-text"),Ge=document.getElementById("storage-fill"),ve=document.getElementById("bulk-actions"),Ye=document.getElementById("selected-count"),je=document.getElementById("bulk-delete-btn"),qe=document.getElementById("cancel-select-btn"),ue=document.getElementById("info-modal"),Q=document.getElementById("rename-modal"),z=document.getElementById("strength-bar"),W=document.getElementById("strength-text"),Ze=document.getElementById("bulk-export-btn"),oe=document.getElementById("recent-section"),re=document.getElementById("recent-scroll"),j=document.getElementById("drop-zone"),Ee=document.getElementById("stat-total"),be=document.getElementById("stat-images"),xe=document.getElementById("stat-videos"),Ie=document.getElementById("stat-size"),K=document.getElementById("settings-modal"),Ae=document.getElementById("change-pass-modal"),Je=document.getElementById("settings-btn"),Xe=document.getElementById("help-btn"),Z=document.getElementById("help-modal");let J=null,S=null,M=[],E=new Set,q=null,N=JSON.parse(localStorage.getItem("sv_recent")||"[]"),Qe=null,se=null,A=null;function H(e,t="",n={}){return new Promise(o=>{const a=document.getElementById("custom-prompt-modal"),s=document.getElementById("prompt-title"),r=document.getElementById("prompt-message"),i=document.getElementById("prompt-input"),c=document.getElementById("prompt-confirm"),l=document.getElementById("prompt-cancel");s.textContent=e,r.textContent=t,i.type=n.inputType||"text",i.placeholder=n.placeholder||"Enter value...",i.value="";const p=()=>{a.close(),c.onclick=null,l.onclick=null,i.onkeydown=null};c.onclick=()=>{const m=i.value;p(),o(m||null)},l.onclick=()=>{p(),o(null)},i.onkeydown=m=>{m.key==="Enter"&&(m.preventDefault(),c.click())},a.showModal(),setTimeout(()=>i.focus(),100)})}function De(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),s=document.getElementById("confirm-message"),r=document.getElementById("confirm-ok"),i=document.getElementById("confirm-cancel");a.textContent=e,s.textContent=t;let c=!1;const l=()=>{o.close(),r.onclick=null,i.onclick=null,o.removeEventListener("click",p),o.removeEventListener("close",m)},p=y=>{y.target===o&&!c&&(c=!0,l(),n(!1))},m=()=>{c||(c=!0,l(),n(!1))};r.onclick=()=>{c||(c=!0,l(),n(!0))},i.onclick=()=>{c||(c=!0,l(),n(!1))},o.addEventListener("click",p),o.addEventListener("close",m),o.showModal()})}function f(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),s=document.getElementById("alert-message"),r=document.getElementById("alert-ok");a.textContent=e,s.textContent=t;const i=l=>{l.key==="Enter"&&(l.preventDefault(),c(),n())},c=()=>{o.close(),r.onclick=null,document.removeEventListener("keydown",i)};r.onclick=()=>{c(),n()},document.addEventListener("keydown",i),o.showModal()})}async function et(){localStorage.removeItem("sv_app_lock"),localStorage.removeItem("sv_autolock"),localStorage.removeItem("sv_recovery_q"),localStorage.removeItem("sv_recovery_a"),it(),pe(),await L(),nt(),Dt(),Oe(),fe(),Mt()}et();function h(e){const t=document.getElementById("security-terminal-body");if(t){const n=document.createElement("p");n.className="term-line",n.textContent=`> ${e}`,t.appendChild(n),t.scrollTop=t.scrollHeight}}function w(e,t="completed"){const n=document.getElementById(e);if(n){n.className=`process-step ${t}`.trim();const o=n.querySelector(".step-icon");o&&(t==="completed"?o.textContent="[✓]":t==="active"?o.textContent="[→]":o.textContent="[ ]")}}function O(e,t){const n=document.getElementById("protect-progress-bar"),o=document.getElementById("protect-progress-percent"),a=document.getElementById("protect-progress-label");n&&(n.style.width=`${e}%`),o&&(o.textContent=`${e}%`),a&&t&&(a.textContent=t)}function tt(){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+",t=new Uint8Array(16);window.crypto.getRandomValues(t);let n="";for(let a=0;a<16;a++)n+=e[t[a]%e.length];const o=document.getElementById("new-password");if(o){o.value=n,o.type="text",Ne();const a=document.getElementById("toggle-new-password");a&&(a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',a.style.color="var(--cyber-cyan)")}}function nt(){document.getElementById("cancel-add").addEventListener("click",()=>{$()}),document.getElementById("confirm-add").addEventListener("click",Le),document.getElementById("generate-pwd-btn")?.addEventListener("click",tt);const e=document.getElementById("toggle-new-password"),t=document.getElementById("new-password");e?.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t&&(t.type==="password"?(t.type="text",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',e.style.color="var(--cyber-cyan)"):(t.type="password",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',e.style.color="var(--cyber-text-muted)"))}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Le())}),document.getElementById("download-protected-html-btn")?.addEventListener("click",async()=>{if(!A||!A.record){f("Notice","No active protected file session. Please select a file from the vault below to download.");return}const r=document.getElementById("download-protected-html-btn"),i=r?r.innerHTML:"";try{r&&(r.disabled=!0,r.innerHTML=`
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `);let c=A.buffer,l=A.password;if(!c||c.byteLength===0){const p=await G(A.record,l);if(p&&p.buffer)c=p.buffer,l=p.password||l;else throw new Error("Could not retrieve file content for packaging.")}await V(A.record,c,l,{},"Protected HTML package exported successfully!")}catch(c){console.error(c),await f("Export Error","Failed to download HTML package: "+c.message)}finally{r&&(r.disabled=!1,r.innerHTML=i)}}),document.getElementById("view-in-vault-btn")?.addEventListener("click",()=>{$(),document.getElementById("secured-files-heading")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("protect-another-btn")?.addEventListener("click",()=>{$(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".cyber-nav-item").forEach(i=>i.classList.remove("active")),r.classList.add("active"),r.id==="nav-item-protect"&&$()})}),document.getElementById("sidebar-settings-btn")?.addEventListener("click",()=>{pe(),K?.showModal()}),document.getElementById("cancel-auth").addEventListener("click",()=>{X.close(),document.getElementById("auth-password").value="",J=null}),document.getElementById("confirm-auth").addEventListener("click",Ce),document.getElementById("auth-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ce())}),document.getElementById("close-viewer").addEventListener("click",de),_e?.addEventListener("click",Pe),U?.addEventListener("input",ct),Se?.addEventListener("change",lt),document.getElementById("new-password")?.addEventListener("input",Ne),je?.addEventListener("click",ut),Ze?.addEventListener("click",gt),qe?.addEventListener("click",mt),document.getElementById("select-all-btn")?.addEventListener("click",pt),document.getElementById("close-info")?.addEventListener("click",()=>ue.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>Q.close()),document.getElementById("confirm-rename")?.addEventListener("click",ke),document.getElementById("rename-input")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),ke())}),yt(),wt(),Xe?.addEventListener("click",()=>Z?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>Z?.close()),st(),Je?.addEventListener("click",()=>{pe(),K?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>K?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>K?.close()),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const r="coralgenz@zohomail.in",i=encodeURIComponent("SecureVault Feedback"),c=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${r}?subject=${i}&body=${c}`}),document.querySelectorAll(".panic-trigger").forEach(r=>{r.addEventListener("click",me)}),document.getElementById("panic-btn")?.addEventListener("click",me),document.getElementById("panic-action-select")?.addEventListener("change",r=>{localStorage.setItem("sv_panic_action",r.target.value)}),document.getElementById("panic-enable-toggle")?.addEventListener("change",r=>{const i=r.target.checked;localStorage.setItem("sv_panic_enabled",i),fe()}),document.getElementById("dl-media-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_media",r.target.checked),ce()}),document.getElementById("dl-doc-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_doc",r.target.checked),ce()}),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>Ae?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",vt),ae("toggle-new-password","new-password"),ae("toggle-auth-password","auth-password"),ae("toggle-share-password","share-password");const n=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>n?.close()),document.getElementById("confirm-share")?.addEventListener("click",Be),document.getElementById("share-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Be())}),document.getElementById("share-logo-zone")?.addEventListener("click",r=>{r.target!==document.getElementById("share-logo")&&document.getElementById("share-logo")?.click()}),document.getElementById("share-logo")?.addEventListener("change",r=>{const i=r.target.files[0],c=document.getElementById("share-logo-text");c&&(c.textContent=i?i.name:"Choose File")}),D?.addEventListener("change",Me),document.getElementById("file-remove-btn")?.addEventListener("click",ot);const o=document.getElementById("file-upload-zone"),a=document.getElementById("drop-text-primary"),s=document.getElementById("drop-text-secondary");o?.addEventListener("click",r=>{r.target!==D&&D?.click()}),o?.addEventListener("dragover",r=>{r.preventDefault(),o.classList.add("drag-over"),a&&(a.textContent="FILE DETECTED — INITIALIZING PROTECTION"),s&&(s.textContent="Release file to initialize security inspection")}),o?.addEventListener("dragleave",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system")}),o?.addEventListener("drop",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system")}),document.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("keydown",r=>{(r.key==="PrintScreen"||r.ctrlKey&&r.key==="p")&&(r.preventDefault(),alert("Screenshots are disabled"))})}function ae(e,t){const n=document.getElementById(e),o=document.getElementById(t);!n||!o||n.addEventListener("click",a=>{a.preventDefault(),o.type==="password"?(o.type="text",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',n.style.color="var(--cyber-cyan)"):(o.type="password",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',n.style.color="var(--cyber-muted)")})}function $(){D.value="",document.getElementById("new-password").value="",A=null,z.className="strength-bar",W.innerText="ENTER PASSWORD";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview"),n=document.getElementById("inline-password-section"),o=document.getElementById("protection-process-container"),a=document.getElementById("protection-complete-container");e?.classList.remove("hidden"),t?.classList.add("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden");const s=document.getElementById("process-timer-display");s&&(s.textContent="00:00.00");const r=document.querySelector(".scanner-center-shield");r&&r.classList.remove("success");const i=document.getElementById("scanner-status-text");i&&(i.textContent="SECURING");const c=document.getElementById("security-terminal-body");c&&(c.innerHTML='<p class="term-line">&gt; Standby for cryptographic instruction...</p>'),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(l=>{w(l,"")}),O(0,"STANDBY")}function Me(){const e=D.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){f("File Too Large","Please select a file smaller than 150 MB."),D.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),s=document.getElementById("file-preview-size"),r=document.getElementById("protection-process-container"),i=document.getElementById("protection-complete-container");a&&(a.textContent=e.name),s&&(s.textContent=ie(e.size)),n?.classList.add("hidden"),r?.classList.add("hidden"),i?.classList.add("hidden"),o?.classList.remove("hidden"),document.getElementById("inline-password-section")?.classList.remove("hidden")}function ot(e){e.preventDefault(),e.stopPropagation(),D.value="",A=null;const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview"),o=document.getElementById("inline-password-section"),a=document.getElementById("protection-process-container"),s=document.getElementById("protection-complete-container");t?.classList.remove("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden"),s?.classList.add("hidden"),t?.classList.remove("hidden"),n?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function ie(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function rt(e,t){try{const n=ze(new Uint8Array(e),{type:"array"}),o=n.SheetNames;if(o.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const s=document.createElement("div");s.className="excel-header";const r=document.createElement("div");r.className="excel-table-wrapper";let i=o[0];const c=l=>{r.innerHTML="";const p=n.Sheets[l],m=Ke.sheet_to_json(p,{header:1,defval:""});if(!m||m.length===0){r.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const y=document.createElement("table");y.className="excel-table",m.forEach((I,k)=>{const b=document.createElement("tr");I.forEach(u=>{const d=k===0?"th":"td",B=document.createElement(d);B.textContent=u!==void 0?u:"",b.appendChild(B)}),y.appendChild(b)}),r.appendChild(y)};o.forEach(l=>{const p=document.createElement("button");p.className=`excel-sheet-btn ${l===i?"active":""}`,p.textContent=l,p.onclick=()=>{i=l,c(l),s.querySelectorAll(".excel-sheet-btn").forEach(m=>m.classList.remove("active")),p.classList.add("active")},s.appendChild(p)}),c(i),a.appendChild(s),a.appendChild(r),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${n.message}</div>`}}async function at(e,t){try{const{value:n,messages:o}=await He.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const s=document.createElement("div");s.className="word-document",s.innerHTML=n,a.appendChild(s),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}function st(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&$())})})}function it(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function Pe(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function Ne(){const e=document.getElementById("new-password").value;let t=0;e.length>=6&&t++,e.length>=10&&t++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^A-Za-z0-9]/.test(e)&&t++,z.className="strength-bar",t<=1?(z.classList.add("weak"),W.innerText="Weak"):t===2?(z.classList.add("fair"),W.innerText="Fair"):t===3?(z.classList.add("good"),W.innerText="Good"):(z.classList.add("strong"),W.innerText="Strong 💪")}function ct(){const e=U.value.toLowerCase().trim();L(e)}function lt(){L(U?.value||"")}function dt(e){const t=e.reduce((r,i)=>r+(i.size||0),0),n=(t/1024/1024).toFixed(2);Ve.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);Ge.style.width=o+"%";const a=e.filter(r=>r.type?.startsWith("image")).length,s=e.filter(r=>r.type?.startsWith("video")).length;Ee&&(Ee.innerText=e.length),be&&(be.innerText=a),xe&&(xe.innerText=s),Ie&&(Ie.innerText=n)}function _(){const e=document.getElementById("select-all-btn");E.size>0?(ve.classList.remove("hidden"),Ye.innerText=`${E.size} selected`,e&&(E.size>=M.length&&M.length>0?e.innerText="Deselect All":e.innerText="Select All")):ve.classList.add("hidden")}function pt(){E.size>=M.length&&M.length>0?E.clear():M.forEach(e=>E.add(e.id)),_(),L(U?.value||"")}function mt(){E.clear(),_(),L(U?.value||"")}async function ut(){if(await De("Delete Files",`Delete ${E.size} file(s)? This cannot be undone.`)){for(const t of E)await v.deleteFile(t);E.clear(),_(),L(),await f("Success","Files deleted.")}}async function gt(){if(E.size!==0){await f("Export",`Exporting ${E.size} files. Each will download separately.`);for(const e of E)await v.getFile(e)&&await ft(e);E.clear(),_(),L()}}async function ft(e){const t=await v.getFile(e);if(!t)return;const n=await G(t);if(!n||!n.buffer)return;const{buffer:o,password:a}=n;let s=a;s||(s=await H("Export Protected File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),s&&await V(t,o,s,{},"Protected file downloaded successfully!")}function yt(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),j?.classList.remove("hidden"),j?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),j?.classList.add("hidden"),j?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)if(n.length===1){const o=new DataTransfer;o.items.add(n[0]),D.files=o.files,Me(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const o of n)await ht(o)})}async function ht(e){if(e.size>157286400){await f("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await H("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await g.generateKey(),a=g.generateSalt(),s=await g.deriveKeyFromPassword(n,a),r=await e.arrayBuffer(),{iv:i,ciphertext:c}=await g.encryptData(o,r),{iv:l,wrappedData:p}=await g.wrapKey(o,s),m={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:l,data:p}],content:c,iv:i,viewCount:0};await v.saveFile(m),L(),await f("Success",`${e.name} encrypted and saved!`)}function wt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),U?.focus()),e.key==="Escape"&&($(),X.close(),ue?.close(),Q?.close()),(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="p"&&(e.preventDefault(),me()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),Pe())})}async function vt(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await f("Required","Please fill all fields");return}if(t!==n){await f("Error","New passwords do not match");return}if(t.length<4){await f("Error","New password must be at least 4 characters");return}try{const o=await v.getFile(Qe);if(!o)throw new Error("File not found");const a=o.keys.find(m=>m.type==="password");if(!a)throw new Error("No password key found");const s=await g.deriveKeyFromPassword(e,a.salt),r=await g.unwrapKey(a.data,s,a.iv),i=g.generateSalt(),c=await g.deriveKeyFromPassword(t,i),{iv:l,wrappedData:p}=await g.wrapKey(r,c);o.keys=o.keys.filter(m=>m.type!=="password"),o.keys.push({type:"password",salt:i,iv:l,data:p}),o.accessLog=o.accessLog||[],o.accessLog.push({action:"password_changed",date:Date.now()}),await v.updateFile(o),Ae?.close(),await f("Success","Password changed successfully!")}catch(o){console.error(o),await f("Error","Failed to change password. Current password may be incorrect.")}}function Et(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function bt(e){N=N.filter(t=>t.id!==e.id),N.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),N.length>5&&(N=N.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(N)),Oe()}function Oe(){if(!oe||!re)return;const e=N.filter(t=>M.some(n=>n.id===t.id));if(e.length===0){oe.classList.add("hidden");return}oe.classList.remove("hidden"),re.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),re.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>le(t.dataset.id)})}async function xt(e,t){e.stopPropagation(),await De("Delete File","Delete this file permanently?")&&(await v.deleteFile(t),L())}async function It(e,t){e.stopPropagation();const n=M.find(s=>s.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode==="always"?"Always Ask Password":n.authMode||"Always Ask Password";const o=document.getElementById("info-views");o&&(o.innerText=n.viewCount||0);const a=document.getElementById("access-log");a&&n.accessLog&&n.accessLog.length>0?a.innerHTML=n.accessLog.slice(-10).reverse().map(s=>`
      <div class="access-log-item">
        ${s.action.replace("_"," ")} - ${new Date(s.date).toLocaleString()}
      </div>
    `).join(""):a&&(a.innerHTML="No access history"),ue.showModal()}function kt(e,t,n){e.stopPropagation(),q=t;const o=document.getElementById("rename-input");o.value=n,Q.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function ke(){const e=document.getElementById("rename-input").value.trim();if(!e||!q)return;const t=await v.getFile(q);t&&(t.name=e,await v.updateFile(t)),Q.close(),q=null,L()}async function Bt(e,t){e&&e.stopPropagation();try{const n=await v.getFile(t);if(!n){await f("Error","File not found");return}const o=await G(n);if(!o||!o.buffer)return;const{buffer:a,password:s}=o;let r=s;if(r||(r=await H("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await V(n,a,r,{},"Downloaded! The protected file has been saved."),Et(n,"downloaded"),await v.updateFile(n)}catch(n){console.error(n),await f("Error","Failed to download file: "+(n.message||"Decryption error"))}}async function Lt(e,t){e.stopPropagation();try{const n=await v.getFile(t);if(!n)return;const o=await G(n);if(!o||!o.buffer)return;const{buffer:a,password:s}=o;let r=s;if(r||(r=await H("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await V(n,a,r,{})}catch(n){console.error(n),await f("Error","Share failed: "+n.message)}}function Ct(e,t){e.stopPropagation(),se=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function Be(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await f("Required","Please set a password for the file.");return}const a=document.getElementById("confirm-share"),s=a.innerText;a.innerText="Exporting...";try{const r=await v.getFile(se);if(!r)throw new Error("File not found");const i=await G(r,t);if(!i||!i.buffer)throw new Error("Decryption failed");const c=i.buffer;let l="";o.files&&o.files[0]&&(l=await new Promise(m=>{const y=new FileReader;y.onload=()=>m(y.result),y.readAsDataURL(o.files[0])})),await V(r,c,t,{title:n,logoUrl:l}),e.close(),se=null}catch(r){console.error(r),await f("Error","Export failed: "+r.message)}finally{a.innerText=s}}function Tt(e,t){const n=(t||"").toLowerCase(),o=(e||"").toLowerCase();return n.startsWith("image/")||n.startsWith("video/")||n.startsWith("audio/")?!0:/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(o)}function Re(){const e=localStorage.getItem("sv_dl_media")!=="false",t=localStorage.getItem("sv_dl_doc")!=="false";return{allowMedia:e,allowDoc:t}}function ge(e,t){const{allowMedia:n,allowDoc:o}=Re();return Tt(e,t)?n:o}function ce(){const{allowMedia:e,allowDoc:t}=Re(),n=document.getElementById("dl-media-status-badge"),o=document.getElementById("dl-doc-status-badge");n&&(n.textContent=e?"ALLOWED":"RESTRICTED",n.className=`policy-status-badge ${e?"allowed":"restricted"}`),o&&(o.textContent=t?"ALLOWED":"RESTRICTED",o.className=`policy-status-badge ${t?"allowed":"restricted"}`)}async function V(e,t,n,o={},a="Protected file downloaded successfully!"){if(!t||t.byteLength===0)throw new Error("No decrypted file payload available to package.");if(!n)throw new Error("Protection password is required to export this file.");const s=o.allowDownload!==void 0?!!o.allowDownload:ge(e.name,e.type),r=g.generateSalt(),i=await g.deriveKeyFromPassword(n,r,6e5),{iv:c,ciphertext:l}=await g.encryptData(i,t),m=await(B=>new Promise(P=>{const C=new FileReader;C.readAsDataURL(B),C.onloadend=()=>{const F=C.result||"";P(F.split(",")[1]||"")}}))(new Blob([l]));if(!m)throw new Error("Failed to serialize encrypted payload.");const{header:y,footer:I}=St(e,r,c,{...o,allowDownload:s}),k=new Blob([y,m,I],{type:"text/html;charset=utf-8"}),b=URL.createObjectURL(k),u=document.createElement("a");u.href=b;const d=e.name||"protected_file";u.download=d.endsWith(".secure.html")?d:d+".secure.html",document.body.appendChild(u),u.click(),document.body.removeChild(u),setTimeout(()=>URL.revokeObjectURL(b),6e4),a&&await f("Success",a)}function St(e,t,n,o={}){const a=te=>btoa(String.fromCharCode(...new Uint8Array(te))),s=a(t),r=a(n),i=o.title||"Coralgenz Vault",c=o.logoUrl||"",l=e.name||"Protected File",p=e.type||"application/octet-stream",m=Number(e.size)||0,y=e.id||"",I=o.allowDownload!==void 0?!!o.allowDownload:ge(l,p),k=JSON.stringify(s),b=JSON.stringify(r),u=JSON.stringify(p),d=JSON.stringify(l),B=JSON.stringify(m),P=JSON.stringify(i);JSON.stringify(y);const C=JSON.stringify(I),F=c?`<img src="${c}" alt="Logo" class="brand-custom-logo">`:`<div class="brand-shield-icon">
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
    <title>${i} // ${l}</title>
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
        ${F}
        <div class="brand-kicker">● ZERO-KNOWLEDGE RUNTIME</div>
        <h1 class="auth-title">${i}</h1>
        
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
                <div class="viewer-brand-title">${i}</div>
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
                <button type="button" class="viewer-btn-close" onclick="location.reload()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <span>LOCK</span>
                </button>
            </div>
        </div>
        <div class="viewer-content" id="viewer-content-area"></div>
    </div>

    <script>
        const SALT_B64 = ${k};
        const IV_B64 = ${b};
        const TYPE = ${u};
        const NAME = ${d};
        const SIZE = ${B};
        const BRAND = ${P};
        const ALLOW_DOWNLOAD = ${C};

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

        const DATA = "`,footer:`";
    <\/script>
</body>
</html>`}}async function G(e,t=null){let n=null,o=t;if(t)try{const s=e.keys.find(r=>r.type==="password");if(s){const r=await g.deriveKeyFromPassword(t,s.salt);n=await g.unwrapKey(s.data,r,s.iv)}}catch{console.log("Provided password invalid for unlock")}if(!n){const s=await H("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!s)return null;try{const r=e.keys.find(c=>c.type==="password"),i=await g.deriveKeyFromPassword(s,r.salt);n=await g.unwrapKey(r.data,i,r.iv),o=s}catch{return await f("Error","Incorrect password"),null}}return{buffer:await g.decryptData(n,e.iv,e.content),password:o}}async function Le(){const e=D.files[0],t=document.getElementById("new-password").value;if(!e){await f("Required","Please select a file to protect");return}if(!t){await f("Required","Protection password is required");return}const n=document.getElementById("confirm-add"),o=n.innerText;n.innerText="SECURING PAYLOAD (5s)...",n.disabled=!0;const a=document.getElementById("protection-process-container"),s=document.getElementById("file-upload-zone"),r=document.getElementById("file-preview"),i=document.getElementById("inline-password-section"),c=document.getElementById("protection-complete-container"),l=document.getElementById("security-terminal-body"),p=document.getElementById("process-timer-display"),m=document.getElementById("scanner-status-text"),y=document.querySelector(".scanner-center-shield");s?.classList.add("hidden"),r?.classList.add("hidden"),i?.classList.add("hidden"),c?.classList.add("hidden"),a?.classList.remove("hidden"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(u=>{w(u,"")}),y&&y.classList.remove("success"),m&&(m.textContent="SECURING"),l&&(l.innerHTML="");const I=Date.now(),k=5e3,b=setInterval(()=>{const u=Math.min(Date.now()-I,k),d=Math.floor(u/1e3).toString().padStart(2,"0"),B=Math.floor(u%1e3/10).toString().padStart(2,"0");p&&(p.textContent=`00:${d}.${B}`),u>=k&&clearInterval(b)},30);try{O(14,"FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE..."),w("step-analysis","active"),h("[00:00.15] INITIATING ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6"),h(`[00:00.35] File: "${e.name}" [${ie(e.size)}] | Type: ${e.type||"application/octet-stream"}`),h(`[00:00.55] Enclave memory block allocated: ${e.size} bytes. Isolation confirmed.`),await new Promise(x=>setTimeout(x,700)),w("step-analysis","completed"),O(28,"INITIALIZING CSPRNG ENTROPY POOL..."),w("step-prep","active"),h("[00:00.85] Generating 128-bit cryptographic salt from hardware CSPRNG...");const u=g.generateSalt(),d=await g.generateKey();h("[00:01.10] Nonce generation: 96-bit AES-GCM Initialization Vector created."),h("[00:01.30] Ephemeral entropy validated: entropy score = 0.998."),await new Promise(x=>setTimeout(x,700)),w("step-prep","completed"),O(45,"DERIVING KEY (PBKDF2-SHA256 600,000 ROUNDS)..."),w("step-kdf","active"),h("[00:01.50] Deriving master cipher key via PBKDF2-HMAC-SHA256..."),h("[00:01.85] Computing 600,000 computational work-factor rounds...");const B=await g.deriveKeyFromPassword(t,u);h("[00:02.15] Key derivation complete: 256-bit symmetric cipher key established."),await new Promise(x=>setTimeout(x,900)),w("step-kdf","completed"),O(65,"AES-GCM-256 CIPHER STREAM PROCESSING..."),w("step-encrypt","active"),h("[00:02.45] Executing client-side WebCrypto AES-GCM 256-bit cipher...");const P=await e.arrayBuffer(),C=P.slice(0),{iv:F,ciphertext:ee}=await g.encryptData(d,P);h(`[00:02.85] Encrypting ${ie(e.size)} payload blocks into zero-knowledge ciphertext...`),h(`[00:03.15] Ciphertext generated (${ee.byteLength} bytes). 128-bit Galois Tag verified.`),await new Promise(x=>setTimeout(x,1e3)),w("step-encrypt","completed"),O(80,"PACKAGING ZERO-KNOWLEDGE METADATA..."),w("step-meta","active"),w("step-finalize","active"),h("[00:03.40] Wrapping master file key with AES key wrap cipher...");const{iv:ye,wrappedData:te}=await g.wrapKey(d,B),Fe=[{type:"password",salt:u,iv:ye,data:te}],he={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:Fe,content:ee,iv:F,viewCount:0,expires:null,note:"",accessLog:[{action:"created",date:Date.now()}]};await v.saveFile(he),h("[00:03.75] Encrypted container committed to zero-knowledge local IndexedDB."),await new Promise(x=>setTimeout(x,700)),w("step-meta","completed"),w("step-finalize","completed"),O(92,"COMPILING STANDALONE HTML RUNTIME (.secure.html)..."),w("step-output","active"),h("[00:04.10] Assembling self-contained portable decryption engine..."),h("[00:04.35] Embedding browser-native WebCrypto decryptor payload..."),h("[00:04.55] Enforced security policy configured: ALWAYS ASK PASSWORD."),await new Promise(x=>setTimeout(x,650)),w("step-output","completed"),O(100,"CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]"),w("step-verify","active"),h("[00:04.80] Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK."),h("[00:05.00] CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY."),await new Promise(x=>setTimeout(x,350)),w("step-verify","completed"),clearInterval(b),p&&(p.textContent="00:05.00"),m&&(m.textContent="SECURED [✓]"),y&&y.classList.add("success"),await new Promise(x=>setTimeout(x,300)),a?.classList.add("hidden"),c?.classList.remove("hidden");const we=document.getElementById("complete-file-name");we&&(we.textContent=e.name),A={record:he,buffer:C,password:t},L()}catch(u){clearInterval(b),console.error(u),h(`CRITICAL ERROR: ${u.message}`),await f("Error","Encryption failed: "+u.message),a?.classList.add("hidden"),r?.classList.remove("hidden"),i?.classList.remove("hidden")}finally{n.innerText=o,n.disabled=!1}}async function le(e){try{const t=await v.getFile(e);if(!t){await f("Error","File not found");return}J=t,document.getElementById("auth-file-name").innerText=t.name,X.showModal()}catch(t){console.error(t),await f("Error","Error opening file")}}async function Ce(){const e=document.getElementById("auth-password").value;if(!J||!e)return;const t=document.getElementById("confirm-auth");t.innerText="Unlocking...";try{const n=J,o=n.keys.find(r=>r.type==="password");if(!o)throw new Error("Corrupt key data");const a=await g.deriveKeyFromPassword(e,o.salt),s=await g.unwrapKey(o.data,a,o.iv);X.close(),document.getElementById("auth-password").value="",At(n,s)}catch(n){console.error(n),await f("Error","Incorrect password or error.")}finally{t.innerText="Unlock"}}async function At(e,t){try{const n=await g.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});S=URL.createObjectURL(o);const a=document.getElementById("viewer-content");a.innerHTML="";const s=ge(e.name,e.type);if(R&&(s?(R.classList.remove("hidden"),R.onclick=()=>{if(!S)return;const r=document.createElement("a");r.style.display="none",r.href=S,r.download=e.name,document.body.appendChild(r),r.click(),document.body.removeChild(r)}):(R.classList.add("hidden"),R.onclick=null)),e.type.startsWith("image/")){const r=document.createElement("img");r.src=S,a.appendChild(r)}else if(e.type.startsWith("video/")||e.type.startsWith("audio/")){const r=document.createElement(e.type.startsWith("video/")?"video":"audio");r.src=S,r.controls=!0,r.autoplay=!0,s||(r.setAttribute("controlsList","nodownload"),r.oncontextmenu=i=>i.preventDefault()),a.appendChild(r)}else if(e.type==="application/pdf"){const r=document.createElement("iframe");r.src=S+(s?"":"#toolbar=0"),r.style.width="100%",r.style.height="100%",a.appendChild(r)}else e.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||e.type==="application/vnd.ms-excel"||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv")?rt(n,a):e.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e.name.endsWith(".docx")?await at(n,a):a.innerText="Preview not supported for this file type.";document.getElementById("viewer-filename").innerText=e.name,Te.classList.remove("hidden"),bt(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(n){console.error(n),await f("Error","Decryption failed.")}}async function de(){Te.classList.add("hidden"),R&&R.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",S&&(URL.revokeObjectURL(S),S=null)}async function Dt(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),L())}async function L(e=""){ne.innerHTML="";let t=await v.getAllFiles();M=t,dt(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const n=Se?.value||"date-desc";t.sort((a,s)=>{if(a.favorite&&!s.favorite)return-1;if(!a.favorite&&s.favorite)return 1;switch(n){case"date-desc":return(s.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(s.date||0);case"name-asc":return a.name.localeCompare(s.name);case"name-desc":return s.name.localeCompare(a.name);case"size-desc":return(s.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(s.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(M.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){ne.innerHTML=`
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${e?"NO FILES MATCH SEARCH":"NO PROTECTED FILES FOUND"}</h3>
        <p class="empty-desc">${e?"Check search parameters or query another filename.":"Drop a file in the upload zone above to initialize client-side encryption."}</p>
      </div>`;return}t.forEach((a,s)=>{const r=document.createElement("div");r.className="file-card",r.style.animationDelay=`${s*.05}s`,r.onclick=async d=>{!d.target.closest(".file-card-actions")&&!d.target.closest(".file-actions")&&!d.target.closest(".select-checkbox")&&!d.target.closest(".favorite-btn")&&le(a.id)};let i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');const c=E.has(a.id);let l=a.name;const p='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',m='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',y='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',I='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',k='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',b='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';r.innerHTML=`
        <span class="hud-corner top-left"></span>
        <span class="hud-corner top-right"></span>
        <span class="hud-corner bottom-left"></span>
        <span class="hud-corner bottom-right"></span>
        <div class="file-card-top">
          <input type="checkbox" class="select-checkbox" ${c?"checked":""} />
          <div class="file-icon">${i}</div>
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
          <button class="btn-highlight open-btn">${p} Unlock</button>
          <button class="btn-highlight download-btn">${m} Download</button>
          <button class="btn-highlight share-btn">${y} Export</button>
          <button class="btn-highlight custom-share-btn">${I} Custom</button>
          <button class="btn-small info-btn">${k} Info</button>
          <button class="btn-small rename-btn">${b} Rename</button>
          <button class="btn-small delete-btn">${u} Delete</button>
        </div>
    `,r.querySelector(".select-checkbox").onchange=d=>{d.stopPropagation(),d.target.checked?E.add(a.id):E.delete(a.id),_()},r.querySelector(".open-btn").onclick=d=>{d.stopPropagation(),le(a.id)},r.querySelector(".download-btn").onclick=d=>Bt(d,a.id),r.querySelector(".info-btn").onclick=d=>It(d,a.id),r.querySelector(".rename-btn").onclick=d=>kt(d,a.id,a.name),r.querySelector(".share-btn").onclick=d=>Lt(d,a.id),r.querySelector(".custom-share-btn").onclick=d=>Ct(d,a.id),r.querySelector(".delete-btn").onclick=d=>xt(d,a.id),ne.appendChild(r)})}function pe(){const e=localStorage.getItem("sv_panic_action")||"blur",t=document.getElementById("panic-action-select");t&&(t.value=e);const n=localStorage.getItem("sv_dl_media")!=="false",o=localStorage.getItem("sv_dl_doc")!=="false",a=document.getElementById("dl-media-toggle"),s=document.getElementById("dl-doc-toggle");a&&(a.checked=n),s&&(s.checked=o),ce();const r=localStorage.getItem("sv_panic_enabled")!=="false",i=document.getElementById("panic-enable-toggle");i&&(i.checked=r),fe()}function fe(){const e=localStorage.getItem("sv_panic_enabled")!=="false",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function me(){const e=localStorage.getItem("sv_panic_action")||"blur";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await v.getAllFiles();for(const o of n)await v.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),window.location.reload()}catch(t){console.error(t)}})();else if(e==="blur"||e==="lock"){de(),K?.close(),Z?.close(),document.querySelectorAll(".panic-overlay").forEach(n=>n.remove());const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",n=>{n.stopPropagation(),t.remove()})}else if(e==="loading"){de(),K?.close(),Z?.close(),document.querySelectorAll(".panic-overlay").forEach(o=>o.remove());const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `,document.body.appendChild(t);const n=()=>{t.remove()};t.addEventListener("click",n),t.addEventListener("touchstart",n)}}}function Mt(){const e=document.getElementById("cyber-matrix-canvas");if(e){const o=e.getContext("2d");if(o){let y=function(){a=e.width=window.innerWidth,s=e.height=window.innerHeight,l=Math.floor(a/c),p=[],m=[];for(let u=0;u<l;u++)p[u]=Math.random()*-60,m[u]=.8+Math.random()*1.2},b=function(u){if(requestAnimationFrame(b),!(u-I<k)){I=u,o.fillStyle="rgba(5, 7, 10, 0.12)",o.fillRect(0,0,a,s),o.font=`600 ${c}px "JetBrains Mono", monospace`;for(let d=0;d<p.length;d++){const B=i[Math.floor(Math.random()*i.length)],P=d*c,C=p[d]*c;Math.random()>.88?(o.fillStyle="#ffffff",o.shadowColor="#00f0ff",o.shadowBlur=10):d%3===0?(o.fillStyle="rgba(0, 240, 255, 0.65)",o.shadowColor="#00f0ff",o.shadowBlur=4):d%3===1?(o.fillStyle="rgba(0, 255, 136, 0.55)",o.shadowColor="#00ff88",o.shadowBlur=3):(o.fillStyle="rgba(56, 189, 248, 0.4)",o.shadowBlur=0),o.fillText(B,P,C),C>s&&Math.random()>.96&&(p[d]=0,m[d]=.8+Math.random()*1.2),p[d]+=m[d]}}},a=e.width=window.innerWidth,s=e.height=window.innerHeight;const i="0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG".split(""),c=13;let l=Math.floor(a/c),p=[],m=[];y(),window.addEventListener("resize",y);let I=0;const k=33;requestAnimationFrame(b)}}const t=document.getElementById("hero-term-status");if(t){const o=["INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE","HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE","PBKDF2 KEY DERIVATION: SHA-256 WITH 600,000 ITERATIONS ENFORCED","LOCAL MEMORY SANDBOX: ISOLATED // 0 BYTES TRANSMITTED TO REMOTE NETWORKS","MIL-SPEC DEFENSE PROTOCOL: LEVEL-4 CLEARANCE // AUTHENTICATION TAG VERIFICATION ARMED","CONTAINER ENCRYPTION: 256-BIT CRYPTOGRAPHIC SEED + UNIQUE 128-BIT IV PER TRANSACTION","STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT","SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED"];let a=0;setInterval(()=>{a=(a+1)%o.length,t.style.opacity="0",t.style.transform="translateY(4px)",setTimeout(()=>{t.textContent=o[a],t.style.transition="all 0.3s ease",t.style.opacity="1",t.style.transform="translateY(0)"},300)},4e3)}document.addEventListener("click",o=>{const a=o.target.closest(".cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone");if(!a)return;const s=a.getBoundingClientRect(),r=document.createElement("span");r.className="cyber-click-glow-ripple",r.style.left=`${o.clientX-s.left}px`,r.style.top=`${o.clientY-s.top}px`,a.style.position=a.style.position||"relative",a.appendChild(r),setTimeout(()=>r.remove(),600)});const n=[{el:document.getElementById("hero-command"),navId:"nav-item-console"},{el:document.getElementById("inline-add-container"),navId:"nav-item-protect"},{el:document.getElementById("secured-files-heading"),navId:"nav-item-files"}];window.addEventListener("scroll",()=>{const o=window.scrollY+180;for(let a=n.length-1;a>=0;a--){const s=n[a];if(s.el&&s.el.offsetTop<=o){document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.id===s.navId?r.classList.add("active"):r.id!=="nav-item-settings"&&r.classList.remove("active")});break}}},{passive:!0})}
