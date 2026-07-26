import CtaButton from "./CtaButton";

export default function Pricing() {
  return (
    <section className="bg-slate-900 px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Precio de fundador
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-200 sm:text-xl">
          €49/mes, fijo de por vida para los primeros clientes. Sin
          permanencia, cancela cuando quieras.
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Las primeras 2 semanas son de diagnóstico, sin coste.
        </p>
        <CtaButton className="mt-8 w-full sm:w-auto" />
      </div>
    </section>
  );
}
