"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import BuyEbookButton from "./BuyEbookButton";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const NAV_LINKS = [
    { label: t("home"), href: "/", active: pathname === "/" },
    { label: t("features"), href: "#fonctionnalites", active: false },
    { label: t("support"), href: "/support", active: pathname === "/support" },
  ];

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 768px)");
    function onResize() {
      if (desktop.matches) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
      <header ref={headerRef} className="floating-nav" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
        <div className="hidden flex-col gap-3 px-4 py-3 md:flex sm:px-5 sm:py-4 md:flex-row md:items-center md:justify-between md:gap-0 md:px-8">
        <div className="flex items-center justify-between md:contents">
          <div className="flex h-7 w-7 items-center justify-center sm:h-8 sm:w-8">
            <Image
              src="/logo.png"
              alt="Signs"
              width={30}
              height={30}
              className="h-[26px] w-[26px] object-contain sm:h-[30px] sm:w-[30px]"
            />
          </div>

          <nav className="hidden items-center gap-9 text-[10px] uppercase tracking-[0.08em] text-white/55 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  link.active
                    ? "text-white"
                    : "transition hover:text-white"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-3 gap-2 md:flex md:w-auto md:items-center md:gap-3">
          <BuyEbookButton className="whitespace-nowrap rounded-full border border-white/40 px-2 py-2 text-center text-[9px] uppercase tracking-[0.06em] text-white/70 transition hover:border-white hover:text-white sm:px-4 sm:text-[11px] sm:tracking-[0.08em]">
            {t("downloadEbook")}
          </BuyEbookButton>
          <Link
            href="#commencer"
            className="whitespace-nowrap rounded-full border border-white/40 px-2 py-2 text-center text-[9px] uppercase tracking-[0.06em] text-white/70 transition hover:border-white hover:text-white sm:px-4 sm:text-[11px] sm:tracking-[0.08em]"
          >
            {t("downloadApp")}
          </Link>
          <LanguageSwitcher />
        </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2 md:hidden">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={30} height={30} />
            <span className="font-candal text-base tracking-wide text-white">SIGNS</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button ref={buttonRef} type="button" aria-label={open ? t("closeMenu") : t("openMenu")} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8A5FF]">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        <nav id="mobile-navigation" aria-label={t("mobileNavLabel")} hidden={!open} className="max-h-[calc(100dvh-110px)] overflow-y-auto border-t border-white/15 px-4 pb-4 pt-2 md:hidden" onClick={(event) => { if ((event.target as HTMLElement).closest("a, button")) setOpen(false); }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} aria-current={link.active ? "page" : undefined} className="flex min-h-11 items-center rounded-lg px-3 text-base text-white/85 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#B8A5FF]">
              {link.label}
            </Link>
          ))}
          <div className="mt-3 grid gap-2 border-t border-white/15 pt-4">
            <BuyEbookButton className="flex min-h-11 items-center justify-center rounded-full border border-white/40 px-4 py-3 text-center text-sm text-white/85 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8A5FF]">{t("downloadEbook")}</BuyEbookButton>
            <Link href="#commencer" className="flex min-h-11 items-center justify-center rounded-full border border-white/40 px-4 py-3 text-center text-sm text-white/85 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8A5FF]">{t("downloadApp")}</Link>
          </div>
        </nav>
      </header>
  );
}
