import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '@/lib/motion';
import heroKytice from '@/assets/hero-kytice.png';

const perks = [
  'Čerstvé květiny každý den',
  'Ruční vazba na míru',
  'Rozvoz i osobní odběr',
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-forest-900">
      {/* Organic accent blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-forest-600/40 blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.12)}
        className="container-page relative grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:py-24"
      >
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-forest-600 bg-forest-800 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blush-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            Ruční květinová vazba
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Kytice, které vyprávějí příběh —{' '}
            <span className="text-brand-300">čerstvé, ruční, na míru</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-blush-100"
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
              Vybrat kytici
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#sortiment"
              className="btn border border-forest-600 bg-transparent px-5 py-3 text-base text-white hover:bg-forest-800"
            >
              Prohlédnout katalog
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8"
          >
            {perks.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 text-sm font-semibold text-blush-100"
              >
                <CheckCircle2 className="h-5 w-5 text-brand-300" />
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Bouquet photo */}
        <motion.div
          variants={fadeUp}
          className="relative flex aspect-[4/5] w-full items-center justify-center lg:col-span-5"
        >
          <img
            src={heroKytice}
            alt="Ručně vázaná kytice růží U Fabešů"
            className="h-full w-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
