import { Mesh } from '../util/mesh/Mesh';
import { Vector3D } from '../util/vector/Vector3D';
import { Triangle } from './Triangle';

export class Cube {
	private mesh: Mesh = new Mesh([]);
	private d: number = 0;

	constructor(
		private readonly center: Vector3D = new Vector3D(0.5, 0.5, 0.5),
		private readonly size: number = 1
	) {
		this.updateD();
		this.updateMesh();
	}

	getX(): number {
		return this.center.getX();
	}

	setX(x: number): void {
		this.center.setX(x);
		this.updateMesh();
	}

	getY(): number {
		return this.center.getY();
	}

	setY(y: number): void {
		this.center.setY(y);
		this.updateMesh();
	}

	getZ(): number {
		return this.center.getZ();
	}

	setZ(z: number): void {
		this.center.setZ(z);
		this.updateMesh();
	}

	getMesh(): Mesh {
		return this.mesh;
	}

	private updateD(): void {
		this.d = this.size / 2;
	}

	private updateMesh(): void {
		const centerX = this.center.getX();
		const centerY = this.center.getY();
		const centerZ = this.center.getZ();

		this.mesh = new Mesh([
			// Front (0,0,0) (0,1,0) (1,1,0)
			new Triangle([
				new Vector3D(centerX - this.d, centerY - this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ - this.d),
				new Vector3D(centerX - this.d, centerY + this.d, centerZ - this.d)
			]),
			// (0,0,0) (1,1,0) (1,0,0)
			new Triangle([
				new Vector3D(centerX - this.d, centerY - this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY - this.d, centerZ - this.d)
			]),
			// Right (1,0,0) (1,1,1) (1,1,0)
			new Triangle([
				new Vector3D(centerX + this.d, centerY - this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ + this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ - this.d)
			]),
			// (1,0,0) (1,1,1) (1,0,1)
			new Triangle([
				new Vector3D(centerX + this.d, centerY - this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ + this.d),
				new Vector3D(centerX + this.d, centerY - this.d, centerZ + this.d)
			]),
			// Back (1,0,1) (0,1,1) (1,1,1)
			new Triangle([
				new Vector3D(centerX + this.d, centerY - this.d, centerZ + this.d),
				new Vector3D(centerX - this.d, centerY + this.d, centerZ + this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ + this.d)
			]),
			// (1,0,1) (0,1,1) (0,0,1)
			new Triangle([
				new Vector3D(centerX + this.d, centerY - this.d, centerZ + this.d),
				new Vector3D(centerX - this.d, centerY + this.d, centerZ + this.d),
				new Vector3D(centerX - this.d, centerY - this.d, centerZ + this.d)
			]),
			// Left (0,0,1) (0,1,0) (0,1,1)
			new Triangle([
				new Vector3D(centerX - this.d, centerY - this.d, centerZ + this.d),
				new Vector3D(centerX - this.d, centerY + this.d, centerZ - this.d),
				new Vector3D(centerX - this.d, centerY + this.d, centerZ + this.d)
			]),
			// (0,0,1) (0,1,0) (0,0,0)
			new Triangle([
				new Vector3D(centerX - this.d, centerY - this.d, centerZ + this.d),
				new Vector3D(centerX - this.d, centerY + this.d, centerZ - this.d),
				new Vector3D(centerX - this.d, centerY - this.d, centerZ - this.d)
			]),
			// Top (0,1,0) (1,1,1) (0,1,1)
			new Triangle([
				new Vector3D(centerX - this.d, centerY + this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ + this.d),
				new Vector3D(centerX - this.d, centerY + this.d, centerZ + this.d)
			]),
			// (0,1,0) (1,1,1) (1,1,0)
			new Triangle([
				new Vector3D(centerX - this.d, centerY + this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ + this.d),
				new Vector3D(centerX + this.d, centerY + this.d, centerZ - this.d)
			]),
			// Bottom (0,0,0) (1,0,1) (0,0,1)
			new Triangle([
				new Vector3D(centerX - this.d, centerY - this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY - this.d, centerZ + this.d),
				new Vector3D(centerX - this.d, centerY - this.d, centerZ + this.d)
			]),
			// (0,0,0) (1,0,1) (1,0,0)
			new Triangle([
				new Vector3D(centerX - this.d, centerY - this.d, centerZ - this.d),
				new Vector3D(centerX + this.d, centerY - this.d, centerZ + this.d),
				new Vector3D(centerX + this.d, centerY - this.d, centerZ - this.d)
			]),
		]);
	}
}