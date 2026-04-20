"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MaterialIcon } from "@/components/material-icon";

interface Props {
  eventSlug: string;
  packages: { slug: string; name: string; price: number; featured: boolean }[];
  workshops: { slug: string; title: string; round: "I" | "II" | "beide" }[];
  defaultPackage: string;
}

export function BuchungForm({ eventSlug, packages, workshops, defaultPackage }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    package_slug: defaultPackage,
    workshop_round_1: "",
    workshop_round_2: "",
    dietary_notes: "",
    privacy_accepted: false,
  });

  const selectedPackage = packages.find((p) => p.slug === form.package_slug);
  const round1Options = workshops.filter((w) => w.round === "I" || w.round === "beide");
  const round2Options = workshops.filter((w) => w.round === "II" || w.round === "beide");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.privacy_accepted) {
      setError("Bitte die Datenschutzerklärung bestätigen.");
      return;
    }

    startTransition(async () => {
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from("registrations")
        .insert({
          event_slug: eventSlug,
          full_name: form.full_name,
          email: form.email.trim().toLowerCase(),
          phone: form.phone || null,
          package_slug: form.package_slug,
          workshop_round_1: form.workshop_round_1 || null,
          workshop_round_2: form.workshop_round_2 || null,
          dietary_notes: form.dietary_notes || null,
          privacy_accepted: form.privacy_accepted,
          amount_cents: (selectedPackage?.price ?? 0) * 100,
          status: "pending",
        })
        .select("id")
        .single();

      if (insertError || !data) {
        setError(insertError?.message ?? "Unbekannter Fehler bei der Anmeldung.");
        return;
      }

      router.push(`/zahlung?id=${data.id}`);
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-8">
      {/* Persönliches */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Schritt 1</p>
        <h2 className="text-2xl font-bold mb-6">Persönliches</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Vor- und Nachname" required>
            <input
              required
              value={form.full_name}
              onChange={(e) => update("full_name", e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
            />
          </Field>
          <Field label="E-Mail" required>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
            />
          </Field>
          <Field label="Telefon (optional)">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
            />
          </Field>
        </div>
      </section>

      {/* Paket */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Schritt 2</p>
        <h2 className="text-2xl font-bold mb-6">Paket wählen</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {packages.map((p) => (
            <label
              key={p.slug}
              className={`block cursor-pointer rounded-2xl border-2 p-5 transition-all ${
                form.package_slug === p.slug
                  ? "border-primary bg-primary/5"
                  : "border-outline-variant/40 hover:border-outline"
              }`}
            >
              <input
                type="radio"
                name="package"
                value={p.slug}
                checked={form.package_slug === p.slug}
                onChange={(e) => update("package_slug", e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold">{p.name}</p>
                {form.package_slug === p.slug && <MaterialIcon name="check_circle" size={20} className="text-primary" filled />}
              </div>
              <p className="text-2xl font-bold text-primary">{p.price}€</p>
            </label>
          ))}
        </div>
      </section>

      {/* Workshops */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Schritt 3</p>
        <h2 className="text-2xl font-bold mb-2">Workshops</h2>
        <p className="text-sm text-on-surface-variant mb-6">
          Je einen für Runde I (Samstag Vormittag) und Runde II (Samstag Nachmittag). Kannst du später noch ändern.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Runde I (Vormittag)">
            <select
              value={form.workshop_round_1}
              onChange={(e) => update("workshop_round_1", e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
            >
              <option value="">— Noch nicht festgelegt —</option>
              {round1Options.map((w) => (
                <option key={w.slug} value={w.slug}>{w.title}</option>
              ))}
            </select>
          </Field>
          <Field label="Runde II (Nachmittag)">
            <select
              value={form.workshop_round_2}
              onChange={(e) => update("workshop_round_2", e.target.value)}
              className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
            >
              <option value="">— Noch nicht festgelegt —</option>
              {round2Options.map((w) => (
                <option key={w.slug} value={w.slug}>{w.title}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* Allergien, Hinweise */}
      <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Schritt 4</p>
        <h2 className="text-2xl font-bold mb-6">Hinweise für uns</h2>
        <Field label="Allergien, Essensgewohnheiten, Barrierefreiheit etc.">
          <textarea
            rows={4}
            value={form.dietary_notes}
            onChange={(e) => update("dietary_notes", e.target.value)}
            className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
            placeholder="Alles was uns hilft, dich gut aufzunehmen."
          />
        </Field>

        <label className="mt-6 flex gap-3 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.privacy_accepted}
            onChange={(e) => update("privacy_accepted", e.target.checked)}
            className="mt-1 w-5 h-5 rounded accent-primary"
          />
          <span>
            Ich habe die <a href="/datenschutz" className="text-primary hover:underline" target="_blank">Datenschutzerklärung</a> gelesen und bin damit einverstanden, dass meine Angaben zur Organisation der Konferenz gespeichert werden.
          </span>
        </label>
      </section>

      {/* Submit */}
      <section className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-6 md:p-8 editorial-shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Dein Paket</p>
            <p className="text-2xl font-bold">
              {selectedPackage?.name} · {selectedPackage?.price}€
            </p>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-on-primary text-primary px-7 py-3.5 rounded-full font-semibold hover:bg-on-primary/90 disabled:opacity-50 transition-colors"
          >
            {isPending ? "Speichert…" : "Weiter zur Zahlung"}
            <MaterialIcon name="arrow_forward" size={18} />
          </button>
        </div>
        {error && (
          <div className="mt-4 rounded-xl bg-error/20 border border-error/40 px-4 py-3 text-sm">
            {error}
          </div>
        )}
      </section>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
