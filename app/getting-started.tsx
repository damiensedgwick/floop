import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CodeBlock } from "react-perfect-syntax-highlighter";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
            use our API and a send feedback using your own bespoke forms.
          </p>
        </div>
        <Accordion type="single" collapsible className="my-8 w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Using React</AccordionTrigger>
            <AccordionContent className="py-3">
              <CodeBlock
                className="mb-4 rounded-md p-4"
                lang="bash"
                theme="github-dark"
                code={["pnpm add @feedback-loop/react"].join("\n")}
              />
              <p className="my-6 text-lg leading-8">
                You can use the widget straight from installation, however, if
                you want to apply your own styles to the trigger, which is left
                intentionally bare, we suggest you create a wrapper so you can
                style it to your needs.
              </p>
              <p className="my-6 text-lg leading-8">
                The React Floop Widget is used on our own dashboard, below is
                the exact code we are using to import and use the widget.
              </p>
              <CodeBlock
                className="mb-4 rounded-md p-4"
                lang="tsx"
                theme="github-dark"
                code={[
                  '"use client"',
                  "",
                  'import { FloopWidget } from "@feedback-loop/react";',
                  "",
                  "type Props = {",
                  "  projectId: string;",
                  "  userEmail: string;",
                  "};",
                  "",
                  "export const FloopWidgetButton = ({ projectId, userEmail }, Props) => {",
                  "  return (",
                  "    <FloopWidget projectId={projectId} userEmail={userEmail}>",
                  "      <span>Give feedback</span>",
                  "    </FloopWidget>",
                  "  );",
                  "};",
                ].join("\n")}
              />

              <p className="my-6 text-lg leading-8">
                We have also included the following data attributes so that you
                are able to easily locate either the trigger, or the widget.
                This is to help aid you, should you want to either add or change
                some of the styling or for testing.
              </p>

              <CodeBlock
                className="mb-4 rounded-md p-4"
                lang="tsx"
                theme="github-dark"
                code={['data-floop-widget="widget-trigger"'].join("\n")}
              />

              <CodeBlock
                className="mb-4 rounded-md p-4"
                lang="tsx"
                theme="github-dark"
                code={['data-floop-widget="widget-popup"'].join("\n")}
              />

              <p className="mt-6 text-lg leading-8">
                The same code can be viewed on our GitHub repository, which is
                linked below.
              </p>

              <Link
                href="https://github.com/damiensedgwick/floop-react"
                title="View Floop Widget, React source code"
                className={cn(buttonVariants({ variant: "themed" }), "mt-4")}
                target="_blank"
              >
                View on GitHub
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Using Vue</AccordionTrigger>
            <AccordionContent>
              <i>Coming soon...</i>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Going Bespoke</AccordionTrigger>
            <AccordionContent>
              <p className="mb-4 text-lg leading-4">
                After you have built your forms, simply send your data to one of
                the three following endpoints like the examples below:
              </p>
              <CodeBlock
                className="mb-4 rounded-md p-4"
                lang="tsx"
                theme="github-dark"
                code={[
                  "// Ratings",
                  "",
                  "const handleSubmitRating = async (formData: FormData) => {",
                  "  // ... your form code and validation",
                  "",
                  "  const body = {",
                  "    score: Number(rating),",
                  "    details: message,",
                  "    project_id: projectId,",
                  "    user_email: userEmail,",
                  "  };",
                  "",
                  "  await fetch('https://feedback-loop.io/submissions/ratings', {",
                  "    method: 'POST',",
                  "    mode: 'no-cors',",
                  "    headers: {",
                  "      'Content-Type': 'application/json',",
                  "    },",
                  "    body: JSON.stringify(body),",
                  "",
                  "  // ... return",
                  "});",
                ].join("\n")}
              />
              <CodeBlock
                className="mb-4 rounded-md p-4"
                lang="tsx"
                theme="github-dark"
                code={[
                  "// Issues",
                  "",
                  "const handleSubmitIssue = async (formData: FormData) => {",
                  "  // ... your form code and validation",
                  "",
                  "  const body = {",
                  "    title: title,",
                  "    details: message,",
                  "    project_id: projectId,",
                  "    user_email: userEmail,",
                  "  };",
                  "",
                  "  await fetch('https://feedback-loop.io/submissions/issues', {",
                  "    method: 'POST',",
                  "    mode: 'no-cors',",
                  "    headers: {",
                  "      'Content-Type': 'application/json',",
                  "    },",
                  "    body: JSON.stringify(body),",
                  "",
                  "  // ... return",
                  "});",
                ].join("\n")}
              />
              <CodeBlock
                className="mb-4 rounded-md p-4"
                lang="tsx"
                theme="github-dark"
                code={[
                  "// Suggestions",
                  "",
                  "const handleSubmitRating = async (formData: FormData) => {",
                  "  // ... your form code and validation",
                  "",
                  "  const body = {",
                  "    title: title,",
                  "    details: message,",
                  "    project_id: projectId,",
                  "    user_email: userEmail,",
                  "  };",
                  "",
                  "  await fetch('https://feedback-loop.io/submissions/suggestions', {",
                  "    method: 'POST',",
                  "    mode: 'no-cors',",
                  "    headers: {",
                  "      'Content-Type': 'application/json',",
                  "    },",
                  "    body: JSON.stringify(body),",
                  "",
                  "  // ... return",
                  "});",
                ].join("\n")}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
