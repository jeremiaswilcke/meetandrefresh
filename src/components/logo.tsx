// Textmarke in Kanit mit dem charakteristischen Kreuz-Glyph zwischen den
// Worten. Keine Bilddatei — skaliert, tintbar, barrierearm.
//
// Die Kreuzform ist aus zwei ueberlagerten L-Formen aufgebaut:
// ein dunkelgruenes breites L und ein hellgruenes schmales L, die gemeinsam
// das Kreuzzeichen ergeben.
export function Logo({ className = "", as: Tag = "div" }: { className?: string; as?: "div" | "span" }) {
  return (
    <Tag className={`inline-flex items-center gap-1.5 font-sans font-extrabold leading-none ${className}`}>
      <span className="text-primary-fixed-dim">Meet</span>
      <LogoMark />
      <span className="text-primary">Refresh</span>
    </Tag>
  );
}

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block align-middle"
      style={{ width: "1.1em", height: "1.1em" }}
    >
      {/* Dunkles L — Hauptbalken des Kreuzes (Schenkel oben, Fuss unten) */}
      <span
        className="absolute bg-primary"
        style={{ left: "38%", top: "0", width: "24%", height: "100%" }}
      />
      <span
        className="absolute bg-primary"
        style={{ left: "38%", top: "42%", width: "52%", height: "20%" }}
      />
      {/* Helles L — Gegenform, links versetzt */}
      <span
        className="absolute bg-primary-fixed-dim"
        style={{ left: "10%", top: "32%", width: "40%", height: "20%" }}
      />
      <span
        className="absolute bg-primary-fixed-dim"
        style={{ left: "30%", top: "32%", width: "18%", height: "68%" }}
      />
    </span>
  );
}
