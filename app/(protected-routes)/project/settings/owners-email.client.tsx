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
      <CardFooter className="bg-secondary p-4 flex justify-between items-center">
        <p className="max-w-[250px] md:max-w-prose">
          <small>
            This is usually the name of the person who first created the
            project, we may work on making this transferable in the future
          </small>
        </p>
        <a
          href={`mailto:${ownersEmail}`}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          Email
        </a>
      </CardFooter>
    </Card>
  );
}
