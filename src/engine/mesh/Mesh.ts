import { Attribute, type AttributeParams } from "../Attribute";
import type { Program } from "../Program";
import { Uniform } from "../Uniform";
import type { Vec3 } from "../types";
import { degreesToRadians, m4 } from "../util/Math";

export type MeshProperties = {
  gl: WebGL2RenderingContext;
  program: Program;
  name: string;
  translation?: Vec3<number>;
  rotation?: Vec3<number>;
  scale?: Vec3<number>;
  attributeProps?: AttributeParams;
  data?: Float32Array;
}

export class Mesh {

  protected _gl: WebGL2RenderingContext;
  protected _data: Float32Array | undefined;
  protected _program: Program;
  protected _attribute: Attribute;
  protected _transformationUniform: Uniform;
  protected _translation: Vec3<number> = [0, 0, 0];
  protected _rotation: Vec3<number> = [0, 0, 0];
  protected _scaling: Vec3<number> = [1, 1, 1];

  constructor({
    gl,
    program,
    data,
    name,
    attributeProps = {
      name,
      gl,
      program,
      createVao: true,
      pointerProperties: {
        size: 3,
        type: gl.FLOAT
      }
    },
    translation,
    rotation,
    scale,
  }: MeshProperties) {
    this._gl = gl;
    this._program = program;

    this._attribute = new Attribute({
      ...attributeProps
    });


    this._transformationUniform = new Uniform({
      gl,
      type: 'matrix4fv',
      name: 'u_transformation',
      program,
      value: m4.identity,
    });

    if (data) {
      this._data = data;
      // Bind the attribute/buffer set we want.
      gl.bindVertexArray(this._attribute.vao);
    }

    if (translation) {
      this.translation = translation;
    }
    if (rotation) {
      this.rotation = rotation;
    }
    if (scale) {
      this.scale = scale;
    }

  }

  /**
   * 
   * @param data 
   */
  set data(data: Float32Array) {
    this._data = data;
    this._attribute.setBufferData(data);
  }

  public draw() {
    if (!this._data) return;
    const primitiveType = this._gl.TRIANGLES;
    const offset = 0;
    const count = this._data.length / 3;
    let matrix = m4.identity;
    matrix = m4.translate(matrix, this._translation[0], this._translation[1], this._translation[2]);
    matrix = m4.xRotate(matrix, degreesToRadians(360 - this._rotation[0]));
    matrix = m4.yRotate(matrix, degreesToRadians(360 - this._rotation[1]));
    matrix = m4.zRotate(matrix, degreesToRadians(360 - this._rotation[2]));
    matrix = m4.scale(matrix, this._scaling[0], this._scaling[1], this._scaling[2]);
    this._transformationUniform.value = matrix;
    this._gl.drawArrays(primitiveType, offset, count);
  }

  set translation(translation: Vec3<number>) {
    this._translation[0] = this._translation[0] + translation[0];
    this._translation[1] = this._translation[1] + translation[1];
    this._translation[2] = this._translation[2] + translation[2];
  }

  get translation() {
    return this._translation;
  }

  set scale(scale: Vec3<number>) {
    this._scaling[0] = this._scaling[0] + scale[0];
    this._scaling[1] = this._scaling[1] + scale[1];
    this._scaling[2] = this._scaling[2] + scale[2];
  }

  get scale() {
    return this._scaling;
  }

  set rotation(rotation: Vec3<number>) {
    this._rotation[0] = this._rotation[0] + rotation[0];
    this._rotation[1] = this._rotation[1] + rotation[1];
    this._rotation[2] = this._rotation[2] + rotation[2];
  }

  get rotation() {
    return this._rotation;
  }

};
