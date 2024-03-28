import { Attribute } from "./Attribute";
import type { Program } from "./Program";

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type TextureWrap = WebGL2RenderingContext["CLAMP_TO_EDGE" | "MIRRORED_REPEAT" | "REPEAT"]

export type TextureMinFilter = WebGL2RenderingContext[
  "LINEAR" |
  "NEAREST" |
  "NEAREST_MIPMAP_LINEAR" |
  "NEAREST_MIPMAP_NEAREST" |
  "LINEAR_MIPMAP_LINEAR" |
  "LINEAR_MIPMAP_NEAREST"
]

export type TextureMagFilter = WebGL2RenderingContext["LINEAR" | "NEAREST"];

export type TextureParams = {
  program: Program;
  gl: WebGL2RenderingContext;
  src: string;
  coordinates?: Float32Array;
  wrapS?: TextureWrap;
  wrapT?: TextureWrap;
  minFilter?: TextureMinFilter;
  magFilter?: TextureMagFilter;
};

export class Texture {

  private _gl: WebGL2RenderingContext;

  private _program: Program;

  private _image: HTMLImageElement;

  private _webGlTexture: WebGLTexture;

  private _coordinatesAttribute?: Attribute;

  private _coordinates?: Float32Array;

  constructor({
    gl,
    program,
    src,
    coordinates,
    wrapS,
    wrapT,
    minFilter = gl.LINEAR_MIPMAP_LINEAR,
    magFilter = gl.LINEAR
  }: TextureParams) {

    this._gl = gl;

    this._program = program;

    this._coordinates = coordinates

    this._coordinatesAttribute = new Attribute({
      gl,
      name: 'a_texcoord',
      program,
      pointerProperties: {
        size: 2,
        normalize: true,
        type: gl.FLOAT,
      },
    });

    // Create a texture.
    this._webGlTexture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this._webGlTexture);

    // Fill the texture with a 1x1 blue pixel.
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255])
    );

    // Asynchronously load an image
    this._image = new Image();
    this._image.src = src;
    this._image.addEventListener('load', () => {
      gl.bindTexture(gl.TEXTURE_2D, this._webGlTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
      if (wrapS) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
      }
      if (wrapT) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
      }
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, this._image);
      gl.generateMipmap(gl.TEXTURE_2D);
    });
  };

  bind() {
    this._gl.bindTexture(this._gl.TEXTURE_2D, this._webGlTexture);
  }

  draw() {
    if (this._coordinates && this._coordinatesAttribute) {
      this._coordinatesAttribute.setBufferData(this._coordinates);
    }
  }

}
