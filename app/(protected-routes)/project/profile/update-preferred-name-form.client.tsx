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
  preferredName: string;
  userId: string;
  handleUpdateProfile: (name: string, userId: string) => void;
};

export default function UpdatePreferredNameFormClient({
  preferredName,
  userId,
  handleUpdateProfile,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => handleUpdateProfile(values.name, userId));

    if (!isPending) {
      toast({
        title: "Preferred name updated",
      });

      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferred Name</CardTitle>
                <CardDescription>
                  This is your preferred name within Floop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormItem className="w-full md:w-1/2">
                  <FormControl>
                    <Input placeholder={preferredName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </CardContent>
              <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
                <p className="sm:max-w-prose">
                  <small>Please use 100 characters at maximum</small>
                </p>
                <Button
                  type="submit"
                  size="sm"
                  disabled={isPending}
                  className="w-full sm:w-20"
                >
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
