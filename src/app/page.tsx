import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { EVENT, PROGRAM, WORKSHOPS, PRICING, SPEAKERS } from "@/data/event";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* === Hero === */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-fixed/40 via-background to-background" aria-hidden />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed-dim/30 rounded-full blur-3xl -z-10" aria-hidden />
          <div className="absolute top-40 -left-32 w-80 h-80 bg-secondary-fixed/30 rounded-full blur-3xl -z-10" aria-hidden />

          <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 relative z-10">
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                <MaterialIcon name="calendar_month" size={14} />
                {EVENT.dates.display} · {EVENT.location.shortName}
              </p>
              <h1 className="text-5xl md:text-7xl font-bold text-on-surface leading-[1.05] tracking-tight">
                Ein Wochenende,<br />
                <span className="text-primary">um aufzuatmen.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
                {EVENT.subtitle}. Drei Tage Auszeit vom Alltag — mit Lobpreis, ehrlicher Lehre, guten Gesprächen und dem Raum, Gott wieder neu zu begegnen.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/buchung"
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-7 py-3.5 rounded-full font-semibold hover:bg-primary-container transition-colors editorial-shadow"
                >
                  Platz sichern
                  <MaterialIcon name="arrow_forward" size={18} />
                </Link>
                <Link
                  href="/programm"
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-on-surface px-7 py-3.5 rounded-full font-semibold border border-outline-variant/50 hover:border-primary hover:text-primary transition-colors"
                >
                  Zum Programm
                </Link>
              </div>

              <figure className="mt-12 border-l-2 border-primary pl-5 max-w-md">
                <blockquote className="italic text-on-surface text-base leading-relaxed">
                  „{EVENT.heroVerse.text}"
                </blockquote>
                <figcaption className="mt-2 text-xs uppercase tracking-widest text-on-surface-variant">
                  {EVENT.heroVerse.reference}
                </figcaption>
              </figure>
            </div>

            <div className="md:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary via-primary-container to-primary-fixed-dim editorial-shadow">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MaterialIcon name="forest" size={120} className="text-on-primary/20" filled />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-on-primary">
                  <p className="text-xs uppercase tracking-widest opacity-70">Erwartet</p>
                  <p className="text-4xl font-bold mt-1">{EVENT.attendance.expected}+ Frauen</p>
                  <p className="text-sm opacity-80 mt-1">aus ganz Deutschland</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 md:-left-10 glass-card rounded-2xl p-4 w-48 editorial-shadow">
                <p className="text-xs uppercase tracking-widest text-on-surface-variant">Wiederkommer-Quote</p>
                <p className="text-3xl font-bold text-primary mt-1">
                  {Math.round(EVENT.attendance.returningRate * 100)}%
                </p>
                <p className="text-xs text-on-surface-variant mt-1">unserer Teilnehmerinnen sind schon letztes Jahr dabei gewesen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* === Was erwartet dich === */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Was erwartet dich</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Kein Programm-Marathon.<br />
                <span className="text-primary">Raum zum Atemholen.</span>
              </h2>
              <p className="mt-6 text-on-surface-variant leading-relaxed">
                Wir sind keine Megakonferenz, und wollen es auch nicht sein. Bei Meet & Refresh geht es um Tiefe statt Breite: klare Lehre, echte Begegnung, und Zeit für das, was bei dir ansteht.
              </p>
            </div>

            <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
              {[
                { icon: "record_voice_over", title: "Ehrliche Lehre", text: "Keine Show, keine Worthülsen — biblische Vorträge, die dich ernst nehmen." },
                { icon: "diversity_3", title: "Begegnung", text: "Workshops und Gesprächs-Cafés, in denen du wirklich ins Gespräch kommst." },
                { icon: "music_note", title: "Lobpreis", text: "Lieder, bei denen du mitsingen kannst. Und zum Schweigen kommen darfst." },
                { icon: "spa", title: "Stille", text: "Geführte Stille-Einheiten für alle, die ihre Mitte neu finden wollen." },
              ].map((f) => (
                <div key={f.title} className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MaterialIcon name={f.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === Programm-Preview === */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Programm</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Drei Tage, die bleiben.</h2>
            </div>
            <Link href="/programm" className="text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              Ganzes Programm <MaterialIcon name="arrow_forward" size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {PROGRAM.map((day) => (
              <div key={day.label} className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow">
                <p className="text-xs uppercase tracking-widest font-semibold text-on-surface-variant">{day.label}</p>
                <p className="text-lg font-semibold mt-1 mb-4">{day.date}</p>
                <ul className="space-y-3">
                  {day.items.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="font-mono text-primary font-semibold w-12 flex-shrink-0">{item.time}</span>
                      <span className="text-on-surface">{item.title}</span>
                    </li>
                  ))}
                  {day.items.length > 4 && (
                    <li className="text-xs text-on-surface-variant italic">
                      +{day.items.length - 4} weitere Programmpunkte
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* === Referentinnen === */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Referentinnen</p>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">Frauen, die was zu sagen haben.</h2>
            </div>
            <Link href="/referentinnen" className="text-primary font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              Alle kennenlernen <MaterialIcon name="arrow_forward" size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {SPEAKERS.map((s) => (
              <div key={s.slug} className="bg-surface-container-lowest rounded-2xl overflow-hidden editorial-shadow">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary-fixed to-primary-fixed-dim flex items-center justify-center">
                  <MaterialIcon name="person" size={80} className="text-primary/40" filled />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl">{s.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-primary mt-1 mb-3">{s.role}</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">{s.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === Workshops === */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Workshops</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Wähl dein Tiefe-Thema.</h2>
            <p className="mt-4 text-on-surface-variant max-w-2xl">
              Zwei Workshop-Runden am Samstag — in jeder Runde suchst du dir ein Thema aus. Die Gruppen sind klein, es bleibt Zeit für Rückfragen und Gespräche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {WORKSHOPS.map((w) => (
              <article key={w.slug} className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow flex gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container/50 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">{w.round}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{w.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-2">
                    mit {w.leader}
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{w.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* === Preise === */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Preise</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Alles drin.</h2>
            <p className="mt-4 text-on-surface-variant max-w-2xl">
              Inkl. Übernachtung, Vollverpflegung und allen Programmpunkten. Keine versteckten Kosten, keine Upgrades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {PRICING.map((t) => (
              <div
                key={t.slug}
                className={`rounded-2xl p-7 editorial-shadow ${
                  t.featured
                    ? "bg-gradient-to-br from-primary to-primary-container text-on-primary"
                    : "bg-surface-container-lowest text-on-surface"
                }`}
              >
                {t.featured && (
                  <p className="inline-block text-[10px] uppercase tracking-widest font-bold bg-on-primary/20 text-on-primary px-3 py-1 rounded-full mb-3">
                    Am beliebtesten
                  </p>
                )}
                <h3 className="text-2xl font-bold">{t.name}</h3>
                <p className="mt-3">
                  <span className="text-5xl font-bold">{t.price}€</span>
                  <span className={`text-sm ml-2 ${t.featured ? "opacity-80" : "text-on-surface-variant"}`}>
                    gesamt
                  </span>
                </p>
                <ul className="mt-5 space-y-2">
                  {t.includes.map((inc, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <MaterialIcon name="check" size={18} className={t.featured ? "text-on-primary" : "text-primary"} />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/buchung?paket=${t.slug}`}
                  className={`mt-6 flex items-center justify-center gap-2 rounded-full py-3 font-semibold transition-colors ${
                    t.featured
                      ? "bg-on-primary text-primary hover:bg-on-primary/90"
                      : "bg-primary text-on-primary hover:bg-primary-container"
                  }`}
                >
                  Dieses Paket buchen
                  <MaterialIcon name="arrow_forward" size={16} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* === CTA === */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary via-primary-container to-primary-fixed-dim p-10 md:p-16 editorial-shadow">
            <div className="absolute inset-0 opacity-10">
              <MaterialIcon name="spa" size={400} className="absolute -right-10 -bottom-10 text-on-primary" filled />
            </div>
            <div className="relative max-w-2xl">
              <p className="text-xs uppercase tracking-widest font-semibold text-on-primary/80 mb-4">
                {EVENT.dates.display}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-on-primary leading-tight">
                Wenn nicht jetzt — wann dann?
              </h2>
              <p className="mt-4 text-on-primary/90 text-lg">
                Die Plätze sind begrenzt. Sichere dir jetzt deinen Platz für ein Wochenende, das du lange brauchen wirst.
              </p>
              <Link
                href="/buchung"
                className="mt-8 inline-flex items-center gap-2 bg-on-primary text-primary px-7 py-3.5 rounded-full font-semibold hover:bg-on-primary/90 transition-colors"
              >
                Jetzt anmelden
                <MaterialIcon name="arrow_forward" size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
