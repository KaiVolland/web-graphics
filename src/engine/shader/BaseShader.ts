export type BaseShaderParams = {
  gl: WebGL2RenderingContext;
  source?: string;
};

export abstract class BaseShader {

  protected _gl: WebGL2RenderingContext;

  protected _webGLShader: WebGLShader;

  protected source: string | null = null;

  constructor({ gl, source }: BaseShaderParams) {
    this._gl = gl;
    this._webGLShader = this.create();
    if (source) {
      this._gl.shaderSource(this._webGLShader, source);
      this._gl.compileShader(this._webGLShader);
    }
  }

  abstract create(): WebGLShader;

  abstract updateSource(source: string): void;

  public get webGLShader () {
    return this._webGLShader;
  }
}
