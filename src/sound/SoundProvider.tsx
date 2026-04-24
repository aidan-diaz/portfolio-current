import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { SoundContext } from "./SoundContext";

const STORAGE_KEY = "portfolio:sound-muted";
const PREF_EVENT = "sound-pref-change";

/**
 * Reads the persisted mute preference. Defaults to muted (true) so first-load
 * UX never blasts audio at the visitor.
 */
function readInitialMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return true;
    return raw === "true";
  } catch {
    return true;
  }
}

type SoundProviderProps = {
  children: ReactNode;
};

/**
 * Owns the global mute state and broadcasts changes via:
 *  - React context (consumed by `useSound` and `SoundToggle`)
 *  - a `sound-pref-change` window event (legacy listeners)
 *  - localStorage (cross-tab + persistence)
 *
 * Using the same storage key as the original SoundToggle keeps the
 * preference stable across deploys.
 */
export function SoundProvider({ children }: SoundProviderProps) {
  const [muted, setMutedState] = useState<boolean>(readInitialMuted);

  const setMuted = useCallback((next: boolean) => {
    setMutedState(next);
  }, []);

  const toggle = useCallback(() => {
    setMutedState((m) => !m);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {
      // Storage unavailable (private mode/quota) — preference still works in-session.
    }
    window.dispatchEvent(new CustomEvent<boolean>(PREF_EVENT, { detail: muted }));
  }, [muted]);

  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY || e.newValue === null) return;
      setMutedState(e.newValue === "true");
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ muted, setMuted, toggle }),
    [muted, setMuted, toggle]
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
