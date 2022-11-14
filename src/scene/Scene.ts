export class Scene {
	private readonly canvas: HTMLCanvasElement;

	private readonly ctx: CanvasRenderingContext2D;

	private width: number = 0;
	private height: number = 0;

	constructor(
		canvasSelector: string
	) {
		this.canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
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
	}

	private render(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, this.width, this.height);

		requestAnimationFrame(() => this.render());
	}
}