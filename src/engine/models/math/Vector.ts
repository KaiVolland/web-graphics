export type Vector1D = [number];
export type Vector2D = [number, number];
export type Vector3D = [number, number, number];
export type Vector4D = [number, number, number, number];
export type VectorValues = Vector1D | Vector2D | Vector3D | Vector4D;

export abstract class Vector<T extends VectorValues> {

    protected _values: T;

    constructor(values: T) {
        this._values = this.create(values);
    }

    protected abstract create(values?: T): T;

    get values(): T {
        return this._values;
    }

    set values(values: T) {
        this._values = values;
    }

    dot(vector: Vector<T>): number {
        return this._values.reduce((sum, val, i) => sum + val * vector._values[i], 0);
    }

    // // TODO: Move to math util
    // subtract(vector: Vector<T>): Vector<T> {
    //     if (this._values.length !== vector._values.length) {
    //         throw new Error("Vectors must have the same dimension to subtract.");
    //     }

    //     const resultValues: T = this._values.map((val, i) => val - vector._values[i]) as T;
    //     this._values = resultValues;
    //     return this;
    // }

    normalize(): Vector<T> {
        const magnitude = Math.sqrt(this._values.reduce((sum, val) => sum + val * val, 0));
        const resultValues: T = this._values.map(val => val / magnitude) as T;
        this._values = resultValues;
        return this;
    }
}

export class Vector1 extends Vector<Vector1D> {
    protected create(values?: Vector1D | undefined): Vector1D {
        return values ? values : [1];
    }
}

export class Vector2 extends Vector<Vector2D> {
    protected create(values?: Vector2D | undefined): Vector2D {
        return values ? values : [1, 1];
    }
}

export class Vector3 extends Vector<Vector3D> {

    protected create(values?: Vector3D | undefined): Vector3D {
        return values ? values : [1, 1, 1];
    }

    // // TODO: Think about moving this back to the util class
    // cross(vector: Vector<Vector3D>): Vector<Vector3D> {
    //     const [x1, y1, z1] = this._values;
    //     const [x2, y2, z2] = vector.values;

    //     const resultValues: Vector3D = [
    //         y1 * z2 - z1 * y2,
    //         z1 * x2 - x1 * z2,
    //         x1 * y2 - y1 * x2,
    //     ];

    //     return this.constructor(resultValues);
    // }
}

export class Vector4 extends Vector<Vector4D> {

    protected create(values?: Vector4D | undefined): Vector4D {
        return values ? values : [1, 1, 1, 1];
    }

}
