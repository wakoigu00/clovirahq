import Container from "../ui/Container";
import Button from "../ui/Button";
import Badge from "../ui/Badge";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        overflow-hidden
        pt-28
        pb-20
        sm:pt-32
        sm:pb-28
      "
    >

      <div className="absolute inset-0 -z-10">

        <div
          className="
            absolute
            left-1/2
            top-0
            h-[350px]
            w-[350px]
            -translate-x-1/2
            rounded-full
            bg-blue-600/20
            blur-[120px]
            sm:h-[500px]
            sm:w-[500px]
            sm.blur-[140px]
          "
        />

      </div>


      <Container>

        <div
          className="
            mx-auto
            max-w-5xl
            text-center
            animate-[fadeIn_0.7s_ease-out]
          "
        >

          <Badge>
            Built for Managed Service Providers
          </Badge>


          <h1
            className="
              mt-8
              text-4xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              sm:text-5xl
              md:text-7xl
            "
          >
            Build a predictable outbound engine
            <br className="hidden sm:block" />
            that fills your MSP pipeline.
          </h1>



          <p
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-base
              leading-7
              text-slate-400
              sm:mt-7
              sm:text-lg
              sm:leading-8
            "
          >
            CloviraHQ helps growing MSPs go beyond referrals with
            research-driven prospecting, personalized outreach, and campaign
            optimization that creates qualified sales conversations with the
            right decision-makers.
          </p>



          <div
            className="
              mt-8
              flex
              flex-col
              justify-center
              gap-4
              sm:mt-10
              sm:flex-row
            "
          >

            <Button href={bookingLink}>
              Book Discovery Call
            </Button>


            <Button
              href="#process"
              variant="secondary"
            >
              See How It Works
            </Button>

          </div>



          <div
            className="
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-3
              text-sm
              text-slate-300
              sm:flex-row
              sm:gap-6
            "
          >

            <span>
              ✓ MSP-focused prospect research
            </span>

            <span>
              ✓ Personalized outreach campaigns
            </span>

            <span>
              ✓ Qualified sales conversations
            </span>

          </div>



          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-sm
              leading-6
              text-slate-400
            "
          >
            Currently partnering with a limited number of MSPs to build,
            optimize, and refine outbound systems through close collaboration.
          </p>


        </div>



        <div
          className="
            mx-auto
            mt-14
            max-w-4xl
            sm:mt-20
          "
        >

          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/[0.04]
              p-5
              shadow-2xl
              backdrop-blur-xl
              sm:p-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-4
                border-b
                border-white/10
                pb-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div>

                <p className="text-sm font-medium text-white">
                  CloviraHQ Outbound Engine
                </p>


                <p className="mt-1 text-sm text-slate-400">
                  Your managed outbound growth system
                </p>

              </div>


              <div
                className="
                  w-fit
                  rounded-full
                  bg-green-500/10
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-green-400
                "
              >
                ● Active Campaign
              </div>

            </div>



            <div
              className="
                mt-6
                grid
                gap-5
                md:grid-cols-3
              "
            >

              <PipelineCard
                number="01"
                title="Research & Targeting"
                text="148 prospects identified"
              />


              <PipelineCard
                number="02"
                title="Personalized Outreach"
                text="42 contacts engaged"
              />


              <PipelineCard
                number="03"
                title="Qualified Conversations"
                text="4 conversations booked"
              />

            </div>

          </div>

        </div>


      </Container>


    </section>
  );
}



function PipelineCard({
  number,
  title,
  text,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-black/20
        p-5
        transition
        duration-300
        hover:-translate-y-1
      "
    >

      <div
        className="
          mb-4
          text-sm
          font-semibold
          text-blue-400
        "
      >
        {number}
      </div>


      <h3
        className="
          font-semibold
          text-white
        "
      >
        {title}
      </h3>


      <p
        className="
          mt-2
          text-sm
          text-slate-400
        "
      >
        {text}
      </p>


    </div>

  );
}