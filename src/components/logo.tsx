import Image from "next/image";

export function Logo({ className = "", as: Tag = "div" }: { className?: string; as?: "div" | "span" }) {
  return (
    <Tag className={`inline-flex items-center gap-3 leading-none ${className}`}>
      <Image
        src="/meetand-logo.png"
        alt="Meet & Refresh Logo"
        width={72}
        height={84}
        className="h-12 w-auto"
        style={{ width: "auto", height: "3rem" }}
        priority
      />
      <span className="hidden font-sans text-xl font-extrabold tracking-tight text-on-surface sm:inline">
        Meet & Refresh
      </span>
    </Tag>
  );
}
