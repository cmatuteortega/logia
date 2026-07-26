import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

const features = [
  "Alertas ilimitadas por email o WhatsApp",
  "Conecta con tu sistema actual, Excel o papel",
  "2 semanas de diagnóstico sin coste",
  "Sin permanencia, cancela cuando quieras",
];

export default function Pricing() {
  return (
    <section id="precio" className="bg-ink px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur sm:p-10">
          <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-400">
            Precio de fundador
          </span>

          <div className="mt-6 flex items-end justify-center gap-1">
            <span className="text-5xl font-bold tracking-tight text-white">
              €49
            </span>
            <span className="pb-1.5 text-base text-slate-400">/mes</span>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Fijo de por vida para los primeros clientes.
          </p>

          <ul className="mt-8 flex flex-col gap-3 text-left">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-400"
                >
                  <path
                    d="M4 10.5 8 14l8-8.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm leading-relaxed text-slate-200">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <CtaButton className="mt-8 w-full" />
        </div>
      </Reveal>
    </section>
  );
}
