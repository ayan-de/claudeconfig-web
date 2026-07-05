"use client";

import {
  LuLayers,
  LuKeyRound,
  LuShieldCheck,
  LuRotateCcw,
  LuCable,
  LuMousePointerClick,
  LuHardDrive,
  LuSparkles,
} from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  body: string;
  /** Decorative accent style */
  accent: "brand" | "neutral" | "success";
  /** Larger card spans 2 columns on lg+ */
  large?: boolean;
}

const FEATURES: Feature[] = [
  {
    icon: <LuLayers />,
    title: "Unlimited provider profiles",
    body: "Anthropic, GLM, Kimi, DeepSeek, Minimax, self-hosted, or any OpenAI-compatible endpoint. Name, base URL, auth token, optional model overrides — all in one place.",
    accent: "brand",
    large: true,
  },
  {
    icon: <LuMousePointerClick />,
    title: "One-click load",
    body: "Pick a profile, hit load. The selected env block is written into ~/.claude/settings.json atomically.",
    accent: "brand",
  },
  {
    icon: <LuKeyRound />,
    title: "OS keyring storage",
    body: "Auth tokens live in macOS Keychain, GNOME libsecret, or Windows Credential Manager. Never on disk in plaintext.",
    accent: "success",
  },
  {
    icon: <LuShieldCheck />,
    title: "Non-destructive merge",
    body: "Only the env block is touched. Hooks, enabledPlugins, extraKnownMarketplaces, and everything else are preserved verbatim.",
    accent: "neutral",
  },
  {
    icon: <LuRotateCcw />,
    title: "Automatic backups",
    body: "Every write snapshots settings.json to <unix-ms>.json — restore any version with one click.",
    accent: "neutral",
  },
  {
    icon: <LuCable />,
    title: "Honors CLAUDE_CONFIG_DIR",
    body: "Use a custom Claude Code config directory. First launch auto-imports your existing env block as a ready profile.",
    accent: "brand",
  },
  {
    icon: <LuHardDrive />,
    title: "~5 MB Tauri binaries",
    body: "Rust backend for file I/O, atomic writes, and keyring access. No Electron. No Chromium bloat.",
    accent: "neutral",
  },
  {
    icon: <LuSparkles />,
    title: "Open source, MIT",
    body: "Fully auditable. Build from source with pnpm tauri build. Releases cut from GitHub Actions for every push tag.",
    accent: "brand",
  },
];

const accentStyles = {
  brand: "bg-brand/10 text-brand",
  neutral: "bg-surface-muted text-text-secondary border border-surface-border",
  success: "bg-success/10 text-success",
};

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Features
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
            Everything Claude Code needs.
            <br />
            <span className="text-text-secondary font-normal">
              Nothing it doesn&apos;t.
            </span>
          </h2>
          <p className="mt-4 text-text-secondary text-pretty">
            A small, focused app that does one thing well: swap your Claude Code
            provider profile without touching settings.json by hand.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal
              key={feature.title}
              delay={Math.min(i * 0.04, 0.3)}
              className={cn(feature.large && "sm:col-span-2 lg:col-span-2 lg:row-span-1")}
            >
              <Card className="h-full cursor-pointer transition-all duration-300 hover:border-neutral-warm hover:shadow-md hover:-translate-y-0.5 rounded-sm">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        "inline-flex items-center justify-center size-10 rounded-sm",
                        accentStyles[feature.accent]
                      )}
                    >
                      <span className="text-xl">{feature.icon}</span>
                    </div>
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.body}</CardDescription>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}