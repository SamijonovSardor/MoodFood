import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section id="boshladik" className="py-20 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-cta-gradient text-white px-6 py-16 md:px-12 md:py-20 text-center shadow-soft-xl">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cta-grid opacity-30 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-orange-500/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-primary/40 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute top-8 left-12 text-3xl animate-float1 hidden md:block"
          >
            🥗
          </div>
          <div
            aria-hidden="true"
            className="absolute top-16 right-16 text-3xl animate-float2 hidden md:block"
          >
            🍵
          </div>
          <div
            aria-hidden="true"
            className="absolute bottom-12 left-20 text-3xl animate-float3 hidden md:block"
          >
            🍝
          </div>
          <div
            aria-hidden="true"
            className="absolute bottom-20 right-24 text-3xl animate-float1 hidden md:block"
          >
            🥑
          </div>

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-balance">
              Ready to cook with{" "}
              <em className="italic text-orange-300">intention</em>?
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto text-pretty">
              Join 12,000+ home cooks who let MoodFood turn every mood into the
              perfect meal.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="xl" variant="white">
                <Link href="/sign-up">
                  <span aria-hidden="true">🍴</span>
                  Get Started Free
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <Link href="#how">See how it works</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
