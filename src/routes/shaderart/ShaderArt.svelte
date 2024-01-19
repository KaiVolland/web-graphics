<script lang="ts">
  import vertexShaderSource from "../../shader/shaderArt/main.vert.js";
  import fragmentShaderSource from "../../shader/shaderArt/main.frag.js";
  import { density } from "../../store/shaderArt/density.js";
  import { speedFactor } from "../../store/shaderArt/speedFactor.js";
  import { onMount } from "svelte";
  import SpeedSlider from "../../lib/shaderArt/SpeedSlider.svelte";
  import DensitySlider from "../../lib/shaderArt/DensitySlider.svelte";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const gl = canvas.getContext("webgl2");

    if (!gl) {
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      return;
    }
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    gl.attachShader(program!, vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      return;
    }
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    gl.attachShader(program, fragmentShader!);

    gl.linkProgram(program);

    if (!gl.getProgramParameter(program!, gl.LINK_STATUS)) {
      console.log(gl.getShaderInfoLog(vertexShader!));
      console.log(gl.getShaderInfoLog(fragmentShader!));
    }

    const bufferData = new Float32Array([
      -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, 1,
    ]);

    const uPositionLoc = gl.getUniformLocation(program!, "uResolution");
    gl.uniform2f(uPositionLoc, 1024, 1024);

    const uTimeLoc = gl.getUniformLocation(program!, "uTime");
    gl.uniform1f(uTimeLoc, 0);

    const uDensityLoc = gl.getUniformLocation(program!, "uDensity");
    gl.uniform1f(uDensityLoc, 15.0);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

    const aPositionLoc = 0;
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 2 * 4, 0);

    const draw = (time = 0) => {
      gl.clearColor(0, 0, 0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uDensityLoc, $density);
      gl.uniform1f(uTimeLoc, (time / 1000000) * $speedFactor);

      gl.useProgram(program);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      requestAnimationFrame(draw);
    };

    draw();
  });
</script>

<div class="toolbar">
  <label for="speed-slider">Speed</label>
  <SpeedSlider id="speed-slider" />
  <label for="speed-slider">Density</label>
  <DensitySlider id="density-slider" />
</div>
<canvas bind:this={canvas} width="1024" height="1024"></canvas>

<style>
</style>
