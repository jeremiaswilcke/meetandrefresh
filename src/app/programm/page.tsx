import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { EVENT, PROGRAM } from "@/data/event";

export const metadata = { title: "Programm" };

const KIND_COLOR: Record<string, { bg: string; fg: string; icon: string }> = {
  plenum: { bg: "bg-primary/10", fg: "text-primary", icon: "campaign" },
  workshop: { bg: "bg-secondary-container/50", fg: "text-primary", icon: "school" },
  pause: { bg: "bg-surface-container-high", fg: "text-on-surface-variant", icon: "restaurant" },
  gottesdienst: { bg: "bg-tertiary-container/20", fg: "text-tertiary", icon: "church" },
  gemeinschaft: { bg: "bg-primary-fixed/40", fg: "text-primary", icon: "diversity_3" },
};

export default function Programm() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">
          Programm · {EVENT.dates.display}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Drei Tage.<br />
          <span className="text-primary">Viel Raum.</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Wir haben bewusst nicht durchgetaktet. Zwischen den Programmpunkten bleibt Zeit für Spaziergänge, Gespräche und Schlaf.
        </p>

        <div className="mt-12 space-y-10">
          {PROGRAM.map((day) => (
            <section key={day.label}>
              <div className="flex items-baseline gap-3 mb-6">
                <h2 className="text-3xl font-bold">{day.label}</h2>
                <p className="text-on-surface-variant">{day.date}</p>
              </div>

              <div className="relative pl-8 border-l-2 border-outline-variant/40 space-y-4">
                {day.items.map((item, i) => {
                  const c = KIND_COLOR[item.kind];
                  return (
                    <div key={i} className="relative">
                      <span className={`absolute -left-[41px] top-3 w-4 h-4 rounded-full ${c.bg} border-2 border-background`} />
                      <div className="bg-surface-container-lowest rounded-2xl p-5 editorial-shadow flex items-start gap-4">
                        <div className="flex-shrink-0 text-center">
                          <p className="font-mono text-primary font-semibold text-lg">{item.time}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-full ${c.bg} ${c.fg} flex items-center justify-center flex-shrink-0`}>
                          <MaterialIcon name={c.icon} size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
                          {item.speaker && (
                            <p className="text-xs uppercase tracking-widest text-on-surface-variant mt-1">
                              mit {item.speaker}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-sm text-on-surface-variant mt-2">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 text-xs text-on-surface-variant italic">
          Änderungen möglich. Das detaillierte Workshop-Programm bekommst du mit der Buchungsbestätigung.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
