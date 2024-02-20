import { expect, describe, it } from "bun:test";

import {
  Matrix2,
  Matrix3,
  Matrix4,
  type Array4,
  type Array9,
  type Array16
} from './Matrix';

describe('Matrix2', () => {
  it('should create a Matrix2 instance', () => {
    const matrix = new Matrix2();
    expect(matrix).toBeInstanceOf(Matrix2);
  });

  describe('statics', () => {
    describe('multiply', () => {
      it('should multiply two Matrix2 instances', () => {
        const matrix1 = new Matrix2([1, 2, 3, 4]);
        const matrix2 = new Matrix2([5, 6, 7, 8]);
        const expectedValues: Array4 = [
          19, 22,
          43, 50
        ];
        const result = Matrix2.multiply(matrix1, matrix2);
        expect(result.values).toEqual(expectedValues);
      });
    });
  });

  it('should create a Matrix2 instance with specified values', () => {
    const values: Array4 = [
      1, 2,
      3, 4
    ];
    const matrix = new Matrix2(values);
    expect(matrix.values).toEqual(values);
  });

  it('should create a Matrix2 instance with identity values if no values are specified', () => {
    const matrix = new Matrix2();
    expect(matrix.values).toEqual(Matrix2.identity);
  });

  it('should transpose the Matrix2 instance', () => {
    const values: Array4 = [
      1, 2,
      3, 4
    ];
    const expectedValues: Array4 = [
      1, 3,
      2, 4
    ];
    const matrix = new Matrix2(values);
    matrix.transpose();
    expect(matrix.values).toEqual(expectedValues);
  });
});

describe('Matrix3', () => {
  it('should create a Matrix3 instance', () => {
    const matrix = new Matrix3();
    expect(matrix).toBeInstanceOf(Matrix3);
  });

  describe('statics', () => {
    describe('multiply', () => {
      it('should multiply two Matrix3 instances', () => {
        const matrix1 = new Matrix3([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const matrix2 = new Matrix3([10, 11, 12, 13, 14, 15, 16, 17, 18]);
        const expectedValues: Array9 = [
          84, 90, 96,
          201, 216, 231,
          318, 342, 366
        ];
        const result = Matrix3.multiply(matrix1, matrix2);
        expect(result.values).toEqual(expectedValues);
      });
    });
  });

  it('should create a Matrix3 instance with specified values', () => {
    const values: Array9 = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9
    ];
    const matrix = new Matrix3(values);
    expect(matrix.values).toEqual(values);
  });

  it('should create a Matrix3 instance with identity values if no values are specified', () => {
    const matrix = new Matrix3();
    expect(matrix.values).toEqual(Matrix3.identity);
  });

  it('should transpose the Matrix3 instance', () => {
    const values: Array9 = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9
    ];
    const expectedValues: Array9 = [
      1, 4, 7,
      2, 5, 8,
      3, 6, 9
    ];
    const matrix = new Matrix3(values);
    matrix.transpose();
    expect(matrix.values).toEqual(expectedValues);
  });
});

describe('Matrix4', () => {
  it('should create a Matrix4 instance', () => {
    const matrix = new Matrix4();
    expect(matrix).toBeInstanceOf(Matrix4);
  });

  describe('statics', () => {
    describe('multiply', () => {
      it('should multiply two Matrix4 instances', () => {
        const matrix1 = new Matrix4([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        const matrix2 = new Matrix4([17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]);
        const expectedValues: Array16 = [
          250, 260, 270, 280,
          618, 644, 670, 696,
          986, 1028, 1070, 1112,
          1354, 1412, 1470, 1528
        ];
        const result = Matrix4.multiply(matrix1, matrix2);
        expect(result.values).toEqual(expectedValues);
      });
    });
  });

  it('should create a Matrix4 instance with specified values', () => {
    const values: Array16 = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ];
    const matrix = new Matrix4(values);
    expect(matrix.values).toEqual(values);
  });

  it('should create a Matrix4 instance with identity values if no values are specified', () => {
    const matrix = new Matrix4();
    expect(matrix.values).toEqual(Matrix4.identity);
  });

  it('should transpose the Matrix4 instance', () => {
    const values: Array16 = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ];
    const expectedValues: Array16 = [
      1, 5, 9, 13,
      2, 6, 10, 14,
      3, 7, 11, 15,
      4, 8, 12, 16
    ];
    const matrix = new Matrix4(values);
    matrix.transpose();
    expect(matrix.values).toEqual(expectedValues);
  });

});
