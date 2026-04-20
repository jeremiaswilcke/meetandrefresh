import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { SPEAKERS } from "@/data/event";

export const metadata = { title: "Referentinnen" };

export default function Referentinnen() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Referentinnen</p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Frauen, die was<br />
          <span className="text-primary">zu sagen haben.</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Wir laden bewusst Referentinnen ein, die nicht nur reden, sondern aus einem gelebten Glauben sprechen.
        </p>

        <div className="mt-12 space-y-8">
          {SPEAKERS.map((s, i) => (
            <article
              key={s.slug}
              className={`grid md:grid-cols-12 gap-6 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="md:col-span-4 aspect-[4/5] bg-gradient-to-br from-primary-fixed to-primary-fixed-dim rounded-[2rem] flex items-center justify-center editorial-shadow">
                <MaterialIcon name="person" size={120} className="text-primary/40" filled />
              </div>
              <div className="md:col-span-8">
                <h2 className="text-3xl md:text-4xl font-bold">{s.name}</h2>
                <p className="text-xs uppercase tracking-widest text-primary mt-2 mb-4">{s.role}</p>
                <p className="text-on-surface-variant leading-relaxed">{s.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
