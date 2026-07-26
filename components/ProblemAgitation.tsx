import Reveal from "./Reveal";

const questions = [
  {
    text: "¿Sabes cuánto tiraste el mes pasado por caducado?",
    icon: (
      <>
        <rect
          x="3"
          y="4.5"
          width="14"
          height="12.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 8.5h14M7 2.5v3M13 2.5v3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    text: "¿Cuántas veces te has quedado sin un producto que creías tener?",
    icon: (
      <path
        d="M3 6.5 10 3l7 3.5-7 3.5-7-3.5Zm0 0v7l7 3.5 7-3.5v-7M10 10v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    text: "¿Cuántas líneas de pedido no pudiste servir la semana pasada?",
    icon: (
      <>
        <rect
          x="5"
          y="4"
          width="10"
          height="13.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="7.5"
          y="2.5"
          width="5"
          height="3"
          rx="1"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 10.5l4 4M12 10.5l-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    text: "¿Cuánto tiempo pierde tu equipo buscando algo que está, pero no aparece?",
    icon: (
      <>
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M9 5.5V9l2.8 1.8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

export default function ProblemAgitation() {
  return (
    <section className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto flex max-w-2xl flex-col">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
            El problema
          </span>
        </Reveal>

        <div className="mt-6 flex flex-col gap-4">
          {questions.map((question, index) => (
            <Reveal key={question.text} delay={index * 90}>
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                >
                  {question.icon}
                </svg>
                <p className="text-lg font-medium leading-snug text-white sm:text-xl">
                  {question.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <p className="mt-8 text-center text-base text-slate-400">
            Casi nadie lo sabe. Se apunta en una libreta, o no se apunta.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
