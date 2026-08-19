import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";

const trustPoints = [
  {
    title: "Built for MSP Growth",
    description:
      "Our outbound systems are designed specifically for Managed Service Providers looking to create more consistent sales opportunities.",
  },
  {
    title: "Research-Driven Outreach",
    description:
      "We identify the right companies, decision-makers, and business signals before starting conversations.",
  },
  {
    title: "Focused on Qualified Conversations",
    description:
      "The goal is not sending more emails. The goal is creating relevant conversations with potential buyers.",
  },
];

export default function SocialProof() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Why Trust CloviraHQ"
          title="A growth system built around quality conversations"
          description="We combine market research, personalization, and outbound execution to help MSPs build a predictable path to new opportunities."
          center
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {trustPoints.map((point) => (
            <Card key={point.title}>
              <h3 className="text-xl font-semibold text-gray-900">
                {point.title}
              </h3>

              <p className="mt-4 leading-relaxed text-gray-600">
                {point.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}