/**
 * Single source of truth for app-level constants.
 * Update VERSION to bump the entire site.
 */
export const APP = {
  name: "Claude Config",
  tagline: "Switch Claude Code providers in one click.",
  description:
    "Cross-platform desktop app for managing Claude Code provider profiles. Switch between Anthropic, GLM, Kimi, DeepSeek, Minimax, self-hosted, or any OpenAI-compatible provider — without hand-editing settings.json.",
  version: "0.5.8",
  releaseTag: "v0.5.8",
  repoUrl: "https://github.com/ayan-de/claude-config",
  releasesUrl: "https://github.com/ayan-de/claude-config/releases",
  issuesUrl: "https://github.com/ayan-de/claude-config/issues",
  license: "MIT",
} as const;

export const RELEASE_BASE_URL = `${APP.releasesUrl}/download/${APP.releaseTag}`;

/**
 * Asset paths for the v0.5.8 release. These are only the OFFLINE FALLBACK —
 * scripts/sync-release.ts overrides them at build time from the live
 * GitHub Releases API. Keep them roughly current so a rate-limited or
 * offline build still shows a sane, recent version.
 */
export const DOWNLOADS = {
  linux: {
    deb: `${RELEASE_BASE_URL}/Claude.Config_0.5.8_amd64.deb`,
    rpm: `${RELEASE_BASE_URL}/Claude.Config-0.5.8-1.x86_64.rpm`,
    appimage: `${RELEASE_BASE_URL}/Claude.Config_0.5.8_amd64.AppImage`,
  },
  mac: {
    dmg: `${RELEASE_BASE_URL}/Claude.Config_0.5.8_universal.dmg`,
    appTar: `${RELEASE_BASE_URL}/Claude.Config_universal.app.tar.gz`,
  },
  windows: {
    msi: `${RELEASE_BASE_URL}/Claude.Config_0.5.8_x64_en-US.msi`,
    exe: `${RELEASE_BASE_URL}/Claude.Config_0.5.8_x64-setup.exe`,
  },
} as const;

/** SHA-256 checksums for the v0.5.8 release (from the API `digest` field). */
export const CHECKSUMS = {
  deb: "2d5cb82c3bffdfba9a51535a7a57dd88cc0349ff53260f4b0b616b9fb1bc25cd",
  rpm: "74dc919b7437440e8613884b7bd0bea9ac82c4b4f2303ca6518c7c6d174f2f1e",
  appimage: "209889ac9b680962fbe6396aec63f1c0b7ec8bcebdc9fe346ff15a0a657f7bec",
  dmg: "da759cefdd881617923c69615ed0449a5cbc1e2ce6ace62367171460399caaee",
  exe: "3d523fe51c2af97bb714ece50b39040aca2cde6b44745db0338a41115110b559",
  msi: "64a92ac207ea21e3908a1f48938ab8d87e8b32199b25bd7b0c0bd717463e3867",
  appTar: "2fbd784b70d209b2816f687c49339ba31c8f41021f70f284bcd105dfe7d3a2e3",
} as const;

export const SIZES = {
  deb: "8.05 MB",
  rpm: "8.05 MB",
  appimage: "81.65 MB",
  dmg: "15.36 MB",
  exe: "5.04 MB",
  msi: "6.52 MB",
  appTar: "14.47 MB",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#download", label: "Download" },
  { href: "#install", label: "Install" },
  { href: "#architecture", label: "How it works" },
] as const;

export type Platform = "mac" | "windows" | "linux" | "unknown";
export type LinuxDistro = "deb" | "rpm" | "appimage" | "unknown";