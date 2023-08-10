import { cookies } from "next/headers";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import getSubscription from "@/app/submissions/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import UpdateProjectForm from "@/components/update-project-form.client";
import { revalidatePath } from "next/cache";

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

    const supabase = createServerComponentClient<Database>({ cookies });

    await supabase.from("projects").update({ name }).eq("id", project.id);
    revalidatePath("/project/settings");
  }

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold leading-6">Settings</h1>
            {subscription ? (
              <Link
                href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK_URL!}
                className={buttonVariants({ variant: "themed", size: "sm" })}
              >
                Manage Subscription
              </Link>
            ) : (
              <Link
                href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_LINK_URL!}
                className={buttonVariants({ variant: "themed", size: "sm" })}
              >
                Buy Subscription
              </Link>
            )}
          </div>
          <Separator />
          <UpdateProjectForm
            projectName={project.name}
            handleUpdateProjectName={handleUpdateProjectName}
          />
        </div>
      </div>
    </div>
  );
}
