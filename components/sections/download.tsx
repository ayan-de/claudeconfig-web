"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LuDownload,
  LuMonitor,
  LuApple,
  LuShieldCheck,
  LuExternalLink,
  LuCheck,
} from "react-icons/lu";
import { SiUbuntu, SiFedora, SiArchlinux } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Reveal } from "@/components/ui/reveal";
import { useOSTracker } from "@/hooks/useOSTracker";
import {
  APP,
  CHECKSUMS,
  DOWNLOADS,
  SIZES,
  type Platform,
} from "@/lib/release";
import { cn } from "@/lib/utils";

const DEFAULT_TAB: Record<Platform, string> = {
  mac: "mac",
  windows: "windows",
  linux: "linux-deb",
  unknown: "linux-deb",
};

export function Download() {
  const { platform, isAppleSilicon } = useOSTracker();
  const reduce = useReducedMotion();
  const initialTab = platform ? DEFAULT_TAB[platform] : "linux-deb";
  const [tab, setTab] = React.useState(initialTab);

  React.useEffect(() => {
    if (platform) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTab(DEFAULT_TAB[platform]);
    }
  }, [platform]);

  return (
    <section id="download" className="py-24 sm:py-32 bg-surface-muted">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          <Reveal className="lg:col-span-7 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Download
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
              Native installers for every desktop.
            </h2>
            <p className="mt-4 text-text-secondary text-pretty">
              Small (~5 MB), self-contained, signed builds for{" "}
              <span className="text-text-primary font-medium">Linux</span>,{" "}
              <span className="text-text-primary font-medium">macOS</span>, and{" "}
              <span className="text-text-primary font-medium">Windows</span>.
              One-click to install.
            </p>
          </Reveal>

          <motion.video
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            src="/animate.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="lg:col-span-4 w-full max-w-[200px] lg:ml-auto aspect-square rounded-2xl border border-surface-border bg-surface-elevated shadow-xl"
          />
        </div>

        <Reveal delay={0.1} className="mt-10">
          <Tabs value={tab} onValueChange={setTab} idBase="download">
            <TabsList className="mt-3 flex-wrap">
              <TabsTrigger value="linux-deb">
                <SiUbuntu className="size-4" />
                Ubuntu / Debian
              </TabsTrigger>
              <TabsTrigger value="linux-rpm">
                <SiFedora className="size-4" />
                Fedora / RHEL
              </TabsTrigger>
              <TabsTrigger value="linux-appimage">
                <SiArchlinux className="size-4" />
                Arch / Other
              </TabsTrigger>
              <TabsTrigger value="mac">
                <LuApple className="size-4" />
                macOS
              </TabsTrigger>
              <TabsTrigger value="windows">
                <LuMonitor className="size-4" />
                Windows
              </TabsTrigger>
            </TabsList>

            {/* Ubuntu / Debian */}
            <TabsContent value="linux-deb">
              <DownloadPanel
                title="Ubuntu, Debian, Pop!_OS, Mint"
                subtitle="One-line install: curl, apt, launch."
                primaryCtas={[
                  {
                    href: DOWNLOADS.linux.deb,
                    label: "Download .deb",
                    size: SIZES.deb,
                    sha: CHECKSUMS.deb,
                    icon: <LuDownload className="size-5" />,
                  },
                ]}
                steps={[
                  {
                    title: "Download the .deb",
                    body: "curl -L follows GitHub's redirect to the CDN.",
                    code: `curl -L -o claude-config.deb \\\n  "${DOWNLOADS.linux.deb}"`,
                    lang: "bash",
                  },
                  {
                    title: "Install with apt",
                    body: "apt auto-pulls libwebkit2gtk-4.1-0 and libsecret-1-0.",
                    code: `sudo apt update\nsudo apt install -y ./claude-config.deb`,
                    lang: "bash",
                  },
                  {
                    title: "Launch",
                    body: "The app appears in your application menu.",
                    code: `claude-config`,
                    lang: "bash",
                  },
                ]}
                altLink={{
                  href: DOWNLOADS.linux.rpm,
                  label: "Need .rpm?",
                }}
                verifyFilename="claude-config.deb"
              />
            </TabsContent>

            {/* Fedora / RHEL */}
            <TabsContent value="linux-rpm">
              <DownloadPanel
                title="Fedora, RHEL, openSUSE"
                subtitle="Use dnf or rpm to install."
                primaryCtas={[
                  {
                    href: DOWNLOADS.linux.rpm,
                    label: "Download .rpm",
                    size: SIZES.rpm,
                    sha: CHECKSUMS.rpm,
                    icon: <LuDownload className="size-5" />,
                  },
                ]}
                steps={[
                  {
                    title: "Download the .rpm",
                    body: "Pick whichever command suits your shell.",
                    code: `curl -L -o claude-config.rpm \\\n  "${DOWNLOADS.linux.rpm}"`,
                    lang: "bash",
                  },
                  {
                    title: "Install with dnf or rpm",
                    body: "dnf resolves libwebkit2gtk and libsecret automatically.",
                    code: `sudo dnf install ./claude-config.rpm\n# or:  sudo rpm -i claude-config.rpm`,
                    lang: "bash",
                  },
                  {
                    title: "Launch",
                    code: `claude-config`,
                    lang: "bash",
                  },
                ]}
                altLink={{
                  href: DOWNLOADS.linux.deb,
                  label: "Prefer .deb?",
                }}
                verifyFilename="claude-config.rpm"
              />
            </TabsContent>

            {/* AppImage */}
            <TabsContent value="linux-appimage">
              <DownloadPanel
                title="Arch, Manjaro, or any distro"
                subtitle="The .AppImage runs anywhere — no install step."
                primaryCtas={[
                  {
                    href: DOWNLOADS.linux.appimage,
                    label: "Download .AppImage",
                    size: SIZES.appimage,
                    sha: CHECKSUMS.appimage,
                    icon: <LuDownload className="size-5" />,
                  },
                ]}
                steps={[
                  {
                    title: "Download and make executable",
                    body: "chmod +x turns it into a runnable binary.",
                    code: `curl -L -o claude-config.AppImage \\\n  "${DOWNLOADS.linux.appimage}"\nchmod +x claude-config.AppImage`,
                    lang: "bash",
                  },
                  {
                    title: "Run",
                    body: "Double-click in your file manager, or:",
                    code: `./claude-config.AppImage`,
                    lang: "bash",
                  },
                ]}
                note="Arch Linux: Tauri has no native pacman target, so the AppImage is the supported path until an AUR PKGBUILD ships."
                verifyFilename="claude-config.AppImage"
              />
            </TabsContent>

            {/* macOS */}
            <TabsContent value="mac">
              <DownloadPanel
                title={isAppleSilicon ? "Apple Silicon (M-series)" : "macOS"}
                subtitle="Universal binary — works on Intel and Apple Silicon."
                primaryCtas={[
                  {
                    href: DOWNLOADS.mac.dmg,
                    label: "Download .dmg",
                    size: SIZES.dmg,
                    sha: CHECKSUMS.dmg,
                    icon: <LuDownload className="size-5" />,
                  },
                ]}
                steps={[
                  {
                    title: "Download",
                    code: `curl -L -o ClaudeConfig.dmg \\\n  "${DOWNLOADS.mac.dmg}"`,
                    lang: "bash",
                  },
                  {
                    title: "Open the DMG and drag Claude Config into /Applications",
                    body: "Standard macOS install flow.",
                  },
                  {
                    title: "First launch",
                    body: "Until the app is notarized, right-click the app in /Applications → Open → confirm. Subsequent launches are normal.",
                  },
                ]}
                altLink={{
                  href: DOWNLOADS.mac.appTar,
                  label: "Need a .app.tar.gz?",
                }}
                verifyFilename="ClaudeConfig.dmg"
              />
            </TabsContent>

            {/* Windows */}
            <TabsContent value="windows">
              <DownloadPanel
                title="Windows 10 / 11"
                subtitle="Pick the installer you prefer."
                primaryCtas={[
                  {
                    href: DOWNLOADS.windows.msi,
                    label: "Download .msi",
                    size: SIZES.msi,
                    sha: CHECKSUMS.msi,
                    icon: <LuDownload className="size-5" />,
                  },
                  {
                    href: DOWNLOADS.windows.exe,
                    label: "Download .exe",
                    size: SIZES.exe,
                    sha: CHECKSUMS.exe,
                    icon: <LuDownload className="size-5" />,
                  },
                ]}
                steps={[
                  {
                    title: "Download",
                    body: "PowerShell:",
                    code: `Invoke-WebRequest -Uri "${DOWNLOADS.windows.msi}" -OutFile "claude-config.msi"`,
                    lang: "powershell",
                  },
                  {
                    title: "Install",
                    body: "Run the installer. The NSIS variant bundles WebView2 Runtime; the MSI expects it preinstalled (present on Windows 11 and up-to-date Windows 10).",
                    code: `msiexec /i claude-config.msi`,
                    lang: "powershell",
                  },
                ]}
                note="SmartScreen will show a warning until the binary is signed with an Authenticode certificate. Click More info → Run anyway."
                verifyFilename="claude-config.msi"
              />
            </TabsContent>
          </Tabs>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-3 text-sm">
          <a
            href={`${APP.releasesUrl}/tag/${APP.releaseTag}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors"
          >
            View all {APP.releaseTag} assets on GitHub
            <LuExternalLink className="size-3.5" />
          </a>
          <span className="text-text-muted">·</span>
          <span className="inline-flex items-center gap-1.5 text-text-secondary">
            <LuShieldCheck className="size-3.5 text-success" />
            SHA-256 checksums published per release
          </span>
        </Reveal>
      </div>
    </section>
  );
}

interface Step {
  title: string;
  body?: string;
  code?: string;
  lang?: string;
}

interface PrimaryCta {
  href: string;
  label: string;
  size: string;
  sha: string;
  icon: React.ReactNode;
}

interface DownloadPanelProps {
  title: string;
  subtitle: string;
  primaryCtas: PrimaryCta[];
  steps: Step[];
  note?: string;
  altLink?: { href: string; label: string };
  /** First CTA's SHA, used as a default for the verify-snippet. Pass explicitly only if you want to override. */
  verifyFilename?: string;
}

function DownloadPanel({
  title,
  subtitle,
  primaryCtas,
  steps,
  note,
  altLink,
  verifyFilename,
}: DownloadPanelProps) {
  const primarySha = primaryCtas[0]?.sha;

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-6 sm:p-8 h-full flex flex-col">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {primaryCtas.map((cta) => (
              <a key={cta.label} href={cta.href} className="inline-flex" download>
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  {cta.icon}
                  {cta.label}
                </Button>
              </a>
            ))}
          </div>

          {primaryCtas.map((cta) => (
            <dl
              key={cta.label}
              className="mt-4 grid grid-cols-2 gap-4 text-xs first:mt-5"
            >
              <div>
                <dt className="text-text-muted uppercase tracking-wider">Size</dt>
                <dd className="mt-1 font-mono text-text-primary">{cta.size}</dd>
              </div>
              <div>
                <dt className="text-text-muted uppercase tracking-wider">SHA-256</dt>
                <dd
                  className="mt-1 font-mono text-text-secondary truncate"
                  title={cta.sha}
                >
                  {cta.sha.slice(0, 12)}…
                </dd>
              </div>
            </dl>
          ))}

          {altLink && (
            <div className="mt-5 pt-5 border-t border-surface-border">
              <a
                href={altLink.href}
                download
                className="inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-hover transition-colors"
              >
                {altLink.label}
                <LuDownload className="size-3.5" />
              </a>
            </div>
          )}

          {note && (
            <p className="mt-4 text-xs text-text-muted leading-relaxed">{note}</p>
          )}
        </div>
      </div>

      <div className="lg:col-span-7">
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li
              key={i}
              className={cn(
                "rounded-2xl border border-surface-border bg-surface-elevated p-5 sm:p-6",
                "transition-colors hover:border-neutral-warm cursor-pointer"
              )}
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex shrink-0 size-7 items-center justify-center rounded-sm bg-brand/10 text-brand text-xs font-semibold cursor-default">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold tracking-tight text-text-primary">
                    {step.title}
                  </h4>
                  {step.body && (
                    <p className="mt-1 text-sm text-text-secondary">{step.body}</p>
                  )}
                  {step.code && (
                    <div className="mt-3">
                      <CodeBlock
                        code={step.code}
                        language={step.lang}
                      />
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>

        {primarySha && (
          <details className="mt-4 group">
            <summary className="cursor-pointer list-none text-xs text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1.5">
              <LuCheck className="size-3.5" />
              Verify the download
            </summary>
            <div className="mt-2">
              <CodeBlock
                code={`# Linux / macOS\nsha256sum ${verifyFilename ?? "claude-config.deb"}\n# expected: ${primarySha}`}
                language="bash"
                filename="sha256"
              />
            </div>
          </details>
        )}
      </div>
    </div>
  );
}