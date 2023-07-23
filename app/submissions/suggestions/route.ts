import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase";

export async function POST(request: Request) {
  const { project_id, title, details, user_email } = await request.json();

  if (!project_id || !title || !user_email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });

  if (title.length > 75) {
    return NextResponse.json(
      { message: "Title must be less than 75 characters" },
      { status: 400 },
    );
  }

  if (details && details.length > 150) {
    return NextResponse.json(
      { message: "Details must be less than 150 characters" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("suggestions").insert({
    project_id,
    title,
    details,
    user_email,
  });

  if (error) {
    console.log(error);
    return NextResponse.json({ message: `Error ${error}` }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Submission successfully submitted" },
    { status: 201 },
  );
}
