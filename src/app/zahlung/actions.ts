"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function confirmDemoPayment(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createServerSupabaseClient();
  await supabase
    .from("registrations")
    .update({ status: "paid", payment_status: "paid" })
    .eq("id", id);

  redirect(`/zahlung?id=${id}`);
}
