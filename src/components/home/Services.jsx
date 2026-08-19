import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import {
  Search,
  MessageSquare,
  Settings,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Search,
    title: "Commercial Research & Targeting",
    description:
      "Identify MSP prospects that fit your ICP and research verified business changes that create a credible reason to start a conversation.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Research-Driven Outreach",
    description:
      "Turn prospect research into concise, relevant messaging tailored to the company, decision-maker, and reason for reaching out.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Campaign Operations",
    description:
      "Manage prospecting, sequencing, sending, follow-ups, and campaign execution so outbound runs consistently without becoming another task on your team.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Optimization & Intelligence",
    description:
      "Use replies, objections, engagement, and campaign data to continuously improve targeting, messaging, and outbound execution.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="
        scroll-mt-24
        py-20
        sm:py-28
      "
    >
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="A complete outbound system built around commercial relevance."
          description="CloviraHQ combines research, targeting, personalized outreach, campaign operations, and continuous optimization into one managed outbound system for MSPs."
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
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.title}
                className="
                  group
                  border-white/10
                  bg-white/[0.05]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-400/30
                  hover:shadow-2xl
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
                    bg-blue-500/10
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

                <div
                  className="
                    mt-5
                    text-xs
                    font-semibold
                    tracking-wider
                    text-blue-400
                  "
                >
                  {service.number}
                </div>

                <h3
                  className="
                    mt-3
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    mt-4
                    leading-7
                    text-slate-400
                  "
                >
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div
          className="
            mx-auto
            mt-10
            max-w-3xl
            text-center
            sm:mt-12
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
            Every campaign produces intelligence that helps improve the next
            one — making the outbound system more precise over time.
          </p>
        </div>
      </Container>
    </section>
  );
}