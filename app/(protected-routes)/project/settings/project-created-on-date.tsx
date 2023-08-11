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
      <CardFooter className="bg-secondary p-4 flex justify-between items-center">
        <p className="max-w-[250px] md:max-w-prose">
          <small>You may want this for your reference</small>
        </p>
      </CardFooter>
    </Card>
  );
}
