/**
 * ────────────────────────────────────────────────────────────────
 *  MARKAZIY RASM RO'YXATI
 * ────────────────────────────────────────────────────────────────
 *
 *  Barcha rasm URL'lari shu yerdan boshqariladi.
 *  O'zgartirish uchun shu faylni tahrirlang — sahifadagi barcha
 *  rasmlar avtomatik yangilanadi.
 *
 *  Format: Unsplash CDN (https://images.unsplash.com/photo-...)
 *  Bepul, tijorat uchun ishlatish mumkin (Unsplash litsenziyasi).
 *
 *  O'zingizning rasmingizni qo'yish uchun:
 *  1) public/images/ papkasiga saqlang (masalan: public/images/hero.jpg)
 *  2) URL o'rniga "/images/hero.jpg" yozing
 *
 *  Har bir rasm uchun IMAGES.md faylida muallif va tavsif bor.
 * ────────────────────────────────────────────────────────────────
 */

const u = (id: string, w = 1200, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export type MoodKey = "xafa" | "baxtli" | "stress" | "romantik" | "sovuq" | "ilham";

export const IMAGES = {
  hero: {
    /** Asosiy hero rasmi — iliq, qo'lda tayyorlangan taom */
    main: u("1546069901-ba9599a7e63c", 1600),
    /** Kichik bezak rasmi (sticker effekti uchun) */
    accent: u("1556909114-f6e7ad7d3136", 400),
  },

  moods: {
    xafa: {
      src: u("1547592180-85f173990554", 800),
      alt: "Issiq sho'rva — ko'ngil ko'tarish uchun",
    },
    baxtli: {
      src: u("1490645935967-10de6ba17061", 800),
      alt: "Yengil va tetiklantiruvchi taom",
    },
    stress: {
      src: u("1574484284002-952d92456975", 800),
      alt: "Issiq, qulay taom — stressni kamaytiradi",
    },
    romantik: {
      src: u("1559847844-5315695dadae", 800),
      alt: "Maxsus kechki ovqat",
    },
    sovuq: {
      src: u("1547592166-23ac45744acd", 800),
      alt: "Issiq, kaloriyali taom",
    },
    ilham: {
      src: u("1490818387583-1baba5e638af", 800),
      alt: "Rang-barang vitaminli taom",
    },
  },

  features: {
    /** "Shaxsiy tavsiya" kartasi uchun */
    personal: u("1490645935967-10de6ba17061", 600),
    /** "O'zbek va jahon oshxonasi" kartasi uchun */
    global: u("1559847844-5315695dadae", 600),
  },
} as const;

/**
 * ixtiyoriy: kelajakda local rasmlarga o'tish uchun
 * shu funksiyani ishlatamiz.
 */
export function img(url: string) {
  return url.startsWith("/") ? url : url;
}
