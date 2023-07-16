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

  const { data: ratings, error } = await supabase
    .from("ratings")
    .select("*")
    .eq("project_id", project.id);

  if (error) {
    console.error(error);
    return <div>Error loading ratings</div>;
  }

  if (!ratings) {
    return <div>Loading ratings...</div>;
  }

  if (ratings.length === 0) {
    return <div>No ratings yet</div>;
  }

  console.log(ratings);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6">Ratings</h1>
        </div>
      </div>
    </div>
  );
}
