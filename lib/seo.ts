import type { Metadata } from "next";
import { SITE_URL } from "./constants";

type BuildMetadataArgs = {
  locale: string;
  /** Path in its default-locale (unprefixed) form, e.g. "/", "/success", "/terms". */
  path: string;
  title: string;
  description: string;
};

/**
 * Builds a full per-page Metadata object (title, description, canonical, hreflang,
 * Open Graph, Twitter) matching the routing rules in i18n/routing.ts
 * (localePrefix: "as-needed" — English unprefixed, French under /fr).
 */
export function buildMetadata({ locale, path, title, description }: BuildMetadataArgs): Metadata {
  const enUrl = `${SITE_URL}${path}`;
  const frUrl = `${SITE_URL}/fr${path === "/" ? "" : path}`;
  const canonical = locale === "fr" ? frUrl : enUrl;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        fr: frUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Signs",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
