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
    country: "Österreich",
    name: "Campus Horn",
    address: "Canisiusgasse 1, 3580 Horn, Österreich",
    shortName: "Campus Horn, Österreich",
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
    bio: "Hanna ist Musikerin und gestaltet seit vielen Jahren Gottesdienste und Konferenzen.",
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
    slug: "familienzimmer-3",
    name: "Familienzimmer 3 Personen",
    price: 675,
    includes: ["3er-Zimmer als Gruppe", "Vollverpflegung für 3 Personen", "Alle Vorträge und Workshops", "Sammelzahlung durch eine Buchende"],
  },
  {
    slug: "familienzimmer-4",
    name: "Familienzimmer 4 Personen",
    price: 900,
    includes: ["4er-Zimmer als Gruppe", "Vollverpflegung für 4 Personen", "Alle Vorträge und Workshops", "Sammelzahlung durch eine Buchende"],
  },
];

export const GALLERY_PHOTOS = [
  { src: "/stock/retreat-women-photo.png", alt: "Helle Seminaratmosphäre mit Frauen" },
  { src: "/stock/campus-horn-photo.png", alt: "Campus-Atmosphäre und Außenbereich" },
  { src: "/stock/worship-photo.png", alt: "Lobpreis und geistliche Gemeinschaft" },
  { src: "/photos/audience-clapping.jpg", alt: "Teilnehmerinnen applaudieren nach einer Session" },
  { src: "/photos/community-highfive.jpg", alt: "Gemeinschaft und Freude bei einer Veranstaltung" },
  { src: "/photos/happy-speaker.jpg", alt: "Referentin spricht zu Teilnehmerinnen" },
  { src: "/photos/speaker-stage.jpg", alt: "Sprecherin auf der Bühne" },
  { src: "/photos/community-heart-hands.jpg", alt: "Frauen formen ein Herz mit den Händen" },
  { src: "/photos/speaker-microphone-grey.jpg", alt: "Moderatorin mit Mikrofon" },
] as const;

export const CONTACT = {
  email: "hallo@meetandrefresh.de",
  phone: "+49 (0) 176 0000 0000",
  whatsapp: "+49 176 0000 0000",
  instagram: "@meetandrefresh",
  operator: {
    name: "Meet & Refresh — Veranstalterin",
    street: "Musterstraße 1",
    city: "3580 Horn, Österreich",
  },
};
