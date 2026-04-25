import { useTheme } from "../../hooks/useTheme";
import styles from "./ThemeToggle.module.css";

/**
 * Pixel-styled light/dark switch that flips between PS1 (light) and PS2 (dark).
 *
 * The button stays a single, stable interactive element — only the inner glyph
 * + label swap on toggle — so screen readers announce a state change rather
 * than a fresh control. `aria-pressed` reflects "dark mode on" (PS2), which is
 * the conventional pressed-state for a dark-mode toggle.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "ps2";

  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const glyph = isDark ? "☾" : "☀";
  const text = isDark ? "Dark" : "Light";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      <span aria-hidden="true" className={styles.glyph}>
        {glyph}
      </span>
      <span aria-hidden="true" className={styles.label}>
        {text}
      </span>
    </button>
  );
}
