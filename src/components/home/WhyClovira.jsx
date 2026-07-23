import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import {
  AlertCircle,
  BarChart3,
  Target,
} from "lucide-react";

export default function WhyClovira() {
  const challenges = [
    {
      icon: AlertCircle,
      number: "01",
      title: "Referral Dependency",
      description:
        "Referrals are valuable, but relying only on word-of-mouth makes MSP growth inconsistent and difficult to predict.",
    },
    {
      icon: BarChart3,
      number: "02",
      title: "No Predictable Pipeline",
      description:
        "Without a structured outbound system, new opportunities appear randomly instead of through a repeatable process.",
    },
    {
      icon: Target,
      number: "03",
      title: "Missed Opportunities",
      description:
        "The right companies may need your services, but without targeted outreach they never become sales conversations.",
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
          eyebrow="Why Predictable Growth Matters"
          title="Stop relying only on referrals. Build a predictable growth channel."
          description="Many MSPs provide excellent services but struggle to consistently reach new decision-makers. Without a repeatable outbound system, growth depends on timing instead of strategy."
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
            max-w-3xl
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
            CloviraHQ helps MSPs move from inconsistent prospecting to a
            repeatable outbound engine that consistently creates conversations
            with the right buyers.
          </p>


        </div>


      </Container>

    </section>
  );
}