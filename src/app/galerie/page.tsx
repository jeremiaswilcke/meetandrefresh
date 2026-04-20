import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { GALLERY_PHOTOS } from "@/data/event";

export const metadata = { title: "Galerie" };

export default function Galerie() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
        <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Galerie</p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          So war<br />
          <span className="text-primary">letztes Jahr.</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Eindrücke vom letzten Wochenende. Die Stimmung bekommt man nur in Bildern halbwegs rüber — wirklich erleben muss man es selbst.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_PHOTOS.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-fixed to-primary-fixed-dim ${
                i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-[4/3]" : "aspect-square"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <MaterialIcon name="image" size={i === 0 ? 80 : 40} className="text-primary/30" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
                <p className="text-white text-xs font-medium">{p.alt}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-on-surface-variant italic">
          Bilder-Platzhalter — echte Fotos folgen nach der Konferenz 2026.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
