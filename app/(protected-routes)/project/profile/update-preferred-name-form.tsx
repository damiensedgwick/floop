import { getPublicUser } from "@/app/(protected-routes)/project/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import UpdatePreferredNameFormClient from "@/app/(protected-routes)/project/profile/update-preferred-name-form.client";

export default async function UpdatedPreferredNameForm() {
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

  return (
    <UpdatePreferredNameFormClient
      preferredName={user.preferred_name || "John Doe"}
      userId={user.id}
      handleUpdateProfile={handleUpdatePreferredName}
    />
  );
}
