import Reveal from "./Reveal";

const items = [
  {
    title: "Te enteras antes que el cliente",
    text: "Detectamos riesgo de rotura de stock con margen suficiente para reaccionar, no cuando ya has fallado un pedido.",
    icon: (
      <path
        d="M10 3 3 6.5v3.7c0 4.3 2.9 8 7 8.8 4.1-.8 7-4.5 7-8.8V6.5L10 3Zm-2.2 7.3 1.7 1.7 3.5-3.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Encuentras el hueco antes de la auditoría",
    text: "Cruzamos lo que dice tu sistema con el ritmo real de movimiento y te avisamos cuando algo no cuadra.",
    icon: (
      <>
        <circle
          cx="9"
          cy="9"
          r="5.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M13.2 13.2 17 17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Cero fricción para empezar",
    text: "Funciona con Excel, con tu software actual, o con fotos de tus albaranes si aún vas en papel. No cambias de sistema, añades una capa de vigilancia.",
    icon: (
      <path
        d="M11.5 2.5 4 12h5l-1 5.5L16 8h-5l.5-5.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    ),
  },
];

export default function ValueProps() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Por qué Logia
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Todo lo que necesitas para dormir tranquilo
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-5 w-5"
                  >
                    {item.icon}
                  </svg>
                </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
