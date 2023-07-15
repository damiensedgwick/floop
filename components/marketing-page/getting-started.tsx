export default function GettingStarted() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-base font-semibold leading-7 text-teal-600">
            Getting you started
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
            It could not be easier to get started
          </h2>
          <p className="mt-6 text-lg leading-8">
            Floop offers a convenient plug and play widget that allows you to
            effortlessly collect data, while also providing the flexibility to
            use a bespoke form and sending the data to our endpoints.
          </p>
        </div>
        <div className="mt-10 flex items-center gap-x-6">
          <a
            href="https://www.github.com/damiensedgwick/floop-react"
            target="_blank"
            className="rounded-md bg-teal-600 text-sm font-semibold text-white shadow-sm px-3.5 py-2.5 hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Meet the widget
          </a>
          <a href="#" className="text-sm font-semibold leading-6">
            Fly solo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
