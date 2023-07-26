import createStripe from "stripe";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

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

  const session = await stripe.checkout.sessions.retrieve(
    params.checkoutSessionId,
  );

  const subscription = await stripe.subscriptions.retrieve(
    "sub_1NYEa2Jjkjlhn0vrT9dRtLsg",
  );

  const supabase = createServerComponentClient<Database>({ cookies });

  await supabase
    .from("projects")
    .update({
      stripe_subscription_id: subscription.id,
    })
    .match({ id: project.id });

  redirect("/project/settings");
}
