"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { MaterialIcon } from "./material-icon";

const NAV = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/programm", label: "Programm" },
  { href: "/referentinnen", label: "Referentinnen" },
  { href: "/galerie", label: "Galerie" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/86 border-b border-outline-variant/40">
      <div className="w-full px-6 py-3 flex items-center justify-between lg:px-10">
        <Link href="/" className="flex items-center" aria-label="Meet & Refresh — Startseite">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-on-surface-variant">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className="text-sm text-on-surface-variant hover:text-primary transition-colors px-3 py-2"
          >
            Mein Bereich
          </Link>
          <Link
            href="/buchung"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-xl text-sm font-extrabold hover:bg-primary-container transition-colors"
          >
            Jetzt anmelden
            <MaterialIcon name="arrow_forward" size={16} />
          </Link>
        </div>

        <button
          className="md:hidden w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <MaterialIcon name={open ? "close" : "menu"} size={24} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-outline-variant/30 bg-surface-container-lowest">
          <div className="w-full px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-on-surface hover:bg-surface-container transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-outline-variant/40 my-2" />
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-on-surface-variant"
            >
              Mein Bereich
            </Link>
            <Link
              href="/buchung"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-xl text-sm font-extrabold"
            >
              Jetzt anmelden
              <MaterialIcon name="arrow_forward" size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
