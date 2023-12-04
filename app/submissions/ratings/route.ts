import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase";
import getSubscription from "@/app/submissions/utils";

export async function POST(request: Request) {
  const { project_id, score, details, user_email } = await request.json();

  if (project_id === "preview-widget" && user_email === "preview@widget.com") {
    return NextResponse.json(
      { message: "Preview submission successful" },
      { status: 200 },
    );
  }

  if (!project_id || !score || !user_email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  if ((score < 1 || score > 10) && score !== typeof "number") {
    return NextResponse.json(
      { message: "Score must be between 1 and 10, and must be a number" },
      { status: 400 },
    );
  }

  if (details && details.length > 150) {
    return NextResponse.json(
      { message: "Details must be less than 150 characters" },
      { status: 400 },
    );
  }

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data: project } = await supabase
    .from("projects")
    .select("id, total_submissions, stripe_subscription_id")
    .eq("id", project_id)
    .single();

  if (!project) {
    return NextResponse.json(
      { message: "Project does not exist" },
      { status: 400 },
    );
  }

  const { error } = await supabase.from("ratings").insert({
    project_id,
    score,
    details,
    user_email,
  });

  if (error) {
    console.log(error);
    return NextResponse.json({ message: `Error ${error}` }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Rating successfully submitted" },
    { status: 201 },
  );
}
