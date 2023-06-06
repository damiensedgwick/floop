import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const product_pricing = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "/api/auth/signin",
    priceMonthly: "£0",
    description:
      "Get started on your feedback journey with our Basic Plan. Designed for individuals and hobby projects.",
    features: [
      "1 user",
      "Up to 25 submissions",
      "Ratings",
      "Issues",
      "Suggestions",
    ],
  },
  {
    name: "Team",
    id: "tier-team",
    // TODO: This would go throgh a subscription route?
    href: "/api/auth/signin",
    priceMonthly: "£19.99",
    description:
      "Elevate your feedback collection capabilities with our Professional Plan. Perfect for growing businesses and teams.",
    features: [
      "Unlimited team",
      "Unlimited submissions",
      "Ratings",
      "Issues",
      "Suggestions",
    ],
  },
];

export default function ProductPricing() {
  return (
    <div className="isolate overflow-hidden bg-teal-900" id="pricing">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-96 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-teal-400">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" />
            whoever you are
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8 text-white/60">
            Whether you&apos;re looking to trial our product or dive into
            extensive user data collection, our pricing options cater to your
            needs, empowering you to gather valuable insights and drive success.
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
                <stop stopColor="#14b8a6" />
                <stop offset={1} stopColor="#a7f3d0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {product_pricing.map((pp) => (
                <div
                  key={pp.id}
                  className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
                >
                  <div>
                    <h3
                      id={pp.id}
                      className="text-base font-semibold leading-7 text-teal-600"
                    >
                      {pp.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {pp.priceMonthly}
                      </span>
                      <span className="text-base font-semibold leading-7 text-gray-600">
                        /month
                      </span>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                      {pp.description}
                    </p>
                    <ul
                      role="list"
                      className="mt-10 text-sm leading-6 text-gray-600 space-y-4"
                    >
                      {pp.features.map((feature) => (
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
                    href={pp.href}
                    aria-describedby={pp.id}
                    className="mt-8 block rounded-md bg-teal-600 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm px-3.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                  >
                    Get started today
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
