import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const title =
  "Logia — Tu almacén te avisa antes de que la fricción te cueste dinero";
const description =
  "Logia detecta discrepancias de stock, roturas antes de que pasen y caducidades que se te escapan — conectado a lo que ya usas, o directamente desde tus albaranes en papel.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
