import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./IntroScreen.module.css";

const SESSION_KEY = "portfolio:intro-dismissed";

function readDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Full-screen "PRESS START" overlay.
 *
 * Mounted at the top of the app. Dismisses on any key press, click, or tap
 * once the boot animation has played. Skipped automatically when:
 *   - the user already dismissed it this session (sessionStorage), or
 *   - they prefer reduced motion (we just hide it instantly).
 *
 * Once dismissed, it unmounts entirely so it can never come back unless the
 * tab is closed.
 */
export function IntroScreen() {
  const reducedMotion = useReducedMotion();

  const [visible, setVisible] = useState<boolean>(() => !readDismissed());
  const [closing, setClosing] = useState(false);

  // Auto-skip the intro for users with reduced-motion preference: they didn't
  // ask for a "press start" splash, they asked for less motion.
  useEffect(() => {
    if (visible && reducedMotion) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // ignore
      }
      setVisible(false);
    }
  }, [reducedMotion, visible]);

  const dismiss = useCallback(() => {
    if (!visible || closing) return;
    setClosing(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // Session storage may be unavailable; in-session state still hides it.
    }
    // Wait out the fade-out animation before unmounting.
    const ms = reducedMotion ? 0 : 320;
    window.setTimeout(() => setVisible(false), ms);
  }, [closing, reducedMotion, visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      // Tab/Shift+Tab keep keyboard focus traversal predictable; everything else dismisses.
      if (e.key === "Tab") return;
      e.preventDefault();
      dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss, visible]);

  useEffect(() => {
    if (!visible) return;
    // Lock background scroll while the intro is up.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={[styles.root, closing ? styles.closing : ""].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      aria-describedby="intro-prompt"
      onClick={dismiss}
    >
      <div className={styles.crt} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.boot} aria-hidden="true">
          {">"} BOOT.SEQUENCE.OK
        </p>
        <h1 id="intro-title" className={styles.title}>
          AIDAN.DIAZ
        </h1>
        <p className={styles.subtitle}>SOFTWARE ENGINEER</p>
        <p id="intro-prompt" className={styles.prompt}>
          <span className={styles.promptText}>PRESS START</span>
          <span aria-hidden="true" className={styles.cursor}>
            ▌
          </span>
        </p>
        <p className={styles.hint}>
          (any key, click, or tap to continue)
        </p>
      </div>
    </div>
  );
}
