export class Matrix {
	constructor(
		private readonly matrix: number[][] = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		]
	) {
	}

	getValues(): number[][] {
		return this.matrix;
	}

	setValue(x: number, y: number, value: number): void {
		this.matrix[x][y] = value;
	}
}