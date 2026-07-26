import Reveal from "./Reveal";

const steps = [
  {
    number: "1",
    title: "Fotografías el albarán",
    text: "Cuando llega el pedido. Nosotros sacamos productos, cantidades, lotes y caducidades.",
  },
  {
    number: "2",
    title: "Registras salidas y mermas",
    text: "En dos toques, escaneando. Con el motivo.",
  },
  {
    number: "3",
    title: "Recibes los avisos",
    text: "En el móvil, y un informe mensual que te dice cuánto has perdido, cuánto has dejado de vender y dónde.",
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
                  <h3 className="text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={300}>
          <p className="mt-10 text-center text-sm text-slate-500">
            Sin cambiar de TPV. Sin instalar equipos. Funciona aunque hoy lo
            lleves todo en papel.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
