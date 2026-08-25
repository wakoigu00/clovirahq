import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabase";

export default function AdminArticles() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadArticles() {
      setLoading(true);
      setError("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (sessionError || !session) {
        navigate("/admin/login", { replace: true });
        return;
      }

      const {
        data,
        error: articlesError,
      } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (!mounted) {
        return;
      }

      if (articlesError) {
        console.error(articlesError);

        setError(
          "Unable to load articles. Check that the articles table and its permissions are configured correctly."
        );

        setArticles([]);
        setLoading(false);

        return;
      }

      setArticles(data || []);
      setLoading(false);
    }

    loadArticles();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/admin/login", {
            replace: true,
          });
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  /* =========================================================
     VALIDATION
  ========================================================= */

  function validateForPublishing(article) {
    const missing = [];

    if (!String(article.title || "").trim()) {
      missing.push("Title");
    }

    if (!String(article.slug || "").trim()) {
      missing.push("Slug");
    }

    if (!String(article.excerpt || "").trim()) {
      missing.push("Excerpt");
    }

    if (!String(article.category || "").trim()) {
      missing.push("Category");
    }

    if (!String(article.author || "").trim()) {
      missing.push("Author");
    }

    if (!article.content) {
      missing.push("Article Content");
    }

    if (
      typeof article.content === "string" &&
      !article.content.trim()
    ) {
      missing.push("Article Content");
    }

    if (
      Array.isArray(article.content) &&
      article.content.length === 0
    ) {
      missing.push("Article Content");
    }

    if (!String(article.seo_title || "").trim()) {
      missing.push("SEO Title");
    }

    if (
      !String(article.seo_description || "").trim()
    ) {
      missing.push("SEO Description");
    }

    return missing;
  }

  /* =========================================================
     PUBLISH
  ========================================================= */

  async function handlePublish(article) {
    setError("");

    const missing =
      validateForPublishing(article);

    if (missing.length > 0) {
      setError(
        `Cannot publish "${article.title || "Untitled Article"}". Complete these required fields first: ${missing.join(
          ", "
        )}.`
      );

      return;
    }

    const confirmed = window.confirm(
      `Publish "${article.title}" now?\n\nThis will make the article publicly visible at:\n/insights/${article.slug}`
    );

    if (!confirmed) {
      return;
    }

    setActionId(article.id);
    setError("");

    const publishedAt =
      article.published_at ||
      new Date().toISOString();

    const {
      data,
      error: publishError,
    } = await supabase
      .from("articles")
      .update({
        status: "published",
        published_at: publishedAt,
      })
      .eq("id", article.id)
      .select()
      .single();

    setActionId(null);

    if (publishError) {
      console.error(
        "Publish error:",
        publishError
      );

      setError(
        "Unable to publish the article. Check the database permissions and try again."
      );

      return;
    }

    setArticles((current) =>
      current.map((item) =>
        item.id === article.id
          ? data
          : item
      )
    );
  }

  /* =========================================================
     UNPUBLISH
  ========================================================= */

  async function handleUnpublish(article) {
    const confirmed = window.confirm(
      `Unpublish "${article.title}"?\n\nThe article will no longer be visible on the public Insights pages.`
    );

    if (!confirmed) {
      return;
    }

    setActionId(article.id);
    setError("");

    const {
      data,
      error: unpublishError,
    } = await supabase
      .from("articles")
      .update({
        status: "draft",
      })
      .eq("id", article.id)
      .select()
      .single();

    setActionId(null);

    if (unpublishError) {
      console.error(
        "Unpublish error:",
        unpublishError
      );

      setError(
        "Unable to unpublish the article. Check the database permissions and try again."
      );

      return;
    }

    setArticles((current) =>
      current.map((item) =>
        item.id === article.id
          ? data
          : item
      )
    );
  }

  /* =========================================================
     DELETE
  ========================================================= */

  async function handleDelete(article) {
    const confirmed = window.confirm(
      `Delete "${article.title || "Untitled Article"}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setActionId(article.id);
    setError("");

    const {
      error: deleteError,
    } = await supabase
      .from("articles")
      .delete()
      .eq("id", article.id);

    setActionId(null);

    if (deleteError) {
      console.error(deleteError);

      setError(
        "Unable to delete the article."
      );

      return;
    }

    setArticles((current) =>
      current.filter(
        (item) =>
          item.id !== article.id
      )
    );
  }

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const normalizedSearch =
    search.trim().toLowerCase();

  const filteredArticles =
    articles.filter((article) => {
      const matchesSearch =
        !normalizedSearch ||
        String(article.title || "")
          .toLowerCase()
          .includes(
            normalizedSearch
          ) ||
        String(article.slug || "")
          .toLowerCase()
          .includes(
            normalizedSearch
          ) ||
        String(article.category || "")
          .toLowerCase()
          .includes(
            normalizedSearch
          );

      const matchesFilter =
        filter === "all" ||
        String(
          article.status || "draft"
        ).toLowerCase() === filter;

      return (
        matchesSearch &&
        matchesFilter
      );
    });

  /* =========================================================
     COUNTS
  ========================================================= */

  const totalCount =
    articles.length;

  const publishedCount =
    articles.filter(
      (article) =>
        String(
          article.status || ""
        ).toLowerCase() ===
        "published"
    ).length;

  const draftCount =
    articles.filter(
      (article) =>
        String(
          article.status || "draft"
        ).toLowerCase() ===
        "draft"
    ).length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="min-h-screen bg-slate-50">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              CloviraHQ
            </p>

            <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
              Articles
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/articles/new"
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              + New Article
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Manage Articles
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Create, edit, publish, unpublish,
            and manage the articles displayed
            in CloviraHQ Insights.
          </p>
        </div>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm leading-6 text-red-700">
            {error}
          </div>
        )}

        {/* ===================================================
            STATS
        =================================================== */}

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Total
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-950">
              {totalCount}
            </p>
          </div>

          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-green-700">
              Published
            </p>

            <p className="mt-2 text-3xl font-bold text-green-800">
              {publishedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Drafts
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-950">
              {draftCount}
            </p>
          </div>
        </div>

        {/* ===================================================
            SEARCH / FILTER
        =================================================== */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1fr_180px]">
            <div>
              <label
                htmlFor="article-search"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Search
              </label>

              <input
                id="article-search"
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by title, slug, or category..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div>
              <label
                htmlFor="article-status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Status
              </label>

              <select
                id="article-status"
                value={filter}
                onChange={(event) =>
                  setFilter(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                <option value="all">
                  All Articles
                </option>

                <option value="published">
                  Published
                </option>

                <option value="draft">
                  Drafts
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ===================================================
            ARTICLE LIST
        =================================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

              <p className="text-sm text-slate-500">
                Loading articles...
              </p>
            </div>
          ) : filteredArticles.length ===
            0 ? (
            <div className="px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-slate-950">
                {articles.length ===
                0
                  ? "No articles yet"
                  : "No matching articles"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {articles.length ===
                0
                  ? "Create your first CloviraHQ Insights article to start building the publishing library."
                  : "Try changing your search or status filter."}
              </p>

              {articles.length ===
                0 && (
                <Link
                  to="/admin/articles/new"
                  className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Create First Article
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredArticles.map(
                (article) => {
                  const status =
                    String(
                      article.status ||
                        "draft"
                    ).toLowerCase();

                  const isBusy =
                    actionId ===
                    article.id;

                  return (
                    <div
                      key={
                        article.id
                      }
                      className="flex flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between"
                    >
                      {/* =====================================
                          ARTICLE INFO
                      ===================================== */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-base font-semibold text-slate-950">
                            {article.title ||
                              "Untitled Article"}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              status ===
                              "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-slate-500">
                          /insights/
                          {article.slug ||
                            "no-slug"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                          {article.category && (
                            <span>
                              Category:{" "}
                              <strong className="font-medium text-slate-700">
                                {
                                  article.category
                                }
                              </strong>
                            </span>
                          )}

                          {article.author && (
                            <span>
                              Author:{" "}
                              <strong className="font-medium text-slate-700">
                                {
                                  article.author
                                }
                              </strong>
                            </span>
                          )}

                          {article.created_at && (
                            <span>
                              Created:{" "}
                              <strong className="font-medium text-slate-700">
                                {new Date(
                                  article.created_at
                                ).toLocaleDateString()}
                              </strong>
                            </span>
                          )}

                          {article.published_at &&
                            status ===
                              "published" && (
                              <span>
                                Published:{" "}
                                <strong className="font-medium text-slate-700">
                                  {new Date(
                                    article.published_at
                                  ).toLocaleDateString()}
                                </strong>
                              </span>
                            )}
                        </div>
                      </div>

                      {/* =====================================
                          ACTIONS
                      ===================================== */}

                      <div className="flex flex-wrap items-center gap-3">
                        {status ===
                          "published" &&
                          article.slug && (
                            <Link
                              to={`/insights/${article.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                              View
                            </Link>
                          )}

                        <Link
                          to={`/admin/articles/${article.id}/edit`}
                          className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Edit
                        </Link>

                        {status ===
                        "published" ? (
                          <button
                            type="button"
                            disabled={
                              isBusy
                            }
                            onClick={() =>
                              handleUnpublish(
                                article
                              )
                            }
                            className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isBusy
                              ? "Working..."
                              : "Unpublish"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={
                              isBusy
                            }
                            onClick={() =>
                              handlePublish(
                                article
                              )
                            }
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isBusy
                              ? "Publishing..."
                              : "Publish"}
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={
                            isBusy
                          }
                          onClick={() =>
                            handleDelete(
                              article
                            )
                          }
                          className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* ===================================================
            FOOTER LINKS
        =================================================== */}

        <div className="mt-8 flex flex-wrap gap-5">
          <Link
            to="/admin/dashboard"
            className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-950"
          >
            ← Back to Dashboard
          </Link>

          <Link
            to="/insights"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-950"
          >
            View Public Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}