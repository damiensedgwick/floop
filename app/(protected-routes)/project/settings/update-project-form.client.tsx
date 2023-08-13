"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  projectName: string;
  handleUpdateProjectName: (name: string) => Promise<void>;
};

export default function UpdateProjectForm({
  projectName,
  handleUpdateProjectName,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(3).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => handleUpdateProjectName(values.name));
    toast({
      title: "Project name updated",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-7xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Name</CardTitle>
                <CardDescription>
                  This is your project name within Floop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormItem className="w-full md:w-1/2">
                  <FormControl>
                    <Input placeholder={projectName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </CardContent>
              <CardFooter className="bg-secondary p-4 flex justify-between items-center">
                <p className="max-w-[250px] md:max-w-prose">
                  <small>Please use 50 characters at maximum</small>
                </p>
                <Button type="submit" size="sm" disabled={isPending}>
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </CardFooter>
            </Card>
          )}
        />
      </form>
    </Form>
  );
}