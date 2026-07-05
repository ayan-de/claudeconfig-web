"use client";

import { useSyncExternalStore } from "react";
import type { Platform } from "@/lib/constants";

/**
 * Detects the user's OS from `navigator.userAgent` using useSyncExternalStore.
 * Returns `null` on the server / first client render to avoid hydration mismatch,
 * then hydrates on mount.
 */
function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)) return "mac";
  if (/Windows/i.test(ua)) return "windows";
  if (/Linux|X11|CrOS|Android/i.test(ua)) return "linux";
  return "unknown";
}

function detectAppleSilicon(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl || !("getExtension" in gl)) return false;
    const debugInfo = (
      gl as WebGLRenderingContext
    ).getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return false;
    const renderer = (
      gl as WebGLRenderingContext
    ).getParameter(
      (debugInfo as WEBGL_debug_renderer_info).UNMASKED_RENDERER_WEBGL
    );
    return typeof renderer === "string" && /Apple M\d/i.test(renderer);
  } catch {
    return false;
  }
}

// Server snapshot (deterministic, used during SSR + first client render)
const SERVER_SNAPSHOT: Platform | null = null;
const SERVER_APPLE_SILICON = false;

// Client snapshots — read once on mount and cached
let cachedPlatform: Platform | null = null;
let cachedAppleSilicon = false;

function subscribePlatform(callback: () => void) {
  cachedPlatform = detectPlatform();
  cachedAppleSilicon = detectAppleSilicon();
  callback();
  // No external event to unsubscribe from — values are read once.
  return () => {};
}

function getPlatformSnapshot(): Platform | null {
  return cachedPlatform ?? SERVER_SNAPSHOT;
}

function getAppleSiliconSnapshot(): boolean {
  return cachedAppleSilicon;
}

export function useOSTracker() {
  const platform = useSyncExternalStore(
    subscribePlatform,
    getPlatformSnapshot,
    () => SERVER_SNAPSHOT
  );
  const isAppleSilicon = useSyncExternalStore(
    subscribePlatform,
    getAppleSiliconSnapshot,
    () => SERVER_APPLE_SILICON
  );
  return { platform, isAppleSilicon };
}