import { Vector, Vector3, Vector4 } from "./Vector";

export type Array4 = [number, number, number, number];
export type Array9 = [number, number, number, number, number, number, number, number, number];
export type Array16 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
export type MatrixValues = Array4 | Array9 | Array16;

export abstract class Matrix<T extends MatrixValues> {

  constructor(values?: T) {
    this._values = this.create(values);
  }

  protected _values: T;

  protected abstract create(values?: T): T;

  protected abstract translate(...args: any): Matrix<T>;

  protected abstract scale(...args: any): Matrix<T>;

  protected abstract invert(): Matrix<T>;

  transpose(): Matrix<T> {
    const dimension = Math.sqrt(this._values.length);
    const transposedValues: T = Array.from({ length: this._values.length }, (_, i) => {
      const row = Math.floor(i / dimension);
      const col = i % dimension;
      return this._values[col * dimension + row];
    }) as T;
    this._values = transposedValues;
    return this;
  }

  get values(): T {
    return this._values;
  }

  set values(values: T) {
    this._values = values;
  }

}

export class Matrix2 extends Matrix<Array4> {
  static identity: Array4 = [
    1, 0,
    0, 1
  ];

  static multiply(a: Matrix2, b: Matrix2): Matrix2 {
    const [a0, a1, a2, a3] = a.values;
    const [b0, b1, b2, b3] = b.values;
    return new Matrix2([
      a0 * b0 + a1 * b2,
      a0 * b1 + a1 * b3,
      a2 * b0 + a3 * b2,
      a2 * b1 + a3 * b3
    ]);
  }

  static translation(tx: number, ty: number): Matrix2 {
    return new Matrix2([
      1, 0,
      tx, ty
    ]);
  }

  static rotation(angleInRadians: number): Matrix2 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    return new Matrix2([
      c, -s,
      s, c
    ]);
  }

  static scaling(sx: number, sy: number): Matrix2 {
    return new Matrix2([
      sx, 0,
      0, sy
    ]);
  }

  protected create(values: Array4): Array4 {
    return values ? values : Matrix2.identity;
  }

  public translate(x: number, y: number): Matrix<Array4> {
    return Matrix2.multiply(this, Matrix2.translation(x, y));
  }

  public rotate(angleInRadians: number): Matrix2 {
    return Matrix2.multiply(this, Matrix2.rotation(angleInRadians));
  }

  public scale(sx: number, sy: number): Matrix2 {
    return Matrix2.multiply(this, Matrix2.scaling(sx, sy));
  }

  public invert(): Matrix2 {
    const [a, b, c, d] = this.values;
    const det = a * d - b * c;
    return new Matrix2([d / det, -b / det, -c / det, a / det]);
  }

}

export class Matrix3 extends Matrix<Array9> {
  static identity: Array9 = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];

  static multiply(a: Matrix3, b: Matrix3): Matrix3 {
    const [a0, a1, a2, a3, a4, a5, a6, a7, a8] = a.values;
    const [b0, b1, b2, b3, b4, b5, b6, b7, b8] = b.values;
    return new Matrix3([
      a0 * b0 + a1 * b3 + a2 * b6,
      a0 * b1 + a1 * b4 + a2 * b7,
      a0 * b2 + a1 * b5 + a2 * b8,
      a3 * b0 + a4 * b3 + a5 * b6,
      a3 * b1 + a4 * b4 + a5 * b7,
      a3 * b2 + a4 * b5 + a5 * b8,
      a6 * b0 + a7 * b3 + a8 * b6,
      a6 * b1 + a7 * b4 + a8 * b7,
      a6 * b2 + a7 * b5 + a8 * b8
    ]);
  }

  static translation(tx: number, ty: number): Matrix3 {
    return new Matrix3([
      1, 0, 0,
      0, 1, 0,
      tx, ty, 1,
    ]);
  };

  static rotation(angleInRadians: number): Matrix3 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    return new Matrix3([
      c, -s, 0,
      s, c, 0,
      0, 0, 1,
    ]);
  }

  static scaling(sx: number, sy: number): Matrix3 {
    return new Matrix3([
      sx, 0, 0,
      0, sy, 0,
      0, 0, 1,
    ]);
  }

  static projection(width: number, height: number): Matrix3 {
    // Note: This matrix flips the Y axis so that 0 is at the top.
    return new Matrix3([
      2 / width, 0, 0,
      0, -2 / height, 0,
      -1, 1, 1,
    ]);
  };

  protected create(values?: Array9): Array9 {
    return values ? values : Matrix3.identity;
  }

  public translate(x: number, y: number): Matrix3 {
    return Matrix3.multiply(this, Matrix3.translation(x, y));
  }

  public rotate(angleInRadians: number): Matrix3 {
    return Matrix3.multiply(this, Matrix3.rotation(angleInRadians));
  }

  public scale(sx: number, sy: number): Matrix3 {
    return Matrix3.multiply(this, Matrix3.scaling(sx, sy));
  }

  public invert(): Matrix3 {
    const [
      m00, m01, m02,
      m10, m11, m12,
      m20, m21, m22
    ] = this.values;
    const det = m00 * (m11 * m22 - m12 * m21) - m01 * (m10 * m22 - m12 * m20) + m02 * (m10 * m21 - m11 * m20);
    const invDet = 1 / det;
    const inv00 = (m11 * m22 - m12 * m21) * invDet;
    const inv01 = -(m01 * m22 - m02 * m21) * invDet;
    const inv02 = (m01 * m12 - m02 * m11) * invDet;
    const inv10 = -(m10 * m22 - m12 * m20) * invDet;
    const inv11 = (m00 * m22 - m02 * m20) * invDet;
    const inv12 = -(m00 * m12 - m02 * m10) * invDet;
    const inv20 = (m10 * m21 - m11 * m20) * invDet;
    const inv21 = -(m00 * m21 - m01 * m20) * invDet;
    const inv22 = (m00 * m11 - m01 * m10) * invDet;
    return new Matrix3([
      inv00, inv01, inv02,
      inv10, inv11, inv12,
      inv20, inv21, inv22
    ]);
  }

}

export class Matrix4 extends Matrix<Array16> {
  static identity: Array16 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];

  static multiply(a: Matrix4, b: Matrix4): Matrix4 {
    const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15] = a.values;
    const [b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15] = b.values;

    return new Matrix4([
      a0 * b0 + a1 * b4 + a2 * b8 + a3 * b12,
      a0 * b1 + a1 * b5 + a2 * b9 + a3 * b13,
      a0 * b2 + a1 * b6 + a2 * b10 + a3 * b14,
      a0 * b3 + a1 * b7 + a2 * b11 + a3 * b15,
      a4 * b0 + a5 * b4 + a6 * b8 + a7 * b12,
      a4 * b1 + a5 * b5 + a6 * b9 + a7 * b13,
      a4 * b2 + a5 * b6 + a6 * b10 + a7 * b14,
      a4 * b3 + a5 * b7 + a6 * b11 + a7 * b15,
      a8 * b0 + a9 * b4 + a10 * b8 + a11 * b12,
      a8 * b1 + a9 * b5 + a10 * b9 + a11 * b13,
      a8 * b2 + a9 * b6 + a10 * b10 + a11 * b14,
      a8 * b3 + a9 * b7 + a10 * b11 + a11 * b15,
      a12 * b0 + a13 * b4 + a14 * b8 + a15 * b12,
      a12 * b1 + a13 * b5 + a14 * b9 + a15 * b13,
      a12 * b2 + a13 * b6 + a14 * b10 + a15 * b14,
      a12 * b3 + a13 * b7 + a14 * b11 + a15 * b15
    ]);
  }

  static translation(tx: number, ty: number, tz: number): Matrix4 {
    return new Matrix4([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, tz, 1,
    ]);
  };

  static xRotation(angleInRadians: number): Matrix4 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    return new Matrix4([
      1, 0, 0, 0,
      0, c, s, 0,
      0, -s, c, 0,
      0, 0, 0, 1,
    ]);
  }

  static yRotation(angleInRadians: number): Matrix4 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    return new Matrix4([
      c, 0, -s, 0,
      0, 1, 0, 0,
      s, 0, c, 0,
      0, 0, 0, 1,
    ]);
  }

  static zRotation(angleInRadians: number): Matrix4 {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    return new Matrix4([
      c, s, 0, 0,
      -s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  }

  static scaling(sx: number, sy: number, sz: number): Matrix4 {
    return new Matrix4([
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1,
    ]);
  }

  static perspective(fieldOfViewInRadians: number, aspect: number, near: number, far: number): Matrix4 {
    const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    const rangeInv = 1.0 / (near - far);
    return new Matrix4([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ]);
  };

  static orthographic(
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
  ): Matrix4 {
    return new Matrix4([
      2 / (right - left), 0, 0, 0,
      0, 2 / (top - bottom), 0, 0,
      0, 0, 2 / (near - far), 0,

      (left + right) / (left - right),
      (bottom + top) / (bottom - top),
      (near + far) / (near - far),
      1,
    ]);
  };

  static projection(width: number, height: number, depth: number): Matrix4 {
    // Note: This matrix flips the Y axis so 0 is at the top.
    return new Matrix4([
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, 2 / depth, 0,
      -1, 1, 0, 1,
    ]);
  };

  static lookAt(cameraPosition: Vector3, targetVector: Vector3, upVector = new Vector3([0, 1, 0])): Matrix4 {

    // TODO: check why "as Vector3" is needed
    var zAxis = Vector.substract(cameraPosition, targetVector).normalize() as Vector3;
    var xAxis = Vector3.cross(upVector, zAxis).normalize() as Vector3;
    var yAxis = Vector3.cross(zAxis, xAxis).normalize();

    return new Matrix4([
      xAxis.values[0], xAxis.values[1], xAxis.values[2], 0,
      yAxis.values[0], yAxis.values[1], yAxis.values[2], 0,
      zAxis.values[0], zAxis.values[1], zAxis.values[2], 0,
      cameraPosition.values[0],
      cameraPosition.values[1],
      cameraPosition.values[2],
      1,
    ]);
  }

  protected create(values?: Array16): Array16 {
    return values ? values : Matrix4.identity;
  };

  public translate(x: number, y: number, z: number): Matrix4 {
    return Matrix4.multiply(this, Matrix4.translation(x, y, z));
  }

  public rotateX(angleInRadians: number): Matrix4 {
    return Matrix4.multiply(this, Matrix4.xRotation(angleInRadians));
  }

  public rotateY(angleInRadians: number): Matrix4 {
    return Matrix4.multiply(this, Matrix4.yRotation(angleInRadians));
  }

  public rotateZ(angleInRadians: number): Matrix4 {
    return Matrix4.multiply(this, Matrix4.zRotation(angleInRadians));
  }

  public scale(sx: number, sy: number, sz: number): Matrix4 {
    return Matrix4.multiply(this, Matrix4.scaling(sx, sy, sz));
  }

  public invert(): Matrix4 {
    const [
      m00, m01, m02, m03,
      m10, m11, m12, m13,
      m20, m21, m22, m23,
      m30, m31, m32, m33
    ] = this.values;

    const tmp_0 = m22 * m33;
    const tmp_1 = m32 * m23;
    const tmp_2 = m12 * m33;
    const tmp_3 = m32 * m13;
    const tmp_4 = m12 * m23;
    const tmp_5 = m22 * m13;
    const tmp_6 = m02 * m33;
    const tmp_7 = m32 * m03;
    const tmp_8 = m02 * m23;
    const tmp_9 = m22 * m03;
    const tmp_10 = m02 * m13;
    const tmp_11 = m12 * m03;
    const tmp_12 = m20 * m31;
    const tmp_13 = m30 * m21;
    const tmp_14 = m10 * m31;
    const tmp_15 = m30 * m11;
    const tmp_16 = m10 * m21;
    const tmp_17 = m20 * m11;
    const tmp_18 = m00 * m31;
    const tmp_19 = m30 * m01;
    const tmp_20 = m00 * m21;
    const tmp_21 = m20 * m01;
    const tmp_22 = m00 * m11;
    const tmp_23 = m10 * m01;

    const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    return new Matrix4([
      d * t0,
      d * t1,
      d * t2,
      d * t3,
      d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
        (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
      d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
        (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
      d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
        (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
      d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
        (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
      d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
        (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
      d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
        (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
      d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
        (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
      d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
        (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
      d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
        (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
      d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
        (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
      d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
        (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
      d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
        (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
    ]);
  }

  public transformVector(vector: Vector4): Vector4 {
    const m = this.values;
    const dst = [];
    for (let i = 0; i < 4; ++i) {
      dst[i] = 0.0;
      for (let j = 0; j < 4; ++j) {
        dst[i] += vector.values[j] * m[j * 4 + i];
      }
    }
    return new Vector4(dst as Array4);
  }
}
