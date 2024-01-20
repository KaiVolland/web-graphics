import type { Program } from "./Program";

type Dimensions = '1' | '2' | '3' | '4';
type Datatype = 'f' | 'i';
type Sequence = 'v' | '';
type WebGLType = `${Dimensions}${Datatype}${Sequence}` | 'matrix2fv' | 'matrix3fv' | 'matrix4fv';

export type UniformParams = {
  gl: WebGL2RenderingContext;
  name: string;
  program?: Program;
  type: WebGLType;
  // TODO: determine by type
  value?: number | number[];
};

export class Uniform {
  private _gl: WebGL2RenderingContext;

  private _value: number | number[] | null = null;

  private _type: any;

  private _name: string

  private _program: Program | null = null;

  constructor({ gl, type, name, program, value }: UniformParams) {
    this._gl = gl;
    this._name = name;
    this._type = type;
    if (program) {
      this._program = program;
    }
    if (value) {
      this.value = value;
    }
  }

  set value(value: number | number[]) {
    this._value = value;

    if (!Array.isArray(value)) {
      switch (this._type) {
        case '1f':
        case '1i':
          this._gl.uniform1i(this.getLocation(), value as number);
          break;
        default:
          throw `Invalid value ${value} for type ${this._type}`;
      }
    } else {
      switch (this._type) {
        case '2i':
        case '2f':
          this._gl.uniform2f(this.getLocation(), value[0], value[1]);
          break;
        case '3f':
        case '3i':
          this._gl.uniform3f(this.getLocation(), value[0], value[1], value[2]);
          break;
        case '4f':
        case '4i':
          this._gl.uniform4f(this.getLocation(), value[0], value[1], value[2], value[3]);
          break;
        case 'matrix2fv':
          this._gl.uniformMatrix2fv(this.getLocation(), false, value);
          break;
        case 'matrix3fv':
          this._gl.uniformMatrix3fv(this.getLocation(), false, value);
          break;
        case 'matrix4fv':
          this._gl.uniformMatrix4fv(this.getLocation(), false, value);
          break;
        case '2fv':
          this._gl.uniform2fv(this.getLocation(), value);
          break;
        case '3fv':
          this._gl.uniform3fv(this.getLocation(), value);
          break;
        case '4fv':
          this._gl.uniform4fv(this.getLocation(), value);
          break;
        default:
          throw `Invalid value ${value} for type ${this._type}`;
      }
    }
  }

  getLocation() {
    if (!this._program) {
      throw "Could not get location of uniform. No program attached."
    }
    return this._gl.getUniformLocation(this._program.webGLProgram, this._name);
  }
}
