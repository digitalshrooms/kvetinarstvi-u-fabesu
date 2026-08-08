# Redesign webu Květinářství U Fábesů — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přepsat existující web (dnes obsahově o stavebních izolacích "Styromat") na Květinářství U Fábesů — nová vizuální identita, nový obsah, nová galerie a jemné animace v duchu Emila Kowalského, při zachování stávající technické kostry (Vite + React 18 + TypeScript + Tailwind + Supabase).

**Architecture:** Stávající struktura `App.tsx` (Header → Hero → sekce → Footer) zůstává. Každá komponenta v `src/components/` se přepisuje samostatně s novým obsahem a paletou. Přidává se nová komponenta `Gallery.tsx` a sdílený modul animačních variant `src/lib/motion.ts`. Data (kategorie, kroky, možnosti formuláře) zůstávají centralizovaná v `src/data/content.ts`.

**Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, `@supabase/supabase-js`, `lucide-react`, nově `framer-motion`. Design/animační skilly: `emilkowalski/skills` a `pbakaus/impeccable` (instalované přes `npx skills add`, používané jako pracovní reference, nejsou runtime závislostí aplikace).

## Global Constraints

- Web zůstává pouze v češtině (žádná vícejazyčnost).
- Žádný nový e-shop/cart/platba — pouze katalog + poptávkový formulář (beze změny datového modelu v Supabase; tabulka `inquiries` a sloupec `material_type` se nepřejmenovávají, jen se mění UI popisky a hodnoty).
- Reálné kontaktní údaje (telefon, e-mail, adresa, otevírací doba, IČO) se nahrazují jasně označenými placeholdery ve tvaru `[DOPLNIT …]` nebo `+420 XXX XXX XXX` — nikdy se nevymýšlí fiktivní reálně vyhlížející údaje.
- Nepoužívají se externí hotlinkované fotky (copyright/závislost na cizím hostingu) — tam, kde chybí reálné fotografie, se použijí CSS gradient + SVG placeholdery.
- Animace respektují `prefers-reduced-motion`, UI mikro-interakce ~150–300ms, větší obsahové přechody ~400–600ms, custom cubic-bezier easing (ne výchozí CSS `ease`/`linear`).
- Projekt nemá nakonfigurovaný test runner (žádný `vitest`/`jest` v `package.json`). Ověřovacím krokem pro každý task je `npm run typecheck`, `npm run lint` a vizuální/manuální kontrola v dev serveru — ne unit testy, protože komponenty jsou čistě prezentační a projekt žádnou test infrastrukturu nemá.
- `npm run build` musí projít bez chyb až na konci (poslední task).

---

## File Structure

**Modify:**
- `package.json` — přidat `framer-motion`
- `tailwind.config.js` — nová paleta (cream/sand/brand-blush/sage), font `display`
- `index.html` — font Fraunces, title/meta popis
- `src/index.css` — komponentní třídy (`.btn`, `.card`, `.eyebrow`, `.section-title`) na novou paletu/tvarosloví
- `src/data/content.ts` — kompletní přepis (kategorie, oblíbené květiny, kroky, možnosti formuláře)
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/TrustBar.tsx`
- `src/components/Sortiment.tsx`
- `src/components/Process.tsx`
- `src/components/InquiryForm.tsx`
- `src/components/About.tsx`
- `src/components/Footer.tsx`
- `src/App.tsx` — přidat `Gallery`, přejmenovat `WhyStyromat` → `WhyUs`

**Create:**
- `src/lib/motion.ts` — sdílené framer-motion varianty (easing, fade-up, stagger)
- `src/components/Gallery.tsx` — nová sekce galerie realizací
- `src/components/WhyUs.tsx` — náhrada za `WhyStyromat.tsx`

**Delete:**
- `src/components/WhyStyromat.tsx` (nahrazeno `WhyUs.tsx`)

---

### Task 1: Nástroje, design skilly a design systém (barvy, fonty, base styly)

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.js`
- Modify: `index.html`
- Modify: `src/index.css`

**Interfaces:**
- Produces: Tailwind barevné tokeny `cream.*`, `sand.*`, `brand.*` (blush růžová, nahrazuje dnešní oranžovou), `sage.*` (zelená), `ink.*` (teplá antracitová, upravené hodnoty); `fontFamily.display` (Fraunces) a `fontFamily.sans` (Plus Jakarta Sans, beze změny); CSS třídy `.btn-primary`, `.btn-secondary`, `.eyebrow`, `.section-title`, `.card` s novým vzhledem (zaoblenější, měkčí). Všechny další tasky tyto tokeny a třídy používají.

- [ ] **Step 1: Nainstalovat `framer-motion`**

```bash
npm install framer-motion
```

- [ ] **Step 2: Nainstalovat design/animační skilly a inicializovat je**

```bash
npx skills add emilkowalski/skills
npx skills add pbakaus/impeccable
```

Po instalaci spustit inicializaci Impeccable (vytvoří/aktualizuje projektový design kontext):

```bash
npx impeccable init
```

Pokud `npx impeccable init` selže (balíček se spouští jinak než přímým binary), zkusit `npx skills run pbakaus/impeccable init` — ověřit podle výstupu instalace, který příkaz balíček skutečně zaregistroval, a použít ten. Cíl kroku: mít lokálně dostupné oba skilly pro referenci při psaní animací v dalších taskách (nejsou to runtime závislosti webu).

- [ ] **Step 3: Přepsat `tailwind.config.js` na novou paletu a fonty**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#2C2420',
          900: '#2C2420',
          800: '#3D332C',
          700: '#57493F',
          500: '#7A6B60',
          400: '#9B8D82',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F5EFE6',
          200: '#E9DECE',
          300: '#D8C8B0',
        },
        brand: {
          50: '#FDF2F4',
          100: '#FCE4E9',
          200: '#F8C6D2',
          300: '#F2A0B4',
          400: '#E87C99',
          500: '#D95C81',
          600: '#C13F68',
          700: '#9E3054',
        },
        sage: {
          50: '#F4F7F2',
          100: '#E5EDDF',
          200: '#C9D9BC',
          300: '#A7C093',
          400: '#84A66C',
          500: '#668A4F',
          600: '#4F6E3C',
          700: '#3D5730',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(44, 36, 32, 0.05), 0 1px 3px rgba(44, 36, 32, 0.07)',
        cardHover: '0 12px 28px -10px rgba(44, 36, 32, 0.20), 0 3px 8px rgba(44, 36, 32, 0.08)',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Aktualizovat `index.html` — font Fraunces, title a meta popis**

```html
<!doctype html>
<html lang="cs">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Květinářství U Fábesů – čerstvé řezané květiny, kytice na míru, svatební a sváteční výzdoba, pokojové rostliny a rozvoz. Ruční vazba s láskou k detailu."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&display=swap"
      rel="stylesheet"
    />
    <title>Květinářství U Fábesů – čerstvé kytice, svatební výzdoba a rozvoz</title>
    <meta property="og:image" content="https://bolt.new/static/og_default.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://bolt.new/static/og_default.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Aktualizovat `src/index.css` na novou paletu a měkčí tvarosloví**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply bg-sand-50 text-ink-900 font-sans antialiased;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  ::selection {
    @apply bg-brand-200/60 text-ink-900;
  }
}

@layer components {
  .container-page {
    @apply mx-auto w-full max-w-container px-5 sm:px-6 lg:px-8;
  }
  .btn {
    @apply inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2;
  }
  .btn-primary {
    @apply btn bg-brand-600 px-5 py-3 text-white shadow-sm hover:bg-brand-700 active:scale-[0.98];
  }
  .btn-secondary {
    @apply btn border border-sand-300 bg-white px-5 py-3 text-ink-900 hover:border-ink-400 hover:bg-sand-100;
  }
  .eyebrow {
    @apply inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700;
  }
  .section-title {
    @apply font-display text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl;
  }
  .card {
    @apply rounded-2xl border border-sand-200 bg-white shadow-card transition-all duration-300;
  }
}
```

- [ ] **Step 6: Ověřit, že projekt stále sestaví**

Run: `npm run typecheck && npm run lint`
Expected: bez chyb (komponenty ještě používají staré `slatey-*` třídy, které v Tailwindu 3 nevyhodí typovou chybu — to je JIT CSS, ne TS typ; `npm run typecheck` tedy projde. Vizuální nesoulad se opraví v následujících taskách, kdy se každá komponenta přepíše.)

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json tailwind.config.js index.html src/index.css
git commit -m "feat: switch design tokens to floral palette and install animation skills"
```

---

### Task 2: Přepsat datový obsah (`src/data/content.ts`)

**Files:**
- Modify: `src/data/content.ts`

**Interfaces:**
- Produces: `categories: Category[]` (4 položky: řezané květiny, svatby, pokojové rostliny, rozvoz), `flowerTypes: FlowerType[]` (7 položek, nahrazuje `brands`), `steps: Step[]` (3 kroky objednávky kytice), `sortimentOptions: SortimentOption[]` (nahrazuje `materialOptions`, hodnoty odpovídají `categories[].id` + `jine`). Typy `Category`, `FlowerType`, `Step`, `SortimentOption` používají `Sortiment.tsx`, `TrustBar.tsx`, `Process.tsx`, `InquiryForm.tsx`, `Footer.tsx`.

- [ ] **Step 1: Nahradit celý obsah souboru**

```ts
import {
  Flower2,
  HeartHandshake,
  Sprout,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export type Category = {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    id: 'rezane-kytice',
    title: 'Řezané květiny a kytice',
    description:
      'Čerstvé řezané květiny každý den – od klasických růží po sezónní kompozice. Kytice svážeme na počkání podle přání nebo příležitosti.',
    items: ['Kytice na míru', 'Sezónní květiny', 'Výročí a narozeniny'],
    icon: Flower2,
  },
  {
    id: 'svatby-akce',
    title: 'Svatby a sváteční výzdoba',
    description:
      'Svatební kytice, výzdoba obřadu a hostiny, smuteční vazby i firemní a sváteční aranžmá. Od konzultace až po instalaci na místě.',
    items: ['Svatební kytice a výzdoba', 'Smuteční vazby', 'Firemní a sváteční akce'],
    icon: HeartHandshake,
  },
  {
    id: 'pokojove-rostliny',
    title: 'Pokojové rostliny',
    description:
      'Pokojové rostliny do bytu i kanceláře, květináče a substráty. Poradíme s výběrem podle světla i péče, kterou jim chcete věnovat.',
    items: ['Pokojové rostliny', 'Květináče a substráty', 'Poradenství o péči'],
    icon: Sprout,
  },
  {
    id: 'rozvoz',
    title: 'Rozvoz a donáška',
    description:
      'Objednanou kytici doručíme až ke dveřím adresáta, nebo si ji vyzvednete osobně v naší prodejně. Doručujeme i jako dárek s přáním.',
    items: ['Rozvoz na adresu', 'Osobní odběr v prodejně', 'Dárkové balení a přání'],
    icon: Truck,
  },
];

export type FlowerType = { name: string; note: string };

export const flowerTypes: FlowerType[] = [
  { name: 'Růže', note: 'Klasika na každou příležitost' },
  { name: 'Pivoňky', note: 'Sezónní, bohaté aranžmá' },
  { name: 'Eukalyptus', note: 'Zeleň do kytic a věnců' },
  { name: 'Slunečnice', note: 'Letní, jasné barvy' },
  { name: 'Gerbery', note: 'Veselé a barevné' },
  { name: 'Tulipány', note: 'Jarní klasika' },
  { name: 'Levandule', note: 'Sušené i čerstvé svazky' },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: '01',
    title: 'Vyberte si kytici nebo nám napište přání',
    description:
      'Vyberte si z nabídky nebo popište příležitost, barvy a rozpočet ve formuláři. Rádi poradíme s výběrem i skladbou květin.',
  },
  {
    number: '02',
    title: 'Ručně zavážeme čerstvé květiny',
    description:
      'Kytici nebo výzdobu ručně sestavíme z čerstvých květin obvykle do 24 hodin od objednávky, podle domluveného termínu.',
  },
  {
    number: '03',
    title: 'Doručíme, nebo si ji vyzvednete',
    description:
      'Kytici doručíme na zvolenou adresu, nebo si ji vyzvednete osobně v prodejně – podle toho, co je pro vás pohodlnější.',
  },
];

export type SortimentOption = {
  value: string;
  label: string;
};

export const sortimentOptions: SortimentOption[] = [
  { value: 'rezane-kytice', label: 'Řezané květiny a kytice' },
  { value: 'svatby-akce', label: 'Svatební a sváteční výzdoba' },
  { value: 'pokojove-rostliny', label: 'Pokojové rostliny' },
  { value: 'rozvoz', label: 'Rozvoz / donáška' },
  { value: 'jine', label: 'Jiné / kombinace / nevím jistě' },
];
```

- [ ] **Step 2: Ověřit typy**

Run: `npm run typecheck`
Expected: PASS pro tento soubor samotný (importy v komponentách, které ještě odkazují na `brands`/`materialOptions`, zatím selžou — to je v pořádku, opraví se v jejich vlastních taskách; pokud typecheck v tomto kroku selže kvůli jiným souborům, potvrď, že chybové řádky ukazují jen na dosud nepřepsané komponenty, ne na `content.ts`).

- [ ] **Step 3: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: rewrite content data for flower shop"
```

---

### Task 3: Sdílené animační varianty (`src/lib/motion.ts`)

**Files:**
- Create: `src/lib/motion.ts`

**Interfaces:**
- Produces: `easeOut: [number, number, number, number]`, `fadeUp: Variants`, `fadeIn: Variants`, `staggerContainer: (stagger?: number) => Variants`, `viewportOnce: { once: true; margin: string }`. Používá se ve všech komponentách sekcí (Hero, TrustBar, Sortiment, Gallery, WhyUs, Process, InquiryForm, About).

- [ ] **Step 1: Vytvořit soubor**

```ts
import type { Variants } from 'framer-motion';

/** Custom "ease out" curve (ne výchozí CSS ease) — plynulý start, měkké doběhnutí. */
export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export function staggerContainer(stagger = 0.08): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };
}

/** whileInView nastavení: animuj jen jednou, spusť těsně před vstupem do viewportu. */
export const viewportOnce = { once: true, margin: '-80px' } as const;
```

- [ ] **Step 2: Ověřit typy**

Run: `npm run typecheck`
Expected: PASS (soubor nemá závislosti na dosud nepřepsaných komponentách)

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion.ts
git commit -m "feat: add shared framer-motion variants"
```

---

### Task 4: Header

**Files:**
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Consumes: nic z `content.ts` (navigace je statická jako dnes).
- Produces: komponenta `Header` beze změny exportu/použití v `App.tsx`.

- [ ] **Step 1: Nahradit obsah souboru**

```tsx
import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, Flower2 } from 'lucide-react';

const navLinks = [
  { label: 'Sortiment', href: '#sortiment' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'O nás', href: '#o-nas' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden border-b border-sand-200 bg-ink-900 text-sand-100 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:+420000000000"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-brand-400" />
              +420 XXX XXX XXX
            </a>
            <a
              href="mailto:info@[doplnit-domenu].cz"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-400" />
              info@[doplnit-domenu].cz
            </a>
            <span className="flex items-center gap-2 text-sand-300">
              <MapPin className="h-3.5 w-3.5 text-brand-400" />
              [DOPLNIT ULICE], [DOPLNIT MĚSTO]
            </span>
          </div>
          <span className="text-sand-300/80">
            Po–Pá 8:00–17:00, So 8:00–12:00
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? 'border-sand-200 bg-white/95 backdrop-blur shadow-sm'
            : 'border-transparent bg-sand-50'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
              <Flower2 className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight text-ink-900">
                U Fábesů
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-ink-500">
                Květinářství
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-ink-700 transition-colors hover:text-brand-600"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#poptavka" className="btn-primary hidden sm:inline-flex">
              Poptat kytici
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-ink-900 lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-sand-200 bg-white lg:hidden">
            <nav className="container-page flex flex-col py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-sand-100 py-3 text-sm font-semibold text-ink-700"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#poptavka"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 w-full"
              >
                Poptat kytici
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS pro `Header.tsx` (žádné odkazy na neexistující importy)

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: redesign Header for flower shop"
```

---

### Task 5: Hero

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: nic z `content.ts` (perky jsou lokální pole jako dnes).
- Produces: komponenta `Hero`, animovaná pomocí `fadeUp`/`staggerContainer` z `@/lib/motion`.

- [ ] **Step 1: Nahradit obsah souboru**

```tsx
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Flower2 } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';

const perks = [
  'Čerstvé květiny každý den',
  'Ruční vazba na míru',
  'Rozvoz i osobní odběr',
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-sand-50">
      {/* Organic accent blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-sage-200/50 blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.12)}
        className="container-page relative grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:py-24"
      >
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Ruční květinová vazba
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl"
          >
            Kytice, které vyprávějí příběh —{' '}
            <span className="text-brand-600">čerstvé, ruční, na míru</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-500"
          >
            Vážeme čerstvé kytice pro každou příležitost, staráme se o
            svatební a sváteční výzdobu a doplníme váš domov pokojovými
            rostlinami. Kytici doručíme až ke dveřím, nebo si ji vyzvednete
            osobně v prodejně.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a href="#poptavka" className="btn-primary text-base">
              Poptat kytici
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#sortiment" className="btn-secondary text-base">
              Prohlédnout sortiment
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8"
          >
            {perks.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 text-sm font-semibold text-ink-700"
              >
                <CheckCircle2 className="h-5 w-5 text-brand-600" />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Info card */}
        <motion.div variants={fadeUp} className="lg:col-span-5">
          <div className="card relative overflow-hidden p-6 lg:p-8">
            <div className="flex items-center gap-3 border-b border-sand-200 pb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Flower2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">Rychlá objednávka</p>
                <p className="text-xs text-ink-500">
                  Napište nám a kytici obvykle svážeme do 24 hodin
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink-500">Dodací doba</dt>
                <dd className="font-semibold text-ink-900">obvykle do 24 h</dd>
              </div>
              <div className="h-px bg-sand-200" />
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink-500">Prodejna</dt>
                <dd className="font-semibold text-ink-900">
                  [DOPLNIT ULICE], [DOPLNIT MĚSTO]
                </dd>
              </div>
              <div className="h-px bg-sand-200" />
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink-500">Rozvoz</dt>
                <dd className="font-semibold text-ink-900">po [DOPLNIT REGION]</dd>
              </div>
              <div className="h-px bg-sand-200" />
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-ink-500">Otevírací doba</dt>
                <dd className="font-semibold text-ink-900">Po–Pá 8:00–17:00</dd>
              </div>
            </dl>

            <a href="#poptavka" className="btn-primary mt-6 w-full">
              Otevřít poptávku
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: redesign Hero with floral copy and entrance animation"
```

---

### Task 6: TrustBar (oblíbené květiny)

**Files:**
- Modify: `src/components/TrustBar.tsx`

**Interfaces:**
- Consumes: `flowerTypes` z `@/data/content` (typ `FlowerType`, produkováno v Task 2).
- Produces: komponenta `TrustBar`, animovaná stagger-reveal při scrollu (`whileInView`).

- [ ] **Step 1: Nahradit obsah souboru**

```tsx
import { motion } from 'framer-motion';
import { flowerTypes } from '@/data/content';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export default function TrustBar() {
  return (
    <section className="border-y border-sand-200 bg-white">
      <div className="container-page py-10">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink-500">
          Nejoblíbenější květiny v naší nabídce
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.06)}
          className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-sand-200 bg-sand-200 sm:grid-cols-3 lg:grid-cols-7"
        >
          {flowerTypes.map((f) => (
            <motion.div
              key={f.name}
              variants={fadeUp}
              className="group flex flex-col items-center justify-center bg-white px-4 py-6 transition-colors hover:bg-sand-50"
            >
              <span className="font-display text-lg font-semibold tracking-tight text-ink-900 transition-colors group-hover:text-brand-600">
                {f.name}
              </span>
              <span className="mt-1 text-xs text-ink-400">{f.note}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/TrustBar.tsx
git commit -m "feat: redesign TrustBar as favorite flowers grid"
```

---

### Task 7: Sortiment

**Files:**
- Modify: `src/components/Sortiment.tsx`

**Interfaces:**
- Consumes: `categories` z `@/data/content` (Task 2).
- Produces: komponenta `Sortiment` se stagger reveal animací karet.

- [ ] **Step 1: Nahradit obsah souboru**

```tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/content';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export default function Sortiment() {
  return (
    <section id="sortiment" className="bg-sand-50">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Sortiment</span>
          <h2 className="section-title mt-4">
            Vše pro krásnou kytici i výzdobu
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Od denní kytice přes svatební výzdobu až po pokojové rostliny a
            rozvoz – s láskou k detailu a čerstvým květinám.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.id}
                variants={fadeUp}
                className="card group flex flex-col p-6 hover:-translate-y-1 hover:shadow-cardHover hover:border-brand-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-900 text-brand-400 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>

                <h3 className="mt-5 text-xl font-bold text-ink-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {c.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {c.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-center gap-2 text-sm text-ink-700"
                    >
                      <span className="h-1 w-1 rounded-full bg-brand-500" />
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  href="#poptavka"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:gap-2.5 hover:text-brand-700"
                >
                  Poptat
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/Sortiment.tsx
git commit -m "feat: redesign Sortiment for flower categories"
```

---

### Task 8: Gallery (nová sekce)

**Files:**
- Create: `src/components/Gallery.tsx`

**Interfaces:**
- Consumes: nic z `content.ts` — lokální pole ukázek (placeholder, bez reálných fotek).
- Produces: komponenta `Gallery`, exportovaná jako default, používaná v `App.tsx` (Task 13).

- [ ] **Step 1: Vytvořit soubor**

```tsx
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type GalleryItem = {
  title: string;
  gradient: string;
};

const items: GalleryItem[] = [
  { title: 'Svatební kytice', gradient: 'from-brand-200 via-brand-100 to-sand-100' },
  { title: 'Jarní aranžmá', gradient: 'from-sage-200 via-sage-100 to-sand-100' },
  { title: 'Sváteční výzdoba', gradient: 'from-brand-100 via-sand-100 to-sage-100' },
  { title: 'Kytice na přání', gradient: 'from-sage-100 via-brand-100 to-sand-100' },
  { title: 'Pokojové rostliny', gradient: 'from-sand-200 via-sage-100 to-sage-200' },
  { title: 'Smuteční vazba', gradient: 'from-sand-200 via-brand-100 to-brand-200' },
];

export default function Gallery() {
  return (
    <section id="galerie" className="bg-white">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Galerie</span>
          <h2 className="section-title mt-4">Naše realizace</h2>
          <p className="mt-4 text-lg text-ink-500">
            Ukázka z naší práce – od denních kytic po svatební a sváteční
            výzdobu. Fotografie konkrétních realizací brzy doplníme.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <motion.figure
              key={item.title}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl border border-sand-200 bg-gradient-to-br ${item.gradient} p-6 text-center shadow-card`}
            >
              <Flower2 className="h-8 w-8 text-ink-900/30" strokeWidth={1.5} />
              <figcaption className="mt-3 text-sm font-semibold text-ink-800">
                {item.title}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/Gallery.tsx
git commit -m "feat: add Gallery section with placeholder showcase"
```

---

### Task 9: WhyUs (náhrada WhyStyromat)

**Files:**
- Create: `src/components/WhyUs.tsx`
- Delete: `src/components/WhyStyromat.tsx`

**Interfaces:**
- Consumes: nic z `content.ts` — lokální pole hodnot jako dnes.
- Produces: komponenta `WhyUs`, exportovaná jako default, nahrazuje `WhyStyromat` v `App.tsx` (Task 13).

- [ ] **Step 1: Vytvořit `src/components/WhyUs.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Flower2, Scissors, Truck } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const values = [
  {
    icon: Flower2,
    title: 'Čerstvost každý den',
    body: 'Květiny nakupujeme pravidelně a v malých dávkách, aby byla každá kytice svázaná z čerstvého materiálu, ne ze skladu.',
  },
  {
    icon: Scissors,
    title: 'Ruční vazba na míru',
    body: 'Každou kytici vážeme ručně podle příležitosti, barevného přání i rozpočtu – žádné dvě nejsou úplně stejné.',
  },
  {
    icon: Truck,
    title: 'Rychlý rozvoz i osobní odběr',
    body: 'Kytici doručíme až ke dveřím adresáta, nebo si ji v domluveném čase vyzvednete osobně v naší prodejně.',
  },
];

export default function WhyUs() {
  return (
    <section id="proc-my" className="bg-sand-50">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Proč U Fábesů</span>
          <h2 className="section-title mt-4">
            Kytice s péčí od výběru po doručení
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Nejsme anonymní e-shop s květinami. Jsme rodinné květinářství,
            které si zakládá na čerstvosti a osobním přístupu.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="relative rounded-2xl border border-sand-200 bg-white p-7"
              >
                <span className="absolute left-0 top-7 h-8 w-1 rounded-r bg-brand-600" />
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 shadow-card">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {v.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Smazat starý soubor**

```bash
git rm src/components/WhyStyromat.tsx
```

(Pokud `git rm` selže, protože soubor bude v tomto bodě ještě potřeba pro `App.tsx` z předchozí verze — smazat ho lze bezpečně, protože `App.tsx` se na `WhyUs` přepojí v Task 13; do té doby `App.tsx` dočasně nesestaví, což je u vícetaskového postupu očekávané a opraví se v Task 13.)

- [ ] **Step 3: Ověřit typy nového souboru**

Run: `npx tsc --noEmit -p tsconfig.app.json`
Expected: chyba se objeví jen v `src/App.tsx` (dosud importuje smazaný `WhyStyromat`) — to je očekávané, opraví se v Task 13. `WhyUs.tsx` samotný nesmí hlásit žádnou chybu.

- [ ] **Step 4: Commit**

```bash
git add src/components/WhyUs.tsx
git commit -m "feat: replace WhyStyromat with WhyUs section"
```

---

### Task 10: Process

**Files:**
- Modify: `src/components/Process.tsx`

**Interfaces:**
- Consumes: `steps` z `@/data/content` (Task 2).
- Produces: komponenta `Process` se stagger reveal animací.

- [ ] **Step 1: Nahradit obsah souboru**

```tsx
import { motion } from 'framer-motion';
import { steps } from '@/data/content';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export default function Process() {
  return (
    <section className="bg-ink-900 text-white">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
            Jak probíhá objednávka
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Od poptávky po kytici ve třech krocích
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.div
              key={s.number}
              variants={fadeUp}
              className="relative bg-ink-900 p-8 transition-colors hover:bg-ink-800"
            >
              <span className="font-display text-5xl font-semibold text-brand-400/30">
                {s.number}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-300">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-sand-300">
            Máte přesnou představu nebo speciální přání? Napište nám a
            domluvíme detaily.
          </p>
          <a
            href="#poptavka"
            className="btn bg-brand-600 px-5 py-3 text-white hover:bg-brand-500"
          >
            Odeslat poptávku
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/Process.tsx
git commit -m "feat: redesign Process steps for bouquet ordering"
```

---

### Task 11: InquiryForm

**Files:**
- Modify: `src/components/InquiryForm.tsx`

**Interfaces:**
- Consumes: `sortimentOptions` z `@/data/content` (Task 2); `supabase` z `@/lib/supabase` (beze změny).
- Produces: komponenta `InquiryForm`. Zapisuje do stejné tabulky `inquiries` a stejného sloupce `material_type` jako dnes (beze změny schématu) — mění se jen popisky a hodnoty v UI.

- [ ] **Step 1: Nahradit obsah souboru**

```tsx
import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { sortimentOptions } from '@/data/content';
import { fadeUp, viewportOnce } from '@/lib/motion';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const materialType = String(data.get('material_type') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email) {
      setStatus('error');
      setErrorMsg('Vyplňte prosím jméno a e-mail.');
      return;
    }

    const { error } = await supabase.from('inquiries').insert({
      name,
      email,
      phone,
      material_type: materialType,
      message,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Odeslání se nezdařilo. Zkuste to prosím znovu nebo nám napište e-mail.');
      return;
    }

    setStatus('success');
    form.reset();
  }

  return (
    <section id="poptavka" className="bg-sand-50">
      <div className="container-page py-16 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-card lg:grid-cols-5"
        >
          {/* Left panel */}
          <div className="relative flex flex-col justify-between bg-ink-900 p-8 text-white lg:col-span-2 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
                Poptávka kytice
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                Objednejte si kytici na míru
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-sand-300">
                Napište nám příležitost, barvy nebo přibližný rozpočet a my
                vám kytici obvykle do 24 hodin svážeme a domluvíme předání.
              </p>
            </div>

            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-sand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Odpověď obvykle do 24 hodin
              </div>
              <div className="flex items-center gap-2 text-sand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Nezávazné, bez poplatku
              </div>
              <div className="flex items-center gap-2 text-sand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Rozvoz i osobní odběr
              </div>
            </dl>
          </div>

          {/* Form */}
          <div className="p-8 lg:col-span-3 lg:p-10">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink-900">
                  Poptávka byla odeslána
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-500">
                  Děkujeme. Vaši poptávku jsme přijali a do 24 hodin se vám
                  ozveme s návrhem kytice a termínem.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-6"
                >
                  Odeslat další poptávku
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Jméno a příjmení" name="name" required />
                  <Field label="E-mail" name="email" type="email" required />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Telefon" name="phone" type="tel" />
                  <div>
                    <label
                      htmlFor="material_type"
                      className="mb-1.5 block text-sm font-semibold text-ink-700"
                    >
                      Co potřebujete
                    </label>
                    <select
                      id="material_type"
                      name="material_type"
                      defaultValue=""
                      className="w-full rounded-lg border border-sand-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="" disabled>
                        Vyberte kategorii…
                      </option>
                      {sortimentOptions.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-ink-700"
                  >
                    Zpráva / přání
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Popište příležitost, barvy, rozpočet nebo termín, kdy kytici potřebujete…"
                    className="w-full resize-y rounded-lg border border-sand-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Odesíláme…
                    </>
                  ) : (
                    <>
                      Odeslat poptávku
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-ink-400">
                  Odesláním souhlasíte se zpracováním údajů za účelem vyřízení poptávky.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-700">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-sand-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
```

- [ ] **Step 2: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 3: Manuálně ověřit odeslání formuláře**

Spustit dev server (`npm run dev`), otevřít sekci `#poptavka`, vyplnit jméno a e-mail, odeslat. Očekávaný výsledek: buď zobrazení stavu úspěchu (pokud jsou nastavené Supabase env proměnné a tabulka `inquiries` existuje), nebo srozumitelná chybová hláška (pokud env proměnné chybí) — v obou případech UI nesmí spadnout ani zůstat nečinné.

- [ ] **Step 4: Commit**

```bash
git add src/components/InquiryForm.tsx
git commit -m "feat: redesign InquiryForm for flower orders"
```

---

### Task 12: About a Footer

**Files:**
- Modify: `src/components/About.tsx`
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `categories` z `@/data/content` (Footer, Task 2).
- Produces: komponenty `About`, `Footer` beze změny exportu.

- [ ] **Step 1: Nahradit obsah `src/components/About.tsx`**

```tsx
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Flower2, Navigation } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';

const contacts = [
  {
    icon: MapPin,
    label: 'Adresa prodejny',
    value: '[DOPLNIT ULICE], [DOPLNIT MĚSTO]',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+420 XXX XXX XXX',
    href: 'tel:+420000000000',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'info@[doplnit-domenu].cz',
    href: 'mailto:info@[doplnit-domenu].cz',
  },
  {
    icon: Clock,
    label: 'Otevírací doba',
    value: 'Po–Pá 8:00–17:00, So 8:00–12:00',
  },
];

export default function About() {
  return (
    <section id="o-nas" className="bg-white">
      <div className="container-page py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <span className="eyebrow">O nás</span>
            <h2 className="section-title mt-4">
              Rodinné květinářství s láskou k detailu
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-500">
              <p>
                Květinářství U Fábesů vážeme kytice a staráme se o výzdobu
                s důrazem na čerstvost a osobní přístup ke každé objednávce.
                Věříme, že správná kytice dokáže říct víc než slova.
              </p>
              <p>
                Nabízíme řezané květiny na denní objednávky, svatební a
                sváteční výzdobu, pokojové rostliny i rozvoz nebo osobní
                odběr přímo v prodejně.
              </p>
              <p>
                Pokud si nejste jistí výběrem, rádi poradíme podle
                příležitosti, barevného ladění i rozpočtu.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-sand-200 bg-sand-50 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white">
                <Flower2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">
                  IČO [DOPLNIT] · DIČ [DOPLNIT]
                </p>
                <p className="text-xs text-ink-500">
                  Květinářství U Fábesů, [DOPLNIT ULICE], [DOPLNIT MĚSTO]
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact grid + map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sand-200 bg-sand-200 sm:grid-cols-2">
              {contacts.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-ink-900">
                        {c.value}
                      </p>
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-start gap-3 bg-white p-5 transition-colors hover:bg-sand-50"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="flex items-start gap-3 bg-white p-5">
                    {inner}
                  </div>
                );
              })}
            </div>

            {/* Map placeholder — nahraďte souřadnice po doplnění reálné adresy */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-sand-200 bg-sand-100">
              <div className="relative h-72 w-full">
                <iframe
                  title="Orientační mapa – doplňte po zadání reálné adresy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=15.0%2C50.0%2C15.05%2C50.03&layer=mapnik&marker=50.0167%2C15.025"
                  className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-[1.05]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 shadow-card">
                  <Navigation className="h-4 w-4 text-brand-600" />
                  <span className="text-sm font-semibold text-ink-900">
                    U Fábesů – [DOPLNIT MĚSTO]
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Nahradit obsah `src/components/Footer.tsx`**

```tsx
import { Flower2, Phone, Mail, MapPin } from 'lucide-react';
import { categories } from '@/data/content';

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-ink-900 text-sand-300">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
                <Flower2 className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold tracking-tight text-white">
                  U Fábesů
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-sand-400">
                  Květinářství
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-sand-400">
              Řezané květiny, svatební a sváteční výzdoba, pokojové rostliny
              a rozvoz. Ruční vazba s láskou k detailu.
            </p>
          </div>

          {/* Categories */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Sortiment
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <a
                    href="#sortiment"
                    className="text-sand-400 transition-colors hover:text-brand-400"
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span className="text-sand-400">
                  [DOPLNIT ULICE]<br />[DOPLNIT MĚSTO]
                </span>
              </li>
              <li>
                <a
                  href="tel:+420000000000"
                  className="flex items-center gap-2.5 text-sand-400 transition-colors hover:text-brand-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  +420 XXX XXX XXX
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@[doplnit-domenu].cz"
                  className="flex items-center gap-2.5 text-sand-400 transition-colors hover:text-brand-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                  info@[doplnit-domenu].cz
                </a>
              </li>
            </ul>
            <a
              href="#poptavka"
              className="btn mt-5 w-full bg-brand-600 px-4 py-2.5 text-sm text-white hover:bg-brand-500"
            >
              Poptat kytici
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-sand-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Květinářství U Fábesů · IČO [DOPLNIT] · DIČ [DOPLNIT]
          </p>
          <p>Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Ověřit typy a lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS pro oba soubory (celkový build ještě selže kvůli `App.tsx`, viz Task 13)

- [ ] **Step 4: Commit**

```bash
git add src/components/About.tsx src/components/Footer.tsx
git commit -m "feat: redesign About and Footer for flower shop"
```

---

### Task 13: Propojit App.tsx a finální ověření

**Files:**
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: všechny komponenty z Tasků 4–12 (`Header`, `Hero`, `TrustBar`, `Sortiment`, `Gallery`, `WhyUs`, `Process`, `InquiryForm`, `About`, `Footer`).
- Produces: kompletní, sestavitelnou aplikaci.

- [ ] **Step 1: Nahradit obsah `src/App.tsx`**

```tsx
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Sortiment from '@/components/Sortiment';
import Gallery from '@/components/Gallery';
import WhyUs from '@/components/WhyUs';
import Process from '@/components/Process';
import InquiryForm from '@/components/InquiryForm';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-sand-50">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Sortiment />
        <Gallery />
        <WhyUs />
        <Process />
        <InquiryForm />
        <About />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Typecheck, lint a build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: všechny tři příkazy PASS bez chyb. Pokud `npm run build` selže na nepoužitém importu nebo neexistujícím souboru (např. zbytek po `WhyStyromat.tsx`), zkontrolovat `git status` — soubor musí být smazaný a nikde importovaný.

- [ ] **Step 3: Vizuální ověření v prohlížeči**

```bash
npm run dev
```

Otevřít lokální URL a projít:
- Hero: nadpis serifovým fontem, vstupní animace (fade + posun) při načtení, funkční CTA odkazy na `#poptavka` a `#sortiment`.
- Scroll přes `TrustBar`, `Sortiment`, `Gallery`, `WhyUs`, `Process` — každá sekce se má animovaně objevit (stagger) při vstupu do viewportu, ne naráz.
- Hover nad kartami v `Sortiment` a `Gallery` — jemný posun/zvětšení, ne skok.
- Responzivita: zmenšit okno na mobilní šířku (~375px) — hamburger menu v Header funguje, sekce se nerozbíjí.
- `InquiryForm`: vyplnit a odeslat, zkontrolovat success/error stav.
- V DevTools zapnout emulaci `prefers-reduced-motion: reduce` a ověřit, že vstupní animace jsou potlačené nebo výrazně zkrácené (framer-motion toto respektuje automaticky přes `useReducedMotion`, pokud ne, dodatečně to note do finálního review).

- [ ] **Step 4: Smazat starý README odkaz na Bolt (volitelné, pokud již neodpovídá), jinak ponechat**

Zkontrolovat `README.md` — pokud odkazuje na `bolt.new/~/sb1-...` projekt Styromatu, ponechat beze změny (mimo rozsah tohoto plánu), pouze potvrdit, že neobsahuje nic, co by blokovalo build.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx
git commit -m "feat: wire up redesigned sections in App"
```

---

## Poznámka k Supabase prostředí

Pro funkční odeslání formuláře (Task 11, Step 3) musí být nastavené `VITE_SUPABASE_URL` a `VITE_SUPABASE_ANON_KEY` (viz `src/lib/supabase.ts` a `.env` v gitignore). Pokud nejsou nastavené, `npm run dev` poběží, ale odeslání formuláře vrátí chybu ze Supabase klienta — to je mimo rozsah tohoto plánu (existující infrastruktura, beze změny) a neblokuje dokončení redesignu.
