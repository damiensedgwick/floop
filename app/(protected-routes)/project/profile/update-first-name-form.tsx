import { getPublicUser } from "@/app/(protected-routes)/project/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import UpdateFirstNameFormClient from "@/app/(protected-routes)/project/profile/update-first-name-form.client";

type Props = {
  name: string;
  id: string;
};

export default async function UpdateFirstNameForm({ name, id }: Props) {
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
      firstName={name}
      userId={id}
      handleUpdateProfile={handleUpdateFirstName}
    />
  );
}
