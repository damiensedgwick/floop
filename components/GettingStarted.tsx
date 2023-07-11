export default function GettingStarted() {
  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <p className="text-base font-semibold leading-7 text-teal-600">
            Getting you started
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            It could not be easier to get started
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Floop offers a convenient plug and play widget that allows you to
            effortlessly collect data, while also providing the flexibility to
            use a bespoke form and sending the data to our endpoints.
          </p>
        </div>
        <div className="flex items-center mt-10 gap-x-6">
          <a
            href="https://www.github.com/damiensedgwick/floop-react"
            target="_blank"
            className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Meet the widget
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Fly solo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
