import { CheckCircle } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

export default function WhyWereStartingSmall() {
  const reasons = [
    {
      title: "Quality Over Volume",
      description:
        "We are intentionally limiting the number of partners so each outbound system receives focused attention rather than being treated like another high-volume campaign.",
    },
    {
      title: "Founder-Led Collaboration",
      description:
        "Pilot partners work closely with the people building and refining the system. That creates faster feedback loops, clearer decisions, and better understanding of what works in the market.",
    },
    {
      title: "Real Market Learning",
      description:
        "Every campaign gives us information about targeting, commercial signals, messaging, objections, and buyer behavior. That intelligence becomes part of the next iteration.",
    },
  ];

  return (
    <section
      id="pilot"
      className="
        relative
        overflow-hidden
        py-24
      "
    >
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-slate-900
          via-slate-900
          to-blue-950
        "
      />

      <div
        className="
          absolute
          right-0
          top-0
          h-[400px]
          w-[400px]
          rounded-full
          bg-blue-600/10
          blur-[140px]
        "
      />

      <Container>
        <div className="relative">
          <SectionHeading
            eyebrow="Limited Pilot Program"
            title="We're starting small by design."
            description="Before expanding the program, we want to work closely with a small group of MSPs, validate the system in real markets, and turn what we learn into a stronger outbound engine."
            center
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reasons.map((reason, index) => (
              <Card
                key={reason.title}
                className="
                  group
                  border
                  border-white/10
                  bg-white/5
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-blue-400/30
                "
              >
                <div
                  className="
                    mb-5
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
                    "
                  >
                    <CheckCircle
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
                    0{index + 1}
                  </span>
                </div>

                <h3
                  className="
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
                    text-slate-300
                  "
                >
                  {reason.description}
                </p>
              </Card>
            ))}
          </div>

          <div
            className="
              mx-auto
              mt-14
              max-w-4xl
              rounded-3xl
              border
              border-blue-400/20
              bg-blue-500/10
              p-8
              text-center
              backdrop-blur-xl
              sm:p-10
            "
          >
            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-blue-400/20
                bg-blue-500/10
                px-4
                py-2
                text-sm
                font-medium
                text-blue-300
              "
            >
              Limited to 5 MSP pilot partners
            </div>

            <h3
              className="
                mt-5
                text-2xl
                font-semibold
                text-white
                sm:text-3xl
              "
            >
              Build the system with us, not just buy a campaign.
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
              The pilot is designed for MSPs that are willing to collaborate,
              provide market feedback, and help us refine an outbound system
              around their actual growth goals.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}