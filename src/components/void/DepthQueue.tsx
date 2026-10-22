"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "@/i18n/navigation";

export type QueueItem = {
  word: string;
  title: string;
  text: string;
  href: string;
  image: string;
};

// The five lines as a queue in depth: one word per baseline, the front one
// bright and still, the rest receding. Pointing at a word pulls it forward
// and its photo rises from the void behind the stack.
export function DepthQueue({ items, cta }: { items: QueueItem[]; cta: string }) {
  const [front, setFront] = useState(0);
  const active = items[front];

  return (
    <section className="relative isolate">
      <div className="photo-plane -z-10" aria-hidden="true">
        {items.map((item, i) => (
          <Image
            key={item.word}
            src={item.image}
            alt=""
            fill
            sizes="100vw"
            className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === front ? "opacity-55" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <ul className="space-y-1 md:space-y-0">
          {items.map((item, i) => {
            const depth = Math.min(3, Math.abs(i - front));
            return (
              <li key={item.word}>
                <button
                  type="button"
                  onMouseEnter={() => setFront(i)}
                  onFocus={() => setFront(i)}
                  onClick={() => setFront(i)}
                  aria-pressed={i === front}
                  data-depth={depth}
                  className="v-display block w-full text-left text-[1.75rem] uppercase sm:text-5xl md:text-7xl lg:text-[7.5rem]"
                >
                  {item.word}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 grid gap-6 md:grid-cols-12 md:items-end">
          <p className="v-body max-w-[44ch] text-xl leading-snug text-ink-1 md:col-span-8 md:text-2xl" aria-live="polite">
            <span className="text-ink-0">{active.title}.</span> {active.text}
          </p>
          <Link
            href={active.href}
            className="inline-flex items-center gap-3 text-lg font-bold text-signal md:col-span-4 md:justify-self-end"
          >
            {cta}
            <ArrowRight size={22} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
