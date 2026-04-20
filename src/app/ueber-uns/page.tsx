import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { EVENT } from "@/data/event";

export const metadata = { title: "Über uns" };

export default function UeberUns() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Über uns</p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Eine Handvoll Frauen<br />
          <span className="text-primary">mit einer Einladung.</span>
        </h1>

        <div className="mt-10 prose prose-lg max-w-none text-on-surface-variant leading-relaxed">
          <p className="text-lg">
            Meet & Refresh ist aus einer einfachen Sehnsucht entstanden: ein Ort, an dem Frauen zur Ruhe kommen, ehrliche Lehre hören und sich nicht verstellen müssen. Kein Hochglanz-Event, sondern ein Wochenende, das nachwirkt.
          </p>
          <p>
            Wir sind ein ehrenamtliches Team aus verschiedenen Gemeinden. Keine Dienstleister, keine Marketing-Agentur — wir organisieren diese Konferenz, weil wir selbst gemerkt haben, wie sehr sie gebraucht wird. Die Einnahmen gehen komplett in Haus, Verpflegung und Honorare der Referentinnen. Überschüsse fließen ins nächste Jahr.
          </p>
          <p>
            Theologisch stehen wir im evangelikal-freikirchlichen Bereich, arbeiten aber bewusst mit Referentinnen aus unterschiedlichen Traditionen zusammen. Uns verbindet die Überzeugung, dass das Evangelium kein Lifestyle-Programm ist — sondern etwas, das Leben verändert.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {[
            { icon: "favorite", title: "Warum wir das tun", text: "Weil auch wir solche Wochenenden gebraucht haben — und kaum welche gefunden, die uns wirklich ernst nahmen." },
            { icon: "groups", title: "Für wen", text: "Für Frauen jeden Alters, die im Glauben weitergehen wollen. Vom Teenager bis zur Oma." },
            { icon: "handshake", title: "Wie wir arbeiten", text: "Ehrenamtlich. Mit einer klaren Rechnung: Die Kosten decken, mehr nicht. Transparenz ist uns wichtig." },
          ].map((f) => (
            <div key={f.title} className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MaterialIcon name={f.icon} size={24} className="text-primary" filled />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary-fixed/40 to-secondary-fixed/40 rounded-[2rem] p-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Nächstes Mal</p>
          <h2 className="text-3xl font-bold">{EVENT.dates.display}</h2>
          <p className="mt-2 text-on-surface-variant">{EVENT.location.name} · {EVENT.location.address}</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
