import React, { createContext, useContext, useState, useEffect } from "react";

// Create Theme Context
const ThemeContext = createContext();

/**
 * Custom hook to use theme context
 * Must be used within ThemeProvider
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

/**
 * Theme Provider Component
 * Wraps the app to provide theme state and toggle function
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme state - default is "light"
  const [theme, setTheme] = useState("light");

  // Apply theme to document whenever it changes
  useEffect(() => {
    // Set data-theme attribute on root element
    document.documentElement.setAttribute("data-theme", theme);
    
    // Optional: Add theme class to body for additional styling
    if (theme === "light") {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    }
  }, [theme]);

  /**
   * Toggle between dark and light themes
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Provide theme state and toggle function to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;