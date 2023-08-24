import Image from "next/image";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Hero() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative overflow-hidden isolate">
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
      <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="flex items-center justify-between">
            <Image
              src="/floop-logo.png"
              width={88}
              height={88}
              alt="Floop logo"
            />
            <div>
              <ThemeToggle />
            </div>
          </div>
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-teal-600/10 py-1 text-sm font-semibold leading-6 text-teal-600 ring-1 ring-inset ring-teal-600/10 px-1.5 sm:px-3">
                Coming soon
              </span>
              <span className="inline-flex items-center text-sm font-medium leading-6">
                <span>under construction &nbsp; 🛠️</span>
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            Floop is the feedback loop for your platform
          </h1>
          <p className="mt-6 text-lg leading-8">
            Floop helps software and platform providers capture customer
            feedback and make data-driven decisions, avoiding reliance on
            intuition or guesswork.
          </p>
          <div className="flex items-center mt-10 gap-x-6">
            <Link
              href="/auth/sign-in"
              className="rounded-md bg-teal-600 text-sm font-semibold text-white shadow-sm px-3.5 py-2.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Get started for free
            </Link>
            {user ? (
              <Link
                href="/project/dashboard"
                className="text-sm font-semibold leading-6"
              >
                Floop dashboard <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <Link
                href="/auth/sign-in"
                className="text-sm font-semibold leading-6"
              >
                Sign in <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        </div>
        <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
            <div className="p-2 -m-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/app-screenshot.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10 w-[76rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
