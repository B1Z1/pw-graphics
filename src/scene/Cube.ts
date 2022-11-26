import { Mesh } from './Mesh';
import { Vector3D } from './Vector3D';
import { Triangle } from './Triangle';

export class Cube {
	private readonly mesh: Mesh;

	constructor(
		private readonly center: Vector3D = new Vector3D(0.5, 0.5, 0.5),
		private readonly size: number = 1
	) {
		const centerX = this.center.getX();
		const centerY = this.center.getY();
		const centerZ = this.center.getZ();
		const d = this.size / 2;

		this.mesh = new Mesh([
			// Front
			new Triangle([
				new Vector3D(centerX - d, centerY - d, centerZ - d),
				new Vector3D(centerX - d, centerY + d, centerZ - d),
				new Vector3D(centerX + d, centerY + d, centerZ - d)
			]),
			new Triangle([
				new Vector3D(centerX - d, centerY - d, centerZ - d),
				new Vector3D(centerX + d, centerY + d, centerZ - d),
				new Vector3D(centerX + d, centerY - d, centerZ - d)
			]),
			// Right
			new Triangle([
				new Vector3D(centerX + d, centerY - d, centerZ - d),
				new Vector3D(centerX + d, centerY + d, centerZ - d),
				new Vector3D(centerX + d, centerY + d, centerZ + d)
			]),
			new Triangle([
				new Vector3D(centerX + d, centerY - d, centerZ - d),
				new Vector3D(centerX + d, centerY + d, centerZ + d),
				new Vector3D(centerX + d, centerY - d, centerZ + d)
			]),
			// Back
			new Triangle([
				new Vector3D(centerX + d, centerY - d, centerZ + d),
				new Vector3D(centerX + d, centerY + d, centerZ + d),
				new Vector3D(centerX - d, centerY + d, centerZ + d)
			]),
			new Triangle([
				new Vector3D(centerX + d, centerY - d, centerZ + d),
				new Vector3D(centerX - d, centerY + d, centerZ + d),
				new Vector3D(centerX - d, centerY - d, centerZ + d)
			]),
			// Left
			new Triangle([
				new Vector3D(centerX - d, centerY - d, centerZ + d),
				new Vector3D(centerX - d, centerY + d, centerZ + d),
				new Vector3D(centerX - d, centerY + d, centerZ - d)
			]),
			new Triangle([
				new Vector3D(centerX - d, centerY - d, centerZ + d),
				new Vector3D(centerX - d, centerY + d, centerZ - d),
				new Vector3D(centerX - d, centerY - d, centerZ - d)
			]),
			// Top
			new Triangle([
				new Vector3D(centerX - d, centerY + d, centerZ - d),
				new Vector3D(centerX - d, centerY + d, centerZ + d),
				new Vector3D(centerX + d, centerY + d, centerZ + d)
			]),
			new Triangle([
				new Vector3D(centerX - d, centerY + d, centerZ - d),
				new Vector3D(centerX - d, centerY + d, centerZ + d),
				new Vector3D(centerX + d, centerY + d, centerZ - d)
			]),
			// Bottom
			new Triangle([
				new Vector3D(centerX - d, centerY - d, centerZ - d),
				new Vector3D(centerX - d, centerY - d, centerZ + d),
				new Vector3D(centerX + d, centerY - d, centerZ + d)
			]),
			new Triangle([
				new Vector3D(centerX - d, centerY - d, centerZ - d),
				new Vector3D(centerX - d, centerY - d, centerZ + d),
				new Vector3D(centerX + d, centerY - d, centerZ - d)
			]),
		]);
	}

	getMesh(): Mesh {
		return this.mesh;
	}
}