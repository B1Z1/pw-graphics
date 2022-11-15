import { Cube } from './Cube';
import { Vertex3D } from './Vertex3D';
import { Vertex2D } from './Vertex2D';

export class Scene {
	private readonly canvas: HTMLCanvasElement;

	private readonly ctx: CanvasRenderingContext2D;

	private width: number = 0;
	private height: number = 0;

	private dx: number = 0;
	private dy: number = 0;

	private objects: Array<Cube> = [];
	private cubeCenter: Vertex3D;

	constructor(
		canvasSelector: string
	) {
		this.canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

		this.cubeCenter = new Vertex3D(0, 0, 0);
		this.objects = [
			new Cube(this.cubeCenter, 100)
		];

		this.initialize();
	}

	private initialize(): void {
		this.updateSize();
		this.observeWindowResize();

		this.render();
	}

	private observeWindowResize(): void {
		window.addEventListener('resize', () => {
			this.updateSize();
		});
	}

	private updateSize(): void {
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.renderCubes();

		this.dx = this.width / 2;
		this.dy = this.height / 2;
	}

	private render(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (let i = 0; i < 8; i++) {
			this.rotateCube(this.objects[0].getVertices()[i], this.cubeCenter, -Math.PI / 720, Math.PI / 720);
		}

		this.renderCubes();

		requestAnimationFrame(() => this.render());
	}

	private renderCubes(): void {
		this.ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';
		this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';

		for (let i = 0; i < this.objects.length; i++) {
			const faces = this.objects[i].getFaces();

			for (let j = 0; j < faces.length; j++) {
				const face = faces[j];
				let projection = this.calculateProjection(face[0]);

				this.ctx.beginPath();
				this.ctx.moveTo(projection.getX() + this.dx, -projection.getY() + this.dy);

				for (let k = 1; k < face.length; k++) {
					projection = this.calculateProjection(face[k]);
					this.ctx.lineTo(projection.getX() + this.dx, -projection.getY() + this.dy);
				}

				this.ctx.closePath();
				this.ctx.stroke();
				this.ctx.fill();
			}
		}
	}

	private rotateCube(vertex: Vertex3D, cubeCenter: Vertex3D, theta: number, phi: number): void {
		const ct = Math.cos(theta);
		const st = Math.sin(theta);
		const cp = Math.cos(phi);
		const sp = Math.sin(phi);

		const x = vertex.getX() - cubeCenter.getX();
		const y = vertex.getY() - cubeCenter.getY();
		const z = vertex.getZ() - cubeCenter.getZ();

		vertex.setX(ct * x - st * cp * y + st * sp * z + cubeCenter.getX());
		vertex.setY(st * x + ct * cp * y - ct * sp * z + cubeCenter.getY());
		vertex.setZ(sp * y + cp * z + cubeCenter.getZ());
	}

	private calculateProjection(vertex: Vertex3D): Vertex2D {
		return new Vertex2D(vertex.getX(), vertex.getY());
	}
}