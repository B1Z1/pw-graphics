import { Vector3D } from './Vector3D';

export class Triangle {
	constructor(
		private vectors: [Vector3D, Vector3D, Vector3D]
	) {
	}

	copy(): Triangle {
		return new Triangle([
			this.vectors[0].copy(),
			this.vectors[1].copy(),
			this.vectors[2].copy()
		]);
	}

	setVectors(vectors: [Vector3D, Vector3D, Vector3D]): void {
		this.vectors = vectors;
	}

	getVectors(): [Vector3D, Vector3D, Vector3D] {
		return this.vectors;
	}
}
