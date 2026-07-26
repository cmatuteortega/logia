import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

const trustItems = ["Sin compromiso", "15 minutos", "Sin tarjeta"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-slate-900 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-amber-300/30 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
            Vigilancia de stock para pymes
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl">
            Tu almacén te avisa antes de que{" "}
            <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              la fricción te cueste dinero
            </span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Logia detecta discrepancias de stock, roturas antes de que pasen y
            caducidades que se te escapan — conectado a lo que ya usas, o
            directamente desde tus albaranes en papel.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row sm:justify-center">
            <CtaButton className="w-full sm:w-auto" />
            <a
              href="#como-funciona"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-slate-700 transition-colors hover:text-slate-900"
            >
              Ver cómo funciona
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4"
              >
                <path
                  d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="h-4 w-4 text-amber-600"
                >
                  <path
                    d="M3 8.5 6.2 11.5 13 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={320} className="mt-16 w-full max-w-lg">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-2xl shadow-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-semibold text-slate-900">
                Alertas de stock
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                En vivo
              </span>
            </div>
            <ul className="mt-3 flex flex-col gap-1">
              {[
                {
                  tone: "bg-red-500",
                  title: "Riesgo de rotura — Aceite oliva 1L",
                  meta: "Quedan 3 días de cobertura",
                },
                {
                  tone: "bg-amber-500",
                  title: "Discrepancia detectada — Almacén 2",
                  meta: "Sistema dice 40, contadas 31",
                },
                {
                  tone: "bg-slate-300",
                  title: "Caducidad próxima — Lote 0472",
                  meta: "Vence en 6 días",
                },
              ].map((row) => (
                <li
                  key={row.title}
                  className="flex items-start gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-slate-50"
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${row.tone}`}
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800">
                      {row.title}
                    </span>
                    <span className="text-xs text-slate-500">{row.meta}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
