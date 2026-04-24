/**
 * Shared types used across multiple features.
 *
 * Component-local types live next to their components; only types that span
 * features (data + multiple consumers) belong here.
 */

export type Project = {
  id: string;
  title: string;
  description: string;
  /** Image inside /public/projects (e.g. "/projects/huddleup.png"). Optional placeholder used when omitted. */
  thumbnail?: string;
  githubUrl: string;
  /** Only renders the "Live Site" button when present. */
  liveUrl?: string;
  /** Optional "stat chip" list — gives a gamified feel ("LV. React", "LV. TS", ...). */
  techStack?: string[];
};

export type SocialId = "github" | "linkedin" | "email" | "twitter";

export type SocialLink = {
  id: SocialId;
  label: string;
  /** Already-formed `mailto:` / `https://` URL. */
  href: string;
  /** Short label shown in tooltips and screen readers. */
  description: string;
};
