"use client";

import { ReactNode } from "react";

import { ArrowCurl, Squiggle } from "@/components/illustrations/doodles";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type Step = {
  number: string;
  title: string;
  description: string;
  bg: string;
  visual: ReactNode;
  visualBg: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "His qiling",
    description:
      "Hozirgi holatingizni bir necha so'z bilan tasvirlab bering. Qancha samimiy — shuncha aniq.",
    bg: "bg-peach/40",
    visualBg: "bg-primary/20",
    visual: (
      <div className="space-y-2 p-4">
        <div className="flex gap-2 items-start">
          <div className="h-8 w-8 rounded-full bg-primary/30 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 bg-foreground/15 rounded-full w-3/4" />
            <div className="h-2 bg-foreground/15 rounded-full w-1/2" />
          </div>
        </div>
        <div className="flex gap-2 items-start justify-end">
          <div className="flex-1 space-y-1.5 max-w-[80%]">
            <div className="h-2 bg-primary/30 rounded-full w-full" />
            <div className="h-2 bg-primary/30 rounded-full w-2/3" />
            <div className="h-2 bg-primary/30 rounded-full w-4/5" />
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Tinglaymiz",
    description:
      "Yordamchimiz matnni tahlil qilib, holatingiz va ehtiyojlaringizga moslikni aniqlaydi.",
    bg: "bg-butter/40",
    visualBg: "bg-sage/20",
    visual: (
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-2 border-dashed border-sage animate-spin-slow" />
        </div>
        <div className="relative flex items-center gap-2">
          <span aria-hidden="true" className="text-2xl">🥺</span>
          <ArrowCurl className="w-12 h-8 text-sage" />
          <span aria-hidden="true" className="text-2xl">🍲</span>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Tanlang",
    description:
      "Bir nechta mos variantlardan yoqqaningizni tanlang. Retsept — ilovada.",
    bg: "bg-sage/30",
    visualBg: "bg-rose-100/40",
    visual: (
      <div className="grid grid-cols-3 gap-2 p-4">
        {["🍲", "🍜", "🥗"].map((emoji, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-card border-2 border-transparent flex items-center justify-center text-3xl hover:border-primary transition-colors"
          >
            <span aria-hidden="true">{emoji}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="qanday-ishlaydi"
      className="py-14 md:py-20 bg-secondary/30 border-y border-foreground/5"
    >
      <div className="container">
        <div className="max-w-2xl mb-10">
          <Eyebrow className="mb-6">Uch qadam</Eyebrow>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Bir daqiqada <span className="italic text-primary">tayyor</span>
          </h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-xl text-pretty">
            Murakkablik yo'q. Faqat sizning hislaringiz — va mos taom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={cn("rounded-3xl p-6 md:p-8 border border-foreground/5", step.bg)}>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-serif text-7xl md:text-8xl font-bold text-primary leading-none">
            {step.number}
          </span>
          <span className="font-serif text-base italic text-foreground/40">
            qadam
          </span>
        </div>

        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-balance">
          {step.title}
        </h3>
        <p className="text-foreground/70 leading-relaxed mb-6">
          {step.description}
        </p>

        <div className={cn("rounded-2xl h-44 overflow-hidden border border-foreground/5", step.visualBg)}>
          {step.visual}
        </div>
      </div>

      {index < steps.length - 1 && (
        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
          <Squiggle className="w-8 h-5 text-primary" />
        </div>
      )}
    </div>
  );
}
