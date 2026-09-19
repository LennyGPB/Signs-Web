/* eslint-disable react/no-unescaped-entities */
import { useLocale, useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="font-candal text-4xl tracking-tight mb-2">Signs</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-10 text-white/70 text-sm leading-7">

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">
              {t("lastUpdated", {
                date: new Date().toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
              })}
            </p>
          </div>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s1Title")}</h2>
            <p>{t("s1Body")}</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s2Title")}</h2>
            <ul className="space-y-2">
              <li>• <span className="text-white">{t("s2Item1Label")}</span> — {t("s2Item1")}</li>
              <li>• <span className="text-white">{t("s2Item2Label")}</span> — {t("s2Item2")}</li>
              <li>• <span className="text-white">{t("s2Item3Label")}</span> — {t("s2Item3")}</li>
              <li>• <span className="text-white">{t("s2Item4Label")}</span> — {t("s2Item4")}</li>
              <li>• <span className="text-white">{t("s2Item5Label")}</span> — {t("s2Item5")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s3Title")}</h2>
            <ul className="space-y-2">
              <li>• {t("s3Item1")}</li>
              <li>• {t("s3Item2")}</li>
              <li>• {t("s3Item3")}</li>
              <li>• {t("s3Item4")}</li>
              <li>• {t("s3Item5")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s4Title")}</h2>
            <ul className="space-y-2">
              <li>• <span className="text-white">{t("s4Item1Label")}</span> — {t("s4Item1")} <a href="https://openai.com/privacy" className="text-[#B8A5FF] underline">{t("s4Item1Link")}</a>.</li>
              <li>• <span className="text-white">{t("s4Item2Label")}</span> — {t("s4Item2")} <a href="https://www.revenuecat.com/privacy" className="text-[#B8A5FF] underline">{t("s4Item2Link")}</a>.</li>
              <li>• <span className="text-white">{t("s4Item3Label")}</span> — {t("s4Item3")}</li>
              <li>• <span className="text-white">{t("s4Item4Label")}</span> — {t("s4Item4")}</li>
              <li>• <span className="text-white">{t("s4Item5Label")}</span> — {t("s4Item5")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s5Title")}</h2>
            <p>{t("s5Body")}</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s6Title")}</h2>
            <ul className="space-y-2">
              <li>• {t("s6Item1")}</li>
              <li>• {t("s6Item2")}</li>
              <li>• {t("s6Item3")}</li>
              <li>• {t("s6Item4")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s7Title")}</h2>
            <p>
              {t("s7Body")}{" "}
              <a
                href="https://signs-web-rose.vercel.app/delete-account"
                className="text-[#B8A5FF] underline"
              >
                signs-web-rose.vercel.app/delete-account
              </a>
              {t("s7BodyEnd")}
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s8Title")}</h2>
            <p>{t("s8Body")}</p>
          </section>

          <section>
            <h2 className="text-white text-lg font-semibold mb-3">{t("s9Title")}</h2>
            <p>
              {t("s9Body")}{" "}
              <a href="mailto:privacy@signs.app" className="text-[#B8A5FF] underline">
                privacy@signs.app
              </a>
            </p>
          </section>

        </div>

        {/* Footer */}
        <p className="text-center text-white/20 text-xs mt-16">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </main>
  );
}
