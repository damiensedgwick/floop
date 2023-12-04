import { cookies } from "next/headers";
import {
  createServerComponentClient,
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import UpdateProjectForm from "@/app/(protected-routes)/project/settings/update-project-form.client";
import { revalidatePath } from "next/cache";
import ProjectIdCard from "@/app/(protected-routes)/project/settings/project-id-card.client";
import OwnersNameCard from "@/app/(protected-routes)/project/settings/owners-name-card.client";
import OwnersEmailCard from "@/app/(protected-routes)/project/settings/owners-email.client";
import SubscriptionTypeCard from "@/app/(protected-routes)/project/settings/subscription-type-card";
import { format } from "date-fns";
import TotalSubmissionsCard from "@/app/(protected-routes)/project/settings/total-submissions-card";
import NumberOfUsersCard from "@/app/(protected-routes)/project/settings/number-of-users-card";
import ProjectCreatedOnDate from "@/app/(protected-routes)/project/settings/project-created-on-date";
import DeleteProjectAndProfileCard from "@/app/(protected-routes)/project/settings/delete-project-and-profile-card";
import { supabase as sb } from "@/lib/supabase";

export default async function Settings() {
  const user = await getPublicUser();
  const project = await getProject();
  const supabase = createServerComponentClient();

  const { data: result } = await supabase
    .from("users")
    .select()
    .or(`id.eq.${project.owner_id}, project_id.eq.${project.id}`);

  const owner = result?.find((item) => item.id === project.owner_id);
  const users = result?.filter((item) => item.project_id === project.id);

  async function handleUpdateProjectName(name: string) {
    "use server";

    const supabase = createServerActionClient<Database>({ cookies });

    await supabase
      .from("projects")
      .update({ name, updated_at: new Date().toISOString() })
      .eq("id", project.id);

    revalidatePath("/project/settings");
  }

  async function handleDeleteProfileAndProject(userId: string) {
    "use server";

    await sb.auth.signOut();
    await sb.auth.admin.deleteUser(userId);

    revalidatePath("/project");
    revalidatePath("/project/issues");
    revalidatePath("/project/profile");
    revalidatePath("/project/ratings");
    revalidatePath("/project/reports");
    revalidatePath("/project/settings");
    revalidatePath("/project/suggestions");
    revalidatePath("/project/team");
  }

  return (
    <>
      <UpdateProjectForm
        projectName={project.name}
        handleUpdateProjectName={handleUpdateProjectName}
      />
      <ProjectIdCard projectId={project.id} />
      <OwnersNameCard
        ownersName={
          owner?.preferred_name ||
          owner?.first_name ||
          "Name details not provided"
        }
      />
      <OwnersEmailCard
        ownersEmail={owner?.email || "Cannot find owners email"}
      />
      <TotalSubmissionsCard count={project.total_submissions} />
      <NumberOfUsersCard count={users?.length || 1} />
      <ProjectCreatedOnDate
        createdOn={format(new Date(project.created_at!), "dd MMM yyyy")}
      />
      {project.owner_id === user.id ? (
        <DeleteProjectAndProfileCard
          userId={user.id}
          onDeleteHandler={handleDeleteProfileAndProject}
        />
      ) : null}
    </>
  );
}
