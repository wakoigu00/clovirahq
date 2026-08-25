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
    .replace(/['ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

/*
|--------------------------------------------------------------------------
| Convert Markdown-style article text into JSON blocks
|--------------------------------------------------------------------------
|
| Supported:
|
| # Heading
| ## Heading
| ### Subheading
|
| Paragraphs are separated by blank lines.
|
*/

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

/*
|--------------------------------------------------------------------------
| Validate structured content
|--------------------------------------------------------------------------
*/

function validateContentBlocks(content) {
  if (!Array.isArray(content) || content.length === 0) {
    return {
      valid: false,
      message: "Article body is required.",
    };
  }

  const validBlocks = content.every((block) => {
    if (!block || typeof block !== "object") {
      return false;
    }

    const type = String(
      block.type || "paragraph"
    ).toLowerCase();

    const text = String(
      block.text ||
        block.content ||
        block.value ||
        ""
    ).trim();

    if (!text) {
      return false;
    }

    return [
      "paragraph",
      "heading",
      "subheading",
    ].includes(type);
  });

  if (!validBlocks) {
    return {
      valid: false,
      message:
        "Article content contains an empty or invalid content block.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/*
|--------------------------------------------------------------------------
| Convert database JSON content back into editor text
|--------------------------------------------------------------------------
*/

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
        return text;
      }

      if (
        type === "heading" ||
        Number(block.level) === 2 ||
        Number(block.level) === 1
      ) {
        return text;
      }

      return text;
    })
    .join("\n\n");
}

/*
|--------------------------------------------------------------------------
| Publication date
|--------------------------------------------------------------------------
*/

function getPublishedAt(
  status,
  existingPublishedAt
) {
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
| SEO Helpers
|--------------------------------------------------------------------------
*/

const EXCERPT_MIN = 120;
const EXCERPT_RECOMMENDED_MIN = 140;
const EXCERPT_RECOMMENDED_MAX = 170;
const EXCERPT_MAX = 220;

const SEO_TITLE_MIN = 30;
const SEO_TITLE_RECOMMENDED_MIN = 45;
const SEO_TITLE_RECOMMENDED_MAX = 60;
const SEO_TITLE_MAX = 70;

const SEO_DESCRIPTION_MIN = 120;
const SEO_DESCRIPTION_RECOMMENDED_MIN = 140;
const SEO_DESCRIPTION_RECOMMENDED_MAX = 160;
const SEO_DESCRIPTION_MAX = 180;

/*
|--------------------------------------------------------------------------
| Character status helper
|--------------------------------------------------------------------------
*/

function getCharacterStatus(
  length,
  min,
  recommendedMin,
  recommendedMax,
  max
) {
  if (length === 0) {
    return {
      label: "Empty",
      className: "text-slate-400",
    };
  }

  if (length < min) {
    return {
      label: "Too short",
      className: "text-amber-600",
    };
  }

  if (
    length >= recommendedMin &&
    length <= recommendedMax
  ) {
    return {
      label: "Good",
      className: "text-green-600",
    };
  }

  if (length > recommendedMax && length <= max) {
    return {
      label: "Long",
      className: "text-amber-600",
    };
  }

  if (length > max) {
    return {
      label: "Too long",
      className: "text-red-600",
    };
  }

  return {
    label: "Acceptable",
    className: "text-slate-500",
  };
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
  | Article state
  |--------------------------------------------------------------------------
  */

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");

  const [category, setCategory] =
    useState("Strategy");

  const [author, setAuthor] =
    useState("Moses Maina");

  const [status, setStatus] =
    useState("draft");

  /*
  |--------------------------------------------------------------------------
  | SEO state
  |--------------------------------------------------------------------------
  */

  const [seoTitle, setSeoTitle] =
    useState("");

  const [seoDescription, setSeoDescription] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Publication state
  |--------------------------------------------------------------------------
  */

  const [
    existingPublishedAt,
    setExistingPublishedAt,
  ] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | UI state
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] =
    useState(isEditing);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

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

  const excerptLength =
    excerpt.length;

  const seoTitleLength =
    seoTitle.length;

  const seoDescriptionLength =
    seoDescription.length;

  /*
  |--------------------------------------------------------------------------
  | Character status
  |--------------------------------------------------------------------------
  */

  const excerptStatus =
    getCharacterStatus(
      excerptLength,
      EXCERPT_MIN,
      EXCERPT_RECOMMENDED_MIN,
      EXCERPT_RECOMMENDED_MAX,
      EXCERPT_MAX
    );

  const seoTitleStatus =
    getCharacterStatus(
      seoTitleLength,
      SEO_TITLE_MIN,
      SEO_TITLE_RECOMMENDED_MIN,
      SEO_TITLE_RECOMMENDED_MAX,
      SEO_TITLE_MAX
    );

  const seoDescriptionStatus =
    getCharacterStatus(
      seoDescriptionLength,
      SEO_DESCRIPTION_MIN,
      SEO_DESCRIPTION_RECOMMENDED_MIN,
      SEO_DESCRIPTION_RECOMMENDED_MAX,
      SEO_DESCRIPTION_MAX
    );

  /*
  |--------------------------------------------------------------------------
  | Publishing readiness
  |--------------------------------------------------------------------------
  */

  const normalizedSlug =
    createSlug(slug || title);

  const contentPreview =
    buildJsonContent(body);

  const contentValidation =
    validateContentBlocks(
      contentPreview
    );

  const publishingRequirements = [
    {
      label: "Article title",
      valid: Boolean(title.trim()),
    },
    {
      label: "Article slug",
      valid: Boolean(normalizedSlug),
    },
    {
      label: "Article excerpt",
      valid:
        Boolean(excerpt.trim()) &&
        excerptLength <= EXCERPT_MAX,
    },
    {
      label: "Article body",
      valid: contentValidation.valid,
    },
    {
      label: "Category",
      valid: Boolean(category.trim()),
    },
    {
      label: "Author",
      valid: Boolean(author.trim()),
    },
    {
      label: "SEO title",
      valid:
        Boolean(seoTitle.trim()) &&
        seoTitleLength <= SEO_TITLE_MAX,
    },
    {
      label: "SEO description",
      valid:
        Boolean(seoDescription.trim()) &&
        seoDescriptionLength <=
          SEO_DESCRIPTION_MAX,
    },
  ];

  const failedPublishingRequirements =
    publishingRequirements.filter(
      (requirement) =>
        !requirement.valid
    );

  const publishingReady =
    failedPublishingRequirements.length === 0;

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

      /*
       * Verify authentication.
       */

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

      /*
       * Load article.
       */

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
        console.error(
          "Article loading error:",
          articleError
        );

        setError(
          "Unable to load this article."
        );

        setLoading(false);

        return;
      }

      /*
       * Populate editor.
       */

      setTitle(data.title || "");

      setSlug(data.slug || "");

      setExcerpt(
        data.excerpt || ""
      );

      setBody(
        jsonContentToText(
          data.content
        )
      );

      setCategory(
        data.category ||
          "Strategy"
      );

      setAuthor(
        data.author ||
          "Moses Maina"
      );

      setStatus(
        data.status ||
          "draft"
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
  }, [
    id,
    isEditing,
    navigate,
  ]);

  /*
  |--------------------------------------------------------------------------
  | Title change
  |--------------------------------------------------------------------------
  */

  function handleTitleChange(event) {
    const value =
      event.target.value;

    setTitle(value);

    /*
     * Automatically generate slug only
     * when creating a new article.
     */

    if (!isEditing) {
      setSlug(
        createSlug(value)
      );
    }

    /*
     * Automatically suggest SEO title
     * for a new article when SEO title
     * is still empty.
     */

    if (
      !isEditing &&
      !seoTitle.trim()
    ) {
      setSeoTitle(
        value.trim()
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Excerpt change
  |--------------------------------------------------------------------------
  */

  function handleExcerptChange(
    event
  ) {
    const value =
      event.target.value;

    setExcerpt(value);

    /*
     * Automatically suggest SEO description
     * for new articles when still empty.
     */

    if (
      !isEditing &&
      !seoDescription.trim()
    ) {
      setSeoDescription(
        value.trim()
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | SEO title change
  |--------------------------------------------------------------------------
  */

  function handleSeoTitleChange(
    event
  ) {
    setSeoTitle(
      event.target.value
    );
  }

  /*
  |--------------------------------------------------------------------------
  | SEO description change
  |--------------------------------------------------------------------------
  */

  function handleSeoDescriptionChange(
    event
  ) {
    setSeoDescription(
      event.target.value
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Save article
  |--------------------------------------------------------------------------
  */

  async function handleSubmit(
    event
  ) {
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

    if (!slug.trim() && !title.trim()) {
      setError(
        "Article slug is required."
      );

      return;
    }

    if (!normalizedSlug) {
      setError(
        "Please provide a valid article slug."
      );

      return;
    }

    if (!excerpt.trim()) {
      setError(
        "Article excerpt is required."
      );

      return;
    }

    if (excerptLength > EXCERPT_MAX) {
      setError(
        "Excerpt is too long. Keep it under " + EXCERPT_MAX + " characters."
      );

      return;
    }

    if (!body.trim()) {
      setError(
        "Article body is required."
      );

      return;
    }

    /*
     * Convert article body into
     * structured JSON blocks.
     */

    const content =
      buildJsonContent(body);

    const contentValidationResult =
      validateContentBlocks(content);

    if (
      !contentValidationResult.valid
    ) {
      setError(
        contentValidationResult.message
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
     * Publication-specific validation.
     */

    if (status === "published") {
      if (!seoTitle.trim()) {
        setError(
          "SEO title is required before publishing."
        );

        return;
      }

      if (
        seoTitleLength < SEO_TITLE_MIN
      ) {
        setError(
          `SEO title is too short. Use at least ${SEO_TITLE_MIN} characters.`
        );

        return;
      }

      if (
        seoTitleLength > SEO_TITLE_MAX
      ) {
        setError(
          `SEO title is too long. Keep it under ${SEO_TITLE_MAX} characters.`
        );

        return;
      }

      if (!seoDescription.trim()) {
        setError(
          "SEO description is required before publishing."
        );

        return;
      }

      if (
        seoDescriptionLength <
        SEO_DESCRIPTION_MIN
      ) {
        setError(
          `SEO description is too short. Use at least ${SEO_DESCRIPTION_MIN} characters.`
        );

        return;
      }

      if (
        seoDescriptionLength >
        SEO_DESCRIPTION_MAX
      ) {
        setError(
          `SEO description is too long. Keep it under ${SEO_DESCRIPTION_MAX} characters.`
        );

        return;
      }

      /*
       * Final publishing gate.
       */

      if (!publishingReady) {
        setError(
          `This article is not ready to publish. Complete: ${failedPublishingRequirements
            .map(
              (requirement) =>
                requirement.label
            )
            .join(", ")}.`
        );

        return;
      }
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

      if (
        sessionError ||
        !session
      ) {
        navigate(
          "/admin/login",
          {
            replace: true,
          }
        );

        return;
      }

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
       */

      const articleData = {
        title:
          title.trim(),

        slug:
          normalizedSlug,

        excerpt:
          excerpt.trim(),

        content,

        seo_title:
          seoTitle.trim() ||
          null,

        seo_description:
          seoDescription.trim() ||
          null,

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
        result =
          await supabase
            .from("articles")
            .update(articleData)
            .eq("id", id)
            .select()
            .single();
      } else {
        /*
         * INSERT
         */

        result =
          await supabase
            .from("articles")
            .insert(articleData)
            .select()
            .single();
      }

      /*
       * Handle database error.
       */

      if (result.error) {
        console.error(
          "Article save error:",
          result.error
        );

        if (
          result.error.code ===
          "23505"
        ) {
          setError(
            "An article with this slug already exists. Please choose a different slug."
          );
        } else {
          setError(
            result.error.message ||
              "Unable to save article."
          );
        }

        return;
      }

      /*
       * Success.
       */

      setSuccess(
        isEditing
          ? status === "published"
            ? "Article updated and published successfully."
            : "Article updated successfully."
          : status === "published"
          ? "Article published successfully."
          : "Article created successfully."
      );

      /*
       * Newly-created article:
       * move into edit mode.
       */

      if (
        !isEditing &&
        result.data?.id
      ) {
        navigate(
          `/admin/articles/${result.data.id}/edit`,
          {
            replace: true,
          }
        );

        return;
      }

      /*
       * Update publication timestamp.
       */

      setExistingPublishedAt(
        result.data
          ?.published_at ||
          publishedAt
      );
    } catch (saveError) {
      console.error(
        saveError
      );

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
    setSuccess("");
    setSaving(true);

    try {
      /*
       * Verify authentication.
       */

      const {
        data: {
          session,
        },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate(
          "/admin/login",
          {
            replace: true,
          }
        );

        return;
      }

      const {
        error: deleteError,
      } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error(
          "Article delete error:",
          deleteError
        );

        setError(
          deleteError.message ||
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
    } catch (deleteError) {
      console.error(
        deleteError
      );

      setError(
        "An unexpected error occurred while deleting the article."
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

        {/* Error */}

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

        {/* Success */}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm leading-6 text-green-700">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* =========================================================
              ARTICLE DETAILS
          ========================================================= */}

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
                  onChange={
                    handleTitleChange
                  }
                  placeholder="Enter article title"
                  maxLength={180}
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
                  {normalizedSlug}
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

                  <span
                    className={`text-xs font-medium ${excerptStatus.className}`}
                  >
                    {excerptLength} /{" "}
                    {EXCERPT_MAX} Ãƒâ€šÃ‚Â·{" "}
                    {excerptStatus.label}
                  </span>
                </div>

                <textarea
                  id="article-excerpt"
                  value={excerpt}
                  onChange={
                    handleExcerptChange
                  }
                  rows={4}
                  maxLength={
                    EXCERPT_MAX
                  }
                  placeholder="Write a concise summary of the article..."
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <div className="mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-slate-500">
                    Recommended:
                    {" "}
                    {EXCERPT_RECOMMENDED_MIN}
                    ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“
                    {EXCERPT_RECOMMENDED_MAX}
                    {" "}
                    characters.
                  </p>

                  {excerptLength > 0 &&
                    excerptLength <
                      EXCERPT_MIN && (
                      <p className="font-medium text-amber-600">
                        Add more detail to make the
                        excerpt useful.
                      </p>
                    )}

                  {excerptLength >
                    EXCERPT_RECOMMENDED_MAX &&
                    excerptLength <=
                      EXCERPT_MAX && (
                      <p className="font-medium text-amber-600">
                        Consider shortening this.
                      </p>
                    )}
                </div>
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
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          </div>

          {/* =========================================================
              ARTICLE CONTENT
          ========================================================= */}

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
              for smaller section headings.
            </div>

            {!contentValidation.valid &&
              body.trim() && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-700">
                  {contentValidation.message}
                </div>
              )}
          </div>

          {/* =========================================================
              SEO
          ========================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-slate-950">
                SEO
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Control how this article is presented
                to search engines and social previews.
              </p>
            </div>

            <div className="space-y-8">
              {/* SEO Title */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="seo-title"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    SEO Title{" "}
                    {status ===
                      "published" && (
                      <span className="text-red-500">
                        *
                      </span>
                    )}
                  </label>

                  <span
                    className={`text-xs font-medium ${seoTitleStatus.className}`}
                  >
                    {seoTitleLength} /{" "}
                    {SEO_TITLE_MAX} Ãƒâ€šÃ‚Â·{" "}
                    {seoTitleStatus.label}
                  </span>
                </div>

                <input
                  id="seo-title"
                  type="text"
                  value={seoTitle}
                  onChange={
                    handleSeoTitleChange
                  }
                  maxLength={
                    SEO_TITLE_MAX
                  }
                  placeholder={
                    title ||
                    "SEO title"
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <div className="mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-slate-500">
                    Recommended:
                    {" "}
                    {SEO_TITLE_RECOMMENDED_MIN}
                    ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“
                    {SEO_TITLE_RECOMMENDED_MAX}
                    {" "}
                    characters.
                  </p>

                  {seoTitleLength > 0 &&
                    seoTitleLength <
                      SEO_TITLE_MIN && (
                      <p className="font-medium text-amber-600">
                        Consider making the SEO title
                        more descriptive.
                      </p>
                    )}

                  {seoTitleLength >
                    SEO_TITLE_RECOMMENDED_MAX &&
                    seoTitleLength <=
                      SEO_TITLE_MAX && (
                      <p className="font-medium text-amber-600">
                        Consider shortening this title.
                      </p>
                    )}
                </div>
              </div>

              {/* SEO Description */}

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="seo-description"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    SEO Description{" "}
                    {status ===
                      "published" && (
                      <span className="text-red-500">
                        *
                      </span>
                    )}
                  </label>

                  <span
                    className={`text-xs font-medium ${seoDescriptionStatus.className}`}
                  >
                    {seoDescriptionLength} /{" "}
                    {SEO_DESCRIPTION_MAX}{" "}
                    Ãƒâ€šÃ‚Â·{" "}
                    {
                      seoDescriptionStatus.label
                    }
                  </span>
                </div>

                <textarea
                  id="seo-description"
                  value={
                    seoDescription
                  }
                  onChange={
                    handleSeoDescriptionChange
                  }
                  rows={4}
                  maxLength={
                    SEO_DESCRIPTION_MAX
                  }
                  placeholder={
                    excerpt ||
                    "SEO description"
                  }
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />

                <div className="mt-2 flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-slate-500">
                    Recommended:
                    {" "}
                    {
                      SEO_DESCRIPTION_RECOMMENDED_MIN
                    }
                    ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“
                    {
                      SEO_DESCRIPTION_RECOMMENDED_MAX
                    }
                    {" "}
                    characters.
                  </p>

                  {seoDescriptionLength >
                    0 &&
                    seoDescriptionLength <
                      SEO_DESCRIPTION_MIN && (
                      <p className="font-medium text-amber-600">
                        Add more useful context for
                        searchers.
                      </p>
                    )}

                  {seoDescriptionLength >
                    SEO_DESCRIPTION_RECOMMENDED_MAX &&
                    seoDescriptionLength <=
                      SEO_DESCRIPTION_MAX && (
                      <p className="font-medium text-amber-600">
                        Consider shortening this.
                      </p>
                    )}
                </div>
              </div>

              {/* SEO Preview */}

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Search Preview
                </p>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-medium text-blue-700">
                    {seoTitle.trim() ||
                      title ||
                      "Your article title"}
                  </p>

                  <p className="mt-1 text-xs text-green-700">
                    clovirahq.com/insights/
                    {normalizedSlug}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {seoDescription.trim() ||
                      excerpt ||
                      "Your SEO description will appear here."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================
              PUBLISHING
          ========================================================= */}

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

            <div className="space-y-6">
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

              {/* Publishing readiness */}

              {status ===
                "published" && (
                <div
                  className={`rounded-xl border px-5 py-5 ${
                    publishingReady
                      ? "border-green-200 bg-green-50"
                      : "border-amber-200 bg-amber-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        publishingReady
                          ? "bg-green-600 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      {publishingReady
                        ? "ÃƒÂ¢Ã…â€œÃ¢â‚¬Å“"
                        : "!"}
                    </div>

                    <div className="min-w-0">
                      <p
                        className={`font-semibold ${
                          publishingReady
                            ? "text-green-800"
                            : "text-amber-800"
                        }`}
                      >
                        {publishingReady
                          ? "Article is ready to publish"
                          : "Article is not ready to publish"}
                      </p>

                      <p
                        className={`mt-1 text-sm leading-6 ${
                          publishingReady
                            ? "text-green-700"
                            : "text-amber-700"
                        }`}
                      >
                        {publishingReady
                          ? "All required article, content, and SEO fields are complete."
                          : "Complete the required fields below before publishing."}
                      </p>
                    </div>
                  </div>

                  {!publishingReady && (
                    <div className="mt-4 border-t border-amber-200 pt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-800">
                        Missing or invalid fields
                      </p>

                      <ul className="space-y-1.5">
                        {failedPublishingRequirements.map(
                          (requirement) => (
                            <li
                              key={
                                requirement.label
                              }
                              className="flex items-center gap-2 text-sm text-amber-700"
                            >
                              <span className="font-bold">
                                ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢
                              </span>

                              {requirement.label}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {status ===
                "published" && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm leading-6 text-green-700">
                  <p className="font-semibold">
                    Public URL
                  </p>

                  <div className="mt-1 font-semibold">
                    /insights/
                    {normalizedSlug}
                  </div>

                  <p className="mt-3 text-xs text-green-600">
                    The article will be publicly
                    available after the publishing
                    requirements have been satisfied.
                  </p>
                </div>
              )}

              {status ===
                "draft" && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  Draft articles are stored in the
                  admin portal but are not displayed
                  publicly. SEO fields can be completed
                  later before publication.
                </div>
              )}
            </div>
          </div>

          {/* =========================================================
              ACTIONS
          ========================================================= */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={
                    handleDelete
                  }
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
                disabled={
                  saving ||
                  (status ===
                    "published" &&
                    !publishingReady)
                }
                className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Saving..."
                  : isEditing
                  ? status ===
                    "published"
                    ? "Update & Publish"
                    : "Save Draft"
                  : status ===
                    "published"
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




