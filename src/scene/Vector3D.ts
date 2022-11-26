export class Vector3D {
	constructor(
		private x: number,
		private y: number,
		private z: number
	) {
	}

	getX(): number {
		return this.x;
	}

	setX(x: number): void {
		this.x = x;
	}

	getY(): number {
		return this.y;
	}

	setY(y: number): void {
		this.y = y;
	}

	getZ(): number {
		return this.z;
	}

	setZ(z: number): void {
		this.z = z;
	}
}