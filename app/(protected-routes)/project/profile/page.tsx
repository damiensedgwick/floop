import { getPublicUser } from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import UpdatePreferredNameForm from "@/app/(protected-routes)/project/profile/update-preferred-name-form.client";
import UpdateFirstNameForm from "@/app/(protected-routes)/project/profile/update-first-name-form.client";
import UpdateLastNameForm from "@/app/(protected-routes)/project/profile/update-last-name-form.client";
import { Database } from "@/types/supabase";
import { revalidatePath } from "next/cache";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  const user = await getPublicUser();

  async function handleUpdatePreferredName(name: string, userId: string) {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase
      .from("users")
      .update({
        preferred_name: name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    revalidatePath("/project/profile");
    revalidatePath("/project/settings");
  }

  async function handleUpdateFirstName(name: string, userId: string) {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase
      .from("users")
      .update({
        first_name: name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    revalidatePath("/project/profile");
    revalidatePath("/project/settings");
  }

  async function handleUpdateLastName(name: string, userId: string) {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase
      .from("users")
      .update({
        last_name: name,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    revalidatePath("/project/profile");
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8 pb-16">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Profile</h1>
          <Separator />
          <UpdatePreferredNameForm
            preferredName={user.preferred_name || "John Doe"}
            userId={user.id}
            handleUpdateProfile={handleUpdatePreferredName}
          />
          <UpdateFirstNameForm
            firstName={user.first_name || "John"}
            userId={user.id}
            handleUpdateProfile={handleUpdateFirstName}
          />
          <UpdateLastNameForm
            lastName={user.last_name || "Doe"}
            userId={user.id}
            handleUpdateProfile={handleUpdateLastName}
          />
        </div>
      </div>
    </div>
  );
}
