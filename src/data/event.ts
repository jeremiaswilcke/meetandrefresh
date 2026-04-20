// Hardcoded Event-Daten — jährlich einmal hier aktualisieren.
// Alle Seiten ziehen aus dieser Quelle.

export const EVENT = {
  slug: "meet-and-refresh-2026",
  title: "Meet & Refresh",
  subtitle: "Jahreskonferenz für christliche Frauen",
  tagline: "Ein Wochenende Auszeit, Begegnung und geistliches Auftanken.",
  heroVerse: {
    text: "Kommt her zu mir alle, die ihr mühselig und beladen seid; ich will euch erquicken.",
    reference: "Matthäus 11,28",
  },
  dates: {
    start: "2026-09-18",
    end: "2026-09-20",
    display: "18.–20. September 2026",
  },
  location: {
    name: "Christliches Gästehaus Sonnenhof",
    address: "Bergstraße 12, 78054 Villingen-Schwenningen",
    shortName: "Sonnenhof, Schwarzwald",
  },
  attendance: {
    expected: 120,
    lastYear: 95,
    returningRate: 0.72,
  },
} as const;

export interface Speaker {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: string | null;
}

export const SPEAKERS: Speaker[] = [
  {
    slug: "elisabeth-meier",
    name: "Elisabeth Meier",
    role: "Hauptrednerin · Seelsorgerin und Autorin",
    bio: "Elisabeth begleitet seit über zwanzig Jahren Frauen in Umbruchssituationen. Ihr Schwerpunkt liegt auf Versöhnung, geistlicher Identität und der Kunst, im Alltag mit Gott zu rechnen.",
    photo: null,
  },
  {
    slug: "hanna-koenig",
    name: "Hanna König",
    role: "Lobpreisleitung",
    bio: "Hanna ist Musikerin und gestaltet seit vielen Jahren Gottesdienste und Konferenzen. Sie lebt mit ihrer Familie in Freiburg.",
    photo: null,
  },
  {
    slug: "sabine-vogt",
    name: "Sabine Vogt",
    role: "Seminarleitung · Beraterin für Ehe und Familie",
    bio: "Sabine arbeitet als Paarberaterin und ist Mutter von drei Kindern. In ihren Seminaren geht es um Ehrlichkeit, Vergebung und tragfähige Beziehungen.",
    photo: null,
  },
];

export interface ProgramItem {
  time: string;
  title: string;
  kind: "plenum" | "workshop" | "pause" | "gottesdienst" | "gemeinschaft";
  speaker?: string;
  description?: string;
}

export interface ProgramDay {
  label: string;
  date: string;
  items: ProgramItem[];
}

export const PROGRAM: ProgramDay[] = [
  {
    label: "Freitag",
    date: "18. September 2026",
    items: [
      { time: "16:00", title: "Ankunft & Anmeldung", kind: "gemeinschaft" },
      { time: "18:00", title: "Abendessen", kind: "pause" },
      { time: "19:30", title: "Eröffnungsabend: Erquickt werden", kind: "plenum", speaker: "Elisabeth Meier" },
      { time: "21:30", title: "Stilles Gebet & Kerzenlicht", kind: "gottesdienst" },
    ],
  },
  {
    label: "Samstag",
    date: "19. September 2026",
    items: [
      { time: "08:00", title: "Morgenlob", kind: "gottesdienst", speaker: "Hanna König" },
      { time: "09:00", title: "Frühstück", kind: "pause" },
      { time: "10:00", title: "Lehrvortrag: Identität in Christus", kind: "plenum", speaker: "Elisabeth Meier" },
      { time: "11:30", title: "Workshop-Runde I", kind: "workshop" },
      { time: "13:00", title: "Mittagessen & Pause", kind: "pause" },
      { time: "15:00", title: "Workshop-Runde II", kind: "workshop" },
      { time: "17:00", title: "Begegnungs-Café", kind: "gemeinschaft" },
      { time: "19:00", title: "Festliches Abendessen", kind: "pause" },
      { time: "20:30", title: "Lobpreis-Abend", kind: "gottesdienst", speaker: "Hanna König" },
    ],
  },
  {
    label: "Sonntag",
    date: "20. September 2026",
    items: [
      { time: "08:30", title: "Frühstück", kind: "pause" },
      { time: "10:00", title: "Abschlussgottesdienst", kind: "gottesdienst", speaker: "Elisabeth Meier" },
      { time: "12:00", title: "Mittagessen & Abreise", kind: "pause" },
    ],
  },
];

export interface Workshop {
  slug: string;
  title: string;
  leader: string;
  description: string;
  round: "I" | "II" | "beide";
}

export const WORKSHOPS: Workshop[] = [
  {
    slug: "ehrlich-beten",
    title: "Ehrlich beten",
    leader: "Sabine Vogt",
    description: "Gebet ohne fromme Phrasen — wie wir mit Gott so reden, wie wir wirklich sind.",
    round: "I",
  },
  {
    slug: "schrift-lesen",
    title: "Schrift lesen, die mich trifft",
    leader: "Elisabeth Meier",
    description: "Methoden, die Bibel nicht nur zu konsumieren, sondern sich von ihr lesen zu lassen.",
    round: "I",
  },
  {
    slug: "ehe-beziehung",
    title: "Beziehung halten",
    leader: "Sabine Vogt",
    description: "Was Ehe und enge Freundschaften über die Jahre trägt — und was sie aushöhlt.",
    round: "II",
  },
  {
    slug: "lobpreis-stimme",
    title: "Meine Stimme im Lobpreis",
    leader: "Hanna König",
    description: "Ein Mitsing-Workshop für alle, die denken, sie könnten nicht singen.",
    round: "II",
  },
  {
    slug: "stille-retreat",
    title: "Stille-Retreat",
    leader: "Elisabeth Meier",
    description: "Eine geführte Stille-Einheit mit Impulsen. Keine Vorerfahrung nötig.",
    round: "beide",
  },
];

export interface PricingTier {
  slug: string;
  name: string;
  price: number;
  includes: string[];
  featured?: boolean;
}

export const PRICING: PricingTier[] = [
  {
    slug: "einzelzimmer",
    name: "Einzelzimmer",
    price: 285,
    includes: ["Eigenes Zimmer mit Bad", "Vollverpflegung", "Alle Vorträge und Workshops", "Konferenz-Unterlagen"],
  },
  {
    slug: "doppelzimmer",
    name: "Doppelzimmer",
    price: 225,
    includes: ["Zimmer zu zweit (gleichgeschlechtlich)", "Vollverpflegung", "Alle Vorträge und Workshops", "Konferenz-Unterlagen"],
    featured: true,
  },
  {
    slug: "tagesgast",
    name: "Tagesgast",
    price: 65,
    includes: ["Teilnahme an einem Konferenztag", "Mittag- und Abendessen", "Alle Vorträge und Workshops dieses Tages"],
  },
];

export const GALLERY_PHOTOS = [
  { src: "/gallery/placeholder-1.jpg", alt: "Blick über den Tagungsort" },
  { src: "/gallery/placeholder-2.jpg", alt: "Morgenlob" },
  { src: "/gallery/placeholder-3.jpg", alt: "Begegnungs-Café" },
  { src: "/gallery/placeholder-4.jpg", alt: "Lobpreis-Abend" },
  { src: "/gallery/placeholder-5.jpg", alt: "Workshop-Runde" },
  { src: "/gallery/placeholder-6.jpg", alt: "Abendessen" },
] as const;

export const CONTACT = {
  email: "hallo@meetandrefresh.de",
  phone: "+49 (0) 176 0000 0000",
  instagram: "@meetandrefresh",
  operator: {
    name: "Meet & Refresh — Veranstalterin",
    street: "Musterstraße 1",
    city: "79098 Freiburg",
  },
};
