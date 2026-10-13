/* eslint-disable react-refresh/only-export-components -- registry module, not a component file */
import type { ReactNode } from "react";
import type { NavigateFunction } from "react-router-dom";
import { links, profile, projects, sections } from "../data/portfolio";

/**
 * Shared command registry for the ⌘K command bar and the contact-section terminal.
 * A command either performs an action (navigate, open a link) or returns output to print.
 */

export interface CommandContext {
  navigate: NavigateFunction;
  pathname: string;
}

export interface CommandResult {
  output?: ReactNode;
  /** True when the command moved the user somewhere, so a command bar should close. */
  navigated?: boolean;
}

interface Command {
  name: string;
  aliases?: string[];
  description: string;
  /** Possible arguments, used for autosuggestions like `cd work`. */
  args?: { value: string; description: string }[];
  run: (args: string[], ctx: CommandContext) => CommandResult;
}

export const OPEN_PROJECT_EVENT = "portfolio:open-project";
export const OPEN_COMMAND_BAR_EVENT = "portfolio:open-command-bar";

const isMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.userAgent);
export const shortcutLabel = () => (isMac() ? "⌘K" : "Ctrl K");

export const projectSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const linkCls = "text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent";

const openUrl = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

/** Scroll to a home-page section, routing home first when needed. Calls `then` once it's on screen. */
function goToSection(id: string, ctx: CommandContext, then?: () => void) {
  if (ctx.pathname === "/") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (then) window.setTimeout(then, 450);
  } else {
    ctx.navigate(`/#${id}`);
    if (then) window.setTimeout(then, 650);
  }
}

const focusContactForm = () => {
  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  document.getElementById("cf-name")?.focus({ preventScroll: true });
};

const sectionIds = sections.map((s) => s.id);

const COMMANDS: Command[] = [
  {
    name: "cd",
    description: "jump to a section",
    args: [
      { value: "~", description: "back to the top" },
      ...sections.map((s) => ({ value: s.id, description: `go to ${s.label}` })),
      { value: "projects", description: "all projects page" },
    ],
    run: ([target = "~"], ctx) => {
      const t = target.replace(/^~?\/?/, "").replace(/\/$/, "").toLowerCase();
      if (t === "" || t === "~" || t === "..") {
        if (ctx.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
        else ctx.navigate("/");
        return { navigated: true };
      }
      if (t === "projects") {
        ctx.navigate("/projects");
        return { navigated: true };
      }
      if (sectionIds.includes(t)) {
        goToSection(t, ctx);
        return { navigated: true };
      }
      return {
        output: (
          <>
            cd: no such directory: <span className="text-accent-amber">{target}</span>
          </>
        ),
      };
    },
  },
  {
    name: "open",
    description: "open a project's README",
    args: projects.map((p) => ({ value: projectSlug(p.title), description: p.title })),
    run: ([slug], ctx) => {
      const project = projects.find((p) => projectSlug(p.title) === slug?.toLowerCase());
      if (!project) {
        return {
          output: (
            <>
              open: unknown project <span className="text-accent-amber">{slug ?? ""}</span>. try{" "}
              <span className="text-accent">ls</span>.
            </>
          ),
        };
      }
      const s = projectSlug(project.title);
      if (ctx.pathname === "/") {
        window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: s }));
      } else {
        ctx.navigate("/#work", { state: { openProject: s } });
      }
      return { navigated: true };
    },
  },
  {
    name: "ls",
    aliases: ["projects"],
    description: "list my projects",
    run: () => ({
      output: (
        <ul>
          {projects.map((p) => (
            <li key={p.title}>
              <span className="text-accent">{projectSlug(p.title)}/</span>
              <span className="text-ink-muted"> — {p.tech.slice(0, 3).join(", ")}</span>
            </li>
          ))}
        </ul>
      ),
    }),
  },
  {
    name: "email",
    aliases: ["mail", "message", "contact"],
    description: "send me a message",
    run: (_, ctx) => {
      goToSection("contact", ctx, focusContactForm);
      return {
        navigated: true,
        output: (
          <>
            opened the message form → (or write to{" "}
            <a className={linkCls} href={`mailto:${links.email}`}>
              {links.email}
            </a>
            )
          </>
        ),
      };
    },
  },
  {
    name: "cv",
    aliases: ["resume"],
    description: "open my resume (PDF)",
    run: () => {
      openUrl(links.cv);
      return { navigated: true, output: <>opening cv.pdf ↗</> };
    },
  },
  {
    name: "github",
    description: "open my GitHub",
    run: () => {
      openUrl(links.github);
      return { navigated: true, output: <>opening {links.github.replace("https://", "")} ↗</> };
    },
  },
  {
    name: "linkedin",
    description: "open my LinkedIn",
    run: () => {
      openUrl(links.linkedin);
      return { navigated: true, output: <>opening {links.linkedin.replace("https://www.", "")} ↗</> };
    },
  },
  {
    name: "twitter",
    aliases: ["x"],
    description: "open my X / Twitter",
    run: () => {
      openUrl(links.twitter);
      return { navigated: true, output: <>opening {links.twitter.replace("https://", "")} ↗</> };
    },
  },
  {
    name: "whoami",
    description: "who is this?",
    run: () => ({
      output: (
        <>
          {profile.name} — {profile.role}, {profile.location}.
        </>
      ),
    }),
  },
  {
    name: "help",
    description: "list available commands",
    run: () => ({
      output: (
        <ul className="grid gap-x-6 sm:grid-cols-2">
          {COMMANDS.filter((c) => c.name !== "sudo").map((c) => (
            <li key={c.name}>
              <span className="inline-block w-20 text-accent">{c.name}</span>
              <span className="text-ink-muted">{c.description}</span>
            </li>
          ))}
        </ul>
      ),
    }),
  },
  {
    name: "sudo",
    aliases: ["hire"],
    description: "elevate privileges",
    args: [{ value: "hire ansh", description: "you know you want to" }],
    run: () => ({
      output: (
        <>
          permission granted ✓ — run <span className="text-accent">email</span> and let&apos;s talk.
        </>
      ),
    }),
  },
];

function findCommand(name: string) {
  const n = name.toLowerCase();
  return COMMANDS.find((c) => c.name === n || c.aliases?.includes(n));
}

/** Parse and execute a raw command line. Bare section names (`work`) act as `cd work`. */
export function runCommand(raw: string, ctx: CommandContext): CommandResult | null {
  const [name, ...args] = raw.trim().split(/\s+/);
  if (!name) return null;
  const cmd = findCommand(name);
  if (cmd) return cmd.run(args, ctx);
  if (sectionIds.includes(name.toLowerCase()) || name === "~") return findCommand("cd")!.run([name], ctx);
  if (projects.some((p) => projectSlug(p.title) === name.toLowerCase())) return findCommand("open")!.run([name], ctx);

  const guess = suggest(name, 1)[0];
  return {
    output: (
      <>
        command not found: <span className="text-accent-amber">{name}</span>.{" "}
        {guess ? (
          <>
            did you mean <span className="text-accent">{guess.text}</span>?
          </>
        ) : (
          <>
            try <span className="text-accent">help</span>.
          </>
        )}
      </>
    ),
  };
}

export interface Suggestion {
  text: string;
  description: string;
  group: "navigate" | "projects" | "links" | "terminal";
}

const groupOf = (name: string): Suggestion["group"] =>
  name === "cd" ? "navigate" : name === "open" ? "projects" : ["cv", "github", "linkedin", "twitter", "email"].includes(name) ? "links" : "terminal";

/** Every runnable line, e.g. `cd work`, `open verifai`, `cv`. */
const ALL: Suggestion[] = COMMANDS.flatMap((c) =>
  c.args
    ? c.args.map((a) => ({ text: `${c.name} ${a.value}`, description: a.description, group: groupOf(c.name) }))
    : [{ text: c.name, description: c.description, group: groupOf(c.name) }],
);

const DEFAULTS = ["cd about", "cd work", "cd experience", "email", "cv", "open dot-music", "help"];

function score(query: string, s: Suggestion): number {
  const q = query.toLowerCase();
  const t = s.text.toLowerCase();
  if (t === q) return 1000;
  if (t.startsWith(q)) return 500 - t.length;
  // `work` → `cd work`, `verif` → `open verifai`
  const words = t.split(/[\s-]+/);
  if (words.some((w) => w.startsWith(q))) return 300 - t.length;
  if (t.includes(q)) return 200 - t.indexOf(q);
  if (s.description.toLowerCase().includes(q)) return 100;
  // subsequence: `cdw` → `cd work`
  let i = 0;
  for (const ch of t) if (ch === q[i]) i++;
  return i === q.length ? 50 - t.length : 0;
}

/** Ranked autosuggestions for a partial command line. */
export function suggest(query: string, limit = 8): Suggestion[] {
  const q = query.trim();
  if (!q) return DEFAULTS.map((d) => ALL.find((s) => s.text === d)!).filter(Boolean);
  return ALL.map((s) => ({ s, n: score(q, s) }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.s);
}
