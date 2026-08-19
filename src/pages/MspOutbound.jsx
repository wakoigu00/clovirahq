import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import {
  Search,
  ShieldCheck,
  Target,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

const system = [
  {
    number: "01",
    icon: Target,
    title: "Define the Market",
    description:
      "Establish the companies, decision-makers, geography, services, and commercial characteristics that represent the strongest fit for your MSP.",
  },
  {
    number: "02",
    icon: Search,
    title: "Find Commercial Evidence",
    description:
      "Research objectively verifiable business changes that indicate something meaningful is happening inside the account.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Validate the Opportunity",
    description:
      "Evaluate whether the prospect's situation actually connects with your MSP's capabilities before prioritizing outreach.",
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "Create the Conversation",
    description:
      "Turn the strongest verified context into concise, relevant messaging for the appropriate decision-maker.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Learn & Optimize",
    description:
      "Use replies, objections, engagement, and campaign data to continuously improve targeting and messaging.",
  },
];

const deliverables = [
  "ICP and targeting strategy",
  "Commercial prospect research",
  "Decision-maker identification",
  "Verified business signals",
  "Research-driven messaging",
  "Outbound campaign execution",
  "Follow-up management",
  "Performance monitoring",
  "Targeting and messaging optimization",
];

const qualification = [
  "Company fit",
  "Verified commercial change",
  "Relevant business context",
  "MSP capability alignment",
  "Decision-maker alignment",
  "Outreach opportunity",
];

export default function MspOutbound() {
  return (
    <main className="bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-6 sm:pt-40 lg:pb-32">
        <div className="absolute left-1/2 top-0 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px] sm:h-[600px] sm:w-[600px]" />

        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <div className="mx-auto inline-flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              Outbound Growth for Managed Service Providers
            </div>

            <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Turn commercial signals into
              <span className="text-blue-400">
                {" "}
                relevant sales conversations.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              CloviraHQ builds research-driven outbound systems for growing
              MSPs — identifying the right accounts, finding verified
              commercial change, evaluating opportunity fit, and turning that
              context into personalized outreach.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href={bookingLink}>
                Explore Partnership Fit
                <ArrowRight className="h-5 w-5" />
              </Button>

              <a
                href="#system"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 px-7 py-4 font-semibold text-slate-200 transition hover:bg-white/5"
              >
                See the System
              </a>
            </div>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 text-sm text-slate-400 sm:flex-row sm:gap-6">
              <span>✓ MSP-focused targeting</span>
              <span>✓ Evidence-based research</span>
              <span>✓ Personalized outreach</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              The MSP Growth Problem
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Strong technical delivery does not automatically create a
              predictable pipeline.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Many MSPs have strong services, loyal clients, and a healthy
              referral network. The challenge is creating a repeatable way to
              reach companies that do not already know them.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <ProblemCard
              number="01"
              title="Referral Dependency"
              text="Referrals can produce excellent clients, but they are difficult to control, forecast, or scale consistently."
            />

            <ProblemCard
              number="02"
              title="Generic Prospecting"
              text="Large prospect lists and generic messaging create activity without necessarily creating meaningful conversations."
            />

            <ProblemCard
              number="03"
              title="Poor Timing"
              text="A company can fit your ICP and still have no obvious commercial reason to consider a new conversation today."
            />
          </div>
        </Container>
      </section>

      {/* System */}
      <section
        id="system"
        className="scroll-mt-24 px-5 py-24 sm:px-6 lg:py-32"
      >
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              The CloviraHQ System
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Research first. Outreach second.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Outreach should be the execution of a strategy — not the
              strategy itself. We build the research and qualification layer
              before the message reaches the prospect.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {system.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>

                    <span className="text-sm font-semibold text-blue-400">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Research Advantage */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                The Research Advantage
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Not every company that fits your ICP deserves an email.
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                Firmographic fit is only the starting point. The more important
                question is whether there is a credible commercial reason to
                start a conversation.
              </p>

              <p className="mt-5 leading-8 text-slate-400">
                CloviraHQ looks for objectively verifiable changes inside
                target companies, then evaluates whether those changes actually
                connect with the MSP's capabilities.
              </p>

              <div className="mt-7 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-5">
                <p className="font-medium leading-7 text-blue-100">
                  Compatibility comes before volume.
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  A company matching your ICP is not automatically an
                  opportunity.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-7 sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
                Opportunity Qualification
              </p>

              <div className="mt-6 space-y-4">
                {qualification.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-900/60 p-4"
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
        </Container>
      </section>

      {/* Deliverables */}
      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              What Your MSP Gets
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A managed outbound growth system — not just a lead list.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              CloviraHQ handles the research, targeting, outreach operations,
              and optimization required to turn outbound into a repeatable
              growth process.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/50 p-5 text-slate-300"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Fit */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Partnership Fit
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for MSPs ready to make outbound a real growth channel.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              The strongest partnerships start with realistic expectations,
              sufficient delivery capacity, and a willingness to learn from
              the market.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <FitCard
              title="Good fit"
              positive
              items={[
                "Growing MSP with a defined service offering",
                "Wants to reduce dependence on referrals",
                "Has capacity to onboard new clients",
                "Willing to collaborate on targeting and messaging",
                "Interested in building a repeatable sales channel",
              ]}
            />

            <FitCard
              title="Probably not a fit"
              items={[
                "Looking for instant guaranteed meetings",
                "Wants mass-volume generic outreach",
                "Has no capacity for additional clients",
                "Isn't willing to provide market feedback",
                "Expects outbound to replace the entire sales process",
              ]}
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl border border-blue-400/20 bg-blue-500/10 px-6 py-12 text-center sm:px-10 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
              Explore Partnership Fit
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Could outbound become a predictable growth channel for your MSP?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              We'll look at your current client acquisition approach, target
              market, services, and growth objectives to determine whether the
              CloviraHQ approach makes sense for your business.
            </p>

            <div className="mt-8 flex justify-center">
              <Button href={bookingLink}>
                Explore Partnership Fit
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ProblemCard({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/20">
      <span className="text-sm font-semibold text-blue-400">{number}</span>

      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>

      <p className="mt-3 leading-7 text-slate-400">{text}</p>
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
              : "bg-white/5 text-slate-400"
          }`}
        >
          {positive ? "✓" : "×"}
        </div>

        <h3 className="text-xl font-semibold text-white">{title}</h3>
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