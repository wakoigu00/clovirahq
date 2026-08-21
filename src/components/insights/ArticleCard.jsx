import { Link } from "react-router-dom";
import ArticleMeta from "./ArticleMeta";

export default function ArticleCard({ article, featured = false }) {
  if (!article) {
    return null;
  }

  return (
    <article
      className={`
        group
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-slate-900/60
        transition
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/30
        hover:bg-slate-900
        ${
          featured
            ? "lg:grid lg:grid-cols-[1.15fr_1fr]"
            : ""
        }
      `}
    >
      {/* Visual / Featured Area */}

      {featured && (
        <div
          className="
            relative
            min-h-[280px]
            overflow-hidden
            bg-gradient-to-br
            from-blue-600/20
            via-slate-900
            to-slate-950
            p-8
            sm:p-10
            lg:min-h-full
          "
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex h-full min-h-[220px] flex-col justify-between">
            <span className="inline-flex w-fit rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
              Featured Insight
            </span>

            <div className="mt-10">
              <div className="mb-5 h-px w-16 bg-blue-500/60" />

              <p className="max-w-sm text-sm leading-7 text-slate-400">
                Practical thinking on MSP growth, outbound strategy,
                commercial research, and creating qualified sales
                conversations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}

      <div className="flex flex-col p-7 sm:p-8">
        <ArticleMeta
          category={article.category}
          date={article.date}
          readTime={article.readTime}
          author={article.author}
        />

        <h2
          className={`
            mt-5
            font-bold
            tracking-tight
            text-white
            transition
            duration-300
            group-hover:text-blue-300
            ${
              featured
                ? "text-2xl leading-tight sm:text-3xl"
                : "text-xl leading-snug"
            }
          `}
        >
          {article.title}
        </h2>

        <p className="mt-4 flex-1 text-sm leading-7 text-slate-400 sm:text-base">
          {article.excerpt}
        </p>

        <div className="mt-7">
          <Link
            to={`/insights/${article.slug}`}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-blue-400
              transition
              hover:text-blue-300
            "
          >
            Read insight
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}