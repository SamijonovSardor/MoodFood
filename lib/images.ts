/**
 * Markaziy rasm ro'yxati.
 * Hozirda sahifada rasm ishlatilmaydi (chat UI mock + iconlar yetarli),
 * lekin kelajakda Hero CTA, Final CTA background, yoki Product Showcase
 * uchun shu yerdan URL olish mumkin.
 */

const u = (id: string, w = 1200, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;

export const IMAGES = {
  hero: {
    main: u("1546069901-ba9599a7e63c", 1600),
  },
  product: {
    moodSelection: u("1490645935967-10de6ba17061", 800),
    ingredients: u("1556909114-f6e7ad7d3136", 800),
    recipe: u("1559847844-5315695dadae", 800),
  },
} as const;

