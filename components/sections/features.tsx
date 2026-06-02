import Image from "next/image";
import { ReactNode } from "react";

import { IMAGES } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

type Feature = {
  title: string;
  description: string;
  bg: string;
  illustration: ReactNode;
  className?: string;
  image?: string;
  imageAlt?: string;
};

const BrainDoodle = (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true" focusable="false">
    <path
      d="M60 20 Q 40 20, 35 40 Q 20 45, 25 65 Q 15 80, 30 90 Q 35 105, 55 100 Q 65 110, 80 100 Q 100 105, 100 85 Q 110 70, 95 55 Q 105 40, 85 30 Q 75 15, 60 20 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.15"
    />
    <path
      d="M55 40 Q 50 50, 55 60 M 65 40 Q 70 50, 65 60 M 50 70 Q 60 75, 70 70"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="45" cy="50" r="2" fill="currentColor" />
    <circle cx="75" cy="50" r="2" fill="currentColor" />
  </svg>
);

const HeartDoodle = (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true" focusable="false">
    <path
      d="M60 95 C 30 75, 15 55, 20 35 C 25 20, 50 20, 60 35 C 70 20, 95 20, 100 35 C 105 55, 90 75, 60 95 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path
      d="M40 50 Q 60 35, 80 50"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const BoltDoodle = (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true" focusable="false">
    <path
      d="M65 10 L 30 60 L 55 60 L 45 110 L 90 50 L 60 50 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.25"
      strokeLinejoin="round"
    />
  </svg>
);

const GlobeDoodle = (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true" focusable="false">
    <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.1" />
    <ellipse cx="60" cy="60" rx="40" ry="15" stroke="currentColor" strokeWidth="2" fill="none" />
    <ellipse cx="60" cy="60" rx="15" ry="40" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="20" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="2" />
    <line x1="60" y1="20" x2="60" y2="100" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const LockDoodle = (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true" focusable="false">
    <rect x="30" y="55" width="60" height="50" rx="8" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.2" />
    <path d="M42 55 L 42 40 Q 42 20, 60 20 Q 78 20, 78 40 L 78 55" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <circle cx="60" cy="78" r="5" fill="currentColor" />
  </svg>
);

const BookDoodle = (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true" focusable="false">
    <path
      d="M 20 25 L 60 35 L 100 25 L 100 95 L 60 105 L 20 95 Z"
      stroke="currentColor"
      strokeWidth="2.5"
      fill="currentColor"
      fillOpacity="0.15"
      strokeLinejoin="round"
    />
    <line x1="60" y1="35" x2="60" y2="105" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const features: Feature[] = [
  {
    title: "Sizni tushunadi",
    description:
      "So'zlaringiz ortidagi hisni sezadi. Ochlik, kayfiyat, sog'lik — barchasini hisobga oladi.",
    bg: "bg-peach/50",
    illustration: <div className="text-primary">{BrainDoodle}</div>,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Sizga mos",
    description: "Didingiz va sog'ligingiz uchun shaxsiy tanlov.",
    bg: "bg-rose-100/60",
    illustration: <div className="text-rose-500">{HeartDoodle}</div>,
  },
  {
    title: "Bir zumda",
    description: "30 soniyada javob — kuting, demasdan.",
    bg: "bg-butter/50",
    illustration: <div className="text-amber-600">{BoltDoodle}</div>,
  },
  {
    title: "Keng tanlov",
    description:
      "Mastavadan pitssagacha — o'zbek va jahon oshxonasi, klassik va zamonaviy.",
    bg: "bg-sage/30",
    illustration: <div className="text-sage">{GlobeDoodle}</div>,
    className: "md:col-span-2",
    image: IMAGES.features.global,
    imageAlt: "Turli xil taomlar",
  },
  {
    title: "Yolg'iz sizniki",
    description: "Hech qayerda saqlanmaydi, hech kim ko'rmaydi.",
    bg: "bg-sky-100/50",
    illustration: <div className="text-sky-600">{LockDoodle}</div>,
  },
  {
    title: "Retsept bilan",
    description: "Taom bilan birga uning retsepti va foydasi.",
    bg: "bg-violet-100/50",
    illustration: <div className="text-violet-600">{BookDoodle}</div>,
  },
];

export function Features() {
  return (
    <section id="xususiyatlar" className="py-14 md:py-20">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <Eyebrow className="mb-6">Nega MoodFood</Eyebrow>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Nima uchun bizga <span className="italic text-primary">ishonish</span> mumkin?
          </h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-xl text-pretty">
            Sizning nafaqat oshtovoq, balki kayfiyatingiz uchun ham g'amxo'rlik
            qilamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(220px,auto)] gap-4 md:gap-5">
          {features.map((f, idx) => (
            <FeatureCard key={f.title} feature={f} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, idx }: { feature: Feature; idx: number }) {
  if (feature.image) {
    return (
      <div
        className={cn(
          "group rounded-3xl border border-foreground/5 bg-card overflow-hidden shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg",
          feature.className,
        )}
      >
        <div className="relative aspect-[16/9] bg-secondary/30 overflow-hidden">
          <Image
            src={feature.image}
            alt={feature.imageAlt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6 md:p-7">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
            {feature.title}
          </h3>
          <p className="text-foreground/70 max-w-md">{feature.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-foreground/5 p-6 md:p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg",
        feature.bg,
        feature.className,
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 opacity-50 transition-transform group-hover:rotate-12 group-hover:scale-110">
        {feature.illustration}
      </div>

      <div className="relative h-full flex flex-col">
        <span className="font-serif text-sm italic text-foreground/40 mb-auto tracking-wider">
          — 0{idx + 1}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-bold mt-12 mb-2">
          {feature.title}
        </h3>
        <p className="text-foreground/70 max-w-xs">{feature.description}</p>
      </div>
    </div>
  );
}
