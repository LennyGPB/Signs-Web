import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 24,
          padding: "80px 96px",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(184,165,255,0.35), rgba(10,10,10,0) 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 40,
            fontWeight: 700,
            color: "#B8A5FF",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Signs
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          {t("description")}
        </div>
      </div>
    ),
    { ...size }
  );
}
