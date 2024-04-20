<script lang="ts">
  import vertexShaderSource from '../engine/shader/vert';
  import fragmentShaderSource from '../engine/shader/frag';
  import { onMount } from 'svelte';
  import { Scene } from '../engine/Scene';
  import { VertexShader } from '../engine/shader/VertexShader';
  import { FragmentShader } from '../engine/shader/FragmentShader';
  import { Program } from '../engine/models/webgl/Program';
  import { Uniform } from '../engine/models/webgl/Uniform';
  import { F, FNormals, FTexture } from '../engine/shapes/3d/Chars';
  import { degreesToRadians } from '../engine/util/Math';
  import { Vector3, Vector4 } from '../engine/models/math/Vector';
  import { Matrix4 } from '../engine/models/math/Matrix';
  import { Mesh } from '../engine/models/mesh/Mesh';
  import { Texture } from '../engine/models/webgl/Texture';
  import { Cube, CubeNormals } from '../engine/shapes/3d/Primitives';
  import { DirectionalLight } from '../engine/models/light/DirectionalLight';
  import { LightManager } from '../engine/LightManager';

  let canvas: HTMLCanvasElement;
  let worldTranslationX: number = 0;
  let worldTranslationY: number = 0;
  let worldTranslationZ: number = 0;
  let cameraTranslationX: number = 0;
  let cameraTranslationY: number = 100;
  let cameraTranslationZ: number = 400;
  let rotationX: number = 0;
  let rotationY: number = 0;
  let rotationZ: number = 0;
  let gl: WebGL2RenderingContext;
  let meshes: Mesh[] = [];

  let worldInverseTranspose: Uniform;
  let worldViewUniform: Uniform;
  let program: Program;

  let mouseRotateActive = false;
  let mouseRotateStartPosition = [0, 0];
  let mouseAction = 'rotate';
  let mouseRotateStartRotate = [0, 0, 0];
  let mouseRotateStartTranslate = [0, 0, 0];

  const onMouseDown = (event: MouseEvent | TouchEvent) => {
    const isTouch = event instanceof TouchEvent;
    mouseRotateActive = true;
    if (!isTouch) {
      mouseAction = 'rotate';
      mouseRotateStartPosition = [event.clientX, event.clientY];
    } else {
      mouseAction = 'rotate';
      mouseRotateStartPosition = [event.touches[0].clientX, event.touches[0].clientY];
    }
    mouseRotateStartRotate = [rotationX, rotationY, rotationZ];
    mouseRotateStartTranslate = [worldTranslationX, worldTranslationY, worldTranslationZ];
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
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'w') {
      cameraTranslationZ -= 10;
    } else if (event.key === 's') {
      cameraTranslationZ += 10;
    } else if (event.key === 'a') {
      cameraTranslationX -= 10;
    } else if (event.key === 'd') {
      cameraTranslationX += 10;
    }
  };

  onMount(() => {
    const scene = new Scene(canvas);
    if (!scene.gl) {
      throw 'Could not get gl from Scene.';
    }

    canvas.addEventListener('contextmenu', (event) => event.preventDefault());
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('touchstart', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchend', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('touchmove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);

    gl = scene.gl;

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
    scene.linkProgram(program);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program.webGLProgram);

    const lightManager = new LightManager({gl, program});

    var fTransformation = Matrix4.translation(0,0,0);
    fTransformation = fTransformation.rotateX(0);

    const fTexture = new Texture({
      gl,
      program,
      coordinates: FTexture,
      src: './static/f-texture.png'
    });
    const fMesh = new Mesh({
      gl,
      program,
      coordinates: F,
      normals: FNormals,
      texture: fTexture
    });
    fMesh.transform(fTransformation);
    meshes.push(fMesh);

    var cubeTransformation = Matrix4.translation(0,0,0);
    const cubeMesh = new Mesh({
      gl,
      program,
      coordinates: Cube,
      texture: fTexture,
      normals: CubeNormals
    });
    cubeMesh.transform(cubeTransformation);
    meshes.push(cubeMesh);

    const floorTexture = new Texture({
      gl,
      program,
      coordinates: new Float32Array([
        0, 0,
        6, 0,
        6, 6,
        0, 0,
        6, 6,
        0, 6
      ]),
      src: './static/floor.jpeg'
    });
    const floor = new Mesh({
      gl,
      program,
      coordinates: new Float32Array([
        -1000, 0, 1000,
        1000, 0, 1000,
        1000, 0, -1000,
        -1000, 0, 1000,
        1000, 0, -1000,
        -1000, 0, -1000
      ]),
      normals: FNormals,
      texture: floorTexture
    });
    meshes.push(floor);

    worldInverseTranspose = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_worldInverseTranspose',
      program,
      value: new Matrix4().transpose().invert(),
    });

    worldViewUniform = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_worldViewProjection',
      program,
      value: Matrix4.identity,
    });

    const basicLighting = new DirectionalLight({
      direction: new Vector3([0, 0, 1]),
      color: new Vector4([1, 1, 1, 1])
    });
    lightManager.addDirectionalLight(basicLighting);

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
    const projectionMatrix = Matrix4.perspective(
      fieldOfViewRadians,
      aspect,
      zNear,
      zFar,
    );

    const center = new Vector3([0,0,0]);

    const cameraPosition = new Vector3([cameraTranslationX, cameraTranslationY, cameraTranslationZ]);

    let worldMatrix = new Matrix4();
    worldMatrix = worldMatrix
      .rotateY(degreesToRadians(rotationY))
      .rotateX(degreesToRadians(rotationX))
      .rotateZ(degreesToRadians(rotationZ))
      .translate(worldTranslationX, worldTranslationY, worldTranslationZ);

    const cameraMatrix = Matrix4.lookAt(cameraPosition, center);

    // Make a view matrix from the camera matrix.
    const viewMatrix = cameraMatrix.invert();

    // move the projection space to view space (the space in front of the camera)
    let viewProjectionMatrix = Matrix4.multiply(viewMatrix, projectionMatrix);

    const worldViewProjectionMatrix = Matrix4.multiply(
      worldMatrix,
      viewProjectionMatrix,
    );

    // Set the matrix.
    worldInverseTranspose.value = worldMatrix.values;
    worldViewUniform.value = worldViewProjectionMatrix.values;

    // Draw the meshes
    meshes.forEach(mesh => mesh.draw());

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
        <input type="number" bind:value={worldTranslationX} />
      </span>
      <span class="field">
        <span class="label">y</span>
        <input type="number" bind:value={worldTranslationY} min={-1000} max={1000} />
      </span>
      <span class="field">
        <span class="label">z</span>
        <input type="number" bind:value={worldTranslationZ} min={-1000} max={1000} />
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
