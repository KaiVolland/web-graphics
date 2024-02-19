export type Array4 = [number, number, number, number];
export type Array9 = [number, number, number, number, number, number, number, number, number];
export type Array16 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
export type MatrixValues = Array4 | Array9 | Array16;

export abstract class Matrix<T extends MatrixValues> {

  protected _values: T;

  constructor(values?: T) {
    this._values = this.create(values);
  }

  protected abstract create(values?: T): T;

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

  protected create(values: Array4): Array4 {
    return values ? values : Matrix2.identity;
  }
}

export class Matrix3 extends Matrix<Array9> {
  static identity: Array9 = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
  ];

  protected create(values?: Array9 ): Array9 {
    return values ? values : Matrix3.identity;
  }

}

export class Matrix4 extends Matrix<Array16> {
  static identity: Array16 = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ];

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

  protected create(values?: Array16): Array16 {
    return values ? values : Matrix4.identity;
  };
}
