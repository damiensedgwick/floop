import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { Separator } from "@/components/ui/separator";
import getSubscription from "@/app/submissions/utils";

export default async function Page() {
  const user = await getPublicUser();
  const project = await getProject(user);
  const subscription = await getSubscription(project.stripe_subscription_id);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 sm:flex-auto">
          <h1 className="text-xl font-semibold leading-6">Update Project</h1>
          <Separator />
        </div>
      </div>
    </div>
  );
}