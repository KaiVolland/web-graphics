import type { LightManager } from "../../LightManager";
import type { Vector3 } from "../math/Vector";

export type DirectionalLightParams = {
  color: Vector3;
  direction: Vector3;
};

export class DirectionalLight {

  private _color: Vector3;

  private _direction: Vector3;

  private _index: number = -1;

  private _lightManager: LightManager | undefined;

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

  set direction(direction: Vector3) {
    this._direction = direction;
    if (!this._lightManager) {
      console.log("Can't set direction before adding it to LightManager");
      return;
    }
    this._lightManager.setDirectionalLightDirection(this.index, direction);
  }

  set color(color: Vector3) {
    this._color = color;
    if (!this._lightManager) {
      console.log("Can't set color before adding it to LightManager");
      return;
    }
    this._lightManager.setDirectionalLightColor(this.index, color);
  }

  get index() {
    return this._index;
  }

  set index(index: number) {
    this._index = index;
  }

  set lightManager(lightManager: LightManager) {
    this._lightManager = lightManager;
  }

}
