import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const bookingLink =
  "https://calendly.com/moses-clovirahq/30min";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We learn about your MSP, goals, services, and ideal customers to build the right outbound strategy.",
  },
  {
    number: "02",
    title: "Research & Targeting",
    description:
      "We identify high-fit companies, decision-makers, and buying signals that indicate genuine growth opportunities.",
  },
  {
    number: "03",
    title: "Personalized Outreach",
    description:
      "Every campaign is tailored with relevant messaging designed to start meaningful business conversations.",
  },
  {
    number: "04",
    title: "Optimize & Improve",
    description:
      "Campaigns are continuously refined using response data to improve engagement and conversion rates.",
  },
  {
    number: "05",
    title: "Qualified Meetings",
    description:
      "Your calendar fills with conversations from decision-makers who match your ideal customer profile.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
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
          sm:blur-[120px]
        "
      />


      <Container>


        <SectionHeading
          eyebrow="How It Works"
          title="From strategy to qualified sales conversations"
          description="Our outbound process combines research, personalization, and optimization to help MSPs build a predictable pipeline."
          center
        />


        <div className="relative mt-12 sm:mt-20">


          <div
            className="
              absolute
              left-0
              right-0
              top-8
              hidden
              h-px
              bg-white/20
              lg:block
            "
          />


          <div
            className="
              grid
              gap-6
              lg:grid-cols-5
            "
          >

            {steps.map((step) => (

              <div
                key={step.number}
                className="group relative"
              >

                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-blue-500
                    to-indigo-600
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    duration-300
                    group-hover:scale-110
                  "
                >
                  {step.number}
                </div>



                <div
                  className="
                    mt-8
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.05]
                    p-6
                    backdrop-blur-xl
                    shadow-lg
                    transition-all
                    duration-300
                    group-hover:-translate-y-2
                    group-hover:border-blue-400/30
                  "
                >

                  <h3 className="text-xl font-semibold text-white">
                    {step.title}
                  </h3>


                  <p className="mt-4 leading-7 text-slate-400">
                    {step.description}
                  </p>


                </div>


              </div>

            ))}

          </div>

        </div>




        {/* CTA */}

        <div
          className="
            mt-16
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            px-6
            py-10
            text-center
            sm:px-10
            sm:py-12
          "
        >

          <h3
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Ready to build a predictable outbound pipeline?
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
            Book a discovery call and learn how CloviraHQ helps MSPs create
            consistent sales conversations with the right decision-makers.
          </p>



          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-8
              inline-flex
              rounded-xl
              bg-blue-600
              px-8
              py-4
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              hover:shadow-lg
              hover:shadow-blue-500/30
            "
          >
            Book Discovery Call
          </a>


        </div>


      </Container>


    </section>
  );
}