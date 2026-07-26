import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section className="bg-slate-50 px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:p-10">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-xl font-serif text-white shadow-sm shadow-amber-600/30">
            &ldquo;
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Construido por alguien que ha vivido esto desde dentro
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Antes de Logia trabajé en la reconciliación de inventario de
              almacenes automatizados de gran distribución, donde una
              discrepancia no detectada cuesta miles de euros al mes. Logia
              trae ese mismo control a la tienda que no tiene ese presupuesto.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
