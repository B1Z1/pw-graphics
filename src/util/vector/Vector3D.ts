export class Vector3D {
	constructor(
		private x: number,
		private y: number,
		private z: number,
		private w: number = 1
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

	getW(): number {
		return this.w;
	}

	setW(w: number): void {
		this.w = w;
	}

	copy(): Vector3D {
		return new Vector3D(this.x, this.y, this.z, this.w);
	}
}