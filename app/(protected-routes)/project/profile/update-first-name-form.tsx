import { getPublicUser } from "@/app/(protected-routes)/project/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import UpdateFirstNameFormClient from "@/app/(protected-routes)/project/profile/update-first-name-form.client";

export default async function UpdateFirstNameForm() {
  const user = await getPublicUser();

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

  return (
    <UpdateFirstNameFormClient
      firstName={user.first_name || "John"}
      userId={user.id}
      handleUpdateProfile={handleUpdateFirstName}
    />
  );
}
