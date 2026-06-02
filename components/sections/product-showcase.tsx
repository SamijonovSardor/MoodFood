import { Bot, Camera, ChefHat, Heart, Sparkles } from "lucide-react";

const screens = [
  {
    icon: Heart,
    label: "Mood Selection",
    title: "Choose how you feel",
    body: "Happy, stressed, romantic, tired — pick your mood with a single tap.",
  },
  {
    icon: Bot,
    label: "AI Conversation",
    title: "Chat with your food assistant",
    body: "Get thoughtful, personalized meal recommendations powered by AI.",
  },
  {
    icon: Camera,
    label: "Ingredient Recognition",
    title: "Snap your fridge",
    body: "Take a photo and let AI identify ingredients available to you.",
  },
  {
    icon: Sparkles,
    label: "Personalized Recipes",
    title: "Get recipes tailored to you",
    body: "Unique step-by-step recipes based on your preferences and pantry.",
  },
  {
    icon: ChefHat,
    label: "Cooking Assistant",
    title: "Cook with confidence",
    body: "Real-time guidance, substitutions, and answers while you cook.",
  },
];

export function ProductShowcase() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            See MoodFood in{" "}
            <span className="font-display italic text-primary">action</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70 text-pretty">
            A complete product workflow — from mood to meal, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {screens.map((s, i) => {
            const isLarge = i === 0 || i === 2 || i === 4;
            return (
              <div
                key={s.label}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 transition-all hover:border-foreground/20 hover:shadow-soft ${
                  isLarge ? "md:col-span-4" : "md:col-span-2"
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  <s.icon className="h-3.5 w-3.5 text-primary" />
                  {s.label}
                </div>
                <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight text-balance">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed max-w-md">
                  {s.body}
                </p>

                {/* Mock UI preview area */}
                <div
                  aria-hidden="true"
                  className={`mt-6 rounded-xl border border-border bg-muted/30 ${
                    isLarge ? "h-44 md:h-56" : "h-32"
                  }`}
                >
                  <div className="h-full w-full p-3 flex flex-col gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-foreground/15" />
                      <div className="h-2 w-2 rounded-full bg-foreground/15" />
                      <div className="h-2 w-2 rounded-full bg-foreground/15" />
                    </div>
                    <div className="flex-1 rounded-md bg-card border border-border/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
