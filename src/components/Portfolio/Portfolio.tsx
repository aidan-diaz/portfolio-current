import { PROJECTS } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./Portfolio.module.css";

type PortfolioProps = {
  headingId: string;
};

/**
 * Portfolio section.
 *
 * Maps src/data/projects.ts onto a responsive grid of <ProjectCard />s.
 * The grid auto-fills based on viewport, so adding more entries to the
 * data array just makes the grid taller — no layout changes needed.
 */
export function Portfolio({ headingId }: PortfolioProps) {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">
          ▶ SELECT A QUEST
        </p>
        <h2 id={headingId} className={styles.title}>
          Portfolio
        </h2>
        <p className={styles.lede}>
          A few things I've built. Each card links to the GitHub repo, and a
          live demo when one's available.
        </p>
      </header>

      {PROJECTS.length === 0 ? (
        <p className={styles.empty}>No projects to show yet — check back soon.</p>
      ) : (
        <ul className={styles.grid}>
          {PROJECTS.map((project, idx) => (
            <li key={project.id} className={styles.cell}>
              <ProjectCard project={project} index={idx + 1} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
