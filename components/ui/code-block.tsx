"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LuCopy, LuCheck } from "react-icons/lu";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showCopy?: boolean;
}

/**
 * A polished code block with optional filename header and copy button.
 * Renders <pre><code> with tokenised command lines (comment / command / flag).
 */
export function CodeBlock({
  code,
  language = "bash",
  filename,
  className,
  showCopy = true,
}: CodeBlockProps) {
  const { isCopied, copy } = useCopyToClipboard();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-surface-border bg-code-bg text-code-fg",
        className
      )}
    >
      {filename && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="text-xs font-mono text-white/60">{filename}</span>
          <span className="text-[10px] uppercase tracking-wider text-white/40">
            {language}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
      {showCopy && (
        <button
          onClick={() => copy(code)}
          aria-label={isCopied ? "Copied" : "Copy code"}
          className={cn(
            "absolute top-3 right-3 inline-flex items-center justify-center size-8 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors",
            (filename ? "top-12" : "top-3")
          )}
        >
          {isCopied ? <LuCheck className="size-4" /> : <LuCopy className="size-4" />}
        </button>
      )}
    </div>
  );
}