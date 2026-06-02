import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyMoodFood } from "@/components/sections/why-moodfood";
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
        <ProductShowcase />
        <HowItWorks />
        <WhyMoodFood />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
