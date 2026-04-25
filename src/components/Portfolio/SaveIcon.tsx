import type { ReactNode } from "react";
import styles from "./SaveIcon.module.css";

/**
 * Minimal shape SaveIcon needs from a project. Structurally typed so the
 * component compiles without relying on `Project` having an `icon` field
 * yet — once it's added in src/types.ts, real Project values will satisfy
 * this contract automatically.
 */
type SaveIconProject = {
  title: string;
  genre?: string;
  /** Optional path to a square icon under /public — falls back to a per-genre placeholder when omitted. */
  icon?: string;
};

type SaveIconProps = {
  project: SaveIconProject;
  /**
   * - "bob": gentle 2-frame translateY loop (used on memory-card tiles).
   * - "spin": 12-step Y-rotation loop (used in the project detail modal).
   * - "static": no animation — useful for previews.
   * All animations are suppressed under `prefers-reduced-motion`.
   */
  mode: "bob" | "spin" | "static";
  /** "sm" (32px) for the grid tile, "lg" (80px) for the modal stage. */
  size: "sm" | "lg";
};

/**
 * Renders a project's "save icon" — either a user-supplied square image
 * (via `project.icon`) or one of six per-genre pixel-art placeholders.
 *
 * Animation is class-driven so the same SVG can sit still, bob, or spin
 * depending on context (tile vs modal vs preview).
 */
export function SaveIcon({ project, mode, size }: SaveIconProps) {
  const sizeClass = size === "sm" ? styles.sm : styles.lg;
  const motionClass =
    mode === "bob"
      ? styles.bob
      : mode === "spin"
        ? styles.spin
        : "";

  return (
    <div
      className={[styles.stage, sizeClass].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <div className={[styles.icon, motionClass].filter(Boolean).join(" ")}>
        {project.icon ? (
          <img src={project.icon} alt="" className={styles.image} />
        ) : (
          <GenrePlaceholder genre={project.genre} />
        )}
      </div>
    </div>
  );
}

/**
 * Picks a pixel-art SVG for a project based on its genre label. Unknown or
 * missing genres fall through to the WEB APP default (a tiny CRT monitor).
 */
function GenrePlaceholder({ genre }: { genre?: string }) {
  switch ((genre ?? "").toUpperCase()) {
    case "COOPERATIVE":
      return <CooperativeIcon />;
    case "PRODUCTIVITY":
      return <ProductivityIcon />;
    case "STRATEGY":
      return <StrategyIcon />;
    case "COMMUNICATION":
      return <CommunicationIcon />;
    case "PUZZLE":
      return <PuzzleIcon />;
    default:
      return <WebAppIcon />;
  }
}

/* ----- Pixel-art placeholders (16x16 grid, crisp edges) ---------------- */

function IconCanvas({ children }: { children: ReactNode }) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      role="presentation"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Two stick figures linked at the arms — co-op buddies. */
function CooperativeIcon() {
  return (
    <IconCanvas>
      {/* heads */}
      <rect x={3} y={2} width={2} height={2} fill="var(--color-fg)" />
      <rect x={11} y={2} width={2} height={2} fill="var(--color-fg)" />
      {/* shoulders + bodies */}
      <rect x={2} y={5} width={4} height={4} fill="var(--color-accent)" />
      <rect x={10} y={5} width={4} height={4} fill="var(--color-accent)" />
      {/* arms linked across the gap */}
      <rect x={6} y={6} width={4} height={2} fill="var(--color-accent)" />
      {/* legs */}
      <rect x={2} y={9} width={1} height={3} fill="var(--color-fg)" />
      <rect x={5} y={9} width={1} height={3} fill="var(--color-fg)" />
      <rect x={10} y={9} width={1} height={3} fill="var(--color-fg)" />
      <rect x={13} y={9} width={1} height={3} fill="var(--color-fg)" />
    </IconCanvas>
  );
}

/** Clipboard with checklist lines + one check pixel. */
function ProductivityIcon() {
  return (
    <IconCanvas>
      {/* clipboard frame */}
      <rect x={3} y={3} width={10} height={11} fill="var(--color-fg)" />
      <rect x={4} y={4} width={8} height={9} fill="var(--color-bg-raised)" />
      {/* clip on top */}
      <rect x={6} y={2} width={4} height={2} fill="var(--color-fg)" />
      <rect x={7} y={1} width={2} height={1} fill="var(--color-fg)" />
      {/* checklist rows: bullet + line */}
      <rect x={5} y={6} width={1} height={1} fill="var(--color-accent)" />
      <rect x={7} y={6} width={4} height={1} fill="var(--color-fg)" />
      <rect x={5} y={9} width={1} height={1} fill="var(--color-accent)" />
      <rect x={7} y={9} width={4} height={1} fill="var(--color-fg)" />
      <rect x={5} y={11} width={1} height={1} fill="var(--color-accent)" />
      <rect x={7} y={11} width={3} height={1} fill="var(--color-fg)" />
    </IconCanvas>
  );
}

/** Concentric squares — bullseye / target. */
function StrategyIcon() {
  return (
    <IconCanvas>
      {/* outer ring */}
      <rect x={1} y={1} width={14} height={1} fill="var(--color-fg)" />
      <rect x={1} y={14} width={14} height={1} fill="var(--color-fg)" />
      <rect x={1} y={1} width={1} height={14} fill="var(--color-fg)" />
      <rect x={14} y={1} width={1} height={14} fill="var(--color-fg)" />
      {/* middle ring */}
      <rect x={4} y={4} width={8} height={1} fill="var(--color-accent)" />
      <rect x={4} y={11} width={8} height={1} fill="var(--color-accent)" />
      <rect x={4} y={4} width={1} height={8} fill="var(--color-accent)" />
      <rect x={11} y={4} width={1} height={8} fill="var(--color-accent)" />
      {/* bullseye */}
      <rect x={7} y={7} width={2} height={2} fill="var(--color-magenta)" />
    </IconCanvas>
  );
}

/** Chunky speech bubble with three pip dots and a tail. */
function CommunicationIcon() {
  return (
    <IconCanvas>
      {/* bubble fill */}
      <rect x={2} y={3} width={12} height={8} fill="var(--color-accent)" />
      {/* bubble outline */}
      <rect x={2} y={3} width={12} height={1} fill="var(--color-fg)" />
      <rect x={2} y={10} width={12} height={1} fill="var(--color-fg)" />
      <rect x={2} y={3} width={1} height={8} fill="var(--color-fg)" />
      <rect x={13} y={3} width={1} height={8} fill="var(--color-fg)" />
      {/* tail dropping down on the left */}
      <rect x={4} y={11} width={3} height={1} fill="var(--color-accent)" />
      <rect x={4} y={11} width={1} height={1} fill="var(--color-fg)" />
      <rect x={6} y={11} width={1} height={1} fill="var(--color-fg)" />
      <rect x={5} y={12} width={1} height={1} fill="var(--color-accent)" />
      <rect x={4} y={12} width={1} height={1} fill="var(--color-fg)" />
      <rect x={5} y={13} width={1} height={1} fill="var(--color-fg)" />
      {/* three pip dots */}
      <rect x={5} y={6} width={1} height={2} fill="var(--color-bg)" />
      <rect x={8} y={6} width={1} height={2} fill="var(--color-bg)" />
      <rect x={11} y={6} width={1} height={2} fill="var(--color-bg)" />
    </IconCanvas>
  );
}

/** Puzzle piece — square body with a top tab and a right tab. */
function PuzzleIcon() {
  return (
    <IconCanvas>
      {/* main body */}
      <rect x={3} y={4} width={9} height={9} fill="var(--color-yellow)" />
      {/* top tab */}
      <rect x={6} y={2} width={4} height={2} fill="var(--color-yellow)" />
      {/* right tab */}
      <rect x={12} y={6} width={2} height={4} fill="var(--color-yellow)" />
      {/* outline pieces (--color-fg) */}
      <rect x={3} y={4} width={3} height={1} fill="var(--color-fg)" />
      <rect x={10} y={4} width={2} height={1} fill="var(--color-fg)" />
      <rect x={6} y={2} width={4} height={1} fill="var(--color-fg)" />
      <rect x={6} y={3} width={1} height={1} fill="var(--color-fg)" />
      <rect x={9} y={3} width={1} height={1} fill="var(--color-fg)" />
      <rect x={3} y={4} width={1} height={9} fill="var(--color-fg)" />
      <rect x={11} y={5} width={1} height={1} fill="var(--color-fg)" />
      <rect x={11} y={10} width={1} height={1} fill="var(--color-fg)" />
      <rect x={12} y={6} width={1} height={1} fill="var(--color-fg)" />
      <rect x={12} y={9} width={1} height={1} fill="var(--color-fg)" />
      <rect x={13} y={6} width={1} height={4} fill="var(--color-fg)" />
      <rect x={3} y={12} width={9} height={1} fill="var(--color-fg)" />
    </IconCanvas>
  );
}

/** CRT monitor with a 3-dot title bar — the "WEB APP" fallback. */
function WebAppIcon() {
  return (
    <IconCanvas>
      {/* monitor frame */}
      <rect x={1} y={2} width={14} height={10} fill="var(--color-fg)" />
      {/* screen */}
      <rect x={2} y={3} width={12} height={8} fill="var(--color-bg)" />
      {/* title bar */}
      <rect x={2} y={3} width={12} height={2} fill="var(--color-accent)" />
      {/* three window dots */}
      <rect x={3} y={3} width={1} height={1} fill="var(--color-bg)" />
      <rect x={5} y={3} width={1} height={1} fill="var(--color-bg)" />
      <rect x={7} y={3} width={1} height={1} fill="var(--color-bg)" />
      {/* content lines on the screen */}
      <rect x={4} y={7} width={6} height={1} fill="var(--color-accent)" />
      <rect x={4} y={9} width={4} height={1} fill="var(--color-accent)" />
      {/* stand + base */}
      <rect x={6} y={12} width={4} height={1} fill="var(--color-fg)" />
      <rect x={4} y={13} width={8} height={1} fill="var(--color-fg)" />
    </IconCanvas>
  );
}
