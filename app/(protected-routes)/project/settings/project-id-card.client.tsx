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
      <CardFooter className="bg-secondary p-4 flex justify-between items-center">
        <p className="max-w-[250px] md:max-w-prose">
          <small>
            You will need to use this ID within the Floop Widget should you
            choose to use it
          </small>
        </p>
        <Button size="sm" type="button" onClick={handleCopyIdClick}>
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}
