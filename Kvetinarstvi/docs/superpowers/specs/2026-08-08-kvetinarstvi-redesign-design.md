# Redesign webu Květinářství U Fábesů

Datum: 2026-08-08

## Kontext a problém

Repozitář `digitalshrooms/kvetinarstvi-u-fabesu` je technicky funkční (Vite + React 18 + TypeScript + Tailwind CSS + Supabase klient), ale veškerý obsah, texty, kategorie sortimentu, barevná paleta a branding patří jiné firmě — "Styromat", prodejci stavebních a technických izolací (minerální vlna, Rockwool, K-Flex apod.). Nic z toho se nehodí pro květinářství.

Cíl: zachovat funkční technický základ (React/Vite/Tailwind/Supabase), ale kompletně přepsat vizuální design a veškerý obsah tak, aby web reprezentoval Květinářství U Fábesů — kamenné květinářství s prodejem řezaných květin, svatební a smuteční výzdobou, pokojovými rostlinami a rozvozem/poptávkovým formulářem.

## Průzkum konkurence (shrnutí)

Prémiové floristické weby (viz Colorlib "Best Florist Websites 2026", WebCitz, Sitebuilderreport) sdílejí:
- Serifovou typografii na nadpisech, kombinovanou s čistým sans textem.
- Velkoplošnou, celoškálovou fotografii květin jako hlavní nosič emoce.
- Pastelovou/organickou paletu barev (krémová, blush, zelená), ne firemní "korporátní" barvy.
- Portfolio/galerii realizací jako těžiště webu (ne jen katalog).
- Hladký, jednoduchý objednávkový/poptávkový flow bez zbytečných kroků.

Tento web se drží směru "romantický/květinový editorial" — elegantní, ženský, s důrazem na fotografii a jemný pohyb.

## Rozsah

**V rozsahu:**
- Kompletní přepis obsahu (`src/data/content.ts`) a všech komponent v `src/components/` pro téma květinářství.
- Nová vizuální identita: barevná paleta, typografie, tvarosloví (zaoblené karty, organické tvary místo architektonické mřížky).
- Sekce: Header, Hero, USP pruh, Sortiment (Řezané kytice / Svatby & akce / Pokojové rostliny / Rozvoz), Galerie realizací, Jak funguje objednávka, Poptávkový formulář, O nás, Patička.
- Animace v duchu principů Emila Kowalského (scroll-reveal, staggering, mikro-interakce, custom easing, přiměřené trvání) instalací a použitím `npx skills add emilkowalski/skills` a `npx skills add pbakaus/impeccable` (+ `/impeccable init`).
- Knihovna `framer-motion` pro animace.
- Placeholder kontaktní údaje (telefon, adresa, e-mail, otevírací doba) jasně označené k doplnění.

**Mimo rozsah:**
- Reálný e-shop s košíkem a online platbou (Stripe apod.) — pouze katalog + poptávkový/objednávkový formulář bez platby, v souladu s rozhodnutím uživatele.
- Napojení na reálná data v Supabase nad rámec současného stavu (formulář může nadále ukládat poptávky do Supabase jako dnes, ale bez nového datového modelu pro objednávky/sklad).
- Skutečné fotografie — použijí se placeholder/stock obrázky nebo CSS/SVG ilustrace tam, kde reálné fotky chybí.
- Vícejazyčnost (web zůstává pouze v češtině, jako dosud).

## Architektura a komponenty

Zachovává se stávající kostra `App.tsx` (Header → Hero → sekce → Footer), protože je funkční a dobře oddělená. Každá komponenta v `src/components/` se přepisuje samostatně:

| Komponenta | Dnešní obsah (Styromat) | Nový obsah (Fábesovi) |
|---|---|---|
| `Header.tsx` | Kontakt, nav na sortiment izolací | Kontakt, nav (Sortiment, Svatby, O nás, Kontakt) |
| `Hero.tsx` | Nabídka izolačních materiálů | Hlavní vizuál kytice/vazby, CTA na poptávku a sortiment |
| `TrustBar.tsx` | Sklad, doprava, poradenství | Čerstvost, ruční vazba, rozvoz, spokojení zákazníci |
| `Sortiment.tsx` | 6 kategorií izolací | 4 kategorie: Řezané kytice, Svatby & akce, Pokojové rostliny, Rozvoz |
| `WhyStyromat.tsx` | Proč Styromat | Přejmenovat/přepsat na "Proč U Fábesů" |
| `Process.tsx` | 3 kroky objednávky materiálu | 3 kroky poptávky/objednávky kytice |
| `InquiryForm.tsx` | Poptávka materiálu | Poptávka/objednávka kytice (příležitost, rozpočet, datum) |
| `About.tsx` | O firmě Styromat | O rodinném květinářství |
| `Footer.tsx` | Kontakt, odkazy | Kontakt, odkazy, otevírací doba |

Nově přidaná sekce: **Galerie realizací** (grid fotografií s hover efektem) — vloží se mezi Sortiment a Process.

`content.ts` se přepíše: `categories`, `brands` (nahradit něčím jako "oblíbené druhy květin" nebo odstranit, pokud nedává smysl), `steps`, `materialOptions` → `sortimentOptions`.

## Vizuální identita

- **Paleta (Tailwind config):** krémová báze `#FDFBF7`/`#FAF6F0`, blush růžová jako primární akcent (nahrazuje `brand.*` oranžovou), tlumená sage zelená jako sekundární barva, tmavá bordó/terakota pro CTA tlačítka, `ink` škála zůstává (tmavě antracitová pro text).
- **Typografie:** display serif (Fraunces nebo Playfair Display) pro `h1`–`h3`, stávající Plus Jakarta Sans pro běžný text a UI.
- **Tvarosloví:** větší border-radius na kartách a tlačítkách, organické/měkké tvary a jemné texturované pozadí místo architektonické mřížky v Hero.

## Animace

Instalují se dva externí skill balíčky přes `npx skills add emilkowalski/skills` a `npx skills add pbakaus/impeccable`, následně `/impeccable init` pro nastavení design kontextu. Použije se `framer-motion`:
- Scroll-reveal se staggerem pro karty sortimentu a galerii.
- Jemné fade/posun v Hero při načtení stránky.
- Mikro-interakce na hover u karet a tlačítek (transform + shadow, ne generický opacity fade).
- Custom easing křivky (ne CSS `ease`/`linear` výchozí), krátké trvání (~150–300ms) pro UI odezvy, delší (~400–600ms) pro velké obsahové přechody.
- Respektovat `prefers-reduced-motion`.

## Data a placeholdery

Telefon, e-mail, adresa a otevírací doba budou ve `content.ts` a komponentách označeny jednoznačně (např. `+420 XXX XXX XXX`, `[DOPLNIT ULICE], [DOPLNIT MĚSTO]`) tak, aby šly snadno najít a nahradit. Formulář (`InquiryForm.tsx`) zůstává napojený na Supabase stejným způsobem jako dnes (uloží poptávku do existující tabulky, případně přejmenované/rozšířené migrace).

## Testování / ověření

- `npm run typecheck` a `npm run lint` musí procházet.
- `npm run build` musí projít bez chyb.
- Vizuální kontrola v prohlížeči (dev server) — hero, sortiment, galerie, formulář, responsivita mobil/desktop.
- Manuální kontrola animací (spuštění, hover, scroll) a `prefers-reduced-motion` chování.
