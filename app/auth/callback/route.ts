import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createNewProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { supabase as sb } from "@/lib/supabase";

interface X {
  [key: string]: string | undefined;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  const user = await getPublicUser();

  if (!user.project_id) {
    const { data } = await sb.auth.admin.getUserById(user.id);

    if (data.user) {
      const { user } = data;

      const { project_id } = user.app_metadata as {
        [key: string]: string | undefined;
      };

      if (project_id) {
        const supabase = createRouteHandlerClient({ cookies });

        await supabase
          .from("users")
          .update({ project_id })
          .match({ id: user.id });
      }
    }
  }

  await createNewProject(user);

  return NextResponse.redirect(requestUrl.origin);
}
