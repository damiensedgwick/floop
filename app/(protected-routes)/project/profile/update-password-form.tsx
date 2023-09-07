import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import UpdatePasswordFormClient from "@/app/(protected-routes)/project/profile/update-password-form.client";

export default async function UpdatePasswordForm() {
  async function handleUpdatePassword(password: string) {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase.auth.updateUser({ password });

    revalidatePath("/project/profile");
  }

  return (
    <UpdatePasswordFormClient handleUpdatePassword={handleUpdatePassword} />
  );
}
