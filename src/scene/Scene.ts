import { Cube } from './Cube';
import { Vector3D } from './Vector3D';

export class Scene {
	private readonly canvas: HTMLCanvasElement;

	private readonly ctx: CanvasRenderingContext2D;

	private width: number = 0;
	private height: number = 0;

	private dx: number = 0;
	private dy: number = 0;

	private cube: Cube = new Cube(new Vector3D(0, 0, 0), 100);

	constructor(
		canvasSelector: string
	) {
		this.canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

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

		this.dx = this.width / 2;
		this.dy = this.height / 2;
	}

	private render(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.ctx.fillStyle = 'black';

		for (const triangle of this.cube.getMesh().getTriangles()) {
			for (const vector of triangle.getVectors()) {
				this.ctx.beginPath();
				this.ctx.fillRect(vector.getX() + this.dx, vector.getY() + this.dy, 1, 1);
				this.ctx.closePath();
			}
		}

		requestAnimationFrame(() => this.render());
	}

}