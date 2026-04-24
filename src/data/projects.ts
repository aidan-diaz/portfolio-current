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
 */
export const PROJECTS: ReadonlyArray<Project> = [
  {
    id: "huddleup",
    title: "HuddleUp",
    description:
      "Team collaboration app that turns standups into quick, async-friendly check-ins. Replace this with the actual project blurb.",
    githubUrl: "https://github.com/aidanldiaz/huddleup",
    techStack: ["React", "Node", "Postgres"],
  },
  {
    id: "neuroflow",
    title: "NeuroFlow",
    description:
      "Focus and habit tracker designed around neurodivergent workflows. Replace this with the actual project blurb.",
    githubUrl: "https://github.com/aidanldiaz/neuroflow",
    techStack: ["React", "TypeScript"],
  },
  {
    id: "careerclutch",
    title: "CareerClutch",
    description:
      "Job-search companion for tracking applications, contacts, and follow-ups in one calm dashboard. Replace this with the actual project blurb.",
    githubUrl: "https://github.com/aidanldiaz/careerclutch",
    techStack: ["Next.js", "Tailwind"],
  },
  {
    id: "techtalk",
    title: "TechTalk",
    description:
      "Realtime chat for engineering teams with topic-based rooms and lightweight moderation. Replace this with the actual project blurb.",
    githubUrl: "https://github.com/aidanldiaz/techtalk",
    techStack: ["React", "Socket.io"],
  },
  {
    id: "trickytrivia",
    title: "TrickyTrivia",
    description:
      "Mobile-friendly trivia game with category packs and pixel-art score animations. Replace this with the actual project blurb.",
    githubUrl: "https://github.com/aidanldiaz/trickytrivia",
    techStack: ["React Native", "Expo"],
  },
];
