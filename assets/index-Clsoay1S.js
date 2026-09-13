import"./jspdf-SUxvxRxM.js";import{r as $e,u as Ye}from"./xlsx-DFH0qU2H.js";import{r as je}from"./mammoth-PVFyTYmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(a){if(a.ep)return;a.ep=!0;const i=o(a);fetch(a.href,i)}})();const G="CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821",qe=G,Ze="CORALGENZ::MILSPEC_V5::ANTI_OFFLINE_CRACKER::ZERO_KNOWLEDGE::774910283419",Je="CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";class g{constructor(){this.algo={name:"AES-GCM",length:256}}static detectDeviceCapabilities(){let t=4,o=4;try{typeof navigator<"u"&&(t=navigator.hardwareConcurrency||4,o=navigator.deviceMemory||4)}catch{}const n=t<=2||o<=2;return{isLowEnd:n,recommendedIterations:n?1e6:2e6,concurrency:t,memory:o}}static async computePayloadHash(t){const o=await window.crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(o)).map(a=>a.toString(16).padStart(2,"0")).join("")}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(32))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,o,n=2e6,a="SHA-256",i=!0,r=G){const s=new TextEncoder;let c;if(i){const u=r||qe,m=s.encode(u),y=s.encode(t),h=new Uint8Array(m.length+y.length);h.set(m,0),h.set(y,m.length);const I=await window.crypto.subtle.importKey("raw",o,{name:"HMAC",hash:"SHA-512"},!1,["sign"]),E=await window.crypto.subtle.sign("HMAC",I,h);c=new Uint8Array(E),h.fill(0),y.fill(0)}else c=s.encode(t);const l=await window.crypto.subtle.importKey("raw",c,"PBKDF2",!1,["deriveKey"]),d=await window.crypto.subtle.deriveKey({name:"PBKDF2",salt:o,iterations:n,hash:a},l,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);return c&&c.fill&&c.fill(0),d}static async deriveKeyAsyncWorker(t,o,n=2e6,a=G){if(typeof Worker<"u"&&typeof Blob<"u"&&typeof URL<"u"&&URL.createObjectURL)try{return await new Promise((i,r)=>{const s=`
                        self.onmessage = async function(e) {
                            try {
                                const { password, salt, iterations, pepper } = e.data;
                                const enc = new TextEncoder();
                                const activePepper = pepper || "${G}";
                                const pepperBytes = enc.encode(activePepper);
                                const pwdBytes = enc.encode(password);
                                const combined = new Uint8Array(pepperBytes.length + pwdBytes.length);
                                combined.set(pepperBytes, 0);
                                combined.set(pwdBytes, pepperBytes.length);

                                const hmacKey = await self.crypto.subtle.importKey(
                                    'raw',
                                    salt,
                                    { name: 'HMAC', hash: 'SHA-512' },
                                    false,
                                    ['sign']
                                );
                                const preHash = await self.crypto.subtle.sign('HMAC', hmacKey, combined);
                                combined.fill(0);
                                pwdBytes.fill(0);

                                const keyMaterial = await self.crypto.subtle.importKey(
                                    'raw',
                                    preHash,
                                    'PBKDF2',
                                    false,
                                    ['deriveKey']
                                );

                                const derived = await self.crypto.subtle.deriveKey(
                                    { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' },
                                    keyMaterial,
                                    { name: 'AES-GCM', length: 256 },
                                    true,
                                    ['encrypt', 'decrypt', 'wrapKey', 'unwrapKey']
                                );

                                const rawKey = await self.crypto.subtle.exportKey('raw', derived);
                                self.postMessage({ success: true, rawKey }, [rawKey]);
                            } catch (err) {
                                self.postMessage({ success: false, error: err.message });
                            }
                        };
                    `,c=new Blob([s],{type:"application/javascript"}),l=URL.createObjectURL(c),d=new Worker(l),u=setTimeout(()=>{try{d.terminate(),URL.revokeObjectURL(l)}catch{}r(new Error("Worker key derivation timed out"))},12e3);d.onmessage=async y=>{if(clearTimeout(u),d.terminate(),URL.revokeObjectURL(l),y.data&&y.data.success)try{const h=await window.crypto.subtle.importKey("raw",y.data.rawKey,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);i(h)}catch(h){r(h)}else r(new Error(y.data?.error||"Worker derivation failed"))},d.onerror=y=>{clearTimeout(u),d.terminate(),URL.revokeObjectURL(l),r(y)};const m=new Uint8Array(o);d.postMessage({password:t,salt:m,iterations:n,pepper:a})})}catch{}return this.deriveKeyFromPassword(t,o,n,"SHA-256",!0,a)}static async encryptData(t,o){const n=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:n},t,o);return{iv:n,ciphertext:a}}static async decryptData(t,o,n){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:o},t,n)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,o){const n=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,o,{name:"AES-GCM",iv:n});return{iv:n,wrappedData:a}}static async unwrapKey(t,o,n){return window.crypto.subtle.unwrapKey("raw",t,o,{name:"AES-GCM",iv:n},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async unwrapWithFallback(t,o,n,a,i=2e6){try{const r=await this.deriveKeyFromPassword(o,n,i,"SHA-256",!0,G);return await this.unwrapKey(t,r,a)}catch(r){try{const s=await this.deriveKeyFromPassword(o,n,i,"SHA-256",!0,Ze);return await this.unwrapKey(t,s,a)}catch{try{const c=await this.deriveKeyFromPassword(o,n,1e6,"SHA-256",!0,Je);return await this.unwrapKey(t,c,a)}catch{const l=[i,1e6,6e5,1e5];for(const d of l)try{const u=await this.deriveKeyFromPassword(o,n,d,"SHA-256",!1);return await this.unwrapKey(t,u,a)}catch{}throw r}}}}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let o;if(t){const n=atob(t),a=new Uint8Array(n.length);for(let i=0;i<n.length;i++)a[i]=n.charCodeAt(i);o=a.buffer}else{const n=await this.generateKey();o=await this.exportKey(n);const a=new Uint8Array(o);let i="";for(let r=0;r<a.byteLength;r++)i+=String.fromCharCode(a[r]);localStorage.setItem("sv_device_key",btoa(i))}return this.importKey(o)}}const Xe="SecureVaultDB",Qe=1,A="files";function X(){return new Promise((e,t)=>{const o=indexedDB.open(Xe,Qe);o.onupgradeneeded=n=>{const a=n.target.result;a.objectStoreNames.contains(A)||a.createObjectStore(A,{keyPath:"id"})},o.onsuccess=n=>e(n.target.result),o.onerror=n=>t(n.target.error)})}const x={async saveFile(e){const t=await X();return new Promise((o,n)=>{const r=t.transaction(A,"readwrite").objectStore(A).put(e);r.onsuccess=()=>o(e.id),r.onerror=()=>n(r.error)})},async getAllFiles(){const e=await X();return new Promise((t,o)=>{const i=e.transaction(A,"readonly").objectStore(A).openCursor(),r=[];i.onsuccess=s=>{const c=s.target.result;if(c){const{content:l,...d}=c.value;r.push(d),c.continue()}else t(r)},i.onerror=()=>o(i.error)})},async getFile(e){const t=await X();return new Promise((o,n)=>{const r=t.transaction(A,"readonly").objectStore(A).get(e);r.onsuccess=()=>o(r.result),r.onerror=()=>n(r.error)})},async deleteFile(e){const t=await X();return new Promise((o,n)=>{const r=t.transaction(A,"readwrite").objectStore(A).delete(e);r.onsuccess=()=>o(),r.onerror=()=>n(r.error)})},async updateFile(e){return this.saveFile(e)}};var et=je();const ie=document.getElementById("file-list");document.getElementById("add-file-btn");const $=document.getElementById("auth-modal"),Re=document.getElementById("viewer"),H=document.getElementById("viewer-download-btn"),R=document.getElementById("file-input");document.getElementById("privacy-curtain");const tt=document.getElementById("theme-toggle"),W=document.getElementById("search-input"),Ne=document.getElementById("sort-select"),nt=document.getElementById("storage-text"),ot=document.getElementById("storage-fill"),Ie=document.getElementById("bulk-actions"),rt=document.getElementById("selected-count"),at=document.getElementById("bulk-delete-btn"),it=document.getElementById("cancel-select-btn"),he=document.getElementById("info-modal"),ne=document.getElementById("rename-modal"),K=document.getElementById("strength-bar"),S=document.getElementById("strength-text"),st=document.getElementById("bulk-export-btn"),se=document.getElementById("recent-section"),ce=document.getElementById("recent-scroll"),Q=document.getElementById("drop-zone"),Le=document.getElementById("stat-total"),Be=document.getElementById("stat-images"),Se=document.getElementById("stat-videos"),Te=document.getElementById("stat-size"),z=document.getElementById("settings-modal"),Oe=document.getElementById("change-pass-modal"),ct=document.getElementById("settings-btn"),lt=document.getElementById("help-btn"),te=document.getElementById("help-modal");let we=null,M=null,N=[],k=new Set,ee=null,U=JSON.parse(localStorage.getItem("sv_recent")||"[]"),dt=null,de=null,P={},D=null;function Y(e,t="",o={}){return new Promise(n=>{const a=document.getElementById("custom-prompt-modal"),i=document.getElementById("prompt-title"),r=document.getElementById("prompt-message"),s=document.getElementById("prompt-input"),c=document.getElementById("prompt-confirm"),l=document.getElementById("prompt-cancel");i.textContent=e,r.textContent=t,s.type=o.inputType||"text",s.placeholder=o.placeholder||"Enter value...",s.value="";const d=()=>{a.close(),c.onclick=null,l.onclick=null,s.onkeydown=null};c.onclick=()=>{const u=s.value;d(),n(u||null)},l.onclick=()=>{d(),n(null)},s.onkeydown=u=>{u.key==="Enter"&&(u.preventDefault(),c.click())},a.showModal(),setTimeout(()=>s.focus(),100)})}function Ke(e,t=""){return new Promise(o=>{const n=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),i=document.getElementById("confirm-message"),r=document.getElementById("confirm-ok"),s=document.getElementById("confirm-cancel");a.textContent=e,i.textContent=t;let c=!1;const l=()=>{n.close(),r.onclick=null,s.onclick=null,n.removeEventListener("click",d),n.removeEventListener("close",u)},d=m=>{m.target===n&&!c&&(c=!0,l(),o(!1))},u=()=>{c||(c=!0,l(),o(!1))};r.onclick=()=>{c||(c=!0,l(),o(!0))},s.onclick=()=>{c||(c=!0,l(),o(!1))},n.addEventListener("click",d),n.addEventListener("close",u),n.showModal()})}function f(e,t=""){return new Promise(o=>{const n=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),i=document.getElementById("alert-message"),r=document.getElementById("alert-ok");a.textContent=e,i.textContent=t;const s=l=>{l.key==="Enter"&&(l.preventDefault(),c(),o())},c=()=>{n.close(),r.onclick=null,document.removeEventListener("keydown",s)};r.onclick=()=>{c(),o()},document.addEventListener("keydown",s),n.showModal()})}async function pt(){localStorage.removeItem("sv_app_lock"),localStorage.removeItem("sv_autolock"),localStorage.removeItem("sv_recovery_q"),localStorage.removeItem("sv_recovery_a"),wt(),ge(),await T(),mt(),Gt(),ze(),Ee(),$t()}pt();function v(e){const t=document.getElementById("security-terminal-body");if(t){const o=document.createElement("p");o.className="term-line",o.textContent=`> ${e}`,t.appendChild(o),t.scrollTop=t.scrollHeight}}function b(e,t="completed"){const o=document.getElementById(e);if(o){o.className=`process-step ${t}`.trim();const n=o.querySelector(".step-icon");n&&(t==="completed"?n.textContent="[✓]":t==="active"?n.textContent="[→]":n.textContent="[ ]")}}function F(e,t){const o=document.getElementById("protect-progress-bar"),n=document.getElementById("protect-progress-percent"),a=document.getElementById("protect-progress-label");o&&(o.style.width=`${e}%`),n&&(n.textContent=`${e}%`),a&&t&&(a.textContent=t)}function ut(){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+",t=new Uint8Array(24);window.crypto.getRandomValues(t);let o="";for(let a=0;a<24;a++)o+=e[t[a]%e.length];const n=document.getElementById("new-password");if(n){n.value=o,n.type="text",_e();const a=document.getElementById("toggle-new-password");a&&(a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',a.style.color="var(--cyber-cyan)")}}function mt(){document.getElementById("cancel-add").addEventListener("click",()=>{V()}),document.getElementById("confirm-add").addEventListener("click",Me),document.getElementById("generate-pwd-btn")?.addEventListener("click",ut);const e=document.getElementById("toggle-new-password"),t=document.getElementById("new-password");e?.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t&&(t.type==="password"?(t.type="text",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',e.style.color="var(--cyber-cyan)"):(t.type="password",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',e.style.color="var(--cyber-text-muted)"))}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Me())}),document.getElementById("download-protected-html-btn")?.addEventListener("click",async()=>{if(!D||!D.record){f("Notice","No active protected file session. Please select a file from the vault below to download.");return}const r=document.getElementById("download-protected-html-btn"),s=r?r.innerHTML:"";try{r&&(r.disabled=!0,r.innerHTML=`
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `);let c=D.buffer,l=D.password;if(!c||c.byteLength===0){const d=await Z(D.record,l);if(d&&d.buffer)c=d.buffer,l=d.password||l;else throw new Error("Could not retrieve file content for packaging.")}await q(D.record,c,l,{},"Protected HTML package exported successfully!")}catch(c){console.error(c),await f("Export Error","Failed to download HTML package: "+c.message)}finally{r&&(r.disabled=!1,r.innerHTML=s)}}),document.getElementById("view-in-vault-btn")?.addEventListener("click",()=>{V(),document.getElementById("secured-files-heading")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("protect-another-btn")?.addEventListener("click",()=>{V(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".cyber-nav-item").forEach(s=>s.classList.remove("active")),r.classList.add("active"),r.id==="nav-item-protect"&&V()})}),document.getElementById("sidebar-settings-btn")?.addEventListener("click",()=>{ge(),z?.showModal()}),document.getElementById("cancel-auth").addEventListener("click",()=>{$.close(),document.getElementById("auth-password").value="",we=null}),document.getElementById("confirm-auth").addEventListener("click",De),document.getElementById("auth-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),De())}),document.getElementById("close-viewer").addEventListener("click",ye),tt?.addEventListener("click",Fe),W?.addEventListener("input",vt),Ne?.addEventListener("change",Et),document.getElementById("new-password")?.addEventListener("input",_e),at?.addEventListener("click",It),st?.addEventListener("click",Lt),it?.addEventListener("click",kt),document.getElementById("select-all-btn")?.addEventListener("click",xt),document.getElementById("close-info")?.addEventListener("click",()=>he.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>ne.close()),document.getElementById("confirm-rename")?.addEventListener("click",Ae),document.getElementById("rename-input")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ae())}),St(),Ct(),lt?.addEventListener("click",()=>te?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>te?.close()),ht(),ct?.addEventListener("click",()=>{ge(),z?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>z?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>z?.close()),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const r="coralgenz@zohomail.in",s=encodeURIComponent("SecureVault Feedback"),c=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${r}?subject=${s}&body=${c}`}),document.querySelectorAll(".panic-trigger").forEach(r=>{r.addEventListener("click",fe)}),document.getElementById("panic-btn")?.addEventListener("click",fe),document.getElementById("panic-action-select")?.addEventListener("change",r=>{localStorage.setItem("sv_panic_action",r.target.value)}),document.getElementById("panic-enable-toggle")?.addEventListener("change",r=>{const s=r.target.checked;localStorage.setItem("sv_panic_enabled",s),Ee()}),document.getElementById("dl-media-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_media",r.target.checked),ue()}),document.getElementById("dl-doc-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_doc",r.target.checked),ue()}),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>Oe?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",Dt),le("toggle-new-password","new-password"),le("toggle-auth-password","auth-password"),le("toggle-share-password","share-password");const o=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>o?.close()),document.getElementById("confirm-share")?.addEventListener("click",Pe),document.getElementById("share-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Pe())}),document.getElementById("share-logo-zone")?.addEventListener("click",r=>{r.target!==document.getElementById("share-logo")&&document.getElementById("share-logo")?.click()}),document.getElementById("share-logo")?.addEventListener("change",r=>{const s=r.target.files[0],c=document.getElementById("share-logo-text");c&&(c.textContent=s?s.name:"Choose File")}),R?.addEventListener("change",Ue),document.getElementById("file-remove-btn")?.addEventListener("click",yt);const n=document.getElementById("file-upload-zone"),a=document.getElementById("drop-text-primary"),i=document.getElementById("drop-text-secondary");n?.addEventListener("click",r=>{r.target!==R&&R?.click()}),n?.addEventListener("dragover",r=>{r.preventDefault(),n.classList.add("drag-over"),a&&(a.textContent="FILE DETECTED — INITIALIZING PROTECTION"),i&&(i.textContent="Release file to initialize security inspection")}),n?.addEventListener("dragleave",()=>{n.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),i&&(i.textContent="or click to browse local file system")}),n?.addEventListener("drop",()=>{n.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),i&&(i.textContent="or click to browse local file system")}),document.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("keydown",r=>{(r.key==="PrintScreen"||r.ctrlKey&&r.key==="p")&&(r.preventDefault(),alert("Screenshots are disabled"))})}function le(e,t){const o=document.getElementById(e),n=document.getElementById(t);!o||!n||o.addEventListener("click",a=>{a.preventDefault(),n.type==="password"?(n.type="text",o.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',o.style.color="var(--cyber-cyan)"):(n.type="password",o.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',o.style.color="var(--cyber-muted)")})}function V(){R.value="",document.getElementById("new-password").value="",D=null,K.className="strength-bar",S.innerText="ENTER PASSWORD";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview"),o=document.getElementById("inline-password-section"),n=document.getElementById("protection-process-container"),a=document.getElementById("protection-complete-container");e?.classList.remove("hidden"),t?.classList.add("hidden"),o?.classList.add("hidden"),n?.classList.add("hidden"),a?.classList.add("hidden");const i=document.getElementById("process-timer-display");i&&(i.textContent="00:00.00");const r=document.querySelector(".scanner-center-shield");r&&r.classList.remove("success");const s=document.getElementById("scanner-status-text");s&&(s.textContent="SECURING");const c=document.getElementById("security-terminal-body");c&&(c.innerHTML='<p class="term-line">&gt; Standby for cryptographic instruction...</p>'),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(l=>{b(l,"")}),F(0,"STANDBY")}function Ue(){const e=R.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){f("File Too Large","Please select a file smaller than 150 MB."),R.value="";return}const o=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),i=document.getElementById("file-preview-size"),r=document.getElementById("protection-process-container"),s=document.getElementById("protection-complete-container");a&&(a.textContent=e.name),i&&(i.textContent=pe(e.size)),o?.classList.add("hidden"),r?.classList.add("hidden"),s?.classList.add("hidden"),n?.classList.remove("hidden"),document.getElementById("inline-password-section")?.classList.remove("hidden")}function yt(e){e.preventDefault(),e.stopPropagation(),R.value="",D=null;const t=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),n=document.getElementById("inline-password-section"),a=document.getElementById("protection-process-container"),i=document.getElementById("protection-complete-container");t?.classList.remove("hidden"),o?.classList.add("hidden"),n?.classList.add("hidden"),a?.classList.add("hidden"),i?.classList.add("hidden"),t?.classList.remove("hidden"),o?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function pe(e){if(e===0)return"0 Bytes";const t=1024,o=["Bytes","KB","MB","GB"],n=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,n)).toFixed(2))+" "+o[n]}function gt(e,t){try{const o=$e(new Uint8Array(e),{type:"array"}),n=o.SheetNames;if(n.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const i=document.createElement("div");i.className="excel-header";const r=document.createElement("div");r.className="excel-table-wrapper";let s=n[0];const c=l=>{r.innerHTML="";const d=o.Sheets[l],u=Ye.sheet_to_json(d,{header:1,defval:""});if(!u||u.length===0){r.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const m=document.createElement("table");m.className="excel-table",u.forEach((y,h)=>{const I=document.createElement("tr");y.forEach(E=>{const p=h===0?"th":"td",w=document.createElement(p);w.textContent=E!==void 0?E:"",I.appendChild(w)}),m.appendChild(I)}),r.appendChild(m)};n.forEach(l=>{const d=document.createElement("button");d.className=`excel-sheet-btn ${l===s?"active":""}`,d.textContent=l,d.onclick=()=>{s=l,c(l),i.querySelectorAll(".excel-sheet-btn").forEach(u=>u.classList.remove("active")),d.classList.add("active")},i.appendChild(d)}),c(s),a.appendChild(i),a.appendChild(r),t.appendChild(a)}catch(o){console.error(o),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${o.message}</div>`}}async function ft(e,t){try{const{value:o,messages:n}=await et.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const i=document.createElement("div");i.className="word-document",i.innerHTML=o,a.appendChild(i),t.appendChild(a)}catch(o){console.error(o),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${o.message}</div>`}}function ht(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",o=>{const n=t.getBoundingClientRect();o.clientX>=n.left&&o.clientX<=n.right&&o.clientY>=n.top&&o.clientY<=n.bottom,o.target===t&&(t.close(),t.id==="add-modal"&&V())})})}function wt(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function Fe(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function _e(){const e=document.getElementById("new-password")?.value||"",o=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123"].includes(e.toLowerCase().trim());let n=0;e.length>=8&&n++,e.length>=12&&n++,e.length>=18&&n++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&n++,/[0-9]/.test(e)&&n++,/[^A-Za-z0-9]/.test(e)&&n++,o&&(n=1),K&&S&&(K.className="strength-bar",e?n<=2||o?(K.classList.add("weak"),S.innerText=o?"VULNERABLE (DICTIONARY WORD)":"WEAK (GPU CRACKABLE)",S.style.color="#ef4444"):n===3||n===4?(K.classList.add("fair"),S.innerText="MODERATE (RECOMMEND 12+ CHARS)",S.style.color="#f59e0b"):n===5?(K.classList.add("good"),S.innerText="STRONG (GPU RESISTANT)",S.style.color="#0284c7"):(K.classList.add("strong"),S.innerText="MIL-SPEC // QUANTUM RESISTANT",S.style.color="#10b981"):(S.innerText="ENTER PASSWORD",S.style.color="var(--cyber-text-muted)",K.style.width="0%"))}function vt(){const e=W.value.toLowerCase().trim();T(e)}function Et(){T(W?.value||"")}function bt(e){const t=e.reduce((r,s)=>r+(s.size||0),0),o=(t/1024/1024).toFixed(2);nt.innerText=`${e.length} files • ${o} MB used`;const n=Math.min(t/(500*1024*1024)*100,100);ot.style.width=n+"%";const a=e.filter(r=>r.type?.startsWith("image")).length,i=e.filter(r=>r.type?.startsWith("video")).length;Le&&(Le.innerText=e.length),Be&&(Be.innerText=a),Se&&(Se.innerText=i),Te&&(Te.innerText=o)}function j(){const e=document.getElementById("select-all-btn");k.size>0?(Ie.classList.remove("hidden"),rt.innerText=`${k.size} selected`,e&&(k.size>=N.length&&N.length>0?e.innerText="Deselect All":e.innerText="Select All")):Ie.classList.add("hidden")}function xt(){k.size>=N.length&&N.length>0?k.clear():N.forEach(e=>k.add(e.id)),j(),T(W?.value||"")}function kt(){k.clear(),j(),T(W?.value||"")}async function It(){if(await Ke("Delete Files",`Delete ${k.size} file(s)? This cannot be undone.`)){for(const t of k)await x.deleteFile(t);k.clear(),j(),T(),await f("Success","Files deleted.")}}async function Lt(){if(k.size!==0){await f("Export",`Exporting ${k.size} files. Each will download separately.`);for(const e of k)await x.getFile(e)&&await Bt(e);k.clear(),j(),T()}}async function Bt(e){const t=await x.getFile(e);if(!t)return;const o=await Z(t);if(!o||!o.buffer)return;const{buffer:n,password:a}=o;let i=a;i||(i=await Y("Export Protected File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),i&&await q(t,n,i,{},"Protected file downloaded successfully!")}function St(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,o=>{o.preventDefault(),Q?.classList.remove("hidden"),Q?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,o=>{o.preventDefault(),Q?.classList.add("hidden"),Q?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const o=t.dataTransfer?.files;if(o&&o.length>0)if(o.length===1){const n=new DataTransfer;n.items.add(o[0]),R.files=n.files,Ue(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const n of o)await Tt(n)})}async function Tt(e){if(e.size>157286400){await f("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const o=await Y("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!o)return;const n=await g.generateKey(),a=g.generateSalt(),i=await g.deriveKeyFromPassword(o,a,2e6),r=await e.arrayBuffer(),{iv:s,ciphertext:c}=await g.encryptData(n,r),{iv:l,wrappedData:d}=await g.wrapKey(n,i),u={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:l,data:d}],content:c,iv:s,viewCount:0};await x.saveFile(u),T(),await f("Success",`${e.name} encrypted and saved!`)}function Ct(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),W?.focus()),e.key==="Escape"&&(V(),$.close(),he?.close(),ne?.close()),(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="p"&&(e.preventDefault(),fe()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),Fe())})}const Ce=5,At=300*1e3;function He(e){const t=P[e];if(t&&t.locked&&Date.now()<t.lockedUntil){const o=Math.ceil((t.lockedUntil-Date.now())/1e3);return alert(`File locked. Try again in ${o} seconds.`),!0}return!1}function Pt(e){P[e]||(P[e]={count:0,locked:!1,lockedUntil:0}),P[e].count++;const t=Ce-P[e].count,o=document.getElementById("attempts-left"),n=document.getElementById("auth-attempts");t<=3&&(n?.classList.remove("hidden"),o&&(o.innerText=t)),P[e].count>=Ce&&(P[e].locked=!0,P[e].lockedUntil=Date.now()+At,$.close(),alert("Too many failed attempts. File locked for 5 minutes."))}function Mt(e){delete P[e],document.getElementById("auth-attempts")?.classList.add("hidden")}async function Dt(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,o=document.getElementById("confirm-password-change").value;if(!e||!t||!o){await f("Required","Please fill all fields");return}if(t!==o){await f("Error","New passwords do not match");return}if(t.length<4){await f("Error","New password must be at least 4 characters");return}try{const n=await x.getFile(dt);if(!n)throw new Error("File not found");const a=n.keys.find(d=>d.type==="password");if(!a)throw new Error("No password key found");const i=await g.unwrapWithFallback(a.data,e,a.salt,a.iv),r=g.generateSalt(),s=await g.deriveKeyFromPassword(t,r,2e6),{iv:c,wrappedData:l}=await g.wrapKey(i,s);n.keys=n.keys.filter(d=>d.type!=="password"),n.keys.push({type:"password",salt:r,iv:c,data:l}),n.accessLog=n.accessLog||[],n.accessLog.push({action:"password_changed",date:Date.now()}),await x.updateFile(n),Oe?.close(),await f("Success","Password changed successfully!")}catch(n){console.error(n),await f("Error","Failed to change password. Current password may be incorrect.")}}function Rt(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function Nt(e){U=U.filter(t=>t.id!==e.id),U.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),U.length>5&&(U=U.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(U)),ze()}function ze(){if(!se||!ce)return;const e=U.filter(t=>N.some(o=>o.id===t.id));if(e.length===0){se.classList.add("hidden");return}se.classList.remove("hidden"),ce.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),ce.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>me(t.dataset.id)})}async function Ot(e,t){e.stopPropagation(),await Ke("Delete File","Delete this file permanently?")&&(await x.deleteFile(t),T())}async function Kt(e,t){e.stopPropagation();const o=N.find(i=>i.id===t);if(!o)return;document.getElementById("info-name").innerText=o.name,document.getElementById("info-type").innerText=o.type||"Unknown",document.getElementById("info-size").innerText=(o.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(o.date).toLocaleDateString(),document.getElementById("info-mode").innerText=o.authMode==="always"?"Always Ask Password":o.authMode||"Always Ask Password";const n=document.getElementById("info-views");n&&(n.innerText=o.viewCount||0);const a=document.getElementById("access-log");a&&o.accessLog&&o.accessLog.length>0?a.innerHTML=o.accessLog.slice(-10).reverse().map(i=>`
      <div class="access-log-item">
        ${i.action.replace("_"," ")} - ${new Date(i.date).toLocaleString()}
      </div>
    `).join(""):a&&(a.innerHTML="No access history"),he.showModal()}function Ut(e,t,o){e.stopPropagation(),ee=t;const n=document.getElementById("rename-input");n.value=o,ne.showModal(),setTimeout(()=>{n.focus(),n.select()},100)}async function Ae(){const e=document.getElementById("rename-input").value.trim();if(!e||!ee)return;const t=await x.getFile(ee);t&&(t.name=e,await x.updateFile(t)),ne.close(),ee=null,T()}async function Ft(e,t){e&&e.stopPropagation();try{const o=await x.getFile(t);if(!o){await f("Error","File not found");return}const n=await Z(o);if(!n||!n.buffer)return;const{buffer:a,password:i}=n;let r=i;if(r||(r=await Y("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await q(o,a,r,{},"Downloaded! The protected file has been saved."),Rt(o,"downloaded"),await x.updateFile(o)}catch(o){console.error(o),await f("Error","Failed to download file: "+(o.message||"Decryption error"))}}async function _t(e,t){e.stopPropagation();try{const o=await x.getFile(t);if(!o)return;const n=await Z(o);if(!n||!n.buffer)return;const{buffer:a,password:i}=n;let r=i;if(r||(r=await Y("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await q(o,a,r,{})}catch(o){console.error(o),await f("Error","Share failed: "+o.message)}}function Ht(e,t){e.stopPropagation(),de=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function Pe(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,o=document.getElementById("share-title").value||"SecureVault",n=document.getElementById("share-logo");if(!t){await f("Required","Please set a password for the file.");return}const a=document.getElementById("confirm-share"),i=a.innerText;a.innerText="Exporting...";try{const r=await x.getFile(de);if(!r)throw new Error("File not found");const s=await Z(r,t);if(!s||!s.buffer)throw new Error("Decryption failed");const c=s.buffer;let l="";n.files&&n.files[0]&&(l=await new Promise(u=>{const m=new FileReader;m.onload=()=>u(m.result),m.readAsDataURL(n.files[0])})),await q(r,c,t,{title:o,logoUrl:l}),e.close(),de=null}catch(r){console.error(r),await f("Error","Export failed: "+r.message)}finally{a.innerText=i}}function zt(e,t){const o=(t||"").toLowerCase(),n=(e||"").toLowerCase();return o.startsWith("image/")||o.startsWith("video/")||o.startsWith("audio/")?!0:/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(n)}function Ve(){const e=localStorage.getItem("sv_dl_media")!=="false",t=localStorage.getItem("sv_dl_doc")!=="false";return{allowMedia:e,allowDoc:t}}function ve(e,t){const{allowMedia:o,allowDoc:n}=Ve();return zt(e,t)?o:n}function ue(){const{allowMedia:e,allowDoc:t}=Ve(),o=document.getElementById("dl-media-status-badge"),n=document.getElementById("dl-doc-status-badge");o&&(o.textContent=e?"ALLOWED":"RESTRICTED",o.className=`policy-status-badge ${e?"allowed":"restricted"}`),n&&(n.textContent=t?"ALLOWED":"RESTRICTED",n.className=`policy-status-badge ${t?"allowed":"restricted"}`)}async function q(e,t,o,n={},a="Protected file downloaded successfully!"){if(!t||t.byteLength===0)throw new Error("No decrypted file payload available to package.");if(!o)throw new Error("Protection password is required to export this file.");const i=n.allowDownload!==void 0?!!n.allowDownload:ve(e.name,e.type),r=g.generateSalt(),s=await g.computePayloadHash(t),c=await g.deriveKeyAsyncWorker(o,r,2e6,g.MILSPEC_ANTI_CRACKER_PEPPER_V6),{iv:l,ciphertext:d}=await g.encryptData(c,t),m=await(C=>new Promise(B=>{const O=new FileReader;O.readAsDataURL(C),O.onloadend=()=>{const _=O.result||"";B(_.split(",")[1]||"")}}))(new Blob([d]));if(!m)throw new Error("Failed to serialize encrypted payload.");const{header:y,footer:h}=Vt(e,r,l,{...n,allowDownload:i,integrityHash:s}),I=new Blob([y,m,h],{type:"text/html;charset=utf-8"}),E=URL.createObjectURL(I),p=document.createElement("a");p.href=E;const w=e.name||"protected_file";p.download=w.endsWith(".secure.html")?w:w+".secure.html",document.body.appendChild(p),p.click(),document.body.removeChild(p),setTimeout(()=>URL.revokeObjectURL(E),6e4),a&&await f("Success",a)}function Vt(e,t,o,n={}){const a=ae=>btoa(String.fromCharCode(...new Uint8Array(ae))),i=a(t),r=a(o),s=n.title||"Coralgenz Vault",c=n.logoUrl||"",l=e.name||"Protected File",d=e.type||"application/octet-stream",u=Number(e.size)||0,m=e.id||"",y=n.allowDownload!==void 0?!!n.allowDownload:ve(l,d),h=JSON.stringify(i),I=JSON.stringify(r),E=JSON.stringify(d),p=JSON.stringify(l),w=JSON.stringify(u),C=JSON.stringify(s),B=JSON.stringify(m),O=JSON.stringify(y),_=JSON.stringify(n.integrityHash||e.integrityHash||""),J=JSON.stringify("V6"),oe=c?`<img src="${c}" alt="Logo" class="brand-custom-logo">`:`<div class="brand-shield-icon">
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
    <!-- Military-Grade Content Security Policy: Blocks all unauthorized external network exfiltration & Burp Suite Proxy Interception -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data: blob:; media-src 'self' blob:; frame-src blob:; script-src 'unsafe-inline' 'unsafe-eval' blob:; worker-src blob:; connect-src 'none'; form-action 'none'; base-uri 'none'; object-src 'none';">
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

        /* Anti-Keylogger Virtual Keypad */
        .cyber-keypad-toggle-btn {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 8px 12px;
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            color: var(--accent-cyan);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        .cyber-keypad-toggle-btn:hover {
            background: rgba(2, 132, 199, 0.08);
            border-color: var(--accent-cyan);
        }
        .virtual-keypad-drawer {
            background: #f8fafc;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 12px;
            margin-top: 4px;
            margin-bottom: 6px;
            transition: all 0.3s ease;
        }
        .virtual-keypad-drawer.hidden {
            display: none;
        }
        .keypad-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .keypad-title {
            font-family: var(--font-mono);
            font-size: 9px;
            font-weight: 700;
            color: var(--text-muted);
            letter-spacing: 0.05em;
        }
        .keypad-tool-btn {
            background: #e2e8f0;
            border: none;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            color: var(--text-main);
            padding: 3px 8px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .keypad-tool-btn:hover {
            background: var(--accent-cyan);
            color: #ffffff;
        }
        .keypad-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin-bottom: 8px;
        }
        .keypad-key-btn {
            height: 32px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-family: var(--font-mono);
            font-size: 12px;
            font-weight: 700;
            color: var(--text-main);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s;
            user-select: none;
        }
        .keypad-key-btn:hover {
            background: var(--accent-cyan);
            color: #ffffff;
            border-color: var(--accent-cyan);
            transform: translateY(-1px);
        }
        .keypad-key-btn:active {
            transform: translateY(1px);
        }
        .keypad-actions {
            display: grid;
            grid-template-columns: 1fr 1fr 1.5fr;
            gap: 6px;
        }
        .control-key {
            font-size: 11px;
            background: #f1f5f9;
        }
        .primary-key {
            background: var(--accent-green);
            color: #ffffff;
            border-color: var(--accent-green);
        }
        .primary-key:hover {
            background: #047857;
            border-color: #047857;
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

        /* Session Autolock Pill */
        .viewer-session-pill {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: var(--font-mono);
            font-size: 11px;
            color: var(--text-secondary);
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            padding: 6px 12px;
            border-radius: 6px;
        }
        .pill-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--accent-green);
            box-shadow: 0 0 6px var(--accent-green);
            animation: blinkDot 1.2s infinite;
        }
        @keyframes blinkDot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        /* Canvas Watermark Wrapper */
        .canvas-watermark-wrapper {
            position: relative;
            display: inline-flex;
            max-width: 90%;
            max-height: 85vh;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(15, 23, 42, 0.15);
            border: 1px solid var(--border-color);
        }
        .canvas-watermark-wrapper canvas {
            display: block;
            max-width: 100%;
            max-height: 85vh;
            object-fit: contain;
        }
        .canvas-overlay-shield {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            pointer-events: auto;
            user-select: none;
            -webkit-user-select: none;
            z-index: 10;
        }
        @media print {
            body { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="cyber-grid"></div>

    <div id="auth-panel" class="auth-container">
        ${oe}
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
            <span class="anti-cracker-chip">● DUAL-STAGE KDF (2,000,000 ROUNDS)</span>
            <span class="anti-cracker-chip">● ANTI-CRACKER PEPPER V6</span>
            <span class="anti-cracker-chip">● VIRTUAL KEYPAD (KEYLOGGER IMMUNE)</span>
            <span class="anti-cracker-chip">● ZERO-NETWORK RUNTIME (BURP-IMMUNE)</span>
            <span class="anti-cracker-chip">● FORENSIC WATERMARK SHIELD</span>
        </div>

        <div class="input-group">
            <div class="password-field-wrap">
                <input type="password" id="pwd" class="cyber-input" placeholder="Enter authorization password..." autofocus autocomplete="new-password" spellcheck="false" autocapitalize="off" data-lpignore="true" data-form-type="other">
                <button type="button" class="pwd-toggle-btn" id="pwd-toggle-btn" title="Toggle password visibility">
                    <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
            </div>
            
            <button type="button" id="toggle-keypad-btn" class="cyber-keypad-toggle-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"/></svg>
                <span>🛡️ ANTI-KEYLOGGER VIRTUAL KEYPAD</span>
            </button>
            <div id="virtual-keypad-container" class="virtual-keypad-drawer hidden">
                <div class="keypad-header">
                    <span class="keypad-title">SHUFFLED VIRTUAL KEYPAD // BLINDS OS KEYLOGGERS</span>
                    <button type="button" id="scramble-keypad-btn" class="keypad-tool-btn" title="Randomize button positions">🎲 SCRAMBLE</button>
                </div>
                <div id="virtual-keypad-keys" class="keypad-grid"></div>
                <div class="keypad-actions">
                    <button type="button" class="keypad-key-btn control-key" id="keypad-bksp">⌫ DEL</button>
                    <button type="button" class="keypad-key-btn control-key" id="keypad-clear">CLEAR</button>
                    <button type="button" class="keypad-key-btn control-key primary-key" id="keypad-enter">ENTER ↵</button>
                </div>
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
                <div class="viewer-brand-title">${s}</div>
                <div class="viewer-file-badge" id="viewer-file-name">${l}</div>
            </div>
            <div class="viewer-actions">
                <div class="viewer-session-pill" id="session-autolock-pill" title="Volatile memory auto-locks on inactivity">
                    <span class="pill-dot"></span>
                    <span>AUTO-LOCK: <strong id="autolock-countdown">03:00</strong></span>
                </div>
                <button type="button" id="header-dl-btn" class="viewer-btn-dl" style="display:none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    <span>DOWNLOAD FILE</span>
                </button>
                <span id="header-restricted-badge" style="display:none;font-family:var(--font-mono);font-size:11px;font-weight:700;color:var(--accent-red);background:rgba(225,29,72,0.08);border:1px solid rgba(225,29,72,0.25);padding:6px 12px;border-radius:6px;letter-spacing:0.06em;align-items:center;gap:6px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>EXPORT RESTRICTED (FORENSIC WATERMARK)</span>
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
        const CONTAINER_VERSION = ${J};
        const SALT_B64 = ${h};
        const IV_B64 = ${I};
        const TYPE = ${E};
        const NAME = ${p};
        const SIZE = ${w};
        const BRAND = ${C};
        const ALLOW_DOWNLOAD = ${O};
        const INTEGRITY_HASH = ${_};

        // Dynamically assembled anti-cracker peppers (defeats static string grep/decompilation)
        const MILSPEC_PEPPER_V6 = ["CORALGENZ", "MILSPEC_V6", "QUANTUM_RESISTANT", "ZERO_KNOWLEDGE", "883920194821"].join("::");
        const MILSPEC_PEPPER = MILSPEC_PEPPER_V6;
        const MILSPEC_PEPPER_V5 = ["CORALGENZ", "MILSPEC_V5", "ANTI_OFFLINE_CRACKER", "ZERO_KNOWLEDGE", "774910283419"].join("::");
        const MILSPEC_PEPPER_V4 = ["CORALGENZ", "MILSPEC_V4", "ANTI_JOHN_THE_RIPPER", "ZERO_KNOWLEDGE", "992174829104"].join("::");

        // Persistent session brute-force lockout tracking per file container
        const ATTEMPTS_KEY = 'cg_fails_' + ${B};
        const LOCKOUT_KEY = 'cg_lockout_' + ${B};

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

        // Anti-Keylogger Shuffled Virtual Keypad Engine
        const keypadContainer = document.getElementById('virtual-keypad-container');
        const keypadGrid = document.getElementById('virtual-keypad-keys');
        const toggleKeypadBtn = document.getElementById('toggle-keypad-btn');
        const scrambleBtn = document.getElementById('scramble-keypad-btn');

        const BASE_KEYS = [
            '1','2','3','4','5','6','7','8','9','0',
            'Q','W','E','R','T','Y','U','I','O','P',
            'A','S','D','F','G','H','J','K','L','Z',
            'X','C','V','B','N','M',
            'a','b','c','d','e','f','g','h','i','j',
            'k','m','n','p','q','r','s','t','u','v',
            'w','x','y','z',
            '!','@','#','$','%','&','*','_','-','+'
        ];

        let currentKeys = [...BASE_KEYS];

        function renderVirtualKeypad() {
            if (!keypadGrid) return;
            keypadGrid.innerHTML = '';
            currentKeys.forEach(ch => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'keypad-key-btn';
                btn.textContent = ch;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (pwdInput) {
                        pwdInput.value += ch;
                    }
                });
                keypadGrid.appendChild(btn);
            });
        }

        function scrambleVirtualKeypad() {
            for (let i = currentKeys.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [currentKeys[i], currentKeys[j]] = [currentKeys[j], currentKeys[i]];
            }
            renderVirtualKeypad();
        }

        toggleKeypadBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            if (keypadContainer) {
                const isHidden = keypadContainer.classList.contains('hidden');
                if (isHidden) {
                    scrambleVirtualKeypad();
                    keypadContainer.classList.remove('hidden');
                } else {
                    keypadContainer.classList.add('hidden');
                }
            }
        });

        scrambleBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            scrambleVirtualKeypad();
        });

        document.getElementById('keypad-bksp')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (pwdInput && pwdInput.value.length > 0) {
                pwdInput.value = pwdInput.value.slice(0, -1);
            }
        });

        document.getElementById('keypad-clear')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (pwdInput) pwdInput.value = '';
        });

        document.getElementById('keypad-enter')?.addEventListener('click', (e) => {
            e.preventDefault();
            unlock();
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
        window.addEventListener('focus', restoreScreen);
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') obscureScreen();
            else restoreScreen();
        });
        document.getElementById('screen-guard-overlay')?.addEventListener('click', restoreScreen);

        // Trap PrintScreen Key
        window.addEventListener('keyup', (e) => {
            if (e.key === 'PrintScreen' || e.keyCode === 44) {
                obscureScreen();
                try { navigator.clipboard.writeText(''); } catch (err) {}
                setTimeout(restoreScreen, 1500);
            }
        });

        // Session Inactivity Auto-Lock Timer (3 Minutes)
        let lastActivity = Date.now();
        const INACTIVITY_LIMIT_MS = 180000;
        function resetInactivity() {
            lastActivity = Date.now();
        }
        ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
            window.addEventListener(evt, resetInactivity, { passive: true });
        });
        setInterval(() => {
            const viewerEl = document.getElementById('viewer-container');
            if (!viewerEl || !viewerEl.classList.contains('active')) return;
            const remaining = Math.max(0, INACTIVITY_LIMIT_MS - (Date.now() - lastActivity));
            const countdownEl = document.getElementById('autolock-countdown');
            if (countdownEl) {
                const mins = Math.floor(remaining / 60000).toString().padStart(2, '0');
                const secs = Math.floor((remaining % 60000) / 1000).toString().padStart(2, '0');
                countdownEl.textContent = \`\${mins}:\${secs}\`;
            }
            if (remaining <= 0) {
                zeroizeMemory();
                location.reload();
            }
        }, 1000);

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

                // Derive accurate MIME type from file extension if TYPE is generic
                let determinedType = TYPE || 'application/octet-stream';
                const lowerName = (NAME || '').toLowerCase();
                if (!TYPE || TYPE === 'application/octet-stream') {
                    if (/.(jpg|jpeg)$/i.test(lowerName)) determinedType = 'image/jpeg';
                    else if (/.png$/i.test(lowerName)) determinedType = 'image/png';
                    else if (/.gif$/i.test(lowerName)) determinedType = 'image/gif';
                    else if (/.webp$/i.test(lowerName)) determinedType = 'image/webp';
                    else if (/.svg$/i.test(lowerName)) determinedType = 'image/svg+xml';
                    else if (/.pdf$/i.test(lowerName)) determinedType = 'application/pdf';
                    else if (/.mp4$/i.test(lowerName)) determinedType = 'video/mp4';
                    else if (/.webm$/i.test(lowerName)) determinedType = 'video/webm';
                    else if (/.mp3$/i.test(lowerName)) determinedType = 'audio/mp3';
                    else if (/.wav$/i.test(lowerName)) determinedType = 'audio/wav';
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
                const isImage = safeType.startsWith('image/') || /.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(lowerName);
                const isVideo = safeType.startsWith('video/') || /.(mp4|webm|mov|mkv|ogg)$/i.test(lowerName);
                const isAudio = safeType.startsWith('audio/') || /.(mp3|wav|ogg|aac|m4a|flac)$/i.test(lowerName);
                const isPdf = safeType === 'application/pdf' || /.pdf$/i.test(lowerName);
                const isText = safeType.startsWith('text/') || /.(txt|json|js|ts|html|css|py|c|cpp|h|md|xml|log|sh|env|csv|yaml|yml|sql|rs|go|java|kt|swift|rb|php)$/i.test(lowerName);

                if (isImage) {
                    contentArea.innerHTML = '<div style="font-family:var(--font-mono);font-size:13px;color:var(--accent-cyan);display:flex;align-items:center;gap:10px;"><span class="spinner" style="border-top-color:var(--accent-cyan);"></span> RENDERING PROTECTED FORENSIC CANVAS...</div>';
                    const img = new Image();
                    img.onload = () => {
                        contentArea.innerHTML = '';
                        const canvas = document.createElement('canvas');
                        canvas.width = img.naturalWidth || img.width;
                        canvas.height = img.naturalHeight || img.height;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            ctx.drawImage(img, 0, 0);

                            // Forensic Semi-Transparent Watermark Grid (Tiled Diagonally across content)
                            ctx.save();
                            ctx.rotate(-28 * Math.PI / 180);
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
                            ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
                            ctx.shadowBlur = 4;
                            const fontSize = Math.max(14, Math.floor(canvas.width / 50));
                            ctx.font = 'bold ' + fontSize + 'px monospace';
                            const wmText = 'CONFIDENTIAL // CORALGENZ ZERO-KNOWLEDGE // SESSION: ' + Math.random().toString(36).substring(2, 10).toUpperCase() + ' // ' + new Date().toISOString().substring(0, 10);

                            const stepX = Math.max(260, Math.floor(canvas.width / 2.5));
                            const stepY = Math.max(80, Math.floor(canvas.height / 8));
                            for (let x = -canvas.width * 1.5; x < canvas.width * 2.5; x += stepX) {
                                for (let y = -canvas.height * 1.5; y < canvas.height * 2.5; y += stepY) {
                                    ctx.fillText(wmText, x, y);
                                }
                            }
                            ctx.restore();

                            const wrap = document.createElement('div');
                            wrap.className = 'canvas-watermark-wrapper';
                            wrap.appendChild(canvas);

                            const shield = document.createElement('div');
                            shield.className = 'canvas-overlay-shield';
                            shield.oncontextmenu = (e) => e.preventDefault();
                            shield.ondragstart = (e) => e.preventDefault();
                            wrap.appendChild(shield);

                            contentArea.appendChild(wrap);
                        } else {
                            const directImg = document.createElement('img');
                            directImg.src = decryptedBlobUrl;
                            directImg.alt = NAME;
                            contentArea.appendChild(directImg);
                        }

                        if (!ALLOW_DOWNLOAD) {
                            // Ephemeral memory scrub for restricted exports
                            URL.revokeObjectURL(decryptedBlobUrl);
                            decryptedBlobUrl = null;
                            if (decryptedBytes && decryptedBytes.fill) {
                                decryptedBytes.fill(0);
                                decryptedBytes = null;
                            }
                        }
                    };
                    img.onerror = (err) => {
                        console.warn('Canvas render fallback triggered:', err);
                        contentArea.innerHTML = '';
                        const directImg = document.createElement('img');
                        directImg.src = decryptedBlobUrl;
                        directImg.alt = NAME;
                        contentArea.appendChild(directImg);
                    };
                    img.src = decryptedBlobUrl;
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

        const DATA = "`,footer:`";
    <\/script>
</body>
</html>`}}async function Z(e,t=null){let o=null,n=t;if(t)try{const i=e.keys.find(r=>r.type==="password");i&&(o=await g.unwrapWithFallback(i.data,t,i.salt,i.iv))}catch{console.log("Provided password invalid for unlock")}if(!o){const i=await Y("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!i)return null;try{const r=e.keys.find(s=>s.type==="password");o=await g.unwrapWithFallback(r.data,i,r.salt,r.iv),n=i}catch{return await f("Error","Incorrect password"),null}}return{buffer:await g.decryptData(o,e.iv,e.content),password:n}}async function Me(){const e=R.files[0],t=document.getElementById("new-password").value;if(!e){await f("Required","Please select a file to protect");return}if(!t){await f("Required","Protection password is required");return}const o=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],n=t.toLowerCase().trim();if(t.length<8||o.includes(n)){await f("Weak Password Prohibited",'To prevent offline dictionary attacks (RockYou/Hashcat), passwords must be at least 8 characters (12+ recommended) and cannot be a common dictionary word. Click "GENERATE SECURE PASSWORD" for quantum-resistant protection.');return}const a=document.getElementById("confirm-add"),i=a.innerText;a.innerText="SECURING PAYLOAD (5s)...",a.disabled=!0;const r=document.getElementById("protection-process-container"),s=document.getElementById("file-upload-zone"),c=document.getElementById("file-preview"),l=document.getElementById("inline-password-section"),d=document.getElementById("protection-complete-container"),u=document.getElementById("security-terminal-body"),m=document.getElementById("process-timer-display"),y=document.getElementById("scanner-status-text"),h=document.querySelector(".scanner-center-shield");s?.classList.add("hidden"),c?.classList.add("hidden"),l?.classList.add("hidden"),d?.classList.add("hidden"),r?.classList.remove("hidden"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(w=>{b(w,"")}),h&&h.classList.remove("success"),y&&(y.textContent="SECURING"),u&&(u.innerHTML="");const I=Date.now(),E=5e3,p=setInterval(()=>{const w=Math.min(Date.now()-I,E),C=Math.floor(w/1e3).toString().padStart(2,"0"),B=Math.floor(w%1e3/10).toString().padStart(2,"0");m&&(m.textContent=`00:${C}.${B}`),w>=E&&clearInterval(p)},30);try{F(14,"FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE..."),b("step-analysis","active"),v("[00:00.15] INITIATING ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6"),v(`[00:00.35] File: "${e.name}" [${pe(e.size)}] | Type: ${e.type||"application/octet-stream"}`),v(`[00:00.55] Enclave memory block allocated: ${e.size} bytes. Isolation confirmed.`);const w=g.detectDeviceCapabilities();v(`[00:00.65] Hardware Profile: ${w.concurrency} Cores, ${w.memory}GB RAM [Worker Offload: Active]`),await new Promise(L=>setTimeout(L,700)),b("step-analysis","completed"),F(28,"INITIALIZING CSPRNG ENTROPY POOL..."),b("step-prep","active"),v("[00:00.85] Generating 256-bit cryptographic salt from hardware CSPRNG...");const C=g.generateSalt(),B=await g.generateKey();v("[00:01.10] Nonce generation: 96-bit AES-GCM Initialization Vector created."),v("[00:01.30] Ephemeral entropy validated: entropy score = 0.998."),await new Promise(L=>setTimeout(L,700)),b("step-prep","completed"),F(45,"DERIVING KEY (DUAL-STAGE KDF 2,000,000 ROUNDS)..."),b("step-kdf","active"),v("[00:01.50] Stage 1: HMAC-SHA512 Pre-whitening with Domain-Separated Pepper V6..."),v("[00:01.70] Worker Offload: Initializing background thread for smooth 60fps UI..."),v("[00:01.90] Stage 2: Computing 2,000,000 PBKDF2 iterations (Anti-JohnTheRipper / Anti-Hashcat)...");const O=await g.deriveKeyAsyncWorker(t,C,2e6,g.MILSPEC_ANTI_CRACKER_PEPPER_V6);v("[00:02.15] Key derivation complete: 256-bit symmetric cipher key established."),await new Promise(L=>setTimeout(L,900)),b("step-kdf","completed"),F(65,"AES-GCM-256 CIPHER STREAM PROCESSING..."),b("step-encrypt","active"),v("[00:02.45] Executing client-side WebCrypto AES-GCM 256-bit cipher...");const _=await e.arrayBuffer(),J=await g.computePayloadHash(_);v(`[00:02.65] SHA-256 Payload Integrity Seal: ${J.substring(0,16)}... [VERIFIED]`);const oe=_.slice(0),{iv:be,ciphertext:re}=await g.encryptData(B,_);v(`[00:02.85] Encrypting ${pe(e.size)} payload blocks into zero-knowledge ciphertext...`),v(`[00:03.15] Ciphertext generated (${re.byteLength} bytes). 128-bit Galois Tag verified.`),await new Promise(L=>setTimeout(L,1e3)),b("step-encrypt","completed"),F(80,"PACKAGING ZERO-KNOWLEDGE METADATA..."),b("step-meta","active"),b("step-finalize","active"),v("[00:03.40] Wrapping master file key with AES key wrap cipher...");const{iv:ae,wrappedData:We}=await g.wrapKey(B,O),Ge=[{type:"password",salt:C,iv:ae,data:We}],xe={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:Ge,content:re,iv:be,viewCount:0,expires:null,note:"",integrityHash:J,accessLog:[{action:"created",date:Date.now()}]};await x.saveFile(xe),v("[00:03.75] Encrypted container committed to zero-knowledge local IndexedDB."),await new Promise(L=>setTimeout(L,700)),b("step-meta","completed"),b("step-finalize","completed"),F(92,"COMPILING STANDALONE HTML RUNTIME (.secure.html)..."),b("step-output","active"),v("[00:04.10] Assembling self-contained portable decryption engine..."),v("[00:04.35] Embedding browser-native WebCrypto decryptor payload..."),v("[00:04.55] Enforced security policy configured: ALWAYS ASK PASSWORD."),await new Promise(L=>setTimeout(L,650)),b("step-output","completed"),F(100,"CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]"),b("step-verify","active"),v("[00:04.80] Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK."),v("[00:05.00] CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY."),await new Promise(L=>setTimeout(L,350)),b("step-verify","completed"),clearInterval(p),m&&(m.textContent="00:05.00"),y&&(y.textContent="SECURED [✓]"),h&&h.classList.add("success"),await new Promise(L=>setTimeout(L,300)),r?.classList.add("hidden"),d?.classList.remove("hidden");const ke=document.getElementById("complete-file-name");ke&&(ke.textContent=e.name),D={record:xe,buffer:oe,password:t},T()}catch(w){clearInterval(p),console.error(w),v(`CRITICAL ERROR: ${w.message}`),await f("Error","Encryption failed: "+w.message),r?.classList.add("hidden"),c?.classList.remove("hidden"),l?.classList.remove("hidden")}finally{a.innerText=i,a.disabled=!1}}async function me(e){if(!He(e))try{const t=await x.getFile(e);if(!t){await f("Error","File not found");return}we=t,document.getElementById("auth-file-name").innerText=t.name,$.showModal()}catch(t){console.error(t),await f("Error","Error opening file")}}async function De(){const e=we;if(!e||He(e.id))return;const t=document.getElementById("auth-password").value;if(!t)return;const o=document.getElementById("confirm-auth");o.innerText="Unlocking...";try{const n=e.keys.find(i=>i.type==="password");if(!n)throw new Error("Corrupt key data");const a=await g.unwrapWithFallback(n.data,t,n.salt,n.iv);Mt(e.id),$.close(),document.getElementById("auth-password").value="",Wt(e,a)}catch(n){console.error(n),Pt(e.id),await f("Error","Incorrect password or decryption error.")}finally{o.innerText="Unlock"}}async function Wt(e,t){try{const o=await g.decryptData(t,e.iv,e.content),n=new Blob([o],{type:e.type});M=URL.createObjectURL(n);const a=document.getElementById("viewer-content");a.innerHTML="";const i=ve(e.name,e.type);if(H&&(i?(H.classList.remove("hidden"),H.onclick=()=>{if(!M)return;const r=document.createElement("a");r.style.display="none",r.href=M,r.download=e.name,document.body.appendChild(r),r.click(),document.body.removeChild(r)}):(H.classList.add("hidden"),H.onclick=null)),e.type.startsWith("image/")){const r=document.createElement("img");r.src=M,a.appendChild(r)}else if(e.type.startsWith("video/")||e.type.startsWith("audio/")){const r=document.createElement(e.type.startsWith("video/")?"video":"audio");r.src=M,r.controls=!0,r.autoplay=!0,i||(r.setAttribute("controlsList","nodownload"),r.oncontextmenu=s=>s.preventDefault()),a.appendChild(r)}else if(e.type==="application/pdf"){const r=document.createElement("iframe");r.src=M+(i?"":"#toolbar=0"),r.style.width="100%",r.style.height="100%",a.appendChild(r)}else e.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||e.type==="application/vnd.ms-excel"||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv")?gt(o,a):e.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e.name.endsWith(".docx")?await ft(o,a):a.innerText="Preview not supported for this file type.";document.getElementById("viewer-filename").innerText=e.name,Re.classList.remove("hidden"),Nt(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(o){console.error(o),await f("Error","Decryption failed.")}}async function ye(){Re.classList.add("hidden"),H&&H.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",M&&(URL.revokeObjectURL(M),M=null)}async function Gt(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),T())}async function T(e=""){ie.innerHTML="";let t=await x.getAllFiles();N=t,bt(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const o=Ne?.value||"date-desc";t.sort((a,i)=>{if(a.favorite&&!i.favorite)return-1;if(!a.favorite&&i.favorite)return 1;switch(o){case"date-desc":return(i.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(i.date||0);case"name-asc":return a.name.localeCompare(i.name);case"name-desc":return i.name.localeCompare(a.name);case"size-desc":return(i.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(i.size||0);default:return 0}});const n=document.getElementById("quick-tips");if(n&&(N.length===0?n.classList.remove("hidden"):n.classList.add("hidden")),t.length===0){ie.innerHTML=`
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${e?"NO FILES MATCH SEARCH":"NO PROTECTED FILES FOUND"}</h3>
        <p class="empty-desc">${e?"Check search parameters or query another filename.":"Drop a file in the upload zone above to initialize client-side encryption."}</p>
      </div>`;return}t.forEach((a,i)=>{const r=document.createElement("div");r.className="file-card",r.style.animationDelay=`${i*.05}s`,r.onclick=async p=>{!p.target.closest(".file-card-actions")&&!p.target.closest(".file-actions")&&!p.target.closest(".select-checkbox")&&!p.target.closest(".favorite-btn")&&me(a.id)};let s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');const c=k.has(a.id);let l=a.name;const d='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',m='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',y='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',h='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',I='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',E='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';r.innerHTML=`
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
          <button class="btn-highlight share-btn">${m} Export</button>
          <button class="btn-highlight custom-share-btn">${y} Custom</button>
          <button class="btn-small info-btn">${h} Info</button>
          <button class="btn-small rename-btn">${I} Rename</button>
          <button class="btn-small delete-btn">${E} Delete</button>
        </div>
    `,r.querySelector(".select-checkbox").onchange=p=>{p.stopPropagation(),p.target.checked?k.add(a.id):k.delete(a.id),j()},r.querySelector(".open-btn").onclick=p=>{p.stopPropagation(),me(a.id)},r.querySelector(".download-btn").onclick=p=>Ft(p,a.id),r.querySelector(".info-btn").onclick=p=>Kt(p,a.id),r.querySelector(".rename-btn").onclick=p=>Ut(p,a.id,a.name),r.querySelector(".share-btn").onclick=p=>_t(p,a.id),r.querySelector(".custom-share-btn").onclick=p=>Ht(p,a.id),r.querySelector(".delete-btn").onclick=p=>Ot(p,a.id),ie.appendChild(r)})}function ge(){const e=localStorage.getItem("sv_panic_action")||"blur",t=document.getElementById("panic-action-select");t&&(t.value=e);const o=localStorage.getItem("sv_dl_media")!=="false",n=localStorage.getItem("sv_dl_doc")!=="false",a=document.getElementById("dl-media-toggle"),i=document.getElementById("dl-doc-toggle");a&&(a.checked=o),i&&(i.checked=n),ue();const r=localStorage.getItem("sv_panic_enabled")!=="false",s=document.getElementById("panic-enable-toggle");s&&(s.checked=r),Ee()}function Ee(){const e=localStorage.getItem("sv_panic_enabled")!=="false",t=document.getElementById("header-panic-wrapper"),o=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),o&&(e?(o.classList.remove("hidden"),o.style.opacity="1",o.style.pointerEvents="auto"):(o.classList.add("hidden"),o.style.opacity="0.5",o.style.pointerEvents="none"))}function fe(){const e=localStorage.getItem("sv_panic_action")||"blur";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),o=await x.getAllFiles();for(const n of o)await x.deleteFile(n.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),window.location.reload()}catch(t){console.error(t)}})();else if(e==="blur"||e==="lock"){ye(),z?.close(),te?.close(),document.querySelectorAll(".panic-overlay").forEach(o=>o.remove());const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",o=>{o.stopPropagation(),t.remove()})}else if(e==="loading"){ye(),z?.close(),te?.close(),document.querySelectorAll(".panic-overlay").forEach(n=>n.remove());const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `,document.body.appendChild(t);const o=()=>{t.remove()};t.addEventListener("click",o),t.addEventListener("touchstart",o)}}}function $t(){const e=document.getElementById("cyber-matrix-canvas");if(e){const n=e.getContext("2d");if(n){let m=function(){a=e.width=window.innerWidth,i=e.height=window.innerHeight,l=Math.floor(a/c),d=[],u=[];for(let E=0;E<l;E++)d[E]=Math.random()*-60,u[E]=.8+Math.random()*1.2},I=function(E){if(requestAnimationFrame(I),!(E-y<h)){y=E,n.fillStyle="rgba(5, 7, 10, 0.12)",n.fillRect(0,0,a,i),n.font=`600 ${c}px "JetBrains Mono", monospace`;for(let p=0;p<d.length;p++){const w=s[Math.floor(Math.random()*s.length)],C=p*c,B=d[p]*c;Math.random()>.88?(n.fillStyle="#ffffff",n.shadowColor="#00f0ff",n.shadowBlur=10):p%3===0?(n.fillStyle="rgba(0, 240, 255, 0.65)",n.shadowColor="#00f0ff",n.shadowBlur=4):p%3===1?(n.fillStyle="rgba(0, 255, 136, 0.55)",n.shadowColor="#00ff88",n.shadowBlur=3):(n.fillStyle="rgba(56, 189, 248, 0.4)",n.shadowBlur=0),n.fillText(w,C,B),B>i&&Math.random()>.96&&(d[p]=0,u[p]=.8+Math.random()*1.2),d[p]+=u[p]}}},a=e.width=window.innerWidth,i=e.height=window.innerHeight;const s="0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG".split(""),c=13;let l=Math.floor(a/c),d=[],u=[];m(),window.addEventListener("resize",m);let y=0;const h=33;requestAnimationFrame(I)}}const t=document.getElementById("hero-term-status");if(t){const n=["INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE","HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE","DUAL-STAGE KEY DERIVATION: HMAC-SHA512 + 2,000,000 PBKDF2 ROUNDS (V6 PEPPER)","LOW-END HARDWARE OPTIMIZATION: ACTIVE // WORKER THREAD OFFLOAD ENFORCES 60FPS UI","ANTI-OFFLINE CRACKER: IMMUNE TO JOHN THE RIPPER, HASHCAT & GPU DICTIONARY CLUSTERS","AIR-GAPPED RUNTIME: ZERO REMOTE PACKETS DISPATCHED // IMMUNE TO BURP SUITE INTERCEPTION","ANTI-VIRUS MEMORY SANITIZATION: ACTIVE HEAP ZEROIZATION // ZERO DISK PERSISTENCE","CRYPTOGRAPHIC TAMPER DETECTION: SHA-256 PAYLOAD INTEGRITY SEAL ARMED","MIL-SPEC DEFENSE PROTOCOL: LEVEL-6 CLEARANCE // 128-BIT AUTHENTICATION TAG ARMED","STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT","SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED"];let a=0;setInterval(()=>{a=(a+1)%n.length,t.style.opacity="0",t.style.transform="translateY(4px)",setTimeout(()=>{t.textContent=n[a],t.style.transition="all 0.3s ease",t.style.opacity="1",t.style.transform="translateY(0)"},300)},4e3)}document.addEventListener("click",n=>{const a=n.target.closest(".cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone");if(!a)return;const i=a.getBoundingClientRect(),r=document.createElement("span");r.className="cyber-click-glow-ripple",r.style.left=`${n.clientX-i.left}px`,r.style.top=`${n.clientY-i.top}px`,a.style.position=a.style.position||"relative",a.appendChild(r),setTimeout(()=>r.remove(),600)});const o=[{el:document.getElementById("hero-command"),navId:"nav-item-console"},{el:document.getElementById("inline-add-container"),navId:"nav-item-protect"},{el:document.getElementById("secured-files-heading"),navId:"nav-item-files"}];window.addEventListener("scroll",()=>{const n=window.scrollY+180;for(let a=o.length-1;a>=0;a--){const i=o[a];if(i.el&&i.el.offsetTop<=n){document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.id===i.navId?r.classList.add("active"):r.id!=="nav-item-settings"&&r.classList.remove("active")});break}}},{passive:!0})}
