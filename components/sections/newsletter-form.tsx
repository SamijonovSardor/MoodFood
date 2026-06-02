"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => e.preventDefault()}
      aria-label="Yangiliklarga obuna bo'lish"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email manzil
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="email@misol.com"
        className="flex-1 rounded-full bg-card border border-foreground/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        aria-label="Obuna bo'lish"
        className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
