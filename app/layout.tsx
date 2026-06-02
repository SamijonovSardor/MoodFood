import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

import { auth } from "@/lib/auth";
import { AuthProvider } from "@/components/providers/auth-provider";
import { GrainOverlay } from "@/components/sections/grain-overlay";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "MoodFood — Kayfiyatingizga mos taom",
  description:
    "Hozirgi holatingizni ayting — biz sizga eng mos taomni topamiz. MoodFood bilan har bir kayfiyat o'z taomini topadi.",
  keywords: [
    "mood food",
    "kayfiyat",
    "taom tavsiyasi",
    "AI",
    "sun'iy intellekt",
    "o'zbek",
  ],
  openGraph: {
    title: "MoodFood — Kayfiyatingizga mos taom",
    description:
      "Hozirgi holatingizni ayting — biz sizga eng mos taomni topamiz.",
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
      className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-soft-lg"
        >
          Asosiy kontentga o'tish
        </a>
        <GrainOverlay />
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
