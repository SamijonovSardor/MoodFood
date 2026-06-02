import { auth } from "@/lib/auth";
import { Dashboard } from "@/components/sections/dashboard";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Marquee } from "@/components/sections/marquee";
import { Navbar } from "@/components/sections/navbar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { WhyMoodFood } from "@/components/sections/why-moodfood";

export default async function HomePage() {
  const session = await auth();

  if (session?.user?.isOnboarded) {
    return <Dashboard />;
  }

  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <WhyMoodFood />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
