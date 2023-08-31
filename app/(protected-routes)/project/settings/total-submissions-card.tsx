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

export default function TotalSubmissionsCard({ count }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Total Submissions</CardTitle>
        <CardDescription>
          The total number of submissions you have received for ratings, issues
          and suggestions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{count}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>
            If you are unable to receive any more submissions, please upgrade
            your subscription to the growth plan
          </small>
        </p>
      </CardFooter>
    </Card>
  );
}
