import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { getSupabasePublicKey, getSupabaseUrl } from "./env";

export function hasSupabaseEnv(): boolean {
  return Boolean(getSupabaseUrl() && getSupabasePublicKey());
}

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    getSupabaseUrl() ?? "https://placeholder.supabase.co",
    getSupabasePublicKey() ?? "placeholder-anon-key",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // set() is called from a Server Component without a response
            // (read-only context). Ignorieren — Cookie-Refresh lauft via Middleware.
          }
        },
      },
    },
  );
}
