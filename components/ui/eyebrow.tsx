import { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Editorial-style section eyebrow (kicker).
 * Kichik, kerning keng, uppercase, italic emas —
 * jurnallardagi sahifa sarlavhasi ustidagi teg.
 */
export function Eyebrow({
  children,
  className,
  withLine = true,
}: {
  children: ReactNode;
  className?: string;
  withLine?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/55 font-medium",
        className,
      )}
    >
      {withLine && <span className="h-px w-8 bg-foreground/25" />}
      <span>{children}</span>
    </div>
  );
}
