import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2 max-w-sm">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-0.5"
            >
              <span>
                Mood<em className="italic text-primary font-normal">Food</em>
              </span>
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-green"
              />
            </Link>
            <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
              AI-powered food assistant that recommends meals based on your
              mood, ingredients, and preferences. Cook with intention.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-foreground/80">
              Product
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/60">
              <li>
                <Link href="#xususiyatlar" className="hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-foreground/80">
              Company
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/60">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} MoodFood. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {[
              {
                label: "Twitter",
                path: "M22 5.92a8.49 8.49 0 0 1-2.36.65 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.6 1A4.1 4.1 0 0 0 11.85 9 11.65 11.65 0 0 1 3.4 4.79a4.1 4.1 0 0 0 1.27 5.47 4.07 4.07 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.09 4.09 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.41a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.68l-.01-.53A8.34 8.34 0 0 0 22 5.92z",
              },
              {
                label: "Instagram",
                path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.85-7.75a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z",
              },
              {
                label: "LinkedIn",
                path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
              },
            ].map((s) => (
              <Link
                key={s.label}
                href="#"
                aria-label={s.label}
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={s.path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
