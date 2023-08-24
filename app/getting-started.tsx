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
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <p className="text-base font-semibold text-teal-600 leading-7">
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
        <Accordion type="single" collapsible className="w-full my-8">
          <AccordionItem value="item-1">
            <AccordionTrigger>Using React</AccordionTrigger>
            <AccordionContent className="py-3">
              <CodeBlock
                className="p-4 mb-4 rounded-md"
                lang="bash"
                theme="github-dark"
                code={["pnpm add @feedback-loop/react"].join("\n")}
              />

              <CodeBlock
                className="p-4 mb-4 rounded-md"
                lang="tsx"
                theme="github-dark"
                code={[
                  'import { FloopWidget } from "@feedback-loop/react";',
                  "",
                  "export const MyComponent = () => {",
                  "    return (",
                  '        <FloopWidget projectId="..." userEmail="...">',
                  "            <button>Give feedback</button>",
                  "        </FloopWidget>",
                  "    );",
                  "};",
                ].join("\n")}
              />

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
                className="p-4 mb-4 rounded-md"
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
                className="p-4 mb-4 rounded-md"
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
                className="p-4 mb-4 rounded-md"
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
