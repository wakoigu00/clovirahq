import { Link } from "react-router-dom";

export default function InsightsCTA() {
  return (
    <section className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 via-slate-900 to-slate-950 p-8 sm:p-10 lg:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-400">
              Ready to apply it?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Turn better research into better MSP conversations.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              CloviraHQ helps Managed Service Providers identify stronger
              prospects, connect verified commercial changes to their
              services, and build outbound systems designed to create
              qualified sales conversations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://cal.com/mosesmaina/msp-growth-strategy-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Explore Partnership Fit
                <span className="ml-2" aria-hidden="true">
                  &rarr;
                </span>
              </a>

              <Link
                to="/msp-outbound"
                className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                See Our Approach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}