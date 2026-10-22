"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

const inputClasses =
  "mt-2 w-full rounded-xs border border-rule-strong bg-black-base/30 px-3.5 py-3 text-ink placeholder:text-ink-3 transition-colors focus:border-pen focus:outline-none";
const labelClasses = "t-cond block text-[11px] font-bold text-ink-2";

export type RouteItem = { code: string; title: string };

export function ContactForm({
  route = [],
  defaultMessage = "",
}: {
  route?: RouteItem[];
  defaultMessage?: string;
}) {
  const t = useTranslations("contact");
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("request_failed");
      router.push("/gracias");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-rule p-5 md:p-8">
      {route.length > 0 && (
        <div className="rule-b mb-6 pb-6">
          <div className="flex items-baseline justify-between gap-4">
            <p className={labelClasses}>{t("routeLabel")}</p>
            <p className="t-cond text-[11px] text-ink-3">{t("routeHint")}</p>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {route.map((item, i) => (
              <li key={item.code} className="t-cond border border-pen px-2 py-1 text-[11px] font-bold text-pen">
                {i + 1} · {item.code} · <span className="font-semibold">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>{t("name")}</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>{t("email")}</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClasses} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>{t("phone")}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="industry" className={labelClasses}>{t("industry")}</label>
          <input id="industry" name="industry" type="text" autoComplete="organization" className={inputClasses} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClasses}>{t("message")}</label>
        <textarea id="message" name="message" rows={5} defaultValue={defaultMessage} className={inputClasses} />
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-ink-2">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-amber" />
        <span>
          {t("consent")}{" "}
          <Link href="/legal/aviso-de-privacidad" className="font-bold text-ink underline">
            {t("privacyLink")}
          </Link>
        </span>
      </label>

      {/* CAPTCHA (hCaptcha) pendiente: agregar site key una vez provisionado. */}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-xs bg-pen px-6 py-3.5 text-base font-bold text-petrol transition-transform hover:-translate-y-px disabled:opacity-60"
        >
          {status === "sending" ? t("sending") : t("submit")}
          <ArrowRight size={18} weight="bold" />
        </button>
        {status === "error" && <p className="text-sm text-coral">{t("error")}</p>}
      </div>
    </form>
  );
}
