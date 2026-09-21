import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { stripe } from "@/lib/stripe";
import { Link } from "@/i18n/navigation";
import { DISCORD_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Success" });
  return {
    ...buildMetadata({
      locale,
      path: "/success",
      title: t("metaTitle"),
      description: t("metaDescription"),
    }),
    // Page post-paiement : jamais destinée à être indexée ou partagée depuis les résultats de recherche.
    robots: { index: false, follow: false },
  };
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id: sessionId } = await searchParams;
  const t = await getTranslations("Success");
  const ebookLang = locale === "fr" ? "fr" : "en";

  if (!sessionId) {
    redirect("/");
  }

  let paid = false;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paid = session.payment_status === "paid";
  } catch (error) {
    console.error("Stripe session retrieval failed", error);
  }

  if (!paid) {
    redirect("/");
  }

  return (
    <main className="success-page relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] px-6 py-20 text-center text-white">
      <div className="success-glow" aria-hidden="true" />

      <div className="success-card relative z-10 flex w-full max-w-lg flex-col items-center gap-6 rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-10 backdrop-blur-2xl sm:px-12 sm:py-14">
        <div className="success-check" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12.5 10 17.5 19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#B8A5FF]">{t("eyebrow")}</p>
          <h1 className="mt-3 font-candal text-3xl sm:text-4xl">{t("title")}</h1>
        </div>

        <p className="max-w-sm text-sm leading-6 text-white/65 sm:text-base">{t("description")}</p>

        <a
          href={`/api/download?session_id=${encodeURIComponent(sessionId)}&lang=${ebookLang}`}
          className="hero-ebook-cta w-full justify-center"
        >
          <span className="text-white tracking-wider font-thin">{t("downloadCta")}</span>
          <span className="hero-ebook-cta-icon" aria-hidden="true">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 18v2h14v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noreferrer"
          className="hero-ebook-cta w-full justify-center"
        >
          <span className="text-white tracking-wider font-thin">{t("joinDiscordCta")}</span>
          <span className="hero-ebook-cta-icon" aria-hidden="true">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.32 5.37a18.6 18.6 0 0 0-4.6-1.43.07.07 0 0 0-.08.04c-.2.36-.42.82-.57 1.19a17.2 17.2 0 0 0-5.15 0 8.7 8.7 0 0 0-.58-1.19.07.07 0 0 0-.08-.04 18.5 18.5 0 0 0-4.6 1.43.07.07 0 0 0-.03.03C1.55 9.1.85 12.7 1.19 16.27a.08.08 0 0 0 .03.05 18.7 18.7 0 0 0 5.63 2.85.07.07 0 0 0 .08-.03c.43-.6.82-1.23 1.15-1.89a.07.07 0 0 0-.04-.1 12.3 12.3 0 0 1-1.76-.84.07.07 0 0 1-.01-.12c.12-.09.24-.18.35-.27a.07.07 0 0 1 .07-.01c3.7 1.69 7.7 1.69 11.36 0a.07.07 0 0 1 .07.01c.12.09.23.18.35.27a.07.07 0 0 1-.01.12c-.56.33-1.15.6-1.76.84a.07.07 0 0 0-.04.1c.34.66.73 1.29 1.15 1.89a.07.07 0 0 0 .08.03 18.6 18.6 0 0 0 5.64-2.85.07.07 0 0 0 .03-.05c.4-4.13-.67-7.7-2.83-10.87a.06.06 0 0 0-.03-.03ZM8.68 14.1c-1.11 0-2.03-1.02-2.03-2.27s.9-2.27 2.03-2.27c1.14 0 2.05 1.03 2.03 2.27 0 1.25-.9 2.27-2.03 2.27Zm6.66 0c-1.11 0-2.02-1.02-2.02-2.27s.9-2.27 2.02-2.27c1.14 0 2.05 1.03 2.03 2.27 0 1.25-.89 2.27-2.03 2.27Z" />
            </svg>
          </span>
        </a>

        <Link
          href="/"
          className="text-xs text-white/45 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8A5FF]"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
