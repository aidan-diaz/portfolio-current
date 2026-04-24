import { PixelButton } from "../PixelButton/PixelButton";
import { Avatar } from "../Avatar/Avatar";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import styles from "./Hero.module.css";

/**
 * Top-of-page hero / introduction section.
 *
 * Holds the big pixel title, a 1–2 sentence tagline (edit `TAGLINE` below),
 * a framed headshot, the primary "View my work" CTA, and a row of social
 * links. The whole block lives inside the existing #intro section anchor
 * so the navbar still scrolls here.
 */
const TITLE = "AIDAN DIAZ";
const TAGLINE =
  "AI Software engineer building thoughtful, accessible web experiences. " +
  "Welcome to my arcade — see my projects below.";

type HeroProps = {
  headingId: string;
};

export function Hero({ headingId }: HeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true">▶</span> NEW GAME
        </p>
        <h1 id={headingId} className={styles.title}>
          {TITLE}
        </h1>
        <p className={styles.tagline}>{TAGLINE}</p>

        <div className={styles.actions}>
          <PixelButton as="a" href="#portfolio" size="lg" variant="primary">
            View my work
          </PixelButton>
          <PixelButton as="a" href="#contact" size="lg" variant="secondary">
            Contact me
          </PixelButton>
        </div>

        <div className={styles.socials}>
          <span className={styles.socialsLabel} aria-hidden="true">
            FIND ME ON
          </span>
          <SocialLinks size="md" label="Find me on social media" />
        </div>
      </div>

      <div className={styles.avatarWrap}>
        <Avatar src="/images/headshot.jpg" alt="Portrait of Aidan Diaz" size="md" />
      </div>
    </div>
  );
}
