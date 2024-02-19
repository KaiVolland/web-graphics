import { expect, describe, it } from "bun:test";
import { Vector1, Vector2, Vector3, Vector4 } from './Vector';

describe('Vector1', () => {
  it('should create a Vector1 instance', () => {
    const vector = new Vector1([1]);
    expect(vector.values).toEqual([1]);
  });

  it('should calculate the dot product of two Vector1 instances', () => {
    const vector1 = new Vector1([2]);
    const vector2 = new Vector1([3]);
    expect(vector1.dot(vector2)).toBe(6);
  });

  it('should normalize a Vector1 instance', () => {
    const vector = new Vector1([3]);
    const result = vector.normalize();
    expect(result.values).toEqual([1]);
  });
});

describe('Vector2', () => {
  it('should create a Vector2 instance', () => {
    const vector = new Vector2([1, 2]);
    expect(vector.values).toEqual([1, 2]);
  });

  it('should calculate the dot product of two Vector2 instances', () => {
    const vector1 = new Vector2([2, 3]);
    const vector2 = new Vector2([4, 5]);
    expect(vector1.dot(vector2)).toBe(23);
  });

  it('should normalize a Vector2 instance', () => {
    const vector = new Vector2([3, 4]);
    const result = vector.normalize();
    expect(result.values).toEqual([0.6, 0.8]);
  });
});

describe('Vector3', () => {
  it('should create a Vector3 instance', () => {
    const vector = new Vector3([1, 2, 3]);
    expect(vector.values).toEqual([1, 2, 3]);
  });

  it('should calculate the dot product of two Vector3 instances', () => {
    const vector1 = new Vector3([2, 3, 4]);
    const vector2 = new Vector3([5, 6, 7]);
    expect(vector1.dot(vector2)).toBe(56);
  });

  it('should normalize a Vector3 instance', () => {
    const vector = new Vector3([3, 4, 5]);
    const result = vector.normalize();
    const rounded = result.values.map(val => Math.round(val * 100000000) / 100000000);
    expect(rounded).toEqual([0.42426407, 0.56568542, 0.70710678]);
  });

});

describe('Vector4', () => {
  it('should create a Vector4 instance', () => {
    const vector = new Vector4([1, 2, 3, 4]);
    expect(vector.values).toEqual([1, 2, 3, 4]);
  });

  it('should calculate the dot product of two Vector4 instances', () => {
    const vector1 = new Vector4([2, 3, 4, 5]);
    const vector2 = new Vector4([6, 7, 8, 9]);
    expect(vector1.dot(vector2)).toBe(110);
  });

  it('should normalize a Vector4 instance', () => {
    const vector = new Vector4([3, 4, 5, 6]);
    const result = vector.normalize();
    const rounded = result.values.map(val => Math.round(val * 100000000) / 100000000);
    expect(rounded).toEqual([0.32349832, 0.43133109, 0.53916387, 0.64699664]);
  });
});
