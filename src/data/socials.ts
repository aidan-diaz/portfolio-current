import type { SocialLink } from "../types";

/**
 * Social links — single source of truth.
 *
 * Update these URLs in one place; SocialLinks (used in hero + footer + contact)
 * picks up the change automatically.
 */
export const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/aidanldiaz",
    description: "GitHub profile",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aidan-diaz/",
    description: "LinkedIn profile",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:aidanldiaz@gmail.com",
    description: "Send an email",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://twitter.com/",
    description: "Twitter profile",
  },
  {
    id: "calendly",
    label: "Calendly",
    href: "https://calendly.com/diaz-aidan-d/30min",
    description: "Book a 30-minute call",
  },
];
