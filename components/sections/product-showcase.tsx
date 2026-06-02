const cards = [
  {
    title: "Mood Selection",
    desc: "Tap how you feel. MoodFood turns emotions into meal ideas.",
    badge: "01",
    points: ["8 mood presets", "Custom feelings", "Time-of-day aware"],
    visual: (
      <div className="flex flex-col gap-2.5 px-5 py-6 bg-card">
        {[
          { emoji: "😊", label: "Happy" },
          { emoji: "😴", label: "Tired" },
          { emoji: "🤩", label: "Excited" },
          { emoji: "😌", label: "Calm" },
        ].map((m, i) => (
          <div
            key={m.label}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border bg-background"
          >
            <span aria-hidden="true" className="text-xl">
              {m.emoji}
            </span>
            <span className="text-sm font-medium text-foreground">
              {m.label}
            </span>
            {i === 0 && (
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="h-1 w-1 rounded-full bg-green-500" />
                Selected
              </span>
            )}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Recipe Discovery",
    desc: "Get a tailored recipe with ingredients you have on hand.",
    badge: "02",
    points: ["Custom portions", "Substitutions", "Nutritional info"],
    visual: (
      <div className="flex flex-col gap-2.5 px-5 py-6 bg-card">
        <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-border bg-background">
          <span aria-hidden="true" className="text-2xl">
            🍝
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground leading-tight truncate">
              Creamy Mushroom Pasta
            </p>
            <p className="text-[11px] text-muted-foreground">
              25 min · 4 ingredients
            </p>
          </div>
          <span className="text-base">♡</span>
        </div>
        {[
          { qty: "200g", name: "Pasta" },
          { qty: "150g", name: "Mushrooms" },
          { qty: "1 cup", name: "Cream" },
          { qty: "2 cloves", name: "Garlic" },
        ].map((ing) => (
          <div
            key={ing.name}
            className="flex items-center justify-between px-3.5 py-2 text-[13px]"
          >
            <span className="text-foreground/80">{ing.name}</span>
            <span className="font-mono text-muted-foreground text-[12px]">
              {ing.qty}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Cooking Assistant",
    desc: "Step-by-step guidance with voice, timers, and smart tips.",
    badge: "03",
    points: ["Voice guided", "Built-in timers", "Technique tips"],
    visual: (
      <div className="flex flex-col gap-2.5 px-5 py-6 bg-card">
        {[
          { step: 1, text: "Boil water with salt" },
          { step: 2, text: "Sauté garlic & mushrooms" },
          { step: 3, text: "Add cream and pasta" },
          { step: 4, text: "Garnish and serve" },
        ].map((s) => (
          <div
            key={s.step}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-border bg-background"
          >
            <span className="h-6 w-6 rounded-full bg-green-50 text-green-700 flex items-center justify-center text-[11px] font-bold shrink-0">
              {s.step}
            </span>
            <span className="text-sm text-foreground">{s.text}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function ProductShowcase() {
  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="reveal text-sm font-semibold uppercase tracking-wider text-primary">
            Product
          </p>
          <h2 className="reveal mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground text-balance">
            Three tools, one{" "}
            <em className="italic text-primary">delicious</em> experience
          </h2>
          <p className="reveal mt-4 text-foreground/70 text-lg text-pretty">
            From picking your mood to plating the final dish — MoodFood
            walks you through it all.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:[grid-template-columns:1fr_1.25fr_1fr]">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`reveal group rounded-2xl bg-card border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg ${
                i === 1 ? "md:scale-[1.04] md:z-[1] md:shadow-soft bg-gradient-to-b from-green-50/40 to-card" : ""
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-3xl italic text-primary/40 font-bold">
                  {c.badge}
                </span>
                {i === 1 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
                    <span className="h-1 w-1 rounded-full bg-white" />
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-xl font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed">
                {c.desc}
              </p>

              <div className="mt-5 mb-5 rounded-xl border border-border bg-background overflow-hidden">
                {c.visual}
              </div>

              <ul className="space-y-2 text-sm text-foreground/70">
                {c.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 rounded-full bg-green-50 text-primary flex items-center justify-center text-[10px] font-bold"
                    >
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
