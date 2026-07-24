import Container from "../ui/Container";

const bookingLink =
  "https://calendly.com/moses-clovirahq/30min";

export default function FinalCTA() {
  return (
    <section
      id="contact"
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
          bg-blue-600/20
          blur-[100px]
          sm:h-[450px]
          sm:w-[450px]
          sm:blur-[140px]
        "
      />


      <Container>

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-br
            from-slate-900
            via-slate-900
            to-blue-950
            px-6
            py-12
            text-center
            sm:px-8
            sm:py-16
            md:px-16
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-r
              from-blue-500/10
              via-transparent
              to-indigo-500/10
            "
          />


          <div className="relative z-10">


            <h2
              className="
                mx-auto
                max-w-3xl
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-4xl
                md:text-5xl
              "
            >
              Build a predictable outbound system for your MSP growth.
            </h2>



            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-slate-300
                sm:mt-6
                sm:text-lg
                sm:leading-8
              "
            >
              CloviraHQ partners with MSPs to build research-driven outbound
              systems that reach the right decision-makers, create meaningful
              conversations, and develop repeatable growth channels.
            </p>



            <p
              className="
                mx-auto
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-blue-300
              "
            >
              Currently accepting a limited number of MSP partners for our
              collaborative pilot program.
            </p>




            <div className="relative z-10 mt-8 sm:mt-10">

              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  rounded-xl
                  bg-blue-600
                  px-7
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-blue-700
                  hover:shadow-lg
                  hover:shadow-blue-500/30
                  sm:px-8
                  sm:py-4
                  sm:text-base
                "
              >
                Explore Partnership Fit
              </a>

            </div>



            <p
              className="
                mt-5
                text-xs
                text-slate-400
                sm:mt-6
                sm:text-sm
              "
            >
              A focused conversation about your MSP goals, market, and growth
              opportunities.
            </p>


          </div>


        </div>


      </Container>


    </section>
  );
}