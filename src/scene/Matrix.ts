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

	getMatrix(): number[][] {
		return this.matrix;
	}
}