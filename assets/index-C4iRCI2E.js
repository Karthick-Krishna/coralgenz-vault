import"./jspdf-SUxvxRxM.js";import{r as be,u as xe}from"./xlsx-DFH0qU2H.js";import{r as ke}from"./mammoth-PVFyTYmD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();class p{constructor(){this.algo={name:"AES-GCM",length:256}}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(16))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n,o=1e5,a="SHA-256"){const r=new TextEncoder,s=await window.crypto.subtle.importKey("raw",r.encode(t),"PBKDF2",!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:o,hash:a},s,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async encryptData(t,n){const o=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:a}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:a}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),a=new Uint8Array(o.length);for(let r=0;r<o.length;r++)a[r]=o.charCodeAt(r);n=a.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const a=new Uint8Array(n);let r="";for(let s=0;s<a.byteLength;s++)r+=String.fromCharCode(a[s]);localStorage.setItem("sv_device_key",btoa(r))}return this.importKey(n)}}const Be="SecureVaultDB",Ie=1,b="files";function z(){return new Promise((e,t)=>{const n=indexedDB.open(Be,Ie);n.onupgradeneeded=o=>{const a=o.target.result;a.objectStoreNames.contains(b)||a.createObjectStore(b,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const g={async saveFile(e){const t=await z();return new Promise((n,o)=>{const s=t.transaction(b,"readwrite").objectStore(b).put(e);s.onsuccess=()=>n(e.id),s.onerror=()=>o(s.error)})},async getAllFiles(){const e=await z();return new Promise((t,n)=>{const r=e.transaction(b,"readonly").objectStore(b).openCursor(),s=[];r.onsuccess=c=>{const l=c.target.result;if(l){const{content:d,...i}=l.value;s.push(i),l.continue()}else t(s)},r.onerror=()=>n(r.error)})},async getFile(e){const t=await z();return new Promise((n,o)=>{const s=t.transaction(b,"readonly").objectStore(b).get(e);s.onsuccess=()=>n(s.result),s.onerror=()=>o(s.error)})},async deleteFile(e){const t=await z();return new Promise((n,o)=>{const s=t.transaction(b,"readwrite").objectStore(b).delete(e);s.onsuccess=()=>n(),s.onerror=()=>o(s.error)})},async updateFile(e){return this.saveFile(e)}};var Le=ke();const Y=document.getElementById("file-list");document.getElementById("add-file-btn");const $=document.getElementById("auth-modal"),de=document.getElementById("viewer"),S=document.getElementById("viewer-download-btn"),C=document.getElementById("file-input");document.getElementById("privacy-curtain");const Se=document.getElementById("theme-toggle"),P=document.getElementById("search-input"),ue=document.getElementById("sort-select"),Te=document.getElementById("storage-text"),Ce=document.getElementById("storage-fill"),ae=document.getElementById("bulk-actions"),Ae=document.getElementById("selected-count"),Pe=document.getElementById("bulk-delete-btn"),Me=document.getElementById("cancel-select-btn"),ee=document.getElementById("info-modal"),j=document.getElementById("rename-modal"),A=document.getElementById("strength-bar"),F=document.getElementById("strength-text"),De=document.getElementById("bulk-export-btn"),G=document.getElementById("recent-section"),Z=document.getElementById("recent-scroll"),N=document.getElementById("drop-zone"),re=document.getElementById("stat-total"),se=document.getElementById("stat-images"),ce=document.getElementById("stat-videos"),ie=document.getElementById("stat-size"),X=document.getElementById("settings-modal"),me=document.getElementById("change-pass-modal"),Fe=document.getElementById("settings-btn"),Ke=document.getElementById("help-btn"),le=document.getElementById("help-modal");let H=null,T=null,k=[],h=new Set,U=null,I=JSON.parse(localStorage.getItem("sv_recent")||"[]"),J=null,_e=null,Q=null,L=localStorage.getItem("sv_app_lock")||null,W=parseInt(localStorage.getItem("sv_autolock")||"300000");function M(e,t="",n={}){return new Promise(o=>{const a=document.getElementById("custom-prompt-modal"),r=document.getElementById("prompt-title"),s=document.getElementById("prompt-message"),c=document.getElementById("prompt-input"),l=document.getElementById("prompt-confirm"),d=document.getElementById("prompt-cancel");r.textContent=e,s.textContent=t,c.type=n.inputType||"text",c.placeholder=n.placeholder||"Enter value...",c.value="";const i=()=>{a.close(),l.onclick=null,d.onclick=null,c.onkeydown=null};l.onclick=()=>{const u=c.value;i(),o(u||null)},d.onclick=()=>{i(),o(null)},c.onkeydown=u=>{u.key==="Enter"&&(u.preventDefault(),l.click())},a.showModal(),setTimeout(()=>c.focus(),100)})}function R(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),r=document.getElementById("confirm-message"),s=document.getElementById("confirm-ok"),c=document.getElementById("confirm-cancel");a.textContent=e,r.textContent=t;let l=!1;const d=()=>{o.close(),s.onclick=null,c.onclick=null,o.removeEventListener("click",i),o.removeEventListener("close",u)},i=y=>{y.target===o&&!l&&(l=!0,d(),n(!1))},u=()=>{l||(l=!0,d(),n(!1))};s.onclick=()=>{l||(l=!0,d(),n(!0))},c.onclick=()=>{l||(l=!0,d(),n(!1))},o.addEventListener("click",i),o.addEventListener("close",u),o.showModal()})}function m(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),r=document.getElementById("alert-message"),s=document.getElementById("alert-ok");a.textContent=e,r.textContent=t;const c=()=>{o.close(),s.onclick=null};s.onclick=()=>{c(),n()},o.showModal()})}async function ze(){Ee(),Re(),_(),await w(),Ne(),vt(),ye(),ot(),oe()}ze();function Ne(){document.getElementById("cancel-add").addEventListener("click",()=>{q()}),document.getElementById("confirm-add").addEventListener("click",gt),document.getElementById("cancel-auth").addEventListener("click",()=>{$.close(),document.getElementById("auth-password").value="",H=null}),document.getElementById("confirm-auth").addEventListener("click",ht),document.getElementById("close-viewer").addEventListener("click",ve),Se?.addEventListener("click",fe),P?.addEventListener("input",Ve),ue?.addEventListener("change",Oe),document.getElementById("new-password")?.addEventListener("input",qe),Pe?.addEventListener("click",Xe),De?.addEventListener("click",Je),Me?.addEventListener("click",Ze),document.getElementById("select-all-btn")?.addEventListener("click",Ge),document.getElementById("close-info")?.addEventListener("click",()=>ee.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>j.close()),document.getElementById("confirm-rename")?.addEventListener("click",mt),et(),nt(),["click","keydown","scroll","touchstart"].forEach(n=>{document.addEventListener(n,te,{passive:!0})}),Ke?.addEventListener("click",()=>le?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>le?.close()),je(),Fe?.addEventListener("click",()=>{_(),X?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>X?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>X?.close()),document.getElementById("set-app-lock")?.addEventListener("click",Et),document.getElementById("remove-app-lock")?.addEventListener("click",bt),document.getElementById("set-recovery")?.addEventListener("click",xt),document.getElementById("forgot-password-btn")?.addEventListener("click",kt),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const n="coralgenz@zohomail.in",o=encodeURIComponent("SecureVault Feedback"),a=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${n}?subject=${o}&body=${a}`}),document.getElementById("panic-btn")?.addEventListener("click",Bt),document.getElementById("panic-action-select")?.addEventListener("change",async n=>{const o=n.target.value,a=localStorage.getItem("sv_panic_action")||"blur";await R("Change Panic Action",`Set panic action to "${n.target.options[n.target.selectedIndex].text}"?`)?(localStorage.setItem("sv_panic_action",o),await m("Saved","Panic button action updated.")):n.target.value=a}),document.getElementById("panic-enable-toggle")?.addEventListener("change",n=>{const o=n.target.checked;localStorage.setItem("sv_panic_enabled",o),oe(),o&&m("Panic Button Enabled","The panic button is now visible in the header.")}),document.getElementById("dl-media-toggle")?.addEventListener("change",n=>{localStorage.setItem("sv_dl_media",n.target.checked)}),document.getElementById("dl-doc-toggle")?.addEventListener("change",n=>{localStorage.setItem("sv_dl_doc",n.target.checked)}),document.getElementById("auto-lock-time")?.addEventListener("change",rt),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>me?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",st);const e=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>e?.close()),document.getElementById("confirm-share")?.addEventListener("click",yt),document.getElementById("share-logo")?.addEventListener("change",n=>{const o=n.target.files[0],a=document.getElementById("share-logo-text");a&&(a.textContent=o?o.name:"Choose File")}),C?.addEventListener("change",pe),document.getElementById("file-remove-btn")?.addEventListener("click",Ue);const t=document.getElementById("file-upload-zone");t?.addEventListener("dragover",n=>{n.preventDefault(),t.classList.add("drag-over")}),t?.addEventListener("dragleave",()=>{t.classList.remove("drag-over")}),t?.addEventListener("drop",()=>{t.classList.remove("drag-over")}),document.addEventListener("contextmenu",n=>n.preventDefault()),document.addEventListener("keydown",n=>{(n.key==="PrintScreen"||n.ctrlKey&&n.key==="p")&&(n.preventDefault(),alert("Screenshots are disabled"))})}function q(){C.value="",document.getElementById("new-password").value="",A.className="strength-bar",F.innerText="Enter a password";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview");e?.classList.remove("hidden"),t?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function pe(){const e=C.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){m("File Too Large","Please select a file smaller than 150 MB."),C.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),r=document.getElementById("file-preview-size");a.textContent=e.name,r.textContent=He(e.size),n?.classList.add("hidden"),o?.classList.remove("hidden"),document.getElementById("inline-password-section")?.classList.remove("hidden")}function Ue(e){e.preventDefault(),e.stopPropagation(),C.value="";const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview");t?.classList.remove("hidden"),n?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function He(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function We(e,t){try{const n=be(new Uint8Array(e),{type:"array"}),o=n.SheetNames;if(o.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const r=document.createElement("div");r.className="excel-header";const s=document.createElement("div");s.className="excel-table-wrapper";let c=o[0];const l=d=>{s.innerHTML="";const i=n.Sheets[d],u=xe.sheet_to_json(i,{header:1,defval:""});if(!u||u.length===0){s.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const y=document.createElement("table");y.className="excel-table",u.forEach((x,f)=>{const v=document.createElement("tr");x.forEach(E=>{const D=f===0?"th":"td",B=document.createElement(D);B.textContent=E!==void 0?E:"",v.appendChild(B)}),y.appendChild(v)}),s.appendChild(y)};o.forEach(d=>{const i=document.createElement("button");i.className=`excel-sheet-btn ${d===c?"active":""}`,i.textContent=d,i.onclick=()=>{c=d,l(d),r.querySelectorAll(".excel-sheet-btn").forEach(u=>u.classList.remove("active")),i.classList.add("active")},r.appendChild(i)}),l(c),a.appendChild(r),a.appendChild(s),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${n.message}</div>`}}async function $e(e,t){try{const{value:n,messages:o}=await Le.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const r=document.createElement("div");r.className="word-document",r.innerHTML=n,a.appendChild(r),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}function je(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&q())})})}function Re(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function fe(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function qe(){const e=document.getElementById("new-password").value;let t=0;e.length>=6&&t++,e.length>=10&&t++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&t++,/[0-9]/.test(e)&&t++,/[^A-Za-z0-9]/.test(e)&&t++,A.className="strength-bar",t<=1?(A.classList.add("weak"),F.innerText="Weak"):t===2?(A.classList.add("fair"),F.innerText="Fair"):t===3?(A.classList.add("good"),F.innerText="Good"):(A.classList.add("strong"),F.innerText="Strong 💪")}function Ve(){const e=P.value.toLowerCase().trim();w(e)}function Oe(){w(P?.value||"")}function Ye(e){const t=e.reduce((s,c)=>s+(c.size||0),0),n=(t/1024/1024).toFixed(2);Te.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);Ce.style.width=o+"%";const a=e.filter(s=>s.type?.startsWith("image")).length,r=e.filter(s=>s.type?.startsWith("video")).length;re&&(re.innerText=e.length),se&&(se.innerText=a),ce&&(ce.innerText=r),ie&&(ie.innerText=n)}function K(){const e=document.getElementById("select-all-btn");h.size>0?(ae.classList.remove("hidden"),Ae.innerText=`${h.size} selected`,e&&(h.size>=k.length&&k.length>0?e.innerText="Deselect All":e.innerText="Select All")):ae.classList.add("hidden")}function Ge(){h.size>=k.length&&k.length>0?h.clear():k.forEach(e=>h.add(e.id)),K(),w(P?.value||"")}function Ze(){h.clear(),K(),w(P?.value||"")}async function Xe(){if(await R("Delete Files",`Delete ${h.size} file(s)? This cannot be undone.`)){for(const t of h)await g.deleteFile(t);h.clear(),K(),w(),await m("Success","Files deleted.")}}async function Je(){if(h.size!==0){await m("Export",`Exporting ${h.size} files. Each will download separately.`);for(const e of h)await g.getFile(e)&&await Qe(e);h.clear(),K(),w()}}async function Qe(e){const t=await g.getFile(e);if(!t)return;const n=await V(t);if(!n||!n.buffer)return;const{buffer:o,password:a}=n;let r=a;if(r||(r=await M("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;const s=p.generateSalt(),c=await p.deriveKeyFromPassword(r,s,6e5),{iv:l,ciphertext:d}=await p.encryptData(c,o),u=await(D=>new Promise(B=>{const O=new FileReader;O.readAsDataURL(D),O.onloadend=()=>B(O.result.split(",")[1])}))(new Blob([d])),{header:y,footer:x}=he(t,s,l),f=new Blob([y,u,x],{type:"text/html"}),v=URL.createObjectURL(f),E=document.createElement("a");E.href=v,E.download=t.name+".secure.html",document.body.appendChild(E),E.click(),document.body.removeChild(E),URL.revokeObjectURL(v)}function et(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),N?.classList.remove("hidden"),N?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),N?.classList.add("hidden"),N?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)if(n.length===1){const o=new DataTransfer;o.items.add(n[0]),C.files=o.files,pe(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const o of n)await tt(o)})}async function tt(e){if(e.size>157286400){await m("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await M("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await p.generateKey(),a=p.generateSalt(),r=await p.deriveKeyFromPassword(n,a),s=await e.arrayBuffer(),{iv:c,ciphertext:l}=await p.encryptData(o,s),{iv:d,wrappedData:i}=await p.wrapKey(o,r),u={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:d,data:i}],content:l,iv:c,viewCount:0};await g.saveFile(u),w(),await m("Success",`${e.name} encrypted and saved!`)}function nt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),P?.focus()),e.key==="Escape"&&(q(),$.close(),ee?.close(),j?.close()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),fe())})}function ot(){te()}function te(){J&&clearTimeout(J),W>0&&(J=setTimeout(at,W))}function at(){ve(),L?Ee():location.reload()}function rt(){const e=document.getElementById("auto-lock-time");W=parseInt(e?.value||"300000"),localStorage.setItem("sv_autolock",W),te()}async function st(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await m("Required","Please fill all fields");return}if(t!==n){await m("Error","New passwords do not match");return}if(t.length<4){await m("Error","New password must be at least 4 characters");return}try{const o=await g.getFile(_e);if(!o)throw new Error("File not found");const a=o.keys.find(u=>u.type==="password");if(!a)throw new Error("No password key found");const r=await p.deriveKeyFromPassword(e,a.salt),s=await p.unwrapKey(a.data,r,a.iv),c=p.generateSalt(),l=await p.deriveKeyFromPassword(t,c),{iv:d,wrappedData:i}=await p.wrapKey(s,l);o.keys=o.keys.filter(u=>u.type!=="password"),o.keys.push({type:"password",salt:c,iv:d,data:i}),o.accessLog=o.accessLog||[],o.accessLog.push({action:"password_changed",date:Date.now()}),await g.updateFile(o),me?.close(),await m("Success","Password changed successfully!")}catch(o){console.error(o),await m("Error","Failed to change password. Current password may be incorrect.")}}function ct(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function it(e){I=I.filter(t=>t.id!==e.id),I.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),I.length>5&&(I=I.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(I)),ye()}function ye(){if(!G||!Z)return;const e=I.filter(t=>k.some(n=>n.id===t.id));if(e.length===0){G.classList.add("hidden");return}G.classList.remove("hidden"),Z.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),Z.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>we(t.dataset.id)})}async function lt(e,t){e.stopPropagation(),await R("Delete File","Delete this file permanently?")&&(await g.deleteFile(t),w())}async function dt(e,t){e.stopPropagation();const n=k.find(r=>r.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode;const o=document.getElementById("info-views");o&&(o.innerText=n.viewCount||0);const a=document.getElementById("access-log");a&&n.accessLog&&n.accessLog.length>0?a.innerHTML=n.accessLog.slice(-10).reverse().map(r=>`
      <div class="access-log-item">
        ${r.action.replace("_"," ")} - ${new Date(r.date).toLocaleString()}
      </div>
    `).join(""):a&&(a.innerHTML="No access history"),ee.showModal()}function ut(e,t,n){e.stopPropagation(),U=t;const o=document.getElementById("rename-input");o.value=n,j.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function mt(){const e=document.getElementById("rename-input").value.trim();if(!e||!U)return;const t=await g.getFile(U);t&&(t.name=e,await g.updateFile(t)),j.close(),U=null,w()}async function ge(e,t){e&&e.stopPropagation();try{const n=await g.getFile(t);if(!n){await m("Error","File not found");return}const o=await V(n);if(!o||!o.buffer)return;const{buffer:a,password:r}=o;let s=r;if(s||(s=await M("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!s)return;await ne(n,a,s,{},"Downloaded! The protected file has been saved."),ct(n,"downloaded"),await g.updateFile(n)}catch(n){console.error(n),await m("Error","Failed to download file: "+(n.message||"Decryption error"))}}async function pt(e,t){e.stopPropagation();try{const n=await g.getFile(t);if(!n)return;const o=await V(n);if(!o||!o.buffer)return;const{buffer:a,password:r}=o;let s=r;if(s||(s=await M("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!s)return;await ne(n,a,s,{})}catch(n){console.error(n),await m("Error","Share failed: "+n.message)}}function ft(e,t){e.stopPropagation(),Q=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function yt(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await m("Required","Please set a password for the file.");return}const a=document.getElementById("confirm-share"),r=a.innerText;a.innerText="Exporting...";try{const s=await g.getFile(Q);if(!s)throw new Error("File not found");const c=await V(s,t);if(!c||!c.buffer)throw new Error("Decryption failed");const l=c.buffer;let d="";o.files&&o.files[0]&&(d=await new Promise(u=>{const y=new FileReader;y.onload=()=>u(y.result),y.readAsDataURL(o.files[0])})),await ne(s,l,t,{title:n,logoUrl:d}),e.close(),Q=null}catch(s){console.error(s),await m("Error","Export failed: "+s.message)}finally{a.innerText=r}}async function ne(e,t,n,o={},a="Protected file downloaded successfully!"){const r=p.generateSalt(),s=await p.deriveKeyFromPassword(n,r,6e5),{iv:c,ciphertext:l}=await p.encryptData(s,t),i=await(E=>new Promise(D=>{const B=new FileReader;B.readAsDataURL(E),B.onloadend=()=>{D(B.result.split(",")[1])}}))(new Blob([l])),{header:u,footer:y}=he(e,r,c,o),x=new Blob([u,i,y],{type:"text/html"}),f=URL.createObjectURL(x),v=document.createElement("a");v.href=f,v.download=e.name+".secure.html",document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(f),await m("Success",a)}function he(e,t,n,o={}){const a=y=>btoa(String.fromCharCode(...new Uint8Array(y))),r=a(t),s=a(n),c=o.title||"SecureVault",l=o.logoUrl||"",d=l?`<img src="${l}" alt="Logo" style="width:64px;height:64px;object-fit:contain;margin-bottom:16px;border-radius:12px;">`:'<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color:#0f172a;margin-bottom:16px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';return{header:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${c} - ${e.name}</title>
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

        /* Excel View Styles in Export */
        .excel-viewer{width:100%;height:100%;display:flex;flex-direction:column;background:#fff;border-radius:8px;border:1px solid #e5e5e5;overflow:hidden}
        .excel-header{display:flex;gap:8px;padding:8px 16px;background:#f5f5f5;border-bottom:1px solid #e5e5e5;overflow-x:auto}
        .excel-sheet-btn{padding:6px 12px;border-radius:4px;background:#fff;border:1px solid #e5e5e5;cursor:pointer;font-size:12px;font-weight:500;white-space:nowrap}
        .excel-sheet-btn:hover{background:#fafafa}
        .excel-sheet-btn.active{background:#22c55e;color:#fff;border-color:#22c55e}
        .excel-table-wrapper{overflow:auto;flex:1;background:#fff}
        .excel-table{border-collapse:collapse;min-width:100%;font-size:13px;font-family:monospace}
        .excel-table th, .excel-table td{border:1px solid #e5e5e5;padding:8px 12px;white-space:nowrap;max-width:300px;overflow:hidden;text-overflow:ellipsis}
        .excel-table th{background:#fafafa;font-weight:600;color:#404040;position:sticky;top:0;z-index:10;box-shadow:0 1px 0 #e5e5e5}
        .excel-table tr:hover{background:#f0fdf4}

        /* Word View Styles in Export */
        .word-viewer{width:100%;height:100%;overflow-y:auto;background:#f3f4f6;display:flex;justify-content:center;padding:40px 20px}
        .word-document{width:100%;max-width:816px;min-height:1056px;background:#fff;padding:60px 72px;box-shadow:0 10px 30px rgba(0,0,0,0.1);color:#000;font-family:'Calibri',sans-serif;line-height:1.5;font-size:16px}
        .word-document h1,.word-document h2,.word-document h3{color:#2f5597;margin-top:24px;margin-bottom:8px}
        .word-document p{margin-bottom:12px;text-align:justify}
        .word-document img{max-width:100%;height:auto}
    </style>
    <script defer src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"><\/script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js"><\/script>
</head>
<body>
    <div id="auth" class="container">
        ${d}
        <div class="brand">${c}</div>
        <h2>Secure File</h2>
        <p class="filename">${e.name}</p>
        
        <div id="input-area">
            <input type="password" id="pwd" placeholder="Enter password" autofocus>
            <button onclick="unlock()">Unlock File</button>
        </div>
        
        <p id="error">Incorrect password</p>
        <p id="status"></p>
        <p class="footer">Protected by ${c}</p>
    </div>
    
    <div id="viewer"></div>

    <script>
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p') || (e.ctrlKey && e.shiftKey && e.key === 's')) {
                e.preventDefault();
                alert('Screen capture is restricted.');
                document.body.style.opacity = '0';
                setTimeout(() => document.body.style.opacity = '1', 2000);
            }
        });

        const SALT = "${r}";
        const IV = "${s}";
        const TYPE = "${e.type}";
        const NAME = "${e.name}";
        const ID = "${e.id}";
        const MODE = "${e.authMode}";
        
        // injected permissions
        const PERM_MEDIA = ${localStorage.getItem("sv_dl_media")==="true"};
        const PERM_DOC = ${localStorage.getItem("sv_dl_doc")==="true"};

        window.onload = function() {
        };

        function toUint8(b64) {
            const bin = atob(b64);
            const len = bin.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
            return bytes;
        }

        async function unlock() {
            let pwd = document.getElementById('pwd').value;
            const btn = document.querySelector('#input-area button');
            const err = document.getElementById('error');
            const status = document.getElementById('status');
            
            if (!pwd) return;

            try {
                if(btn) btn.innerText = "Decrypting...";
                err.style.display = 'none';
                
                const salt = toUint8(SALT);
                const iv = toUint8(IV);
                const encrypted = toUint8(DATA);
                
                const enc = new TextEncoder();
                const keyMaterial = await window.crypto.subtle.importKey("raw", enc.encode(pwd), "PBKDF2", false, ["deriveKey"]);
                const key = await window.crypto.subtle.deriveKey({ name: "PBKDF2", salt: salt, iterations: 600000, hash: "SHA-256" }, keyMaterial, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
                
                const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encrypted);
                
                const blob = new Blob([decrypted], { type: TYPE });
                const url = URL.createObjectURL(blob);
                
                document.getElementById('auth').style.display = 'none';
                const v = document.getElementById('viewer');
                v.classList.add('active'); // Use class for display toggle
                v.innerHTML = ''; // Clear previous content

                // Determine Download Permission
                const isMedia = TYPE.startsWith('image') || TYPE.startsWith('video') || TYPE.startsWith('audio');
                const isDoc = TYPE === 'application/pdf' || TYPE.includes('word') || TYPE.includes('excel') || TYPE.includes('spreadsheet') || NAME.endsWith('.docx') || NAME.endsWith('.xlsx') || NAME.endsWith('.csv') || NAME.endsWith('.xls');
                
                let allowDL = false;
                if (isMedia && PERM_MEDIA) allowDL = true;
                if (isDoc && PERM_DOC) allowDL = true;

                // Top bar with close + download
                const topBar = document.createElement('div');
                topBar.className = 'viewer-top-bar';

                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                closeBtn.className = 'btn-icon';
                closeBtn.title = 'Close';
                closeBtn.onclick = () => location.reload();
                topBar.appendChild(closeBtn);

                if (allowDL) {
                    const dlBtn = document.createElement('button');
                    dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>';
                    dlBtn.className = 'btn-icon';
                    dlBtn.title = 'Download Protected File';
                    dlBtn.onclick = function() {
                        const pageHtml = '<!DOCTYPE html>
' + document.documentElement.outerHTML;
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        const blob = new Blob([pageHtml], { type: 'text/html' });
                        const u = URL.createObjectURL(blob);
                        a.href = u;
                        const outName = NAME.endsWith('.secure.html') ? NAME : (NAME + '.secure.html');
                        a.download = outName;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(function(){ document.body.removeChild(a); URL.revokeObjectURL(u); }, 200);
                    };
                    topBar.appendChild(dlBtn);
                }

                v.appendChild(topBar);

                // Content area
                const contentArea = document.createElement('div');
                contentArea.className = 'viewer-content-area';

                if (TYPE.startsWith('video')) {
                    const vid = document.createElement('video');
                    vid.src = url;
                    vid.controls = true;
                    vid.autoplay = true;
                    if (!allowDL) {
                        vid.setAttribute('controlsList', 'nodownload');
                        vid.oncontextmenu = (e) => e.preventDefault();
                    }
                    contentArea.appendChild(vid);
                } else if (TYPE.startsWith('audio')) {
                    const aud = document.createElement('audio');
                    aud.src = url;
                    aud.controls = true;
                    aud.autoplay = true;
                    if (!allowDL) {
                        aud.setAttribute('controlsList', 'nodownload');
                        aud.oncontextmenu = (e) => e.preventDefault();
                    }
                    contentArea.appendChild(aud);
                } else if (TYPE.startsWith('image')) {
                    const img = document.createElement('img');
                    img.src = url;
                    contentArea.appendChild(img);
                } else if (TYPE === 'application/pdf' || TYPE.startsWith('text/')) {
                    const iframe = document.createElement('iframe');
                    iframe.src = allowDL ? url : url + '#toolbar=0';
                    iframe.style.cssText = "width:100%;height:100%;border:none;background:#fff;border-radius:8px;";
                    contentArea.appendChild(iframe);
                } else if (
                    TYPE === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                    TYPE === 'application/vnd.ms-excel' ||
                    NAME.endsWith('.xlsx') || 
                    NAME.endsWith('.xls') ||
                    NAME.endsWith('.csv')
                ) {
                    // Excel Logic
                    try {
                        const wb = XLSX.read(new Uint8Array(decrypted), {type: 'array'});
                        const sn = wb.SheetNames;
                        if(sn.length > 0) {
                             const viewer = document.createElement('div');
                             viewer.className = 'excel-viewer';
                             const header = document.createElement('div');
                             header.className = 'excel-header';
                             const body = document.createElement('div');
                             body.className = 'excel-table-wrapper';
                             
                             const render = (n) => {
                                 body.innerHTML = '';
                                 const ws = wb.Sheets[n];
                                 const data = XLSX.utils.sheet_to_json(ws, {header:1, defval:''});
                                 if(!data || data.length===0){ body.innerHTML='Empty'; return; }
                                 const tbl = document.createElement('table');
                                 tbl.className = 'excel-table';
                                 data.forEach((r, i) => {
                                     const tr = document.createElement('tr');
                                     r.forEach(c => {
                                         const el = i===0?'th':'td';
                                         const cell = document.createElement(el);
                                         cell.textContent = c!==undefined?c:'';
                                         tr.appendChild(cell);
                                     });
                                     tbl.appendChild(tr);
                                 });
                                 body.appendChild(tbl);
                             };
                             
                             sn.forEach(n => {
                                 const btn = document.createElement('button');
                                 btn.className = 'excel-sheet-btn';
                                 if(n===sn[0]) btn.classList.add('active');
                                 btn.textContent = n;
                                 btn.onclick = () => {
                                     render(n);
                                     header.querySelectorAll('.excel-sheet-btn').forEach(b=>b.classList.remove('active'));
                                     btn.classList.add('active');
                                 };
                                 header.appendChild(btn);
                             });
                             
                             render(sn[0]);
                             viewer.appendChild(header);
                             viewer.appendChild(body);
                             contentArea.appendChild(viewer); 
                        }
                    } catch(e) { console.error(e); }
                } else if (
                    TYPE === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                    NAME.endsWith('.docx')
                ) {
                    // Word Logic
                    try {
                        window.mammoth.convertToHtml({arrayBuffer: decrypted})
                            .then(result => {
                                 const viewer = document.createElement('div');
                                 viewer.className = 'word-viewer';
                                 const doc = document.createElement('div');
                                 doc.className = 'word-document';
                                 doc.innerHTML = result.value;
                                 viewer.appendChild(doc);
                                 contentArea.appendChild(viewer);
                            })
                            .catch(err => {
                                 const msg = document.createElement('div');
                                 msg.innerText = "Error parsing document: " + err.message;
                                 msg.style.color = 'red';
                                 contentArea.appendChild(msg);
                            });
                    } catch(e) { console.error(e); }
                } else {
                    const msg = document.createElement('p');
                    msg.innerText = "Preview not supported for this file type.";
                    msg.style.cssText = "color:#64748b;font-weight:500;margin-top:20px;";
                    contentArea.appendChild(msg);
                }

                v.appendChild(contentArea);
                
            } catch (e) {
                console.error(e);
                err.style.display = 'block';
                if(btn) btn.innerText = "Unlock File";
                if(status) status.innerText = "";
            }
        }

        document.getElementById('pwd').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') unlock();
        });
        
        const DATA = "`,footer:`";
    <\/script>
</body>
</html>`}}async function V(e,t=null){let n=null,o=t;if(t)try{const r=e.keys.find(s=>s.type==="password");if(r){const s=await p.deriveKeyFromPassword(t,r.salt);n=await p.unwrapKey(r.data,s,r.iv)}}catch{console.log("Provided password invalid for unlock")}if(!n){const r=await M("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!r)return null;try{const s=e.keys.find(l=>l.type==="password"),c=await p.deriveKeyFromPassword(r,s.salt);n=await p.unwrapKey(s.data,c,s.iv),o=r}catch{return await m("Error","Incorrect password"),null}}return{buffer:await p.decryptData(n,e.iv,e.content),password:o}}async function gt(){const e=C.files[0],t=document.getElementById("new-password").value;if(!e){await m("Required","Please select a file");return}if(!t){await m("Required","Password is required");return}const n=document.getElementById("confirm-add"),o=n.innerText;n.innerText="Encrypting...",n.disabled=!0;try{const a=await p.generateKey(),r=p.generateSalt(),s=await p.deriveKeyFromPassword(t,r),c=await e.arrayBuffer(),{iv:l,ciphertext:d}=await p.encryptData(a,c),{iv:i,wrappedData:u}=await p.wrapKey(a,s),y=[{type:"password",salt:r,iv:i,data:u}],x={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:y,content:d,iv:l,viewCount:0,accessLog:[{action:"created",date:Date.now()}]};await g.saveFile(x),q(),w()}catch(a){console.error(a),await m("Error","Encryption failed: "+a.message)}finally{n.innerText=o,n.disabled=!1}}async function we(e){try{const t=await g.getFile(e);if(!t){await m("Error","File not found");return}H=t,document.getElementById("auth-file-name").innerText=t.name,$.showModal()}catch(t){console.error(t),await m("Error","Error opening file")}}async function ht(){const e=document.getElementById("auth-password").value;if(!H||!e)return;const t=document.getElementById("confirm-auth");t.innerText="Unlocking...";try{const n=H,o=n.keys.find(s=>s.type==="password");if(!o)throw new Error("Corrupt key data");const a=await p.deriveKeyFromPassword(e,o.salt),r=await p.unwrapKey(o.data,a,o.iv);$.close(),document.getElementById("auth-password").value="",wt(n,r)}catch(n){console.error(n),await m("Error","Incorrect password or error.")}finally{t.innerText="Unlock"}}async function wt(e,t){try{const n=await p.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});T=URL.createObjectURL(o);const a=document.getElementById("viewer-content");a.innerHTML="";const r=localStorage.getItem("sv_dl_media")==="true",s=localStorage.getItem("sv_dl_doc")==="true",c=e.type.startsWith("image")||e.type.startsWith("video")||e.type.startsWith("audio"),l=e.type==="application/pdf"||e.type.includes("word")||e.type.includes("excel")||e.type.includes("spreadsheet")||e.name.endsWith(".docx")||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv");let d=!1;if(c&&r&&(d=!0),l&&s&&(d=!0),S&&(d?(S.classList.remove("hidden"),S.onclick=()=>{ge(null,e.id)}):(S.classList.add("hidden"),S.onclick=null)),e.type.startsWith("image/")){const i=document.createElement("img");i.src=T,a.appendChild(i)}else if(e.type.startsWith("video/")||e.type.startsWith("audio/")){const i=document.createElement(e.type.startsWith("video/")?"video":"audio");i.src=T,i.controls=!0,i.autoplay=!0,d||(i.setAttribute("controlsList","nodownload"),i.oncontextmenu=u=>u.preventDefault()),a.appendChild(i)}else if(e.type==="application/pdf"){const i=document.createElement("iframe");i.src=T+(d?"":"#toolbar=0"),i.style.width="100%",i.style.height="100%",a.appendChild(i)}else e.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"||e.type==="application/vnd.ms-excel"||e.name.endsWith(".xlsx")||e.name.endsWith(".xls")||e.name.endsWith(".csv")?We(n,a):e.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e.name.endsWith(".docx")?await $e(n,a):a.innerText="Preview not supported for this file type.";document.getElementById("viewer-filename").innerText=e.name,de.classList.remove("hidden"),it(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(n){console.error(n),await m("Error","Decryption failed.")}}async function ve(){de.classList.add("hidden"),S&&S.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",T&&(URL.revokeObjectURL(T),T=null)}async function vt(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),w())}async function w(e=""){Y.innerHTML="";let t=await g.getAllFiles();k=t,Ye(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const n=ue?.value||"date-desc";t.sort((a,r)=>{if(a.favorite&&!r.favorite)return-1;if(!a.favorite&&r.favorite)return 1;switch(n){case"date-desc":return(r.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(r.date||0);case"name-asc":return a.name.localeCompare(r.name);case"name-desc":return r.name.localeCompare(a.name);case"size-desc":return(r.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(r.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(k.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){Y.innerHTML=`
      <div class="empty-state">
        <div class="empty-icon">🔐</div>
        <p>${e?"No files match your search.":"No secured files yet."}</p>
        <small>${e?"Try a different search term.":"Tap + to secure your first file"}</small>
      </div>`;return}t.forEach((a,r)=>{const s=document.createElement("div");s.className="file-card",s.style.animationDelay=`${r*.05}s`,s.onclick=async f=>{!f.target.closest(".file-card-actions")&&!f.target.closest(".file-actions")&&!f.target.closest(".select-checkbox")&&!f.target.closest(".favorite-btn")&&we(a.id)};let c='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(c='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(c='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(c='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');let l="";const d=h.has(a.id);a.favorite;let i=a.name;const u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',y='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',x='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';s.innerHTML=`
        <div class="file-card-top">
          <input type="checkbox" class="select-checkbox" ${d?"checked":""} />
          <div class="file-icon">${c}</div>
          <div class="file-details">
            <h3>${i}</h3>
            <div class="file-meta">
              <span>${(a.size/1024/1024).toFixed(2)} MB</span>
              ${l}
            </div>
          </div>
        </div>
        <div class="file-card-actions">
          <button class="btn-highlight download-btn">${u} Download</button>
          <button class="btn-highlight share-btn">${y} Share</button>
          <button class="btn-highlight custom-share-btn">${x} Custom</button>
          <button class="btn-small info-btn">ℹ Info</button>
          <button class="btn-small rename-btn">✏ Rename</button>
          <button class="btn-small delete-btn">🗑 Delete</button>
        </div>
    `,s.querySelector(".select-checkbox").onchange=f=>{f.stopPropagation(),f.target.checked?h.add(a.id):h.delete(a.id),K()},s.querySelector(".download-btn").onclick=f=>ge(f,a.id),s.querySelector(".info-btn").onclick=f=>dt(f,a.id),s.querySelector(".rename-btn").onclick=f=>ut(f,a.id,a.name),s.querySelector(".share-btn").onclick=f=>pt(f,a.id),s.querySelector(".custom-share-btn").onclick=f=>ft(f,a.id),s.querySelector(".delete-btn").onclick=f=>lt(f,a.id),Y.appendChild(s)})}function _(){const e=document.getElementById("remove-app-lock");e&&(e.style.display=L?"block":"none");const t=localStorage.getItem("sv_panic_action")||"lock",n=document.getElementById("panic-action-select");n&&(n.value=t);const o=localStorage.getItem("sv_dl_media")==="true",a=localStorage.getItem("sv_dl_doc")==="true",r=document.getElementById("dl-media-toggle"),s=document.getElementById("dl-doc-toggle");r&&(r.checked=o),s&&(s.checked=a);const c=localStorage.getItem("sv_panic_enabled")==="true",l=document.getElementById("panic-enable-toggle");l&&(l.checked=c),oe();const d=localStorage.getItem("sv_recovery_q"),i=document.getElementById("recovery-status"),u=document.getElementById("recovery-question");i&&(d?(i.style.display="block",i.innerText="✅ Recovery method set (Question: "+d+")",u&&(u.value=d)):(i.style.display="none",u&&(u.value="")))}async function Et(){const e=document.getElementById("app-lock-password").value;if(!e){await m("Required","Please enter a password");return}const t=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e)),n=Array.from(new Uint8Array(t)).map(o=>o.toString(16).padStart(2,"0")).join("");localStorage.setItem("sv_app_lock",n),L=n,await m("Success","App Lock Password Set!"),document.getElementById("app-lock-password").value="",_()}async function bt(){await R("Remove App Lock","Remove App Lock password?")&&(localStorage.removeItem("sv_app_lock"),L=null,await m("Success","App Lock removed."),_())}async function xt(){const e=document.getElementById("recovery-question").value.trim(),t=document.getElementById("recovery-answer").value.trim().toLowerCase();if(!e||!t){await m("Required","Please enter both a question and an answer.");return}const n=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(t)),o=Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("");localStorage.setItem("sv_recovery_q",e),localStorage.setItem("sv_recovery_a",o),await m("Success","Recovery method saved!"),document.getElementById("recovery-answer").value="",_()}async function kt(){const e=localStorage.getItem("sv_recovery_q"),t=localStorage.getItem("sv_recovery_a");if(!e||!t){await m("No Recovery","No recovery method has been set. The app lock cannot be reset.");return}const n=await M("Password Recovery",`Security Question:
${e}`,{placeholder:"Enter your answer..."});if(!n)return;const o=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(n.trim().toLowerCase()));Array.from(new Uint8Array(o)).map(r=>r.toString(16).padStart(2,"0")).join("")===t?(await m("Success"," Identity verified. App Lock has been removed."),localStorage.removeItem("sv_app_lock"),L=null,location.reload()):await m("Error","Incorrect answer.")}async function Ee(){if(!L)return;const e=document.getElementById("app-lock-screen"),t=document.getElementById("lock-input"),n=document.getElementById("unlock-submit");e.classList.remove("hidden");const o=async()=>{const a=t.value;if(!a)return;const r=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(a));Array.from(new Uint8Array(r)).map(c=>c.toString(16).padStart(2,"0")).join("")===L?(e.classList.add("hidden"),t.value=""):(await m("Error","Incorrect Password"),t.value="",t.focus())};n.onclick=o,t.onkeydown=a=>{a.key==="Enter"&&o()}}function oe(){const e=localStorage.getItem("sv_panic_enabled")==="true",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function Bt(){const e=localStorage.getItem("sv_panic_action")||"lock";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await g.getAllFiles();for(const o of n)await g.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),location.reload()}catch(t){console.error(t)}})();else if(e==="lock"){if(!L){m("App Lock Not Set","Please set an App Lock password in Settings first to use this feature.");return}window.location.reload()}else if(e==="blur"){const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
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
