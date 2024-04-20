import type { DirectionalLight } from "./models/light/DirectionalLight";
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

  private _gl: WebGL2RenderingContext;

  private _program: Program;

  constructor({ gl, program, maxLights = 10 }: LightManagerParams) {
    this._gl = gl;
    this._program = program;
    this._maxLights = maxLights;

    this._directionalLightBuffer = gl.createBuffer()!;
    this._directionalLightArray = new Float32Array(this._maxLights * this._DATA_SIZE);
  }

  public get gl() {
    return this._gl;
  }

  public addDirectionalLight(light: DirectionalLight) {
    const gl = this._gl;
    const program = this._program.webGLProgram;
    this._directionalLights.push(light);
    light.index = this._directionalLights.length - 1;

    this._directionalLightArray.set(light.direction.values, light.index * this._DATA_SIZE);
    this._directionalLightArray.set([0], light.index * this._DATA_SIZE + 3);
    this._directionalLightArray.set(light.color.values, light.index * this._DATA_SIZE + 4);

    gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, this._directionalLightBuffer);
    gl.bufferData(gl.UNIFORM_BUFFER, this._directionalLightArray, gl.STATIC_DRAW);
    const blockIndex = gl.getUniformBlockIndex(program, 'DirectionalLight');
    gl.uniformBlockBinding(program, blockIndex, 0);
  }

  public removeDirectionalLight(light: DirectionalLight) {
    this._directionalLights.splice(light.index, 1);
  }

}
