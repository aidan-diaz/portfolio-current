import type { ReactNode } from "react";
import { AboutMe } from "./components/AboutMe/AboutMe";
import { Contact } from "./components/Contact/Contact";
import { Footer } from "./components/Footer/Footer";
import { Hero } from "./components/Hero/Hero";
import { IntroScreen } from "./components/IntroScreen/IntroScreen";
import { Navbar } from "./components/Navbar/Navbar";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { ScanlineOverlay } from "./components/ScanlineOverlay/ScanlineOverlay";
import { SectionTransition } from "./components/SectionTransition/SectionTransition";
import styles from "./App.module.css";

/**
 * App shell.
 *
 * Order: IntroScreen overlay (mounts on top until dismissed) → Navbar →
 * <main> with the four anchored sections (Hero, Portfolio, AboutMe, Contact)
 * → Footer → ScanlineOverlay (CRT effect, pinned to viewport).
 */
export default function App() {
  return (
    <>
      <IntroScreen />
      <Navbar />
      <main id="main-content" className={styles.main}>
        <SectionShell id="intro">
          {(headingId) => <Hero headingId={headingId} />}
        </SectionShell>
        <SectionShell id="portfolio">
          {(headingId) => <Portfolio headingId={headingId} />}
        </SectionShell>
        <SectionShell id="about">
          {(headingId) => <AboutMe headingId={headingId} />}
        </SectionShell>
        <SectionShell id="contact">
          {(headingId) => <Contact headingId={headingId} />}
        </SectionShell>
      </main>
      <Footer />
      <ScanlineOverlay />
    </>
  );
}

type SectionShellProps = {
  id: string;
  children: (headingId: string) => ReactNode;
};

/**
 * Adds the consistent `<section>` wrapper + `aria-labelledby` plumbing and
 * the framer-motion enter transition. Section content components own their
 * own heading; we just thread the heading id down so they can render the
 * matching id on their h2.
 */
function SectionShell({ id, children }: SectionShellProps) {
  const headingId = `${id}-heading`;
  return (
    <SectionTransition>
      <section
        id={id}
        aria-labelledby={headingId}
        className={styles.section}
      >
        <div className={styles.sectionInner}>{children(headingId)}</div>
      </section>
    </SectionTransition>
  );
}
