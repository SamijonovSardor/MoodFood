import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/sections/user-button";

const navLinks = [
  { href: "#xususiyatlar", label: "Features" },
  { href: "#qanday-ishlaydi", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
          aria-label="MoodFood"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-base">
            <span aria-hidden="true">🍲</span>
          </span>
          <span>MoodFood</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <UserButton />
          </div>
          <Button asChild size="default" className="rounded-full">
            <Link href="#boshladik">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
