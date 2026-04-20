"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function errorCode(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid login")) return "invalid_credentials";
  if (m.includes("email not confirmed")) return "email_not_confirmed";
  if (m.includes("already registered") || m.includes("already exists")) return "user_already_exists";
  if (m.includes("password")) return "weak_password";
  return encodeURIComponent(message);
}

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${errorCode(error.message)}`);
  }
  redirect("/portal");
}

export async function signUpWithEmail(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });

  if (error) {
    redirect(`/login?mode=signup&error=${errorCode(error.message)}`);
  }

  // Wenn E-Mail-Bestaetigung aktiv, gibt's noch keine Session
  if (!data.session) {
    redirect("/login?info=check_email");
  }
  redirect("/portal");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}
