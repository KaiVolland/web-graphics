import type { BaseShader } from "./shader/BaseShader";
import { FragmentShader } from "./shader/FragmentShader";
import { VertexShader } from "./shader/VertexShader";

export type BaseProgramParams = WebGL2RenderingContext;

export class Program {

  private _gl: WebGL2RenderingContext;

  private _webGLProgram: WebGLProgram;

  private _vertexShader: VertexShader | null = null;

  private _fragmentShader: FragmentShader | null = null;

  constructor(gl: BaseProgramParams) {
    this._gl = gl;
    const program = gl.createProgram();

    if (!program) {
      throw "Could not create program";
    }
    this._webGLProgram = program;
  }

  attachShader(shader: BaseShader) {
    this._gl.attachShader(this._webGLProgram, shader.webGLShader);
    if (shader instanceof VertexShader) {
      this._vertexShader = shader;
    }
    if (shader instanceof FragmentShader) {
      this._fragmentShader = shader;
    }
  }

  getUniformLocation(uniform: string) {
    return this._gl.getUniformLocation(this._webGLProgram, uniform);
  }

  get webGLProgram() {
    return this._webGLProgram;
  }

  get vertexShader() {
    return this._vertexShader;
  }

  get fragmentShader() {
    return this._fragmentShader;
  }

}
