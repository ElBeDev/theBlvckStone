import {
  Broadcast,
  Certificate,
  ChartLineUp,
  Handshake,
  MapPinLine,
  ShieldCheck,
  Timer,
  Wrench,
} from "@phosphor-icons/react/ssr";
import { Reveal } from "@/components/motion/Reveal";

const icons = [
  ShieldCheck,
  MapPinLine,
  Broadcast,
  Timer,
  Certificate,
  Handshake,
  Wrench,
  ChartLineUp,
];

type Item = { title: string; description: string };

export function Differentiators({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: Item[];
}) {
  return (
    <section className="bg-black-base text-ivory">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:px-8 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-28">
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-mist/70">
              {intro}
            </p>
          </Reveal>
        </div>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={item.title} delay={(i % 2) * 0.06}>
                <Icon size={30} weight="duotone" className="text-turquoise" />
                <h3 className="mt-4 text-lg font-bold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/65">
                  {item.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
