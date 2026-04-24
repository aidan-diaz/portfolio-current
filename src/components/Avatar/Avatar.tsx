import type { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

type Size = "sm" | "md" | "lg";

export type AvatarProps = {
  /** Image source. Pass any URL or `/images/...` path from the public folder. */
  src: string;
  /**
   * Accessible alt text. Pass an empty string when the avatar is decorative
   * (e.g. paired with a visible name) so screen readers skip it.
   */
  alt: string;
  /**
   * Preset box width. Pick `sm`/`md`/`lg`, or pass `null` to opt out of the
   * preset entirely when the parent controls width via `className`.
   * Defaults to `md` (matches the original Hero avatar box).
   */
  size?: Size | null;
  /** Optional class to override or extend the wrapper styling. */
  className?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className">;

/**
 * Reusable framed avatar.
 *
 * Wraps an image in the chunky pixel-art frame used across the site.
 * Drop one anywhere a portrait is needed — Hero, About, contact card, etc. —
 * and pick a size preset to fit the layout.
 */
export function Avatar({
  src,
  alt,
  size = "md",
  className,
  ...imgProps
}: AvatarProps) {
  const wrapperClasses = [
    styles.avatar,
    size ? styles[`size_${size}`] : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <img
        src={src}
        alt={alt}
        className={styles.image}
        loading="lazy"
        decoding="async"
        {...imgProps}
      />
    </div>
  );
}
