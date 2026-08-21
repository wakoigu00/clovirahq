import { Link, useParams } from "react-router-dom";

import articles from "../content/insights/articles";
import ArticleLayout from "../components/insights/ArticleLayout";
import RelatedArticles from "../components/insights/RelatedArticles";
import InsightsCTA from "../components/insights/InsightsCTA";
import SEO from "../components/seo/SEO";

const SITE_URL = "https://clovirahq.com";

function formatArticleDate(dateString) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

export default function InsightArticle() {
  const { slug } = useParams();

  const article = articles.find(
    (item) => item.slug === slug
  );

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 pb-20 pt-32 text-white">
        <SEO
          title="Insight Not Found | CloviraHQ"
          description="The CloviraHQ Insight you're looking for could not be found."
          canonical={`${SITE_URL}/insights/${slug || ""}`}
        />

        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
            Insight not found
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            We couldn't find that article.
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-400">
            The article may have been moved or the URL may be incorrect.
          </p>

          <Link
            to="/insights"
            className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <span className="mr-2" aria-hidden="true">
              &larr;
            </span>
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  const canonicalUrl = `${SITE_URL}/insights/${article.slug}`;

  const publishedTime = formatArticleDate(article.date);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: publishedTime || undefined,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "CloviraHQ",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    url: canonicalUrl,
    articleSection: article.category,
  };

  return (
    <div className="bg-slate-950 text-white">
      <SEO
        title={`${article.title} | CloviraHQ`}
        description={article.excerpt}
        canonical={canonicalUrl}
        type="article"
        publishedTime={publishedTime}
        author={article.author}
        section={article.category}
        structuredData={structuredData}
      />

      <ArticleLayout article={article}>
        {article.content.map((block, index) => {
          if (block.type === "heading") {
            return (
              <h2
                key={`${block.type}-${index}`}
                className="mt-12 text-2xl font-bold tracking-tight text-white first:mt-0 sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === "paragraph") {
            return (
              <p
                key={`${block.type}-${index}`}
                className="mt-6 text-base leading-8 text-slate-300 sm:text-lg"
              >
                {block.text}
              </p>
            );
          }

          return null;
        })}
      </ArticleLayout>

      <RelatedArticles
        articles={articles}
        currentSlug={article.slug}
      />

      <InsightsCTA />
    </div>
  );
}