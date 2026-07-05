"use client";

import * as React from "react";
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

const PLATFORM_LABEL: Record<Platform, string> = {
  mac: "macOS",
  windows: "Windows",
  linux: "Linux",
  unknown: "your platform",
};

const DEFAULT_TAB: Record<Platform, string> = {
  mac: "mac",
  windows: "windows",
  linux: "linux-deb",
  unknown: "linux-deb",
};

export function Download() {
  const { platform, isAppleSilicon } = useOSTracker();
  const initialTab = platform ? DEFAULT_TAB[platform] : "linux-deb";
  const [tab, setTab] = React.useState(initialTab);

  React.useEffect(() => {
    if (platform) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTab(DEFAULT_TAB[platform]);
    }
  }, [platform]);

  const recommendedLabel = platform
    ? `Recommended for ${PLATFORM_LABEL[platform]}`
    : "Pick your platform";

  return (
    <section id="download" className="py-24 sm:py-32 bg-surface-muted">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
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

        <Reveal delay={0.1} className="mt-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex size-2 rounded-full bg-success animate-pulse" />
            <span className="text-text-secondary">{recommendedLabel}</span>
          </div>

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
                primaryCta={{
                  href: DOWNLOADS.linux.deb,
                  label: "Download .deb",
                  size: SIZES.deb,
                  icon: <LuDownload className="size-5" />,
                }}
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
                sha={CHECKSUMS.deb}
              />
            </TabsContent>

            {/* Fedora / RHEL */}
            <TabsContent value="linux-rpm">
              <DownloadPanel
                title="Fedora, RHEL, openSUSE"
                subtitle="Use dnf or rpm to install."
                primaryCta={{
                  href: DOWNLOADS.linux.rpm,
                  label: "Download .rpm",
                  size: SIZES.rpm,
                  icon: <LuDownload className="size-5" />,
                }}
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
                sha={CHECKSUMS.rpm}
              />
            </TabsContent>

            {/* AppImage */}
            <TabsContent value="linux-appimage">
              <DownloadPanel
                title="Arch, Manjaro, or any distro"
                subtitle="The .AppImage runs anywhere — no install step."
                primaryCta={{
                  href: DOWNLOADS.linux.appimage,
                  label: "Download .AppImage",
                  size: SIZES.appimage,
                  icon: <LuDownload className="size-5" />,
                }}
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
                sha={CHECKSUMS.appimage}
              />
            </TabsContent>

            {/* macOS */}
            <TabsContent value="mac">
              <DownloadPanel
                title={isAppleSilicon ? "Apple Silicon (M-series)" : "macOS"}
                subtitle="Universal binary — works on Intel and Apple Silicon."
                primaryCta={{
                  href: DOWNLOADS.mac.dmg,
                  label: "Download .dmg",
                  size: SIZES.dmg,
                  icon: <LuDownload className="size-5" />,
                }}
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
                sha={CHECKSUMS.dmg}
              />
            </TabsContent>

            {/* Windows */}
            <TabsContent value="windows">
              <DownloadPanel
                title="Windows 10 / 11"
                subtitle="Pick the installer you prefer."
                primaryCta={{
                  href: DOWNLOADS.windows.msi,
                  label: "Download .msi",
                  size: SIZES.msi,
                  icon: <LuDownload className="size-5" />,
                }}
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
                altLink={{
                  href: DOWNLOADS.windows.exe,
                  label: "Prefer .exe (NSIS)?",
                }}
                note="SmartScreen will show a warning until the binary is signed with an Authenticode certificate. Click More info → Run anyway."
                sha={CHECKSUMS.msi}
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

interface DownloadPanelProps {
  title: string;
  subtitle: string;
  primaryCta: {
    href: string;
    label: string;
    size: string;
    icon: React.ReactNode;
  };
  steps: Step[];
  note?: string;
  altLink?: { href: string; label: string };
  sha?: string;
}

function DownloadPanel({
  title,
  subtitle,
  primaryCta,
  steps,
  note,
  altLink,
  sha,
}: DownloadPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-6 sm:p-8 h-full flex flex-col">
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-text-secondary">{subtitle}</p>

          <a
            href={primaryCta.href}
            className="mt-6 inline-flex"
            download
          >
            <Button size="lg" className="w-full sm:w-auto">
              {primaryCta.icon}
              {primaryCta.label}
            </Button>
          </a>

          <dl className="mt-5 grid grid-cols-2 gap-4 text-xs">
            <div>
              <dt className="text-text-muted uppercase tracking-wider">Size</dt>
              <dd className="mt-1 font-mono text-text-primary">{primaryCta.size}</dd>
            </div>
            <div>
              <dt className="text-text-muted uppercase tracking-wider">SHA-256</dt>
              <dd
                className="mt-1 font-mono text-text-secondary truncate"
                title={sha}
              >
                {sha?.slice(0, 12)}…
              </dd>
            </div>
          </dl>

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

        {sha && (
          <details className="mt-4 group">
            <summary className="cursor-pointer list-none text-xs text-text-muted hover:text-text-primary transition-colors inline-flex items-center gap-1.5">
              <LuCheck className="size-3.5" />
              Verify the download
            </summary>
            <div className="mt-2">
              <CodeBlock
                code={`# Linux\nsha256sum claude-config.deb\n# expected: ${sha}`}
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