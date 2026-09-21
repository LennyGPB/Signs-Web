"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "next-intl";

export default function BuyEbookButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const locale = useLocale();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale }),
      });

      if (!response.ok) throw new Error("checkout_failed");

      const data = await response.json();
      if (!data.url) throw new Error("missing_checkout_url");

      window.location.href = data.url;
    } catch (error) {
      console.error("Unable to start checkout", error);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      className={`cursor-pointer ${className ?? ""}`}
      style={loading ? { opacity: 0.6, cursor: "wait" } : undefined}
    >
      {children}
    </button>
  );
}
