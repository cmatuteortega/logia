import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

const plans = [
  {
    name: "VIGILANCIA",
    price: "89",
    recommended: true,
    features: [
      "Recepción por foto",
      "Trazabilidad por lote",
      "Ubicaciones",
      "Control de temperaturas",
      "Alertas de caducidad, faltantes y rotura de stock",
      "Informe mensual",
    ],
  },
  {
    name: "DIAGNÓSTICO",
    price: "179",
    recommended: false,
    features: [
      "Todo lo de Vigilancia",
      "Detección de descuadres entre stock teórico y real",
      "Inventario cíclico guiado",
      "Control de proveedores",
      "Comparativa entre tiendas y traspasos sugeridos",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="precio" className="bg-ink px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="grid gap-6 sm:grid-cols-2 sm:items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl p-8 backdrop-blur sm:p-10 ${
                plan.recommended
                  ? "border-2 border-amber-500 bg-white/5 shadow-xl shadow-amber-600/10"
                  : "border border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                  {plan.name}
                </span>
                {plan.recommended && (
                  <span className="inline-flex items-center rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-ink">
                    Recomendado
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  €{plan.price}
                </span>
                <span className="pb-1.5 text-base text-slate-400">
                  /tienda/mes
                </span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-3 text-left">
                {plan.features.map((feature) => (
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
          ))}
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-sm text-slate-400">
            Usuarios ilimitados. Sin permanencia. Descuento a partir de la
            tercera tienda.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
