import type { isJSDocPrivateTag } from "typescript";
import type { LightManager } from "../../LightManager";
import type { Vector3, Vector3D, Vector4 } from "../math/Vector";

export type PointLightParams = {
  color: Vector3;
  position: Vector3;
};

export class PointLight {

  private _color: Vector3;

  private _position: Vector3;

  private _index: number = -1;

  private _lightManager: LightManager | undefined;

  constructor({ color, position }: PointLightParams) {
    this._color = color;
    this._position = position;
  }

  get color() {
    return this._color;
  }

  get position() {
    return this._position;
  }

  set position(position: Vector3) {
    this._position = position;
    if (!this._lightManager) {
      console.log("Can't set position before adding it to LightManager");
      return;
    }
    this._lightManager.setPointLightPosition(this.index, position);
  }

  set color(color: Vector3) {
    this._color = color;
    if (!this._lightManager) {
      console.log("Can't set color before adding it to LightManager");
      return;
    }
    this._lightManager.setPointLightColor(this.index, color);
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
