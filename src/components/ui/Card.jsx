export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        transition-all
        duration-300
        hover:border-blue-500/30
        hover:bg-white/[0.07]
        hover:-translate-y-1
        ${className}
      `}
    >
      {children}
    </div>
  );
}