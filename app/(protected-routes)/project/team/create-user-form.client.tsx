"use client";

import { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Plus from "@/components/icons/plus";
import { useTheme } from "next-themes";

type Props = {
  projectId: string;
  isProjectOwner: boolean;
};

export default function CreateUserForm({ projectId, isProjectOwner }: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await fetch("/project/team/user", {
        method: "POST",
        body: JSON.stringify({
          project_id: projectId,
          email: values.email,
        }),
      });
    });

    if (!isPending) {
      toast({
        title: "User has been invited",
      });

      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-between space-y-4 md:space-y-0 md:space-x-4 md:flex-row"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full md:max-w-[350px]">
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending || !isProjectOwner}
          className="w-full space-x-1 md:max-w-[125px]"
        >
          <Plus className="stroke-accent stroke-2" />
          <span>{isPending ? "Creating..." : "Create"}</span>
        </Button>
      </form>
    </Form>
  );
}
