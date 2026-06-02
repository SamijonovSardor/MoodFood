import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Squiggle } from "@/components/illustrations/doodles";

export function Cta() {
  return (
    <section id="boshladik" className="py-14 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-primary px-6 py-12 md:px-14 md:py-16 shadow-soft-lg">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-butter/30 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cream/30 blur-3xl" />

          <div className="relative max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary-foreground/70 font-medium mb-8">
              Hozir sinab ko'ring
            </p>

            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary-foreground text-balance leading-[1.05]">
              Kichik bir qadam.
              <br />
              <span className="italic">Katta bir farq.</span>
            </h2>

            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-xl mx-auto text-pretty">
              Ro'yxatdan o'tish shart emas. Bir necha so'z — va mos taom qo'lda.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="xl"
                variant="secondary"
                className="shadow-soft-lg group"
              >
                <Link href="/app">
                  Boshlaymiz
                  <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-sm text-primary-foreground/70">
              Bepul · Ro'yxatsiz · 30 soniyada
            </p>
          </div>

          <Squiggle className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-6 text-butter/50" />
        </div>
      </div>
    </section>
  );
}
