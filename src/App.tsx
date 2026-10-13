import { useEffect, type ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/sections/Hero";
import AllProjects from "./components/pages/AllProjects";
import FigmaPluginPage from "./components/pages/FigmaPluginPage";
import StackSection from "./components/terminal/StackSection";
import ProjectList from "./components/terminal/ProjectList";
import SectionHeader from "./components/terminal/SectionHeader";
import GitLog from "./components/terminal/GitLog";
import TerminalContact from "./components/terminal/TerminalContact";
import CursorGlow from "./components/terminal/CursorGlow";
import CommandBar from "./components/terminal/CommandBar";
import { profile, projects } from "./data/portfolio";

/** Scroll to top on route change, or to the #hash target if one is given. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-accent shadow-[0_0_8px_rgb(124_255_155/0.8)]"
      style={{ scaleX }}
    />
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-24 flex max-w-6xl flex-col gap-2 border-t border-ink-line px-4 py-8 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React &amp; Three.js.
      </p>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="self-start hover:text-accent"
      >
        cd ~ ↑
      </button>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-ink-bg"
      >
        Skip to content
      </a>
      <ScrollManager />
      <ScrollProgress />
      <CursorGlow />
      <div className="crt" aria-hidden="true" />
      <Navbar />
      <main id="main" className="relative z-10">
        {children}
      </main>
      <Footer />
      <CommandBar />
    </MotionConfig>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <section id="about" className="py-20 md:py-28">
        <StackSection />
      </section>
      <section id="work" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            index="02"
            command="ls -la ~/projects"
            title="Selected Work"
            kicker="Backend services, desktop apps, and AI tooling. Select a project to open its README."
          />
          <ProjectList projects={projects} />
          <Link
            to="/projects"
            className="mt-10 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
          >
            <span className="text-accent">$</span> open ./projects --all →
          </Link>
        </div>
      </section>
      <section id="experience" className="py-20 md:py-28">
        <GitLog />
      </section>
      <section id="contact" className="py-20 md:py-28">
        <TerminalContact />
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-4 pt-24 sm:px-6">
      <p className="text-sm text-ink-muted">
        <span className="text-accent">$</span> cd {window.location.pathname}
      </p>
      <h1 className="mt-4 font-display text-6xl font-bold text-white md:text-8xl">404</h1>
      <p className="mt-4 text-ink-muted">No such file or directory.</p>
      <Link to="/" className="mt-8 text-accent hover:underline">
        cd ~ →
      </Link>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/figma-plugin" element={<FigmaPluginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
