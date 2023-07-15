import { CheckIcon } from "@heroicons/react/20/solid";

const features = [
  {
    name: "Ratings",
    description:
      "Gain valuable insights and understand the pulse of your customers, enabling you to proactively enhance their overall satisfaction and exceed their expectations.",
  },
  {
    name: "Issues",
    description:
      "Empower your team with efficient tools to enable swift problem resolution, minimizing dissatisfaction and elevating the overall customer experience to new heights.",
  },
  {
    name: "Suggestions",
    description:
      "Pinpoint critical improvement areas, fostering unwavering trust, and cultivating long-lasting loyalty with your valued customers through our comprehensive feedback analysis.",
  },
  {
    name: "Floop Rating",
    description:
      "Unlock invaluable insights and harness the full potential of our cutting-edge Floop platform to elevate your performance to new heights.",
  },
  {
    name: "Activity Feed",
    description:
      "Stay consistently informed and connected with our real-time activity feed, granting you instant visibility into the latest customer feedback.",
  },
  {
    name: "Identify Trends",
    description:
      "Uncover and recognise valuable patterns within your data, empowering you to make well-informed decisions and maintain a competitive edge.",
  },
  {
    name: "Monthly Statistics",
    description:
      "Effortlessly track your progress and make data-driven decisions with our comprehensive monthly statistics, providing you with a holistic view of your performance.",
  },
  {
    name: "Mobile friendly",
    description:
      "Seamlessly stay connected and access our platform anytime, anywhere with our intuitive and mobile-friendly interface, offering unparalleled convenience and uninterrupted connectivity.",
  },
];

export default function Features() {
  return (
    <div className="py-24 sm:py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-teal-600">
              Feedback made simple
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Focus on building your service and let us collect your feedback
            </p>
            <p className="mt-6 text-base leading-7">
              Floop eliminates the stress of building and managing your own
              feedback system. With a centralised platform, we handle the volume
              and varying formats of customer feedback, boosting project
              management and analysis.
            </p>
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold">
                  <CheckIcon
                    className="absolute top-1 left-0 h-5 w-5 text-teal-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
