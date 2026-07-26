import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const STOCK_METHODS = ["software_tpv", "excel_csv", "papel"] as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const stockMethod =
    typeof body.stockMethod === "string" ? body.stockMethod : "";

  if (!name || !email || !stockMethod) {
    return NextResponse.json(
      { error: "Nombre, email y método de stock son obligatorios." },
      { status: 400 },
    );
  }

  if (!STOCK_METHODS.includes(stockMethod as (typeof STOCK_METHODS)[number])) {
    return NextResponse.json(
      { error: "Método de stock no válido." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Email no válido." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error(
      "Supabase no está configurado. Define SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.",
    );
    return NextResponse.json(
      { error: "No se pudo guardar el lead. Inténtalo más tarde." },
      { status: 500 },
    );
  }

  const { error } = await supabase.from("leads").insert({
    name,
    email,
    phone: phone || null,
    stock_method: stockMethod,
  });

  if (error) {
    console.error("Error guardando lead en Supabase:", error);
    return NextResponse.json(
      { error: "No se pudo guardar el lead. Inténtalo más tarde." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
