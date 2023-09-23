import { getPublicUser } from "@/app/(protected-routes)/project/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import UpdatePreferredNameFormClient from "@/app/(protected-routes)/project/profile/update-preferred-name-form.client";

type Props = {
  name: string;
  id: string;
};

export default async function UpdatedPreferredNameForm({ name, id }: Props) {
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
      preferredName={name}
      userId={id}
      handleUpdateProfile={handleUpdatePreferredName}
    />
  );
}
