import { useContext } from "react";
import { SoundContext } from "../../sound/SoundContext";
import styles from "./SoundToggle.module.css";

/**
 * Mute/unmute toggle for the global retro SFX layer.
 *
 * Reads/writes through SoundContext so the audio layer (`useSound`) and this
 * UI stay perfectly in sync. Defaults to muted to respect first-load UX.
 */
export function SoundToggle() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("SoundToggle must be rendered inside <SoundProvider>");
  }
  const { muted, toggle } = ctx;
  const label = muted ? "Unmute sound effects" : "Mute sound effects";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
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
