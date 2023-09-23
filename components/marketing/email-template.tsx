export default function EmailTemplate() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg leading-8">Hi and welcome to Floop!</h1>

      <p className="text-base leading-6">
        First of all, thank you so much for taking the time to sign up and try
        Floop out for your product! We hope that this is the beginning of a
        joyus relationship for us both!
      </p>

      <p className="text-base leading-6">
        Please check out the below links for getting started, we are hoping it
        is quick and easy and we do not expect you to have any difficulties.
        However, if you do, please reach out for support by emailing
        <a href="mailto:support@feedback-loop.io">support@feedback-loop.io</a>
      </p>

      <ul>
        <li>
          <a href="https://www.feedback-loop.io/#getting-started">
            Getting Started
          </a>
        </li>
        <li>
          <a href="https://www.feedback-loop.io/posts/how-you-can-incorporate-user-feedback-into-your-development-cycle">
            Creating Effective Feedback Loop
          </a>
        </li>
        <li>
          <a href="https://www.feedback-loop.io/posts">Floop Articles</a>
        </li>
      </ul>

      <p className="text-base leading-6">
        Finally, we just want to thank you again and we look forward to helping
        you improve your customer experience journey!
      </p>
    </div>
  );
}
