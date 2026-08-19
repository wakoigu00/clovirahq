const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

const services = [
  {
    number: "01",
    title: "Commercial Research & Targeting",
    description:
      "We build the research layer before outreach begins. We define the right accounts, identify decision-makers, and investigate verified commercial developments that can make an account worth prioritizing.",
    deliverables: [
      "ICP definition and refinement",
      "Target account research",
      "Decision-maker identification",
      "Commercial signal research",
      "Prospect qualification",
    ],
  },
  {
    number: "02",
    title: "Research-Driven Outreach",
    description:
      "We turn verified prospect context into concise, relevant messaging. The objective is to give each conversation a credible commercial reason to exist rather than simply adding personalization for appearance.",
    deliverables: [
      "Personalized messaging",
      "Commercial-context hooks",
      "Email sequence development",
      "Follow-up strategy",
      "Messaging refinement",
    ],
  },
  {
    number: "03",
    title: "Campaign Operations",
    description:
      "We manage the operational layer required to keep outbound running consistently, from prospect preparation and sequencing to follow-up execution and campaign monitoring.",
    deliverables: [
      "Campaign setup",
      "Prospect preparation",
      "Sequence management",
      "Follow-up execution",
      "Campaign monitoring",
    ],
  },
  {
    number: "04",
    title: "Optimization & Market Intelligence",
    description:
      "Every campaign creates information. We analyze replies, objections, engagement, and performance patterns to improve targeting, messaging, qualification, and execution.",
    deliverables: [
      "Performance analysis",
      "Reply analysis",
      "Objection tracking",
      "Targeting optimization",
      "Campaign iteration",
    ],
  },
];

const systemStages = [
  "Define the market",
  "Identify high-fit accounts",
  "Find verified commercial change",
  "Evaluate opportunity compatibility",
  "Create relevant outreach",
  "Learn from market response",
];

const expectations = [
  {
    title: "Not a Lead List",
    description:
      "You are not simply receiving a spreadsheet of contacts and being left to figure out what to do next. Research, qualification, messaging, and execution are connected.",
  },
  {
    title: "Not Mass Spam",
    description:
      "The objective is not to maximize email volume. Relevance, evidence, and learning come before scale.",
  },
  {
    title: "Not Guaranteed Meetings",
    description:
      "No outbound provider can control how prospects respond. Our job is to build and continuously improve the system that creates credible opportunities for conversation.",
  },
];

export default function Services() {
  return (
    <main className="bg-slate-950 text-white">

      {/* HERO */}

      <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">

            <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              CloviraHQ Services
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The research, outreach, and optimization layer behind a
              <span className="text-blue-400"> predictable outbound system.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              CloviraHQ combines commercial research, prospect targeting,
              personalized outreach, campaign operations, and continuous
              optimization into one managed outbound system built for MSPs.
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
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-7 py-4 font-semibold text-slate-200 transition hover:bg-white/5"
              >
                Explore Services
              </a>

            </div>

          </div>
        </div>
      </section>


      {/* SERVICES */}

      <section
        id="services"
        className="scroll-mt-24 border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              What We Do
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Four connected layers.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Outbound becomes more useful when research, messaging,
              execution, and optimization operate as one system rather than
              disconnected services.
            </p>
          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-2">

            {services.map((service) => (
              <div
                key={service.number}
                className="group rounded-3xl border border-white/10 bg-slate-950 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-2xl sm:p-8"
              >

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-400">
                    {service.number}
                  </span>

                  <span className="h-px w-16 bg-white/10 transition-all duration-300 group-hover:w-24 group-hover:bg-blue-400/40" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-400">
                  {service.description}
                </p>

                <div className="mt-7 border-t border-white/10 pt-6">

                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Included
                  </p>

                  <ul className="mt-4 space-y-3">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <span className="mt-0.5 text-blue-400">
                          ✓
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* DIFFERENCE */}

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              The CloviraHQ Difference
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              We don't separate research from outreach.
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Traditional outbound often starts with a database, adds a
              sequence, and measures success primarily through activity.
            </p>

            <p className="mt-5 leading-8 text-slate-400">
              CloviraHQ starts earlier. We first ask which companies deserve
              attention, what has objectively changed inside those companies,
              and whether that change creates a defensible reason to begin a
              conversation.
            </p>

            <div className="mt-7 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">
              <p className="font-medium leading-7 text-blue-100">
                Compatibility comes before volume.
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                The goal is not to contact more companies simply because they
                fit an ICP. The goal is to prioritize the companies where the
                evidence supports a relevant conversation.
              </p>
            </div>
          </div>


          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">

            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              Connected System
            </p>

            <div className="mt-6 space-y-4">

              {systemStages.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-sm font-semibold text-blue-400">
                    {index + 1}
                  </div>

                  <span className="font-medium text-slate-200">
                    {item}
                  </span>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>


      {/* WHAT WE DON'T DO */}

      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Clear Expectations
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What CloviraHQ is not.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              We would rather define the model clearly than promise outcomes
              that an outbound system cannot completely control.
            </p>
          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {expectations.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-950 p-7"
              >
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* WHO IT IS FOR */}

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Built For MSPs
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Best suited to MSPs that want outbound to become a real growth
              channel.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              The strongest fit is an MSP with a credible service offering,
              capacity for additional clients, and a willingness to improve
              its acquisition process through real market feedback.
            </p>
          </div>


          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {[
              "Defined service offering",
              "Clear target market",
              "Capacity for new clients",
              "Willingness to collaborate",
              "Interest in repeatable acquisition",
              "Openness to testing and refinement",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-sm font-semibold text-blue-400">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <span className="text-sm font-medium text-slate-300">
                  {item}
                </span>
              </div>
            ))}

          </div>
        </div>
      </section>


      {/* CTA */}

      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <div className="mx-auto max-w-4xl rounded-3xl border border-blue-400/20 bg-blue-500/10 px-6 py-12 text-center sm:px-10 sm:py-16">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
            Partnership Fit
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Build the outbound system around your MSP.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
            Let's look at your services, target market, current acquisition
            approach, and growth objectives to determine whether CloviraHQ is
            the right fit.
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