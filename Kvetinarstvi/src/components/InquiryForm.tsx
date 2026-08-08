import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { sortimentOptions } from '@/data/content';
import { fadeUp, viewportOnce } from '@/lib/motion';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function InquiryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const materialType = String(data.get('material_type') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email) {
      setStatus('error');
      setErrorMsg('Vyplňte prosím jméno a e-mail.');
      return;
    }

    const { error } = await supabase.from('inquiries').insert({
      name,
      email,
      phone,
      material_type: materialType,
      message,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Odeslání se nezdařilo. Zkuste to prosím znovu nebo nám napište e-mail.');
      return;
    }

    setStatus('success');
    form.reset();
  }

  return (
    <section id="poptavka" className="bg-blush-50">
      <div className="container-page py-16 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-2xl border border-blush-200 bg-white shadow-card lg:grid-cols-5"
        >
          {/* Left panel */}
          <div className="relative flex flex-col justify-between bg-forest-900 p-8 text-white lg:col-span-2 lg:p-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-300">
                Poptávka kytice
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                Objednejte si kytici na míru
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-blush-300">
                Napište nám příležitost, barvy nebo přibližný rozpočet a my
                vám kytici obvykle do 24 hodin svážeme a domluvíme předání.
              </p>
            </div>

            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-blush-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Odpověď obvykle do 24 hodin
              </div>
              <div className="flex items-center gap-2 text-blush-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Nezávazné, bez poplatku
              </div>
              <div className="flex items-center gap-2 text-blush-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                Rozvoz i osobní odběr
              </div>
            </dl>
          </div>

          {/* Form */}
          <div className="p-8 lg:col-span-3 lg:p-10">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-4 text-xl font-bold text-ink-900">
                  Poptávka byla odeslána
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-500">
                  Děkujeme. Vaši poptávku jsme přijali a do 24 hodin se vám
                  ozveme s návrhem kytice a termínem.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-6"
                >
                  Odeslat další poptávku
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Jméno a příjmení" name="name" required />
                  <Field label="E-mail" name="email" type="email" required />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Telefon" name="phone" type="tel" />
                  <div>
                    <label
                      htmlFor="material_type"
                      className="mb-1.5 block text-sm font-semibold text-ink-700"
                    >
                      Co potřebujete
                    </label>
                    <select
                      id="material_type"
                      name="material_type"
                      defaultValue=""
                      className="w-full rounded-lg border border-blush-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="" disabled>
                        Vyberte kategorii…
                      </option>
                      {sortimentOptions.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-semibold text-ink-700"
                  >
                    Zpráva / přání
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Popište příležitost, barvy, rozpočet nebo termín, kdy kytici potřebujete…"
                    className="w-full resize-y rounded-lg border border-blush-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Odesíláme…
                    </>
                  ) : (
                    <>
                      Odeslat poptávku
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-ink-400">
                  Odesláním souhlasíte se zpracováním údajů za účelem vyřízení poptávky.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink-700">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-blush-200 bg-white px-4 py-3 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
