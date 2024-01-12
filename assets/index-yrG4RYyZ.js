var ie=Object.defineProperty;var se=(e,t,n)=>t in e?ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var q=(e,t,n)=>(se(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function m(){}function Z(e){return e()}function J(){return Object.create(null)}function w(e){e.forEach(Z)}function k(e){return typeof e=="function"}function C(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function ue(e){return Object.keys(e).length===0}function ce(e,...t){if(e==null){for(const o of t)o(void 0);return m}const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function F(e,t,n){e.$$.on_destroy.push(ce(t,n))}function x(e,t){e.appendChild(t)}function v(e,t,n){e.insertBefore(t,n||null)}function _(e){e.parentNode&&e.parentNode.removeChild(e)}function g(e){return document.createElement(e)}function fe(e){return document.createTextNode(e)}function P(){return fe(" ")}function T(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function p(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ee(e){return e===""?null:+e}function ae(e){return Array.from(e.childNodes)}function O(e,t){e.value=t??""}let L;function E(e){L=e}function le(){if(!L)throw new Error("Function called outside component initialization");return L}function de(e){le().$$.on_mount.push(e)}const $=[],z=[];let S=[];const Q=[],pe=Promise.resolve();let M=!1;function me(){M||(M=!0,pe.then(te))}function V(e){S.push(e)}const j=new Set;let b=0;function te(){if(b!==0)return;const e=L;do{try{for(;b<$.length;){const t=$[b];b++,E(t),he(t.$$)}}catch(t){throw $.length=0,b=0,t}for(E(null),$.length=0,b=0;z.length;)z.pop()();for(let t=0;t<S.length;t+=1){const n=S[t];j.has(n)||(j.add(n),n())}S.length=0}while($.length);for(;Q.length;)Q.pop()();M=!1,j.clear(),E(e)}function he(e){if(e.fragment!==null){e.update(),w(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(V)}}function ge(e){const t=[],n=[];S.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),S=t}const R=new Set;let _e;function D(e,t){e&&e.i&&(R.delete(e),e.i(t))}function G(e,t,n,o){if(e&&e.o){if(R.has(e))return;R.add(e),_e.c.push(()=>{R.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}function H(e){e&&e.c()}function N(e,t,n){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),V(()=>{const s=e.$$.on_mount.map(Z).filter(k);e.$$.on_destroy?e.$$.on_destroy.push(...s):w(s),e.$$.on_mount=[]}),r.forEach(V)}function I(e,t){const n=e.$$;n.fragment!==null&&(ge(n.after_update),w(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function be(e,t){e.$$.dirty[0]===-1&&($.push(e),me(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function B(e,t,n,o,r,s,c=null,i=[-1]){const f=L;E(e);const u=e.$$={fragment:null,ctx:[],props:s,update:m,not_equal:r,bound:J(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(f?f.$$.context:[])),callbacks:J(),dirty:i,skip_bound:!1,root:t.target||f.$$.root};c&&c(u.root);let l=!1;if(u.ctx=n?n(e,t.props||{},(d,a,...h)=>{const A=h.length?h[0]:a;return u.ctx&&r(u.ctx[d],u.ctx[d]=A)&&(!u.skip_bound&&u.bound[d]&&u.bound[d](A),l&&be(e,d)),a}):[],u.update(),l=!0,w(u.before_update),u.fragment=o?o(u.ctx):!1,t.target){if(t.hydrate){const d=ae(t.target);u.fragment&&u.fragment.l(d),d.forEach(_)}else u.fragment&&u.fragment.c();t.intro&&D(e.$$.fragment),N(e,t.target,t.anchor),te()}E(f)}class U{constructor(){q(this,"$$");q(this,"$$set")}$destroy(){I(this,1),this.$destroy=m}$on(t,n){if(!k(n))return m;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!ue(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ye="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ye);const $e=`#version 300 es

layout(location = 0) in vec2 aPosition;
out vec2 fragCoord;

void main()
{
    fragCoord = aPosition;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,ve=`#version 300 es

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
`,y=[];function ne(e,t=m){let n;const o=new Set;function r(i){if(C(e,i)&&(e=i,n)){const f=!y.length;for(const u of o)u[1](),y.push(u,e);if(f){for(let u=0;u<y.length;u+=2)y[u][0](y[u+1]);y.length=0}}}function s(i){r(i(e))}function c(i,f=m){const u=[i,f];return o.add(u),o.size===1&&(n=t(r,s)||m),i(e),()=>{o.delete(u),o.size===0&&n&&(n(),n=null)}}return{set:r,update:s,subscribe:c}}const K=ne(15),Y=ne(1e3);function Se(e){let t,n,o;return{c(){t=g("input"),p(t,"id",e[0]),p(t,"type","range"),p(t,"min","100"),p(t,"max","3000")},m(r,s){v(r,t,s),O(t,e[1]),n||(o=[T(t,"change",e[2]),T(t,"input",e[2])],n=!0)},p(r,[s]){s&1&&p(t,"id",r[0]),s&2&&O(t,r[1])},i:m,o:m,d(r){r&&_(t),n=!1,w(o)}}}function we(e,t,n){let o;F(e,Y,c=>n(1,o=c));let{id:r="speed-slider"}=t;function s(){o=ee(this.value),Y.set(o)}return e.$$set=c=>{"id"in c&&n(0,r=c.id)},[r,o,s]}class Ae extends U{constructor(t){super(),B(this,t,we,Se,C,{id:0})}}function xe(e){let t,n,o;return{c(){t=g("input"),p(t,"id",e[0]),p(t,"type","range"),p(t,"min","1"),p(t,"max","30")},m(r,s){v(r,t,s),O(t,e[1]),n||(o=[T(t,"change",e[2]),T(t,"input",e[2])],n=!0)},p(r,[s]){s&1&&p(t,"id",r[0]),s&2&&O(t,r[1])},i:m,o:m,d(r){r&&_(t),n=!1,w(o)}}}function Ee(e,t,n){let o;F(e,K,c=>n(1,o=c));let{id:r="density-slider"}=t;function s(){o=ee(this.value),K.set(o)}return e.$$set=c=>{"id"in c&&n(0,r=c.id)},[r,o,s]}class Le extends U{constructor(t){super(),B(this,t,Ee,xe,C,{id:0})}}function Ce(e){let t,n,o,r,s,c,i,f,u,l,d;return r=new Ae({props:{id:"speed-slider"}}),f=new Le({props:{id:"density-slider"}}),{c(){t=g("div"),n=g("label"),n.textContent="Speed",o=P(),H(r.$$.fragment),s=P(),c=g("label"),c.textContent="Density",i=P(),H(f.$$.fragment),u=P(),l=g("canvas"),p(n,"for","speed-slider"),p(c,"for","speed-slider"),p(t,"class","toolbar"),p(l,"width","1024"),p(l,"height","1024")},m(a,h){v(a,t,h),x(t,n),x(t,o),N(r,t,null),x(t,s),x(t,c),x(t,i),N(f,t,null),v(a,u,h),v(a,l,h),e[1](l),d=!0},p:m,i(a){d||(D(r.$$.fragment,a),D(f.$$.fragment,a),d=!0)},o(a){G(r.$$.fragment,a),G(f.$$.fragment,a),d=!1},d(a){a&&(_(t),_(u),_(l)),I(r),I(f),e[1](null)}}}function Pe(e,t,n){let o,r;F(e,Y,i=>n(2,o=i)),F(e,K,i=>n(3,r=i));let s;de(()=>{const i=s.getContext("webgl2");if(!i)return;const f=i.createProgram();if(!f)return;const u=i.createShader(i.VERTEX_SHADER);if(!u)return;i.shaderSource(u,$e),i.compileShader(u),i.attachShader(f,u);const l=i.createShader(i.FRAGMENT_SHADER);if(!l)return;i.shaderSource(l,ve),i.compileShader(l),i.attachShader(f,l),i.linkProgram(f),i.getProgramParameter(f,i.LINK_STATUS)||(console.log(i.getShaderInfoLog(u)),console.log(i.getShaderInfoLog(l)));const d=new Float32Array([-1,-1,1,-1,-1,1,1,-1,-1,1,1,1]),a=i.getUniformLocation(f,"uResolution");i.uniform2f(a,1024,1024);const h=i.getUniformLocation(f,"uTime");i.uniform1f(h,0);const A=i.getUniformLocation(f,"uDensity");i.uniform1f(A,15);const re=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,re),i.bufferData(i.ARRAY_BUFFER,d,i.STATIC_DRAW);const W=0;i.enableVertexAttribArray(W),i.vertexAttribPointer(W,2,i.FLOAT,!1,2*4,0);const X=(oe=0)=>{i.clearColor(0,0,0,1),i.clear(i.COLOR_BUFFER_BIT),i.uniform1f(A,r),i.uniform1f(h,oe/1e6*o),i.useProgram(f),i.drawArrays(i.TRIANGLES,0,6),requestAnimationFrame(X)};X()});function c(i){z[i?"unshift":"push"](()=>{s=i,n(0,s)})}return[s,c]}class Re extends U{constructor(t){super(),B(this,t,Pe,Ce,C,{})}}function Fe(e){let t,n,o;return n=new Re({}),{c(){t=g("main"),H(n.$$.fragment)},m(r,s){v(r,t,s),N(n,t,null),o=!0},p:m,i(r){o||(D(n.$$.fragment,r),o=!0)},o(r){G(n.$$.fragment,r),o=!1},d(r){r&&_(t),I(n)}}}class Te extends U{constructor(t){super(),B(this,t,null,Fe,C,{})}}new Te({target:document.getElementById("app")});
