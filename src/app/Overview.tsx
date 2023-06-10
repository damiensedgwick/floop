import {
  ClipboardDocumentIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

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

export default function Overview() {
  return (
    <div
      className="overflow-hidden bg-white py-24 sm:py-32 lg:py-48"
      id="product"
    >
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
                products or services can be improved. This information can help
                you to make changes that will make your customers happier.
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
                  src="/assets/product-preview.png"
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
  );
}
