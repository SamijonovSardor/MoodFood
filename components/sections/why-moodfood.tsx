import { Clock, Heart, Leaf, Sparkles, Utensils } from "lucide-react";

const benefits = [
  {
    icon: Leaf,
    title: "Reduce food waste",
    description: "Use what you already have at home with smart fridge scanning.",
  },
  {
    icon: Sparkles,
    title: "Discover new meal ideas",
    description: "Explore cuisines and dishes you wouldn't have thought of.",
  },
  {
    icon: Clock,
    title: "Save time deciding",
    description: "Skip the \"what should I cook?\" loop — get an answer in seconds.",
  },
  {
    icon: Heart,
    title: "Personalized for you",
    description: "Recommendations adapt to your preferences, diet, and mood.",
  },
  {
    icon: Utensils,
    title: "Enjoy cooking",
    description: "A delightful cooking experience with real-time guidance.",
  },
];

export function WhyMoodFood() {
  return (
    <section className="py-20 md:py-28 border-y border-border/60">
      <div className="container">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              Why{" "}
              <span className="font-display italic text-primary">MoodFood</span>
            </h2>
            <p className="mt-4 text-lg text-foreground/70 text-pretty">
              Built for everyday cooks who want less friction and more
              inspiration at mealtime.
            </p>
          </div>

          <ul className="space-y-6">
            {benefits.map((b) => (
              <li
                key={b.title}
                className="flex gap-4 items-start"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <b.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground/65 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
