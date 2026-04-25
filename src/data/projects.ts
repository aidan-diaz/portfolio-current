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
      "A real-time collaboration application that allows users to communicate one-on-one or in groups via messaging and video chat.",
    icon: "/images/huddleup.png",
    githubUrl: "https://github.com/aidan-diaz/huddleup",
    techStack: ["React", "Node", "Convex", "Clerk", "LiveKit"],
    liveUrl: "https://huddle-up-xi.vercel.app/t",
  },
  {
    id: "nanochat",
    title: "nanochat",
    description:
      "Lightweight chat playground for training and serving tiny language models from scratch. Replace this with the actual project blurb.",
    icon: "/images/nanochat.png",
    githubUrl: "https://github.com/aidan-diaz/nanochat-nebius",
    techStack: ["Python", "PyTorch", "Flask"],
  },
  {
    id: "neuroflow",
    title: "NeuroFlow",
    description:
      "a full-stack web application that empowers users to improve and maintain their cognitive health through engaging tests and a personalized progress-tracking profile chart.",
    icon: "/images/neuroFlowThumbnail.png",
    githubUrl: "https://github.com/aidan-diaz/neuroflow",
    techStack: ["EJS", "CSS", "Express", "Passport", "Node", "D3.js", "MongoDB"],
    liveUrl: "https://neuroflow.onrender.com/",
  },
  {
    id: "careerclutch",
    title: "CareerClutch",
    description:
      "A hitlisting application that allows users to keep track of companies that they are looking to apply to during their job hunt.",
    icon: "/images/careerClutchThumbnail.png",
    githubUrl: "https://github.com/aidan-diaz/careerclutch",
    techStack: ["React", "Tailwind", "JSON Server"],
    liveUrl: "https://career-clutch.netlify.app/",
  },
  {
    id: "trickytrivia",
    title: "TrickyTrivia",
    description:
      "A category-based trivia game that lets users test their knowledge across boardgames, film, music, sports, and video games using questions pulled live from the Open Trivia DB API.",
    icon: "/images/triviaThumbnail.png",
    githubUrl: "https://github.com/aidan-diaz/trickytrivia",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://trickytrivia.netlify.app/",
  },
];
