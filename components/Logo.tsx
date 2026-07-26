type LogoProps = {
  className?: string;
  mark?: "light" | "dark";
};

export default function Logo({ className = "", mark = "dark" }: LogoProps) {
  const textColor = mark === "dark" ? "text-slate-900" : "text-white";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 shadow-sm shadow-amber-600/30">
        <span className="h-2.5 w-2.5 rounded-[3px] bg-white" />
      </span>
      <span className={`text-lg font-semibold tracking-tight ${textColor}`}>
        Logia
      </span>
    </span>
  );
}
