import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // In a real app, fetch from Supabase with user_id from session
  // For now, progress is managed client-side via Zustand/localStorage
  return NextResponse.json({ message: "Progress is managed client-side via Zustand. Connect Supabase to enable server persistence." });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // In a real app: sync progress to Supabase
    // const supabase = await createServerSupabaseClient();
    // await supabase.from('lessons_progress').upsert(...)

    return NextResponse.json({ success: true, synced: body });
  } catch (err) {
    console.error("Progress sync error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
