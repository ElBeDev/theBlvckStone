import { Line } from "./Line";

export type Step = { title: string; text: string };

// How the work runs: numbered steps, the number dim, the step at the front.
// The sequence carries information (it is the order of the engagement), so
// the numerals stay.
export function Process({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
      <Line depth={1} size="md" as="h2">
        {title}
      </Line>
      <ol className="mt-16 space-y-14">
        {steps.map((step, i) => (
          <li key={step.title} className="grid gap-4 md:grid-cols-12 md:items-baseline">
            <span data-depth={2} className="v-num text-3xl md:col-span-1">
              {i + 1}
            </span>
            <h3 data-depth={0} className="v-title text-2xl md:col-span-5 lg:text-4xl">
              {step.title}
            </h3>
            <p className="v-body max-w-[44ch] text-lg text-ink-1 md:col-span-6 md:text-xl">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
