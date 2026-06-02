import { Eyebrow } from "@/components/ui/eyebrow";
import { Sparkle } from "@/components/illustrations/doodles";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  bg: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Ishdan keyin charchab kelganimda \u201Cnima yeyman\u201D degan savol ham zerikarli edi. MoodFood menga mastava tavsiya qildi \u2014 haqiqatan ham ruhimni ko\u2018tardi.",
    name: "Dilshoda Karimova",
    role: "Dasturchi, Toshkent",
    initials: "DK",
    bg: "bg-peach/50",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="container max-w-4xl">
        <div className="mb-12">
          <Eyebrow className="mb-6">Birinchi taassurotlar</Eyebrow>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Kimdir sinab <span className="italic text-primary">ko'rdi</span>
          </h2>
        </div>

        {testimonials.map((t, idx) => (
          <figure key={idx} className="relative">
            <Sparkle className="absolute -top-4 -left-4 h-8 w-8 text-primary/40" />
            <Sparkle className="absolute -bottom-4 -right-4 h-6 w-6 text-primary/40 rotate-45" />

            <blockquote className="rounded-3xl border border-foreground/5 bg-card p-8 md:p-12 shadow-soft">
              <p className="font-serif text-2xl md:text-3xl leading-snug text-foreground/90 italic text-balance">
                &ldquo;{t.quote}&rdquo;
              </p>

              <figcaption className="mt-8 flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-full ${t.bg} flex items-center justify-center font-serif font-bold text-foreground/70`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-foreground/60">{t.role}</p>
                </div>
              </figcaption>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
