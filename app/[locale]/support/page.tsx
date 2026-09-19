"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://signs-api-production.up.railway.app/api";

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
      const response = await fetch(`${API_URL}/support`, {
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
    "mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#B8A5FF]/50";

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">
        <div className="mb-12 text-center">
          <h1 className="font-candal text-4xl tracking-tight">Signs</h1>
          <p className="text-white/40 text-sm mt-2 tracking-widest uppercase">
            {t("subtitle")}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
        >
          <h2 className="text-xl font-semibold mb-3">{t("heading")}</h2>
          <p className="text-white/50 text-sm leading-7 mb-6">
            {t("description")}
          </p>

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
            className="mt-6 w-full rounded-2xl border border-[#B8A5FF]/30 bg-[#B8A5FF]/10 px-5 py-4 text-sm font-medium text-[#B8A5FF] transition-colors hover:bg-[#B8A5FF]/15 disabled:cursor-wait disabled:opacity-50"
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
