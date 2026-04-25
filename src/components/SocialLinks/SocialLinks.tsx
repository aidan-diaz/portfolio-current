import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
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
 *
 * The email icon copies the address to the clipboard on click and shows a
 * small confirmation tooltip. We still set `href="mailto:..."` so users with
 * a desktop mail client get the native compose window — but on systems
 * without one (a common case on Windows + browser-only Gmail users), the
 * clipboard fallback ensures the click is never a no-op.
 */
export function SocialLinks({
  size = "md",
  className,
  label = "Social links",
}: SocialLinksProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  function handleEmailClick(
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    const email = href.replace(/^mailto:/, "");
    if (!email) return;
    if (navigator.clipboard?.writeText) {
      // Fire-and-forget: we don't want to block mailto: navigation if it
      // happens to resolve. If the copy fails (e.g., insecure context),
      // we still let the anchor's default mailto behavior run.
      navigator.clipboard.writeText(email).catch(() => {});
    }
    setCopiedEmail(true);
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = window.setTimeout(() => {
      setCopiedEmail(false);
      resetTimerRef.current = null;
    }, 2000);
    // Intentionally do NOT preventDefault — users with a configured mail
    // client still get their native compose window.
    void event;
  }

  return (
    <ul
      className={[styles.list, styles[`size_${size}`], className]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
    >
      {SOCIAL_LINKS.map((link) => {
        const isMailto = link.href.startsWith("mailto:");
        const showCopied = isMailto && copiedEmail;
        return (
          <li key={link.id} className={styles.item}>
            <a
              className={styles.link}
              href={link.href}
              target={isMailto ? undefined : "_blank"}
              rel={isMailto ? undefined : "noopener noreferrer"}
              aria-label={
                isMailto
                  ? `${link.description} (also copies the address)`
                  : link.description
              }
              title={link.description}
              onClick={
                isMailto ? (e) => handleEmailClick(e, link.href) : undefined
              }
            >
              <span aria-hidden="true" className={styles.icon}>
                <SocialIcon id={link.id} />
              </span>
              <span className="sr-only">{link.label}</span>
            </a>
            {showCopied ? (
              <span
                className={styles.copiedToast}
                role="status"
                aria-live="polite"
              >
                Copied!
              </span>
            ) : null}
          </li>
        );
      })}
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
    case "calendly":
      return <CalendlyIcon />;
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
  /*
   * Chunky pixel-art Octocat. Body is built from horizontal bands with the
   * top + bottom corners trimmed by 1-2 px so it reads as round at 16x16.
   * The two 2x2 eye cutouts use opposite-winding subpaths (down-right-up-left)
   * inside the main body band — same trick LinkedinIcon uses for its frame
   * hole, so the eyes always show whatever the button background is (no
   * hardcoded fill, hover/light/dark all stay correct).
   */
  return (
    <svg {...SVG_PROPS}>
      <path
        fill="currentColor"
        d="M4 2h8v1H4zM3 3h10v1H3zM2 4h12v8H2zM3 12h10v1H3zM4 13h2v2H4zM10 13h2v2h-2zM5 6v2h2V6zM9 6v2h2V6z"
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
        d="M2 2h2v1H2zM12 2h2v1h-2zM3 3h2v1H3zM11 3h2v1h-2zM4 4h2v1H4zM10 4h2v1h-2zM5 5h2v1H5zM9 5h2v1H9zM6 6h4v1H6zM7 7h2v1H7zM6 8h4v1H6zM5 9h2v1H5zM9 9h2v1H9zM4 10h2v1H4zM10 10h2v1h-2zM3 11h2v1H3zM11 11h2v1h-2zM2 12h2v1H2zM12 12h2v1h-2zM1 13h2v1H1zM13 13h2v1h-2z"
      />
    </svg>
  );
}

function CalendlyIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path
        fill="currentColor"
        d="M4 1h2v1H4zM10 1h2v1h-2zM2 2h12v2H2zM2 4h1v11H2zM13 4h1v11h-1zM2 14h12v1H2zM5 7h1v1H5zM8 7h1v1H8zM11 7h1v1h-1zM5 11h1v1H5zM8 11h1v1H8zM11 11h1v1h-1z"
      />
    </svg>
  );
}
