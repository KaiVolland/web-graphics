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
  import F from "../engine/shapes/2d/F";
  import { degreesToRadians, m3 } from "../engine/util/Math";

  let canvas: HTMLCanvasElement;
  let colorR: number = 255;
  let colorG: number = 0;
  let colorB: number = 0;
  let colorA: number = 1;
  let translationX: number = 200;
  let translationY: number = 200;
  let rotation: number = 0;
  let scaleX: number = 1;
  let scaleY: number = 1;
  let gl: WebGL2RenderingContext;
  let colorUniform: Uniform;
  let resolutionUniform: Uniform;

  let transformationUniform: Uniform;

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
      name: "a_position",
      program,
    });
    positionAttribute.setBufferData(F);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(positionAttribute.vao);

    resolutionUniform = new Uniform({
      gl,
      type: "2f",
      name: "u_resolution",
      program,
      value: [gl.canvas.width, gl.canvas.height],
    });

    colorUniform = new Uniform({
      gl,
      type: "4fv",
      name: "u_color",
      program,
      value: [colorR, colorG, colorB, colorA],
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

    const translationMatrix = m3.translation(translationX, translationY);
    // "360 - rotation" is needed as we modified the coordinates to have 0,0 at the top left
    const rotationMatrix = m3.rotation(degreesToRadians(360 - rotation));
    const scaleMatrix = m3.scaling(scaleX, scaleY);

    let matrix = m3.identity;
    matrix = m3.multiply(matrix, translationMatrix);
    matrix = m3.multiply(matrix, rotationMatrix);
    matrix = m3.multiply(matrix, scaleMatrix);

    transformationUniform.value = matrix;

    colorUniform.value = [colorR, colorG, colorB, colorA];

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // TODO: Move to Mesh class? mesh.draw();
    // Draw the geometry.
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 18;
    gl.drawArrays(primitiveType, offset, count);

    requestAnimationFrame(draw);
  }
</script>

<canvas bind:this={canvas} width="512" height="512"></canvas>
<div>
  <span
    >Positon:<span>
      x: <input type="number" bind:value={translationX} min={0} max={512 - 100} />
      y: <input type="number" bind:value={translationY} min={0} max={512 - 150} />
    </span></span
  >
</div>
<div>
  <span
    >Scale:<span>
      x: <input
        type="number"
        bind:value={scaleX}
        min={0.1}
        max={3}
        step={0.1}
      />
      y:
      <input type="number" bind:value={scaleY} min={0.1} max={3} step={0.1} />
    </span></span
  >
</div>
<div>
  <span
    >Rotation:<span>
      <input type="number" bind:value={rotation} />
    </span></span
  >
</div>

<style lang="less">
  canvas {
    border: 1px solid var(--accent);
  }
</style>
