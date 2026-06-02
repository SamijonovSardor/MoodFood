import Link from "next/link";
import { Github, Instagram, Send } from "lucide-react";

import { NewsletterForm } from "@/components/sections/newsletter-form";

const footerLinks = {
  mahsulot: [
    { href: "#xususiyatlar", label: "Xususiyatlar" },
    { href: "#qanday-ishlaydi", label: "Qanday ishlaydi" },
    { href: "#misollar", label: "Misollar" },
  ],
  yordam: [
    { href: "#faq", label: "FAQ" },
    { href: "#", label: "Maxfiylik" },
    { href: "#", label: "Foydalanish shartlari" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-secondary/20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <span aria-hidden="true" className="text-lg">🍲</span>
              </div>
              <span className="text-xl font-serif font-bold">
                Mood<span className="italic text-primary">Food</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-foreground/60 leading-relaxed max-w-xs">
              Kayfiyatingizga mos taomni bir necha soniyada toping. O'zbekistonda yasalgan.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Link
                href="#"
                className="rounded-full p-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full p-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="rounded-full p-2.5 bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Telegram"
              >
                <Send aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Mahsulot</h4>
            <ul className="space-y-3">
              {footerLinks.mahsulot.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Yordam</h4>
            <ul className="space-y-3">
              {footerLinks.yordam.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold mb-4 text-sm">Yangiliklar</h4>
            <p className="text-sm text-foreground/60 mb-3">
              Yangi xususiyatlar haqida birinchi bo'lib bilib oling.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} MoodFood
          </p>
          <p className="text-sm text-foreground/50 font-handwritten text-lg">
            Toshkentda <span aria-hidden="true">❤️</span> bilan yasalgan
          </p>
        </div>
      </div>
    </footer>
  );
}
