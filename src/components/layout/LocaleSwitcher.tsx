"use client";

import { routing } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LocaleSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const active = tone === "dark" ? "text-turquoise" : "text-teal";
  const idle =
    tone === "dark"
      ? "text-mist/70 hover:text-ivory"
      : "text-carbon/70 hover:text-petrol";

  return (
    <div className="flex items-center gap-1 text-xs font-bold tracking-wide">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-mist/40">/</span>}
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
