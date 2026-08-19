import { useState } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const faqs = [
  {
    question: "Is CloviraHQ just another cold email service?",
    answer:
      "No. CloviraHQ is built around the outbound system behind the emails. We combine ICP targeting, commercial research, prospect qualification, personalized messaging, campaign execution, and optimization rather than treating outbound as simply sending more emails.",
  },
  {
    question: "Who is CloviraHQ best suited for?",
    answer:
      "CloviraHQ is currently focused on growing Managed Service Providers that want to build a more predictable outbound channel beyond referrals and inbound opportunities.",
  },
  {
    question: "What makes your approach different?",
    answer:
      "We prioritize commercial relevance before outreach. A company matching an ICP is not automatically an opportunity. We look for verified business context, evaluate whether that context connects with the MSP's capabilities, and then build the outreach around that reason.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Outbound requires testing and learning. Early campaigns help establish which accounts, commercial signals, messaging angles, and offers generate the strongest response. We use those results to continuously improve the system rather than assuming the first campaign is perfect.",
  },
  {
    question: "Do you guarantee meetings?",
    answer:
      "No. We do not guarantee a specific number of meetings because results depend on factors including your market, offer, positioning, targeting, and sales process. Our focus is building a disciplined outbound system designed to consistently create qualified sales conversations.",
  },
  {
    question: "How involved does our MSP team need to be?",
    answer:
      "Your team provides the information we need to understand your services, ideal customers, positioning, and growth goals. We handle the research, targeting, personalization, campaign execution, and optimization, while keeping you involved in the important strategic decisions.",
  },
  {
    question: "Why are you limiting the number of MSPs you work with?",
    answer:
      "CloviraHQ is intentionally starting with a small number of partners so we can maintain close collaboration, collect high-quality market feedback, and refine the outbound system before expanding the program.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
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
        "
      />

      <Container>
        <SectionHeading
          eyebrow="Frequently Asked Questions"
          title="Questions about the CloviraHQ outbound system."
          description="A few answers about how we approach prospecting, research, outreach, and partnership."
          center
        />

        <div
          className="
            mx-auto
            mt-10
            max-w-3xl
            space-y-4
            sm:mt-16
          "
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  rounded-2xl
                  border
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-blue-400/30 bg-white/[0.08]"
                      : "border-white/10 bg-white/[0.05]"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  aria-expanded={isOpen}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-5
                    text-left
                    sm:px-8
                    sm:py-6
                  "
                >
                  <span
                    className="
                      text-base
                      font-semibold
                      text-white
                      sm:text-lg
                    "
                  >
                    {faq.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-500/20
                      text-xl
                      text-blue-400
                      transition-transform
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180"
                          : "rotate-0"
                      }
                    `}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`
                    grid
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <p
                      className="
                        px-5
                        pb-5
                        text-sm
                        leading-7
                        text-slate-400
                        sm:px-8
                        sm:pb-6
                        sm:text-base
                      "
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}