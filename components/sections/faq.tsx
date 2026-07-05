"use client";

import * as React from "react";
import { LuPlus } from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface QA {
  q: string;
  a: React.ReactNode;
}

const FAQS: QA[] = [
  {
    q: "Does Claude Config touch anything outside ~/.claude/settings.json?",
    a: (
      <>
        No. The only Claude Code file the app ever writes to is{" "}
        <code className="font-mono text-text-primary">~/.claude/settings.json</code>,
        and only the <code className="font-mono text-text-primary">env</code> block
        at that. Hooks, <code className="font-mono text-text-primary">enabledPlugins</code>,{" "}
        <code className="font-mono text-text-primary">extraKnownMarketplaces</code>,
        and everything else are preserved verbatim.
      </>
    ),
  },
  {
    q: "Where do my auth tokens live?",
    a: (
      <>
        In the OS keyring — macOS Keychain, GNOME libsecret (via Secret
        Service), or Windows Credential Manager. Never on disk in plaintext.
        The app&apos;s <code className="font-mono text-text-primary">providers.json</code>{" "}
        only stores the metadata: name, base URL, model overrides.
      </>
    ),
  },
  {
    q: "Is my settings.json backed up?",
    a: (
      <>
        Every load snapshots settings.json to{" "}
        <code className="font-mono text-text-primary">
          &lt;app-data&gt;/backups/&lt;unix-ms&gt;.json
        </code>
        . You can restore any snapshot from inside the app.
      </>
    ),
  },
  {
    q: "I use a custom CLAUDE_CONFIG_DIR — does that work?",
    a: (
      <>
        Yes. The app honors the standard{" "}
        <code className="font-mono text-text-primary">CLAUDE_CONFIG_DIR</code>{" "}
        environment variable. On first launch it auto-imports your existing env
        block as an &quot;Imported&quot; profile so you start with one entry ready.
      </>
    ),
  },
  {
    q: "Is it signed / notarized?",
    a: (
      <>
        Windows binaries will show a SmartScreen warning until Authenticode
        signing ships (planned). Click <em>More info → Run anyway</em>.
        macOS: right-click the app → Open → confirm on first launch until
        notarization ships. Linux: no gatekeeper, just install.
      </>
    ),
  },
  {
    q: "Can I build it from source?",
    a: (
      <>
        Yes. <code className="font-mono text-text-primary">pnpm install</code>, then{" "}
        <code className="font-mono text-text-primary">pnpm tauri build</code>.
        Each platform builds on its own host — Tauri does not cross-compile
        installers. CI publishes release artifacts from a matrix build.
      </>
    ),
  },
];

export function FAQ() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
            Common questions.
          </h2>
          <p className="mt-4 text-text-secondary text-pretty">
            If something&apos;s missing, open an issue on GitHub — happy to help.
          </p>
        </Reveal>

        <div className="mt-12 max-w-3xl">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={Math.min(i * 0.04, 0.2)}>
                <div
                  className={cn(
                    "border-b border-surface-border",
                    i === 0 && "border-t"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                  >
                    <span className="text-base sm:text-lg font-medium tracking-tight text-text-primary group-hover:text-brand transition-colors">
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "inline-flex shrink-0 size-8 items-center justify-center rounded-sm border border-surface-border text-text-secondary transition-transform duration-300 cursor-pointer",
                        isOpen && "rotate-45 bg-brand/10 border-brand/30 text-brand"
                      )}
                    >
                      <LuPlus className="size-4" />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-5"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-text-secondary leading-relaxed pr-10">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}