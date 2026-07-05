"use client";

import * as React from "react";
import Link from "next/link";
import { LuMenu, LuGithub, LuDownload } from "react-icons/lu";
import { APP, NAV_LINKS } from "@/lib/release";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { AnimatedLogo } from "@/components/ui/animated-logo";

export function Navbar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const activeId = useScrollSpy(
    NAV_LINKS.map((l) => l.href.replace("#", ""))
  );

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-surface-base/85 backdrop-blur-md border-b border-surface-border"
          : "bg-surface-base/0 border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <nav className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label={`${APP.name} home`}
          >
            <span className="transition-transform group-hover:scale-105">
              <AnimatedLogo size={32} />
            </span>
            <span className="text-base font-semibold tracking-tight">
              {APP.name}
            </span>
          </Link>

          {isDesktop && (
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeId === id;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex h-9 items-center px-3 rounded-sm text-sm font-medium transition-colors cursor-pointer",
                        isActive
                          ? "text-text-primary bg-surface-muted"
                          : "text-text-secondary hover:text-text-primary hover:bg-surface-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex items-center gap-2">
            <a
              href={APP.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${APP.name} on GitHub`}
              className="hidden sm:inline-flex items-center justify-center size-9 rounded-sm text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors cursor-pointer"
            >
              <LuGithub className="size-5" />
            </a>
            <Link href="#download" className="hidden sm:inline-flex">
              <Button size="sm">
                <LuDownload className="size-4" />
                Download
              </Button>
            </Link>
            {!isDesktop && (
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="inline-flex items-center justify-center size-9 rounded-sm text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors cursor-pointer"
              >
                <LuMenu className="size-5" />
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen} side="right">
        <SheetHeader onClose={() => setMobileOpen(false)}>
          <div className="flex items-center gap-2">
            <AnimatedLogo size={24} />
            <span className="text-sm font-semibold">{APP.name}</span>
          </div>
        </SheetHeader>
        <SheetContent>
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center h-11 px-3 rounded-sm text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4 pt-4 border-t border-surface-border flex flex-col gap-2">
              <Link href="#download" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">
                  <LuDownload className="size-4" />
                  Download
                </Button>
              </Link>
              <a
                href={APP.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-sm text-sm font-medium bg-surface-elevated text-text-primary border border-surface-border hover:bg-surface-muted cursor-pointer"
              >
                <LuGithub className="size-4" />
                Star on GitHub
              </a>
            </li>
          </ul>
        </SheetContent>
      </Sheet>
    </header>
  );
}