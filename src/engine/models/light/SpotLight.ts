import type { LightManager } from "../../LightManager";
import { Vector3 } from "../math/Vector";

export type SpotLightParams = {
  color?: Vector3;
  position: Vector3;
  direction: Vector3;
  coneAngle: number;
  blurAngle?: number;
};

export class SpotLight {

  static DATA_SIZE = 16;

  static COLOR_OFFSET = 4;

  static DIRECTION_OFFSET = 8;

  static CONE_ANGLE_OFFSET = 3;

  static BLUR_ANGLE_OFFSET = 7;

  private _color: Vector3;

  private _position: Vector3;

  private _direction: Vector3;

  private _coneAngle: number;

  private _blurAngle: number;

  private _index: number = -1;

  private _lightManager: LightManager | undefined;

  constructor({ color, position, direction, coneAngle, blurAngle }: SpotLightParams) {
    this._color = color || new Vector3([1, 1, 1]);
    this._position = position;
    this._direction = direction;
    this._coneAngle = coneAngle;
    this._blurAngle = blurAngle || coneAngle;
  }

  get color() {
    return this._color;
  }

  get position() {
    return this._position;
  }

  get direction() {
    return this._direction;
  }

  get coneAngle() {
    return this._coneAngle;
  }

  get blurAngle() {
    return this._blurAngle;
  }

  set position(position: Vector3) {
    this._position = position;
    if (!this._lightManager) {
      console.log("Can't set position before adding it to LightManager");
      return;
    }
    this._lightManager.setSpotLightPosition(this.index, position);
  }

  set color(color: Vector3) {
    this._color = color;
    if (!this._lightManager) {
      console.log("Can't set color before adding it to LightManager");
      return;
    }
    this._lightManager.setSpotLightColor(this.index, color);
  }

  set direction(direction: Vector3) {
    this._direction = direction;
    if (!this._lightManager) {
      console.log("Can't set direction before adding it to LightManager");
      return;
    }
    this._lightManager.setSpotLightDirection(this.index, direction);
  }

  set coneAngle(coneAngle: number) {
    this._coneAngle = coneAngle;
    if (!this._lightManager) {
      console.log("Can't set coneAngle before adding it to LightManager");
      return;
    }
    this._lightManager.setSpotLightConeAngle(this.index, coneAngle);
  }

  set blurAngle(blurAngle: number) {
    this._blurAngle = blurAngle;
    if (!this._lightManager) {
      console.log("Can't set blurAngle before adding it to LightManager");
      return;
    }
    this._lightManager.setSpotLightBlurAngle(this.index, blurAngle);
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
