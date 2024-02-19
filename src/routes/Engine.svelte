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
  import { degreesToRadians, m4 } from '../engine/util/Math';
  import { Vector3 } from '../engine/models/math/Vector';
  import { Matrix4 } from '../engine/models/math/Matrix';

  let canvas: HTMLCanvasElement;
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
  let lightWorldPosition: Uniform;
  let viewWorldPosition: Uniform;
  let shininess: Uniform;
  let specularColor: Uniform;
  let lightColor: Uniform;

  let world: Uniform;
  let worldInverseTranspose: Uniform;
  let worldViewUniform: Uniform;
  let positionAttribute: Attribute;
  let colorAttribute: Attribute;
  let normalsAttribute: Attribute;
  let program: Program;

  let mouseRotateActive = false;
  let mouseRotateStartPosition = [0, 0];
  let mouseAction = 'rotate';
  let mouseRotateStartRotate = [0, 0, 0];
  let mouseRotateStartTranslate = [0, 0, 0];
  let mouseRotateStartScale = [0, 0, 0];

  const onMouseDown = (event: MouseEvent | TouchEvent) => {
    const isTouch = event instanceof TouchEvent;
    mouseRotateActive = true;
    if (!isTouch) {
      mouseAction = event.button === 0 ? 'rotate' : 'scale';
      mouseRotateStartPosition = [event.clientX, event.clientY];
    } else {
      mouseAction = 'rotate';
      mouseRotateStartPosition = [event.touches[0].clientX, event.touches[0].clientY];
    }
    mouseRotateStartRotate = [rotationX, rotationY, rotationZ];
    mouseRotateStartTranslate = [translationX, translationY, translationZ];
    mouseRotateStartScale = [scaleX, scaleY, scaleZ];
  };

  const onMouseUp = () => {
    mouseRotateActive = false;
    mouseAction = 'rotate';
  };

  const onMouseMove = (event: MouseEvent | TouchEvent) => {
    const isTouch = event instanceof TouchEvent;

    if (!mouseRotateActive) return;
    const eventX = isTouch ? event.touches[0].clientX : event.clientX
    const eventY = isTouch ? event.touches[0].clientY : event.clientY;

    const deltaX = mouseRotateStartPosition[0] - eventX;
    const deltaY = mouseRotateStartPosition[1] - eventY;

    // mousewheel
    if (mouseAction === 'rotate') {
      // FIXME: The axis seem to be swichted here check rotation matrices
      rotationX = mouseRotateStartRotate[0] - deltaY;
      rotationY = mouseRotateStartRotate[1] - deltaX;
    }
    // right mouse button
    if (mouseAction === 'scale') {
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
    canvas.addEventListener('touchstart', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchend', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onMouseMove);

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
        type: gl.FLOAT,
      },
    });
    normalsAttribute.setBufferData(FNormals);

    // Bind the attribute/buffer set we want.
    gl.bindVertexArray(positionAttribute.vao);

    lightColor = new Uniform({
      gl,
      type: '3fv',
      name: 'u_lightColor',
      program,
      value: new Vector3([1, 0.6, 0.6]).normalize().values
    });

    specularColor = new Uniform({
      gl,
      type: '3fv',
      name: 'u_specularColor',
      program,
      value: new Vector3([1, 0.2, 0.2]).normalize().values
    });

    shininess = new Uniform({
      gl,
      type: '1f',
      name: 'u_shininess',
      program,
      value: 50,
    });

    viewWorldPosition = new Uniform({
      gl,
      type: '3fv',
      name: 'u_viewWorldPosition',
      program,
      value: new Vector3([0, 0, 400]).values,
    });

    lightWorldPosition = new Uniform({
      gl,
      type: '3fv',
      name: 'u_lightWorldPosition',
      program,
      value: new Vector3([20, 30, 50]).values,
    });

    world = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_world',
      program,
      value: Matrix4.identity,
    });

    worldInverseTranspose = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_worldInverseTranspose',
      program,
      value: m4.transpose(m4.inverse(Matrix4.identity)),
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

    // Check if the canvas is not the same size.
    const needResize =
      canvas.width !== canvas.clientWidth ||
      canvas.height !== canvas.clientHeight;
    if (needResize) {
      // Make the canvas the same size
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

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

    const cameraPosition = new Vector3([0, 0, 400]);

    // Draw a F at the origin with rotation
    let worldMatrix = m4.yRotate(m4.identity, degreesToRadians(rotationY));
    worldMatrix = m4.xRotate(worldMatrix, degreesToRadians(rotationX));
    worldMatrix = m4.zRotate(worldMatrix, degreesToRadians(rotationZ));
    worldMatrix = m4.translate(
      worldMatrix,
      translationX,
      translationY,
      translationZ,
    );

    const fPosition = new Vector3([worldMatrix[12], worldMatrix[13], worldMatrix[14]]);
    const cameraMatrix = m4.lookAt(cameraPosition, fPosition);

    // Make a view matrix from the camera matrix.
    const viewMatrix = m4.inverse(cameraMatrix);

    // move the projection space to view space (the space in front of
    // the camera)
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    const worldViewProjectionMatrix = m4.multiply(
      viewProjectionMatrix,
      worldMatrix,
    );

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

<div class="engine">
  <!-- Size will get set in the draw call -->
  <canvas bind:this={canvas} />
  <div class="controls">
    <div class="control">
      <span class="field">
        <span class=".label">Positon:</span>
      </span>
      <span class="field">
        <span class="label">x</span>
        <input type="number" bind:value={translationX} />
      </span>
      <span class="field">
        <span class="label">y</span>
        <input type="number" bind:value={translationY} min={-1000} max={1000} />
      </span>
      <span class="field">
        <span class="label">z</span>
        <input type="number" bind:value={translationZ} min={-1000} max={1000} />
      </span>
    </div>
    <div class="control">
      <span class="field">
        <span class="label">Scale:</span>
      </span>
      <span class="field">
        <span class="label">x</span>
        <input type="number" bind:value={scaleX} min={0.1} max={3} step={0.1} />
      </span>
      <span class="field">
        <span class="label">y</span>
        <input type="number" bind:value={scaleY} min={0.1} max={3} step={0.1} />
      </span>
      <span class="field">
        <span class="label">z</span>
        <input type="number" bind:value={scaleZ} min={0.1} max={3} step={0.1} />
      </span>
    </div>
    <div class="control">
      <span class="field">
        <span class="label">Rotation:</span>
      </span>
      <span class="field">
        <span class="label">x</span>
        <input
          type="number"
          bind:value={rotationX}
          step={15}
          min={-360}
          max={360}
        />
      </span>
      <span class="field">
        <span class="label">y</span>
        <input
          type="number"
          bind:value={rotationY}
          step={15}
          min={-360}
          max={360}
        />
      </span>
      <span class="field">
        <span class="label">z</span>
        <input
          type="number"
          bind:value={rotationZ}
          step={15}
          min={-360}
          max={360}
        />
      </span>
    </div>
  </div>
</div>

<style lang="less">
  .engine {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 1px solid const(--accent);
    background-color: #f7f5ed;
  }

  .controls {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: column;

    .control {
      display: flex;
      flex: 1;

      .field {
        flex: 1;
        display: flex;
        justify-content: center;

        input[type='number'] {
          flex: 1;
          max-width: 50px;
        }

        &:first-child {
          justify-content: flex-end;
        }
      }
      .label {
        margin-right: 0.25em;
      }
    }
  }
</style>
