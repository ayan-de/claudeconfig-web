"use client";

import { LuDownload, LuGithub, LuStar } from "react-icons/lu";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { AnimatedLogo } from "@/components/ui/animated-logo";
import { APP } from "@/lib/release";

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-surface-elevated">
            {/* Background layers */}
            <div className="absolute inset-0 -z-10 bg-gradient-brand-soft" />
            <div className="absolute inset-0 -z-10 bg-grid mask-radial opacity-50" />
            <div className="absolute -top-24 -right-24 -z-10 size-80 bg-brand/15 blur-3xl rounded-full" />
            <div className="absolute -bottom-24 -left-24 -z-10 size-80 bg-brand-soft/30 blur-3xl rounded-full" />

            <div className="px-6 sm:px-12 py-16 sm:py-20 text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-sm bg-surface-elevated border border-surface-border shadow-sm mb-6 overflow-hidden">
                <AnimatedLogo size={64} className="!border-0 !bg-transparent" />
              </div>

              <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
                One click to switch.
                <br />
                <span className="text-brand">Three commands to install.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-text-secondary text-pretty">
                Free, open source, MIT. Pick your platform and you&apos;re up
                and running in under a minute.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a href="#download">
                  <Button size="lg">
                    <LuDownload className="size-5" />
                    Download {APP.name}
                  </Button>
                </a>
                <a
                  href={APP.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="secondary">
                    <LuGithub className="size-5" />
                    View on GitHub
                  </Button>
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-text-muted">
                <LuStar className="size-4 text-warning fill-current" />
                Star the repo if it&apos;s useful
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}