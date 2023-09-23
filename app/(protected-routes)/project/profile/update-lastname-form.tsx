import { getPublicUser } from "@/app/(protected-routes)/project/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import UpdateLastNameFormClient from "@/app/(protected-routes)/project/profile/update-last-name-form.client";

type Props = {
  name: string;
  id: string;
};

export default async function UpdateLastNameForm({ name, id }: Props) {
  const user = await getPublicUser();

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
    <UpdateLastNameFormClient
      lastName={name}
      userId={id}
      handleUpdateProfile={handleUpdateLastName}
    />
  );
}
