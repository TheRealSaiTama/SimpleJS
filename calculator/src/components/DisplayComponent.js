import React from "react";
import { formatNumber } from "../utils/calculatorUtils";

const DisplayComponent = ({ input, result, memoryValue }) => {
  return (
    <div className="display">
      <div className="prev-result">{result}</div>
      <div className="current-input">{formatNumber(input)}</div>
      {memoryValue !== 0 && <div className="memory-indicator">M</div>}
    </div>
  );
};

export default DisplayComponent;
