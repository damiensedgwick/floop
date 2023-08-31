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
  count: number;
};

export default function NumberOfUsersCard({ count }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Team Size</CardTitle>
        <CardDescription>
          The total number of users within your project&apos;s team
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{count}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>
            You will only be able to add more users if you upgrade your
            subscription to the growth plan
          </small>
        </p>
        <Link
          href="/project/team"
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "w-full sm:w-20",
          })}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
