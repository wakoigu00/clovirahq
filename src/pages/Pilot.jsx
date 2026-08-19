import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

const features = [
  {
    number: "01",
    title: "Strategy & ICP Alignment",
    description:
      "Define the services, markets, decision-makers, account characteristics, and commercial priorities that should guide the outbound program.",
  },
  {
    number: "02",
    title: "Prospect Research",
    description:
      "Identify high-fit accounts and investigate verified commercial developments that can provide meaningful context for outreach.",
  },
  {
    number: "03",
    title: "Personalized Outreach",
    description:
      "Turn the strongest prospect context into concise messaging that gives the recipient a credible reason to engage.",
  },
  {
    number: "04",
    title: "Campaign Execution",
    description:
      "Manage prospect preparation, sequencing, follow-ups, and campaign operations while monitoring what the market tells us.",
  },
  {
    number: "05",
    title: "Continuous Optimization",
    description:
      "Use replies, objections, engagement, and campaign data to improve targeting, research criteria, messaging, and execution.",
  },
  {
    number: "06",
    title: "Market Intelligence",
    description:
      "Turn campaign feedback into useful intelligence about your market, prospects, objections, and messaging opportunities.",
  },
];

const fit = [
  "A growing MSP with a defined service offering",
  "A desire to reduce dependence on referrals",
  "Capacity to onboard additional clients",
  "A clear target market or emerging ICP",
  "Willingness to collaborate and provide feedback",
  "Interest in building a repeatable outbound channel",
];

const notFit = [
  "Looking for guaranteed meetings immediately",
  "Wanting mass-volume generic outreach",
  "No capacity for additional clients",
  "Unwilling to provide market feedback",
  "Expecting outbound to replace the entire sales process",
  "Unwilling to test and refine the approach",
];

export default function Pilot() {
  return (
    <main className="bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                Limited MSP Pilot Program
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Build an outbound system around your actual market.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                CloviraHQ is working with a limited number of MSPs to build,
                test, and refine research-driven outbound systems through real
                market execution.
              </p>

              <p className="mt-5 max-w-2xl leading-8 text-slate-400">
                The goal is not to manufacture activity. It is to determine
                which accounts are worth pursuing, why the timing may matter,
                and what messaging creates legitimate conversations.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button href={bookingLink}>
                  Explore Partnership Fit
                </Button>

                <a
                  href="#pilot"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/5"
                >
                  See What's Included
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                <span>✓ Limited partner capacity</span>
                <span>✓ Founder-led collaboration</span>
                <span>✓ Research-driven execution</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Pilot */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Why Start With A Pilot
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Outbound should be tested against your real market.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Your offer, market, positioning, targeting, and sales process all
              affect outbound performance. A pilot gives us the opportunity to
              test those variables together instead of assuming the right
              system can be designed without market feedback.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <PilotCard
              number="01"
              title="Focused Attention"
              text="A limited partner base allows us to spend more time researching, testing, and refining each outbound system."
            />

            <PilotCard
              number="02"
              title="Real Market Feedback"
              text="Prospect responses reveal what creates interest, what creates objections, and where the opportunity may be strongest."
            />

            <PilotCard
              number="03"
              title="Continuous Improvement"
              text="The system becomes more precise as evidence accumulates from actual campaigns and conversations."
            />
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section
        id="pilot"
        className="scroll-mt-24 px-5 py-24 sm:px-6 lg:py-32"
      >
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              What's Included
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A managed outbound system built through execution.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              The pilot goes beyond supplying a prospect list. We build the
              research, qualification, outreach, and learning process required
              to develop a repeatable acquisition channel.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-7
                  transition
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-400/30
                  hover:bg-white/[0.05]
                "
              >
                <span className="text-sm font-semibold text-blue-400">
                  {feature.number}
                </span>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pilot Philosophy */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                What The Pilot Is Really For
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                The first objective is learning what actually works.
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                Early outbound data should answer important commercial
                questions: Which accounts are worth pursuing? Which signals
                matter? Which messaging angles create conversations?
              </p>

              <p className="mt-5 leading-8 text-slate-400">
                That learning becomes part of the system. The purpose of the
                pilot is to create a stronger foundation for predictable
                outbound rather than simply produce a short burst of activity.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-7 sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                The Learning Loop
              </p>

              <div className="mt-6 space-y-3">
                <LoopItem number="01" text="Identify the right accounts" />
                <LoopItem number="02" text="Research commercial context" />
                <LoopItem number="03" text="Test relevant messaging" />
                <LoopItem number="04" text="Capture market feedback" />
                <LoopItem number="05" text="Refine the system" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Partnership Fit */}
      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Partnership Fit
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The pilot is designed for MSPs ready to build, test, and learn.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              The strongest partnerships are with MSPs that already have a
              credible service offering and want to develop a more repeatable
              way to create sales conversations.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FitCard
              title="Strong Fit"
              positive
              items={fit}
            />

            <FitCard
              title="Probably Not A Fit"
              items={notFit}
            />
          </div>
        </Container>
      </section>

      {/* Limited Availability */}
      <section className="border-y border-white/10 bg-blue-500/[0.04] px-5 py-24 sm:px-6 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Limited Pilot Capacity
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              We are keeping the pilot intentionally small.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              Limiting the number of pilot partners allows for closer
              collaboration, higher-quality research, and faster learning from
              real market feedback.
            </p>

            <div className="mt-8 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300">
              Limited MSP Pilot
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24 pt-24 sm:px-6 lg:pb-32 lg:pt-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Explore Partnership Fit
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              See whether the CloviraHQ approach fits your MSP.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              We'll examine your services, target market, current acquisition
              approach, and growth objectives before deciding whether a pilot
              makes sense.
            </p>

            <div className="mt-8 flex justify-center">
              <Button href={bookingLink}>
                Explore Partnership Fit
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>✓ No long-term commitment</span>
              <span>✓ Strategy-focused conversation</span>
              <span>✓ Limited pilot availability</span>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function PilotCard({ number, title, text }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-slate-950
        p-7
        transition
        duration-300
        hover:-translate-y-1
        hover:border-blue-400/20
      "
    >
      <span className="text-sm font-semibold text-blue-400">
        {number}
      </span>

      <h3 className="mt-5 text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {text}
      </p>
    </div>
  );
}

function LoopItem({ number, text }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/60 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-semibold text-blue-400">
        {number}
      </div>

      <span className="text-sm font-medium text-slate-200">
        {text}
      </span>
    </div>
  );
}

function FitCard({ title, items, positive = false }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950 p-7 sm:p-8">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            positive
              ? "bg-blue-500/10 text-blue-400"
              : "bg-white/5 text-slate-500"
          }`}
        >
          {positive ? "✓" : "×"}
        </div>

        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
      </div>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-slate-400">
            <span
              className={
                positive ? "text-blue-400" : "text-slate-600"
              }
            >
              {positive ? "✓" : "×"}
            </span>

            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}