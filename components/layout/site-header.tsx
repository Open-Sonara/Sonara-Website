"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { SonaraWordmark } from "@/components/brand/sonara-mark";
import { GitHubIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button";
import type { NavLink } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface Props {
  nav: NavLink[];
  github: NavLink;
  getStarted: NavLink;
  stars: number | null;
}

function NavAnchor({ link, className, onNavigate }: { link: NavLink; className?: string; onNavigate?: () => void }) {
  if (link.external) {
    return (
      <a href={link.href} rel="noopener" className={className} onClick={onNavigate}>
        {link.label}
        <ArrowUpRight className="size-3.5 opacity-60" aria-hidden="true" />
        <span className="sr-only"> (opens on GitHub)</span>
      </a>
    );
  }
  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}

export function SiteHeader({ nav, github, getStarted, stars }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer when the route changes.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled ? "border-line bg-ground/95" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="-m-1 rounded-lg p-1" aria-label="Sonara home">
          <SonaraWordmark />
        </Link>

        <nav aria-label="Primary" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((link) => (
              <li key={link.label}>
                <NavAnchor
                  link={link}
                  className={cn(
                    "inline-flex h-9 items-center gap-1 rounded-full px-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-raised hover:text-ink",
                    !link.external && pathname === link.href && "text-ink",
                  )}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={github.href}
            rel="noopener"
            className="hidden h-10 items-center gap-2 rounded-full border border-line px-3.5 text-[0.9375rem] text-ink-2 transition-colors hover:border-line-strong hover:text-ink sm:inline-flex"
          >
            <GitHubIcon className="size-4" />
            GitHub
            {stars !== null && stars > 0 && (
              <span className="tabular rounded-full bg-raised px-1.5 text-xs text-ink">{stars.toLocaleString("en")}</span>
            )}
          </a>
          <ButtonLink href={getStarted.href} className="hidden sm:inline-flex">
            {getStarted.label}
          </ButtonLink>
          <button
            type="button"
            onClick={open}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-haspopup="dialog"
            aria-controls="mobile-nav"
          >
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      <dialog
        id="mobile-nav"
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100vw)] max-w-none bg-ground-2 p-0 text-ink backdrop:bg-ground/70 open:flex open:flex-col"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <SonaraWordmark />
          <button
            type="button"
            onClick={close}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Close menu</span>
          </button>
        </div>
        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="flex flex-col">
            {[...nav, github].map((link) => (
              <li key={link.label}>
                <NavAnchor
                  link={link}
                  onNavigate={close}
                  className="flex min-h-14 flex-wrap items-center gap-x-1.5 rounded-xl px-3 py-2 text-lg font-medium hover:bg-raised"
                />
                {link.hint && <p className="-mt-2 px-3 pb-2 text-sm text-ink-3">{link.hint}</p>}
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-line p-4">
          <ButtonLink href={getStarted.href} size="lg" className="w-full" onClick={close}>
            {getStarted.label}
          </ButtonLink>
        </div>
      </dialog>
    </header>
  );
}
