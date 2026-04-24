import { createContext } from "react";

export type SoundContextValue = {
  muted: boolean;
  setMuted: (next: boolean) => void;
  toggle: () => void;
};

/**
 * Shared state for the global sound preference. Consumed by `useSound` (the
 * SFX layer) and `SoundToggle` (the mute UI) so they stay in lockstep without
 * either having to know about the other.
 */
export const SoundContext = createContext<SoundContextValue | null>(null);
