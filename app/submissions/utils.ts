import createStripe from "stripe";

export default async function getSubscription(
  stripe_subscription_id: string | null,
) {
  if (!stripe_subscription_id) {
    return null;
  }

  const stripe = new createStripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const subscription = await stripe.subscriptions.retrieve(
    stripe_subscription_id,
  );

  if (!subscription) {
    return null;
  }

  return subscription;
}
