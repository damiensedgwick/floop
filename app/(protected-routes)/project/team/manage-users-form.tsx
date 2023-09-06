import { revalidatePath } from "next/cache";
import { supabase as sb } from "@/lib/supabase";
import DeleteAndRemoveUserButton from "./delete-and-remove-user-button.client";
import {
  createServerComponentClient,
  getProject,
} from "@/app/(protected-routes)/project/utils";

type Props = {
  projectId: string;
  isProjectOwner: boolean;
};

export default async function ManageUsersForm({
  projectId,
  isProjectOwner,
}: Props) {
  const project = await getProject();

  async function deleteAndRemoveUser(userId: string) {
    "use server";

    await sb.auth.admin.deleteUser(userId);

    revalidatePath("/project/team");
  }

  return (
    <div className="space-y-6">
      {project.users
        ?.filter((user) => user.id !== project?.owner_id)
        .map((user) => (
          <div
            key={user.id}
            className="flex w-full flex-col items-start justify-between space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:items-center"
          >
            <div>
              <p className="text-sm font-medium leading-none">
                {user.preferred_name || user.first_name || "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <DeleteAndRemoveUserButton
              userId={user.id}
              onDeleteHandler={deleteAndRemoveUser}
              disabled={!isProjectOwner}
            />
          </div>
        ))}
    </div>
  );
}
