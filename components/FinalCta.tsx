import LeadForm from "./LeadForm";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section
      id="formulario"
      className="bg-gradient-to-b from-slate-50 to-white px-6 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Empecemos
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            ¿Cuánto crees que pierdes al mes? Vamos a averiguarlo.
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
