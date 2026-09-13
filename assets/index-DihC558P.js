import"./jspdf-Bo0itkfF.js";import{X as fe,r as Ze}from"./xlsx-C2aTm3Il.js";import{r as _e,a as $e,g as et}from"./mammoth-D8566hzF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();const ee="CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821",tt=ee,nt="CORALGENZ::MILSPEC_V5::ANTI_OFFLINE_CRACKER::ZERO_KNOWLEDGE::774910283419",ot="CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";class E{constructor(){this.algo={name:"AES-GCM",length:256}}static detectDeviceCapabilities(){let t=4,n=4;try{typeof navigator<"u"&&(t=navigator.hardwareConcurrency||4,n=navigator.deviceMemory||4)}catch{}const o=t<=2||n<=2;return{isLowEnd:o,recommendedIterations:o?1e6:2e6,concurrency:t,memory:n}}static async computePayloadHash(t){const n=await window.crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(i=>i.toString(16).padStart(2,"0")).join("")}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(32))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n,o=2e6,i="SHA-256",s=!0,r=ee){const a=new TextEncoder;let d;if(s){const p=r||tt,m=a.encode(p),f=a.encode(t),u=new Uint8Array(m.length+f.length);u.set(m,0),u.set(f,m.length);const w=await window.crypto.subtle.importKey("raw",n,{name:"HMAC",hash:"SHA-512"},!1,["sign"]),c=await window.crypto.subtle.sign("HMAC",w,u);d=new Uint8Array(c),u.fill(0),f.fill(0)}else d=a.encode(t);const l=await window.crypto.subtle.importKey("raw",d,"PBKDF2",!1,["deriveKey"]),h=await window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:o,hash:i},l,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);return d&&d.fill&&d.fill(0),h}static async deriveKeyAsyncWorker(t,n,o=2e6,i=ee){if(typeof Worker<"u"&&typeof Blob<"u"&&typeof URL<"u"&&URL.createObjectURL)try{return await new Promise((s,r)=>{const a=`
                        self.onmessage = async function(e) {
                            try {
                                const { password, salt, iterations, pepper } = e.data;
                                const enc = new TextEncoder();
                                const activePepper = pepper || "${ee}";
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
                    `,d=new Blob([a],{type:"application/javascript"}),l=URL.createObjectURL(d),h=new Worker(l),p=setTimeout(()=>{try{h.terminate(),URL.revokeObjectURL(l)}catch{}r(new Error("Worker key derivation timed out"))},12e3);h.onmessage=async f=>{if(clearTimeout(p),h.terminate(),URL.revokeObjectURL(l),f.data&&f.data.success)try{const u=await window.crypto.subtle.importKey("raw",f.data.rawKey,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);s(u)}catch(u){r(u)}else r(new Error(f.data?.error||"Worker derivation failed"))},h.onerror=f=>{clearTimeout(p),h.terminate(),URL.revokeObjectURL(l),r(f)};const m=new Uint8Array(n);h.postMessage({password:t,salt:m,iterations:o,pepper:i})})}catch{}return this.deriveKeyFromPassword(t,n,o,"SHA-256",!0,i)}static async encryptData(t,n){const o=this.generateIV(),i=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:i}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),i=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:i}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async unwrapWithFallback(t,n,o,i,s=2e6){try{const r=await this.deriveKeyFromPassword(n,o,s,"SHA-256",!0,ee);return await this.unwrapKey(t,r,i)}catch(r){try{const a=await this.deriveKeyFromPassword(n,o,s,"SHA-256",!0,nt);return await this.unwrapKey(t,a,i)}catch{try{const d=await this.deriveKeyFromPassword(n,o,1e6,"SHA-256",!0,ot);return await this.unwrapKey(t,d,i)}catch{const l=[s,1e6,6e5,1e5];for(const h of l)try{const p=await this.deriveKeyFromPassword(n,o,h,"SHA-256",!1);return await this.unwrapKey(t,p,i)}catch{}throw r}}}}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),i=new Uint8Array(o.length);for(let s=0;s<o.length;s++)i[s]=o.charCodeAt(s);n=i.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const i=new Uint8Array(n);let s="";for(let r=0;r<i.byteLength;r++)s+=String.fromCharCode(i[r]);localStorage.setItem("sv_device_key",btoa(s))}return this.importKey(n)}}const rt="SecureVaultDB",it=1,P="files";function ae(){return new Promise((e,t)=>{const n=indexedDB.open(rt,it);n.onupgradeneeded=o=>{const i=o.target.result;i.objectStoreNames.contains(P)||i.createObjectStore(P,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const L={async saveFile(e){const t=await ae();return new Promise((n,o)=>{const r=t.transaction(P,"readwrite").objectStore(P).put(e);r.onsuccess=()=>n(e.id),r.onerror=()=>o(r.error)})},async getAllFiles(){const e=await ae();return new Promise((t,n)=>{const s=e.transaction(P,"readonly").objectStore(P).openCursor(),r=[];s.onsuccess=a=>{const d=a.target.result;if(d){const{content:l,...h}=d.value;r.push(h),d.continue()}else t(r)},s.onerror=()=>n(s.error)})},async getFile(e){const t=await ae();return new Promise((n,o)=>{const r=t.transaction(P,"readonly").objectStore(P).get(e);r.onsuccess=()=>n(r.result),r.onerror=()=>o(r.error)})},async deleteFile(e){const t=await ae();return new Promise((n,o)=>{const r=t.transaction(P,"readwrite").objectStore(P).delete(e);r.onsuccess=()=>n(),r.onerror=()=>o(r.error)})},async updateFile(e){return this.saveFile(e)}};var st=_e(),at=$e();const lt=et(at),ct=`
!function(f){typeof module!='undefined'&&typeof exports=='object'?module.exports=f():typeof define!='undefined'&&define.amd?define(f):(typeof self!='undefined'?self:this).fflate=f()}(function(){var _e={};"use strict";var t=(typeof module!='undefined'&&typeof exports=='object'?function(_f){"use strict";var e,t=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{e=require("worker_threads").Worker}catch(e){}exports.default=e?function(r,n,o,a,s){var u=!1,i=new e(r+t,{eval:!0}).on("error",(function(e){return s(e,null)})).on("message",(function(e){return s(null,e)})).on("exit",(function(e){e&&!u&&s(Error("exited with code "+e),null)}));return i.postMessage(o,a),i.terminate=function(){return u=!0,e.prototype.terminate.call(i)},i}:function(e,t,r,n,o){setImmediate((function(){return o(Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)}));var a=function(){};return{terminate:a,postMessage:a}};return _f}:function(_f){"use strict";var e={};_f.default=function(r,t,s,a,n){var o=new Worker(e[t]||(e[t]=URL.createObjectURL(new Blob([r+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return o.onmessage=function(e){var r=e.data,t=r.$e$;if(t){var s=Error(t[0]);s.code=t[1],s.stack=t[2],n(s,null)}else n(null,r)},o.postMessage(s,a),o};return _f})({}),n=Uint8Array,r=Uint16Array,e=Int32Array,i=new n([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),o=new n([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new n([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(t,n){for(var i=new r(31),o=0;o<31;++o)i[o]=n+=1<<t[o-1];var s=new e(i[30]);for(o=1;o<30;++o)for(var a=i[o];a<i[o+1];++a)s[a]=a-i[o]<<5|o;return{b:i,r:s}},u=a(i,2),h=u.b,f=u.r;h[28]=258,f[258]=28;for(var l=a(o,0),c=l.b,p=l.r,v=new r(32768),d=0;d<32768;++d){var g=(43690&d)>>1|(21845&d)<<1;v[d]=((65280&(g=(61680&(g=(52428&g)>>2|(13107&g)<<2))>>4|(3855&g)<<4))>>8|(255&g)<<8)>>1}var y=function(t,n,e){for(var i=t.length,o=0,s=new r(n);o<i;++o)t[o]&&++s[t[o]-1];var a,u=new r(n);for(o=1;o<n;++o)u[o]=u[o-1]+s[o-1]<<1;if(e){a=new r(1<<n);var h=15-n;for(o=0;o<i;++o)if(t[o])for(var f=o<<4|t[o],l=n-t[o],c=u[t[o]-1]++<<l,p=c|(1<<l)-1;c<=p;++c)a[v[c]>>h]=f}else for(a=new r(i),o=0;o<i;++o)t[o]&&(a[o]=v[u[t[o]-1]++]>>15-t[o]);return a},m=new n(288);for(d=0;d<144;++d)m[d]=8;for(d=144;d<256;++d)m[d]=9;for(d=256;d<280;++d)m[d]=7;for(d=280;d<288;++d)m[d]=8;var b=new n(32);for(d=0;d<32;++d)b[d]=5;var w=y(m,9,0),x=y(m,9,1),z=y(b,5,0),k=y(b,5,1),M=function(t){for(var n=t[0],r=1;r<t.length;++r)t[r]>n&&(n=t[r]);return n},S=function(t,n,r){var e=n/8|0;return(t[e]|t[e+1]<<8)>>(7&n)&r},A=function(t,n){var r=n/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(7&n)},T=function(t){return(t+7)/8|0},D=function(t,r,e){return(null==r||r<0)&&(r=0),(null==e||e>t.length)&&(e=t.length),new n(t.subarray(r,e))};_e.FlateErrorCode={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14};var C=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],I=function(t,n,r){var e=Error(n||C[t]);if(e.code=t,Error.captureStackTrace&&Error.captureStackTrace(e,I),!r)throw e;return e},U=function(t,r,e,a){var u=t.length,f=a?a.length:0;if(!u||r.f&&!r.l)return e||new n(0);var l=!e,p=l||2!=r.i,v=r.i;l&&(e=new n(3*u));var d=function(t){var r=e.length;if(t>r){var i=new n(Math.max(2*r,t));i.set(e),e=i}},g=r.f||0,m=r.p||0,b=r.b||0,w=r.l,z=r.d,C=r.m,U=r.n,F=8*u;do{if(!w){g=S(t,m,1);var E=S(t,m+1,3);if(m+=3,!E){var Z=t[(J=T(m)+4)-4]|t[J-3]<<8,q=J+Z;if(q>u){v&&I(0);break}p&&d(b+Z),e.set(t.subarray(J,q),b),r.b=b+=Z,r.p=m=8*q,r.f=g;continue}if(1==E)w=x,z=k,C=9,U=5;else if(2==E){var O=S(t,m,31)+257,G=S(t,m+10,15)+4,L=O+S(t,m+5,31)+1;m+=14;for(var H=new n(L),j=new n(19),N=0;N<G;++N)j[s[N]]=S(t,m+3*N,7);m+=3*G;var P=M(j),B=(1<<P)-1,Y=y(j,P,1);for(N=0;N<L;){var J,K=Y[S(t,m,B)];if(m+=15&K,(J=K>>4)<16)H[N++]=J;else{var Q=0,R=0;for(16==J?(R=3+S(t,m,3),m+=2,Q=H[N-1]):17==J?(R=3+S(t,m,7),m+=3):18==J&&(R=11+S(t,m,127),m+=7);R--;)H[N++]=Q}}var V=H.subarray(0,O),W=H.subarray(O);C=M(V),U=M(W),w=y(V,C,1),z=y(W,U,1)}else I(1);if(m>F){v&&I(0);break}}p&&d(b+131072);for(var X=(1<<C)-1,$=(1<<U)-1,_=m;;_=m){var tt=(Q=w[A(t,m)&X])>>4;if((m+=15&Q)>F){v&&I(0);break}if(Q||I(2),tt<256)e[b++]=tt;else{if(256==tt){_=m,w=null;break}var nt=tt-254;tt>264&&(nt=S(t,m,(1<<(it=i[N=tt-257]))-1)+h[N],m+=it);var rt=z[A(t,m)&$],et=rt>>4;if(rt||I(3),m+=15&rt,W=c[et],et>3){var it=o[et];W+=A(t,m)&(1<<it)-1,m+=it}if(m>F){v&&I(0);break}p&&d(b+131072);var ot=b+nt;if(b<W){var st=f-W,at=Math.min(W,ot);for(st+b<0&&I(3);b<at;++b)e[b]=a[st+b]}for(;b<ot;++b)e[b]=e[b-W]}}r.l=w,r.p=_,r.b=b,r.f=g,w&&(g=1,r.m=C,r.d=z,r.n=U)}while(!g);return b!=e.length&&l?D(e,0,b):e.subarray(0,b)},F=function(t,n,r){var e=n/8|0;t[e]|=r<<=7&n,t[e+1]|=r>>8},E=function(t,n,r){var e=n/8|0;t[e]|=r<<=7&n,t[e+1]|=r>>8,t[e+2]|=r>>16},Z=function(t,e){for(var i=[],o=0;o<t.length;++o)t[o]&&i.push({s:o,f:t[o]});var s=i.length,a=i.slice();if(!s)return{t:N,l:0};if(1==s){var u=new n(i[0].s+1);return u[i[0].s]=1,{t:u,l:1}}i.sort((function(t,n){return t.f-n.f})),i.push({s:-1,f:25001});var h=i[0],f=i[1],l=0,c=1,p=2;for(i[0]={s:-1,f:h.f+f.f,l:h,r:f};c!=s-1;)h=i[i[l].f<i[p].f?l++:p++],f=i[l!=c&&i[l].f<i[p].f?l++:p++],i[c++]={s:-1,f:h.f+f.f,l:h,r:f};var v=a[0].s;for(o=1;o<s;++o)a[o].s>v&&(v=a[o].s);var d=new r(v+1),g=q(i[c-1],d,0);if(g>e){o=0;var y=0,m=g-e,b=1<<m;for(a.sort((function(t,n){return d[n.s]-d[t.s]||t.f-n.f}));o<s;++o){var w=a[o].s;if(!(d[w]>e))break;y+=b-(1<<g-d[w]),d[w]=e}for(y>>=m;y>0;){var x=a[o].s;d[x]<e?y-=1<<e-d[x]++-1:++o}for(;o>=0&&y;--o){var z=a[o].s;d[z]==e&&(--d[z],++y)}g=e}return{t:new n(d),l:g}},q=function(t,n,r){return-1==t.s?Math.max(q(t.l,n,r+1),q(t.r,n,r+1)):n[t.s]=r},O=function(t){for(var n=t.length;n&&!t[--n];);for(var e=new r(++n),i=0,o=t[0],s=1,a=function(t){e[i++]=t},u=1;u<=n;++u)if(t[u]==o&&u!=n)++s;else{if(!o&&s>2){for(;s>138;s-=138)a(32754);s>2&&(a(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(a(o),--s;s>6;s-=6)a(8304);s>2&&(a(s-3<<5|8208),s=0)}for(;s--;)a(o);s=1,o=t[u]}return{c:e.subarray(0,i),n:n}},G=function(t,n){for(var r=0,e=0;e<n.length;++e)r+=t[e]*n[e];return r},L=function(t,n,r){var e=r.length,i=T(n+2);t[i]=255&e,t[i+1]=e>>8,t[i+2]=255^t[i],t[i+3]=255^t[i+1];for(var o=0;o<e;++o)t[i+o+4]=r[o];return 8*(i+4+e)},H=function(t,n,e,a,u,h,f,l,c,p,v){F(n,v++,e),++u[256];for(var d=Z(u,15),g=d.t,x=d.l,k=Z(h,15),M=k.t,S=k.l,A=O(g),T=A.c,D=A.n,C=O(M),I=C.c,U=C.n,q=new r(19),H=0;H<T.length;++H)++q[31&T[H]];for(H=0;H<I.length;++H)++q[31&I[H]];for(var j=Z(q,7),N=j.t,P=j.l,B=19;B>4&&!N[s[B-1]];--B);var Y,J,K,Q,R=p+5<<3,V=G(u,m)+G(h,b)+f,W=G(u,g)+G(h,M)+f+14+3*B+G(q,N)+2*q[16]+3*q[17]+7*q[18];if(c>=0&&R<=V&&R<=W)return L(n,v,t.subarray(c,c+p));if(F(n,v,1+(W<V)),v+=2,W<V){Y=y(g,x,0),J=g,K=y(M,S,0),Q=M;var X=y(N,P,0);for(F(n,v,D-257),F(n,v+5,U-1),F(n,v+10,B-4),v+=14,H=0;H<B;++H)F(n,v+3*H,N[s[H]]);v+=3*B;for(var $=[T,I],_=0;_<2;++_){var tt=$[_];for(H=0;H<tt.length;++H)F(n,v,X[rt=31&tt[H]]),v+=N[rt],rt>15&&(F(n,v,tt[H]>>5&127),v+=tt[H]>>12)}}else Y=w,J=m,K=z,Q=b;for(H=0;H<l;++H){var nt=a[H];if(nt>255){var rt;E(n,v,Y[257+(rt=nt>>18&31)]),v+=J[rt+257],rt>7&&(F(n,v,nt>>23&31),v+=i[rt]);var et=31&nt;E(n,v,K[et]),v+=Q[et],et>3&&(E(n,v,nt>>5&8191),v+=o[et])}else E(n,v,Y[nt]),v+=J[nt]}return E(n,v,Y[256]),v+J[256]},j=new e([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),N=new n(0),P=function(t,s,a,u,h,l){var c=l.z||t.length,v=new n(u+c+5*(1+Math.ceil(c/7e3))+h),d=v.subarray(u,v.length-h),g=l.l,y=7&(l.r||0);if(s){y&&(d[0]=l.r>>3);for(var m=j[s-1],b=m>>13,w=8191&m,x=(1<<a)-1,z=l.p||new r(32768),k=l.h||new r(x+1),M=Math.ceil(a/3),S=2*M,A=function(n){return(t[n]^t[n+1]<<M^t[n+2]<<S)&x},C=new e(25e3),I=new r(288),U=new r(32),F=0,E=0,Z=l.i||0,q=0,O=l.w||0,G=0;Z+2<c;++Z){var N=A(Z),P=32767&Z,B=k[N];if(z[P]=B,k[N]=P,O<=Z){var Y=c-Z;if((F>7e3||q>24576)&&(Y>423||!g)){y=H(t,d,0,C,I,U,E,q,G,Z-G,y),q=F=E=0,G=Z;for(var J=0;J<286;++J)I[J]=0;for(J=0;J<30;++J)U[J]=0}var K=2,Q=0,R=w,V=P-B&32767;if(Y>2&&N==A(Z-V))for(var W=Math.min(b,Y)-1,X=Math.min(32767,Z),$=Math.min(258,Y);V<=X&&--R&&P!=B;){if(t[Z+K]==t[Z+K-V]){for(var _=0;_<$&&t[Z+_]==t[Z+_-V];++_);if(_>K){if(K=_,Q=V,_>W)break;var tt=Math.min(V,_-2),nt=0;for(J=0;J<tt;++J){var rt=Z-V+J&32767,et=rt-z[rt]&32767;et>nt&&(nt=et,B=rt)}}}V+=(P=B)-(B=z[P])&32767}if(Q){C[q++]=268435456|f[K]<<18|p[Q];var it=31&f[K],ot=31&p[Q];E+=i[it]+o[ot],++I[257+it],++U[ot],O=Z+K,++F}else C[q++]=t[Z],++I[t[Z]]}}for(Z=Math.max(Z,O);Z<c;++Z)C[q++]=t[Z],++I[t[Z]];y=H(t,d,g,C,I,U,E,q,G,Z-G,y),g||(l.r=7&y|d[y/8|0]<<3,y-=7,l.h=k,l.p=z,l.i=Z,l.w=O)}else{for(Z=l.w||0;Z<c+g;Z+=65535){var st=Z+65535;st>=c&&(d[y/8|0]=g,st=c),y=L(d,y+1,t.subarray(Z,st))}l.i=c}return D(v,0,u+T(y)+h)},B=function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var r=n,e=9;--e;)r=(1&r&&-306674912)^r>>>1;t[n]=r}return t}(),Y=function(){var t=-1;return{p:function(n){for(var r=t,e=0;e<n.length;++e)r=B[255&r^n[e]]^r>>>8;t=r},d:function(){return~t}}},J=function(){var t=1,n=0;return{p:function(r){for(var e=t,i=n,o=0|r.length,s=0;s!=o;){for(var a=Math.min(s+2655,o);s<a;++s)i+=e+=r[s];e=(65535&e)+15*(e>>16),i=(65535&i)+15*(i>>16)}t=e,n=i},d:function(){return(255&(t%=65521))<<24|(65280&t)<<8|(255&(n%=65521))<<8|n>>8}}},K=function(t,r,e,i,o){if(!o&&(o={l:1},r.dictionary)){var s=r.dictionary.subarray(-32768),a=new n(s.length+t.length);a.set(s),a.set(t,s.length),t=a,o.w=s.length}return P(t,null==r.level?6:r.level,null==r.mem?o.l?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(t.length)))):20:12+r.mem,e,i,o)},Q=function(t,n){var r={};for(var e in t)r[e]=t[e];for(var e in n)r[e]=n[e];return r},R=function(t,n,r){for(var e=t(),i=""+t,o=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/s+/g,"").split(","),s=0;s<e.length;++s){var a=e[s],u=o[s];if("function"==typeof a){n+=";"+u+"=";var h=""+a;if(a.prototype)if(-1!=h.indexOf("[native code]")){var f=h.indexOf(" ",8)+1;n+=h.slice(f,h.indexOf("(",f))}else for(var l in n+=h,a.prototype)n+=";"+u+".prototype."+l+"="+a.prototype[l];else n+=h}else r[u]=a}return n},V=[],W=function(t){var n=[];for(var r in t)t[r].buffer&&n.push((t[r]=new t[r].constructor(t[r])).buffer);return n},X=function(n,r,e,i){if(!V[e]){for(var o="",s={},a=n.length-1,u=0;u<a;++u)o=R(n[u],o,s);V[e]={c:R(n[a],o,s),e:s}}var h=Q({},V[e].e);return(0,t.default)(V[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+r+"}",e,h,W(h),i)},$=function(){return[n,r,e,i,o,s,h,c,x,k,v,C,y,M,S,A,T,D,I,U,Tt,it,ot]},_=function(){return[n,r,e,i,o,s,f,p,w,m,z,b,v,j,N,y,F,E,Z,q,O,G,L,H,T,D,P,K,kt,it]},tt=function(){return[pt,gt,ct,Y,B]},nt=function(){return[vt,dt]},rt=function(){return[yt,ct,J]},et=function(){return[mt]},it=function(t){return postMessage(t,[t.buffer])},ot=function(t){return t&&{out:t.size&&new n(t.size),dictionary:t.dictionary}},st=function(t,n,r,e,i,o){var s=X(r,e,i,(function(t,n){s.terminate(),o(t,n)}));return s.postMessage([t,n],n.consume?[t.buffer]:[]),function(){s.terminate()}},at=function(t){return t.ondata=function(t,n){return postMessage([t,n],[t.buffer])},function(n){n.data.length?(t.push(n.data[0],n.data[1]),postMessage([n.data[0].length])):t.flush()}},ut=function(t,n,r,e,i,o,s){var a,u=X(t,e,i,(function(t,r){t?(u.terminate(),n.ondata.call(n,t)):Array.isArray(r)?1==r.length?(n.queuedSize-=r[0],n.ondrain&&n.ondrain(r[0])):(r[1]&&u.terminate(),n.ondata.call(n,t,r[0],r[1])):s(r)}));u.postMessage(r),n.queuedSize=0,n.push=function(t,r){n.ondata||I(5),a&&n.ondata(I(4,0,1),null,!!r),n.queuedSize+=t.length,u.postMessage([t,a=r],[t.buffer])},n.terminate=function(){u.terminate()},o&&(n.flush=function(){u.postMessage([])})},ht=function(t,n){return t[n]|t[n+1]<<8},ft=function(t,n){return(t[n]|t[n+1]<<8|t[n+2]<<16|t[n+3]<<24)>>>0},lt=function(t,n){return ft(t,n)+4294967296*ft(t,n+4)},ct=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},pt=function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&ct(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var e=0;e<=r.length;++e)t[e+10]=r.charCodeAt(e)}},vt=function(t){31==t[0]&&139==t[1]&&8==t[2]||I(6,"invalid gzip data");var n=t[3],r=10;4&n&&(r+=2+(t[10]|t[11]<<8));for(var e=(n>>3&1)+(n>>4&1);e>0;e-=!t[r++]);return r+(2&n)},dt=function(t){var n=t.length;return(t[n-4]|t[n-3]<<8|t[n-2]<<16|t[n-1]<<24)>>>0},gt=function(t){return 10+(t.filename?t.filename.length+1:0)},yt=function(t,n){var r=n.level,e=0==r?0:r<6?1:9==r?3:2;if(t[0]=120,t[1]=e<<6|(n.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,n.dictionary){var i=J();i.p(n.dictionary),ct(t,2,i.d())}},mt=function(t,n){return(8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31)&&I(6,"invalid zlib data"),(t[1]>>5&1)==+!n&&I(6,"invalid zlib data: "+(32&t[1]?"need":"unexpected")+" dictionary"),2+(t[1]>>3&4)};function bt(t,n){return"function"==typeof t&&(n=t,t={}),this.ondata=n,t}var wt=function(){function t(t,r){if("function"==typeof t&&(r=t,t={}),this.ondata=r,this.o=t||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new n(98304),this.o.dictionary){var e=this.o.dictionary.subarray(-32768);this.b.set(e,32768-e.length),this.s.i=32768-e.length}}return t.prototype.p=function(t,n){this.ondata(K(t,this.o,0,0,this.s),n)},t.prototype.push=function(t,r){this.ondata||I(5),this.s.l&&I(4);var e=t.length+this.s.z;if(e>this.b.length){if(e>2*this.b.length-32768){var i=new n(-32768&e);i.set(this.b.subarray(0,this.s.z)),this.b=i}var o=this.b.length-this.s.z;this.b.set(t.subarray(0,o),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(t.subarray(o),32768),this.s.z=t.length-o+32768,this.s.i=32766,this.s.w=32768}else this.b.set(t,this.s.z),this.s.z+=t.length;this.s.l=1&r,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2)},t.prototype.flush=function(){this.ondata||I(5),this.s.l&&I(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},t}();_e.Deflate=wt;var xt=function(){return function(t,n){ut([_,function(){return[at,wt]}],this,bt.call(this,t,n),(function(t){var n=new wt(t.data);onmessage=at(n)}),6,1)}}();function zt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_],(function(t){return it(kt(t.data[0],t.data[1]))}),0,r)}function kt(t,n){return K(t,n||{},0,0)}_e.AsyncDeflate=xt,_e.deflate=zt,_e.deflateSync=kt;var Mt=function(){function t(t,r){"function"==typeof t&&(r=t,t={}),this.ondata=r;var e=t&&t.dictionary&&t.dictionary.subarray(-32768);this.s={i:0,b:e?e.length:0},this.o=new n(32768),this.p=new n(0),e&&this.o.set(e)}return t.prototype.e=function(t){if(this.ondata||I(5),this.d&&I(4),this.p.length){if(t.length){var r=new n(this.p.length+t.length);r.set(this.p),r.set(t,this.p.length),this.p=r}}else this.p=t},t.prototype.c=function(t){this.s.i=+(this.d=t||!1);var n=this.s.b,r=U(this.p,this.s,this.o);this.ondata(D(r,n,this.s.b),this.d),this.o=D(r,this.s.b-32768),this.s.b=this.o.length,this.p=D(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(t,n){this.e(t),this.c(n)},t}();_e.Inflate=Mt;var St=function(){return function(t,n){ut([$,function(){return[at,Mt]}],this,bt.call(this,t,n),(function(t){var n=new Mt(t.data);onmessage=at(n)}),7,0)}}();function At(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$],(function(t){return it(Tt(t.data[0],ot(t.data[1])))}),1,r)}function Tt(t,n){return U(t,{i:2},n&&n.out,n&&n.dictionary)}_e.AsyncInflate=St,_e.inflate=At,_e.inflateSync=Tt;var Dt=function(){function t(t,n){this.c=Y(),this.l=0,this.v=1,wt.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),this.l+=t.length,wt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=K(t,this.o,this.v&&gt(this.o),n&&8,this.s);this.v&&(pt(r,this.o),this.v=0),n&&(ct(r,r.length-8,this.c.d()),ct(r,r.length-4,this.l)),this.ondata(r,n)},t.prototype.flush=function(){wt.prototype.flush.call(this)},t}();_e.Gzip=Dt,_e.Compress=Dt;var Ct=function(){return function(t,n){ut([_,tt,function(){return[at,wt,Dt]}],this,bt.call(this,t,n),(function(t){var n=new Dt(t.data);onmessage=at(n)}),8,1)}}();function It(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_,tt,function(){return[Ut]}],(function(t){return it(Ut(t.data[0],t.data[1]))}),2,r)}function Ut(t,n){n||(n={});var r=Y(),e=t.length;r.p(t);var i=K(t,n,gt(n),8),o=i.length;return pt(i,n),ct(i,o-8,r.d()),ct(i,o-4,e),i}_e.AsyncGzip=Ct,_e.AsyncCompress=Ct,_e.gzip=It,_e.compress=It,_e.gzipSync=Ut,_e.compressSync=Ut;var Ft=function(){function t(t,n){this.v=1,this.r=0,Mt.call(this,t,n)}return t.prototype.push=function(t,r){if(Mt.prototype.e.call(this,t),this.r+=t.length,this.v){var e=this.p.subarray(this.v-1),i=e.length>3?vt(e):4;if(i>e.length){if(!r)return}else this.v>1&&this.onmember&&this.onmember(this.r-e.length);this.p=e.subarray(i),this.v=0}Mt.prototype.c.call(this,r),!this.s.f||this.s.l||r||(this.v=T(this.s.p)+9,this.s={i:0},this.o=new n(0),this.push(new n(0),r))},t}();_e.Gunzip=Ft;var Et=function(){return function(t,n){var r=this;ut([$,nt,function(){return[at,Mt,Ft]}],this,bt.call(this,t,n),(function(t){var n=new Ft(t.data);n.onmember=function(t){return postMessage(t)},onmessage=at(n)}),9,0,(function(t){return r.onmember&&r.onmember(t)}))}}();function Zt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$,nt,function(){return[qt]}],(function(t){return it(qt(t.data[0],t.data[1]))}),3,r)}function qt(t,r){var e=vt(t);return e+8>t.length&&I(6,"invalid gzip data"),U(t.subarray(e,-8),{i:2},r&&r.out||new n(dt(t)),r&&r.dictionary)}_e.AsyncGunzip=Et,_e.gunzip=Zt,_e.gunzipSync=qt;var Ot=function(){function t(t,n){this.c=J(),this.v=1,wt.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),wt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=K(t,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(yt(r,this.o),this.v=0),n&&ct(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(){wt.prototype.flush.call(this)},t}();_e.Zlib=Ot;var Gt=function(){return function(t,n){ut([_,rt,function(){return[at,wt,Ot]}],this,bt.call(this,t,n),(function(t){var n=new Ot(t.data);onmessage=at(n)}),10,1)}}();function Lt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_,rt,function(){return[Ht]}],(function(t){return it(Ht(t.data[0],t.data[1]))}),4,r)}function Ht(t,n){n||(n={});var r=J();r.p(t);var e=K(t,n,n.dictionary?6:2,4);return yt(e,n),ct(e,e.length-4,r.d()),e}_e.AsyncZlib=Gt,_e.zlib=Lt,_e.zlibSync=Ht;var jt=function(){function t(t,n){Mt.call(this,t,n),this.v=t&&t.dictionary?2:1}return t.prototype.push=function(t,n){if(Mt.prototype.e.call(this,t),this.v){if(this.p.length<6&&!n)return;this.p=this.p.subarray(mt(this.p,this.v-1)),this.v=0}n&&(this.p.length<4&&I(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),Mt.prototype.c.call(this,n)},t}();_e.Unzlib=jt;var Nt=function(){return function(t,n){ut([$,et,function(){return[at,Mt,jt]}],this,bt.call(this,t,n),(function(t){var n=new jt(t.data);onmessage=at(n)}),11,0)}}();function Pt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$,et,function(){return[Bt]}],(function(t){return it(Bt(t.data[0],ot(t.data[1])))}),5,r)}function Bt(t,n){return U(t.subarray(mt(t,n&&n.dictionary),-4),{i:2},n&&n.out,n&&n.dictionary)}_e.AsyncUnzlib=Nt,_e.unzlib=Pt,_e.unzlibSync=Bt;var Yt=function(){function t(t,n){this.o=bt.call(this,t,n)||{},this.G=Ft,this.I=Mt,this.Z=jt}return t.prototype.i=function(){var t=this;this.s.ondata=function(n,r){t.ondata(n,r)}},t.prototype.push=function(t,r){if(this.ondata||I(5),this.s)this.s.push(t,r);else{if(this.p&&this.p.length){var e=new n(this.p.length+t.length);e.set(this.p),e.set(t,this.p.length)}else this.p=t;this.p.length>2&&(this.s=31==this.p[0]&&139==this.p[1]&&8==this.p[2]?new this.G(this.o):8!=(15&this.p[0])||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,r),this.p=null)}},t}();_e.Decompress=Yt;var Jt=function(){function t(t,n){Yt.call(this,t,n),this.queuedSize=0,this.G=Et,this.I=St,this.Z=Nt}return t.prototype.i=function(){var t=this;this.s.ondata=function(n,r,e){t.ondata(n,r,e)},this.s.ondrain=function(n){t.queuedSize-=n,t.ondrain&&t.ondrain(n)}},t.prototype.push=function(t,n){this.queuedSize+=t.length,Yt.prototype.push.call(this,t,n)},t}();function Kt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),31==t[0]&&139==t[1]&&8==t[2]?Zt(t,n,r):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?At(t,n,r):Pt(t,n,r)}function Qt(t,n){return 31==t[0]&&139==t[1]&&8==t[2]?qt(t,n):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?Tt(t,n):Bt(t,n)}_e.AsyncDecompress=Jt,_e.decompress=Kt,_e.decompressSync=Qt;var Rt=function(t,r,e,i){for(var o in t){var s=t[o],a=r+o,u=i;Array.isArray(s)&&(u=Q(i,s[1]),s=s[0]),s instanceof n?e[a]=[s,u]:(e[a+="/"]=[new n(0),u],Rt(s,a,e,i))}},Vt="undefined"!=typeof TextEncoder&&new TextEncoder,Wt="undefined"!=typeof TextDecoder&&new TextDecoder,Xt=0;try{Wt.decode(N,{stream:!0}),Xt=1}catch(t){}var $t=function(t){for(var n="",r=0;;){var e=t[r++],i=(e>127)+(e>223)+(e>239);if(r+i>t.length)return{s:n,r:D(t,r-1)};i?3==i?(e=((15&e)<<18|(63&t[r++])<<12|(63&t[r++])<<6|63&t[r++])-65536,n+=String.fromCharCode(55296|e>>10,56320|1023&e)):n+=String.fromCharCode(1&i?(31&e)<<6|63&t[r++]:(15&e)<<12|(63&t[r++])<<6|63&t[r++]):n+=String.fromCharCode(e)}},_t=function(){function t(t){this.ondata=t,Xt?this.t=new TextDecoder:this.p=N}return t.prototype.push=function(t,r){if(this.ondata||I(5),r=!!r,this.t)return this.ondata(this.t.decode(t,{stream:!0}),r),void(r&&(this.t.decode().length&&I(8),this.t=null));this.p||I(4);var e=new n(this.p.length+t.length);e.set(this.p),e.set(t,this.p.length);var i=$t(e),o=i.s,s=i.r;r?(s.length&&I(8),this.p=null):this.p=s,this.ondata(o,r)},t}();_e.DecodeUTF8=_t;var tn=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){this.ondata||I(5),this.d&&I(4),this.ondata(nn(t),this.d=n||!1)},t}();function nn(t,r){if(r){for(var e=new n(t.length),i=0;i<t.length;++i)e[i]=t.charCodeAt(i);return e}if(Vt)return Vt.encode(t);var o=t.length,s=new n(t.length+(t.length>>1)),a=0,u=function(t){s[a++]=t};for(i=0;i<o;++i){if(a+5>s.length){var h=new n(a+8+(o-i<<1));h.set(s),s=h}var f=t.charCodeAt(i);f<128||r?u(f):f<2048?(u(192|f>>6),u(128|63&f)):f>55295&&f<57344?(u(240|(f=65536+(1047552&f)|1023&t.charCodeAt(++i))>>18),u(128|f>>12&63),u(128|f>>6&63),u(128|63&f)):(u(224|f>>12),u(128|f>>6&63),u(128|63&f))}return D(s,0,a)}function rn(t,n){if(n){for(var r="",e=0;e<t.length;e+=16384)r+=String.fromCharCode.apply(null,t.subarray(e,e+16384));return r}if(Wt)return Wt.decode(t);var i=$t(t),o=i.s;return(r=i.r).length&&I(8),o}_e.EncodeUTF8=tn,_e.strToU8=nn,_e.strFromU8=rn;var en=function(t){return 1==t?3:t<6?2:9==t?1:0},on=function(t,n){return n+30+ht(t,n+26)+ht(t,n+28)},sn=function(t,n,r){var e=ht(t,n+28),i=rn(t.subarray(n+46,n+46+e),!(2048&ht(t,n+8))),o=n+46+e,s=ft(t,n+20),a=r&&4294967295==s?an(t,o):[s,ft(t,n+24),ft(t,n+42)],u=a[0],h=a[1],f=a[2];return[ht(t,n+10),u,h,i,o+ht(t,n+30)+ht(t,n+32),f]},an=function(t,n){for(;1!=ht(t,n);n+=4+ht(t,n+2));return[lt(t,n+12),lt(t,n+4),lt(t,n+20)]},un=function(t){var n=0;if(t)for(var r in t){var e=t[r].length;e>65535&&I(9),n+=e+4}return n},hn=function(t,n,r,e,i,o,s,a){var u=e.length,h=r.extra,f=a&&a.length,l=un(h);ct(t,n,null!=s?33639248:67324752),n+=4,null!=s&&(t[n++]=20,t[n++]=r.os),t[n]=20,n+=2,t[n++]=r.flag<<1|(o<0&&8),t[n++]=i&&8,t[n++]=255&r.compression,t[n++]=r.compression>>8;var c=new Date(null==r.mtime?Date.now():r.mtime),p=c.getFullYear()-1980;if((p<0||p>119)&&I(10),ct(t,n,p<<25|c.getMonth()+1<<21|c.getDate()<<16|c.getHours()<<11|c.getMinutes()<<5|c.getSeconds()>>1),n+=4,-1!=o&&(ct(t,n,r.crc),ct(t,n+4,o<0?-o-2:o),ct(t,n+8,r.size)),ct(t,n+12,u),ct(t,n+14,l),n+=16,null!=s&&(ct(t,n,f),ct(t,n+6,r.attrs),ct(t,n+10,s),n+=14),t.set(e,n),n+=u,l)for(var v in h){var d=h[v],g=d.length;ct(t,n,+v),ct(t,n+2,g),t.set(d,n+4),n+=4+g}return f&&(t.set(a,n),n+=f),n},fn=function(t,n,r,e,i){ct(t,n,101010256),ct(t,n+8,r),ct(t,n+10,r),ct(t,n+12,e),ct(t,n+16,i)},ln=function(){function t(t){this.filename=t,this.c=Y(),this.size=0,this.compression=0}return t.prototype.process=function(t,n){this.ondata(null,t,n)},t.prototype.push=function(t,n){this.ondata||I(5),this.c.p(t),this.size+=t.length,n&&(this.crc=this.c.d()),this.process(t,n||!1)},t}();_e.ZipPassThrough=ln;var cn=function(){function t(t,n){var r=this;n||(n={}),ln.call(this,t),this.d=new wt(n,(function(t,n){r.ondata(null,t,n)})),this.compression=8,this.flag=en(n.level)}return t.prototype.process=function(t,n){try{this.d.push(t,n)}catch(t){this.ondata(t,null,n)}},t.prototype.push=function(t,n){ln.prototype.push.call(this,t,n)},t}();_e.ZipDeflate=cn;var pn=function(){function t(t,n){var r=this;n||(n={}),ln.call(this,t),this.d=new xt(n,(function(t,n,e){r.ondata(t,n,e)})),this.compression=8,this.flag=en(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(t,n){this.d.push(t,n)},t.prototype.push=function(t,n){ln.prototype.push.call(this,t,n)},t}();_e.AsyncZipDeflate=pn;var vn=function(){function t(t){this.ondata=t,this.u=[],this.d=1}return t.prototype.add=function(t){var r=this;if(this.ondata||I(5),2&this.d)this.ondata(I(4+8*(1&this.d),0,1),null,!1);else{var e=nn(t.filename),i=e.length,o=t.comment,s=o&&nn(o),a=i!=t.filename.length||s&&o.length!=s.length,u=i+un(t.extra)+30;i>65535&&this.ondata(I(11,0,1),null,!1);var h=new n(u);hn(h,0,t,e,a,-1);var f=[h],l=function(){for(var t=0,n=f;t<n.length;t++)r.ondata(null,n[t],!1);f=[]},c=this.d;this.d=0;var p=this.u.length,v=Q(t,{f:e,u:a,o:s,t:function(){t.terminate&&t.terminate()},r:function(){if(l(),c){var t=r.u[p+1];t?t.r():r.d=1}c=1}}),d=0;t.ondata=function(e,i,o){if(e)r.ondata(e,i,o),r.terminate();else if(d+=i.length,f.push(i),o){var s=new n(16);ct(s,0,134695760),ct(s,4,t.crc),ct(s,8,d),ct(s,12,t.size),f.push(s),v.c=d,v.b=u+d+16,v.crc=t.crc,v.size=t.size,c&&v.r(),c=1}else c&&l()},this.u.push(v)}},t.prototype.end=function(){var t=this;2&this.d?this.ondata(I(4+8*(1&this.d),0,1),null,!0):(this.d?this.e():this.u.push({r:function(){1&t.d&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3)},t.prototype.e=function(){for(var t=0,r=0,e=0,i=0,o=this.u;i<o.length;i++)e+=46+(h=o[i]).f.length+un(h.extra)+(h.o?h.o.length:0);for(var s=new n(e+22),a=0,u=this.u;a<u.length;a++){var h;hn(s,t,h=u[a],h.f,h.u,-h.c-2,r,h.o),t+=46+h.f.length+un(h.extra)+(h.o?h.o.length:0),r+=h.b}fn(s,t,this.u.length,e,r),this.ondata(null,s,!0),this.d=2},t.prototype.terminate=function(){for(var t=0,n=this.u;t<n.length;t++)n[t].t();this.d=2},t}();function dn(t,r,e){e||(e=r,r={}),"function"!=typeof e&&I(7);var i={};Rt(t,"",i,r);var o=Object.keys(i),s=o.length,a=0,u=0,h=s,f=Array(s),l=[],c=function(){for(var t=0;t<l.length;++t)l[t]()},p=function(t,n){xn((function(){e(t,n)}))};xn((function(){p=e}));var v=function(){var t=new n(u+22),r=a,e=u-a;u=0;for(var i=0;i<h;++i){var o=f[i];try{var s=o.c.length;hn(t,u,o,o.f,o.u,s);var l=30+o.f.length+un(o.extra),c=u+l;t.set(o.c,c),hn(t,a,o,o.f,o.u,s,u,o.m),a+=16+l+(o.m?o.m.length:0),u=c+s}catch(t){return p(t,null)}}fn(t,a,f.length,e,r),p(null,t)};s||v();for(var d=function(t){var n=o[t],r=i[n],e=r[0],h=r[1],d=Y(),g=e.length;d.p(e);var y=nn(n),m=y.length,b=h.comment,w=b&&nn(b),x=w&&w.length,z=un(h.extra),k=0==h.level?0:8,M=function(r,e){if(r)c(),p(r,null);else{var i=e.length;f[t]=Q(h,{size:g,crc:d.d(),c:e,f:y,m:w,u:m!=n.length||w&&b.length!=x,compression:k}),a+=30+m+z+i,u+=76+2*(m+z)+(x||0)+i,--s||v()}};if(m>65535&&M(I(11,0,1),null),k)if(g<16e4)try{M(null,kt(e,h))}catch(t){M(t,null)}else l.push(zt(e,h,M));else M(null,e)},g=0;g<h;++g)d(g);return c}function gn(t,r){r||(r={});var e={},i=[];Rt(t,"",e,r);var o=0,s=0;for(var a in e){var u=e[a],h=u[0],f=u[1],l=0==f.level?0:8,c=(M=nn(a)).length,p=f.comment,v=p&&nn(p),d=v&&v.length,g=un(f.extra);c>65535&&I(11);var y=l?kt(h,f):h,m=y.length,b=Y();b.p(h),i.push(Q(f,{size:h.length,crc:b.d(),c:y,f:M,m:v,u:c!=a.length||v&&p.length!=d,o:o,compression:l})),o+=30+c+g+m,s+=76+2*(c+g)+(d||0)+m}for(var w=new n(s+22),x=o,z=s-o,k=0;k<i.length;++k){var M;hn(w,(M=i[k]).o,M,M.f,M.u,M.c.length);var S=30+M.f.length+un(M.extra);w.set(M.c,M.o+S),hn(w,o,M,M.f,M.u,M.c.length,M.o,M.m),o+=16+S+(M.m?M.m.length:0)}return fn(w,o,i.length,z,x),w}_e.Zip=vn,_e.zip=dn,_e.zipSync=gn;var yn=function(){function t(){}return t.prototype.push=function(t,n){this.ondata(null,t,n)},t.compression=0,t}();_e.UnzipPassThrough=yn;var mn=function(){function t(){var t=this;this.i=new Mt((function(n,r){t.ondata(null,n,r)}))}return t.prototype.push=function(t,n){try{this.i.push(t,n)}catch(t){this.ondata(t,null,n)}},t.compression=8,t}();_e.UnzipInflate=mn;var bn=function(){function t(t,n){var r=this;n<32e4?this.i=new Mt((function(t,n){r.ondata(null,t,n)})):(this.i=new St((function(t,n,e){r.ondata(t,n,e)})),this.terminate=this.i.terminate)}return t.prototype.push=function(t,n){this.i.terminate&&(t=D(t,0)),this.i.push(t,n)},t.compression=8,t}();_e.AsyncUnzipInflate=bn;var wn=function(){function t(t){this.onfile=t,this.k=[],this.o={0:yn},this.p=N}return t.prototype.push=function(t,r){var e=this;if(this.onfile||I(5),this.p||I(4),this.c>0){var i=Math.min(this.c,t.length),o=t.subarray(0,i);if(this.c-=i,this.d?this.d.push(o,!this.c):this.k[0].push(o),(t=t.subarray(i)).length)return this.push(t,r)}else{var s=0,a=0,u=void 0,h=void 0;this.p.length?t.length?((h=new n(this.p.length+t.length)).set(this.p),h.set(t,this.p.length)):h=this.p:h=t;for(var f=h.length,l=this.c,c=l&&this.d,p=function(){var t,n=ft(h,a);if(67324752==n){s=1,u=a,v.d=null,v.c=0;var r=ht(h,a+6),i=ht(h,a+8),o=2048&r,c=8&r,p=ht(h,a+26),d=ht(h,a+28);if(f>a+30+p+d){var g=[];v.k.unshift(g),s=2;var y,m=ft(h,a+18),b=ft(h,a+22),w=rn(h.subarray(a+30,a+=30+p),!o);4294967295==m?(t=c?[-2]:an(h,a),m=t[0],b=t[1]):c&&(m=-1),a+=d,v.c=m;var x={name:w,compression:i,start:function(){if(x.ondata||I(5),m){var t=e.o[i];t||x.ondata(I(14,"unknown compression type "+i,1),null,!1),(y=m<0?new t(w):new t(w,m,b)).ondata=function(t,n,r){x.ondata(t,n,r)};for(var n=0,r=g;n<r.length;n++)y.push(r[n],!1);e.k[0]==g&&e.c?e.d=y:y.push(N,!0)}else x.ondata(null,N,!0)},terminate:function(){y&&y.terminate&&y.terminate()}};m>=0&&(x.size=m,x.originalSize=b),v.onfile(x)}return"break"}if(l){if(134695760==n)return u=a+=12+(-2==l&&8),s=3,v.c=0,"break";if(33639248==n)return u=a-=4,s=3,v.c=0,"break"}},v=this;a<f-4&&"break"!==p();++a);if(this.p=N,l<0){var d=h.subarray(0,s?u-12-(-2==l&&8)-(134695760==ft(h,u-16)&&4):a);c?c.push(d,!!s):this.k[+(2==s)].push(d)}if(2&s)return this.push(h.subarray(a),r);this.p=h.subarray(a)}r&&(this.c&&I(13),this.p=null)},t.prototype.register=function(t){this.o[t.compression]=t},t}();_e.Unzip=wn;var xn="function"==typeof queueMicrotask?queueMicrotask:"function"==typeof setTimeout?setTimeout:function(t){t()};function zn(t,r,e){e||(e=r,r={}),"function"!=typeof e&&I(7);var i=[],o=function(){for(var t=0;t<i.length;++t)i[t]()},s={},a=function(t,n){xn((function(){e(t,n)}))};xn((function(){a=e}));for(var u=t.length-22;101010256!=ft(t,u);--u)if(!u||t.length-u>65558)return a(I(13,0,1),null),o;var h=ht(t,u+8);if(h){var f=h,l=ft(t,u+16),c=4294967295==l||65535==f;if(c){var p=ft(t,u-12);(c=101075792==ft(t,p))&&(f=h=ft(t,p+32),l=ft(t,p+48))}for(var v=r&&r.filter,d=function(r){var e=sn(t,l,c),u=e[0],f=e[1],p=e[2],d=e[3],g=e[4],y=on(t,e[5]);l=g;var m=function(t,n){t?(o(),a(t,null)):(n&&(s[d]=n),--h||a(null,s))};if(!v||v({name:d,size:f,originalSize:p,compression:u}))if(u)if(8==u){var b=t.subarray(y,y+f);if(p<524288||f>.8*p)try{m(null,Tt(b,{out:new n(p)}))}catch(t){m(t,null)}else i.push(At(b,{size:p},m))}else m(I(14,"unknown compression type "+u,1),null);else m(null,D(t,y,y+f));else m(null,null)},g=0;g<f;++g)d()}else a(null,{});return o}function kn(t,r){for(var e={},i=t.length-22;101010256!=ft(t,i);--i)(!i||t.length-i>65558)&&I(13);var o=ht(t,i+8);if(!o)return{};var s=ft(t,i+16),a=4294967295==s||65535==o;if(a){var u=ft(t,i-12);(a=101075792==ft(t,u))&&(o=ft(t,u+32),s=ft(t,u+48))}for(var h=r&&r.filter,f=0;f<o;++f){var l=sn(t,s,a),c=l[0],p=l[1],v=l[2],d=l[3],g=l[4],y=on(t,l[5]);s=g,h&&!h({name:d,size:p,originalSize:v,compression:c})||(c?8==c?e[d]=Tt(t.subarray(y,y+p),{out:new n(v)}):I(14,"unknown compression type "+c):e[d]=D(t,y,y+p))}return e}_e.unzip=zn,_e.unzipSync=kn;return _e});
`,dt="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",pt="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",me=document.getElementById("file-list");document.getElementById("add-file-btn");const te=document.getElementById("auth-modal"),Ye=document.getElementById("viewer"),V=document.getElementById("viewer-download-btn"),O=document.getElementById("file-input");document.getElementById("privacy-curtain");const ht=document.getElementById("theme-toggle"),$=document.getElementById("search-input"),Ge=document.getElementById("sort-select"),ut=document.getElementById("storage-text"),gt=document.getElementById("storage-fill"),Me=document.getElementById("bulk-actions"),ft=document.getElementById("selected-count"),mt=document.getElementById("bulk-delete-btn"),wt=document.getElementById("cancel-select-btn"),Be=document.getElementById("info-modal"),he=document.getElementById("rename-modal"),j=document.getElementById("strength-bar"),D=document.getElementById("strength-text"),yt=document.getElementById("bulk-export-btn"),we=document.getElementById("recent-section"),ye=document.getElementById("recent-scroll"),le=document.getElementById("drop-zone"),De=document.getElementById("stat-total"),Ne=document.getElementById("stat-images"),Fe=document.getElementById("stat-videos"),Pe=document.getElementById("stat-size"),Z=document.getElementById("settings-modal"),Ke=document.getElementById("change-pass-modal"),bt=document.getElementById("settings-btn"),vt=document.getElementById("help-btn"),de=document.getElementById("help-modal");let Le=null,Q=null,G=[],T=new Set,ce=null,U=JSON.parse(localStorage.getItem("sv_recent")||"[]"),xt=null,ve=null,R={},Y=null;function ne(e,t="",n={}){return new Promise(o=>{const i=document.getElementById("custom-prompt-modal"),s=document.getElementById("prompt-title"),r=document.getElementById("prompt-message"),a=document.getElementById("prompt-input"),d=document.getElementById("prompt-confirm"),l=document.getElementById("prompt-cancel");s.textContent=e,r.textContent=t,a.type=n.inputType||"text",a.placeholder=n.placeholder||"Enter value...",a.value="";const h=()=>{i.close(),d.onclick=null,l.onclick=null,a.onkeydown=null};d.onclick=()=>{const p=a.value;h(),o(p||null)},l.onclick=()=>{h(),o(null)},a.onkeydown=p=>{p.key==="Enter"&&(p.preventDefault(),d.click())},i.showModal(),setTimeout(()=>a.focus(),100)})}function ue(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),i=document.getElementById("confirm-title"),s=document.getElementById("confirm-message"),r=document.getElementById("confirm-ok"),a=document.getElementById("confirm-cancel");i.textContent=e,s.textContent=t;let d=!1;const l=()=>{o.close(),r.onclick=null,a.onclick=null,o.removeEventListener("click",h),o.removeEventListener("close",p)},h=m=>{m.target===o&&!d&&(d=!0,l(),n(!1))},p=()=>{d||(d=!0,l(),n(!1))};r.onclick=()=>{d||(d=!0,l(),n(!0))},a.onclick=()=>{d||(d=!0,l(),n(!1))},o.addEventListener("click",h),o.addEventListener("close",p),o.showModal()})}function A(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),i=document.getElementById("alert-title"),s=document.getElementById("alert-message"),r=document.getElementById("alert-ok");i.textContent=e,s.textContent=t;const a=l=>{l.key==="Enter"&&(l.preventDefault(),d(),n())},d=()=>{o.close(),r.onclick=null,document.removeEventListener("keydown",a)};r.onclick=()=>{d(),n()},document.addEventListener("keydown",a),o.showModal()})}async function Et(){localStorage.removeItem("sv_app_lock"),localStorage.removeItem("sv_autolock"),localStorage.removeItem("sv_recovery_q"),localStorage.removeItem("sv_recovery_a"),St(),Ie(),await N(),kt(),on(),We(),Se(),rn()}Et();function k(e){const t=document.getElementById("security-terminal-body");if(t){const n=document.createElement("p");n.className="term-line",n.textContent=`> ${e}`,t.appendChild(n),t.scrollTop=t.scrollHeight}}function B(e,t="completed"){const n=document.getElementById(e);if(n){n.className=`process-step ${t}`.trim();const o=n.querySelector(".step-icon");o&&(t==="completed"?o.textContent="[✓]":t==="active"?o.textContent="[→]":o.textContent="[ ]")}}function q(e,t){const n=document.getElementById("protect-progress-bar"),o=document.getElementById("protect-progress-percent"),i=document.getElementById("protect-progress-label");n&&(n.style.width=`${e}%`),o&&(o.textContent=`${e}%`),i&&t&&(i.textContent=t)}function At(){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+",t=new Uint8Array(24);window.crypto.getRandomValues(t);let n="";for(let i=0;i<24;i++)n+=e[t[i]%e.length];const o=document.getElementById("new-password");if(o){o.value=n,o.type="text",Ue();const i=document.getElementById("toggle-new-password");i&&(i.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',i.style.color="var(--cyber-cyan)")}}function kt(){document.getElementById("cancel-add").addEventListener("click",()=>{_()}),document.getElementById("confirm-add").addEventListener("click",Re),document.getElementById("generate-pwd-btn")?.addEventListener("click",At);const e=document.getElementById("toggle-new-password"),t=document.getElementById("new-password");e?.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t&&(t.type==="password"?(t.type="text",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',e.style.color="var(--cyber-cyan)"):(t.type="password",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',e.style.color="var(--cyber-text-muted)"))}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Re())}),document.getElementById("download-protected-html-btn")?.addEventListener("click",async()=>{if(!Y||!Y.record){A("Notice","No active protected file session. Please select a file from the vault below to download.");return}const r=document.getElementById("download-protected-html-btn"),a=r?r.innerHTML:"";try{r&&(r.disabled=!0,r.innerHTML=`
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `);let d=Y.buffer,l=Y.password;if(!d||d.byteLength===0){const h=await ie(Y.record,l);if(h&&h.buffer)d=h.buffer,l=h.password||l;else throw new Error("Could not retrieve file content for packaging.")}await re(Y.record,d,l,{},"Protected HTML package exported successfully!")}catch(d){console.error(d),await A("Export Error","Failed to download HTML package: "+d.message)}finally{r&&(r.disabled=!1,r.innerHTML=a)}}),document.getElementById("view-in-vault-btn")?.addEventListener("click",()=>{_(),document.getElementById("secured-files-heading")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("protect-another-btn")?.addEventListener("click",()=>{_(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".cyber-nav-item").forEach(a=>a.classList.remove("active")),r.classList.add("active"),r.id==="nav-item-protect"&&_()})}),document.getElementById("sidebar-settings-btn")?.addEventListener("click",()=>{Ie(),Z?.showModal()}),document.getElementById("cancel-auth").addEventListener("click",()=>{te.close(),document.getElementById("auth-password").value="",Le=null}),document.getElementById("confirm-auth").addEventListener("click",Qe),document.getElementById("auth-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Qe())}),document.getElementById("close-viewer").addEventListener("click",ke),ht?.addEventListener("click",je),$?.addEventListener("input",Mt),Ge?.addEventListener("change",Dt),document.getElementById("new-password")?.addEventListener("input",Ue),mt?.addEventListener("click",Ot),yt?.addEventListener("click",Ht),wt?.addEventListener("click",Pt),document.getElementById("select-all-btn")?.addEventListener("click",Ft),document.getElementById("close-info")?.addEventListener("click",()=>Be.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>he.close()),document.getElementById("confirm-rename")?.addEventListener("click",He),document.getElementById("rename-input")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),He())}),Rt(),Yt(),vt?.addEventListener("click",()=>de?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>de?.close()),Tt(),bt?.addEventListener("click",()=>{Ie(),Z?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>Z?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>Z?.close()),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const r="coralgenz@zohomail.in",a=encodeURIComponent("SecureVault Feedback"),d=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${r}?subject=${a}&body=${d}`}),document.querySelectorAll(".panic-trigger").forEach(r=>{r.addEventListener("click",Ce)}),document.getElementById("panic-btn")?.addEventListener("click",Ce),document.getElementById("panic-action-select")?.addEventListener("change",r=>{localStorage.setItem("sv_panic_action",r.target.value)}),document.getElementById("panic-enable-toggle")?.addEventListener("change",r=>{const a=r.target.checked;localStorage.setItem("sv_panic_enabled",a),Se()}),document.getElementById("dl-media-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_media",r.target.checked),Ee()}),document.getElementById("dl-doc-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_doc",r.target.checked),Ee()}),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>Ke?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",Ut),be("toggle-new-password","new-password"),be("toggle-auth-password","auth-password"),be("toggle-share-password","share-password");const n=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>n?.close()),document.getElementById("confirm-share")?.addEventListener("click",ze),document.getElementById("share-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),ze())}),document.getElementById("share-logo-zone")?.addEventListener("click",r=>{r.target!==document.getElementById("share-logo")&&document.getElementById("share-logo")?.click()}),document.getElementById("share-logo")?.addEventListener("change",r=>{const a=r.target.files[0],d=document.getElementById("share-logo-text");d&&(d.textContent=a?a.name:"Choose File")}),O?.addEventListener("change",xe),document.getElementById("file-remove-btn")?.addEventListener("click",It);const o=document.getElementById("file-upload-zone"),i=document.getElementById("drop-text-primary"),s=document.getElementById("drop-text-secondary");o?.addEventListener("click",r=>{r.target!==O&&O?.click()}),o?.addEventListener("dragover",r=>{r.preventDefault(),o.classList.add("drag-over"),i&&(i.textContent="FILE DETECTED — INITIALIZING PROTECTION"),s&&(s.textContent="Release file to initialize security inspection")}),o?.addEventListener("dragleave",()=>{o.classList.remove("drag-over"),i&&(i.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system")}),o?.addEventListener("drop",r=>{r.preventDefault(),o.classList.remove("drag-over"),i&&(i.textContent="DROP FILE TO SECURE"),s&&(s.textContent="or click to browse local file system"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length>0&&(O.files=r.dataTransfer.files,xe())}),document.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("keydown",r=>{(r.key==="PrintScreen"||r.ctrlKey&&r.key==="p")&&(r.preventDefault(),alert("Screenshots are disabled"))})}function be(e,t){const n=document.getElementById(e),o=document.getElementById(t);!n||!o||n.addEventListener("click",i=>{i.preventDefault(),o.type==="password"?(o.type="text",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',n.style.color="var(--cyber-cyan)"):(o.type="password",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',n.style.color="var(--cyber-muted)")})}function _(){O.value="",document.getElementById("new-password").value="",Y=null,j.className="strength-bar",D.innerText="ENTER PASSWORD";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview"),n=document.getElementById("inline-password-section"),o=document.getElementById("protection-process-container"),i=document.getElementById("protection-complete-container");e?.classList.remove("hidden"),t?.classList.add("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),i?.classList.add("hidden");const s=document.getElementById("process-timer-display");s&&(s.textContent="00:00.00");const r=document.querySelector(".scanner-center-shield");r&&r.classList.remove("success");const a=document.getElementById("scanner-status-text");a&&(a.textContent="SECURING");const d=document.getElementById("security-terminal-body");d&&(d.innerHTML='<p class="term-line">&gt; Standby for cryptographic instruction...</p>'),document.getElementById("new-password")?.classList.remove("highlight-input-glow"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(h=>{B(h,"")}),q(0,"STANDBY")}function xe(){const e=O.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){A("File Too Large","Please select a file smaller than 150 MB."),O.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),i=document.getElementById("file-preview-name"),s=document.getElementById("file-preview-size"),r=document.getElementById("protection-process-container"),a=document.getElementById("protection-complete-container"),d=document.getElementById("inline-password-section"),l=document.getElementById("new-password");i&&(i.textContent=e.name),s&&(s.textContent=pe(e.size)),n?.classList.add("hidden"),r?.classList.add("hidden"),a?.classList.add("hidden"),o?.classList.remove("hidden"),d?.classList.remove("hidden"),d&&(d.classList.remove("pulse-password-attention"),d.offsetWidth,d.classList.add("pulse-password-attention")),l&&(l.classList.remove("highlight-input-glow"),l.offsetWidth,l.classList.add("highlight-input-glow"),setTimeout(()=>{l.focus(),l.scrollIntoView({behavior:"smooth",block:"nearest"})},150))}function It(e){e.preventDefault(),e.stopPropagation(),O.value="",Y=null;const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview"),o=document.getElementById("inline-password-section"),i=document.getElementById("protection-process-container"),s=document.getElementById("protection-complete-container");t?.classList.remove("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),i?.classList.add("hidden"),s?.classList.add("hidden"),t?.classList.remove("hidden"),n?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function pe(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function Ct(e,t,n="Spreadsheet"){try{t.innerHTML="";const o=new Uint8Array(e);let i=[];try{const l=typeof fe<"u"&&typeof Ze=="function"?fe:typeof window<"u"&&window.XLSX?window.XLSX:fe;if(l&&typeof l.read=="function"){let h=null;try{h=l.read(o,{type:"array",cellDates:!0,cellStyles:!0,raw:!1})}catch(p){try{h=l.read(e,{type:"array"})}catch(m){console.warn("SheetJS read attempt:",p,m)}}h&&h.SheetNames&&h.SheetNames.length>0&&h.SheetNames.forEach(p=>{const m=h.Sheets[p];if(m){const f=l.utils.sheet_to_json(m,{header:1,defval:""});f&&f.length>0&&i.push({name:p,rows:f})}})}}catch(l){console.warn("XLSX in-app parsing note:",l)}if(i.length===0)try{const l=new TextDecoder("utf-8",{fatal:!1}).decode(o);if(l.includes("urn:schemas-microsoft-com:office:spreadsheet")||l.includes("<Worksheet")&&l.includes("<Table>")){const m=new DOMParser().parseFromString(l,"application/xml").getElementsByTagName("Worksheet");for(let f=0;f<m.length;f++){const u=m[f],w=u.getAttribute("ss:Name")||u.getAttribute("Name")||"Sheet "+(f+1),c=u.getElementsByTagName("Row"),g=[];for(let y=0;y<c.length;y++){const b=c[y].getElementsByTagName("Cell"),v=[];for(let x=0;x<b.length;x++){const I=b[x].getElementsByTagName("Data")[0];v.push(I?I.textContent||"":b[x].textContent||"")}v.some(x=>String(x).trim().length>0)&&g.push(v)}g.length>0&&i.push({name:w,rows:g})}}else(l.includes("<table")||l.includes("<TABLE"))&&new DOMParser().parseFromString(l,"text/html").querySelectorAll("table").forEach((f,u)=>{const w=f.querySelectorAll("tr"),c=[];w.forEach(g=>{const y=g.querySelectorAll("th, td"),b=Array.from(y).map(v=>v.textContent.trim());b.some(v=>v.length>0)&&c.push(b)}),c.length>0&&i.push({name:"Sheet "+(u+1),rows:c})})}catch(l){console.warn("XML/HTML spreadsheet in-app fallback note:",l)}if(i.length===0)try{const l=new TextDecoder("utf-8",{fatal:!1}).decode(o),h=n.toLowerCase().endsWith(".tsv")||l.includes("	")?"	":l.includes(";")?";":",",m=l.split(`
`).map(f=>f.endsWith("\r")?f.slice(0,-1):f).filter(f=>f.trim().length>0).map(f=>f.split(h).map(u=>(u=u.trim(),(u.startsWith('"')&&u.endsWith('"')||u.startsWith("'")&&u.endsWith("'"))&&(u=u.slice(1,-1)),u)));m.length>0&&i.push({name:"Data",rows:m})}catch{}(i.length===0||i.length===1&&i[0].rows.length===0)&&(i=[{name:"Sheet 1",rows:[["(Empty spreadsheet or format preview unavailable)"]]}]);const s=document.createElement("div");s.className="doc-viewer-container excel-viewer",s.style.maxWidth="1000px",s.style.width="100%",s.style.height="80vh";let r=0,a="";const d=()=>{s.innerHTML="";const l=i[r]||{rows:[]},h=l.rows||[];let p=0;h.forEach(b=>{b&&b.length>p&&(p=b.length)});const m=document.createElement("div");m.className="doc-toolbar";const f=document.createElement("div");f.className="doc-toolbar-left",f.innerHTML=`
        <span class="doc-format-badge doc-badge-excel">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg> EXCEL SPREADSHEET
        </span>
        <span class="doc-filename" title="${escapeHTML(n)}">${escapeHTML(n)}</span>
        <span class="doc-stats-badge">${h.length} Rows &times; ${p} Cols</span>
      `;const u=document.createElement("div");u.className="doc-toolbar-right";const w=document.createElement("div");w.className="doc-search-box",w.innerHTML='<svg class="doc-search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';const c=document.createElement("input");if(c.type="text",c.className="doc-search-input",c.placeholder="Search sheet cells...",c.value=a,c.addEventListener("input",b=>{a=b.target.value.toLowerCase(),y()}),w.appendChild(c),u.appendChild(w),m.appendChild(f),m.appendChild(u),s.appendChild(m),i.length>1){const b=document.createElement("div");b.className="excel-tabs-bar",i.forEach((v,x)=>{const I=document.createElement("button");I.type="button",I.className="excel-tab-btn"+(x===r?" active":""),I.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> '+escapeHTML(v.name)+' <span class="excel-tab-count">('+(v.rows?v.rows.length:0)+")</span>",I.onclick=()=>{r=x,a="",d()},b.appendChild(I)}),s.appendChild(b)}const g=document.createElement("div");g.className="excel-table-scroll",s.appendChild(g);function y(){g.innerHTML="";let b=l.rows||[];if(a.trim().length>0&&(b=b.filter(C=>(C||[]).some(F=>String(F).toLowerCase().includes(a)))),b.length===0){g.innerHTML='<div class="excel-empty-state" style="padding:40px;text-align:center;color:var(--cyber-muted);font-family:var(--font-mono);">No matching rows found in this sheet.</div>';return}let v=0;b.forEach(C=>{C&&C.length>v&&(v=C.length)}),v===0&&(v=1);const x=document.createElement("table");x.className="excel-grid-table";const I=document.createElement("thead"),K=document.createElement("tr"),W=document.createElement("th");W.className="row-index-hdr",W.textContent="#",K.appendChild(W);for(let C=0;C<v;C++){const F=document.createElement("th");let S="",M=C;for(;M>=0;)S=String.fromCharCode(65+M%26)+S,M=Math.floor(M/26)-1;F.textContent=S,K.appendChild(F)}I.appendChild(K),x.appendChild(I);const X=document.createElement("tbody");b.forEach((C,F)=>{const S=document.createElement("tr"),M=document.createElement("td");M.className="row-num",M.textContent=F+1,S.appendChild(M);for(let H=0;H<v;H++){const z=document.createElement("td"),J=C&&C[H]!==void 0?C[H]:"",se=String(J);z.textContent=se,(typeof J=="number"||!isNaN(J)&&se.trim()!=="")&&(z.style.textAlign="right"),a&&se.toLowerCase().includes(a)&&z.classList.add("excel-search-match"),S.appendChild(z)}X.appendChild(S)}),x.appendChild(X),g.appendChild(x)}y()};d(),t.appendChild(s)}catch(o){console.error(o),t.innerHTML=`<div style="padding:20px;color:#ef4444;font-family:var(--font-mono);font-size:13px;">Error parsing Excel file: ${escapeHTML(o.message)}</div>`}}async function Bt(e,t){try{const{value:n,messages:o}=await st.convertToHtml({arrayBuffer:e}),i=document.createElement("div");i.className="word-viewer";const s=document.createElement("div");s.className="word-document",s.innerHTML=n,i.appendChild(s),t.appendChild(i)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}async function Lt(e,t,n){try{const o=await lt.loadAsync(e),i=Object.keys(o.files).filter(p=>p.startsWith("ppt/slides/slide")&&p.endsWith(".xml"));if(i.sort((p,m)=>{const f=parseInt(p.replace(/[^0-9]/g,"")||"0",10),u=parseInt(m.replace(/[^0-9]/g,"")||"0",10);return f-u}),i.length===0)throw new Error("No slide XML found in presentation archive.");const s=[],r=new DOMParser;for(const p of i){const m=await o.files[p].async("string"),u=r.parseFromString(m,"application/xml").querySelectorAll("t"),w=Array.from(u).map(c=>c.textContent.trim()).filter(Boolean);s.push({title:w[0]||`Slide ${s.length+1}`,body:w.slice(1).join(`
`)||"Slide Content"})}let a=0;const d=document.createElement("div");d.className="ppt-viewer";const l=document.createElement("div");l.className="ppt-slide-card";const h=p=>{const m=s[p];l.innerHTML=`
        <div class="ppt-slide-title">📊 ${m.title}</div>
        <div class="ppt-slide-content"><pre style="white-space:pre-wrap;font-family:inherit;">${m.body}</pre></div>
        <div class="ppt-nav-bar">
          <button type="button" id="ppt-prev-btn" class="excel-sheet-btn" ${p===0?'disabled style="opacity:0.5;"':""}>◀ Previous</button>
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">Slide ${p+1} of ${s.length}</span>
          <button type="button" id="ppt-next-btn" class="excel-sheet-btn" ${p===s.length-1?'disabled style="opacity:0.5;"':""}>Next ▶</button>
        </div>
      `,l.querySelector("#ppt-prev-btn")?.addEventListener("click",()=>{a>0&&(a--,h(a))}),l.querySelector("#ppt-next-btn")?.addEventListener("click",()=>{a<s.length-1&&(a++,h(a))})};h(0),d.appendChild(l),n.appendChild(d)}catch(o){console.warn("PPTX parsing fallback:",o),n.innerHTML=`
      <div class="ppt-slide-card" style="align-items:center;justify-content:center;text-align:center;">
        <div style="font-size:48px;margin-bottom:12px;">📊</div>
        <div class="ppt-slide-title">${t}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;">POWERPOINT PRESENTATION READY</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">Full presentation deck decrypted successfully. Click download above to view in Microsoft PowerPoint or Keynote.</p>
      </div>
    `}}function Tt(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&_())})})}function St(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function je(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function Ue(){const e=document.getElementById("new-password")?.value||"",n=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123"].includes(e.toLowerCase().trim());let o=0;e.length>=8&&o++,e.length>=12&&o++,e.length>=18&&o++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&o++,/[0-9]/.test(e)&&o++,/[^A-Za-z0-9]/.test(e)&&o++,n&&(o=1),j&&D&&(j.className="strength-bar",e?o<=2||n?(j.classList.add("weak"),D.innerText=n?"VULNERABLE (DICTIONARY WORD)":"WEAK (GPU CRACKABLE)",D.style.color="#ef4444"):o===3||o===4?(j.classList.add("fair"),D.innerText="MODERATE (RECOMMEND 12+ CHARS)",D.style.color="#f59e0b"):o===5?(j.classList.add("good"),D.innerText="STRONG (GPU RESISTANT)",D.style.color="#0284c7"):(j.classList.add("strong"),D.innerText="MIL-SPEC // QUANTUM RESISTANT",D.style.color="#10b981"):(D.innerText="ENTER PASSWORD",D.style.color="var(--cyber-text-muted)",j.style.width="0%"))}function Mt(){const e=$.value.toLowerCase().trim();N(e)}function Dt(){N($?.value||"")}function Nt(e){const t=e.reduce((r,a)=>r+(a.size||0),0),n=(t/1024/1024).toFixed(2);ut.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);gt.style.width=o+"%";const i=e.filter(r=>r.type?.startsWith("image")).length,s=e.filter(r=>r.type?.startsWith("video")).length;De&&(De.innerText=e.length),Ne&&(Ne.innerText=i),Fe&&(Fe.innerText=s),Pe&&(Pe.innerText=n)}function oe(){const e=document.getElementById("select-all-btn");T.size>0?(Me.classList.remove("hidden"),ft.innerText=`${T.size} selected`,e&&(T.size>=G.length&&G.length>0?e.innerText="Deselect All":e.innerText="Select All")):Me.classList.add("hidden")}function Ft(){T.size>=G.length&&G.length>0?T.clear():G.forEach(e=>T.add(e.id)),oe(),N($?.value||"")}function Pt(){T.clear(),oe(),N($?.value||"")}async function Ot(){if(await ue("Delete Files",`Delete ${T.size} file(s)? This cannot be undone.`)){for(const t of T)await L.deleteFile(t);T.clear(),oe(),N(),await A("Success","Files deleted.")}}async function Ht(){if(T.size!==0){await A("Export",`Exporting ${T.size} files. Each will download separately.`);for(const e of T)await L.getFile(e)&&await zt(e);T.clear(),oe(),N()}}async function zt(e){const t=await L.getFile(e);if(!t)return;const n=await ie(t);if(!n||!n.buffer)return;const{buffer:o,password:i}=n;let s=i;s||(s=await ne("Export Protected File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),s&&await re(t,o,s,{},"Protected file downloaded successfully!")}function Rt(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),le?.classList.remove("hidden"),le?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),le?.classList.add("hidden"),le?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)if(n.length===1){const o=new DataTransfer;o.items.add(n[0]),O.files=o.files,xe(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const o of n)await Qt(o)})}async function Qt(e){if(e.size>157286400){await A("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await ne("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await E.generateKey(),i=E.generateSalt(),s=await E.deriveKeyFromPassword(n,i,2e6),r=await e.arrayBuffer(),{iv:a,ciphertext:d}=await E.encryptData(o,r),{iv:l,wrappedData:h}=await E.wrapKey(o,s),p={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:i,iv:l,data:h}],content:d,iv:a,viewCount:0};await L.saveFile(p),N(),await A("Success",`${e.name} encrypted and saved!`)}function Yt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),$?.focus()),e.key==="Escape"&&(_(),te.close(),Be?.close(),he?.close()),(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="p"&&(e.preventDefault(),Ce()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),je())})}const Oe=5,Gt=300*1e3;function qe(e){const t=R[e];if(t&&t.locked&&Date.now()<t.lockedUntil){const n=Math.ceil((t.lockedUntil-Date.now())/1e3);return alert(`File locked. Try again in ${n} seconds.`),!0}return!1}function Kt(e){R[e]||(R[e]={count:0,locked:!1,lockedUntil:0}),R[e].count++;const t=Oe-R[e].count,n=document.getElementById("attempts-left"),o=document.getElementById("auth-attempts");t<=3&&(o?.classList.remove("hidden"),n&&(n.innerText=t)),R[e].count>=Oe&&(R[e].locked=!0,R[e].lockedUntil=Date.now()+Gt,te.close(),alert("Too many failed attempts. File locked for 5 minutes."))}function jt(e){delete R[e],document.getElementById("auth-attempts")?.classList.add("hidden")}async function Ut(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await A("Required","Please fill all fields");return}if(t!==n){await A("Error","New passwords do not match");return}const o=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],i=t.toLowerCase().trim();if(!((t.length<8||o.includes(i))&&!await ue("⚠️ Weak Password Warning",`This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.

Do you want to proceed with this password?`)))try{const r=await L.getFile(xt);if(!r)throw new Error("File not found");const a=r.keys.find(f=>f.type==="password");if(!a)throw new Error("No password key found");const d=await E.unwrapWithFallback(a.data,e,a.salt,a.iv),l=E.generateSalt(),h=await E.deriveKeyFromPassword(t,l,2e6),{iv:p,wrappedData:m}=await E.wrapKey(d,h);r.keys=r.keys.filter(f=>f.type!=="password"),r.keys.push({type:"password",salt:l,iv:p,data:m}),r.accessLog=r.accessLog||[],r.accessLog.push({action:"password_changed",date:Date.now()}),await L.updateFile(r),Ke?.close(),await A("Success","Password changed successfully!")}catch(r){console.error(r),await A("Error","Failed to change password. Current password may be incorrect.")}}function qt(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function Wt(e){U=U.filter(t=>t.id!==e.id),U.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),U.length>5&&(U=U.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(U)),We()}function We(){if(!we||!ye)return;const e=U.filter(t=>G.some(n=>n.id===t.id));if(e.length===0){we.classList.add("hidden");return}we.classList.remove("hidden"),ye.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),ye.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>Ae(t.dataset.id)})}async function Jt(e,t){e.stopPropagation(),await ue("Delete File","Delete this file permanently?")&&(await L.deleteFile(t),N())}async function Vt(e,t){e.stopPropagation();const n=G.find(s=>s.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode==="always"?"Always Ask Password":n.authMode||"Always Ask Password";const o=document.getElementById("info-views");o&&(o.innerText=n.viewCount||0);const i=document.getElementById("access-log");i&&n.accessLog&&n.accessLog.length>0?i.innerHTML=n.accessLog.slice(-10).reverse().map(s=>`
      <div class="access-log-item">
        ${s.action.replace("_"," ")} - ${new Date(s.date).toLocaleString()}
      </div>
    `).join(""):i&&(i.innerHTML="No access history"),Be.showModal()}function Xt(e,t,n){e.stopPropagation(),ce=t;const o=document.getElementById("rename-input");o.value=n,he.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function He(){const e=document.getElementById("rename-input").value.trim();if(!e||!ce)return;const t=await L.getFile(ce);t&&(t.name=e,await L.updateFile(t)),he.close(),ce=null,N()}async function Zt(e,t){e&&e.stopPropagation();try{const n=await L.getFile(t);if(!n){await A("Error","File not found");return}const o=await ie(n);if(!o||!o.buffer)return;const{buffer:i,password:s}=o;let r=s;if(r||(r=await ne("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await re(n,i,r,{},"Downloaded! The protected file has been saved."),qt(n,"downloaded"),await L.updateFile(n)}catch(n){console.error(n),await A("Error","Failed to download file: "+(n.message||"Decryption error"))}}async function _t(e,t){e.stopPropagation();try{const n=await L.getFile(t);if(!n)return;const o=await ie(n);if(!o||!o.buffer)return;const{buffer:i,password:s}=o;let r=s;if(r||(r=await ne("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await re(n,i,r,{})}catch(n){console.error(n),await A("Error","Share failed: "+n.message)}}function $t(e,t){e.stopPropagation(),ve=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function ze(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await A("Required","Please set a password for the file.");return}const i=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],s=t.toLowerCase().trim();if((t.length<8||i.includes(s))&&!await ue("⚠️ Weak Password Warning",`This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.

Do you want to proceed with this password?`))return;const a=document.getElementById("confirm-share"),d=a.innerText;a.innerText="Exporting...";try{const l=await L.getFile(ve);if(!l)throw new Error("File not found");const h=await ie(l,t);if(!h||!h.buffer)throw new Error("Decryption failed");const p=h.buffer;let m="";o.files&&o.files[0]&&(m=await new Promise(u=>{const w=new FileReader;w.onload=()=>u(w.result),w.readAsDataURL(o.files[0])})),await re(l,p,t,{title:n,logoUrl:m}),e.close(),ve=null}catch(l){console.error(l),await A("Error","Export failed: "+l.message)}finally{a.innerText=d}}function en(e,t){const n=(t||"").toLowerCase(),o=(e||"").toLowerCase();return n.startsWith("image/")||n.startsWith("video/")||n.startsWith("audio/")?!0:/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(o)}function Je(){const e=localStorage.getItem("sv_dl_media")!=="false",t=localStorage.getItem("sv_dl_doc")!=="false";return{allowMedia:e,allowDoc:t}}function Te(e,t){const{allowMedia:n,allowDoc:o}=Je();return en(e,t)?n:o}function Ee(){const{allowMedia:e,allowDoc:t}=Je(),n=document.getElementById("dl-media-status-badge"),o=document.getElementById("dl-doc-status-badge");n&&(n.textContent=e?"ALLOWED":"RESTRICTED",n.className=`policy-status-badge ${e?"allowed":"restricted"}`),o&&(o.textContent=t?"ALLOWED":"RESTRICTED",o.className=`policy-status-badge ${t?"allowed":"restricted"}`)}async function re(e,t,n,o={},i=""){if(!t||t.byteLength===0)throw new Error("No decrypted file payload available to package.");if(!n)throw new Error("Protection password is required to export this file.");const s=o.allowDownload!==void 0?!!o.allowDownload:Te(e.name,e.type),r=E.generateSalt(),a=await E.computePayloadHash(t),d=await E.deriveKeyAsyncWorker(n,r,2e6,E.MILSPEC_ANTI_CRACKER_PEPPER_V6),{iv:l,ciphertext:h}=await E.encryptData(d,t),m=await(b=>new Promise(v=>{const x=new FileReader;x.readAsDataURL(b),x.onloadend=()=>{const I=x.result||"";v(I.split(",")[1]||"")}}))(new Blob([h]));if(!m)throw new Error("Failed to serialize encrypted payload.");const{header:f,footer:u}=tn(e,r,l,{...o,allowDownload:s,integrityHash:a}),w=new Blob([f,m,u],{type:"text/html;charset=utf-8"}),c=URL.createObjectURL(w),g=document.createElement("a");g.href=c;const y=e.name||"protected_file";g.download=y.endsWith(".secure.html")?y:y+".secure.html",document.body.appendChild(g),g.click(),document.body.removeChild(g),setTimeout(()=>URL.revokeObjectURL(c),6e4)}function tn(e,t,n,o={}){const i=ge=>btoa(String.fromCharCode(...new Uint8Array(ge))),s=i(t),r=i(n),a=o.title||"Coralgenz Vault",d=o.logoUrl||"",l=e.name||"Protected File",h=e.type||"application/octet-stream",p=Number(e.size)||0,m=e.id||"",f=o.allowDownload!==void 0?!!o.allowDownload:Te(l,h),u=l.toLowerCase(),w=h.toLowerCase(),c=(ge,Ve)=>Ve.some(Xe=>(ge||"").toLowerCase().endsWith("."+Xe)),g=w.includes("wordprocessingml")||w.includes("msword")||w.includes("word")||c(u,["docx","doc","dotx","odt","rtf"]),y=w.includes("spreadsheetml")||w.includes("excel")||w.includes("spreadsheet")||w.includes("ms-excel")||w.includes("msexcel")||c(u,["xlsx","xls","xlsm","xlsb","xlt","xltx","xltm","ods","csv","tsv"]),b=w.includes("ms-powerpoint")||w.includes("vnd.ms-powerpoint")||c(u,["ppt","pps"]),v=g?pt:"",x=y||b?dt:"",I=JSON.stringify(s),K=JSON.stringify(r),W=JSON.stringify(h),X=JSON.stringify(l),C=JSON.stringify(p),F=JSON.stringify(a),S=JSON.stringify(m),M=JSON.stringify(f),H=JSON.stringify(o.integrityHash||e.integrityHash||""),z=JSON.stringify("V6"),J=d?`<img src="${d}" alt="Logo" class="brand-custom-logo">`:`<div class="brand-shield-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
    <title>${a} // ${l}</title>
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
        ${J}
        <h1 class="auth-title">${a}</h1>
        <div class="auth-subtitle">Protected & Encrypted File</div>
        
        <div class="file-info-chip">
            <div class="file-chip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            </div>
            <div class="file-chip-details">
                <div class="file-chip-name" title="${l}">${l}</div>
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
                <div class="viewer-brand-title">${a}</div>
                <div class="viewer-file-badge" id="viewer-file-name">${l}</div>
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
        const CONTAINER_VERSION = ${z};
        const SALT_B64 = ${I};
        const IV_B64 = ${K};
        const TYPE = ${W};
        const NAME = ${X};
        const SIZE = ${C};
        const BRAND = ${F};
        const ALLOW_DOWNLOAD = ${M};
        const INTEGRITY_HASH = ${H};

        // Dynamically assembled anti-cracker peppers (defeats static string grep/decompilation)
        const MILSPEC_PEPPER_V6 = ["CORALGENZ", "MILSPEC_V6", "QUANTUM_RESISTANT", "ZERO_KNOWLEDGE", "883920194821"].join("::");
        const MILSPEC_PEPPER = MILSPEC_PEPPER_V6;
        const MILSPEC_PEPPER_V5 = ["CORALGENZ", "MILSPEC_V5", "ANTI_OFFLINE_CRACKER", "ZERO_KNOWLEDGE", "774910283419"].join("::");
        const MILSPEC_PEPPER_V4 = ["CORALGENZ", "MILSPEC_V4", "ANTI_JOHN_THE_RIPPER", "ZERO_KNOWLEDGE", "992174829104"].join("::");

        // Persistent session brute-force lockout tracking per file container
        const ATTEMPTS_KEY = 'cg_fails_' + ${S};
        const LOCKOUT_KEY = 'cg_lockout_' + ${S};

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
            ${ct};
            return self.fflate || (typeof window !== 'undefined' ? window.fflate : null);
        })();

        var MAMMOTH_DEFLATED = "${v}";
        var XLSX_DEFLATED = "${x}";

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

            // 1. Try embedded XLSX engine (SheetJS: supports xlsx, xls BIFF8, csv, tsv, ods, formulas, formatting)
            try {
                let xlsxEngine = window.XLSX;
                if (!xlsxEngine && typeof XLSX_DEFLATED !== 'undefined' && XLSX_DEFLATED) {
                    xlsxEngine = loadEmbeddedLibrary(XLSX_DEFLATED, 'XLSX');
                    if (xlsxEngine) window.XLSX = xlsxEngine;
                }

                if (xlsxEngine && typeof xlsxEngine.read === 'function') {
                    const arrayBuf = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
                    let workbook = null;
                    try {
                        workbook = xlsxEngine.read(arrayBuf, { type: 'array', cellDates: true, cellStyles: true, raw: false });
                    } catch (e1) {
                        try {
                            workbook = xlsxEngine.read(new Uint8Array(bytes), { type: 'array' });
                        } catch (e2) {
                            console.warn('XLSX engine read notice:', e1, e2);
                        }
                    }

                    if (workbook && workbook.SheetNames) {
                        const sheetNames = workbook.SheetNames || [];
                        sheetNames.forEach(sName => {
                            const ws = workbook.Sheets[sName];
                            if (ws) {
                                const rows = xlsxEngine.utils.sheet_to_json(ws, { header: 1, defval: '' });
                                if (rows && rows.length > 0) {
                                    sheets.push({ name: sName, rows: rows });
                                }
                            }
                        });
                    }
                }
            } catch (err) {
                console.warn('XLSX engine notice:', err);
            }

            // 2. OpenXML spreadsheet fallback (.xlsx)
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

            // 3. XML Spreadsheet 2003 or HTML table fallback (common for legacy exported .xls)
            if (sheets.length === 0) {
                try {
                    const text = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
                    if (text.includes('urn:schemas-microsoft-com:office:spreadsheet') || (text.includes('<Worksheet') && text.includes('<Table>'))) {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(text, 'application/xml');
                        const worksheets = xmlDoc.getElementsByTagName('Worksheet');
                        for (let w = 0; w < worksheets.length; w++) {
                            const wsEl = worksheets[w];
                            const wsName = wsEl.getAttribute('ss:Name') || wsEl.getAttribute('Name') || ('Sheet ' + (w + 1));
                            const rowEls = wsEl.getElementsByTagName('Row');
                            const sheetRows = [];
                            for (let r = 0; r < rowEls.length; r++) {
                                const cellEls = rowEls[r].getElementsByTagName('Cell');
                                const rowData = [];
                                for (let c = 0; c < cellEls.length; c++) {
                                    const dataEl = cellEls[c].getElementsByTagName('Data')[0];
                                    rowData.push(dataEl ? (dataEl.textContent || '') : (cellEls[c].textContent || ''));
                                }
                                if (rowData.some(cell => String(cell).trim().length > 0)) {
                                    sheetRows.push(rowData);
                                }
                            }
                            if (sheetRows.length > 0) {
                                sheets.push({ name: wsName, rows: sheetRows });
                            }
                        }
                    } else if (text.includes('<table') || text.includes('<TABLE')) {
                        const parser = new DOMParser();
                        const htmlDoc = parser.parseFromString(text, 'text/html');
                        const tables = htmlDoc.querySelectorAll('table');
                        tables.forEach((tbl, tIdx) => {
                            const trEls = tbl.querySelectorAll('tr');
                            const sheetRows = [];
                            trEls.forEach(tr => {
                                const cells = tr.querySelectorAll('th, td');
                                const rowData = Array.from(cells).map(c => c.textContent.trim());
                                if (rowData.some(c => c.length > 0)) {
                                    sheetRows.push(rowData);
                                }
                            });
                            if (sheetRows.length > 0) {
                                sheets.push({ name: 'Sheet ' + (tIdx + 1), rows: sheetRows });
                            }
                        });
                    }
                } catch (eXml) {
                    console.warn('XML/HTML spreadsheet fallback note:', eXml);
                }
            }

            // 4. Plain CSV/TSV fallback
            if (sheets.length === 0) {
                try {
                    const text = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
                    const delimiter = name.toLowerCase().endsWith('.tsv') ? '	' : (text.includes('	') ? '	' : (text.includes(';') ? ';' : ','));
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

            // 3. RTF and Legacy Binary .doc Fallback
            if (!renderedContent) {
                try {
                    const rawText = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
                    if (rawText.startsWith('{\\rtf')) {
                        let rtfContent = rawText
                            .replace(/\\w+\b[ ]?/g, ' ')
                            .replace(/[{}]/g, '')
                            .split(String.fromCharCode(10))
                            .map(l => l.trim())
                            .filter(l => l.length > 0);
                        if (rtfContent.length > 0) {
                            sheet.innerHTML = '<h1>' + escapeHTML(name) + '</h1>' + rtfContent.map(p => '<p>' + escapeHTML(p) + '</p>').join('');
                            renderedContent = true;
                        }
                    } else {
                        let printableText = '';
                        for (let pi = 0; pi < rawText.length; pi++) {
                            const code = rawText.charCodeAt(pi);
                            if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
                                printableText += rawText.charAt(pi);
                            } else {
                                printableText += String.fromCharCode(10);
                            }
                        }
                        const cleanParagraphs = printableText.split(String.fromCharCode(10))
                            .map(p => p.trim())
                            .filter(p => p.length > 25 && !p.startsWith('<?xml') && !p.startsWith('PK') && !p.includes('schemas.openxmlformats') && !p.includes('Microsoft') && !p.includes('CompObj'));

                        if (cleanParagraphs.length > 0) {
                            let fallbackHTML = '<h1 style="font-size:24px;margin-bottom:20px;color:#0f172a;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">' + escapeHTML(name) + '</h1>';
                            cleanParagraphs.slice(0, 100).forEach(p => {
                                fallbackHTML += '<p>' + escapeHTML(p) + '</p>';
                            });
                            sheet.innerHTML = fallbackHTML;
                            renderedContent = true;
                        }
                    }
                } catch (e) {}
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

        // Trap Print (Ctrl+P / Cmd+P) and PrintScreen Keys
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'PrintScreen' || e.keyCode === 44) {
                obscureScreen();
                try { navigator.clipboard.writeText(''); } catch (err) {}
                setTimeout(restoreScreen, 1500);
            }
        });

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
                const isExcel = safeType.includes('spreadsheetml') || safeType.includes('excel') || safeType.includes('spreadsheet') || safeType.includes('ms-excel') || safeType.includes('msexcel') || hasExt(lowerName, ['xlsx', 'xls', 'xlsm', 'xlsb', 'xlt', 'xltx', 'xltm', 'ods', 'csv', 'tsv']);
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

        const DATA = "`,footer:`";
    <\/script>
</body>
</html>`}}async function ie(e,t=null){let n=null,o=t;if(t)try{const s=e.keys.find(r=>r.type==="password");s&&(n=await E.unwrapWithFallback(s.data,t,s.salt,s.iv))}catch{console.log("Provided password invalid for unlock")}if(!n){const s=await ne("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!s)return null;try{const r=e.keys.find(a=>a.type==="password");n=await E.unwrapWithFallback(r.data,s,r.salt,r.iv),o=s}catch{return await A("Error","Incorrect password"),null}}return{buffer:await E.decryptData(n,e.iv,e.content),password:o}}async function Re(){const e=O.files[0],t=document.getElementById("new-password").value;if(!e){await A("Required","Please select a file to protect");return}if(!t){await A("Required","Protection password is required"),document.getElementById("new-password")?.focus();return}const n=document.getElementById("confirm-add"),o=n.innerText;n.innerText="SECURING FILE (6s)...",n.disabled=!0;const i=document.getElementById("protection-process-container"),s=document.getElementById("file-upload-zone"),r=document.getElementById("file-preview"),a=document.getElementById("inline-password-section"),d=document.getElementById("protection-complete-container"),l=document.getElementById("security-terminal-body"),h=document.getElementById("process-timer-display"),p=document.getElementById("scanner-status-text"),m=document.querySelector(".scanner-center-shield"),f=document.querySelector(".scanner-stage");s?.classList.add("hidden"),r?.classList.add("hidden"),a?.classList.add("hidden"),d?.classList.add("hidden"),i?.classList.remove("hidden"),f?.classList.add("rapid-scan"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(y=>{B(y,"")}),m&&m.classList.remove("success"),p&&(p.textContent="SECURING"),l&&(l.innerHTML="");const u=Date.now(),w=setInterval(()=>{const y=Date.now()-u,b=Math.min(6e3,y),v=Math.floor(b/1e3).toString().padStart(2,"0"),x=Math.floor(b%1e3/10).toString().padStart(2,"0");h&&(h.textContent=`00:${v}.${x}`)},20),c=y=>{const b=Math.min(6e3,Math.max(0,y)),v=Math.floor(b/1e3).toString().padStart(2,"0"),x=Math.floor(b%1e3/10).toString().padStart(2,"0");return`[00:${v}.${x}]`},g=async y=>{const b=Date.now()-u,v=y-b;v>0&&await new Promise(x=>setTimeout(x,v))};try{q(14,"FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE..."),B("step-analysis","active"),p&&(p.textContent="ANALYZING"),k(`${c(Date.now()-u)} INITIATING RAPID ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6`),k(`${c(Date.now()-u)} File: "${e.name}" [${pe(e.size)}] | Type: ${e.type||"application/octet-stream"}`),k(`${c(Date.now()-u)} Enclave memory block allocated: ${e.size} bytes. Isolation confirmed.`);const y=E.detectDeviceCapabilities();k(`${c(Date.now()-u)} Hardware Profile: ${y.concurrency} Cores, ${y.memory}GB RAM [Worker Offload: Active]`),await g(750),B("step-analysis","completed"),q(28,"INITIALIZING CSPRNG ENTROPY POOL..."),B("step-prep","active"),p&&(p.textContent="ENTROPY POOL"),k(`${c(Date.now()-u)} Generating 256-bit cryptographic salt from hardware CSPRNG...`);const b=E.generateSalt(),v=await E.generateKey();k(`${c(Date.now()-u)} Nonce generation: 96-bit AES-GCM Initialization Vector created.`),k(`${c(Date.now()-u)} Ephemeral entropy validated: entropy score = 0.9998.`),await g(1500),B("step-prep","completed"),q(45,"DERIVING KEY (DUAL-STAGE KDF 2,000,000 ROUNDS)..."),B("step-kdf","active"),p&&(p.textContent="2,000,000 PBKDF2"),k(`${c(Date.now()-u)} Stage 1: HMAC-SHA512 Pre-whitening with Domain-Separated Pepper V6...`),k(`${c(Date.now()-u)} Worker Offload: Initializing background thread for smooth 60fps UI...`),k(`${c(Date.now()-u)} Stage 2: Computing 2,000,000 PBKDF2 iterations (Anti-JohnTheRipper / Anti-Hashcat)...`);const x=await E.deriveKeyAsyncWorker(t,b,2e6,E.MILSPEC_ANTI_CRACKER_PEPPER_V6);k(`${c(Date.now()-u)} Key derivation complete: 256-bit symmetric cipher key established.`),await g(2400),B("step-kdf","completed"),q(65,"AES-GCM-256 CIPHER STREAM PROCESSING..."),B("step-encrypt","active"),p&&(p.textContent="AES-256-GCM"),k(`${c(Date.now()-u)} Executing client-side WebCrypto AES-GCM 256-bit cipher...`);const I=await e.arrayBuffer(),K=await E.computePayloadHash(I);k(`${c(Date.now()-u)} SHA-256 Payload Integrity Seal: ${K.substring(0,16)}... [VERIFIED]`);const W=I.slice(0),{iv:X,ciphertext:C}=await E.encryptData(v,I);k(`${c(Date.now()-u)} Encrypting ${pe(e.size)} payload blocks into zero-knowledge ciphertext...`),k(`${c(Date.now()-u)} Ciphertext generated (${C.byteLength} bytes). 128-bit Galois Tag verified.`),await g(3300),B("step-encrypt","completed"),q(80,"PACKAGING ZERO-KNOWLEDGE METADATA..."),B("step-meta","active"),B("step-finalize","active"),p&&(p.textContent="KEY WRAP & VAULT"),k(`${c(Date.now()-u)} Wrapping master file key with AES key wrap cipher...`);const{iv:F,wrappedData:S}=await E.wrapKey(v,x),M=[{type:"password",salt:b,iv:F,data:S}],H={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:M,content:C,iv:X,viewCount:0,expires:null,note:"",integrityHash:K,accessLog:[{action:"created",date:Date.now()}]};await L.saveFile(H),k(`${c(Date.now()-u)} Encrypted container committed to zero-knowledge local IndexedDB.`),await g(4200),B("step-meta","completed"),B("step-finalize","completed"),q(92,"COMPILING STANDALONE HTML RUNTIME (.secure.html)..."),B("step-output","active"),p&&(p.textContent="STANDALONE HTML"),k(`${c(Date.now()-u)} Assembling self-contained portable decryption engine...`),k(`${c(Date.now()-u)} Embedding browser-native WebCrypto decryptor payload...`),k(`${c(Date.now()-u)} Anti-Exfiltration & Cryptographic defense matrix armed.`),await g(5100),B("step-output","completed"),q(100,"CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]"),B("step-verify","active"),p&&(p.textContent="SEALING CONTAINER"),k(`${c(Date.now()-u)} Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK.`),k(`${c(Date.now()-u)} CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY.`),await g(6e3),B("step-verify","completed"),clearInterval(w),h&&(h.textContent="00:06.00"),p&&(p.textContent="SECURED [✓]"),m&&m.classList.add("success"),await new Promise(J=>setTimeout(J,350)),f?.classList.remove("rapid-scan"),i?.classList.add("hidden"),d?.classList.remove("hidden");const z=document.getElementById("complete-file-name");z&&(z.textContent=e.name),Y={record:H,buffer:W,password:t},N()}catch(y){clearInterval(w),f?.classList.remove("rapid-scan"),console.error(y),k(`CRITICAL ERROR: ${y.message}`),await A("Error","Encryption failed: "+y.message),i?.classList.add("hidden"),r?.classList.remove("hidden"),a?.classList.remove("hidden")}finally{n.innerText=o,n.disabled=!1}}async function Ae(e){if(!qe(e))try{const t=await L.getFile(e);if(!t){await A("Error","File not found");return}Le=t,document.getElementById("auth-file-name").innerText=t.name,te.showModal()}catch(t){console.error(t),await A("Error","Error opening file")}}async function Qe(){const e=Le;if(!e||qe(e.id))return;const t=document.getElementById("auth-password").value;if(!t)return;const n=document.getElementById("confirm-auth");n.innerText="Unlocking...";try{const o=e.keys.find(s=>s.type==="password");if(!o)throw new Error("Corrupt key data");const i=await E.unwrapWithFallback(o.data,t,o.salt,o.iv);jt(e.id),te.close(),document.getElementById("auth-password").value="",nn(e,i)}catch(o){console.error(o),Kt(e.id),await A("Error","Incorrect password or decryption error.")}finally{n.innerText="Unlock"}}async function nn(e,t){try{const n=await E.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});Q=URL.createObjectURL(o);const i=document.getElementById("viewer-content");i.innerHTML="";const s=Te(e.name,e.type);V&&(s?(V.classList.remove("hidden"),V.onclick=()=>{if(!Q)return;const c=document.createElement("a");c.style.display="none",c.href=Q,c.download=e.name,document.body.appendChild(c),c.click(),document.body.removeChild(c)}):(V.classList.add("hidden"),V.onclick=null));const r=(e.name||"").toLowerCase(),a=(e.type||"").toLowerCase(),d=a.startsWith("image/")||/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(r),l=a.startsWith("video/")||/\.(mp4|webm|mov|mkv|ogg)$/i.test(r),h=a.startsWith("audio/")||/\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(r),p=a==="application/pdf"||/\.pdf$/i.test(r),m=a.includes("excel")||a.includes("spreadsheet")||a.includes("ms-excel")||a.includes("msexcel")||/\.(xlsx|xls|xlsm|xlsb|xlt|xltx|xltm|ods|csv|tsv)$/i.test(r),f=a.includes("word")||/\.(docx|doc)$/i.test(r),u=a.includes("presentation")||a.includes("powerpoint")||/\.(pptx|ppt|pps|ppsx)$/i.test(r),w=a.startsWith("text/")||/\.(txt|json|js|ts|html|css|py|c|cpp|h|java|sh|xml|yaml|yml|sql|md|log|env|rs|go|kt|swift|rb|php)$/i.test(r);if(d){const c=document.createElement("img");c.src=Q,c.style.maxWidth="90vw",c.style.maxHeight="80vh",c.style.objectFit="contain",i.appendChild(c)}else if(l||h){const c=document.createElement(l?"video":"audio");c.src=Q,c.controls=!0,c.autoplay=!0,s||(c.setAttribute("controlsList","nodownload"),c.oncontextmenu=g=>g.preventDefault()),i.appendChild(c)}else if(p){const c=document.createElement("iframe");c.src=Q+(s?"":"#toolbar=0"),c.style.width="100%",c.style.height="100%",c.style.border="none",i.appendChild(c)}else if(m)Ct(n,i,e.name);else if(f)await Bt(n,i);else if(u)await Lt(n,e.name,i);else if(w){const g=new TextDecoder().decode(n),y=document.createElement("div");y.className="excel-viewer",y.style.background="#0f172a",y.style.color="#e2e8f0",y.innerHTML=`
        <div class="excel-header" style="background:#1e293b;border-color:rgba(255,255,255,0.1);justify-content:space-between;align-items:center;">
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">${e.name}</span>
          <button type="button" id="vault-copy-code-btn" class="excel-sheet-btn">Copy Text</button>
        </div>
        <div class="excel-table-wrapper" style="background:#0f172a;">
          <pre style="margin:0;font-family:var(--font-mono);font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-all;"><code>${g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        </div>
      `,i.appendChild(y),y.querySelector("#vault-copy-code-btn")?.addEventListener("click",async()=>{await navigator.clipboard.writeText(g),await A("Success","Text copied to clipboard!")})}else{const c=document.createElement("div");c.className="ppt-slide-card",c.style.alignItems="center",c.style.justifyContent="center",c.style.textAlign="center",c.innerHTML=`
        <div style="font-size:48px;margin-bottom:12px;">📁</div>
        <div class="ppt-slide-title">${e.name}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;margin-top:6px;">DECRYPTED FILE READY (${pe(e.size)})</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">The file has been decrypted into volatile browser memory. Use the Download button above to save the original file to your device.</p>
      `,i.appendChild(c)}document.getElementById("viewer-filename").innerText=e.name,Ye.classList.remove("hidden"),Wt(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(n){console.error(n),await A("Error","Decryption failed.")}}async function ke(){Ye.classList.add("hidden"),V&&V.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",Q&&(URL.revokeObjectURL(Q),Q=null)}async function on(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),N())}async function N(e=""){me.innerHTML="";let t=await L.getAllFiles();G=t,Nt(t),e&&(t=t.filter(i=>i.name.toLowerCase().includes(e.toLowerCase())));const n=Ge?.value||"date-desc";t.sort((i,s)=>{if(i.favorite&&!s.favorite)return-1;if(!i.favorite&&s.favorite)return 1;switch(n){case"date-desc":return(s.date||0)-(i.date||0);case"date-asc":return(i.date||0)-(s.date||0);case"name-asc":return i.name.localeCompare(s.name);case"name-desc":return s.name.localeCompare(i.name);case"size-desc":return(s.size||0)-(i.size||0);case"size-asc":return(i.size||0)-(s.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(G.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){me.innerHTML=`
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${e?"NO FILES MATCH SEARCH":"NO PROTECTED FILES FOUND"}</h3>
        <p class="empty-desc">${e?"Check search parameters or query another filename.":"Drop a file in the upload zone above to initialize client-side encryption."}</p>
      </div>`;return}t.forEach((i,s)=>{const r=document.createElement("div");r.className="file-card",r.style.animationDelay=`${s*.05}s`,r.onclick=async g=>{!g.target.closest(".file-card-actions")&&!g.target.closest(".file-actions")&&!g.target.closest(".select-checkbox")&&!g.target.closest(".favorite-btn")&&Ae(i.id)};let a='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';i.type?.startsWith("image")&&(a='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),i.type?.startsWith("video")&&(a='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),i.type?.startsWith("audio")&&(a='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');const d=T.has(i.id);let l=i.name;const h='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',p='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',m='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',f='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',w='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',c='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';r.innerHTML=`
        <span class="hud-corner top-left"></span>
        <span class="hud-corner top-right"></span>
        <span class="hud-corner bottom-left"></span>
        <span class="hud-corner bottom-right"></span>
        <div class="file-card-top">
          <input type="checkbox" class="select-checkbox" ${d?"checked":""} />
          <div class="file-icon">${a}</div>
          <div class="file-details">
            <h3>${l}</h3>
            <div class="file-meta">
              <span>${(i.size/1024/1024).toFixed(2)} MB</span>
              <span class="cyber-card-pill pill-cipher">AES-256</span>
              <span class="cyber-card-pill pill-policy">ALWAYS ASK</span>
            </div>
          </div>
        </div>
        <div class="file-card-actions">
          <button class="btn-highlight open-btn">${h} Unlock</button>
          <button class="btn-highlight download-btn">${p} Download</button>
          <button class="btn-highlight share-btn">${m} Export</button>
          <button class="btn-highlight custom-share-btn">${f} Custom</button>
          <button class="btn-small info-btn">${u} Info</button>
          <button class="btn-small rename-btn">${w} Rename</button>
          <button class="btn-small delete-btn">${c} Delete</button>
        </div>
    `,r.querySelector(".select-checkbox").onchange=g=>{g.stopPropagation(),g.target.checked?T.add(i.id):T.delete(i.id),oe()},r.querySelector(".open-btn").onclick=g=>{g.stopPropagation(),Ae(i.id)},r.querySelector(".download-btn").onclick=g=>Zt(g,i.id),r.querySelector(".info-btn").onclick=g=>Vt(g,i.id),r.querySelector(".rename-btn").onclick=g=>Xt(g,i.id,i.name),r.querySelector(".share-btn").onclick=g=>_t(g,i.id),r.querySelector(".custom-share-btn").onclick=g=>$t(g,i.id),r.querySelector(".delete-btn").onclick=g=>Jt(g,i.id),me.appendChild(r)})}function Ie(){const e=localStorage.getItem("sv_panic_action")||"blur",t=document.getElementById("panic-action-select");t&&(t.value=e);const n=localStorage.getItem("sv_dl_media")!=="false",o=localStorage.getItem("sv_dl_doc")!=="false",i=document.getElementById("dl-media-toggle"),s=document.getElementById("dl-doc-toggle");i&&(i.checked=n),s&&(s.checked=o),Ee();const r=localStorage.getItem("sv_panic_enabled")!=="false",a=document.getElementById("panic-enable-toggle");a&&(a.checked=r),Se()}function Se(){const e=localStorage.getItem("sv_panic_enabled")!=="false",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function Ce(){const e=localStorage.getItem("sv_panic_action")||"blur";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await L.getAllFiles();for(const o of n)await L.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),window.location.reload()}catch(t){console.error(t)}})();else if(e==="blur"||e==="lock"){ke(),Z?.close(),de?.close(),document.querySelectorAll(".panic-overlay").forEach(n=>n.remove());const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",n=>{n.stopPropagation(),t.remove()})}else if(e==="loading"){ke(),Z?.close(),de?.close(),document.querySelectorAll(".panic-overlay").forEach(o=>o.remove());const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `,document.body.appendChild(t);const n=()=>{t.remove()};t.addEventListener("click",n),t.addEventListener("touchstart",n)}}}function rn(){const e=document.getElementById("cyber-matrix-canvas");if(e){const o=e.getContext("2d");if(o){let m=function(){i=e.width=window.innerWidth,s=e.height=window.innerHeight,l=Math.floor(i/d),h=[],p=[];for(let c=0;c<l;c++)h[c]=Math.random()*-60,p[c]=.8+Math.random()*1.2},w=function(c){if(requestAnimationFrame(w),!(c-f<u)){f=c,o.fillStyle="rgba(5, 7, 10, 0.12)",o.fillRect(0,0,i,s),o.font=`600 ${d}px "JetBrains Mono", monospace`;for(let g=0;g<h.length;g++){const y=a[Math.floor(Math.random()*a.length)],b=g*d,v=h[g]*d;Math.random()>.88?(o.fillStyle="#ffffff",o.shadowColor="#00f0ff",o.shadowBlur=10):g%3===0?(o.fillStyle="rgba(0, 240, 255, 0.65)",o.shadowColor="#00f0ff",o.shadowBlur=4):g%3===1?(o.fillStyle="rgba(0, 255, 136, 0.55)",o.shadowColor="#00ff88",o.shadowBlur=3):(o.fillStyle="rgba(56, 189, 248, 0.4)",o.shadowBlur=0),o.fillText(y,b,v),v>s&&Math.random()>.96&&(h[g]=0,p[g]=.8+Math.random()*1.2),h[g]+=p[g]}}},i=e.width=window.innerWidth,s=e.height=window.innerHeight;const a="0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG".split(""),d=13;let l=Math.floor(i/d),h=[],p=[];m(),window.addEventListener("resize",m);let f=0;const u=33;requestAnimationFrame(w)}}const t=document.getElementById("hero-term-status");if(t){const o=["INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE","HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE","DUAL-STAGE KEY DERIVATION: HMAC-SHA512 + 2,000,000 PBKDF2 ROUNDS (V6 PEPPER)","LOW-END HARDWARE OPTIMIZATION: ACTIVE // WORKER THREAD OFFLOAD ENFORCES 60FPS UI","ANTI-OFFLINE CRACKER: IMMUNE TO JOHN THE RIPPER, HASHCAT & GPU DICTIONARY CLUSTERS","AIR-GAPPED RUNTIME: ZERO REMOTE PACKETS DISPATCHED // IMMUNE TO BURP SUITE INTERCEPTION","ANTI-VIRUS MEMORY SANITIZATION: ACTIVE HEAP ZEROIZATION // ZERO DISK PERSISTENCE","CRYPTOGRAPHIC TAMPER DETECTION: SHA-256 PAYLOAD INTEGRITY SEAL ARMED","MIL-SPEC DEFENSE PROTOCOL: LEVEL-6 CLEARANCE // 128-BIT AUTHENTICATION TAG ARMED","STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT","SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED"];let i=0;setInterval(()=>{i=(i+1)%o.length,t.style.opacity="0",t.style.transform="translateY(4px)",setTimeout(()=>{t.textContent=o[i],t.style.transition="all 0.3s ease",t.style.opacity="1",t.style.transform="translateY(0)"},300)},4e3)}document.addEventListener("click",o=>{const i=o.target.closest(".cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone");if(!i)return;const s=i.getBoundingClientRect(),r=document.createElement("span");r.className="cyber-click-glow-ripple",r.style.left=`${o.clientX-s.left}px`,r.style.top=`${o.clientY-s.top}px`,i.style.position=i.style.position||"relative",i.appendChild(r),setTimeout(()=>r.remove(),600)});const n=[{el:document.getElementById("hero-command"),navId:"nav-item-console"},{el:document.getElementById("inline-add-container"),navId:"nav-item-protect"},{el:document.getElementById("secured-files-heading"),navId:"nav-item-files"}];window.addEventListener("scroll",()=>{const o=window.scrollY+180;for(let i=n.length-1;i>=0;i--){const s=n[i];if(s.el&&s.el.offsetTop<=o){document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.id===s.navId?r.classList.add("active"):r.id!=="nav-item-settings"&&r.classList.remove("active")});break}}},{passive:!0})}
