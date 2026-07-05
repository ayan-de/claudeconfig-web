"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LuDownload,
  LuGithub,
  LuKeyRound,
  LuShieldCheck,
  LuRotateCcw,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { APP } from "@/lib/release";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Layered background */}
      <div className="absolute inset-0 -z-10 bg-gradient-brand-soft" />
      <div className="absolute inset-0 -z-10 bg-grid mask-radial opacity-60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:gap-20 lg:grid-cols-12 items-center">
          {/* Copy column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Badge variant="brand" className="mb-5">
                <span className="size-1.5 rounded-full bg-brand" />
                v{APP.version} · Cross-platform · MIT
              </Badge>

              <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                Switch Claude Code providers in{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-brand">one click</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-3 bg-brand/15 -z-0 rounded-sm"
                  />
                </span>
                .
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-text-secondary">
                {APP.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#download">
                  <Button size="lg">
                    <LuDownload className="size-5" />
                    Download for {APP.name}
                  </Button>
                </a>
                <a
                  href={APP.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="secondary">
                    <LuGithub className="size-5" />
                    Star on GitHub
                  </Button>
                </a>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { value: "<8MB", label: "Linux binary" },
                  { value: "100%", label: "Open source" },
                  { value: "0", label: "Plain-text secrets" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-xl font-semibold tracking-tight">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* App preview column */}
          <div className="lg:col-span-5 space-y-5">
            <motion.video
              initial={reduce ? false : { opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
              src="/animate.mp4"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden
              className="w-full aspect-square rounded-2xl border border-surface-border bg-surface-elevated shadow-xl"
            />
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  const reduce = useReducedMotion();
  const providers = [
    { name: "Anthropic", color: "from-[#cc785c] to-[#a85a3e]", model: "claude-sonnet-4" },
    { name: "GLM", color: "from-[#3b82f6] to-[#1d4ed8]", model: "glm-4.6" },
    { name: "Kimi", color: "from-[#10b981] to-[#047857]", model: "kimi-k2" },
    { name: "DeepSeek", color: "from-[#8b5cf6] to-[#6d28d9]", model: "deepseek-chat" },
    { name: "Minimax", color: "from-[#f59e0b] to-[#b45309]", model: "MiniMax-Text-01" },
  ];
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((i) => (i + 1) % providers.length), 2200);
    return () => clearInterval(id);
  }, [reduce, providers.length]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative"
    >
      {/* Floating glow */}
      <div className="absolute -inset-10 -z-10 bg-brand/15 blur-3xl rounded-full opacity-60" />

      <div className="relative rounded-2xl border border-surface-border bg-surface-elevated shadow-2xl overflow-hidden glow-brand">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-surface-border bg-surface-muted px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ed6a5e]" />
            <span className="size-2.5 rounded-full bg-[#f4bf4f]" />
            <span className="size-2.5 rounded-full bg-[#62c454]" />
          </div>
          <div className="text-[11px] font-mono text-text-muted tracking-wide">
            claude-config · providers
          </div>
          <div className="w-12" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-5 h-[360px] sm:h-[400px]">
          {/* Provider list */}
          <ul className="col-span-2 border-r border-surface-border bg-surface-muted/40 py-3 px-2 space-y-1">
            {providers.map((p, i) => (
              <li key={p.name}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full text-left flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-all",
                    active === i
                      ? "bg-surface-elevated text-text-primary shadow-sm border border-surface-border"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <span
                    className={cn(
                      "size-5 rounded-sm bg-gradient-to-br shrink-0",
                      p.color
                    )}
                  />
                  <span className="truncate">{p.name}</span>
                  {active === i && (
                    <span className="ml-auto size-1.5 rounded-full bg-brand" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Detail */}
          <div className="col-span-3 p-4 flex flex-col">
            <div className="text-[10px] uppercase tracking-wider text-text-muted">
              Active profile
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <h3 className="text-lg font-semibold tracking-tight">
                {providers[active].name}
              </h3>
              <Badge variant="success" className="text-[10px] px-2 py-0.5">
                <span className="size-1 rounded-full bg-success" />
                Loaded
              </Badge>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <Field label="Base URL" value="https://api.anthropic.com" />
              <Field label="Model" value={providers[active].model} />
              <Field
                label="Token"
                value="sk-ant-•••••••••••••2f9c"
                icon={<LuKeyRound className="size-3" />}
              />
            </div>

            <div className="mt-auto pt-4 grid grid-cols-3 gap-2 text-[10px]">
              {[
                { icon: LuShieldCheck, label: "Keyring" },
                { icon: LuRotateCcw, label: "Backups" },
                { icon: LuKeyRound, label: "Encrypted" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 rounded-sm border border-surface-border bg-surface-muted/40 px-2 py-1.5 cursor-default"
                >
                  <Icon className="size-3 text-brand" />
                  <span className="text-text-secondary">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating code chip */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -16, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute -left-6 sm:-left-12 bottom-10 hidden sm:flex items-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-3 py-2 shadow-lg"
      >
        <AnimatedLogo size={20} />
        <span className="text-[11px] font-mono text-text-secondary">
          env <span className="text-brand">✓</span> updated
        </span>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface-muted/30 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 font-mono text-text-primary">
        {icon && <span className="text-text-muted">{icon}</span>}
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}