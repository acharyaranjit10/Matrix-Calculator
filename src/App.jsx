import { useState } from 'react';
import MatrixInput from './components/MatrixInput';
import MatrixDisplay from './components/MatrixDisplay';
import OperationSelector from './components/OperationSelector';
import ThemeToggle from './components/ThemeToggle';
import {
  createMatrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  transposeMatrix,
  determinant,
  inverseMatrix,
  scalarMultiply,
  sameDimensions,
  canMultiply
} from './matrixOperations';

const App = () => {
  // Matrix states
  const [matrixA, setMatrixA] = useState(createMatrix(2, 2));
  const [matrixB, setMatrixB] = useState(createMatrix(2, 2));
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  // Operation states
  const [operation, setOperation] = useState('');
  const [scalar, setScalar] = useState(1);
  const [history, setHistory] = useState([]);

  // Check if calculation is possible with current operation and matrices
  const canCalculate = () => {
    if (!operation) return false;
    
    switch (operation) {
      case 'add':
      case 'subtract':
        return sameDimensions(matrixA, matrixB);
      case 'multiply':
        return canMultiply(matrixA, matrixB);
      case 'determinantA':
      case 'inverseA':
        return matrixA.length === matrixA[0].length;
      case 'determinantB':
      case 'inverseB':
        return matrixB.length === matrixB[0].length;
      case 'scalarA':
      case 'scalarB':
      case 'transposeA':
      case 'transposeB':
        return true;
      default:
        return false;
    }
  };

  // Perform the selected calculation
  const calculate = () => {
    try {
      setError(null);
      let newResult;
      let operationText = '';

      switch (operation) {
        case 'add':
          newResult = addMatrices(matrixA, matrixB);
          operationText = `Matrix A + Matrix B`;
          break;
        case 'subtract':
          newResult = subtractMatrices(matrixA, matrixB);
          operationText = `Matrix A - Matrix B`;
          break;
        case 'multiply':
          newResult = multiplyMatrices(matrixA, matrixB);
          operationText = `Matrix A × Matrix B`;
          break;
        case 'transposeA':
          newResult = transposeMatrix(matrixA);
          operationText = `Transpose of Matrix A`;
          break;
        case 'transposeB':
          newResult = transposeMatrix(matrixB);
          operationText = `Transpose of Matrix B`;
          break;
        case 'determinantA':
          newResult = [[determinant(matrixA)]];
          operationText = `Determinant of Matrix A = ${newResult[0][0].toFixed(2)}`;
          break;
        case 'determinantB':
          newResult = [[determinant(matrixB)]];
          operationText = `Determinant of Matrix B = ${newResult[0][0].toFixed(2)}`;
          break;
        case 'inverseA':
          newResult = inverseMatrix(matrixA);
          operationText = `Inverse of Matrix A`;
          break;
        case 'inverseB':
          newResult = inverseMatrix(matrixB);
          operationText = `Inverse of Matrix B`;
          break;
        case 'scalarA':
          newResult = scalarMultiply(matrixA, scalar);
          operationText = `Matrix A × ${scalar}`;
          break;
        case 'scalarB':
          newResult = scalarMultiply(matrixB, scalar);
          operationText = `Matrix B × ${scalar}`;
          break;
        default:
          return;
      }

      setResult(newResult);
      setHistory(prev => [operationText, ...prev.slice(0, 9)]);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  // Clear all matrices and results
  const clearAll = () => {
    setMatrixA(createMatrix(2, 2));
    setMatrixB(createMatrix(2, 2));
    setResult(null);
    setError(null);
    setOperation('');
    setScalar(1);
  };

  // Export the last result to a CSV file
  const exportResult = () => {
    if (!result) return;
    
    let csvContent = "data:text/csv;charset=utf-8,";
    result.forEach(row => {
      csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "matrix_result.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
  <header className="bg-gray-100 dark:bg-gray-900">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex-grow text-center">
    <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
  Matrix Calculator
</h1>
    </div>
    {/* <ThemeToggle /> */}
  </div>
</header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
            Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MatrixInput 
              label="Matrix A" 
              matrix={matrixA} 
              onChange={setMatrixA} 
              disabled={false}
            />
            <MatrixInput 
              label="Matrix B" 
              matrix={matrixB} 
              onChange={setMatrixB} 
              disabled={false}
            />
          </div>
          
          <div className="space-y-6">
            <OperationSelector 
              operation={operation}
              setOperation={setOperation}
              scalar={scalar}
              setScalar={setScalar}
              calculate={calculate}
              clearAll={clearAll}
              canCalculate={canCalculate()}
              history={history}
              setHistory={setHistory}
              exportResult={exportResult}
            />
            
            {result && (
              <MatrixDisplay 
                matrix={result} 
                label="Result" 
              />
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-4">
  <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
    Made by Ranjit Acharya | 2024
  </div>
</footer>
    </div>
  );
};

export default App;