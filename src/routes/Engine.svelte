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

  onMount(() => {
    const engine = new Engine(canvas);
    const gl = engine.gl;
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

    const positionAttribute = new Attribute({
      gl,
      name: "a_position",
      program
    });
    positionAttribute.setBufferData(F);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // Tell it to use our program (pair of shaders)
    gl.useProgram(program.webGLProgram);

    const resolutionUniform = new Uniform({
      gl,
      type: "2f",
      name: "u_resolution",
      program,
      value: [gl.canvas.width, gl.canvas.height]
    });

    const colorUniform = new Uniform({
      gl,
      type: "4fv",
      name: "u_color",
      program,
      value: [Math.random(), Math.random(), Math.random(), 1]
    });

    const translationUniform = new Uniform({
      gl,
      type: "2fv",
      name: "u_translation",
      program,
      value: [0, 0]
    });

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(positionAttribute.vao);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 18;
    gl.drawArrays(primitiveType, offset, count);
  });

</script>

<canvas bind:this={canvas} width="512" height="512"></canvas>

<style lang="less">
  canvas {
    border: 1px solid var(--accent);
  }
</style>
