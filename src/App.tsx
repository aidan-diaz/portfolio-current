import { Footer } from "./components/Footer/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { ScanlineOverlay } from "./components/ScanlineOverlay/ScanlineOverlay";
import styles from "./App.module.css";

/**
 * App shell: sticky Navbar + main content with anchored sections + Footer.
 *
 * Each <section> renders a placeholder dialog box for now; subsequent tasks
 * will replace the contents with the real Hero, Portfolio, About, and
 * Contact components. The IDs and aria-labelledby wiring stay stable so the
 * Navbar anchors keep working as those land.
 */
export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <SectionPlaceholder
          id="intro"
          title="Intro"
          note="Hero section coming soon."
        />
        <SectionPlaceholder
          id="portfolio"
          title="Portfolio"
          note="Project grid coming soon."
        />
        <SectionPlaceholder
          id="about"
          title="About Me"
          note="Bio + pixel avatar coming soon."
        />
        <SectionPlaceholder
          id="contact"
          title="Contact"
          note="Netlify form + socials coming soon."
        />
      </main>
      <Footer />
      <ScanlineOverlay />
    </>
  );
}

type SectionPlaceholderProps = {
  id: string;
  title: string;
  note: string;
};

function SectionPlaceholder({ id, title, note }: SectionPlaceholderProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <div className={styles.sectionInner}>
        <h2 id={headingId}>{title}</h2>
        <p>{note}</p>
      </div>
    </section>
  );
}
