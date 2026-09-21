"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-white/20 p-1 text-[9px] uppercase tracking-[0.06em] sm:text-[10px] ${className ?? ""}`}
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          aria-current={loc === locale ? "true" : undefined}
          className={
            loc === locale
              ? "rounded-full bg-white/15 px-2.5 py-1 text-white"
              : "rounded-full px-2.5 py-1 text-white/55 transition hover:text-white"
          }
        >
          {loc}
        </Link>
      ))}
    </div>
  );
}
