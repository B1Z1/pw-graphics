import { Vector3D } from './Vector3D';

export class VectorCalculator {
	static add(vector3D1: Vector3D, vector3D2: Vector3D): Vector3D {
		return new Vector3D(
			vector3D1.getX() + vector3D2.getX(),
			vector3D1.getY() + vector3D2.getY(),
			vector3D1.getZ() + vector3D2.getZ()
		);
	}

	static substract(vector3D1: Vector3D, vector3D2: Vector3D): Vector3D {
		return new Vector3D(
			vector3D1.getX() - vector3D2.getX(),
			vector3D1.getY() - vector3D2.getY(),
			vector3D1.getZ() - vector3D2.getZ()
		);
	}

	static multiply(vector3D: Vector3D, multiplier: number): Vector3D {
		return new Vector3D(
			vector3D.getX() * multiplier,
			vector3D.getY() * multiplier,
			vector3D.getZ() * multiplier
		);
	}

	static divide(vector3D: Vector3D, divider: number): Vector3D {
		return new Vector3D(
			vector3D.getX() / divider,
			vector3D.getY() / divider,
			vector3D.getZ() / divider
		);
	}

	static dotProduct(vector3D1: Vector3D, vector3D2: Vector3D): number {
		return vector3D1.getX() * vector3D2.getX()
			+ vector3D1.getY() * vector3D2.getY()
			+ vector3D1.getZ() * vector3D2.getZ();
	}

	static vectorLength(vector3D: Vector3D): number {
		return Math.sqrt(this.dotProduct(vector3D, vector3D));
	}

	static normalise(vector3D: Vector3D): Vector3D {
		const l: number = this.vectorLength(vector3D);

		return new Vector3D(
			vector3D.getX() / l,
			vector3D.getY() / l,
			vector3D.getZ() / l
		);
	}

	static crossProduct(vector3D1: Vector3D, vector3D2: Vector3D): Vector3D {
		return new Vector3D(
			vector3D1.getY() * vector3D2.getZ() - vector3D1.getZ() * vector3D2.getY(),
			vector3D1.getZ() * vector3D2.getX() - vector3D1.getX() * vector3D2.getZ(),
			vector3D1.getX() * vector3D2.getY() - vector3D1.getY() * vector3D2.getX()
		);
	}
}