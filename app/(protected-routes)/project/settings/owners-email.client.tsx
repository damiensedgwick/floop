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

type Props = {
  ownersEmail: string;
};

export default function OwnersEmailCard({ ownersEmail }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Owner&apos;s Email</CardTitle>
        <CardDescription>
          This is the email of the owner for the project within Floop
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{ownersEmail}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>
            This is usually the name of the person who first created the
            project, we may work on making this transferable in the future
          </small>
        </p>
        <a
          href={`mailto:${ownersEmail}`}
          className={buttonVariants({
            variant: "default",
            size: "sm",
            className: "w-full sm:w-20",
          })}
        >
          Email
        </a>
      </CardFooter>
    </Card>
  );
}
