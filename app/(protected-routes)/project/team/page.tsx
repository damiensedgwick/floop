import Link from "next/link";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import getSubscription from "@/app/submissions/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ManageUsersForm from "./manage-users-form";
import CreateUserForm from "./create-user-form";
import TeamPreview from "@/app/(protected-routes)/project/team/team-preview";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const subscription = await getSubscription(project.stripe_subscription_id);

  const isProjectOwner = user.id === project.owner_id;

  return (
    <div className="px-4 pt-2 pb-16 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Team</h1>
          <Separator />
          {!subscription ? (
            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon
                    className="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3 flex-1 md:flex md:items-center md:justify-between">
                  <p className="text-sm text-yellow-700">
                    Subscription needed to access teams.
                  </p>
                  <p className="text-sm text-yellow-700">
                    <Link
                      href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_LINK_URL!}
                      className="font-medium text-yellow-700 underline hover:text-yellow-600"
                    >
                      Sign up for a subscription
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Card className="col-span-1 shadow lg:col-span-4">
                <CardHeader>
                  <CardTitle>Create team members</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CreateUserForm
                    projectId={project.id}
                    isProjectOwner={isProjectOwner}
                  />
                  <Separator />
                  <ManageUsersForm
                    projectId={project.id}
                    isProjectOwner={isProjectOwner}
                  />
                </CardContent>
              </Card>
              <Separator />
              <TeamPreview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
