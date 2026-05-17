import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function requireAuth() {
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Authentication service unavailable" },
      { status: 503 }
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  return { session, userId: session.user.id };
}

export async function optionalAuth() {
  const supabase = await createClient();
  if (!supabase) return { session: null, userId: null };

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session, userId: session?.user?.id ?? null };
}
