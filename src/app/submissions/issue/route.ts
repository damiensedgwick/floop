import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request): Promise<NextResponse> {
  const { project_id, title, message, user_email } = await request.json();

  // message is the only value allowed to be null here.
  if (!project_id || !title || !message || !user_email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const sb = createClient(
    String(process.env.NEXT_PUBLIC_SUPABASE_URL),
    String(process.env.NEXT_PUBLIC_SUPABASE_KEY)
  );

  const { error } = await sb.from("issue").insert({
    project_id: project_id,
    title: title,
    message: message,
    user_email: user_email,
  });

  if (error) {
    console.log(error);

    return NextResponse.json(
      { message: `Error ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Rating successfully submitted" },
    { status: 201 }
  );
}
