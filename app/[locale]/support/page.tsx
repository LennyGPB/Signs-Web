"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import Navbar from "../components/Navbar";

export default function SupportPage() {
  const t = useTranslations("Support");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      if (!response.ok) throw new Error("Support request failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#B8A5FF]/50 focus:bg-white/[0.06]";

  return (
    <main className="support-page relative min-h-screen overflow-hidden bg-[#0A0A0A] px-6 pb-16 pt-36 text-white md:pt-44">
      <Navbar />
      <div className="support-glow" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-lg">
        <div className="mb-8 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8A5FF]">{t("subtitle")}</p>
          <h1 className="mt-3 font-candal text-3xl sm:text-4xl">{t("heading")}</h1>
          <p className="mt-4 text-sm leading-6 text-white/55">{t("description")}</p>
        </div>

        <form
          onSubmit={submit}
          className="support-card rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl sm:p-9"
        >
          <label className="block text-sm text-white/70">
            {t("nameLabel")}
            <input
              className={fieldClass}
              name="name"
              type="text"
              minLength={2}
              maxLength={100}
              required
              autoComplete="name"
            />
          </label>
          <label className="mt-4 block text-sm text-white/70">
            {t("emailLabel")}
            <input
              className={fieldClass}
              name="email"
              type="email"
              maxLength={254}
              required
              autoComplete="email"
            />
          </label>
          <label className="mt-4 block text-sm text-white/70">
            {t("messageLabel")}
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              name="message"
              minLength={10}
              maxLength={3000}
              required
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="support-submit mt-6 w-full"
          >
            {status === "sending" ? t("sendingButton") : t("sendButton")}
          </button>

          {status === "sent" && (
            <p
              className="mt-4 text-center text-sm text-emerald-400"
              role="status"
            >
              {t("successMessage")}
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-sm text-red-400" role="alert">
              {t("errorMessage")}
            </p>
          )}
        </form>

        <p className="text-center text-white/20 text-xs mt-10">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </main>
  );
}
