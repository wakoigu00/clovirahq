import { useState } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const faqs = [
  {
    question: "Is CloviraHQ just another cold email service?",
    answer:
      "No. We do not focus on sending large volumes of generic emails. Our approach combines market research, prospect targeting, personalization, and campaign optimization to create meaningful conversations with the right decision-makers.",
  },
  {
    question: "Who is CloviraHQ best suited for?",
    answer:
      "CloviraHQ is built for growing Managed Service Providers that want a more predictable way to generate qualified sales conversations beyond referrals and inbound opportunities.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Outbound systems require testing and optimization. Early campaigns help identify the right audiences, messaging, and opportunities before scaling what works.",
  },
  {
    question: "Do you guarantee meetings?",
    answer:
      "We focus on building a reliable outbound system that creates qualified conversations. Results depend on factors such as your market, offer, targeting, and sales process.",
  },
  {
    question: "How involved does our MSP team need to be?",
    answer:
      "We handle the research, targeting, personalization, and campaign execution. Your team provides insight into your services, ideal customers, and growth goals.",
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
          title="Everything you need to know about building a predictable outbound pipeline."
          description="Understand how CloviraHQ helps MSPs create consistent sales conversations through research-driven outbound systems."
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
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
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