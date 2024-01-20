<script lang="ts">
  import vertexShaderSource from "../shader/engine/2dtest/vert";
  import fragmentShaderSource from "../shader/engine/2dtest/frag";
  import { onMount } from "svelte";
  import { Engine } from "../engine/Engine";
  import { VertexShader } from "../engine/shader/VertexShader";
  import { FragmentShader } from "../engine/shader/FragmentShader";
  import { Program } from "../engine/Program";
  import { Attribute } from "../engine/Attribute";
  import { Uniform } from "../engine/Uniform";
  import { F } from "../engine/shapes/2d/Chars";
  import { Cube } from "../engine/shapes/2d/Primitives";
  import { degreesToRadians, m3 } from "../engine/util/Math";
  import { hexToRGB } from "../engine/util/Color";

  let canvas: HTMLCanvasElement;
  let color: string = '#0E86E1';
  let translationX: number = 256;
  let translationY: number = 256;
  let rotation: number = 0;
  let scaleX: number = 1;
  let scaleY: number = 1;
  let gl: WebGL2RenderingContext;
  let colorUniform: Uniform;

  let shape: Float32Array = F;

  let transformationUniform: Uniform;
  let positionAttribute: Attribute;

  onMount(() => {
    const engine = new Engine(canvas);
    if (!engine.gl) {
      throw "Could not get gl from Engine.";
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
      name: "a_position",
      program,
    });
    positionAttribute.setBufferData(shape);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(positionAttribute.vao);

    const [colorR, colorG, colorB] = hexToRGB(color, true);

    colorUniform = new Uniform({
      gl,
      type: "4fv",
      name: "u_color",
      program,
      value: [colorR, colorG, colorB, 1],
    });

    transformationUniform = new Uniform({
      gl,
      type: "matrix3fv",
      name: "u_transformation",
      program,
      value: m3.identity,
    });

    draw();
  });

  function draw() {
    if (!gl) return;
    let canvasWidth = canvas instanceof OffscreenCanvas ? canvas.width : canvas.clientWidth;
    let canvasHeight = canvas instanceof OffscreenCanvas ? canvas.height : canvas.clientHeight;

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const [colorR, colorG, colorB] = hexToRGB(color, true);
    colorUniform.value = [colorR, colorG, colorB, 1];

    var matrix = m3.projection(canvasWidth, canvasHeight);
    matrix = m3.translate(matrix, translationX, translationY);
    matrix = m3.rotate(matrix, degreesToRadians(360 - rotation));
    matrix = m3.scale(matrix, scaleX, scaleY);

    transformationUniform.value = matrix;

    // TODO: Move to Mesh class? mesh.draw();
    // Draw the geometry.
    positionAttribute.setBufferData(shape);
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = shape.length / 2;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(draw);
  }
</script>

<canvas bind:this={canvas} width="512" height="512"></canvas>
<div class="controls">
  <div class="control">
    <span class=".label">Positon:</span>
      <span class="label">x</span>
      <input
        type="number"
        bind:value={translationX}
        min={0}
        max={512 - 100}
      />
      <span class="label">y</span>
      <input type="number" bind:value={translationY} min={0} max={512 - 150} />
  </div>
  <div class="control">
    <span class="label">Scale:</span>
      <span class="label">x</span>
      <input
        type="number"
        bind:value={scaleX}
        min={0.1}
        max={3}
        step={0.1}
      />
      <span class="label">y</span>
      <input type="number" bind:value={scaleY} min={0.1} max={3} step={0.1} />
  </div>
  <div class="control">
    <span class="label">Rotation:</span>
      <input type="number" bind:value={rotation} />
  </div>
  <div class="control">
    <span class="label">Color:</span>
    <input type="color" bind:value={color} />
  </div>
  <div class="control">
    <button on:click={() => {
      shape = shape === Cube ? F : Cube;
    }}>
      {#if shape === Cube}
        Show letter "F"
        {:else}
        Show cube
      {/if}
    </button>
  </div>
</div>

<style lang="less">
  canvas {
    border: 1px solid var(--accent);
    background-color: #F7F5ED;
  }

  .controls {
    .control {
      .label {
        margin-right: .25em;
      }
    }
  }
</style>
