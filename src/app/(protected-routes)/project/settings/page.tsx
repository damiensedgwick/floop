import { auth } from "@clerk/nextjs";
import supabase from "@/lib/supabase";
import { getProject } from "@/app/(protected-routes)/project/dashboard/page";
import { redirect } from "next/navigation";

export default async function Page() {
  const { userId, getToken } = auth();

  const supabaseAccessToken = await getToken({ template: "supabase" });
  const sb = await supabase(supabaseAccessToken);

  const project = await getProject(sb, userId);

  if (!project) {
    redirect("/project/new");
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-2">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Project settings
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          All of your project specific settings
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {project.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">ID</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {project.id}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Subscription type
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
              {project.subscription_type}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Subscription expiry
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {project.subscription_expiry
                ? String(project.subscription_expiry)
                : "---"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Owner ID
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {project.owner_id}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
