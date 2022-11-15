import { Vertex3D } from './Vertex3D';

export class Cube {
	private readonly d: number;
	private readonly vertices: Array<Vertex3D>;
	private readonly faces: Array<Array<Vertex3D>>;

	constructor(
		private readonly center: Vertex3D,
		private readonly size: number
	) {
		this.d = this.size / 2;
		this.vertices = [
			new Vertex3D(this.center.getX() - this.d, this.center.getY() - this.d, this.center.getZ() + this.d),
			new Vertex3D(this.center.getX() - this.d, this.center.getY() - this.d, this.center.getZ() - this.d),
			new Vertex3D(this.center.getX() + this.d, this.center.getY() - this.d, this.center.getZ() - this.d),
			new Vertex3D(this.center.getX() + this.d, this.center.getY() - this.d, this.center.getZ() + this.d),
			new Vertex3D(this.center.getX() + this.d, this.center.getY() + this.d, this.center.getZ() + this.d),
			new Vertex3D(this.center.getX() + this.d, this.center.getY() + this.d, this.center.getZ() - this.d),
			new Vertex3D(this.center.getX() - this.d, this.center.getY() + this.d, this.center.getZ() - this.d),
			new Vertex3D(this.center.getX() - this.d, this.center.getY() + this.d, this.center.getZ() + this.d)
		];
		this.faces = [
			[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
			[this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
			[this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
			[this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
			[this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
			[this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
		];
	}

	getVertices(): Array<Vertex3D> {
		return this.vertices;
	}

	getFaces(): Array<Array<Vertex3D>> {
		return this.faces;
	}
}