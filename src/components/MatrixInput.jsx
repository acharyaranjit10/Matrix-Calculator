import { useState, useEffect } from 'react';

const MatrixInput = ({ label, matrix, onChange, disabled }) => {
  const [rows, setRows] = useState(matrix.length);
  const [cols, setCols] = useState(matrix[0].length);

  useEffect(() => {
    // Resize matrix when dimensions change
    if (rows !== matrix.length || cols !== matrix[0].length) {
      const newMatrix = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => 
          i < matrix.length && j < matrix[0].length ? matrix[i][j] : 0
        )
      );
      onChange(newMatrix);
    }
  }, [rows, cols]);

  const handleCellChange = (row, col, value) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = value === '' ? 0 : parseFloat(value);
    onChange(newMatrix);
  };
 
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg min-h-[300px] flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{label}</h3>
        <div className="flex space-x-3">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mr-1">Rows:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={rows}
              onChange={(e) => setRows(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-14 p-2 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              disabled={disabled}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mr-1">Cols:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={cols}
              onChange={(e) => setCols(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
              className="w-14 p-2 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              disabled={disabled}
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-grow flex items-center justify-center">
        <table className="mx-auto">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-2">
                    <input
                      type="number"
                      value={cell}
                      onChange={(e) => handleCellChange(i, j, e.target.value)}
                      className="w-20 h-12 p-2 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-center text-lg"
                      disabled={disabled}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MatrixInput;