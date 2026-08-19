import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

export default function About() {
  const principles = [
    {
      number: "01",
      title: "Relevance Before Volume",
      description:
        "Outbound starts with deciding which companies are worth contacting, not simply how many companies can be added to a list.",
    },
    {
      number: "02",
      title: "Evidence Before Assumptions",
      description:
        "Commercial research should be grounded in information that can actually be verified. We do not manufacture personalization or invent reasons for outreach.",
    },
    {
      number: "03",
      title: "Compatibility Before Outreach",
      description:
        "An ICP match does not automatically create an opportunity. We evaluate whether the prospect's situation actually connects with the MSP's capabilities.",
    },
    {
      number: "04",
      title: "Learning Over Vanity Metrics",
      description:
        "Replies, objections, targeting patterns, and campaign performance should improve the next iteration. Outbound should become more intelligent over time.",
    },
  ];

  const differences = [
    {
      title: "Targeting",
      text: "Prioritize accounts based on fit and relevant commercial context rather than list size alone.",
    },
    {
      title: "Research",
      text: "Ground personalization in information that can be verified instead of generic observations.",
    },
    {
      title: "Qualification",
      text: "Evaluate compatibility before investing outreach effort.",
    },
    {
      title: "Learning",
      text: "Feed market feedback back into targeting, messaging, and execution.",
    },
  ];

  return (
    <div className="bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <Container>
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              About CloviraHQ
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Building a more intelligent approach to MSP outbound.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              CloviraHQ helps Managed Service Providers build a more
              predictable outbound channel by connecting commercial research,
              prospect qualification, personalized outreach, and continuous
              learning.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
              We believe effective outbound is not defined by how much
              activity a company can generate. It is defined by how
              intelligently it decides where that activity belongs.
            </p>
          </div>
        </Container>
      </section>

      {/* Why We Exist */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Why CloviraHQ Exists
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Built around a simple idea: relevance creates better
                conversations.
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                Modern outbound makes it easy to find thousands of companies
                and send thousands of emails. But scale does not automatically
                create relevance.
              </p>

              <p className="mt-5 leading-8 text-slate-400">
                CloviraHQ was built to approach the problem differently:
                understand the account, identify what has objectively changed,
                determine whether that change creates a legitimate
                opportunity, and then decide whether outreach makes sense.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950 p-8 shadow-2xl sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Our Core Idea
              </p>

              <blockquote className="mt-5 text-2xl font-semibold leading-relaxed text-white sm:text-3xl">
                "The goal isn't to contact more companies. It's to identify
                more companies worth contacting."
              </blockquote>

              <div className="mt-8 h-px bg-white/10" />

              <p className="mt-6 leading-7 text-slate-400">
                That principle influences how we approach targeting, research,
                qualification, personalization, and campaign optimization.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              What We Believe
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Four principles guide how we build outbound.
            </h2>

            <p className="mt-5 leading-8 text-slate-400">
              These principles shape how CloviraHQ evaluates opportunities,
              designs campaigns, and learns from the market.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.05] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-400">
                    {principle.number}
                  </span>

                  <div className="h-px w-16 bg-blue-400/20" />
                </div>

                <h3 className="mt-7 text-xl font-semibold text-white">
                  {principle.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How We Think */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                How We Think
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Better outbound starts before the first email.
              </h2>

              <p className="mt-5 leading-8 text-slate-400">
                We think about outbound as a decision-making process, not
                simply a communication channel.
              </p>

              <p className="mt-5 leading-8 text-slate-400">
                The work begins by understanding the market and the account.
                Outreach comes later, once there is enough context to make the
                conversation relevant.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ThinkCard
                number="01"
                title="Understand"
                text="Start with the market, ICP, services, and commercial context."
              />

              <ThinkCard
                number="02"
                title="Verify"
                text="Separate useful evidence from assumptions and generic observations."
              />

              <ThinkCard
                number="03"
                title="Connect"
                text="Find the legitimate connection between the prospect's situation and the MSP's capabilities."
              />

              <ThinkCard
                number="04"
                title="Learn"
                text="Use market feedback to make the next targeting and messaging decision better."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* What Makes CloviraHQ Different */}
      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                The Difference
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                We are building an outbound system, not just running a
                campaign.
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                A campaign can generate activity for a few weeks. A system
                should become better as it operates.
              </p>

              <p className="mt-5 leading-8 text-slate-400">
                That means understanding which accounts respond, which
                commercial signals matter, which messaging angles create
                conversations, and where the process needs to improve.
              </p>
            </div>

            <div className="space-y-4">
              {differences.map((difference) => (
                <DifferenceCard
                  key={difference.title}
                  title={difference.title}
                  text={difference.text}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Starting Small */}
      <section className="border-y border-white/10 bg-blue-500/[0.04] px-5 py-24 sm:px-6 lg:py-28">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Starting Small
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              We are intentionally building this with a small number of MSPs.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl leading-8 text-slate-400">
              CloviraHQ is starting with a limited number of pilot partners so
              we can maintain close collaboration, collect high-quality market
              feedback, and refine the outbound system through real execution.
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
              Work With CloviraHQ
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Build a more predictable outbound channel for your MSP.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              If this approach matches how you want to build pipeline, let's
              examine your market, target accounts, services, and growth
              objectives to determine whether CloviraHQ is the right fit.
            </p>

            <div className="mt-8 flex justify-center">
              <Button href={bookingLink}>
                Explore Partnership Fit
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function ThinkCard({ number, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30">
      <span className="text-sm font-semibold text-blue-400">{number}</span>

      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function DifferenceCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-blue-400/30">
      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
    </div>
  );
}
