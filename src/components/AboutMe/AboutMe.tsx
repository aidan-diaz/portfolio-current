import { useState } from "react";
import { PixelAvatar } from "../Hero/PixelAvatar";
import styles from "./AboutMe.module.css";

const PHOTO_SRC = "/avatar.png";
const PHOTO_ALT = "Aidan Diaz";

/**
 * Bio paragraph(s). Edit this array — each string becomes its own <p>.
 * The text from the old portfolio is seeded here so the section reads
 * naturally on first deploy; replace freely.
 */
const BIO: ReadonlyArray<string> = [
  "In my previous career, I discovered that helping others succeed is one of the most rewarding aspects of any job. As the primary mentor for onboarding new hires and showing them how to use our newly integrated systems, I learned the importance of patience, clear communication, and adaptability.",
  "Now, as a software engineer, I bring that same passion for teaching and support to my team. I thrive on late nights spent guiding my colleagues through complex problems and uncovering solutions as a team. I believe that true teamwork is about lifting each other up, and I carry that mindset into every project I work on.",
  "I'm not only driven by my own growth, but by the growth of my colleagues. I'm excited to bring my collaborative spirit, to take on the challenges of the tech industry with a team that values both individual and collective growth.",
];

/**
 * "Stats" rendered next to the photo to keep the gamified feel without
 * pretending to be a real RPG sheet. Tweak freely.
 */
const STATS: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Class", value: "Software Engineer" },
  { label: "Power-up", value: "Mentorship" },
  { label: "Special", value: "Late-night debugging" },
  { label: "Quest", value: "Team growth" },
];

type AboutMeProps = {
  headingId: string;
};

export function AboutMe({ headingId }: AboutMeProps) {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className={styles.about}>
      <header className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">
          ▶ PLAYER PROFILE
        </p>
        <h2 id={headingId} className={styles.title}>
          About Me
        </h2>
      </header>

      <div className={styles.grid}>
        <figure className={styles.photoWrap}>
          {photoFailed ? (
            <PixelAvatar />
          ) : (
            <img
              src={PHOTO_SRC}
              alt={PHOTO_ALT}
              className={styles.photo}
              onError={() => setPhotoFailed(true)}
              loading="lazy"
              decoding="async"
            />
          )}
          <figcaption className={styles.caption}>
            <span aria-hidden="true">★</span> {PHOTO_ALT}
          </figcaption>
        </figure>

        <div className={styles.bio}>
          <ul className={styles.stats} aria-label="Player stats">
            {STATS.map((stat) => (
              <li key={stat.label} className={styles.stat}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </li>
            ))}
          </ul>

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
