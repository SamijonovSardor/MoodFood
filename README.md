# MoodFood

> Kayfiyatingizga mos taomni AI yordamida tavsiya qiluvchi Next.js ilovasi.

## Texnologiyalar

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** komponentlar
- **NextAuth.js v4** — Google OAuth
- **Fraunces** (serif display) + **Plus Jakarta Sans** (body) + **Caveat** (handwritten)

## Dizayn tizimi

| Token | Qiymat | Izoh |
|-------|--------|------|
| Background | warm cream `#F8F1E5` | issiq, qog'oz hissi |
| Foreground | deep brown `#2B231B` | to'yingan ko'mir |
| Primary | coral `#ED6A3D` | issiq korall |
| Accent | sage `#5F8A6A` | tabiiy yashil |
| Display | Fraunces (italic) | jurnal uslubi |
| Body | Plus Jakarta Sans | iliq, o'qilishi oson |
| Accent | Caveat | qo'lda yozilgan |

Yangi rang/font qo'shish → `tailwind.config.ts` va `app/globals.css`.

## Struktura

```
MoodFood/
├── app/
│   ├── api/auth/[...nextauth]/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── illustrations/    # Custom SVG doodles
│   ├── providers/        # AuthProvider
│   ├── sections/         # Navbar, Hero, Marquee, Features, ...
│   └── ui/               # Button, Card, Avatar, Dropdown, Badge
├── hooks/                # useInView, useCounter
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── images.ts         # 🖼  barcha rasm URL'lari shu yerda
│   └── utils.ts
├── IMAGES.md             # 🖼  rasm hujjati
├── auth.ts               # (legacy v5 — olib tashlangan)
└── next.config.mjs
```

## O'rnatish

```bash
cd MoodFood
npm install
cp .env.example .env.local
# .env.local ni to'ldiring
npm run dev
```

Brauzerda: [http://localhost:3000](http://localhost:3000)

## Google OAuth

1. [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. **APIs & Services → Credentials → Create OAuth client (Web)**
3. Sozlang:

   **Authorized JavaScript origins:**
   ```
   http://localhost:3000
   ```

   **Authorized redirect URIs:**
   ```
   http://localhost:3000/api/auth/callback/google
   ```

4. Client ID va Secret ni `.env.local` ga:
   ```env
   NEXTAUTH_SECRET="<openssl rand -base64 32>"
   GOOGLE_CLIENT_ID="xxx.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="GOCSPX-xxx"
   ```

## Rasmlarni o'zgartirish

**`lib/images.ts`** — bitta fayl, barcha rasm URL'lari shu yerda.
Tafsilot: [`IMAGES.md`](./IMAGES.md)

```ts
// Masalan, hero rasmini almashtirish:
hero: {
  main: "https://yangi-rasm-url.jpg",
  accent: "https://...",
}
```

Yoki o'z rasmingizni `public/images/` ga saqlang va yo'l ko'rsating:
```ts
main: "/images/hero.jpg"
```

## Skriptlar

- `npm run dev` — development
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint

## Keyingi qadamlar

- [ ] `/app` sahifa — mood input formasi
- [ ] OpenRouter API integratsiyasi
- [ ] Prompt engineering (mood → food JSON)
- [ ] Tarix (history) saqlash
- [ ] Protected route'lar (middleware)
