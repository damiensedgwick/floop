import { cookies } from "next/headers";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import getSubscription from "@/app/submissions/utils";
import UpdateProjectForm from "@/app/(protected-routes)/project/settings/update-project-form.client";
import { revalidatePath } from "next/cache";
import ProjectIdCard from "@/app/(protected-routes)/project/settings/project-id-card.client";
import OwnersNameCard from "@/app/(protected-routes)/project/settings/owners-name-card.client";
import OwnersEmailCard from "@/app/(protected-routes)/project/settings/owners-email.client";
import SubscriptionTypeCard from "@/app/(protected-routes)/project/settings/subscription-type-card";
import SubscriptionExpiryCard from "@/app/(protected-routes)/project/settings/subscription-expiry-card";
import { format } from "date-fns";
import TotalSubmissionsCard from "@/app/(protected-routes)/project/settings/total-submissions-card";
import NumberOfUsersCard from "@/app/(protected-routes)/project/settings/number-of-users-card";
import ProjectCreatedOnDate from "@/app/(protected-routes)/project/settings/project-created-on-date";
import { ThemeToggle } from "@/components/theme-toggle";
import DeleteProjectAndProfileCard from "@/app/(protected-routes)/project/settings/delete-project-and-profile-card";
import { supabase as sb } from "@/lib/supabase";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const subscription = await getSubscription(project.stripe_subscription_id);
  const supabase = createServerComponentClient<Database>({ cookies });

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

    revalidatePath("/project/dashboard");
    revalidatePath("/project/issues");
    revalidatePath("/project/profile");
    revalidatePath("/project/ratings");
    revalidatePath("/project/reports");
    revalidatePath("/project/settings");
    revalidatePath("/project/suggestions");
    revalidatePath("/project/team");
  }

  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold leading-6">Settings</h1>
            <ThemeToggle />
          </div>
          <Separator />
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
          <SubscriptionTypeCard
            subscriptionType={subscription ? "Growth" : "Hobby"}
          />
          <SubscriptionExpiryCard
            subscriptionType={subscription ? "Growth" : "Hobby"}
            expiry={
              subscription
                ? format(
                    new Date(subscription.current_period_end * 1000),
                    "dd MMM yyyy",
                  )
                : "No expiry date"
            }
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
        </div>
      </div>
    </div>
  );
}
