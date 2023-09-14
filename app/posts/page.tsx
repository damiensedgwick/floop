import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import Posts from "@/app/posts/posts";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function PostsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="mb-6">
          <Image
            src="/mint-floop.svg"
            alt="Floop Logo"
            width={100}
            height={100}
          />
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
