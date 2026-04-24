# Meet & Refresh

Next.js-Webapp für die jährliche Konferenz „Meet & Refresh" — Jahreskonferenz für christliche Frauen.

## Stack

- **Next.js 16** (App Router, Server Components)
- **Tailwind CSS v4** mit Meet-&-Refresh-CI-Tokens (Mint, Lavendel, Gruen)
- **Kanit** (Display + Body) via `next/font`
- **Material Symbols Outlined** für Icons
- **Supabase** (Auth + Postgres) für Anmeldungen und Teilnehmer-Portal
- **Vercel** als Deploy-Target

## Entwicklung

```bash
npm install
cp .env.local.example .env.local        # Keys aus Supabase eintragen
npm run dev
```

Seite läuft auf http://localhost:3000.

## Datenstruktur

Alle Event-Inhalte (Termin, Ort, Referentinnen, Programm, Workshops, Preise, Kontakt) liegen zentral in `src/data/event.ts` — **einmal pro Jahr hier aktualisieren**.

## Routen

| Route | Zweck |
|-------|-------|
| `/` | Landing mit Hero, Programm-Preview, Referentinnen, Workshops, Preise, CTA |
| `/ueber-uns` | Team & Motivation |
| `/programm` | Vollständiges Programm als Timeline |
| `/referentinnen` | Alle Referentinnen im Detail |
| `/galerie` | Fotos der letzten Konferenz |
| `/kontakt` | Kontaktdaten + Tagungsort |
| `/buchung` | Öffentliches Anmeldeformular mit Zimmerlogik → Supabase |
| `/zahlung` | Demo-Zahlungsbestätigung |
| `/login` | Login/Signup (Supabase Auth) |
| `/portal` | Teilnehmer-Dashboard (geschützt) |
| `/portal/buchung` | Eigene Buchung einsehen |
| `/portal/raumplan` | Raumplan im Tagungshaus |
| `/portal/profil` | Profil-Ansicht |
| `/impressum`, `/datenschutz` | Rechtliches |

## Buchungslogik

- Einzelzimmer werden ueber `room_inventory` und die SQL-Funktion `reserve_single_room()` gegen Ueberbuchung geschuetzt.
- Doppelzimmer mit bekannter Person warten auf denselben Matching-Code oder Partnerinnen-Namen.
- Doppelzimmer mit unbekannter Person werden automatisch paarweise gematcht.
- Mehrfachzimmer werden als 3er-/4er-Gruppenbuchung gespeichert und direkt zahlbar gemacht.
- Workshops werden nicht vorab gebucht; sie bleiben reine Programminformation.
- Angemeldete Nutzerinnen sehen im geschuetzten `/portal` ihren persoenlichen Bereich mit Zimmer-, Match- und Zahlungsstatus.

## Supabase Setup

1. Neues Projekt bei [supabase.com](https://supabase.com) anlegen
2. SQL-Migration ausführen: `supabase/migrations/0001_initial_schema.sql` im SQL-Editor einfügen und ausführen
3. Bei Auth-Settings `Email Confirmations` nach Bedarf einstellen
4. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` und `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` eintragen

## Deploy

Vercel:
- Repository importieren
- Env-Vars setzen (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- Auto-Deploy aus `main`

## Design-Tokens

Color palette orientiert sich am neuen CI: Mint `#9fe4d4`, Lavendel `#b394e6`, Gruen `#058b55`, warmer heller Hintergrund. Das Logo liegt unter `public/meetand-logo.png`.
