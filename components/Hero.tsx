import CtaButton from "./CtaButton";

export default function Hero() {
  return (
    <section className="bg-white px-6 pt-14 pb-16 sm:pt-20 sm:pb-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
          Tu almacén te avisa antes de que la fricción te cueste dinero
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
          Logia detecta discrepancias de stock, roturas antes de que pasen y
          caducidades que se te escapan — conectado a lo que ya usas, o
          directamente desde tus albaranes en papel.
        </p>
        <CtaButton className="mt-8 w-full sm:w-auto" />
        <p className="mt-3 text-sm text-slate-500">
          Sin compromiso, 15 minutos.
        </p>
      </div>
    </section>
  );
}
