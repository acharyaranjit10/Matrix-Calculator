const MatrixDisplay = ({ matrix, label, precision = 2 }) => {
    if (!matrix || matrix.length === 0) return null;
  
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {label && <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{label}</h3>}
        <div className="overflow-x-auto">
          <table className="mx-auto">
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="p-2 border dark:border-gray-600 text-center">
                      {typeof cell === 'number' ? cell.toFixed(precision) : cell}
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
  
  export default MatrixDisplay;