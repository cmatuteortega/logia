import Logo from "./Logo";

const links = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#precio", label: "Precio" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Logia — inicio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#formulario"
          className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-amber-600/20 transition-colors hover:bg-amber-700 active:bg-amber-800"
        >
          Hablemos
        </a>
      </div>
    </header>
  );
}
