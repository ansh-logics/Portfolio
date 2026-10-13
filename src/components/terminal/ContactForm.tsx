import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { links } from "../../data/portfolio";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

const field =
  "w-full rounded border border-ink-line bg-ink-bg px-3 py-2.5 text-base text-white placeholder:text-ink-muted/60 transition-colors focus:border-accent/60 focus:outline-none sm:text-sm";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      form.reset();
      setStatus({ state: "sent" });
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error && err.message !== "Failed to fetch" ? err.message : "Network error.",
      });
    }
  };

  const sending = status.state === "sending";

  return (
    <div className="rounded-lg border border-ink-line bg-ink-surface p-5 sm:p-6">
      <p className="mb-5 text-xs text-ink-muted">
        <span className="text-accent">$</span> mail --to ansh
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {status.state === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3 py-6 text-sm"
            role="status"
          >
            <p className="text-accent">✓ message delivered</p>
            <p className="text-ink-text">Thanks for reaching out — I&apos;ll reply to the email you left.</p>
            <button
              type="button"
              onClick={() => setStatus({ state: "idle" })}
              className="text-xs text-ink-muted underline underline-offset-4 hover:text-accent"
            >
              send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="space-y-4"
            noValidate={false}
          >
            <div>
              <label htmlFor="cf-name" className="mb-1.5 block text-xs text-ink-muted">
                name
              </label>
              <input id="cf-name" name="name" required maxLength={100} autoComplete="name" className={field} />
            </div>
            <div>
              <label htmlFor="cf-email" className="mb-1.5 block text-xs text-ink-muted">
                email <span className="text-ink-muted/60">— so I can reply</span>
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                maxLength={200}
                autoComplete="email"
                className={field}
              />
            </div>
            <div>
              <label htmlFor="cf-message" className="mb-1.5 block text-xs text-ink-muted">
                message
              </label>
              <textarea
                id="cf-message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                className={cn(field, "resize-y")}
              />
            </div>
            {/* Honeypot — hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label htmlFor="cf-company">Company</label>
              <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            {status.state === "error" && (
              <p role="alert" className="text-xs text-accent-amber">
                {status.message} You can also email{" "}
                <a href={`mailto:${links.email}`} className="underline underline-offset-4">
                  {links.email}
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="inline-flex w-full items-center justify-center gap-2 rounded bg-accent px-5 py-3 text-sm font-medium text-ink-bg transition-shadow hover:shadow-[0_0_24px_rgb(124_255_155/0.45)] disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? "sending…" : "./send-message →"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
