import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/content';
import { easeOut, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export default function Sortiment() {
  return (
    <section id="sortiment" className="bg-blush-50">
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
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: easeOut }}
                className="card group flex flex-col overflow-hidden hover:shadow-cardHover hover:border-brand-300"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-forest-100 via-blush-100 to-brand-100">
                  <Icon className="h-10 w-10 text-forest-700/40" strokeWidth={1.5} />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-ink-900">{c.title}</h3>
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
                    className="btn-primary mt-6 w-full text-sm"
                  >
                    Objednat
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
