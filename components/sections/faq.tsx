"use client";

import { useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "How does MoodFood understand my mood?",
    a: "MoodFood uses a combination of natural language understanding and emoji-based mood presets. You can tap how you feel, type it out, or even send a quick voice note. The AI interprets your emotional state and matches it with ingredients and dishes that align with it — warm and cozy for stress, light and fresh for energy, and so on.",
  },
  {
    q: "Can MoodFood use ingredients I already have?",
    a: "Yes — that's one of its best features. Snap a photo of your fridge or pantry, and MoodFood's image recognition will detect ingredients, then suggest meals you can make right now using exactly what you have. It's also a great way to reduce food waste.",
  },
  {
    q: "Does it support dietary restrictions?",
    a: "Absolutely. You can set dietary preferences like vegetarian, vegan, gluten-free, dairy-free, keto, halal, kosher, and more. MoodFood respects these filters for every recommendation and lets you exclude specific ingredients you don't like or are allergic to.",
  },
  {
    q: "Is MoodFood free to use?",
    a: "MoodFood offers a generous free tier with unlimited mood-based recommendations and basic recipes. Premium unlocks advanced features like the AI fridge scanner, voice cooking coach, weekly meal plans, and detailed nutrition tracking.",
  },
  {
    q: "Do I need cooking experience?",
    a: "Not at all. MoodFood adapts to your skill level. Beginners get clear step-by-step guidance with timers and gentle tips. Experienced cooks get concise instructions with room to improvise and substitute. You can change your level anytime.",
  },
];

function PlusIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: `rotate(${open ? 45 : 0}deg)`,
        transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-20 md:py-24 overflow-hidden bg-faq-gradient"
    >
      <div className="container max-w-3xl">
        <div className="text-center">
          <p className={`reveal ${revealed ? "visible" : ""} text-sm font-semibold uppercase tracking-wider text-primary`}>
            FAQ
          </p>
          <h2 className={`reveal ${revealed ? "visible" : ""} mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground text-balance`}>
            Questions,{" "}
            <em className="italic text-primary">answered</em>
          </h2>
          <p className={`reveal ${revealed ? "visible" : ""} mt-4 text-foreground/70 text-lg text-pretty`}>
            Everything you need to know before you start cooking with MoodFood.
          </p>
        </div>

        <ul className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            const panelId = `faq-panel-${i}`;
            return (
              <li
                key={f.q}
                className={`reveal ${revealed ? "visible" : ""} rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-primary bg-card shadow-soft"
                    : "border-border bg-card/60"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 group"
                  >
                    <span className="text-base font-semibold text-foreground">
                      {f.q}
                    </span>
                    <span
                      className={`h-9 w-9 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                        isOpen
                          ? "bg-primary text-primary-foreground"
                          : "bg-foreground/5 text-foreground/70 group-hover:bg-foreground/10"
                      }`}
                    >
                      <PlusIcon open={isOpen} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  hidden={!isOpen}
                  className="px-6 pb-5 text-sm text-foreground/70 leading-relaxed text-pretty"
                >
                  {f.a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

