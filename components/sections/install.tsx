"use client";

import {
  LuTerminal,
  LuCheck,
  LuCopy,
  LuArrowRight,
} from "react-icons/lu";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { DOWNLOADS } from "@/lib/constants";

const STEPS = [
  {
    n: "01",
    title: "Download the .deb",
    body: "curl -L follows GitHub's redirect to the CDN.",
    code: `curl -L -o claude-config.deb \\\n  "${DOWNLOADS.linux.deb}"`,
  },
  {
    n: "02",
    title: "Install — apt auto-pulls the deps",
    body: "libwebkit2gtk-4.1-0 and libsecret-1-0 are pulled automatically.",
    code: `sudo apt update\nsudo apt install -y ./claude-config.deb`,
  },
  {
    n: "03",
    title: "Launch",
    body: "Available in your application menu, or run from a terminal.",
    code: `claude-config`,
  },
];

const ONE_LINER = `curl -L -o claude-config.deb "${DOWNLOADS.linux.deb}" && sudo apt update && sudo apt install -y ./claude-config.deb && claude-config`;

export function Install() {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <section id="install" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Ubuntu / Debian
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
              Three commands. Then you&apos;re in.
            </h2>
            <p className="mt-4 text-text-secondary text-pretty">
              The whole install takes under a minute on a fresh Ubuntu box.
              apt resolves libwebkit2gtk and libsecret for you.
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Or paste this single command
              </p>
              <div className="mt-3 relative overflow-hidden rounded-xl border border-surface-border bg-code-bg">
                <pre className="overflow-x-auto p-4 pr-12 text-[12px] leading-relaxed font-mono text-white">
                  <code>{ONE_LINER}</code>
                </pre>
                <button
                  onClick={() => copy(ONE_LINER)}
                  aria-label={isCopied ? "Copied" : "Copy command"}
                  className="absolute top-3 right-3 inline-flex items-center justify-center size-8 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isCopied ? (
                    <LuCheck className="size-4" />
                  ) : (
                    <LuCopy className="size-4" />
                  )}
                </button>
              </div>
              {isCopied && (
                <p className="mt-2 text-xs text-success inline-flex items-center gap-1.5">
                  <LuCheck className="size-3.5" />
                  Copied to clipboard
                </p>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <ol className="space-y-5">
              {STEPS.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.07}>
                  <li className="relative rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
                    {/* Step header */}
                    <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 border-b border-surface-border bg-surface-muted/40">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center size-9 rounded-sm bg-surface-elevated border border-surface-border font-mono text-xs font-semibold text-brand">
                          {step.n}
                        </span>
                        <h3 className="text-sm sm:text-base font-semibold tracking-tight">
                          {step.title}
                        </h3>
                      </div>
                      <Badge variant="default" className="hidden sm:inline-flex">
                        <LuTerminal className="size-3" />
                        Terminal
                      </Badge>
                    </div>
                    <div className="p-5 sm:p-6">
                      {step.body && (
                        <p className="text-sm text-text-secondary leading-relaxed mb-3">
                          {step.body}
                        </p>
                      )}
                      <CodeBlock code={step.code} language="bash" />
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.25}>
              <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
                <LuArrowRight className="size-4 text-brand" />
                First launch auto-imports your existing settings.json as a ready profile.
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}