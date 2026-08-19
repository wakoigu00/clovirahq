import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import {
  Target,
  Search,
  BarChart3,
} from "lucide-react";

export default function WhyClovira() {
  const challenges = [
    {
      icon: Target,
      number: "01",
      title: "ICP Fit Is Not Timing",
      description:
        "A company can match your ideal customer profile and still be a poor prospect today. CloviraHQ looks beyond firmographics to identify accounts with a credible reason to engage now.",
    },
    {
      icon: Search,
      number: "02",
      title: "Personalization Needs a Reason",
      description:
        "Using a prospect's name or mentioning their company is not enough. Effective outreach starts with understanding what has changed and why that change makes the conversation relevant.",
    },
    {
      icon: BarChart3,
      number: "03",
      title: "Activity Should Create Learning",
      description:
        "More emails do not automatically create a better pipeline. Every campaign should reveal which accounts, signals, messages, and offers are actually generating meaningful responses.",
    },
  ];

  return (
    <section
      id="growth"
      className="
        relative
        scroll-mt-24
        overflow-hidden
        py-20
        sm:py-28
      "
    >
      {/* Background Glow */}

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
          blur-[120px]
          sm:h-[450px]
          sm:w-[450px]
        "
      />

      <Container>
        <SectionHeading
          eyebrow="Why Outbound Needs More Than Volume"
          title="The best prospect is not simply the one that fits your ICP."
          description="A strong outbound system needs to answer three questions: Is this the right account? Is there a credible reason to engage now? And does that reason connect to what you sell?"
          center
        />

        <div
          className="
            mt-10
            grid
            gap-6
            sm:mt-16
            md:grid-cols-3
          "
        >
          {challenges.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="
                  group
                  border-white/10
                  bg-white/[0.05]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-400/30
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-500/10
                      transition
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <Icon
                      className="
                        h-6
                        w-6
                        text-blue-400
                      "
                    />
                  </div>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-blue-400
                    "
                  >
                    {item.number}
                  </span>
                </div>

                <h3
                  className="
                    mt-6
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-4
                    leading-7
                    text-slate-400
                  "
                >
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Solution Bridge */}

        <div
          className="
            mx-auto
            mt-14
            max-w-4xl
            rounded-3xl
            border
            border-blue-400/20
            bg-blue-500/10
            px-6
            py-8
            text-center
            sm:px-10
          "
        >
          <p
            className="
              text-base
              leading-8
              text-slate-200
              sm:text-lg
            "
          >
            CloviraHQ connects ICP targeting, commercial research,
            compatibility analysis, personalized outreach, and campaign
            optimization into one outbound system built around commercial
            relevance.
          </p>
        </div>
      </Container>
    </section>
  );
}