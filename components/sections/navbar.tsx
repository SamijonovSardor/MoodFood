"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/sections/user-button";

const navLinks = [
  { href: "#xususiyatlar", label: "Features" },
  { href: "#how", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl backdrop-saturate-180 border-b border-border shadow-soft-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-[22px] font-bold tracking-tight text-foreground flex items-center gap-0.5 shrink-0"
          aria-label="MoodFood"
        >
          <span>
            Mood<em className="italic text-primary font-normal">Food</em>
          </span>
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse-green"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <UserButton />
          </div>
          <Button asChild>
            <Link href="#boshladik">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
