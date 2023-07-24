import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// @ts-ignore
import { CodeBlock } from "react-perfect-syntax-highlighter";

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
        <Accordion type="single" collapsible className="w-full my-8">
          <AccordionItem value="item-1">
            <AccordionTrigger>Using React</AccordionTrigger>
            <AccordionContent className="py-3">
              <CodeBlock
                className="rounded-md p-4"
                language="tsx"
                theme="github-dark"
                code={`import { FloopWidget } from "@feedback-loop/react"

export const MyComponent = () => {
    return (
        <FloopWidget projectId="..." userEmail="...">
            <button>Give feedback</button>
        </FloopWidget>
    );
};`}
              />
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
                className="rounded-md p-4 text-white mb-4"
                language="tsx"
                theme="dracula"
                code={`// Ratings`}
              />
              <CodeBlock
                className="rounded-md p-4 text-white mb-4"
                language="tsx"
                theme="dracula"
                code={`// Issues`}
              />
              <CodeBlock
                className="rounded-md p-4 text-white mb-4"
                language="tsx"
                theme="dracula"
                code={`// Suggestions`}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
