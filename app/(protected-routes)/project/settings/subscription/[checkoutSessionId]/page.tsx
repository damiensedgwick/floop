import { Separator } from "@/components/ui/separator";
import createStripe from "stripe";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: { checkoutSessionId: string };
}) {
  const user = await getPublicUser();
  const project = await getProject(user);

  const stripe = new createStripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const subscription = await stripe.subscriptions.search({
    query: `metadata["project_id"]:"${project.id}"`,
  });

  console.log("SUBSCRIPTION: ", subscription);

  return (
    <div className="px-4 pt-2 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="space-y-6 flex flex-col justify-center items-center h-[calc(100vh-50px)] w-full">
          <h1 className="text-2xl font-semibold">Thank you for subscribing</h1>
          <p className="font-medium leading-3">
            Before we let you crack on with collecting all of your customer
            feedback, we just wanted to say thank you for subscribing to our
            service and supporting our business. We really appreciate it.
          </p>
          <Link
            href="/project/settings"
            className={buttonVariants({ variant: "themed", size: "lg" })}
          >
            Return to settings
          </Link>
        </div>
      </div>
    </div>
  );
}
