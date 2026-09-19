"use client";

import { useEffect, useRef, useState } from "react";

export default function DoodleEllipse({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = true;
    const sync = () => setRunning(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <svg ref={ref} aria-hidden="true" viewBox="0 0 420 160" className={className} fill="none" data-running={running}>
      <ellipse
        className="hero-pencil-stroke"
        cx="210"
        cy="80"
        rx="200"
        ry="62"
        pathLength="1000"
        stroke="#B8A5FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        transform="rotate(-4 210 80)"
      />
    </svg>
  );
}
