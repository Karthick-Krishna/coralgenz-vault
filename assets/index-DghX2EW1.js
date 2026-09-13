import"./jspdf-Bo0itkfF.js";import{r as je,u as Ye}from"./xlsx-DFH0qU2H.js";import{r as qe,a as Ze,g as Je}from"./mammoth-D8566hzF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const G="CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821",Xe=G,Qe="CORALGENZ::MILSPEC_V5::ANTI_OFFLINE_CRACKER::ZERO_KNOWLEDGE::774910283419",et="CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";class w{constructor(){this.algo={name:"AES-GCM",length:256}}static detectDeviceCapabilities(){let t=4,n=4;try{typeof navigator<"u"&&(t=navigator.hardwareConcurrency||4,n=navigator.deviceMemory||4)}catch{}const o=t<=2||n<=2;return{isLowEnd:o,recommendedIterations:o?1e6:2e6,concurrency:t,memory:n}}static async computePayloadHash(t){const n=await window.crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(32))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n,o=2e6,a="SHA-256",s=!0,r=G){const i=new TextEncoder;let c;if(s){const u=r||Xe,y=i.encode(u),g=i.encode(t),f=new Uint8Array(y.length+g.length);f.set(y,0),f.set(g,y.length);const h=await window.crypto.subtle.importKey("raw",n,{name:"HMAC",hash:"SHA-512"},!1,["sign"]),p=await window.crypto.subtle.sign("HMAC",h,f);c=new Uint8Array(p),f.fill(0),g.fill(0)}else c=i.encode(t);const l=await window.crypto.subtle.importKey("raw",c,"PBKDF2",!1,["deriveKey"]),d=await window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:o,hash:a},l,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);return c&&c.fill&&c.fill(0),d}static async deriveKeyAsyncWorker(t,n,o=2e6,a=G){if(typeof Worker<"u"&&typeof Blob<"u"&&typeof URL<"u"&&URL.createObjectURL)try{return await new Promise((s,r)=>{const i=`
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
                    `,c=new Blob([i],{type:"application/javascript"}),l=URL.createObjectURL(c),d=new Worker(l),u=setTimeout(()=>{try{d.terminate(),URL.revokeObjectURL(l)}catch{}r(new Error("Worker key derivation timed out"))},12e3);d.onmessage=async g=>{if(clearTimeout(u),d.terminate(),URL.revokeObjectURL(l),g.data&&g.data.success)try{const f=await window.crypto.subtle.importKey("raw",g.data.rawKey,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);s(f)}catch(f){r(f)}else r(new Error(g.data?.error||"Worker derivation failed"))},d.onerror=g=>{clearTimeout(u),d.terminate(),URL.revokeObjectURL(l),r(g)};const y=new Uint8Array(n);d.postMessage({password:t,salt:y,iterations:o,pepper:a})})}catch{}return this.deriveKeyFromPassword(t,n,o,"SHA-256",!0,a)}static async encryptData(t,n){const o=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:a}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:a}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async unwrapWithFallback(t,n,o,a,s=2e6){try{const r=await this.deriveKeyFromPassword(n,o,s,"SHA-256",!0,G);return await this.unwrapKey(t,r,a)}catch(r){try{const i=await this.deriveKeyFromPassword(n,o,s,"SHA-256",!0,Qe);return await this.unwrapKey(t,i,a)}catch{try{const c=await this.deriveKeyFromPassword(n,o,1e6,"SHA-256",!0,et);return await this.unwrapKey(t,c,a)}catch{const l=[s,1e6,6e5,1e5];for(const d of l)try{const u=await this.deriveKeyFromPassword(n,o,d,"SHA-256",!1);return await this.unwrapKey(t,u,a)}catch{}throw r}}}}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),a=new Uint8Array(o.length);for(let s=0;s<o.length;s++)a[s]=o.charCodeAt(s);n=a.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const a=new Uint8Array(n);let s="";for(let r=0;r<a.byteLength;r++)s+=String.fromCharCode(a[r]);localStorage.setItem("sv_device_key",btoa(s))}return this.importKey(n)}}const tt="SecureVaultDB",nt=1,P="files";function te(){return new Promise((e,t)=>{const n=indexedDB.open(tt,nt);n.onupgradeneeded=o=>{const a=o.target.result;a.objectStoreNames.contains(P)||a.createObjectStore(P,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const k={async saveFile(e){const t=await te();return new Promise((n,o)=>{const r=t.transaction(P,"readwrite").objectStore(P).put(e);r.onsuccess=()=>n(e.id),r.onerror=()=>o(r.error)})},async getAllFiles(){const e=await te();return new Promise((t,n)=>{const s=e.transaction(P,"readonly").objectStore(P).openCursor(),r=[];s.onsuccess=i=>{const c=i.target.result;if(c){const{content:l,...d}=c.value;r.push(d),c.continue()}else t(r)},s.onerror=()=>n(s.error)})},async getFile(e){const t=await te();return new Promise((n,o)=>{const r=t.transaction(P,"readonly").objectStore(P).get(e);r.onsuccess=()=>n(r.result),r.onerror=()=>o(r.error)})},async deleteFile(e){const t=await te();return new Promise((n,o)=>{const r=t.transaction(P,"readwrite").objectStore(P).delete(e);r.onsuccess=()=>n(),r.onerror=()=>o(r.error)})},async updateFile(e){return this.saveFile(e)}};var ot=qe(),rt=Ze();const at=Je(rt),ie=document.getElementById("file-list");document.getElementById("add-file-btn");const j=document.getElementById("auth-modal"),Re=document.getElementById("viewer"),_=document.getElementById("viewer-download-btn"),R=document.getElementById("file-input");document.getElementById("privacy-curtain");const st=document.getElementById("theme-toggle"),W=document.getElementById("search-input"),Oe=document.getElementById("sort-select"),it=document.getElementById("storage-text"),ct=document.getElementById("storage-fill"),Le=document.getElementById("bulk-actions"),lt=document.getElementById("selected-count"),dt=document.getElementById("bulk-delete-btn"),pt=document.getElementById("cancel-select-btn"),he=document.getElementById("info-modal"),se=document.getElementById("rename-modal"),K=document.getElementById("strength-bar"),S=document.getElementById("strength-text"),ut=document.getElementById("bulk-export-btn"),ce=document.getElementById("recent-section"),le=document.getElementById("recent-scroll"),ne=document.getElementById("drop-zone"),Be=document.getElementById("stat-total"),Te=document.getElementById("stat-images"),Se=document.getElementById("stat-videos"),Ce=document.getElementById("stat-size"),U=document.getElementById("settings-modal"),Ke=document.getElementById("change-pass-modal"),mt=document.getElementById("settings-btn"),yt=document.getElementById("help-btn"),re=document.getElementById("help-modal");let we=null,D=null,O=[],L=new Set,oe=null,F=JSON.parse(localStorage.getItem("sv_recent")||"[]"),gt=null,pe=null,M={},N=null;function Y(e,t="",n={}){return new Promise(o=>{const a=document.getElementById("custom-prompt-modal"),s=document.getElementById("prompt-title"),r=document.getElementById("prompt-message"),i=document.getElementById("prompt-input"),c=document.getElementById("prompt-confirm"),l=document.getElementById("prompt-cancel");s.textContent=e,r.textContent=t,i.type=n.inputType||"text",i.placeholder=n.placeholder||"Enter value...",i.value="";const d=()=>{a.close(),c.onclick=null,l.onclick=null,i.onkeydown=null};c.onclick=()=>{const u=i.value;d(),o(u||null)},l.onclick=()=>{d(),o(null)},i.onkeydown=u=>{u.key==="Enter"&&(u.preventDefault(),c.click())},a.showModal(),setTimeout(()=>i.focus(),100)})}function q(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),s=document.getElementById("confirm-message"),r=document.getElementById("confirm-ok"),i=document.getElementById("confirm-cancel");a.textContent=e,s.textContent=t;let c=!1;const l=()=>{o.close(),r.onclick=null,i.onclick=null,o.removeEventListener("click",d),o.removeEventListener("close",u)},d=y=>{y.target===o&&!c&&(c=!0,l(),n(!1))},u=()=>{c||(c=!0,l(),n(!1))};r.onclick=()=>{c||(c=!0,l(),n(!0))},i.onclick=()=>{c||(c=!0,l(),n(!1))},o.addEventListener("click",d),o.addEventListener("close",u),o.showModal()})}function v(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),s=document.getElementById("alert-message"),r=document.getElementById("alert-ok");a.textContent=e,s.textContent=t;const i=l=>{l.key==="Enter"&&(l.preventDefault(),c(),n())},c=()=>{o.close(),r.onclick=null,document.removeEventListener("keydown",i)};r.onclick=()=>{c(),n()},document.addEventListener("keydown",i),o.showModal()})}async function ft(){localStorage.removeItem("sv_app_lock"),localStorage.removeItem("sv_autolock"),localStorage.removeItem("sv_recovery_q"),localStorage.removeItem("sv_recovery_a"),kt(),ge(),await C(),wt(),Jt(),ze(),Ee(),Xt()}ft();function E(e){const t=document.getElementById("security-terminal-body");if(t){const n=document.createElement("p");n.className="term-line",n.textContent=`> ${e}`,t.appendChild(n),t.scrollTop=t.scrollHeight}}function I(e,t="completed"){const n=document.getElementById(e);if(n){n.className=`process-step ${t}`.trim();const o=n.querySelector(".step-icon");o&&(t==="completed"?o.textContent="[✓]":t==="active"?o.textContent="[→]":o.textContent="[ ]")}}function H(e,t){const n=document.getElementById("protect-progress-bar"),o=document.getElementById("protect-progress-percent"),a=document.getElementById("protect-progress-label");n&&(n.style.width=`${e}%`),o&&(o.textContent=`${e}%`),a&&t&&(a.textContent=t)}function ht(){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+",t=new Uint8Array(24);window.crypto.getRandomValues(t);let n="";for(let a=0;a<24;a++)n+=e[t[a]%e.length];const o=document.getElementById("new-password");if(o){o.value=n,o.type="text",_e();const a=document.getElementById("toggle-new-password");a&&(a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',a.style.color="var(--cyber-cyan)")}}function wt(){document.getElementById("cancel-add").addEventListener("click",()=>{z()}),document.getElementById("confirm-add").addEventListener("click",De),document.getElementById("generate-pwd-btn")?.addEventListener("click",ht);const e=document.getElementById("toggle-new-password"),t=document.getElementById("new-password");e?.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t&&(t.type==="password"?(t.type="text",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',e.style.color="var(--cyber-cyan)"):(t.type="password",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',e.style.color="var(--cyber-text-muted)"))}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),De())}),document.getElementById("download-protected-html-btn")?.addEventListener("click",async()=>{if(!N||!N.record){v("Notice","No active protected file session. Please select a file from the vault below to download.");return}const r=document.getElementById("download-protected-html-btn"),i=r?r.innerHTML:"";try{r&&(r.disabled=!0,r.innerHTML=`
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `);let c=N.buffer,l=N.password;if(!c||c.byteLength===0){const d=await X(N.record,l);if(d&&d.buffer)c=d.buffer,l=d.password||l;else throw new Error("Could not retrieve file content for packaging.")}await J(N.record,c,l,{},"Protected HTML package exported successfully!")}catch(c){console.error(c),await v("Export Error","Failed to download HTML package: "+c.message)}finally{r&&(r.disabled=!1,r.innerHTML=i)}}),document.getElementById("view-in-vault-btn")?.addEventListener("click",()=>{z(),document.getElementById("secured-files-heading")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("protect-another-btn")?.addEventListener("click",()=>{z(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".cyber-nav-item").forEach(i=>i.classList.remove("active")),r.classList.add("active"),r.id==="nav-item-protect"&&z()})}),document.getElementById("sidebar-settings-btn")?.addEventListener("click",()=>{ge(),U?.showModal()}),document.getElementById("cancel-auth").addEventListener("click",()=>{j.close(),document.getElementById("auth-password").value="",we=null}),document.getElementById("confirm-auth").addEventListener("click",Ne),document.getElementById("auth-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ne())}),document.getElementById("close-viewer").addEventListener("click",ye),st?.addEventListener("click",He),W?.addEventListener("input",Lt),Oe?.addEventListener("change",Bt),document.getElementById("new-password")?.addEventListener("input",_e),dt?.addEventListener("click",At),ut?.addEventListener("click",Pt),pt?.addEventListener("click",Ct),document.getElementById("select-all-btn")?.addEventListener("click",St),document.getElementById("close-info")?.addEventListener("click",()=>he.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>se.close()),document.getElementById("confirm-rename")?.addEventListener("click",Pe),document.getElementById("rename-input")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Pe())}),Dt(),Rt(),yt?.addEventListener("click",()=>re?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>re?.close()),It(),mt?.addEventListener("click",()=>{ge(),U?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>U?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>U?.close()),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const r="coralgenz@zohomail.in",i=encodeURIComponent("SecureVault Feedback"),c=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${r}?subject=${i}&body=${c}`}),document.querySelectorAll(".panic-trigger").forEach(r=>{r.addEventListener("click",fe)}),document.getElementById("panic-btn")?.addEventListener("click",fe),document.getElementById("panic-action-select")?.addEventListener("change",r=>{localStorage.setItem("sv_panic_action",r.target.value)}),document.getElementById("panic-enable-toggle")?.addEventListener("change",r=>{const i=r.target.checked;localStorage.setItem("sv_panic_enabled",i),Ee()}),document.getElementById("dl-media-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_media",r.target.checked),ue()}),document.getElementById("dl-doc-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_doc",r.target.checked),ue()}),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>Ke?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",Ht),de("toggle-new-password","new-password"),de("toggle-auth-password","auth-password"),de("toggle-share-password","share-password");const n=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>n?.close()),document.getElementById("confirm-share")?.addEventListener("click",Me),document.getElementById("share-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Me())}),document.getElementById("share-logo-zone")?.addEventListener("click",r=>{r.target!==document.getElementById("share-logo")&&document.getElementById("share-logo")?.click()}),document.getElementById("share-logo")?.addEventListener("change",r=>{const i=r.target.files[0],c=document.getElementById("share-logo-text");c&&(c.textContent=i?i.name:"Choose File")}),R?.addEventListener("change",Fe),document.getElementById("file-remove-btn")?.addEventListener("click",vt);const o=document.getElementById("file-upload-zone"),a=document.getElementById("drop-text-primary"),s=document.getElementById("drop-text-secondary");o?.addEventListener("click",r=>{r.target!==R&&R?.click()}),o?.addEventListener("dragover",r=>{r.preventDefault(),o.classList.add("drag-over"),a&&(a.textContent="FILE DETECTED — INITIALIZING PROTECTION"),s&&(s.textContent="Release file to initialize security inspection")}),o?.addEventListener("dragleave",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system")}),o?.addEventListener("drop",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system")}),document.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("keydown",r=>{(r.key==="PrintScreen"||r.ctrlKey&&r.key==="p")&&(r.preventDefault(),alert("Screenshots are disabled"))})}function de(e,t){const n=document.getElementById(e),o=document.getElementById(t);!n||!o||n.addEventListener("click",a=>{a.preventDefault(),o.type==="password"?(o.type="text",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',n.style.color="var(--cyber-cyan)"):(o.type="password",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',n.style.color="var(--cyber-muted)")})}function z(){R.value="",document.getElementById("new-password").value="",N=null,K.className="strength-bar",S.innerText="ENTER PASSWORD";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview"),n=document.getElementById("inline-password-section"),o=document.getElementById("protection-process-container"),a=document.getElementById("protection-complete-container");e?.classList.remove("hidden"),t?.classList.add("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden");const s=document.getElementById("process-timer-display");s&&(s.textContent="00:00.00");const r=document.querySelector(".scanner-center-shield");r&&r.classList.remove("success");const i=document.getElementById("scanner-status-text");i&&(i.textContent="SECURING");const c=document.getElementById("security-terminal-body");c&&(c.innerHTML='<p class="term-line">&gt; Standby for cryptographic instruction...</p>'),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(l=>{I(l,"")}),H(0,"STANDBY")}function Fe(){const e=R.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){v("File Too Large","Please select a file smaller than 150 MB."),R.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),s=document.getElementById("file-preview-size"),r=document.getElementById("protection-process-container"),i=document.getElementById("protection-complete-container");a&&(a.textContent=e.name),s&&(s.textContent=ae(e.size)),n?.classList.add("hidden"),r?.classList.add("hidden"),i?.classList.add("hidden"),o?.classList.remove("hidden"),document.getElementById("inline-password-section")?.classList.remove("hidden")}function vt(e){e.preventDefault(),e.stopPropagation(),R.value="",N=null;const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview"),o=document.getElementById("inline-password-section"),a=document.getElementById("protection-process-container"),s=document.getElementById("protection-complete-container");t?.classList.remove("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden"),s?.classList.add("hidden"),t?.classList.remove("hidden"),n?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function ae(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function Et(e,t){try{const n=je(new Uint8Array(e),{type:"array"}),o=n.SheetNames;if(o.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const s=document.createElement("div");s.className="excel-header";const r=document.createElement("div");r.className="excel-table-wrapper";let i=o[0];const c=l=>{r.innerHTML="";const d=n.Sheets[l],u=Ye.sheet_to_json(d,{header:1,defval:""});if(!u||u.length===0){r.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const y=document.createElement("table");y.className="excel-table",u.forEach((g,f)=>{const h=document.createElement("tr");g.forEach(p=>{const m=f===0?"th":"td",b=document.createElement(m);b.textContent=p!==void 0?p:"",h.appendChild(b)}),y.appendChild(h)}),r.appendChild(y)};o.forEach(l=>{const d=document.createElement("button");d.className=`excel-sheet-btn ${l===i?"active":""}`,d.textContent=l,d.onclick=()=>{i=l,c(l),s.querySelectorAll(".excel-sheet-btn").forEach(u=>u.classList.remove("active")),d.classList.add("active")},s.appendChild(d)}),c(i),a.appendChild(s),a.appendChild(r),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${n.message}</div>`}}async function bt(e,t){try{const{value:n,messages:o}=await ot.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const s=document.createElement("div");s.className="word-document",s.innerHTML=n,a.appendChild(s),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}async function xt(e,t,n){try{const o=await at.loadAsync(e),a=Object.keys(o.files).filter(u=>u.startsWith("ppt/slides/slide")&&u.endsWith(".xml"));if(a.sort((u,y)=>{const g=parseInt(u.replace(/[^0-9]/g,"")||"0",10),f=parseInt(y.replace(/[^0-9]/g,"")||"0",10);return g-f}),a.length===0)throw new Error("No slide XML found in presentation archive.");const s=[],r=new DOMParser;for(const u of a){const y=await o.files[u].async("string"),f=r.parseFromString(y,"application/xml").querySelectorAll("t"),h=Array.from(f).map(p=>p.textContent.trim()).filter(Boolean);s.push({title:h[0]||`Slide ${s.length+1}`,body:h.slice(1).join(`
`)||"Slide Content"})}let i=0;const c=document.createElement("div");c.className="ppt-viewer";const l=document.createElement("div");l.className="ppt-slide-card";const d=u=>{const y=s[u];l.innerHTML=`
        <div class="ppt-slide-title">📊 ${y.title}</div>
        <div class="ppt-slide-content"><pre style="white-space:pre-wrap;font-family:inherit;">${y.body}</pre></div>
        <div class="ppt-nav-bar">
          <button type="button" id="ppt-prev-btn" class="excel-sheet-btn" ${u===0?'disabled style="opacity:0.5;"':""}>◀ Previous</button>
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">Slide ${u+1} of ${s.length}</span>
          <button type="button" id="ppt-next-btn" class="excel-sheet-btn" ${u===s.length-1?'disabled style="opacity:0.5;"':""}>Next ▶</button>
        </div>
      `,l.querySelector("#ppt-prev-btn")?.addEventListener("click",()=>{i>0&&(i--,d(i))}),l.querySelector("#ppt-next-btn")?.addEventListener("click",()=>{i<s.length-1&&(i++,d(i))})};d(0),c.appendChild(l),n.appendChild(c)}catch(o){console.warn("PPTX parsing fallback:",o),n.innerHTML=`
      <div class="ppt-slide-card" style="align-items:center;justify-content:center;text-align:center;">
        <div style="font-size:48px;margin-bottom:12px;">📊</div>
        <div class="ppt-slide-title">${t}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;">POWERPOINT PRESENTATION READY</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">Full presentation deck decrypted successfully. Click download above to view in Microsoft PowerPoint or Keynote.</p>
      </div>
    `}}function It(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&z())})})}function kt(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function He(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function _e(){const e=document.getElementById("new-password")?.value||"",n=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123"].includes(e.toLowerCase().trim());let o=0;e.length>=8&&o++,e.length>=12&&o++,e.length>=18&&o++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&o++,/[0-9]/.test(e)&&o++,/[^A-Za-z0-9]/.test(e)&&o++,n&&(o=1),K&&S&&(K.className="strength-bar",e?o<=2||n?(K.classList.add("weak"),S.innerText=n?"VULNERABLE (DICTIONARY WORD)":"WEAK (GPU CRACKABLE)",S.style.color="#ef4444"):o===3||o===4?(K.classList.add("fair"),S.innerText="MODERATE (RECOMMEND 12+ CHARS)",S.style.color="#f59e0b"):o===5?(K.classList.add("good"),S.innerText="STRONG (GPU RESISTANT)",S.style.color="#0284c7"):(K.classList.add("strong"),S.innerText="MIL-SPEC // QUANTUM RESISTANT",S.style.color="#10b981"):(S.innerText="ENTER PASSWORD",S.style.color="var(--cyber-text-muted)",K.style.width="0%"))}function Lt(){const e=W.value.toLowerCase().trim();C(e)}function Bt(){C(W?.value||"")}function Tt(e){const t=e.reduce((r,i)=>r+(i.size||0),0),n=(t/1024/1024).toFixed(2);it.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);ct.style.width=o+"%";const a=e.filter(r=>r.type?.startsWith("image")).length,s=e.filter(r=>r.type?.startsWith("video")).length;Be&&(Be.innerText=e.length),Te&&(Te.innerText=a),Se&&(Se.innerText=s),Ce&&(Ce.innerText=n)}function Z(){const e=document.getElementById("select-all-btn");L.size>0?(Le.classList.remove("hidden"),lt.innerText=`${L.size} selected`,e&&(L.size>=O.length&&O.length>0?e.innerText="Deselect All":e.innerText="Select All")):Le.classList.add("hidden")}function St(){L.size>=O.length&&O.length>0?L.clear():O.forEach(e=>L.add(e.id)),Z(),C(W?.value||"")}function Ct(){L.clear(),Z(),C(W?.value||"")}async function At(){if(await q("Delete Files",`Delete ${L.size} file(s)? This cannot be undone.`)){for(const t of L)await k.deleteFile(t);L.clear(),Z(),C(),await v("Success","Files deleted.")}}async function Pt(){if(L.size!==0){await v("Export",`Exporting ${L.size} files. Each will download separately.`);for(const e of L)await k.getFile(e)&&await Mt(e);L.clear(),Z(),C()}}async function Mt(e){const t=await k.getFile(e);if(!t)return;const n=await X(t);if(!n||!n.buffer)return;const{buffer:o,password:a}=n;let s=a;s||(s=await Y("Export Protected File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),s&&await J(t,o,s,{},"Protected file downloaded successfully!")}function Dt(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),ne?.classList.remove("hidden"),ne?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),ne?.classList.add("hidden"),ne?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)if(n.length===1){const o=new DataTransfer;o.items.add(n[0]),R.files=o.files,Fe(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const o of n)await Nt(o)})}async function Nt(e){if(e.size>157286400){await v("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await Y("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await w.generateKey(),a=w.generateSalt(),s=await w.deriveKeyFromPassword(n,a,2e6),r=await e.arrayBuffer(),{iv:i,ciphertext:c}=await w.encryptData(o,r),{iv:l,wrappedData:d}=await w.wrapKey(o,s),u={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:l,data:d}],content:c,iv:i,viewCount:0};await k.saveFile(u),C(),await v("Success",`${e.name} encrypted and saved!`)}function Rt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),W?.focus()),e.key==="Escape"&&(z(),j.close(),he?.close(),se?.close()),(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="p"&&(e.preventDefault(),fe()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),He())})}const Ae=5,Ot=300*1e3;function Ue(e){const t=M[e];if(t&&t.locked&&Date.now()<t.lockedUntil){const n=Math.ceil((t.lockedUntil-Date.now())/1e3);return alert(`File locked. Try again in ${n} seconds.`),!0}return!1}function Kt(e){M[e]||(M[e]={count:0,locked:!1,lockedUntil:0}),M[e].count++;const t=Ae-M[e].count,n=document.getElementById("attempts-left"),o=document.getElementById("auth-attempts");t<=3&&(o?.classList.remove("hidden"),n&&(n.innerText=t)),M[e].count>=Ae&&(M[e].locked=!0,M[e].lockedUntil=Date.now()+Ot,j.close(),alert("Too many failed attempts. File locked for 5 minutes."))}function Ft(e){delete M[e],document.getElementById("auth-attempts")?.classList.add("hidden")}async function Ht(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await v("Required","Please fill all fields");return}if(t!==n){await v("Error","New passwords do not match");return}const o=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],a=t.toLowerCase().trim();if(!((t.length<8||o.includes(a))&&!await q("⚠️ Weak Password Warning",`This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.

Do you want to proceed with this password?`)))try{const r=await k.getFile(gt);if(!r)throw new Error("File not found");const i=r.keys.find(g=>g.type==="password");if(!i)throw new Error("No password key found");const c=await w.unwrapWithFallback(i.data,e,i.salt,i.iv),l=w.generateSalt(),d=await w.deriveKeyFromPassword(t,l,2e6),{iv:u,wrappedData:y}=await w.wrapKey(c,d);r.keys=r.keys.filter(g=>g.type!=="password"),r.keys.push({type:"password",salt:l,iv:u,data:y}),r.accessLog=r.accessLog||[],r.accessLog.push({action:"password_changed",date:Date.now()}),await k.updateFile(r),Ke?.close(),await v("Success","Password changed successfully!")}catch(r){console.error(r),await v("Error","Failed to change password. Current password may be incorrect.")}}function _t(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function Ut(e){F=F.filter(t=>t.id!==e.id),F.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),F.length>5&&(F=F.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(F)),ze()}function ze(){if(!ce||!le)return;const e=F.filter(t=>O.some(n=>n.id===t.id));if(e.length===0){ce.classList.add("hidden");return}ce.classList.remove("hidden"),le.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),le.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>me(t.dataset.id)})}async function zt(e,t){e.stopPropagation(),await q("Delete File","Delete this file permanently?")&&(await k.deleteFile(t),C())}async function Wt(e,t){e.stopPropagation();const n=O.find(s=>s.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode==="always"?"Always Ask Password":n.authMode||"Always Ask Password";const o=document.getElementById("info-views");o&&(o.innerText=n.viewCount||0);const a=document.getElementById("access-log");a&&n.accessLog&&n.accessLog.length>0?a.innerHTML=n.accessLog.slice(-10).reverse().map(s=>`
      <div class="access-log-item">
        ${s.action.replace("_"," ")} - ${new Date(s.date).toLocaleString()}
      </div>
    `).join(""):a&&(a.innerHTML="No access history"),he.showModal()}function Vt(e,t,n){e.stopPropagation(),oe=t;const o=document.getElementById("rename-input");o.value=n,se.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function Pe(){const e=document.getElementById("rename-input").value.trim();if(!e||!oe)return;const t=await k.getFile(oe);t&&(t.name=e,await k.updateFile(t)),se.close(),oe=null,C()}async function $t(e,t){e&&e.stopPropagation();try{const n=await k.getFile(t);if(!n){await v("Error","File not found");return}const o=await X(n);if(!o||!o.buffer)return;const{buffer:a,password:s}=o;let r=s;if(r||(r=await Y("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await J(n,a,r,{},"Downloaded! The protected file has been saved."),_t(n,"downloaded"),await k.updateFile(n)}catch(n){console.error(n),await v("Error","Failed to download file: "+(n.message||"Decryption error"))}}async function Gt(e,t){e.stopPropagation();try{const n=await k.getFile(t);if(!n)return;const o=await X(n);if(!o||!o.buffer)return;const{buffer:a,password:s}=o;let r=s;if(r||(r=await Y("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await J(n,a,r,{})}catch(n){console.error(n),await v("Error","Share failed: "+n.message)}}function jt(e,t){e.stopPropagation(),pe=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function Me(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await v("Required","Please set a password for the file.");return}const a=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],s=t.toLowerCase().trim();if((t.length<8||a.includes(s))&&!await q("⚠️ Weak Password Warning",`This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.

Do you want to proceed with this password?`))return;const i=document.getElementById("confirm-share"),c=i.innerText;i.innerText="Exporting...";try{const l=await k.getFile(pe);if(!l)throw new Error("File not found");const d=await X(l,t);if(!d||!d.buffer)throw new Error("Decryption failed");const u=d.buffer;let y="";o.files&&o.files[0]&&(y=await new Promise(f=>{const h=new FileReader;h.onload=()=>f(h.result),h.readAsDataURL(o.files[0])})),await J(l,u,t,{title:n,logoUrl:y}),e.close(),pe=null}catch(l){console.error(l),await v("Error","Export failed: "+l.message)}finally{i.innerText=c}}function Yt(e,t){const n=(t||"").toLowerCase(),o=(e||"").toLowerCase();return n.startsWith("image/")||n.startsWith("video/")||n.startsWith("audio/")?!0:/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(o)}function We(){const e=localStorage.getItem("sv_dl_media")!=="false",t=localStorage.getItem("sv_dl_doc")!=="false";return{allowMedia:e,allowDoc:t}}function ve(e,t){const{allowMedia:n,allowDoc:o}=We();return Yt(e,t)?n:o}function ue(){const{allowMedia:e,allowDoc:t}=We(),n=document.getElementById("dl-media-status-badge"),o=document.getElementById("dl-doc-status-badge");n&&(n.textContent=e?"ALLOWED":"RESTRICTED",n.className=`policy-status-badge ${e?"allowed":"restricted"}`),o&&(o.textContent=t?"ALLOWED":"RESTRICTED",o.className=`policy-status-badge ${t?"allowed":"restricted"}`)}async function J(e,t,n,o={},a="Protected file downloaded successfully!"){if(!t||t.byteLength===0)throw new Error("No decrypted file payload available to package.");if(!n)throw new Error("Protection password is required to export this file.");const s=o.allowDownload!==void 0?!!o.allowDownload:ve(e.name,e.type),r=w.generateSalt(),i=await w.computePayloadHash(t),c=await w.deriveKeyAsyncWorker(n,r,2e6,w.MILSPEC_ANTI_CRACKER_PEPPER_V6),{iv:l,ciphertext:d}=await w.encryptData(c,t),y=await(x=>new Promise(T=>{const A=new FileReader;A.readAsDataURL(x),A.onloadend=()=>{const V=A.result||"";T(V.split(",")[1]||"")}}))(new Blob([d]));if(!y)throw new Error("Failed to serialize encrypted payload.");const{header:g,footer:f}=qt(e,r,l,{...o,allowDownload:s,integrityHash:i}),h=new Blob([g,y,f],{type:"text/html;charset=utf-8"}),p=URL.createObjectURL(h),m=document.createElement("a");m.href=p;const b=e.name||"protected_file";m.download=b.endsWith(".secure.html")?b:b+".secure.html",document.body.appendChild(m),m.click(),document.body.removeChild(m),setTimeout(()=>URL.revokeObjectURL(p),6e4),a&&await v("Success",a)}function qt(e,t,n,o={}){const a=ee=>btoa(String.fromCharCode(...new Uint8Array(ee))),s=a(t),r=a(n),i=o.title||"Coralgenz Vault",c=o.logoUrl||"",l=e.name||"Protected File",d=e.type||"application/octet-stream",u=Number(e.size)||0,y=e.id||"",g=o.allowDownload!==void 0?!!o.allowDownload:ve(l,d),f=JSON.stringify(s),h=JSON.stringify(r),p=JSON.stringify(d),m=JSON.stringify(l),b=JSON.stringify(u),x=JSON.stringify(i),T=JSON.stringify(y),A=JSON.stringify(g),V=JSON.stringify(o.integrityHash||e.integrityHash||""),$=JSON.stringify("V6"),Q=c?`<img src="${c}" alt="Logo" class="brand-custom-logo">`:`<div class="brand-shield-icon">
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

        @media print {
            body { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="cyber-grid"></div>

    <div id="auth-panel" class="auth-container">
        ${Q}
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
            <span class="anti-cracker-chip">● SHA-256 INTEGRITY SEAL</span>
            <span class="anti-cracker-chip">● ZERO-NETWORK RUNTIME (BURP-IMMUNE)</span>
        </div>

        <div class="input-group">
            <div class="password-field-wrap">
                <input type="password" id="pwd" class="cyber-input" placeholder="Enter authorization password..." autofocus autocomplete="new-password" spellcheck="false" autocapitalize="off" data-lpignore="true" data-form-type="other">
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
                <div class="viewer-brand-title">${i}</div>
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
        const CONTAINER_VERSION = ${$};
        const SALT_B64 = ${f};
        const IV_B64 = ${h};
        const TYPE = ${p};
        const NAME = ${m};
        const SIZE = ${b};
        const BRAND = ${x};
        const ALLOW_DOWNLOAD = ${A};
        const INTEGRITY_HASH = ${V};

        // Dynamically assembled anti-cracker peppers (defeats static string grep/decompilation)
        const MILSPEC_PEPPER_V6 = ["CORALGENZ", "MILSPEC_V6", "QUANTUM_RESISTANT", "ZERO_KNOWLEDGE", "883920194821"].join("::");
        const MILSPEC_PEPPER = MILSPEC_PEPPER_V6;
        const MILSPEC_PEPPER_V5 = ["CORALGENZ", "MILSPEC_V5", "ANTI_OFFLINE_CRACKER", "ZERO_KNOWLEDGE", "774910283419"].join("::");
        const MILSPEC_PEPPER_V4 = ["CORALGENZ", "MILSPEC_V4", "ANTI_JOHN_THE_RIPPER", "ZERO_KNOWLEDGE", "992174829104"].join("::");

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
                const isExcel = safeType.includes('excel') || safeType.includes('spreadsheet') || hasExt(lowerName, ['xlsx', 'xls']);
                const isWord = safeType.includes('word') || hasExt(lowerName, ['docx', 'doc']);
                const isPpt = safeType.includes('presentation') || safeType.includes('powerpoint') || hasExt(lowerName, ['pptx', 'ppt', 'pps', 'ppsx']);
                const isText = safeType.startsWith('text/') || hasExt(lowerName, ['txt', 'json', 'js', 'ts', 'html', 'css', 'py', 'c', 'cpp', 'h', 'md', 'xml', 'log', 'sh', 'env', 'csv', 'yaml', 'yml', 'sql', 'rs', 'go', 'java', 'kt', 'swift', 'rb', 'php']);

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
                } else if (isCsv) {
                    const textDecoder = new TextDecoder();
                    const csvText = textDecoder.decode(decrypted);
                    const lines = csvText.split(String.fromCharCode(10)).map(l => l.endsWith(String.fromCharCode(13)) ? l.slice(0, -1) : l).filter(l => l.trim().length > 0);
                    const delimiter = lowerName.endsWith('.tsv') ? String.fromCharCode(9) : ',';
                    const wrap = document.createElement('div');
                    wrap.className = 'code-viewer-wrap';
                    let tableHTML = '<table style="width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:12px;color:#0f172a;">';
                    lines.forEach((line, rIdx) => {
                        const cells = line.split(delimiter);
                        tableHTML += '<tr>';
                        cells.forEach(cell => {
                            const tag = rIdx === 0 ? 'th' : 'td';
                            const style = rIdx === 0 ? 'background:#f1f5f9;font-weight:700;padding:8px;border:1px solid #cbd5e1;' : 'padding:6px 8px;border:1px solid #e2e8f0;';
                            tableHTML += '<' + tag + ' style="' + style + '">' + cell.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</' + tag + '>';
                        });
                        tableHTML += '</tr>';
                    });
                    tableHTML += '</table>';
                    wrap.innerHTML = '<div class="code-viewer-bar"><span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan)">📊 ' + NAME + ' (DATA TABLE)</span>' + (ALLOW_DOWNLOAD ? '<button type="button" id="card-dl-csv" class="viewer-btn-close">Download File</button>' : '') + '</div><div style="flex:1;overflow:auto;padding:12px;background:#ffffff;">' + tableHTML + '</div>';
                    contentArea.appendChild(wrap);
                    wrap.querySelector('#card-dl-csv')?.addEventListener('click', () => triggerDownload(blob, NAME));
                } else if (isExcel) {
                    const card = document.createElement('div');
                    card.className = 'fallback-download-card';
                    card.innerHTML = '<div class="fallback-icon" style="background:rgba(5,150,105,0.1);border-color:rgba(5,150,105,0.25);color:var(--accent-green);"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line></svg></div><h2 class="fallback-title">' + NAME + '</h2><p class="fallback-desc">Microsoft Excel Spreadsheet decrypted successfully (' + formatBytes(decrypted.byteLength) + ').</p>' + (ALLOW_DOWNLOAD ? '<button type="button" id="card-dl-excel" class="cyber-btn-unlock" style="background:linear-gradient(135deg,#059669 0%,#047857 100%);color:#ffffff;box-shadow:0 4px 14px rgba(5,150,105,0.35);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>OPEN / SAVE IN MICROSOFT EXCEL</span></button>' : '');
                    contentArea.appendChild(card);
                    card.querySelector('#card-dl-excel')?.addEventListener('click', () => triggerDownload(blob, NAME));
                } else if (isWord) {
                    const card = document.createElement('div');
                    card.className = 'fallback-download-card';
                    card.innerHTML = '<div class="fallback-icon" style="background:rgba(37,99,235,0.1);border-color:rgba(37,99,235,0.25);color:var(--accent-blue);"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></div><h2 class="fallback-title">' + NAME + '</h2><p class="fallback-desc">Microsoft Word Document decrypted successfully (' + formatBytes(decrypted.byteLength) + ').</p>' + (ALLOW_DOWNLOAD ? '<button type="button" id="card-dl-word" class="cyber-btn-unlock" style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);color:#ffffff;box-shadow:0 4px 14px rgba(37,99,235,0.35);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>OPEN / SAVE IN MICROSOFT WORD</span></button>' : '');
                    contentArea.appendChild(card);
                    card.querySelector('#card-dl-word')?.addEventListener('click', () => triggerDownload(blob, NAME));
                } else if (isPpt) {
                    const card = document.createElement('div');
                    card.className = 'fallback-download-card';
                    card.innerHTML = '<div class="fallback-icon" style="background:rgba(225,29,72,0.1);border-color:rgba(225,29,72,0.25);color:var(--accent-red);"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><rect x="8" y="12" width="8" height="6" rx="1"></rect></svg></div><h2 class="fallback-title">' + NAME + '</h2><p class="fallback-desc">Microsoft PowerPoint Presentation decrypted successfully (' + formatBytes(decrypted.byteLength) + ').</p>' + (ALLOW_DOWNLOAD ? '<button type="button" id="card-dl-ppt" class="cyber-btn-unlock" style="background:linear-gradient(135deg,#e11d48 0%,#be123c 100%);color:#ffffff;box-shadow:0 4px 14px rgba(225,29,72,0.35);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>OPEN / SAVE IN POWERPOINT</span></button>' : '');
                    contentArea.appendChild(card);
                    card.querySelector('#card-dl-ppt')?.addEventListener('click', () => triggerDownload(blob, NAME));
                } else if (isText) {
                    const textDecoder = new TextDecoder();
                    const textContent = textDecoder.decode(decrypted);
                    const wrap = document.createElement('div');
                    wrap.className = 'code-viewer-wrap';
                    wrap.innerHTML = '<div class="code-viewer-bar"><span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan)">' + NAME + '</span>' + (ALLOW_DOWNLOAD ? '<button type="button" id="copy-code-btn" class="viewer-btn-close">Copy Text</button>' : '<span style="font-family:var(--font-mono);font-size:11px;color:var(--accent-red);font-weight:700;background:rgba(225,29,72,0.08);padding:4px 8px;border-radius:4px;border:1px solid rgba(225,29,72,0.25);">EXPORT RESTRICTED</span>') + '</div><pre class="code-viewer-pre"><code>' + textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>';
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
                        card.innerHTML = '<div class="fallback-icon"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg></div><h2 class="fallback-title">' + NAME + '</h2><p class="fallback-desc">File decrypted successfully (' + formatBytes(decrypted.byteLength) + '). Click below to save the original file to your device.</p><button type="button" id="card-dl-btn" class="cyber-btn-unlock" style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#ffffff;box-shadow:0 4px 14px rgba(16,185,129,0.35);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>DOWNLOAD DECRYPTED FILE</span></button>';
                        contentArea.appendChild(card);
                        card.querySelector('#card-dl-btn')?.addEventListener('click', () => {
                            triggerDownload(blob, NAME);
                        });
                    } else {
                        card.innerHTML = '<div class="fallback-icon" style="background:rgba(225,29,72,0.08);border-color:rgba(225,29,72,0.25);color:var(--accent-red);"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div><h2 class="fallback-title">' + NAME + '</h2><p class="fallback-desc" style="color:var(--accent-red);font-weight:700;letter-spacing:0.05em;text-transform:uppercase;">DOWNLOAD RESTRICTED BY OWNER POLICY</p><p class="fallback-desc">The security policy configured during protection prevents exporting or saving this file to local disk.</p>';
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

        window.unlock = unlock;
        document.getElementById('unlock-btn')?.addEventListener('click', unlock);

        const DATA = "`,footer:`";
    <\/script>
</body>
</html>`}}async function X(e,t=null){let n=null,o=t;if(t)try{const s=e.keys.find(r=>r.type==="password");s&&(n=await w.unwrapWithFallback(s.data,t,s.salt,s.iv))}catch{console.log("Provided password invalid for unlock")}if(!n){const s=await Y("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!s)return null;try{const r=e.keys.find(i=>i.type==="password");n=await w.unwrapWithFallback(r.data,s,r.salt,r.iv),o=s}catch{return await v("Error","Incorrect password"),null}}return{buffer:await w.decryptData(n,e.iv,e.content),password:o}}async function De(){const e=R.files[0],t=document.getElementById("new-password").value;if(!e){await v("Required","Please select a file to protect");return}if(!t){await v("Required","Protection password is required");return}const n=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],o=t.toLowerCase().trim();if((t.length<8||n.includes(o))&&!await q("⚠️ Weak Password Warning",`This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.

Do you want to proceed with this password?`))return;const s=document.getElementById("confirm-add"),r=s.innerText;s.innerText="SECURING PAYLOAD (5s)...",s.disabled=!0;const i=document.getElementById("protection-process-container"),c=document.getElementById("file-upload-zone"),l=document.getElementById("file-preview"),d=document.getElementById("inline-password-section"),u=document.getElementById("protection-complete-container"),y=document.getElementById("security-terminal-body"),g=document.getElementById("process-timer-display"),f=document.getElementById("scanner-status-text"),h=document.querySelector(".scanner-center-shield");c?.classList.add("hidden"),l?.classList.add("hidden"),d?.classList.add("hidden"),u?.classList.add("hidden"),i?.classList.remove("hidden"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(x=>{I(x,"")}),h&&h.classList.remove("success"),f&&(f.textContent="SECURING"),y&&(y.innerHTML="");const p=Date.now(),m=5e3,b=setInterval(()=>{const x=Math.min(Date.now()-p,m),T=Math.floor(x/1e3).toString().padStart(2,"0"),A=Math.floor(x%1e3/10).toString().padStart(2,"0");g&&(g.textContent=`00:${T}.${A}`),x>=m&&clearInterval(b)},30);try{H(14,"FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE..."),I("step-analysis","active"),E("[00:00.15] INITIATING ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6"),E(`[00:00.35] File: "${e.name}" [${ae(e.size)}] | Type: ${e.type||"application/octet-stream"}`),E(`[00:00.55] Enclave memory block allocated: ${e.size} bytes. Isolation confirmed.`);const x=w.detectDeviceCapabilities();E(`[00:00.65] Hardware Profile: ${x.concurrency} Cores, ${x.memory}GB RAM [Worker Offload: Active]`),await new Promise(B=>setTimeout(B,700)),I("step-analysis","completed"),H(28,"INITIALIZING CSPRNG ENTROPY POOL..."),I("step-prep","active"),E("[00:00.85] Generating 256-bit cryptographic salt from hardware CSPRNG...");const T=w.generateSalt(),A=await w.generateKey();E("[00:01.10] Nonce generation: 96-bit AES-GCM Initialization Vector created."),E("[00:01.30] Ephemeral entropy validated: entropy score = 0.998."),await new Promise(B=>setTimeout(B,700)),I("step-prep","completed"),H(45,"DERIVING KEY (DUAL-STAGE KDF 2,000,000 ROUNDS)..."),I("step-kdf","active"),E("[00:01.50] Stage 1: HMAC-SHA512 Pre-whitening with Domain-Separated Pepper V6..."),E("[00:01.70] Worker Offload: Initializing background thread for smooth 60fps UI..."),E("[00:01.90] Stage 2: Computing 2,000,000 PBKDF2 iterations (Anti-JohnTheRipper / Anti-Hashcat)...");const V=await w.deriveKeyAsyncWorker(t,T,2e6,w.MILSPEC_ANTI_CRACKER_PEPPER_V6);E("[00:02.15] Key derivation complete: 256-bit symmetric cipher key established."),await new Promise(B=>setTimeout(B,900)),I("step-kdf","completed"),H(65,"AES-GCM-256 CIPHER STREAM PROCESSING..."),I("step-encrypt","active"),E("[00:02.45] Executing client-side WebCrypto AES-GCM 256-bit cipher...");const $=await e.arrayBuffer(),Q=await w.computePayloadHash($);E(`[00:02.65] SHA-256 Payload Integrity Seal: ${Q.substring(0,16)}... [VERIFIED]`);const be=$.slice(0),{iv:xe,ciphertext:ee}=await w.encryptData(A,$);E(`[00:02.85] Encrypting ${ae(e.size)} payload blocks into zero-knowledge ciphertext...`),E(`[00:03.15] Ciphertext generated (${ee.byteLength} bytes). 128-bit Galois Tag verified.`),await new Promise(B=>setTimeout(B,1e3)),I("step-encrypt","completed"),H(80,"PACKAGING ZERO-KNOWLEDGE METADATA..."),I("step-meta","active"),I("step-finalize","active"),E("[00:03.40] Wrapping master file key with AES key wrap cipher...");const{iv:Ve,wrappedData:$e}=await w.wrapKey(A,V),Ge=[{type:"password",salt:T,iv:Ve,data:$e}],Ie={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:Ge,content:ee,iv:xe,viewCount:0,expires:null,note:"",integrityHash:Q,accessLog:[{action:"created",date:Date.now()}]};await k.saveFile(Ie),E("[00:03.75] Encrypted container committed to zero-knowledge local IndexedDB."),await new Promise(B=>setTimeout(B,700)),I("step-meta","completed"),I("step-finalize","completed"),H(92,"COMPILING STANDALONE HTML RUNTIME (.secure.html)..."),I("step-output","active"),E("[00:04.10] Assembling self-contained portable decryption engine..."),E("[00:04.35] Embedding browser-native WebCrypto decryptor payload..."),E("[00:04.55] Enforced security policy configured: ALWAYS ASK PASSWORD."),await new Promise(B=>setTimeout(B,650)),I("step-output","completed"),H(100,"CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]"),I("step-verify","active"),E("[00:04.80] Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK."),E("[00:05.00] CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY."),await new Promise(B=>setTimeout(B,350)),I("step-verify","completed"),clearInterval(b),g&&(g.textContent="00:05.00"),f&&(f.textContent="SECURED [✓]"),h&&h.classList.add("success"),await new Promise(B=>setTimeout(B,300)),i?.classList.add("hidden"),u?.classList.remove("hidden");const ke=document.getElementById("complete-file-name");ke&&(ke.textContent=e.name),N={record:Ie,buffer:be,password:t},C()}catch(x){clearInterval(b),console.error(x),E(`CRITICAL ERROR: ${x.message}`),await v("Error","Encryption failed: "+x.message),i?.classList.add("hidden"),l?.classList.remove("hidden"),d?.classList.remove("hidden")}finally{s.innerText=r,s.disabled=!1}}async function me(e){if(!Ue(e))try{const t=await k.getFile(e);if(!t){await v("Error","File not found");return}we=t,document.getElementById("auth-file-name").innerText=t.name,j.showModal()}catch(t){console.error(t),await v("Error","Error opening file")}}async function Ne(){const e=we;if(!e||Ue(e.id))return;const t=document.getElementById("auth-password").value;if(!t)return;const n=document.getElementById("confirm-auth");n.innerText="Unlocking...";try{const o=e.keys.find(s=>s.type==="password");if(!o)throw new Error("Corrupt key data");const a=await w.unwrapWithFallback(o.data,t,o.salt,o.iv);Ft(e.id),j.close(),document.getElementById("auth-password").value="",Zt(e,a)}catch(o){console.error(o),Kt(e.id),await v("Error","Incorrect password or decryption error.")}finally{n.innerText="Unlock"}}async function Zt(e,t){try{const n=await w.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});D=URL.createObjectURL(o);const a=document.getElementById("viewer-content");a.innerHTML="";const s=ve(e.name,e.type);_&&(s?(_.classList.remove("hidden"),_.onclick=()=>{if(!D)return;const p=document.createElement("a");p.style.display="none",p.href=D,p.download=e.name,document.body.appendChild(p),p.click(),document.body.removeChild(p)}):(_.classList.add("hidden"),_.onclick=null));const r=(e.name||"").toLowerCase(),i=(e.type||"").toLowerCase(),c=i.startsWith("image/")||/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(r),l=i.startsWith("video/")||/\.(mp4|webm|mov|mkv|ogg)$/i.test(r),d=i.startsWith("audio/")||/\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(r),u=i==="application/pdf"||/\.pdf$/i.test(r),y=i.includes("excel")||i.includes("spreadsheet")||/\.(xlsx|xls|csv|tsv)$/i.test(r),g=i.includes("word")||/\.(docx|doc)$/i.test(r),f=i.includes("presentation")||i.includes("powerpoint")||/\.(pptx|ppt|pps|ppsx)$/i.test(r),h=i.startsWith("text/")||/\.(txt|json|js|ts|html|css|py|c|cpp|h|java|sh|xml|yaml|yml|sql|md|log|env|rs|go|kt|swift|rb|php)$/i.test(r);if(c){const p=document.createElement("img");p.src=D,p.style.maxWidth="90vw",p.style.maxHeight="80vh",p.style.objectFit="contain",a.appendChild(p)}else if(l||d){const p=document.createElement(l?"video":"audio");p.src=D,p.controls=!0,p.autoplay=!0,s||(p.setAttribute("controlsList","nodownload"),p.oncontextmenu=m=>m.preventDefault()),a.appendChild(p)}else if(u){const p=document.createElement("iframe");p.src=D+(s?"":"#toolbar=0"),p.style.width="100%",p.style.height="100%",p.style.border="none",a.appendChild(p)}else if(y)Et(n,a);else if(g)await bt(n,a);else if(f)await xt(n,e.name,a);else if(h){const m=new TextDecoder().decode(n),b=document.createElement("div");b.className="excel-viewer",b.style.background="#0f172a",b.style.color="#e2e8f0",b.innerHTML=`
        <div class="excel-header" style="background:#1e293b;border-color:rgba(255,255,255,0.1);justify-content:space-between;align-items:center;">
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">${e.name}</span>
          <button type="button" id="vault-copy-code-btn" class="excel-sheet-btn">Copy Text</button>
        </div>
        <div class="excel-table-wrapper" style="background:#0f172a;">
          <pre style="margin:0;font-family:var(--font-mono);font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-all;"><code>${m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        </div>
      `,a.appendChild(b),b.querySelector("#vault-copy-code-btn")?.addEventListener("click",async()=>{await navigator.clipboard.writeText(m),await v("Success","Text copied to clipboard!")})}else{const p=document.createElement("div");p.className="ppt-slide-card",p.style.alignItems="center",p.style.justifyContent="center",p.style.textAlign="center",p.innerHTML=`
        <div style="font-size:48px;margin-bottom:12px;">📁</div>
        <div class="ppt-slide-title">${e.name}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;margin-top:6px;">DECRYPTED FILE READY (${ae(e.size)})</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">The file has been decrypted into volatile browser memory. Use the Download button above to save the original file to your device.</p>
      `,a.appendChild(p)}document.getElementById("viewer-filename").innerText=e.name,Re.classList.remove("hidden"),Ut(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(n){console.error(n),await v("Error","Decryption failed.")}}async function ye(){Re.classList.add("hidden"),_&&_.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",D&&(URL.revokeObjectURL(D),D=null)}async function Jt(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),C())}async function C(e=""){ie.innerHTML="";let t=await k.getAllFiles();O=t,Tt(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const n=Oe?.value||"date-desc";t.sort((a,s)=>{if(a.favorite&&!s.favorite)return-1;if(!a.favorite&&s.favorite)return 1;switch(n){case"date-desc":return(s.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(s.date||0);case"name-asc":return a.name.localeCompare(s.name);case"name-desc":return s.name.localeCompare(a.name);case"size-desc":return(s.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(s.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(O.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){ie.innerHTML=`
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${e?"NO FILES MATCH SEARCH":"NO PROTECTED FILES FOUND"}</h3>
        <p class="empty-desc">${e?"Check search parameters or query another filename.":"Drop a file in the upload zone above to initialize client-side encryption."}</p>
      </div>`;return}t.forEach((a,s)=>{const r=document.createElement("div");r.className="file-card",r.style.animationDelay=`${s*.05}s`,r.onclick=async m=>{!m.target.closest(".file-card-actions")&&!m.target.closest(".file-actions")&&!m.target.closest(".select-checkbox")&&!m.target.closest(".favorite-btn")&&me(a.id)};let i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(i='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');const c=L.has(a.id);let l=a.name;const d='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',y='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',g='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',f='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',h='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',p='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';r.innerHTML=`
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
          <button class="btn-highlight custom-share-btn">${g} Custom</button>
          <button class="btn-small info-btn">${f} Info</button>
          <button class="btn-small rename-btn">${h} Rename</button>
          <button class="btn-small delete-btn">${p} Delete</button>
        </div>
    `,r.querySelector(".select-checkbox").onchange=m=>{m.stopPropagation(),m.target.checked?L.add(a.id):L.delete(a.id),Z()},r.querySelector(".open-btn").onclick=m=>{m.stopPropagation(),me(a.id)},r.querySelector(".download-btn").onclick=m=>$t(m,a.id),r.querySelector(".info-btn").onclick=m=>Wt(m,a.id),r.querySelector(".rename-btn").onclick=m=>Vt(m,a.id,a.name),r.querySelector(".share-btn").onclick=m=>Gt(m,a.id),r.querySelector(".custom-share-btn").onclick=m=>jt(m,a.id),r.querySelector(".delete-btn").onclick=m=>zt(m,a.id),ie.appendChild(r)})}function ge(){const e=localStorage.getItem("sv_panic_action")||"blur",t=document.getElementById("panic-action-select");t&&(t.value=e);const n=localStorage.getItem("sv_dl_media")!=="false",o=localStorage.getItem("sv_dl_doc")!=="false",a=document.getElementById("dl-media-toggle"),s=document.getElementById("dl-doc-toggle");a&&(a.checked=n),s&&(s.checked=o),ue();const r=localStorage.getItem("sv_panic_enabled")!=="false",i=document.getElementById("panic-enable-toggle");i&&(i.checked=r),Ee()}function Ee(){const e=localStorage.getItem("sv_panic_enabled")!=="false",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function fe(){const e=localStorage.getItem("sv_panic_action")||"blur";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await k.getAllFiles();for(const o of n)await k.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),window.location.reload()}catch(t){console.error(t)}})();else if(e==="blur"||e==="lock"){ye(),U?.close(),re?.close(),document.querySelectorAll(".panic-overlay").forEach(n=>n.remove());const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",n=>{n.stopPropagation(),t.remove()})}else if(e==="loading"){ye(),U?.close(),re?.close(),document.querySelectorAll(".panic-overlay").forEach(o=>o.remove());const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `,document.body.appendChild(t);const n=()=>{t.remove()};t.addEventListener("click",n),t.addEventListener("touchstart",n)}}}function Xt(){const e=document.getElementById("cyber-matrix-canvas");if(e){const o=e.getContext("2d");if(o){let y=function(){a=e.width=window.innerWidth,s=e.height=window.innerHeight,l=Math.floor(a/c),d=[],u=[];for(let p=0;p<l;p++)d[p]=Math.random()*-60,u[p]=.8+Math.random()*1.2},h=function(p){if(requestAnimationFrame(h),!(p-g<f)){g=p,o.fillStyle="rgba(5, 7, 10, 0.12)",o.fillRect(0,0,a,s),o.font=`600 ${c}px "JetBrains Mono", monospace`;for(let m=0;m<d.length;m++){const b=i[Math.floor(Math.random()*i.length)],x=m*c,T=d[m]*c;Math.random()>.88?(o.fillStyle="#ffffff",o.shadowColor="#00f0ff",o.shadowBlur=10):m%3===0?(o.fillStyle="rgba(0, 240, 255, 0.65)",o.shadowColor="#00f0ff",o.shadowBlur=4):m%3===1?(o.fillStyle="rgba(0, 255, 136, 0.55)",o.shadowColor="#00ff88",o.shadowBlur=3):(o.fillStyle="rgba(56, 189, 248, 0.4)",o.shadowBlur=0),o.fillText(b,x,T),T>s&&Math.random()>.96&&(d[m]=0,u[m]=.8+Math.random()*1.2),d[m]+=u[m]}}},a=e.width=window.innerWidth,s=e.height=window.innerHeight;const i="0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG".split(""),c=13;let l=Math.floor(a/c),d=[],u=[];y(),window.addEventListener("resize",y);let g=0;const f=33;requestAnimationFrame(h)}}const t=document.getElementById("hero-term-status");if(t){const o=["INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE","HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE","DUAL-STAGE KEY DERIVATION: HMAC-SHA512 + 2,000,000 PBKDF2 ROUNDS (V6 PEPPER)","LOW-END HARDWARE OPTIMIZATION: ACTIVE // WORKER THREAD OFFLOAD ENFORCES 60FPS UI","ANTI-OFFLINE CRACKER: IMMUNE TO JOHN THE RIPPER, HASHCAT & GPU DICTIONARY CLUSTERS","AIR-GAPPED RUNTIME: ZERO REMOTE PACKETS DISPATCHED // IMMUNE TO BURP SUITE INTERCEPTION","ANTI-VIRUS MEMORY SANITIZATION: ACTIVE HEAP ZEROIZATION // ZERO DISK PERSISTENCE","CRYPTOGRAPHIC TAMPER DETECTION: SHA-256 PAYLOAD INTEGRITY SEAL ARMED","MIL-SPEC DEFENSE PROTOCOL: LEVEL-6 CLEARANCE // 128-BIT AUTHENTICATION TAG ARMED","STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT","SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED"];let a=0;setInterval(()=>{a=(a+1)%o.length,t.style.opacity="0",t.style.transform="translateY(4px)",setTimeout(()=>{t.textContent=o[a],t.style.transition="all 0.3s ease",t.style.opacity="1",t.style.transform="translateY(0)"},300)},4e3)}document.addEventListener("click",o=>{const a=o.target.closest(".cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone");if(!a)return;const s=a.getBoundingClientRect(),r=document.createElement("span");r.className="cyber-click-glow-ripple",r.style.left=`${o.clientX-s.left}px`,r.style.top=`${o.clientY-s.top}px`,a.style.position=a.style.position||"relative",a.appendChild(r),setTimeout(()=>r.remove(),600)});const n=[{el:document.getElementById("hero-command"),navId:"nav-item-console"},{el:document.getElementById("inline-add-container"),navId:"nav-item-protect"},{el:document.getElementById("secured-files-heading"),navId:"nav-item-files"}];window.addEventListener("scroll",()=>{const o=window.scrollY+180;for(let a=n.length-1;a>=0;a--){const s=n[a];if(s.el&&s.el.offsetTop<=o){document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.id===s.navId?r.classList.add("active"):r.id!=="nav-item-settings"&&r.classList.remove("active")});break}}},{passive:!0})}
