const faqs = [
  {
    question: "¿Necesito cambiar mi sistema actual?",
    answer: "No, Logia se conecta a lo que ya usas o funciona en paralelo.",
  },
  {
    question: "No llevo nada digitalizado, ¿puedo usarlo igual?",
    answer: "Sí, empezamos con fotos de tus albaranes.",
  },
  {
    question: "¿Cuánto tarda en dar las primeras alertas?",
    answer:
      "Entre 1 y 2 semanas desde que empezamos a recibir tus datos.",
  },
  {
    question: "¿Y si tengo varios almacenes?",
    answer: "Lo hablamos en la llamada, nos adaptamos a tu caso.",
  },
];

export default function Faq() {
  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <div className="mt-10 flex flex-col divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 sm:text-lg">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xl text-amber-600 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
