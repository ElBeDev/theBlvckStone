import { Reveal } from "@/components/motion/Reveal";
import { DuotoneImage, placeholderById } from "@/components/DuotoneImage";

type Product = {
  id: number;
  slug: string;
  title: string;
  description: string;
  specs: string | null;
  imageUrl: string | null;
};

function parseSpecs(specs: string | null) {
  if (!specs) return [];
  return specs
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: "", value: line };
      return { label: line.slice(0, idx).trim(), value: line.slice(idx + 1).trim() };
    })
    .slice(0, 6);
}

export function ProductGrid({
  items,
  specsLabel,
  imagePool,
}: {
  items: Product[];
  specsLabel: string;
  imagePool: number[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:px-8 lg:grid-cols-2 lg:py-20">
        {items.map((item, i) => {
          const specs = parseSpecs(item.specs);
          return (
            <Reveal key={item.id} delay={(i % 2) * 0.06} as="article">
              <div className="grid h-full overflow-hidden rounded-2xl border border-petrol/10 bg-ivory sm:grid-cols-5">
                <DuotoneImage
                  src={item.imageUrl ?? placeholderById(imagePool[i % imagePool.length], 800, 900)}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
                  className="relative aspect-[4/3] sm:col-span-2 sm:aspect-auto sm:min-h-full"
                />
                <div className="flex flex-col p-6 sm:col-span-3">
                  <h3 className="text-xl font-bold leading-snug text-petrol">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-carbon/75">
                    {item.description}
                  </p>
                  {specs.length > 0 && (
                    <div className="mt-5">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-teal">
                        {specsLabel}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {specs.map((spec) => (
                          <li
                            key={spec.label + spec.value}
                            className="rounded-full border border-petrol/10 bg-white px-3 py-1 text-xs text-carbon"
                          >
                            {spec.label && (
                              <span className="font-bold text-petrol">{spec.label}: </span>
                            )}
                            {spec.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
