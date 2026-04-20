import { MaterialIcon } from "@/components/material-icon";
import { EVENT } from "@/data/event";

export const metadata = { title: "Raumplan" };

const ROOMS = [
  { name: "Plenum (Saal)", icon: "campaign", floor: "EG", note: "Vorträge und Gottesdienste" },
  { name: "Workshopraum Iris", icon: "school", floor: "EG", note: "Workshop-Runde I & II" },
  { name: "Workshopraum Linde", icon: "school", floor: "1. OG", note: "Kleinere Workshops, Stille-Retreat" },
  { name: "Speisesaal", icon: "restaurant", floor: "EG", note: "Frühstück, Mittag, Abend" },
  { name: "Begegnungs-Café", icon: "local_cafe", floor: "EG", note: "Immer offen, frei zugänglich" },
  { name: "Gebetsraum", icon: "self_improvement", floor: "1. OG", note: "Stille, persönliches Gebet" },
];

export default function PortalRaumplan() {
  return (
    <>
      <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">
        Raumplan
      </p>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Wo finde ich was?
      </h1>
      <p className="mt-3 text-on-surface-variant">
        {EVENT.location.name} — alle wichtigen Räume auf einen Blick.
      </p>

      <section className="mt-8 aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-fixed/40 via-secondary-fixed/30 to-primary-fixed-dim/30 editorial-shadow flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <MaterialIcon name="map" size={80} className="text-primary/40" />
          <p className="mt-4 text-sm text-on-surface-variant">Grundriss-Skizze — kommt zur Konferenz</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Räume</h2>
        <div className="space-y-3">
          {ROOMS.map((r) => (
            <div key={r.name} className="bg-surface-container-lowest rounded-2xl p-4 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MaterialIcon name={r.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-xs uppercase tracking-widest text-on-surface-variant">{r.floor}</p>
                </div>
                <p className="text-sm text-on-surface-variant mt-0.5">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl bg-gradient-to-br from-primary-fixed/30 to-secondary-fixed/30 p-6">
        <h3 className="font-semibold mb-2">Anfahrt & Parken</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          {EVENT.location.address}. Parkplätze am Haus sind begrenzt — Fahrgemeinschaften sind willkommen. Detaillierte Anfahrtsbeschreibung bekommst du per Mail.
        </p>
      </section>
    </>
  );
}
