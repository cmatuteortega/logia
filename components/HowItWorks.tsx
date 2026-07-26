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
    <section className="bg-slate-50 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Cómo funciona
        </h2>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:gap-6">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-1 flex-col gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-lg font-bold text-white">
                {step.number}
              </div>
              <p className="text-base leading-relaxed text-slate-700">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
