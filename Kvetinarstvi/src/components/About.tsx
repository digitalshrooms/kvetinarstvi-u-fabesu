import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Flower2, Navigation } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/motion';

const contacts = [
  {
    icon: MapPin,
    label: 'Adresa prodejny',
    value: 'Hradecká 100, 380 01 Dačice IV',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+420 606 224 796',
    href: 'tel:+420606224796',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'marcelakvetinka@seznam.cz',
    href: 'mailto:marcelakvetinka@seznam.cz',
  },
  {
    icon: Clock,
    label: 'Otevírací doba',
    value: 'Po–Pá 8:00–12:00, 13:00–17:00 · So 8:00–11:00 · Ne zavřeno',
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
                Květinářství U Fabešů vážeme kytice a staráme se o výzdobu
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

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-blush-200 bg-blush-50 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white">
                <Flower2 className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink-900">
                  IČO [DOPLNIT] · DIČ [DOPLNIT]
                </p>
                <p className="text-xs text-ink-500">
                  Květinářství U Fabešů, Hradecká 100, 380 01 Dačice IV
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
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-blush-200 bg-blush-200 sm:grid-cols-2">
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
                    className="flex items-start gap-3 bg-white p-5 transition-colors hover:bg-blush-50"
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

            {/* Map placeholder — nahraďte po doplnění reálné adresy skutečnou mapou */}
            <div className="mt-6 flex h-72 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-blush-200 bg-blush-100 text-center">
              <Navigation className="h-6 w-6 text-brand-500" />
              <p className="text-sm font-semibold text-ink-700">Mapa bude doplněna</p>
              <p className="max-w-xs text-xs text-ink-400">
                Po zadání reálné adresy prodejny sem vložte mapu nebo odkaz na navigaci.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
