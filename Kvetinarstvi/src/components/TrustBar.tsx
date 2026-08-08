import { motion } from 'framer-motion';
import { flowerTypes } from '@/data/content';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

export default function TrustBar() {
  return (
    <section className="border-y border-blush-200 bg-white">
      <div className="container-page py-10">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-ink-500">
          Nejoblíbenější květiny v naší nabídce
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.06)}
          className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-blush-200 bg-blush-200 sm:grid-cols-3 lg:grid-cols-7"
        >
          {flowerTypes.map((f) => (
            <motion.div
              key={f.name}
              variants={fadeUp}
              className="group flex flex-col items-center justify-center bg-white px-4 py-6 transition-colors hover:bg-blush-50"
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
