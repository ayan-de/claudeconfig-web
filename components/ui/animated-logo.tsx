"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  /** Pixel size for both dimensions. */
  size?: number;
  /** Use a square aspect (default) or a wider frame. */
  rounded?: boolean;
  className?: string;
  /** Optional alt text — falls back to a sensible default. */
  alt?: string;
  /** Force-show the static fallback (no video). */
  staticOnly?: boolean;
  /** Pause the video after this many seconds. Useful for hero previews where it should loop briefly. */
  loop?: boolean;
}

/**
 * Renders the animated app logo (`/animate.mp4`) with the static PNG as a
 * poster + fallback. Browsers without autoplay support, or in reduced-motion
 * environments, fall back to the static image.
 */
export function AnimatedLogo({
  size = 32,
  rounded = true,
  className,
  alt = "Claude Config animated logo",
  staticOnly = false,
  loop = true,
}: AnimatedLogoProps) {
  const [canPlay, setCanPlay] = React.useState(false);
  const [videoFailed, setVideoFailed] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (staticOnly || reduceMotion) return;
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setCanPlay(true);
    v.addEventListener("canplay", onReady);
    v.addEventListener("error", () => setVideoFailed(true));
    // Try to play (autoplay may be blocked — we still show the poster)
    v.play().catch(() => setVideoFailed(true));
    return () => {
      v.removeEventListener("canplay", onReady);
    };
  }, [staticOnly, reduceMotion]);

  const showVideo = !staticOnly && !reduceMotion && !videoFailed && canPlay;

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden bg-surface-muted border border-surface-border",
        rounded ? "rounded-sm" : "rounded-none",
        className
      )}
      style={{ width: size, height: size }}
    >
      {/* Static poster (always rendered behind video) */}
      <Image
        src="/logo.png"
        alt=""
        width={size}
        height={size}
        className={cn(
          "object-contain transition-opacity duration-300",
          showVideo ? "opacity-0" : "opacity-100"
        )}
        priority={size >= 48}
        aria-hidden={showVideo}
      />

      {/* Video layer — only when we know it can play */}
      {!staticOnly && !reduceMotion && (
        <video
          ref={videoRef}
          src="/animate.mp4"
          muted
          loop={loop}
          playsInline
          autoPlay
          preload="metadata"
          aria-label={alt}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            showVideo ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </span>
  );
}

/** Tiny SSR-safe reduced-motion reader (avoids pulling in framer-motion here). */
function useReducedMotion(): boolean {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduce;
}