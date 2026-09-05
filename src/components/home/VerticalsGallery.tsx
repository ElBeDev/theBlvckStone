import { Link } from "@/i18n/navigation";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";
import { Reveal } from "@/components/motion/Reveal";

type Vertical = { title: string; description: string; seed: string };

export function VerticalsGallery({
  title,
  intro,
  items,
  ctaLabel,
}: {
  title: string;
  intro: string;
  items: Vertical[];
  ctaLabel: string;
}) {
  return (
    <section className="bg-petrol-deep text-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-mist/70">
              {intro}
            </p>
          </div>
          <Link
            href="/soluciones"
            className="inline-flex w-fit items-center rounded-full border border-turquoise/70 px-5 py-2.5 text-sm font-bold text-turquoise transition-colors hover:bg-turquoise hover:text-petrol"
          >
            {ctaLabel}
          </Link>
        </Reveal>

        <Reveal className="mt-12 flex flex-col gap-3 md:h-[520px] md:flex-row">
          {items.map((item) => (
            <Link
              key={item.title}
              href="/soluciones"
              className="accordion-strip group relative block h-56 overflow-hidden rounded-2xl md:h-full"
            >
              <DuotoneImage
                src={placeholderUrl(item.seed, 900, 1200)}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="absolute inset-0"
              />
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <h3 className="text-xl font-bold leading-snug md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-mist/80 md:max-w-[28ch]">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
