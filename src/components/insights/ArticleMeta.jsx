function formatDate(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function calculateReadTime(content, readTime) {
  if (readTime) {
    return readTime;
  }

  if (!content) {
    return "";
  }

  let text = "";

  if (Array.isArray(content)) {
    text = content
      .map((block) => block?.text || "")
      .join(" ");
  } else if (typeof content === "string") {
    text = content;
  }

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (!wordCount) {
    return "";
  }

  const minutes = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  return `${minutes} min read`;
}

export default function ArticleMeta({
  date,
  publishedAt,
  content,
  readTime,
  author,
}) {
  const displayDate = formatDate(
    publishedAt || date
  );

  const displayReadTime = calculateReadTime(
    content,
    readTime
  );

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-400">
      {displayDate && (
        <time dateTime={publishedAt || date}>
          {displayDate}
        </time>
      )}

      {displayDate && displayReadTime && (
        <span
          className="text-slate-600"
          aria-hidden="true"
        >
          •
        </span>
      )}

      {displayReadTime && (
        <span>
          {displayReadTime}
        </span>
      )}

      {author && (
        <>
          {(displayDate || displayReadTime) && (
            <span
              className="text-slate-600"
              aria-hidden="true"
            >
              •
            </span>
          )}

          <span>
            By {author}
          </span>
        </>
      )}
    </div>
  );
}