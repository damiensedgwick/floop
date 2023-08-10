import Link from "next/link";
import { cookies } from "next/headers";
import { format } from "date-fns";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { buttonVariants } from "@/components/ui/button";
import getSubscription from "@/app/submissions/utils";

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

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Settings</h1>
          <Separator />
          <div className="overflow-hidden border shadow bg-secondary-accent sm:rounded-lg">
            <div className="border-gray-100">
              <dl className="divide-y">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">Project name</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {project.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">Project ID</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {project.id}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">Owner&apos;s name</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {owner?.preferred_name || owner?.email}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">Owner&apos;s email</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {owner?.email}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">Subscription type</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {subscription ? "Growth" : "Hobby"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">
                    Subscription expiry date
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {subscription
                      ? format(
                          new Date(subscription.current_period_end * 1000),
                          "dd MMM yyyy",
                        )
                      : "Free Forever"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">
                    Total submission count
                  </dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {project.total_submissions}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">Number of users</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {users?.length}
                  </dd>
                </div>{" "}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium">Created On</dt>
                  <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                    {format(new Date(project.created_at!), "dd MMM yyyy")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row space-y-4 md:space-y-0">
            {subscription ? (
              <Link
                href={process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK_URL!}
                className={buttonVariants({ variant: "themed", size: "lg" })}
              >
                Manage Subscription
              </Link>
            ) : (
              <Link
                href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_LINK_URL!}
                className={buttonVariants({ variant: "themed", size: "lg" })}
              >
                Buy Subscription
              </Link>
            )}

            <Link
              href={`/project/settings/update-project/${project.id}`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Update Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
