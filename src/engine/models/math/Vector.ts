type Vector2D = [number, number];
type Vector3D = [number, number, number];
type Vector4D = [number, number, number, number];

type AnyVector = Vector2D | Vector3D | Vector4D;

abstract class Vector<T extends AnyVector> {

    protected _values: T;

    constructor(values: T) {
        this._values = this.create(values)._values;
    }

    abstract create(values: T): Vector<T>;

    get values(): T {
        return this._values;
    }

    set values(values: T) {
        this._values = values;
    }

    subtract<U extends AnyVector>(vector: Vector<U>): Vector<T> {
        if (this._values.length !== vector._values.length) {
            throw new Error("Vectors must have the same dimension to subtract.");
        }

        const resultValues: T = this._values.map((val, i) => val - vector._values[i]) as T;
        return this.create(resultValues);
    }

    normalize(): Vector<T> {
        const magnitude = Math.sqrt(this._values.reduce((sum, val) => sum + val ** 2, 0));
        const resultValues: T = this._values.map(val => (val / magnitude) as unknown as T[number]) as T;
        return this.create(resultValues);
    }
}

class Vector2 extends Vector<Vector2D> {
    create(values: Vector2D): Vector2 {
        return new Vector2(values);
    }
}

class Vector3 extends Vector<Vector3D> {
    create(values: Vector3D): Vector3 {
        return new Vector3(values);
    }

    cross(vector: Vector<Vector3D>): Vector<Vector3D> {
        const [x1, y1, z1] = this._values;
        const [x2, y2, z2] = vector.values;

        const resultValues: Vector3D = [
            y1 * z2 - z1 * y2,
            z1 * x2 - x1 * z2,
            x1 * y2 - y1 * x2,
        ];

        return this.create(resultValues);
    }
}

class Vector4 extends Vector<Vector4D> {
    create(values: Vector4D): Vector4 {
        return new Vector4(values);
    }
}
