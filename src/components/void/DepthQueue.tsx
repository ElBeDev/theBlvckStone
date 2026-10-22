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
//
// The type is sized so the longest word fits whole inside the container:
// Unbounded black in capitals at the rear tracking runs up to 0.96em per
// letter, so the size is the container width over (letters x 0.96), capped
// at 7.5rem.
const EM_PER_LETTER = 0.96;

export function DepthQueue({ items, cta }: { items: QueueItem[]; cta: string }) {
  const [front, setFront] = useState(0);
  const active = items[front];
  const longest = Math.max(...items.map((item) => item.word.length));
  const fit = `min(7.5rem, ${(100 / (longest * EM_PER_LETTER)).toFixed(3)}cqi)`;

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
            className={`photo-tint transition-opacity duration-700 ease-out-expo ${
              i === front ? "opacity-55" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <ul className="@container space-y-1 md:space-y-0">
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
                  style={{ fontSize: fit }}
                  className="v-display block w-full whitespace-nowrap text-left uppercase leading-[1.04]"
                >
                  {item.word}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 grid gap-6 md:grid-cols-12 md:items-end">
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
