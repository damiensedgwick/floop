import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Check from "@/components/icons/check";

export default function Page() {
  return (
    <div className="px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7">
        <Link
          href="/"
          className="flex items-center rounded-md py-2 text-sm no-underline text-foreground bg-btn-background group hover:bg-btn-background-hover w-[75px]"
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
        <p className="mt-12 text-base font-semibold leading-7 text-mint">
          Introducing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Floop: The feedback loop for your product
        </h1>
        <p className="mt-6 text-xl leading-7">
          Floop is a simple, easy-to-use platform that allows you to collect
          user feedback for your product, from your customers.
        </p>
        <div className="mt-14 max-w-2xl">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">
            Getting the basics right
          </h2>
          <p className="mt-6">
            Our goal here at Floop is to help you understand what your customers
            think and feel about your product, how you can improve it and how
            you can benefit from listening to your customers.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8">
            <li className="flex gap-x-3">
              <Check
                className="mt-1 h-5 w-5 flex-none stroke-2 stroke-mint fill-none"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold">Ratings:</strong> How do your
                customers currently feel about your product?
              </span>
            </li>
            <li className="flex gap-x-3">
              <Check
                className="mt-1 h-5 w-5 flex-none stroke-2 stroke-mint fill-none"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold">Issues:</strong> What problems
                do your customers experience with your product?
              </span>
            </li>
            <li className="flex gap-x-3">
              <Check
                className="mt-1 h-5 w-5 flex-none stroke-2 stroke-mint fill-none"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold">Suggestions:</strong> What
                would make your product better for your customers?
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
            Whether you want to use our React widget or just our submission
            endpoints, the choice is yours.
          </p>
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Meet the Floop Widget
          </h2>
          <p className="mt-6">
            We have made it as easy as possible for you to get going by
            providing you with a plug-n-play React widget that can be installed
            into your project within minutes.
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
              src="/floop-dashboard.png"
              width={800}
              height={600}
              alt="Floo Widget"
            />
          </div>
          <p className="mt-6">
            You can you use this dashboard to get an overview of your customer
            feedback for the month in a single glance or you can drill down into
            the ratings, issues and suggestions that your customers have left
            for you.
          </p>
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Current Features
          </h2>
          <p className="mt-6">
            Floop currently enables you capture up to 50 total submissions as
            part of the free tier or an unlimited number of submissions if you
            choose to subscribe.
          </p>
          <p className="mt-6">
            Both tiers include the use of the Floop platform with some areas,
            such as team management, being for subscribed users only.
          </p>
          <p className="mt-6">
            Installable React widget, which is also available on GitHub to be
            forked and customised should you want to give it your own look and
            feel.
          </p>
          <p className="mt-6">
            Getting an overview of your all time stats as well as a health check
            for the current month from your users.
          </p>
        </div>
        <div className="mt-14 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight">
            Upcoming Features
          </h2>
          <p className="mt-6">
            More options for installing and using the Floop widget. We are
            currently looking at Vue, Svelte, WordPress and plain old script
            tags.
          </p>
          <p className="mt-6">
            Dedicated reporting so that we are able to provide an even better
            overview of how your customers are feeling about your product.
          </p>
          <p className="mt-6">
            Categorising and organising ratings, issues and suggestions through
            the use of labels.
          </p>
          <p className="mt-6">
            Integrating with project management tools such as Github and Jira
            for automatic issue tracking and creation.
          </p>
          <p className="mt-6">
            The above list is not comprehensive but it is where our priorities
            lie within Floop at the moment. The plan is to continue building out
            the platform until it is the Swiss Army Knife of the feedback
            collection world.
          </p>
        </div>
        <div className="max-w-2xl">
          <Link
            href="/auth/sign-in"
            className={buttonVariants({
              variant: "purple",
              size: "lg",
              className: "mt-10 w-full",
            })}
          >
            Get Started With Floop
          </Link>
        </div>
      </div>
    </div>
  );
}
