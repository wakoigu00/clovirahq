export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}) {
  return (
    <div
      className={`
        max-w-3xl
        ${center ? "mx-auto text-center" : ""}
      `}
    >
      {eyebrow && (
        <p
          className="
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-blue-400
          "
        >
          {eyebrow}
        </p>
      )}

      <h2
        className="
          mt-4
          text-3xl
          font-bold
          tracking-tight
          text-white
          md:text-4xl
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            mt-5
            text-lg
            leading-relaxed
            text-slate-300
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}