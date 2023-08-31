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
  createdOn: string;
};

export default function ProjectCreatedOnDate({ createdOn }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Created</CardTitle>
        <CardDescription>
          The date your project was created on Floop
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{createdOn}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>You may want this for your reference</small>
        </p>
      </CardFooter>
    </Card>
  );
}
