import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MaterialIcon } from "@/components/material-icon";
import { PRICING, WORKSHOPS } from "@/data/event";

export const metadata = { title: "Meine Buchung" };

export default async function PortalBuchung() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: registrations } = await supabase
    .from("registrations")
    .select("*")
    .eq("email", user?.email ?? "")
    .order("created_at", { ascending: false });

  return (
    <>
      <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Meine Buchung</p>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">Deine Anmeldung.</h1>

      {(registrations ?? []).length === 0 ? (
        <section className="mt-8 rounded-2xl bg-surface-container-lowest p-8 editorial-shadow text-center">
          <MaterialIcon name="event_busy" size={48} className="text-on-surface-variant/40 mx-auto mb-3" />
          <p className="font-semibold mb-2">Noch keine Buchung gefunden</p>
          <p className="text-sm text-on-surface-variant mb-4">
            Wir konnten keine Anmeldung unter deiner E-Mail finden.
          </p>
          <Link
            href="/buchung"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-full font-semibold hover:bg-primary-container transition-colors"
          >
            Jetzt anmelden <MaterialIcon name="arrow_forward" size={16} />
          </Link>
        </section>
      ) : (
        <div className="mt-8 space-y-4">
          {registrations!.map((r) => {
            const pkg = PRICING.find((p) => p.slug === r.package_slug);
            const w1 = WORKSHOPS.find((w) => w.slug === r.workshop_round_1);
            const w2 = WORKSHOPS.find((w) => w.slug === r.workshop_round_2);
            return (
              <article key={r.id} className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-on-surface-variant">Buchung · {r.event_slug}</p>
                    <p className="font-bold text-xl mt-1">{pkg?.name ?? r.package_slug}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {r.status}
                  </span>
                </div>

                <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Name</dt>
                    <dd>{r.full_name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">E-Mail</dt>
                    <dd>{r.email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Workshop I</dt>
                    <dd>{w1?.title ?? "— noch offen —"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Workshop II</dt>
                    <dd>{w2?.title ?? "— noch offen —"}</dd>
                  </div>
                  {r.dietary_notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Hinweise</dt>
                      <dd className="text-on-surface-variant italic">{r.dietary_notes}</dd>
                    </div>
                  )}
                </dl>

                <p className="mt-5 text-xs text-on-surface-variant italic">
                  Änderungen sind möglich — schreib uns dafür bitte kurz per Mail.
                </p>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
