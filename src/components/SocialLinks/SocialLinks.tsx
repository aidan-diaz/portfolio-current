import type { ReactNode } from "react";
import { SOCIAL_LINKS } from "../../data/socials";
import type { SocialId } from "../../types";
import styles from "./SocialLinks.module.css";

type Size = "sm" | "md";

type SocialLinksProps = {
  size?: Size;
  className?: string;
  /** Optional aria-label for the wrapping list (default: "Social links"). */
  label?: string;
};

/**
 * Pixel-styled icon row for GitHub / LinkedIn / Gmail / Twitter.
 *
 * Reused in the hero, contact section, and footer. Data comes from
 * src/data/socials.ts so the URLs live in one place.
 */
export function SocialLinks({
  size = "md",
  className,
  label = "Social links",
}: SocialLinksProps) {
  return (
    <ul
      className={[styles.list, styles[`size_${size}`], className]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
    >
      {SOCIAL_LINKS.map((link) => (
        <li key={link.id} className={styles.item}>
          <a
            className={styles.link}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              link.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            aria-label={link.description}
            title={link.description}
          >
            <span aria-hidden="true" className={styles.icon}>
              <SocialIcon id={link.id} />
            </span>
            <span className="sr-only">{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialIcon({ id }: { id: SocialId }): ReactNode {
  switch (id) {
    case "github":
      return <GithubIcon />;
    case "linkedin":
      return <LinkedinIcon />;
    case "email":
      return <EmailIcon />;
    case "twitter":
      return <TwitterIcon />;
    default:
      return null;
  }
}

const SVG_PROPS = {
  viewBox: "0 0 16 16",
  width: 24,
  height: 24,
  shapeRendering: "crispEdges" as const,
  role: "presentation" as const,
};

function GithubIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        fill="currentColor"
        d="M5 1h6v1h1v1h1v1h1v6h-1v1h-1v1h-1v1h-1v-2h-1v-1h-1v1h-1v2H6v-1H5v-1H4v1H3v-1H2v-1H1V4h1V3h1V2h1V1h1zM6 12h1v1H6zM5 12h1v1H5zM4 12h1v1H4zM6 11h1v1H6z"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        fill="currentColor"
        d="M2 2h12v12H2V2zm1 1v10h10V3H3zM4 5h2v1H4V5zM4 7h2v6H4V7zm3 0h2v1h1V7h2v1h1v5h-2V9h-1v4H7V7z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        fill="currentColor"
        d="M1 4h14v8H1V4zm1 1v1h1v1h1v1h1v1h1v1h1v1h2V9h1V8h1V7h1V6h1V5H2zm0 3v3h2V9H3V8H2zm12 0v1h-1v1h-1v2h2V8z"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        fill="currentColor"
        d="M1 2h3v1h1v1h1v1h1V4h1V3h1V2h1v1h1v1H9v1H8v1H7v1H6v2H5v1H4v1H3v1H2v1h2v-1h2v-1h1v-1h1v-1h1v-1h1v1h1v1h1v1h1v1h1v1h-1v1h-3v-1h-1v-1h-1v-1H7v1H6v1H5v1H1v-1h1v-1h1V9H2V8h1V7h1V6H3V5H2V4H1V2z"
      />
    </svg>
  );
}
