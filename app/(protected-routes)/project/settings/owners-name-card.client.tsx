"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  ownersName: string;
};

export default function OwnersNameCard({ ownersName }: Props) {
  const { toast } = useToast();
  async function handleCopyNameClick() {
    await navigator.clipboard.writeText(ownersName);
    toast({
      title: "Copied to clipboard",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Owner&apos;s Name</CardTitle>
        <CardDescription>
          This is the owner of the project within Floop
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{ownersName}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>
            This is usually the name of the person who first created the project
          </small>
        </p>
        <Button
          size="sm"
          type="button"
          onClick={handleCopyNameClick}
          className="w-full sm:w-20"
        >
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}
