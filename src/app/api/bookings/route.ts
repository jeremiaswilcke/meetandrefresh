import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

type Payload = {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  room_type: "single" | "double_known" | "double_unknown" | "multi";
  room_variant?: "3" | "4";
  roommate_name?: string;
  matching_code?: string;
  group_members?: string[];
  dietary_notes?: string;
  privacy_accepted: boolean;
  event_slug: string;
};

const amountByRoom = {
  single: 28500,
  double_known: 22500,
  double_unknown: 22500,
  multi3: 67500,
  multi4: 90000,
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Payload;
    validate(payload);

    const supabase = createAdminSupabaseClient();
    const email = payload.email.trim().toLowerCase();
    const fullName = `${payload.first_name.trim()} ${payload.last_name.trim()}`.trim();
    const token = randomUUID();

    if (payload.room_type === "single") {
      const { data: inventory, error: invError } = await supabase.rpc("reserve_single_room");
      if (invError) throw invError;
      if (!inventory) return NextResponse.json({ status: "sold_out" }, { status: 409 });
    }

    const status = initialStatus(payload);
    const amount = amountFor(payload);
    const { data: registration, error } = await supabase
      .from("registrations")
      .insert({
        event_slug: payload.event_slug,
        full_name: fullName,
        email,
        phone: payload.phone || null,
        package_slug: payload.room_type,
        room_type: payload.room_type,
        room_variant: payload.room_variant ?? null,
        roommate_name: payload.roommate_name || null,
        matching_code: normalizeMatchKey(payload.matching_code || payload.roommate_name || ""),
        group_members: payload.group_members ?? [],
        dietary_notes: payload.dietary_notes || null,
        privacy_accepted: payload.privacy_accepted,
        amount_cents: amount,
        status,
        payment_status: status === "payment_requested" ? "open" : "not_requested",
        participant_token: token,
      })
      .select("id, status, participant_token")
      .single();

    if (error) throw error;

    if (payload.room_type === "double_known") {
      const matchKey = normalizeMatchKey(payload.matching_code || payload.roommate_name || "");
      await matchKnownRoommate(supabase, registration.id, matchKey);
    }

    if (payload.room_type === "double_unknown") {
      await matchUnknownRoommate(supabase, registration.id);
    }

    return NextResponse.json({
      id: registration.id,
      status: registration.status,
      payNow: ["single", "multi"].includes(payload.room_type),
      paymentPath: `/zahlung?id=${registration.id}`,
      portalPath: `/portal/buchung`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Buchung fehlgeschlagen";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function validate(payload: Payload) {
  if (!payload.privacy_accepted) throw new Error("Bitte Datenschutz akzeptieren.");
  if (!payload.first_name || !payload.last_name || !payload.email) throw new Error("Name und E-Mail sind Pflichtfelder.");
  if (payload.room_type === "double_known" && !payload.matching_code && !payload.roommate_name) {
    throw new Error("Bitte Matching-Code oder Zimmerpartnerin angeben.");
  }
  if (payload.room_type === "multi") {
    const expected = payload.room_variant === "4" ? 3 : 2;
    if ((payload.group_members ?? []).filter(Boolean).length !== expected) {
      throw new Error(`Bitte ${expected} weitere Personen für das Familienzimmer angeben.`);
    }
  }
}

function initialStatus(payload: Payload) {
  if (payload.room_type === "double_known") return "pending_match";
  if (payload.room_type === "double_unknown") return "waiting_for_roommate";
  return "payment_requested";
}

function amountFor(payload: Payload) {
  if (payload.room_type === "multi") return payload.room_variant === "4" ? amountByRoom.multi4 : amountByRoom.multi3;
  return amountByRoom[payload.room_type];
}

function normalizeMatchKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-");
}

async function matchKnownRoommate(supabase: ReturnType<typeof createAdminSupabaseClient>, bookingId: string, matchKey: string) {
  const { data: partner } = await supabase
    .from("registrations")
    .select("id")
    .eq("room_type", "double_known")
    .eq("status", "pending_match")
    .eq("matching_code", matchKey)
    .neq("id", bookingId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!partner) return;
  await supabase.from("room_matches").insert({ booking_ids: [partner.id, bookingId], room_type: "double", match_status: "matched" });
  await supabase.from("registrations").update({ status: "payment_requested", payment_status: "open" }).in("id", [partner.id, bookingId]);
}

async function matchUnknownRoommate(supabase: ReturnType<typeof createAdminSupabaseClient>, bookingId: string) {
  const { data: partner } = await supabase
    .from("registrations")
    .select("id")
    .eq("room_type", "double_unknown")
    .eq("status", "waiting_for_roommate")
    .neq("id", bookingId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!partner) return;
  await supabase.from("room_matches").insert({ booking_ids: [partner.id, bookingId], room_type: "double", match_status: "matched" });
  await supabase.from("registrations").update({ status: "payment_requested", payment_status: "open" }).in("id", [partner.id, bookingId]);
}
