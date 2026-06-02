"use client";

const items = [
  { label: "AI Recipes" },
  { label: "Mood Analysis" },
  { label: "Fridge Scanning" },
  { label: "Nutrition Tracking" },
  { label: "Smart Meal Plans" },
  { label: "Voice Cooking" },
  { label: "Diet Filters" },
  { label: "Calorie Insights" },
];

export function Marquee() {
  const list = [...items, ...items];
  return (
    <section
      aria-label="Features at a glance"
      className="relative py-8 overflow-hidden border-y border-border bg-foreground/[0.02]"
    >
      <div className="flex animate-marquee">
        {list.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-6 shrink-0 text-sm font-semibold text-foreground/70 uppercase tracking-wider"
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            <span
              aria-hidden="true"
              className="inline-flex h-2 w-2 rounded-full bg-primary"
            />
            {item.label}
          </div>
        ))}
      </div>
    </section>
  );
}
