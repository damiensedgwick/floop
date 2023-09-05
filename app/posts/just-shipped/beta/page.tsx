import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7">
        <Link
          href="/"
          className="flex items-center rounded-md py-2 text-sm no-underline text-foreground bg-btn-background group hover:bg-btn-background-hover"
        >
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
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>{" "}
          Back
        </Link>
        <p className="mt-12 text-base font-semibold leading-7 text-teal-600">
          Introducing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Floop - The feedback loop for your platform
        </h1>
        <p className="mt-6 text-xl leading-7">
          Floop is a simple, easy-to-use platform that allows you to collect
          feedback from your customers.
        </p>
        <div className="mt-14 max-w-2xl">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">
            Focusing on the fundamentals
          </h2>
          <p className="mt-6">
            Our goal here at Floop to help you understand what your customers
            think and feel about your product, and how you can improve it.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8">
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-teal-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold">Ratings.</strong> How are your
                customers feeling about your service?
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-teal-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold">Issues.</strong> What issues
                are your customers facing with your product?
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon
                className="mt-1 h-5 w-5 flex-none text-teal-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold">Suggestions.</strong> Is there
                anything your customers would like to see?
              </span>
            </li>
          </ul>
          <p className="mt-6">
            We collect the data from these three areas and present it to you in
            a way that&apos;s easy to understand and we believe that by focusing
            on these three areas, you&apos;ll be able to make better decisions
            about your product and how you can improve it.
          </p>
          <h2 className="mt-14 text-2xl font-bold tracking-tight">
            Start collecting your customer feedback in minutes
          </h2>
          <p className="mt-6">
            We know that collecting customer feedback can be a pain. That&apos;s
            why we&apos;ve made it as easy as possible for you to get started.
            Whether you want to use our widget or just our API, the choice is
            yours.
          </p>
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Meet the Floop Widget
          </h2>
          <p className="mt-6">
            We have made it as easy as possible for you to get going by
            providing you with a plug-n-play widget that can be installed into
            your project within minutes. All you have to do is choose your
            flavour, which currently comes in React but we are hoping to add
            more soon.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <Image
              className="rounded-2xl shadow"
              src="/widget.png"
              width={300}
              height={150}
              alt="Floo Widget"
            />
          </div>
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Get a centralised view of your customer feedback
          </h2>
          <p className="mt-6">
            We also provide you with a simple, centralised platform where you
            can view all of your customer ratings, issues and suggestions in one
            place.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <Image
              className="rounded shadow"
              src="/dashboard.png"
              width={800}
              height={600}
              alt="Floo Widget"
            />
          </div>
          <p className="mt-6">
            You can you use this dashboard to get an overview of your customer
            feedback for month in a single glance or you can drill down into the
            ratings, issues and suggestions that your customers have left for
            you.
          </p>
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">What Next?</h2>
          <p className="mt-6">
            We are currently in beta and are looking to build out our platform
            with more features and integrations. Specifically, we are looking to
            add in support for teams and user management, as well as providing a
            reporting mechanism so that you can get a better understanding of
            your customer feedback.
          </p>

          <p className="mt-6">
            If you&apos;d like to get involved, please sign up below.
          </p>

          <Link
            href="/auth/sign-in"
            className={buttonVariants({
              variant: "themed",
              size: "lg",
              className: "mt-6",
            })}
          >
            Sign up for free
          </Link>
        </div>
      </div>
    </div>
  );
}
