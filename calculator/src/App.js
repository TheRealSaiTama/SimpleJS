import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// Import components
import DisplayComponent from "./components/DisplayComponent";
import KeypadComponent from "./components/KeypadComponent";
import HistoryComponent from "./components/HistoryComponent";
import SettingsComponent from "./components/SettingsComponent";

// Import utilities
import {
  scientificFunctions,
  calculateWithPrecision,
  getThemePreference,
  saveCalculationHistory,
  getCalculationHistory,
  keyboardMap,
} from "./utils/calculatorUtils";

const App = () => {
  // States for calculator functionality
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");
  const [prevCalculations, setPrevCalculations] = useState(() =>
    getCalculationHistory()
  );
  const [showHistory, setShowHistory] = useState(false);
  const [theme, setTheme] = useState(() => getThemePreference());
  const [calculatorMode, setCalculatorMode] = useState("standard");
  const [memoryValue, setMemoryValue] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animation, setAnimation] = useState("");

  // Refs
  const calculatorRef = useRef(null);

  // Clear input
  const clearInput = useCallback(() => {
    setInput("0");
    setResult("");
  }, []);

  // Append value to input
  const appendToInput = useCallback(
    (value) => {
      if (input === "0" || input === "Error") {
        setInput(value);
      } else {
        setInput(input + value);
      }
    },
    [input]
  );

  // Backspace function
  const backspace = useCallback(() => {
    if (input.length === 1 || input === "Error") {
      setInput("0");
    } else {
      setInput(input.slice(0, -1));
    }
  }, [input]);

  // Toggle sign
  const toggleSign = useCallback(() => {
    if (input !== "0" && input !== "Error") {
      setInput(input.charAt(0) === "-" ? input.slice(1) : "-" + input);
    }
  }, [input]);

  // Calculate percentage
  const calculatePercentage = useCallback(() => {
    try {
      const value = parseFloat(input) / 100;
      setInput(value.toString());
    } catch (error) {
      setInput("Error");
      setTimeout(() => clearInput(), 1000);
    }
  }, [input, clearInput]);

  // Scientific operations handler
  const handleScientificOperation = useCallback(
    (operation) => {
      try {
        let currentValue = parseFloat(input);
        let newValue;

        switch (operation) {
          case "sin":
            newValue = scientificFunctions.sin(currentValue);
            break;
          case "cos":
            newValue = scientificFunctions.cos(currentValue);
            break;
          case "tan":
            newValue = scientificFunctions.tan(currentValue);
            break;
          case "asin":
            newValue = scientificFunctions.asin(currentValue);
            break;
          case "acos":
            newValue = scientificFunctions.acos(currentValue);
            break;
          case "atan":
            newValue = scientificFunctions.atan(currentValue);
            break;
          case "log":
            newValue = scientificFunctions.log10(currentValue);
            break;
          case "ln":
            newValue = scientificFunctions.ln(currentValue);
            break;
          case "√":
            newValue = scientificFunctions.sqrt(currentValue);
            break;
          case "x²":
            newValue = scientificFunctions.square(currentValue);
            break;
          case "x³":
            newValue = scientificFunctions.cube(currentValue);
            break;
          case "π":
            newValue = Math.PI;
            break;
          case "e":
            newValue = Math.E;
            break;
          default:
            return;
        }

        setInput(newValue.toString());
        setResult(`${operation}(${currentValue}) = ${newValue}`);
      } catch (error) {
        setInput("Error");
        setTimeout(() => clearInput(), 1000);
      }
    },
    [input, clearInput]
  );

  // Calculate the result
  const calculateResult = useCallback(() => {
    try {
      // Replace 'x' with '*' for JavaScript evaluation
      const expression = input.replace(/x/g, "*");
      const calculatedResult = calculateWithPrecision(expression);

      // Add to history
      const newHistory = [
        { expression: input, result: calculatedResult.toString() },
        ...prevCalculations.slice(0, 9), // Keep only 10 entries
      ];

      setPrevCalculations(newHistory);
      saveCalculationHistory(newHistory);

      setResult(`${input} = ${calculatedResult}`);
      setInput(calculatedResult.toString());
    } catch (error) {
      setInput("Error");
      setTimeout(() => clearInput(), 1000);
    }
  }, [input, prevCalculations, clearInput]);

  // Handle button clicks - using useCallback to memoize this function
  const handleButtonClick = useCallback(
    (value) => {
      setAnimation("button-press");
      setTimeout(() => setAnimation(""), 300);

      switch (value) {
        case "C":
          clearInput();
          break;
        case "=":
          calculateResult();
          break;
        case "←":
          backspace();
          break;
        case "±":
          toggleSign();
          break;
        case "%":
          calculatePercentage();
          break;
        case "MC":
          setMemoryValue(0);
          break;
        case "MR":
          setInput(memoryValue.toString());
          break;
        case "M+":
          setMemoryValue(memoryValue + parseFloat(input));
          break;
        case "M-":
          setMemoryValue(memoryValue - parseFloat(input));
          break;
        case "sin":
        case "cos":
        case "tan":
        case "log":
        case "ln":
        case "√":
        case "x²":
        case "x³":
        case "π":
        case "e":
        case "asin":
        case "acos":
        case "atan":
          handleScientificOperation(value);
          break;
        default:
          appendToInput(value);
      }
    },
    [
      clearInput,
      calculateResult,
      backspace,
      toggleSign,
      calculatePercentage,
      memoryValue,
      input,
      handleScientificOperation,
      appendToInput,
    ]
  );

  // Toggle calculator mode
  const toggleMode = useCallback(() => {
    setCalculatorMode((prevMode) =>
      prevMode === "standard" ? "scientific" : "standard"
    );
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If menu is open, don't process keyboard input
      if (isMenuOpen) return;

      const key = e.key;
      if (keyboardMap[key]) {
        e.preventDefault();
        handleButtonClick(keyboardMap[key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, handleButtonClick]);

  // Animation on theme change
  useEffect(() => {
    if (calculatorRef.current) {
      calculatorRef.current.classList.add("theme-transition");
      setTimeout(() => {
        calculatorRef.current.classList.remove("theme-transition");
      }, 500);
    }

    // Set body class to match the theme
    document.body.className = theme;
  }, [theme]);

  // Standard calculator buttons
  const standardButtons = [
    { value: "C", className: "clear" },
    { value: "±", className: "operation" },
    { value: "%", className: "operation" },
    { value: "/", className: "operation" },
    { value: "7", className: "number" },
    { value: "8", className: "number" },
    { value: "9", className: "number" },
    { value: "x", className: "operation" },
    { value: "4", className: "number" },
    { value: "5", className: "number" },
    { value: "6", className: "number" },
    { value: "-", className: "operation" },
    { value: "1", className: "number" },
    { value: "2", className: "number" },
    { value: "3", className: "number" },
    { value: "+", className: "operation" },
    { value: "0", className: "number zero" },
    { value: ".", className: "number" },
    { value: "←", className: "backspace" },
    { value: "=", className: "equals" },
  ];

  // Memory buttons
  const memoryButtons = [
    { value: "MC", className: "memory" },
    { value: "MR", className: "memory" },
    { value: "M+", className: "memory" },
    { value: "M-", className: "memory" },
  ];

  // Scientific buttons
  const scientificButtons = [
    { value: "sin", className: "scientific" },
    { value: "cos", className: "scientific" },
    { value: "tan", className: "scientific" },
    { value: "asin", className: "scientific" },
    { value: "acos", className: "scientific" },
    { value: "atan", className: "scientific" },
    { value: "log", className: "scientific" },
    { value: "ln", className: "scientific" },
    { value: "√", className: "scientific" },
    { value: "x²", className: "scientific" },
    { value: "x³", className: "scientific" },
    { value: "π", className: "scientific" },
    { value: "e", className: "scientific" },
  ];

  return (
    <div className={`app-container ${theme}`}>
      <SettingsComponent
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        theme={theme}
        setTheme={setTheme}
        calculatorMode={calculatorMode}
        toggleMode={toggleMode}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />

      <div
        ref={calculatorRef}
        className={`calculator ${calculatorMode} ${animation}`}
      >
        <DisplayComponent
          input={input}
          result={result}
          memoryValue={memoryValue}
        />

        <KeypadComponent
          handleButtonClick={handleButtonClick}
          calculatorMode={calculatorMode}
          standardButtons={standardButtons}
          scientificButtons={scientificButtons}
          memoryButtons={memoryButtons}
        />
      </div>

      <HistoryComponent
        showHistory={showHistory}
        prevCalculations={prevCalculations}
        setPrevCalculations={setPrevCalculations}
        setInput={setInput}
      />
    </div>
  );
};

export default App;
