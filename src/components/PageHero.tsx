import { Reveal } from "@/components/motion/Reveal";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";

export function PageHero({
  eyebrow,
  title,
  description,
  imageSeed,
  imageAlt,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  imageSeed?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-ivory text-petrol">
      <div
        className={`mx-auto grid max-w-7xl items-center gap-10 px-5 pt-14 pb-14 md:px-8 lg:pt-20 lg:pb-20 ${
          imageSeed ? "lg:grid-cols-12" : ""
        }`}
      >
        <Reveal className={imageSeed ? "lg:col-span-7" : "max-w-4xl"}>
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-4 max-w-[22ch] text-4xl font-black leading-[1.05] tracking-tighter md:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-carbon/75">
              {description}
            </p>
          )}
          {children}
        </Reveal>
        {imageSeed && (
          <Reveal delay={0.1} className="lg:col-span-5">
            <DuotoneImage
              src={placeholderUrl(imageSeed, 1200, 900)}
              alt={imageAlt ?? title}
              width={1200}
              height={900}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] w-full rounded-2xl"
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
