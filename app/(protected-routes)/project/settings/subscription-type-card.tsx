"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  subscriptionType: string;
  expiry: string;
};

export default function SubscriptionTypeCard({
  subscriptionType,
  expiry,
}: Props) {
  const hasSubscription = subscriptionType === "Growth";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Subscription Type</CardTitle>
        <CardDescription>
          Whether you are on a free or paid subscription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          {subscriptionType} Plan, Expires on {expiry}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>
            You will be able to subscribe or manage your subscription from here
          </small>
        </p>
        <Link
          href={
            hasSubscription
              ? process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK_URL!
              : process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_LINK_URL!
          }
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "w-full sm:w-20",
          })}
        >
          {hasSubscription ? "Manage" : "Subscribe"}
        </Link>
      </CardFooter>
    </Card>
  );
}
