"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <CardFooter className="bg-secondary p-4 flex justify-between items-center">
        <p className="max-w-[250px] md:max-w-prose">
          <small>
            You will only be able to add more users if you upgrade your
            subscription to the growth plan
          </small>
        </p>
      </CardFooter>
    </Card>
  );
}
