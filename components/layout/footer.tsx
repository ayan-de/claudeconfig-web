import Image from "next/image";
import Link from "next/link";
import { LuGithub, LuStar, LuArrowUpRight } from "react-icons/lu";
import { APP, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-surface-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="inline-flex size-8 items-center justify-center rounded-sm bg-surface-elevated border border-surface-border overflow-hidden">
                <Image
                  src="/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </span>
              <span className="text-base font-semibold tracking-tight">
                {APP.name}
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-sm">
              {APP.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a
                href={APP.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 px-4 rounded-sm bg-text-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <LuGithub className="size-4" />
                View source
              </a>
              <a
                href={`${APP.repoUrl}/releases`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 px-4 rounded-sm bg-surface-elevated text-text-primary border border-surface-border text-sm font-medium hover:bg-surface-base transition-colors"
              >
                <LuStar className="size-4" />
                Star
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Site
            </h4>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Resources
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={APP.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  GitHub repository
                  <LuArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`${APP.repoUrl}/releases/latest`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Releases
                  <LuArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={APP.issuesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Report an issue
                  <LuArrowUpRight className="size-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`${APP.repoUrl}/blob/main/README.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  README
                  <LuArrowUpRight className="size-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {APP.name}. Licensed under {APP.license}.
          </p>
          <p className="text-xs text-text-muted font-mono">
            v{APP.version} ·{" "}
            <a
              href={`${APP.repoUrl}/releases/tag/${APP.releaseTag}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
            >
              {APP.releaseTag}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}