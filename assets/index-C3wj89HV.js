import"./jspdf-SUxvxRxM.js";import{r as Ce,u as De}from"./xlsx-DFH0qU2H.js";import{r as Ae}from"./mammoth-PVFyTYmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();class f{constructor(){this.algo={name:"AES-GCM",length:256}}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(16))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n){const o=new TextEncoder,a=await window.crypto.subtle.importKey("raw",o.encode(t),"PBKDF2",!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:1e5,hash:"SHA-256"},a,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async encryptData(t,n){const o=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:a}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:a}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),a=new Uint8Array(o.length);for(let r=0;r<o.length;r++)a[r]=o.charCodeAt(r);n=a.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const a=new Uint8Array(n);let r="";for(let i=0;i<a.byteLength;i++)r+=String.fromCharCode(a[i]);localStorage.setItem("sv_device_key",btoa(r))}return this.importKey(n)}}const Me="SecureVaultDB",_e=1,w="files";function W(){return new Promise((e,t)=>{const n=indexedDB.open(Me,_e);n.onupgradeneeded=o=>{const a=o.target.result;a.objectStoreNames.contains(w)||a.createObjectStore(w,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const y={async saveFile(e){const t=await W();return new Promise((n,o)=>{const i=t.transaction(w,"readwrite").objectStore(w).put(e);i.onsuccess=()=>n(e.id),i.onerror=()=>o(i.error)})},async getAllFiles(){const e=await W();return new Promise((t,n)=>{const r=e.transaction(w,"readonly").objectStore(w).openCursor(),i=[];r.onsuccess=s=>{const d=s.target.result;if(d){const{content:l,...c}=d.value;i.push(c),d.continue()}else t(i)},r.onerror=()=>n(r.error)})},async getFile(e){const t=await W();return new Promise((n,o)=>{const i=t.transaction(w,"readonly").objectStore(w).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>o(i.error)})},async deleteFile(e){const t=await W();return new Promise((n,o)=>{const i=t.transaction(w,"readwrite").objectStore(w).delete(e);i.onsuccess=()=>n(),i.onerror=()=>o(i.error)})},async updateFile(e){return this.saveFile(e)}};var Fe=Ae();const X=document.getElementById("file-list"),Pe=document.getElementById("add-file-btn"),z=document.getElementById("add-modal"),V=document.getElementById("auth-modal"),he=document.getElementById("viewer"),B=document.getElementById("viewer-download-btn"),M=document.getElementById("file-input");document.getElementById("privacy-curtain");const Ke=document.getElementById("theme-toggle"),S=document.getElementById("search-input"),we=document.getElementById("sort-select"),Ne=document.getElementById("storage-text"),ze=document.getElementById("storage-fill"),ue=document.getElementById("bulk-actions"),Ue=document.getElementById("selected-count"),He=document.getElementById("bulk-delete-btn"),We=document.getElementById("cancel-select-btn"),oe=document.getElementById("info-modal"),Y=document.getElementById("rename-modal"),A=document.getElementById("strength-bar"),K=document.getElementById("strength-text"),$e=document.getElementById("export-all-btn"),je=document.getElementById("bulk-export-btn"),J=document.getElementById("recent-section"),Q=document.getElementById("recent-scroll"),$=document.getElementById("drop-zone"),pe=document.getElementById("stat-total"),me=document.getElementById("stat-images"),fe=document.getElementById("stat-videos"),ye=document.getElementById("stat-size"),te=document.getElementById("settings-modal"),ae=document.getElementById("change-pass-modal"),ve=document.getElementById("note-modal"),Oe=document.getElementById("settings-btn"),qe=document.getElementById("help-btn"),ge=document.getElementById("help-modal");let O=null,x=null,N=null,E=[],g=new Set,j=null,v=JSON.parse(localStorage.getItem("sv_recent")||"[]"),ee=null,Ee=null,Ve=null,ne=null,b=localStorage.getItem("sv_app_lock")||null,q=parseInt(localStorage.getItem("sv_autolock")||"300000");function _(e,t="",n={}){return new Promise(o=>{const a=document.getElementById("custom-prompt-modal"),r=document.getElementById("prompt-title"),i=document.getElementById("prompt-message"),s=document.getElementById("prompt-input"),d=document.getElementById("prompt-confirm"),l=document.getElementById("prompt-cancel");r.textContent=e,i.textContent=t,s.type=n.inputType||"text",s.placeholder=n.placeholder||"Enter value...",s.value="";const c=()=>{a.close(),d.onclick=null,l.onclick=null,s.onkeydown=null};d.onclick=()=>{const p=s.value;c(),o(p||null)},l.onclick=()=>{c(),o(null)},s.onkeydown=p=>{p.key==="Enter"&&(p.preventDefault(),d.click())},a.showModal(),setTimeout(()=>s.focus(),100)})}function L(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),r=document.getElementById("confirm-message"),i=document.getElementById("confirm-ok"),s=document.getElementById("confirm-cancel");a.textContent=e,r.textContent=t;let d=!1;const l=()=>{o.close(),i.onclick=null,s.onclick=null,o.removeEventListener("click",c),o.removeEventListener("close",p)},c=m=>{m.target===o&&!d&&(d=!0,l(),n(!1))},p=()=>{d||(d=!0,l(),n(!1))};i.onclick=()=>{d||(d=!0,l(),n(!0))},s.onclick=()=>{d||(d=!0,l(),n(!1))},o.addEventListener("click",c),o.addEventListener("close",p),o.showModal()})}function u(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),r=document.getElementById("alert-message"),i=document.getElementById("alert-ok");a.textContent=e,r.textContent=t;const s=()=>{o.close(),i.onclick=null};i.onclick=()=>{s(),n()},o.showModal()})}async function Ye(){Se(),tt(),H(),ht(),await h(),Re(),_t(),ke(),ft(),le()}Ye();function Re(){Pe.addEventListener("click",()=>z.showModal()),document.getElementById("cancel-add").addEventListener("click",()=>{z.close(),re()}),document.getElementById("confirm-add").addEventListener("click",At),document.getElementById("cancel-auth").addEventListener("click",()=>{V.close(),document.getElementById("auth-password").value="",O=null}),document.getElementById("confirm-auth").addEventListener("click",Mt),document.getElementById("close-viewer").addEventListener("click",Le),Ke?.addEventListener("click",xe),S?.addEventListener("input",ot),we?.addEventListener("change",at),document.getElementById("new-password")?.addEventListener("input",nt),He?.addEventListener("click",ct),je?.addEventListener("click",lt),We?.addEventListener("click",st),document.getElementById("select-all-btn")?.addEventListener("click",it),document.getElementById("close-info")?.addEventListener("click",()=>oe.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>Y.close()),document.getElementById("confirm-rename")?.addEventListener("click",Lt),$e?.addEventListener("click",dt),ut(),mt(),["click","keydown","scroll","touchstart"].forEach(n=>{document.addEventListener(n,ie,{passive:!0})}),qe?.addEventListener("click",()=>ge?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>ge?.close()),et(),Oe?.addEventListener("click",()=>{H(),te?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>te?.close()),document.getElementById("set-app-lock")?.addEventListener("click",Ft),document.getElementById("remove-app-lock")?.addEventListener("click",Pt),document.getElementById("set-recovery")?.addEventListener("click",Kt),document.getElementById("forgot-password-btn")?.addEventListener("click",Nt),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const n="coralgenz@zohomail.in",o=encodeURIComponent("SecureVault Feedback"),a=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${n}?subject=${o}&body=${a}`}),document.getElementById("panic-btn")?.addEventListener("click",zt),document.getElementById("panic-action-select")?.addEventListener("change",async n=>{const o=n.target.value,a=localStorage.getItem("sv_panic_action")||"blur";await L("Change Panic Action",`Set panic action to "${n.target.options[n.target.selectedIndex].text}"?`)?(localStorage.setItem("sv_panic_action",o),await u("Saved","Panic button action updated.")):n.target.value=a}),document.getElementById("panic-enable-toggle")?.addEventListener("change",n=>{const o=n.target.checked;localStorage.setItem("sv_panic_enabled",o),le(),o&&u("Panic Button Enabled","The panic button is now visible in the header.")}),document.getElementById("dl-media-toggle")?.addEventListener("change",n=>{localStorage.setItem("sv_dl_media",n.target.checked)}),document.getElementById("dl-doc-toggle")?.addEventListener("change",n=>{localStorage.setItem("sv_dl_doc",n.target.checked)}),document.getElementById("clear-all-btn")?.addEventListener("click",xt),document.getElementById("auto-lock-time")?.addEventListener("change",gt),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>ae?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",vt),document.getElementById("cancel-note")?.addEventListener("click",()=>ve?.close()),document.getElementById("confirm-note")?.addEventListener("click",Et);const e=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>e?.close()),document.getElementById("confirm-share")?.addEventListener("click",Ct),document.getElementById("share-logo")?.addEventListener("change",n=>{const o=n.target.files[0],a=document.getElementById("share-logo-text");a&&(a.textContent=o?o.name:"Choose File")}),M?.addEventListener("change",Ge),document.getElementById("file-remove-btn")?.addEventListener("click",Ze);const t=document.getElementById("file-upload-zone");t?.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t?.addEventListener("dragleave",()=>{t.classList.remove("drag-over")}),t?.addEventListener("drop",()=>{t.classList.remove("drag-over")}),document.addEventListener("contextmenu",n=>n.preventDefault()),document.addEventListener("keydown",n=>{(n.key==="PrintScreen"||n.ctrlKey&&n.key==="p")&&(n.preventDefault(),alert("Screenshots are disabled"))})}function re(){M.value="",document.getElementById("new-password").value="",document.getElementById("expiry-date").value="",document.getElementById("file-note").value="",A.className="strength-bar",K.innerText="Enter a password";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview");e?.classList.remove("hidden"),t?.classList.add("hidden")}function Ge(){const e=M.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){u("File Too Large","Please select a file smaller than 150 MB."),M.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),r=document.getElementById("file-preview-size");a.textContent=e.name,r.textContent=Xe(e.size),n?.classList.add("hidden"),o?.classList.remove("hidden")}function Ze(e){e.preventDefault(),e.stopPropagation(),M.value="";const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview");t?.classList.remove("hidden"),n?.classList.add("hidden")}function Xe(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function Je(e,t){try{const n=Ce(new Uint8Array(e),{type:"array"}),o=n.SheetNames;if(o.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const r=document.createElement("div");r.className="excel-header";const i=document.createElement("div");i.className="excel-table-wrapper";let s=o[0];const d=l=>{i.innerHTML="";const c=n.Sheets[l],p=De.sheet_to_json(c,{header:1,defval:""});if(!p||p.length===0){i.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const m=document.createElement("table");m.className="excel-table",p.forEach((T,k)=>{const I=document.createElement("tr");T.forEach(C=>{const F=k===0?"th":"td",D=document.createElement(F);D.textContent=C!==void 0?C:"",I.appendChild(D)}),m.appendChild(I)}),i.appendChild(m)};o.forEach(l=>{const c=document.createElement("button");c.className=`excel-sheet-btn ${l===s?"active":""}`,c.textContent=l,c.onclick=()=>{s=l,d(l),r.querySelectorAll(".excel-sheet-btn").forEach(p=>p.classList.remove("active")),c.classList.add("active")},r.appendChild(c)}),d(s),a.appendChild(r),a.appendChild(i),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${n.message}</div>`}}async function Qe(e,t){try{const{value:n,messages:o}=await Fe.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const r=document.createElement("div");r.className="word-document",r.innerHTML=n,a.appendChild(r),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}function et(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&re())})})}function tt(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function xe(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function nt(){const e=document.getElementById("new-password").value;let t=0;e.length>=6&&t++,e.length>=10&&t++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^A-Za-z0-9]/.test(e)&&t++,A.className="strength-bar",t<=1?(A.classList.add("weak"),K.innerText="Weak"):t===2?(A.classList.add("fair"),K.innerText="Fair"):t===3?(A.classList.add("good"),K.innerText="Good"):(A.classList.add("strong"),K.innerText="Strong 💪")}function ot(){const e=S.value.toLowerCase().trim();h(e)}function at(){h(S?.value||"")}function rt(e){const t=e.reduce((i,s)=>i+(s.size||0),0),n=(t/1024/1024).toFixed(2);Ne.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);ze.style.width=o+"%";const a=e.filter(i=>i.type?.startsWith("image")).length,r=e.filter(i=>i.type?.startsWith("video")).length;pe&&(pe.innerText=e.length),me&&(me.innerText=a),fe&&(fe.innerText=r),ye&&(ye.innerText=n)}function U(){const e=document.getElementById("select-all-btn");g.size>0?(ue.classList.remove("hidden"),Ue.innerText=`${g.size} selected`,e&&(g.size>=E.length&&E.length>0?e.innerText="Deselect All":e.innerText="Select All")):ue.classList.add("hidden")}function it(){g.size>=E.length&&E.length>0?g.clear():E.forEach(e=>g.add(e.id)),U(),h(S?.value||"")}function st(){g.clear(),U(),h(S?.value||"")}async function ct(){if(await L("Delete Files",`Delete ${g.size} file(s)? This cannot be undone.`)){for(const t of g)await y.deleteFile(t);g.clear(),U(),h(),await u("Success","Files deleted.")}}async function lt(){if(g.size!==0){await u("Export",`Exporting ${g.size} files. Each will download separately.`);for(const e of g)await y.getFile(e)&&await be(e);g.clear(),U(),h()}}async function be(e){const t=await y.getFile(e);if(!t)return;const n=await ce(t);if(!n||!n.buffer)return;const{buffer:o,password:a}=n;let r=a;r||(r=await _("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),r&&await se(t,o,r,{})}async function dt(){const e=await y.getAllFiles();if(e.length===0){await u("No Files","No files to export.");return}if(await L("Export All",`Export all ${e.length} files? Each will download separately.`)){for(const n of e)await be(n.id);await u("Success","All files exported!")}}function ut(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),$?.classList.remove("hidden"),$?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),$?.classList.add("hidden"),$?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)for(const o of n)await pt(o)})}async function pt(e){if(e.size>157286400){await u("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await _("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await f.generateKey(),a=f.generateSalt(),r=await f.deriveKeyFromPassword(n,a),i=await e.arrayBuffer(),{iv:s,ciphertext:d}=await f.encryptData(o,i),{iv:l,wrappedData:c}=await f.wrapKey(o,r),p={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:l,data:c}],content:d,iv:s,viewCount:0};await y.saveFile(p),h(),await u("Success",`${e.name} encrypted and saved!`)}function mt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&(e.preventDefault(),z.showModal()),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),S?.focus()),e.key==="Escape"&&(z.close(),V.close(),oe?.close(),Y?.close()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),xe())})}function ft(){ie()}function ie(){ee&&clearTimeout(ee),q>0&&(ee=setTimeout(yt,q))}function yt(){Le(),b?Se():location.reload()}function gt(){const e=document.getElementById("auto-lock-time");q=parseInt(e?.value||"300000"),localStorage.setItem("sv_autolock",q),ie()}async function ht(){const e=await y.getAllFiles(),t=Date.now();let n=0;for(const o of e)o.expiryDate&&new Date(o.expiryDate).getTime()<t&&(await y.deleteFile(o.id),n++);n>0&&console.log(`Auto-deleted ${n} expired file(s)`)}function wt(e,t,n){e.stopPropagation(),Ee=t,document.getElementById("change-pass-file").innerText=n,document.getElementById("current-password").value="",document.getElementById("new-password-change").value="",document.getElementById("confirm-password-change").value="",ae?.showModal()}async function vt(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await u("Required","Please fill all fields");return}if(t!==n){await u("Error","New passwords do not match");return}if(t.length<4){await u("Error","New password must be at least 4 characters");return}try{const o=await y.getFile(Ee);if(!o)throw new Error("File not found");const a=o.keys.find(p=>p.type==="password");if(!a)throw new Error("No password key found");const r=await f.deriveKeyFromPassword(e,a.salt),i=await f.unwrapKey(a.data,r,a.iv),s=f.generateSalt(),d=await f.deriveKeyFromPassword(t,s),{iv:l,wrappedData:c}=await f.wrapKey(i,d);o.keys=o.keys.filter(p=>p.type!=="password"),o.keys.push({type:"password",salt:s,iv:l,data:c}),o.accessLog=o.accessLog||[],o.accessLog.push({action:"password_changed",date:Date.now()}),await y.updateFile(o),ae?.close(),await u("Success","Password changed successfully!")}catch(o){console.error(o),await u("Error","Failed to change password. Current password may be incorrect.")}}async function Et(){const e=document.getElementById("edit-note").value.trim();try{const t=await y.getFile(Ve);t&&(t.note=e,await y.updateFile(t)),ve?.close(),h(S?.value||"")}catch(t){console.error(t),await u("Error","Failed to save note")}}async function xt(){if(!await L("⚠️ WARNING","This will delete ALL encrypted files permanently! Are you sure?")||!await L("Final Warning","This action CANNOT be undone."))return;if(await _("Confirm Delete","Type DELETE to confirm:",{placeholder:"DELETE"})!=="DELETE"){await u("Cancelled","Operation cancelled.");return}try{const o=await y.getAllFiles();for(const a of o)await y.deleteFile(a.id);localStorage.removeItem("sv_recent"),v=[],te?.close(),h(),await u("Success","All data has been cleared.")}catch(o){console.error(o),await u("Error","Error clearing data")}}function bt(e){v=v.filter(t=>t.id!==e.id),v.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),v.length>5&&(v=v.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(v)),ke()}function ke(){if(!J||!Q)return;const e=v.filter(t=>E.some(n=>n.id===t.id));if(e.length===0){J.classList.add("hidden");return}J.classList.remove("hidden"),Q.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),Q.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>Ie(t.dataset.id)})}async function kt(e,t){e.stopPropagation(),await L("Delete File","Delete this file permanently?")&&(await y.deleteFile(t),h())}async function It(e,t){e.stopPropagation();const n=E.find(s=>s.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode;const o=document.getElementById("info-expires");o&&(o.innerText=n.expiryDate?new Date(n.expiryDate).toLocaleString():"Never");const a=document.getElementById("info-views");a&&(a.innerText=n.viewCount||0);const r=document.getElementById("info-note");r&&(r.innerText=n.note||"-");const i=document.getElementById("access-log");i&&n.accessLog&&n.accessLog.length>0?i.innerHTML=n.accessLog.slice(-10).reverse().map(s=>`
      <div class="access-log-item">
        ${s.action.replace("_"," ")} - ${new Date(s.date).toLocaleString()}
      </div>
    `).join(""):i&&(i.innerHTML="No access history"),oe.showModal()}function Bt(e,t,n){e.stopPropagation(),j=t;const o=document.getElementById("rename-input");o.value=n,Y.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function Lt(){const e=document.getElementById("rename-input").value.trim();if(!e||!j)return;const t=await y.getFile(j);t&&(t.name=e,await y.updateFile(t)),Y.close(),j=null,h()}async function St(e,t){e.stopPropagation();try{const n=await y.getFile(t);if(!n)return;const o=await ce(n);if(!o||!o.buffer)return;const{buffer:a,password:r}=o;let i=r;if(i||(i=await _("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!i)return;await se(n,a,i,{})}catch(n){console.error(n),await u("Error","Share failed: "+n.message)}}function Tt(e,t){e.stopPropagation(),ne=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function Ct(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await u("Required","Please set a password for the file.");return}const a=document.getElementById("confirm-share"),r=a.innerText;a.innerText="Exporting...";try{const i=await y.getFile(ne);if(!i)throw new Error("File not found");const s=await ce(i,t);if(!s||!s.buffer)throw new Error("Decryption failed");const d=s.buffer;let l="";o.files&&o.files[0]&&(l=await new Promise(p=>{const m=new FileReader;m.onload=()=>p(m.result),m.readAsDataURL(o.files[0])})),await se(i,d,t,{title:n,logoUrl:l}),e.close(),ne=null}catch(i){console.error(i),await u("Error","Export failed: "+i.message)}finally{a.innerText=r}}async function se(e,t,n,o){const a=f.generateSalt(),r=await f.deriveKeyFromPassword(n,a),i={mode:e.authMode,expiry:e.expiryDate||null,type:e.type,name:e.name,id:e.id,permMedia:localStorage.getItem("sv_dl_media")==="true",permDoc:localStorage.getItem("sv_dl_doc")==="true",ts:Date.now(),nonce:crypto.randomUUID()},s=new TextEncoder().encode(JSON.stringify(i)),{iv:d,ciphertext:l}=await f.encryptData(r,s),{iv:c,ciphertext:p}=await f.encryptData(r,t),m=G=>new Promise(Te=>{const Z=new FileReader;Z.readAsDataURL(G),Z.onloadend=()=>{Te(Z.result.split(",")[1])}}),T=G=>btoa(String.fromCharCode(...new Uint8Array(G))),k=await m(new Blob([p])),I=await m(new Blob([l])),C=T(d),{header:F,footer:D}=Dt(e,a,c,o,I,C),R=new Blob([F,k,D],{type:"text/html"}),de=URL.createObjectURL(R),P=document.createElement("a");P.href=de,P.download=e.name+".secure.html",document.body.appendChild(P),P.click(),document.body.removeChild(P),URL.revokeObjectURL(de),await u("Success","Exported with tamper-proof encryption!")}function Dt(e,t,n,o={},a="",r=""){const i=k=>btoa(String.fromCharCode(...new Uint8Array(k))),s=i(t),d=i(n),l=o.title||"SecureVault",c=o.logoUrl||"",p=c?`<img src="${c}" alt="Logo" style="width:64px;height:64px;object-fit:contain;margin-bottom:16px;border-radius:12px;">`:'<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:#0f172a;margin-bottom:16px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';return{header:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${l} - Secure File</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',system-ui,-apple-system,sans-serif;background:#ffffff;color:#0f172a;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:24px}
        .container{background:#ffffff;padding:48px 32px;border-radius:16px;text-align:center;box-shadow:0 4px 6px -1px rgba(0,0,0,0.07),0 2px 4px -2px rgba(0,0,0,0.07);max-width:400px;width:100%;border:1px solid #e5e5e5}
        .brand{font-size:14px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px}
        h2{font-size:20px;font-weight:600;margin-bottom:8px;color:#0f172a}
        .filename{font-size:14px;color:#64748b;margin-bottom:24px;word-break:break-all}
        #input-area{display:flex;flex-direction:column;gap:12px}
        input{width:100%;padding:14px 16px;border-radius:8px;border:1px solid #e5e5e5;background:#fafafa;color:#0f172a;font-size:14px;font-family:inherit;outline:none;transition:border-color 0.2s,background 0.2s}
        input:focus{border-color:#a3a3a3;background:#ffffff}
        input::placeholder{color:#a3a3a3}
        button{background:#0f172a;color:#ffffff;border:none;padding:14px 24px;border-radius:8px;font-weight:600;font-size:14px;cursor:pointer;width:100%;font-family:inherit;transition:background 0.2s}
        button:hover{background:#1e293b}
        button:active{transform:scale(0.98)}
        #error{color:#dc2626;margin-top:12px;font-size:13px;display:none}
        #status{color:#64748b;margin-top:12px;font-size:12px;min-height:1.2em}
        #viewer{width:100%;height:100%;display:none;flex-direction:column;align-items:center;justify-content:flex-start;position:fixed;top:0;left:0;background:#ffffff;z-index:9999;padding:0;overflow-y:auto}
        #viewer.active{display:flex}
        video,audio,img{max-width:100%;max-height:80vh;border-radius:12px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.1)}
        .expired-msg{color:#dc2626;font-size:24px;font-weight:700;margin-bottom:12px}
        .viewer-top-bar{width:100%;display:flex;align-items:center;justify-content:flex-start;gap:12px;padding:12px 16px;background:#ffffff;border-bottom:1px solid #e5e5e5;box-sizing:border-box;flex-shrink:0;position:sticky;top:0;z-index:100}
        .btn-icon{width:40px;height:40px;border-radius:8px;border:1px solid #e5e5e5;background:#ffffff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748b;transition:all 0.2s ease;flex-shrink:0;padding:8px}
        .btn-icon:hover{background:#f5f5f5;color:#0f172a;transform:translateY(-1px);box-shadow:0 2px 4px rgba(0,0,0,0.05)}
        .btn-icon:active{transform:translateY(0)}
        .btn-icon svg{width:100%;height:100%;display:block}
        .viewer-content-area{width:100%;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;box-sizing:border-box;overflow:auto}
        .badge{display:inline-block;padding:4px 12px;background:#f5f5f5;border-radius:100px;font-size:11px;font-weight:600;color:#64748b;margin-bottom:16px;text-transform:uppercase;letter-spacing:0.02em}
        .badge.view-once{background:#fef2f2;color:#dc2626}
        .footer{margin-top:32px;font-size:11px;color:#a3a3a3}
        .excel-viewer{width:100%;height:100%;display:flex;flex-direction:column;background:#fff;border-radius:8px;border:1px solid #e5e5e5;overflow:hidden}
        .excel-header{display:flex;gap:8px;padding:8px 16px;background:#f5f5f5;border-bottom:1px solid #e5e5e5;overflow-x:auto}
        .excel-sheet-btn{padding:6px 12px;border-radius:4px;background:#fff;border:1px solid #e5e5e5;cursor:pointer;font-size:12px;font-weight:500;white-space:nowrap}
        .excel-sheet-btn:hover{background:#fafafa}
        .excel-sheet-btn.active{background:#22c55e;color:#fff;border-color:#22c55e}
        .excel-table-wrapper{overflow:auto;flex:1;background:#fff}
        .excel-table{border-collapse:collapse;min-width:100%;font-size:13px;font-family:monospace}
        .excel-table th,.excel-table td{border:1px solid #e5e5e5;padding:8px 12px;white-space:nowrap;max-width:300px;overflow:hidden;text-overflow:ellipsis}
        .excel-table th{background:#fafafa;font-weight:600;color:#404040;position:sticky;top:0;z-index:10;box-shadow:0 1px 0 #e5e5e5}
        .excel-table tr:hover{background:#f0fdf4}
        .word-viewer{width:100%;height:100%;overflow-y:auto;background:#f3f4f6;display:flex;justify-content:center;padding:40px 20px}
        .word-document{width:100%;max-width:816px;min-height:1056px;background:#fff;padding:60px 72px;box-shadow:0 10px 30px rgba(0,0,0,0.1);color:#000;font-family:'Calibri',sans-serif;line-height:1.5;font-size:16px}
        .word-document h1,.word-document h2,.word-document h3{color:#2f5597;margin-top:24px;margin-bottom:8px}
        .word-document p{margin-bottom:12px;text-align:justify}
        .word-document img{max-width:100%;height:auto}
        .tamper-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:#0f172a;display:flex;align-items:center;justify-content:center;z-index:99999;padding:24px}
        .tamper-card{background:#1e293b;padding:48px 32px;border-radius:16px;text-align:center;max-width:400px;width:100%;border:1px solid #dc2626}
        .tamper-card h2{color:#f87171;font-size:22px;margin-bottom:12px}
        .tamper-card p{color:#94a3b8;font-size:14px;line-height:1.6}
    </style>
    <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"><\/script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js"><\/script>
</head>
<body>
    <div id="auth" class="container">
        ${p}
        <div class="brand">${l}</div>
        <h2>Secure File</h2>
        <p class="filename">Encrypted File</p>
        
        <div id="input-area">
            <input type="password" id="pwd" placeholder="Enter password" autofocus>
            <button onclick="unlock()">Unlock File</button>
        </div>
        
        <p id="error">Incorrect password</p>
        <p id="status"></p>
        <p class="footer">Protected by ${l}</p>
    </div>
    
    <div id="viewer"></div>

    <script>
        /* SECUREVAULT TAMPER-PROOF ENGINE v3 */
        /* All security settings are AES-256-GCM encrypted inside the file. */
        /* Editing mode/expiry/permissions in the HTML has ZERO effect. */
        /* The code ONLY trusts decrypted config from the encrypted payload. */

        // Anti-inspection
        document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || (e.ctrlKey && e.key === 'u')) {
                e.preventDefault(); return false;
            }
            if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.shiftKey && e.key === 's')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(function() { document.body.style.opacity = '1'; }, 2000);
            }
        });

        // Encrypted data pointers (cannot be modified to change behavior)
        var _S = "${s}";
        var _I = "${d}";
        var _C = "${a}";
        var _CI = "${r}";

        function _b(b64) {
            var bin = atob(b64), len = bin.length, bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
            return bytes;
        }

        function _die(msg) {
            document.body.innerHTML = '<div class="tamper-overlay"><div class="tamper-card"><h2>Security Violation</h2><p>' + msg + '</p></div></div>';
        }

        // Integrity check — verifies critical encrypted payloads exist
        function _verify() {
            if (!_S || !_I || !_C || !_CI || _S.length < 10 || _I.length < 10 || _C.length < 10) {
                _die('This file has been tampered with. Encrypted security data is missing or corrupted.');
                return false;
            }
            return true;
        }

        async function _deriveKey(pwd, saltBytes) {
            var enc = new TextEncoder();
            var km = await window.crypto.subtle.importKey('raw', enc.encode(pwd), 'PBKDF2', false, ['deriveKey']);
            return window.crypto.subtle.deriveKey(
                { name: 'PBKDF2', salt: saltBytes, iterations: 100000, hash: 'SHA-256' },
                km, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
            );
        }

        // Decrypt the encrypted config to get REAL settings
        async function _decryptCfg(key) {
            try {
                var cfgIv = _b(_CI);
                var cfgData = _b(_C);
                var dec = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: cfgIv }, key, cfgData);
                return JSON.parse(new TextDecoder().decode(dec));
            } catch(e) {
                return null;
            }
        }

        // Self-destruct: download a burned copy for view-once
        function _selfDestruct(name) {
            var html = '<!DOCTYPE html><html><head><meta charset=UTF-8><meta name=viewport content="width=device-width,initial-scale=1.0"><title>File Expired</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter,system-ui,sans-serif;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px}.c{background:#1e293b;padding:48px 32px;border-radius:16px;text-align:center;max-width:400px;width:100%;border:1px solid #334155}h2{color:#f87171;font-size:22px;margin-bottom:12px}p{color:#94a3b8;font-size:14px;line-height:1.6}</style></head><body><div class=c><div style="font-size:48px;margin-bottom:16px">&#128293;</div><h2>File Destroyed</h2><p>This file was set to <b>View Once</b> mode and has been permanently destroyed after viewing.</p><p style="margin-top:16px;font-size:12px;color:#475569">This file can no longer be accessed.</p></div></body></html>';
            var blob = new Blob([html], {type: 'text/html'});
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = name + '.secure.html';
            document.body.appendChild(a);
            a.click();
            setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
        }

        function _showExpired(reason, detail) {
            var auth = document.getElementById('auth');
            var msg = 'This file has expired.';
            if (reason === 'time') msg = 'File expired on ' + new Date(detail).toLocaleString();
            else if (reason === 'view-once') msg = 'This file has already been viewed and destroyed.';
            auth.innerHTML = '<div class="expired-msg">File Expired</div><p style="color:#64748b">' + msg + '</p>';
        }

        async function unlock() {
            var pwd = document.getElementById('pwd').value;
            var btn = document.querySelector('#input-area button');
            var err = document.getElementById('error');
            var status = document.getElementById('status');
            
            if (!pwd) return;

            // Step 1: Integrity check
            if (!_verify()) return;

            try {
                if (btn) btn.innerText = 'Decrypting...';
                err.style.display = 'none';

                var salt = _b(_S);
                var iv = _b(_I);

                // Step 2: Derive key
                var key = await _deriveKey(pwd, salt);

                // Step 3: Decrypt config FIRST — this is the ONLY source of truth
                var cfg = await _decryptCfg(key);
                if (!cfg || !cfg.mode || !cfg.type || !cfg.name) {
                    throw new Error('Decryption failed');
                }

                // Step 4: Check expiry from ENCRYPTED config (editing HTML has no effect)
                if (cfg.expiry && Date.now() > new Date(cfg.expiry).getTime()) {
                    _showExpired('time', cfg.expiry);
                    return;
                }

                // Step 5: Check view-once from ENCRYPTED config
                var vk = 'sv_v_' + cfg.id + '_' + cfg.nonce;
                if (cfg.mode === 'view-once') {
                    try {
                        if (localStorage.getItem(vk)) {
                            _showExpired('view-once');
                            return;
                        }
                    } catch(e) {}
                }

                // Step 6: Decrypt file data
                var encrypted = _b(DATA);
                var decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, key, encrypted);

                // Step 7: Handle view-once — mark viewed + self-destruct
                if (cfg.mode === 'view-once') {
                    try { localStorage.setItem(vk, '1'); } catch(e) {}
                    _selfDestruct(cfg.name);
                }

                // Step 8: Handle persistent — save password
                if (cfg.mode === 'persistent') {
                    try { localStorage.setItem('sv_p_' + cfg.id, pwd); } catch(e) {}
                }

                // Step 9: Render using ENCRYPTED config values
                var TYPE = cfg.type;
                var NAME = cfg.name;
                var MODE = cfg.mode;

                // Download permission from encrypted config
                // VIEW-ONCE: ALWAYS disabled regardless of permissions
                var isMedia = TYPE.startsWith('image') || TYPE.startsWith('video') || TYPE.startsWith('audio');
                var isDoc = TYPE === 'application/pdf' || TYPE.indexOf('word') >= 0 || TYPE.indexOf('excel') >= 0 || TYPE.indexOf('spreadsheet') >= 0 || NAME.endsWith('.docx') || NAME.endsWith('.xlsx') || NAME.endsWith('.csv') || NAME.endsWith('.xls');
                var allowDL = false;
                if (MODE !== 'view-once') {
                    if (isMedia && cfg.permMedia === true) allowDL = true;
                    if (isDoc && cfg.permDoc === true) allowDL = true;
                }

                var blob = new Blob([decrypted], { type: TYPE });
                var url = URL.createObjectURL(blob);

                document.getElementById('auth').style.display = 'none';
                var v = document.getElementById('viewer');
                v.classList.add('active');
                v.innerHTML = '';

                // Top bar
                var topBar = document.createElement('div');
                topBar.className = 'viewer-top-bar';

                var closeBtn = document.createElement('button');
                closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                closeBtn.className = 'btn-icon';
                closeBtn.title = 'Close';
                closeBtn.onclick = function() { location.reload(); };
                topBar.appendChild(closeBtn);

                if (allowDL) {
                    var dlBtn = document.createElement('button');
                    dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
                    dlBtn.className = 'btn-icon';
                    dlBtn.title = 'Download';
                    dlBtn.onclick = function() {
                        var a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = NAME;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(function() { document.body.removeChild(a); }, 200);
                    };
                    topBar.appendChild(dlBtn);
                }

                v.appendChild(topBar);

                var contentArea = document.createElement('div');
                contentArea.className = 'viewer-content-area';

                if (TYPE.startsWith('video')) {
                    var vid = document.createElement('video');
                    vid.src = url; vid.controls = true; vid.autoplay = true;
                    vid.setAttribute('controlsList', 'nodownload');
                    vid.oncontextmenu = function(e) { e.preventDefault(); };
                    if (MODE === 'view-once') { vid.setAttribute('disablePictureInPicture', ''); }
                    contentArea.appendChild(vid);
                } else if (TYPE.startsWith('audio')) {
                    var aud = document.createElement('audio');
                    aud.src = url; aud.controls = true; aud.autoplay = true;
                    aud.setAttribute('controlsList', 'nodownload');
                    aud.oncontextmenu = function(e) { e.preventDefault(); };
                    contentArea.appendChild(aud);
                } else if (TYPE.startsWith('image')) {
                    var img = document.createElement('img');
                    img.src = url;
                    img.oncontextmenu = function(e) { e.preventDefault(); };
                    img.setAttribute('draggable', 'false');
                    contentArea.appendChild(img);
                } else if (TYPE === 'application/pdf' || TYPE.startsWith('text/')) {
                    var iframe = document.createElement('iframe');
                    iframe.src = allowDL ? url : url + '#toolbar=0';
                    iframe.style.cssText = 'width:100%;height:100%;border:none;background:#fff;border-radius:8px;';
                    contentArea.appendChild(iframe);
                } else if (
                    TYPE === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                    TYPE === 'application/vnd.ms-excel' ||
                    NAME.endsWith('.xlsx') || NAME.endsWith('.xls') || NAME.endsWith('.csv')
                ) {
                    try {
                        var wb = XLSX.read(new Uint8Array(decrypted), {type: 'array'});
                        var sn = wb.SheetNames;
                        if (sn.length > 0) {
                            var xlv = document.createElement('div'); xlv.className = 'excel-viewer';
                            var xlh = document.createElement('div'); xlh.className = 'excel-header';
                            var xlb = document.createElement('div'); xlb.className = 'excel-table-wrapper';
                            var renderSheet = function(n) {
                                xlb.innerHTML = '';
                                var ws = wb.Sheets[n];
                                var data = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});
                                if (!data || data.length === 0) { xlb.innerHTML = 'Empty'; return; }
                                var tbl = document.createElement('table'); tbl.className = 'excel-table';
                                data.forEach(function(r, i) {
                                    var tr = document.createElement('tr');
                                    r.forEach(function(c) {
                                        var el = i === 0 ? 'th' : 'td';
                                        var cell = document.createElement(el);
                                        cell.textContent = c !== undefined ? c : '';
                                        tr.appendChild(cell);
                                    });
                                    tbl.appendChild(tr);
                                });
                                xlb.appendChild(tbl);
                            };
                            sn.forEach(function(n) {
                                var shBtn = document.createElement('button');
                                shBtn.className = 'excel-sheet-btn';
                                if (n === sn[0]) shBtn.classList.add('active');
                                shBtn.textContent = n;
                                shBtn.onclick = function() {
                                    renderSheet(n);
                                    xlh.querySelectorAll('.excel-sheet-btn').forEach(function(b) { b.classList.remove('active'); });
                                    shBtn.classList.add('active');
                                };
                                xlh.appendChild(shBtn);
                            });
                            renderSheet(sn[0]);
                            xlv.appendChild(xlh); xlv.appendChild(xlb);
                            contentArea.appendChild(xlv);
                        }
                    } catch(e) { console.error(e); }
                } else if (
                    TYPE === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || NAME.endsWith('.docx')
                ) {
                    try {
                        window.mammoth.convertToHtml({arrayBuffer: decrypted})
                            .then(function(result) {
                                var wv = document.createElement('div'); wv.className = 'word-viewer';
                                var wd = document.createElement('div'); wd.className = 'word-document';
                                wd.innerHTML = result.value;
                                wv.appendChild(wd);
                                contentArea.appendChild(wv);
                            })
                            .catch(function(err) {
                                var msg = document.createElement('div');
                                msg.innerText = 'Error parsing document: ' + err.message;
                                msg.style.color = 'red';
                                contentArea.appendChild(msg);
                            });
                    } catch(e) { console.error(e); }
                } else {
                    var msgEl = document.createElement('p');
                    msgEl.innerText = 'Preview not supported for this file type.';
                    msgEl.style.cssText = 'color:#64748b;font-weight:500;margin-top:20px;';
                    contentArea.appendChild(msgEl);
                }

                v.appendChild(contentArea);
                
            } catch (e) {
                console.error(e);
                err.style.display = 'block';
                if (btn) btn.innerText = 'Unlock File';
                if (status) status.innerText = '';
            }
        }

        document.getElementById('pwd').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') unlock();
        });

        // On load: verify integrity
        window.onload = function() { _verify(); };
        
        var DATA = "`,footer:`";
    <\/script>
</body>
</html>`}}async function ce(e,t=null){let n=null,o=t;if(t)try{const r=e.keys.find(i=>i.type==="password");if(r){const i=await f.deriveKeyFromPassword(t,r.salt);n=await f.unwrapKey(r.data,i,r.iv)}}catch{console.log("Provided password invalid for unlock")}if(!n&&e.authMode==="persistent"){const r=e.keys.find(i=>i.type==="device");if(r)try{const i=await f.getDeviceKey();n=await f.unwrapKey(r.data,i,r.iv),t||(o=null)}catch{}}if(!n){const r=await _("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!r)return null;try{const i=e.keys.find(d=>d.type==="password"),s=await f.deriveKeyFromPassword(r,i.salt);n=await f.unwrapKey(i.data,s,i.iv),o=r}catch{return await u("Error","Incorrect password"),null}}return{buffer:await f.decryptData(n,e.iv,e.content),password:o}}async function At(){const e=M.files[0],t=document.getElementById("new-password").value,n=document.querySelector('input[name="auth-mode"]:checked').value,o=document.getElementById("expiry-date")?.value||null,a=document.getElementById("file-note")?.value||"";if(!e){await u("Required","Please select a file");return}if(!t){await u("Required","Password is required");return}const r=document.getElementById("confirm-add"),i=r.innerText;r.innerText="Encrypting...",r.disabled=!0;try{const s=await f.generateKey(),d=f.generateSalt(),l=await f.deriveKeyFromPassword(t,d),c=await e.arrayBuffer(),{iv:p,ciphertext:m}=await f.encryptData(s,c),{iv:T,wrappedData:k}=await f.wrapKey(s,l),I=[{type:"password",salt:d,iv:T,data:k}];if(n==="persistent"){const F=await f.getDeviceKey(),{iv:D,wrappedData:R}=await f.wrapKey(s,F);I.push({type:"device",iv:D,data:R})}const C={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:n,keys:I,content:m,iv:p,viewCount:0,expiryDate:o,note:a,accessLog:[{action:"created",date:Date.now()}]};await y.saveFile(C),z.close(),re(),h()}catch(s){console.error(s),await u("Error","Encryption failed: "+s.message)}finally{r.innerText=i,r.disabled=!1}}async function Ie(e){try{const t=await y.getFile(e);if(!t){await u("Error","File not found");return}if(O=t,t.authMode==="persistent"){const n=t.keys.find(o=>o.type==="device");if(n)try{const o=await f.getDeviceKey(),a=await f.unwrapKey(n.data,o,n.iv);return Be(t,a)}catch{console.log("Device unlock failed (key changed?), falling back to password")}}document.getElementById("auth-file-name").innerText=t.name,V.showModal()}catch(t){console.error(t),await u("Error","Error opening file")}}async function Mt(){const e=document.getElementById("auth-password").value;if(!O||!e)return;const t=document.getElementById("confirm-auth");t.innerText="Unlocking...";try{const n=O,o=n.keys.find(i=>i.type==="password");if(!o)throw new Error("Corrupt key data");const a=await f.deriveKeyFromPassword(e,o.salt),r=await f.unwrapKey(o.data,a,o.iv);V.close(),document.getElementById("auth-password").value="",Be(n,r)}catch(n){console.error(n),await u("Error","Incorrect password or error.")}finally{t.innerText="Unlock"}}async function Be(e,t){try{const n=await f.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});x=URL.createObjectURL(o);const a=document.getElementById("viewer-content");a.innerHTML="";const r=localStorage.getItem("sv_dl_media")==="true",i=localStorage.getItem("sv_dl_doc")==="true",s=e.type.startsWith("image")||e.type.startsWith("video")||e.type.startsWith("audio"),d=e.type==="application/pdf"||e.type.includes("word")||e.type.includes("excel")||e.type.includes("spreadsheet")||e.name.endsWith(".docx")||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv");let l=!1;if(s&&r&&(l=!0),d&&i&&(l=!0),B&&(l&&e.authMode!=="view-once"?(B.classList.remove("hidden"),B.onclick=()=>{const c=document.createElement("a");c.style.display="none",c.href=x,c.download=e.name,document.body.appendChild(c),c.click(),setTimeout(()=>document.body.removeChild(c),200)}):(B.classList.add("hidden"),B.onclick=null)),e.type.startsWith("image/")){const c=document.createElement("img");c.src=x,a.appendChild(c)}else if(e.type.startsWith("video/")||e.type.startsWith("audio/")){const c=document.createElement(e.type.startsWith("video/")?"video":"audio");c.src=x,c.controls=!0,c.autoplay=!0,l||(c.setAttribute("controlsList","nodownload"),c.oncontextmenu=p=>p.preventDefault()),a.appendChild(c)}else if(e.type==="application/pdf"){const c=document.createElement("iframe");c.src=x+(l?"":"#toolbar=0"),c.style.width="100%",c.style.height="100%",a.appendChild(c)}else e.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||e.type==="application/vnd.ms-excel"||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv")?Je(n,a):e.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e.name.endsWith(".docx")?await Qe(n,a):a.innerText="Preview not supported for this file type.";document.getElementById("viewer-filename").innerText=e.name,he.classList.remove("hidden"),bt(e),e.authMode==="view-once"?(N=e.id,document.getElementById("viewer-timer").classList.remove("hidden"),localStorage.setItem("sv_crash_guard",e.id),e.viewCount=(e.viewCount||0)+1,await y.updateFile(e)):(document.getElementById("viewer-timer").classList.add("hidden"),N=null)}catch(n){console.error(n),await u("Error","Decryption failed.")}}async function Le(){he.classList.add("hidden"),B&&B.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",x&&(URL.revokeObjectURL(x),x=null),N&&(await y.deleteFile(N),localStorage.removeItem("sv_crash_guard"),N=null,h(),await u("Security","File self-destructed as per security policy."))}async function _t(){const e=localStorage.getItem("sv_crash_guard");e&&(console.log("Detected unclean shutdown during self-destruct viewing. Cleaning up..."),await y.deleteFile(e),localStorage.removeItem("sv_crash_guard"),await u("Security Notice","A self-destruct file was detected during an unclean shutdown and has been securely removed."),h())}async function h(e=""){X.innerHTML="";let t=await y.getAllFiles();E=t,rt(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const n=we?.value||"date-desc";t.sort((a,r)=>{if(a.favorite&&!r.favorite)return-1;if(!a.favorite&&r.favorite)return 1;switch(n){case"date-desc":return(r.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(r.date||0);case"name-asc":return a.name.localeCompare(r.name);case"name-desc":return r.name.localeCompare(a.name);case"size-desc":return(r.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(r.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(E.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){X.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">🔐</div>
        <p>${e?"No files match your search.":"No secured files yet."}</p>
        <small>${e?"Try a different search term.":"Tap + to secure your first file"}</small>
      </div>`;return}t.forEach((a,r)=>{const i=document.createElement("div");i.className="file-card",i.style.animationDelay=`${r*.05}s`;const s=a.expiryDate&&new Date(a.expiryDate).getTime()<Date.now();i.onclick=async m=>{if(!m.target.closest(".file-actions")&&!m.target.closest(".select-checkbox")&&!m.target.closest(".favorite-btn")){if(s){await u("Expired","This file has expired and will be deleted."),y.deleteFile(a.id).then(()=>h());return}Ie(a.id)}};let d='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(d='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(d='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(d='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');let l="";a.authMode==="view-once"&&(l+='<span class="badge view-once">View Once</span>'),a.authMode==="persistent"&&(l+='<span class="badge persistent">Persistent</span>'),a.expiryDate&&(l+=`<span class="badge ${s?"view-once":""}">${s?"Expired":"Expires "+new Date(a.expiryDate).toLocaleString(void 0,{dateStyle:"short",timeStyle:"short"})}</span>`),a.note&&(l+=`<span class="badge" title="${a.note}">📝</span>`);const c=g.has(a.id);a.favorite;let p=a.name;i.innerHTML=`
        ${s?'<div class="expired-overlay">⏰ EXPIRED</div>':""}
        <input type="checkbox" class="select-checkbox" ${c?"checked":""} />
        
        <div class="file-left-col">
           <div class="file-icon">${d}</div>
           <div class="file-primary-actions">
               <button class="btn-highlight share-btn">Share</button>
               <button class="btn-highlight custom-share-btn">Custom</button>
           </div>
        </div>

        <div class="file-info">
            <h3>${p}</h3>
            <div class="file-meta">
                <span>${(a.size/1024/1024).toFixed(2)} MB</span>
                ${l}
            </div>
            <div class="file-actions">
                <button class="btn-small info-btn">Info</button>
                <button class="btn-small rename-btn">Rename</button>
                <button class="btn-small change-pass-btn">Change Password</button>
                <button class="btn-small delete-btn">Delete</button>
            </div>
        </div>
    `,i.querySelector(".select-checkbox").onchange=m=>{m.stopPropagation(),m.target.checked?g.add(a.id):g.delete(a.id),U()},i.querySelector(".info-btn").onclick=m=>It(m,a.id),i.querySelector(".rename-btn").onclick=m=>Bt(m,a.id,a.name),i.querySelector(".change-pass-btn").onclick=m=>wt(m,a.id,a.name),i.querySelector(".share-btn").onclick=m=>St(m,a.id),i.querySelector(".custom-share-btn").onclick=m=>Tt(m,a.id),i.querySelector(".delete-btn").onclick=m=>kt(m,a.id),X.appendChild(i)})}function H(){const e=document.getElementById("remove-app-lock");e&&(e.style.display=b?"block":"none");const t=localStorage.getItem("sv_panic_action")||"lock",n=document.getElementById("panic-action-select");n&&(n.value=t);const o=localStorage.getItem("sv_dl_media")==="true",a=localStorage.getItem("sv_dl_doc")==="true",r=document.getElementById("dl-media-toggle"),i=document.getElementById("dl-doc-toggle");r&&(r.checked=o),i&&(i.checked=a);const s=localStorage.getItem("sv_panic_enabled")==="true",d=document.getElementById("panic-enable-toggle");d&&(d.checked=s),le();const l=localStorage.getItem("sv_recovery_q"),c=document.getElementById("recovery-status"),p=document.getElementById("recovery-question");c&&(l?(c.style.display="block",c.innerText="✅ Recovery method set (Question: "+l+")",p&&(p.value=l)):(c.style.display="none",p&&(p.value="")))}async function Ft(){const e=document.getElementById("app-lock-password").value;if(!e){await u("Required","Please enter a password");return}const t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e)),n=Array.from(new Uint8Array(t)).map(o=>o.toString(16).padStart(2,"0")).join("");localStorage.setItem("sv_app_lock",n),b=n,await u("Success","App Lock Password Set!"),document.getElementById("app-lock-password").value="",H()}async function Pt(){await L("Remove App Lock","Remove App Lock password?")&&(localStorage.removeItem("sv_app_lock"),b=null,await u("Success","App Lock removed."),H())}async function Kt(){const e=document.getElementById("recovery-question").value.trim(),t=document.getElementById("recovery-answer").value.trim().toLowerCase();if(!e||!t){await u("Required","Please enter both a question and an answer.");return}const n=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)),o=Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("");localStorage.setItem("sv_recovery_q",e),localStorage.setItem("sv_recovery_a",o),await u("Success","Recovery method saved!"),document.getElementById("recovery-answer").value="",H()}async function Nt(){const e=localStorage.getItem("sv_recovery_q"),t=localStorage.getItem("sv_recovery_a");if(!e||!t){await u("No Recovery","No recovery method has been set. The app lock cannot be reset.");return}const n=await _("Password Recovery",`Security Question:
${e}`,{placeholder:"Enter your answer..."});if(!n)return;const o=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n.trim().toLowerCase()));Array.from(new Uint8Array(o)).map(r=>r.toString(16).padStart(2,"0")).join("")===t?(await u("Success"," Identity verified. App Lock has been removed."),localStorage.removeItem("sv_app_lock"),b=null,location.reload()):await u("Error","Incorrect answer.")}async function Se(){if(!b)return;const e=document.getElementById("app-lock-screen"),t=document.getElementById("lock-input"),n=document.getElementById("unlock-submit");e.classList.remove("hidden");const o=async()=>{const a=t.value;if(!a)return;const r=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(a));Array.from(new Uint8Array(r)).map(s=>s.toString(16).padStart(2,"0")).join("")===b?(e.classList.add("hidden"),t.value=""):(await u("Error","Incorrect Password"),t.value="",t.focus())};n.onclick=o,t.onkeydown=a=>{a.key==="Enter"&&o()}}function le(){const e=localStorage.getItem("sv_panic_enabled")==="true",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function zt(){const e=localStorage.getItem("sv_panic_action")||"lock";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await y.getAllFiles();for(const o of n)await y.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),location.reload()}catch(t){console.error(t)}})();else if(e==="lock"){if(!b){u("App Lock Not Set","Please set an App Lock password in Settings first to use this feature.");return}window.location.reload()}else if(e==="blur"){const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
           <div class="panic-message">System Error (0xCRITICAL)</div>
           <div class="panic-message" style="font-size:16px;font-weight:400;margin-bottom:24px;">Please reload the application.</div>
           <div class="reload-icon-btn" id="panic-reload-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <polyline points="23 4 23 10 17 10"></polyline>
                 <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
           </div>
           <div class="pull-to-reload">↓ Pull down or tap icon to reload</div> 
      `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",()=>{window.location.reload()})}else if(e==="loading"){const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`<div class="fake-loading-spinner"></div><div style="color:var(--gray-500)">Loading resources...</div>
      <div style="margin-top:20px; font-size:12px; opacity:0.5">(Touch to enter)</div>`,document.body.appendChild(t);const n=()=>t.remove();t.addEventListener("click",n),t.addEventListener("touchstart",n)}}}
