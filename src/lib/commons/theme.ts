import * as React from "react";

export type Theme = "light" | "dark";
const KEY = "commons-theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(KEY);
  return saved === "dark" || saved === "light" ? saved : "light"; // default light
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/** Apply the persisted theme once at startup (before render, to avoid flash). */
export function initTheme() {
  applyTheme(getStoredTheme());
}

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(getStoredTheme);
  React.useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}
