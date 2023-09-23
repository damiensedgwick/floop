import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createNewProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  const user = await getPublicUser();

  if (!user.project_id) {
    await createNewProject(user);
  }

  // TODO: POST to go function to send welcome email to the user with
  //  instructions and links so that they can get up and running quickly?

  return NextResponse.redirect(requestUrl.origin + "/project");
}
