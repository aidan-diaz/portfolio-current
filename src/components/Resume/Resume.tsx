import { useCallback, useEffect, useState } from "react";
import type { AnimationEvent, DragEvent, KeyboardEvent } from "react";
import { PixelButton } from "../PixelButton/PixelButton";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import styles from "./Resume.module.css";

const INSERT_MS = 650;
const EJECT_MS = 650;
const BOOT_MS = 1500;

/** Native PDF viewer hash params — minimize chrome inside the CRT iframe. */
const PDF_EMBED_SRC =
  "/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH";

type Phase = "idle" | "inserting" | "booting" | "ready" | "ejecting";

type ResumeProps = {
  headingId: string;
};

export function Resume({ headingId }: ResumeProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [previewFailed, setPreviewFailed] = useState(false);
  const [slotHighlight, setSlotHighlight] = useState(false);
  /** Remount boot progress fill animation each time we enter `booting`. */
  const [bootAnimKey, setBootAnimKey] = useState(0);

  const beginInsert = useCallback(() => {
    setPhase((current) => {
      if (current !== "idle") return current;
      return reducedMotion ? "ready" : "inserting";
    });
  }, [reducedMotion]);

  useEffect(() => {
    if (phase !== "inserting" || reducedMotion) return;
    /* Safety fallback in case the disc's animationend doesn't fire
       (e.g. tab backgrounded). The primary advance happens via
       handleDiscAnimationEnd. */
    const timer = window.setTimeout(() => {
      setBootAnimKey((k) => k + 1);
      setPhase((p) => (p === "inserting" ? "booting" : p));
    }, INSERT_MS + 80);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  function handleDiscAnimationEnd(e: AnimationEvent<HTMLButtonElement>) {
    if (e.currentTarget !== e.target) return;
    if (phase === "inserting") {
      setBootAnimKey((k) => k + 1);
      setPhase("booting");
      return;
    }
    if (phase === "ejecting") {
      setPhase("idle");
    }
  }

  useEffect(() => {
    if (phase !== "booting" || reducedMotion) return;
    const timer = window.setTimeout(() => setPhase("ready"), BOOT_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase !== "ejecting" || reducedMotion) return;
    /* Safety fallback mirroring the insert path. Primary advance to `idle`
       happens via handleDiscAnimationEnd. */
    const timer = window.setTimeout(() => {
      setPhase((p) => (p === "ejecting" ? "idle" : p));
    }, EJECT_MS + 80);
    return () => window.clearTimeout(timer);
  }, [phase, reducedMotion]);

  function eject() {
    setPreviewFailed(false);
    setPhase((current) => {
      if (current !== "ready") return current;
      return reducedMotion ? "idle" : "ejecting";
    });
  }

  function handleDiscKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    beginInsert();
  }

  function handleDragStart(e: DragEvent<HTMLButtonElement>) {
    if (phase !== "idle") {
      e.preventDefault();
      return;
    }
    try {
      e.dataTransfer.setData("text/plain", "resume-disc");
      e.dataTransfer.effectAllowed = "move";
    } catch {
      /* Safari legacy */
    }
  }

  function handleDragOverSlot(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (phase === "idle") {
      try {
        e.dataTransfer.dropEffect = "move";
      } catch {
        /* ignore */
      }
    }
  }

  function handleDropSlot(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setSlotHighlight(false);
    if (phase !== "idle") return;
    beginInsert();
  }

  const discInSlot = phase !== "idle";
  const discInserting = phase === "inserting";
  const discEjecting = phase === "ejecting";
  const discFullyInside = phase === "booting" || phase === "ready";
  /* LED powers down with the CRT — off during ejecting, on while loaded. */
  const ledOn = phase === "inserting" || phase === "booting" || phase === "ready";
  const screenBusy =
    phase === "inserting" || phase === "booting" || phase === "ejecting";

  let discClass = styles.discIdle;
  if (discInserting) discClass = styles.discInserting;
  else if (discEjecting) discClass = styles.discEjecting;
  else if (discFullyInside) discClass = styles.discHidden;

  const iframeHidden = previewFailed;
  const fallbackExtra =
    previewFailed ? ` ${styles.pdfFallbackVisible}` : "";

  return (
    <div className={styles.resume}>
      <a
        href="/resume.pdf"
        download="Aidan-Diaz-Resume.pdf"
        className={styles.directDownload}
      >
        Download resume directly
      </a>

      <header className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">
          ▶ LOAD MODULE
        </p>
        <h2 id={headingId} className={styles.title}>
          Resume
        </h2>
        <p className={styles.lede}>
          Drag the resume disc into the console slot to boot the CRT, or use
          the keyboard shortcut on the disc.
        </p>
      </header>

      <p className={styles.hint}>
        Drag the disc into the slot, or focus the disc and press Enter to
        insert.
      </p>

      <div className={styles.stage}>
        <div className={styles.tv}>
          <div className={styles.tvFrame}>
            <div className={styles.tvBezelInner}>
            <div
              className={`${styles.screen}${
                phase === "booting" ? ` ${styles.screenPowerOn}` : ""
              }${phase === "ejecting" ? ` ${styles.screenPowerOff}` : ""}`}
              aria-busy={screenBusy}
            >
              <div className={styles.liveRegion} aria-live="polite">
                {phase === "ready" ? (
                  <span>Resume loaded. Download available.</span>
                ) : null}
              </div>

              {phase === "idle" ||
              phase === "inserting" ||
              phase === "ejecting" ? (
                <div className={styles.screenIdle}>
                  <p className={styles.bootPrompt}>
                    {phase === "inserting"
                      ? "> INSERTING…"
                      : phase === "ejecting"
                        ? "> POWERING OFF…"
                        : "> INSERT DISC"}
                  </p>
                </div>
              ) : null}

              {phase === "booting" ? (
                <div className={`${styles.screenBoot} ${styles.bootFlicker}`}>
                  <p className={styles.bootPrompt}>{"> BOOTING…"}</p>
                  <div className={styles.bootBarTrack}>
                    <div
                      key={bootAnimKey}
                      className={`${styles.bootBarFill} ${styles.bootBarFillAnimating}`}
                    />
                  </div>
                </div>
              ) : null}

              {phase === "ready" ? (
                <div className={styles.screenReady}>
                  <div className={styles.statusBar}>
                    ▶ RESUME.PDF — LOADED
                  </div>
                  <div className={styles.embedArea}>
                    <p id="resume-preview-desc" className={styles.srOnly}>
                      Resume preview embedded; use the Download button below to
                      save a copy.
                    </p>
                    <iframe
                      className={`${styles.embed} ${styles.embedDesktop}${
                        iframeHidden ? ` ${styles.embedDesktopHidden}` : ""
                      }`}
                      src={PDF_EMBED_SRC}
                      title="Aidan Diaz resume preview"
                      aria-describedby="resume-preview-desc"
                      onError={() => setPreviewFailed(true)}
                    />
                    <div
                      className={`${styles.pdfFallback}${fallbackExtra}`}
                      role="region"
                      aria-label="Resume PDF summary"
                    >
                      <div className={styles.fallbackCard}>
                        RESUME.PDF
                        <p className={styles.fallbackMeta}>
                          Preview unavailable in this view — use Download or
                          Open.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={styles.actionsRow}>
                    <PixelButton
                      as="a"
                      href="/resume.pdf"
                      download="Aidan-Diaz-Resume.pdf"
                      variant="primary"
                      size="md"
                    >
                      Download
                    </PixelButton>
                    <PixelButton
                      as="a"
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="ghost"
                      size="md"
                    >
                      Open in new tab
                    </PixelButton>
                  </div>
                </div>
              ) : null}
            </div>
            </div>
          </div>
          <div className={styles.tvControlPanel} aria-hidden="true">
            <div className={styles.tvModelPlate}>AIDAN-2600 CRT</div>
            <div className={styles.tvSpeakerGrille} />
            <div className={styles.tvKnobs}>
              <span className={styles.tvKnob} />
              <span className={styles.tvKnob} />
              <span className={styles.tvPowerButton} />
            </div>
          </div>
          <div className={styles.tvFeet} aria-hidden="true">
            <span className={styles.tvFoot} />
            <span className={styles.tvFoot} />
          </div>
        </div>

        <div className={styles.consoleColumn}>
          <div className={styles.console}>
            <div className={styles.consoleTop}>
              <div className={styles.vent} aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className={styles.consoleFront}>
              <div className={styles.consoleBrand} aria-hidden="true">
                AD-STATION
              </div>
              <div
                className={`${styles.slot} ${
                  slotHighlight ? styles.slotActive : ""
                } ${discInserting ? styles.slotSwallow : ""}`}
                onDragOver={handleDragOverSlot}
                onDragEnter={() => setSlotHighlight(true)}
                onDragLeave={() => setSlotHighlight(false)}
                onDrop={handleDropSlot}
                aria-label="Disc slot"
              />
              <div className={styles.consoleControls}>
                <span className={styles.srOnly}>Power indicator</span>
                <div className={styles.ledWrap} aria-hidden="true">
                  <span
                    className={`${styles.led} ${ledOn ? styles.ledOn : ""} ${
                      discInserting ? styles.ledKick : ""
                    }`}
                  />
                  <span className={styles.ledLabel}>PWR</span>
                </div>
                <span className={styles.resetButton} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className={styles.consoleBase} aria-hidden="true" />
          <div className={styles.consoleFeet} aria-hidden="true">
            <span className={styles.consoleFoot} />
            <span className={styles.consoleFoot} />
          </div>

          <div className={styles.discArea}>
            <button
              type="button"
              className={`${styles.disc} ${discClass}`}
              draggable={phase === "idle"}
              disabled={phase !== "idle"}
              onClick={beginInsert}
              onKeyDown={handleDiscKeyDown}
              onDragStart={handleDragStart}
              onAnimationEnd={handleDiscAnimationEnd}
              aria-hidden={discFullyInside || discEjecting}
              tabIndex={discFullyInside || discEjecting ? -1 : 0}
              aria-label="Resume disc — activate or drag into the console to load resume"
            >
              <span className={styles.discLabel} aria-hidden="true">
                AD
              </span>
            </button>
          </div>

          {phase === "ready" ? (
            <div className={styles.ejectRow}>
              <PixelButton type="button" variant="ghost" size="sm" onClick={eject}>
                Eject
              </PixelButton>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
