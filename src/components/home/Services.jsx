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
    title: "Market Intelligence",
    description:
      "Identify ideal MSP prospects, decision-makers, and business signals so outreach focuses on companies with the highest potential fit.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Personalized Outreach Systems",
    description:
      "Create research-driven messaging that connects with MSP buyers through relevant, personalized conversations.",
  },
  {
    number: "03",
    icon: Settings,
    title: "Outbound System Management",
    description:
      "Manage outreach workflows, monitor engagement, and maintain a consistent process designed to create qualified opportunities.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Optimization & Insights",
    description:
      "Continuously improve targeting, messaging, and campaign performance using real market feedback and engagement data.",
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
          title="A complete outbound system built for MSP growth."
          description="CloviraHQ combines market intelligence, personalized outreach, and continuous optimization to help MSPs build predictable sales conversations beyond referrals."
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


      </Container>
    </section>
  );
}