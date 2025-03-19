import React from "react";

const HistoryComponent = ({
  showHistory,
  prevCalculations,
  setPrevCalculations,
  setInput,
}) => {
  return (
    showHistory && (
      <div className="history-panel">
        <div className="history-header">
          <h3>Calculation History</h3>
          <button onClick={() => setPrevCalculations([])}>Clear</button>
        </div>
        <div className="history-content">
          {prevCalculations.length === 0 ? (
            <p className="no-history">No calculations yet.</p>
          ) : (
            prevCalculations.map((calc, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => setInput(calc.result)}
              >
                <div className="history-expression">{calc.expression}</div>
                <div className="history-result">{calc.result}</div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  );
};

export default HistoryComponent;
