import styles from "./Footer.module.css";

/**
 * Site footer — copyright + a tiny "made with" line.
 *
 * Year is computed at render time so the build never goes stale.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>© {year} Aidan Diaz</p>
        <p className={styles.tag}>
          <span aria-hidden="true" className={styles.heart}>
            ♥
          </span>{" "}
          made with React + pixels
        </p>
      </div>
    </footer>
  );
}
