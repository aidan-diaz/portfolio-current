import type { Project } from "../../types";
import { SaveIcon } from "./SaveIcon";
import styles from "./MemoryCardTile.module.css";

type MemoryCardTileProps = {
  project: Project;
  /** Fired when the tile is activated (click / Enter / Space). Receives the project id so the parent can open its detail modal. */
  onSelect: (id: string) => void;
};

export function MemoryCardTile({ project, onSelect }: MemoryCardTileProps) {
  return (
    <button
      type="button"
      className={styles.tile}
      onClick={() => onSelect(project.id)}
      aria-haspopup="dialog"
      aria-label={`Open ${project.title} details`}
    >
      <span className={styles.iconSlot}>
        <SaveIcon project={project} mode="bob" size="sm" />
      </span>
      <span className={styles.title}>{project.title}</span>
    </button>
  );
}
