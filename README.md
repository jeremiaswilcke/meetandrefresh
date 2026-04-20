# Meet & Refresh

Next.js-Webapp für die jährliche Konferenz „Meet & Refresh" — Jahreskonferenz für christliche Frauen.

## Stack

- **Next.js 16** (App Router, Server Components)
- **Tailwind CSS v4** mit Stitch-Design-Tokens (Primärgrün `#006948`)
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
| `/buchung` | Öffentliches Anmeldeformular → Supabase |
| `/zahlung` | Demo-Zahlungsbestätigung |
| `/login` | Login/Signup (Supabase Auth) |
| `/portal` | Teilnehmer-Dashboard (geschützt) |
| `/portal/buchung` | Eigene Buchung einsehen |
| `/portal/raumplan` | Raumplan im Tagungshaus |
| `/portal/profil` | Profil-Ansicht |
| `/impressum`, `/datenschutz` | Rechtliches |

## Supabase Setup

1. Neues Projekt bei [supabase.com](https://supabase.com) anlegen
2. SQL-Migration ausführen: `supabase/migrations/0001_initial_schema.sql` im SQL-Editor einfügen und ausführen
3. Bei Auth-Settings `Email Confirmations` nach Bedarf einstellen
4. `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` eintragen

## Deploy

Vercel:
- Repository importieren
- Env-Vars setzen (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- Auto-Deploy aus `main`

## Design-Tokens

Color palette stammt aus dem Stitch-Design-Package (`Verdant Conservatory`). Primär Tiefgrün, Akzent Mint, Hintergrund Sand. Kanit als einzige Schrift — sowohl Headlines als auch Fließtext.
