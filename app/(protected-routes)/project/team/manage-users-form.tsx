import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase as sb } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import DeleteAndRemoveUserButton from "./delete-and-remove-user-button.client";

type Props = {
  projectId: string;
};

export default async function ManageUsersForm({ projectId }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: project } = await supabase
    .from("projects")
    .select()
    .eq("id", projectId)
    .single();

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("project_id", projectId);

  async function deleteAndRemoveUser(userId: string) {
    "use server";

    await sb.auth.admin.deleteUser(userId);

    revalidatePath("/project/team");
  }

  return (
    <div className="space-y-6">
      {users
        ?.filter((user) => user.id !== project?.owner_id)
        .map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium leading-none">
                {user.preferred_name ||
                  user.first_name ||
                  "Name has not been updated"}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <DeleteAndRemoveUserButton
              userId={user.id}
              onDeleteHander={deleteAndRemoveUser}
            />
          </div>
        ))}
    </div>
  );
}
