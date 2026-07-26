import Reveal from "./Reveal";

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
    <section id="faq" className="bg-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Dudas comunes
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Preguntas frecuentes
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="flex flex-col divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 transition-colors group-hover:text-amber-700 sm:text-lg">
                  {faq.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 transition-transform duration-200 group-open:rotate-45">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="h-3 w-3"
                    >
                      <path
                        d="M6 1.5v9M1.5 6h9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
