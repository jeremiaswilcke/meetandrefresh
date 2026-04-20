import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT } from "@/data/event";

export const metadata = { title: "Datenschutz" };

export default function Datenschutz() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Datenschutz</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          So gehen wir mit deinen Daten um.
        </h1>
        <p className="text-on-surface-variant">Stand: {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long" })}</p>

        <div className="mt-10 space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="text-on-surface font-semibold text-xl mb-2">Kurz vorab</h2>
            <p>Wir erheben so wenige Daten wie möglich. Keine Werbe-Tracker, keine Cookies fürs Profiling. Was wir speichern, brauchen wir für die Konferenz-Organisation.</p>
          </section>

          <section>
            <h2 className="text-on-surface font-semibold text-xl mb-2">Verantwortliche</h2>
            <p>{CONTACT.operator.name}<br />{CONTACT.operator.street}<br />{CONTACT.operator.city}</p>
            <p className="mt-2">E-Mail: <a className="text-primary hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          </section>

          <section>
            <h2 className="text-on-surface font-semibold text-xl mb-2">Welche Daten wir erheben</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Anmeldung:</strong> Name, E-Mail-Adresse, Zimmer- und Workshop-Wahl, ggf. Allergien oder Hinweise.</li>
              <li><strong>Teilnehmerbereich:</strong> E-Mail und Passwort (gehasht) für den Login.</li>
              <li><strong>Server-Logs:</strong> Unsere Hosting-Provider (Vercel, Supabase) protokollieren technisch notwendige Zugriffsdaten.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-on-surface font-semibold text-xl mb-2">Wofür wir die Daten nutzen</h2>
            <p>Ausschließlich zur Vorbereitung und Durchführung der Konferenz: Platzvergabe, Zimmerplanung, Küchen-Briefing, Nachrichten an Teilnehmerinnen. Keine Weitergabe an Dritte, keine Werbung.</p>
          </section>

          <section>
            <h2 className="text-on-surface font-semibold text-xl mb-2">Wie lange wir speichern</h2>
            <p>Anmeldedaten bis 6 Monate nach der Konferenz — dann werden sie gelöscht oder anonymisiert. Rechnungsrelevante Daten werden gemäß gesetzlicher Aufbewahrungsfristen (10 Jahre) archiviert.</p>
          </section>

          <section>
            <h2 className="text-on-surface font-semibold text-xl mb-2">Deine Rechte</h2>
            <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch. Schreib uns einfach eine Mail.</p>
          </section>

          <p className="text-xs italic pt-4">
            Dieser Text ist ein Entwurf. Vor dem Live-Gang bitte durch Fachkundige prüfen lassen — besonders wenn Zahlung oder weitere Tools dazukommen.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
