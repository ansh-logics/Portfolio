import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { achievements, experience } from "../../data/portfolio";
import SectionHeader from "./SectionHeader";

/** Stable, commit-looking 7-char hash for a string. */
function shortHash(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

export default function GitLog() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeader index="03" command="git log --graph --author=ansh" title="Experience" />

      <ol ref={listRef} className="relative space-y-12 pl-8 sm:pl-10">
        <span className="absolute bottom-2 left-[7px] top-2 w-px bg-ink-line sm:left-[9px]" aria-hidden="true" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent shadow-[0_0_10px_rgb(124_255_155/0.6)] sm:left-[9px]"
          style={{ scaleY: progress }}
        />

        {experience.map((job, i) => (
          <motion.li
            key={job.company}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <span
              className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-accent bg-ink-bg sm:-left-10 sm:h-5 sm:w-5"
              aria-hidden="true"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </span>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="text-accent-amber">commit {shortHash(job.company + job.role)}</span>
              {i === 0 && (
                <span className="text-ink-muted">
                  (<span className="text-accent">HEAD -&gt; main</span>)
                </span>
              )}
              <span className="text-ink-muted">
                {job.period} · {job.location}
              </span>
            </p>

            <h3 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
              {job.role}{" "}
              <span className="text-ink-muted">@</span>{" "}
              {job.url ? (
                <a href={job.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                  {job.company}
                </a>
              ) : (
                <span className="text-accent">{job.company}</span>
              )}
            </h3>

            <ul className="mt-4 max-w-3xl space-y-2.5">
              {job.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-text">
                  <span className="mt-0.5 shrink-0 text-accent">+</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>

      <div className="mt-20">
        <p className="mb-6 text-xs text-ink-muted sm:text-sm">
          <span className="text-accent">$</span> git tag --list &quot;achievements/*&quot;
        </p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.li
              key={a.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="group rounded-lg border border-ink-line bg-ink-surface p-5 transition-colors hover:border-accent/40"
            >
              <p className="text-xs text-accent-amber">v{i + 1}.0</p>
              <p className="mt-2 text-sm font-medium text-white">{a.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">{a.detail}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
