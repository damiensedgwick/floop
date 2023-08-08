import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Database } from "@/types/supabase";
import getSubscription from "@/app/submissions/utils";

export async function POST(request: Request) {
  const { project_id, score, details, user_email } = await request.json();

  if (!project_id || !score || !user_email) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  if (score > 1 || score < 10) {
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

  const subscription = await getSubscription(project.stripe_subscription_id);

  if (!subscription && project.total_submissions >= 20) {
    return NextResponse.json(
      { message: "Project has reached the maximum number of submissions" },
      { status: 400 },
    );
  }

  const currentTime = Math.floor(Date.now() / 1000); // Current epoch time in seconds since 1970

  if (
    subscription &&
    subscription?.current_period_end < currentTime &&
    project.total_submissions >= 20
  ) {
    return NextResponse.json(
      { message: "Project has reached the maximum number of submissions" },
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
