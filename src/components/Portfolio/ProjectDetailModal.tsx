import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import type { Project } from "../../types";
import { PixelButton } from "../PixelButton/PixelButton";
import { SaveIcon } from "./SaveIcon";
import styles from "./ProjectDetailModal.module.css";

/** Marker used to locate the close button for initial focus without
 * threading a ref through PixelButton. */
const CLOSE_ATTR = "data-modal-close";

type ProjectDetailModalProps = {
  project: Project;
  /** 1-based index used for the catalog code in the header strip (e.g. "AD-001"). */
  index: number;
  onClose: () => void;
};

/**
 * Full project detail dialog, styled as a PS2 memory-card "load save" panel.
 *
 * Rendered through a portal on `document.body` so the dialog escapes any
 * stacking / overflow context of the Portfolio section. Behaviour:
 *
 *   - Body scroll locked while open (restored on unmount).
 *   - Sibling roots of the portal element are marked `inert` while open so
 *     focus, clicks, and AT navigation are confined to the dialog. Falls
 *     back gracefully on browsers without `inert` support — backdrop click
 *     and Escape still close the modal.
 *   - The element that triggered the open is captured at mount and refocused
 *     on close, so keyboard users land back on the originating tile.
 *   - Initial focus moves to the close button (lowest-risk default — the
 *     primary action is "back to grid").
 *   - Escape and backdrop click both invoke `onClose()`.
 *
 * The visible structure mirrors a real PS2 save inspector: header strip,
 * spinning low-poly icon stage, title, sub-meta row (rating + genre),
 * description, optional disc-bullet tech list, action buttons, and a
 * decorative button-hint footer.
 */
export function ProjectDetailModal({
  project,
  index,
  onClose,
}: ProjectDetailModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const catalogCode = `AD-${String(index).padStart(3, "0")}`;
  const genreLabel = project.genre ?? "WEB APP";
  const ratingLabel = project.rating ?? "DEV";

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mark every direct child of <body> that isn't our portal root as inert.
    // We only touch elements we set; the cleanup below restores them exactly.
    const inertedSiblings: HTMLElement[] = [];
    const portalRoot = panelRef.current?.closest(`.${styles.root}`) ?? null;
    Array.from(document.body.children).forEach((child) => {
      if (!(child instanceof HTMLElement)) return;
      if (portalRoot && child === portalRoot) return;
      if (child.hasAttribute("inert")) return;
      child.setAttribute("inert", "");
      inertedSiblings.push(child);
    });

    const closeButton = panelRef.current?.querySelector<HTMLElement>(
      `[${CLOSE_ATTR}]`,
    );
    closeButton?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      inertedSiblings.forEach((el) => el.removeAttribute("inert"));
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const dialog = (
    <div className={styles.root}>
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.panel}
      >
        <header className={styles.headerStrip}>
          <span className={styles.headerLabel}>MEMORY CARD</span>
          <span className={styles.headerCode}>{catalogCode}</span>
        </header>

        <div className={styles.iconStage}>
          <SaveIcon project={project} mode="spin" size="lg" />
        </div>

        <h3 id={titleId} className={styles.title}>
          {project.title}
        </h3>

        <p className={styles.subMeta}>
          <span className={styles.ratingBox} aria-hidden="true">
            {ratingLabel}
          </span>
          <span className={styles.genreLabel}>
            <span className={styles.genrePrefix}>TYPE:</span> {genreLabel}
          </span>
        </p>

        <p className={styles.description}>{project.description}</p>

        {project.techStack && project.techStack.length > 0 ? (
          <ul className={styles.stack} aria-label="Tech stack">
            {project.techStack.map((tech) => (
              <li key={tech} className={styles.chip}>
                <DiscIcon />
                <span>{tech}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className={styles.actions}>
          <PixelButton
            as="a"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="secondary"
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub
          </PixelButton>
          {project.liveUrl ? (
            <PixelButton
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="primary"
              aria-label={`Open the live site for ${project.title}`}
            >
              Live Site
            </PixelButton>
          ) : null}
          <PixelButton
            onClick={onClose}
            size="sm"
            variant="ghost"
            {...{ [CLOSE_ATTR]: "" }}
          >
            Close
          </PixelButton>
        </div>

        <footer className={styles.hints} aria-hidden="true">
          <span>X OPEN REPO</span>
          <span>△ LIVE SITE</span>
          <span>O CLOSE / ESC</span>
        </footer>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}

/**
 * Small "disc" glyph used as the bullet for each tech-stack chip — two
 * concentric circles evoking a game CD's label + center hole. Mirrors the
 * disc bullet that lived on the old jewel-case ProjectCard.
 */
function DiscIcon() {
  return (
    <svg
      className={styles.discIcon}
      viewBox="0 0 10 10"
      width="10"
      height="10"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx={5} cy={5} r={4} fill="var(--color-yellow)" />
      <circle cx={5} cy={5} r={1.5} fill="var(--color-bg)" />
    </svg>
  );
}
