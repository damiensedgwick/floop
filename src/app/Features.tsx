import {
  ArrowTrendingUpIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

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

export default function Features() {
  return (
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
            providing a centralised platform for efficient project and analysis.
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
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
