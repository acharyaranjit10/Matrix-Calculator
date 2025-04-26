const operations = [
  { value: 'add', label: 'Addition (A+B)' },
  { value: 'subtract', label: 'Subtraction (A-B)' },
  { value: 'multiply', label: 'Multiplication (A×B)' },
  { value: 'transposeA', label: 'Transpose A' },
  { value: 'transposeB', label: 'Transpose B' },
  { value: 'determinantA', label: 'Determinant of A' },
  { value: 'determinantB', label: 'Determinant of B' },
  { value: 'inverseA', label: 'Inverse of A' },
  { value: 'inverseB', label: 'Inverse of B' },
  { value: 'scalarA', label: 'Scalar Multiply A' },
  { value: 'scalarB', label: 'Scalar Multiply B' },
];

const OperationSelector = ({ 
  operation, 
  setOperation, 
  scalar, 
  setScalar,
  calculate,
  clearAll,
  canCalculate,
  history,
  setHistory,
  exportResult
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-4">Operations</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-1">
          Select Operation
        </label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">-- Select an operation --</option>
          {operations.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      {(operation === 'scalarA' || operation === 'scalarB') && (
        <div className="mb-4">
          <label className="block text-sm font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-1">
            Scalar Value
          </label>
          <input
            type="number"
            value={scalar}
            onChange={(e) => setScalar(parseFloat(e.target.value) || 0)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={calculate}
          disabled={!canCalculate}
          className={`px-4 py-2 rounded-md text-white ${canCalculate ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
        >
          Calculate
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Clear All
        </button>
      </div>

      {history.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-2">History</h4>
          <ul className="max-h-40 overflow-y-auto text-sm">
            {history.map((item, index) => (
              <li 
                key={index} 
                className="py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => setHistory(prev => prev.filter((_, i) => i !== index))}
              >
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={exportResult}
            className="mt-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            disabled={history.length === 0}
          >
            Export Last Result
          </button>
        </div>
      )}
    </div>
  );
};

export default OperationSelector;