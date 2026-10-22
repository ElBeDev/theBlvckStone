"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

// Fields are bare: a label, then the value riding a single underline.
const inputClasses =
  "mt-2 w-full border-0 border-b border-ink-3 bg-transparent px-0 py-3 text-xl text-ink-0 placeholder:text-ink-3 transition-colors focus:border-signal focus:outline-none";
const labelClasses = "block text-base text-ink-1";

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
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>{t("name")}</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>{t("email")}</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClasses}>{t("phone")}</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} />
        </div>
        <div>
          <label htmlFor="industry" className={labelClasses}>{t("industry")}</label>
          <input id="industry" name="industry" type="text" autoComplete="organization" className={inputClasses} />
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelClasses}>{t("message")}</label>
        <textarea id="message" name="message" rows={3} className={inputClasses} />
      </div>

      <label className="flex items-start gap-4 text-base text-ink-1">
        <input type="checkbox" name="consent" required className="mt-1.5 h-5 w-5 accent-amber" />
        <span>
          {t("consent")}{" "}
          <Link href="/legal/aviso-de-privacidad" className="font-bold text-ink-0 underline">
            {t("privacyLink")}
          </Link>
        </span>
      </label>

      {/* CAPTCHA (hCaptcha) pendiente: agregar site key una vez provisionado. */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-3 bg-signal px-8 py-5 text-lg font-bold text-void transition-transform hover:-translate-y-0.5 disabled:opacity-60 md:text-xl"
        >
          {status === "sending" ? t("sending") : t("submit")}
          <ArrowRight size={24} weight="bold" />
        </button>
        {status === "error" && <p className="text-base text-coral">{t("error")}</p>}
      </div>
    </form>
  );
}
