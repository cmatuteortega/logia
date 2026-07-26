type CtaButtonProps = {
  className?: string;
};

export default function CtaButton({ className = "" }: CtaButtonProps) {
  return (
    <a
      href="#formulario"
      className={`inline-flex items-center justify-center rounded-md bg-amber-600 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-amber-700 active:bg-amber-800 ${className}`}
    >
      Cuéntanos cómo llevas tu stock hoy
    </a>
  );
}
