import {
  BellAlertIcon,
  PresentationChartLineIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const product_features = [
  {
    name: "Activity feed",
    description:
      "Unlock insights. Drive informed decisions, enhance satisfaction, and improve products with invaluable feedback.",
    href: "#",
    icon: BellAlertIcon,
  },
  {
    name: "Boost collaboration",
    description:
      "Streamline collaboration. Boost productivity, engagement, and project success with effective team management.",
    href: "#",
    icon: UsersIcon,
  },
  {
    name: "Monitor trends",
    description:
      "Actionable data empowers trend-driven decision-making, driving meaningful improvements across operations.",
    href: "#",
    icon: PresentationChartLineIcon,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-white sm:py-32 lg:py-48">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-teal-600">
            Feedback made simple
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Focus on building your service and let us collect your feedback
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our service eliminates the stress of building and managing your own
            feedback system. With a centralised platform, we handle the volume
            and varying formats of customer feedback, boosting project
            management and analysis.
          </p>
        </div>
        <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {product_features.map((pf) => (
              <div key={pf.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="flex items-center justify-center w-10 h-10 mb-6 bg-teal-600 rounded-lg">
                    <pf.icon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {pf.name}
                </dt>
                <dd className="flex flex-col flex-auto mt-1 text-base leading-7 text-gray-600">
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
