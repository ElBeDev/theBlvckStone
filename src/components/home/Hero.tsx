"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";
import { DuotoneImage, placeholderUrl } from "@/components/DuotoneImage";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({
  eyebrow,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  imageAlt,
}: {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  imageAlt: string;
}) {
  const reduce = useReducedMotion();

  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-petrol text-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-14 pb-20 md:px-8 lg:min-h-[calc(100dvh-4.5rem)] lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24">
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.05 }}
        >
          <motion.p
            variants={item}
            transition={{ duration: 0.7, ease }}
            className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={item}
            transition={{ duration: 0.8, ease }}
            className="mt-6 text-4xl font-black leading-[1.04] tracking-tighter sm:text-5xl lg:text-[2.9rem] xl:text-[3.1rem]"
          >
            {headline}
          </motion.h1>
          <motion.p
            variants={item}
            transition={{ duration: 0.8, ease }}
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-mist/85 md:text-lg"
          >
            {subheadline}
          </motion.p>
          <motion.div
            variants={item}
            transition={{ duration: 0.8, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 text-sm font-bold text-petrol transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {primaryCta}
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-full border border-turquoise/70 px-6 py-3.5 text-sm font-bold text-turquoise transition-colors hover:bg-turquoise hover:text-petrol"
            >
              {secondaryCta}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-5"
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
        >
          <div
            aria-hidden="true"
            className="absolute -top-4 -right-4 hidden h-full w-full rounded-2xl border border-turquoise/40 lg:block"
          />
          <DuotoneImage
            src={placeholderUrl("blvckstone-hero-energy", 1200, 1500)}
            alt={imageAlt}
            width={1200}
            height={1500}
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="relative aspect-[4/5] w-full rounded-2xl lg:aspect-[4/5]"
          />
        </motion.div>
      </div>
    </section>
  );
}
