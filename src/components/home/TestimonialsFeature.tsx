import { Reveal } from "@/components/motion/Reveal";

export type TestimonialItem = {
  id: number;
  name: string;
  company: string | null;
  role: string | null;
  quote: string;
};

function attribution(t: TestimonialItem) {
  return [t.role, t.company].filter(Boolean).join(", ");
}

export function TestimonialsFeature({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: TestimonialItem[];
}) {
  if (items.length === 0) return null;

  const [featured, ...rest] = items;

  return (
    <section className="bg-petrol text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-4xl">
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <blockquote>
              <p className="text-2xl font-bold leading-snug tracking-tight md:text-3xl">
                “{featured.quote}”
              </p>
              <footer className="mt-6">
                <p className="font-bold text-turquoise">{featured.name}</p>
                <p className="text-sm text-mist/70">{attribution(featured)}</p>
              </footer>
            </blockquote>
          </Reveal>

          {rest.length > 0 && (
            <div className="flex flex-col gap-10 lg:col-span-5 lg:border-l lg:border-white/10 lg:pl-10">
              {rest.slice(0, 2).map((t, i) => (
                <Reveal key={t.id} delay={0.08 * (i + 1)} as="div">
                  <blockquote>
                    <p className="text-base leading-relaxed text-mist/90">
                      “{t.quote}”
                    </p>
                    <footer className="mt-4">
                      <p className="text-sm font-bold text-turquoise">{t.name}</p>
                      <p className="text-xs text-mist/60">{attribution(t)}</p>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
