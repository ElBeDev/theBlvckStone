"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

const inputClasses =
  "mt-1 w-full rounded-lg border border-stone/40 bg-white/5 px-4 py-3 text-ivory placeholder:text-stone focus:border-turquoise focus:outline-none";
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClasses}>
          {t("name")}
        </label>
        <input id="name" name="name" type="text" required className={inputClasses} />
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          {t("email")}
        </label>
        <input id="email" name="email" type="email" required className={inputClasses} />
      </div>

      <div>
        <label htmlFor="phone" className={labelClasses}>
          {t("phone")}
        </label>
        <input id="phone" name="phone" type="tel" className={inputClasses} />
      </div>

      <div>
        <label htmlFor="industry" className={labelClasses}>
          {t("industry")}
        </label>
        <input id="industry" name="industry" type="text" className={inputClasses} />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t("message")}
        </label>
        <textarea id="message" name="message" rows={4} className={inputClasses} />
      </div>

      <label className="flex items-start gap-2 text-sm text-mist">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          {t("consent")}{" "}
          <Link
            href="/legal/aviso-de-privacidad"
            className="text-turquoise underline"
          >
            {t("privacyLink")}
          </Link>
        </span>
      </label>

      {/* CAPTCHA (hCaptcha) pendiente: agregar site key una vez provisionado. */}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-amber px-6 py-3 font-bold text-petrol transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>

      {status === "error" && <p className="text-sm text-coral">{t("error")}</p>}
    </form>
  );
}
