import styles from "./ScanlineOverlay.module.css";

/**
 * Fixed-position CRT effect: horizontal scanlines + a soft corner vignette.
 *
 * Rendered as a sibling of the main app and pinned to the viewport with
 * `pointer-events: none` so it never blocks interaction. The scanline
 * shimmer animation is gated behind `prefers-reduced-motion` in the
 * companion stylesheet so motion-sensitive users get a static overlay.
 */
export function ScanlineOverlay() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.scanlines} />
      <div className={styles.vignette} />
    </div>
  );
}
