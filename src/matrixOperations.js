/**
 * Matrix Operations Module
 * Contains all the matrix calculation logic
 */

// Helper function to create a matrix filled with zeros
export const createMatrix = (rows, cols) => {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  };
  
  // Matrix addition
  export const addMatrices = (matrixA, matrixB) => {
    return matrixA.map((row, i) => row.map((val, j) => val + matrixB[i][j]));
  };
  
  // Matrix subtraction
  export const subtractMatrices = (matrixA, matrixB) => {
    return matrixA.map((row, i) => row.map((val, j) => val - matrixB[i][j]));
  };
  
  // Scalar multiplication
  export const scalarMultiply = (matrix, scalar) => {
    return matrix.map(row => row.map(val => val * scalar));
  };
  
  // Matrix transpose
  export const transposeMatrix = (matrix) => {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
  };
  
  // Matrix multiplication
  export const multiplyMatrices = (matrixA, matrixB) => {
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
  
  // Matrix determinant (for square matrices)
  export const determinant = (matrix) => {
    if (matrix.length !== matrix[0].length) {
      throw new Error("Matrix must be square to calculate determinant");
    }
  
    if (matrix.length === 1) return matrix[0][0];
    if (matrix.length === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
  
    let det = 0;
    for (let i = 0; i < matrix.length; i++) {
      const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
      det += matrix[0][i] * (i % 2 === 0 ? 1 : -1) * determinant(minor);
    }
    return det;
  };
  
  // Matrix inverse (for square matrices with non-zero determinant)
  export const inverseMatrix = (matrix) => {
    const det = determinant(matrix);
    if (det === 0) {
      throw new Error("Matrix is singular (determinant is 0), cannot invert");
    }
  
    const size = matrix.length;
    const adjugate = createMatrix(size, size);
  
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const minor = matrix
          .filter((_, row) => row !== i)
          .map(row => row.filter((_, col) => col !== j));
        const cofactor = ((i + j) % 2 === 0 ? 1 : -1) * determinant(minor);
        adjugate[j][i] = cofactor; // Transpose while filling adjugate
      }
    }
  
    return scalarMultiply(adjugate, 1 / det);
  };
  
  // Check if two matrices have the same dimensions
  export const sameDimensions = (matrixA, matrixB) => {
    return matrixA.length === matrixB.length && 
           matrixA[0].length === matrixB[0].length;
  };
  
  // Check if matrices can be multiplied (cols of A = rows of B)
  export const canMultiply = (matrixA, matrixB) => {
    return matrixA[0].length === matrixB.length;
  };