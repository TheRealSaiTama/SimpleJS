/**
 * Calculator Utility Functions
 * Provides extended functionality for the Cosmic Calculator
 */

// Format large numbers with commas
export const formatNumber = (num) => {
  if (!num) return "0";

  // Handle scientific notation
  if (num.toString().includes("e")) {
    return num.toString();
  }

  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

// Custom math expression evaluator (safer than eval/Function)
export const evaluateMathExpression = (expression) => {
  // Tokenize the expression
  const tokens = tokenize(expression);
  // Parse tokens and evaluate
  return parseExpression(tokens);
};

// Tokenize a math expression into numbers, operators, and parentheses
const tokenize = (expression) => {
  const tokens = [];
  let numStr = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    // Handle numbers and decimal points
    if (/[0-9.]/.test(char)) {
      numStr += char;
    }
    // Handle operators and parentheses
    else if (/[+\-*/()]/.test(char)) {
      // Push accumulated number if any
      if (numStr) {
        tokens.push(parseFloat(numStr));
        numStr = "";
      }

      // Handle minus sign as negative indicator
      if (char === "-" && (i === 0 || /[+\-*/()]/.test(expression[i - 1]))) {
        numStr = "-";
      } else {
        tokens.push(char);
      }
    }
  }

  // Push final number if any
  if (numStr) {
    tokens.push(parseFloat(numStr));
  }

  return tokens;
};

// Parse tokens and evaluate expression using a shunting yard algorithm
const parseExpression = (tokens) => {
  const outputQueue = [];
  const operatorStack = [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

  // Process each token
  for (const token of tokens) {
    // Numbers go to the output queue
    if (typeof token === "number") {
      outputQueue.push(token);
    }
    // Operators get processed based on precedence
    else if (["+", "-", "*", "/"].includes(token)) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "(" &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
    // Handle open parenthesis
    else if (token === "(") {
      operatorStack.push(token);
    }
    // Handle close parenthesis
    else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
      // Pop the open parenthesis
      if (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] === "("
      ) {
        operatorStack.pop();
      }
    }
  }

  // Pop remaining operators to the output queue
  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  // Evaluate RPN notation
  return evaluateRPN(outputQueue);
};

// Evaluate expression in Reverse Polish Notation
const evaluateRPN = (rpnTokens) => {
  const stack = [];

  for (const token of rpnTokens) {
    if (typeof token === "number") {
      stack.push(token);
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          if (b === 0) throw new Error("Division by zero");
          stack.push(a / b);
          break;
      }
    }
  }

  return stack[0];
};

// Handle complex calculations and error conditions
export const calculateWithPrecision = (expression) => {
  try {
    // Replace constants with their values
    expression = expression
      .replace(/π/g, Math.PI.toString())
      .replace(/e/g, Math.E.toString());

    // Safe calculation
    const result = evaluateMathExpression(expression);

    // Check for valid result
    if (result === Infinity || result === -Infinity) {
      throw new Error("Division by zero");
    }

    if (isNaN(result)) {
      throw new Error("Invalid calculation");
    }

    // Handle floating point precision
    return Number.isInteger(result) ? result : parseFloat(result.toFixed(10));
  } catch (error) {
    console.error("Calculation error:", error);
    throw error;
  }
};

// Convert between degrees and radians
export const toRadians = (degrees) => degrees * (Math.PI / 180);
export const toDegrees = (radians) => radians * (180 / Math.PI);

// Additional scientific calculator functions
export const scientificFunctions = {
  sin: (x) => Math.sin(toRadians(x)),
  cos: (x) => Math.cos(toRadians(x)),
  tan: (x) => Math.tan(toRadians(x)),
  asin: (x) => toDegrees(Math.asin(x)),
  acos: (x) => toDegrees(Math.acos(x)),
  atan: (x) => toDegrees(Math.atan(x)),
  log10: (x) => Math.log10(x),
  ln: (x) => Math.log(x),
  sqrt: (x) => Math.sqrt(x),
  cbrt: (x) => Math.cbrt(x),
  square: (x) => Math.pow(x, 2),
  cube: (x) => Math.pow(x, 3),
  exp: (x) => Math.exp(x),
  factorial: (x) => {
    if (x < 0) return NaN;
    if (x === 0) return 1;
    let result = 1;
    for (let i = 1; i <= x; i++) {
      result *= i;
    }
    return result;
  },
  abs: (x) => Math.abs(x),
  floor: (x) => Math.floor(x),
  ceil: (x) => Math.ceil(x),
  round: (x) => Math.round(x),
};

// Theme preferences storage
export const saveThemePreference = (theme) => {
  localStorage.setItem("calculator-theme", theme);
};

export const getThemePreference = () => {
  return localStorage.getItem("calculator-theme") || "cosmic";
};

// History management
export const saveCalculationHistory = (history) => {
  localStorage.setItem("calculation-history", JSON.stringify(history));
};

export const getCalculationHistory = () => {
  const history = localStorage.getItem("calculation-history");
  return history ? JSON.parse(history) : [];
};

// Keyboard mapping for calculator
export const keyboardMap = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "+": "+",
  "-": "-",
  "*": "x",
  "/": "/",
  ".": ".",
  Enter: "=",
  Escape: "C",
  Backspace: "←",
  "%": "%",
  p: "π",
  e: "e",
  s: "sin",
  c: "cos",
  t: "tan",
  l: "log",
  n: "ln",
  r: "√",
  "^": "x²",
};
