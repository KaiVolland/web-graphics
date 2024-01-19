var Ue=Object.defineProperty;var ze=(t,e,n)=>e in t?Ue(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var w=(t,e,n)=>(ze(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const s of l.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(i){if(i.ep)return;i.ep=!0;const l=n(i);fetch(i.href,l)}})();function v(){}function ge(t,e){for(const n in e)t[n]=e[n];return t}function Pe(t){return t()}function ve(){return Object.create(null)}function I(t){t.forEach(Pe)}function se(t){return typeof t=="function"}function F(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function Ve(t){return Object.keys(t).length===0}function Ce(t,...e){if(t==null){for(const o of e)o(void 0);return v}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function J(t,e,n){t.$$.on_destroy.push(Ce(e,n))}function qe(t,e,n,o){if(t){const i=Re(t,e,n,o);return t[0](i)}}function Re(t,e,n,o){return t[1]&&o?ge(n.ctx.slice(),t[1](o(e))):n.ctx}function Me(t,e,n,o){if(t[2]&&o){const i=t[2](o(n));if(e.dirty===void 0)return i;if(typeof i=="object"){const l=[],s=Math.max(e.dirty.length,i.length);for(let r=0;r<s;r+=1)l[r]=e.dirty[r]|i[r];return l}return e.dirty|i}return e.dirty}function He(t,e,n,o,i,l){if(i){const s=Re(e,n,o,l);t.p(s,i)}}function Ye(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let o=0;o<n;o++)e[o]=-1;return e}return-1}function Xe(t){return t&&se(t.destroy)?t.destroy:v}function R(t,e){t.appendChild(e)}function S(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function E(t){return document.createElement(t)}function W(t){return document.createTextNode(t)}function j(){return W(" ")}function pe(){return W("")}function H(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function _(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function X(t){return t===""?null:+t}function We(t){return Array.from(t.childNodes)}function G(t,e){t.value=e??""}function ye(t,e,n){t.classList.toggle(e,!!n)}function Ke(t,e,{bubbles:n=!1,cancelable:o=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:o})}function ne(t,e){return new t(e)}let Q;function K(t){Q=t}function ae(){if(!Q)throw new Error("Function called outside component initialization");return Q}function Te(t){ae().$$.on_mount.push(t)}function Je(t){ae().$$.after_update.push(t)}function Qe(t){ae().$$.on_destroy.push(t)}function Ze(){const t=ae();return(e,n,{cancelable:o=!1}={})=>{const i=t.$$.callbacks[e];if(i){const l=Ke(e,n,{cancelable:o});return i.slice().forEach(s=>{s.call(t,l)}),!l.defaultPrevented}return!0}}function Se(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(o=>o.call(this,e))}const M=[],re=[];let Y=[];const $e=[],xe=Promise.resolve();let de=!1;function Oe(){de||(de=!0,xe.then(je))}function et(){return Oe(),xe}function _e(t){Y.push(t)}const ue=new Set;let V=0;function je(){if(V!==0)return;const t=Q;do{try{for(;V<M.length;){const e=M[V];V++,K(e),tt(e.$$)}}catch(e){throw M.length=0,V=0,e}for(K(null),M.length=0,V=0;re.length;)re.pop()();for(let e=0;e<Y.length;e+=1){const n=Y[e];ue.has(n)||(ue.add(n),n())}Y.length=0}while(M.length);for(;$e.length;)$e.pop()();de=!1,ue.clear(),K(t)}function tt(t){if(t.fragment!==null){t.update(),I(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_e)}}function nt(t){const e=[],n=[];Y.forEach(o=>t.indexOf(o)===-1?e.push(o):n.push(o)),n.forEach(o=>o()),Y=e}const Z=new Set;let z;function me(){z={r:0,c:[],p:z}}function be(){z.r||I(z.c),z=z.p}function A(t,e){t&&t.i&&(Z.delete(t),t.i(e))}function k(t,e,n,o){if(t&&t.o){if(Z.has(t))return;Z.add(t),z.c.push(()=>{Z.delete(t),o&&(n&&t.d(1),o())}),t.o(e)}else o&&o()}function oe(t,e){const n={},o={},i={$$scope:1};let l=t.length;for(;l--;){const s=t[l],r=e[l];if(r){for(const a in s)a in r||(o[a]=1);for(const a in r)i[a]||(n[a]=r[a],i[a]=1);t[l]=r}else for(const a in s)i[a]=1}for(const s in o)s in n||(n[s]=void 0);return n}function ie(t){return typeof t=="object"&&t!==null?t:{}}function O(t){t&&t.c()}function T(t,e,n){const{fragment:o,after_update:i}=t.$$;o&&o.m(e,n),_e(()=>{const l=t.$$.on_mount.map(Pe).filter(se);t.$$.on_destroy?t.$$.on_destroy.push(...l):I(l),t.$$.on_mount=[]}),i.forEach(_e)}function x(t,e){const n=t.$$;n.fragment!==null&&(nt(n.after_update),I(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function rt(t,e){t.$$.dirty[0]===-1&&(M.push(t),Oe(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function N(t,e,n,o,i,l,s=null,r=[-1]){const a=Q;K(t);const c=t.$$={fragment:null,ctx:[],props:l,update:v,not_equal:i,bound:ve(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:ve(),dirty:r,skip_bound:!1,root:e.target||a.$$.root};s&&s(c.root);let u=!1;if(c.ctx=n?n(t,e.props||{},(g,d,...f)=>{const b=f.length?f[0]:d;return c.ctx&&i(c.ctx[g],c.ctx[g]=b)&&(!c.skip_bound&&c.bound[g]&&c.bound[g](b),u&&rt(t,g)),d}):[],c.update(),u=!0,I(c.before_update),c.fragment=o?o(c.ctx):!1,e.target){if(e.hydrate){const g=We(e.target);c.fragment&&c.fragment.l(g),g.forEach(y)}else c.fragment&&c.fragment.c();e.intro&&A(t.$$.fragment),T(t,e.target,e.anchor),je()}K(a)}class B{constructor(){w(this,"$$");w(this,"$$set")}$destroy(){x(this,1),this.$destroy=v}$on(e,n){if(!se(n))return v;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const i=o.indexOf(n);i!==-1&&o.splice(i,1)}}$set(e){this.$$set&&!Ve(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const ot="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ot);const q=[];function Fe(t,e){return{subscribe:le(t,e).subscribe}}function le(t,e=v){let n;const o=new Set;function i(r){if(F(t,r)&&(t=r,n)){const a=!q.length;for(const c of o)c[1](),q.push(c,t);if(a){for(let c=0;c<q.length;c+=2)q[c][0](q[c+1]);q.length=0}}}function l(r){i(r(t))}function s(r,a=v){const c=[r,a];return o.add(c),o.size===1&&(n=e(i,l)||v),r(t),()=>{o.delete(c),o.size===0&&n&&(n(),n=null)}}return{set:i,update:l,subscribe:s}}function De(t,e,n){const o=!Array.isArray(t),i=o?[t]:t;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const l=e.length<2;return Fe(n,(s,r)=>{let a=!1;const c=[];let u=0,g=v;const d=()=>{if(u)return;g();const b=e(o?c[0]:c,s,r);l?s(b):g=se(b)?b:v},f=i.map((b,P)=>Ce(b,L=>{c[P]=L,u&=~(1<<P),a&&d()},()=>{u|=1<<P}));return a=!0,d(),function(){I(f),g(),a=!1}})}function it(t,e){if(t instanceof RegExp)return{keys:!1,pattern:t};var n,o,i,l,s=[],r="",a=t.split("/");for(a[0]||a.shift();i=a.shift();)n=i[0],n==="*"?(s.push("wild"),r+="/(.*)"):n===":"?(o=i.indexOf("?",1),l=i.indexOf(".",1),s.push(i.substring(1,~o?o:~l?l:i.length)),r+=~o&&!~l?"(?:/([^/]+?))?":"/([^/]+?)",~l&&(r+=(~o?"?":"")+"\\"+i.substring(l))):r+="/"+i;return{keys:s,pattern:new RegExp("^"+r+(e?"(?=$|/)":"/?$"),"i")}}function st(t){let e,n,o;const i=[t[2]];var l=t[0];function s(r,a){let c={};if(a!==void 0&&a&4)c=oe(i,[ie(r[2])]);else for(let u=0;u<i.length;u+=1)c=ge(c,i[u]);return{props:c}}return l&&(e=ne(l,s(t)),e.$on("routeEvent",t[7])),{c(){e&&O(e.$$.fragment),n=pe()},m(r,a){e&&T(e,r,a),S(r,n,a),o=!0},p(r,a){if(a&1&&l!==(l=r[0])){if(e){me();const c=e;k(c.$$.fragment,1,0,()=>{x(c,1)}),be()}l?(e=ne(l,s(r,a)),e.$on("routeEvent",r[7]),O(e.$$.fragment),A(e.$$.fragment,1),T(e,n.parentNode,n)):e=null}else if(l){const c=a&4?oe(i,[ie(r[2])]):{};e.$set(c)}},i(r){o||(e&&A(e.$$.fragment,r),o=!0)},o(r){e&&k(e.$$.fragment,r),o=!1},d(r){r&&y(n),e&&x(e,r)}}}function at(t){let e,n,o;const i=[{params:t[1]},t[2]];var l=t[0];function s(r,a){let c={};if(a!==void 0&&a&6)c=oe(i,[a&2&&{params:r[1]},a&4&&ie(r[2])]);else for(let u=0;u<i.length;u+=1)c=ge(c,i[u]);return{props:c}}return l&&(e=ne(l,s(t)),e.$on("routeEvent",t[6])),{c(){e&&O(e.$$.fragment),n=pe()},m(r,a){e&&T(e,r,a),S(r,n,a),o=!0},p(r,a){if(a&1&&l!==(l=r[0])){if(e){me();const c=e;k(c.$$.fragment,1,0,()=>{x(c,1)}),be()}l?(e=ne(l,s(r,a)),e.$on("routeEvent",r[6]),O(e.$$.fragment),A(e.$$.fragment,1),T(e,n.parentNode,n)):e=null}else if(l){const c=a&6?oe(i,[a&2&&{params:r[1]},a&4&&ie(r[2])]):{};e.$set(c)}},i(r){o||(e&&A(e.$$.fragment,r),o=!0)},o(r){e&&k(e.$$.fragment,r),o=!1},d(r){r&&y(n),e&&x(e,r)}}}function lt(t){let e,n,o,i;const l=[at,st],s=[];function r(a,c){return a[1]?0:1}return e=r(t),n=s[e]=l[e](t),{c(){n.c(),o=pe()},m(a,c){s[e].m(a,c),S(a,o,c),i=!0},p(a,[c]){let u=e;e=r(a),e===u?s[e].p(a,c):(me(),k(s[u],1,1,()=>{s[u]=null}),be(),n=s[e],n?n.p(a,c):(n=s[e]=l[e](a),n.c()),A(n,1),n.m(o.parentNode,o))},i(a){i||(A(n),i=!0)},o(a){k(n),i=!1},d(a){a&&y(o),s[e].d(a)}}}function Le(){const t=window.location.href.indexOf("#/");let e=t>-1?window.location.href.substr(t+1):"/";const n=e.indexOf("?");let o="";return n>-1&&(o=e.substr(n+1),e=e.substr(0,n)),{location:e,querystring:o}}const we=Fe(null,function(e){e(Le());const n=()=>{e(Le())};return window.addEventListener("hashchange",n,!1),function(){window.removeEventListener("hashchange",n,!1)}}),ct=De(we,t=>t.location);De(we,t=>t.querystring);const Ee=le(void 0);function ut(t,e){if(e=ke(e),!t||!t.tagName||t.tagName.toLowerCase()!="a")throw Error('Action "link" can only be used with <a> tags');return Ae(t,e),{update(n){n=ke(n),Ae(t,n)}}}function ft(t){t?window.scrollTo(t.__svelte_spa_router_scrollX,t.__svelte_spa_router_scrollY):window.scrollTo(0,0)}function Ae(t,e){let n=e.href||t.getAttribute("href");if(n&&n.charAt(0)=="/")n="#"+n;else if(!n||n.length<2||n.slice(0,2)!="#/")throw Error('Invalid value for "href" attribute: '+n);t.setAttribute("href",n),t.addEventListener("click",o=>{o.preventDefault(),e.disabled||ht(o.currentTarget.getAttribute("href"))})}function ke(t){return t&&typeof t=="string"?{href:t}:t||{}}function ht(t){history.replaceState({...history.state,__svelte_spa_router_scrollX:window.scrollX,__svelte_spa_router_scrollY:window.scrollY},void 0),window.location.hash=t}function dt(t,e,n){let{routes:o={}}=e,{prefix:i=""}=e,{restoreScrollState:l=!1}=e;class s{constructor(h,m){if(!m||typeof m!="function"&&(typeof m!="object"||m._sveltesparouter!==!0))throw Error("Invalid component object");if(!h||typeof h=="string"&&(h.length<1||h.charAt(0)!="/"&&h.charAt(0)!="*")||typeof h=="object"&&!(h instanceof RegExp))throw Error('Invalid value for "path" argument - strings must start with / or *');const{pattern:C,keys:$}=it(h);this.path=h,typeof m=="object"&&m._sveltesparouter===!0?(this.component=m.component,this.conditions=m.conditions||[],this.userData=m.userData,this.props=m.props||{}):(this.component=()=>Promise.resolve(m),this.conditions=[],this.props={}),this._pattern=C,this._keys=$}match(h){if(i){if(typeof i=="string")if(h.startsWith(i))h=h.substr(i.length)||"/";else return null;else if(i instanceof RegExp){const D=h.match(i);if(D&&D[0])h=h.substr(D[0].length)||"/";else return null}}const m=this._pattern.exec(h);if(m===null)return null;if(this._keys===!1)return m;const C={};let $=0;for(;$<this._keys.length;){try{C[this._keys[$]]=decodeURIComponent(m[$+1]||"")||null}catch{C[this._keys[$]]=null}$++}return C}async checkConditions(h){for(let m=0;m<this.conditions.length;m++)if(!await this.conditions[m](h))return!1;return!0}}const r=[];o instanceof Map?o.forEach((p,h)=>{r.push(new s(h,p))}):Object.keys(o).forEach(p=>{r.push(new s(p,o[p]))});let a=null,c=null,u={};const g=Ze();async function d(p,h){await et(),g(p,h)}let f=null,b=null;l&&(b=p=>{p.state&&(p.state.__svelte_spa_router_scrollY||p.state.__svelte_spa_router_scrollX)?f=p.state:f=null},window.addEventListener("popstate",b),Je(()=>{ft(f)}));let P=null,L=null;const U=we.subscribe(async p=>{P=p;let h=0;for(;h<r.length;){const m=r[h].match(p.location);if(!m){h++;continue}const C={route:r[h].path,location:p.location,querystring:p.querystring,userData:r[h].userData,params:m&&typeof m=="object"&&Object.keys(m).length?m:null};if(!await r[h].checkConditions(C)){n(0,a=null),L=null,d("conditionsFailed",C);return}d("routeLoading",Object.assign({},C));const $=r[h].component;if(L!=$){$.loading?(n(0,a=$.loading),L=$,n(1,c=$.loadingParams),n(2,u={}),d("routeLoaded",Object.assign({},C,{component:a,name:a.name,params:c}))):(n(0,a=null),L=null);const D=await $();if(p!=P)return;n(0,a=D&&D.default||D),L=$}m&&typeof m=="object"&&Object.keys(m).length?n(1,c=m):n(1,c=null),n(2,u=r[h].props),d("routeLoaded",Object.assign({},C,{component:a,name:a.name,params:c})).then(()=>{Ee.set(c)});return}n(0,a=null),L=null,Ee.set(void 0)});Qe(()=>{U(),b&&window.removeEventListener("popstate",b)});function ce(p){Se.call(this,t,p)}function Be(p){Se.call(this,t,p)}return t.$$set=p=>{"routes"in p&&n(3,o=p.routes),"prefix"in p&&n(4,i=p.prefix),"restoreScrollState"in p&&n(5,l=p.restoreScrollState)},t.$$.update=()=>{t.$$.dirty&32&&(history.scrollRestoration=l?"manual":"auto")},[a,c,u,o,i,l,ce,Be]}class _t extends B{constructor(e){super(),N(this,e,dt,lt,F,{routes:3,prefix:4,restoreScrollState:5})}}function gt(t){let e;return{c(){e=W("Nothing to see here. Go to Engine or Shader Art.")},m(n,o){S(n,e,o)},p:v,i:v,o:v,d(n){n&&y(e)}}}class pt extends B{constructor(e){super(),N(this,e,null,gt,F,{})}}const mt=`#version 300 es

layout(location = 0) in vec2 aPosition;
out vec2 fragCoord;

void main()
{
    fragCoord = aPosition;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,bt=`#version 300 es

precision mediump float;

in vec2 fragCoord;
uniform float uTime;
uniform float uDensity;

out vec4 fragColor;

//https://iquilezles.org/articles/palettes/
vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);

    return a + b*cos( 6.28318*(c*t+d) );
}

void main()
{
    vec2 uv = fragCoord;
    float d = length(uv);

    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);

    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * uDensity / 10.0) - 0.5;

        float d = length(uv) * exp(-length(uv0));

        vec3 col = palette(length(uv0) + i*.4 + uTime*.4);

        d = sin(d * 8. + uTime)/8.;
        d = abs(d);

        d = pow(0.01 / d, 1.2);

        finalColor += col * d;
    }

    fragColor = vec4(finalColor, 1.0);
}
`,ee=le(15),te=le(1e3);function wt(t){let e,n,o,i,l;return{c(){e=E("input"),n=j(),o=E("input"),_(e,"type","number"),_(e,"min","100"),_(e,"max","3000"),_(o,"id",t[0]),_(o,"type","range"),_(o,"min","100"),_(o,"max","3000")},m(s,r){S(s,e,r),G(e,t[1]),S(s,n,r),S(s,o,r),G(o,t[1]),i||(l=[H(e,"input",t[2]),H(o,"change",t[3]),H(o,"input",t[3])],i=!0)},p(s,[r]){r&2&&X(e.value)!==s[1]&&G(e,s[1]),r&1&&_(o,"id",s[0]),r&2&&G(o,s[1])},i:v,o:v,d(s){s&&(y(e),y(n),y(o)),i=!1,I(l)}}}function vt(t,e,n){let o;J(t,te,r=>n(1,o=r));let{id:i="speed-slider"}=e;function l(){o=X(this.value),te.set(o)}function s(){o=X(this.value),te.set(o)}return t.$$set=r=>{"id"in r&&n(0,i=r.id)},[i,o,l,s]}class yt extends B{constructor(e){super(),N(this,e,vt,wt,F,{id:0})}}function St(t){let e,n,o,i,l;return{c(){e=E("input"),n=j(),o=E("input"),_(e,"type","number"),_(e,"min","1"),_(e,"max","30"),_(o,"id",t[0]),_(o,"type","range"),_(o,"min","1"),_(o,"max","30")},m(s,r){S(s,e,r),G(e,t[1]),S(s,n,r),S(s,o,r),G(o,t[1]),i||(l=[H(e,"input",t[2]),H(o,"change",t[3]),H(o,"input",t[3])],i=!0)},p(s,[r]){r&2&&X(e.value)!==s[1]&&G(e,s[1]),r&1&&_(o,"id",s[0]),r&2&&G(o,s[1])},i:v,o:v,d(s){s&&(y(e),y(n),y(o)),i=!1,I(l)}}}function $t(t,e,n){let o;J(t,ee,r=>n(1,o=r));let{id:i="density-slider"}=e;function l(){o=X(this.value),ee.set(o)}function s(){o=X(this.value),ee.set(o)}return t.$$set=r=>{"id"in r&&n(0,i=r.id)},[i,o,l,s]}class Lt extends B{constructor(e){super(),N(this,e,$t,St,F,{id:0})}}function Et(t){let e,n,o,i,l,s,r,a,c,u,g;return i=new yt({props:{id:"speed-slider"}}),a=new Lt({props:{id:"density-slider"}}),{c(){e=E("div"),n=E("label"),n.textContent="Speed",o=j(),O(i.$$.fragment),l=j(),s=E("label"),s.textContent="Density",r=j(),O(a.$$.fragment),c=j(),u=E("canvas"),_(n,"for","speed-slider"),_(s,"for","speed-slider"),_(e,"class","toolbar"),_(u,"width","1024"),_(u,"height","1024")},m(d,f){S(d,e,f),R(e,n),R(e,o),T(i,e,null),R(e,l),R(e,s),R(e,r),T(a,e,null),S(d,c,f),S(d,u,f),t[1](u),g=!0},p:v,i(d){g||(A(i.$$.fragment,d),A(a.$$.fragment,d),g=!0)},o(d){k(i.$$.fragment,d),k(a.$$.fragment,d),g=!1},d(d){d&&(y(e),y(c),y(u)),x(i),x(a),t[1](null)}}}function At(t,e,n){let o,i;J(t,te,r=>n(2,o=r)),J(t,ee,r=>n(3,i=r));let l;Te(()=>{const r=l.getContext("webgl2");if(!r)return;const a=r.createProgram();if(!a)return;const c=r.createShader(r.VERTEX_SHADER);if(!c)return;r.shaderSource(c,mt),r.compileShader(c),r.attachShader(a,c);const u=r.createShader(r.FRAGMENT_SHADER);if(!u)return;r.shaderSource(u,bt),r.compileShader(u),r.attachShader(a,u),r.linkProgram(a),r.getProgramParameter(a,r.LINK_STATUS)||(console.log(r.getShaderInfoLog(c)),console.log(r.getShaderInfoLog(u)));const g=new Float32Array([-1,-1,1,-1,-1,1,1,-1,-1,1,1,1]),d=r.getUniformLocation(a,"uResolution");r.uniform2f(d,1024,1024);const f=r.getUniformLocation(a,"uTime");r.uniform1f(f,0);const b=r.getUniformLocation(a,"uDensity");r.uniform1f(b,15);const P=r.createBuffer();r.bindBuffer(r.ARRAY_BUFFER,P),r.bufferData(r.ARRAY_BUFFER,g,r.STATIC_DRAW);const L=0;r.enableVertexAttribArray(L),r.vertexAttribPointer(L,2,r.FLOAT,!1,2*4,0);const U=(ce=0)=>{r.clearColor(0,0,0,1),r.clear(r.COLOR_BUFFER_BIT),r.uniform1f(b,i),r.uniform1f(f,ce/1e6*o),r.useProgram(a),r.drawArrays(r.TRIANGLES,0,6),requestAnimationFrame(U)};U()});function s(r){re[r?"unshift":"push"](()=>{l=r,n(0,l)})}return[l,s]}class kt extends B{constructor(e){super(),N(this,e,At,Et,F,{})}}function Pt(t){let e,n,o,i;const l=t[3].default,s=qe(l,t,t[2],null);return{c(){e=E("a"),s&&s.c(),_(e,"href",t[0]),_(e,"class","svelte-1dzzut9"),ye(e,"active",t[1]===t[0])},m(r,a){S(r,e,a),s&&s.m(e,null),n=!0,o||(i=Xe(ut.call(null,e)),o=!0)},p(r,[a]){s&&s.p&&(!n||a&4)&&He(s,l,r,r[2],n?Me(l,r[2],a,null):Ye(r[2]),null),(!n||a&1)&&_(e,"href",r[0]),(!n||a&3)&&ye(e,"active",r[1]===r[0])},i(r){n||(A(s,r),n=!0)},o(r){k(s,r),n=!1},d(r){r&&y(e),s&&s.d(r),o=!1,i()}}}function Ct(t,e,n){let o;J(t,ct,r=>n(1,o=r));let{$$slots:i={},$$scope:l}=e,{href:s=""}=e;return t.$$set=r=>{"href"in r&&n(0,s=r.href),"$$scope"in r&&n(2,l=r.$$scope)},[s,o,l,i]}class fe extends B{constructor(e){super(),N(this,e,Ct,Pt,F,{href:0})}}const Rt=`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// translation to add to position
uniform vec2 u_translation;

// all shaders have a main function
void main() {
  // Add in the translation
  vec2 position = a_position + u_translation;

  // convert the position from pixels to 0.0 to 1.0
  vec2 zeroToOne = position / u_resolution;

  // convert from 0->1 to 0->2
  vec2 zeroToTwo = zeroToOne * 2.0;

  // convert from 0->2 to -1->+1 (clipspace)
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`,Tt=`#version 300 es

precision highp float;

uniform vec4 u_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = u_color;
}
`;class xt{constructor(e){w(this,"_gl");w(this,"_width");w(this,"_height");this._width=e.width,this._height=e.height;const n=e.getContext("webgl2");if(!n)throw`Could not get webgl2 context of canvas element: ${e}`;this._gl=n}linkProgram(e){this._gl.linkProgram(e.webGLProgram),this._gl.getProgramParameter(e.webGLProgram,this._gl.LINK_STATUS)||(e.vertexShader&&console.log(this._gl.getShaderInfoLog(e.vertexShader.webGLShader)),e.fragmentShader&&console.log(this._gl.getShaderInfoLog(e.fragmentShader.webGLShader)))}get width(){return this._width}get height(){return this._height}get gl(){return this._gl}}class Ge{constructor({gl:e,source:n}){w(this,"_gl");w(this,"_webGLShader");w(this,"source",null);this._gl=e,this._webGLShader=this.create(),n&&(this._gl.shaderSource(this._webGLShader,n),this._gl.compileShader(this._webGLShader))}get webGLShader(){return this._webGLShader}}class Ie extends Ge{constructor({gl:e,source:n}){super({gl:e,source:n})}create(){const e=this._gl.createShader(this._gl.VERTEX_SHADER);if(!e)throw"Could not create VertexShader";return e}updateSource(e){}}class Ne extends Ge{constructor({gl:e,source:n}){super({gl:e,source:n})}create(){const e=this._gl.createShader(this._gl.FRAGMENT_SHADER);if(!e)throw"Could not create FragmentShader";return e}updateSource(e){}}class Ot{constructor(e){w(this,"_gl");w(this,"_webGLProgram");w(this,"_vertexShader",null);w(this,"_fragmentShader",null);this._gl=e;const n=e.createProgram();if(!n)throw"Could not create program";this._webGLProgram=n}attachShader(e){this._gl.attachShader(this._webGLProgram,e.webGLShader),e instanceof Ie&&(this._vertexShader=e),e instanceof Ne&&(this._fragmentShader=e)}getUniformLocation(e){return this._gl.getUniformLocation(this._webGLProgram,e)}get webGLProgram(){return this._webGLProgram}get vertexShader(){return this._vertexShader}get fragmentShader(){return this._fragmentShader}}class jt{constructor({gl:e,name:n,program:o}){w(this,"_gl");w(this,"_buffer");w(this,"_name");w(this,"_program",null);w(this,"_vao",null);this._gl=e,this._name=n,o&&(this._program=o);const i=e.createBuffer();if(!i)throw"Could not create buffer";this._buffer=i}get name(){return this._name}get buffer(){return this._buffer}get vao(){if(!this._vao)throw"Could not get vao of attribute. Was the data set already?";return this._vao}getLocation(){if(!this._program)throw"Could not get location of attribute. No program attached.";return this._gl.getAttribLocation(this._program.webGLProgram,this._name)}setBufferData(e){this._vao=this._gl.createVertexArray(),this._gl.bindVertexArray(this._vao),this._gl.enableVertexAttribArray(this.getLocation()),this._gl.bindBuffer(this._gl.ARRAY_BUFFER,this._buffer),this._gl.bufferData(this._gl.ARRAY_BUFFER,e,this._gl.STATIC_DRAW);var n=2,o=this._gl.FLOAT,i=!1,l=0,s=0;this._gl.vertexAttribPointer(this.getLocation(),n,o,i,l,s)}}class he{constructor({gl:e,type:n,name:o,program:i,value:l}){w(this,"_gl");w(this,"_value",null);w(this,"_type");w(this,"_name");w(this,"_program",null);this._gl=e,this._name=o,this._type=n,i&&(this._program=i),l&&this.setValue(l)}setValue(e){if(this._value=e,Array.isArray(e))switch(this._type){case"2i":case"2f":this._gl.uniform2f(this.getLocation(),e[0],e[1]);break;case"3f":case"3i":this._gl.uniform3f(this.getLocation(),e[0],e[1],e[2]);break;case"4f":case"4i":this._gl.uniform4f(this.getLocation(),e[0],e[1],e[2],e[3]);break;case"2fv":this._gl.uniform2fv(this.getLocation(),e);break;case"3fv":this._gl.uniform3fv(this.getLocation(),e);break;case"4fv":this._gl.uniform4fv(this.getLocation(),e);break;default:throw`Invalid value ${e} for type ${this._type}`}else switch(this._type){case"1f":case"1i":this._gl.uniform1i(this.getLocation(),e);break;default:throw`Invalid value ${e} for type ${this._type}`}}getLocation(){if(!this._program)throw"Could not get location of uniform. No program attached.";return this._gl.getUniformLocation(this._program.webGLProgram,this._name)}}const Ft=new Float32Array([0,0,30,0,0,150,0,150,30,0,30,150,30,0,100,0,30,30,30,30,100,0,100,30,30,60,67,60,30,90,30,90,67,60,67,90]);function Dt(t){let e;return{c(){e=E("canvas"),_(e,"width","512"),_(e,"height","512"),_(e,"class","svelte-7jrn26")},m(n,o){S(n,e,o),t[1](e)},p:v,i:v,o:v,d(n){n&&y(e),t[1](null)}}}function Gt(t,e,n){let o;Te(()=>{const l=new xt(o),s=l.gl,r=new Ot(s),a=new Ie({gl:s,source:Rt}),c=new Ne({gl:s,source:Tt});r.attachShader(a),r.attachShader(c),l.linkProgram(r);const u=new jt({gl:s,name:"a_position",program:r});u.setBufferData(Ft),s.viewport(0,0,s.canvas.width,s.canvas.height),s.clearColor(0,0,0,0),s.clear(s.COLOR_BUFFER_BIT|s.DEPTH_BUFFER_BIT),s.useProgram(r.webGLProgram),new he({gl:s,type:"2f",name:"u_resolution",program:r,value:[s.canvas.width,s.canvas.height]}),new he({gl:s,type:"4fv",name:"u_color",program:r,value:[Math.random(),Math.random(),Math.random(),1]}),new he({gl:s,type:"2fv",name:"u_translation",program:r,value:[0,0]}),s.bindVertexArray(u.vao);var g=s.TRIANGLES,d=0,f=18;s.drawArrays(g,d,f)});function i(l){re[l?"unshift":"push"](()=>{o=l,n(0,o)})}return[o,i]}class It extends B{constructor(e){super(),N(this,e,Gt,Dt,F,{})}}function Nt(t){let e;return{c(){e=W("Engine")},m(n,o){S(n,e,o)},d(n){n&&y(e)}}}function Bt(t){let e;return{c(){e=W("Home")},m(n,o){S(n,e,o)},d(n){n&&y(e)}}}function Ut(t){let e;return{c(){e=W("Shader Art")},m(n,o){S(n,e,o)},d(n){n&&y(e)}}}function zt(t){let e,n,o,i,l,s,r,a,c,u,g,d;return i=new fe({props:{href:"/engine",$$slots:{default:[Nt]},$$scope:{ctx:t}}}),s=new fe({props:{href:"/home",$$slots:{default:[Bt]},$$scope:{ctx:t}}}),a=new fe({props:{href:"/shaderart",$$slots:{default:[Ut]},$$scope:{ctx:t}}}),g=new _t({props:{routes:t[0]}}),{c(){e=E("div"),n=E("header"),o=E("nav"),O(i.$$.fragment),l=j(),O(s.$$.fragment),r=j(),O(a.$$.fragment),c=j(),u=E("main"),O(g.$$.fragment),_(o,"class","svelte-j54tjh"),_(n,"class","svelte-j54tjh"),_(u,"class","svelte-j54tjh"),_(e,"class","content svelte-j54tjh")},m(f,b){S(f,e,b),R(e,n),R(n,o),T(i,o,null),R(o,l),T(s,o,null),R(o,r),T(a,o,null),R(e,c),R(e,u),T(g,u,null),d=!0},p(f,[b]){const P={};b&2&&(P.$$scope={dirty:b,ctx:f}),i.$set(P);const L={};b&2&&(L.$$scope={dirty:b,ctx:f}),s.$set(L);const U={};b&2&&(U.$$scope={dirty:b,ctx:f}),a.$set(U)},i(f){d||(A(i.$$.fragment,f),A(s.$$.fragment,f),A(a.$$.fragment,f),A(g.$$.fragment,f),d=!0)},o(f){k(i.$$.fragment,f),k(s.$$.fragment,f),k(a.$$.fragment,f),k(g.$$.fragment,f),d=!1},d(f){f&&y(e),x(i),x(s),x(a),x(g)}}}function Vt(t){return[{"/":pt,"/shaderart":kt,"/engine":It}]}class qt extends B{constructor(e){super(),N(this,e,Vt,zt,F,{})}}new qt({target:document.getElementById("app")});
