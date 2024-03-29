const faqs = [
  {
    question: "What do I need to get started?",
    answer:
      "Getting started is simple, just sign up for an account and we will automatically create a project on the hobby plan for you. No credit card or payment details required. Then you can either install one of our widgets or use our API to start collecting feedback.",
  },
  {
    question: "Will Floop be free forever?",
    answer:
      "The plan is to have Floop open source and free for as long as financially possible. If it ever grows to a point where financing becomes a problem, that challenge will be tackled at that point.",
  },
  {
    question: "Why use Floop when I can just build my own forms and dashboard?",
    answer:
      "The idea behind Floop is to enable product teams and engineers to start collecting user feedback as quickly and as easily as possibly. We take care of the forms and the dashboard so that you can focus on building your product.",
  },
];

export default function FAQ() {
  return (
    <div
      className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40"
      id="faqs"
    >
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-bold leading-10 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg leading-7">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our{" "}
            <a
              href="mailto:support@feedback-loop.io"
              className="font-semibold text-mint hover:text-mint/80"
            >
              customer support
            </a>{" "}
            team.
          </p>
        </div>
        <div className="mt-10 lg:col-span-7 lg:mt-0">
          <dl className="space-y-10">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-base font-semibold leading-7">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-lg leading-7">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
