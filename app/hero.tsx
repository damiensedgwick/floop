import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

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
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="flex items-center justify-between">
            <Image
              src="/mint-floop.svg"
              width={125}
              height={100}
              alt="Floop logo"
            />
            <ThemeToggle />
          </div>
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link
              href="/posts/just-shipped/release/v1"
              className="inline-flex space-x-4"
            >
              <span className="rounded-full bg-mint/10 py-1 text-sm font-semibold leading-7 text-mint ring-1 ring-inset ring-mint/90 px-1.5 sm:px-3">
                What&apos;s new
              </span>
              <span className="inline-flex items-center text-sm font-medium leading-7">
                <span className="mr-2">Floop Launch</span>
                🚀
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            Floop is the feedback loop for your platform
          </h1>
          <p className="mt-6 text-lg leading-7">
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
                className: "md:hidden",
              })}
            >
              Get started
            </Link>
            <Link
              href="/auth/sign-in"
              className={buttonVariants({
                variant: "purple",
                size: "lg",
                className: "hidden md:flex",
              })}
            >
              Get started for free
            </Link>
            <Link
              href="/project"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "md:hidden",
              })}
            >
              Dashboard{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
            <Link
              href="/project"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "hidden md:flex",
              })}
            >
              Floop Dashboard{" "}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/floop-dashboard.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow ring-1 ring-gray-900/10 w-[76rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
