import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { links, profile, sections } from "../../data/portfolio";
import { OPEN_COMMAND_BAR_EVENT, shortcutLabel } from "../../lib/commands";

const openCommandBar = () => window.dispatchEvent(new Event(OPEN_COMMAND_BAR_EVENT));

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState("");
  useEffect(() => {
    if (!enabled) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

function Navbar() {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile sheet: lock scroll, close on Esc, keep Tab focus inside.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [toggleRef.current!, ...focusables()];
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
        e.preventDefault();
        items[next]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || open ? "border-ink-line bg-ink-bg/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          aria-label={`${profile.name} — home`}
          className="group flex items-center gap-3 text-sm text-ink-text"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/40 font-display text-xs font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-ink-bg">
            AB
          </span>
          <span className="font-display font-medium tracking-tight text-white">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 text-sm md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={href(s.id)}
                className={cn(
                  "relative rounded px-3 py-2 transition-colors hover:text-white",
                  active === s.id ? "text-accent" : "text-ink-muted",
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded border border-accent/30 bg-accent/5"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">./{s.label}</span>
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={openCommandBar}
              aria-label="Open command bar"
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-surface/60 py-1.5 pl-3 pr-1.5 text-xs text-ink-muted transition-colors hover:border-accent/40 hover:text-white"
            >
              <span className="text-accent">❯</span> run command
              <kbd className="rounded-full border border-ink-line px-2 py-0.5 text-[10px] text-ink-text">
                {shortcutLabel()}
              </kbd>
            </button>
          </li>
          <li>
            <a
              href={links.cv}
              target="_blank"
              rel="noreferrer"
              className="ml-2 rounded border border-accent/40 px-3 py-2 text-accent transition-colors hover:bg-accent hover:text-ink-bg"
            >
              cv.pdf ↗
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openCommandBar();
            }}
            aria-label="Open command bar"
            className="flex h-9 items-center gap-1.5 rounded-full border border-ink-line bg-ink-surface/60 px-3 text-xs text-ink-muted"
          >
            <span className="text-accent">❯</span>_
          </button>
          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={cn(
                "absolute h-px w-6 bg-ink-text transition-transform duration-300",
                open ? "rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-6 bg-ink-text transition-transform duration-300",
                open ? "-rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={sheetRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ink-line bg-ink-bg md:hidden"
          >
            <ul className="flex flex-col gap-2 px-6 pt-10">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <a
                    href={href(s.id)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-3 font-display text-4xl font-bold text-white"
                  >
                    <span className="font-mono text-sm text-accent">0{i + 1}</span>
                    {s.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-8"
              >
                <a
                  href={links.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded border border-accent/40 px-4 py-3 text-accent"
                >
                  download cv.pdf ↗
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
