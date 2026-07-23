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
    title: "Built Around MSP Growth",
    description:
      "CloviraHQ is designed specifically for Managed Service Providers, their buyers, and the challenges of building predictable growth.",
  },
  {
    icon: Search,
    title: "Research Before Outreach",
    description:
      "We identify the right companies, decision-makers, and business signals before starting any outreach.",
  },
  {
    icon: MessageSquare,
    title: "Conversations Over Volume",
    description:
      "We focus on reaching the right buyers with relevant messaging instead of sending generic mass emails.",
  },
  {
    icon: TrendingUp,
    title: "A System That Improves",
    description:
      "Campaign performance, targeting, and messaging are continuously refined to create a stronger outbound engine over time.",
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
          eyebrow="Why Choose CloviraHQ"
          title="A smarter outbound approach built for MSP growth."
          description="Unlike traditional outreach providers focused on volume, CloviraHQ combines research, personalization, and strategy to create meaningful conversations with the right decision-makers."
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


      </Container>

    </section>
  );
}