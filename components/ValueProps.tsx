import Reveal from "./Reveal";

const lossGroup = [
  {
    title: "Antes de que caduque",
    text: "Cada mañana, la lista de lo que está a punto de caducar — ordenada por los euros que tienes en riesgo, no por fecha.",
    icon: (
      <>
        <rect
          x="3"
          y="4.5"
          width="14"
          height="12.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3 8.5h14M7 2.5v3M13 2.5v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Antes de que se rompa",
    text: "Si una cámara lleva horas fuera de rango, te decimos cuánto género hay dentro y cuánto vale.",
    icon: (
      <path
        d="M9 3.5v9.3a3 3 0 1 0 2 0V3.5a1 1 0 0 0-2 0Z M7.5 6h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Antes de que se pierda",
    text: "Registro de mermas en dos toques, con el motivo, valorado en euros automáticamente.",
    icon: (
      <path
        d="M4 6h12M8 6V4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V6m-7 0 .8 9.2A1.5 1.5 0 0 0 7.3 16.5h5.4a1.5 1.5 0 0 0 1.5-1.3L15 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const salesGroup = [
  {
    title: "Antes de que falte",
    text: "Avisamos cuando un producto se va a agotar antes de que llegue el siguiente pedido.",
    icon: (
      <path
        d="M3 6.5 10 3l7 3.5-7 3.5-7-3.5Zm0 0v7l7 3.5 7-3.5v-7M10 10v7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Antes de fallar un pedido",
    text: "Detectamos qué líneas no vas a poder servir, con tiempo para reaccionar en vez de dar explicaciones.",
    icon: (
      <>
        <rect
          x="5"
          y="4"
          width="10"
          height="13.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="7.5"
          y="2.5"
          width="5"
          height="3"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 10.5l4 4M12 10.5l-4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Antes de perder media hora buscando",
    text: "Cada producto tiene su ubicación registrada. Escaneas la balda y sabes qué debería haber ahí.",
    icon: (
      <>
        <path
          d="M10 17s5.5-4.9 5.5-9A5.5 5.5 0 0 0 4.5 8c0 4.1 5.5 9 5.5 9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      </>
    ),
  },
];

function Group({
  label,
  items,
  delayOffset,
}: {
  label: string;
  items: typeof lossGroup;
  delayOffset: number;
}) {
  return (
    <div>
      <Reveal delay={delayOffset}>
        <h3 className="text-lg font-bold text-slate-900">{label}</h3>
      </Reveal>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={delayOffset + (index + 1) * 90}>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:gap-4 sm:p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 sm:h-10 sm:w-10">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                >
                  {item.icon}
                </svg>
              </span>
              <h4 className="text-sm font-semibold text-slate-900 sm:text-lg">
                {item.title}
              </h4>
              <p className="text-xs leading-relaxed text-slate-600 sm:text-base">
                {item.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function ValueProps() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Dos caras del mismo problema
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Lo que pierdes y lo que no vendes
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-12">
          <Group label="Lo que pierdes" items={lossGroup} delayOffset={0} />
          <Group label="Lo que no vendes" items={salesGroup} delayOffset={90} />
        </div>

        <Reveal delay={180}>
          <p className="mt-12 text-center text-base font-medium text-slate-500">
            Todo sale del mismo sitio: un stock en el que se puede confiar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
