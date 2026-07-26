import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section className="bg-white px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:flex-row sm:p-10">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-xl font-serif text-white shadow-sm shadow-amber-600/30">
            &ldquo;
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
              Construido por alguien que ha vivido esto desde dentro
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              Antes de Logia, ayudé a digitalizar y reconciliar inventario en
              almacenes automatizados a gran escala — donde una discrepancia
              no detectada a tiempo cuesta miles de euros al mes. Logia nace
              de traer esa misma vigilancia a la pyme que no tiene ese
              presupuesto.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
