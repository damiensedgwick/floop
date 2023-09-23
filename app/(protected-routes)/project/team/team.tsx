import Link from "next/link";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import getSubscription from "@/app/submissions/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateUserForm from "./create-user-form.client";
import TeamPreview from "@/app/(protected-routes)/project/team/team-preview";

export default async function Team() {
  const [user, project] = await Promise.all([getPublicUser(), getProject()]);

  const subscription = await getSubscription(project.stripe_subscription_id);

  const isProjectOwner = user.id === project.owner_id;

  return (
    <>
      {!subscription ? (
        <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50">
          <div className="flex">
            <div className="flex-1 ml-3 md:flex md:items-center md:justify-between">
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
              <CardDescription className="max-w-prose">
                Once you have created a user, they will need to sign up, once
                they have, they will be able to sign in and they will
                automatically be assigned to your project.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CreateUserForm
                projectId={project.id}
                isProjectOwner={isProjectOwner}
              />
            </CardContent>
          </Card>
          <Separator />
          <TeamPreview
            isProjectOwner={isProjectOwner}
            ownerId={project.owner_id}
          />
        </div>
      )}
    </>
  );
}
