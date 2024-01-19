import { BaseShader, type BaseShaderParams } from "./BaseShader";

export interface VertexShaderParams extends BaseShaderParams {
}

export class VertexShader extends BaseShader {

  constructor({ gl, source }: VertexShaderParams) {
    super({ gl, source });
  }

  create() {
    const shader = this._gl.createShader(this._gl.VERTEX_SHADER);
    if (!shader) {
      throw 'Could not create VertexShader';
    }
    return shader;
  };

  updateSource(source: string): void {

  }
}
