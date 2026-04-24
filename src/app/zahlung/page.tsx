import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { confirmDemoPayment } from "./actions";

export const metadata = { title: "Zahlung" };

export default async function ZahlungPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id) redirect("/buchung");

  const supabase = await createServerSupabaseClient();
  const { data: reg } = await supabase
    .from("registrations")
    .select("id, full_name, email, room_type, room_variant, amount_cents, status")
    .eq("id", id)
    .maybeSingle();

  if (!reg) notFound();

  const alreadyPaid = reg.status === "paid" || reg.status === "confirmed";
  const payable = reg.status === "payment_requested" || reg.status === "payment_failed";

  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Zahlung</p>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {alreadyPaid ? "Alles bezahlt." : "Letzter Schritt."}
        </h1>

        <div className="mt-8 bg-surface-container-lowest rounded-2xl p-8 editorial-shadow">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Teilnehmerin</p>
              <p className="font-semibold text-lg">{reg.full_name}</p>
              <p className="text-sm text-on-surface-variant">{reg.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Paket</p>
              <p className="font-semibold text-lg">{roomLabel(reg.room_type, reg.room_variant)}</p>
              <p className="text-sm text-on-surface-variant">
                {((reg.amount_cents ?? 0) / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}
              </p>
            </div>
          </div>

          {alreadyPaid ? (
            <div className="rounded-xl bg-primary/10 border border-primary/30 p-5 flex items-start gap-3">
              <MaterialIcon name="check_circle" size={28} className="text-primary" filled />
              <div>
                <p className="font-semibold">Zahlung erhalten</p>
                <p className="text-sm text-on-surface-variant mt-1">
                  Du bist angemeldet und bezahlt. Wir schicken dir die Bestätigungs-E-Mail mit allen Details in den nächsten Minuten.
                </p>
              </div>
            </div>
          ) : payable ? (
            <>
              <div className="rounded-xl bg-secondary-fixed/30 border border-secondary/30 p-5 flex items-start gap-3 mb-6">
                <MaterialIcon name="info" size={24} className="text-primary" filled />
                <div>
                  <p className="font-semibold">Demo-Modus</p>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Hier würde normalerweise ein Zahlungs-Provider (z.&nbsp;B. Stripe, PayPal, SEPA) eingebunden sein. Für die aktuelle Demo-Version bestätigen wir die Zahlung direkt per Klick.
                  </p>
                </div>
              </div>

              <form action={confirmDemoPayment}>
                <input type="hidden" name="id" value={reg.id} />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-7 py-4 rounded-full font-semibold hover:bg-primary-container transition-colors"
                >
                  Zahlung bestätigen (Demo)
                  <MaterialIcon name="arrow_forward" size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="rounded-xl bg-secondary-fixed/30 border border-secondary/30 p-5 flex items-start gap-3">
              <MaterialIcon name="hourglass_empty" size={24} className="text-primary" filled />
              <div>
                <p className="font-semibold">Noch nicht zahlungspflichtig</p>
                <p className="text-sm text-on-surface-variant mt-1">
                  Diese Buchung wartet noch auf das Zimmer-Matching. Danach wird die Zahlung freigeschaltet.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="text-primary font-semibold hover:underline">
            Zurück zur Startseite
          </Link>
        </div>
      </main>
      <SiteFooter />
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
