

const createMatrix = (rows, cols) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};


const addMatrices = (matrixA, matrixB) => {
  if (!sameDimensions(matrixA, matrixB)) {
    throw new Error('Matrices must have the same dimensions for addition');
  }
  return matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
};


const subtractMatrices = (matrixA, matrixB) => {
  if (!sameDimensions(matrixA, matrixB)) {
    throw new Error('Matrices must have the same dimensions for subtraction');
  }
  return matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
};


const scalarMultiply = (matrix, scalar) => {
  return matrix.map(row => row.map(val => val * scalar));
};


const transposeMatrix = (matrix) => {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
};

const multiplyMatrices = (matrixA, matrixB) => {
  if (!canMultiply(matrixA, matrixB)) {
    throw new Error('Number of columns in A must match rows in B for multiplication');
  }

  const result = createMatrix(matrixA.length, matrixB[0].length);
  for (let i = 0; i < matrixA.length; i++) {
    for (let j = 0; j < matrixB[0].length; j++) {
      for (let k = 0; k < matrixA[0].length; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
};


const determinant = (matrix) => {
  if (!isSquare(matrix)) {
    throw new Error('Matrix must be square to calculate determinant');
  }

  // Base cases
  if (matrix.length === 1) return matrix[0][0];
  if (matrix.length === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  // Recursive calculation for NxN matrix
  let det = 0;
  for (let i = 0; i < matrix.length; i++) {
    const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
    det += matrix[0][i] * cofactorSign(i) * determinant(minor);
  }
  return det;
};


const inverseMatrix = (matrix) => {
  if (!isSquare(matrix)) {
    throw new Error('Only square matrices can be inverted');
  }

  const det = determinant(matrix);
  if (det === 0) {
    throw new Error('Matrix is singular (determinant = 0), cannot be inverted');
  }

  // For 1x1 matrix
  if (matrix.length === 1) return [[1 / matrix[0][0]]];

  // For 2x2 matrix
  if (matrix.length === 2) {
    return scalarMultiply(
      [
        [matrix[1][1], -matrix[0][1]],
        [-matrix[1][0], matrix[0][0]]
      ],
      1 / det
    );
  }

  // For NxN matrix (N > 2)
  const adjugate = getAdjugate(matrix);
  return scalarMultiply(adjugate, 1 / det);
};

// Helper Functions

/**
 * Checks if two matrices have the same dimensions
 */
const sameDimensions = (matrixA, matrixB) => {
  return (
    matrixA.length === matrixB.length &&
    matrixA[0].length === matrixB[0].length
  );
};

/**
 * Checks if matrices can be multiplied (A.columns = B.rows)
 */
const canMultiply = (matrixA, matrixB) => {
  return matrixA[0].length === matrixB.length;
};

/**
 * Checks if a matrix is square
 */
const isSquare = (matrix) => {
  return matrix.length === matrix[0].length;
};

/**
 * Returns the sign for cofactor expansion
 */
const cofactorSign = (index) => {
  return index % 2 === 0 ? 1 : -1;
};

/**
 * Calculates the adjugate matrix
 */
const getAdjugate = (matrix) => {
  const size = matrix.length;
  const adjugate = createMatrix(size, size);

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const minor = matrix
        .filter((_, row) => row !== i)
        .map(row => row.filter((_, col) => col !== j));
      adjugate[j][i] = cofactorSign(i + j) * determinant(minor);
    }
  }

  return adjugate;
};

// Export all functions
export {
  createMatrix,
  addMatrices,
  subtractMatrices,
  scalarMultiply,
  transposeMatrix,
  multiplyMatrices,
  determinant,
  inverseMatrix,
  sameDimensions,
  canMultiply,
  isSquare
};