import type { Project } from "../types";

/**
 * Portfolio projects — single source of truth for the Portfolio section.
 *
 * To add a new project: append a new object to the array below. The
 * <Portfolio /> component will automatically render a new ProjectCard.
 *
 * Field reference (see src/types.ts for the canonical shape):
 *   - id:          unique stable string (used as React key)
 *   - title:       short project name
 *   - description: 1–3 sentences for the card body
 *   - thumbnail:   path under /public/projects (optional — placeholder used otherwise)
 *   - githubUrl:   link to the repo
 *   - liveUrl:     optional — only renders the "Live Site" button when present
 *   - techStack:   optional list of short tech labels rendered as stat chips
 *   - genre:       retained on the type but no longer rendered in the UI (kept so it can be reintroduced later)
 *   - rating:      retained on the type but no longer rendered in the UI (kept so it can be reintroduced later)
 *   - icon:        optional path under /public to a square project icon — falls back to a per-genre pixel-art placeholder
 */
export const PROJECTS: ReadonlyArray<Project> = [
  {
    id: "huddleup",
    title: "HuddleUp",
    description:
      "Team collaboration app that turns standups into quick, async-friendly check-ins. Replace this with the actual project blurb.",
    icon: "/images/huddleup.png",
    githubUrl: "https://github.com/aidanldiaz/huddleup",
    techStack: ["React", "Node", "Convex"],
    genre: "COOPERATIVE",
    rating: "E",
  },
  {
    id: "neuroflow",
    title: "NeuroFlow",
    description:
      "Focus and habit tracker designed around neurodivergent workflows. Replace this with the actual project blurb.",
    icon: "/images/neuroFlowThumbnail.png",
    githubUrl: "https://github.com/aidanldiaz/neuroflow",
    techStack: ["React", "TypeScript"],
    genre: "PRODUCTIVITY",
    rating: "E",
  },
  {
    id: "careerclutch",
    title: "CareerClutch",
    description:
      "Job-search companion for tracking applications, contacts, and follow-ups in one calm dashboard. Replace this with the actual project blurb.",
    icon: "/images/careerClutchThumbnail.png",
    githubUrl: "https://github.com/aidanldiaz/careerclutch",
    techStack: ["Next.js", "Tailwind"],
    genre: "STRATEGY",
    rating: "T",
  },
  {
    id: "nanochat",
    title: "nanochat",
    description:
      "Lightweight chat playground for training and serving tiny language models from scratch. Replace this with the actual project blurb.",
    icon: "/images/nanochat.png",
    githubUrl: "https://github.com/aidanldiaz/nanochat",
    techStack: ["Python", "PyTorch"],
    genre: "COMMUNICATION",
    rating: "T",
  },
  {
    id: "trickytrivia",
    title: "TrickyTrivia",
    description:
      "Mobile-friendly trivia game with category packs and pixel-art score animations. Replace this with the actual project blurb.",
    icon: "/images/triviaThumbnail.png",
    githubUrl: "https://github.com/aidanldiaz/trickytrivia",
    techStack: ["React Native", "Expo"],
    genre: "PUZZLE",
    rating: "E",
  },
];
