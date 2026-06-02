import { Heart, Refrigerator, BookOpen, ChefHat } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Mood-Aware",
    desc: "Tell MoodFood how you feel and get a meal that matches. Warm comfort food when you're down, light and fresh when you need energy.",
    tags: ["Mood AI", "Personalized"],
  },
  {
    icon: Refrigerator,
    title: "Fridge-Friendly",
    desc: "Snap a photo of what's in your fridge. MoodFood will suggest meals using the ingredients you already have at home.",
    tags: ["Image AI", "Zero Waste"],
  },
  {
    icon: BookOpen,
    title: "Smart Recipes",
    desc: "Get step-by-step recipes tailored to your skill level, dietary needs, and the time you have available today.",
    tags: ["Step-by-step", "Adaptive"],
  },
  {
    icon: ChefHat,
    title: "Cooking Coach",
    desc: "Hands-free voice guidance while you cook. Ask questions, get technique tips, and adjust portions on the fly.",
    tags: ["Voice AI", "Hands-free"],
  },
];

export function Features() {
  return (
    <section id="xususiyatlar" className="py-20 md:py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="reveal text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </p>
          <h2 className="reveal mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground text-balance">
            Everything you need to cook with{" "}
            <em className="italic text-primary">intention</em>
          </h2>
          <p className="reveal mt-4 text-foreground/70 text-lg text-pretty">
            A complete AI kitchen assistant designed around how you actually
            feel, cook, and eat.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="reveal group relative rounded-2xl bg-card border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-foreground/20"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 rounded-t-2xl"
                />

                <div className="h-12 w-12 rounded-xl bg-green-50 flex items-center justify-center text-primary">
                  <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-foreground/70 leading-relaxed text-pretty">
                  {f.desc}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {f.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-semibold text-foreground/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
