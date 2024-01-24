var ye=Object.defineProperty;var Se=(e,t,n)=>t in e?ye(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var R=(e,t,n)=>(Se(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function G(){}function zt(e,t){for(const n in t)e[n]=t[n];return e}function le(e){return e()}function Wt(){return Object.create(null)}function at(e){e.forEach(le)}function Dt(e){return typeof e=="function"}function lt(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Le(e){return Object.keys(e).length===0}function ue(e,...t){if(e==null){for(const r of t)r(void 0);return G}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function Lt(e,t,n){e.$$.on_destroy.push(ue(t,n))}function Ee(e,t,n,r){if(e){const s=ce(e,t,n,r);return e[0](s)}}function ce(e,t,n,r){return e[1]&&r?zt(n.ctx.slice(),e[1](r(t))):n.ctx}function Ae(e,t,n,r){if(e[2]&&r){const s=e[2](r(n));if(t.dirty===void 0)return s;if(typeof s=="object"){const i=[],l=Math.max(t.dirty.length,s.length);for(let o=0;o<l;o+=1)i[o]=t.dirty[o]|s[o];return i}return t.dirty|s}return t.dirty}function $e(e,t,n,r,s,i){if(s){const l=ce(t,n,r,i);e.p(l,s)}}function ke(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let r=0;r<n;r++)t[r]=-1;return t}return-1}function Re(e){return e&&Dt(e.destroy)?e.destroy:G}function d(e,t){e.appendChild(t)}function D(e,t,n){e.insertBefore(t,n||null)}function F(e){e.parentNode&&e.parentNode.removeChild(e)}function v(e){return document.createElement(e)}function yt(e){return document.createTextNode(e)}function S(){return yt(" ")}function Vt(){return yt("")}function z(e,t,n,r){return e.addEventListener(t,n,r),()=>e.removeEventListener(t,n,r)}function c(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function x(e){return e===""?null:+e}function Ce(e){return Array.from(e.childNodes)}function C(e,t){e.value=t??""}function Kt(e,t,n){e.classList.toggle(t,!!n)}function Pe(e,t,{bubbles:n=!1,cancelable:r=!1}={}){return new CustomEvent(e,{detail:t,bubbles:n,cancelable:r})}function Pt(e,t){return new e(t)}let Et;function St(e){Et=e}function Gt(){if(!Et)throw new Error("Function called outside component initialization");return Et}function fe(e){Gt().$$.on_mount.push(e)}function Te(e){Gt().$$.after_update.push(e)}function xe(e){Gt().$$.on_destroy.push(e)}function Fe(){const e=Gt();return(t,n,{cancelable:r=!1}={})=>{const s=e.$$.callbacks[t];if(s){const i=Pe(t,n,{cancelable:r});return s.slice().forEach(l=>{l.call(e,i)}),!i.defaultPrevented}return!0}}function Zt(e,t){const n=e.$$.callbacks[t.type];n&&n.slice().forEach(r=>r.call(this,t))}const vt=[],Tt=[];let wt=[];const Jt=[],he=Promise.resolve();let qt=!1;function de(){qt||(qt=!0,he.then(pe))}function De(){return de(),he}function Mt(e){wt.push(e)}const Bt=new Set;let mt=0;function pe(){if(mt!==0)return;const e=Et;do{try{for(;mt<vt.length;){const t=vt[mt];mt++,St(t),Ge(t.$$)}}catch(t){throw vt.length=0,mt=0,t}for(St(null),vt.length=0,mt=0;Tt.length;)Tt.pop()();for(let t=0;t<wt.length;t+=1){const n=wt[t];Bt.has(n)||(Bt.add(n),n())}wt.length=0}while(vt.length);for(;Jt.length;)Jt.pop()();qt=!1,Bt.clear(),St(e)}function Ge(e){if(e.fragment!==null){e.update(),at(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(Mt)}}function Oe(e){const t=[],n=[];wt.forEach(r=>e.indexOf(r)===-1?t.push(r):n.push(r)),n.forEach(r=>r()),wt=t}const kt=new Set;let ht;function Yt(){ht={r:0,c:[],p:ht}}function Ht(){ht.r||at(ht.c),ht=ht.p}function H(e,t){e&&e.i&&(kt.delete(e),e.i(t))}function X(e,t,n,r){if(e&&e.o){if(kt.has(e))return;kt.add(e),ht.c.push(()=>{kt.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}else r&&r()}function xt(e,t){const n={},r={},s={$$scope:1};let i=e.length;for(;i--;){const l=e[i],o=t[i];if(o){for(const a in l)a in o||(r[a]=1);for(const a in o)s[a]||(n[a]=o[a],s[a]=1);e[i]=o}else for(const a in l)s[a]=1}for(const l in r)l in n||(n[l]=void 0);return n}function Ft(e){return typeof e=="object"&&e!==null?e:{}}function rt(e){e&&e.c()}function tt(e,t,n){const{fragment:r,after_update:s}=e.$$;r&&r.m(t,n),Mt(()=>{const i=e.$$.on_mount.map(le).filter(Dt);e.$$.on_destroy?e.$$.on_destroy.push(...i):at(i),e.$$.on_mount=[]}),s.forEach(Mt)}function et(e,t){const n=e.$$;n.fragment!==null&&(Oe(n.after_update),at(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function je(e,t){e.$$.dirty[0]===-1&&(vt.push(e),de(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ct(e,t,n,r,s,i,l=null,o=[-1]){const a=Et;St(e);const u=e.$$={fragment:null,ctx:[],props:i,update:G,not_equal:s,bound:Wt(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(a?a.$$.context:[])),callbacks:Wt(),dirty:o,skip_bound:!1,root:t.target||a.$$.root};l&&l(u.root);let h=!1;if(u.ctx=n?n(e,t.props||{},(g,w,...f)=>{const p=f.length?f[0]:w;return u.ctx&&s(u.ctx[g],u.ctx[g]=p)&&(!u.skip_bound&&u.bound[g]&&u.bound[g](p),h&&je(e,g)),w}):[],u.update(),h=!0,at(u.before_update),u.fragment=r?r(u.ctx):!1,t.target){if(t.hydrate){const g=Ce(t.target);u.fragment&&u.fragment.l(g),g.forEach(F)}else u.fragment&&u.fragment.c();t.intro&&H(e.$$.fragment),tt(e,t.target,t.anchor),pe()}St(a)}class ft{constructor(){R(this,"$$");R(this,"$$set")}$destroy(){et(this,1),this.$destroy=G}$on(t,n){if(!Dt(n))return G;const r=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return r.push(n),()=>{const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}$set(t){this.$$set&&!Le(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Be="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Be);const bt=[];function _e(e,t){return{subscribe:Ot(e,t).subscribe}}function Ot(e,t=G){let n;const r=new Set;function s(o){if(lt(e,o)&&(e=o,n)){const a=!bt.length;for(const u of r)u[1](),bt.push(u,e);if(a){for(let u=0;u<bt.length;u+=2)bt[u][0](bt[u+1]);bt.length=0}}}function i(o){s(o(e))}function l(o,a=G){const u=[o,a];return r.add(u),r.size===1&&(n=t(s,i)||G),o(e),()=>{r.delete(u),r.size===0&&n&&(n(),n=null)}}return{set:s,update:i,subscribe:l}}function ge(e,t,n){const r=!Array.isArray(e),s=r?[e]:e;if(!s.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const i=t.length<2;return _e(n,(l,o)=>{let a=!1;const u=[];let h=0,g=G;const w=()=>{if(h)return;g();const p=t(r?u[0]:u,l,o);i?l(p):g=Dt(p)?p:G},f=s.map((p,L)=>ue(p,E=>{u[L]=E,h&=~(1<<L),a&&w()},()=>{h|=1<<L}));return a=!0,w(),function(){at(f),g(),a=!1}})}function Ne(e,t){if(e instanceof RegExp)return{keys:!1,pattern:e};var n,r,s,i,l=[],o="",a=e.split("/");for(a[0]||a.shift();s=a.shift();)n=s[0],n==="*"?(l.push("wild"),o+="/(.*)"):n===":"?(r=s.indexOf("?",1),i=s.indexOf(".",1),l.push(s.substring(1,~r?r:~i?i:s.length)),o+=~r&&!~i?"(?:/([^/]+?))?":"/([^/]+?)",~i&&(o+=(~r?"?":"")+"\\"+s.substring(i))):o+="/"+s;return{keys:l,pattern:new RegExp("^"+o+(t?"(?=$|/)":"/?$"),"i")}}function Ie(e){let t,n,r;const s=[e[2]];var i=e[0];function l(o,a){let u={};if(a!==void 0&&a&4)u=xt(s,[Ft(o[2])]);else for(let h=0;h<s.length;h+=1)u=zt(u,s[h]);return{props:u}}return i&&(t=Pt(i,l(e)),t.$on("routeEvent",e[7])),{c(){t&&rt(t.$$.fragment),n=Vt()},m(o,a){t&&tt(t,o,a),D(o,n,a),r=!0},p(o,a){if(a&1&&i!==(i=o[0])){if(t){Yt();const u=t;X(u.$$.fragment,1,0,()=>{et(u,1)}),Ht()}i?(t=Pt(i,l(o,a)),t.$on("routeEvent",o[7]),rt(t.$$.fragment),H(t.$$.fragment,1),tt(t,n.parentNode,n)):t=null}else if(i){const u=a&4?xt(s,[Ft(o[2])]):{};t.$set(u)}},i(o){r||(t&&H(t.$$.fragment,o),r=!0)},o(o){t&&X(t.$$.fragment,o),r=!1},d(o){o&&F(n),t&&et(t,o)}}}function Ue(e){let t,n,r;const s=[{params:e[1]},e[2]];var i=e[0];function l(o,a){let u={};if(a!==void 0&&a&6)u=xt(s,[a&2&&{params:o[1]},a&4&&Ft(o[2])]);else for(let h=0;h<s.length;h+=1)u=zt(u,s[h]);return{props:u}}return i&&(t=Pt(i,l(e)),t.$on("routeEvent",e[6])),{c(){t&&rt(t.$$.fragment),n=Vt()},m(o,a){t&&tt(t,o,a),D(o,n,a),r=!0},p(o,a){if(a&1&&i!==(i=o[0])){if(t){Yt();const u=t;X(u.$$.fragment,1,0,()=>{et(u,1)}),Ht()}i?(t=Pt(i,l(o,a)),t.$on("routeEvent",o[6]),rt(t.$$.fragment),H(t.$$.fragment,1),tt(t,n.parentNode,n)):t=null}else if(i){const u=a&6?xt(s,[a&2&&{params:o[1]},a&4&&Ft(o[2])]):{};t.$set(u)}},i(o){r||(t&&H(t.$$.fragment,o),r=!0)},o(o){t&&X(t.$$.fragment,o),r=!1},d(o){o&&F(n),t&&et(t,o)}}}function qe(e){let t,n,r,s;const i=[Ue,Ie],l=[];function o(a,u){return a[1]?0:1}return t=o(e),n=l[t]=i[t](e),{c(){n.c(),r=Vt()},m(a,u){l[t].m(a,u),D(a,r,u),s=!0},p(a,[u]){let h=t;t=o(a),t===h?l[t].p(a,u):(Yt(),X(l[h],1,1,()=>{l[h]=null}),Ht(),n=l[t],n?n.p(a,u):(n=l[t]=i[t](a),n.c()),H(n,1),n.m(r.parentNode,r))},i(a){s||(H(n),s=!0)},o(a){X(n),s=!1},d(a){a&&F(r),l[t].d(a)}}}function Qt(){const e=window.location.href.indexOf("#/");let t=e>-1?window.location.href.substr(e+1):"/";const n=t.indexOf("?");let r="";return n>-1&&(r=t.substr(n+1),t=t.substr(0,n)),{location:t,querystring:r}}const Xt=_e(null,function(t){t(Qt());const n=()=>{t(Qt())};return window.addEventListener("hashchange",n,!1),function(){window.removeEventListener("hashchange",n,!1)}}),Me=ge(Xt,e=>e.location);ge(Xt,e=>e.querystring);const te=Ot(void 0);function ze(e,t){if(t=ne(t),!e||!e.tagName||e.tagName.toLowerCase()!="a")throw Error('Action "link" can only be used with <a> tags');return ee(e,t),{update(n){n=ne(n),ee(e,n)}}}function Ve(e){e?window.scrollTo(e.__svelte_spa_router_scrollX,e.__svelte_spa_router_scrollY):window.scrollTo(0,0)}function ee(e,t){let n=t.href||e.getAttribute("href");if(n&&n.charAt(0)=="/")n="#"+n;else if(!n||n.length<2||n.slice(0,2)!="#/")throw Error('Invalid value for "href" attribute: '+n);e.setAttribute("href",n),e.addEventListener("click",r=>{r.preventDefault(),t.disabled||Ye(r.currentTarget.getAttribute("href"))})}function ne(e){return e&&typeof e=="string"?{href:e}:e||{}}function Ye(e){history.replaceState({...history.state,__svelte_spa_router_scrollX:window.scrollX,__svelte_spa_router_scrollY:window.scrollY},void 0),window.location.hash=e}function He(e,t,n){let{routes:r={}}=t,{prefix:s=""}=t,{restoreScrollState:i=!1}=t;class l{constructor(m,b){if(!b||typeof b!="function"&&(typeof b!="object"||b._sveltesparouter!==!0))throw Error("Invalid component object");if(!m||typeof m=="string"&&(m.length<1||m.charAt(0)!="/"&&m.charAt(0)!="*")||typeof m=="object"&&!(m instanceof RegExp))throw Error('Invalid value for "path" argument - strings must start with / or *');const{pattern:P,keys:y}=Ne(m);this.path=m,typeof b=="object"&&b._sveltesparouter===!0?(this.component=b.component,this.conditions=b.conditions||[],this.userData=b.userData,this.props=b.props||{}):(this.component=()=>Promise.resolve(b),this.conditions=[],this.props={}),this._pattern=P,this._keys=y}match(m){if(s){if(typeof s=="string")if(m.startsWith(s))m=m.substr(s.length)||"/";else return null;else if(s instanceof RegExp){const O=m.match(s);if(O&&O[0])m=m.substr(O[0].length)||"/";else return null}}const b=this._pattern.exec(m);if(b===null)return null;if(this._keys===!1)return b;const P={};let y=0;for(;y<this._keys.length;){try{P[this._keys[y]]=decodeURIComponent(b[y+1]||"")||null}catch{P[this._keys[y]]=null}y++}return P}async checkConditions(m){for(let b=0;b<this.conditions.length;b++)if(!await this.conditions[b](m))return!1;return!0}}const o=[];r instanceof Map?r.forEach((_,m)=>{o.push(new l(m,_))}):Object.keys(r).forEach(_=>{o.push(new l(_,r[_]))});let a=null,u=null,h={};const g=Fe();async function w(_,m){await De(),g(_,m)}let f=null,p=null;i&&(p=_=>{_.state&&(_.state.__svelte_spa_router_scrollY||_.state.__svelte_spa_router_scrollX)?f=_.state:f=null},window.addEventListener("popstate",p),Te(()=>{Ve(f)}));let L=null,E=null;const $=Xt.subscribe(async _=>{L=_;let m=0;for(;m<o.length;){const b=o[m].match(_.location);if(!b){m++;continue}const P={route:o[m].path,location:_.location,querystring:_.querystring,userData:o[m].userData,params:b&&typeof b=="object"&&Object.keys(b).length?b:null};if(!await o[m].checkConditions(P)){n(0,a=null),E=null,w("conditionsFailed",P);return}w("routeLoading",Object.assign({},P));const y=o[m].component;if(E!=y){y.loading?(n(0,a=y.loading),E=y,n(1,u=y.loadingParams),n(2,h={}),w("routeLoaded",Object.assign({},P,{component:a,name:a.name,params:u}))):(n(0,a=null),E=null);const O=await y();if(_!=L)return;n(0,a=O&&O.default||O),E=y}b&&typeof b=="object"&&Object.keys(b).length?n(1,u=b):n(1,u=null),n(2,h=o[m].props),w("routeLoaded",Object.assign({},P,{component:a,name:a.name,params:u})).then(()=>{te.set(u)});return}n(0,a=null),E=null,te.set(void 0)});xe(()=>{$(),p&&window.removeEventListener("popstate",p)});function q(_){Zt.call(this,e,_)}function A(_){Zt.call(this,e,_)}return e.$$set=_=>{"routes"in _&&n(3,r=_.routes),"prefix"in _&&n(4,s=_.prefix),"restoreScrollState"in _&&n(5,i=_.restoreScrollState)},e.$$.update=()=>{e.$$.dirty&32&&(history.scrollRestoration=i?"manual":"auto")},[a,u,h,r,s,i,q,A]}class Xe extends ft{constructor(t){super(),ct(this,t,He,qe,lt,{routes:3,prefix:4,restoreScrollState:5})}}function We(e){let t;return{c(){t=yt("Nothing to see here. Go to Engine or Shader Art.")},m(n,r){D(n,t,r)},p:G,i:G,o:G,d(n){n&&F(t)}}}class Ke extends ft{constructor(t){super(),ct(this,t,null,We,lt,{})}}const Ze=`#version 300 es

layout(location = 0) in vec2 aPosition;
out vec2 fragCoord;

void main()
{
    fragCoord = aPosition;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,Je=`#version 300 es

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
`,Rt=Ot(15),Ct=Ot(1e3);function Qe(e){let t,n,r,s,i;return{c(){t=v("input"),n=S(),r=v("input"),c(t,"type","number"),c(t,"min","100"),c(t,"max","3000"),c(r,"id",e[0]),c(r,"type","range"),c(r,"min","100"),c(r,"max","3000")},m(l,o){D(l,t,o),C(t,e[1]),D(l,n,o),D(l,r,o),C(r,e[1]),s||(i=[z(t,"input",e[2]),z(r,"change",e[3]),z(r,"input",e[3])],s=!0)},p(l,[o]){o&2&&x(t.value)!==l[1]&&C(t,l[1]),o&1&&c(r,"id",l[0]),o&2&&C(r,l[1])},i:G,o:G,d(l){l&&(F(t),F(n),F(r)),s=!1,at(i)}}}function tn(e,t,n){let r;Lt(e,Ct,o=>n(1,r=o));let{id:s="speed-slider"}=t;function i(){r=x(this.value),Ct.set(r)}function l(){r=x(this.value),Ct.set(r)}return e.$$set=o=>{"id"in o&&n(0,s=o.id)},[s,r,i,l]}class en extends ft{constructor(t){super(),ct(this,t,tn,Qe,lt,{id:0})}}function nn(e){let t,n,r,s,i;return{c(){t=v("input"),n=S(),r=v("input"),c(t,"type","number"),c(t,"min","1"),c(t,"max","30"),c(r,"id",e[0]),c(r,"type","range"),c(r,"min","1"),c(r,"max","30")},m(l,o){D(l,t,o),C(t,e[1]),D(l,n,o),D(l,r,o),C(r,e[1]),s||(i=[z(t,"input",e[2]),z(r,"change",e[3]),z(r,"input",e[3])],s=!0)},p(l,[o]){o&2&&x(t.value)!==l[1]&&C(t,l[1]),o&1&&c(r,"id",l[0]),o&2&&C(r,l[1])},i:G,o:G,d(l){l&&(F(t),F(n),F(r)),s=!1,at(i)}}}function rn(e,t,n){let r;Lt(e,Rt,o=>n(1,r=o));let{id:s="density-slider"}=t;function i(){r=x(this.value),Rt.set(r)}function l(){r=x(this.value),Rt.set(r)}return e.$$set=o=>{"id"in o&&n(0,s=o.id)},[s,r,i,l]}class on extends ft{constructor(t){super(),ct(this,t,rn,nn,lt,{id:0})}}function sn(e){let t,n,r,s,i,l,o,a,u,h,g,w,f;return s=new en({props:{id:"speed-slider"}}),a=new on({props:{id:"density-slider"}}),{c(){t=v("div"),n=v("label"),n.textContent="Speed",r=S(),rt(s.$$.fragment),i=S(),l=v("label"),l.textContent="Density",o=S(),rt(a.$$.fragment),u=S(),h=v("canvas"),g=S(),w=v("div"),w.innerHTML='<a href="https://www.youtube.com/watch?v=f4s1h2YETNY&amp;t=583s">Shader code by kishimisu</a>',c(n,"for","speed-slider"),c(l,"for","speed-slider"),c(t,"class","toolbar"),c(h,"width","1024"),c(h,"height","1024")},m(p,L){D(p,t,L),d(t,n),d(t,r),tt(s,t,null),d(t,i),d(t,l),d(t,o),tt(a,t,null),D(p,u,L),D(p,h,L),e[1](h),D(p,g,L),D(p,w,L),f=!0},p:G,i(p){f||(H(s.$$.fragment,p),H(a.$$.fragment,p),f=!0)},o(p){X(s.$$.fragment,p),X(a.$$.fragment,p),f=!1},d(p){p&&(F(t),F(u),F(h),F(g),F(w)),et(s),et(a),e[1](null)}}}function an(e,t,n){let r,s;Lt(e,Ct,o=>n(2,r=o)),Lt(e,Rt,o=>n(3,s=o));let i;fe(()=>{const o=i.getContext("webgl2");if(!o)return;const a=o.createProgram();if(!a)return;const u=o.createShader(o.VERTEX_SHADER);if(!u)return;o.shaderSource(u,Ze),o.compileShader(u),o.attachShader(a,u);const h=o.createShader(o.FRAGMENT_SHADER);if(!h)return;o.shaderSource(h,Je),o.compileShader(h),o.attachShader(a,h),o.linkProgram(a),o.getProgramParameter(a,o.LINK_STATUS)||(console.log(o.getShaderInfoLog(u)),console.log(o.getShaderInfoLog(h)));const g=new Float32Array([-1,-1,1,-1,-1,1,1,-1,-1,1,1,1]),w=o.getUniformLocation(a,"uResolution");o.uniform2f(w,1024,1024);const f=o.getUniformLocation(a,"uTime");o.uniform1f(f,0);const p=o.getUniformLocation(a,"uDensity");o.uniform1f(p,15);const L=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,L),o.bufferData(o.ARRAY_BUFFER,g,o.STATIC_DRAW);const E=0;o.enableVertexAttribArray(E),o.vertexAttribPointer(E,2,o.FLOAT,!1,2*4,0);const $=(q=0)=>{o.clearColor(0,0,0,1),o.clear(o.COLOR_BUFFER_BIT),o.uniform1f(p,s),o.uniform1f(f,q/1e6*r),o.useProgram(a),o.drawArrays(o.TRIANGLES,0,6),requestAnimationFrame($)};$()});function l(o){Tt[o?"unshift":"push"](()=>{i=o,n(0,i)})}return[i,l]}class ln extends ft{constructor(t){super(),ct(this,t,an,sn,lt,{})}}function un(e){let t,n,r,s;const i=e[3].default,l=Ee(i,e,e[2],null);return{c(){t=v("a"),l&&l.c(),c(t,"href",e[0]),c(t,"class","svelte-1dzzut9"),Kt(t,"active",e[1]===e[0])},m(o,a){D(o,t,a),l&&l.m(t,null),n=!0,r||(s=Re(ze.call(null,t)),r=!0)},p(o,[a]){l&&l.p&&(!n||a&4)&&$e(l,i,o,o[2],n?Ae(i,o[2],a,null):ke(o[2]),null),(!n||a&1)&&c(t,"href",o[0]),(!n||a&3)&&Kt(t,"active",o[1]===o[0])},i(o){n||(H(l,o),n=!0)},o(o){X(l,o),n=!1},d(o){o&&F(t),l&&l.d(o),r=!1,s()}}}function cn(e,t,n){let r;Lt(e,Me,o=>n(1,r=o));let{$$slots:s={},$$scope:i}=t,{href:l=""}=t;return e.$$set=o=>{"href"in o&&n(0,l=o.href),"$$scope"in o&&n(2,i=o.$$scope)},[l,r,i,s]}class Nt extends ft{constructor(t){super(),ct(this,t,cn,un,lt,{href:0})}}const fn=`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec4 a_color;

uniform mat4 u_transformation;

// a varying the color to the fragment shader
out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_transformation * a_position;

  // Pass the color to the fragment shader.
  v_color = a_color;
}
`,hn=`#version 300 es

precision highp float;

// the varied color passed from the vertex shader
in vec4 v_color;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = v_color;
}
`;class dn{constructor(t){R(this,"_gl",null);R(this,"_canvas");R(this,"_width");R(this,"_height");this._width=t.width,this._height=t.height,this._canvas=t,this.updateGL(),this.updateViewPort()}set canvas(t){this._canvas=t,this.updateGL(),this.updateViewPort()}updateGL(){const t=this._canvas.getContext("webgl2");if(!t)throw`Could not get webgl2 context of canvas element: ${this._canvas}`;this._gl=t}updateViewPort(){if(!this._gl)throw"Could not update viewport.";this._gl.viewport(0,0,this._gl.canvas.width,this._gl.canvas.height)}linkProgram(t){if(!this._gl)throw"Could not link program.";this._gl.linkProgram(t.webGLProgram),this._gl.getProgramParameter(t.webGLProgram,this._gl.LINK_STATUS)||(t.vertexShader&&console.log(this._gl.getShaderInfoLog(t.vertexShader.webGLShader)),t.fragmentShader&&console.log(this._gl.getShaderInfoLog(t.fragmentShader.webGLShader)))}get width(){return this._width}get height(){return this._height}get gl(){return this._gl}}class me{constructor({gl:t,source:n}){R(this,"_gl");R(this,"_webGLShader");R(this,"source",null);this._gl=t,this._webGLShader=this.create(),n&&(this._gl.shaderSource(this._webGLShader,n),this._gl.compileShader(this._webGLShader))}get webGLShader(){return this._webGLShader}}class be extends me{constructor({gl:t,source:n}){super({gl:t,source:n})}create(){const t=this._gl.createShader(this._gl.VERTEX_SHADER);if(!t)throw"Could not create VertexShader";return t}updateSource(t){}}class ve extends me{constructor({gl:t,source:n}){super({gl:t,source:n})}create(){const t=this._gl.createShader(this._gl.FRAGMENT_SHADER);if(!t)throw"Could not create FragmentShader";return t}updateSource(t){}}class pn{constructor(t){R(this,"_gl");R(this,"_webGLProgram");R(this,"_vertexShader",null);R(this,"_fragmentShader",null);this._gl=t;const n=t.createProgram();if(!n)throw"Could not create program";this._webGLProgram=n}attachShader(t){this._gl.attachShader(this._webGLProgram,t.webGLShader),t instanceof be&&(this._vertexShader=t),t instanceof ve&&(this._fragmentShader=t)}getUniformLocation(t){return this._gl.getUniformLocation(this._webGLProgram,t)}get webGLProgram(){return this._webGLProgram}get vertexShader(){return this._vertexShader}get fragmentShader(){return this._fragmentShader}}class re{constructor({gl:t,name:n,program:r,pointerProperties:s,createVao:i}){R(this,"_gl");R(this,"_buffer");R(this,"_name");R(this,"_program",null);R(this,"_vao",null);R(this,"_pointerProperties");R(this,"_createVao");this._gl=t,this._name=n,r&&(this._program=r),this._createVao=i||!1;const l=t.createBuffer();if(!l)throw"Could not create buffer";this._pointerProperties={normalize:!1,stride:0,offset:0,...s},this._buffer=l}get name(){return this._name}get buffer(){return this._buffer}get vao(){if(!this._vao)throw"Could not get vao of attribute. Was the data set already?";return this._vao}getLocation(){if(!this._program)throw"Could not get location of attribute. No program attached.";return this._gl.getAttribLocation(this._program.webGLProgram,this._name)}setBufferData(t){this._createVao&&(this._vao=this._gl.createVertexArray(),this._gl.bindVertexArray(this._vao)),this._gl.enableVertexAttribArray(this.getLocation()),this._gl.bindBuffer(this._gl.ARRAY_BUFFER,this._buffer),this._gl.bufferData(this._gl.ARRAY_BUFFER,t,this._gl.STATIC_DRAW);const{size:n,type:r,normalize:s,stride:i,offset:l}=this._pointerProperties;this._gl.vertexAttribPointer(this.getLocation(),n,r,s,i,l)}}class oe{constructor({gl:t,type:n,name:r,program:s,value:i}){R(this,"_gl");R(this,"_value",null);R(this,"_type");R(this,"_name");R(this,"_program",null);this._gl=t,this._name=r,this._type=n,s&&(this._program=s),i&&(this.value=i)}get value(){return this._value}set value(t){if(this._value=t,Array.isArray(t))switch(this._type){case"2i":case"2f":this._gl.uniform2f(this.getLocation(),t[0],t[1]);break;case"3f":case"3i":this._gl.uniform3f(this.getLocation(),t[0],t[1],t[2]);break;case"4f":case"4i":this._gl.uniform4f(this.getLocation(),t[0],t[1],t[2],t[3]);break;case"matrix2fv":this._gl.uniformMatrix2fv(this.getLocation(),!1,t);break;case"matrix3fv":this._gl.uniformMatrix3fv(this.getLocation(),!1,t);break;case"matrix4fv":this._gl.uniformMatrix4fv(this.getLocation(),!1,t);break;case"2fv":this._gl.uniform2fv(this.getLocation(),t);break;case"3fv":this._gl.uniform3fv(this.getLocation(),t);break;case"4fv":this._gl.uniform4fv(this.getLocation(),t);break;default:throw`Invalid value ${t} for type ${this._type}`}else switch(this._type){case"1f":case"1i":this._gl.uniform1i(this.getLocation(),t);break;default:throw`Invalid value ${t} for type ${this._type}`}}getLocation(){if(!this._program)throw"Could not get location of uniform. No program attached.";return this._gl.getUniformLocation(this._program.webGLProgram,this._name)}}const It=new Float32Array([0,0,0,0,150,0,30,0,0,0,150,0,30,150,0,30,0,0,30,0,0,30,30,0,100,0,0,30,30,0,100,30,0,100,0,0,30,60,0,30,90,0,67,60,0,30,90,0,67,90,0,67,60,0,0,0,30,30,0,30,0,150,30,0,150,30,30,0,30,30,150,30,30,0,30,100,0,30,30,30,30,30,30,30,100,0,30,100,30,30,30,60,30,67,60,30,30,90,30,30,90,30,67,60,30,67,90,30,0,0,0,100,0,0,100,0,30,0,0,0,100,0,30,0,0,30,100,0,0,100,30,0,100,30,30,100,0,0,100,30,30,100,0,30,30,30,0,30,30,30,100,30,30,30,30,0,100,30,30,100,30,0,30,30,0,30,60,30,30,30,30,30,30,0,30,60,0,30,60,30,30,60,0,67,60,30,30,60,30,30,60,0,67,60,0,67,60,30,67,60,0,67,90,30,67,60,30,67,60,0,67,90,0,67,90,30,30,90,0,30,90,30,67,90,30,30,90,0,67,90,30,67,90,0,30,90,0,30,150,30,30,90,30,30,90,0,30,150,0,30,150,30,0,150,0,0,150,30,30,150,30,0,150,0,30,150,30,30,150,0,0,0,0,0,0,30,0,150,30,0,0,0,0,150,30,0,150,0]),se=new Uint8Array([200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,200,70,120,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,80,70,200,70,200,210,70,200,210,70,200,210,70,200,210,70,200,210,70,200,210,200,200,70,200,200,70,200,200,70,200,200,70,200,200,70,200,200,70,210,100,70,210,100,70,210,100,70,210,100,70,210,100,70,210,100,70,210,160,70,210,160,70,210,160,70,210,160,70,210,160,70,210,160,70,70,180,210,70,180,210,70,180,210,70,180,210,70,180,210,70,180,210,100,70,210,100,70,210,100,70,210,100,70,210,100,70,210,100,70,210,76,210,100,76,210,100,76,210,100,76,210,100,76,210,100,76,210,100,140,210,80,140,210,80,140,210,80,140,210,80,140,210,80,140,210,80,90,130,110,90,130,110,90,130,110,90,130,110,90,130,110,90,130,110,160,160,220,160,160,220,160,160,220,160,160,220,160,160,220,160,160,220]);function Ut(e){return e*(Math.PI/180)}const U={identity:[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],orthographic:function(e,t,n,r,s,i){return[2/(t-e),0,0,0,0,2/(r-n),0,0,0,0,2/(s-i),0,(e+t)/(e-t),(n+r)/(n-r),(s+i)/(s-i),1]},projection:function(e,t,n){return[2/e,0,0,0,0,-2/t,0,0,0,0,2/n,0,-1,1,0,1]},multiply:function(e,t){const n=t[0],r=t[0*4+1],s=t[0*4+2],i=t[0*4+3],l=t[1*4+0],o=t[1*4+1],a=t[1*4+2],u=t[1*4+3],h=t[2*4+0],g=t[2*4+1],w=t[2*4+2],f=t[2*4+3],p=t[3*4+0],L=t[3*4+1],E=t[3*4+2],$=t[3*4+3],q=e[0*4+0],A=e[0*4+1],_=e[0*4+2],m=e[0*4+3],b=e[1*4+0],P=e[1*4+1],y=e[1*4+2],O=e[1*4+3],Z=e[2*4+0],nt=e[2*4+1],N=e[2*4+2],ot=e[2*4+3],J=e[3*4+0],st=e[3*4+1],I=e[3*4+2],it=e[3*4+3];return[n*q+r*b+s*Z+i*J,n*A+r*P+s*nt+i*st,n*_+r*y+s*N+i*I,n*m+r*O+s*ot+i*it,l*q+o*b+a*Z+u*J,l*A+o*P+a*nt+u*st,l*_+o*y+a*N+u*I,l*m+o*O+a*ot+u*it,h*q+g*b+w*Z+f*J,h*A+g*P+w*nt+f*st,h*_+g*y+w*N+f*I,h*m+g*O+w*ot+f*it,p*q+L*b+E*Z+$*J,p*A+L*P+E*nt+$*st,p*_+L*y+E*N+$*I,p*m+L*O+E*ot+$*it]},translate:function(e,t,n,r){return U.multiply(e,U.translation(t,n,r))},xRotate:function(e,t){return U.multiply(e,U.xRotation(t))},yRotate:function(e,t){return U.multiply(e,U.yRotation(t))},zRotate:function(e,t){return U.multiply(e,U.zRotation(t))},scale:function(e,t,n,r){return U.multiply(e,U.scaling(t,n,r))},translation:function(e,t,n){return[1,0,0,0,0,1,0,0,0,0,1,0,e,t,n,1]},xRotation:function(e){const t=Math.cos(e),n=Math.sin(e);return[1,0,0,0,0,t,n,0,0,-n,t,0,0,0,0,1]},yRotation:function(e){const t=Math.cos(e),n=Math.sin(e);return[t,0,-n,0,0,1,0,0,n,0,t,0,0,0,0,1]},zRotation:function(e){const t=Math.cos(e),n=Math.sin(e);return[t,n,0,0,-n,t,0,0,0,0,1,0,0,0,0,1]},scaling:function(e,t,n){return[e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1]}};function ie(e,t=!1){e=e.replace(/^#/,"");const n=parseInt(e,16),r=n>>16&255,s=n>>8&255,i=n&255;return t?[r/256,s/256,i/256]:[r,s,i]}function _n(e){let t,n,r,s,i,l,o,a,u,h,g,w,f,p,L,E,$,q,A,_,m,b,P,y,O,Z,nt,N,ot,J,st,I,it,j,dt,At,pt,B,T,W,K,_t,V,gt,ut,jt,Q,$t,Y;return{c(){t=v("canvas"),n=S(),r=v("div"),s=v("div"),i=v("span"),i.textContent="Positon:",l=S(),o=v("span"),o.textContent="x",a=S(),u=v("input"),h=S(),g=v("span"),g.textContent="y",w=S(),f=v("input"),p=S(),L=v("span"),L.textContent="z",E=S(),$=v("input"),q=S(),A=v("div"),_=v("span"),_.textContent="Scale:",m=S(),b=v("span"),b.textContent="x",P=S(),y=v("input"),O=S(),Z=v("span"),Z.textContent="y",nt=S(),N=v("input"),ot=S(),J=v("span"),J.textContent="z",st=S(),I=v("input"),it=S(),j=v("div"),dt=v("span"),dt.textContent="Rotation:",At=S(),pt=v("span"),pt.textContent="x",B=S(),T=v("input"),W=S(),K=v("span"),K.textContent="y",_t=S(),V=v("input"),gt=S(),ut=v("span"),ut.textContent="z",jt=S(),Q=v("input"),c(t,"width","512"),c(t,"height","512"),c(t,"class","svelte-1q6yc4t"),c(i,"class",".label"),c(o,"class","label svelte-1q6yc4t"),c(u,"type","number"),c(u,"min",0),c(u,"max",412),c(g,"class","label svelte-1q6yc4t"),c(f,"type","number"),c(f,"min",0),c(f,"max",362),c(L,"class","label svelte-1q6yc4t"),c($,"type","number"),c($,"min",0),c($,"max",362),c(s,"class","control"),c(_,"class","label svelte-1q6yc4t"),c(b,"class","label svelte-1q6yc4t"),c(y,"type","number"),c(y,"min",.1),c(y,"max",3),c(y,"step",.1),c(Z,"class","label svelte-1q6yc4t"),c(N,"type","number"),c(N,"min",.1),c(N,"max",3),c(N,"step",.1),c(J,"class","label svelte-1q6yc4t"),c(I,"type","number"),c(I,"min",.1),c(I,"max",3),c(I,"step",.1),c(A,"class","control"),c(dt,"class","label svelte-1q6yc4t"),c(pt,"class","label svelte-1q6yc4t"),c(T,"type","number"),c(T,"step",15),c(T,"min",-360),c(T,"max",360),c(K,"class","label svelte-1q6yc4t"),c(V,"type","number"),c(V,"step",15),c(V,"min",-360),c(V,"max",360),c(ut,"class","label svelte-1q6yc4t"),c(Q,"type","number"),c(Q,"step",15),c(Q,"min",-360),c(Q,"max",360),c(j,"class","control"),c(r,"class","controls svelte-1q6yc4t")},m(k,M){D(k,t,M),e[10](t),D(k,n,M),D(k,r,M),d(r,s),d(s,i),d(s,l),d(s,o),d(s,a),d(s,u),C(u,e[1]),d(s,h),d(s,g),d(s,w),d(s,f),C(f,e[2]),d(s,p),d(s,L),d(s,E),d(s,$),C($,e[3]),d(r,q),d(r,A),d(A,_),d(A,m),d(A,b),d(A,P),d(A,y),C(y,e[7]),d(A,O),d(A,Z),d(A,nt),d(A,N),C(N,e[8]),d(A,ot),d(A,J),d(A,st),d(A,I),C(I,e[9]),d(r,it),d(r,j),d(j,dt),d(j,At),d(j,pt),d(j,B),d(j,T),C(T,e[4]),d(j,W),d(j,K),d(j,_t),d(j,V),C(V,e[5]),d(j,gt),d(j,ut),d(j,jt),d(j,Q),C(Q,e[6]),$t||(Y=[z(u,"input",e[11]),z(f,"input",e[12]),z($,"input",e[13]),z(y,"input",e[14]),z(N,"input",e[15]),z(I,"input",e[16]),z(T,"input",e[17]),z(V,"input",e[18]),z(Q,"input",e[19])],$t=!0)},p(k,M){M[0]&2&&x(u.value)!==k[1]&&C(u,k[1]),M[0]&4&&x(f.value)!==k[2]&&C(f,k[2]),M[0]&8&&x($.value)!==k[3]&&C($,k[3]),M[0]&128&&x(y.value)!==k[7]&&C(y,k[7]),M[0]&256&&x(N.value)!==k[8]&&C(N,k[8]),M[0]&512&&x(I.value)!==k[9]&&C(I,k[9]),M[0]&16&&x(T.value)!==k[4]&&C(T,k[4]),M[0]&32&&x(V.value)!==k[5]&&C(V,k[5]),M[0]&64&&x(Q.value)!==k[6]&&C(Q,k[6])},i:G,o:G,d(k){k&&(F(t),F(n),F(r)),e[10](null),$t=!1,at(Y)}}}let ae="#0E86E1";function gn(e,t,n){let r,s=256,i=256,l=0,o=0,a=0,u=0,h=1,g=1,w=1,f,p,L,E,$,q=!1,A=[0,0],_=0,m=[0,0,0],b=[0,0,0],P=[0,0,0];const y=B=>{q=!0,_=B.button,A=[B.clientX,B.clientY],m=[o,a,u],b=[s,i,l],P=[h,g,w]},O=()=>{q=!1,_=0},Z=B=>{if(!q)return;const T=A[0]-B.clientX,W=A[1]-B.clientY;if(_===0&&(n(1,s=b[0]-T),n(2,i=b[1]-W)),_===1&&(n(4,o=m[0]-W),n(5,a=m[1]-T)),_===2){const K=r.clientHeight/4;n(7,h=P[0]+W/K),n(8,g=P[1]+W/K),n(9,w=P[2]+W/K)}};fe(()=>{const B=new dn(r);if(!B.gl)throw"Could not get gl from Engine.";r.addEventListener("contextmenu",ut=>ut.preventDefault()),r.addEventListener("mousedown",y),r.addEventListener("mouseup",O),r.addEventListener("mousemove",Z),f=B.gl;const T=new pn(f),W=new be({gl:f,source:fn}),K=new ve({gl:f,source:hn});T.attachShader(W),T.attachShader(K),B.linkProgram(T),f.useProgram(T.webGLProgram),E=new re({gl:f,name:"a_position",program:T,createVao:!0,pointerProperties:{size:3,type:f.FLOAT}}),E.setBufferData(It),$=new re({gl:f,name:"a_color",program:T,pointerProperties:{size:3,normalize:!0,type:f.UNSIGNED_BYTE}}),$.setBufferData(se),f.bindVertexArray(E.vao);const[_t,V,gt]=ie(ae,!0);p=new oe({gl:f,type:"4fv",name:"u_color",program:T,value:[_t,V,gt,1]}),L=new oe({gl:f,type:"matrix4fv",name:"u_transformation",program:T,value:U.identity}),nt()});function nt(){if(!f)return;let B=r instanceof OffscreenCanvas?r.width:r.clientWidth,T=r instanceof OffscreenCanvas?r.height:r.clientHeight;f.clearColor(0,0,0,0),f.clear(f.COLOR_BUFFER_BIT|f.DEPTH_BUFFER_BIT),f.enable(f.CULL_FACE),f.enable(f.DEPTH_TEST);const[W,K,_t]=ie(ae,!0);p.value=[W,K,_t,1];const V=0,gt=B,ut=T;let Y=U.orthographic(V,gt,ut,0,512,-512);Y=U.translate(Y,s,i,l),Y=U.xRotate(Y,Ut(360-o)),Y=U.yRotate(Y,Ut(360-a)),Y=U.zRotate(Y,Ut(360-u)),Y=U.scale(Y,h,g,w),L.value=Y,E.setBufferData(It),$.setBufferData(se);const k=f.TRIANGLES,M=0,we=It.length/3;f.drawArrays(k,M,we),requestAnimationFrame(nt)}function N(B){Tt[B?"unshift":"push"](()=>{r=B,n(0,r)})}function ot(){s=x(this.value),n(1,s)}function J(){i=x(this.value),n(2,i)}function st(){l=x(this.value),n(3,l)}function I(){h=x(this.value),n(7,h)}function it(){g=x(this.value),n(8,g)}function j(){w=x(this.value),n(9,w)}function dt(){o=x(this.value),n(4,o)}function At(){a=x(this.value),n(5,a)}function pt(){u=x(this.value),n(6,u)}return[r,s,i,l,o,a,u,h,g,w,N,ot,J,st,I,it,j,dt,At,pt]}class mn extends ft{constructor(t){super(),ct(this,t,gn,_n,lt,{},null,[-1,-1])}}function bn(e){let t;return{c(){t=yt("Engine")},m(n,r){D(n,t,r)},d(n){n&&F(t)}}}function vn(e){let t;return{c(){t=yt("Home")},m(n,r){D(n,t,r)},d(n){n&&F(t)}}}function wn(e){let t;return{c(){t=yt("Shader Art")},m(n,r){D(n,t,r)},d(n){n&&F(t)}}}function yn(e){let t,n,r,s,i,l,o,a,u,h,g,w;return s=new Nt({props:{href:"/engine",$$slots:{default:[bn]},$$scope:{ctx:e}}}),l=new Nt({props:{href:"/home",$$slots:{default:[vn]},$$scope:{ctx:e}}}),a=new Nt({props:{href:"/shaderart",$$slots:{default:[wn]},$$scope:{ctx:e}}}),g=new Xe({props:{routes:e[0]}}),{c(){t=v("div"),n=v("header"),r=v("nav"),rt(s.$$.fragment),i=S(),rt(l.$$.fragment),o=S(),rt(a.$$.fragment),u=S(),h=v("main"),rt(g.$$.fragment),c(r,"class","svelte-j54tjh"),c(n,"class","svelte-j54tjh"),c(h,"class","svelte-j54tjh"),c(t,"class","content svelte-j54tjh")},m(f,p){D(f,t,p),d(t,n),d(n,r),tt(s,r,null),d(r,i),tt(l,r,null),d(r,o),tt(a,r,null),d(t,u),d(t,h),tt(g,h,null),w=!0},p(f,[p]){const L={};p&2&&(L.$$scope={dirty:p,ctx:f}),s.$set(L);const E={};p&2&&(E.$$scope={dirty:p,ctx:f}),l.$set(E);const $={};p&2&&($.$$scope={dirty:p,ctx:f}),a.$set($)},i(f){w||(H(s.$$.fragment,f),H(l.$$.fragment,f),H(a.$$.fragment,f),H(g.$$.fragment,f),w=!0)},o(f){X(s.$$.fragment,f),X(l.$$.fragment,f),X(a.$$.fragment,f),X(g.$$.fragment,f),w=!1},d(f){f&&F(t),et(s),et(l),et(a),et(g)}}}function Sn(e){return[{"/":Ke,"/shaderart":ln,"/engine":mn}]}class Ln extends ft{constructor(t){super(),ct(this,t,Sn,yn,lt,{})}}new Ln({target:document.getElementById("app")});
