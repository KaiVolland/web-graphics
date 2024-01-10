import vertexShaderSource from './shader/main.vert.js';
import fragmentShaderSource from './shader/main.frag.js';

let speedFactor = document.getElementById('speed-slider').value;
let density = document.getElementById('density-slider').value;

document.getElementById('speed-slider').addEventListener('input', (e) => {
    speedFactor = e.target.value;
    document.getElementById('speed').innerHTML = speedFactor;
});

document.getElementById('density-slider').addEventListener('input', (e) => {
    density = e.target.value;
    document.getElementById('density').innerHTML = e.target.value;
    gl.uniform1f(uDensityLoc, density);
});

const gl = document.querySelector('canvas').getContext('webgl2');

const program = gl.createProgram();

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
gl.attachShader(program, vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    console.log(gl.getShaderInfoLog(fragmentShader));
}

const bufferData = new Float32Array([
    -1, -1,
    1, -1,
    -1, 1,
    1, -1,
    -1, 1,
    1, 1
]);

const uPositionLoc = gl.getUniformLocation(program, 'uResolution');
gl.uniform2f(uPositionLoc, 1024, 1024);

const uTimeLoc = gl.getUniformLocation(program, 'uTime');
gl.uniform1f(uTimeLoc, 0);

const uDensityLoc = gl.getUniformLocation(program, 'uDensity');
gl.uniform1f(uDensityLoc, 15.0);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

const aPositionLoc = 0;
gl.enableVertexAttribArray(aPositionLoc);
gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 2 * 4, 0);

const draw = (time) => {
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(uDensityLoc, density);
    gl.uniform1f(uTimeLoc, (time / 1000000) * speedFactor);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(draw);
};

draw();