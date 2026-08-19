import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Define the Target",
      description:
        "We establish the companies, decision-makers, services, geography, and commercial characteristics that matter most to your MSP. The objective is to define what a valuable account actually looks like before research begins.",
    },
    {
      number: "02",
      title: "Research & Evidence",
      description:
        "We identify high-fit companies and investigate objectively verifiable commercial changes. The goal is to find real context that can support a credible reason for starting a conversation.",
    },
    {
      number: "03",
      title: "Qualify the Opportunity",
      description:
        "We evaluate whether the prospect's situation actually connects with your MSP's capabilities. ICP fit alone is not enough; there needs to be a legitimate commercial connection.",
    },
    {
      number: "04",
      title: "Personalize & Engage",
      description:
        "We turn the strongest verified context into concise, relevant messaging. Personalization is built around why the account is worth contacting rather than superficial observations.",
    },
    {
      number: "05",
      title: "Learn & Optimize",
      description:
        "We analyze replies, objections, engagement, targeting patterns, and campaign performance. What the market teaches us becomes input for the next iteration.",
    },
  ];

  const compatibility = [
    {
      number: "01",
      title: "ICP Fit",
      text: "Does the company match the market and account characteristics we're targeting?",
    },
    {
      number: "02",
      title: "Commercial Change",
      text: "Has something objectively changed that makes the account more relevant now?",
    },
    {
      number: "03",
      title: "Requirement Mechanism",
      text: "Does that change create a legitimate connection to a business requirement?",
    },
    {
      number: "04",
      title: "MSP Capability",
      text: "Can the MSP credibly support that requirement through its existing capabilities?",
    },
    {
      number: "05",
      title: "Relevant Opportunity",
      text: "Is there enough verified context to justify investing in a conversation?",
    },
  ];

  const feedback = [
    {
      number: "01",
      title: "Observe",
      text: "Collect real market responses, objections, engagement, and account-level patterns.",
    },
    {
      number: "02",
      title: "Analyze",
      text: "Identify what is working, where relevance is weak, and which assumptions need testing.",
    },
    {
      number: "03",
      title: "Refine",
      text: "Improve targeting, research criteria, messaging, and execution based on evidence.",
    },
    {
      number: "04",
      title: "Repeat",
      text: "Run the next iteration with a better understanding of the market.",
    },
  ];

  return (
    <div className="bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-24 pt-36 sm:px-6 lg:pb-32 lg:pt-44">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        <Container>
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
              How CloviraHQ Works
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              From commercial evidence to relevant sales conversations.
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              CloviraHQ connects targeting, commercial research, compatibility
              analysis, personalized outreach, and continuous learning into
              one managed outbound process.
            </p>

            <div className="mt-8">
              <Button href={bookingLink}>
                Explore Partnership Fit
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              The Process
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Five stages. One connected system.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Each stage exists to improve the quality of the next. The
              objective is not to create more outbound activity, but to make
              each prospect that reaches engagement more relevant.
            </p>
          </div>

          <div className="relative mt-14">
            <div className="absolute left-8 top-8 hidden h-[calc(100%-64px)] w-px bg-blue-400/20 md:block" />

            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative grid gap-6 md:grid-cols-[64px_1fr]"
                >
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/20 bg-slate-950 text-sm font-bold text-blue-400 shadow-lg shadow-blue-950/20">
                    {step.number}
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-slate-950 p-7 transition duration-300 hover:border-blue-400/30 hover:bg-white/[0.02] sm:p-8">
                    <h3 className="text-2xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 max-w-3xl leading-8 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Compatibility */}
      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Core Principle
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Compatibility comes before volume.
              </h2>

              <p className="mt-5 leading-8 text-slate-300">
                A company can match your ICP and still be a poor outreach
                opportunity. Firmographic similarity alone does not explain
                why a conversation should happen now.
              </p>

              <p className="mt-5 leading-8 text-slate-400">
                We therefore look for the intersection between what is
                happening inside the prospect and what your MSP can
                legitimately help with.
              </p>

              <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/[0.04] p-5">
                <p className="text-sm font-medium leading-7 text-blue-200">
                  Fit tells us who the company is. Commercial evidence tells
                  us what has changed. Compatibility tells us whether that
                  change creates a conversation worth having.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
              <div className="space-y-3">
                {compatibility.map((item) => (
                  <div
                    key={item.number}
                    className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4 transition duration-300 hover:border-blue-400/30"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-sm font-semibold text-blue-400">
                      {item.number}
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Feedback Loop */}
      <section className="border-y border-white/10 bg-slate-900/40 px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Continuous Learning
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Every campaign should make the next campaign smarter.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Outbound is not a one-time setup. The market gives us feedback
              through replies, objections, engagement, and patterns in
              prospect behavior.
            </p>
          </div>

          <div className="mt-14 grid gap-4 lg:grid-cols-4">
            {feedback.map((item, index) => (
              <div key={item.title} className="relative">
                {index < feedback.length - 1 && (
                  <div className="absolute right-[-10px] top-8 hidden h-px w-5 bg-blue-400/20 lg:block" />
                )}

                <div className="h-full rounded-2xl border border-white/10 bg-slate-950 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30">
                  <span className="text-sm font-semibold text-blue-400">
                    {item.number}
                  </span>

                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-400">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
            <p className="text-sm font-medium text-slate-300">
              Observe → Analyze → Refine → Repeat
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-5 py-24 sm:px-6 lg:py-32">
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-12 text-center shadow-2xl sm:px-10 sm:py-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Start With Fit
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              See whether this process makes sense for your MSP.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              We'll examine your current acquisition approach, target market,
              services, and growth objectives before determining whether a
              partnership makes sense.
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
