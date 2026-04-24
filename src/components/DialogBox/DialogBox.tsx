import type { ElementType, ReactNode } from "react";
import styles from "./DialogBox.module.css";

type Tone = "default" | "accent" | "magenta";

type DialogBoxProps = {
  children: ReactNode;
  /** Optional pixel-styled title rendered inside a "tab" at the top-left. */
  title?: ReactNode;
  /** Optional eyebrow line above the title — e.g. "QUEST 01". */
  eyebrow?: ReactNode;
  tone?: Tone;
  /** Render the outer element as something other than a div (e.g. "section"). */
  as?: ElementType;
  className?: string;
  /** Forwarded onto the root for `aria-labelledby` etc. */
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

/**
 * RPG-style bordered panel used to wrap section content.
 *
 * Structure:
 *   ┌──[ TITLE ]─────────────────┐
 *   │  eyebrow                   │
 *   │  ...children...            │
 *   └────────────────────────────┘
 *
 * The "title tab" overlaps the top border to give the chunky video-game
 * dialog feel. Falls back gracefully if no title is provided.
 */
export function DialogBox({
  children,
  title,
  eyebrow,
  tone = "default",
  as,
  className,
  ...rest
}: DialogBoxProps) {
  const Tag: ElementType = as ?? "div";
  const classes = [styles.box, styles[`tone_${tone}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {title ? (
        <div className={styles.titleTab}>
          <span className={styles.titleBracket} aria-hidden="true">
            [
          </span>
          <span className={styles.titleText}>{title}</span>
          <span className={styles.titleBracket} aria-hidden="true">
            ]
          </span>
        </div>
      ) : null}
      <div className={styles.body}>
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
        {children}
      </div>
    </Tag>
  );
}
