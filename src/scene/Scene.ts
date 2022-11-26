import { Cube } from './Cube';
import { Vector3D } from './Vector3D';
import { Matrix } from './Matrix';
import { Triangle } from './Triangle';

export class Scene {
	private readonly canvas: HTMLCanvasElement;

	private readonly ctx: CanvasRenderingContext2D;

	private width: number = 0;
	private height: number = 0;

	private dx: number = 0;
	private dy: number = 0;

	private cube: Cube = new Cube(new Vector3D(0, 0, 3));

	private matrixProjection = new Matrix();

	private fNear: number = 0.1;
	private fFar: number = 1000;
	private fFov: number = 90;
	private fFovRad = 1 / Math.tan(this.fFov * 0.5 / 180 * Math.PI);
	private fAspectRatio: number = 0;

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
		this.updateMatrix();
		this.observeWindowResize();

		this.render();
	}

	private updateMatrix(): void {
		this.matrixProjection.setMatrix(0, 0, this.fAspectRatio * this.fFovRad);
		this.matrixProjection.setMatrix(1, 1, this.fFovRad);
		this.matrixProjection.setMatrix(2, 2, this.fFar / (this.fFar - this.fNear));
		this.matrixProjection.setMatrix(3, 2, (-this.fFar * this.fNear) / (this.fFar - this.fNear));
		this.matrixProjection.setMatrix(2, 3, 1);
		this.matrixProjection.setMatrix(3, 3, 0);
	}

	private observeWindowResize(): void {
		window.addEventListener('resize', () => {
			this.updateSize();
			this.updateMatrix();
		});
	}

	private updateSize(): void {
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.dx = this.width / 2;
		this.dy = this.height / 2;
		this.fAspectRatio = this.height / this.width;
	}

	private render(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.ctx.fillStyle = 'black';

		this.renderCube();

		requestAnimationFrame(() => this.render());
	}

	private renderCube(): void {
		for (const triangle of this.cube.getMesh().getTriangles()) {
			const transformedTriangle = triangle.copy();
			const [transformedTriangleFirstVector, transformedTriangleSecondVector, transformedTriangleThirdVector] = transformedTriangle.getVectors();

			transformedTriangle.setVectors([
				this.multiplyMatrixVector(transformedTriangleFirstVector, this.matrixProjection),
				this.multiplyMatrixVector(transformedTriangleSecondVector, this.matrixProjection),
				this.multiplyMatrixVector(transformedTriangleThirdVector, this.matrixProjection)
			]);

			const [
				projectedTriangleFirstVector,
				projectedTriangleSecondVector,
				projectedTriangleThirdVector
			] = transformedTriangle.getVectors();

			projectedTriangleFirstVector.setX(
				(projectedTriangleFirstVector.getX() + 1) * this.dx
			);
			projectedTriangleFirstVector.setY(
				(projectedTriangleFirstVector.getY() + 1) * this.dy
			);

			projectedTriangleSecondVector.setX(
				(projectedTriangleSecondVector.getX() + 1) * this.dx
			);
			projectedTriangleSecondVector.setY(
				(projectedTriangleSecondVector.getY() + 1) * this.dy
			);

			projectedTriangleThirdVector.setX(
				(projectedTriangleThirdVector.getX() + 1) * this.dx
			);
			projectedTriangleThirdVector.setY(
				(projectedTriangleThirdVector.getY() + 1) * this.dy
			);

			this.drawTriangle(transformedTriangle);
		}

	}

	private drawTriangle(triangle: Triangle): void {
		const [triangleFirstVector, triangleSecondVector, triangleThirdVector] = triangle.getVectors();

		this.ctx.strokeStyle = 'black';
		this.ctx.beginPath();
		this.ctx.moveTo(triangleFirstVector.getX(), triangleFirstVector.getY());
		this.ctx.lineTo(triangleSecondVector.getX(), triangleSecondVector.getY());
		this.ctx.lineTo(triangleThirdVector.getX(), triangleThirdVector.getY());
		this.ctx.lineTo(triangleFirstVector.getX(), triangleFirstVector.getY());
		this.ctx.stroke();
		this.ctx.closePath();
	}

	private multiplyMatrixVector(vector3D: Vector3D, matrix: Matrix): Vector3D {
		const matrixValue = matrix.getMatrix();
		const w = vector3D.getX() * matrixValue[0][3] + vector3D.getY() * matrixValue[1][3] + vector3D.getZ() * matrixValue[2][3] + matrixValue[3][3];
		let x = vector3D.getX() * matrixValue[0][0] + vector3D.getY() * matrixValue[1][0] + vector3D.getZ() * matrixValue[2][0] + matrixValue[3][0];
		let y = vector3D.getX() * matrixValue[0][1] + vector3D.getY() * matrixValue[1][1] + vector3D.getZ() * matrixValue[2][1] + matrixValue[3][1];
		let z = vector3D.getX() * matrixValue[0][2] + vector3D.getY() * matrixValue[1][2] + vector3D.getZ() * matrixValue[2][2] + matrixValue[3][2];

		if (w !== 0) {
			x /= w;
			y /= w;
			z /= w;
		}

		return new Vector3D(x, y, z);
	}
}