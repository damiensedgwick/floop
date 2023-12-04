import { revalidatePath } from "next/cache";
import { supabase as sb } from "@/lib/supabase";
import {
  createServerComponentClient,
  getProject,
} from "@/app/(protected-routes)/project/utils";
import Mail from "@/components/icons/mail";
import Phone from "@/components/icons/phone";
import DeleteAndRemoveUserButton from "@/app/(protected-routes)/project/team/delete-and-remove-user-button.client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  isProjectOwner: boolean;
  ownerId: string;
};

export default async function TeamPreview({ isProjectOwner, ownerId }: Props) {
  const project = await getProject();
  const supabase = createServerComponentClient();

  const { data: members } = await supabase
    .from("users")
    .select()
    .match({ project_id: project.id })
    .order("created_at");

  async function deleteAndRemoveUser(userId: string) {
    "use server";

    await sb.auth.admin.deleteUser(userId);

    revalidatePath("/project/team");
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {members
        ? members.map((member) => (
            <li
              key={member.email}
              className="flex flex-col justify-between col-span-1 border divide-y rounded-lg shadow bg-background"
            >
              <div className="flex items-center justify-between w-full p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium truncate text-md">
                          {member.preferred_name || member.first_name || ""}
                        </h3>
                        <span className="hidden md:block rounded-full bg-green-50 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 px-1.5 py-0.5">
                          {member.id === project.owner_id ? "Admin" : "User"}
                        </span>
                      </div>
                      {ownerId !== member.id || !isProjectOwner ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <DeleteAndRemoveUserButton
                                userId={member.id}
                                onDeleteHandler={deleteAndRemoveUser}
                                disabled={!isProjectOwner}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete and remove user</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-1 text-lg">
                    {member.id === project.owner_id
                      ? "Project Owner"
                      : "Team Member"}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex -mt-px divide-x">
                  <div className="flex flex-1 w-0">
                    <a
                      href={`mailto:${member.email}`}
                      className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-semibold border border-transparent rounded-bl-lg gap-x-3"
                    >
                      <Mail className="stroke-2 stroke-accent-foreground fill-none" />
                      Email
                    </a>
                  </div>
                  {member.phone ? (
                    <div className="flex flex-1 w-0 -ml-px">
                      <a
                        href={`tel:${member.phone}`}
                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-semibold border border-transparent rounded-br-lg gap-x-3"
                      >
                        <Phone className="stroke-2 stroke-accent-foreground fill-none" />
                        Call
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}
