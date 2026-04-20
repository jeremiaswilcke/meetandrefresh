import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MaterialIcon } from "@/components/material-icon";
import { EVENT, PROGRAM } from "@/data/event";

export default async function PortalDashboard() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: registration } = await supabase
    .from("registrations")
    .select("id, full_name, package_slug, workshop_round_1, workshop_round_2, status, amount_cents")
    .eq("email", user?.email ?? "")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const firstName = registration?.full_name?.split(" ")[0] ?? "du";
  const saturdayProgram = PROGRAM.find((d) => d.label === "Samstag");

  return (
    <>
      <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">
        Mein Bereich
      </p>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Hallo, {firstName}.
      </h1>
      <p className="mt-3 text-on-surface-variant">{EVENT.dates.display} · {EVENT.location.shortName}</p>

      {/* Status-Karte */}
      {registration ? (
        <section className="mt-8 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-on-primary p-6 md:p-8 editorial-shadow">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Deine Buchung</p>
              <p className="text-2xl font-bold capitalize">{registration.package_slug.replace("-", " ")}</p>
              <p className="opacity-90 text-sm mt-1">
                {((registration.amount_cents ?? 0) / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </p>
            </div>
            <StatusBadge status={registration.status} />
          </div>
        </section>
      ) : (
        <section className="mt-8 rounded-2xl bg-surface-container-lowest p-6 editorial-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MaterialIcon name="event_available" size={24} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold">Noch keine Buchung</p>
              <p className="text-sm text-on-surface-variant mt-1">
                Du hast noch keinen Platz gebucht. Sichere dir jetzt einen.
              </p>
              <Link
                href="/buchung"
                className="mt-3 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm"
              >
                Jetzt anmelden
                <MaterialIcon name="arrow_forward" size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Samstag-Timeline */}
      <section className="mt-10">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-bold">Samstag im Überblick</h2>
          <Link href="/programm" className="text-sm text-primary font-semibold hover:underline">
            Ganzes Programm
          </Link>
        </div>
        <div className="space-y-2">
          {saturdayProgram?.items.map((item, i) => (
            <div key={i} className="flex gap-4 bg-surface-container-lowest rounded-xl p-4">
              <span className="font-mono text-primary font-semibold w-12">{item.time}</span>
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                {item.speaker && <p className="text-xs text-on-surface-variant">mit {item.speaker}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid sm:grid-cols-2 gap-4">
        <Link href="/portal/raumplan" className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow hover:bg-surface-container-low transition-colors">
          <MaterialIcon name="map" size={28} className="text-primary mb-3" filled />
          <p className="font-semibold">Raumplan</p>
          <p className="text-sm text-on-surface-variant mt-1">Wo finde ich was?</p>
        </Link>
        <Link href="/portal/buchung" className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow hover:bg-surface-container-low transition-colors">
          <MaterialIcon name="edit_note" size={28} className="text-primary mb-3" filled />
          <p className="font-semibold">Buchung bearbeiten</p>
          <p className="text-sm text-on-surface-variant mt-1">Workshops, Allergien, Kontakt</p>
        </Link>
      </section>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label: Record<string, string> = {
    pending: "Ausstehend",
    confirmed: "Bestätigt",
    paid: "Bezahlt",
    cancelled: "Storniert",
  };
  return (
    <span className="inline-flex items-center gap-1.5 bg-on-primary/20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
      <span className="w-2 h-2 rounded-full bg-on-primary" />
      {label[status] ?? status}
    </span>
  );
}
