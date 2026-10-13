import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { OPEN_COMMAND_BAR_EVENT, runCommand, suggest, type Suggestion } from "../../lib/commands";


const isEditable = (el: Element | null) =>
  el instanceof HTMLInputElement ||
  el instanceof HTMLTextAreaElement ||
  (el instanceof HTMLElement && el.isContentEditable);

const GROUP_ICON: Record<Suggestion["group"], string> = {
  navigate: "→",
  projects: "◆",
  links: "↗",
  terminal: "$",
};

/** Highlight the part of `text` that matches `query` (prefix or substring). */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim().toLowerCase();
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-accent">{text.slice(i, i + q.length)}</span>
      {text.slice(i + q.length)}
    </>
  );
}

/**
 * Spotlight-style command bar. ⌘K / Ctrl+K or "/" opens it; type a command,
 * Tab / → accepts the inline suggestion, ↑↓ pick from the list, Enter runs.
 */
export default function CommandBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false); // true once the user arrows through the list
  const [output, setOutput] = useState<{ cmd: string; node: ReactNode } | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const suggestions = useMemo(() => suggest(value), [value]);
  const top = suggestions[0];
  const ghost =
    value && top && top.text.toLowerCase().startsWith(value.toLowerCase()) && top.text.length > value.length
      ? top.text.slice(value.length)
      : "";

  const show = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setValue("");
    setOutput(null);
    setActive(0);
    setPicked(false);
    setHistoryIdx(-1);
  }, []);

  // Global shortcuts
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      } else if (e.key === "/" && !open && !isEditable(document.activeElement)) {
        e.preventDefault();
        show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_BAR_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_BAR_EVENT, onOpen);
    };
  }, [open, show, close]);

  // Focus in, lock scroll, restore focus on close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
      const el = restoreFocus.current;
      if (el && document.contains(el) && el.id !== "cf-name") el.focus({ preventScroll: true });
    };
  }, [open]);

  const execute = (line: string) => {
    const cmd = line.trim();
    if (!cmd) return;
    if (cmd === "clear") {
      setOutput(null);
      setValue("");
      return;
    }
    if (cmd === "exit") {
      close();
      return;
    }
    setHistory((h) => [cmd, ...h.filter((x) => x !== cmd)].slice(0, 20));
    const result = runCommand(cmd, { navigate, pathname });
    if (result?.navigated) {
      close();
      return;
    }
    setOutput(result?.output ? { cmd, node: result.output } : null);
    setValue("");
    setActive(0);
    setPicked(false);
    setHistoryIdx(-1);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        if (value) setValue("");
        else close();
        break;
      case "Tab":
        e.preventDefault();
        if (picked && suggestions[active]) setValue(suggestions[active].text);
        else if (ghost) setValue(value + ghost);
        else if (top) setValue(top.text);
        setPicked(false);
        setActive(0);
        break;
      case "ArrowRight":
        if (ghost && e.currentTarget.selectionStart === value.length) {
          e.preventDefault();
          setValue(value + ghost);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!suggestions.length) break;
        setActive((i) => (picked ? (i + 1) % suggestions.length : 0));
        setPicked(true);
        break;
      case "ArrowUp":
        e.preventDefault();
        // On an empty prompt, ↑ walks command history like a shell.
        if (!picked && (value === "" || historyIdx >= 0) && history.length) {
          const next = Math.min(historyIdx + 1, history.length - 1);
          setHistoryIdx(next);
          setValue(history[next]);
          break;
        }
        if (!suggestions.length) break;
        setActive((i) => (picked ? (i - 1 + suggestions.length) % suggestions.length : suggestions.length - 1));
        setPicked(true);
        break;
      case "Enter":
        e.preventDefault();
        // Like Spotlight: Enter runs the highlighted row; the top hit is highlighted while typing.
        execute(picked && suggestions[active] ? suggestions[active].text : value && top ? top.text : value);
        break;
    }
  };

  const activeId = picked && suggestions[active] ? `cmd-opt-${active}` : undefined;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="command-bar"
          className="fixed inset-0 z-[80] flex justify-center px-4 pt-[14vh] sm:pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px]" onMouseDown={close} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command bar"
            className="relative w-full max-w-[640px]"
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 520, damping: 34 }}
          >
            {/* The pill */}
            <div className="flex h-14 items-center gap-3 rounded-full border border-white/10 bg-[#121614]/80 px-5 shadow-[0_20px_60px_-10px_rgb(0_0_0/0.7),0_0_0_1px_rgb(124_255_155/0.08),0_0_40px_-12px_rgb(124_255_155/0.35)] backdrop-blur-2xl backdrop-saturate-150 sm:h-16 sm:px-6">
              <span className="shrink-0 text-lg text-accent" aria-hidden="true">
                ❯
              </span>
              <div className="relative min-w-0 flex-1">
                {/* Ghost completion sits behind the transparent-background input. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-pre text-base sm:text-lg"
                >
                  <span className="text-transparent">{value}</span>
                  <span className="text-ink-muted/60">{ghost}</span>
                </div>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setActive(0);
                    setPicked(false);
                    setHistoryIdx(-1);
                  }}
                  onKeyDown={onKeyDown}
                  role="combobox"
                  aria-expanded={suggestions.length > 0}
                  aria-controls="cmd-listbox"
                  aria-activedescendant={activeId}
                  aria-autocomplete="both"
                  aria-label="Type a command"
                  placeholder={value ? "" : "type a command — try “cd work” or “help”"}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  className="relative w-full bg-transparent text-base text-white caret-accent placeholder:text-ink-muted/50 focus:outline-none sm:text-lg"
                />
              </div>
              <kbd className="hidden shrink-0 rounded-md border border-white/10 px-1.5 py-0.5 text-[11px] text-ink-muted sm:block">
                esc
              </kbd>
            </div>

            {/* Output of the last command */}
            <AnimatePresence>
              {output && (
                <motion.div
                  key={output.cmd}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-3 mt-2 max-h-[30vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0e1210]/90 px-5 py-4 text-sm leading-6 text-ink-text backdrop-blur-xl"
                  role="status"
                >
                  <p className="mb-1 text-xs text-ink-muted">
                    <span className="text-accent">$</span> {output.cmd}
                  </p>
                  {output.node}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <motion.ul
                id="cmd-listbox"
                role="listbox"
                aria-label="Suggestions"
                className="mx-3 mt-2 max-h-[46vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0e1210]/90 p-1.5 shadow-2xl backdrop-blur-xl"
              >
                {suggestions.map((s, i) => {
                  const isActive = picked ? i === active : i === 0 && !!value;
                  return (
                    <li
                      key={s.text}
                      id={`cmd-opt-${i}`}
                      role="option"
                      aria-selected={isActive}
                      onMouseMove={() => {
                        if (!picked || active !== i) {
                          setActive(i);
                          setPicked(true);
                        }
                      }}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => execute(s.text)}
                      className={cn(
                        "relative flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm",
                        isActive ? "text-white" : "text-ink-text",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="cmd-active"
                          className="absolute inset-0 rounded-xl bg-accent/10 ring-1 ring-accent/25"
                          transition={{ type: "spring", stiffness: 600, damping: 40 }}
                        />
                      )}
                      <span className="relative w-4 shrink-0 text-center text-xs text-ink-muted">
                        {GROUP_ICON[s.group]}
                      </span>
                      <span className="relative min-w-0 flex-1 truncate">
                        <Highlight text={s.text} query={value} />
                      </span>
                      <span className="relative hidden shrink-0 truncate text-xs text-ink-muted sm:block">
                        {s.description}
                      </span>
                      {isActive && (
                        <kbd className="relative shrink-0 text-[11px] text-ink-muted" aria-hidden="true">
                          ↵
                        </kbd>
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            )}

            <p className="mt-3 hidden justify-center gap-4 text-[11px] text-ink-muted sm:flex">
              <span>
                <kbd className="text-ink-text">tab</kbd> complete
              </span>
              <span>
                <kbd className="text-ink-text">↑↓</kbd> select
              </span>
              <span>
                <kbd className="text-ink-text">↵</kbd> run
              </span>
              <span>
                <kbd className="text-ink-text">esc</kbd> close
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
