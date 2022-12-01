import { Matrix } from './Matrix';
import { Vector3D } from '../vector/Vector3D';
import { VectorCalculator } from '../vector/VectorCalculator';

export class MatrixCalculator {
	static createMatrixProjection(fovDegrees: number, aspectRatio: number, near: number, far: number): Matrix {
		const matrixProjection = new Matrix();
		const fovRad = 1 / Math.tan(fovDegrees * 0.5 / 180 * Math.PI);

		matrixProjection.setValue(0, 0, aspectRatio * fovRad);
		matrixProjection.setValue(1, 1, fovRad);
		matrixProjection.setValue(2, 2, far / (far - near));
		matrixProjection.setValue(2, 3, 1);
		matrixProjection.setValue(3, 2, (-far * near) / (far - near));
		matrixProjection.setValue(3, 3, 0);

		return matrixProjection;
	}

	static createMatrixRotationX(angleRad: number): Matrix {
		const matrix: Matrix = new Matrix();

		matrix.setValue(0, 0, 1.0);
		matrix.setValue(1, 1, Math.cos(angleRad));
		matrix.setValue(1, 2, Math.sin(angleRad));
		matrix.setValue(2, 1, -Math.sin(angleRad));
		matrix.setValue(2, 2, Math.cos(angleRad));
		matrix.setValue(3, 3, 1.0);

		return matrix;
	}

	static createMatrixRotationY(angleRad: number): Matrix {
		const matrix: Matrix = new Matrix();

		matrix.setValue(0, 0, Math.cos(angleRad));
		matrix.setValue(0, 2, Math.sin(angleRad));
		matrix.setValue(2, 0, -Math.sin(angleRad));
		matrix.setValue(1, 1, 1.0);
		matrix.setValue(2, 2, Math.cos(angleRad));
		matrix.setValue(3, 3, 1.0);

		return matrix;
	}

	static createMatrixRotationZ(angleRad: number): Matrix {
		const matrix: Matrix = new Matrix();

		matrix.setValue(0, 0, Math.cos(angleRad));
		matrix.setValue(0, 1, Math.sin(angleRad));
		matrix.setValue(1, 0, -Math.sin(angleRad));
		matrix.setValue(1, 1, Math.cos(angleRad));
		matrix.setValue(2, 2, 1);
		matrix.setValue(3, 3, 1);

		return matrix;
	}

	static createMatrixTranslation(vector3D: Vector3D): Matrix {
		const matrix: Matrix = new Matrix();

		matrix.setValue(0, 0, 1);
		matrix.setValue(1, 1, 1);
		matrix.setValue(2, 2, 1);
		matrix.setValue(3, 3, 1);
		matrix.setValue(3, 0, vector3D.getX());
		matrix.setValue(3, 1, vector3D.getY());
		matrix.setValue(3, 2, vector3D.getZ());

		return matrix;
	}

	static pointAt(position: Vector3D, target: Vector3D, up: Vector3D): Matrix {
		const newForward: Vector3D = VectorCalculator.normalise(
			VectorCalculator.substract(target, position)
		);
		const a: Vector3D = VectorCalculator.multiply(newForward, VectorCalculator.dotProduct(up, newForward));
		const newUp: Vector3D = VectorCalculator.normalise(
			VectorCalculator.substract(up, a)
		);
		const newRight: Vector3D = VectorCalculator.crossProduct(newUp, newForward);
		const matrix: Matrix = new Matrix();

		matrix.setValue(0, 0, newRight.getX());
		matrix.setValue(0, 1, newRight.getY());
		matrix.setValue(0, 2, newRight.getZ());
		matrix.setValue(0, 3, 0);

		matrix.setValue(1, 0, newUp.getX());
		matrix.setValue(1, 1, newUp.getY());
		matrix.setValue(1, 2, newUp.getZ());
		matrix.setValue(1, 3, 0);

		matrix.setValue(2, 0, newForward.getX());
		matrix.setValue(2, 1, newForward.getY());
		matrix.setValue(2, 2, newForward.getZ());
		matrix.setValue(2, 3, 0);

		matrix.setValue(3, 0, position.getX());
		matrix.setValue(3, 1, position.getY());
		matrix.setValue(3, 2, position.getZ());
		matrix.setValue(3, 3, 1);

		return matrix;
	}

	static quickInverse(matrix: Matrix): Matrix {
		const matrixValues: number[][] = matrix.getValues();
		const newMatrix: Matrix = new Matrix();

		newMatrix.setValue(0, 0, matrixValues[0][0]);
		newMatrix.setValue(0, 1, matrixValues[1][0]);
		newMatrix.setValue(0, 2, matrixValues[2][0]);
		newMatrix.setValue(0, 3, 0);

		newMatrix.setValue(1, 0, matrixValues[0][1]);
		newMatrix.setValue(1, 1, matrixValues[1][1]);
		newMatrix.setValue(1, 2, matrixValues[2][1]);
		newMatrix.setValue(1, 3, 0);

		newMatrix.setValue(2, 0, matrixValues[0][2]);
		newMatrix.setValue(2, 1, matrixValues[1][2]);
		newMatrix.setValue(2, 2, matrixValues[2][2]);
		newMatrix.setValue(2, 3, 0);

		const newMatrixValues: number[][] = newMatrix.getValues();

		newMatrix.setValue(3, 0, -(matrixValues[3][0] * newMatrixValues[0][0] + matrixValues[3][1] * newMatrixValues[1][0] + matrixValues[3][2] * newMatrixValues[2][0]));
		newMatrix.setValue(3, 1, -(matrixValues[3][0] * newMatrixValues[0][1] + matrixValues[3][1] * newMatrixValues[1][1] + matrixValues[3][2] * newMatrixValues[2][1]));
		newMatrix.setValue(3, 2, -(matrixValues[3][0] * newMatrixValues[0][2] + matrixValues[3][1] * newMatrixValues[1][2] + matrixValues[3][2] * newMatrixValues[2][2]));
		newMatrix.setValue(3, 3, 1);

		return newMatrix;
	}

	static multiplyVector(matrix: Matrix, vector3D: Vector3D): Vector3D {
		const matrixValues: number[][] = matrix.getValues();
		const x: number = vector3D.getX() * matrixValues[0][0]
			+ vector3D.getY() * matrixValues[1][0]
			+ vector3D.getZ() * matrixValues[2][0]
			+ vector3D.getW() * matrixValues[3][0];
		const y: number = vector3D.getX() * matrixValues[0][1]
			+ vector3D.getY() * matrixValues[1][1]
			+ vector3D.getZ() * matrixValues[2][1]
			+ vector3D.getW() * matrixValues[3][1];
		const z: number = vector3D.getX() * matrixValues[0][2]
			+ vector3D.getY() * matrixValues[1][2]
			+ vector3D.getZ() * matrixValues[2][2]
			+ vector3D.getW() * matrixValues[3][2];
		const w: number = vector3D.getX() * matrixValues[0][3]
			+ vector3D.getY() * matrixValues[1][3]
			+ vector3D.getZ() * matrixValues[2][3]
			+ vector3D.getW() * matrixValues[3][3];

		return new Vector3D(x, y, z, w);
	}

	static createIdentity(): Matrix {
		const matrix: Matrix = new Matrix();

		matrix.setValue(0, 0, 1);
		matrix.setValue(1, 1, 1);
		matrix.setValue(2, 2, 1);
		matrix.setValue(3, 3, 1);

		return matrix;
	}

	static multiply(matrix1: Matrix, matrix2: Matrix): Matrix {
		const matrix: Matrix = new Matrix();
		const matrix1Value: number[][] = matrix1.getValues();
		const matrix2Value: number[][] = matrix2.getValues();

		for (let column = 0; column < 4; column++) {
			for (let row = 0; row < 4; row++) {
				const value: number = matrix1Value[row][0] * matrix2Value[0][column]
					+ matrix1Value[row][1] * matrix2Value[1][column]
					+ matrix1Value[row][2] * matrix2Value[2][column]
					+ matrix1Value[row][3] * matrix2Value[3][column];

				matrix.setValue(row, column, value);
			}
		}

		return matrix;
	}
}