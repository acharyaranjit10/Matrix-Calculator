import { useState, useEffect } from 'react';

const MatrixInput = ({ label, matrix, onChange, disabled }) => {
  // Matrix dimensions from props
  const [rows, setRows] = useState(matrix.length);
  const [cols, setCols] = useState(matrix[0]?.length || 0); // Handle potential empty matrix

  // Input field values for rows and columns
  const [rowsInput, setRowsInput] = useState(matrix.length.toString());
  const [colsInput, setColsInput] = useState((matrix[0]?.length || 0).toString());

  // Matrix values for input fields
  const [inputValues, setInputValues] = useState(
    matrix.map(row => row.map(cell => cell.toString()))
  );

  // Update internal state and input values when the matrix prop changes
  useEffect(() => {
    setRows(matrix.length);
    setCols(matrix[0]?.length || 0);
    setRowsInput(matrix.length.toString());
    setColsInput((matrix[0]?.length || 0).toString());
    setInputValues(matrix.map(row => row.map(cell => cell.toString())));
  }, [matrix]);

  // Handle matrix resizing
  useEffect(() => {
    const newMatrix = Array.from({ length: rows }, (_, i) =>
      Array.from({ length: cols }, (_, j) =>
        i < matrix.length && j < (matrix[0]?.length || 0) ? matrix[i][j] : 0
      )
    );
    onChange(newMatrix);
    // We don't need to setInputValues here immediately,
    // it will be updated in the above useEffect when the matrix prop changes.
  }, [rows, cols, onChange]);

  // Handle matrix cell changes
  const handleCellChange = (row, col, value) => {
    const newInputValues = inputValues.map(r => [...r]);
    newInputValues[row][col] = value;
    setInputValues(newInputValues);

    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = value === '' ? 0 : parseFloat(value) || 0;
    onChange(newMatrix);
  };

  // Handle row count changes
  const handleRowsChange = (e) => {
    const value = e.target.value;
    setRowsInput(value);
    if (value === '') return;
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(10, Math.max(1, numValue));
      setRows(clampedValue);
      if (numValue !== clampedValue) {
        setRowsInput(clampedValue.toString());
      }
    }
  };

  const handleRowsBlur = () => {
    if (rowsInput === '') {
      setRowsInput(rows.toString());
    } else {
      const numValue = parseInt(rowsInput);
      if (isNaN(numValue)) {
        setRowsInput(rows.toString());
      } else {
        const clampedValue = Math.min(10, Math.max(1, numValue));
        setRows(clampedValue);
        setRowsInput(clampedValue.toString());
      }
    }
  };

  // Handle column count changes
  const handleColsChange = (e) => {
    const value = e.target.value;
    setColsInput(value);
    if (value === '') return;
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      const clampedValue = Math.min(10, Math.max(1, numValue));
      setCols(clampedValue);
      if (numValue !== clampedValue) {
        setColsInput(clampedValue.toString());
      }
    }
  };

  const handleColsBlur = () => {
    if (colsInput === '') {
      setColsInput(cols.toString());
    } else {
      const numValue = parseInt(colsInput);
      if (isNaN(numValue)) {
        setColsInput(cols.toString());
      } else {
        const clampedValue = Math.min(10, Math.max(1, numValue));
        setCols(clampedValue);
        setColsInput(clampedValue.toString());
      }
    }
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
              value={rowsInput}
              onChange={handleRowsChange}
              onBlur={handleRowsBlur}
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
              value={colsInput}
              onChange={handleColsChange}
              onBlur={handleColsBlur}
              className="w-14 p-2 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto flex-grow flex items-center justify-center">
        <table className="mx-auto">
          <tbody>
            {inputValues.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="p-2">
                    <input
                      type="number"
                      value={inputValues[i][j]}
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