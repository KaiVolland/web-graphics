export type Vector1D = [number];
export type Vector2D = [number, number];
export type Vector3D = [number, number, number];
export type Vector4D = [number, number, number, number];
export type VectorValues = Vector1D | Vector2D | Vector3D | Vector4D;

export abstract class Vector<T extends VectorValues> {

    // TODO: the typing is ok but the code could be smarter
    static substract<T extends VectorValues>(v1: Vector<T>, v2: Vector<T>): Vector<T> {
        if (v1.is1D(v1) && v2.is1D(v2)) {
            return new Vector1([v1._values[0] - v2._values[0]]) as unknown as Vector<T>;
        }
        if (v1.is2D(v1) && v2.is2D(v2)) {
            return new Vector2([v1._values[0] - v2._values[0], v1._values[1] - v2._values[1]]) as unknown as Vector<T>;
        }
        if (v1.is3D(v1) && v2.is3D(v2)) {
            return new Vector3([v1._values[0] - v2._values[0], v1._values[1] - v2._values[1], v1._values[2] - v2._values[2]]) as unknown as Vector<T>;
        }
        if (v1.is4D(v1) && v2.is4D(v2)) {
            return new Vector4([v1._values[0] - v2._values[0], v1._values[1] - v2._values[1], v1._values[2] - v2._values[2], v1._values[3] - v2._values[3]]) as unknown as Vector<T>;
        }
        throw new Error("Vectors must have the same dimension to subtract.");
    }

    static dot<T extends VectorValues>(v1: Vector<T>, v2: Vector<T>): number {
        return v1._values.reduce((sum, val, i) => sum + val * v2._values[i], 0);
    }

    constructor(values: T) {
        this._values = this.create(values);
    }

    protected _values: T;

    get values(): T {
        return this._values;
    }

    set values(values: T) {
        this._values = values;
    }

    protected abstract create(values?: T): T;

    is1D(vector: Vector<VectorValues>): vector is Vector1 {
        return vector.values.length === 1;
    }

    is2D(vector: Vector<VectorValues>): vector is Vector2 {
        return vector.values.length === 2;
    }

    is3D(vector: Vector<VectorValues>): vector is Vector3 {
        return vector.values.length === 3;
    }

    is4D(vector: Vector<VectorValues>): vector is Vector4 {
        return vector.values.length === 4;
    }

    normalize(): Vector<T> {
        const magnitude = Math.sqrt(this._values.reduce((sum, val) => sum + val * val, 0));
        const resultValues: T = this._values.map(val => val / magnitude) as T;
        this._values = resultValues;
        return this;
    }

    toNormalized(): Vector<T> {
        const magnitude = Math.sqrt(this._values.reduce((sum, val) => sum + val * val, 0));
        const resultValues: T = this._values.map(val => val / magnitude) as T;
        const VectorConstructor = this.constructor as unknown as new (values: T) => Vector<T>;
        return new VectorConstructor(resultValues);
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

    static cross(v1: Vector3, v2: Vector3): Vector3 {
        const resultValues: Vector3D = [
            v1._values[1] * v2._values[2] - v1._values[2] * v2._values[1],
            v1._values[2] * v2._values[0] - v1._values[0] * v2._values[2],
            v1._values[0] * v2._values[1] - v1._values[1] * v2._values[0]
        ];
        return new Vector3(resultValues);
    }

}

export class Vector4 extends Vector<Vector4D> {

    protected create(values?: Vector4D | undefined): Vector4D {
        return values ? values : [1, 1, 1, 1];
    }

}
