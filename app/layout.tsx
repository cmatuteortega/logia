import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logia — Tu almacén te avisa antes de que la fricción te cueste dinero",
  description:
    "Logia detecta discrepancias de stock, roturas antes de que pasen y caducidades que se te escapan — conectado a lo que ya usas, o directamente desde tus albaranes en papel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
