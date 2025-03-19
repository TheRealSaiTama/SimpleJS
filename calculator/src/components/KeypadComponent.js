import React from "react";

const KeypadComponent = ({
  handleButtonClick,
  calculatorMode,
  standardButtons,
  scientificButtons,
  memoryButtons,
}) => {
  return (
    <>
      {calculatorMode === "scientific" && (
        <div className="scientific-buttons">
          {scientificButtons.map((btn, index) => (
            <button
              key={`sci-${index}`}
              className={btn.className}
              onClick={() => handleButtonClick(btn.value)}
            >
              {btn.value}
            </button>
          ))}
        </div>
      )}

      <div className="memory-buttons">
        {memoryButtons.map((btn, index) => (
          <button
            key={`mem-${index}`}
            className={btn.className}
            onClick={() => handleButtonClick(btn.value)}
          >
            {btn.value}
          </button>
        ))}
      </div>

      <div className="button-grid">
        {standardButtons.map((btn, index) => (
          <button
            key={index}
            className={btn.className}
            onClick={() => handleButtonClick(btn.value)}
          >
            {btn.value}
          </button>
        ))}
      </div>
    </>
  );
};

export default KeypadComponent;
