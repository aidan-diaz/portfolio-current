import { Avatar } from "../Avatar/Avatar";
import styles from "./AboutMe.module.css";

const PHOTO_SRC = "/images/headshot2.jpg";
const PHOTO_ALT = "Aidan Diaz";

/**
 * Bio paragraph(s). Edit this array — each string becomes its own <p>.
 * The text from the old portfolio is seeded here so the section reads
 * naturally on first deploy; replace freely.
 */
const BIO: ReadonlyArray<string> = [
  "As a support services specialist, I managed access control for hundreds of thousands of users, trained teammates, and standardized security protocols. That work taught me where systems create friction and who bears the cost when they fail. As a software engineer, I build tools that fix that. I developed HuddleUp, a full-stack communication platform that unifies messaging, calls, and scheduling so teams can coordinate without switching between tools.",
  "More recently, I've been building applied AI systems. I integrated LLMs into backend pipelines and fine-tuned models for a multilingual document assistant that processes sensitive legal documents. My focus has been on scam detection and designing evaluation methods that ensure consistent, reliable outputs.",
  "I build with the end user in mind, especially when the cost of getting it wrong is high. If that's the standard your team holds, reach out.",
];

type AboutMeProps = {
  headingId: string;
};

export function AboutMe({ headingId }: AboutMeProps) {
  return (
    <div className={styles.about}>
      <header className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">
          ▶ PROFILE
        </p>
        <h2 id={headingId} className={styles.title}>
          About Me
        </h2>
      </header>

      <div className={styles.grid}>
        <figure className={styles.photoWrap}>
          <Avatar
            src={PHOTO_SRC}
            alt={PHOTO_ALT}
            size={null}
            className={styles.photo}
          />
          <figcaption className={styles.caption}>
            <span aria-hidden="true">★</span> {PHOTO_ALT}
          </figcaption>
        </figure>

        <div className={styles.bio}>

          {BIO.map((paragraph, i) => (
            <p key={i} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
