import { Sparkle } from "@/components/illustrations/doodles";
import { Eyebrow } from "@/components/ui/eyebrow";

const faqs = [
  {
    q: "MoodFood bepulmi?",
    a: "Ha. Asosiy funksiya doim bepul bo'lib qoladi. Kelajakda premium imkoniyatlar qo'shilishi mumkin.",
  },
  {
    q: "Qanday ishlaydi?",
    a: "Siz o'z kayfiyatingizni yozasiz, AI matnni tahlil qilib mos taomni tavsiya qiladi. 30 soniyada natija.",
  },
  {
    q: "Ma'lumotlarim saqlanadimi?",
    a: "Yo'q. Sizning matnlaringiz hech qayerda saqlanmaydi, faqat tahlil uchun ishlatiladi.",
  },
  {
    q: "Retsept ham chiqadimi?",
    a: "Ha, har bir tavsiya bilan taomning retsepti va foydali xususiyatlari ko'rsatiladi.",
  },
  {
    q: "Qaysi tillarda ishlaydi?",
    a: "O'zbek va ingliz tillarida. AI sizning tilingizga qarab javob beradi.",
  },
];

export function Faq() {
  return (
    <section className="py-14 md:py-20 border-t border-foreground/5">
      <div className="container max-w-3xl">
        <div className="mb-10">
          <Eyebrow className="mb-6">Savol-javob</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-balance">
            Qiziq <span className="italic text-primary">bo'ldimi</span>?
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-foreground/10 bg-card overflow-hidden shadow-soft hover:border-foreground/20 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 p-5 md:p-6 cursor-pointer list-none">
                <div className="flex items-center gap-3">
                  <Sparkle className="h-4 w-4 text-primary/60 transition-transform group-open:rotate-90" />
                  <h3 className="font-serif text-lg md:text-xl font-semibold">
                    {faq.q}
                  </h3>
                </div>
                <div aria-hidden="true" className="text-foreground/40 group-open:rotate-45 transition-transform text-2xl leading-none">
                  +
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-5 md:pb-6 pl-12 md:pl-[3.25rem] text-foreground/70 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
