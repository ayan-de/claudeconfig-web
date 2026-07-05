/**
 * Single source of truth for app-level constants.
 * Update VERSION to bump the entire site.
 */
export const APP = {
  name: "Claude Config",
  tagline: "Switch Claude Code providers in one click.",
  description:
    "Cross-platform desktop app for managing Claude Code provider profiles. Switch between Anthropic, GLM, Kimi, DeepSeek, Minimax, self-hosted, or any OpenAI-compatible provider — without hand-editing settings.json.",
  version: "0.1.3",
  releaseTag: "v0.1.3",
  repoUrl: "https://github.com/ayan-de/claude-config",
  releasesUrl: "https://github.com/ayan-de/claude-config/releases",
  issuesUrl: "https://github.com/ayan-de/claude-config/issues",
  license: "MIT",
} as const;

export const RELEASE_BASE_URL = `${APP.releasesUrl}/download/${APP.releaseTag}`;

/** Asset paths for v0.1.3 release. */
export const DOWNLOADS = {
  linux: {
    deb: `${RELEASE_BASE_URL}/Claude.Config_0.1.3_amd64.deb`,
    rpm: `${RELEASE_BASE_URL}/Claude.Config-0.1.3-1.x86_64.rpm`,
    appimage: `${RELEASE_BASE_URL}/Claude.Config_0.1.3_amd64.AppImage`,
  },
  mac: {
    dmg: `${RELEASE_BASE_URL}/Claude.Config_0.1.3_universal.dmg`,
    appTar: `${RELEASE_BASE_URL}/Claude.Config_universal.app.tar.gz`,
  },
  windows: {
    msi: `${RELEASE_BASE_URL}/Claude.Config_0.1.3_x64_en-US.msi`,
    exe: `${RELEASE_BASE_URL}/Claude.Config_0.1.3_x64-setup.exe`,
  },
} as const;

/** SHA-256 checksums published in the v0.1.3 release. */
export const CHECKSUMS = {
  deb: "1fbd8a5544ec456a4775d0c0b2d8b0c7094bc960d7a411c99a628fe9b19afa0a",
  rpm: "dede7ccdc55a2098608151ec2a0bdf539303b83675064f09a166a5b37fa5a730",
  appimage: "3ed085d11624bb16c041f162b4b57c4c04190e8ccdd1e0e3cde21066ce623669",
  dmg: "45dd3f85f9051229ca482cb772ff35c15f31c1bf0aff23a1d0dce974aded2070",
  exe: "6547f10bbbeaab67b966ffc74a0cd4453c978ddc771cf9abfe2aeef09b756c8d",
  msi: "032e0dda3f99ad678ef2d21a0f0115fbc9283e18cf149a742b62657ec2782507",
  appTar: "e7fc32e24310485e3802da129e8fe5795ec325b468e029c6081b4f7c56534bf1",
} as const;

export const SIZES = {
  deb: "5.27 MB",
  rpm: "5.27 MB",
  appimage: "79 MB",
  dmg: "10 MB",
  exe: "2.87 MB",
  msi: "3.99 MB",
  appTar: "8.9 MB",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#download", label: "Download" },
  { href: "#install", label: "Install" },
  { href: "#architecture", label: "How it works" },
] as const;

export type Platform = "mac" | "windows" | "linux" | "unknown";
export type LinuxDistro = "deb" | "rpm" | "appimage" | "unknown";