import type { Program } from "./Program";

export type AttributeParams = {
  gl: WebGL2RenderingContext;
  name: string;
  program?: Program;
};

export class Attribute {
  private _gl: WebGL2RenderingContext;

  private _buffer: WebGLBuffer;

  private _name: string

  private _program: Program | null = null;

  private _vao: WebGLVertexArrayObject | null = null;

  constructor({ gl, name, program }: AttributeParams) {
    this._gl = gl;
    this._name = name;
    if (program) {
      this._program = program;
    }
    const buffer = gl.createBuffer();
    if (!buffer) {
      throw "Could not create buffer";
    }
    this._buffer = buffer;
  }

  get name() {
    return this._name;
  }

  get buffer() {
    return this._buffer;
  }

  get vao() {
    if (!this._vao) {
      throw "Could not get vao of attribute. Was the data set already?"
    }
    return this._vao;
  }

  getLocation() {
    if (!this._program) {
      throw "Could not get location of attribute. No program attached."
    }
    return this._gl.getAttribLocation(this._program.webGLProgram, this._name);
  }

  // TODO: this should be dynamic i guess
  setBufferData(data: Float32Array) {
    // Create a vertex array object (attribute state)
    this._vao = this._gl.createVertexArray();

    // and make it the one we're currently working with
    this._gl.bindVertexArray(this._vao);

    // Turn on the attribute
    this._gl.enableVertexAttribArray(this.getLocation());

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);

    // Set Geometry.
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      data,
      this._gl.STATIC_DRAW
    );

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3;          // 3 components per iteration
    var type = this._gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    this._gl.vertexAttribPointer(this.getLocation(), size, type, normalize, stride, offset);
  }
}
