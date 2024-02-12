<script lang="ts">
  import vertexShaderSource from '../engine/shader/vert';
  import fragmentShaderSource from '../engine/shader/frag';
  import { onMount } from 'svelte';
  import { Engine } from '../engine/Engine';
  import { VertexShader } from '../engine/shader/VertexShader';
  import { FragmentShader } from '../engine/shader/FragmentShader';
  import { Program } from '../engine/Program';
  import { Attribute } from '../engine/Attribute';
  import { Uniform } from '../engine/Uniform';
  import { F, FColor, FNormals } from '../engine/shapes/3d/Chars';
  import { degreesToRadians, m4, v3 } from '../engine/util/Math';
  import { hexToRGB } from '../engine/util/Color';

  let canvas: HTMLCanvasElement;
  let color: string = '#0E86E1';
  let translationX: number = 0;
  let translationY: number = 0;
  let translationZ: number = 0;
  let rotationX: number = 0;
  let rotationY: number = 0;
  let rotationZ: number = 0;
  let scaleX: number = 1;
  let scaleY: number = 1;
  let scaleZ: number = 1;
  let gl: WebGL2RenderingContext;
  let colorUniform: Uniform;
  let reverseLightingDirectionUniform: Uniform;

  let worldInverseTranspose: Uniform;
  let worldViewUniform: Uniform;
  let positionAttribute: Attribute;
  let colorAttribute: Attribute;
  let normalsAttribute: Attribute;
  let program: Program;

  let mouseRotateActive = false;
  let mouseRotateStartPosition = [0, 0];
  let mouseRotateButton = 0;
  let mouseRotateStartRotate = [0, 0, 0];
  let mouseRotateStartTranslate = [0, 0, 0];
  let mouseRotateStartScale = [0, 0, 0];

  const onMouseDown = (event: MouseEvent) => {
    mouseRotateActive = true;
    mouseRotateButton = event.button;
    mouseRotateStartPosition = [event.clientX, event.clientY];
    mouseRotateStartRotate = [rotationX, rotationY, rotationZ];
    mouseRotateStartTranslate = [translationX, translationY, translationZ];
    mouseRotateStartScale = [scaleX, scaleY, scaleZ];
  };

  const onMouseUp = () => {
    mouseRotateActive = false;
    mouseRotateButton = 0;
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!mouseRotateActive) return;

    const deltaX = mouseRotateStartPosition[0] - event.clientX;
    const deltaY = mouseRotateStartPosition[1] - event.clientY;

    // mousewheel
    if (mouseRotateButton === 0) {
      // FIXME: The axis seem to be swichted here check rotation matrices
      rotationX = mouseRotateStartRotate[0] + deltaY;
      rotationY = mouseRotateStartRotate[1] - deltaX;
    }
    // right mouse button
    if (mouseRotateButton === 2) {
      const factor = canvas.clientHeight / 4;
      scaleX = mouseRotateStartScale[0] + deltaY / factor;
      scaleY = mouseRotateStartScale[1] + deltaY / factor;
      scaleZ = mouseRotateStartScale[2] + deltaY / factor;
    }
  };

  onMount(() => {
    const engine = new Engine(canvas);
    if (!engine.gl) {
      throw 'Could not get gl from Engine.';
    }

    canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);

    gl = engine.gl;
    program = new Program(gl);
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
        type: gl.FLOAT,
      },
    });

    // flip F geometry
    var fMatrix = m4.xRotation(Math.PI);
    fMatrix = m4.translate(fMatrix, -50, -75, -15);
    for (var ii = 0; ii < F.length; ii += 3) {
      var vector = m4.transformVector(fMatrix, [
        F[ii + 0],
        F[ii + 1],
        F[ii + 2],
        1,
      ]);
      F[ii + 0] = vector[0];
      F[ii + 1] = vector[1];
      F[ii + 2] = vector[2];
    }
    positionAttribute.setBufferData(F);

    // // TODO: Move to Mesh class? mesh.draw();
    colorAttribute = new Attribute({
      gl,
      name: 'a_color',
      program,
      pointerProperties: {
        size: 3,
        normalize: true,
        type: gl.UNSIGNED_BYTE,
      },
    });
    colorAttribute.setBufferData(FColor);

    normalsAttribute = new Attribute({
      gl,
      name: 'a_normal',
      program,
      pointerProperties: {
        size: 3,
        // normalize: true,
        type: gl.FLOAT,
      },
    });
    normalsAttribute.setBufferData(FNormals);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(positionAttribute.vao);

    const [colorR, colorG, colorB] = hexToRGB(color, true);

    colorUniform = new Uniform({
      gl,
      type: '4fv',
      name: 'u_color',
      program,
      value: [colorR, colorG, colorB, 1]
    });

    reverseLightingDirectionUniform = new Uniform({
      gl,
      type: '3fv',
      name: 'u_reverseLightDirection',
      program,
      value: v3.normalize([0.5, 0.7, 1]),
    });

    worldInverseTranspose = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_worldInverseTranspose',
      program,
      value: m4.transpose(m4.inverse(m4.identity)),
    });

    worldViewUniform = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_worldViewProjection',
      program,
      value: m4.identity,
    });

    draw();
  });

  function draw(time?: number) {
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

    const aspect = canvasWidth / canvasHeight;
    const zNear = 1;
    const zFar = 10000;
    const fieldOfViewRadians = degreesToRadians(60);

    // Compute the matrix
    const projectionMatrix = m4.perspective(
      fieldOfViewRadians,
      aspect,
      zNear,
      zFar,
    );

    const cameraPosition = [100, 150, 200];
    const up = [0, 1, 0];

    // Draw a F at the origin with rotation
    let worldMatrix = m4.yRotate(m4.identity, degreesToRadians(rotationY));
    worldMatrix = m4.xRotate(worldMatrix, degreesToRadians(rotationX));
    worldMatrix = m4.zRotate(worldMatrix, degreesToRadians(rotationZ));
    worldMatrix = m4.translate(worldMatrix, translationX, translationY, translationZ);

  const fPosition = [worldMatrix[12], worldMatrix[13], worldMatrix[14]];
  const cameraMatrix = m4.lookAt(cameraPosition, fPosition, up);

    // Make a view matrix from the camera matrix.
    const viewMatrix = m4.inverse(cameraMatrix);

    // move the projection space to view space (the space in front of
    // the camera)
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    const worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);

    // Set the matrix.
    worldInverseTranspose.value = worldMatrix;
    worldViewUniform.value = worldViewProjectionMatrix;

    // TODO: Move to Mesh class? mesh.draw();
    // Draw the geometry.
    positionAttribute.setBufferData(F);
    normalsAttribute.setBufferData(FNormals);
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
    <input type="number" bind:value={translationX} />
    <span class="label">y</span>
    <input type="number" bind:value={translationY} />
    <span class="label">z</span>
    <input type="number" bind:value={translationZ} />
  </div>
  <div class="control">
    <span class="label">Scale:</span>
    <input type="number" bind:value={scaleX} min={0.1} max={3} step={0.1} />
    <span class="label">y</span>
    <input type="number" bind:value={scaleY} min={0.1} max={3} step={0.1} />
    <span class="label">z</span>
    <input type="number" bind:value={scaleZ} min={0.1} max={3} step={0.1} />
  </div>
  <div class="control">
    <span class="label">Rotation:</span>
    <span class="label">x</span>
    <input
      type="number"
      bind:value={rotationX}
      step={15}
      min={-360}
      max={360}
    />
    <span class="label">y</span>
    <input
      type="number"
      bind:value={rotationY}
      step={15}
      min={-360}
      max={360}
    />
    <span class="label">z</span>
    <input
      type="number"
      bind:value={rotationZ}
      step={15}
      min={-360}
      max={360}
    />
  </div>
</div>

<style lang="less">
  canvas {
    border: 1px solid const(--accent);
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
