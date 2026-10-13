import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { links, projects } from "../../data/portfolio";

const plugin = projects.find((p) => p.title === "Waysorted Figma Plugin");

const FigmaPluginPage = () => {
  return (
    <section className="mx-auto flex min-h-[85svh] max-w-3xl flex-col justify-center px-4 pb-10 pt-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-lg border border-ink-line bg-ink-surface"
      >
        <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3 text-xs text-ink-muted">
          <Lock className="h-3.5 w-3.5 text-accent-amber" />
          ~/projects/waysorted-figma-plugin — read-only
        </div>
        <div className="space-y-5 p-5 text-sm leading-relaxed sm:p-8">
          <p className="text-ink-muted">
            <span className="text-accent">$</span> git clone waysorted/figma-plugin
          </p>
          <p className="text-accent-amber">fatal: repository is private.</p>
          <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">This one is a private codebase.</h1>
          {plugin && (
            <>
              <p className="text-ink-text">{plugin.description}</p>
              <p className="text-ink-muted">{plugin.built}</p>
              <p className="text-xs text-ink-muted">{plugin.tech.join(" · ")}</p>
            </>
          )}
          <p className="text-ink-text">
            Happy to walk through the architecture in a call —{" "}
            <a href={`mailto:${links.email}`} className="text-accent hover:underline">
              {links.email}
            </a>
          </p>
        </div>
      </motion.div>
      <Link to="/#work" className="mt-8 text-sm text-ink-muted transition-colors hover:text-accent">
        ← back to public projects
      </Link>
    </section>
  );
};

export default FigmaPluginPage;
