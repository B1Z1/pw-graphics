export class Vertex2D {
	constructor(
		private x: number,
		private y: number
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
}