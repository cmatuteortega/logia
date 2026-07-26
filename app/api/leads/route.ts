import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const BUSINESS_TYPES = [
  "supermercado",
  "especializada",
  "obrador",
  "distribuidor",
] as const;

const STORE_COUNTS = ["1", "2-3", "4-10", "10+"] as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const businessType =
    typeof body.businessType === "string" ? body.businessType : "";
  const storeCount =
    typeof body.storeCount === "string" ? body.storeCount : "";

  if (!name || !email || !businessType || !storeCount) {
    return NextResponse.json(
      {
        error:
          "Nombre, email, tipo de negocio y número de tiendas son obligatorios.",
      },
      { status: 400 },
    );
  }

  if (
    !BUSINESS_TYPES.includes(businessType as (typeof BUSINESS_TYPES)[number])
  ) {
    return NextResponse.json(
      { error: "Tipo de negocio no válido." },
      { status: 400 },
    );
  }

  if (!STORE_COUNTS.includes(storeCount as (typeof STORE_COUNTS)[number])) {
    return NextResponse.json(
      { error: "Número de tiendas no válido." },
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
    business_type: businessType,
    store_count: storeCount,
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
