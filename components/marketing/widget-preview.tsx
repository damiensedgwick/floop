import FloopWidgetButton from "../floop-widget.client";

export default function WidgetPreview() {
  return (
    <div
      className="py-24 text-white sm:py-32 bg-zinc-950 text-primary"
      id="widget-preview"
    >
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto sm:text-center">
          <p className="text-base font-semibold leading-7 text-mint">
            No forms? No problem.
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">
            The Floop widget has you covered
          </h2>
          <p className="mt-6 text-lg leading-8">
            You can embed the Floop widget on any page of your website or web
            app. It&apos;s a simple, unobtrusive button that your customers can
            click to leave feedback.
          </p>
        </div>
      </div>
      <div className="flex justify-center px-6 mx-auto mt-16 max-w-7xl sm:mt-20 md:mt-24 lg:px-8">
        <FloopWidgetButton
          projectId="preview-widget"
          userEmail="preview@widget.com"
          buttonType="purple"
        />
      </div>
    </div>
  );
}
