import { useEffect, useState } from "react";
import styles from "./SoundToggle.module.css";

const STORAGE_KEY = "portfolio:sound-muted";

/**
 * Reads the persisted mute preference. Defaults to muted (true) so first-load
 * UX never blasts audio at the visitor — matches the accessibility plan.
 */
function readInitialMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return true;
    return raw === "true";
  } catch {
    return true;
  }
}

/**
 * Mute/unmute toggle for the global retro SFX layer.
 *
 * State is persisted to localStorage under {@link STORAGE_KEY}; the future
 * `useSound` hook will read the same key (and listen for the custom
 * `sound-pref-change` event) so the audio layer stays in lockstep with this UI.
 */
export function SoundToggle() {
  const [muted, setMuted] = useState<boolean>(readInitialMuted);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {
      // Storage may be unavailable (private mode, quota); the toggle still works in-session.
    }
    window.dispatchEvent(
      new CustomEvent<boolean>("sound-pref-change", { detail: muted })
    );
  }, [muted]);

  const label = muted ? "Unmute sound effects" : "Mute sound effects";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setMuted((m) => !m)}
      aria-pressed={!muted}
      aria-label={label}
      title={label}
    >
      <span aria-hidden="true" className={styles.icon}>
        {muted ? <SpeakerMutedIcon /> : <SpeakerOnIcon />}
      </span>
      <span className={styles.text}>{muted ? "SOUND OFF" : "SOUND ON"}</span>
    </button>
  );
}

function SpeakerOnIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      shapeRendering="crispEdges"
      role="presentation"
    >
      <path
        fill="currentColor"
        d="M2 6h2v4H2zM4 6h2v4H4zM6 4h2v8H6zM8 2h2v12H8zM11 5h1v1h-1zM12 6h1v1h-1zM13 7h1v2h-1zM12 9h1v1h-1zM11 10h1v1h-1z"
      />
    </svg>
  );
}

function SpeakerMutedIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      shapeRendering="crispEdges"
      role="presentation"
    >
      <path
        fill="currentColor"
        d="M2 6h2v4H2zM4 6h2v4H4zM6 4h2v8H6zM8 2h2v12H8zM11 6h1v1h-1zM12 7h1v1h-1zM13 8h1v1h-1zM14 7h1v1h-1zM14 9h1v1h-1zM12 9h1v1h-1zM11 10h1v1h-1zM13 6h1v1h-1zM13 10h1v1h-1z"
      />
    </svg>
  );
}
