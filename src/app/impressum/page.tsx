import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT } from "@/data/event";

export const metadata = { title: "Impressum" };

export default function Impressum() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Impressum</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
          Angaben gemäß § 5 TMG
        </h1>

        <div className="space-y-6 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="font-semibold text-on-surface">Veranstalterin</h2>
            <p>{CONTACT.operator.name}</p>
            <p>{CONTACT.operator.street}</p>
            <p>{CONTACT.operator.city}</p>
          </section>

          <section>
            <h2 className="font-semibold text-on-surface">Kontakt</h2>
            <p>E-Mail: <a className="text-primary hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            <p>Telefon: {CONTACT.phone}</p>
          </section>

          <section>
            <h2 className="font-semibold text-on-surface">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>Siehe Veranstalterin.</p>
          </section>

          <section>
            <h2 className="font-semibold text-on-surface">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-on-surface">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiberinnen erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung.
            </p>
          </section>

          <p className="text-xs italic pt-4">
            Dieses Impressum ist ein Entwurf. Vor dem Live-Gang bitte durch den/die Veranstalter:in auf Vollständigkeit und rechtliche Richtigkeit prüfen.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
