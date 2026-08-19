import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  href,
  variant = "primary",
  icon = true,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-1 shadow-xl shadow-blue-600/30",

    secondary:
      "border border-white/10 bg-white/5 text-white hover:bg-white/10",

    ghost:
      "text-white hover:text-blue-400",
  };

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}

      {icon && <ArrowRight size={18} />}
    </a>
  );
}