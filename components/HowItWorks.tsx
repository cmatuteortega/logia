import Reveal from "./Reveal";

const steps = [
  {
    number: "1",
    text: "Nos cuentas cómo llevas el stock hoy — 15 minutos, sin compromiso.",
  },
  {
    number: "2",
    text: "Conectamos o digitalizamos tus datos — CSV, tu software, o fotos de albaranes.",
  },
  {
    number: "3",
    text: "Recibes avisos cuando algo no cuadra — por email o WhatsApp, en lenguaje claro, sin dashboards que interpretar.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-slate-50 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            El proceso
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Cómo funciona
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden border-t border-dashed border-slate-300 sm:block"
          />
          <div className="relative grid gap-8 sm:grid-cols-3 sm:gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 100}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-lg font-bold text-white shadow-sm shadow-amber-600/30">
                    {step.number}
                  </div>
                  <p className="text-base leading-relaxed text-slate-700">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
