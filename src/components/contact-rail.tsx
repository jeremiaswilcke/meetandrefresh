import { CONTACT } from "@/data/event";
import { MaterialIcon } from "./material-icon";

export function ContactRail() {
  const whatsapp = CONTACT.whatsapp ?? CONTACT.phone;
  const whatsappNumber = whatsapp.replace(/[^\d]/g, "");

  return (
    <aside
      aria-label="Schnellkontakt"
      className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 md:flex"
    >
      <a
        href={`mailto:${CONTACT.email}`}
        className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-lg shadow-primary/20 transition-all hover:w-36 hover:justify-start hover:gap-2 hover:px-4"
        aria-label="E-Mail schreiben"
      >
        <MaterialIcon name="mail" size={22} filled />
        <span className="hidden whitespace-nowrap text-sm font-semibold group-hover:inline">E-Mail</span>
      </a>
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="group flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-on-secondary shadow-lg shadow-secondary/20 transition-all hover:w-36 hover:justify-start hover:gap-2 hover:px-4"
        aria-label="WhatsApp schreiben"
      >
        <MaterialIcon name="chat" size={22} filled />
        <span className="hidden whitespace-nowrap text-sm font-semibold group-hover:inline">WhatsApp</span>
      </a>
    </aside>
  );
}
