import type { Project } from "../../types";
import { PixelButton } from "../PixelButton/PixelButton";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  /** 1-based index used for the gamified "QUEST 0X" eyebrow. */
  index: number;
};

/**
 * Reusable card for a single portfolio entry.
 *
 * Shows title, brief description, optional thumbnail, optional tech-stack
 * "stat chips", a GitHub button (always), and a "Live Site" button (only
 * when `liveUrl` is present). To add a new project, append an entry to
 * src/data/projects.ts — no markup changes required.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, thumbnail, githubUrl, liveUrl, techStack } =
    project;
  const headingId = `project-${project.id}-title`;
  const questNumber = String(index).padStart(2, "0");

  return (
    <article
      className={styles.card}
      aria-labelledby={headingId}
    >
      <div className={styles.thumbWrap}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            className={styles.thumb}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <ProjectThumbPlaceholder title={title} />
        )}
        <span className={styles.questBadge} aria-hidden="true">
          QUEST {questNumber}
        </span>
      </div>

      <div className={styles.body}>
        <h3 id={headingId} className={styles.title}>
          {title}
        </h3>
        <p className={styles.description}>{description}</p>

        {techStack && techStack.length > 0 ? (
          <ul className={styles.stack} aria-label="Tech stack">
            {techStack.map((tech) => (
              <li key={tech} className={styles.chip}>
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={styles.actions}>
          <PixelButton
            as="a"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="secondary"
            aria-label={`View ${title} on GitHub`}
          >
            GitHub
          </PixelButton>
          {liveUrl ? (
            <PixelButton
              as="a"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="primary"
              aria-label={`Open the live site for ${title}`}
            >
              Live Site
            </PixelButton>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/**
 * Inline pixel-art placeholder shown when a project has no thumbnail yet.
 * Uses CSS-variable colors so it always matches the current palette.
 */
function ProjectThumbPlaceholder({ title }: { title: string }) {
  return (
    <div
      className={styles.placeholder}
      role="img"
      aria-label={`${title} placeholder thumbnail`}
    >
      <svg
        viewBox="0 0 32 18"
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        role="presentation"
      >
        <rect x={0} y={0} width={32} height={18} fill="var(--color-bg-sunken)" />
        {/* Stylized pixel mountains */}
        <path
          fill="var(--color-bg-raised)"
          d="M0 14h32v4H0zM6 10h2v2H6zM7 9h2v1H7zM8 8h2v1H8zM9 9h2v1H9zM10 10h2v2h-2zM11 11h2v1h-2zM18 8h2v2h-2zM19 7h2v1h-2zM20 6h2v1h-2zM21 7h2v1h-2zM22 8h2v2h-2zM23 9h2v1h-2zM24 10h2v2h-2z"
        />
        {/* Sun */}
        <rect x={24} y={3} width={4} height={4} fill="var(--color-yellow)" />
        {/* Stars */}
        <rect x={3} y={3} width={1} height={1} fill="var(--color-fg)" />
        <rect x={14} y={2} width={1} height={1} fill="var(--color-fg)" />
        <rect x={28} y={1} width={1} height={1} fill="var(--color-fg)" />
        <rect x={9} y={5} width={1} height={1} fill="var(--color-fg-muted)" />
      </svg>
    </div>
  );
}
