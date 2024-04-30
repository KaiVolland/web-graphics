import { ObjParser } from "../../parser/ObjParser";
import type { Matrix4 } from "../math/Matrix";
import { Vector4, type Vector4D } from "../math/Vector";
import { Attribute } from "../webgl/Attribute";
import type { Program } from "../webgl/Program";
import type { Texture } from "../webgl/Texture";

export type MeshParams = {
  program: Program;
  gl: WebGL2RenderingContext;
  coordinates?: Float32Array;
  texture?: Texture;
  normals?: Float32Array;
};

export class Mesh {

  static fromObjString(objString: string, mtlString?: string) {
    return ObjParser.readObj(objString);
  }

  private _gl: WebGL2RenderingContext;

  private _positionAttribute?: Attribute;

  private _normalsAttribute?: Attribute;

  private _texture?: Texture;

  private _coordinates?: Float32Array;

  private _normals?: Float32Array;

  constructor({
    coordinates,
    normals,
    texture,
    gl,
    program
  }: MeshParams) {

    this._coordinates = coordinates;

    this._normals = normals;

    this._gl = gl;

    this._positionAttribute = new Attribute({
      gl,
      name: 'a_position',
      program,
      createVao: true,
      pointerProperties: {
        size: 3,
        type: gl.FLOAT,
      },
    });
    if (coordinates) {
      this._positionAttribute.setBufferData(coordinates);
    }
    this._normalsAttribute = new Attribute({
      gl,
      name: 'a_normal',
      program,
      pointerProperties: {
        size: 3,
        type: gl.FLOAT,
      },
    })
    if (normals) {
      this._normalsAttribute.setBufferData(normals);
    }
    if (texture) {
      this._texture = texture;
    }
  }

  get coordinates(): Float32Array | undefined {
    return this._coordinates;
  }

  public transform(matrix: Matrix4) {
    if (!this._coordinates || !this._positionAttribute) {
      return;
    }
    const size = this._positionAttribute.getPointerProperties().size;
    for (var i = 0; i < this._coordinates.length; i += size) {
      var vector = matrix.transformVector(new Vector4([
        this._coordinates[i + 0],
        this._coordinates[i + 1],
        this._coordinates[i + 2],
        1,
      ])
      );
      this._coordinates[i + 0] = vector.values[0];
      this._coordinates[i + 1] = vector.values[1];
      this._coordinates[i + 2] = vector.values[2];
    }
    this._positionAttribute.setBufferData(this._coordinates);

    if (!this._normals || !this._normalsAttribute) {
      return;
    }
    const normalsSize = this._positionAttribute.getPointerProperties().size;
    for (var i = 0; i < this._normals.length; i += normalsSize) {
      var vector = matrix.transformVector(new Vector4([
        this._normals[i + 0],
        this._normals[i + 1],
        this._normals[i + 2],
        1,
      ])
      );
      this._normals[i + 0] = vector.values[0];
      this._normals[i + 1] = vector.values[1];
      this._normals[i + 2] = vector.values[2];
    }
    this._normalsAttribute.setBufferData(this._normals);
  }

  public draw() {
    if (!this._positionAttribute) {
      console.log('No position attribute');
      return;
    }
    if (!this._coordinates) {
      console.log('No coordinates passed');
      return;
    }

    if (this._texture) {
      this._texture.bind()
    }
    this._gl.bindVertexArray(this._positionAttribute.vao);
    const primitiveType = this._gl.TRIANGLES;
    const offset = 0;

    const count = this._coordinates.length / this._positionAttribute.getPointerProperties().size;
    this._gl.drawArrays(primitiveType, offset, count);

    if (this._texture) {
      this._texture.draw();
    }
  }

};
