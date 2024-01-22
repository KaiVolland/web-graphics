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

  let canvas: HTMLCanvasElement;
  let color: string = '#0E86E1';
  let translationX: number = 256;
  let translationY: number = 256;
  let translationZ: number = 0;
  let rotationX: number = 0;
  let rotationY: number = 0;
  let rotationZ: number = 0;
  let scaleX: number = 1;
  let scaleY: number = 1;
  let scaleZ: number = 1;
  let gl: WebGL2RenderingContext;
  let colorUniform: Uniform;

  let transformationUniform: Uniform;
  let positionAttribute: Attribute;
  let colorAttribute: Attribute;

  onMount(() => {
    const engine = new Engine(canvas);
    if (!engine.gl) {
      throw 'Could not get gl from Engine.';
    }

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
    positionAttribute = new Attribute({
      gl,
      name: 'a_position',
      program,
      createVao: true,
      pointerProperties: {
        size: 3,
        type: gl.FLOAT
      }
    });
    positionAttribute.setBufferData(F);

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

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(positionAttribute.vao);

    const [colorR, colorG, colorB] = hexToRGB(color, true);

    colorUniform = new Uniform({
      gl,
      type: '4fv',
      name: 'u_color',
      program,
      value: [colorR, colorG, colorB, 1],
    });

    transformationUniform = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_transformation',
      program,
      value: m4.identity,
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
    matrix = m4.translate(matrix, translationX, translationY, translationZ);
    matrix = m4.xRotate(matrix, degreesToRadians(360 - rotationX));
    matrix = m4.yRotate(matrix, degreesToRadians(360 - rotationY));
    matrix = m4.zRotate(matrix, degreesToRadians(360 - rotationZ));
    matrix = m4.scale(matrix, scaleX, scaleY, scaleZ);

    transformationUniform.value = matrix;

    // TODO: Move to Mesh class? mesh.draw();
    // Draw the geometry.
    positionAttribute.setBufferData(F);
    colorAttribute.setBufferData(FColor);

    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = F.length / 3;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(draw);
  }
</script>

<canvas bind:this={canvas} width="512" height="512"></canvas>
<div class="controls">
  <div class="control">
    <span class=".label">Positon:</span>
    <span class="label">x</span>
    <input type="number" bind:value={translationX} min={0} max={512 - 100} />
    <span class="label">y</span>
    <input type="number" bind:value={translationY} min={0} max={512 - 150} />
    <span class="label">z</span>
    <input type="number" bind:value={translationZ} min={0} max={512 - 150} />
  </div>
  <div class="control">
    <span class="label">Scale:</span>
    <span class="label">x</span>
    <input type="number" bind:value={scaleX} min={0.1} max={3} step={0.1} />
    <span class="label">y</span>
    <input type="number" bind:value={scaleY} min={0.1} max={3} step={0.1} />
    <span class="label">z</span>
    <input type="number" bind:value={scaleZ} min={0.1} max={3} step={0.1} />
  </div>
  <div class="control">
    <span class="label">Rotation:</span>
    <span class="label">x</span>
    <input type="number" bind:value={rotationX} step={15} min={-360} max={360} />
    <span class="label">y</span>
    <input type="number" bind:value={rotationY} step={15} min={-360} max={360} />
    <span class="label">z</span>
    <input type="number" bind:value={rotationZ} step={15} min={-360} max={360} />
  </div>
</div>

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
