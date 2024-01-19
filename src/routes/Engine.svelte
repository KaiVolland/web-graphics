<script lang="ts">
  import vertexShaderSource from '../shader/engine/2dtest/vert';
  import fragmentShaderSource from '../shader/engine/2dtest/frag';
  import { onMount } from 'svelte';
  import { Engine } from '../engine/Engine';
  import { VertexShader } from '../engine/shader/VertexShader';
  import { FragmentShader } from '../engine/shader/FragmentShader';
  import { Program } from '../engine/Program';
  import { Attribute } from '../engine/Attribute';
  import { Uniform } from '../engine/Uniform';
  import F from '../engine/shapes/2d/F';

  let canvas: HTMLCanvasElement;
  let x: number = 0;
  let y: number = 0;
  let r: number = 255;
  let g: number = 0;
  let b: number = 0;
  let a: number = 1;
  let gl: WebGL2RenderingContext;
  let translationUniform: Uniform;
  let resolutionUniform: Uniform;
  let colorUniform: Uniform;

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
    const positionAttribute = new Attribute({
      gl,
      name: 'a_position',
      program,
    });
    positionAttribute.setBufferData(F);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(positionAttribute.vao);

    resolutionUniform = new Uniform({
      gl,
      type: '2f',
      name: 'u_resolution',
      program,
      value: [gl.canvas.width, gl.canvas.height],
    });

    colorUniform = new Uniform({
      gl,
      type: '4fv',
      name: 'u_color',
      program,
      value: [r, g, b, a],
    });

    translationUniform = new Uniform({
      gl,
      type: '2fv',
      name: 'u_translation',
      program,
      value: [x, y],
    });

    draw();
  });

  function draw() {
    if (!gl) return;
    translationUniform.value = [x, y];
    colorUniform.value = [r, g, b, a];

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // TODO: Move to Mesh class? mesh.draw();
    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(draw);
  }

</script>

<canvas bind:this={canvas} width="512" height="512"></canvas>
<div>
  <span>Positon:<span>
    x: <input type="number" bind:value={x} min={0} max={512 - 100} />
    y: <input type="number" bind:value={y} min={0} max={512 - 150} />
</div>

<style lang="less">
  canvas {
    border: 1px solid var(--accent);
  }
</style>
