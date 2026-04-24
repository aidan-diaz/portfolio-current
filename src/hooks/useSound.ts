import { useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { Howl } from "howler";
import { SoundContext } from "../sound/SoundContext";

/**
 * Library of named sound effects available throughout the app.
 *
 * `src` points at a file inside /public/sounds (optional — we ship without
 * binary assets by default). If the file is missing, the WebAudio synth
 * fallback keyed by `synth` is used so the UX still has audible feedback.
 */
export const SOUND_LIBRARY = {
  hover: {
    src: "/sounds/hover.wav",
    volume: 0.25,
    synth: { freq: 880, durationMs: 40, type: "square" as const },
  },
  click: {
    src: "/sounds/click.wav",
    volume: 0.4,
    synth: { freq: 660, durationMs: 70, type: "square" as const },
  },
  start: {
    src: "/sounds/start.wav",
    volume: 0.5,
    synth: { freq: 1320, durationMs: 180, type: "square" as const },
  },
  success: {
    src: "/sounds/success.wav",
    volume: 0.5,
    synth: { freq: 1568, durationMs: 220, type: "triangle" as const },
  },
  error: {
    src: "/sounds/error.wav",
    volume: 0.5,
    synth: { freq: 196, durationMs: 220, type: "sawtooth" as const },
  },
} as const;

export type SoundName = keyof typeof SOUND_LIBRARY;

type SynthSpec = { freq: number; durationMs: number; type: OscillatorType };

/**
 * Lazily-initialized shared AudioContext. Some browsers require a user
 * gesture before the context can start; we resume on first play.
 */
let sharedAudioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (sharedAudioCtx) return sharedAudioCtx;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  sharedAudioCtx = new Ctor();
  return sharedAudioCtx;
}

function playSynth(spec: SynthSpec, volume: number) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume().catch(() => {});
  }
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = spec.type;
  osc.frequency.value = spec.freq;
  // Fast attack + decay envelope so it sounds chiptune-y instead of a sine drone.
  const now = ctx.currentTime;
  const dur = spec.durationMs / 1000;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

/**
 * Plays named SFX, respecting the global mute preference from SoundContext.
 *
 * Howl instances are cached per name on first use. If the underlying audio
 * file is missing or fails to load, we fall back to a chiptune-style WebAudio
 * beep so the site still has tactile audio feedback without bundling assets.
 */
export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within a <SoundProvider>");
  }
  const { muted } = ctx;
  const mutedRef = useRef(muted);
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  const howlsRef = useRef<Partial<Record<SoundName, Howl | "failed">>>({});

  const play = useCallback((name: SoundName) => {
    if (mutedRef.current) return;
    const def = SOUND_LIBRARY[name];
    const cached = howlsRef.current[name];

    if (cached === "failed") {
      playSynth(def.synth, def.volume);
      return;
    }

    if (cached) {
      cached.play();
      return;
    }

    const howl = new Howl({
      src: [def.src],
      volume: def.volume,
      preload: true,
      onloaderror: () => {
        howlsRef.current[name] = "failed";
        playSynth(def.synth, def.volume);
      },
      onplayerror: () => {
        howlsRef.current[name] = "failed";
        playSynth(def.synth, def.volume);
      },
    });
    howlsRef.current[name] = howl;
    howl.play();
  }, []);

  return useMemo(() => ({ play, muted }), [play, muted]);
}
