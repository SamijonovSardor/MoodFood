"use client";

import { useCounter } from "@/hooks/use-counter";
import { Eyebrow } from "@/components/ui/eyebrow";

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
  note: string;
  text: string;
  border: string;
};

function Stat({ value, suffix, label, note, text, border }: StatProps) {
  const { ref, value: current } = useCounter<HTMLDivElement>(value);

  return (
    <div className={`rounded-3xl bg-card p-8 md:p-10 border ${border} shadow-soft`}>
      <div ref={ref} className={`font-serif text-5xl md:text-7xl font-bold ${text} tabular-nums tracking-tight`}>
        {current.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-4 font-serif text-xl font-semibold">{label}</p>
      <p className="mt-1 text-sm text-foreground/55">{note}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30 border-y border-foreground/5">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <Eyebrow className="mb-6">Kichik e'tibor</Eyebrow>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Raqamlar ortidagi <span className="italic text-primary">e'tibor</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
          <Stat
            value={47}
            suffix="+"
            label="Turli holat"
            note="E'tibor bilan o'rganilgan"
            text="text-primary"
            border="border-primary/15"
          />
          <Stat
            value={120}
            suffix="+"
            label="Taom tanlovi"
            note="Sinchiklab saralangan"
            text="text-sage"
            border="border-sage/20"
          />
          <Stat
            value={30}
            suffix="s"
            label="O'rtacha javob"
            note="Tez, lekin o'ylab"
            text="text-amber-700"
            border="border-amber-700/15"
          />
        </div>
      </div>
    </section>
  );
}
