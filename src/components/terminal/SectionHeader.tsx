import { motion } from "framer-motion";
import ScrambleText from "./ScrambleText";

interface Props {
  index: string;
  command: string;
  title: string;
  kicker?: string;
}

/** `02 — $ ls ~/projects` prompt line above a large scrambling title. */
export default function SectionHeader({ index, command, title, kicker }: Props) {
  return (
    <header className="mb-10 md:mb-14">
      <motion.p
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted sm:text-sm"
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-ink-line" />
        <span>
          <span className="text-accent">$</span> {command}
        </span>
      </motion.p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
        <ScrambleText text={title} />
      </h2>
      {kicker && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">{kicker}</p>}
    </header>
  );
}
