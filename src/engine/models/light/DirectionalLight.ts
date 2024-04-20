import type { Vector3, Vector4 } from "../math/Vector";

const _ = 0;

export type DirectionalLightParams = {
  color: Vector4;
  direction: Vector3;
};

export class DirectionalLight {

  private _color: Vector4;

  private _direction: Vector3;

  private _index: number = -1;

  constructor({ color, direction }: DirectionalLightParams) {
    this._color = color;
    this._direction = direction;
  }

  get color() {
    return this._color;
  }

  get direction() {
    return this._direction;
  }

  get index() {
    return this._index;
  }

  set index(index: number) {
    this._index = index;
  }

}
