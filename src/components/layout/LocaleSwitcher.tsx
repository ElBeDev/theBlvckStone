"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const active = "text-ink underline underline-offset-4";
  const idle = "text-ink-3 hover:text-ink";

  return (
    <div className="flex items-center gap-1 text-xs font-bold tracking-wide">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink-3">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={loc === locale}
            className={`transition-colors ${loc === locale ? active : idle}`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
