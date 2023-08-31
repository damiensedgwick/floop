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
  projectId: string;
};

export default function ProjectIdCard({ projectId }: Props) {
  const { toast } = useToast();
  async function handleCopyIdClick() {
    await navigator.clipboard.writeText(projectId);
    toast({
      title: "Copied to clipboard",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project ID</CardTitle>
        <CardDescription>
          This is your projects unique identifier within Floop
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{projectId}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>
            You will need to use this ID within the Floop Widget should you
            choose to use it
          </small>
        </p>
        <Button
          size="sm"
          type="button"
          onClick={handleCopyIdClick}
          className="w-full sm:w-20"
        >
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}
