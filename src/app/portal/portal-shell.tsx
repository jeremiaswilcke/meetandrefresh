"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { MaterialIcon } from "@/components/material-icon";
import { signOut } from "../login/actions";

const NAV = [
  { href: "/portal", label: "Dashboard", icon: "home" },
  { href: "/portal/buchung", label: "Meine Buchung", icon: "event_available" },
  { href: "/portal/raumplan", label: "Raumplan", icon: "map" },
  { href: "/portal/profil", label: "Profil", icon: "person" },
];

export function PortalShell({
  userEmail,
  userName,
  children,
}: {
  userEmail: string;
  userName: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col bg-surface-container-low border-r border-outline-variant/30 p-6">
        <Link href="/" className="mb-10">
          <Logo className="text-xl" />
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <MaterialIcon name={item.icon} size={20} filled={active} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 bg-surface-container-lowest rounded-xl p-4">
          <p className="text-xs text-on-surface-variant truncate">{userEmail}</p>
          <p className="font-semibold text-sm truncate">{userName ?? "Teilnehmerin"}</p>
          <form action={signOut}>
            <button
              type="submit"
              className="mt-3 inline-flex items-center gap-1 text-xs text-on-surface-variant hover:text-error"
            >
              <MaterialIcon name="logout" size={14} />
              Abmelden
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-outline-variant/30 bg-background">
        <Link href="/"><Logo className="text-lg" /></Link>
        <form action={signOut}>
          <button className="text-xs text-on-surface-variant inline-flex items-center gap-1">
            <MaterialIcon name="logout" size={14} />
            Abmelden
          </button>
        </form>
      </div>

      <main className="flex-1 px-6 py-8 md:py-12 max-w-4xl w-full mx-auto pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-background/90 backdrop-blur-md border-t border-outline-variant/30">
        <div className="flex justify-around items-stretch">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-[11px] ${
                  active ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                <MaterialIcon name={item.icon} size={22} filled={active} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
