<script lang="ts">
  import vertexShaderSource from '../shader/engine/3dtest/vert';
  import fragmentShaderSource from '../shader/engine/3dtest/frag';
  import { onMount } from 'svelte';
  import { Engine } from '../engine/Engine';
  import { VertexShader } from '../engine/shader/VertexShader';
  import { FragmentShader } from '../engine/shader/FragmentShader';
  import { Program } from '../engine/Program';
  import { Attribute } from '../engine/Attribute';
  import { Uniform } from '../engine/Uniform';
  import { F, FColor } from '../engine/shapes/3d/Chars';
  import { degreesToRadians, m4 } from '../engine/util/Math';
  import { hexToRGB } from '../engine/util/Color';
    import { Mesh } from '../engine/mesh/Mesh';

  let canvas: HTMLCanvasElement;
  let color: string = '#0E86E1';
  let gl: WebGL2RenderingContext;
  let colorUniform: Uniform;

  let colorAttribute: Attribute;

  let fMesh: Mesh | undefined;

  let mouseRotateActive = false;
  let mouseRotateStartPosition = [0, 0];
  let mouseRotateButton = 0;

  const onMouseDown = (event: MouseEvent) => {
    mouseRotateActive = true;
    mouseRotateButton = event.button;
    mouseRotateStartPosition = [event.clientX, event.clientY];
  };

  const onMouseUp = () => {
    mouseRotateActive = false;
    mouseRotateButton = 0;
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!mouseRotateActive) return;

    const deltaX = mouseRotateStartPosition[0] - event.clientX;
    const deltaY = mouseRotateStartPosition[1] - event.clientY;

    // left mouse button
    if (mouseRotateButton === 0 && fMesh) {
      fMesh.translation = [deltaX, deltaY, 0];
    }
    // mousewheel
    if (mouseRotateButton === 1 && fMesh) {
      // FIXME: The axis seem to be swichted here check rotation matrices
      fMesh.rotation = [deltaX, deltaY, 0];
    }
    // right mouse button
    if (mouseRotateButton === 2 && fMesh) {
      const factor = canvas.clientHeight/4;
      fMesh.scale = [deltaY, deltaY, deltaY];
    }
  };

  onMount(() => {
    const engine = new Engine(canvas);
    if (!engine.gl) {
      throw 'Could not get gl from Engine.';
    }

    canvas.addEventListener('contextmenu', event => event.preventDefault());
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);

    gl = engine.gl;
    const program = new Program(gl);
    const vertexShader = new VertexShader({
      gl,
      source: vertexShaderSource,
    });
    const fragmentShader = new FragmentShader({
      gl,
      source: fragmentShaderSource,
    });
    program.attachShader(vertexShader);
    program.attachShader(fragmentShader);
    engine.linkProgram(program);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program.webGLProgram);

    // TODO: Move to Mesh class? mesh.draw();
    colorAttribute = new Attribute({
      gl,
      name: 'a_color',
      program,
      pointerProperties: {
        size: 3,
        normalize: true,
        type: gl.UNSIGNED_BYTE
      }
    });
    colorAttribute.setBufferData(FColor);

    fMesh = new Mesh({
      gl,
      program,
      name: 'a_position',
      translation: [256, 256 ,0]
    });

    const [colorR, colorG, colorB] = hexToRGB(color, true);

    colorUniform = new Uniform({
      gl,
      type: '4fv',
      name: 'u_color',
      program,
      value: [colorR, colorG, colorB, 1],
    });

    draw();
  });

  function draw() {
    if (!gl) return;
    let canvasWidth =
      canvas instanceof OffscreenCanvas ? canvas.width : canvas.clientWidth;
    let canvasHeight =
      canvas instanceof OffscreenCanvas ? canvas.height : canvas.clientHeight;

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    const [colorR, colorG, colorB] = hexToRGB(color, true);
    colorUniform.value = [colorR, colorG, colorB, 1];

    const left = 0;
    const right = canvasWidth;
    const bottom = canvasHeight;
    const top = 0;
    const near = 512;
    const far = -512;
    let matrix = m4.orthographic(left, right, bottom, top, near, far);

    // Draw the geometry.
    if (fMesh) {
      fMesh.data = F;
      fMesh.draw();
    }

    colorAttribute.setBufferData(FColor);

    requestAnimationFrame(draw);
  }
</script>

<canvas bind:this={canvas} width="512" height="512"></canvas>
{#if fMesh}
  <div class="controls">
    <div class="control">
      <span class=".label">Positon:</span>
      <span class="label">x</span>
      <input type="number" bind:value={fMesh.translation[0]} min={0} max={512 - 100} />
      <span class="label">y</span>
      <input type="number" bind:value={fMesh.translation[1]} min={0} max={512 - 150} />
      <span class="label">z</span>
      <input type="number" bind:value={fMesh.translation[2]} min={0} max={512 - 150} />
    </div>
    <div class="control">
      <span class="label">Scale:</span>
      <span class="label">x</span>
      <input type="number" bind:value={fMesh.scale[0]} min={0.1} max={3} step={0.1} />
      <span class="label">y</span>
      <input type="number" bind:value={fMesh.scale[1]} min={0.1} max={3} step={0.1} />
      <span class="label">z</span>
      <input type="number" bind:value={fMesh.scale[2]} min={0.1} max={3} step={0.1} />
    </div>
    <div class="control">
      <span class="label">Rotation:</span>
      <span class="label">x</span>
      <input type="number" bind:value={fMesh.rotation[0]} step={15} min={-360} max={360} />
      <span class="label">y</span>
      <input type="number" bind:value={fMesh.rotation[1]} step={15} min={-360} max={360} />
      <span class="label">z</span>
      <input type="number" bind:value={fMesh.rotation[2]} step={15} min={-360} max={360} />
    </div>
  </div>
{/if}

<style lang="less">
  canvas {
    border: 1px solid var(--accent);
    background-color: #f7f5ed;
  }

  .controls {
    .control {
      .label {
        margin-right: 0.25em;
      }
    }
  }
</style>
