import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
            // (read-only context). Ignorieren — refreshing cookies erfolgt im Middleware.
          }
        },
      },
    },
  );
}
