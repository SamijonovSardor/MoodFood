import { Sparkle } from "@/components/illustrations/doodles";

const moods = [
  "Xafa",
  "Charchagan",
  "Energiyali",
  "Romantik",
  "Stress",
  "Tinch",
  "Yaratuvchan",
  "Issiq",
  "Sovuq",
  "Baxtli",
];

const foods = [
  "Mastava",
  "Palov",
  "Lag'mon",
  "Somsa",
  "Manti",
  "Shashlik",
  "Norin",
  "Chuchvara",
  "Qaymoqli sho'rva",
  "Mevalar",
];

function MarqueeRow({
  items,
  direction = "left",
  duration = "50s",
}: {
  items: string[];
  direction?: "left" | "right";
  duration?: string;
}) {
  const animation =
    direction === "left" ? "animate-marquee-slow" : "animate-marquee-reverse";

  const sequence = [...items, ...items];

  return (
    <div className="mask-fade overflow-hidden">
      <div
        className={`flex w-max gap-12 ${animation}`}
        style={{ animationDuration: duration }}
        aria-hidden={sequence.length > items.length ? "true" : undefined}
      >
        {sequence.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            <span className="font-serif text-2xl md:text-3xl font-light text-foreground/75 hover:text-foreground transition-colors italic">
              {item}
            </span>
            <Sparkle className="h-3 w-3 text-primary/40 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section className="py-10 md:py-14 bg-secondary/30 border-y border-foreground/5">
      <div className="space-y-3">
        <MarqueeRow items={moods} direction="left" duration="55s" />
        <MarqueeRow items={foods} direction="right" duration="65s" />
      </div>
    </section>
  );
}
