import { createServerSupabaseClient } from "@/lib/supabase/server";
import { MaterialIcon } from "@/components/material-icon";

export const metadata = { title: "Profil" };

export default async function PortalProfil() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, notes")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  return (
    <>
      <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Profil</p>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">Deine Daten.</h1>

      <section className="mt-8 bg-surface-container-lowest rounded-2xl p-6 md:p-8 editorial-shadow space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Name</p>
          <p className="font-semibold text-lg">{profile?.full_name || "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">E-Mail</p>
          <p className="font-semibold">{user?.email}</p>
        </div>
        {profile?.phone && (
          <div>
            <p className="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Telefon</p>
            <p className="font-semibold">{profile.phone}</p>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-2xl bg-secondary-fixed/20 border border-secondary/20 p-5 flex items-start gap-3">
        <MaterialIcon name="info" size={20} className="text-primary mt-0.5" />
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Profil-Bearbeitung kommt demnächst. Für Änderungen schreib uns kurz per Mail.
        </p>
      </section>
    </>
  );
}
