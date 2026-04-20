import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { CONTACT, EVENT } from "@/data/event";

export const metadata = { title: "Kontakt" };

export default function Kontakt() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Kontakt</p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Schreib uns.<br />
          <span className="text-primary">Wir antworten persönlich.</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Bei Fragen zur Anmeldung, zum Programm oder wenn du unsicher bist, ob das hier für dich passt — melde dich einfach.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <a
            href={`mailto:${CONTACT.email}`}
            className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow hover:bg-surface-container-low transition-colors block"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MaterialIcon name="mail" size={24} className="text-primary" filled />
            </div>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Per E-Mail</p>
            <p className="font-semibold">{CONTACT.email}</p>
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
            className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow hover:bg-surface-container-low transition-colors block"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MaterialIcon name="call" size={24} className="text-primary" filled />
            </div>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Telefon</p>
            <p className="font-semibold">{CONTACT.phone}</p>
            <p className="text-xs text-on-surface-variant mt-1">Mo–Fr · Nachmittag</p>
          </a>

          <div className="md:col-span-2 bg-gradient-to-br from-primary-fixed/40 to-secondary-fixed/40 rounded-2xl p-8">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Tagungsort</p>
            <h3 className="text-2xl font-bold mb-2">{EVENT.location.name}</h3>
            <p className="text-on-surface-variant">{EVENT.location.address}</p>
            <p className="mt-4 text-sm text-on-surface-variant">
              Anfahrtsbeschreibung und Zimmerinfos bekommst du mit der Buchungsbestätigung.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
