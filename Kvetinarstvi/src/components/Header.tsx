import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, Flower2 } from 'lucide-react';

const navLinks = [
  { label: 'Sortiment', href: '#sortiment' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'O nás', href: '#o-nas' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden border-b border-blush-200 bg-forest-900 text-blush-100 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:+420606224796"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-brand-400" />
              +420 606 224 796
            </a>
            <a
              href="mailto:marcelakvetinka@seznam.cz"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-brand-400" />
              marcelakvetinka@seznam.cz
            </a>
            <span className="flex items-center gap-2 text-blush-300">
              <MapPin className="h-3.5 w-3.5 text-brand-400" />
              Hradecká 100, 380 01 Dačice IV
            </span>
          </div>
          <span className="text-blush-300/80">
            Po–Pá 8:00–12:00, 13:00–17:00 · So 8:00–11:00 · Ne zavřeno
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b border-forest-700 bg-forest-900 transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-forest-900/30' : ''
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white">
              <Flower2 className="h-5 w-5" strokeWidth={2.2} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold tracking-tight text-white">
                U Fabešů
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-blush-200">
                Květinářství
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-blush-100 transition-colors hover:text-brand-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#poptavka" className="btn-primary hidden sm:inline-flex">
              Vybrat kytici
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-600 text-white lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-forest-700 bg-forest-900 lg:hidden">
            <nav className="container-page flex flex-col py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-forest-700 py-3 text-sm font-semibold text-blush-100"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#poptavka"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 w-full"
              >
                Vybrat kytici
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
