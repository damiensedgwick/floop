"use client";

import { format, parseISO } from "date-fns";
import { Database } from "@/types/supabase";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import TrendUp from "@/components/icons/trend-up";
import AnnotationAlert from "@/components/icons/annotation-alert";
import LightBulb from "@/components/icons/lightbulb";

type Props = {
  ratings: Database["public"]["Tables"]["ratings"]["Row"][];
  issues: Database["public"]["Tables"]["issues"]["Row"][];
  suggestions: Database["public"]["Tables"]["suggestions"]["Row"][];
};

export function RecentActivityClient({ ratings, issues, suggestions }: Props) {
  function createActivityTimeline(
    ratings: Database["public"]["Tables"]["ratings"]["Row"][],
    issues: Database["public"]["Tables"]["issues"]["Row"][],
    suggestions: Database["public"]["Tables"]["suggestions"]["Row"][],
  ) {
    type Items = typeof ratings | typeof issues | typeof suggestions;
    type Type = "rating" | "issue" | "suggestion";

    const withType = (items: Items, type: Type) =>
      items.map((item) => ({ ...item, type }));

    const mappedRatings = withType(ratings, "rating");
    const mappedIssues = withType(issues, "issue");
    const mappedSuggestions = withType(suggestions, "suggestion");

    return [...mappedRatings, ...mappedIssues, ...mappedSuggestions].sort(
      (a, b) =>
        new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime(),
    );
  }

  const timeline = createActivityTimeline(ratings, issues, suggestions);

  return (
    <div className="space-y-6">
      {timeline.slice(0, 6).map((entry: any, index: number) => (
        <div className="flex items-center" key={index}>
          {entry.type === "rating" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="w-full">
                  <TrendUp className="stroke-2 stroke-mint fill-none" />
                  <p className="mr-auto ml-3 text-xs font-medium leading-none sm:mr-0">
                    <span className="text-lg">{entry.score}</span> / 10
                  </p>
                  <p className="ml-auto hidden font-medium sm:block">
                    {format(parseISO(entry.created_at), "dd MMM")}
                  </p>
                </Button>
              </SheetTrigger>
              <SheetContent className="space-y-6">
                <SheetHeader>
                  <SheetTitle>Rating details</SheetTitle>
                  <SheetDescription className="space-y-6">
                    <Card className="mt-6">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>Rating</p>
                          <p>{entry.score} / 10</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>Details</p>
                          <p>{entry.details}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>User</p>
                          <p>
                            <a href={`mailto:${entry.user_email}`}>
                              {entry.user_email}
                            </a>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <SheetClose asChild>
                    <Link
                      href="/project/ratings"
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                      })}
                    >
                      View all ratings
                    </Link>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}

          {entry.type === "issue" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="w-full">
                  <AnnotationAlert className="stroke-2 stroke-red-400 fill-none" />
                  <p className="mr-auto ml-3 text-sm font-medium leading-none sm:mr-0">
                    {entry.title}
                  </p>
                  <p className="ml-auto hidden font-medium sm:block">
                    {format(parseISO(entry.created_at), "dd MMM")}
                  </p>
                </Button>
              </SheetTrigger>
              <SheetContent className="space-y-6">
                <SheetHeader>
                  <SheetTitle>Issue details</SheetTitle>
                  <SheetDescription className="space-y-6">
                    <Card className="mt-6">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>Title</p>
                          <p>{entry.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>Details</p>
                          <p>{entry.details}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>User</p>
                          <p>
                            <a href={`mailto:${entry.user_email}`}>
                              {entry.user_email}
                            </a>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>Metadata</p>
                          <p>{entry.browser_metadata.length ? entry.browser_metadata : "No metadata found"}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                  <SheetClose asChild>
                    <Link
                      href="/project/issues"
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                      })}
                    >
                      View all issues
                    </Link>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}

          {entry.type === "suggestion" && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="w-full">
                  <LightBulb className="stroke-2 stroke-amber-400 fill-none" />
                  <p className="mr-auto ml-3 text-sm font-medium leading-none sm:mr-0">
                    {entry.title}
                  </p>
                  <p className="ml-auto hidden font-medium sm:block">
                    {format(parseISO(entry.created_at), "dd MMM")}
                  </p>
                </Button>
              </SheetTrigger>
              <SheetContent className="space-y-6">
                <SheetHeader>
                  <SheetTitle>Suggestion details</SheetTitle>
                  <SheetDescription className="space-y-6">
                    <Card className="mt-6">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>Title</p>
                          <p>{entry.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>Details</p>
                          <p>{entry.details}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <p>User</p>
                          <p>
                            <a href={`mailto:${entry.user_email}`}>
                              {entry.user_email}
                            </a>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </SheetDescription>
                </SheetHeader>

                <SheetFooter>
                  <SheetClose asChild>
                    <Link
                      href="/project/suggestions"
                      className={buttonVariants({
                        variant: "default",
                        size: "sm",
                      })}
                    >
                      View all suggestions
                    </Link>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}
        </div>
      ))}
    </div>
  );
}
