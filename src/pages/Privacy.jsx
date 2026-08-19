const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

export default function Privacy() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="px-5 pb-16 pt-36 sm:px-6 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Legal
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            How CloviraHQ collects, uses, and protects information when you
            interact with our website and services.
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 19, 2026
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-5 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-4xl space-y-12">
          <section>
            <h2 className="text-2xl font-semibold">
              1. Information We Collect
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              When you interact with CloviraHQ, we may collect information
              that you voluntarily provide, such as your name, email address,
              company name, job title, website, and other information you
              provide when requesting a consultation or discussing our
              services.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              We may also collect limited technical information about how you
              use our website, including pages visited, browser information,
              device information, and general usage data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              2. How We Use Information
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              We may use collected information to respond to inquiries,
              schedule consultations, provide services, improve our website,
              understand website usage, communicate about relevant services,
              and operate and improve our outbound systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              3. Analytics
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              CloviraHQ may use analytics tools to understand how visitors
              interact with the website. These tools may collect information
              such as page views, traffic sources, device information, and
              general interaction data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              4. Third-Party Services
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              We may use third-party platforms to support website analytics,
              scheduling, communication, customer relationship management,
              email infrastructure, and other business operations.
            </p>

            <p className="mt-4 leading-8 text-slate-400">
              These providers may process information according to their own
              privacy policies and terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              5. Data Retention
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              We retain information only for as long as reasonably necessary
              for the purposes described in this policy, including providing
              services, maintaining business records, resolving disputes, and
              meeting applicable legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              6. Data Security
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              We take reasonable measures to protect information from
              unauthorized access, misuse, alteration, or disclosure.
              However, no internet-based system can be guaranteed to be
              completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              7. Your Choices
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              You may contact us regarding information you have provided to
              CloviraHQ or request that we stop using your information for
              certain communications where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              8. Updates to This Policy
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              We may update this Privacy Policy from time to time as our
              services, technology, or legal obligations change. Any updated
              version will be published on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              9. Contact
            </h2>

            <p className="mt-4 leading-8 text-slate-400">
              If you have questions about this Privacy Policy or how
              CloviraHQ handles information, you can contact us through the
              partnership consultation process.
            </p>

            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Contact CloviraHQ
            </a>
          </section>
        </div>
      </section>
    </main>
  );
}