"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MaterialIcon } from "@/components/material-icon";

interface Props {
  eventSlug: string;
  defaultRoom?: string;
  defaultRoomVariant?: "3" | "4";
}

export function BuchungForm({ eventSlug, defaultRoom = "double_unknown", defaultRoomVariant = "3" }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [roomType, setRoomType] = useState(defaultRoom);
  const [roomVariant, setRoomVariant] = useState<"3" | "4">(defaultRoomVariant);
  const groupSlots = roomVariant === "4" ? 3 : 2;

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    roommate_name: "",
    matching_code: "",
    group_members: ["", "", ""],
    dietary_notes: "",
    privacy_accepted: false,
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          event_slug: eventSlug,
          room_type: roomType,
          room_variant: roomType === "multi" ? roomVariant : null,
          group_members: form.group_members.slice(0, groupSlots).filter(Boolean),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Die Buchung konnte nicht gespeichert werden.");
        return;
      }
      if (data.payNow) {
        router.push(data.paymentPath);
        return;
      }
      router.push("/portal/buchung");
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-8">
      <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Schritt 1</p>
        <h2 className="text-2xl font-bold mb-6">Persönliches</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Vorname" required>
            <input required value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className="field" />
          </Field>
          <Field label="Nachname" required>
            <input required value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className="field" />
          </Field>
          <Field label="E-Mail" required>
            <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="field" />
          </Field>
          <Field label="Telefon">
            <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="field" />
          </Field>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Schritt 2</p>
        <h2 className="text-2xl font-bold mb-6">Zimmer wählen</h2>
        <div className="grid md:grid-cols-2 gap-3">
          <RoomOption value="single" label="Einzelzimmer" hint="Kontingent wird sofort geprüft." roomType={roomType} setRoomType={setRoomType} />
          <RoomOption value="double_known" label="Doppelzimmer mit bekannter Person" hint="Zahlung erst nach Matching-Code-Treffer." roomType={roomType} setRoomType={setRoomType} />
          <RoomOption value="double_unknown" label="Doppelzimmer mit unbekannter Person" hint="Automatisches Matching mit einer Wartenden." roomType={roomType} setRoomType={setRoomType} />
          <RoomOption value="multi" label="Familienzimmer 3-4 Personen" hint="3er-/4er-Gruppe, eine Sammelzahlung." roomType={roomType} setRoomType={setRoomType} />
        </div>

        {roomType === "double_known" && (
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <Field label="Name der Zimmerpartnerin">
              <input value={form.roommate_name} onChange={(e) => update("roommate_name", e.target.value)} className="field" />
            </Field>
            <Field label="Matching-Code">
              <input value={form.matching_code} onChange={(e) => update("matching_code", e.target.value)} className="field" placeholder="z. B. ANNA-MARIA-2026" />
            </Field>
          </div>
        )}

        {roomType === "multi" && (
          <div className="mt-5 grid gap-4">
            <Field label="Zimmergröße">
              <select value={roomVariant} onChange={(e) => setRoomVariant(e.target.value as "3" | "4")} className="field">
                <option value="3">Familienzimmer für 3 Personen</option>
                <option value="4">Familienzimmer für 4 Personen</option>
              </select>
            </Field>
            {Array.from({ length: groupSlots }).map((_, index) => (
              <Field key={index} label={`Weitere Teilnehmerin ${index + 1}`} required>
                <input
                  required
                  value={form.group_members[index] ?? ""}
                  onChange={(e) => {
                    const next = [...form.group_members];
                    next[index] = e.target.value;
                    update("group_members", next);
                  }}
                  className="field"
                />
              </Field>
            ))}
          </div>
        )}
      </section>

      <section className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">Schritt 3</p>
        <h2 className="text-2xl font-bold mb-6">Hinweise</h2>
        <Field label="Allergien, Essensgewohnheiten, Barrierefreiheit etc.">
          <textarea rows={4} value={form.dietary_notes} onChange={(e) => update("dietary_notes", e.target.value)} className="field" />
        </Field>
        <label className="mt-6 flex gap-3 text-sm cursor-pointer">
          <input type="checkbox" checked={form.privacy_accepted} onChange={(e) => update("privacy_accepted", e.target.checked)} className="mt-1 w-5 h-5 rounded accent-primary" />
          <span>Ich akzeptiere die Datenschutzhinweise. Workshops werden nicht vorab gebucht, sondern vor Ort organisiert.</span>
        </label>
      </section>

      <section className="bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-6 md:p-8 editorial-shadow">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Zimmerlogik</p>
            <p className="text-xl font-bold">{labelFor(roomType)}</p>
          </div>
          <button disabled={isPending} className="inline-flex items-center gap-2 bg-on-primary text-primary px-7 py-3.5 rounded-full font-semibold disabled:opacity-50">
            {isPending ? "Speichert…" : roomType === "single" || roomType === "multi" ? "Buchen & zur Zahlung" : "Buchung anfragen"}
            <MaterialIcon name="arrow_forward" size={18} />
          </button>
        </div>
        {error && <div className="mt-4 rounded-xl bg-error/20 border border-error/40 px-4 py-3 text-sm">{error}</div>}
      </section>
    </form>
  );
}

function RoomOption({ value, label, hint, roomType, setRoomType }: { value: string; label: string; hint: string; roomType: string; setRoomType: (value: string) => void }) {
  const active = roomType === value;
  return (
    <button type="button" onClick={() => setRoomType(value)} className={`text-left rounded-2xl border-2 p-5 transition-all ${active ? "border-primary bg-primary/5" : "border-outline-variant/40 hover:border-outline"}`}>
      <p className="font-semibold">{label}</p>
      <p className="mt-1 text-sm text-on-surface-variant">{hint}</p>
    </button>
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

function labelFor(roomType: string) {
  const labels: Record<string, string> = {
    single: "Einzelzimmer: sofortige Kontingentprüfung",
    double_known: "Doppelzimmer bekannt: Zahlung nach Partnerinnen-Match",
    double_unknown: "Doppelzimmer unbekannt: automatische Zuordnung",
    multi: "Familienzimmer 3-4 Personen: Gruppenbuchung mit Sammelzahlung",
  };
  return labels[roomType] ?? roomType;
}
