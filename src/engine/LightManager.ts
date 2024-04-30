import { PointLight } from "./models/light/PointLight";
import { SpotLight } from "./models/light/SpotLight";
import type { Vector3 } from "./models/math/Vector";
import type { Program } from "./models/webgl/Program";

export type LightManagerParams = {
  gl: WebGL2RenderingContext;
  program: Program;
  maxLights?: number;
};

export class LightManager {

  static PADDING_VAL = 0;

  private _maxLights = 10;

  private _pointLights: PointLight[] = [];

  private _pointLightBuffer: WebGLBuffer;

  private _pointLightArray: Float32Array;

  private _spotLights: SpotLight[] = [];

  private _spotLightBuffer: WebGLBuffer;

  private _spotLightArray: Float32Array;

  private _gl: WebGL2RenderingContext;

  private _program: Program;

  constructor({ gl, program, maxLights = 10 }: LightManagerParams) {
    this._gl = gl;
    this._program = program;
    this._maxLights = maxLights;

    this._pointLightBuffer = gl.createBuffer()!;
    this._pointLightArray = new Float32Array(this._maxLights * PointLight.DATA_SIZE);
    gl.bindBufferBase(gl.UNIFORM_BUFFER, 1, this._pointLightBuffer);
    const pointLightBlockIndex = gl.getUniformBlockIndex(program.webGLProgram, 'PointLight');
    gl.uniformBlockBinding(program.webGLProgram, pointLightBlockIndex, 1);

    this._spotLightBuffer = gl.createBuffer()!;
    this._spotLightArray = new Float32Array(this._maxLights * SpotLight.DATA_SIZE);
    gl.bindBufferBase(gl.UNIFORM_BUFFER, 2, this._pointLightBuffer);
    const spotLightBlockIndex = gl.getUniformBlockIndex(program.webGLProgram, 'PointLight');
    gl.uniformBlockBinding(program.webGLProgram, spotLightBlockIndex, 1);
  }

  public get gl() {
    return this._gl;
  }

  public addPointLight(light: PointLight) {
    const gl = this._gl;
    const program = this._program.webGLProgram;
    this._pointLights.push(light);
    light.index = this._pointLights.length - 1;
    light.lightManager = this;

    this._pointLightArray.set([
      ...light.position.values,
      LightManager.PADDING_VAL,
      ...light.color.values,
    ], 0);

    gl.bufferData(gl.UNIFORM_BUFFER, this._pointLightArray, gl.STATIC_DRAW);
  }

  setPointLightColor(index: number, color: Vector3) {
    const gl = this._gl;
    const colorIndex = index * PointLight.DATA_SIZE + PointLight.COLOR_OFFSET;
    this._pointLightArray.set(color.values, colorIndex);
    gl.bufferData(gl.UNIFORM_BUFFER, this._pointLightArray, gl.STATIC_DRAW);
  }

  setPointLightPosition(index: number, position: Vector3) {
    const gl = this._gl;
    const positionIndex = index * PointLight.DATA_SIZE;
    this._pointLightArray.set(position.values, positionIndex);
    gl.bufferData(gl.UNIFORM_BUFFER, this._pointLightArray, gl.STATIC_DRAW);
  }

  public removePointLight(light: PointLight) {
    this._pointLights.splice(light.index, 1);
  }

  public addSpotLight(light: SpotLight) {
    const gl = this._gl;
    const program = this._program.webGLProgram;
    this._spotLights.push(light);
    light.index = this._spotLights.length - 1;
    light.lightManager = this;

    this._spotLightArray.set([
      ...light.position.values,
      light.coneAngle,
      ...light.color.values,
      light.blurAngle,
      ...light.direction.values,
    ], 0);

    gl.bindBufferBase(gl.UNIFORM_BUFFER, 1, this._spotLightBuffer);
    gl.bufferData(gl.UNIFORM_BUFFER, this._spotLightArray, gl.STATIC_DRAW);
    const blockIndex = gl.getUniformBlockIndex(program, 'SpotLight');
    gl.uniformBlockBinding(program, blockIndex, 1);
  }

  setSpotLightColor(index: number, color: Vector3) {
    const gl = this._gl;
    const colorIndex = index * SpotLight.DATA_SIZE + SpotLight.COLOR_OFFSET;
    this._spotLightArray.set(color.values, colorIndex);
    gl.bufferData(gl.UNIFORM_BUFFER, this._spotLightArray, gl.STATIC_DRAW);
  }

  setSpotLightPosition(index: number, position: Vector3) {
    const gl = this._gl;
    const positionIndex = index * SpotLight.DATA_SIZE;
    this._spotLightArray.set(position.values, positionIndex);
    gl.bufferData(gl.UNIFORM_BUFFER, this._spotLightArray, gl.STATIC_DRAW);
  }

  setSpotLightDirection(index: number, direction: Vector3) {
    const gl = this._gl;
    const directionIndex = index * SpotLight.DATA_SIZE + SpotLight.DIRECTION_OFFSET;
    this._spotLightArray.set(direction.values, directionIndex);
    gl.bufferData(gl.UNIFORM_BUFFER, this._spotLightArray, gl.STATIC_DRAW);
  }

  setSpotLightConeAngle(index: number, coneAngle: number) {
    const gl = this._gl;
    const coneAngleIndex = index * SpotLight.DATA_SIZE + SpotLight.CONE_ANGLE_OFFSET;
    this._spotLightArray[coneAngleIndex] = coneAngle;
    gl.bufferData(gl.UNIFORM_BUFFER, this._spotLightArray, gl.STATIC_DRAW);
  }

  setSpotLightBlurAngle(index: number, blurAngle: number) {
    const gl = this._gl;
    const blurAngleIndex = index * SpotLight.DATA_SIZE + SpotLight.BLUR_ANGLE_OFFSET;
    this._spotLightArray[blurAngleIndex] = blurAngle;
    gl.bufferData(gl.UNIFORM_BUFFER, this._spotLightArray, gl.STATIC_DRAW);
  }

}
