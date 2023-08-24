"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  subscriptionType: string;
  expiry: string;
};

export default function SubscriptionExpiryCard({
  subscriptionType,
  expiry,
}: Props) {
  const hasSubscription = subscriptionType === "Growth";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Subscription Expiry</CardTitle>
        <CardDescription>
          The date your subscription will expire if you are subscribed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{expiry}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 bg-secondary">
        <p className="max-w-[250px] md:max-w-prose">
          <small>
            If you are not subscribed, you will be able to continue using the
            Hobby plan for free.
          </small>
        </p>
        <Link
          href={
            hasSubscription
              ? process.env.NEXT_PUBLIC_STRIPE_PORTAL_LINK_URL!
              : process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_LINK_URL!
          }
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          {hasSubscription ? "Manage" : "Subscribe"}
        </Link>
      </CardFooter>
    </Card>
  );
}
