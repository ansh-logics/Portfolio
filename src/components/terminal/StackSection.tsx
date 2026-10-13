import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { education, experience, profile, projects, skills } from "../../data/portfolio";
import SectionHeader from "./SectionHeader";

const stats = [
  { value: `${experience.length}`, label: "engineering roles" },
  { value: `${projects.length}`, label: "projects built" },
  { value: "15+", label: "REST APIs at Waysorted" },
];

export default function StackSection() {
  const [filter, setFilter] = useState("all");
  const groups = filter === "all" ? skills : skills.filter((s) => s.group === filter);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeader index="01" command="cat about.md" title="About" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-base leading-relaxed text-ink-text md:text-lg">{profile.summary}</p>

          <dl className="mt-8 grid grid-cols-3 divide-x divide-ink-line border-y border-ink-line">
            {stats.map((s) => (
              <div key={s.label} className="px-3 py-4 first:pl-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-white md:text-4xl">{s.value}</dd>
                <dd className="mt-1 text-[11px] leading-snug text-ink-muted sm:text-xs">{s.label}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-10 text-xs uppercase tracking-[0.2em] text-ink-muted">education</h3>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.degree} className="border-l border-ink-line pl-4">
                <p className="text-sm text-white">{e.degree}</p>
                <p className="mt-1 text-xs text-ink-muted">
                  {e.institution} · {e.period}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-lg border border-ink-line bg-ink-surface"
        >
          <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-ink-muted">stack.json</span>
          </div>

          <div
            role="tablist"
            aria-label="Filter skills"
            className="flex gap-1 overflow-x-auto border-b border-ink-line px-3 py-2 [scrollbar-width:none]"
          >
            {["all", ...skills.map((s) => s.group)].map((g) => (
              <button
                key={g}
                role="tab"
                aria-selected={filter === g}
                onClick={() => setFilter(g)}
                className={cn(
                  "shrink-0 rounded px-2.5 py-1.5 text-xs transition-colors",
                  filter === g ? "bg-accent/10 text-accent" : "text-ink-muted hover:text-white",
                )}
              >
                {g.toLowerCase()}
              </button>
            ))}
          </div>

          <div className="p-4 text-sm leading-7 sm:p-6">
            <span className="text-ink-muted">{"{"}</span>
            <AnimatePresence mode="popLayout" initial={false}>
              {groups.map((g, gi) => (
                <motion.div
                  key={g.group}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="pl-4"
                >
                  <span className="text-accent-amber">"{g.group.toLowerCase()}"</span>
                  <span className="text-ink-muted">: [</span>
                  <div className="flex flex-wrap gap-1.5 py-1.5 pl-4">
                    {g.items.map((item, i) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.035 }}
                        className="rounded border border-ink-line px-2 py-0.5 text-xs leading-6 text-ink-text transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                  <span className="text-ink-muted">]{gi < groups.length - 1 ? "," : ""}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            <span className="text-ink-muted">{"}"}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
