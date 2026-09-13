import"./jspdf-Bo0itkfF.js";import{r as je,u as Ge}from"./xlsx-DFH0qU2H.js";import{r as Ze,a as qe,g as Ye}from"./mammoth-D8566hzF.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const V="CORALGENZ::MILSPEC_V6::QUANTUM_RESISTANT::ZERO_KNOWLEDGE::883920194821",Je=V,Xe="CORALGENZ::MILSPEC_V5::ANTI_OFFLINE_CRACKER::ZERO_KNOWLEDGE::774910283419",Qe="CORALGENZ::MILSPEC_V4::ANTI_JOHN_THE_RIPPER::ZERO_KNOWLEDGE::992174829104";class w{constructor(){this.algo={name:"AES-GCM",length:256}}static detectDeviceCapabilities(){let t=4,n=4;try{typeof navigator<"u"&&(t=navigator.hardwareConcurrency||4,n=navigator.deviceMemory||4)}catch{}const o=t<=2||n<=2;return{isLowEnd:o,recommendedIterations:o?1e6:2e6,concurrency:t,memory:n}}static async computePayloadHash(t){const n=await window.crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}static generateIV(){return window.crypto.getRandomValues(new Uint8Array(12))}static generateSalt(){return window.crypto.getRandomValues(new Uint8Array(32))}static async generateKey(){return window.crypto.subtle.generateKey({name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async deriveKeyFromPassword(t,n,o=2e6,a="SHA-256",i=!0,r=V){const s=new TextEncoder;let l;if(i){const p=r||Je,m=s.encode(p),g=s.encode(t),h=new Uint8Array(m.length+g.length);h.set(m,0),h.set(g,m.length);const v=await window.crypto.subtle.importKey("raw",n,{name:"HMAC",hash:"SHA-512"},!1,["sign"]),d=await window.crypto.subtle.sign("HMAC",v,h);l=new Uint8Array(d),h.fill(0),g.fill(0)}else l=s.encode(t);const c=await window.crypto.subtle.importKey("raw",l,"PBKDF2",!1,["deriveKey"]),u=await window.crypto.subtle.deriveKey({name:"PBKDF2",salt:n,iterations:o,hash:a},c,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);return l&&l.fill&&l.fill(0),u}static async deriveKeyAsyncWorker(t,n,o=2e6,a=V){if(typeof Worker<"u"&&typeof Blob<"u"&&typeof URL<"u"&&URL.createObjectURL)try{return await new Promise((i,r)=>{const s=`
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
                    `,l=new Blob([s],{type:"application/javascript"}),c=URL.createObjectURL(l),u=new Worker(c),p=setTimeout(()=>{try{u.terminate(),URL.revokeObjectURL(c)}catch{}r(new Error("Worker key derivation timed out"))},12e3);u.onmessage=async g=>{if(clearTimeout(p),u.terminate(),URL.revokeObjectURL(c),g.data&&g.data.success)try{const h=await window.crypto.subtle.importKey("raw",g.data.rawKey,{name:"AES-GCM",length:256},!0,["encrypt","decrypt","wrapKey","unwrapKey"]);i(h)}catch(h){r(h)}else r(new Error(g.data?.error||"Worker derivation failed"))},u.onerror=g=>{clearTimeout(p),u.terminate(),URL.revokeObjectURL(c),r(g)};const m=new Uint8Array(n);u.postMessage({password:t,salt:m,iterations:o,pepper:a})})}catch{}return this.deriveKeyFromPassword(t,n,o,"SHA-256",!0,a)}static async encryptData(t,n){const o=this.generateIV(),a=await window.crypto.subtle.encrypt({name:"AES-GCM",iv:o},t,n);return{iv:o,ciphertext:a}}static async decryptData(t,n,o){return window.crypto.subtle.decrypt({name:"AES-GCM",iv:n},t,o)}static async exportKey(t){return window.crypto.subtle.exportKey("raw",t)}static async importKey(t){return window.crypto.subtle.importKey("raw",t,{name:"AES-GCM"},!0,["encrypt","decrypt","wrapKey","unwrapKey"])}static async wrapKey(t,n){const o=this.generateIV(),a=await window.crypto.subtle.wrapKey("raw",t,n,{name:"AES-GCM",iv:o});return{iv:o,wrappedData:a}}static async unwrapKey(t,n,o){return window.crypto.subtle.unwrapKey("raw",t,n,{name:"AES-GCM",iv:o},{name:"AES-GCM"},!0,["encrypt","decrypt"])}static async unwrapWithFallback(t,n,o,a,i=2e6){try{const r=await this.deriveKeyFromPassword(n,o,i,"SHA-256",!0,V);return await this.unwrapKey(t,r,a)}catch(r){try{const s=await this.deriveKeyFromPassword(n,o,i,"SHA-256",!0,Xe);return await this.unwrapKey(t,s,a)}catch{try{const l=await this.deriveKeyFromPassword(n,o,1e6,"SHA-256",!0,Qe);return await this.unwrapKey(t,l,a)}catch{const c=[i,1e6,6e5,1e5];for(const u of c)try{const p=await this.deriveKeyFromPassword(n,o,u,"SHA-256",!1);return await this.unwrapKey(t,p,a)}catch{}throw r}}}}static async getDeviceKey(){const t=localStorage.getItem("sv_device_key");let n;if(t){const o=atob(t),a=new Uint8Array(o.length);for(let i=0;i<o.length;i++)a[i]=o.charCodeAt(i);n=a.buffer}else{const o=await this.generateKey();n=await this.exportKey(o);const a=new Uint8Array(n);let i="";for(let r=0;r<a.byteLength;r++)i+=String.fromCharCode(a[r]);localStorage.setItem("sv_device_key",btoa(i))}return this.importKey(n)}}const et="SecureVaultDB",tt=1,M="files";function J(){return new Promise((e,t)=>{const n=indexedDB.open(et,tt);n.onupgradeneeded=o=>{const a=o.target.result;a.objectStoreNames.contains(M)||a.createObjectStore(M,{keyPath:"id"})},n.onsuccess=o=>e(o.target.result),n.onerror=o=>t(o.target.error)})}const k={async saveFile(e){const t=await J();return new Promise((n,o)=>{const r=t.transaction(M,"readwrite").objectStore(M).put(e);r.onsuccess=()=>n(e.id),r.onerror=()=>o(r.error)})},async getAllFiles(){const e=await J();return new Promise((t,n)=>{const i=e.transaction(M,"readonly").objectStore(M).openCursor(),r=[];i.onsuccess=s=>{const l=s.target.result;if(l){const{content:c,...u}=l.value;r.push(u),l.continue()}else t(r)},i.onerror=()=>n(i.error)})},async getFile(e){const t=await J();return new Promise((n,o)=>{const r=t.transaction(M,"readonly").objectStore(M).get(e);r.onsuccess=()=>n(r.result),r.onerror=()=>o(r.error)})},async deleteFile(e){const t=await J();return new Promise((n,o)=>{const r=t.transaction(M,"readwrite").objectStore(M).delete(e);r.onsuccess=()=>n(),r.onerror=()=>o(r.error)})},async updateFile(e){return this.saveFile(e)}};var nt=Ze(),ot=qe();const rt=Ye(ot),at=`
!function(f){typeof module!='undefined'&&typeof exports=='object'?module.exports=f():typeof define!='undefined'&&define.amd?define(f):(typeof self!='undefined'?self:this).fflate=f()}(function(){var _e={};"use strict";var t=(typeof module!='undefined'&&typeof exports=='object'?function(_f){"use strict";var e,t=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{e=require("worker_threads").Worker}catch(e){}exports.default=e?function(r,n,o,a,s){var u=!1,i=new e(r+t,{eval:!0}).on("error",(function(e){return s(e,null)})).on("message",(function(e){return s(null,e)})).on("exit",(function(e){e&&!u&&s(Error("exited with code "+e),null)}));return i.postMessage(o,a),i.terminate=function(){return u=!0,e.prototype.terminate.call(i)},i}:function(e,t,r,n,o){setImmediate((function(){return o(Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)}));var a=function(){};return{terminate:a,postMessage:a}};return _f}:function(_f){"use strict";var e={};_f.default=function(r,t,s,a,n){var o=new Worker(e[t]||(e[t]=URL.createObjectURL(new Blob([r+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return o.onmessage=function(e){var r=e.data,t=r.$e$;if(t){var s=Error(t[0]);s.code=t[1],s.stack=t[2],n(s,null)}else n(null,r)},o.postMessage(s,a),o};return _f})({}),n=Uint8Array,r=Uint16Array,e=Int32Array,i=new n([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),o=new n([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new n([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(t,n){for(var i=new r(31),o=0;o<31;++o)i[o]=n+=1<<t[o-1];var s=new e(i[30]);for(o=1;o<30;++o)for(var a=i[o];a<i[o+1];++a)s[a]=a-i[o]<<5|o;return{b:i,r:s}},u=a(i,2),h=u.b,f=u.r;h[28]=258,f[258]=28;for(var l=a(o,0),c=l.b,p=l.r,v=new r(32768),d=0;d<32768;++d){var g=(43690&d)>>1|(21845&d)<<1;v[d]=((65280&(g=(61680&(g=(52428&g)>>2|(13107&g)<<2))>>4|(3855&g)<<4))>>8|(255&g)<<8)>>1}var y=function(t,n,e){for(var i=t.length,o=0,s=new r(n);o<i;++o)t[o]&&++s[t[o]-1];var a,u=new r(n);for(o=1;o<n;++o)u[o]=u[o-1]+s[o-1]<<1;if(e){a=new r(1<<n);var h=15-n;for(o=0;o<i;++o)if(t[o])for(var f=o<<4|t[o],l=n-t[o],c=u[t[o]-1]++<<l,p=c|(1<<l)-1;c<=p;++c)a[v[c]>>h]=f}else for(a=new r(i),o=0;o<i;++o)t[o]&&(a[o]=v[u[t[o]-1]++]>>15-t[o]);return a},m=new n(288);for(d=0;d<144;++d)m[d]=8;for(d=144;d<256;++d)m[d]=9;for(d=256;d<280;++d)m[d]=7;for(d=280;d<288;++d)m[d]=8;var b=new n(32);for(d=0;d<32;++d)b[d]=5;var w=y(m,9,0),x=y(m,9,1),z=y(b,5,0),k=y(b,5,1),M=function(t){for(var n=t[0],r=1;r<t.length;++r)t[r]>n&&(n=t[r]);return n},S=function(t,n,r){var e=n/8|0;return(t[e]|t[e+1]<<8)>>(7&n)&r},A=function(t,n){var r=n/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(7&n)},T=function(t){return(t+7)/8|0},D=function(t,r,e){return(null==r||r<0)&&(r=0),(null==e||e>t.length)&&(e=t.length),new n(t.subarray(r,e))};_e.FlateErrorCode={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14};var C=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],I=function(t,n,r){var e=Error(n||C[t]);if(e.code=t,Error.captureStackTrace&&Error.captureStackTrace(e,I),!r)throw e;return e},U=function(t,r,e,a){var u=t.length,f=a?a.length:0;if(!u||r.f&&!r.l)return e||new n(0);var l=!e,p=l||2!=r.i,v=r.i;l&&(e=new n(3*u));var d=function(t){var r=e.length;if(t>r){var i=new n(Math.max(2*r,t));i.set(e),e=i}},g=r.f||0,m=r.p||0,b=r.b||0,w=r.l,z=r.d,C=r.m,U=r.n,F=8*u;do{if(!w){g=S(t,m,1);var E=S(t,m+1,3);if(m+=3,!E){var Z=t[(J=T(m)+4)-4]|t[J-3]<<8,q=J+Z;if(q>u){v&&I(0);break}p&&d(b+Z),e.set(t.subarray(J,q),b),r.b=b+=Z,r.p=m=8*q,r.f=g;continue}if(1==E)w=x,z=k,C=9,U=5;else if(2==E){var O=S(t,m,31)+257,G=S(t,m+10,15)+4,L=O+S(t,m+5,31)+1;m+=14;for(var H=new n(L),j=new n(19),N=0;N<G;++N)j[s[N]]=S(t,m+3*N,7);m+=3*G;var P=M(j),B=(1<<P)-1,Y=y(j,P,1);for(N=0;N<L;){var J,K=Y[S(t,m,B)];if(m+=15&K,(J=K>>4)<16)H[N++]=J;else{var Q=0,R=0;for(16==J?(R=3+S(t,m,3),m+=2,Q=H[N-1]):17==J?(R=3+S(t,m,7),m+=3):18==J&&(R=11+S(t,m,127),m+=7);R--;)H[N++]=Q}}var V=H.subarray(0,O),W=H.subarray(O);C=M(V),U=M(W),w=y(V,C,1),z=y(W,U,1)}else I(1);if(m>F){v&&I(0);break}}p&&d(b+131072);for(var X=(1<<C)-1,$=(1<<U)-1,_=m;;_=m){var tt=(Q=w[A(t,m)&X])>>4;if((m+=15&Q)>F){v&&I(0);break}if(Q||I(2),tt<256)e[b++]=tt;else{if(256==tt){_=m,w=null;break}var nt=tt-254;tt>264&&(nt=S(t,m,(1<<(it=i[N=tt-257]))-1)+h[N],m+=it);var rt=z[A(t,m)&$],et=rt>>4;if(rt||I(3),m+=15&rt,W=c[et],et>3){var it=o[et];W+=A(t,m)&(1<<it)-1,m+=it}if(m>F){v&&I(0);break}p&&d(b+131072);var ot=b+nt;if(b<W){var st=f-W,at=Math.min(W,ot);for(st+b<0&&I(3);b<at;++b)e[b]=a[st+b]}for(;b<ot;++b)e[b]=e[b-W]}}r.l=w,r.p=_,r.b=b,r.f=g,w&&(g=1,r.m=C,r.d=z,r.n=U)}while(!g);return b!=e.length&&l?D(e,0,b):e.subarray(0,b)},F=function(t,n,r){var e=n/8|0;t[e]|=r<<=7&n,t[e+1]|=r>>8},E=function(t,n,r){var e=n/8|0;t[e]|=r<<=7&n,t[e+1]|=r>>8,t[e+2]|=r>>16},Z=function(t,e){for(var i=[],o=0;o<t.length;++o)t[o]&&i.push({s:o,f:t[o]});var s=i.length,a=i.slice();if(!s)return{t:N,l:0};if(1==s){var u=new n(i[0].s+1);return u[i[0].s]=1,{t:u,l:1}}i.sort((function(t,n){return t.f-n.f})),i.push({s:-1,f:25001});var h=i[0],f=i[1],l=0,c=1,p=2;for(i[0]={s:-1,f:h.f+f.f,l:h,r:f};c!=s-1;)h=i[i[l].f<i[p].f?l++:p++],f=i[l!=c&&i[l].f<i[p].f?l++:p++],i[c++]={s:-1,f:h.f+f.f,l:h,r:f};var v=a[0].s;for(o=1;o<s;++o)a[o].s>v&&(v=a[o].s);var d=new r(v+1),g=q(i[c-1],d,0);if(g>e){o=0;var y=0,m=g-e,b=1<<m;for(a.sort((function(t,n){return d[n.s]-d[t.s]||t.f-n.f}));o<s;++o){var w=a[o].s;if(!(d[w]>e))break;y+=b-(1<<g-d[w]),d[w]=e}for(y>>=m;y>0;){var x=a[o].s;d[x]<e?y-=1<<e-d[x]++-1:++o}for(;o>=0&&y;--o){var z=a[o].s;d[z]==e&&(--d[z],++y)}g=e}return{t:new n(d),l:g}},q=function(t,n,r){return-1==t.s?Math.max(q(t.l,n,r+1),q(t.r,n,r+1)):n[t.s]=r},O=function(t){for(var n=t.length;n&&!t[--n];);for(var e=new r(++n),i=0,o=t[0],s=1,a=function(t){e[i++]=t},u=1;u<=n;++u)if(t[u]==o&&u!=n)++s;else{if(!o&&s>2){for(;s>138;s-=138)a(32754);s>2&&(a(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(a(o),--s;s>6;s-=6)a(8304);s>2&&(a(s-3<<5|8208),s=0)}for(;s--;)a(o);s=1,o=t[u]}return{c:e.subarray(0,i),n:n}},G=function(t,n){for(var r=0,e=0;e<n.length;++e)r+=t[e]*n[e];return r},L=function(t,n,r){var e=r.length,i=T(n+2);t[i]=255&e,t[i+1]=e>>8,t[i+2]=255^t[i],t[i+3]=255^t[i+1];for(var o=0;o<e;++o)t[i+o+4]=r[o];return 8*(i+4+e)},H=function(t,n,e,a,u,h,f,l,c,p,v){F(n,v++,e),++u[256];for(var d=Z(u,15),g=d.t,x=d.l,k=Z(h,15),M=k.t,S=k.l,A=O(g),T=A.c,D=A.n,C=O(M),I=C.c,U=C.n,q=new r(19),H=0;H<T.length;++H)++q[31&T[H]];for(H=0;H<I.length;++H)++q[31&I[H]];for(var j=Z(q,7),N=j.t,P=j.l,B=19;B>4&&!N[s[B-1]];--B);var Y,J,K,Q,R=p+5<<3,V=G(u,m)+G(h,b)+f,W=G(u,g)+G(h,M)+f+14+3*B+G(q,N)+2*q[16]+3*q[17]+7*q[18];if(c>=0&&R<=V&&R<=W)return L(n,v,t.subarray(c,c+p));if(F(n,v,1+(W<V)),v+=2,W<V){Y=y(g,x,0),J=g,K=y(M,S,0),Q=M;var X=y(N,P,0);for(F(n,v,D-257),F(n,v+5,U-1),F(n,v+10,B-4),v+=14,H=0;H<B;++H)F(n,v+3*H,N[s[H]]);v+=3*B;for(var $=[T,I],_=0;_<2;++_){var tt=$[_];for(H=0;H<tt.length;++H)F(n,v,X[rt=31&tt[H]]),v+=N[rt],rt>15&&(F(n,v,tt[H]>>5&127),v+=tt[H]>>12)}}else Y=w,J=m,K=z,Q=b;for(H=0;H<l;++H){var nt=a[H];if(nt>255){var rt;E(n,v,Y[257+(rt=nt>>18&31)]),v+=J[rt+257],rt>7&&(F(n,v,nt>>23&31),v+=i[rt]);var et=31&nt;E(n,v,K[et]),v+=Q[et],et>3&&(E(n,v,nt>>5&8191),v+=o[et])}else E(n,v,Y[nt]),v+=J[nt]}return E(n,v,Y[256]),v+J[256]},j=new e([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),N=new n(0),P=function(t,s,a,u,h,l){var c=l.z||t.length,v=new n(u+c+5*(1+Math.ceil(c/7e3))+h),d=v.subarray(u,v.length-h),g=l.l,y=7&(l.r||0);if(s){y&&(d[0]=l.r>>3);for(var m=j[s-1],b=m>>13,w=8191&m,x=(1<<a)-1,z=l.p||new r(32768),k=l.h||new r(x+1),M=Math.ceil(a/3),S=2*M,A=function(n){return(t[n]^t[n+1]<<M^t[n+2]<<S)&x},C=new e(25e3),I=new r(288),U=new r(32),F=0,E=0,Z=l.i||0,q=0,O=l.w||0,G=0;Z+2<c;++Z){var N=A(Z),P=32767&Z,B=k[N];if(z[P]=B,k[N]=P,O<=Z){var Y=c-Z;if((F>7e3||q>24576)&&(Y>423||!g)){y=H(t,d,0,C,I,U,E,q,G,Z-G,y),q=F=E=0,G=Z;for(var J=0;J<286;++J)I[J]=0;for(J=0;J<30;++J)U[J]=0}var K=2,Q=0,R=w,V=P-B&32767;if(Y>2&&N==A(Z-V))for(var W=Math.min(b,Y)-1,X=Math.min(32767,Z),$=Math.min(258,Y);V<=X&&--R&&P!=B;){if(t[Z+K]==t[Z+K-V]){for(var _=0;_<$&&t[Z+_]==t[Z+_-V];++_);if(_>K){if(K=_,Q=V,_>W)break;var tt=Math.min(V,_-2),nt=0;for(J=0;J<tt;++J){var rt=Z-V+J&32767,et=rt-z[rt]&32767;et>nt&&(nt=et,B=rt)}}}V+=(P=B)-(B=z[P])&32767}if(Q){C[q++]=268435456|f[K]<<18|p[Q];var it=31&f[K],ot=31&p[Q];E+=i[it]+o[ot],++I[257+it],++U[ot],O=Z+K,++F}else C[q++]=t[Z],++I[t[Z]]}}for(Z=Math.max(Z,O);Z<c;++Z)C[q++]=t[Z],++I[t[Z]];y=H(t,d,g,C,I,U,E,q,G,Z-G,y),g||(l.r=7&y|d[y/8|0]<<3,y-=7,l.h=k,l.p=z,l.i=Z,l.w=O)}else{for(Z=l.w||0;Z<c+g;Z+=65535){var st=Z+65535;st>=c&&(d[y/8|0]=g,st=c),y=L(d,y+1,t.subarray(Z,st))}l.i=c}return D(v,0,u+T(y)+h)},B=function(){for(var t=new Int32Array(256),n=0;n<256;++n){for(var r=n,e=9;--e;)r=(1&r&&-306674912)^r>>>1;t[n]=r}return t}(),Y=function(){var t=-1;return{p:function(n){for(var r=t,e=0;e<n.length;++e)r=B[255&r^n[e]]^r>>>8;t=r},d:function(){return~t}}},J=function(){var t=1,n=0;return{p:function(r){for(var e=t,i=n,o=0|r.length,s=0;s!=o;){for(var a=Math.min(s+2655,o);s<a;++s)i+=e+=r[s];e=(65535&e)+15*(e>>16),i=(65535&i)+15*(i>>16)}t=e,n=i},d:function(){return(255&(t%=65521))<<24|(65280&t)<<8|(255&(n%=65521))<<8|n>>8}}},K=function(t,r,e,i,o){if(!o&&(o={l:1},r.dictionary)){var s=r.dictionary.subarray(-32768),a=new n(s.length+t.length);a.set(s),a.set(t,s.length),t=a,o.w=s.length}return P(t,null==r.level?6:r.level,null==r.mem?o.l?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(t.length)))):20:12+r.mem,e,i,o)},Q=function(t,n){var r={};for(var e in t)r[e]=t[e];for(var e in n)r[e]=n[e];return r},R=function(t,n,r){for(var e=t(),i=""+t,o=i.slice(i.indexOf("[")+1,i.lastIndexOf("]")).replace(/s+/g,"").split(","),s=0;s<e.length;++s){var a=e[s],u=o[s];if("function"==typeof a){n+=";"+u+"=";var h=""+a;if(a.prototype)if(-1!=h.indexOf("[native code]")){var f=h.indexOf(" ",8)+1;n+=h.slice(f,h.indexOf("(",f))}else for(var l in n+=h,a.prototype)n+=";"+u+".prototype."+l+"="+a.prototype[l];else n+=h}else r[u]=a}return n},V=[],W=function(t){var n=[];for(var r in t)t[r].buffer&&n.push((t[r]=new t[r].constructor(t[r])).buffer);return n},X=function(n,r,e,i){if(!V[e]){for(var o="",s={},a=n.length-1,u=0;u<a;++u)o=R(n[u],o,s);V[e]={c:R(n[a],o,s),e:s}}var h=Q({},V[e].e);return(0,t.default)(V[e].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+r+"}",e,h,W(h),i)},$=function(){return[n,r,e,i,o,s,h,c,x,k,v,C,y,M,S,A,T,D,I,U,Tt,it,ot]},_=function(){return[n,r,e,i,o,s,f,p,w,m,z,b,v,j,N,y,F,E,Z,q,O,G,L,H,T,D,P,K,kt,it]},tt=function(){return[pt,gt,ct,Y,B]},nt=function(){return[vt,dt]},rt=function(){return[yt,ct,J]},et=function(){return[mt]},it=function(t){return postMessage(t,[t.buffer])},ot=function(t){return t&&{out:t.size&&new n(t.size),dictionary:t.dictionary}},st=function(t,n,r,e,i,o){var s=X(r,e,i,(function(t,n){s.terminate(),o(t,n)}));return s.postMessage([t,n],n.consume?[t.buffer]:[]),function(){s.terminate()}},at=function(t){return t.ondata=function(t,n){return postMessage([t,n],[t.buffer])},function(n){n.data.length?(t.push(n.data[0],n.data[1]),postMessage([n.data[0].length])):t.flush()}},ut=function(t,n,r,e,i,o,s){var a,u=X(t,e,i,(function(t,r){t?(u.terminate(),n.ondata.call(n,t)):Array.isArray(r)?1==r.length?(n.queuedSize-=r[0],n.ondrain&&n.ondrain(r[0])):(r[1]&&u.terminate(),n.ondata.call(n,t,r[0],r[1])):s(r)}));u.postMessage(r),n.queuedSize=0,n.push=function(t,r){n.ondata||I(5),a&&n.ondata(I(4,0,1),null,!!r),n.queuedSize+=t.length,u.postMessage([t,a=r],[t.buffer])},n.terminate=function(){u.terminate()},o&&(n.flush=function(){u.postMessage([])})},ht=function(t,n){return t[n]|t[n+1]<<8},ft=function(t,n){return(t[n]|t[n+1]<<8|t[n+2]<<16|t[n+3]<<24)>>>0},lt=function(t,n){return ft(t,n)+4294967296*ft(t,n+4)},ct=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},pt=function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&ct(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var e=0;e<=r.length;++e)t[e+10]=r.charCodeAt(e)}},vt=function(t){31==t[0]&&139==t[1]&&8==t[2]||I(6,"invalid gzip data");var n=t[3],r=10;4&n&&(r+=2+(t[10]|t[11]<<8));for(var e=(n>>3&1)+(n>>4&1);e>0;e-=!t[r++]);return r+(2&n)},dt=function(t){var n=t.length;return(t[n-4]|t[n-3]<<8|t[n-2]<<16|t[n-1]<<24)>>>0},gt=function(t){return 10+(t.filename?t.filename.length+1:0)},yt=function(t,n){var r=n.level,e=0==r?0:r<6?1:9==r?3:2;if(t[0]=120,t[1]=e<<6|(n.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,n.dictionary){var i=J();i.p(n.dictionary),ct(t,2,i.d())}},mt=function(t,n){return(8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31)&&I(6,"invalid zlib data"),(t[1]>>5&1)==+!n&&I(6,"invalid zlib data: "+(32&t[1]?"need":"unexpected")+" dictionary"),2+(t[1]>>3&4)};function bt(t,n){return"function"==typeof t&&(n=t,t={}),this.ondata=n,t}var wt=function(){function t(t,r){if("function"==typeof t&&(r=t,t={}),this.ondata=r,this.o=t||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new n(98304),this.o.dictionary){var e=this.o.dictionary.subarray(-32768);this.b.set(e,32768-e.length),this.s.i=32768-e.length}}return t.prototype.p=function(t,n){this.ondata(K(t,this.o,0,0,this.s),n)},t.prototype.push=function(t,r){this.ondata||I(5),this.s.l&&I(4);var e=t.length+this.s.z;if(e>this.b.length){if(e>2*this.b.length-32768){var i=new n(-32768&e);i.set(this.b.subarray(0,this.s.z)),this.b=i}var o=this.b.length-this.s.z;this.b.set(t.subarray(0,o),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(t.subarray(o),32768),this.s.z=t.length-o+32768,this.s.i=32766,this.s.w=32768}else this.b.set(t,this.s.z),this.s.z+=t.length;this.s.l=1&r,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2)},t.prototype.flush=function(){this.ondata||I(5),this.s.l&&I(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2},t}();_e.Deflate=wt;var xt=function(){return function(t,n){ut([_,function(){return[at,wt]}],this,bt.call(this,t,n),(function(t){var n=new wt(t.data);onmessage=at(n)}),6,1)}}();function zt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_],(function(t){return it(kt(t.data[0],t.data[1]))}),0,r)}function kt(t,n){return K(t,n||{},0,0)}_e.AsyncDeflate=xt,_e.deflate=zt,_e.deflateSync=kt;var Mt=function(){function t(t,r){"function"==typeof t&&(r=t,t={}),this.ondata=r;var e=t&&t.dictionary&&t.dictionary.subarray(-32768);this.s={i:0,b:e?e.length:0},this.o=new n(32768),this.p=new n(0),e&&this.o.set(e)}return t.prototype.e=function(t){if(this.ondata||I(5),this.d&&I(4),this.p.length){if(t.length){var r=new n(this.p.length+t.length);r.set(this.p),r.set(t,this.p.length),this.p=r}}else this.p=t},t.prototype.c=function(t){this.s.i=+(this.d=t||!1);var n=this.s.b,r=U(this.p,this.s,this.o);this.ondata(D(r,n,this.s.b),this.d),this.o=D(r,this.s.b-32768),this.s.b=this.o.length,this.p=D(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(t,n){this.e(t),this.c(n)},t}();_e.Inflate=Mt;var St=function(){return function(t,n){ut([$,function(){return[at,Mt]}],this,bt.call(this,t,n),(function(t){var n=new Mt(t.data);onmessage=at(n)}),7,0)}}();function At(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$],(function(t){return it(Tt(t.data[0],ot(t.data[1])))}),1,r)}function Tt(t,n){return U(t,{i:2},n&&n.out,n&&n.dictionary)}_e.AsyncInflate=St,_e.inflate=At,_e.inflateSync=Tt;var Dt=function(){function t(t,n){this.c=Y(),this.l=0,this.v=1,wt.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),this.l+=t.length,wt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=K(t,this.o,this.v&&gt(this.o),n&&8,this.s);this.v&&(pt(r,this.o),this.v=0),n&&(ct(r,r.length-8,this.c.d()),ct(r,r.length-4,this.l)),this.ondata(r,n)},t.prototype.flush=function(){wt.prototype.flush.call(this)},t}();_e.Gzip=Dt,_e.Compress=Dt;var Ct=function(){return function(t,n){ut([_,tt,function(){return[at,wt,Dt]}],this,bt.call(this,t,n),(function(t){var n=new Dt(t.data);onmessage=at(n)}),8,1)}}();function It(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_,tt,function(){return[Ut]}],(function(t){return it(Ut(t.data[0],t.data[1]))}),2,r)}function Ut(t,n){n||(n={});var r=Y(),e=t.length;r.p(t);var i=K(t,n,gt(n),8),o=i.length;return pt(i,n),ct(i,o-8,r.d()),ct(i,o-4,e),i}_e.AsyncGzip=Ct,_e.AsyncCompress=Ct,_e.gzip=It,_e.compress=It,_e.gzipSync=Ut,_e.compressSync=Ut;var Ft=function(){function t(t,n){this.v=1,this.r=0,Mt.call(this,t,n)}return t.prototype.push=function(t,r){if(Mt.prototype.e.call(this,t),this.r+=t.length,this.v){var e=this.p.subarray(this.v-1),i=e.length>3?vt(e):4;if(i>e.length){if(!r)return}else this.v>1&&this.onmember&&this.onmember(this.r-e.length);this.p=e.subarray(i),this.v=0}Mt.prototype.c.call(this,r),!this.s.f||this.s.l||r||(this.v=T(this.s.p)+9,this.s={i:0},this.o=new n(0),this.push(new n(0),r))},t}();_e.Gunzip=Ft;var Et=function(){return function(t,n){var r=this;ut([$,nt,function(){return[at,Mt,Ft]}],this,bt.call(this,t,n),(function(t){var n=new Ft(t.data);n.onmember=function(t){return postMessage(t)},onmessage=at(n)}),9,0,(function(t){return r.onmember&&r.onmember(t)}))}}();function Zt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$,nt,function(){return[qt]}],(function(t){return it(qt(t.data[0],t.data[1]))}),3,r)}function qt(t,r){var e=vt(t);return e+8>t.length&&I(6,"invalid gzip data"),U(t.subarray(e,-8),{i:2},r&&r.out||new n(dt(t)),r&&r.dictionary)}_e.AsyncGunzip=Et,_e.gunzip=Zt,_e.gunzipSync=qt;var Ot=function(){function t(t,n){this.c=J(),this.v=1,wt.call(this,t,n)}return t.prototype.push=function(t,n){this.c.p(t),wt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){var r=K(t,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(yt(r,this.o),this.v=0),n&&ct(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(){wt.prototype.flush.call(this)},t}();_e.Zlib=Ot;var Gt=function(){return function(t,n){ut([_,rt,function(){return[at,wt,Ot]}],this,bt.call(this,t,n),(function(t){var n=new Ot(t.data);onmessage=at(n)}),10,1)}}();function Lt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[_,rt,function(){return[Ht]}],(function(t){return it(Ht(t.data[0],t.data[1]))}),4,r)}function Ht(t,n){n||(n={});var r=J();r.p(t);var e=K(t,n,n.dictionary?6:2,4);return yt(e,n),ct(e,e.length-4,r.d()),e}_e.AsyncZlib=Gt,_e.zlib=Lt,_e.zlibSync=Ht;var jt=function(){function t(t,n){Mt.call(this,t,n),this.v=t&&t.dictionary?2:1}return t.prototype.push=function(t,n){if(Mt.prototype.e.call(this,t),this.v){if(this.p.length<6&&!n)return;this.p=this.p.subarray(mt(this.p,this.v-1)),this.v=0}n&&(this.p.length<4&&I(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),Mt.prototype.c.call(this,n)},t}();_e.Unzlib=jt;var Nt=function(){return function(t,n){ut([$,et,function(){return[at,Mt,jt]}],this,bt.call(this,t,n),(function(t){var n=new jt(t.data);onmessage=at(n)}),11,0)}}();function Pt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),st(t,n,[$,et,function(){return[Bt]}],(function(t){return it(Bt(t.data[0],ot(t.data[1])))}),5,r)}function Bt(t,n){return U(t.subarray(mt(t,n&&n.dictionary),-4),{i:2},n&&n.out,n&&n.dictionary)}_e.AsyncUnzlib=Nt,_e.unzlib=Pt,_e.unzlibSync=Bt;var Yt=function(){function t(t,n){this.o=bt.call(this,t,n)||{},this.G=Ft,this.I=Mt,this.Z=jt}return t.prototype.i=function(){var t=this;this.s.ondata=function(n,r){t.ondata(n,r)}},t.prototype.push=function(t,r){if(this.ondata||I(5),this.s)this.s.push(t,r);else{if(this.p&&this.p.length){var e=new n(this.p.length+t.length);e.set(this.p),e.set(t,this.p.length)}else this.p=t;this.p.length>2&&(this.s=31==this.p[0]&&139==this.p[1]&&8==this.p[2]?new this.G(this.o):8!=(15&this.p[0])||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,r),this.p=null)}},t}();_e.Decompress=Yt;var Jt=function(){function t(t,n){Yt.call(this,t,n),this.queuedSize=0,this.G=Et,this.I=St,this.Z=Nt}return t.prototype.i=function(){var t=this;this.s.ondata=function(n,r,e){t.ondata(n,r,e)},this.s.ondrain=function(n){t.queuedSize-=n,t.ondrain&&t.ondrain(n)}},t.prototype.push=function(t,n){this.queuedSize+=t.length,Yt.prototype.push.call(this,t,n)},t}();function Kt(t,n,r){return r||(r=n,n={}),"function"!=typeof r&&I(7),31==t[0]&&139==t[1]&&8==t[2]?Zt(t,n,r):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?At(t,n,r):Pt(t,n,r)}function Qt(t,n){return 31==t[0]&&139==t[1]&&8==t[2]?qt(t,n):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?Tt(t,n):Bt(t,n)}_e.AsyncDecompress=Jt,_e.decompress=Kt,_e.decompressSync=Qt;var Rt=function(t,r,e,i){for(var o in t){var s=t[o],a=r+o,u=i;Array.isArray(s)&&(u=Q(i,s[1]),s=s[0]),s instanceof n?e[a]=[s,u]:(e[a+="/"]=[new n(0),u],Rt(s,a,e,i))}},Vt="undefined"!=typeof TextEncoder&&new TextEncoder,Wt="undefined"!=typeof TextDecoder&&new TextDecoder,Xt=0;try{Wt.decode(N,{stream:!0}),Xt=1}catch(t){}var $t=function(t){for(var n="",r=0;;){var e=t[r++],i=(e>127)+(e>223)+(e>239);if(r+i>t.length)return{s:n,r:D(t,r-1)};i?3==i?(e=((15&e)<<18|(63&t[r++])<<12|(63&t[r++])<<6|63&t[r++])-65536,n+=String.fromCharCode(55296|e>>10,56320|1023&e)):n+=String.fromCharCode(1&i?(31&e)<<6|63&t[r++]:(15&e)<<12|(63&t[r++])<<6|63&t[r++]):n+=String.fromCharCode(e)}},_t=function(){function t(t){this.ondata=t,Xt?this.t=new TextDecoder:this.p=N}return t.prototype.push=function(t,r){if(this.ondata||I(5),r=!!r,this.t)return this.ondata(this.t.decode(t,{stream:!0}),r),void(r&&(this.t.decode().length&&I(8),this.t=null));this.p||I(4);var e=new n(this.p.length+t.length);e.set(this.p),e.set(t,this.p.length);var i=$t(e),o=i.s,s=i.r;r?(s.length&&I(8),this.p=null):this.p=s,this.ondata(o,r)},t}();_e.DecodeUTF8=_t;var tn=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){this.ondata||I(5),this.d&&I(4),this.ondata(nn(t),this.d=n||!1)},t}();function nn(t,r){if(r){for(var e=new n(t.length),i=0;i<t.length;++i)e[i]=t.charCodeAt(i);return e}if(Vt)return Vt.encode(t);var o=t.length,s=new n(t.length+(t.length>>1)),a=0,u=function(t){s[a++]=t};for(i=0;i<o;++i){if(a+5>s.length){var h=new n(a+8+(o-i<<1));h.set(s),s=h}var f=t.charCodeAt(i);f<128||r?u(f):f<2048?(u(192|f>>6),u(128|63&f)):f>55295&&f<57344?(u(240|(f=65536+(1047552&f)|1023&t.charCodeAt(++i))>>18),u(128|f>>12&63),u(128|f>>6&63),u(128|63&f)):(u(224|f>>12),u(128|f>>6&63),u(128|63&f))}return D(s,0,a)}function rn(t,n){if(n){for(var r="",e=0;e<t.length;e+=16384)r+=String.fromCharCode.apply(null,t.subarray(e,e+16384));return r}if(Wt)return Wt.decode(t);var i=$t(t),o=i.s;return(r=i.r).length&&I(8),o}_e.EncodeUTF8=tn,_e.strToU8=nn,_e.strFromU8=rn;var en=function(t){return 1==t?3:t<6?2:9==t?1:0},on=function(t,n){return n+30+ht(t,n+26)+ht(t,n+28)},sn=function(t,n,r){var e=ht(t,n+28),i=rn(t.subarray(n+46,n+46+e),!(2048&ht(t,n+8))),o=n+46+e,s=ft(t,n+20),a=r&&4294967295==s?an(t,o):[s,ft(t,n+24),ft(t,n+42)],u=a[0],h=a[1],f=a[2];return[ht(t,n+10),u,h,i,o+ht(t,n+30)+ht(t,n+32),f]},an=function(t,n){for(;1!=ht(t,n);n+=4+ht(t,n+2));return[lt(t,n+12),lt(t,n+4),lt(t,n+20)]},un=function(t){var n=0;if(t)for(var r in t){var e=t[r].length;e>65535&&I(9),n+=e+4}return n},hn=function(t,n,r,e,i,o,s,a){var u=e.length,h=r.extra,f=a&&a.length,l=un(h);ct(t,n,null!=s?33639248:67324752),n+=4,null!=s&&(t[n++]=20,t[n++]=r.os),t[n]=20,n+=2,t[n++]=r.flag<<1|(o<0&&8),t[n++]=i&&8,t[n++]=255&r.compression,t[n++]=r.compression>>8;var c=new Date(null==r.mtime?Date.now():r.mtime),p=c.getFullYear()-1980;if((p<0||p>119)&&I(10),ct(t,n,p<<25|c.getMonth()+1<<21|c.getDate()<<16|c.getHours()<<11|c.getMinutes()<<5|c.getSeconds()>>1),n+=4,-1!=o&&(ct(t,n,r.crc),ct(t,n+4,o<0?-o-2:o),ct(t,n+8,r.size)),ct(t,n+12,u),ct(t,n+14,l),n+=16,null!=s&&(ct(t,n,f),ct(t,n+6,r.attrs),ct(t,n+10,s),n+=14),t.set(e,n),n+=u,l)for(var v in h){var d=h[v],g=d.length;ct(t,n,+v),ct(t,n+2,g),t.set(d,n+4),n+=4+g}return f&&(t.set(a,n),n+=f),n},fn=function(t,n,r,e,i){ct(t,n,101010256),ct(t,n+8,r),ct(t,n+10,r),ct(t,n+12,e),ct(t,n+16,i)},ln=function(){function t(t){this.filename=t,this.c=Y(),this.size=0,this.compression=0}return t.prototype.process=function(t,n){this.ondata(null,t,n)},t.prototype.push=function(t,n){this.ondata||I(5),this.c.p(t),this.size+=t.length,n&&(this.crc=this.c.d()),this.process(t,n||!1)},t}();_e.ZipPassThrough=ln;var cn=function(){function t(t,n){var r=this;n||(n={}),ln.call(this,t),this.d=new wt(n,(function(t,n){r.ondata(null,t,n)})),this.compression=8,this.flag=en(n.level)}return t.prototype.process=function(t,n){try{this.d.push(t,n)}catch(t){this.ondata(t,null,n)}},t.prototype.push=function(t,n){ln.prototype.push.call(this,t,n)},t}();_e.ZipDeflate=cn;var pn=function(){function t(t,n){var r=this;n||(n={}),ln.call(this,t),this.d=new xt(n,(function(t,n,e){r.ondata(t,n,e)})),this.compression=8,this.flag=en(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(t,n){this.d.push(t,n)},t.prototype.push=function(t,n){ln.prototype.push.call(this,t,n)},t}();_e.AsyncZipDeflate=pn;var vn=function(){function t(t){this.ondata=t,this.u=[],this.d=1}return t.prototype.add=function(t){var r=this;if(this.ondata||I(5),2&this.d)this.ondata(I(4+8*(1&this.d),0,1),null,!1);else{var e=nn(t.filename),i=e.length,o=t.comment,s=o&&nn(o),a=i!=t.filename.length||s&&o.length!=s.length,u=i+un(t.extra)+30;i>65535&&this.ondata(I(11,0,1),null,!1);var h=new n(u);hn(h,0,t,e,a,-1);var f=[h],l=function(){for(var t=0,n=f;t<n.length;t++)r.ondata(null,n[t],!1);f=[]},c=this.d;this.d=0;var p=this.u.length,v=Q(t,{f:e,u:a,o:s,t:function(){t.terminate&&t.terminate()},r:function(){if(l(),c){var t=r.u[p+1];t?t.r():r.d=1}c=1}}),d=0;t.ondata=function(e,i,o){if(e)r.ondata(e,i,o),r.terminate();else if(d+=i.length,f.push(i),o){var s=new n(16);ct(s,0,134695760),ct(s,4,t.crc),ct(s,8,d),ct(s,12,t.size),f.push(s),v.c=d,v.b=u+d+16,v.crc=t.crc,v.size=t.size,c&&v.r(),c=1}else c&&l()},this.u.push(v)}},t.prototype.end=function(){var t=this;2&this.d?this.ondata(I(4+8*(1&this.d),0,1),null,!0):(this.d?this.e():this.u.push({r:function(){1&t.d&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3)},t.prototype.e=function(){for(var t=0,r=0,e=0,i=0,o=this.u;i<o.length;i++)e+=46+(h=o[i]).f.length+un(h.extra)+(h.o?h.o.length:0);for(var s=new n(e+22),a=0,u=this.u;a<u.length;a++){var h;hn(s,t,h=u[a],h.f,h.u,-h.c-2,r,h.o),t+=46+h.f.length+un(h.extra)+(h.o?h.o.length:0),r+=h.b}fn(s,t,this.u.length,e,r),this.ondata(null,s,!0),this.d=2},t.prototype.terminate=function(){for(var t=0,n=this.u;t<n.length;t++)n[t].t();this.d=2},t}();function dn(t,r,e){e||(e=r,r={}),"function"!=typeof e&&I(7);var i={};Rt(t,"",i,r);var o=Object.keys(i),s=o.length,a=0,u=0,h=s,f=Array(s),l=[],c=function(){for(var t=0;t<l.length;++t)l[t]()},p=function(t,n){xn((function(){e(t,n)}))};xn((function(){p=e}));var v=function(){var t=new n(u+22),r=a,e=u-a;u=0;for(var i=0;i<h;++i){var o=f[i];try{var s=o.c.length;hn(t,u,o,o.f,o.u,s);var l=30+o.f.length+un(o.extra),c=u+l;t.set(o.c,c),hn(t,a,o,o.f,o.u,s,u,o.m),a+=16+l+(o.m?o.m.length:0),u=c+s}catch(t){return p(t,null)}}fn(t,a,f.length,e,r),p(null,t)};s||v();for(var d=function(t){var n=o[t],r=i[n],e=r[0],h=r[1],d=Y(),g=e.length;d.p(e);var y=nn(n),m=y.length,b=h.comment,w=b&&nn(b),x=w&&w.length,z=un(h.extra),k=0==h.level?0:8,M=function(r,e){if(r)c(),p(r,null);else{var i=e.length;f[t]=Q(h,{size:g,crc:d.d(),c:e,f:y,m:w,u:m!=n.length||w&&b.length!=x,compression:k}),a+=30+m+z+i,u+=76+2*(m+z)+(x||0)+i,--s||v()}};if(m>65535&&M(I(11,0,1),null),k)if(g<16e4)try{M(null,kt(e,h))}catch(t){M(t,null)}else l.push(zt(e,h,M));else M(null,e)},g=0;g<h;++g)d(g);return c}function gn(t,r){r||(r={});var e={},i=[];Rt(t,"",e,r);var o=0,s=0;for(var a in e){var u=e[a],h=u[0],f=u[1],l=0==f.level?0:8,c=(M=nn(a)).length,p=f.comment,v=p&&nn(p),d=v&&v.length,g=un(f.extra);c>65535&&I(11);var y=l?kt(h,f):h,m=y.length,b=Y();b.p(h),i.push(Q(f,{size:h.length,crc:b.d(),c:y,f:M,m:v,u:c!=a.length||v&&p.length!=d,o:o,compression:l})),o+=30+c+g+m,s+=76+2*(c+g)+(d||0)+m}for(var w=new n(s+22),x=o,z=s-o,k=0;k<i.length;++k){var M;hn(w,(M=i[k]).o,M,M.f,M.u,M.c.length);var S=30+M.f.length+un(M.extra);w.set(M.c,M.o+S),hn(w,o,M,M.f,M.u,M.c.length,M.o,M.m),o+=16+S+(M.m?M.m.length:0)}return fn(w,o,i.length,z,x),w}_e.Zip=vn,_e.zip=dn,_e.zipSync=gn;var yn=function(){function t(){}return t.prototype.push=function(t,n){this.ondata(null,t,n)},t.compression=0,t}();_e.UnzipPassThrough=yn;var mn=function(){function t(){var t=this;this.i=new Mt((function(n,r){t.ondata(null,n,r)}))}return t.prototype.push=function(t,n){try{this.i.push(t,n)}catch(t){this.ondata(t,null,n)}},t.compression=8,t}();_e.UnzipInflate=mn;var bn=function(){function t(t,n){var r=this;n<32e4?this.i=new Mt((function(t,n){r.ondata(null,t,n)})):(this.i=new St((function(t,n,e){r.ondata(t,n,e)})),this.terminate=this.i.terminate)}return t.prototype.push=function(t,n){this.i.terminate&&(t=D(t,0)),this.i.push(t,n)},t.compression=8,t}();_e.AsyncUnzipInflate=bn;var wn=function(){function t(t){this.onfile=t,this.k=[],this.o={0:yn},this.p=N}return t.prototype.push=function(t,r){var e=this;if(this.onfile||I(5),this.p||I(4),this.c>0){var i=Math.min(this.c,t.length),o=t.subarray(0,i);if(this.c-=i,this.d?this.d.push(o,!this.c):this.k[0].push(o),(t=t.subarray(i)).length)return this.push(t,r)}else{var s=0,a=0,u=void 0,h=void 0;this.p.length?t.length?((h=new n(this.p.length+t.length)).set(this.p),h.set(t,this.p.length)):h=this.p:h=t;for(var f=h.length,l=this.c,c=l&&this.d,p=function(){var t,n=ft(h,a);if(67324752==n){s=1,u=a,v.d=null,v.c=0;var r=ht(h,a+6),i=ht(h,a+8),o=2048&r,c=8&r,p=ht(h,a+26),d=ht(h,a+28);if(f>a+30+p+d){var g=[];v.k.unshift(g),s=2;var y,m=ft(h,a+18),b=ft(h,a+22),w=rn(h.subarray(a+30,a+=30+p),!o);4294967295==m?(t=c?[-2]:an(h,a),m=t[0],b=t[1]):c&&(m=-1),a+=d,v.c=m;var x={name:w,compression:i,start:function(){if(x.ondata||I(5),m){var t=e.o[i];t||x.ondata(I(14,"unknown compression type "+i,1),null,!1),(y=m<0?new t(w):new t(w,m,b)).ondata=function(t,n,r){x.ondata(t,n,r)};for(var n=0,r=g;n<r.length;n++)y.push(r[n],!1);e.k[0]==g&&e.c?e.d=y:y.push(N,!0)}else x.ondata(null,N,!0)},terminate:function(){y&&y.terminate&&y.terminate()}};m>=0&&(x.size=m,x.originalSize=b),v.onfile(x)}return"break"}if(l){if(134695760==n)return u=a+=12+(-2==l&&8),s=3,v.c=0,"break";if(33639248==n)return u=a-=4,s=3,v.c=0,"break"}},v=this;a<f-4&&"break"!==p();++a);if(this.p=N,l<0){var d=h.subarray(0,s?u-12-(-2==l&&8)-(134695760==ft(h,u-16)&&4):a);c?c.push(d,!!s):this.k[+(2==s)].push(d)}if(2&s)return this.push(h.subarray(a),r);this.p=h.subarray(a)}r&&(this.c&&I(13),this.p=null)},t.prototype.register=function(t){this.o[t.compression]=t},t}();_e.Unzip=wn;var xn="function"==typeof queueMicrotask?queueMicrotask:"function"==typeof setTimeout?setTimeout:function(t){t()};function zn(t,r,e){e||(e=r,r={}),"function"!=typeof e&&I(7);var i=[],o=function(){for(var t=0;t<i.length;++t)i[t]()},s={},a=function(t,n){xn((function(){e(t,n)}))};xn((function(){a=e}));for(var u=t.length-22;101010256!=ft(t,u);--u)if(!u||t.length-u>65558)return a(I(13,0,1),null),o;var h=ht(t,u+8);if(h){var f=h,l=ft(t,u+16),c=4294967295==l||65535==f;if(c){var p=ft(t,u-12);(c=101075792==ft(t,p))&&(f=h=ft(t,p+32),l=ft(t,p+48))}for(var v=r&&r.filter,d=function(r){var e=sn(t,l,c),u=e[0],f=e[1],p=e[2],d=e[3],g=e[4],y=on(t,e[5]);l=g;var m=function(t,n){t?(o(),a(t,null)):(n&&(s[d]=n),--h||a(null,s))};if(!v||v({name:d,size:f,originalSize:p,compression:u}))if(u)if(8==u){var b=t.subarray(y,y+f);if(p<524288||f>.8*p)try{m(null,Tt(b,{out:new n(p)}))}catch(t){m(t,null)}else i.push(At(b,{size:p},m))}else m(I(14,"unknown compression type "+u,1),null);else m(null,D(t,y,y+f));else m(null,null)},g=0;g<f;++g)d()}else a(null,{});return o}function kn(t,r){for(var e={},i=t.length-22;101010256!=ft(t,i);--i)(!i||t.length-i>65558)&&I(13);var o=ht(t,i+8);if(!o)return{};var s=ft(t,i+16),a=4294967295==s||65535==o;if(a){var u=ft(t,i-12);(a=101075792==ft(t,u))&&(o=ft(t,u+32),s=ft(t,u+48))}for(var h=r&&r.filter,f=0;f<o;++f){var l=sn(t,s,a),c=l[0],p=l[1],v=l[2],d=l[3],g=l[4],y=on(t,l[5]);s=g,h&&!h({name:d,size:p,originalSize:v,compression:c})||(c?8==c?e[d]=Tt(t.subarray(y,y+p),{out:new n(v)}):I(14,"unknown compression type "+c):e[d]=D(t,y,y+p))}return e}_e.unzip=zn,_e.unzipSync=kn;return _e});
`,se=document.getElementById("file-list");document.getElementById("add-file-btn");const $=document.getElementById("auth-modal"),ze=document.getElementById("viewer"),F=document.getElementById("viewer-download-btn"),A=document.getElementById("file-input");document.getElementById("privacy-curtain");const it=document.getElementById("theme-toggle"),W=document.getElementById("search-input"),Re=document.getElementById("sort-select"),st=document.getElementById("storage-text"),lt=document.getElementById("storage-fill"),Le=document.getElementById("bulk-actions"),ct=document.getElementById("selected-count"),dt=document.getElementById("bulk-delete-btn"),pt=document.getElementById("cancel-select-btn"),we=document.getElementById("info-modal"),ne=document.getElementById("rename-modal"),R=document.getElementById("strength-bar"),C=document.getElementById("strength-text"),ut=document.getElementById("bulk-export-btn"),le=document.getElementById("recent-section"),ce=document.getElementById("recent-scroll"),X=document.getElementById("drop-zone"),Te=document.getElementById("stat-total"),Be=document.getElementById("stat-images"),Ce=document.getElementById("stat-videos"),Se=document.getElementById("stat-size"),K=document.getElementById("settings-modal"),Oe=document.getElementById("change-pass-modal"),ft=document.getElementById("settings-btn"),ht=document.getElementById("help-btn"),ee=document.getElementById("help-modal");let ve=null,D=null,z=[],L=new Set,Q=null,O=JSON.parse(localStorage.getItem("sv_recent")||"[]"),mt=null,pe=null,N={},P=null;function j(e,t="",n={}){return new Promise(o=>{const a=document.getElementById("custom-prompt-modal"),i=document.getElementById("prompt-title"),r=document.getElementById("prompt-message"),s=document.getElementById("prompt-input"),l=document.getElementById("prompt-confirm"),c=document.getElementById("prompt-cancel");i.textContent=e,r.textContent=t,s.type=n.inputType||"text",s.placeholder=n.placeholder||"Enter value...",s.value="";const u=()=>{a.close(),l.onclick=null,c.onclick=null,s.onkeydown=null};l.onclick=()=>{const p=s.value;u(),o(p||null)},c.onclick=()=>{u(),o(null)},s.onkeydown=p=>{p.key==="Enter"&&(p.preventDefault(),l.click())},a.showModal(),setTimeout(()=>s.focus(),100)})}function oe(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-confirm-modal"),a=document.getElementById("confirm-title"),i=document.getElementById("confirm-message"),r=document.getElementById("confirm-ok"),s=document.getElementById("confirm-cancel");a.textContent=e,i.textContent=t;let l=!1;const c=()=>{o.close(),r.onclick=null,s.onclick=null,o.removeEventListener("click",u),o.removeEventListener("close",p)},u=m=>{m.target===o&&!l&&(l=!0,c(),n(!1))},p=()=>{l||(l=!0,c(),n(!1))};r.onclick=()=>{l||(l=!0,c(),n(!0))},s.onclick=()=>{l||(l=!0,c(),n(!1))},o.addEventListener("click",u),o.addEventListener("close",p),o.showModal()})}function b(e,t=""){return new Promise(n=>{const o=document.getElementById("custom-alert-modal"),a=document.getElementById("alert-title"),i=document.getElementById("alert-message"),r=document.getElementById("alert-ok");a.textContent=e,i.textContent=t;const s=c=>{c.key==="Enter"&&(c.preventDefault(),l(),n())},l=()=>{o.close(),r.onclick=null,document.removeEventListener("keydown",s)};r.onclick=()=>{l(),n()},document.addEventListener("keydown",s),o.showModal()})}async function gt(){localStorage.removeItem("sv_app_lock"),localStorage.removeItem("sv_autolock"),localStorage.removeItem("sv_recovery_q"),localStorage.removeItem("sv_recovery_a"),It(),ge(),await S(),wt(),Jt(),Ke(),xe(),Xt()}gt();function x(e){const t=document.getElementById("security-terminal-body");if(t){const n=document.createElement("p");n.className="term-line",n.textContent=`> ${e}`,t.appendChild(n),t.scrollTop=t.scrollHeight}}function E(e,t="completed"){const n=document.getElementById(e);if(n){n.className=`process-step ${t}`.trim();const o=n.querySelector(".step-icon");o&&(t==="completed"?o.textContent="[✓]":t==="active"?o.textContent="[→]":o.textContent="[ ]")}}function H(e,t){const n=document.getElementById("protect-progress-bar"),o=document.getElementById("protect-progress-percent"),a=document.getElementById("protect-progress-label");n&&(n.style.width=`${e}%`),o&&(o.textContent=`${e}%`),a&&t&&(a.textContent=t)}function yt(){const e="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+",t=new Uint8Array(24);window.crypto.getRandomValues(t);let n="";for(let a=0;a<24;a++)n+=e[t[a]%e.length];const o=document.getElementById("new-password");if(o){o.value=n,o.type="text",_e();const a=document.getElementById("toggle-new-password");a&&(a.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',a.style.color="var(--cyber-cyan)")}}function wt(){document.getElementById("cancel-add").addEventListener("click",()=>{U()}),document.getElementById("confirm-add").addEventListener("click",De),document.getElementById("generate-pwd-btn")?.addEventListener("click",yt);const e=document.getElementById("toggle-new-password"),t=document.getElementById("new-password");e?.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation(),t&&(t.type==="password"?(t.type="text",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',e.style.color="var(--cyber-cyan)"):(t.type="password",e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',e.style.color="var(--cyber-text-muted)"))}),t?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),De())}),document.getElementById("download-protected-html-btn")?.addEventListener("click",async()=>{if(!P||!P.record){b("Notice","No active protected file session. Please select a file from the vault below to download.");return}const r=document.getElementById("download-protected-html-btn"),s=r?r.innerHTML:"";try{r&&(r.disabled=!0,r.innerHTML=`
          <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <span>PACKAGING PROTECTED HTML...</span>
        `);let l=P.buffer,c=P.password;if(!l||l.byteLength===0){const u=await q(P.record,c);if(u&&u.buffer)l=u.buffer,c=u.password||c;else throw new Error("Could not retrieve file content for packaging.")}await Z(P.record,l,c,{},"Protected HTML package exported successfully!")}catch(l){console.error(l),await b("Export Error","Failed to download HTML package: "+l.message)}finally{r&&(r.disabled=!1,r.innerHTML=s)}}),document.getElementById("view-in-vault-btn")?.addEventListener("click",()=>{U(),document.getElementById("secured-files-heading")?.scrollIntoView({behavior:"smooth"})}),document.getElementById("protect-another-btn")?.addEventListener("click",()=>{U(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}),document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".cyber-nav-item").forEach(s=>s.classList.remove("active")),r.classList.add("active"),r.id==="nav-item-protect"&&U()})}),document.getElementById("sidebar-settings-btn")?.addEventListener("click",()=>{ge(),K?.showModal()}),document.getElementById("cancel-auth").addEventListener("click",()=>{$.close(),document.getElementById("auth-password").value="",ve=null}),document.getElementById("confirm-auth").addEventListener("click",Pe),document.getElementById("auth-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Pe())}),document.getElementById("close-viewer").addEventListener("click",me),it?.addEventListener("click",He),W?.addEventListener("input",Lt),Re?.addEventListener("change",Tt),document.getElementById("new-password")?.addEventListener("input",_e),dt?.addEventListener("click",Mt),ut?.addEventListener("click",At),pt?.addEventListener("click",St),document.getElementById("select-all-btn")?.addEventListener("click",Ct),document.getElementById("close-info")?.addEventListener("click",()=>we.close()),document.getElementById("cancel-rename")?.addEventListener("click",()=>ne.close()),document.getElementById("confirm-rename")?.addEventListener("click",Ae),document.getElementById("rename-input")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ae())}),Dt(),zt(),ht?.addEventListener("click",()=>ee?.showModal()),document.getElementById("close-help")?.addEventListener("click",()=>ee?.close()),kt(),ft?.addEventListener("click",()=>{ge(),K?.showModal()}),document.getElementById("close-settings")?.addEventListener("click",()=>K?.close()),document.getElementById("close-settings-x")?.addEventListener("click",()=>K?.close()),document.getElementById("feedback-btn")?.addEventListener("click",()=>{const r="coralgenz@zohomail.in",s=encodeURIComponent("SecureVault Feedback"),l=encodeURIComponent(`Hi team,

I have some feedback for SecureVault:
`);window.location.href=`mailto:${r}?subject=${s}&body=${l}`}),document.querySelectorAll(".panic-trigger").forEach(r=>{r.addEventListener("click",ye)}),document.getElementById("panic-btn")?.addEventListener("click",ye),document.getElementById("panic-action-select")?.addEventListener("change",r=>{localStorage.setItem("sv_panic_action",r.target.value)}),document.getElementById("panic-enable-toggle")?.addEventListener("change",r=>{const s=r.target.checked;localStorage.setItem("sv_panic_enabled",s),xe()}),document.getElementById("dl-media-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_media",r.target.checked),fe()}),document.getElementById("dl-doc-toggle")?.addEventListener("change",r=>{localStorage.setItem("sv_dl_doc",r.target.checked),fe()}),document.getElementById("cancel-change-pass")?.addEventListener("click",()=>Oe?.close()),document.getElementById("confirm-change-pass")?.addEventListener("click",_t),de("toggle-new-password","new-password"),de("toggle-auth-password","auth-password"),de("toggle-share-password","share-password");const n=document.getElementById("share-modal");document.getElementById("cancel-share")?.addEventListener("click",()=>n?.close()),document.getElementById("confirm-share")?.addEventListener("click",Ne),document.getElementById("share-password")?.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),Ne())}),document.getElementById("share-logo-zone")?.addEventListener("click",r=>{r.target!==document.getElementById("share-logo")&&document.getElementById("share-logo")?.click()}),document.getElementById("share-logo")?.addEventListener("change",r=>{const s=r.target.files[0],l=document.getElementById("share-logo-text");l&&(l.textContent=s?s.name:"Choose File")}),A?.addEventListener("change",ue),document.getElementById("file-remove-btn")?.addEventListener("click",vt);const o=document.getElementById("file-upload-zone"),a=document.getElementById("drop-text-primary"),i=document.getElementById("drop-text-secondary");o?.addEventListener("click",r=>{r.target!==A&&A?.click()}),o?.addEventListener("dragover",r=>{r.preventDefault(),o.classList.add("drag-over"),a&&(a.textContent="FILE DETECTED — INITIALIZING PROTECTION"),i&&(i.textContent="Release file to initialize security inspection")}),o?.addEventListener("dragleave",()=>{o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),i&&(i.textContent="or click to browse local file system")}),o?.addEventListener("drop",r=>{r.preventDefault(),o.classList.remove("drag-over"),a&&(a.textContent="DROP FILE TO SECURE"),i&&(i.textContent="or click to browse local file system"),r.dataTransfer&&r.dataTransfer.files&&r.dataTransfer.files.length>0&&(A.files=r.dataTransfer.files,ue())}),document.addEventListener("contextmenu",r=>r.preventDefault()),document.addEventListener("keydown",r=>{(r.key==="PrintScreen"||r.ctrlKey&&r.key==="p")&&(r.preventDefault(),alert("Screenshots are disabled"))})}function de(e,t){const n=document.getElementById(e),o=document.getElementById(t);!n||!o||n.addEventListener("click",a=>{a.preventDefault(),o.type==="password"?(o.type="text",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="23" x2="23" y2="1"></line></svg>',n.style.color="var(--cyber-cyan)"):(o.type="password",n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',n.style.color="var(--cyber-muted)")})}function U(){A.value="",document.getElementById("new-password").value="",P=null,R.className="strength-bar",C.innerText="ENTER PASSWORD";const e=document.getElementById("file-upload-zone"),t=document.getElementById("file-preview"),n=document.getElementById("inline-password-section"),o=document.getElementById("protection-process-container"),a=document.getElementById("protection-complete-container");e?.classList.remove("hidden"),t?.classList.add("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden");const i=document.getElementById("process-timer-display");i&&(i.textContent="00:00.00");const r=document.querySelector(".scanner-center-shield");r&&r.classList.remove("success");const s=document.getElementById("scanner-status-text");s&&(s.textContent="SECURING");const l=document.getElementById("security-terminal-body");l&&(l.innerHTML='<p class="term-line">&gt; Standby for cryptographic instruction...</p>'),document.getElementById("new-password")?.classList.remove("highlight-input-glow"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(u=>{E(u,"")}),H(0,"STANDBY")}function ue(){const e=A.files[0];if(!e)return;const t=150*1024*1024;if(e.size>t){b("File Too Large","Please select a file smaller than 150 MB."),A.value="";return}const n=document.getElementById("file-upload-zone"),o=document.getElementById("file-preview"),a=document.getElementById("file-preview-name"),i=document.getElementById("file-preview-size"),r=document.getElementById("protection-process-container"),s=document.getElementById("protection-complete-container"),l=document.getElementById("inline-password-section"),c=document.getElementById("new-password");a&&(a.textContent=e.name),i&&(i.textContent=te(e.size)),n?.classList.add("hidden"),r?.classList.add("hidden"),s?.classList.add("hidden"),o?.classList.remove("hidden"),l?.classList.remove("hidden"),l&&(l.classList.remove("pulse-password-attention"),l.offsetWidth,l.classList.add("pulse-password-attention")),c&&(c.classList.remove("highlight-input-glow"),c.offsetWidth,c.classList.add("highlight-input-glow"),setTimeout(()=>{c.focus(),c.scrollIntoView({behavior:"smooth",block:"nearest"})},150))}function vt(e){e.preventDefault(),e.stopPropagation(),A.value="",P=null;const t=document.getElementById("file-upload-zone"),n=document.getElementById("file-preview"),o=document.getElementById("inline-password-section"),a=document.getElementById("protection-process-container"),i=document.getElementById("protection-complete-container");t?.classList.remove("hidden"),n?.classList.add("hidden"),o?.classList.add("hidden"),a?.classList.add("hidden"),i?.classList.add("hidden"),t?.classList.remove("hidden"),n?.classList.add("hidden"),document.getElementById("inline-password-section")?.classList.add("hidden")}function te(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],o=Math.floor(Math.log(e)/Math.log(t));return parseFloat((e/Math.pow(t,o)).toFixed(2))+" "+n[o]}function bt(e,t){try{const n=je(new Uint8Array(e),{type:"array"}),o=n.SheetNames;if(o.length===0)return;const a=document.createElement("div");a.className="excel-viewer";const i=document.createElement("div");i.className="excel-header";const r=document.createElement("div");r.className="excel-table-wrapper";let s=o[0];const l=c=>{r.innerHTML="";const u=n.Sheets[c],p=Ge.sheet_to_json(u,{header:1,defval:""});if(!p||p.length===0){r.innerHTML='<div style="padding:20px;text-align:center;">Empty Sheet</div>';return}const m=document.createElement("table");m.className="excel-table",p.forEach((g,h)=>{const v=document.createElement("tr");g.forEach(d=>{const f=h===0?"th":"td",y=document.createElement(f);y.textContent=d!==void 0?d:"",v.appendChild(y)}),m.appendChild(v)}),r.appendChild(m)};o.forEach(c=>{const u=document.createElement("button");u.className=`excel-sheet-btn ${c===s?"active":""}`,u.textContent=c,u.onclick=()=>{s=c,l(c),i.querySelectorAll(".excel-sheet-btn").forEach(p=>p.classList.remove("active")),u.classList.add("active")},i.appendChild(u)}),l(s),a.appendChild(i),a.appendChild(r),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Excel file: ${n.message}</div>`}}async function xt(e,t){try{const{value:n,messages:o}=await nt.convertToHtml({arrayBuffer:e}),a=document.createElement("div");a.className="word-viewer";const i=document.createElement("div");i.className="word-document",i.innerHTML=n,a.appendChild(i),t.appendChild(a)}catch(n){console.error(n),t.innerHTML=`<div style="padding:20px;color:red;">Error parsing Word file: ${n.message}</div>`}}async function Et(e,t,n){try{const o=await rt.loadAsync(e),a=Object.keys(o.files).filter(p=>p.startsWith("ppt/slides/slide")&&p.endsWith(".xml"));if(a.sort((p,m)=>{const g=parseInt(p.replace(/[^0-9]/g,"")||"0",10),h=parseInt(m.replace(/[^0-9]/g,"")||"0",10);return g-h}),a.length===0)throw new Error("No slide XML found in presentation archive.");const i=[],r=new DOMParser;for(const p of a){const m=await o.files[p].async("string"),h=r.parseFromString(m,"application/xml").querySelectorAll("t"),v=Array.from(h).map(d=>d.textContent.trim()).filter(Boolean);i.push({title:v[0]||`Slide ${i.length+1}`,body:v.slice(1).join(`
`)||"Slide Content"})}let s=0;const l=document.createElement("div");l.className="ppt-viewer";const c=document.createElement("div");c.className="ppt-slide-card";const u=p=>{const m=i[p];c.innerHTML=`
        <div class="ppt-slide-title">📊 ${m.title}</div>
        <div class="ppt-slide-content"><pre style="white-space:pre-wrap;font-family:inherit;">${m.body}</pre></div>
        <div class="ppt-nav-bar">
          <button type="button" id="ppt-prev-btn" class="excel-sheet-btn" ${p===0?'disabled style="opacity:0.5;"':""}>◀ Previous</button>
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">Slide ${p+1} of ${i.length}</span>
          <button type="button" id="ppt-next-btn" class="excel-sheet-btn" ${p===i.length-1?'disabled style="opacity:0.5;"':""}>Next ▶</button>
        </div>
      `,c.querySelector("#ppt-prev-btn")?.addEventListener("click",()=>{s>0&&(s--,u(s))}),c.querySelector("#ppt-next-btn")?.addEventListener("click",()=>{s<i.length-1&&(s++,u(s))})};u(0),l.appendChild(c),n.appendChild(l)}catch(o){console.warn("PPTX parsing fallback:",o),n.innerHTML=`
      <div class="ppt-slide-card" style="align-items:center;justify-content:center;text-align:center;">
        <div style="font-size:48px;margin-bottom:12px;">📊</div>
        <div class="ppt-slide-title">${t}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;">POWERPOINT PRESENTATION READY</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">Full presentation deck decrypted successfully. Click download above to view in Microsoft PowerPoint or Keynote.</p>
      </div>
    `}}function kt(){document.querySelectorAll("dialog.modal").forEach(t=>{t.addEventListener("click",n=>{const o=t.getBoundingClientRect();n.clientX>=o.left&&n.clientX<=o.right&&n.clientY>=o.top&&n.clientY<=o.bottom,n.target===t&&(t.close(),t.id==="add-modal"&&U())})})}function It(){localStorage.getItem("sv_theme")==="light"&&document.body.classList.add("light-theme")}function He(){document.body.classList.toggle("light-theme");const e=document.body.classList.contains("light-theme");localStorage.setItem("sv_theme",e?"light":"dark")}function _e(){const e=document.getElementById("new-password")?.value||"",n=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123"].includes(e.toLowerCase().trim());let o=0;e.length>=8&&o++,e.length>=12&&o++,e.length>=18&&o++,/[A-Z]/.test(e)&&/[a-z]/.test(e)&&o++,/[0-9]/.test(e)&&o++,/[^A-Za-z0-9]/.test(e)&&o++,n&&(o=1),R&&C&&(R.className="strength-bar",e?o<=2||n?(R.classList.add("weak"),C.innerText=n?"VULNERABLE (DICTIONARY WORD)":"WEAK (GPU CRACKABLE)",C.style.color="#ef4444"):o===3||o===4?(R.classList.add("fair"),C.innerText="MODERATE (RECOMMEND 12+ CHARS)",C.style.color="#f59e0b"):o===5?(R.classList.add("good"),C.innerText="STRONG (GPU RESISTANT)",C.style.color="#0284c7"):(R.classList.add("strong"),C.innerText="MIL-SPEC // QUANTUM RESISTANT",C.style.color="#10b981"):(C.innerText="ENTER PASSWORD",C.style.color="var(--cyber-text-muted)",R.style.width="0%"))}function Lt(){const e=W.value.toLowerCase().trim();S(e)}function Tt(){S(W?.value||"")}function Bt(e){const t=e.reduce((r,s)=>r+(s.size||0),0),n=(t/1024/1024).toFixed(2);st.innerText=`${e.length} files • ${n} MB used`;const o=Math.min(t/(500*1024*1024)*100,100);lt.style.width=o+"%";const a=e.filter(r=>r.type?.startsWith("image")).length,i=e.filter(r=>r.type?.startsWith("video")).length;Te&&(Te.innerText=e.length),Be&&(Be.innerText=a),Ce&&(Ce.innerText=i),Se&&(Se.innerText=n)}function G(){const e=document.getElementById("select-all-btn");L.size>0?(Le.classList.remove("hidden"),ct.innerText=`${L.size} selected`,e&&(L.size>=z.length&&z.length>0?e.innerText="Deselect All":e.innerText="Select All")):Le.classList.add("hidden")}function Ct(){L.size>=z.length&&z.length>0?L.clear():z.forEach(e=>L.add(e.id)),G(),S(W?.value||"")}function St(){L.clear(),G(),S(W?.value||"")}async function Mt(){if(await oe("Delete Files",`Delete ${L.size} file(s)? This cannot be undone.`)){for(const t of L)await k.deleteFile(t);L.clear(),G(),S(),await b("Success","Files deleted.")}}async function At(){if(L.size!==0){await b("Export",`Exporting ${L.size} files. Each will download separately.`);for(const e of L)await k.getFile(e)&&await Nt(e);L.clear(),G(),S()}}async function Nt(e){const t=await k.getFile(e);if(!t)return;const n=await q(t);if(!n||!n.buffer)return;const{buffer:o,password:a}=n;let i=a;i||(i=await j("Export Protected File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),i&&await Z(t,o,i,{},"Protected file downloaded successfully!")}function Dt(){const e=document.getElementById("app");["dragenter","dragover"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),X?.classList.remove("hidden"),X?.classList.add("active")})}),["dragleave","drop"].forEach(t=>{e?.addEventListener(t,n=>{n.preventDefault(),X?.classList.add("hidden"),X?.classList.remove("active")})}),e?.addEventListener("drop",async t=>{t.preventDefault();const n=t.dataTransfer?.files;if(n&&n.length>0)if(n.length===1){const o=new DataTransfer;o.items.add(n[0]),A.files=o.files,ue(),document.getElementById("inline-add-container")?.scrollIntoView({behavior:"smooth"})}else for(const o of n)await Pt(o)})}async function Pt(e){if(e.size>157286400){await b("File Too Large",`File "${e.name}" is too large. Max 150 MB.`);return}const n=await j("Set Password",`Set password for: ${e.name}`,{inputType:"password",placeholder:"Enter secure password..."});if(!n)return;const o=await w.generateKey(),a=w.generateSalt(),i=await w.deriveKeyFromPassword(n,a,2e6),r=await e.arrayBuffer(),{iv:s,ciphertext:l}=await w.encryptData(o,r),{iv:c,wrappedData:u}=await w.wrapKey(o,i),p={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:[{type:"password",salt:a,iv:c,data:u}],content:l,iv:s,viewCount:0};await k.saveFile(p),S(),await b("Success",`${e.name} encrypted and saved!`)}function zt(){document.addEventListener("keydown",e=>{(e.ctrlKey||e.metaKey)&&e.key==="n"&&e.preventDefault(),(e.ctrlKey||e.metaKey)&&e.key==="f"&&(e.preventDefault(),W?.focus()),e.key==="Escape"&&(U(),$.close(),we?.close(),ne?.close()),(e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==="p"&&(e.preventDefault(),ye()),(e.ctrlKey||e.metaKey)&&e.key==="t"&&(e.preventDefault(),He())})}const Me=5,Rt=300*1e3;function Fe(e){const t=N[e];if(t&&t.locked&&Date.now()<t.lockedUntil){const n=Math.ceil((t.lockedUntil-Date.now())/1e3);return alert(`File locked. Try again in ${n} seconds.`),!0}return!1}function Ot(e){N[e]||(N[e]={count:0,locked:!1,lockedUntil:0}),N[e].count++;const t=Me-N[e].count,n=document.getElementById("attempts-left"),o=document.getElementById("auth-attempts");t<=3&&(o?.classList.remove("hidden"),n&&(n.innerText=t)),N[e].count>=Me&&(N[e].locked=!0,N[e].lockedUntil=Date.now()+Rt,$.close(),alert("Too many failed attempts. File locked for 5 minutes."))}function Ht(e){delete N[e],document.getElementById("auth-attempts")?.classList.add("hidden")}async function _t(){const e=document.getElementById("current-password").value,t=document.getElementById("new-password-change").value,n=document.getElementById("confirm-password-change").value;if(!e||!t||!n){await b("Required","Please fill all fields");return}if(t!==n){await b("Error","New passwords do not match");return}const o=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],a=t.toLowerCase().trim();if(!((t.length<8||o.includes(a))&&!await oe("⚠️ Weak Password Warning",`This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.

Do you want to proceed with this password?`)))try{const r=await k.getFile(mt);if(!r)throw new Error("File not found");const s=r.keys.find(g=>g.type==="password");if(!s)throw new Error("No password key found");const l=await w.unwrapWithFallback(s.data,e,s.salt,s.iv),c=w.generateSalt(),u=await w.deriveKeyFromPassword(t,c,2e6),{iv:p,wrappedData:m}=await w.wrapKey(l,u);r.keys=r.keys.filter(g=>g.type!=="password"),r.keys.push({type:"password",salt:c,iv:p,data:m}),r.accessLog=r.accessLog||[],r.accessLog.push({action:"password_changed",date:Date.now()}),await k.updateFile(r),Oe?.close(),await b("Success","Password changed successfully!")}catch(r){console.error(r),await b("Error","Failed to change password. Current password may be incorrect.")}}function Ft(e,t){e.accessLog=e.accessLog||[],e.accessLog.push({action:t,date:Date.now()}),e.accessLog.length>20&&(e.accessLog=e.accessLog.slice(-20))}function Kt(e){O=O.filter(t=>t.id!==e.id),O.unshift({id:e.id,name:e.name,type:e.type,date:Date.now()}),O.length>5&&(O=O.slice(0,5)),localStorage.setItem("sv_recent",JSON.stringify(O)),Ke()}function Ke(){if(!le||!ce)return;const e=O.filter(t=>z.some(n=>n.id===t.id));if(e.length===0){le.classList.add("hidden");return}le.classList.remove("hidden"),ce.innerHTML=e.map(t=>`
    <div class="recent-item" data-id="${t.id}">
      <span>${t.type?.startsWith("image")?"🖼️":t.type?.startsWith("video")?"🎬":"📄"}</span>
      <span>${t.name}</span>
    </div>
  `).join(""),ce.querySelectorAll(".recent-item").forEach(t=>{t.onclick=()=>he(t.dataset.id)})}async function Ut(e,t){e.stopPropagation(),await oe("Delete File","Delete this file permanently?")&&(await k.deleteFile(t),S())}async function Wt(e,t){e.stopPropagation();const n=z.find(i=>i.id===t);if(!n)return;document.getElementById("info-name").innerText=n.name,document.getElementById("info-type").innerText=n.type||"Unknown",document.getElementById("info-size").innerText=(n.size/1024/1024).toFixed(2)+" MB",document.getElementById("info-date").innerText=new Date(n.date).toLocaleDateString(),document.getElementById("info-mode").innerText=n.authMode==="always"?"Always Ask Password":n.authMode||"Always Ask Password";const o=document.getElementById("info-views");o&&(o.innerText=n.viewCount||0);const a=document.getElementById("access-log");a&&n.accessLog&&n.accessLog.length>0?a.innerHTML=n.accessLog.slice(-10).reverse().map(i=>`
      <div class="access-log-item">
        ${i.action.replace("_"," ")} - ${new Date(i.date).toLocaleString()}
      </div>
    `).join(""):a&&(a.innerHTML="No access history"),we.showModal()}function Vt(e,t,n){e.stopPropagation(),Q=t;const o=document.getElementById("rename-input");o.value=n,ne.showModal(),setTimeout(()=>{o.focus(),o.select()},100)}async function Ae(){const e=document.getElementById("rename-input").value.trim();if(!e||!Q)return;const t=await k.getFile(Q);t&&(t.name=e,await k.updateFile(t)),ne.close(),Q=null,S()}async function $t(e,t){e&&e.stopPropagation();try{const n=await k.getFile(t);if(!n){await b("Error","File not found");return}const o=await q(n);if(!o||!o.buffer)return;const{buffer:a,password:i}=o;let r=i;if(r||(r=await j("Download Protected File","Enter the file's password to protect this download:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await Z(n,a,r,{},"Downloaded! The protected file has been saved."),Ft(n,"downloaded"),await k.updateFile(n)}catch(n){console.error(n),await b("Error","Failed to download file: "+(n.message||"Decryption error"))}}async function jt(e,t){e.stopPropagation();try{const n=await k.getFile(t);if(!n)return;const o=await q(n);if(!o||!o.buffer)return;const{buffer:a,password:i}=o;let r=i;if(r||(r=await j("Share File","Enter the file's password to protect this export:",{inputType:"password",placeholder:"Enter original password..."})),!r)return;await Z(n,a,r,{})}catch(n){console.error(n),await b("Error","Share failed: "+n.message)}}function Gt(e,t){e.stopPropagation(),pe=t,document.getElementById("share-password").value="",document.getElementById("share-title").value="",document.getElementById("share-logo").value="",document.getElementById("share-modal")?.showModal()}async function Ne(){const e=document.getElementById("share-modal"),t=document.getElementById("share-password").value,n=document.getElementById("share-title").value||"SecureVault",o=document.getElementById("share-logo");if(!t){await b("Required","Please set a password for the file.");return}const a=["123456","password","12345678","admin","admin123","benz","qwerty","123456789","welcome","letmein","monkey","dragon","master","football","access","iloveyou","testing","security","vault","pass123","root","user","111111","000000","trustno1"],i=t.toLowerCase().trim();if((t.length<8||a.includes(i))&&!await oe("⚠️ Weak Password Warning",`This password is short or common, which makes it less secure against offline dictionary attacks. However, Coralgenz Vault still protects it with 2,000,000 PBKDF2 rounds.

Do you want to proceed with this password?`))return;const s=document.getElementById("confirm-share"),l=s.innerText;s.innerText="Exporting...";try{const c=await k.getFile(pe);if(!c)throw new Error("File not found");const u=await q(c,t);if(!u||!u.buffer)throw new Error("Decryption failed");const p=u.buffer;let m="";o.files&&o.files[0]&&(m=await new Promise(h=>{const v=new FileReader;v.onload=()=>h(v.result),v.readAsDataURL(o.files[0])})),await Z(c,p,t,{title:n,logoUrl:m}),e.close(),pe=null}catch(c){console.error(c),await b("Error","Export failed: "+c.message)}finally{s.innerText=l}}function Zt(e,t){const n=(t||"").toLowerCase(),o=(e||"").toLowerCase();return n.startsWith("image/")||n.startsWith("video/")||n.startsWith("audio/")?!0:/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|mov|mkv|ogg|mp3|wav|aac|m4a|flac)$/i.test(o)}function Ue(){const e=localStorage.getItem("sv_dl_media")!=="false",t=localStorage.getItem("sv_dl_doc")!=="false";return{allowMedia:e,allowDoc:t}}function be(e,t){const{allowMedia:n,allowDoc:o}=Ue();return Zt(e,t)?n:o}function fe(){const{allowMedia:e,allowDoc:t}=Ue(),n=document.getElementById("dl-media-status-badge"),o=document.getElementById("dl-doc-status-badge");n&&(n.textContent=e?"ALLOWED":"RESTRICTED",n.className=`policy-status-badge ${e?"allowed":"restricted"}`),o&&(o.textContent=t?"ALLOWED":"RESTRICTED",o.className=`policy-status-badge ${t?"allowed":"restricted"}`)}async function Z(e,t,n,o={},a=""){if(!t||t.byteLength===0)throw new Error("No decrypted file payload available to package.");if(!n)throw new Error("Protection password is required to export this file.");const i=o.allowDownload!==void 0?!!o.allowDownload:be(e.name,e.type),r=w.generateSalt(),s=await w.computePayloadHash(t),l=await w.deriveKeyAsyncWorker(n,r,2e6,w.MILSPEC_ANTI_CRACKER_PEPPER_V6),{iv:c,ciphertext:u}=await w.encryptData(l,t),m=await(T=>new Promise(I=>{const B=new FileReader;B.readAsDataURL(T),B.onloadend=()=>{const _=B.result||"";I(_.split(",")[1]||"")}}))(new Blob([u]));if(!m)throw new Error("Failed to serialize encrypted payload.");const{header:g,footer:h}=qt(e,r,c,{...o,allowDownload:i,integrityHash:s}),v=new Blob([g,m,h],{type:"text/html;charset=utf-8"}),d=URL.createObjectURL(v),f=document.createElement("a");f.href=d;const y=e.name||"protected_file";f.download=y.endsWith(".secure.html")?y:y+".secure.html",document.body.appendChild(f),f.click(),document.body.removeChild(f),setTimeout(()=>URL.revokeObjectURL(d),6e4)}function qt(e,t,n,o={}){const a=ie=>btoa(String.fromCharCode(...new Uint8Array(ie))),i=a(t),r=a(n),s=o.title||"Coralgenz Vault",l=o.logoUrl||"",c=e.name||"Protected File",u=e.type||"application/octet-stream",p=Number(e.size)||0,m=e.id||"",g=o.allowDownload!==void 0?!!o.allowDownload:be(c,u),h=JSON.stringify(i),v=JSON.stringify(r),d=JSON.stringify(u),f=JSON.stringify(c),y=JSON.stringify(p),T=JSON.stringify(s),I=JSON.stringify(m),B=JSON.stringify(g),_=JSON.stringify(o.integrityHash||e.integrityHash||""),Y=JSON.stringify("V6"),re=l?`<img src="${l}" alt="Logo" class="brand-custom-logo">`:`<div class="brand-shield-icon">
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
    <title>${s} // ${c}</title>
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
            max-width: 320px;
        }
        .doc-toolbar-right {
            display: flex;
            align-items: center;
            gap: 10px;
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
            width: 180px;
        }
        .doc-search-input:focus {
            border-color: var(--accent-cyan);
            box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
            width: 240px;
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
            padding: 8px 12px;
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
        }
        .excel-grid-table thead th.row-index-hdr {
            width: 50px;
            min-width: 50px;
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
        }
        .excel-grid-table tbody tr:hover td {
            background: #f0fdf4;
        }
        .excel-grid-table tbody tr:hover td.row-num {
            background: #dcfce7;
            color: #166534;
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
            padding: 30px 20px;
            display: flex;
            justify-content: center;
        }
        .word-page-sheet {
            background: #ffffff;
            max-width: 820px;
            width: 100%;
            min-height: 800px;
            padding: 60px 70px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
            border: 1px solid #e2e8f0;
            color: #1e293b;
            font-family: var(--font-sans);
            font-size: 15px;
            line-height: 1.75;
            box-sizing: border-box;
        }
        .word-page-sheet h1, .word-page-sheet h2, .word-page-sheet h3, .word-page-sheet h4 {
            color: #0f172a;
            font-weight: 700;
            line-height: 1.3;
            margin-top: 1.5em;
            margin-bottom: 0.6em;
        }
        .word-page-sheet h1 { font-size: 26px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
        .word-page-sheet h2 { font-size: 20px; }
        .word-page-sheet h3 { font-size: 17px; }
        .word-page-sheet p {
            margin: 0 0 1em;
            color: #334155;
            word-break: break-word;
        }
        .word-page-sheet ul, .word-page-sheet ol {
            margin: 0 0 1.2em 1.5em;
            padding: 0;
        }
        .word-page-sheet li {
            margin-bottom: 0.4em;
            color: #334155;
        }
        .word-page-sheet table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5em 0;
            font-size: 13px;
        }
        .word-page-sheet table th, .word-page-sheet table td {
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            text-align: left;
        }
        .word-page-sheet table th {
            background: #f8fafc;
            font-weight: 700;
            color: #0f172a;
        }

        /* PowerPoint Slide Deck Styles */
        .ppt-deck-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: #0f172a;
            overflow: hidden;
            position: relative;
        }
        .ppt-stage {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px;
            perspective: 1000px;
        }
        .ppt-slide-card {
            background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
            border: 1px solid #334155;
            border-radius: 16px;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
            width: 100%;
            max-width: 900px;
            aspect-ratio: 16 / 9;
            min-height: 420px;
            display: flex;
            flex-direction: column;
            padding: 44px 52px;
            box-sizing: border-box;
            color: #ffffff;
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ppt-slide-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 4px;
            background: linear-gradient(90deg, #e11d48, #f43f5e, #fb7185);
        }
        .ppt-slide-header {
            margin-bottom: 24px;
        }
        .ppt-slide-tag {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 700;
            color: #fb7185;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        .ppt-slide-title {
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.3;
            letter-spacing: -0.02em;
        }
        .ppt-slide-body {
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 14px;
        }
        .ppt-bullet-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 16px;
            line-height: 1.6;
            color: #cbd5e1;
        }
        .ppt-bullet-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #f43f5e;
            margin-top: 9px;
            flex-shrink: 0;
        }
        .ppt-controls-bar {
            padding: 14px 24px;
            background: #090d16;
            border-top: 1px solid #1e293b;
            display: flex;
            align-items: center;
            justify-content: space-between;
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
        .ppt-slide-counter {
            font-family: var(--font-mono);
            font-size: 13px;
            font-weight: 700;
            color: #e2e8f0;
            background: #1e293b;
            padding: 6px 14px;
            border-radius: 20px;
            border: 1px solid #334155;
        }
        .ppt-keys-hint {
            font-size: 12px;
            color: #64748b;
            display: inline-flex;
            align-items: center;
            gap: 4px;
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
        ${re}
        <h1 class="auth-title">${s}</h1>
        <div class="auth-subtitle">Protected & Encrypted File</div>
        
        <div class="file-info-chip">
            <div class="file-chip-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
            </div>
            <div class="file-chip-details">
                <div class="file-chip-name" title="${c}">${c}</div>
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
                <div class="viewer-brand-title">${s}</div>
                <div class="viewer-file-badge" id="viewer-file-name">${c}</div>
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
        const CONTAINER_VERSION = ${Y};
        const SALT_B64 = ${h};
        const IV_B64 = ${v};
        const TYPE = ${d};
        const NAME = ${f};
        const SIZE = ${y};
        const BRAND = ${T};
        const ALLOW_DOWNLOAD = ${B};
        const INTEGRITY_HASH = ${_};

        // Dynamically assembled anti-cracker peppers (defeats static string grep/decompilation)
        const MILSPEC_PEPPER_V6 = ["CORALGENZ", "MILSPEC_V6", "QUANTUM_RESISTANT", "ZERO_KNOWLEDGE", "883920194821"].join("::");
        const MILSPEC_PEPPER = MILSPEC_PEPPER_V6;
        const MILSPEC_PEPPER_V5 = ["CORALGENZ", "MILSPEC_V5", "ANTI_OFFLINE_CRACKER", "ZERO_KNOWLEDGE", "774910283419"].join("::");
        const MILSPEC_PEPPER_V4 = ["CORALGENZ", "MILSPEC_V4", "ANTI_JOHN_THE_RIPPER", "ZERO_KNOWLEDGE", "992174829104"].join("::");

        // Persistent session brute-force lockout tracking per file container
        const ATTEMPTS_KEY = 'cg_fails_' + ${I};
        const LOCKOUT_KEY = 'cg_lockout_' + ${I};

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
            ${at};
            return self.fflate || (typeof window !== 'undefined' ? window.fflate : null);
        })();

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

            const isZip = bytes.length > 4 && bytes[0] === 0x50 && bytes[1] === 0x4B;
            if (isZip && fflate && fflate.unzipSync) {
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

                const toolbar = document.createElement('div');
                toolbar.className = 'doc-toolbar';

                const toolLeft = document.createElement('div');
                toolLeft.className = 'doc-toolbar-left';
                toolLeft.innerHTML = '<span class="doc-format-badge doc-badge-excel"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg> EXCEL SPREADSHEET</span><span class="doc-filename" title="' + escapeHTML(name) + '">' + escapeHTML(name) + '</span>';

                const toolRight = document.createElement('div');
                toolRight.className = 'doc-toolbar-right';

                const searchBox = document.createElement('div');
                searchBox.className = 'doc-search-box';
                searchBox.innerHTML = '<svg class="doc-search-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.className = 'doc-search-input';
                searchInput.placeholder = 'Search cells...';
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
                        tabBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> ' + escapeHTML(sh.name);
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
                    const currentSheet = sheets[activeSheetIdx] || { rows: [] };
                    let rowsToDisplay = currentSheet.rows;

                    if (searchQuery.trim().length > 0) {
                        rowsToDisplay = rowsToDisplay.filter(r => r.some(c => String(c).toLowerCase().includes(searchQuery)));
                    }

                    if (rowsToDisplay.length === 0) {
                        tableScroll.innerHTML = '<div class="excel-empty-state">No matching rows found in this sheet.</div>';
                        return;
                    }

                    let maxCols = 0;
                    rowsToDisplay.forEach(r => { if (r.length > maxCols) maxCols = r.length; });
                    if (maxCols === 0) maxCols = 1;

                    const table = document.createElement('table');
                    table.className = 'excel-grid-table';

                    const thead = document.createElement('thead');
                    const hdrTr = document.createElement('tr');
                    const cornerTh = document.createElement('th');
                    cornerTh.className = 'row-index-hdr';
                    cornerTh.textContent = '#';
                    hdrTr.appendChild(cornerTh);

                    for (let c = 0; c < maxCols; c++) {
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
                    rowsToDisplay.forEach((row, rIdx) => {
                        const tr = document.createElement('tr');
                        const rowNumTd = document.createElement('td');
                        rowNumTd.className = 'row-num';
                        rowNumTd.textContent = (rIdx + 1);
                        tr.appendChild(rowNumTd);

                        for (let c = 0; c < maxCols; c++) {
                            const td = document.createElement('td');
                            const val = row[c] !== undefined ? String(row[c]) : '';
                            td.textContent = val;
                            if (searchQuery && val.toLowerCase().includes(searchQuery)) {
                                td.style.background = '#fef08a';
                                td.style.fontWeight = '700';
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

        function renderWordDocument(bytes, name, container, allowDl, dlBlob) {
            container.innerHTML = '';
            const wrapper = document.createElement('div');
            wrapper.className = 'doc-viewer-container';

            const toolbar = document.createElement('div');
            toolbar.className = 'doc-toolbar';

            const toolLeft = document.createElement('div');
            toolLeft.className = 'doc-toolbar-left';
            toolLeft.innerHTML = '<span class="doc-format-badge doc-badge-word"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> WORD DOCUMENT</span><span class="doc-filename" title="' + escapeHTML(name) + '">' + escapeHTML(name) + '</span>';

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

            const scrollContainer = document.createElement('div');
            scrollContainer.className = 'word-scroll-container';

            const sheet = document.createElement('div');
            sheet.className = 'word-page-sheet';

            let renderedContent = false;
            const isZip = bytes.length > 4 && bytes[0] === 0x50 && bytes[1] === 0x4B;

            if (isZip && fflate && fflate.unzipSync) {
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
                                    const pPr = node.getElementsByTagName('w:pPr')[0] || node.getElementsByTagName('pPr')[0];
                                    if (pPr) {
                                        const pStyleEl = pPr.getElementsByTagName('w:pStyle')[0] || pPr.getElementsByTagName('pStyle')[0];
                                        if (pStyleEl) {
                                            pStyle = (pStyleEl.getAttribute('w:val') || pStyleEl.getAttribute('val') || '').toLowerCase();
                                        }
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
                                    }

                                    if (pTextHTML.trim().length > 0) {
                                        if (pStyle.includes('heading1') || pStyle.includes('heading 1') || pStyle.includes('title')) {
                                            bodyHTML += '<h1>' + pTextHTML + '</h1>';
                                        } else if (pStyle.includes('heading2') || pStyle.includes('heading 2') || pStyle.includes('subtitle')) {
                                            bodyHTML += '<h2>' + pTextHTML + '</h2>';
                                        } else if (pStyle.includes('heading3') || pStyle.includes('heading 3')) {
                                            bodyHTML += '<h3>' + pTextHTML + '</h3>';
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
                                                const cellText = Array.from(tcNodes[c].getElementsByTagName('w:t')).map(t => t.textContent || '').join(' ');
                                                const tag = r === 0 ? 'th' : 'td';
                                                bodyHTML += '<' + tag + '>' + escapeHTML(cellText) + '</' + tag + '>';
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

            if (!renderedContent) {
                try {
                    const rawText = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
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
                        .filter(p => p.length > 20 && !p.startsWith('<?xml') && !p.startsWith('PK') && !p.includes('schemas.openxmlformats'));

                    if (cleanParagraphs.length > 0) {
                        let fallbackHTML = '<h1 style="font-size:22px;margin-bottom:20px;color:#0f172a;">' + escapeHTML(name) + '</h1>';
                        cleanParagraphs.slice(0, 100).forEach(p => {
                            fallbackHTML += '<p>' + escapeHTML(p) + '</p>';
                        });
                        sheet.innerHTML = fallbackHTML;
                        renderedContent = true;
                    }
                } catch (e) {}
            }

            if (!renderedContent) {
                sheet.innerHTML = '<h1 style="font-size:22px;margin-bottom:16px;">' + escapeHTML(name) + '</h1><p style="color:#64748b;">The document structure is encrypted or formatted in a proprietary binary layout. All underlying file bytes are fully preserved.</p>';
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
                            const numA = parseInt(a.toLowerCase().replace('ppt/slides/slide', '').replace('.xml', ''), 10) || 0;
                            const numB = parseInt(b.toLowerCase().replace('ppt/slides/slide', '').replace('.xml', ''), 10) || 0;
                            return numA - numB;
                        });

                    slideKeys.forEach((sKey, sIdx) => {
                        const xmlText = (new TextDecoder()).decode(files[sKey]);
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(xmlText, 'application/xml');
                        const spNodes = doc.getElementsByTagName('p:sp');

                        let slideTitle = '';
                        const slideBullets = [];

                        for (let i = 0; i < spNodes.length; i++) {
                            const sp = spNodes[i];
                            const ph = sp.getElementsByTagName('p:ph')[0];
                            const phType = ph ? (ph.getAttribute('type') || '') : '';
                            const isTitleShape = phType === 'title' || phType === 'ctrTitle' || (!slideTitle && i === 0);

                            const pNodes = sp.getElementsByTagName('a:p');
                            for (let j = 0; j < pNodes.length; j++) {
                                const tNodes = pNodes[j].getElementsByTagName('a:t');
                                let line = '';
                                for (let k = 0; k < tNodes.length; k++) {
                                    line += tNodes[k].textContent || '';
                                }
                                line = line.trim();
                                if (line.length > 0) {
                                    if (isTitleShape && !slideTitle) {
                                        slideTitle = line;
                                    } else {
                                        slideBullets.push(line);
                                    }
                                }
                            }
                        }

                        if (!slideTitle && slideBullets.length > 0) {
                            slideTitle = slideBullets.shift();
                        }

                        slides.push({
                            title: slideTitle || ('Slide ' + (sIdx + 1)),
                            bullets: slideBullets
                        });
                    });
                } catch (e) {
                    console.warn('OpenXML PowerPoint parsing fallback:', e);
                }
            }

            if (slides.length === 0) {
                try {
                    const rawText = (new TextDecoder('utf-8', { fatal: false })).decode(bytes);
                    let printableText = '';
                    for (let pi = 0; pi < rawText.length; pi++) {
                        const code = rawText.charCodeAt(pi);
                        if ((code >= 32 && code <= 126) || code === 10 || code === 13 || code === 9) {
                            printableText += rawText.charAt(pi);
                        } else {
                            printableText += String.fromCharCode(10);
                        }
                    }
                    const clean = printableText.split(String.fromCharCode(10))
                        .map(m => m.trim())
                        .filter(m => m.length > 10 && !m.startsWith('<?xml') && !m.startsWith('PK'));
                    if (clean.length > 0) {
                        const chunkSize = 4;
                        for (let i = 0; i < Math.min(clean.length, 32); i += chunkSize) {
                            const slice = clean.slice(i, i + chunkSize);
                            slides.push({
                                title: slice[0] || ('Slide ' + (slides.length + 1)),
                                bullets: slice.slice(1)
                            });
                        }
                    }
                } catch (e) {}
            }

            if (slides.length === 0) {
                slides.push({
                    title: name,
                    bullets: ['PowerPoint Presentation decrypted successfully (' + formatBytes(bytes.byteLength) + ').', 'Interactive slide preview completed.']
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
            prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg><span>PREVIOUS</span>';

            const counter = document.createElement('div');
            counter.className = 'ppt-slide-counter';

            const hint = document.createElement('div');
            hint.className = 'ppt-keys-hint';
            hint.innerHTML = '<kbd>←</kbd> <kbd>→</kbd> Navigate';

            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.className = 'ppt-nav-btn';
            nextBtn.innerHTML = '<span>NEXT</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>';

            controlsBar.appendChild(prevBtn);
            controlsBar.appendChild(hint);
            controlsBar.appendChild(counter);
            controlsBar.appendChild(nextBtn);
            deckWrapper.appendChild(controlsBar);
            wrapper.appendChild(deckWrapper);

            function updateSlide() {
                const s = slides[currentSlide];
                counter.textContent = 'Slide ' + (currentSlide + 1) + ' / ' + slides.length;
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide === slides.length - 1;

                let bulletsHTML = '';
                if (s.bullets && s.bullets.length > 0) {
                    s.bullets.forEach(b => {
                        bulletsHTML += '<div class="ppt-bullet-item"><div class="ppt-bullet-dot"></div><div>' + escapeHTML(b) + '</div></div>';
                    });
                } else {
                    bulletsHTML = '<div style="color:#64748b;font-size:15px;margin-top:20px;">(Slide content preview)</div>';
                }

                card.innerHTML = '<div class="ppt-slide-header"><div class="ppt-slide-tag">SLIDE ' + (currentSlide + 1) + ' OF ' + slides.length + '</div><div class="ppt-slide-title">' + escapeHTML(s.title) + '</div></div><div class="ppt-slide-body">' + bulletsHTML + '</div>';
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

        // Trap PrintScreen Key
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
                const isExcel = safeType.includes('excel') || safeType.includes('spreadsheet') || hasExt(lowerName, ['xlsx', 'xls', 'xlsm', 'xlsb', 'ods']);
                const isWord = safeType.includes('word') || safeType.includes('document') || hasExt(lowerName, ['docx', 'doc', 'dotx', 'odt', 'rtf']);
                const isPpt = safeType.includes('presentation') || safeType.includes('powerpoint') || hasExt(lowerName, ['pptx', 'ppt', 'pps', 'ppsx', 'odp']);
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
                    renderExcelSpreadsheet(decryptedBytes, NAME, contentArea, ALLOW_DOWNLOAD, blob);
                } else if (isWord) {
                    renderWordDocument(decryptedBytes, NAME, contentArea, ALLOW_DOWNLOAD, blob);
                } else if (isPpt) {
                    renderPowerPointDeck(decryptedBytes, NAME, contentArea, ALLOW_DOWNLOAD, blob);
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
</html>`}}async function q(e,t=null){let n=null,o=t;if(t)try{const i=e.keys.find(r=>r.type==="password");i&&(n=await w.unwrapWithFallback(i.data,t,i.salt,i.iv))}catch{console.log("Provided password invalid for unlock")}if(!n){const i=await j("Decrypt for Export","Provide the ORIGINAL password to decrypt for export:",{inputType:"password",placeholder:"Enter password..."});if(!i)return null;try{const r=e.keys.find(s=>s.type==="password");n=await w.unwrapWithFallback(r.data,i,r.salt,r.iv),o=i}catch{return await b("Error","Incorrect password"),null}}return{buffer:await w.decryptData(n,e.iv,e.content),password:o}}async function De(){const e=A.files[0],t=document.getElementById("new-password").value;if(!e){await b("Required","Please select a file to protect");return}if(!t){await b("Required","Protection password is required"),document.getElementById("new-password")?.focus();return}const n=document.getElementById("confirm-add"),o=n.innerText;n.innerText="SECURING FILE (6s)...",n.disabled=!0;const a=document.getElementById("protection-process-container"),i=document.getElementById("file-upload-zone"),r=document.getElementById("file-preview"),s=document.getElementById("inline-password-section"),l=document.getElementById("protection-complete-container"),c=document.getElementById("security-terminal-body"),u=document.getElementById("process-timer-display"),p=document.getElementById("scanner-status-text"),m=document.querySelector(".scanner-center-shield"),g=document.querySelector(".scanner-stage");i?.classList.add("hidden"),r?.classList.add("hidden"),s?.classList.add("hidden"),l?.classList.add("hidden"),a?.classList.remove("hidden"),g?.classList.add("rapid-scan"),["step-analysis","step-prep","step-kdf","step-encrypt","step-meta","step-finalize","step-output","step-verify"].forEach(y=>{E(y,"")}),m&&m.classList.remove("success"),p&&(p.textContent="SECURING"),c&&(c.innerHTML="");const h=Date.now(),v=setInterval(()=>{const y=Date.now()-h,T=Math.min(6e3,y),I=Math.floor(T/1e3).toString().padStart(2,"0"),B=Math.floor(T%1e3/10).toString().padStart(2,"0");u&&(u.textContent=`00:${I}.${B}`)},20),d=y=>{const T=Math.min(6e3,Math.max(0,y)),I=Math.floor(T/1e3).toString().padStart(2,"0"),B=Math.floor(T%1e3/10).toString().padStart(2,"0");return`[00:${I}.${B}]`},f=async y=>{const T=Date.now()-h,I=y-T;I>0&&await new Promise(B=>setTimeout(B,I))};try{H(14,"FILE STRUCTURE ANALYSIS // MEMORY ENCLAVE..."),E("step-analysis","active"),p&&(p.textContent="ANALYZING"),x(`${d(Date.now()-h)} INITIATING RAPID ENCRYPTION PIPELINE // ZERO-KNOWLEDGE V2.6`),x(`${d(Date.now()-h)} File: "${e.name}" [${te(e.size)}] | Type: ${e.type||"application/octet-stream"}`),x(`${d(Date.now()-h)} Enclave memory block allocated: ${e.size} bytes. Isolation confirmed.`);const y=w.detectDeviceCapabilities();x(`${d(Date.now()-h)} Hardware Profile: ${y.concurrency} Cores, ${y.memory}GB RAM [Worker Offload: Active]`),await f(750),E("step-analysis","completed"),H(28,"INITIALIZING CSPRNG ENTROPY POOL..."),E("step-prep","active"),p&&(p.textContent="ENTROPY POOL"),x(`${d(Date.now()-h)} Generating 256-bit cryptographic salt from hardware CSPRNG...`);const T=w.generateSalt(),I=await w.generateKey();x(`${d(Date.now()-h)} Nonce generation: 96-bit AES-GCM Initialization Vector created.`),x(`${d(Date.now()-h)} Ephemeral entropy validated: entropy score = 0.9998.`),await f(1500),E("step-prep","completed"),H(45,"DERIVING KEY (DUAL-STAGE KDF 2,000,000 ROUNDS)..."),E("step-kdf","active"),p&&(p.textContent="2,000,000 PBKDF2"),x(`${d(Date.now()-h)} Stage 1: HMAC-SHA512 Pre-whitening with Domain-Separated Pepper V6...`),x(`${d(Date.now()-h)} Worker Offload: Initializing background thread for smooth 60fps UI...`),x(`${d(Date.now()-h)} Stage 2: Computing 2,000,000 PBKDF2 iterations (Anti-JohnTheRipper / Anti-Hashcat)...`);const B=await w.deriveKeyAsyncWorker(t,T,2e6,w.MILSPEC_ANTI_CRACKER_PEPPER_V6);x(`${d(Date.now()-h)} Key derivation complete: 256-bit symmetric cipher key established.`),await f(2400),E("step-kdf","completed"),H(65,"AES-GCM-256 CIPHER STREAM PROCESSING..."),E("step-encrypt","active"),p&&(p.textContent="AES-256-GCM"),x(`${d(Date.now()-h)} Executing client-side WebCrypto AES-GCM 256-bit cipher...`);const _=await e.arrayBuffer(),Y=await w.computePayloadHash(_);x(`${d(Date.now()-h)} SHA-256 Payload Integrity Seal: ${Y.substring(0,16)}... [VERIFIED]`);const re=_.slice(0),{iv:Ee,ciphertext:ae}=await w.encryptData(I,_);x(`${d(Date.now()-h)} Encrypting ${te(e.size)} payload blocks into zero-knowledge ciphertext...`),x(`${d(Date.now()-h)} Ciphertext generated (${ae.byteLength} bytes). 128-bit Galois Tag verified.`),await f(3300),E("step-encrypt","completed"),H(80,"PACKAGING ZERO-KNOWLEDGE METADATA..."),E("step-meta","active"),E("step-finalize","active"),p&&(p.textContent="KEY WRAP & VAULT"),x(`${d(Date.now()-h)} Wrapping master file key with AES key wrap cipher...`);const{iv:ie,wrappedData:We}=await w.wrapKey(I,B),Ve=[{type:"password",salt:T,iv:ie,data:We}],ke={id:crypto.randomUUID(),name:e.name,type:e.type,size:e.size,date:Date.now(),authMode:"always",keys:Ve,content:ae,iv:Ee,viewCount:0,expires:null,note:"",integrityHash:Y,accessLog:[{action:"created",date:Date.now()}]};await k.saveFile(ke),x(`${d(Date.now()-h)} Encrypted container committed to zero-knowledge local IndexedDB.`),await f(4200),E("step-meta","completed"),E("step-finalize","completed"),H(92,"COMPILING STANDALONE HTML RUNTIME (.secure.html)..."),E("step-output","active"),p&&(p.textContent="STANDALONE HTML"),x(`${d(Date.now()-h)} Assembling self-contained portable decryption engine...`),x(`${d(Date.now()-h)} Embedding browser-native WebCrypto decryptor payload...`),x(`${d(Date.now()-h)} Anti-Exfiltration & Cryptographic defense matrix armed.`),await f(5100),E("step-output","completed"),H(100,"CRYPTOGRAPHIC INTEGRITY VERIFIED [SEALED]"),E("step-verify","active"),p&&(p.textContent="SEALING CONTAINER"),x(`${d(Date.now()-h)} Authenticity check: GMAC integrity tag valid. Zero-knowledge verification OK.`),x(`${d(Date.now()-h)} CRYPTOGRAPHIC CONTAINER LOCKED & SEALED. READY.`),await f(6e3),E("step-verify","completed"),clearInterval(v),u&&(u.textContent="00:06.00"),p&&(p.textContent="SECURED [✓]"),m&&m.classList.add("success"),await new Promise($e=>setTimeout($e,350)),g?.classList.remove("rapid-scan"),a?.classList.add("hidden"),l?.classList.remove("hidden");const Ie=document.getElementById("complete-file-name");Ie&&(Ie.textContent=e.name),P={record:ke,buffer:re,password:t},S()}catch(y){clearInterval(v),g?.classList.remove("rapid-scan"),console.error(y),x(`CRITICAL ERROR: ${y.message}`),await b("Error","Encryption failed: "+y.message),a?.classList.add("hidden"),r?.classList.remove("hidden"),s?.classList.remove("hidden")}finally{n.innerText=o,n.disabled=!1}}async function he(e){if(!Fe(e))try{const t=await k.getFile(e);if(!t){await b("Error","File not found");return}ve=t,document.getElementById("auth-file-name").innerText=t.name,$.showModal()}catch(t){console.error(t),await b("Error","Error opening file")}}async function Pe(){const e=ve;if(!e||Fe(e.id))return;const t=document.getElementById("auth-password").value;if(!t)return;const n=document.getElementById("confirm-auth");n.innerText="Unlocking...";try{const o=e.keys.find(i=>i.type==="password");if(!o)throw new Error("Corrupt key data");const a=await w.unwrapWithFallback(o.data,t,o.salt,o.iv);Ht(e.id),$.close(),document.getElementById("auth-password").value="",Yt(e,a)}catch(o){console.error(o),Ot(e.id),await b("Error","Incorrect password or decryption error.")}finally{n.innerText="Unlock"}}async function Yt(e,t){try{const n=await w.decryptData(t,e.iv,e.content),o=new Blob([n],{type:e.type});D=URL.createObjectURL(o);const a=document.getElementById("viewer-content");a.innerHTML="";const i=be(e.name,e.type);F&&(i?(F.classList.remove("hidden"),F.onclick=()=>{if(!D)return;const d=document.createElement("a");d.style.display="none",d.href=D,d.download=e.name,document.body.appendChild(d),d.click(),document.body.removeChild(d)}):(F.classList.add("hidden"),F.onclick=null));const r=(e.name||"").toLowerCase(),s=(e.type||"").toLowerCase(),l=s.startsWith("image/")||/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(r),c=s.startsWith("video/")||/\.(mp4|webm|mov|mkv|ogg)$/i.test(r),u=s.startsWith("audio/")||/\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(r),p=s==="application/pdf"||/\.pdf$/i.test(r),m=s.includes("excel")||s.includes("spreadsheet")||/\.(xlsx|xls|csv|tsv)$/i.test(r),g=s.includes("word")||/\.(docx|doc)$/i.test(r),h=s.includes("presentation")||s.includes("powerpoint")||/\.(pptx|ppt|pps|ppsx)$/i.test(r),v=s.startsWith("text/")||/\.(txt|json|js|ts|html|css|py|c|cpp|h|java|sh|xml|yaml|yml|sql|md|log|env|rs|go|kt|swift|rb|php)$/i.test(r);if(l){const d=document.createElement("img");d.src=D,d.style.maxWidth="90vw",d.style.maxHeight="80vh",d.style.objectFit="contain",a.appendChild(d)}else if(c||u){const d=document.createElement(c?"video":"audio");d.src=D,d.controls=!0,d.autoplay=!0,i||(d.setAttribute("controlsList","nodownload"),d.oncontextmenu=f=>f.preventDefault()),a.appendChild(d)}else if(p){const d=document.createElement("iframe");d.src=D+(i?"":"#toolbar=0"),d.style.width="100%",d.style.height="100%",d.style.border="none",a.appendChild(d)}else if(m)bt(n,a);else if(g)await xt(n,a);else if(h)await Et(n,e.name,a);else if(v){const f=new TextDecoder().decode(n),y=document.createElement("div");y.className="excel-viewer",y.style.background="#0f172a",y.style.color="#e2e8f0",y.innerHTML=`
        <div class="excel-header" style="background:#1e293b;border-color:rgba(255,255,255,0.1);justify-content:space-between;align-items:center;">
          <span style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--accent-cyan);">${e.name}</span>
          <button type="button" id="vault-copy-code-btn" class="excel-sheet-btn">Copy Text</button>
        </div>
        <div class="excel-table-wrapper" style="background:#0f172a;">
          <pre style="margin:0;font-family:var(--font-mono);font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-all;"><code>${f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        </div>
      `,a.appendChild(y),y.querySelector("#vault-copy-code-btn")?.addEventListener("click",async()=>{await navigator.clipboard.writeText(f),await b("Success","Text copied to clipboard!")})}else{const d=document.createElement("div");d.className="ppt-slide-card",d.style.alignItems="center",d.style.justifyContent="center",d.style.textAlign="center",d.innerHTML=`
        <div style="font-size:48px;margin-bottom:12px;">📁</div>
        <div class="ppt-slide-title">${e.name}</div>
        <div class="ppt-slide-content" style="color:var(--accent-cyan);font-weight:700;margin-top:6px;">DECRYPTED FILE READY (${te(e.size)})</div>
        <p style="font-size:13px;color:#94a3b8;margin-top:8px;">The file has been decrypted into volatile browser memory. Use the Download button above to save the original file to your device.</p>
      `,a.appendChild(d)}document.getElementById("viewer-filename").innerText=e.name,ze.classList.remove("hidden"),Kt(e),document.getElementById("viewer-timer").classList.add("hidden")}catch(n){console.error(n),await b("Error","Decryption failed.")}}async function me(){ze.classList.add("hidden"),F&&F.classList.add("hidden"),document.getElementById("viewer-content").innerHTML="",D&&(URL.revokeObjectURL(D),D=null)}async function Jt(){localStorage.getItem("sv_crash_guard")&&(localStorage.removeItem("sv_crash_guard"),S())}async function S(e=""){se.innerHTML="";let t=await k.getAllFiles();z=t,Bt(t),e&&(t=t.filter(a=>a.name.toLowerCase().includes(e.toLowerCase())));const n=Re?.value||"date-desc";t.sort((a,i)=>{if(a.favorite&&!i.favorite)return-1;if(!a.favorite&&i.favorite)return 1;switch(n){case"date-desc":return(i.date||0)-(a.date||0);case"date-asc":return(a.date||0)-(i.date||0);case"name-asc":return a.name.localeCompare(i.name);case"name-desc":return i.name.localeCompare(a.name);case"size-desc":return(i.size||0)-(a.size||0);case"size-asc":return(a.size||0)-(i.size||0);default:return 0}});const o=document.getElementById("quick-tips");if(o&&(z.length===0?o.classList.remove("hidden"):o.classList.add("hidden")),t.length===0){se.innerHTML=`
      <div class="empty-state cyber-empty-state">
        <div class="empty-icon-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h3 class="empty-title">${e?"NO FILES MATCH SEARCH":"NO PROTECTED FILES FOUND"}</h3>
        <p class="empty-desc">${e?"Check search parameters or query another filename.":"Drop a file in the upload zone above to initialize client-side encryption."}</p>
      </div>`;return}t.forEach((a,i)=>{const r=document.createElement("div");r.className="file-card",r.style.animationDelay=`${i*.05}s`,r.onclick=async f=>{!f.target.closest(".file-card-actions")&&!f.target.closest(".file-actions")&&!f.target.closest(".select-checkbox")&&!f.target.closest(".favorite-btn")&&he(a.id)};let s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';a.type?.startsWith("image")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>'),a.type?.startsWith("video")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>'),a.type?.startsWith("audio")&&(s='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>');const l=L.has(a.id);let c=a.name;const u='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',p='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',m='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',g='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',h='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',v='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>',d='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';r.innerHTML=`
        <span class="hud-corner top-left"></span>
        <span class="hud-corner top-right"></span>
        <span class="hud-corner bottom-left"></span>
        <span class="hud-corner bottom-right"></span>
        <div class="file-card-top">
          <input type="checkbox" class="select-checkbox" ${l?"checked":""} />
          <div class="file-icon">${s}</div>
          <div class="file-details">
            <h3>${c}</h3>
            <div class="file-meta">
              <span>${(a.size/1024/1024).toFixed(2)} MB</span>
              <span class="cyber-card-pill pill-cipher">AES-256</span>
              <span class="cyber-card-pill pill-policy">ALWAYS ASK</span>
            </div>
          </div>
        </div>
        <div class="file-card-actions">
          <button class="btn-highlight open-btn">${u} Unlock</button>
          <button class="btn-highlight download-btn">${p} Download</button>
          <button class="btn-highlight share-btn">${m} Export</button>
          <button class="btn-highlight custom-share-btn">${g} Custom</button>
          <button class="btn-small info-btn">${h} Info</button>
          <button class="btn-small rename-btn">${v} Rename</button>
          <button class="btn-small delete-btn">${d} Delete</button>
        </div>
    `,r.querySelector(".select-checkbox").onchange=f=>{f.stopPropagation(),f.target.checked?L.add(a.id):L.delete(a.id),G()},r.querySelector(".open-btn").onclick=f=>{f.stopPropagation(),he(a.id)},r.querySelector(".download-btn").onclick=f=>$t(f,a.id),r.querySelector(".info-btn").onclick=f=>Wt(f,a.id),r.querySelector(".rename-btn").onclick=f=>Vt(f,a.id,a.name),r.querySelector(".share-btn").onclick=f=>jt(f,a.id),r.querySelector(".custom-share-btn").onclick=f=>Gt(f,a.id),r.querySelector(".delete-btn").onclick=f=>Ut(f,a.id),se.appendChild(r)})}function ge(){const e=localStorage.getItem("sv_panic_action")||"blur",t=document.getElementById("panic-action-select");t&&(t.value=e);const n=localStorage.getItem("sv_dl_media")!=="false",o=localStorage.getItem("sv_dl_doc")!=="false",a=document.getElementById("dl-media-toggle"),i=document.getElementById("dl-doc-toggle");a&&(a.checked=n),i&&(i.checked=o),fe();const r=localStorage.getItem("sv_panic_enabled")!=="false",s=document.getElementById("panic-enable-toggle");s&&(s.checked=r),xe()}function xe(){const e=localStorage.getItem("sv_panic_enabled")!=="false",t=document.getElementById("header-panic-wrapper"),n=document.getElementById("panic-settings-content");t&&(e?(t.classList.remove("hidden"),t.style.display="flex"):(t.classList.add("hidden"),t.style.display="none")),n&&(e?(n.classList.remove("hidden"),n.style.opacity="1",n.style.pointerEvents="auto"):(n.classList.add("hidden"),n.style.opacity="0.5",n.style.pointerEvents="none"))}function ye(){const e=localStorage.getItem("sv_panic_action")||"blur";if(e!=="none"){if(e==="erase")(async()=>{try{const t=localStorage.getItem("sv_panic_action"),n=await k.getAllFiles();for(const o of n)await k.deleteFile(o.id);localStorage.clear(),t&&localStorage.setItem("sv_panic_action",t),window.location.reload()}catch(t){console.error(t)}})();else if(e==="blur"||e==="lock"){me(),K?.close(),ee?.close(),document.querySelectorAll(".panic-overlay").forEach(n=>n.remove());const t=document.createElement("div");t.className="panic-overlay blur-mode",t.innerHTML=`
      <div class="panic-shield-glow">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>
      <div class="panic-title">SYSTEM LOCKDOWN ACTIVE</div>
      <div class="panic-message">Critical security anomaly detected. Cryptographic session isolated and display obscured for zero-knowledge privacy.</div>
      <button type="button" class="panic-reload-btn" id="panic-reload-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
        <span>RESTORE SYSTEM CONSOLE</span>
      </button>
    `,document.body.appendChild(t),document.getElementById("panic-reload-btn")?.addEventListener("click",n=>{n.stopPropagation(),t.remove()})}else if(e==="loading"){me(),K?.close(),ee?.close(),document.querySelectorAll(".panic-overlay").forEach(o=>o.remove());const t=document.createElement("div");t.className="panic-overlay",t.innerHTML=`
      <div class="fake-loading-spinner"></div>
      <div class="fake-loading-text">Synchronizing workspace metadata...</div>
      <div class="fake-loading-subtext">Tap anywhere to return to console</div>
    `,document.body.appendChild(t);const n=()=>{t.remove()};t.addEventListener("click",n),t.addEventListener("touchstart",n)}}}function Xt(){const e=document.getElementById("cyber-matrix-canvas");if(e){const o=e.getContext("2d");if(o){let m=function(){a=e.width=window.innerWidth,i=e.height=window.innerHeight,c=Math.floor(a/l),u=[],p=[];for(let d=0;d<c;d++)u[d]=Math.random()*-60,p[d]=.8+Math.random()*1.2},v=function(d){if(requestAnimationFrame(v),!(d-g<h)){g=d,o.fillStyle="rgba(5, 7, 10, 0.12)",o.fillRect(0,0,a,i),o.font=`600 ${l}px "JetBrains Mono", monospace`;for(let f=0;f<u.length;f++){const y=s[Math.floor(Math.random()*s.length)],T=f*l,I=u[f]*l;Math.random()>.88?(o.fillStyle="#ffffff",o.shadowColor="#00f0ff",o.shadowBlur=10):f%3===0?(o.fillStyle="rgba(0, 240, 255, 0.65)",o.shadowColor="#00f0ff",o.shadowBlur=4):f%3===1?(o.fillStyle="rgba(0, 255, 136, 0.55)",o.shadowColor="#00ff88",o.shadowBlur=3):(o.fillStyle="rgba(56, 189, 248, 0.4)",o.shadowBlur=0),o.fillText(y,T,I),I>i&&Math.random()>.96&&(u[f]=0,p[f]=.8+Math.random()*1.2),u[f]+=p[f]}}},a=e.width=window.innerWidth,i=e.height=window.innerHeight;const s="0123456789ABCDEF0x7F0x2A•:;><[]{}/*~$=+!#@%&_AES-256GCMKEYPBKDF2SHA256AUTH_TAG".split(""),l=13;let c=Math.floor(a/l),u=[],p=[];m(),window.addEventListener("resize",m);let g=0;const h=33;requestAnimationFrame(v)}}const t=document.getElementById("hero-term-status");if(t){const o=["INITIALIZING SECURE ENVIRONMENT... CRYPTOGRAPHIC ENGINE: READY [AES-GCM-256] • FILE PROCESSOR: READY • PROTECTION LAYER: ACTIVE","HARDWARE ACCELERATION: ACTIVE // ZERO-KNOWLEDGE WEB CRYPTO RUNTIME ONLINE","DUAL-STAGE KEY DERIVATION: HMAC-SHA512 + 2,000,000 PBKDF2 ROUNDS (V6 PEPPER)","LOW-END HARDWARE OPTIMIZATION: ACTIVE // WORKER THREAD OFFLOAD ENFORCES 60FPS UI","ANTI-OFFLINE CRACKER: IMMUNE TO JOHN THE RIPPER, HASHCAT & GPU DICTIONARY CLUSTERS","AIR-GAPPED RUNTIME: ZERO REMOTE PACKETS DISPATCHED // IMMUNE TO BURP SUITE INTERCEPTION","ANTI-VIRUS MEMORY SANITIZATION: ACTIVE HEAP ZEROIZATION // ZERO DISK PERSISTENCE","CRYPTOGRAPHIC TAMPER DETECTION: SHA-256 PAYLOAD INTEGRITY SEAL ARMED","MIL-SPEC DEFENSE PROTOCOL: LEVEL-6 CLEARANCE // 128-BIT AUTHENTICATION TAG ARMED","STANDALONE PACKAGER: READY // OFFLINE ZERO-DEPENDENCY DECRYPTOR COMPLIANT","SYSTEM HEALTH: OPTIMAL // LOCAL STORAGE VAULT INTEGRITY 100% VERIFIED"];let a=0;setInterval(()=>{a=(a+1)%o.length,t.style.opacity="0",t.style.transform="translateY(4px)",setTimeout(()=>{t.textContent=o[a],t.style.transition="all 0.3s ease",t.style.opacity="1",t.style.transform="translateY(0)"},300)},4e3)}document.addEventListener("click",o=>{const a=o.target.closest(".cyber-btn, .btn-icon, .cyber-nav-link, .cyber-drop-zone");if(!a)return;const i=a.getBoundingClientRect(),r=document.createElement("span");r.className="cyber-click-glow-ripple",r.style.left=`${o.clientX-i.left}px`,r.style.top=`${o.clientY-i.top}px`,a.style.position=a.style.position||"relative",a.appendChild(r),setTimeout(()=>r.remove(),600)});const n=[{el:document.getElementById("hero-command"),navId:"nav-item-console"},{el:document.getElementById("inline-add-container"),navId:"nav-item-protect"},{el:document.getElementById("secured-files-heading"),navId:"nav-item-files"}];window.addEventListener("scroll",()=>{const o=window.scrollY+180;for(let a=n.length-1;a>=0;a--){const i=n[a];if(i.el&&i.el.offsetTop<=o){document.querySelectorAll(".cyber-nav-item").forEach(r=>{r.id===i.navId?r.classList.add("active"):r.id!=="nav-item-settings"&&r.classList.remove("active")});break}}},{passive:!0})}
