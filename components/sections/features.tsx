import { Camera, ChefHat, Heart, Sparkles } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Mood-Based Recommendations",
    description:
      "MoodFood understands your emotions and recommends meals that fit your current mood.",
  },
  {
    icon: Camera,
    title: "Fridge Scanner",
    description:
      "Upload a photo of your fridge and instantly discover meal ideas using available ingredients.",
  },
  {
    icon: Sparkles,
    title: "AI Recipe Generator",
    description:
      "Generate unique and personalized recipes based on ingredients and preferences.",
  },
  {
    icon: ChefHat,
    title: "Cooking Assistant",
    description:
      "Get real-time cooking guidance and answers while preparing meals.",
  },
];

export function Features() {
  return (
    <section id="xususiyatlar" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Everything you need to{" "}
            <span className="font-display italic text-primary">cook better</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70 text-pretty">
            Four powerful features designed to make mealtime effortless and
            enjoyable.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-foreground/20 hover:shadow-soft"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
