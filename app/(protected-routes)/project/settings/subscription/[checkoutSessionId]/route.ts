import { NextRequest, NextResponse } from "next/server";
import {
  getProject,
  getPublicUser,
} from "@/app/(protected-routes)/project/utils";
import createStripe from "stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  context: { params: { checkoutSessionId: string } },
) {
  const user = await getPublicUser();
  const project = await getProject();

  const stripe = new createStripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const session = await stripe.checkout.sessions.retrieve(
    context.params.checkoutSessionId,
  );

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  const supabase = createRouteHandlerClient<Database>({ cookies });

  await supabase
    .from("projects")
    .update({
      stripe_subscription_id: subscription.id,
    })
    .match({ id: project.id });

  const url = request.nextUrl.clone();
  url.pathname = "/project/settings";
  return NextResponse.redirect(url);
}
