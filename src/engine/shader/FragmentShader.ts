import { BaseShader, type BaseShaderParams } from "./BaseShader";

export interface FragmentShaderParams extends BaseShaderParams {
}

export class FragmentShader extends BaseShader {

  constructor({ gl, source }: FragmentShaderParams) {
    super({ gl, source });
  }

  create() {
    const shader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
    if (!shader) {
      throw 'Could not create FragmentShader';
    }
    return shader;
  };

  updateSource(source: string): void {

  }
}
