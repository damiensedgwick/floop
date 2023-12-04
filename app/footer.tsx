import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col-reverse items-start justify-between border-t border-gray-200 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:max-w-7xl lg:px-8">
      <div>
        <span className="inline">&copy; 2023 Floop,&nbsp;</span>
        <span className="inline">All rights reserved.</span>
      </div>
      <a
        className="hidden sm:flex"
        href="https://github.com/damiensedgwick/floop"
        target="_blank"
        rel="noopener norefer"
      >
        <Github className="h-6 w-6" />
      </a>
      <span className="mb-4 block sm:mb-0 sm:inline">
        <a href="mailto:support@feedback-loo.io">support@feedback-loop.io</a>
      </span>
    </div>
  );
}
