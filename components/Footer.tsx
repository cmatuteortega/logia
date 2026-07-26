import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <Logo mark="light" />
        <p className="text-sm text-slate-400">
          Vigilancia de inventario para pymes con almacén.
        </p>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Logia
        </p>
      </div>
    </footer>
  );
}
