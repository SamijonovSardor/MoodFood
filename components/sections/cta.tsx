import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section id="boshladik" className="py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/80 px-6 py-16 md:px-16 md:py-24 text-center">
          {/* Decorative food elements */}
          <div
            aria-hidden="true"
            className="absolute -top-10 -left-10 text-6xl opacity-20 rotate-12 select-none"
          >
            🥗
          </div>
          <div
            aria-hidden="true"
            className="absolute top-10 -right-6 text-7xl opacity-20 -rotate-12 select-none"
          >
            🍝
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-8 left-1/4 text-6xl opacity-20 rotate-45 select-none"
          >
            🍵
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-10 text-7xl opacity-20 -rotate-12 select-none"
          >
            🍲
          </div>
          <div
            aria-hidden="true"
            className="absolute top-1/2 right-1/4 text-5xl opacity-15 rotate-12 select-none"
          >
            🧄
          </div>

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary-foreground tracking-tight text-balance">
              Ready to discover your next{" "}
              <span className="font-display italic">favorite meal?</span>
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/85 max-w-xl mx-auto text-pretty">
              Let AI help you find recipes tailored to your mood and
              ingredients.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="rounded-full bg-card text-foreground hover:bg-card/90"
              >
                <Link href="/app">
                  Get Started
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
