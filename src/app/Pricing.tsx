import { CheckIcon } from "@heroicons/react/20/solid";
import classNames from "@/lib/classnames";

const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "#",
    featured: false,
    description: "The essentials to provide your best work for clients.",
    price: "£0",
    mainFeatures: [
      "1 User",
      "Up to 25 submissions",
      "Ratings",
      "Issues",
      "Suggestions",
    ],
  },
  {
    name: "Team",
    id: "tier-team",
    href: "#",
    featured: true,
    description: "Perfect for growing businesses and teams.",
    price: "£25",
    mainFeatures: [
      "10 Users",
      "Up to 250 submissions",
      "Ratings",
      "Issues",
      "Suggestions",
    ],
  },
  {
    name: "Business",
    id: "tier-business",
    href: "#",
    featured: false,
    description: "Convenient features to take your business to the next level.",
    price: "£99",
    mainFeatures: [
      "Unlimited users",
      "Unlimited submissions",
      "Ratings",
      "Issues",
      "Suggestions",
    ],
  },
];

export default function Example() {
  return (
    <div className="isolate overflow-hidden">
      <div className="flow-root bg-gray-900 pb-16 pt-24 sm:pt-32 lg:pb-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative z-10">
            <h2 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white">
              Simple pricing, no commitment
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-white/60">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              numquam eligendi quos odit doloribus molestiae voluptatum quos
              odit doloribus.
            </p>
          </div>
          <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3">
            <svg
              viewBox="0 0 1208 1024"
              aria-hidden="true"
              className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
            >
              <ellipse
                cx={604}
                cy={512}
                fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)"
                rx={604}
                ry={512}
              />
              <defs>
                <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                  <stop stopColor="#14b8a6" />
                  <stop offset={1} stopColor="#a7f3d0" />
                </radialGradient>
              </defs>
            </svg>
            <div
              className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
              aria-hidden="true"
            />
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured
                    ? "z-10 bg-white shadow-xl ring-1 ring-gray-900/10"
                    : "bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0",
                  "relative rounded-2xl"
                )}
              >
                <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.featured ? "text-gray-900" : "text-white",
                      "text-sm font-semibold leading-6"
                    )}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                    <div className="mt-2 flex items-center gap-x-1">
                      <p
                        className={classNames(
                          tier.featured ? "text-gray-900" : "text-white",
                          "text-4xl font-bold tracking-tight"
                        )}
                      >
                        {tier.price}
                      </p>
                      <div className="text-sm leading-5">
                        <p
                          className={
                            tier.featured ? "text-gray-900" : "text-white"
                          }
                        >
                          GBP
                        </p>
                      </div>
                    </div>
                    <a
                      href={tier.href}
                      aria-describedby={tier.id}
                      className={classNames(
                        tier.featured
                          ? "bg-teal-600 shadow-sm hover:bg-teal-500 focus-visible:outline-teal-600"
                          : "bg-white/10 hover:bg-white/20 focus-visible:outline-white",
                        "rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      )}
                    >
                      Buy this plan
                    </a>
                  </div>
                  <div className="mt-8 flow-root sm:mt-10">
                    <ul
                      role="list"
                      className={classNames(
                        tier.featured
                          ? "divide-gray-900/5 border-gray-900/5 text-gray-600"
                          : "divide-white/5 border-white/5 text-white",
                        "-my-2 divide-y border-t text-sm leading-6 lg:border-t-0"
                      )}
                    >
                      {tier.mainFeatures.map((mainFeature) => (
                        <li key={mainFeature} className="flex gap-x-3 py-2">
                          <CheckIcon
                            className={classNames(
                              tier.featured ? "text-teal-600" : "text-gray-500",
                              "h-6 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                          {mainFeature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative bg-white lg:pt-14">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8" />
      </div>
    </div>
  );
}
