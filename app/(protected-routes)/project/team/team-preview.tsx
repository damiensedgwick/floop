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
};

export default async function TeamPreview({ isProjectOwner }: Props) {
  const project = await getProject();

  const supabase = createServerComponentClient();

  const { data: members } = await supabase
    .from("users")
    .select()
    .match({ project_id: project.id });

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
              className="col-span-1 rounded-lg border shadow divide-y bg-background"
            >
              <div className="flex w-full items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <h3 className="truncate text-sm font-medium">
                          {member.preferred_name || member.first_name || ""}
                        </h3>
                        <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 px-1.5 py-0.5">
                          {member.id === project.owner_id ? "Admin" : "Member"}
                        </span>
                      </div>
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
                    </div>
                  </div>
                  <p className="mt-1 truncate text-sm">
                    {member.id === project.owner_id
                      ? "Founder at Floop"
                      : "Magnificent Member"}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${member.email}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
                    >
                      <Mail className="stroke-accent-foreground stroke-2 fill-none" />
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <button
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold opacity-60"
                      disabled
                    >
                      <Phone className="stroke-accent-foreground stroke-2 fill-none" />
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}
