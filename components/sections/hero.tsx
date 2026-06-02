import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChatPreview } from "@/components/sections/chat-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32 pb-20 md:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 10% 65%, hsl(142 76% 36% / 0.09) 0%, transparent 70%), radial-gradient(ellipse 500px 600px at 92% 20%, hsl(20 90% 53% / 0.07) 0%, transparent 70%), radial-gradient(ellipse 400px 400px at 55% 85%, hsl(142 76% 36% / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-8 pb-12">
          <div className="max-w-xl">
            <div
              className="reveal inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-3.5 py-1.5 text-[12.5px] font-semibold text-green-700 tracking-wide mb-6"
              style={{ letterSpacing: "0.02em" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse-green shrink-0" />
              AI-Powered Food Discovery
            </div>

            <h1 className="reveal font-display text-[40px] sm:text-5xl md:text-[56px] lg:text-[64px] font-bold leading-[1.07] tracking-[-0.025em] text-foreground text-balance">
              Discover the{" "}
              <em className="italic text-primary font-bold">Perfect Meal</em>{" "}
              for Your Mood
            </h1>

            <p
              className="reveal mt-5 text-[18px] text-muted-foreground leading-[1.65] max-w-lg text-pretty"
              style={{ transitionDelay: "0.2s" }}
            >
              MoodFood uses AI to understand how you&apos;re feeling, analyze
              ingredients you already have, and recommend personalized meals
              and recipes.
            </p>

            <div
              className="reveal mt-9 flex flex-wrap items-center gap-3"
              style={{ transitionDelay: "0.3s" }}
            >
              <Button asChild size="lg">
                <Link href="#boshladik">
                  <span aria-hidden="true">🍽️</span>
                  Try MoodFood
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#how">Learn More</Link>
              </Button>
            </div>

            <div
              className="reveal mt-9 flex items-center gap-3.5"
              style={{ transitionDelay: "0.4s" }}
            >
              <div className="flex">
                {["😊", "🧑", "👩", "👨"].map((emoji, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-green-100 border-2 border-background flex items-center justify-center text-sm"
                    style={{ marginLeft: i === 0 ? "0" : "-8px" }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-muted-foreground">
                <strong className="font-semibold text-foreground">
                  12,000+ food lovers
                </strong>{" "}
                already discovering with MoodFood
              </p>
            </div>
          </div>

          <div
            className="reveal"
            style={{ transitionDelay: "0.35s" }}
          >
            <ChatPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
