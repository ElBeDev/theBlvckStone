import {
  ArrowUpRight,
  BatteryCharging,
  Buildings,
  Coins,
  Scales,
  Truck,
} from "@phosphor-icons/react/ssr";
import { Link } from "@/i18n/navigation";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";
import { Reveal } from "@/components/motion/Reveal";

type ServiceItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

const seeds = [
  "blvckstone-solar-field",
  "blvckstone-electric-truck",
  "blvckstone-industrial-building",
];

export function ServicesBento({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: ServiceItem[];
}) {
  const [featured, second, third, fourth, fifth] = items;

  return (
    <section className="bg-petrol text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <Reveal className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
          <Reveal className="lg:col-span-2 lg:row-span-2 lg:h-full">
            <BentoImageCell
              item={featured}
              Icon={BatteryCharging}
              seed={seeds[0]}
              tall
            />
          </Reveal>
          <Reveal delay={0.08}>
            <BentoImageCell item={second} Icon={Truck} seed={seeds[1]} />
          </Reveal>
          <Reveal delay={0.16}>
            <TintedCell item={third} Icon={Coins} accent="amber" />
          </Reveal>
          <Reveal
            delay={0.08}
            className="lg:col-span-2 lg:col-start-2 lg:row-start-3"
          >
            <BentoImageCell item={fourth} Icon={Buildings} seed={seeds[2]} />
          </Reveal>
          <Reveal
            delay={0.16}
            className="md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-3"
          >
            <TintedCell item={fifth} Icon={Scales} accent="turquoise" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BentoImageCell({
  item,
  Icon,
  seed,
  tall = false,
}: {
  item: ServiceItem;
  Icon: typeof BatteryCharging;
  seed: string;
  tall?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl ${
        tall ? "min-h-[420px]" : "min-h-[280px]"
      }`}
    >
      <DuotoneImage
        src={placeholderUrl(seed, tall ? 1400 : 900, tall ? 1200 : 700)}
        alt={item.title}
        fill
        sizes={tall ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      />
      <div className="relative z-10 flex flex-1 flex-col justify-between p-7">
        <Icon size={36} weight="duotone" className="text-turquoise" />
        <div>
          <h3
            className={`font-bold leading-snug ${tall ? "text-2xl md:text-3xl" : "text-xl"}`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-3 leading-relaxed text-mist/80 ${
              tall ? "max-w-[52ch] text-base" : "text-sm"
            }`}
          >
            {item.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-turquoise">
            {item.cta}
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function TintedCell({
  item,
  Icon,
  accent,
}: {
  item: ServiceItem;
  Icon: typeof BatteryCharging;
  accent: "amber" | "turquoise";
}) {
  const accentText = accent === "amber" ? "text-amber" : "text-turquoise";

  return (
    <Link
      href={item.href}
      className="group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-2xl bg-petrol-soft p-7 transition-transform hover:-translate-y-1"
    >
      <Icon size={40} weight="duotone" className={accentText} />
      <div>
        <h3 className="text-xl font-bold leading-snug">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist/75">
          {item.description}
        </p>
        <span
          className={`mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${accentText}`}
        >
          {item.cta}
          <ArrowUpRight
            size={16}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
