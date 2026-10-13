import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { ArrowUpRight, Lock } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Project } from "../../data/portfolio";
import { OPEN_PROJECT_EVENT, projectSlug as slug } from "../../lib/commands";
const initials = (title: string) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded border border-ink-line px-3 py-2 text-xs text-ink-text transition-colors hover:border-accent/60 hover:text-accent"
        >
          <SiGithub className="h-3.5 w-3.5" /> source
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 rounded border border-dashed border-ink-line px-3 py-2 text-xs text-ink-muted">
          <Lock className="h-3.5 w-3.5" /> private repo
        </span>
      )}
      {project.website && (
        <a
          href={project.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded border border-ink-line px-3 py-2 text-xs text-ink-text transition-colors hover:border-accent/60 hover:text-accent"
        >
          <ArrowUpRight className="h-3.5 w-3.5" /> live
        </a>
      )}
    </div>
  );
}

function Readme({ project }: { project: Project }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      <p className="text-ink-muted">
        <span style={{ color: project.theme }}>#</span> README.md
      </p>
      <p className="text-ink-text">{project.description}</p>
      <div>
        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-ink-muted">what i built</p>
        <p className="text-ink-text">{project.built}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded border border-ink-line px-2 py-0.5 text-xs text-ink-muted">
            {t}
          </span>
        ))}
      </div>
      <ProjectLinks project={project} />
    </div>
  );
}

function Preview({ project, index }: { project: Project; index: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.title}
        initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-lg border border-ink-line bg-ink-surface"
      >
        <div
          className="relative flex h-56 items-center justify-center overflow-hidden border-b border-ink-line"
          style={{ background: `radial-gradient(circle at 30% 20%, ${project.theme}33, transparent 60%)` }}
        >
          <div className="bg-dots absolute inset-0 opacity-60" />
          <span
            className="relative font-display text-[7rem] font-bold leading-none tracking-tighter"
            style={{ color: project.theme, textShadow: `0 0 40px ${project.theme}66` }}
          >
            {initials(project.title)}
          </span>
          <span className="absolute left-4 top-3 text-xs text-ink-muted">
            ~/projects/{slug(project.title)}
          </span>
          <span className="absolute bottom-3 right-4 text-xs text-ink-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="space-y-3 p-5">
          <p className="text-xs uppercase tracking-[0.2em]" style={{ color: project.theme }}>
            {project.role}
          </p>
          <p className="text-sm leading-relaxed text-ink-text">{project.description}</p>
          <p className="text-xs text-ink-muted">{project.tech.join(" · ")}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

interface Props {
  projects: Project[];
  variant?: "list" | "grid";
}

export default function ProjectList({ projects, variant = "list" }: Props) {
  const [hovered, setHovered] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const location = useLocation();

  // `open <project>` from the command bar: expand that README and bring it into view.
  useEffect(() => {
    if (variant !== "list") return;
    const openBySlug = (s: string) => {
      const i = projects.findIndex((p) => slug(p.title) === s);
      if (i < 0) return;
      setOpen(i);
      setHovered(i);
      window.setTimeout(() => {
        rowRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
        rowRefs.current[i]?.focus({ preventScroll: true });
      }, 60);
    };
    const pending = (location.state as { openProject?: string } | null)?.openProject;
    if (pending) window.setTimeout(() => openBySlug(pending), 350);
    const onEvent = (e: Event) => openBySlug((e as CustomEvent<string>).detail);
    window.addEventListener(OPEN_PROJECT_EVENT, onEvent);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onEvent);
  }, [projects, variant, location.state]);

  if (variant === "grid") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="group relative overflow-hidden rounded-lg border border-ink-line bg-ink-surface p-5 transition-colors hover:border-[var(--theme)] sm:p-6"
            style={{ ["--theme" as string]: `${p.theme}80` }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
              style={{ background: p.theme }}
            />
            <div className="relative mb-4 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
              <span className="text-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="relative mb-4 text-xs uppercase tracking-[0.2em]" style={{ color: p.theme }}>
              {p.role}
            </p>
            <div className="relative">
              <Readme project={p} />
            </div>
          </motion.article>
        ))}
      </div>
    );
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowDown" ? 1 : -1) + projects.length) % projects.length;
    rowRefs.current[next]?.focus();
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_1fr]">
      <ul className="border-t border-ink-line" onMouseLeave={() => open !== null && setHovered(open)}>
        {projects.map((p, i) => {
          const isOpen = open === i;
          const isActive = hovered === i;
          return (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="border-b border-ink-line"
            >
              <button
                ref={(el) => (rowRefs.current[i] = el)}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`readme-${slug(p.title)}`}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                onClick={() => {
                  setOpen(isOpen ? null : i);
                  setHovered(i);
                }}
                className="group relative isolate flex w-full items-center gap-4 py-5 text-left sm:gap-6"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 -z-10 w-full origin-left"
                  style={{ background: `linear-gradient(90deg, ${p.theme}14, transparent 80%)` }}
                  initial={false}
                  animate={{ scaleX: isActive || isOpen ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="w-6 shrink-0 text-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-display text-xl font-bold transition-all duration-300 sm:text-2xl md:text-3xl",
                      isActive || isOpen ? "translate-x-1 text-white" : "text-ink-text",
                    )}
                  >
                    {p.title}
                  </span>
                  <span className="mt-1 block truncate text-xs text-ink-muted">{p.tech.join(" · ")}</span>
                </span>
                <span
                  className="hidden h-2 w-2 shrink-0 rounded-full transition-transform sm:block"
                  style={{ background: p.theme, transform: isActive ? "scale(1.6)" : "scale(1)" }}
                />
                <span
                  className={cn(
                    "shrink-0 text-lg text-ink-muted transition-transform duration-300",
                    isOpen && "rotate-45 text-accent",
                  )}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`readme-${slug(p.title)}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mb-6 ml-10 border-l pl-4 sm:ml-12" style={{ borderColor: `${p.theme}66` }}>
                      <Readme project={p} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <Preview project={projects[hovered]} index={hovered} />
          <p className="mt-3 text-xs text-ink-muted">
            <span className="text-accent">↑↓</span> navigate · <span className="text-accent">enter</span> open readme
          </p>
        </div>
      </div>
    </div>
  );
}
