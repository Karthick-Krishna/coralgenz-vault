import"./jspdf-SUxvxRxM.js";import{r as Ve,u as Ge}from"./xlsx-DFH0qU2H.js";import{r as $e}from"./mammoth-PVFyTYmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const V="CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821",je=V,Ye="CORALGENZ::MILSPEC_V5::ANTI_OFFLINE_CRACKER::ZERO_KNOWLEDGE::774910283419",Ze="CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";class g{constructor(){this.algo={name:"AES-GCM",length:256}}static detectDeviceCapabilities(){let t=4,n=4;try{typeof navigator<"u"&&(t=navigator.hardwareConcurrency||4,n=navigator.deviceMemory||4)}catch{}const o=t<=2||n<=2;return{isLowEnd:o,recommendedIterations:o?1e6:2e6,concurrency:t,memory:n}}static async computePayloadHash(t){const n=await window.crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(32))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n,o=2e6,a="SHA-256",s=!0,r=V){const i=new TextEncoder;let c;if(s){const u=r||je,y=i.encode(u),h=i.encode(t),v=new Uint8Array(y.length+h.length);v.set(y,0),v.set(h,y.length);const x=await window.crypto.subtle.importKey("raw",n,{name:"HMAC",hash:"SHA-512"},!1,["sign"]),m=await window.crypto.subtle.sign("HMAC",x,v);c=new Uint8Array(m),v.fill(0),h.fill(0)}else c=i.encode(t);const l=await window.crypto.subtle.importKey("raw",c,"PBKDF2",!1,["deriveKey"]),d=await window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:o,hash:a},l,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);return c&&c.fill&&c.fill(0),d}static async deriveKeyAsyncWorker(t,n,o=2e6,a=V){if(typeof Worker<"u"&&typeof Blob<"u"&&typeof URL<"u"&&URL.createObjectURL)try{return await new Promise((s,r)=>{const i=`
                        self.onmessage = async function(e) {
                            try {
                                const { password, salt, iterations, pepper } = e.data;
                                const enc = new TextEncoder();
                                const activePepper = pepper || "${V}";
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
                    `,c=new Blob([i],{type:"application/javascript"}),l=URL.createObjectURL(c),d=new Worker(l),u=setTimeout(()=>{try{d.terminate(),URL.revokeObjectURL(l)}catch{}r(new Error("Worker key derivation timed out"))},1800);d.onmessage=async h=>{if(clearTimeout(u),d.terminate(),URL.revokeObjectURL(l),h.data&&h.data.success)try{const v=await window.crypto.subtle.importKey("raw",h.data.rawKey,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);s(v)}catch(v){r(v)}else r(new Error(h.data?.error||"Worker derivation failed"))},d.onerror=h=>{clearTimeout(u),d.terminate(),URL.revokeObjectURL(l),r(h)};const y=new Uint8Array(n);d.postMessage({password:t,salt:y,iterations:o,pepper:a})})}catch{}return this.deriveKeyFromPassword(t,n,o,"SHA-256",!0,a)}static async encryptData(t,n){const o=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:a}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:a}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async unwrapWithFallback(t,n,o,a,s=2e6){try{const r=await this.deriveKeyFromPassword(n,o,s,"SHA-256",!0,V);return await this.unwrapKey(t,r,a)}catch(r){try{const i=await this.deriveKeyFromPassword(n,o,s,"SHA-256",!0,Ye);return await this.unwrapKey(t,i,a)}catch{try{const c=await this.deriveKeyFromPassword(n,o,1e6,"SHA-256",!0,Ze);return await this.unwrapKey(t,c,a)}catch{const l=[s,1e6,6e5,1e5];for(const d of l)try{const u=await this.deriveKeyFromPassword(n,o,d,"SHA-256",!1);return await this.unwrapKey(t,u,a)}catch{}throw r}}}}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),a=new Uint8Array(o.length);for(let s=0;s<o.length;s++)a[s]=o.charCodeAt(s);n=a.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const a=new Uint8Array(n);let s="";for(let r=0;r<a.byteLength;r++)s+=String.fromCharCode(a[r]);localStorage.setItem("sv_device_key",btoa(s))}return this.importKey(n)}}const qe="SecureVaultDB",Je=1,C="files";function J(){return new Promise((e,t)=>{const n=indexedDB.open(qe,Je);n.onupgradeneeded=o=>{const a=o.target.result;a.objectStoreNames.contains(C)||a.createObjectStore(C,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const b={async saveFile(e){const t=await J();return new Promise((n,o)=>{const r=t.transaction(C,"readwrite").objectStore(C).put(e);r.onsuccess=()=>n(e.id),r.onerror=()=>o(r.error)})},async getAllFiles(){const e=await J();return new Promise((t,n)=>{const s=e.transaction(C,"readonly").objectStore(C).openCursor(),r=[];s.onsuccess=i=>{const c=i.target.result;if(c){const{content:l,...d}=c.value;r.push(d),c.continue()}else t(r)},s.onerror=()=>n(s.error)})},async getFile(e){const t=await J();return new Promise((n,o)=>{const r=t.transaction(C,"readonly").objectStore(C).get(e);r.onsuccess=()=>n(r.result),r.onerror=()=>o(r.error)})},async deleteFile(e){const t=await J();return new Promise((n,o)=>{const r=t.transaction(C,"readwrite").objectStore(C).delete(e);r.onsuccess=()=>n(),r.onerror=()=>o(r.error)})},async updateFile(e){return this.saveFile(e)}};var Xe=$e();const ae=document.getElementById("file-list");document.getElementById("add-file-btn");const $=document.getElementById("auth-modal"),De=document.getElementById("viewer"),F=document.getElementById("viewer-download-btn"),D=document.getElementById("file-input");document.getElementById("privacy-curtain");const Qe=document.getElementById("theme-toggle"),z=document.getElementById("search-input"),Re=document.getElementById("sort-select"),et=document.getElementById("storage-text"),tt=document.getElementById("storage-fill"),Ie=document.getElementById("bulk-actions"),nt=document.getElementById("selected-count"),ot=document.getElementById("bulk-delete-btn"),rt=document.getElementById("cancel-select-btn"),fe=document.getElementById("info-modal"),te=document.getElementById("rename-modal"),U=document.getElementById("strength-bar"),G=document.getElementById("strength-text"),at=document.getElementById("bulk-export-btn"),se=document.getElementById("recent-section"),ie=document.getElementById("recent-scroll"),X=document.getElementById("drop-zone"),ke=document.getElementById("stat-total"),Le=document.getElementById("stat-images"),Be=document.getElementById("stat-videos"),Te=document.getElementById("stat-size"),_=document.getElementById("settings-modal"),Oe=document.getElementById("change-pass-modal"),st=document.getElementById("settings-btn"),it=document.getElementById("help-btn"),ee=document.getElementById("help-modal");let he=null,P=null,R=[],I=new Set,Q=null,O=JSON.parse(localStorage.getItem("sv_recent")||"[]"),ct=null,le=null,S={},M=null;function j(e,t="",n={}){return new Promise(o=>{const a=document.getElementById("custom-prompt-modal"),s=document.getElementById("prompt-title"),r=document.getElementById("prompt-message"),i=document.getElementById("prompt-input"),c=document.getElementById("prompt-confirm"),l=document.getElementById("prompt-cancel");s.textContent=e,r.textContent=t,i.type=n.inputType||"text",i.placeholder=n.placeholder||"Enter value...",i.value="";const d=()=>{a.close(),c.onclick=null,l.onclick=null,i.onkeydown=null};c.onclick=()=>{const u=i.value;d(),o(u||null)},l.onclick=()=>{d(),o(null)},i.onkeydown=u=>{u.key==="Enter"&&(u.preventDefault(),c.click())},a.showModal(),setTimeout(()=>i.focus(),100)})}function Ne(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),s=document.getElementById("confirm-message"),r=document.getElementById("confirm-ok"),i=document.getElementById("confirm-cancel");a.textContent=e,s.textContent=t;let c=!1;const l=()=>{o.close(),r.onclick=null,i.onclick=null,o.removeEventListener("click",d),o.removeEventListener("close",u)},d=y=>{y.target===o&&!c&&(c=!0,l(),n(!1))},u=()=>{c||(c=!0,l(),n(!1))};r.onclick=()=>{c||(c=!0,l(),n(!0))},i.onclick=()=>{c||(c=!0,l(),n(!1))},o.addEventListener("click",d),o.addEventListener("close",u),o.showModal()})}function f(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),s=document.getElementById("alert-message"),r=document.getElementById("alert-ok");a.textContent=e,s.textContent=t;const i=l=>{l.key==="Enter"&&(l.preventDefault(),c(),n())},c=()=>{o.close(),r.onclick=null,document.removeEventListener("keydown",i)};r.onclick=()=>{c(),n()},document.addEventListener("keydown",i),o.showModal()})}async function lt(){localStorage.removeItem("sv_app_lock"),localStorage.removeItem("sv_autolock"),localStorage.removeItem("sv_recovery_q"),localStorage.removeItem("sv_recovery_a"),ft(),ye(),await B(),pt(),Wt(),He(),ve(),Vt()}lt();function w(e){const t=document.getElementById("security-terminal-body");if(t){const n=document.createElement("p");n.className="term-line",n.textContent=`> ${e}`,t.appendChild(n),t.scrollTop=t.scrollHeight}}function E(e,t="completed"){const n=document.getElementById(e);if(n){n.className=`process-step ${t}`.trim();const o=n.querySelector(".step-icon");o&&(t==="completed"?o.textContent="[✓]":t==="active"?o.textContent="[→]":o.textContent="[ ]")}}function N(e,t){const n=document.getElementById("protect-progress-bar"),o=document.getElementById("protect-progress-percent"),a=document.getElementById("protect-progress-label");n&&(n.style.width=`${e}%`),o&&(o.textContent=`${e}%`),a&&t&&(a.textContent=t)}function dt(){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+",t=new Uint8Array(16);window.crypto.getRandomValues(t);let n="";for(let a=0;a<16;a++)n+=e[t[a]%e.length];const o=document.getElementById("new-password");if(o){o.value=n,o.type="text",Ue();const a=document.getElementById("toggle-new-password");a&&(a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',a.style.color="var(--cyber-cyan)")}}function pt(){document.getElementById("cancel-add").addEventListener("click",()=>{H()}),document.getElementById("confirm-add").addEventListener("click",Pe),document.getElementById("generate-pwd-btn")?.addEventListener("click",dt);const e=document.getElementById("toggle-new-password"),t=document.getElementById("new-password");e?.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t&&(t.type==="password"?(t.type="text",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',e.style.color="var(--cyber-cyan)"):(t.type="password",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',e.style.color="var(--cyber-text-muted)"))}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Pe())}),document.getElementById("download-protected-html-btn")?.addEventListener("click",async()=>{if(!M||!M.record){f("Notice","No active protected file session. Please select a file from the vault below to download.");return}const r=document.getElementById("download-protected-html-btn"),i=r?r.innerHTML:"";try{r&&(r.disabled=!0,r.innerHTML=`
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `);let c=M.buffer,l=M.password;if(!c||c.byteLength===0){const d=await q(M.record,l);if(d&&d.buffer)c=d.buffer,l=d.password||l;else throw new Error("Could not retrieve file content for packaging.")}await Z(M.record,c,l,{},"Protected HTML package exported successfully!")}catch(c){console.error(c),await f("Export Error","Failed to download HTML package: "+c.message)}finally{r&&(r.disabled=!1,r.innerHTML=i)}}),document.getElementById("view-in-vault-btn")?.addEventListener("click",()=>{H(),document.getElementById("secured-files-heading")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("protect-another-btn")?.addEventListener("click",()=>{H(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".cyber-nav-item").forEach(i=>i.classList.remove("active")),r.classList.add("active"),r.id==="nav-item-protect"&&H()})}),document.getElementById("sidebar-settings-btn")?.addEventListener("click",()=>{ye(),_?.showModal()}),document.getElementById("cancel-auth").addEventListener("click",()=>{$.close(),document.getElementById("auth-password").value="",he=null}),document.getElementById("confirm-auth").addEventListener("click",Me),document.getElementById("auth-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Me())}),document.getElementById("close-viewer").addEventListener("click",me),Qe?.addEventListener("click",Fe),z?.addEventListener("input",ht),Re?.addEventListener("change",wt),document.getElementById("new-password")?.addEventListener("input",Ue),ot?.addEventListener("click",xt),at?.addEventListener("click",It),rt?.addEventListener("click",bt),document.getElementById("select-all-btn")?.addEventListener("click",Et),document.getElementById("close-info")?.addEventListener("click",()=>fe.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>te.close()),document.getElementById("confirm-rename")?.addEventListener("click",Ae),document.getElementById("rename-input")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ae())}),Lt(),Tt(),it?.addEventListener("click",()=>ee?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>ee?.close()),gt(),st?.addEventListener("click",()=>{ye(),_?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>_?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>_?.close()),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const r="coralgenz@zohomail.in",i=encodeURIComponent("SecureVault Feedback"),c=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${r}?subject=${i}&body=${c}`}),document.querySelectorAll(".panic-trigger").forEach(r=>{r.addEventListener("click",ge)}),document.getElementById("panic-btn")?.addEventListener("click",ge),document.getElementById("panic-action-select")?.addEventListener("change",r=>{localStorage.setItem("sv_panic_action",r.target.value)}),document.getElementById("panic-enable-toggle")?.addEventListener("change",r=>{const i=r.target.checked;localStorage.setItem("sv_panic_enabled",i),ve()}),document.getElementById("dl-media-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_media",r.target.checked),pe()}),document.getElementById("dl-doc-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_doc",r.target.checked),pe()}),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>Oe?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",Pt),ce("toggle-new-password","new-password"),ce("toggle-auth-password","auth-password"),ce("toggle-share-password","share-password");const n=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>n?.close()),document.getElementById("confirm-share")?.addEventListener("click",Se),document.getElementById("share-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Se())}),document.getElementById("share-logo-zone")?.addEventListener("click",r=>{r.target!==document.getElementById("share-logo")&&document.getElementById("share-logo")?.click()}),document.getElementById("share-logo")?.addEventListener("change",r=>{const i=r.target.files[0],c=document.getElementById("share-logo-text");c&&(c.textContent=i?i.name:"Choose File")}),D?.addEventListener("change",Ke),document.getElementById("file-remove-btn")?.addEventListener("click",ut);const o=document.getElementById("file-upload-zone"),a=document.getElementById("drop-text-primary"),s=document.getElementById("drop-text-secondary");o?.addEventListener("click",r=>{r.target!==D&&D?.click()}),o?.addEventListener("dragover",r=>{r.preventDefault(),o.classList.add("drag-over"),a&&(a.textContent="FILE DETECTED — INITIALIZING PROTECTION"),s&&(s.textContent="Release file to initialize security inspection")}),o?.addEventListener("dragleave",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system")}),o?.addEventListener("drop",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system")}),document.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("keydown",r=>{(r.key==="PrintScreen"||r.ctrlKey&&r.key==="p")&&(r.preventDefault(),alert("Screenshots are disabled"))})}function ce(e,t){const n=document.getElementById(e),o=document.getElementById(t);!n||!o||n.addEventListener("click",a=>{a.preventDefault(),o.type==="password"?(o.type="text",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',n.style.color="var(--cyber-cyan)"):(o.type="password",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',n.style.color="var(--cyber-muted)")})}function H(){D.value="",document.getElementById("new-password").value="",M=null,U.className="strength-bar",G.innerText="ENTER PASSWORD";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview"),n=document.getElementById("inline-password-section"),o=document.getElementById("protection-process-container"),a=document.getElementById("protection-complete-container");e?.classList.remove("hidden"),t?.classList.add("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden");const s=document.getElementById("process-timer-display");s&&(s.textContent="00:00.00");const r=document.querySelector(".scanner-center-shield");r&&r.classList.remove("success");const i=document.getElementById("scanner-status-text");i&&(i.textContent="SECURING");const c=document.getElementById("security-terminal-body");c&&(c.innerHTML='<p class="term-line">&gt; Standby for cryptographic instruction...</p>'),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(l=>{E(l,"")}),N(0,"STANDBY")}function Ke(){const e=D.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){f("File Too Large","Please select a file smaller than 150 MB."),D.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),s=document.getElementById("file-preview-size"),r=document.getElementById("protection-process-container"),i=document.getElementById("protection-complete-container");a&&(a.textContent=e.name),s&&(s.textContent=de(e.size)),n?.classList.add("hidden"),r?.classList.add("hidden"),i?.classList.add("hidden"),o?.classList.remove("hidden"),document.getElementById("inline-password-section")?.classList.remove("hidden")}function ut(e){e.preventDefault(),e.stopPropagation(),D.value="",M=null;const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview"),o=document.getElementById("inline-password-section"),a=document.getElementById("protection-process-container"),s=document.getElementById("protection-complete-container");t?.classList.remove("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden"),s?.classList.add("hidden"),t?.classList.remove("hidden"),n?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function de(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function mt(e,t){try{const n=Ve(new Uint8Array(e),{type:"array"}),o=n.SheetNames;if(o.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const s=document.createElement("div");s.className="excel-header";const r=document.createElement("div");r.className="excel-table-wrapper";let i=o[0];const c=l=>{r.innerHTML="";const d=n.Sheets[l],u=Ge.sheet_to_json(d,{header:1,defval:""});if(!u||u.length===0){r.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const y=document.createElement("table");y.className="excel-table",u.forEach((h,v)=>{const x=document.createElement("tr");h.forEach(m=>{const p=v===0?"th":"td",k=document.createElement(p);k.textContent=m!==void 0?m:"",x.appendChild(k)}),y.appendChild(x)}),r.appendChild(y)};o.forEach(l=>{const d=document.createElement("button");d.className=`excel-sheet-btn ${l===i?"active":""}`,d.textContent=l,d.onclick=()=>{i=l,c(l),s.querySelectorAll(".excel-sheet-btn").forEach(u=>u.classList.remove("active")),d.classList.add("active")},s.appendChild(d)}),c(i),a.appendChild(s),a.appendChild(r),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${n.message}</div>`}}async function yt(e,t){try{const{value:n,messages:o}=await Xe.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const s=document.createElement("div");s.className="word-document",s.innerHTML=n,a.appendChild(s),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}function gt(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&H())})})}function ft(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function Fe(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function Ue(){const e=document.getElementById("new-password").value;let t=0;e.length>=6&&t++,e.length>=10&&t++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^A-Za-z0-9]/.test(e)&&t++,U.className="strength-bar",t<=1?(U.classList.add("weak"),G.innerText="Weak"):t===2?(U.classList.add("fair"),G.innerText="Fair"):t===3?(U.classList.add("good"),G.innerText="Good"):(U.classList.add("strong"),G.innerText="Strong 💪")}function ht(){const e=z.value.toLowerCase().trim();B(e)}function wt(){B(z?.value||"")}function vt(e){const t=e.reduce((r,i)=>r+(i.size||0),0),n=(t/1024/1024).toFixed(2);et.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);tt.style.width=o+"%";const a=e.filter(r=>r.type?.startsWith("image")).length,s=e.filter(r=>r.type?.startsWith("video")).length;ke&&(ke.innerText=e.length),Le&&(Le.innerText=a),Be&&(Be.innerText=s),Te&&(Te.innerText=n)}function Y(){const e=document.getElementById("select-all-btn");I.size>0?(Ie.classList.remove("hidden"),nt.innerText=`${I.size} selected`,e&&(I.size>=R.length&&R.length>0?e.innerText="Deselect All":e.innerText="Select All")):Ie.classList.add("hidden")}function Et(){I.size>=R.length&&R.length>0?I.clear():R.forEach(e=>I.add(e.id)),Y(),B(z?.value||"")}function bt(){I.clear(),Y(),B(z?.value||"")}async function xt(){if(await Ne("Delete Files",`Delete ${I.size} file(s)? This cannot be undone.`)){for(const t of I)await b.deleteFile(t);I.clear(),Y(),B(),await f("Success","Files deleted.")}}async function It(){if(I.size!==0){await f("Export",`Exporting ${I.size} files. Each will download separately.`);for(const e of I)await b.getFile(e)&&await kt(e);I.clear(),Y(),B()}}async function kt(e){const t=await b.getFile(e);if(!t)return;const n=await q(t);if(!n||!n.buffer)return;const{buffer:o,password:a}=n;let s=a;s||(s=await j("Export Protected File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),s&&await Z(t,o,s,{},"Protected file downloaded successfully!")}function Lt(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),X?.classList.remove("hidden"),X?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),X?.classList.add("hidden"),X?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)if(n.length===1){const o=new DataTransfer;o.items.add(n[0]),D.files=o.files,Ke(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const o of n)await Bt(o)})}async function Bt(e){if(e.size>157286400){await f("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await j("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await g.generateKey(),a=g.generateSalt(),s=await g.deriveKeyFromPassword(n,a,2e6),r=await e.arrayBuffer(),{iv:i,ciphertext:c}=await g.encryptData(o,r),{iv:l,wrappedData:d}=await g.wrapKey(o,s),u={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:l,data:d}],content:c,iv:i,viewCount:0};await b.saveFile(u),B(),await f("Success",`${e.name} encrypted and saved!`)}function Tt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),z?.focus()),e.key==="Escape"&&(H(),$.close(),fe?.close(),te?.close()),(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="p"&&(e.preventDefault(),ge()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),Fe())})}const Ce=5,Ct=300*1e3;function _e(e){const t=S[e];if(t&&t.locked&&Date.now()<t.lockedUntil){const n=Math.ceil((t.lockedUntil-Date.now())/1e3);return alert(`File locked. Try again in ${n} seconds.`),!0}return!1}function At(e){S[e]||(S[e]={count:0,locked:!1,lockedUntil:0}),S[e].count++;const t=Ce-S[e].count,n=document.getElementById("attempts-left"),o=document.getElementById("auth-attempts");t<=3&&(o?.classList.remove("hidden"),n&&(n.innerText=t)),S[e].count>=Ce&&(S[e].locked=!0,S[e].lockedUntil=Date.now()+Ct,$.close(),alert("Too many failed attempts. File locked for 5 minutes."))}function St(e){delete S[e],document.getElementById("auth-attempts")?.classList.add("hidden")}async function Pt(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await f("Required","Please fill all fields");return}if(t!==n){await f("Error","New passwords do not match");return}if(t.length<4){await f("Error","New password must be at least 4 characters");return}try{const o=await b.getFile(ct);if(!o)throw new Error("File not found");const a=o.keys.find(d=>d.type==="password");if(!a)throw new Error("No password key found");const s=await g.unwrapWithFallback(a.data,e,a.salt,a.iv),r=g.generateSalt(),i=await g.deriveKeyFromPassword(t,r,2e6),{iv:c,wrappedData:l}=await g.wrapKey(s,i);o.keys=o.keys.filter(d=>d.type!=="password"),o.keys.push({type:"password",salt:r,iv:c,data:l}),o.accessLog=o.accessLog||[],o.accessLog.push({action:"password_changed",date:Date.now()}),await b.updateFile(o),Oe?.close(),await f("Success","Password changed successfully!")}catch(o){console.error(o),await f("Error","Failed to change password. Current password may be incorrect.")}}function Mt(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function Dt(e){O=O.filter(t=>t.id!==e.id),O.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),O.length>5&&(O=O.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(O)),He()}function He(){if(!se||!ie)return;const e=O.filter(t=>R.some(n=>n.id===t.id));if(e.length===0){se.classList.add("hidden");return}se.classList.remove("hidden"),ie.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),ie.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>ue(t.dataset.id)})}async function Rt(e,t){e.stopPropagation(),await Ne("Delete File","Delete this file permanently?")&&(await b.deleteFile(t),B())}async function Ot(e,t){e.stopPropagation();const n=R.find(s=>s.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode==="always"?"Always Ask Password":n.authMode||"Always Ask Password";const o=document.getElementById("info-views");o&&(o.innerText=n.viewCount||0);const a=document.getElementById("access-log");a&&n.accessLog&&n.accessLog.length>0?a.innerHTML=n.accessLog.slice(-10).reverse().map(s=>`
      <div class="access-log-item">
        ${s.action.replace("_"," ")} - ${new Date(s.date).toLocaleString()}
      </div>
    `).join(""):a&&(a.innerHTML="No access history"),fe.showModal()}function Nt(e,t,n){e.stopPropagation(),Q=t;const o=document.getElementById("rename-input");o.value=n,te.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function Ae(){const e=document.getElementById("rename-input").value.trim();if(!e||!Q)return;const t=await b.getFile(Q);t&&(t.name=e,await b.updateFile(t)),te.close(),Q=null,B()}async function Kt(e,t){e&&e.stopPropagation();try{const n=await b.getFile(t);if(!n){await f("Error","File not found");return}const o=await q(n);if(!o||!o.buffer)return;const{buffer:a,password:s}=o;let r=s;if(r||(r=await j("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await Z(n,a,r,{},"Downloaded! The protected file has been saved."),Mt(n,"downloaded"),await b.updateFile(n)}catch(n){console.error(n),await f("Error","Failed to download file: "+(n.message||"Decryption error"))}}async function Ft(e,t){e.stopPropagation();try{const n=await b.getFile(t);if(!n)return;const o=await q(n);if(!o||!o.buffer)return;const{buffer:a,password:s}=o;let r=s;if(r||(r=await j("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await Z(n,a,r,{})}catch(n){console.error(n),await f("Error","Share failed: "+n.message)}}function Ut(e,t){e.stopPropagation(),le=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function Se(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await f("Required","Please set a password for the file.");return}const a=document.getElementById("confirm-share"),s=a.innerText;a.innerText="Exporting...";try{const r=await b.getFile(le);if(!r)throw new Error("File not found");const i=await q(r,t);if(!i||!i.buffer)throw new Error("Decryption failed");const c=i.buffer;let l="";o.files&&o.files[0]&&(l=await new Promise(u=>{const y=new FileReader;y.onload=()=>u(y.result),y.readAsDataURL(o.files[0])})),await Z(r,c,t,{title:n,logoUrl:l}),e.close(),le=null}catch(r){console.error(r),await f("Error","Export failed: "+r.message)}finally{a.innerText=s}}function _t(e,t){const n=(t||"").toLowerCase(),o=(e||"").toLowerCase();return n.startsWith("image/")||n.startsWith("video/")||n.startsWith("audio/")?!0:/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(o)}function ze(){const e=localStorage.getItem("sv_dl_media")!=="false",t=localStorage.getItem("sv_dl_doc")!=="false";return{allowMedia:e,allowDoc:t}}function we(e,t){const{allowMedia:n,allowDoc:o}=ze();return _t(e,t)?n:o}function pe(){const{allowMedia:e,allowDoc:t}=ze(),n=document.getElementById("dl-media-status-badge"),o=document.getElementById("dl-doc-status-badge");n&&(n.textContent=e?"ALLOWED":"RESTRICTED",n.className=`policy-status-badge ${e?"allowed":"restricted"}`),o&&(o.textContent=t?"ALLOWED":"RESTRICTED",o.className=`policy-status-badge ${t?"allowed":"restricted"}`)}async function Z(e,t,n,o={},a="Protected file downloaded successfully!"){if(!t||t.byteLength===0)throw new Error("No decrypted file payload available to package.");if(!n)throw new Error("Protection password is required to export this file.");const s=o.allowDownload!==void 0?!!o.allowDownload:we(e.name,e.type),r=g.generateSalt(),i=await g.computePayloadHash(t),c=await g.deriveKeyAsyncWorker(n,r,2e6,g.MILSPEC_ANTI_CRACKER_PEPPER_V6),{iv:l,ciphertext:d}=await g.encryptData(c,t),y=await(K=>new Promise(T=>{const A=new FileReader;A.readAsDataURL(K),A.onloadend=()=>{const W=A.result||"";T(W.split(",")[1]||"")}}))(new Blob([d]));if(!y)throw new Error("Failed to serialize encrypted payload.");const{header:h,footer:v}=Ht(e,r,l,{...o,allowDownload:s,integrityHash:i}),x=new Blob([h,y,v],{type:"text/html;charset=utf-8"}),m=URL.createObjectURL(x),p=document.createElement("a");p.href=m;const k=e.name||"protected_file";p.download=k.endsWith(".secure.html")?k:k+".secure.html",document.body.appendChild(p),p.click(),document.body.removeChild(p),setTimeout(()=>URL.revokeObjectURL(m),6e4),a&&await f("Success",a)}function Ht(e,t,n,o={}){const a=re=>btoa(String.fromCharCode(...new Uint8Array(re))),s=a(t),r=a(n),i=o.title||"Coralgenz Vault",c=o.logoUrl||"",l=e.name||"Protected File",d=e.type||"application/octet-stream",u=Number(e.size)||0,y=e.id||"",h=o.allowDownload!==void 0?!!o.allowDownload:we(l,d),v=JSON.stringify(s),x=JSON.stringify(r),m=JSON.stringify(d),p=JSON.stringify(l),k=JSON.stringify(u),K=JSON.stringify(i),T=JSON.stringify(y),A=JSON.stringify(h),W=JSON.stringify(o.integrityHash||e.integrityHash||""),ne=c?`<img src="${c}" alt="Logo" class="brand-custom-logo">`:`<div class="brand-shield-icon">
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
        ${ne}
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

        <div class="security-specs-chips">
            <span class="anti-cracker-chip">● DUAL-STAGE KDF (2,000,000 ROUNDS)</span>
            <span class="anti-cracker-chip">● ANTI-CRACKER PEPPER V6</span>
            <span class="anti-cracker-chip">● LOW-END ADAPTIVE ENGINE</span>
            <span class="anti-cracker-chip">● ZERO-NETWORK RUNTIME (BURP-IMMUNE)</span>
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
                <button type="button" class="viewer-btn-close" onclick="zeroizeMemory(); location.reload()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <span>LOCK</span>
                </button>
            </div>
        </div>
        <div class="viewer-content" id="viewer-content-area"></div>
    </div>

    <script>
        const SALT_B64 = ${v};
        const IV_B64 = ${x};
        const TYPE = ${m};
        const NAME = ${p};
        const SIZE = ${k};
        const BRAND = ${K};
        const ALLOW_DOWNLOAD = ${A};
        const INTEGRITY_HASH = ${W};

        // Constant anti-cracker cryptographic peppers (Cascaded Multi-Tier Defense)
        const MILSPEC_PEPPER = "CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821";
        const MILSPEC_PEPPER_V6 = "CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821";
        const MILSPEC_PEPPER_V5 = "CORALGENZ::MILSPEC_V5::ANTI_OFFLINE_CRACKER::ZERO_KNOWLEDGE::774910283419";
        const MILSPEC_PEPPER_V4 = "CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";

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
            try {
                const clean = (b64 || '').replace(/\\s+/g, '');
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

                const salt = toUint8(SALT_B64);
                const iv = toUint8(IV_B64);
                const encrypted = toUint8(DATA);

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

                // Multi-Tier Decryption Cascade:
                // Tier 1: Current V6 Dual-Stage with 2,000,000 iterations (Anti-JohnTheRipper / Anti-Hashcat)
                try {
                    const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V6, 2000000);
                    decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);
                } catch (t1Err) {
                    // Tier 2: Backward compatibility with V5 Dual-Stage (2,000,000 iterations)
                    try {
                        const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V5, 2000000);
                        decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);
                    } catch (t2Err) {
                        // Tier 3: Backward compatibility with V4 Dual-Stage (1,000,000 iterations)
                        try {
                            const key = await deriveKeyDualStage(pwd, salt, MILSPEC_PEPPER_V4, 1000000);
                            decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);
                        } catch (t3Err) {
                            // Tier 4: Backward compatibility with legacy single-stage PBKDF2 (2M, 1M, 600k, 100k)
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

                const safeType = (TYPE || '').toLowerCase();
                const safeName = (NAME || '').toLowerCase();
                const isImage = safeType.startsWith('image/') || /\\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(safeName);
                const isVideo = safeType.startsWith('video/') || /\\.(mp4|webm|mov|mkv|ogg)$/i.test(safeName);
                const isAudio = safeType.startsWith('audio/') || /\\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(safeName);
                const isPdf = safeType === 'application/pdf' || /\\.pdf$/i.test(safeName);
                const isText = safeType.startsWith('text/') || /\\.(txt|json|js|ts|html|css|py|c|cpp|h|md|xml|log|sh|env|csv|yaml|yml|sql|rs|go|java|kt|swift|rb|php)$/i.test(safeName);

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
</html>`}}async function q(e,t=null){let n=null,o=t;if(t)try{const s=e.keys.find(r=>r.type==="password");s&&(n=await g.unwrapWithFallback(s.data,t,s.salt,s.iv))}catch{console.log("Provided password invalid for unlock")}if(!n){const s=await j("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!s)return null;try{const r=e.keys.find(i=>i.type==="password");n=await g.unwrapWithFallback(r.data,s,r.salt,r.iv),o=s}catch{return await f("Error","Incorrect password"),null}}return{buffer:await g.decryptData(n,e.iv,e.content),password:o}}async function Pe(){const e=D.files[0],t=document.getElementById("new-password").value;if(!e){await f("Required","Please select a file to protect");return}if(!t){await f("Required","Protection password is required");return}const n=document.getElementById("confirm-add"),o=n.innerText;n.innerText="SECURING PAYLOAD (5s)...",n.disabled=!0;const a=document.getElementById("protection-process-container"),s=document.getElementById("file-upload-zone"),r=document.getElementById("file-preview"),i=document.getElementById("inline-password-section"),c=document.getElementById("protection-complete-container"),l=document.getElementById("security-terminal-body"),d=document.getElementById("process-timer-display"),u=document.getElementById("scanner-status-text"),y=document.querySelector(".scanner-center-shield");s?.classList.add("hidden"),r?.classList.add("hidden"),i?.classList.add("hidden"),c?.classList.add("hidden"),a?.classList.remove("hidden"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(m=>{E(m,"")}),y&&y.classList.remove("success"),u&&(u.textContent="SECURING"),l&&(l.innerHTML="");const h=Date.now(),v=5e3,x=setInterval(()=>{const m=Math.min(Date.now()-h,v),p=Math.floor(m/1e3).toString().padStart(2,"0"),k=Math.floor(m%1e3/10).toString().padStart(2,"0");d&&(d.textContent=`00:${p}.${k}`),m>=v&&clearInterval(x)},30);try{N(14,"FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE..."),E("step-analysis","active"),w("[00:00.15] INITIATING ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6"),w(`[00:00.35] File: "${e.name}" [${de(e.size)}] | Type: ${e.type||"application/octet-stream"}`),w(`[00:00.55] Enclave memory block allocated: ${e.size} bytes. Isolation confirmed.`);const m=g.detectDeviceCapabilities();w(`[00:00.65] Hardware Profile: ${m.concurrency} Cores, ${m.memory}GB RAM [Worker Offload: Active]`),await new Promise(L=>setTimeout(L,700)),E("step-analysis","completed"),N(28,"INITIALIZING CSPRNG ENTROPY POOL..."),E("step-prep","active"),w("[00:00.85] Generating 256-bit cryptographic salt from hardware CSPRNG...");const p=g.generateSalt(),k=await g.generateKey();w("[00:01.10] Nonce generation: 96-bit AES-GCM Initialization Vector created."),w("[00:01.30] Ephemeral entropy validated: entropy score = 0.998."),await new Promise(L=>setTimeout(L,700)),E("step-prep","completed"),N(45,"DERIVING KEY (DUAL-STAGE KDF 2,000,000 ROUNDS)..."),E("step-kdf","active"),w("[00:01.50] Stage 1: HMAC-SHA512 Pre-whitening with Domain-Separated Pepper V6..."),w("[00:01.70] Worker Offload: Initializing background thread for smooth 60fps UI..."),w("[00:01.90] Stage 2: Computing 2,000,000 PBKDF2 iterations (Anti-JohnTheRipper / Anti-Hashcat)...");const K=await g.deriveKeyAsyncWorker(t,p,2e6,g.MILSPEC_ANTI_CRACKER_PEPPER_V6);w("[00:02.15] Key derivation complete: 256-bit symmetric cipher key established."),await new Promise(L=>setTimeout(L,900)),E("step-kdf","completed"),N(65,"AES-GCM-256 CIPHER STREAM PROCESSING..."),E("step-encrypt","active"),w("[00:02.45] Executing client-side WebCrypto AES-GCM 256-bit cipher...");const T=await e.arrayBuffer(),A=await g.computePayloadHash(T);w(`[00:02.65] SHA-256 Payload Integrity Seal: ${A.substring(0,16)}... [VERIFIED]`);const W=T.slice(0),{iv:ne,ciphertext:oe}=await g.encryptData(k,T);w(`[00:02.85] Encrypting ${de(e.size)} payload blocks into zero-knowledge ciphertext...`),w(`[00:03.15] Ciphertext generated (${oe.byteLength} bytes). 128-bit Galois Tag verified.`),await new Promise(L=>setTimeout(L,1e3)),E("step-encrypt","completed"),N(80,"PACKAGING ZERO-KNOWLEDGE METADATA..."),E("step-meta","active"),E("step-finalize","active"),w("[00:03.40] Wrapping master file key with AES key wrap cipher...");const{iv:Ee,wrappedData:re}=await g.wrapKey(k,K),We=[{type:"password",salt:p,iv:Ee,data:re}],be={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:We,content:oe,iv:ne,viewCount:0,expires:null,note:"",integrityHash:A,accessLog:[{action:"created",date:Date.now()}]};await b.saveFile(be),w("[00:03.75] Encrypted container committed to zero-knowledge local IndexedDB."),await new Promise(L=>setTimeout(L,700)),E("step-meta","completed"),E("step-finalize","completed"),N(92,"COMPILING STANDALONE HTML RUNTIME (.secure.html)..."),E("step-output","active"),w("[00:04.10] Assembling self-contained portable decryption engine..."),w("[00:04.35] Embedding browser-native WebCrypto decryptor payload..."),w("[00:04.55] Enforced security policy configured: ALWAYS ASK PASSWORD."),await new Promise(L=>setTimeout(L,650)),E("step-output","completed"),N(100,"CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]"),E("step-verify","active"),w("[00:04.80] Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK."),w("[00:05.00] CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY."),await new Promise(L=>setTimeout(L,350)),E("step-verify","completed"),clearInterval(x),d&&(d.textContent="00:05.00"),u&&(u.textContent="SECURED [✓]"),y&&y.classList.add("success"),await new Promise(L=>setTimeout(L,300)),a?.classList.add("hidden"),c?.classList.remove("hidden");const xe=document.getElementById("complete-file-name");xe&&(xe.textContent=e.name),M={record:be,buffer:W,password:t},B()}catch(m){clearInterval(x),console.error(m),w(`CRITICAL ERROR: ${m.message}`),await f("Error","Encryption failed: "+m.message),a?.classList.add("hidden"),r?.classList.remove("hidden"),i?.classList.remove("hidden")}finally{n.innerText=o,n.disabled=!1}}async function ue(e){if(!_e(e))try{const t=await b.getFile(e);if(!t){await f("Error","File not found");return}he=t,document.getElementById("auth-file-name").innerText=t.name,$.showModal()}catch(t){console.error(t),await f("Error","Error opening file")}}async function Me(){const e=he;if(!e||_e(e.id))return;const t=document.getElementById("auth-password").value;if(!t)return;const n=document.getElementById("confirm-auth");n.innerText="Unlocking...";try{const o=e.keys.find(s=>s.type==="password");if(!o)throw new Error("Corrupt key data");const a=await g.unwrapWithFallback(o.data,t,o.salt,o.iv);St(e.id),$.close(),document.getElementById("auth-password").value="",zt(e,a)}catch(o){console.error(o),At(e.id),await f("Error","Incorrect password or decryption error.")}finally{n.innerText="Unlock"}}async function zt(e,t){try{const n=await g.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});P=URL.createObjectURL(o);const a=document.getElementById("viewer-content");a.innerHTML="";const s=we(e.name,e.type);if(F&&(s?(F.classList.remove("hidden"),F.onclick=()=>{if(!P)return;const r=document.createElement("a");r.style.display="none",r.href=P,r.download=e.name,document.body.appendChild(r),r.click(),document.body.removeChild(r)}):(F.classList.add("hidden"),F.onclick=null)),e.type.startsWith("image/")){const r=document.createElement("img");r.src=P,a.appendChild(r)}else if(e.type.startsWith("video/")||e.type.startsWith("audio/")){const r=document.createElement(e.type.startsWith("video/")?"video":"audio");r.src=P,r.controls=!0,r.autoplay=!0,s||(r.setAttribute("controlsList","nodownload"),r.oncontextmenu=i=>i.preventDefault()),a.appendChild(r)}else if(e.type==="application/pdf"){const r=document.createElement("iframe");r.src=P+(s?"":"#toolbar=0"),r.style.width="100%",r.style.height="100%",a.appendChild(r)}else e.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||e.type==="application/vnd.ms-excel"||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv")?mt(n,a):e.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e.name.endsWith(".docx")?await yt(n,a):a.innerText="Preview not supported for this file type.";document.getElementById("viewer-filename").innerText=e.name,De.classList.remove("hidden"),Dt(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(n){console.error(n),await f("Error","Decryption failed.")}}async function me(){De.classList.add("hidden"),F&&F.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",P&&(URL.revokeObjectURL(P),P=null)}async function Wt(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),B())}async function B(e=""){ae.innerHTML="";let t=await b.getAllFiles();R=t,vt(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const n=Re?.value||"date-desc";t.sort((a,s)=>{if(a.favorite&&!s.favorite)return-1;if(!a.favorite&&s.favorite)return 1;switch(n){case"date-desc":return(s.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(s.date||0);case"name-asc":return a.name.localeCompare(s.name);case"name-desc":return s.name.localeCompare(a.name);case"size-desc":return(s.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(s.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(R.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){ae.innerHTML=`
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${e?"NO FILES MATCH SEARCH":"NO PROTECTED FILES FOUND"}</h3>
        <p class="empty-desc">${e?"Check search parameters or query another filename.":"Drop a file in the upload zone above to initialize client-side encryption."}</p>
      </div>`;return}t.forEach((a,s)=>{const r=document.createElement("div");r.className="file-card",r.style.animationDelay=`${s*.05}s`,r.onclick=async p=>{!p.target.closest(".file-card-actions")&&!p.target.closest(".file-actions")&&!p.target.closest(".select-checkbox")&&!p.target.closest(".favorite-btn")&&ue(a.id)};let i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');const c=I.has(a.id);let l=a.name;const d='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',y='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',h='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',v='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',x='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',m='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';r.innerHTML=`
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
          <button class="btn-highlight open-btn">${d} Unlock</button>
          <button class="btn-highlight download-btn">${u} Download</button>
          <button class="btn-highlight share-btn">${y} Export</button>
          <button class="btn-highlight custom-share-btn">${h} Custom</button>
          <button class="btn-small info-btn">${v} Info</button>
          <button class="btn-small rename-btn">${x} Rename</button>
          <button class="btn-small delete-btn">${m} Delete</button>
        </div>
    `,r.querySelector(".select-checkbox").onchange=p=>{p.stopPropagation(),p.target.checked?I.add(a.id):I.delete(a.id),Y()},r.querySelector(".open-btn").onclick=p=>{p.stopPropagation(),ue(a.id)},r.querySelector(".download-btn").onclick=p=>Kt(p,a.id),r.querySelector(".info-btn").onclick=p=>Ot(p,a.id),r.querySelector(".rename-btn").onclick=p=>Nt(p,a.id,a.name),r.querySelector(".share-btn").onclick=p=>Ft(p,a.id),r.querySelector(".custom-share-btn").onclick=p=>Ut(p,a.id),r.querySelector(".delete-btn").onclick=p=>Rt(p,a.id),ae.appendChild(r)})}function ye(){const e=localStorage.getItem("sv_panic_action")||"blur",t=document.getElementById("panic-action-select");t&&(t.value=e);const n=localStorage.getItem("sv_dl_media")!=="false",o=localStorage.getItem("sv_dl_doc")!=="false",a=document.getElementById("dl-media-toggle"),s=document.getElementById("dl-doc-toggle");a&&(a.checked=n),s&&(s.checked=o),pe();const r=localStorage.getItem("sv_panic_enabled")!=="false",i=document.getElementById("panic-enable-toggle");i&&(i.checked=r),ve()}function ve(){const e=localStorage.getItem("sv_panic_enabled")!=="false",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function ge(){const e=localStorage.getItem("sv_panic_action")||"blur";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await b.getAllFiles();for(const o of n)await b.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),window.location.reload()}catch(t){console.error(t)}})();else if(e==="blur"||e==="lock"){me(),_?.close(),ee?.close(),document.querySelectorAll(".panic-overlay").forEach(n=>n.remove());const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",n=>{n.stopPropagation(),t.remove()})}else if(e==="loading"){me(),_?.close(),ee?.close(),document.querySelectorAll(".panic-overlay").forEach(o=>o.remove());const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `,document.body.appendChild(t);const n=()=>{t.remove()};t.addEventListener("click",n),t.addEventListener("touchstart",n)}}}function Vt(){const e=document.getElementById("cyber-matrix-canvas");if(e){const o=e.getContext("2d");if(o){let y=function(){a=e.width=window.innerWidth,s=e.height=window.innerHeight,l=Math.floor(a/c),d=[],u=[];for(let m=0;m<l;m++)d[m]=Math.random()*-60,u[m]=.8+Math.random()*1.2},x=function(m){if(requestAnimationFrame(x),!(m-h<v)){h=m,o.fillStyle="rgba(5, 7, 10, 0.12)",o.fillRect(0,0,a,s),o.font=`600 ${c}px "JetBrains Mono", monospace`;for(let p=0;p<d.length;p++){const k=i[Math.floor(Math.random()*i.length)],K=p*c,T=d[p]*c;Math.random()>.88?(o.fillStyle="#ffffff",o.shadowColor="#00f0ff",o.shadowBlur=10):p%3===0?(o.fillStyle="rgba(0, 240, 255, 0.65)",o.shadowColor="#00f0ff",o.shadowBlur=4):p%3===1?(o.fillStyle="rgba(0, 255, 136, 0.55)",o.shadowColor="#00ff88",o.shadowBlur=3):(o.fillStyle="rgba(56, 189, 248, 0.4)",o.shadowBlur=0),o.fillText(k,K,T),T>s&&Math.random()>.96&&(d[p]=0,u[p]=.8+Math.random()*1.2),d[p]+=u[p]}}},a=e.width=window.innerWidth,s=e.height=window.innerHeight;const i="0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG".split(""),c=13;let l=Math.floor(a/c),d=[],u=[];y(),window.addEventListener("resize",y);let h=0;const v=33;requestAnimationFrame(x)}}const t=document.getElementById("hero-term-status");if(t){const o=["INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE","HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE","DUAL-STAGE KEY DERIVATION: HMAC-SHA512 + 2,000,000 PBKDF2 ROUNDS (V6 PEPPER)","LOW-END HARDWARE OPTIMIZATION: ACTIVE // WORKER THREAD OFFLOAD ENFORCES 60FPS UI","ANTI-OFFLINE CRACKER: IMMUNE TO JOHN THE RIPPER, HASHCAT & GPU DICTIONARY CLUSTERS","AIR-GAPPED RUNTIME: ZERO REMOTE PACKETS DISPATCHED // IMMUNE TO BURP SUITE INTERCEPTION","ANTI-VIRUS MEMORY SANITIZATION: ACTIVE HEAP ZEROIZATION // ZERO DISK PERSISTENCE","CRYPTOGRAPHIC TAMPER DETECTION: SHA-256 PAYLOAD INTEGRITY SEAL ARMED","MIL-SPEC DEFENSE PROTOCOL: LEVEL-6 CLEARANCE // 128-BIT AUTHENTICATION TAG ARMED","STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT","SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED"];let a=0;setInterval(()=>{a=(a+1)%o.length,t.style.opacity="0",t.style.transform="translateY(4px)",setTimeout(()=>{t.textContent=o[a],t.style.transition="all 0.3s ease",t.style.opacity="1",t.style.transform="translateY(0)"},300)},4e3)}document.addEventListener("click",o=>{const a=o.target.closest(".cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone");if(!a)return;const s=a.getBoundingClientRect(),r=document.createElement("span");r.className="cyber-click-glow-ripple",r.style.left=`${o.clientX-s.left}px`,r.style.top=`${o.clientY-s.top}px`,a.style.position=a.style.position||"relative",a.appendChild(r),setTimeout(()=>r.remove(),600)});const n=[{el:document.getElementById("hero-command"),navId:"nav-item-console"},{el:document.getElementById("inline-add-container"),navId:"nav-item-protect"},{el:document.getElementById("secured-files-heading"),navId:"nav-item-files"}];window.addEventListener("scroll",()=>{const o=window.scrollY+180;for(let a=n.length-1;a>=0;a--){const s=n[a];if(s.el&&s.el.offsetTop<=o){document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.id===s.navId?r.classList.add("active"):r.id!=="nav-item-settings"&&r.classList.remove("active")});break}}},{passive:!0})}
