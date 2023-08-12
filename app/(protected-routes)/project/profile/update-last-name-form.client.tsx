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
  lastName: string;
  userId: string;
  handleUpdateProfile: (name: string, userId: string) => void;
};

export default function UpdateLastNameForm({
  lastName,
  userId,
  handleUpdateProfile,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => handleUpdateProfile(values.name, userId));
    toast({
      title: "Last name updated",
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
                <CardTitle className="text-lg">Last Name</CardTitle>
                <CardDescription>This should be your last name</CardDescription>
              </CardHeader>
              <CardContent>
                <FormItem className="w-full md:w-1/2">
                  <FormControl>
                    <Input placeholder={lastName} {...field} />
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
