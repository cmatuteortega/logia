import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const title = "Logia — Tu stock dice una cosa. La estantería dice otra.";
const description =
  "Logia controla qué entra, en qué condiciones, dónde está y qué falta en tu tienda de alimentación. Caducidades, mermas, faltantes y pedidos que no puedes servir — avisados antes de que te cuesten dinero.";

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
