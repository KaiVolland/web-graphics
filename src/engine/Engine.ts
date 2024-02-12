import type { Program } from "./Program";

export type PeterConstructorParams = HTMLCanvasElement;

// TODO: This class should be renamed
export class Engine {

  private _gl: WebGL2RenderingContext | null = null;

  private _canvas: HTMLCanvasElement;

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
    this._canvas = canvas;
    this.updateGL();
    this.updateViewPort();
  }

  set canvas(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this.updateGL();
    this.updateViewPort();
  }

  private updateGL() {
    const gl = this._canvas.getContext("webgl2");
    if (!gl) {
      throw `Could not get webgl2 context of canvas element: ${this._canvas}`;
    }
    this._gl = gl;
  }

  updateViewPort() {
    if (!this._gl) {
      throw `Could not update viewport.`;
    }

    // Tell WebGL how to convert from clip space to pixels
    this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
  }

  public linkProgram(program: Program) {
    if (!this._gl) {
      throw `Could not link program.`;
    }
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
