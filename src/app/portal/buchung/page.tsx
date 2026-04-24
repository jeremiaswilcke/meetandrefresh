import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MaterialIcon } from "@/components/material-icon";

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
            return (
              <article key={r.id} className="bg-surface-container-lowest rounded-2xl p-6 editorial-shadow">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-on-surface-variant">Buchung · {r.event_slug}</p>
                    <p className="font-bold text-xl mt-1">{roomLabel(r.room_type, r.room_variant)}</p>
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
                    <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Zahlstatus</dt>
                    <dd>{r.payment_status ?? "not_requested"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Zimmerpartnerin / Gruppe</dt>
                    <dd>{roomDetails(r)}</dd>
                  </div>
                  {r.dietary_notes && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Hinweise</dt>
                      <dd className="text-on-surface-variant italic">{r.dietary_notes}</dd>
                    </div>
                  )}
                </dl>

                <p className="mt-5 text-xs text-on-surface-variant italic">
                  Workshops werden nicht vorab gebucht. Änderungen an Zimmer- oder Kontaktdaten bitte per Mail anfragen.
                </p>
                {["payment_requested", "payment_failed"].includes(r.status) && (
                  <Link href={`/zahlung?id=${r.id}`} className="mt-5 inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-full font-semibold">
                    Zur Zahlung <MaterialIcon name="arrow_forward" size={16} />
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

function roomLabel(roomType: string, roomVariant?: string | null) {
  if (roomType === "single") return "Einzelzimmer";
  if (roomType === "double_known") return "Doppelzimmer mit bekannter Person";
  if (roomType === "double_unknown") return "Doppelzimmer mit unbekannter Person";
  if (roomType === "multi") return `Familienzimmer für ${roomVariant === "4" ? "4" : "3"} Personen`;
  return roomType;
}

function roomDetails(r: { roommate_name?: string | null; matching_code?: string | null; group_members?: string[] | null }) {
  if (r.roommate_name) return r.roommate_name;
  if (r.matching_code) return `Code: ${r.matching_code}`;
  if (Array.isArray(r.group_members) && r.group_members.length > 0) return r.group_members.join(", ");
  return "—";
}
