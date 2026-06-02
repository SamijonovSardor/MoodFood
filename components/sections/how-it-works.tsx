const steps = [
  {
    num: "01",
    title: "Share your mood",
    desc: "Tap the emoji that matches how you feel right now, or simply type what you're experiencing.",
    icon: "💭",
  },
  {
    num: "02",
    title: "Add what you have",
    desc: "Snap your fridge or type a few ingredients. MoodFood works with what you've got.",
    icon: "📸",
  },
  {
    num: "03",
    title: "Get the perfect meal",
    desc: "Receive a personalized recipe that matches your mood, ingredients, and dietary needs.",
    icon: "✨",
  },
  {
    num: "04",
    title: "Cook with confidence",
    desc: "Follow clear steps, swap ingredients, and ask questions while you cook.",
    icon: "👩‍🍳",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      className="relative py-20 md:py-28 overflow-hidden bg-how-gradient"
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <p className="reveal text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </p>
          <h2 className="reveal mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground text-balance">
            From mood to{" "}
            <em className="italic text-primary">meal</em> in seconds
          </h2>
          <p className="reveal mt-4 text-foreground/70 text-lg text-pretty">
            Four simple steps. No complicated setup, no diet rules. Just honest
            recommendations.
          </p>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-primary/60 to-orange-500"
          />

          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
            {steps.map((s, i) => (
              <li
                key={s.num}
                className="reveal flex flex-col items-center text-center"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                  <div className="relative">
                  <div className="h-[88px] w-[88px] rounded-full bg-gradient-to-br from-green-50 to-orange-50 border-2 border-primary/30 flex items-center justify-center text-3xl transition-all duration-300 hover:scale-110 hover:border-primary hover:shadow-soft-lg">
                    <span aria-hidden="true">{s.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[11px] font-bold shadow-soft">
                    {s.num}
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed max-w-[240px]">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
