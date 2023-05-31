import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  CheckIcon,
  ClipboardDocumentIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/20/solid";
import {
  ArrowTrendingUpIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { prisma } from "@/lib/prisma";

const product_information = [
  {
    name: "Ratings.",
    description:
      "Customer ratings can be used to identify areas where businesses can improve, and they can also be used to build trust and loyalty with customers.",
    icon: HandThumbUpIcon,
  },
  {
    name: "Issues.",
    description:
      "Customer feedback can help you identify and solve problems quickly. This can help to prevent customer dissatisfaction and improve your overall customer experience.",
    icon: HandThumbDownIcon,
  },
  {
    name: "Suggestions.",
    description:
      "When customers feel like their suggestions are being listened to, they are more likely to be satisfied with your products and services.",
    icon: ClipboardDocumentIcon,
  },
];

const product_features = [
  {
    name: "Feedback analysis",
    description:
      "Feedback analysis is invaluable, offering crucial insights that drive informed decision-making, improve products/services, and enhance overall customer satisfaction.",
    href: "#",
    icon: ArrowTrendingUpIcon,
  },
  {
    name: "Manage team members",
    description:
      "Effective team member management ensures streamlined collaboration, boosts productivity, fosters engagement, and achieves project goals with greater efficiency and success.",
    href: "#",
    icon: UsersIcon,
  },
  {
    name: "Actionable data",
    description:
      "Actionable data empowers informed decision-making, enabling businesses to identify trends, uncover opportunities, address challenges, and drive meaningful improvements across their operations.",
    href: "#",
    icon: ClipboardDocumentCheckIcon,
  },
];

const product_pricing = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "#",
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
    href: "#",
    priceMonthly: "£19.99",
    description:
      "Elevate your feedback collection capabilities with our Professional Plan. Perfect for growing businesses and teams.",
    features: [
      "Unlimited users",
      "Unlimited submissions",
      "Ratings",
      "Issues",
      "Suggestions",
    ],
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);

  const auth_user = session?.user;

  const public_user = await prisma.public_users.findUnique({
    where: {
      id: auth_user?.id,
    },
  });

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10">
        <Banner />
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Floop</span>
              <Image
                src="/floop-logo.png"
                alt="Floop logo"
                width={72}
                height={72}
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            {/* TODO: Uncomment for launch */}
            {public_user ? (
              <Link
                href={`/organisation/${public_user?.organisation_id}/dashboard`}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Dashboard <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Sign in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <div className="relative isolate px-6 pt-24 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6ee7b7] to-[#10b981] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                The feedback loop for your platform
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Floop is a feedback loop that helps businesses capture important
                customer feedback. Get valuable insights and improve your
                business today!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* TODO: Uncomment for launch */}
                {/*<a*/}
                {/*  href="/api/auth/signin"*/}
                {/*  className="rounded-md bg-teal-600 text-sm font-semibold text-white shadow-sm px-3.5 py-2.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"*/}
                {/*>*/}
                {/*  Get started for free*/}
                {/*</a>*/}
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#6ee7b7] to-[#10b981] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="overflow-hidden bg-white py-24 sm:py-32" id="product">
          <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
              <div className="px-6 lg:px-0 lg:pt-4 lg:pr-4">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                  <h2 className="text-base font-semibold leading-7 text-teal-600">
                    Get better faster
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Identify areas for improvement
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Customer feedback can help you to identify areas where your
                    products or services can be improved. This information can
                    help you to make changes that will make your customers
                    happier.
                  </p>
                  <dl className="mt-10 max-w-xl text-base leading-7 text-gray-600 space-y-8 lg:max-w-none">
                    {product_information.map((pi) => (
                      <div key={pi.name} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <pi.icon
                            className="absolute top-1 left-1 h-5 w-5 text-teal-600"
                            aria-hidden="true"
                          />
                          {pi.name}
                        </dt>{" "}
                        <dd className="inline">{pi.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
              <div className="sm:px-6 lg:px-0">
                <div className="relative isolate overflow-hidden bg-teal-500 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pt-16 sm:pr-0 sm:pl-16 lg:mx-0 lg:max-w-none">
                  <div
                    className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left bg-teal-100 opacity-20 ring-1 ring-inset ring-white skew-x-[-30deg]"
                    aria-hidden="true"
                  />
                  <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                    <Image
                      src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                      alt="Product screenshot"
                      width={2432}
                      height={1442}
                      className="-mb-12 max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10 w-[57rem]"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="bg-white py-24 sm:py-32" id="product_features">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-base font-semibold leading-7 text-teal-600">
                Floop for teams
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Stay on top of customer feedback
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Keeping track of customer feedback can be challenging due to its
                volume and varying formats. Our service streamlines the process,
                providing a centralised platform for efficient organisation and
                analysis.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {product_features.map((pf) => (
                  <div key={pf.name} className="flex flex-col">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                        <pf.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      {pf.name}
                    </dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{pf.description}</p>
                      <p className="mt-6">
                        <a
                          href={pf.href}
                          className="text-sm font-semibold leading-6 text-teal-600"
                        >
                          Learn more <span aria-hidden="true">→</span>
                        </a>
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Product Pricing */}
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
                extensive user data collection, our pricing options cater to
                your needs, empowering you to gather valuable insights and drive
                success.
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
                      <a
                        href={pp.href}
                        aria-describedby={pp.id}
                        className="mt-8 block rounded-md bg-teal-600 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm px-3.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                      >
                        Get started today
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
            <span className="block sm:inline">&copy; 2023 Floop,&nbsp;</span>
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

// TODO: Delete this after launch
function Banner() {
  return (
    <div className="bg-teal-600 px-6 py-2.5 sm:before:flex-1 sm:px-3.5">
      <p className="text-center text-sm leading-6 text-white">
        Floop is under active development and will be available soon!
      </p>
    </div>
  );
}
