import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { supabase } from "../../lib/supabase";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function createSlug(title) {
  return String(title || "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function buildJsonContent(text) {
  const normalized = String(text || "")
    .replace(/\r\n/g, "\n")
    .trim();

  if (!normalized) {
    return [];
  }

  return normalized
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const h3 = block.match(/^###\s+(.+)$/);

      if (h3) {
        return {
          type: "subheading",
          level: 3,
          text: h3[1].trim(),
        };
      }

      const h2 = block.match(/^##\s+(.+)$/);

      if (h2) {
        return {
          type: "heading",
          level: 2,
          text: h2[1].trim(),
        };
      }

      const h1 = block.match(/^#\s+(.+)$/);

      if (h1) {
        return {
          type: "heading",
          level: 2,
          text: h1[1].trim(),
        };
      }

      return {
        type: "paragraph",
        text: block,
      };
    });
}

function jsonContentToText(content) {
  if (!content) {
    return "";
  }

  let parsed = content;

  if (typeof content === "string") {
    const trimmed = content.trim();

    if (!trimmed) {
      return "";
    }

    try {
      parsed = JSON.parse(trimmed);
    } catch {
      return trimmed;
    }
  }

  if (!Array.isArray(parsed)) {
    return String(parsed || "");
  }

  return parsed
    .map((block) => {
      if (!block) {
        return "";
      }

      if (typeof block === "string") {
        return block;
      }

      const type = String(
        block.type || "paragraph"
      ).toLowerCase();

      const text = String(
        block.text ||
          block.content ||
          block.value ||
          ""
      );

      if (!text) {
        return "";
      }

      if (
        type === "subheading" ||
        Number(block.level) === 3
      ) {
        return `### ${text}`;
      }

      if (
        type === "heading" ||
        Number(block.level) === 2 ||
        Number(block.level) === 1
      ) {
        return `## ${text}`;
      }

      return text;
    })
    .filter(Boolean)
    .join("\n\n");
}

function formatDateForInput(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 16);
}

function getPublishedAt(status, existingPublishedAt) {
  if (status !== "published") {
    return null;
  }

  if (existingPublishedAt) {
    return existingPublishedAt;
  }

  return new Date().toISOString();
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

export default function AdminArticleEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("Strategy");
  const [author, setAuthor] = useState("Moses Maina");
  const [status, setStatus] = useState("draft");

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] =
    useState("");

  const [existingPublishedAt, setExistingPublishedAt] =
    useState(null);

  const [loading, setLoading] = useState(
    isEditing
  );

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Word count
  |--------------------------------------------------------------------------
  */

  const wordCount = useMemo(() => {
    return body
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;
  }, [body]);

  /*
  |--------------------------------------------------------------------------
  | Character counts
  |--------------------------------------------------------------------------
  */

  const titleLength = title.length;

  const excerptLength = excerpt.length;

  const seoTitleLength = seoTitle.length;

  const seoDescriptionLength =
    seoDescription.length;

  /*
  |--------------------------------------------------------------------------
  | Load article when editing
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    async function loadArticle() {
      if (!isEditing) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      const {
        data: {
          session,
        },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (sessionError || !session) {
        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      const {
        data,
        error: articleError,
      } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (!mounted) {
        return;
      }

      if (articleError || !data) {
        console.error(articleError);

        setError(
          "Unable to load this article."
        );

        setLoading(false);

        return;
      }

      setTitle(data.title || "");

      setSlug(data.slug || "");

      setExcerpt(data.excerpt || "");

      setBody(
        jsonContentToText(data.content)
      );

      setCategory(
        data.category || "Strategy"
      );

      setAuthor(
        data.author || "Moses Maina"
      );

      setStatus(
        data.status || "draft"
      );

      setSeoTitle(
        data.seo_title || ""
      );

      setSeoDescription(
        data.seo_description || ""
      );

      setExistingPublishedAt(
        data.published_at || null
      );

      setLoading(false);
    }

    loadArticle();

    return () => {
      mounted = false;
    };
  }, [id, isEditing, navigate]);

  /*
  |--------------------------------------------------------------------------
  | Auto-generate slug
  |--------------------------------------------------------------------------
  */

  function handleTitleChange(event) {
    const value = event.target.value;

    setTitle(value);

    /*
     * Only automatically update the slug when
     * creating a new article.
     */
    if (!isEditing) {
      setSlug(createSlug(value));
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Save article
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
     * Basic validation.
     */

    if (!title.trim()) {
      setError(
        "Article title is required."
      );

      return;
    }

    if (!excerpt.trim()) {
      setError(
        "Article excerpt is required."
      );

      return;
    }

    if (!body.trim()) {
      setError(
        "Article body is required."
      );

      return;
    }

    if (!category.trim()) {
      setError(
        "Article category is required."
      );

      return;
    }

    if (!author.trim()) {
      setError(
        "Article author is required."
      );

      return;
    }

    /*
     * SEO validation for published articles.
     */

    if (
      status === "published" &&
      !seoTitle.trim()
    ) {
      setError(
        "SEO title is required before publishing."
      );

      return;
    }

    if (
      status === "published" &&
      !seoDescription.trim()
    ) {
      setError(
        "SEO description is required before publishing."
      );

      return;
    }

    const normalizedSlug =
      createSlug(slug || title);

    if (!normalizedSlug) {
      setError(
        "Please provide a valid article slug."
      );

      return;
    }

    setSaving(true);

    try {
      /*
       * Verify authentication.
       */

      const {
        data: {
          session,
        },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      /*
       * Convert article body into structured
       * JSON blocks.
       */

      const content =
        buildJsonContent(body);

      /*
       * Determine publication date.
       */

      const publishedAt =
        getPublishedAt(
          status,
          existingPublishedAt
        );

      /*
       * Article data.
       *
       * These are the columns currently being
       * used by the application.
       */

      const articleData = {
        title: title.trim(),

        slug: normalizedSlug,

        excerpt: excerpt.trim(),

        content,

        seo_title:
          seoTitle.trim() || null,

        seo_description:
          seoDescription.trim() || null,

        status,

        category:
          category.trim(),

        author:
          author.trim(),

        published_at:
          publishedAt,

        updated_at:
          new Date().toISOString(),
      };

      let result;

      /*
       * UPDATE
       */

      if (isEditing) {
        result = await supabase
          .from("articles")
          .update(articleData)
          .eq("id", id)
          .select()
          .single();
      } else {
        /*
         * INSERT
         */

        result = await supabase
          .from("articles")
          .insert(articleData)
          .select()
          .single();
      }

      if (result.error) {
        console.error(
          "Article save error:",
          result.error
        );

        setError(
          result.error.message ||
            "Unable to save article."
        );

        return;
      }

      /*
       * Success.
       */

      setSuccess(
        isEditing
          ? "Article updated successfully."
          : "Article created successfully."
      );

      /*
       * If newly created, move to editor
       * for the new article.
       */

      if (!isEditing && result.data?.id) {
        navigate(
          `/admin/articles/${result.data.id}/edit`,
          {
            replace: true,
          }
        );

        return;
      }

      /*
       * Update local publication timestamp.
       */

      setExistingPublishedAt(
        result.data?.published_at ||
          publishedAt
      );
    } catch (saveError) {
      console.error(saveError);

      setError(
        "An unexpected error occurred while saving the article."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Delete article
  |--------------------------------------------------------------------------
  */

  async function handleDelete() {
    if (!isEditing) {
      return;
    }

    const confirmed =
      window.confirm(
        "Delete this article? This action cannot be undone."
      );

    if (!confirmed) {
      return;
    }

    setError("");
    setSaving(true);

    try {
      const {
        error: deleteError,
      } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error(
          deleteError
        );

        setError(
          "Unable to delete the article."
        );

        return;
      }

      navigate(
        "/admin/articles",
        {
          replace: true,
        }
      );
    } finally {
      setSaving(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Loading screen
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

            <p className="text-sm text-slate-500">
              Loading article...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Page
  |--------------------------------------------------------------------------
  */

  return (
    <section className="min-h-screen bg-slate-50">
      {/* Header */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              CloviraHQ
            </p>

            <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
              {isEditing
                ? "Edit Article"
                : "New Article"}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/articles"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Back to Articles
            </Link>

            <Link
              to="/admin/dashboard"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main */}

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            {isEditing
              ? "Edit Insight"
              : "Create New Insight"}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create, edit, optimize, and publish
            CloviraHQ Insights articles.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
            <p className="font-semibold">
              Unable to save article
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm leading-6 text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Article details */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-950">
                Article Details
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Basic information used across the
                Insights section.
              </p>
            </div>

            <div className="space-y-7">
              {/* Title */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="article-title"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Title{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <span className="text-xs text-slate-500">
                    {titleLength} characters
                  </span>
                </div>

                <input
                  id="article-title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter article title"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* Slug */}

              <div>
                <label
                  htmlFor="article-slug"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Slug{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="article-slug"
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    setSlug(
                      event.target.value
                    )
                  }
                  placeholder="article-url-slug"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Public URL:
                  {" "}
                  /insights/
                  {createSlug(
                    slug || title
                  )}
                </p>
              </div>

              {/* Excerpt */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="article-excerpt"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    Excerpt{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <span className="text-xs text-slate-500">
                    {excerptLength} characters
                  </span>
                </div>

                <textarea
                  id="article-excerpt"
                  value={excerpt}
                  onChange={(event) =>
                    setExcerpt(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Write a concise summary of the article..."
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Used for article previews and SEO
                  fallbacks.
                </p>
              </div>

              {/* Category */}

              <div>
                <label
                  htmlFor="article-category"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Category{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <select
                  id="article-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="Strategy">
                    Strategy
                  </option>

                  <option value="Outbound">
                    Outbound
                  </option>

                  <option value="Prospecting">
                    Prospecting
                  </option>

                  <option value="Research">
                    Research
                  </option>

                  <option value="MSP Growth">
                    MSP Growth
                  </option>
                </select>
              </div>

              {/* Author */}

              <div>
                <label
                  htmlFor="article-author"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Author{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  id="article-author"
                  type="text"
                  value={author}
                  onChange={(event) =>
                    setAuthor(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Article body */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Article Content
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Write the complete article below.
                </p>
              </div>

              <span className="text-sm font-medium text-slate-500">
                {wordCount.toLocaleString()} words
              </span>
            </div>

            <textarea
              id="article-body"
              value={body}
              onChange={(event) =>
                setBody(
                  event.target.value
                )
              }
              rows={32}
              placeholder={`Write your article here.

Separate paragraphs with a blank line.

Use ## Heading for article section headings.

Use ### Subheading for smaller section headings.`}
              className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-4 font-sans text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
            />

            <div className="mt-4 rounded-xl bg-slate-50 px-4 py-4 text-xs leading-6 text-slate-600">
              <strong className="font-semibold text-slate-800">
                Formatting:
              </strong>{" "}
              Separate paragraphs with a blank line.
              Use{" "}
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-slate-700">
                ## Heading
              </code>{" "}
              for section headings and{" "}
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-slate-700">
                ### Subheading
              </code>{" "}
              for smaller headings.
            </div>
          </div>

          {/* SEO */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-950">
                SEO
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Optimize how the article appears in
                search engines.
              </p>
            </div>

            <div className="space-y-7">
              {/* SEO title */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="seo-title"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    SEO Title{" "}
                    {status === "published" && (
                      <span className="text-red-500">
                        *
                      </span>
                    )}
                  </label>

                  <span className="text-xs text-slate-500">
                    {seoTitleLength} characters
                  </span>
                </div>

                <input
                  id="seo-title"
                  type="text"
                  value={seoTitle}
                  onChange={(event) =>
                    setSeoTitle(
                      event.target.value
                    )
                  }
                  placeholder={
                    title ||
                    "SEO title"
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {/* SEO description */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="seo-description"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    SEO Description{" "}
                    {status === "published" && (
                      <span className="text-red-500">
                        *
                      </span>
                    )}
                  </label>

                  <span className="text-xs text-slate-500">
                    {seoDescriptionLength} characters
                  </span>
                </div>

                <textarea
                  id="seo-description"
                  value={seoDescription}
                  onChange={(event) =>
                    setSeoDescription(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder={
                    excerpt ||
                    "SEO description"
                  }
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Publishing */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-950">
                Publishing
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose whether the article remains a
                draft or becomes publicly visible.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="article-status"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Status
                </label>

                <select
                  id="article-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 sm:max-w-md"
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="published">
                    Published
                  </option>
                </select>
              </div>

              {status === "published" && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm leading-6 text-green-700">
                  This article will be publicly
                  available at:

                  <div className="mt-1 font-semibold">
                    /insights/
                    {createSlug(
                      slug || title
                    )}
                  </div>
                </div>
              )}

              {status === "draft" && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  Draft articles are stored in the
                  admin portal but are not displayed
                  publicly.
                </div>
              )}
            </div>
          </div>

          {/* Actions */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Delete Article
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/admin/articles"
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : isEditing
                  ? status === "published"
                    ? "Update & Publish"
                    : "Save Draft"
                  : status === "published"
                  ? "Publish Article"
                  : "Create Draft"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </section>
  );
}