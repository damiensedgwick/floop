import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/shared/container";

export default async function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
      <Container className="pb-16 lg:pt-36 2xl:pt-16 lg:flex 2xl:flex-col 2xl:text-center">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 2xl:mx-auto">
          <Link
            href="/posts/just-shipped/release/v1"
            className="inline-flex space-x-4 mt-24 sm:mt-32 lg:mt-16 mb-4"
          >
            <span className="rounded-full bg-mint/10 py-1 text-sm font-semibold leading-7 text-mint ring-1 ring-inset ring-mint/90 px-6">
              What&apos;s new
            </span>
            <span className="inline-flex items-center text-sm font-medium leading-7">
              <span className="mr-2">Floop Launch</span>
              🚀
            </span>
          </Link>
          <h1 className="mx-auto max-w-7xl font-display text-5xl font-medium tracking-tight sm:text-6xl">
            Floop is the feedback loop for your platform
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight">
            Floop helps software and platform providers capture customer
            feedback and make data-driven decisions, avoiding reliance on
            intuition or guesswork.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/auth/sign-in"
              className={buttonVariants({
                variant: "purple",
                size: "lg",
                className: "2xl:mx-auto",
              })}
            >
              Get started for free
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none 2xl:mt-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
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
