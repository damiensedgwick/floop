import Link from "next/link";
import BlogPostCardPreview from "@/components/blog-post-card-preview";
import GoBackButton from "@/components/go-back-button";
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import Posts from "@/app/posts/posts";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <GoBackButton />
        <Link
          href="/"
          className={buttonVariants({
            variant: "default",
            className: "mb-6 no-underline",
          })}
        >
          Home
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <Skeleton className="h-40 w-full shadow-md flex flex-col items-stretch justify-between" />
              <Skeleton className="h-40 w-full shadow-md flex flex-col items-stretch justify-between" />
              <Skeleton className="h-40 w-full shadow-md flex flex-col items-stretch justify-between" />
            </>
          }
        >
          <Posts />
        </Suspense>
      </ul>
    </div>
  );
}
