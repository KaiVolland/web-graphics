var oe=Object.defineProperty;var ue=(e,t,r)=>t in e?oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var M=(e,t,r)=>(ue(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();function m(){}function k(e){return e()}function Q(){return Object.create(null)}function C(e){e.forEach(k)}function ee(e){return typeof e=="function"}function T(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function se(e){return Object.keys(e).length===0}function fe(e,...t){if(e==null){for(const i of t)i(void 0);return m}const r=e.subscribe(...t);return r.unsubscribe?()=>r.unsubscribe():r}function I(e,t,r){e.$$.on_destroy.push(fe(t,r))}function x(e,t){e.appendChild(t)}function g(e,t,r){e.insertBefore(t,r||null)}function h(e){e.parentNode&&e.parentNode.removeChild(e)}function b(e){return document.createElement(e)}function ce(e){return document.createTextNode(e)}function w(){return ce(" ")}function A(e,t,r,i){return e.addEventListener(t,r,i),()=>e.removeEventListener(t,r,i)}function a(e,t,r){r==null?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)}function L(e){return e===""?null:+e}function ae(e){return Array.from(e.childNodes)}function y(e,t){e.value=t??""}let F;function R(e){F=e}function le(){if(!F)throw new Error("Function called outside component initialization");return F}function de(e){le().$$.on_mount.push(e)}const S=[],G=[];let E=[];const Z=[],pe=Promise.resolve();let H=!1;function me(){H||(H=!0,pe.then(te))}function K(e){E.push(e)}const V=new Set;let $=0;function te(){if($!==0)return;const e=F;do{try{for(;$<S.length;){const t=S[$];$++,R(t),he(t.$$)}}catch(t){throw S.length=0,$=0,t}for(R(null),S.length=0,$=0;G.length;)G.pop()();for(let t=0;t<E.length;t+=1){const r=E[t];V.has(r)||(V.add(r),r())}E.length=0}while(S.length);for(;Z.length;)Z.pop()();H=!1,V.clear(),R(e)}function he(e){if(e.fragment!==null){e.update(),C(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(K)}}function ge(e){const t=[],r=[];E.forEach(i=>e.indexOf(i)===-1?t.push(i):r.push(i)),r.forEach(i=>i()),E=t}const O=new Set;let _e;function B(e,t){e&&e.i&&(O.delete(e),e.i(t))}function Y(e,t,r,i){if(e&&e.o){if(O.has(e))return;O.add(e),_e.c.push(()=>{O.delete(e),i&&(r&&e.d(1),i())}),e.o(t)}else i&&i()}function W(e){e&&e.c()}function U(e,t,r){const{fragment:i,after_update:o}=e.$$;i&&i.m(t,r),K(()=>{const s=e.$$.on_mount.map(k).filter(ee);e.$$.on_destroy?e.$$.on_destroy.push(...s):C(s),e.$$.on_mount=[]}),o.forEach(K)}function q(e,t){const r=e.$$;r.fragment!==null&&(ge(r.after_update),C(r.on_destroy),r.fragment&&r.fragment.d(t),r.on_destroy=r.fragment=null,r.ctx=[])}function be(e,t){e.$$.dirty[0]===-1&&(S.push(e),me(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function j(e,t,r,i,o,s,u=null,n=[-1]){const c=F;R(e);const f=e.$$={fragment:null,ctx:[],props:s,update:m,not_equal:o,bound:Q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(c?c.$$.context:[])),callbacks:Q(),dirty:n,skip_bound:!1,root:t.target||c.$$.root};u&&u(f.root);let d=!1;if(f.ctx=r?r(e,t.props||{},(p,l,..._)=>{const P=_.length?_[0]:l;return f.ctx&&o(f.ctx[p],f.ctx[p]=P)&&(!f.skip_bound&&f.bound[p]&&f.bound[p](P),d&&be(e,p)),l}):[],f.update(),d=!0,C(f.before_update),f.fragment=i?i(f.ctx):!1,t.target){if(t.hydrate){const p=ae(t.target);f.fragment&&f.fragment.l(p),p.forEach(h)}else f.fragment&&f.fragment.c();t.intro&&B(e.$$.fragment),U(e,t.target,t.anchor),te()}R(c)}class z{constructor(){M(this,"$$");M(this,"$$set")}$destroy(){q(this,1),this.$destroy=m}$on(t,r){if(!ee(r))return m;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(r),()=>{const o=i.indexOf(r);o!==-1&&i.splice(o,1)}}$set(t){this.$$set&&!se(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ye="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ye);const $e=`#version 300 es

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
`,v=[];function ne(e,t=m){let r;const i=new Set;function o(n){if(T(e,n)&&(e=n,r)){const c=!v.length;for(const f of i)f[1](),v.push(f,e);if(c){for(let f=0;f<v.length;f+=2)v[f][0](v[f+1]);v.length=0}}}function s(n){o(n(e))}function u(n,c=m){const f=[n,c];return i.add(f),i.size===1&&(r=t(o,s)||m),n(e),()=>{i.delete(f),i.size===0&&r&&(r(),r=null)}}return{set:o,update:s,subscribe:u}}const D=ne(15),N=ne(1e3);function Se(e){let t,r,i,o,s;return{c(){t=b("input"),r=w(),i=b("input"),a(t,"type","number"),a(t,"min","100"),a(t,"max","3000"),a(i,"id",e[0]),a(i,"type","range"),a(i,"min","100"),a(i,"max","3000")},m(u,n){g(u,t,n),y(t,e[1]),g(u,r,n),g(u,i,n),y(i,e[1]),o||(s=[A(t,"input",e[2]),A(i,"change",e[3]),A(i,"input",e[3])],o=!0)},p(u,[n]){n&2&&L(t.value)!==u[1]&&y(t,u[1]),n&1&&a(i,"id",u[0]),n&2&&y(i,u[1])},i:m,o:m,d(u){u&&(h(t),h(r),h(i)),o=!1,C(s)}}}function we(e,t,r){let i;I(e,N,n=>r(1,i=n));let{id:o="speed-slider"}=t;function s(){i=L(this.value),N.set(i)}function u(){i=L(this.value),N.set(i)}return e.$$set=n=>{"id"in n&&r(0,o=n.id)},[o,i,s,u]}class Ae extends z{constructor(t){super(),j(this,t,we,Se,T,{id:0})}}function Ee(e){let t,r,i,o,s;return{c(){t=b("input"),r=w(),i=b("input"),a(t,"type","number"),a(t,"min","1"),a(t,"max","30"),a(i,"id",e[0]),a(i,"type","range"),a(i,"min","1"),a(i,"max","30")},m(u,n){g(u,t,n),y(t,e[1]),g(u,r,n),g(u,i,n),y(i,e[1]),o||(s=[A(t,"input",e[2]),A(i,"change",e[3]),A(i,"input",e[3])],o=!0)},p(u,[n]){n&2&&L(t.value)!==u[1]&&y(t,u[1]),n&1&&a(i,"id",u[0]),n&2&&y(i,u[1])},i:m,o:m,d(u){u&&(h(t),h(r),h(i)),o=!1,C(s)}}}function Le(e,t,r){let i;I(e,D,n=>r(1,i=n));let{id:o="density-slider"}=t;function s(){i=L(this.value),D.set(i)}function u(){i=L(this.value),D.set(i)}return e.$$set=n=>{"id"in n&&r(0,o=n.id)},[o,i,s,u]}class Ce extends z{constructor(t){super(),j(this,t,Le,Ee,T,{id:0})}}function Pe(e){let t,r,i,o,s,u,n,c,f,d,p;return o=new Ae({props:{id:"speed-slider"}}),c=new Ce({props:{id:"density-slider"}}),{c(){t=b("div"),r=b("label"),r.textContent="Speed",i=w(),W(o.$$.fragment),s=w(),u=b("label"),u.textContent="Density",n=w(),W(c.$$.fragment),f=w(),d=b("canvas"),a(r,"for","speed-slider"),a(u,"for","speed-slider"),a(t,"class","toolbar"),a(d,"width","1024"),a(d,"height","1024")},m(l,_){g(l,t,_),x(t,r),x(t,i),U(o,t,null),x(t,s),x(t,u),x(t,n),U(c,t,null),g(l,f,_),g(l,d,_),e[1](d),p=!0},p:m,i(l){p||(B(o.$$.fragment,l),B(c.$$.fragment,l),p=!0)},o(l){Y(o.$$.fragment,l),Y(c.$$.fragment,l),p=!1},d(l){l&&(h(t),h(f),h(d)),q(o),q(c),e[1](null)}}}function xe(e,t,r){let i,o;I(e,N,n=>r(2,i=n)),I(e,D,n=>r(3,o=n));let s;de(()=>{const n=s.getContext("webgl2");if(!n)return;const c=n.createProgram();if(!c)return;const f=n.createShader(n.VERTEX_SHADER);if(!f)return;n.shaderSource(f,$e),n.compileShader(f),n.attachShader(c,f);const d=n.createShader(n.FRAGMENT_SHADER);if(!d)return;n.shaderSource(d,ve),n.compileShader(d),n.attachShader(c,d),n.linkProgram(c),n.getProgramParameter(c,n.LINK_STATUS)||(console.log(n.getShaderInfoLog(f)),console.log(n.getShaderInfoLog(d)));const p=new Float32Array([-1,-1,1,-1,-1,1,1,-1,-1,1,1,1]),l=n.getUniformLocation(c,"uResolution");n.uniform2f(l,1024,1024);const _=n.getUniformLocation(c,"uTime");n.uniform1f(_,0);const P=n.getUniformLocation(c,"uDensity");n.uniform1f(P,15);const re=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,re),n.bufferData(n.ARRAY_BUFFER,p,n.STATIC_DRAW);const X=0;n.enableVertexAttribArray(X),n.vertexAttribPointer(X,2,n.FLOAT,!1,2*4,0);const J=(ie=0)=>{n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT),n.uniform1f(P,o),n.uniform1f(_,ie/1e6*i),n.useProgram(c),n.drawArrays(n.TRIANGLES,0,6),requestAnimationFrame(J)};J()});function u(n){G[n?"unshift":"push"](()=>{s=n,r(0,s)})}return[s,u]}class Re extends z{constructor(t){super(),j(this,t,xe,Pe,T,{})}}function Fe(e){let t,r,i;return r=new Re({}),{c(){t=b("main"),W(r.$$.fragment)},m(o,s){g(o,t,s),U(r,t,null),i=!0},p:m,i(o){i||(B(r.$$.fragment,o),i=!0)},o(o){Y(r.$$.fragment,o),i=!1},d(o){o&&h(t),q(r)}}}class Te extends z{constructor(t){super(),j(this,t,null,Fe,T,{})}}new Te({target:document.getElementById("app")});
