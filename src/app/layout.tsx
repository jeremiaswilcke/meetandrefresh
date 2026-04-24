import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { ContactRail } from "@/components/contact-rail";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Meet & Refresh — Jahreskonferenz für christliche Frauen",
    template: "%s · Meet & Refresh",
  },
  description:
    "Ein Wochenende Auszeit, Begegnung und geistliches Auftanken. Lobpreis, Lehre, Gespräche und neue Freundschaften — für Frauen, die im Glauben weiter wachsen wollen.",
  openGraph: {
    type: "website",
    title: "Meet & Refresh — Jahreskonferenz für christliche Frauen",
    description:
      "Ein Wochenende Auszeit, Begegnung und geistliches Auftanken.",
    locale: "de_DE",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${kanit.variable} h-full antialiased`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-sans">
        <ContactRail />
        {children}
      </body>
    </html>
  );
}
