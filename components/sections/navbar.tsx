import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/sections/user-button";
import { Sparkle } from "@/components/illustrations/doodles";

const navLinks = [
  { href: "#xususiyatlar", label: "Xususiyatlar" },
  { href: "#qanday-ishlaydi", label: "Qanday ishlaydi" },
  { href: "#misollar", label: "Misollar" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/5 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="MoodFood"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft transition-transform group-hover:rotate-6 group-hover:scale-105">
            <span aria-hidden="true" className="text-lg">🍲</span>
            <Sparkle className="absolute -right-1 -top-1 h-3 w-3 text-butter animate-wiggle" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight">
            Mood<span className="italic text-primary">Food</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="rounded-full px-5 hidden sm:inline-flex shadow-soft"
          >
            <Link href="#boshladik">
              Boshlash
              <span aria-hidden="true" className="ml-1.5">→</span>
            </Link>
          </Button>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
