import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "b",
  setTheme: () => null,
});

export function ThemeProvider({ children, ...props }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get("theme");
      const valid = ["a", "b", "c", "d", "current"];
      if (urlTheme && valid.includes(urlTheme)) {
        localStorage.setItem("theme", urlTheme);
        return urlTheme;
      }
      const saved = localStorage.getItem("theme");
      if (saved && valid.includes(saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return "b";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "d") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider {...props} value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
