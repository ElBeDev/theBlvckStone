"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

const inputClasses =
  "mt-2 w-full rounded-lg border border-white/15 bg-black-base/40 px-4 py-3 text-ivory transition-colors focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/30";
const labelClasses = "block text-sm font-bold text-ivory";

export function ContactForm() {
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
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl bg-petrol-soft p-7 md:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t("name")}
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            {t("email")}
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            {t("phone")}
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="industry" className={labelClasses}>
            {t("industry")}
          </label>
          <input id="industry" name="industry" type="text" autoComplete="organization" className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t("message")}
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </div>

      <label className="flex items-start gap-3 text-sm text-mist">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-amber" />
        <span>
          {t("consent")}{" "}
          <Link href="/legal/aviso-de-privacidad" className="font-bold text-turquoise underline">
            {t("privacyLink")}
          </Link>
        </span>
      </label>

      {/* CAPTCHA (hCaptcha) pendiente: agregar site key una vez provisionado. */}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-4 text-base font-bold text-petrol transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t("sending") : t("submit")}
        <ArrowRight size={18} weight="bold" />
      </button>

      {status === "error" && <p className="text-sm text-coral">{t("error")}</p>}
    </form>
  );
}
