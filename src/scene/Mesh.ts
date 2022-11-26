import { Triangle } from './Triangle';

export class Mesh {
	constructor(
		private readonly triangles: Array<Triangle>
	) {
	}

	getTriangles(): Array<Triangle> {
		return this.triangles;
	}
}