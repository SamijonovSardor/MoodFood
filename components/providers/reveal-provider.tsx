"use client";

import { useEffect } from "react";

export function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
