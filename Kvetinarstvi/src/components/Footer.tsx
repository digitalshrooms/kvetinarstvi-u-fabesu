import { Flower2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { categories } from '@/data/content';

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-forest-900 text-blush-300">
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
                  U Fabešů
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wider text-blush-300">
                  Květinářství
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-blush-300">
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
                    className="text-blush-300 transition-colors hover:text-brand-400"
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
                <span className="text-blush-300">
                  Hradecká 100<br />380 01 Dačice IV
                </span>
              </li>
              <li>
                <a
                  href="tel:+420606224796"
                  className="flex items-center gap-2.5 text-blush-300 transition-colors hover:text-brand-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-400" />
                  +420 606 224 796
                </a>
              </li>
              <li>
                <a
                  href="mailto:marcelakvetinka@seznam.cz"
                  className="flex items-center gap-2.5 text-blush-300 transition-colors hover:text-brand-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-400" />
                  marcelakvetinka@seznam.cz
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span className="text-blush-300">
                  Po–Pá 8:00–12:00, 13:00–17:00<br />So 8:00–11:00 · Ne zavřeno
                </span>
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

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-blush-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Květinářství U Fabešů · IČO [DOPLNIT] · DIČ [DOPLNIT]
          </p>
          <p>Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}
