type CtaButtonProps = {
  className?: string;
};

export default function CtaButton({ className = "" }: CtaButtonProps) {
  return (
    <a
      href="#formulario"
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-amber-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-600/30 active:translate-y-0 active:bg-amber-800 ${className}`}
    >
      Cuéntanos cómo llevas tu stock hoy
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
      >
        <path
          d="M3.5 8h9M8.5 3.5 13 8l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
