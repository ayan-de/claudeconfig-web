"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { Separator } from "@/components/ui/separator";
import {
  LuCpu,
  LuLayers,
  LuPalette,
  LuTerminal,
  LuDatabase,
  LuShieldCheck,
} from "react-icons/lu";

const STACK = [
  {
    icon: <LuTerminal />,
    name: "Tauri 2",
    role: "Desktop shell",
    body: "~5 MB cross-platform binaries. Small, fast, native.",
  },
  {
    icon: <LuLayers />,
    name: "Next.js 16",
    role: "Frontend",
    body: "Static export loaded by the Tauri webview. Zero SSR.",
  },
  {
    icon: <LuPalette />,
    name: "Tailwind v4 + shadcn",
    role: "UI",
    body: "base-ui primitives. Dark/light themes via CSS variables.",
  },
  {
    icon: <LuCpu />,
    name: "Rust",
    role: "Backend",
    body: "File I/O, atomic writes, keyring access. Exhaustive merge tests.",
  },
  {
    icon: <LuDatabase />,
    name: "OS keyring",
    role: "Secrets",
    body: "Auth tokens never touch disk in plaintext.",
  },
  {
    icon: <LuShieldCheck />,
    name: "Atomic writes",
    role: "Reliability",
    body: "tempfile + fsync + rename with exclusive lock held across reads.",
  },
];

const STORAGE_ROWS = [
  { label: "Saved provider metadata", value: "<app-data>/providers.json" },
  { label: "Auth tokens", value: "OS keyring · service `claude-config`" },
  { label: "settings.json backups", value: "<app-data>/backups/<unix-ms>.json" },
  { label: "~/.claude/settings.json", value: "Claude Code's own file — env block only" },
];

const STORAGE_PATHS = [
  { os: "Linux", path: "~/.local/share/com.claudeconfig.app/" },
  { os: "macOS", path: "~/Library/Application Support/com.claudeconfig.app/" },
  { os: "Windows", path: "%APPDATA%\\com.claudeconfig.app\\" },
];

const PROVIDER_MODEL = `interface Provider {
  id: string;                              // uuid
  name: string;                            // unique, user-facing
  baseUrl: string;                         // → ANTHROPIC_BASE_URL
  model?: string;                          // → ANTHROPIC_MODEL
  smallFastModel?: string;                 // → ANTHROPIC_SMALL_FAST_MODEL
  defaultSonnetModel?: string;             // → ANTHROPIC_DEFAULT_SONNET_MODEL
  defaultOpusModel?: string;               // → ANTHROPIC_DEFAULT_OPUS_MODEL
  defaultHaikuModel?: string;              // → ANTHROPIC_DEFAULT_HAIKU_MODEL
  apiTimeoutMs?: number;                   // → API_TIMEOUT_MS
  disableNonessentialTraffic?: boolean;    // → CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
  createdAt: string;
  updatedAt: string;
}
// The auth token is NOT in this struct — it lives in the OS keyring.`;

export function Architecture() {
  return (
    <section id="architecture" className="py-24 sm:py-32 bg-surface-muted">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Architecture
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
            A small, focused app.
            <br />
            <span className="text-text-secondary font-normal">
              Auditable down to the byte.
            </span>
          </h2>
          <p className="mt-4 text-text-secondary text-pretty">
            Tauri shell + Next.js frontend + Rust backend. The merge logic is
            pure, exhaustive, and unit-tested — your settings.json is the only
            Claude Code file ever touched, and only its env block at that.
          </p>
        </Reveal>

        {/* Stack grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.05}>
              <div className="h-full rounded-sm border border-surface-border bg-surface-elevated p-5 transition-all hover:border-neutral-warm hover:-translate-y-0.5 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center size-9 rounded-sm bg-brand/10 text-brand">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold tracking-tight">
                      {item.name}
                    </div>
                    <div className="text-xs text-text-muted">{item.role}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Provider data model */}
        <Reveal delay={0.1} className="mt-16">
          <h3 className="text-2xl font-semibold tracking-tight">
            Provider data model
          </h3>
          <p className="mt-2 text-sm text-text-secondary max-w-2xl">
            One struct. No auth tokens on disk — those live in the OS keyring and
            are fetched on demand when loading a profile.
          </p>
          <div className="mt-6">
            <CodeBlock
              code={PROVIDER_MODEL}
              language="typescript"
              filename="src/lib/types.ts"
            />
          </div>
        </Reveal>

        {/* Storage layout */}
        <Reveal delay={0.1} className="mt-16">
          <h3 className="text-2xl font-semibold tracking-tight">
            Storage layout
          </h3>
          <p className="mt-2 text-sm text-text-secondary max-w-2xl">
            Predictable paths on every OS. Nothing hidden, nothing obfuscated.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
              <div className="px-5 py-3 border-b border-surface-border bg-surface-muted/40">
                <h4 className="text-sm font-semibold tracking-tight">What lives where</h4>
              </div>
              <ul className="divide-y divide-surface-border">
                {STORAGE_ROWS.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-start justify-between gap-4 px-5 py-3 text-sm"
                  >
                    <span className="text-text-secondary shrink-0">{row.label}</span>
                    <code className="font-mono text-xs text-text-primary text-right">
                      {row.value}
                    </code>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden">
              <div className="px-5 py-3 border-b border-surface-border bg-surface-muted/40">
                <h4 className="text-sm font-semibold tracking-tight">
                  &lt;app-data&gt; paths
                </h4>
              </div>
              <ul className="divide-y divide-surface-border">
                {STORAGE_PATHS.map((row) => (
                  <li
                    key={row.os}
                    className="flex items-center justify-between gap-4 px-5 py-3 text-sm"
                  >
                    <span className="text-text-secondary shrink-0">{row.os}</span>
                    <code className="font-mono text-xs text-text-primary truncate text-right">
                      {row.path}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Merge semantics */}
        <Reveal delay={0.1} className="mt-16">
          <h3 className="text-2xl font-semibold tracking-tight">
            Merge semantics
          </h3>
          <p className="mt-2 text-sm text-text-secondary max-w-2xl">
            Loading a profile rewrites the env block with provider-authoritative
            semantics — stale keys are removed, your own additions are kept.
          </p>

          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Every canonical key defined by the provider is set.",
              "Canonical keys the provider omits are removed — no stale keys accumulate across loads.",
              "Unknown keys already in settings.json are preserved — your additions survive.",
              "Atomic write: tempfile + fsync + rename with lock_exclusive held across the read-modify-write.",
            ].map((line, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-xl border border-surface-border bg-surface-elevated p-4 text-sm text-text-secondary"
              >
                <span className="inline-flex shrink-0 size-6 items-center justify-center rounded-sm bg-brand/10 text-brand text-xs font-semibold">
                  {i + 1}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ol>

          <div className="mt-6">
            <Separator className="mb-4" />
            <p className="text-xs text-text-muted">
              <code className="font-mono">src-tauri/src/merge.rs</code> is the single source of truth. Pure, no I/O, exhaustively unit-tested.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}