import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Chemins dans leur forme non préfixée (= URL anglaise, locale par défaut).
// Doit rester cohérent avec i18n/routing.ts (localePrefix: "as-needed").
const PATHS: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/support", priority: 0.5 },
  { path: "/terms", priority: 0.3 },
  { path: "/privacy", priority: 0.3 },
  { path: "/legal", priority: 0.3 },
  { path: "/delete-account", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map(({ path, priority }) => {
    const enUrl = `${SITE_URL}${path}`;
    const frUrl = `${SITE_URL}/fr${path === "/" ? "" : path}`;

    return {
      url: enUrl,
      lastModified: new Date(),
      priority,
      alternates: {
        languages: {
          en: enUrl,
          fr: frUrl,
        },
      },
    };
  });
}
