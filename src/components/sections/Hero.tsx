import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import AsciiMonogram from "../terminal/AsciiMonogram";
import { links, profile } from "../../data/portfolio";
import { OPEN_COMMAND_BAR_EVENT, shortcutLabel } from "../../lib/commands";

const COMMAND = "whoami";

function useTyped(text: string, delay = 400, speed = 90) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? text.length : 0);
  useEffect(() => {
    if (reduced) {
      setCount(text.length);
      return;
    }
    let i = 0;
    let interval: number | undefined;
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) window.clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [text, delay, speed, reduced]);
  return { typed: text.slice(0, count), done: count >= text.length };
}

function useDelhiTime() {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const { typed, done } = useTyped(COMMAND);
  const time = useDelhiTime();
  const { scrollY } = useScroll();
  const artOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);
  const artY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24 md:pt-28"
    >
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-4">
        <motion.div style={{ opacity: artOpacity, y: artY }} className="order-1 lg:order-2">
          <AsciiMonogram className="mx-auto h-[34svh] w-full sm:h-[40svh] lg:h-[460px]" />
        </motion.div>

        <div className="order-2 lg:order-1">
          <p className="text-sm text-ink-muted">
            <span className="text-accent">{profile.handle}</span>:~$ <span className="text-ink-text">{typed}</span>
            {!done && <span className="caret" />}
          </p>

          <motion.div initial="hidden" animate={done ? "show" : "hidden"}>
            <motion.h1
              custom={0}
              variants={reveal}
              className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              {profile.name}
              <span className="text-accent">.</span>
            </motion.h1>

            <motion.p custom={1} variants={reveal} className="mt-4 text-base text-accent text-glow sm:text-lg">
              {profile.role}
            </motion.p>

            <motion.p
              custom={2}
              variants={reveal}
              className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base"
            >
              {profile.summary}
            </motion.p>

            <motion.div custom={3} variants={reveal} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded bg-accent px-5 py-3 text-sm font-medium text-ink-bg transition-shadow hover:shadow-[0_0_24px_rgb(124_255_155/0.45)]"
              >
                ./view-work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={links.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-ink-line px-5 py-3 text-sm text-ink-text transition-colors hover:border-accent/60 hover:text-accent"
              >
                ./download-cv ↓
              </a>
            </motion.div>

            <motion.div
              custom={4}
              variants={reveal}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                open to opportunities
              </span>
              <span>{profile.location}</span>
              <span>
                local <span className="text-ink-text">{time}</span> IST
              </span>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(OPEN_COMMAND_BAR_EVENT))}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
              >
                press
                <kbd className="rounded border border-ink-line px-1.5 py-0.5 text-[10px] text-accent">
                  {shortcutLabel()}
                </kbd>
                to navigate like a terminal
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink-muted md:flex"
      >
        scroll
        <motion.span
          className="block h-8 w-px bg-gradient-to-b from-accent to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </a>
    </section>
  );
}
