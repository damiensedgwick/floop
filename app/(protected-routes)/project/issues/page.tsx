import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Database } from "@/types/supabase";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: issues } = await supabase
    .from("issues")
    .select("*")
    .eq("project_id", project.id);

  console.log(issues);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6">Issues</h1>
        </div>
      </div>
    </div>
  );
}
