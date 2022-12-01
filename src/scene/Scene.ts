import { Cube } from '../figures/Cube';
import { Vector3D } from '../util/vector/Vector3D';
import { Matrix } from '../util/matrix/Matrix';
import { Triangle } from '../figures/Triangle';
import { SceneMoveState } from './SceneMoveState';
import { MatrixCalculator } from '../util/matrix/MatrixCalculator';
import { Camera } from '../camera/Camera';
import { VectorCalculator } from '../util/vector/VectorCalculator';

export class Scene {
	private static readonly DEFAULT_FOV = 90;
	private static readonly ZOOM_FOV = 50;

	private readonly canvas: HTMLCanvasElement;

	private readonly ctx: CanvasRenderingContext2D;

	private readonly speed: number = 0.05;

	private readonly camera: Camera = new Camera(
		new Vector3D(0, 0, 0),
		0.1,
		100,
		Scene.DEFAULT_FOV,
		0,
		0
	);

	private readonly cube: Cube = new Cube(
		new Vector3D(0, 0, 10),
		2
	);

	private lookDirectionVector: Vector3D = new Vector3D(0, 0, 1);

	private width: number = 0;
	private height: number = 0;

	private dx: number = 0;
	private dy: number = 0;

	private moveState: SceneMoveState = SceneMoveState.IDLE;

	private matrixProjection = new Matrix();

	private currentFov: number = Scene.DEFAULT_FOV;

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
		this.updateAspectRatio();
		this.updateMatrixProjection();

		this.observeWindowResize();
		this.observeKeyDown();
		this.observeKeyUp();

		this.render();
	}

	private observeWindowResize(): void {
		window.addEventListener('resize', () => {
			this.updateSize();
			this.updateAspectRatio();
			this.updateMatrixProjection();
		});
	}

	private observeKeyDown(): void {
		window.addEventListener('keydown', (event: KeyboardEvent) => {
			switch (event.key) {
				case 'w': {
					this.moveState = SceneMoveState.UP;
					break;
				}
				case 'd': {
					this.moveState = SceneMoveState.RIGHT;
					break;
				}
				case 's': {
					this.moveState = SceneMoveState.DOWN;
					break;
				}
				case 'a': {
					this.moveState = SceneMoveState.LEFT;
					break;
				}
				case 'z': {
					let fov = Scene.DEFAULT_FOV;

					if (this.currentFov === Scene.DEFAULT_FOV) {
						fov = Scene.ZOOM_FOV;
					}

					this.updateFov(fov);
					this.updateMatrixProjection();
				}
			}
		});
	}

	private observeKeyUp(): void {
		window.addEventListener('keyup', () => {
			this.moveState = SceneMoveState.IDLE;
		});
	}

	private updateSize(): void {
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.dx = this.width / 2;
		this.dy = this.height / 2;
	}

	private updateAspectRatio() {
		this.camera.setAspectRatio(this.height / this.width);
	}

	private render(): void {
		this.ctx.clearRect(0, 0, this.width, this.height);

		const forward = VectorCalculator.multiply(this.lookDirectionVector, .1);

		switch (this.moveState) {
			case SceneMoveState.UP: {
				const newPosition = VectorCalculator.add(this.camera.getPosition(), forward);
				this.camera.setPosition(newPosition);
				break;
			}
			case SceneMoveState.DOWN: {
				const newPosition = VectorCalculator.substract(this.camera.getPosition(), forward);
				this.camera.setPosition(newPosition);
				break;
			}
			case SceneMoveState.LEFT: {
				this.camera.setYaw(this.camera.getYaw() - .01);
				break;
			}
			case SceneMoveState.RIGHT: {
				this.camera.setYaw(this.camera.getYaw() + .01);
				break;
			}
		}

		this.renderCube();

		requestAnimationFrame(() => this.render());
	}

	private renderCube(): void {
		const matrixRotationZ: Matrix = MatrixCalculator.createMatrixRotationZ(0);
		const matrixRotationX: Matrix = MatrixCalculator.createMatrixRotationX(0);

		const matrixTranslation: Matrix = MatrixCalculator.createMatrixTranslation(new Vector3D(0, 0, 55));

		let matrixWorld: Matrix = MatrixCalculator.multiply(matrixRotationZ, matrixRotationX);
		matrixWorld = MatrixCalculator.multiply(matrixWorld, matrixTranslation);

		const upVector3D: Vector3D = new Vector3D(0, 1, 0);
		let targetVector3D: Vector3D = new Vector3D(0, 0, 1);
		const matrixCameraRotation: Matrix = MatrixCalculator.createMatrixRotationY(this.camera.getYaw());

		this.lookDirectionVector = MatrixCalculator.multiplyVector(matrixCameraRotation, targetVector3D);
		targetVector3D = VectorCalculator.add(this.camera.getPosition(), this.lookDirectionVector);

		const matrixCamera: Matrix = MatrixCalculator.pointAt(this.camera.getPosition(), targetVector3D, upVector3D);

		const matrixView: Matrix = MatrixCalculator.quickInverse(matrixCamera);

		for (const triangle of this.cube.getMesh().getTriangles()) {
			const triangleVectors = triangle.getVectors();

			const triangleTransformed = new Triangle([
				MatrixCalculator.multiplyVector(matrixWorld, triangleVectors[0]),
				MatrixCalculator.multiplyVector(matrixWorld, triangleVectors[1]),
				MatrixCalculator.multiplyVector(matrixWorld, triangleVectors[2])
			]);
			const triangleTransformedVectors = triangleTransformed.getVectors();

			const triangleView: Triangle = new Triangle([
				MatrixCalculator.multiplyVector(matrixView, triangleTransformedVectors[0]),
				MatrixCalculator.multiplyVector(matrixView, triangleTransformedVectors[1]),
				MatrixCalculator.multiplyVector(matrixView, triangleTransformedVectors[2])
			]);
			const triangleViewVectors = triangleView.getVectors();

			const triangleProjected = new Triangle([
				MatrixCalculator.multiplyVector(this.matrixProjection, triangleViewVectors[0]),
				MatrixCalculator.multiplyVector(this.matrixProjection, triangleViewVectors[1]),
				MatrixCalculator.multiplyVector(this.matrixProjection, triangleViewVectors[2])
			]);
			const triangleProjectedVectors = triangleProjected.getVectors();

			triangleProjectedVectors[0] = VectorCalculator.divide(triangleProjectedVectors[0], triangleProjectedVectors[0].getW());
			triangleProjectedVectors[1] = VectorCalculator.divide(triangleProjectedVectors[1], triangleProjectedVectors[1].getW());
			triangleProjectedVectors[2] = VectorCalculator.divide(triangleProjectedVectors[2], triangleProjectedVectors[2].getW());

			triangleProjectedVectors[0].setX(triangleProjectedVectors[0].getX() * -1);
			triangleProjectedVectors[0].setY(triangleProjectedVectors[0].getY() * -1);

			triangleProjectedVectors[1].setX(triangleProjectedVectors[1].getX() * -1);
			triangleProjectedVectors[1].setY(triangleProjectedVectors[1].getY() * -1);

			triangleProjectedVectors[2].setX(triangleProjectedVectors[2].getX() * -1);
			triangleProjectedVectors[2].setY(triangleProjectedVectors[2].getY() * -1);

			const offsetViewVector = new Vector3D(1, 1, 0);

			triangleProjectedVectors[0] = VectorCalculator.add(triangleProjectedVectors[0], offsetViewVector);
			triangleProjectedVectors[1] = VectorCalculator.add(triangleProjectedVectors[1], offsetViewVector);
			triangleProjectedVectors[2] = VectorCalculator.add(triangleProjectedVectors[2], offsetViewVector);

			triangleProjectedVectors[0].setX(triangleProjectedVectors[0].getX() * this.dx);
			triangleProjectedVectors[0].setY(triangleProjectedVectors[0].getY() * this.dy);

			triangleProjectedVectors[1].setX(triangleProjectedVectors[1].getX() * this.dx);
			triangleProjectedVectors[1].setY(triangleProjectedVectors[1].getY() * this.dy);

			triangleProjectedVectors[2].setX(triangleProjectedVectors[2].getX() * this.dx);
			triangleProjectedVectors[2].setY(triangleProjectedVectors[2].getY() * this.dy);

			this.drawTriangle(triangleProjected);
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
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}

	private updateMatrixProjection(): void {
		this.matrixProjection = MatrixCalculator.createMatrixProjection(
			this.camera.getFov(),
			this.camera.getAspectRatio(),
			this.camera.getNear(),
			this.camera.getFar()
		);
	}

	private updateFov(fov: number): void {
		this.currentFov = fov;
		this.camera.setFov(fov);
	}
}