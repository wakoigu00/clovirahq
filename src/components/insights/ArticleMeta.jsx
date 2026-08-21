export default function ArticleMeta({
  category,
  date,
  readTime,
  author,
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
      {category && (
        <span className="font-medium text-blue-400">
          {category}
        </span>
      )}

      {date && (
        <span>
          {date}
        </span>
      )}

      {readTime && (
        <span>
          {readTime}
        </span>
      )}

      {author && (
        <span>
          By {author}
        </span>
      )}
    </div>
  );
}