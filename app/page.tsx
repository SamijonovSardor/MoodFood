import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { MoodExamples } from "@/components/sections/mood-examples";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <Features />
        <HowItWorks />
        <MoodExamples />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
