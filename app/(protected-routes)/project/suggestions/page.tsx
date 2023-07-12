import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { error } = await supabase
    .from("project_users")
    .select()
    .eq("user_id", user.id)
    .single();

  if (error) {
    redirect("/project/new");
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Suggestions
          </h1>
          {/* <p className="mt-2 text-sm text-gray-700">
            A list of all your team mates
          </p> */}
        </div>
      </div>
    </div>
  );
}
