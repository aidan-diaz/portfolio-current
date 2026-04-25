import { useCallback, useEffect, useState } from "react";

export type Theme = "ps1" | "ps2";

const STORAGE_KEY = "portfolio:theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";
const DEFAULT_THEME: Theme = "ps1";

function isTheme(value: unknown): value is Theme {
  return value === "ps1" || value === "ps2";
}

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.dataset.theme;
  if (isTheme(attr)) return attr;
  return DEFAULT_THEME;
}

/**
 * Manages the active PS1 (light) / PS2 (dark) theme.
 *
 * The pre-paint script in `index.html` is the source of truth on first render,
 * so we initialize from `<html data-theme>` rather than re-reading
 * localStorage / matchMedia (which would risk a hydration mismatch).
 *
 * Subsequent `setTheme` calls write the attribute and persist to
 * localStorage. We listen to `prefers-color-scheme` changes but only
 * auto-update while the user hasn't made a manual choice yet.
 */
export function useTheme(): {
  theme: Theme;
  setTheme: (next: Theme) => void;
  toggleTheme: () => void;
} {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable (private mode, quota, etc.) — fall
      // through; the attribute is still applied for the current session.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "ps1" ? "ps2" : "ps1");
  }, [theme, setTheme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = window.localStorage.getItem(STORAGE_KEY);
      } catch {
        saved = null;
      }
      if (isTheme(saved)) return;
      const next: Theme = e.matches ? "ps2" : "ps1";
      setThemeState(next);
      document.documentElement.setAttribute("data-theme", next);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return { theme, setTheme, toggleTheme };
}
