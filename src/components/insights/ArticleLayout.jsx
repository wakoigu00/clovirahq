import { Link } from "react-router-dom";
import ArticleMeta from "./ArticleMeta";

export default function ArticleLayout({ article, children }) {
  if (!article) {
    return null;
  }

  return (
    <article className="bg-slate-950">
      {/* Article Header */}

      <header className="border-b border-white/10">
        <div className="mx-auto max-w-4xl px-5 pb-14 pt-32 sm:px-6 sm:pb-16 lg:px-8 lg:pt-36">
          <Link
            to="/insights"
            className="inline-flex items-center text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <span className="mr-2" aria-hidden="true">
              &larr;
            </span>
            Back to Insights
          </Link>

          <div className="mt-10">
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
              {article.category}
            </span>

            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
              {article.excerpt}
            </p>

            <div className="mt-8">
              <ArticleMeta
                category={article.category}
                date={article.date}
                readTime={article.readTime}
                author={article.author}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Article Body */}

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="prose-clovira">
          {children}
        </div>
      </div>
    </article>
  );
}