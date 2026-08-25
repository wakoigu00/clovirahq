import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ArticleCard from "../components/insights/ArticleCard";
import InsightsCTA from "../components/insights/InsightsCTA";
import SEO from "../components/seo/SEO";
import { supabase } from "../lib/supabase";

export default function Insights() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadArticles() {
      setLoading(true);
      setError("");

      const { data, error: articlesError } = await supabase
        .from("articles")
        .select(
          "id, title, slug, category, excerpt, author, featured_image, content, seo_title, seo_description, status, featured, published_at, created_at, updated_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!mounted) {
        return;
      }

      if (articlesError) {
        console.error(
          "Public articles loading error:",
          articlesError
        );

        setArticles([]);
        setError(
          articlesError.message ||
            "The article library could not be loaded."
        );
        setLoading(false);
        return;
      }

      setArticles(data || []);
      setLoading(false);
    }

    loadArticles();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredArticle =
    articles.find((article) => article.featured) ||
    articles[0];

  const otherArticles = articles.filter(
    (article) => article.slug !== featuredArticle?.slug
  );

  return (
    <div className="bg-slate-950 text-white">
      <SEO
        title="MSP Outbound Insights | CloviraHQ"
        description="Practical insights on MSP outbound strategy, commercial signals, prospect targeting, personalized outreach, and building predictable sales conversations."
        canonical="https://clovirahq.com/insights"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

          <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8 lg:pt-40">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-400">
              CloviraHQ Insights
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Practical thinking for MSP growth and outbound.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Research-driven ideas on MSP outbound, commercial signals,
              prospect targeting, personalized outreach, and building
              predictable sales conversations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/msp-outbound"
                className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Explore MSP Outbound

                <span className="ml-2" aria-hidden="true">
                  &rarr;
                </span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                About CloviraHQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <section className="border-b border-white/10 bg-slate-950">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-8">
              <h2 className="text-xl font-bold text-white">
                Unable to load insights
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-400">
                The article library could not be loaded.
              </p>

              <p className="mt-4 rounded-lg bg-black/20 px-4 py-3 font-mono text-xs text-red-300">
                {error}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Featured Insight */}
      {!error && loading ? (
        <section className="border-b border-white/10 bg-slate-950">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-slate-400">
              Loading insights...
            </div>
          </div>
        </section>
      ) : !error && featuredArticle ? (
        <section className="border-b border-white/10 bg-slate-950">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                Featured Insight
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Start here
              </h2>
            </div>

            <ArticleCard
              article={featuredArticle}
              featured
            />
          </div>
        </section>
      ) : null}

      {/* All Insights */}
      {!error && (
        <section className="bg-slate-950">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
                Latest Insights
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Ideas worth applying
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Clear frameworks for finding better prospects, identifying
                meaningful commercial changes, and turning research into
                relevant outbound conversations.
              </p>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-slate-400">
                Loading articles...
              </div>
            ) : otherArticles.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {otherArticles.map((article) => (
                  <ArticleCard
                    key={article.id || article.slug}
                    article={article}
                  />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-slate-400">
                More insights are coming soon.
              </div>
            ) : null}
          </div>
        </section>
      )}

      <InsightsCTA />
    </div>
  );
}