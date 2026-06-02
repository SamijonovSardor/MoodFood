# Rasmlar ro'yxati

Loyihadagi barcha rasmlar **`lib/images.ts`** dan boshqariladi. O'zgartirish uchun shu faylni tahrirlang.

## Hozir ishlatilayotgan rasmlar

| # | Joyi | Unsplash ID | Tavsif | Muallif |
|---|------|-------------|--------|---------|
| 1 | Hero (asosiy) | `1546069901-ba9599a7e63c` | Ilik, qo'lda tayyorlangan bowl | Brooke Lark |
| 2 | Hero (bezak) | `1556909114-f6e7ad7d3136` | Stiker effekt uchun kichik rasm | — |
| 3 | Mood: Xafa | `1547592180-85f173990554` | Issiq sho'rva | — |
| 4 | Mood: Baxtli | `1490645935967-10de6ba17061` | Yengil, tetiklantiruvchi | — |
| 5 | Mood: Stress | `1574484284002-952d92456975` | Issiq, qulay | — |
| 6 | Mood: Romantik | `1559847844-5315695dadae` | Maxsus kechki ovqat | — |
| 7 | Mood: Sovuq | `1547592166-23ac45744acd` | Issiq, kaloriyali | — |
| 8 | Mood: Ilhom | `1490818387583-1baba5e638af` | Vitaminli, rang-barang | — |
| 9 | Features: personal | `1490645935967-10de6ba17061` | Shaxsiy tavsiya | — |
| 10 | Features: global | `1559847844-5315695dadae` | Oshxona | — |

## O'zgartirish

### Variant A: Boshqa Unsplash rasmi
1. [unsplash.com](https://unsplash.com) dan ovqat rasmi toping
2. URL manzilidan `photo-` dan keyingi qismni nusxa oling (masalan: `1565299543923-37dd37887442`)
3. `lib/images.ts` da mos o'ringa qo'ying

### Variant B: O'z rasmingiz
1. Rasmlarni `public/images/` ga saqlang:
   ```
   public/images/hero-main.jpg
   public/images/mood-xafa.jpg
   ...
   ```
2. `lib/images.ts` da URL o'rniga yo'l yozing:
   ```ts
   main: "/images/hero-main.jpg"
   ```

## Unsplash litsenziyasi

Bepul, tijorat uchun ishlatish mumkin. Muallifga kredit berish xushmuomala, lekin shart emas.
Batafsil: https://unsplash.com/license
