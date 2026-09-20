import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { stripe } from "@/lib/stripe";
import { Link } from "@/i18n/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const t = await getTranslations("Success");

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
          href={`/api/download?session_id=${encodeURIComponent(sessionId)}`}
          className="hero-ebook-cta w-full justify-center sm:w-auto"
        >
          <span className="text-white tracking-wider font-thin">{t("downloadCta")}</span>
          <span className="hero-ebook-cta-icon" aria-hidden="true">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 18v2h14v-2" strokeLinecap="round" strokeLinejoin="round" />
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
