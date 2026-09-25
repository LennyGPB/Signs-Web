import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "./components/Navbar";
import BuyEbookButton from "./components/BuyEbookButton";
import AccordionFeatures from "./components/AccordionFeatures";
import DoodleEllipse from "./components/DoodleEllipse";
import JsonLd from "./components/JsonLd";
import { EBOOK_NAME, EBOOK_PRICE_EUR_CENTS, SITE_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return buildMetadata({
    locale,
    path: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#0A0A0A] text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: EBOOK_NAME,
          description: t("metaDescription"),
          image: `${SITE_URL}/logo-icon.png`,
          brand: {
            "@type": "Brand",
            name: "Signs",
          },
          offers: {
            "@type": "Offer",
            url: SITE_URL,
            priceCurrency: "EUR",
            price: (EBOOK_PRICE_EUR_CENTS / 100).toFixed(2),
            availability: "https://schema.org/InStock",
          },
        }}
      />

      {/* Header */}
      <Navbar />

      <section className="hero-editorial relative w-full pb-10 pt-36 md:pb-32 md:pt-44">
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <h1 className="hero-headline">
            <span className="block font-thin tracking-tight">{t("heroTitleLine1")}</span>
            <span className="block font-thin tracking-tight">
              {t("heroTitleLine2Prefix")}{" "}
              <span className="hero-circled-word font-candal italic">
                {t("heroTitleMethod")}
                <DoodleEllipse className="hero-ellipse" />
              </span>,
            </span>
            <span className="block font-thin tracking-tight">{t("heroTitleLine3")}</span>
          </h1>

          <p className="mt-8 max-w-xl text-xs leading-6 text-white/65 sm:text-base sm:leading-7">
            <strong className="font-semibold text-white">{t("heroDescriptionBold")}</strong>{" "}
            {t("heroDescriptionRest")}
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-start">
            <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-col">
              <BuyEbookButton className="hero-ebook-cta w-full sm:w-auto">
                <span className="text-white tracking-wider font-thin">{t("heroCta")}</span>
                <span className="hero-ebook-cta-icon" aria-hidden="true">
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 18v2h14v-2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </BuyEbookButton>

              <p className="flex items-center justify-center gap-2 text-xs text-white/45 sm:justify-start sm:pl-4">
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="5" y="11" width="14" height="9" rx="2.2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
                </svg>
                {t("heroReassurance")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="app-intro">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 pt-6 pb-8 text-center sm:py-16 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:gap-4">
            <Image src="/logo.png" alt="" width={72} height={72} className="hidden h-14 w-14 shrink-0 object-contain sm:h-[72px] sm:w-[72px] md:block" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.1em] text-white sm:text-[11px] md:whitespace-nowrap md:tracking-[0.18em] md:text-[#B8A5FF]">{t("appIntroBadge")}</p>
              <h2 className="mt-2 hidden font-candal text-lg leading-tight text-white sm:text-xl md:block md:whitespace-nowrap md:text-2xl">
                {t("appIntroHeading")}
              </h2>
            </div>
          </div>
          <div className="app-store-links grid w-full max-w-sm grid-cols-2 items-center gap-3 sm:flex sm:w-auto sm:max-w-none">
            <div className="hero-store-badge is-coming-soon" aria-disabled="true">
              <svg aria-hidden="true" width="30" height="34" viewBox="0 0 24 28" fill="white" className="shrink-0">
                <path d="M16.5 6.6c1-1.2 1.7-2.8 1.5-4.4-1.5.1-3.1 1-4.1 2.2-.9 1-1.6 2.6-1.4 4.1 1.7.1 3.1-.7 4-1.9ZM20.1 18.4c-.6 1.3-.9 1.9-1.7 3.1-1.1 1.7-2.7 3.8-4.6 3.8-1.7 0-2.1-1.1-4.2-1.1-2 0-2.5 1.1-4.2 1.2-1.9.1-3.4-1.9-4.6-3.6C-.4 16.2-1 10.6 1.7 7.7 3 6.2 4.8 5.4 6.8 5.4c1.8 0 3.5 1.2 4.6 1.2 1 0 3-1.5 5.1-1.3 1.7.1 3.3.9 4.4 2.2-3.8 2.1-3.2 7.4-.8 8.9Z" transform="translate(2 1) scale(.9)" />
              </svg>
              <span><small>{t("availableOn")}</small><strong>{t("appStore")}</strong></span>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.signs.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-store-badge"
            >
              <svg aria-hidden="true" width="31" height="33" viewBox="0 0 28 30" className="shrink-0">
                <path d="M2 2v26l14-13Z" fill="#57C6EA" />
                <path d="m2 2 17 10-3 3Z" fill="#77D48A" />
                <path d="m16 15 3-3 7 3-7 3Z" fill="#FFD36B" />
                <path d="m2 28 17-10-3-3Z" fill="#F27585" />
              </svg>
              <span><small>{t("availableOn")}</small><strong>{t("playStore")}</strong></span>
            </a>
          </div>
        </div>
      </section>

      {/* La Méthode — accordéon 01 à 08 */}
      <section id="fonctionnalites" className="relative mx-auto max-w-6xl px-6 pt-8 md:px-10 md:pt-0">
        <h2 className="pillars-title mb-8 flex flex-nowrap items-baseline gap-3 text-3xl text-white sm:text-4xl md:mb-12 md:text-5xl">
          <span className="shrink-0 font-thin tracking-tight">{t("pillarsTitlePrefix")}</span>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="pillars-repeat shrink-0 font-candal italic"
              style={{ opacity: Math.max(0.02, 1 - i * 0.4) }}
            >
              {t("pillarsTitleWord")}
            </span>
          ))}
        </h2>
        <AccordionFeatures />
      </section>

      {/* Communauté */}
      <section id="commencer" className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <h2 className="pillars-title mb-8 flex flex-nowrap items-baseline gap-3 text-3xl text-white sm:text-4xl md:mb-12 md:text-5xl">
          <span className="shrink-0 font-thin tracking-tight">{t("communityTitlePrefix")}</span>
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="pillars-repeat shrink-0 font-candal italic"
              style={{ opacity: Math.max(0.02, 1 - i * 0.4) }}
            >
              {t("communityTitleWord")}
            </span>
          ))}
        </h2>

        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            {t("communityDescription")}
          </p>

          <BuyEbookButton className="hero-discord-cta community-discord-cta w-full justify-center md:w-auto">
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="5" y="11" width="14" height="9" rx="2.2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" strokeLinecap="round" />
            </svg>
            <span>{t("communityCta")}</span>
          </BuyEbookButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14 md:px-10">
          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:justify-between lg:gap-12">
            <div className="max-w-xs lg:shrink-0">
              <p className="font-candal text-base">Signs</p>
              <p className="mt-2 text-xs leading-6 text-white/60">
                {t("footerTagline")}
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-6 text-xs sm:grid-cols-3 sm:gap-8 lg:gap-10">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/60 sm:mb-3">
                  {t("footerProduct")}
                </p>
                <ul className="text-white/70">
                  <li>
                    <Link href="#fonctionnalites" className="flex min-h-11 items-center rounded-sm py-2 leading-6 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8A5FF] motion-reduce:transition-none">
                      {t("footerFeatures")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/60 sm:mb-3">
                  {t("footerSupport")}
                </p>
                <ul className="text-white/70">
                  <li>
                    <Link href="/support" className="flex min-h-11 items-center rounded-sm py-2 leading-6 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8A5FF] motion-reduce:transition-none">
                      {t("footerHelp")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/delete-account" className="flex min-h-11 items-center rounded-sm py-2 leading-6 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8A5FF] motion-reduce:transition-none">
                      {t("footerDeleteAccount")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-white/60 sm:mb-3">
                  {t("footerLegal")}
                </p>
                <ul className="text-white/70">
                  <li>
                    <Link href="/privacy" className="flex min-h-11 items-center rounded-sm py-2 leading-6 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8A5FF] motion-reduce:transition-none">
                      {t("footerPrivacy")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="flex min-h-11 items-center rounded-sm py-2 leading-6 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8A5FF] motion-reduce:transition-none">
                      {t("footerTerms")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal" className="flex min-h-11 items-center rounded-sm py-2 leading-6 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8A5FF] motion-reduce:transition-none">
                      {t("footerLegalNotice")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-[11px] leading-5 text-white/60 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
            <p>{t("footerCopyright", { year: new Date().getFullYear() })}</p>
            <p>{t("footerMadeWith")}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
