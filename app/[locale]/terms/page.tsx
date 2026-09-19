import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("Terms");

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <header className="mb-12">
          <h1 className="mb-2 font-candal text-4xl tracking-tight">Signs</h1>
          <p className="text-sm uppercase tracking-widest text-white/40">{t("subtitle")}</p>
        </header>

        <div className="space-y-9 text-sm leading-7 text-white/70">
          <p className="text-xs uppercase tracking-widest text-white/30">
            {t("lastUpdated")}
          </p>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s1Title")}</h2>
            <p>{t("s1Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s2Title")}</h2>
            <p>{t("s2Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s3Title")}</h2>
            <p>{t("s3Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s4Title")}</h2>
            <p>{t("s4Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s5Title")}</h2>
            <p>{t("s5Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s6Title")}</h2>
            <p>
              {t("s6Body")}{" "}
              <a href="/privacy" className="text-[#B8A5FF] underline">
                {t("s6Link")}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s7Title")}</h2>
            <p>
              {t("s7Body")}{" "}
              <a href="mailto:gleam-pro@proton.me" className="text-[#B8A5FF] underline">
                gleam-pro@proton.me
              </a>
              .
            </p>
          </section>
        </div>

        <p className="mt-12 text-center text-xs text-white/20">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </main>
  );
}
