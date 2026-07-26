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
      businessType: formData.get("businessType"),
      storeCount: formData.get("storeCount"),
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
      <div className="flex flex-col items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-5 w-5"
          >
            <path
              d="M4 10.5 8 14l8-8.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="text-base font-semibold text-slate-900 sm:text-lg">
          Gracias. Te contactamos en menos de 24h para arrancar tu mes de
          diagnóstico.
        </p>
      </div>
    );
  }

  const inputClass =
    "rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition-shadow focus:border-amber-600 focus:bg-white focus:ring-4 focus:ring-amber-600/15";

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
          className={inputClass}
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
          className={inputClass}
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
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="businessType"
          className="text-sm font-medium text-slate-700"
        >
          ¿Qué tipo de negocio tienes?
        </label>
        <select
          id="businessType"
          name="businessType"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="supermercado">
            Supermercado / tienda de alimentación
          </option>
          <option value="especializada">
            Tienda especializada de fresco (carnicería, pescadería,
            quesería...)
          </option>
          <option value="obrador">
            Obrador o productor (panadería, pastelería, conservas...)
          </option>
          <option value="distribuidor">Distribuidor de alimentación</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="storeCount"
          className="text-sm font-medium text-slate-700"
        >
          ¿Cuántas tiendas?
        </label>
        <select
          id="storeCount"
          name="storeCount"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="1">1 tienda</option>
          <option value="2-3">2-3 tiendas</option>
          <option value="4-10">4-10 tiendas</option>
          <option value="10+">Más de 10 tiendas</option>
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-amber-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-600/30 active:translate-y-0 active:bg-amber-800 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 animate-spin"
            >
              <circle
                cx="10"
                cy="10"
                r="7.5"
                stroke="currentColor"
                strokeWidth="2.5"
                opacity="0.25"
              />
              <path
                d="M17.5 10a7.5 7.5 0 0 0-7.5-7.5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Enviando...
          </>
        ) : (
          "Quiero mi diagnóstico"
        )}
      </button>
    </form>
  );
}
