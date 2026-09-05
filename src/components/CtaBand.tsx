import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBand({
  title,
  text,
  ctaLabel,
  tone = "dark",
}: {
  title: string;
  text: string;
  ctaLabel: string;
  tone?: "dark" | "light";
}) {
  const shell =
    tone === "dark" ? "bg-petrol-soft text-ivory" : "bg-mist text-petrol";
  const muted = tone === "dark" ? "text-mist/75" : "text-carbon/75";

  return (
    <section className={shell}>
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className={`mt-4 max-w-[52ch] text-base leading-relaxed ${muted}`}>
            {text}
          </p>
        </div>
        <Link
          href="/contacto"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber px-7 py-4 text-base font-bold text-petrol transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {ctaLabel}
          <ArrowRight size={18} weight="bold" />
        </Link>
      </Reveal>
    </section>
  );
}
