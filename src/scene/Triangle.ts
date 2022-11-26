import { Vector3D } from './Vector3D';

export class Triangle {
	constructor(
		private readonly vectors: [Vector3D, Vector3D, Vector3D]
	) {
	}

	getVectors(): [Vector3D, Vector3D, Vector3D] {
		return this.vectors;
	}
}
