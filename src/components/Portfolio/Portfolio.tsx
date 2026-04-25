import { useMemo, useState } from "react";
import { PROJECTS } from "../../data/projects";
import { MemoryCardTile } from "./MemoryCardTile";
import { ProjectDetailModal } from "./ProjectDetailModal";
import styles from "./Portfolio.module.css";

type PortfolioProps = {
  headingId: string;
};

/**
 * Portfolio section, framed as a PS2 memory-card browser.
 *
 * The grid is wrapped in faux memory-card chrome — a top strip that reads
 * "MEMORY CARD (PS2) / N PROJECTS" and a button-hint footer ("X SELECT
 * O CLOSE △ LIVE SITE") — so the projects feel like saves on a real card.
 *
 * Each project renders as a square <MemoryCardTile />. Activating a tile
 * sets `openId`, which causes <ProjectDetailModal /> to mount and animate
 * the selected project's icon in. Closing the modal clears `openId` and
 * returns focus to the originating tile (handled inside the modal).
 *
 * The grid is the single source of truth for which project is "open" —
 * we keep `openId` here rather than threading it through each tile, which
 * means tiles stay dumb and the modal mounts at most once.
 */
export function Portfolio({ headingId }: PortfolioProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  // Memoised so the lookup doesn't rerun every render. PROJECTS is a
  // constant module-level array, so this is effectively free after first
  // mount; the memo is mostly for clarity.
  const openProjectInfo = useMemo(() => {
    if (openId === null) return null;
    const idx = PROJECTS.findIndex((p) => p.id === openId);
    if (idx === -1) return null;
    return { project: PROJECTS[idx], index: idx + 1 };
  }, [openId]);

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">
          ▶ Projects
        </p>
        <h2 id={headingId} className={styles.title}>
          Portfolio
        </h2>
        <p className={styles.lede}>
          A few things I've built. Pick a save to load the project's details,
          repo, and live demo.
        </p>
      </header>

      {PROJECTS.length === 0 ? (
        <p className={styles.empty}>No projects to show yet — check back soon.</p>
      ) : (
        <div className={styles.frame}>
          <div className={styles.headerStrip} aria-hidden="true">
            <span className={styles.headerStripLabel}>MEMORY CARD</span>
            <span className={styles.headerStripCount}>
              {PROJECTS.length} {PROJECTS.length === 1 ? "PROJECT" : "PROJECTS"}
            </span>
          </div>

          <ul className={styles.grid}>
            {PROJECTS.map((project) => (
              <li key={project.id} className={styles.cell}>
                <MemoryCardTile project={project} onSelect={setOpenId} />
              </li>
            ))}
          </ul>

          <div className={styles.footerHints} aria-hidden="true">
            <span>X SELECT</span>
            <span>O CLOSE</span>
            <span>△ LIVE SITE</span>
          </div>
        </div>
      )}

      {openProjectInfo ? (
        <ProjectDetailModal
          project={openProjectInfo.project}
          index={openProjectInfo.index}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </div>
  );
}
