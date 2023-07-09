import Image from "next/image";
import {
  ExclamationTriangleIcon,
  LightBulbIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const product_information = [
  {
    name: "Ratings.",
    description:
      "Pinpoint improvement areas and foster trust and loyalty with your customers.",
    icon: StarIcon,
  },
  {
    name: "Issues.",
    description:
      "Enable swift problem resolution, preventing dissatisfaction and enhancing customer experience.",
    icon: ExclamationTriangleIcon,
  },
  {
    name: "Suggestions.",
    description:
      "Help customers feel heard, satisfaction with your products and services increases.",
    icon: LightBulbIcon,
  },
];

export default function Overview() {
  return (
    <div
      className="py-24 overflow-hidden bg-white sm:py-32 lg:py-48"
      id="product"
    >
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 lg:px-0 lg:pt-4 lg:pr-4">
            <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-teal-600">
                Make smarter decisions
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Let your customers identify areas for improvement
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Floop helps you identify areas for improvement by leveraging
                customer feedback, enabling you to make changes that enhance
                customer satisfaction.
              </p>
              <dl className="max-w-xl mt-10 space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {product_information.map((pi) => (
                  <div key={pi.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <pi.icon
                        className="absolute w-6 h-6 text-teal-600 top-1 left-1"
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
            <div className="relative px-6 pt-8 overflow-hidden bg-teal-500 isolate sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pt-16 sm:pr-0 sm:pl-16 lg:mx-0 lg:max-w-none">
              <div
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left bg-teal-100 opacity-20 ring-1 ring-inset ring-white skew-x-[-30deg]"
                aria-hidden="true"
              />
              <div className="max-w-2xl mx-auto sm:mx-0 sm:max-w-none">
                <Image
                  src="/assets/overview.png"
                  alt="Product screenshot"
                  width={2432}
                  height={1442}
                  className="-mb-12 max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10 w-[57rem]"
                />
              </div>
              <div
                className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
