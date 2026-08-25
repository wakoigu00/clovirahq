import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ArticleLayout from "../components/insights/ArticleLayout";
import RelatedArticles from "../components/insights/RelatedArticles";
import InsightsCTA from "../components/insights/InsightsCTA";
import SEO from "../components/seo/SEO";
import { supabase } from "../lib/supabase";

const SITE_URL = "https://clovirahq.com";

/* =========================================================
   DATE HELPERS
========================================================= */

function formatArticleDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatArticleDateISO(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

/* =========================================================
   MARKDOWN CLEANING
========================================================= */

function cleanMarkdown(text) {
  if (text === null || text === undefined) {
    return "";
  }

  return String(text)
    .replace(/\\\*\\\*/g, "**")
    .replace(/\\__/g, "__")
    .replace(/\\-/g, "-")
    .replace(/\\#/g, "#")
    .replace(/\\`/g, "`")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
}

/* =========================================================
   INLINE MARKDOWN
========================================================= */

function renderInlineMarkdown(text) {
  const cleaned = cleanMarkdown(text);

  if (!cleaned) {
    return null;
  }

  const parts = [];
  let remaining = cleaned;
  let key = 0;

  /*
   * Supported inline Markdown:
   *
   * **bold**
   * __bold__
   * `code`
   */
  const pattern =
    /(\*\*([\s\S]+?)\*\*|__([\s\S]+?)__|`([^`]+)`)/;

  while (remaining.length > 0) {
    const match = remaining.match(pattern);

    if (!match) {
      parts.push(
        <span key={`text-${key++}`}>
          {remaining}
        </span>
      );

      break;
    }

    const index = match.index ?? 0;

    if (index > 0) {
      parts.push(
        <span key={`text-${key++}`}>
          {remaining.slice(0, index)}
        </span>
      );
    }

    if (match[2]) {
      parts.push(
        <strong
          key={`bold-${key++}`}
          className="font-semibold text-white"
        >
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(
        <strong
          key={`bold-${key++}`}
          className="font-semibold text-white"
        >
          {match[3]}
        </strong>
      );
    } else if (match[4]) {
      parts.push(
        <code
          key={`code-${key++}`}
          className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-slate-200"
        >
          {match[4]}
        </code>
      );
    }

    remaining = remaining.slice(
      index + match[0].length
    );
  }

  return parts;
}

/* =========================================================
   BLOCK HELPERS
========================================================= */

function createHeading(text, level = 2) {
  const cleaned = cleanMarkdown(text)
    .replace(/^#{1,6}\s+/, "")
    .trim();

  if (!cleaned) {
    return null;
  }

  if (level === 3) {
    return {
      type: "subheading",
      level: 3,
      text: cleaned,
    };
  }

  return {
    type: "heading",
    level: 2,
    text: cleaned,
  };
}

function createList(items) {
  const cleanedItems = items
    .map((item) =>
      cleanMarkdown(item)
        .replace(/^[-*+]\s+/, "")
        .trim()
    )
    .filter(Boolean);

  if (!cleanedItems.length) {
    return null;
  }

  return {
    type: "list",
    items: cleanedItems,
  };
}

function createParagraph(lines) {
  const text = lines
    .map((line) => cleanMarkdown(line))
    .join("\n")
    .trim();

  if (!text) {
    return null;
  }

  return {
    type: "paragraph",
    text,
  };
}

/* =========================================================
   MARKDOWN STRING PARSER
========================================================= */

function parseMarkdownString(content) {
  const cleanedContent = cleanMarkdown(content).trim();

  if (!cleanedContent) {
    return [];
  }

  const lines = cleanedContent.split("\n");

  const blocks = [];

  let paragraphLines = [];
  let listItems = [];

  function flushParagraph() {
    if (!paragraphLines.length) {
      return;
    }

    const paragraph =
      createParagraph(paragraphLines);

    if (paragraph) {
      blocks.push(paragraph);
    }

    paragraphLines = [];
  }

  function flushList() {
    if (!listItems.length) {
      return;
    }

    const list = createList(listItems);

    if (list) {
      blocks.push(list);
    }

    listItems = [];
  }

  for (const rawLine of lines) {
    const line = cleanMarkdown(rawLine).trim();

    /*
     * Blank line.
     */
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    /*
     * H3
     */
    if (/^###\s+/.test(line)) {
      flushParagraph();
      flushList();

      const heading = createHeading(
        line,
        3
      );

      if (heading) {
        blocks.push(heading);
      }

      continue;
    }

    /*
     * H2
     */
    if (/^##\s+/.test(line)) {
      flushParagraph();
      flushList();

      const heading = createHeading(
        line,
        2
      );

      if (heading) {
        blocks.push(heading);
      }

      continue;
    }

    /*
     * H1 becomes H2 because the article title
     * is already rendered as the page H1.
     */
    if (/^#\s+/.test(line)) {
      flushParagraph();
      flushList();

      const heading = createHeading(
        line,
        2
      );

      if (heading) {
        blocks.push(heading);
      }

      continue;
    }

    /*
     * Bullet list.
     *
     * Supports:
     *
     * - item
     * * item
     * + item
     */
    if (/^[-*+]\s+/.test(line)) {
      flushParagraph();

      listItems.push(
        line
          .replace(/^[-*+]\s+/, "")
          .trim()
      );

      continue;
    }

    /*
     * Normal text.
     */
    flushList();

    paragraphLines.push(rawLine);
  }

  flushParagraph();
  flushList();

  return blocks;
}

/* =========================================================
   OBJECT BLOCK NORMALIZATION
========================================================= */

function normalizeBlock(block) {
  if (!block) {
    return null;
  }

  /*
   * String block.
   */
  if (typeof block === "string") {
    const parsed =
      parseMarkdownString(block);

    if (parsed.length === 1) {
      return parsed[0];
    }

    if (parsed.length > 1) {
      return {
        type: "fragment",
        blocks: parsed,
      };
    }

    return null;
  }

  /*
   * Object block.
   */
  if (typeof block === "object") {
    /*
     * Explicit list object.
     */
    if (
      block.type === "list" ||
      block.type === "bullet-list" ||
      block.type === "bulleted-list"
    ) {
      const items = Array.isArray(
        block.items
      )
        ? block.items
        : [];

      return createList(items);
    }

    const rawText =
      block.text ??
      block.content ??
      block.value ??
      "";

    const text = cleanMarkdown(rawText);

    if (!text.trim()) {
      return null;
    }

    const rawType = String(
      block.type || "paragraph"
    ).toLowerCase();

    const level = Number(
      block.level
    );

    /*
     * Explicit H3.
     */
    if (
      rawType === "subheading" ||
      rawType === "h3" ||
      level === 3
    ) {
      return createHeading(
        text,
        3
      );
    }

    /*
     * Explicit H2.
     */
    if (
      rawType === "heading" ||
      rawType === "h2" ||
      level === 2
    ) {
      return createHeading(
        text,
        2
      );
    }

    /*
     * Explicit H1 becomes H2.
     */
    if (
      rawType === "h1" ||
      level === 1
    ) {
      return createHeading(
        text,
        2
      );
    }

    /*
     * If an object contains Markdown,
     * parse it normally.
     */
    const parsed =
      parseMarkdownString(text);

    if (parsed.length === 1) {
      return parsed[0];
    }

    if (parsed.length > 1) {
      return {
        type: "fragment",
        blocks: parsed,
      };
    }

    return {
      type: "paragraph",
      text,
    };
  }

  return null;
}

/* =========================================================
   CONTENT NORMALIZATION
========================================================= */

function normalizeContent(content) {
  if (!content) {
    return [];
  }

  /*
   * Supabase JSON stored as a string.
   */
  if (typeof content === "string") {
    const trimmed =
      content.trim();

    if (!trimmed) {
      return [];
    }

    /*
     * Attempt JSON parsing first.
     */
    try {
      const parsed =
        JSON.parse(trimmed);

      /*
       * JSON array.
       */
      if (Array.isArray(parsed)) {
        return normalizeContent(
          parsed
        );
      }

      /*
       * JSON object.
       */
      if (
        parsed &&
        typeof parsed === "object"
      ) {
        const normalized =
          normalizeBlock(parsed);

        if (!normalized) {
          return [];
        }

        if (
          normalized.type ===
          "fragment"
        ) {
          return normalized.blocks;
        }

        return [normalized];
      }
    } catch {
      /*
       * Not JSON.
       * Treat it as Markdown.
       */
    }

    return parseMarkdownString(
      trimmed
    );
  }

  /*
   * JSON array.
   */
  if (Array.isArray(content)) {
    const normalized = [];

    for (const block of content) {
      const result =
        normalizeBlock(block);

      if (!result) {
        continue;
      }

      if (
        result.type ===
        "fragment"
      ) {
        normalized.push(
          ...result.blocks
        );
      } else {
        normalized.push(result);
      }
    }

    return normalized;
  }

  /*
   * Single object.
   */
  if (
    typeof content === "object"
  ) {
    const result =
      normalizeBlock(content);

    if (!result) {
      return [];
    }

    if (
      result.type ===
      "fragment"
    ) {
      return result.blocks;
    }

    return [result];
  }

  return [];
}

/* =========================================================
   READ TIME
========================================================= */

function calculateReadTime(content) {
  if (!content) {
    return "";
  }

  const normalizedContent =
    Array.isArray(content)
      ? content
      : normalizeContent(content);

  const text =
    normalizedContent
      .map((block) => {
        if (!block) {
          return "";
        }

        if (
          block.type === "list"
        ) {
          return Array.isArray(
            block.items
          )
            ? block.items.join(" ")
            : "";
        }

        return block.text || "";
      })
      .join(" ");

  const wordCount = text
    .replace(/[#*_`]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;

  if (!wordCount) {
    return "";
  }

  const minutes = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  return `${minutes} min read`;
}

/* =========================================================
   PUBLIC ARTICLE PAGE
========================================================= */

export default function InsightArticle() {
  const { slug } = useParams();

  const [article, setArticle] =
    useState(null);

  const [
    relatedArticles,
    setRelatedArticles,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  /* =======================================================
     LOAD ARTICLE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadArticle() {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (!mounted) {
        return;
      }

      if (error || !data) {
        console.error(
          "Public article loading error:",
          error
        );

        setArticle(null);
        setRelatedArticles([]);
        setLoading(false);

        return;
      }

      const articleDate =
        data.published_at ||
        data.created_at ||
        data.date ||
        null;

      const normalizedContent =
        normalizeContent(
          data.content
        );

      const articleReadTime =
        calculateReadTime(
          normalizedContent
        );

      const normalizedArticle = {
        ...data,
        content:
          normalizedContent,
        date:
          formatArticleDate(
            articleDate
          ),
        publishedTime:
          formatArticleDateISO(
            articleDate
          ),
        readTime:
          articleReadTime,
      };

      setArticle(
        normalizedArticle
      );

      /* =====================================================
         RELATED ARTICLES
      ===================================================== */

      /*
       * The old test article is deliberately excluded.
       */
      let relatedQuery =
        supabase
          .from("articles")
          .select("*")
          .eq(
            "status",
            "published"
          )
          .neq(
            "slug",
            data.slug
          )
          .neq(
            "slug",
            "test-markdown-rendering"
          )
          .neq(
            "slug",
            "publishing-workflow-test"
          )
          .order(
            "published_at",
            {
              ascending: false,
            }
          )
          .limit(3);

      /*
       * Prefer same-category articles.
       */
      if (data.category) {
        relatedQuery =
          relatedQuery.eq(
            "category",
            data.category
          );
      }

      const {
        data: relatedData,
        error: relatedError,
      } = await relatedQuery;

      if (!mounted) {
        return;
      }

      if (relatedError) {
        console.error(
          "Related articles loading error:",
          relatedError
        );

        setRelatedArticles([]);
      } else {
        const normalizedRelated =
          (
            relatedData || []
          ).map(
            (relatedArticle) => {
              const relatedDate =
                relatedArticle.published_at ||
                relatedArticle.created_at ||
                relatedArticle.date ||
                null;

              const relatedContent =
                normalizeContent(
                  relatedArticle.content
                );

              return {
                ...relatedArticle,
                content:
                  relatedContent,
                date:
                  formatArticleDate(
                    relatedDate
                  ),
                readTime:
                  calculateReadTime(
                    relatedContent
                  ),
              };
            }
          );

        setRelatedArticles(
          normalizedRelated
        );
      }

      setLoading(false);
    }

    if (slug) {
      loadArticle();
    } else {
      setArticle(null);
      setRelatedArticles([]);
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [slug]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 pb-20 pt-32 text-white">
        <SEO
          title="Loading Insight | CloviraHQ"
          description="Loading CloviraHQ Insight."
          canonical={`${SITE_URL}/insights/${
            slug || ""
          }`}
        />

        <div className="mx-auto max-w-3xl">
          <div className="h-5 w-32 animate-pulse rounded bg-slate-800" />

          <div className="mt-6 h-12 w-full animate-pulse rounded bg-slate-800" />

          <div className="mt-4 h-12 w-4/5 animate-pulse rounded bg-slate-800" />

          <div className="mt-10 space-y-4">
            <div className="h-5 w-full animate-pulse rounded bg-slate-900" />

            <div className="h-5 w-full animate-pulse rounded bg-slate-900" />

            <div className="h-5 w-5/6 animate-pulse rounded bg-slate-900" />
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 px-5 pb-20 pt-32 text-white">
        <SEO
          title="Insight Not Found | CloviraHQ"
          description="The CloviraHQ Insight you're looking for could not be found."
          canonical={`${SITE_URL}/insights/${
            slug || ""
          }`}
        />

        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
            Insight not found
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            We couldn't find that article.
          </h1>

          <p className="mt-5 text-base leading-8 text-slate-400">
            The article may have been moved,
            unpublished, or the URL may be
            incorrect.
          </p>

          <Link
            to="/insights"
            className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <span
              className="mr-2"
              aria-hidden="true"
            >
              &larr;
            </span>

            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  /* =======================================================
     SEO
  ======================================================= */

  const canonicalUrl =
    `${SITE_URL}/insights/${article.slug}`;

  const publishedTime =
    article.publishedTime ||
    formatArticleDateISO(
      article.published_at ||
        article.created_at ||
        article.date
    );

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "Article",

    headline:
      article.title,

    description:
      article.seo_description ||
      article.excerpt ||
      "",

    datePublished:
      publishedTime ||
      undefined,

    dateModified:
      formatArticleDateISO(
        article.updated_at
      ) || undefined,

    author: {
      "@type": "Person",
      name:
        article.author ||
        "Moses Maina",
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

    articleSection:
      article.category ||
      undefined,
  };

  /* =======================================================
     RENDER BLOCK
  ======================================================= */

  function renderBlock(block, index) {
    if (!block) {
      return null;
    }

    /*
     * Fragment.
     */
    if (
      block.type ===
      "fragment"
    ) {
      return (
        <div
          key={`fragment-${index}`}
        >
          {block.blocks.map(
            (child, childIndex) =>
              renderBlock(
                child,
                `${index}-${childIndex}`
              )
          )}
        </div>
      );
    }

    /*
     * H2.
     */
    if (
      block.type === "heading"
    ) {
      return (
        <h2
          key={`heading-${index}`}
          className="
            mt-12
            text-2xl
            font-bold
            tracking-tight
            text-white
            first:mt-0
            sm:text-3xl
          "
        >
          {renderInlineMarkdown(
            block.text
          )}
        </h2>
      );
    }

    /*
     * H3.
     */
    if (
      block.type ===
      "subheading"
    ) {
      return (
        <h3
          key={`subheading-${index}`}
          className="
            mt-10
            text-xl
            font-bold
            tracking-tight
            text-white
            sm:text-2xl
          "
        >
          {renderInlineMarkdown(
            block.text
          )}
        </h3>
      );
    }

    /*
     * Bullet list.
     */
    if (
      block.type === "list"
    ) {
      return (
        <ul
          key={`list-${index}`}
          className="
            mt-6
            list-disc
            space-y-3
            pl-6
            text-base
            leading-8
            text-slate-300
            sm:text-lg
          "
        >
          {(block.items || []).map(
            (item, itemIndex) => (
              <li
                key={`list-${index}-${itemIndex}`}
              >
                {renderInlineMarkdown(
                  item
                )}
              </li>
            )
          )}
        </ul>
      );
    }

    /*
     * Paragraph.
     */
    if (
      block.type ===
      "paragraph"
    ) {
      return (
        <p
          key={`paragraph-${index}`}
          className="
            mt-6
            whitespace-pre-line
            text-base
            leading-8
            text-slate-300
            sm:text-lg
          "
        >
          {renderInlineMarkdown(
            block.text
          )}
        </p>
      );
    }

    /*
     * Fallback.
     */
    if (block.text) {
      return (
        <p
          key={`fallback-${index}`}
          className="
            mt-6
            whitespace-pre-line
            text-base
            leading-8
            text-slate-300
            sm:text-lg
          "
        >
          {renderInlineMarkdown(
            block.text
          )}
        </p>
      );
    }

    return null;
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="bg-slate-950 text-white">
      <SEO
        title={
          article.seo_title ||
          `${article.title} | CloviraHQ`
        }
        description={
          article.seo_description ||
          article.excerpt ||
          ""
        }
        canonical={canonicalUrl}
        type="article"
        publishedTime={
          publishedTime
        }
        author={
          article.author
        }
        section={
          article.category
        }
        structuredData={
          structuredData
        }
      />

      <ArticleLayout
        article={article}
      >
        {article.content.map(
          (block, index) =>
            renderBlock(
              block,
              index
            )
        )}
      </ArticleLayout>

      {/* =====================================================
          RELATED ARTICLES
      ===================================================== */}

      {relatedArticles.length >
        0 && (
        <RelatedArticles
          articles={
            relatedArticles
          }
          currentSlug={
            article.slug
          }
        />
      )}

      {/* =====================================================
          CTA
      ===================================================== */}

      <InsightsCTA />
    </div>
  );
}