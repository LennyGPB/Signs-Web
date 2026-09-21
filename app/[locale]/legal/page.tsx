import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return buildMetadata({
    locale,
    path: "/legal",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function LegalPage() {
  const t = useTranslations("Legal");

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <header className="mb-12">
          <p className="mb-2 font-candal text-4xl tracking-tight">Signs</p>
          <h1 className="text-sm uppercase tracking-widest text-white/40">{t("subtitle")}</h1>
        </header>

        <div className="space-y-9 text-sm leading-7 text-white/70">
          <p className="text-xs uppercase tracking-widest text-white/30">
            {t("lastUpdated")}
          </p>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s1Title")}</h2>
            <ul className="space-y-1">
              <li>{t("s1Item1")}</li>
              <li>{t("s1Item2")}</li>
              <li>{t("s1Item3")}</li>
              <li>
                {t("s1Item4")}{" "}
                <a href="mailto:gleam-pro@proton.me" className="text-[#B8A5FF] underline">
                  gleam-pro@proton.me
                </a>
              </li>
            </ul>
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
            <p>{t("s6Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s7Title")}</h2>
            <p>{t("s7Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s8Title")}</h2>
            <p>{t("s8Body")}</p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s9Title")}</h2>
            <p>
              {t("s9Body")}{" "}
              <a href="/privacy" className="text-[#B8A5FF] underline">
                {t("s9Link")}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-semibold text-white">{t("s10Title")}</h2>
            <p>
              {t("s10Body")}{" "}
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
