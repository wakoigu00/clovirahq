import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

const steps = [
  {
    number: "01",
    title: "Define the Target",
    description:
      "We align on your ideal customer profile, services, geography, deal characteristics, and the types of accounts most valuable to your MSP.",
  },
  {
    number: "02",
    title: "Research & Evidence",
    description:
      "We identify high-fit companies and look for objectively verifiable commercial changes that create a credible reason to start a conversation.",
  },
  {
    number: "03",
    title: "Qualify the Fit",
    description:
      "We evaluate whether the prospect's situation actually connects with your MSP's capabilities before prioritizing the account for outreach.",
  },
  {
    number: "04",
    title: "Personalize & Engage",
    description:
      "We turn the verified opportunity into concise, relevant messaging tailored to the company and appropriate decision-maker.",
  },
  {
    number: "05",
    title: "Learn & Optimize",
    description:
      "We use responses, objections, engagement, and campaign data to continuously improve targeting, messaging, and execution.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="
        relative
        scroll-mt-24
        overflow-hidden
        py-20
        sm:py-28
      "
    >
      <div
        className="
          absolute
          left-1/2
          top-0
          -z-10
          h-[300px]
          w-[300px]
          -translate-x-1/2
          rounded-full
          bg-blue-600/10
          blur-[100px]
          sm:h-[400px]
          sm:w-[400px]
          sm:blur-[120px]
        "
      />

      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="From commercial evidence to relevant sales conversations."
          description="CloviraHQ combines targeting, commercial research, compatibility analysis, personalized outreach, and continuous learning into one managed outbound process."
          center
        />

        <div className="relative mt-12 sm:mt-20">
          <div
            className="
              absolute
              left-0
              right-0
              top-8
              hidden
              h-px
              bg-white/20
              lg:block
            "
          />

          <div
            className="
              grid
              gap-6
              lg:grid-cols-5
            "
          >
            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative"
              >
                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    duration-300
                    group-hover:scale-110
                  "
                >
                  {step.number}
                </div>

                <div
                  className="
                    mt-8
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    p-6
                    backdrop-blur-xl
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:-translate-y-2
                    group-hover:border-blue-400/30
                  "
                >
                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Principle */}

        <div
          className="
            mx-auto
            mt-14
            max-w-3xl
            rounded-3xl
            border
            border-blue-400/20
            bg-blue-500/10
            px-6
            py-8
            text-center
            sm:mt-16
            sm:px-10
          "
        >
          <p
            className="
              text-base
              font-medium
              leading-8
              text-slate-200
              sm:text-lg
            "
          >
            Compatibility comes before volume. A company matching your ICP is
            not automatically an opportunity — the commercial context has to
            make the conversation relevant.
          </p>
        </div>

        {/* CTA */}

        <div
          className="
            mt-16
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            px-6
            py-10
            text-center
            sm:px-10
            sm:py-12
          "
        >
          <h3
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Ready to build a repeatable outbound system?
          </h3>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              leading-7
              text-slate-300
            "
          >
            Explore whether your MSP is a fit for the CloviraHQ pilot and
            determine how an evidence-driven outbound system could support
            your growth goals.
          </p>

          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-8
              inline-flex
              rounded-xl
              bg-blue-600
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              hover:shadow-lg
              hover:shadow-blue-500/30
            "
          >
            Explore Partnership Fit
          </a>
        </div>
      </Container>
    </section>
  );
}