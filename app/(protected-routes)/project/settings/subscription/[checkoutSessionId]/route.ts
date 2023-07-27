import { NextRequest, NextResponse } from "next/server";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import createStripe from "stripe";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  context: { params: { checkoutSessionId: string } },
) {
  const user = await getPublicUser();
  const project = await getProject(user);

  const stripe = new createStripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const session = await stripe.checkout.sessions.retrieve(
    context.params.checkoutSessionId,
  );

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  const supabase = createServerComponentClient<Database>({ cookies });

  await supabase
    .from("projects")
    .update({
      stripe_subscription_id: subscription.id,
    })
    .match({ id: project.id });

  return NextResponse.redirect("/project/settings");
}
