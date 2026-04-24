import { SoundToggle } from "../SoundToggle/SoundToggle";
import styles from "./Navbar.module.css";

type NavLink = {
  href: string;
  label: string;
};

const NAV_LINKS: ReadonlyArray<NavLink> = [
  { href: "#intro", label: "Intro" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/**
 * Sticky retro pixel navbar.
 *
 * Renders the brand mark, anchor links to each main section, and the global
 * SoundToggle. Uses a semantic <header> + <nav> so screen readers can jump
 * straight to navigation, and a "skip to content" link is provided as the
 * first focusable element for keyboard users.
 */
export function Navbar() {
  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <div className={styles.inner}>
        <a href="#intro" className={styles.brand} aria-label="Aidan Diaz — home">
          <span aria-hidden="true" className={styles.brandSprite}>
            ◆
          </span>
          <span className={styles.brandText}>AIDAN.DIAZ</span>
        </a>

        <nav aria-label="Primary" className={styles.nav}>
          <ul className={styles.list}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <SoundToggle />
        </div>
      </div>
    </header>
  );
}
