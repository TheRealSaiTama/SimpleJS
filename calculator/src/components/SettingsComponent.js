import React from "react";
import { saveThemePreference } from "../utils/calculatorUtils";

const SettingsComponent = ({
  isMenuOpen,
  setIsMenuOpen,
  theme,
  setTheme,
  calculatorMode,
  toggleMode,
  showHistory,
  setShowHistory,
}) => {
  // Change theme and save preference
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    saveThemePreference(newTheme);
    setIsMenuOpen(false);
  };

  return (
    <div className="controls">
      <div className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      {isMenuOpen && (
        <div className="menu-popup">
          <div className="menu-header">Settings</div>
          <div className="theme-options">
            <div className="option-header">Themes</div>
            <div className="theme-buttons">
              <button
                className={`theme-btn cosmic ${
                  theme === "cosmic" ? "active" : ""
                }`}
                onClick={() => changeTheme("cosmic")}
              >
                Cosmic
              </button>
              <button
                className={`theme-btn neon ${theme === "neon" ? "active" : ""}`}
                onClick={() => changeTheme("neon")}
              >
                Neon
              </button>
              <button
                className={`theme-btn dark ${theme === "dark" ? "active" : ""}`}
                onClick={() => changeTheme("dark")}
              >
                Dark
              </button>
              <button
                className={`theme-btn light ${
                  theme === "light" ? "active" : ""
                }`}
                onClick={() => changeTheme("light")}
              >
                Light
              </button>
            </div>
          </div>
          <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
            Close
          </button>
        </div>
      )}
      <button className="mode-toggle" onClick={toggleMode}>
        {calculatorMode === "standard" ? "📊 Scientific" : "🔢 Standard"}
      </button>
      <button
        className="history-button"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>
    </div>
  );
};

export default SettingsComponent;
