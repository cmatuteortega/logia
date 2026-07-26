const items = [
  {
    title: "Te enteras antes que el cliente",
    text: "Detectamos riesgo de rotura de stock con margen suficiente para reaccionar, no cuando ya has fallado un pedido.",
  },
  {
    title: "Encuentras el hueco antes de la auditoría",
    text: "Cruzamos lo que dice tu sistema con el ritmo real de movimiento y te avisamos cuando algo no cuadra.",
  },
  {
    title: "Cero fricción para empezar",
    text: "Funciona con Excel, con tu software actual, o con fotos de tus albaranes si aún vas en papel. No cambias de sistema, añades una capa de vigilancia.",
  },
];

export default function ValueProps() {
  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed text-slate-600">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
