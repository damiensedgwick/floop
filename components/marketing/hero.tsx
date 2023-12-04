import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default async function Hero() {
  return (
    <div className="relative overflow-hidden isolate">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] 2xl:[mask-image:radial-gradient(60%_50%_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <Container className="py-6 md:py-7 lg:py-10 xl:py-16 lg:flex 2xl:flex-col 2xl:text-center">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 2xl:mx-auto">
          <Link
            href="/posts/just-shipped/release/v1"
            className="inline-flex mt-10 mb-4 space-x-4 sm:mt-20"
          >
            <span className="px-6 py-1 text-sm font-semibold leading-7 rounded-full bg-mint/10 text-mint ring-1 ring-inset ring-mint/90">
              What&apos;s new
            </span>
            <span className="inline-flex items-center text-sm font-medium leading-7">
              <span className="mr-2">Floop Launch</span>
              🚀
            </span>
          </Link>
          <h1 className="mx-auto text-5xl font-medium tracking-tight max-w-7xl font-display sm:text-6xl">
            Floop is the feedback loop for your product
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg tracking-tight">
            Floop empowers product teams with a powerful tool to effortlessly
            collect and analyse customer feedback. Make informed decisions based
            on real data, eliminating the need for guesswork or intuition.
          </p>
          <div className="flex items-center mt-6 gap-x-6">
            <Link
              href="/auth/sign-in"
              className={buttonVariants({
                variant: "purple",
                size: "lg",
                className: "2xl:mx-auto",
              })}
            >
              Start Collecting Feedback
            </Link>
          </div>
        </div>
        <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none 2xl:mt-20">
          <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
            <div className="p-2 -m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/floop-dashboard.png"
                alt="App screenshot"
                width={1442}
                height={768}
                className="rounded-md shadow ring-1 ring-gray-900/10 w-[70rem]"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
