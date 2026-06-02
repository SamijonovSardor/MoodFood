import Image from "next/image";

import { IMAGES, type MoodKey } from "@/lib/images";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

type Mood = {
  key: MoodKey;
  mood: string;
  emoji: string;
  food: string;
  reason: string;
};

const moods: Mood[] = [
  {
    key: "xafa",
    mood: "Xafa va charchagan",
    emoji: "😔",
    food: "Mastava",
    reason: "Issiq sho'rva ham jismoniy, ham ruhiy tetiklantiradi",
  },
  {
    key: "baxtli",
    mood: "Baxtli va energiyali",
    emoji: "😄",
    food: "Somsa va ko'k choy",
    reason: "Yengil, lekin tetiklantiruvchi — bayramona kayfiyat uchun",
  },
  {
    key: "stress",
    mood: "Stress va bezovta",
    emoji: "😰",
    food: "Lag'mon",
    reason: "Issiq, to'yimli ovqat stressni kamaytirishga yordam beradi",
  },
  {
    key: "romantik",
    mood: "Romantik kayfiyat",
    emoji: "😍",
    food: "Palov",
    reason: "Mazali va tantanali — maxsus onlar uchun",
  },
  {
    key: "sovuq",
    mood: "Sovuq va toliqqan",
    emoji: "🥶",
    food: "Norin",
    reason: "Yuqori kaloriyali issiq ovqat tez kuch beradi",
  },
  {
    key: "ilham",
    mood: "Yaratuvchan va ilhomli",
    emoji: "💡",
    food: "Mevalar va yong'oq",
    reason: "Vitamin va energiya — miya uchun eng yaxshi ozuqa",
  },
];

export function MoodExamples() {
  return (
    <section id="misollar" className="py-14 md:py-20">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <Eyebrow className="mb-6">Bugungi ta'm sinovi</Eyebrow>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Olti holat, <span className="italic text-primary">olti taom</span>
          </h2>
          <p className="mt-5 text-lg text-foreground/70 max-w-xl text-pretty">
            Har bir kayfiyat o'ziga mos taomni topadi. Quyida — bugungi
            tanlovimiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {moods.map((m, idx) => {
            const img = IMAGES.moods[m.key];
            const courseNumber = `0${idx + 1}`;
            const isFirst = idx === 0;

            return (
              <article
                key={m.key}
                className={cn(
                  "group rounded-3xl border border-foreground/5 bg-card overflow-hidden shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg",
                  isFirst && "sm:col-span-2 lg:col-span-2",
                )}
              >
                <div
                  className={cn(
                    "relative bg-secondary/30 overflow-hidden",
                    isFirst ? "aspect-[2/1]" : "aspect-square",
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes={isFirst ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                    className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-4 left-4 text-xs uppercase tracking-[0.2em] text-foreground/60 font-medium bg-card/80 backdrop-blur-sm px-2.5 py-1 rounded-full",
                    )}
                  >
                    {courseNumber} · kurs
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-4 right-4",
                      isFirst ? "text-3xl" : "text-2xl",
                    )}
                  >
                    {m.emoji}
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <h3
                    className={cn(
                      "font-serif font-bold mb-3",
                      isFirst ? "text-2xl md:text-3xl" : "text-xl",
                    )}
                  >
                    {m.mood}
                  </h3>

                  <p
                    className={cn(
                      "font-serif font-bold text-primary mb-1",
                      isFirst ? "text-lg" : "text-base",
                    )}
                  >
                    {m.food}
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {m.reason}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
