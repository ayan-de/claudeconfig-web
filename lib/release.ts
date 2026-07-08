/**
 * lib/release.ts
 * ---------------
 * Public-facing release info. Prefers env vars injected by
 * scripts/sync-release.ts (NEXT_PUBLIC_RELEASE_*); falls back to the
 * hardcoded values in lib/constants.ts when env vars are unset
 * (offline build, dev mode without sync).
 *
 * Anything dynamic — version, tag, download URLs, sizes — flows through
 * this module. Never import DOWNLOADS / CHECKSUMS / SIZES directly.
 */

import {
  APP as FALLBACK_APP,
  CHECKSUMS as FALLBACK_CHECKSUMS,
  DOWNLOADS as FALLBACK_DOWNLOADS,
  RELEASE_BASE_URL as FALLBACK_RELEASE_BASE,
  SIZES as FALLBACK_SIZES,
} from "./constants";

function env(key: string): string | undefined {
  const v = process.env[key];
  return v && v.length > 0 ? v : undefined;
}

/** Pick the first non-empty value among env / fallback. */
function pick(envKey: string, fallback: string): string {
  return env(envKey) ?? fallback;
}

export const APP = {
  name: "Claude Config",
  tagline: "Switch Claude Code providers in one click.",
  description:
    "Cross-platform desktop app for managing Claude Code provider profiles. Switch between Anthropic, GLM, Kimi, DeepSeek, Minimax, self-hosted, or any OpenAI-compatible provider — without hand-editing settings.json.",
  version: pick("NEXT_PUBLIC_APP_VERSION", FALLBACK_APP.version),
  releaseTag: pick("NEXT_PUBLIC_RELEASE_TAG", FALLBACK_APP.releaseTag),
  repoUrl: FALLBACK_APP.repoUrl,
  releasesUrl: pick("NEXT_PUBLIC_RELEASES_URL", FALLBACK_APP.releasesUrl),
  releaseUrl: pick("NEXT_PUBLIC_RELEASE_URL", `${FALLBACK_APP.releasesUrl}/tag/${FALLBACK_APP.releaseTag}`),
  issuesUrl: FALLBACK_APP.issuesUrl,
  license: FALLBACK_APP.license,
} as const;

/** Base URL for the current release's asset downloads. */
const RELEASE_BASE = pick("NEXT_PUBLIC_RELEASE_URL", FALLBACK_RELEASE_BASE);

export const DOWNLOADS = {
  linux: {
    deb: pick("NEXT_PUBLIC_DOWNLOAD_DEB", FALLBACK_DOWNLOADS.linux.deb),
    rpm: pick("NEXT_PUBLIC_DOWNLOAD_RPM", FALLBACK_DOWNLOADS.linux.rpm),
    appimage: pick("NEXT_PUBLIC_DOWNLOAD_APPIMAGE", FALLBACK_DOWNLOADS.linux.appimage),
  },
  mac: {
    dmg: pick("NEXT_PUBLIC_DOWNLOAD_DMG", FALLBACK_DOWNLOADS.mac.dmg),
    appTar: pick("NEXT_PUBLIC_DOWNLOAD_APP_TAR", FALLBACK_DOWNLOADS.mac.appTar),
  },
  windows: {
    msi: pick("NEXT_PUBLIC_DOWNLOAD_MSI", FALLBACK_DOWNLOADS.windows.msi),
    exe: pick("NEXT_PUBLIC_DOWNLOAD_EXE", FALLBACK_DOWNLOADS.windows.exe),
  },
  /** Convenience for components that just need a single base URL. */
  _base: RELEASE_BASE,
} as const;

/**
 * File sizes — string format ("5.27 MB") suitable for direct display.
 * GitHub Releases API provides byte counts; the sync script converts.
 */
export const SIZES = {
  deb: pick("NEXT_PUBLIC_SIZE_DEB", FALLBACK_SIZES.deb),
  rpm: pick("NEXT_PUBLIC_SIZE_RPM", FALLBACK_SIZES.rpm),
  appimage: pick("NEXT_PUBLIC_SIZE_APPIMAGE", FALLBACK_SIZES.appimage),
  dmg: pick("NEXT_PUBLIC_SIZE_DMG", FALLBACK_SIZES.dmg),
  msi: pick("NEXT_PUBLIC_SIZE_MSI", FALLBACK_SIZES.msi),
  exe: pick("NEXT_PUBLIC_SIZE_EXE", FALLBACK_SIZES.exe),
  appTar: pick("NEXT_PUBLIC_SIZE_APP_TAR", FALLBACK_SIZES.appTar),
} as const;

/**
 * SHA-256 checksums. The GitHub Releases API exposes these per asset via the
 * `digest` field ("sha256:…"); scripts/sync-release.ts reads it and injects
 * NEXT_PUBLIC_SHA_* env vars. Falls back to constants.ts when unset.
 */
export const CHECKSUMS = {
  deb: pick("NEXT_PUBLIC_SHA_DEB", FALLBACK_CHECKSUMS.deb),
  rpm: pick("NEXT_PUBLIC_SHA_RPM", FALLBACK_CHECKSUMS.rpm),
  appimage: pick("NEXT_PUBLIC_SHA_APPIMAGE", FALLBACK_CHECKSUMS.appimage),
  dmg: pick("NEXT_PUBLIC_SHA_DMG", FALLBACK_CHECKSUMS.dmg),
  msi: pick("NEXT_PUBLIC_SHA_MSI", FALLBACK_CHECKSUMS.msi),
  exe: pick("NEXT_PUBLIC_SHA_EXE", FALLBACK_CHECKSUMS.exe),
  appTar: pick("NEXT_PUBLIC_SHA_APP_TAR", FALLBACK_CHECKSUMS.appTar),
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#download", label: "Download" },
  { href: "#install", label: "Install" },
  { href: "#architecture", label: "How it works" },
] as const;

export type Platform = "mac" | "windows" | "linux" | "unknown";
export type LinuxDistro = "deb" | "rpm" | "appimage" | "unknown";

/** Returns true if release info came from env vars (live sync) vs fallback. */
export const IS_LIVE_RELEASE =
  env("NEXT_PUBLIC_APP_VERSION") !== undefined &&
  env("NEXT_PUBLIC_RELEASE_TAG") !== undefined;