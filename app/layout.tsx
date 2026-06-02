import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

import { auth } from "@/lib/auth";
import { AuthProvider } from "@/components/providers/auth-provider";
import { RevealProvider } from "@/components/providers/reveal-provider";
import { OnboardingModal } from "@/components/sections/onboarding-modal";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MoodFood — Discover the Perfect Meal for Your Mood",
  description:
    "MoodFood uses AI to understand how you're feeling and recommend personalized meals and recipes. Discover meals based on mood, ingredients, and preferences.",
  keywords: ["mood food", "AI", "recipe", "meal recommendations", "food assistant"],
  openGraph: {
    title: "MoodFood — Discover the Perfect Meal for Your Mood",
    description:
      "AI-powered food assistant that recommends meals based on your mood, ingredients, and preferences.",
    type: "website",
    locale: "uz_UZ",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="uz"
      className={`${outfit.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-soft-lg"
        >
          Skip to main content
        </a>
        <AuthProvider session={session}>
          <RevealProvider>
            {children}
            <OnboardingModal />
          </RevealProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
