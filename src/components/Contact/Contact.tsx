import { useState } from "react";
import type { FormEvent } from "react";
import { PixelButton } from "../PixelButton/PixelButton";
import { SocialLinks } from "../SocialLinks/SocialLinks";
import { SOCIAL_LINKS } from "../../data/socials";
import { useSound } from "../../hooks/useSound";
import styles from "./Contact.module.css";

const FORM_NAME = "contact";

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  message: string;
  /** Honeypot — humans never fill this, bots usually do. */
  botField: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  message: "",
  botField: "",
};

/**
 * Encodes a flat object as `application/x-www-form-urlencoded`, which is the
 * payload format Netlify Forms accepts for AJAX submissions.
 */
function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key] ?? "")
    )
    .join("&");
}

type ContactProps = {
  headingId: string;
};

export function Contact({ headingId }: ContactProps) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const { play } = useSound();

  const emailLink = SOCIAL_LINKS.find((l) => l.id === "email");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": FORM_NAME,
          "bot-field": form.botField,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server responded ${response.status}`);
      }
      play("success");
      setStatus("success");
      setForm(INITIAL);
    } catch (err) {
      play("error");
      const msg =
        err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      setStatus("error");
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className={styles.contact}>
      <header className={styles.header}>
        <p className={styles.eyebrow} aria-hidden="true">
          ▶ SEND TRANSMISSION
        </p>
        <h2 id={headingId} className={styles.title}>
          Contact
        </h2>
        <p className={styles.lede}>
          Want to work together, or just say hi? Drop a message below — or use
          any of the channels listed.
        </p>
      </header>

      <div className={styles.grid}>
        <form
          className={styles.form}
          name={FORM_NAME}
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Tells Netlify which form this is when submitted via fetch. */}
          <input type="hidden" name="form-name" value={FORM_NAME} />

          {/* Honeypot — visually hidden but still focusable for assistive tech if a real user lands on it. */}
          <p className={styles.honeypot} aria-hidden="true">
            <label>
              Don't fill this out:{" "}
              <input
                tabIndex={-1}
                autoComplete="off"
                name="bot-field"
                value={form.botField}
                onChange={(e) => update("botField", e.target.value)}
              />
            </label>
          </p>

          <div className={styles.field}>
            <label htmlFor="contact-name" className={styles.label}>
              Name
            </label>
            <input
              id="contact-name"
              className={styles.input}
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              disabled={status === "submitting"}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-email" className={styles.label}>
              Email
            </label>
            <input
              id="contact-email"
              className={styles.input}
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={status === "submitting"}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message" className={styles.label}>
              Message
            </label>
            <textarea
              id="contact-message"
              className={styles.textarea}
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              disabled={status === "submitting"}
            />
          </div>

          <div className={styles.actionsRow}>
            <PixelButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === "submitting"}
              aria-busy={status === "submitting"}
            >
              {status === "submitting" ? "Sending…" : "Send message"}
            </PixelButton>
            {emailLink ? (
              <PixelButton
                as="a"
                href={emailLink.href}
                variant="ghost"
                size="md"
                aria-label="Send an email instead"
                silent
              >
                or email me directly
              </PixelButton>
            ) : null}
          </div>

          {/* Live-region status — announced to screen readers. */}
          <div
            className={styles.status}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {status === "success" ? (
              <p className={styles.success}>
                <span aria-hidden="true">✔</span> Message received! I'll get
                back to you soon.
              </p>
            ) : null}
            {status === "error" ? (
              <p className={styles.error}>
                <span aria-hidden="true">✖</span> Couldn't send the form
                {error ? ` (${error})` : ""}. Try the email button instead.
              </p>
            ) : null}
          </div>
        </form>

        <aside className={styles.aside} aria-label="Other ways to reach me">
          <p className={styles.asideTitle}>OTHER CHANNELS</p>
          <SocialLinks size="md" label="Other ways to reach me" />
        </aside>
      </div>
    </div>
  );
}
