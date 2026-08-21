import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function RelatedArticles({
  articles = [],
  currentSlug,
}) {
  const relatedArticles = articles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, 2);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
              Continue Reading
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              More from CloviraHQ
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              More practical thinking on MSP outbound, commercial
              research, targeting, and pipeline development.
            </p>
          </div>

          <Link
            to="/insights"
            className="inline-flex w-fit items-center text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            View all insights
            <span className="ml-2" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {relatedArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  );
}