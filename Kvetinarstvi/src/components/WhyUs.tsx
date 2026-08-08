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
    <section id="proc-my" className="bg-blush-50">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Proč U Fabešů</span>
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
                className="relative rounded-2xl border border-blush-200 bg-white p-7"
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
