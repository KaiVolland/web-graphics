import type { Program } from "./Program";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type WebGLPointerType = WebGL2RenderingContext[
  "BYTE" |
  "FLOAT" |
  "SHORT" |
  "UNSIGNED_BYTE" |
  "UNSIGNED_SHORT" |
  "HALF_FLOAT" |
  "INT" |
  "UNSIGNED_INT" |
  "INT_2_10_10_10_REV" |
  "UNSIGNED_INT_2_10_10_10_REV"
];

export type AttributePointerProperties = {
  normalize: boolean;
  offset: number;
  size: number;
  stride: number;
  type: WebGLPointerType;
};

export type AttributeParams = {
  gl: WebGL2RenderingContext;
  name: string;
  program?: Program;
  pointerProperties: PartialBy<AttributePointerProperties, "normalize" | "stride" | "offset">;
  createVao?: boolean;
};

export class Attribute {
  protected _gl: WebGL2RenderingContext;

  protected _buffer: WebGLBuffer;

  protected _name: string

  protected _program: Program | null = null;

  protected _vao: WebGLVertexArrayObject | null = null;

  protected _pointerProperties: AttributePointerProperties;

  protected _createVao: boolean;

  constructor({ gl, name, program, pointerProperties, createVao }: AttributeParams) {
    this._gl = gl;
    this._name = name;
    if (program) {
      this._program = program;
    }
    this._createVao = createVao || false;
    const buffer = gl.createBuffer();
    if (!buffer) {
      throw "Could not create buffer";
    }
    this._pointerProperties = {
      normalize: false,
      stride: 0,
      offset: 0,
      ...pointerProperties
    };
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
  setBufferData(data: ArrayBuffer ) {

    if(this._createVao) {
      // Create a vertex array object (attribute state)
      this._vao = this._gl.createVertexArray();

      // and make it the one we're currently working with
      this._gl.bindVertexArray(this._vao);
    }

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

    const {
      size,
      type,
      normalize,
      stride,
      offset
    } =this._pointerProperties;

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    this._gl.vertexAttribPointer(this.getLocation(), size, type, normalize, stride, offset);
  }
}
