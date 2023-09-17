import Hero from "@/app/hero";
import Features from "@/app/features";
import Pricing from "@/app/pricing";
import Footer from "@/app/footer";
import GettingStarted from "@/app/getting-started";
import FAQ from "@/app/faq";
import RecentPosts from "@/app/recent-posts";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <GettingStarted />

      <Suspense
        fallback={
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <Skeleton className="h-6 w-1/5 mb-4" />
                <Skeleton className="h-32 w-4/5" />
              </div>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                <Skeleton className="h-44 w-full shadow-md flex flex-col items-stretch justify-between" />
                <Skeleton className="h-44 w-full shadow-md flex flex-col items-stretch justify-between" />
                <Skeleton className="h-44 w-full shadow-md flex flex-col items-stretch justify-between" />
              </div>
              <Skeleton className="h-6 w-[100px] ml-auto mt-8 mr-8" />
            </div>
          </div>
        }
      >
        <RecentPosts />
      </Suspense>

      <FAQ />
      <Footer />
    </div>
  );
}
