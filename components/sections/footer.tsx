import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  product: [
    { href: "#xususiyatlar", label: "Features" },
    { href: "#qanday-ishlaydi", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
  ],
  company: [
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
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
            <p className="mt-3 text-sm text-foreground/65 leading-relaxed max-w-sm">
              AI-powered food assistant that recommends meals based on your
              mood, ingredients, and preferences.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href="#"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:text-foreground hover:border-foreground/30"
              >
                <Twitter aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:text-foreground hover:border-foreground/30"
              >
                <Instagram aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground/70 transition-colors hover:text-foreground hover:border-foreground/30"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/65 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/65 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-foreground/55">
            © {new Date().getFullYear()} MoodFood. All rights reserved.
          </p>
          <p className="text-xs text-foreground/45">
            Made with care for everyday cooking
          </p>
        </div>
      </div>
    </footer>
  );
}
