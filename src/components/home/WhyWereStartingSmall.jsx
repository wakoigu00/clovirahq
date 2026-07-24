import { CheckCircle } from "lucide-react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

export default function WhyWereStartingSmall() {
  const reasons = [
    {
      title: "Quality Over Volume",
      description:
        "We believe outbound systems perform best when they receive focused attention. Instead of managing dozens of accounts, we work closely with a small group of MSPs where we can deliver meaningful results.",
    },
    {
      title: "Founder-Led Collaboration",
      description:
        "Every pilot partner works directly with the people building and optimizing the system. This creates faster feedback loops, better insights, and stronger execution.",
    },
    {
      title: "Continuous Optimization",
      description:
        "Effective outbound is not a one-time campaign. We continuously refine targeting, messaging, and processes based on real market feedback.",
    },
  ];

  return (
    <section
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

      <Container>
        <div className="relative">
          <SectionHeading
            eyebrow="Limited Pilot Program"
            title="Why We're Starting Small"
            description="We are intentionally partnering with a limited number of MSPs to build outbound systems through close collaboration, careful execution, and continuous improvement."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reasons.map((reason) => (
              <Card
                key={reason.title}
                className="
                  border
                  border-white/10
                  bg-white/5
                  p-8
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    mb-5
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
                    leading-relaxed
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
              mt-14
              rounded-2xl
              border
              border-white/10
              bg-white/5
              p-8
              text-center
              backdrop-blur-xl
            "
          >
            <h3
              className="
                text-2xl
                font-semibold
                text-white
              "
            >
              Currently accepting 5 MSP pilot partners
            </h3>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-slate-300
              "
            >
              This limited program allows us to work closely with each partner,
              understand their market, refine their outbound approach, and build
              a system designed for sustainable growth.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}