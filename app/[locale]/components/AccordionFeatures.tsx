"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function AccordionFeatures() {
  const t = useTranslations();
  const features = t.raw("Features") as { title: string; lead: string; body: string }[];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="features-accordion">
      {features.map((feature, index) => {
        const isOpen = index === openIndex;
        const number = String(index + 1).padStart(2, "0");

        return (
          <div key={feature.title} className="feature-row" data-open={isOpen}>
            <span aria-hidden="true" className="feature-number">{number}</span>
            <div className="feature-content">
              <button
                type="button"
                className="feature-trigger"
                aria-expanded={isOpen}
                aria-controls={`feature-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className="feature-title">{feature.title}</span>
                <span className="feature-toggle" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" strokeLinecap="round" />
                    {!isOpen && <path d="M12 5v14" strokeLinecap="round" />}
                  </svg>
                </span>
              </button>
              <div id={`feature-panel-${index}`} className="feature-panel" aria-hidden={!isOpen}>
                <div className="feature-panel-inner">
                  <p><strong>{feature.lead}</strong> {feature.body}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
