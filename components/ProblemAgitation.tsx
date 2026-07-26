import Reveal from "./Reveal";

const questions = [
  "¿Te ha pasado que el sistema dice que tienes stock... y no está?",
  "¿Te enteras de que falta un producto cuando el cliente ya lo ha pedido?",
  "¿Alguna vez tiras algo por caducado que podrías haber vendido a tiempo?",
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
            <Reveal key={question} delay={index * 90}>
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                >
                  <path
                    d="M10 6.5v4.5M10 14h.01"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="7.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    opacity="0.5"
                  />
                </svg>
                <p className="text-lg font-medium leading-snug text-white sm:text-xl">
                  {question}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
