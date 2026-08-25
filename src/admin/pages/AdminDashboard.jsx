import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabase";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error) {
        console.error("Session error:", error);
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!data.session) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setUser(data.session.user);
      setLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setUser(session.user);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleSignOut() {
    setSigningOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
      setSigningOut(false);
      return;
    }

    navigate("/admin/login", { replace: true });
  }

  if (loading) {
    return (
      <section className="min-h-[80vh] bg-slate-50 px-6 py-16">
        <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

            <p className="text-sm text-slate-500">
              Loading admin portal...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              CloviraHQ
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Manage your CloviraHQ Insights publishing system.
            </p>

            {user?.email && (
              <p className="mt-2 text-xs text-slate-500">
                Signed in as {user.email}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/admin/articles"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              📝
            </div>

            <h2 className="text-xl font-bold text-slate-950">
              Articles
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              View, manage, edit, and publish CloviraHQ Insights articles.
            </p>

            <span className="mt-5 inline-flex text-sm font-semibold text-slate-900 group-hover:underline">
              Manage articles →
            </span>
          </Link>

          <Link
            to="/admin/articles/new"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              ✍️
            </div>

            <h2 className="text-xl font-bold text-slate-950">
              New Article
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Create a new Insight article and save it to your publishing
              database.
            </p>

            <span className="mt-5 inline-flex text-sm font-semibold text-slate-900 group-hover:underline">
              Create article →
            </span>
          </Link>

          <Link
            to="/insights"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-xl">
              🌐
            </div>

            <h2 className="text-xl font-bold text-slate-950">
              Live Insights
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Open the public CloviraHQ Insights section and review published
              articles.
            </p>

            <span className="mt-5 inline-flex text-sm font-semibold text-slate-900 group-hover:underline">
              View Insights →
            </span>
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Publishing System
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            This admin portal is connected to Supabase authentication. The
            next layer is the article management interface, where you will be
            able to create drafts, edit articles, publish them, and manage
            their metadata.
          </p>
        </div>
      </div>
    </section>
  );
}