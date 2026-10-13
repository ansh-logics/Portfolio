import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Mail, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { links, profile } from "../../data/portfolio";
import { runCommand, shortcutLabel } from "../../lib/commands";
import SectionHeader from "./SectionHeader";
import ContactForm from "./ContactForm";

type Line = { id: number; kind: "in" | "out"; content: ReactNode };

export default function TerminalContact() {
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;
  const [lines, setLines] = useState<Line[]>(() => [
    {
      id: 0,
      kind: "out",
      content: (
        <>
          Type <span className="text-accent">help</span> to see what I can do, or just say{" "}
          <span className="text-accent">email</span>. Tip: press{" "}
          <kbd className="rounded border border-ink-line px-1 text-accent">{shortcutLabel()}</kbd> anywhere on the
          site for the command bar.
        </>
      ),
    },
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const run = (raw: string): ReactNode | null => {
    const result = runCommand(raw, { navigate, pathname });
    if (!result) return null;
    return result.output ?? <>→ {raw.trim()}</>;
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = value;
    setValue("");
    setCursor(-1);
    if (cmd.trim().toLowerCase() === "clear") {
      setLines([]);
      setHistory((h) => [cmd, ...h]);
      return;
    }
    const out = run(cmd);
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    setLines((ls) => [
      ...ls,
      { id: nextId(), kind: "in", content: cmd },
      ...(out ? [{ id: nextId(), kind: "out" as const, content: out }] : []),
    ]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const c = Math.min(cursor + 1, history.length - 1);
      setCursor(c);
      setValue(history[c]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const c = cursor - 1;
      setCursor(Math.max(c, -1));
      setValue(c >= 0 ? history[c] : "");
    }
  };

  const quick = [
    { icon: <Mail className="h-4 w-4" />, label: links.email, href: `mailto:${links.email}` },
    { icon: <FaLinkedin className="h-4 w-4" />, label: "LinkedIn", href: links.linkedin },
    { icon: <SiGithub className="h-4 w-4" />, label: "GitHub", href: links.github },
    { icon: <SiX className="h-3.5 w-3.5" />, label: "X / Twitter", href: links.twitter },
    { icon: <FileText className="h-4 w-4" />, label: "cv.pdf", href: links.cv },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <SectionHeader
        index="04"
        command="./contact.sh"
        title="Let's build something"
        kicker="Open to backend and full-stack roles, internships and interesting collaborations. Drop a message below and it lands straight in my inbox — or play with the terminal."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg border border-ink-line bg-ink-surface shadow-[0_0_80px_-30px_rgb(124_255_155/0.35)]"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 truncate text-xs text-ink-muted">{profile.handle} — zsh</span>
          </div>

          <div
            ref={scrollRef}
            className="h-72 overflow-y-auto p-4 text-sm leading-6 sm:h-80 sm:p-5"
            role="log"
            aria-live="polite"
          >
            {lines.map((l) =>
              l.kind === "in" ? (
                <p key={l.id} className="break-words">
                  <span className="text-accent">❯</span> <span className="text-white">{l.content}</span>
                </p>
              ) : (
                <div key={l.id} className="mb-2 break-words text-ink-text">
                  {l.content}
                </div>
              ),
            )}
            <form onSubmit={submit} className="flex items-center gap-2">
              <label htmlFor="term-input" className="text-accent">
                ❯
              </label>
              <input
                id="term-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="send"
                aria-label="Terminal command"
                placeholder="help"
                className="min-w-0 flex-1 bg-transparent text-base text-white caret-accent placeholder:text-ink-muted/50 focus:outline-none sm:text-sm"
              />
            </form>
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-ink-line px-4 py-3 [scrollbar-width:none]">
            {["help", "email", "projects", "cv"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const out = run(c);
                  setLines((ls) => [
                    ...ls,
                    { id: nextId(), kind: "in", content: c },
                    ...(out ? [{ id: nextId(), kind: "out" as const, content: out }] : []),
                  ]);
                }}
                className="shrink-0 rounded border border-ink-line px-2.5 py-1 text-xs text-ink-muted transition-colors hover:border-accent/50 hover:text-accent"
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <ContactForm />
        </motion.div>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        className="mt-8 flex flex-wrap gap-2"
      >
        {quick.map((q) => (
          <motion.li key={q.label} variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
            <a
              href={q.href}
              target={q.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 rounded border border-ink-line px-3.5 py-2.5 text-sm text-ink-text transition-colors hover:border-accent/50 hover:text-accent"
            >
              <span className="text-ink-muted transition-colors group-hover:text-accent">{q.icon}</span>
              {q.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
