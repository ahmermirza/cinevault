import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app-container ${theme}-theme`}>{children}</div>
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
