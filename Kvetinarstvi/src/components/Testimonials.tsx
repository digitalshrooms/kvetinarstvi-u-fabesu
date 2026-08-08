import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type Testimonial = {
  role: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    role: 'Spokojená zákaznice',
    quote:
      '[DOPLNIT REFERENCI] – sem vložte skutečnou zpětnou vazbu od zákazníka, jakmile ji budete mít.',
  },
  {
    role: 'Pravidelný zákazník',
    quote:
      '[DOPLNIT REFERENCI] – ukázkové místo pro krátkou citaci o zkušenosti s objednávkou.',
  },
  {
    role: 'Nevěsta',
    quote:
      '[DOPLNIT REFERENCI] – například hodnocení svatební výzdoby nebo kytice na klíčovou příležitost.',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-forest-800">
      <div className="container-page py-16 lg:py-24">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-forest-600 bg-forest-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blush-200">
            Reference zákazníků
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            K nám se zákazníci rádi vracejí
          </h2>
          <p className="mt-4 text-lg text-blush-100">
            Ukázkové místo pro reference — jakmile posbíráme první hodnocení,
            nahradíme tento obsah skutečnými citacemi.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.role}
              variants={fadeUp}
              className="flex flex-col rounded-2xl bg-blush-50 p-6"
            >
              <Quote className="h-6 w-6 text-brand-500" strokeWidth={1.5} />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-blush-200 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-xs font-semibold text-white">
                  U F
                </span>
                <span className="text-sm font-semibold text-ink-900">
                  {t.role}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
