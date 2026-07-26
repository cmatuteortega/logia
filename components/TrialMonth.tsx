import Reveal from "./Reveal";

export default function TrialMonth() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center sm:p-10">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-sm shadow-amber-600/30">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-6 w-6"
            >
              <path
                d="M4 10.5 8 14l8-8.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            El primer mes es un diagnóstico
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            No te pedimos que confíes. Durante un mes medimos lo que pierdes y
            lo que dejas de vender, y te lo enseñamos en euros. Si el número
            no te parece suficiente para pagarnos, no pagas.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
