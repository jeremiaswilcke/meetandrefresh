import Link from "next/link";
import { Logo } from "./logo";
import { CONTACT, EVENT } from "@/data/event";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-outline-variant/30 bg-surface-container-low">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="text-2xl" />
          <p className="mt-4 text-sm text-on-surface-variant max-w-sm leading-relaxed">
            {EVENT.tagline} Jedes Jahr im September im Schwarzwald. Kein Programm-Marathon — sondern Raum zum Atemholen mit Gott.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
            Konferenz
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/programm" className="hover:text-primary">Programm</Link></li>
            <li><Link href="/referentinnen" className="hover:text-primary">Referentinnen</Link></li>
            <li><Link href="/galerie" className="hover:text-primary">Galerie</Link></li>
            <li><Link href="/buchung" className="hover:text-primary">Anmelden</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-3">
            Kontakt
          </p>
          <ul className="space-y-2 text-sm">
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-primary">{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-primary">{CONTACT.phone}</a></li>
            <li><Link href="/impressum" className="hover:text-primary">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-primary">Datenschutz</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-outline-variant/30">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-on-surface-variant">
          <p>© {new Date().getFullYear()} Meet & Refresh — Jahreskonferenz für christliche Frauen</p>
          <p className="italic">„Kommt her zu mir, die ihr mühselig und beladen seid." (Mt 11,28)</p>
        </div>
      </div>
    </footer>
  );
}
