(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&f(s)}).observe(document,{childList:!0,subtree:!0});function p(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function f(t){if(t.ep)return;t.ep=!0;const o=p(t);fetch(t.href,o)}})();const y=`#version 300 es

layout(location = 0) in vec2 aPosition;
out vec2 fragCoord;

void main()
{
    fragCoord = aPosition;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,h=`#version 300 es

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
`;let l=document.getElementById("speed-slider").value,u=document.getElementById("density-slider").value;document.getElementById("speed-slider").addEventListener("input",n=>{l=n.target.value,document.getElementById("speed").innerHTML=l});document.getElementById("density-slider").addEventListener("input",n=>{u=n.target.value,document.getElementById("density").innerHTML=n.target.value,e.uniform1f(d,u)});const e=document.querySelector("canvas").getContext("webgl2"),r=e.createProgram(),i=e.createShader(e.VERTEX_SHADER);e.shaderSource(i,y);e.compileShader(i);e.attachShader(r,i);const a=e.createShader(e.FRAGMENT_SHADER);e.shaderSource(a,h);e.compileShader(a);e.attachShader(r,a);e.linkProgram(r);e.getProgramParameter(r,e.LINK_STATUS)||(console.log(e.getShaderInfoLog(i)),console.log(e.getShaderInfoLog(a)));const S=new Float32Array([-1,-1,1,-1,-1,1,1,-1,-1,1,1,1]),L=e.getUniformLocation(r,"uResolution");e.uniform2f(L,1024,1024);const m=e.getUniformLocation(r,"uTime");e.uniform1f(m,0);const d=e.getUniformLocation(r,"uDensity");e.uniform1f(d,15);const A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A);e.bufferData(e.ARRAY_BUFFER,S,e.STATIC_DRAW);const g=0;e.enableVertexAttribArray(g);e.vertexAttribPointer(g,2,e.FLOAT,!1,2*4,0);const v=n=>{e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.uniform1f(d,u),e.uniform1f(m,n/1e6*l),e.useProgram(r),e.drawArrays(e.TRIANGLES,0,6),requestAnimationFrame(v)};v();
