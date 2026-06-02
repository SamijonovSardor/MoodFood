import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatPreview } from "@/components/sections/chat-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-20 md:pb-32">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-dot-grid opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            AI-powered food assistant
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance leading-[1.05]">
            Discover the perfect{" "}
            <span className="font-display italic text-primary">meal</span> for
            your mood
          </h1>

          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto text-pretty leading-relaxed">
            MoodFood uses AI to understand how you&apos;re feeling, analyze
            ingredients you already have, and recommend personalized meals and
            recipes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full w-full sm:w-auto">
              <Link href="#boshladik">
                Try MoodFood
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full w-full sm:w-auto"
            >
              <Link href="#qanday-ishlaydi">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
