const questions = [
  "¿Te ha pasado que el sistema dice que tienes stock... y no está?",
  "¿Te enteras de que falta un producto cuando el cliente ya lo ha pedido?",
  "¿Alguna vez tiras algo por caducado que podrías haber vendido a tiempo?",
];

export default function ProblemAgitation() {
  return (
    <section className="bg-slate-900 px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        {questions.map((question) => (
          <p
            key={question}
            className="text-xl font-medium leading-snug text-white sm:text-2xl"
          >
            {question}
          </p>
        ))}
      </div>
    </section>
  );
}
