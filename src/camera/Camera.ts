import { Vector3D } from '../util/vector/Vector3D';

export class Camera {
	constructor(
		private position: Vector3D = new Vector3D(0, 0, 0),
		private near: number = 0.1,
		private far: number = 100,
		private fov: number = 90,
		private aspectRatio: number = 0,
		private yaw: number = 0
	) {
	}

	getPosition(): Vector3D {
		return this.position;
	}

	setPosition(position: Vector3D): void {
		this.position = position;
	}

	getX(): number {
		return this.position.getX();
	}

	setX(x: number): void {
		this.position.setX(x);
	}

	getY(): number {
		return this.position.getY();
	}

	setY(y: number): void {
		this.position.setX(y);
	}

	getZ(): number {
		return this.position.getZ();
	}

	setZ(z: number): void {
		this.position.setX(z);
	}

	getNear(): number {
		return this.near;
	}

	setNear(near: number): void {
		this.near = near;
	}

	getFar(): number {
		return this.far;
	}

	setFar(far: number): void {
		this.far = far;
	}

	getFov(): number {
		return this.fov;
	}

	setFov(fov: number): void {
		this.fov = fov;
	}

	getAspectRatio(): number {
		return this.aspectRatio;
	}

	setAspectRatio(aspectRatio: number): void {
		this.aspectRatio = aspectRatio;
	}

	getYaw(): number {
		return this.yaw;
	}

	setYaw(yaw: number): void {
		this.yaw = yaw;
	}
}