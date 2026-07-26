"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      stockMethod: formData.get("stockMethod"),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Algo ha ido mal. Inténtalo de nuevo.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Algo ha ido mal. Inténtalo de nuevo.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="text-base font-semibold text-slate-900 sm:text-lg">
          Gracias, te contactamos en menos de 24h para agendar la llamada.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="rounded-md border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="rounded-md border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-medium text-slate-700">
          Teléfono (opcional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="rounded-md border border-slate-300 px-4 py-3 text-base text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/30"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="stockMethod"
          className="text-sm font-medium text-slate-700"
        >
          ¿Cómo llevas hoy tu stock?
        </label>
        <select
          id="stockMethod"
          name="stockMethod"
          required
          defaultValue=""
          className="rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/30"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="software_tpv">Software/TPV</option>
          <option value="excel_csv">Excel o CSV</option>
          <option value="papel">Papel / nada digital</option>
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center rounded-md bg-amber-600 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-amber-700 active:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
