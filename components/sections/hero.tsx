import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/lib/images";
import { UnderlineMark } from "@/components/illustrations/doodles";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-peach/40 blur-3xl" />
      <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-butter/30 blur-3xl" />

      <div className="container relative pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold leading-[1.02] tracking-tight text-balance">
              Hissingizni{" "}
              <span className="relative inline-block italic font-light text-primary">
                ayting
                <UnderlineMark className="absolute -bottom-2 left-0 w-full h-3 text-butter" />
              </span>{" "}
              —<br className="hidden sm:block" />
              qolganini men hal qilaman.
            </h1>

            <div className="mt-10 flex items-center gap-6">
              <Button
                asChild
                size="xl"
                className="shadow-soft-lg group"
              >
                <Link href="#boshladik">
                  Boshlaymiz
                  <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>
              <Link
                href="#qanday-ishlaydi"
                className="text-sm font-medium text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors"
              >
                Avval qanday ishlaydi?
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative max-w-md mx-auto">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-card border border-foreground/5 shadow-soft-lg">
                <Image
                  src={IMAGES.hero.main}
                  alt="Issiq taom — MoodFood"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-card border border-foreground/5 px-4 py-2 shadow-soft">
                <span aria-hidden="true">🍲</span>
                <span className="font-handwritten text-base font-bold">
                  Bugun sizga — Mastava
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
