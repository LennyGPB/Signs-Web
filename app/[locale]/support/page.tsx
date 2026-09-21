import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import SupportForm from "../components/SupportForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Support" });
  return buildMetadata({
    locale,
    path: "/support",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function SupportPage() {
  return <SupportForm />;
}
