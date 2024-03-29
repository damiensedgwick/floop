import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import React, { Suspense } from "react";
import Posts from "@/app/posts/[slug]/posts";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

type Props = { params: { slug: string } };

export default function Page(props: Props) {
  return (
    <div className="mx-auto max-w-3xl py-6 prose px-6 lg:px-0 dark:prose-invert">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/mint-floop.svg"
            alt="Floop Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-6 w-2/5" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        }
      >
        <Posts params={props.params} />
      </Suspense>

      <div className="flex items-center justify-between">
        <Link
          href="/auth/sign-in"
          className={buttonVariants({ variant: "purple" })}
        >
          Get Floop
        </Link>
        <Link
          href="/posts"
          className="ml-auto flex items-center rounded-md pt-4 pb-4 text-sm no-underline w-[120px] text-foreground bg-btn-background group hover:bg-btn-background-hover"
        >
          More posts
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
