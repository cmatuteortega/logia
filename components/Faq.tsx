import Reveal from "./Reveal";

const faqs = [
  {
    question: "¿Tengo que cambiar mi TPV?",
    answer: "No. Logia funciona en paralelo a lo que ya usas.",
  },
  {
    question: "Lo llevo todo en papel, ¿me sirve?",
    answer: "Sí. Empezamos con fotos de tus albaranes.",
  },
  {
    question: "¿Cuánto tarda mi equipo en aprender?",
    answer: "Fotografiar un albarán son 10 segundos. No hay formación.",
  },
  {
    question:
      "¿Esto es para controlar mermas o para no quedarme sin stock?",
    answer:
      "Para las dos cosas. Es el mismo problema visto por sus dos caras: un stock que no es fiable.",
  },
  {
    question: "¿Y si tengo varias tiendas?",
    answer:
      "Mejor: es donde más se nota, porque lo que sobra en una suele faltar en otra. Hay descuento por volumen.",
  },
  {
    question: "¿Cuándo empiezo a recibir avisos?",
    answer:
      "Las primeras alertas, en 1-2 semanas. El informe completo, al mes.",
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
