const faqs = [
  {
    q: "How does MoodFood understand mood?",
    a: "MoodFood uses advanced language models to analyze the words you use and detect emotional cues, then maps them to meal characteristics that suit how you feel.",
  },
  {
    q: "Can I upload ingredients from my fridge?",
    a: "Yes. Take a photo of your fridge or pantry and our AI will identify available ingredients and suggest meals you can make right now.",
  },
  {
    q: "Can MoodFood generate custom recipes?",
    a: "Absolutely. Every recommendation comes with a step-by-step recipe tailored to your preferences, dietary needs, and ingredient availability.",
  },
  {
    q: "Do I need cooking experience?",
    a: "Not at all. MoodFood is built for everyone — from beginners to experienced cooks. Recipes include clear instructions and the cooking assistant can help in real time.",
  },
  {
    q: "Can I use MoodFood for different dietary preferences?",
    a: "Yes. You can specify dietary preferences and restrictions, and MoodFood will adapt every recommendation to fit your lifestyle.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
            Frequently asked{" "}
            <span className="font-display italic text-primary">questions</span>
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <h3 className="text-base md:text-lg font-semibold tracking-tight pr-4">
                  {faq.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform text-xl leading-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-foreground/65 leading-relaxed max-w-2xl">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
