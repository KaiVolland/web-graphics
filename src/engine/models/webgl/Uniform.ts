import { Matrix, type MatrixValues } from "../math/Matrix";
import { Vector, type VectorValues } from "../math/Vector";
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
  value?: Vector<VectorValues> | Matrix<MatrixValues> | number | number[];
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
    if (value !== undefined) {
      if (value instanceof Matrix || value instanceof Vector) {
        this.value = value.values;
      } else {
        this.value = value;
      }
    }
  }

  get value() {
    return this._value;
  }

  set value(value: Vector<VectorValues> | Matrix<MatrixValues> | number | number[] | null) {
    if (value instanceof Matrix || value instanceof Vector) {
      this._value = value.values;
    } else {
      this._value = value;
    }
    const location = this.getLocation();

    if (!Array.isArray(value)) {
      switch (this._type) {
        case '1f':
          this._gl.uniform1f(location, value as number);
          break;
        case '1i':
          this._gl.uniform1i(location, value as number);
          break;
        default:
          throw `Invalid value ${value} for type ${this._type}`;
      }
    } else {
      switch (this._type) {
        case '2f':
          this._gl.uniform2f(location, value[0], value[1]);
          break;
        case '2i':
          this._gl.uniform2i(location, value[0], value[1]);
          break;
        case '3f':
          this._gl.uniform3f(location, value[0], value[1], value[2]);
          break;
        case '3i':
          this._gl.uniform3i(location, value[0], value[1], value[2]);
          break;
        case '4f':
          this._gl.uniform4f(location, value[0], value[1], value[2], value[3]);
          break;
        case '4i':
          this._gl.uniform4i(location, value[0], value[1], value[2], value[3]);
          break;
        case 'matrix2fv':
          this._gl.uniformMatrix2fv(location, false, value);
          break;
        case 'matrix3fv':
          this._gl.uniformMatrix3fv(location, false, value);
          break;
        case 'matrix4fv':
          this._gl.uniformMatrix4fv(location, false, value);
          break;
        case '2fv':
          this._gl.uniform2fv(location, value);
          break;
        case '3fv':
          this._gl.uniform3fv(location, value);
          break;
        case '4fv':
          this._gl.uniform4fv(location, value);
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
