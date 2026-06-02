/**
 * "Muhr muharriri" — jurnallardagi "From the Editor" kabi.
 * Sahifaning ruhini, falsafasini 3-4 gapda tushuntiradi.
 */
export function Manifesto() {
  return (
    <section className="py-24 md:py-32 border-y border-foreground/5">
      <div className="container max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span aria-hidden="true" className="h-px w-12 bg-foreground/20" />
          <span className="text-xs uppercase tracking-[0.25em] text-foreground/50 font-medium">
            Muqovadan
          </span>
          <span aria-hidden="true" className="h-px w-12 bg-foreground/20" />
        </div>

        <p className="font-serif text-2xl md:text-4xl leading-[1.3] text-foreground/90 italic text-balance">
          Har kuni biz bir necha marta o'zimizga bitta savolni beramiz —
          <span className="text-primary"> nima yeyman?</span>
        </p>

        <p className="mt-8 text-lg md:text-xl leading-relaxed text-foreground/70 text-pretty max-w-2xl mx-auto">
          MoodFood — bu savolga javob beruvchi yumshoq yordamchi. Siz
          kayfiyatingizni aytasiz, biz sizning didingiz, sog'ligingiz va
          o'sha ongingizga mos taomni tanlaymiz. Hech qanday jadval, hech
          qanday hisob-kitob — faqat bir necha so'z va kichik bir sehr.
        </p>
      </div>
    </section>
  );
}
