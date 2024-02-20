import type { Vector3 } from "../math/Vector";
import { Attribute } from "../webgl/Attribute";
import type { Program } from "../webgl/Program";

export type MeshParams = {
  program: Program;
  gl: WebGL2RenderingContext;
  coordinates?: Float32Array;
  // textures?: Float32Array; // TODO: should replace colors
  colors?: Uint8Array;
  normals?: Float32Array;
};

export class Mesh {

  constructor({
    coordinates,
    normals,
    // textures,
    colors,
    gl,
    program
  }: MeshParams) {

    this._gl = gl;
    this._program = program;

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
    this._colorAttribute = new Attribute({
      gl,
      name: 'a_color',
      program,
      pointerProperties: {
        size: 3,
        normalize: true,
        type: gl.UNSIGNED_BYTE,
      },
    });
    if (colors) {
      this._colorAttribute.setBufferData(colors);
    }
  }

  private _gl: WebGL2RenderingContext;

  private _program: Program;

  private _positionAttribute?: Attribute;

  private _normalsAttribute?: Attribute;

  private _textureAttribute?: Attribute;

  private _colorAttribute?: Attribute;

  public draw() {
    if (!this._positionAttribute) {
      console.log('No position attribute');
      return;
    } else {
      this._gl.bindVertexArray(this._positionAttribute.vao);
      const primitiveType = this._gl.TRIANGLES;
      const offset = 0;
       // TODO: This value needs to be calculated
      const count = 96;
      this._gl.drawArrays(primitiveType, offset, count);
    }
  }

};
