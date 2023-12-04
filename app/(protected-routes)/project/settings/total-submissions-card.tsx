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
    </Card>
  );
}
