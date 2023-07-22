import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function POST(request: Request): Promise<NextResponse> {
  const { project_id, score, details, user_email } = await request.json();

  // details is the only value allowed to be null here.
  if (!project_id || !score || !user_email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const supabase = createServerComponentClient<Database>({ cookies });

  const { error } = await supabase.from("ratings").insert({
    project_id: project_id,
    score: score,
    details: details.length ? details : "---",
    user_email: user_email,
  });

  if (error) {
    console.log(error);

    return NextResponse.json(
      { message: `Error ${error.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Rating successfully submitted" },
    { status: 201 },
  );
}
