import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';
import { easeOut, fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type GalleryItem = {
  title: string;
  gradient: string;
};

const items: GalleryItem[] = [
  { title: 'Svatební kytice', gradient: 'from-brand-200 via-brand-100 to-blush-100' },
  { title: 'Jarní aranžmá', gradient: 'from-sage-200 via-sage-100 to-blush-100' },
  { title: 'Sváteční výzdoba', gradient: 'from-brand-100 via-blush-100 to-sage-100' },
  { title: 'Kytice na přání', gradient: 'from-sage-100 via-brand-100 to-blush-100' },
  { title: 'Pokojové rostliny', gradient: 'from-blush-200 via-sage-100 to-sage-200' },
  { title: 'Smuteční vazba', gradient: 'from-blush-200 via-brand-100 to-brand-200' },
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
              transition={{ duration: 0.25, ease: easeOut }}
              className={`relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-2xl border border-blush-200 bg-gradient-to-br ${item.gradient} p-6 text-center shadow-card`}
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
