import type { DirectionalLight } from "./models/light/DirectionalLight";
import type { PointLight } from "./models/light/PointLight";
import type { Vector3 } from "./models/math/Vector";
import type { Program } from "./models/webgl/Program";

export type LightManagerParams = {
  gl: WebGL2RenderingContext;
  program: Program;
  maxLights?: number;
};

export class LightManager {

  private _DATA_SIZE = 8;

  private _maxLights = 10;

  private _directionalLights: DirectionalLight[] = [];

  private _directionalLightBuffer: WebGLBuffer;

  private _directionalLightArray: Float32Array;

  private _pointLights: PointLight[] = [];

  private _pointLightBuffer: WebGLBuffer;

  private _pointLightArray: Float32Array;

  private _gl: WebGL2RenderingContext;

  private _program: Program;

  constructor({ gl, program, maxLights = 10 }: LightManagerParams) {
    this._gl = gl;
    this._program = program;
    this._maxLights = maxLights;

    this._directionalLightBuffer = gl.createBuffer()!;
    this._directionalLightArray = new Float32Array(this._maxLights * this._DATA_SIZE);

    this._pointLightBuffer = gl.createBuffer()!;
    this._pointLightArray = new Float32Array(this._maxLights * this._DATA_SIZE);
  }

  public get gl() {
    return this._gl;
  }

  get directionalLights() {
    return this._directionalLights;
  }

  public addDirectionalLight(light: DirectionalLight) {
    const gl = this._gl;
    const program = this._program.webGLProgram;
    this._directionalLights.push(light);
    light.index = this._directionalLights.length - 1;
    light.lightManager = this;

    this._directionalLightArray.set(light.direction.values, light.index * this._DATA_SIZE);
    this._directionalLightArray.set([0], light.index * this._DATA_SIZE + 3);
    this._directionalLightArray.set(light.color.values, light.index * this._DATA_SIZE + 4);

    gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, this._directionalLightBuffer);
    gl.bufferData(gl.UNIFORM_BUFFER, this._directionalLightArray, gl.STATIC_DRAW);
    const blockIndex = gl.getUniformBlockIndex(program, 'DirectionalLight');
    gl.uniformBlockBinding(program, blockIndex, 0);
  }

  setDirectionalLightColor(index: number, color: Vector3) {
    const gl = this._gl;
    this._directionalLightArray.set(color.values, index * this._DATA_SIZE + 4);
    gl.bufferData(gl.UNIFORM_BUFFER, this._directionalLightArray, gl.STATIC_DRAW);
  }

  setDirectionalLightDirection(index: number, color: Vector3) {
    const gl = this._gl;
    this._directionalLightArray.set(color.values, index * this._DATA_SIZE);
    gl.bufferData(gl.UNIFORM_BUFFER, this._directionalLightArray, gl.STATIC_DRAW);
  }

  public removeDirectionalLight(light: DirectionalLight) {
    this._directionalLights.splice(light.index, 1);
  }

  public addPointLight(light: PointLight) {
    const gl = this._gl;
    const program = this._program.webGLProgram;
    this._pointLights.push(light);
    light.index = this._pointLights.length - 1;
    light.lightManager = this;

    this._pointLightArray.set(light.position.values, light.index * this._DATA_SIZE);
    this._pointLightArray.set([1], light.index * this._DATA_SIZE + 3);
    this._pointLightArray.set(light.color.values, light.index * this._DATA_SIZE + 4);

    gl.bindBufferBase(gl.UNIFORM_BUFFER, 1, this._pointLightBuffer);
    gl.bufferData(gl.UNIFORM_BUFFER, this._pointLightArray, gl.STATIC_DRAW);
    const blockIndex = gl.getUniformBlockIndex(program, 'PointLight');
    gl.uniformBlockBinding(program, blockIndex, 1);
  }

  setPointLightColor(index: number, color: Vector3) {
    const gl = this._gl;
    this._pointLightArray.set(color.values, index * this._DATA_SIZE + 4);
    gl.bufferData(gl.UNIFORM_BUFFER, this._pointLightArray, gl.STATIC_DRAW);
  }

  setPointLightPosition(index: number, position: Vector3) {
    const gl = this._gl;
    this._pointLightArray.set(position.values, index * this._DATA_SIZE);
    gl.bufferData(gl.UNIFORM_BUFFER, this._pointLightArray, gl.STATIC_DRAW);
  }

  public removePointLight(light: PointLight) {
    this._pointLights.splice(light.index, 1);
  }

}
