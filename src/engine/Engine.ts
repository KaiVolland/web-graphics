import type { Program } from "./Program";

export type PeterConstructorParams = HTMLCanvasElement;

export class Engine {

  private _gl: WebGL2RenderingContext;

  /**
   * The width of the passed canvas;
   */
  private _width: number;

  /**
   * The height of the passed canvas;
   */
  private _height: number;

  constructor(canvas: PeterConstructorParams) {
    this._width = canvas.width;
    this._height = canvas.height;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      throw `Could not get webgl2 context of canvas element: ${canvas}`;
    }
    this._gl = gl;
  }

  public linkProgram(program: Program) {
    this._gl.linkProgram(program.webGLProgram);

    if (!this._gl.getProgramParameter(program.webGLProgram, this._gl.LINK_STATUS)) {
      if (program.vertexShader) {
        console.log(this._gl.getShaderInfoLog(program.vertexShader.webGLShader));
      }
      if (program.fragmentShader) {
        console.log(this._gl.getShaderInfoLog(program.fragmentShader.webGLShader));
      }
    }
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public get gl() {
    return this._gl;
  }
}
