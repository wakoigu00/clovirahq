const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

const measurementAreas = [
  {
    number: "01",
    title: "Targeting Quality",
    description:
      "Are we consistently reaching companies that fit the defined ICP, service priorities, geography, and commercial profile?",
  },
  {
    number: "02",
    title: "Evidence Yield",
    description:
      "How often does research uncover verified commercial context strong enough to justify deeper qualification?",
  },
  {
    number: "03",
    title: "Opportunity Quality",
    description:
      "Do the prospect's circumstances actually connect with the MSP's capabilities and create a credible reason for conversation?",
  },
  {
    number: "04",
    title: "Market Response",
    description:
      "What do replies, objections, engagement patterns, and conversations reveal about the market?",
  },
];

const learningStages = [
  {
    number: "01",
    title: "Observe",
    description:
      "Collect evidence from prospect research and real campaign responses.",
  },
  {
    number: "02",
    title: "Diagnose",
    description:
      "Identify where targeting, qualification, messaging, or execution is limiting performance.",
  },
  {
    number: "03",
    title: "Refine",
    description:
      "Adjust the relevant part of the system based on what the evidence supports.",
  },
  {
    number: "04",
    title: "Repeat",
    description:
      "Run the next iteration with a clearer hypothesis and better-defined targeting.",
  },
];

const systemSignals = [
  "ICP fit",
  "Commercial evidence",
  "Opportunity relevance",
  "Reply quality",
  "Conversation quality",
  "Objections",
  "Messaging patterns",
  "Campaign efficiency",
];

export default function Results() {
  return (
    <main className="bg-slate-950 text-white">

      {/* HERO */}

      <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">

            <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              Measurement &amp; Learning
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Don't just measure activity.
              <br />
              <span className="text-blue-400">
                Measure what the market is teaching you.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              CloviraHQ treats outbound as an evolving system. We measure the
              quality of the accounts we target, the strength of the commercial
              evidence we uncover, the quality of market responses, and the
              lessons that should shape the next iteration.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
              >
                Explore Partnership Fit
              </a>

              <a
                href="#measurement"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-7 py-4 font-semibold text-slate-200 transition hover:bg-white/5"
              >
                See What We Measure
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* PHILOSOPHY */}

      <section
        id="measurement"
        className="scroll-mt-24 border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Measurement Philosophy
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              More emails sent does not necessarily mean a better outbound
              system.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Activity metrics can tell you what happened. They do not always
              tell you why it happened or what should change next. Our focus is
              on the evidence underneath campaign performance.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-7">
              <span className="text-sm font-semibold text-blue-400">
                01
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Activity
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                What was sent, delivered, followed up, and responded to?
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-7">
              <span className="text-sm font-semibold text-blue-400">
                02
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Quality
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Were the accounts, commercial situations, and conversations
                actually relevant?
              </p>
            </div>

            <div className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-7">
              <span className="text-sm font-semibold text-blue-300">
                03
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Learning
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                What does the evidence tell us to change in the next iteration?
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* WHAT WE MEASURE */}

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              What We Measure
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The quality of the system matters at every stage.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Different parts of the outbound process produce different forms
              of evidence. We use those signals to determine where attention
              should go next.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">

            {measurementAreas.map((item) => (
              <div
                key={item.number}
                className="group rounded-3xl border border-white/10 bg-slate-900/50 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-semibold text-blue-400">
                    {item.number}
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-600">
                    Signal
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-xl leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* SYSTEM SIGNALS */}

      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Evidence Layer
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Every campaign produces information beyond the reply rate.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              A campaign can reveal that the problem is not simply the email.
              The evidence may point to weak targeting, insufficient commercial
              relevance, poor qualification, an unclear offer, or a mismatch
              between the prospect and the service being promoted.
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              That distinction matters because the correct response depends on
              where the constraint actually sits.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950 p-7 sm:p-9">

            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Signals We Learn From
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">

              {systemSignals.map((signal, index) => (
                <div
                  key={signal}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-xs font-semibold text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <span className="text-sm font-medium text-slate-300">
                    {signal}
                  </span>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>


      {/* LEARNING LOOP */}

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Continuous Optimization
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The campaign should make the next campaign smarter.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Outbound improves when every iteration has a clear hypothesis,
              measurable evidence, and a defined adjustment based on what the
              market actually showed us.
            </p>
          </div>

          <div className="relative mt-14">

            <div className="absolute left-8 top-8 hidden h-[calc(100%-64px)] w-px bg-white/10 md:block" />

            <div className="space-y-5">

              {learningStages.map((stage) => (
                <div
                  key={stage.number}
                  className="relative grid gap-5 md:grid-cols-[64px_1fr]"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold shadow-lg">
                    {stage.number}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-7">
                    <h3 className="text-xl font-semibold">
                      {stage.title}
                    </h3>

                    <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>


      {/* TRANSPARENCY */}

      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-3xl border border-white/10 bg-slate-950 p-8 text-center sm:p-12">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Evidence Over Claims
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              We would rather show validated results than manufacture
              impressive numbers.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              CloviraHQ is building its proof base through real market
              execution. As campaigns mature, validated client outcomes and
              performance data will become part of this page.
            </p>

            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5 text-left">
              <p className="text-sm font-semibold text-blue-300">
                What this means for prospective partners
              </p>

              <p className="mt-2 leading-7 text-slate-300">
                You are not being asked to believe a collection of polished
                case-study numbers. The objective is to build the evidence
                together through a controlled outbound process.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* CTA */}

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-4xl rounded-3xl border border-blue-400/20 bg-blue-500/10 px-6 py-12 text-center sm:px-10 sm:py-16">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Explore Partnership Fit
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Want to build an outbound system that learns from the market?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Let's examine your current acquisition approach, target market,
            services, and growth objectives and determine whether the
            CloviraHQ approach makes sense for your MSP.
          </p>

          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Explore Partnership Fit
          </a>

        </div>
      </section>

    </main>
  );
}