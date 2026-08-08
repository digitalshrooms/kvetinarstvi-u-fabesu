import { motion } from 'framer-motion';
import { steps } from '@/data/content';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export default function Process() {
  return (
    <section className="bg-forest-900 text-white">
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
              className="relative bg-forest-900 p-8 transition-colors hover:bg-forest-800"
            >
              <span className="font-display text-5xl font-semibold text-brand-400/30">
                {s.number}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-blush-300">
                {s.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-blush-300">
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
