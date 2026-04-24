import styles from "./Hero.module.css";

/**
 * Inline pixel-art "developer at terminal" sprite.
 *
 * Built as an SVG `<rect>` grid so it scales crisply at any size and never
 * needs a binary asset. Colors come from CSS variables so the sprite reskins
 * automatically if the palette in tokens.css changes.
 */
export function PixelAvatar() {
  return (
    <div className={styles.avatar} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        role="presentation"
        className={styles.avatarSvg}
      >
        {/* Background tile pattern (kept transparent — DialogBox handles the bg). */}
        {/* Hair */}
        <g fill="var(--color-fg)">
          {row(7, 6, 12)}
          {row(8, 5, 14)}
          {row(9, 5, 14)}
        </g>
        {/* Face */}
        <g fill="#f4d6b3">
          {row(10, 6, 12)}
          {row(11, 6, 12)}
          {row(12, 6, 12)}
          {row(13, 7, 10)}
        </g>
        {/* Eyes */}
        <g fill="var(--color-bg)">
          <rect x={9} y={11} width={1} height={1} />
          <rect x={13} y={11} width={1} height={1} />
        </g>
        {/* Mouth */}
        <g fill="var(--color-bg)">
          <rect x={10} y={13} width={3} height={1} />
        </g>
        {/* Headphones */}
        <g fill="var(--color-magenta)">
          <rect x={6} y={9} width={1} height={3} />
          <rect x={17} y={9} width={1} height={3} />
          <rect x={7} y={8} width={10} height={1} />
        </g>
        {/* Shirt */}
        <g fill="var(--color-accent)">
          {row(14, 5, 14)}
          {row(15, 4, 16)}
          {row(16, 4, 16)}
          {row(17, 4, 16)}
        </g>
        {/* Shirt highlight */}
        <g fill="var(--color-accent-strong)">
          <rect x={11} y={15} width={2} height={2} />
        </g>
        {/* Floor pixels for grounding */}
        <g fill="var(--color-bg-sunken)">
          <rect x={2} y={20} width={20} height={2} />
        </g>
      </svg>
    </div>
  );
}

/** Helper: returns a single rectangle that spans the inclusive [x..xEnd] columns. */
function row(y: number, x: number, xEnd: number) {
  return <rect key={`r-${y}-${x}`} x={x} y={y} width={xEnd - x + 1} height={1} />;
}
