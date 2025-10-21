import React, { createContext, useContext, useEffect, useState } from "react";

// Define theme types
type Theme = "light" | "dark";

// Context type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#ffffff";
    document.body.style.color = theme === "dark" ? "#ffffff" : "#000000";
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Hook to use Theme
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
