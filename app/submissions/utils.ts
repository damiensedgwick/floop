import createStripe from "stripe";

export default async function getSubscription(projectId: string) {
  const stripe = new createStripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const subscriptions = await stripe.subscriptions.search({
    query: `metadata["project_id"]:"${projectId}"`,
  });

  const subscription =
    subscriptions.data.length > 0 ? subscriptions.data[0] : null;

  if (!subscription) {
    return null;
  }

  return subscription;
}
