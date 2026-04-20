import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MaterialIcon } from "@/components/material-icon";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { signInWithEmail, signUpWithEmail } from "./actions";

export const metadata = { title: "Mein Bereich" };

const ERROR_LABEL: Record<string, string> = {
  invalid_credentials: "E-Mail oder Passwort falsch.",
  email_not_confirmed: "Bitte bestätige zuerst deine E-Mail.",
  user_already_exists: "Für diese E-Mail existiert bereits ein Konto.",
  weak_password: "Das Passwort ist zu kurz (mind. 8 Zeichen).",
  supabase_not_configured: "Login vorübergehend nicht verfügbar.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; error?: string; info?: string }>;
}) {
  const { mode, error, info } = await searchParams;
  const isSignup = mode === "signup";

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/portal");

  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-md mx-auto px-6 py-16">
        <div className="bg-surface-container-lowest rounded-2xl p-8 editorial-shadow">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">
            {isSignup ? "Konto anlegen" : "Mein Bereich"}
          </p>
          <h1 className="text-3xl font-bold mb-2">
            {isSignup ? "Willkommen im Portal." : "Willkommen zurück."}
          </h1>
          <p className="text-sm text-on-surface-variant mb-8">
            {isSignup
              ? "Lege dir ein Konto an, um deine Anmeldung, Workshops und alle Infos im Blick zu haben."
              : "Melde dich an, um deine Buchung, Raumplan und Ankündigungen zu sehen."}
          </p>

          {error && (
            <div className="rounded-xl bg-error/10 border border-error/30 px-4 py-3 text-sm text-on-error-container mb-4">
              {ERROR_LABEL[error] ?? error}
            </div>
          )}
          {info === "check_email" && (
            <div className="rounded-xl bg-secondary-fixed/30 border border-secondary/30 px-4 py-3 text-sm mb-4">
              Fast geschafft — check deine Mails und bestätige die Adresse.
            </div>
          )}

          <form action={isSignup ? signUpWithEmail : signInWithEmail} className="space-y-4">
            {isSignup && (
              <Field label="Name">
                <input
                  name="full_name"
                  required
                  className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
                />
              </Field>
            )}
            <Field label="E-Mail">
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
              />
            </Field>
            <Field label="Passwort">
              <input
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full rounded-xl border border-outline-variant/50 bg-background px-4 py-3 focus:border-primary focus:outline-none"
              />
            </Field>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-3.5 rounded-full font-semibold hover:bg-primary-container transition-colors"
            >
              {isSignup ? "Konto anlegen" : "Anmelden"}
              <MaterialIcon name="arrow_forward" size={18} />
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-on-surface-variant">
            {isSignup ? (
              <>
                Schon ein Konto? <Link href="/login" className="text-primary hover:underline font-semibold">Anmelden</Link>
              </>
            ) : (
              <>
                Noch kein Konto? <Link href="/login?mode=signup" className="text-primary hover:underline font-semibold">Jetzt anlegen</Link>
              </>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest font-semibold text-on-surface-variant mb-2">{label}</span>
      {children}
    </label>
  );
}
