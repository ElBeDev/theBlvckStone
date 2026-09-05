import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

type StatItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export function Stats({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: StatItem[];
}) {
  return (
    <section className="bg-petrol-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-12 lg:py-24">
        <Reveal className="lg:col-span-4">
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-[36ch] text-base leading-relaxed text-mist/75">
            {intro}
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
          {items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <p className="text-4xl font-black tracking-tighter text-turquoise md:text-[2.75rem]">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={Number.isInteger(stat.value) ? 0 : 1}
                />
              </p>
              <p className="mt-2 text-sm leading-snug text-mist/70">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
