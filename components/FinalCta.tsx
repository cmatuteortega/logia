import LeadForm from "./LeadForm";

export default function FinalCta() {
  return (
    <section id="formulario" className="bg-slate-50 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-md">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          ¿Hablamos 15 minutos sobre cómo llevas tu stock?
        </h2>
        <div className="mt-8">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
