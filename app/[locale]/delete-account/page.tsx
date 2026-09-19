import { useTranslations } from "next-intl";

export default function DeleteAccountPage() {
  const t = useTranslations("DeleteAccount");

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">

        {/* Logo */}
        <div className="mb-12 text-center">
          <h1 className="font-candal text-4xl tracking-tight">Signs</h1>
          <p className="text-white/40 text-sm mt-2 tracking-widest uppercase">
            {t("subtitle")}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold mb-3">
            {t("heading")}
          </h2>
          <p className="text-white/50 text-sm leading-7 mb-8">
            {t("description")}{" "}
            <span className="text-white font-medium">{t("descriptionSubject")}</span>{" "}
            {t("descriptionEnd")}
          </p>

          {/* Email */}
            <a
            href="mailto:gleam-pro@proton.me"
            className="flex items-center justify-between rounded-2xl border border-[#B8A5FF]/30 bg-[#B8A5FF]/10 px-5 py-4 hover:bg-[#B8A5FF]/15 transition-colors"
          >
            <span className="text-[#B8A5FF] font-medium text-sm">
              gleam-pro@proton.me
            </span>
            <span className="text-[#B8A5FF]/60 text-xs uppercase tracking-widest">
              {t("sendEmail")}
            </span>
          </a>

          {/* Délai */}
          <div className="mt-6 flex items-start gap-3">
            <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#B8A5FF]/50 shrink-0" />
            <p className="text-white/35 text-xs leading-6">
              {t("note1")}
            </p>
          </div>
          <div className="mt-3 flex items-start gap-3">
            <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-[#B8A5FF]/50 shrink-0" />
            <p className="text-white/35 text-xs leading-6">
              {t("note2")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-10">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </main>
  );
}
