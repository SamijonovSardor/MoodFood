"use client";

import { Leaf, Sparkles, Clock, User, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const benefits = [
  {
    icon: Leaf,
    title: "Reduce food waste",
    desc: "Use what you have. MoodFood builds meals around your real ingredients.",
  },
  {
    icon: Sparkles,
    title: "Discover new meals",
    desc: "Break out of your rotation with personalized recommendations you'll love.",
  },
  {
    icon: Clock,
    title: "Save time deciding",
    desc: "No more staring at the fridge. Get a clear answer in seconds.",
  },
  {
    icon: User,
    title: "Truly personalized",
    desc: "Your mood, your diet, your preferences — every meal respects them all.",
  },
  {
    icon: Smile,
    title: "Enjoy cooking again",
    desc: "Calm guidance, smart tips, and zero overwhelm. Just good food.",
  },
];

const stats = [
  { label: "Less food waste", value: 87, suffix: "%" },
  { label: "Faster decisions", value: 4, suffix: "x" },
  { label: "Personalized", value: 96, suffix: "%" },
  { label: "Happy cooks", value: 12, suffix: "k+" },
];

export function WhyMoodFood() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <p className="reveal text-sm font-semibold uppercase tracking-wider text-primary">
              Why MoodFood
            </p>
            <h2 className="reveal mt-3 text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground text-balance">
              Cooking that actually{" "}
              <em className="italic text-primary">understands</em> you
            </h2>
            <p className="reveal mt-4 text-foreground/70 text-lg text-pretty">
              MoodFood blends emotional intelligence with practical kitchen
              know-how — so every meal feels right, not random.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.title}
                    className="reveal flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-card transition-all"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="h-11 w-11 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {b.title}
                      </h3>
                      <p className="text-sm text-foreground/65 leading-relaxed mt-0.5">
                        {b.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div ref={ref} className="lg:sticky lg:top-24">
            <div className="rounded-2xl bg-card border border-border p-8 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    MoodFood Impact
                  </p>
                  <p className="text-3xl font-display font-bold text-foreground mt-1">
                    Real results
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Live
                </span>
              </div>

              <ul className="space-y-5">
                {stats.map((s) => (
                  <li key={s.label}>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm font-medium text-foreground/80">
                        {s.label}
                      </span>
                      <span className="font-display text-xl font-bold text-primary">
                        {visible ? s.value : 0}
                        {s.suffix}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-orange-500 transition-[width] duration-1000 ease-out"
                        style={{
                          width: visible ? `${Math.min(100, s.value)}%` : "0%",
                          transitionDelay: "0.2s",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 pt-6 border-t border-border flex items-center gap-3 text-sm">
                <span className="text-2xl" aria-hidden="true">
                  ⭐
                </span>
                <p className="text-foreground/70">
                  <strong className="font-semibold text-foreground">
                    94% user satisfaction
                  </strong>{" "}
                  based on 8,200+ ratings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
