"use client";

import { useEffect, useState } from "react";

import { useInView } from "./use-in-view";

/**
 * Ko'rinishga kirganda 0 → target gacha animatsiya qiladi.
 */
export function useCounter<T extends HTMLElement = HTMLDivElement>(
  target: number,
  duration = 1500,
) {
  const { ref, inView } = useInView<T>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let frame = 0;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return { ref, value };
}
