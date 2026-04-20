import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BuchungForm } from "./buchung-form";
import { EVENT, PRICING, WORKSHOPS } from "@/data/event";

export const metadata = { title: "Anmelden" };

export default async function BuchungPage({
  searchParams,
}: {
  searchParams: Promise<{ paket?: string }>;
}) {
  const { paket } = await searchParams;
  const defaultPackage = PRICING.find((p) => p.slug === paket)?.slug ?? "doppelzimmer";

  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">
          Anmeldung · {EVENT.dates.display}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Schön,<br />
          <span className="text-primary">dass du dabei bist.</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Fülle das Formular aus — wir schicken dir anschließend eine Bestätigungsmail mit allen Details. Zahlung geht im nächsten Schritt.
        </p>

        <div className="mt-12">
          <BuchungForm
            eventSlug={EVENT.slug}
            packages={PRICING.map((p) => ({ slug: p.slug, name: p.name, price: p.price, featured: p.featured ?? false }))}
            workshops={WORKSHOPS.map((w) => ({ slug: w.slug, title: w.title, round: w.round }))}
            defaultPackage={defaultPackage}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
