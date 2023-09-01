import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "/auth/sign-in",
    priceMonthly: "£0",
    description:
      "The essentials for getting started, collecting feedback and enhancing your platform.",
    features: [
      "1 User",
      "20 total submissions",
      "Ratings",
      "Issues",
      "Suggestions",
      "No Credit Card Required",
    ],
  },
  {
    name: "Growth",
    id: "tier-growth",
    href: "/auth/sign-in",
    priceMonthly: "£20",
    description:
      "Perfect for growing teams and business looking to get more value from their feedback.",
    features: [
      "Unlimited users",
      "Unlimited total submissions",
      "Ratings",
      "Issues",
      "Suggestions",
      "Reports",
      "Team management",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="isolate overflow-hidden bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-96 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-teal-400">
            Budget friendly pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choose the right plan for you
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
            Unlock valuable insights, take action and champion success. Whether
            you&apos;re looking to trial Floop or get serious about user
            feedback. We&apos;ve got you covered.
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#2dd4bf" />
                <stop offset={1} stopColor="#115e59" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 text-zinc-950 sm:p-10"
                >
                  <div>
                    <h3
                      id={tier.id}
                      className="text-base font-semibold leading-7 text-teal-600"
                    >
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight">
                        {tier.priceMonthly}
                      </span>
                      {tier.id === "tier-growth" ? (
                        <span className="text-base font-semibold leading-7">
                          / month
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-6 leading-7">{tier.description}</p>
                    <ul
                      role="list"
                      className="mt-10 text-sm leading-6 space-y-4"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-teal-600"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={tier.href}
                    aria-describedby={tier.id}
                    className="mt-8 block rounded-md bg-teal-600 py-2 text-center text-sm font-semibold leading-6 text-white shadow px-3.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    Get started for free
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
