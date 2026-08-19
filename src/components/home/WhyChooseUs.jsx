import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import {
  Target,
  Search,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const reasons = [
  {
    icon: Target,
    title: "Commercial Relevance First",
    description:
      "We do not treat every company that matches an ICP as an opportunity. We look for verified business context that gives the outreach a credible reason to exist.",
  },
  {
    icon: Search,
    title: "Research Before Outreach",
    description:
      "Prospects are researched before messaging begins. The goal is to understand what is happening inside the account and identify the strongest angle for a conversation.",
  },
  {
    icon: MessageSquare,
    title: "Conversations Over Volume",
    description:
      "We prioritize relevance over sending as many messages as possible. Better targeting and stronger context create a better foundation for meaningful replies.",
  },
  {
    icon: TrendingUp,
    title: "Built to Improve",
    description:
      "Outbound becomes more valuable when every campaign produces learning. We continuously use market feedback to improve targeting, messaging, and execution.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
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
          blur-[120px]
          sm:h-[450px]
          sm:w-[450px]
        "
      />

      <Container>
        <SectionHeading
          eyebrow="Why Choose CloviraHQ"
          title="Outbound built around relevance, not just activity."
          description="CloviraHQ combines commercial research, compatibility analysis, personalized messaging, and continuous optimization to create a more intelligent outbound system."
          center
        />

        <div
          className="
            mt-10
            grid
            gap-6
            sm:mt-16
            md:grid-cols-2
          "
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.05]
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-400/30
                  hover:shadow-2xl
                  sm:p-8
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-blue-500/20
                      transition-all
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <Icon
                      className="
                        h-7
                        w-7
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
                    0{index + 1}
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
                  {reason.title}
                </h3>

                <p
                  className="
                    mt-4
                    leading-7
                    text-slate-400
                  "
                >
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div
          className="
            mx-auto
            mt-12
            max-w-3xl
            text-center
          "
        >
          <p
            className="
              text-sm
              leading-7
              text-slate-500
              sm:text-base
            "
          >
            The objective is not simply to increase outbound activity. It is
            to build a system that becomes more precise, more relevant, and
            more effective as it learns from the market.
          </p>
        </div>
      </Container>
    </section>
  );
}