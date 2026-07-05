"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copy a string to the clipboard with transient "copied" state.
 * Falls back to a hidden textarea + execCommand when navigator.clipboard
 * is unavailable (insecure context / very old browsers).
 */
export function useCopyToClipboard(timeout = 1800) {
  const [isCopied, setIsCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        ta.style.pointerEvents = "none";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setIsCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsCopied(false), timeout);
      return true;
    } catch {
      setIsCopied(false);
      return false;
    }
  }, [timeout]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { isCopied, copy };
}