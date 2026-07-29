import Container from "../ui/Container";
import Button from "../ui/Button";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

export default function FinalCTA() {
  return (
    <section
      id="pilot"
      className="
        relative
        overflow-hidden
        py-20
        sm:py-28
      "
    >

      <div className="absolute inset-0 -z-10">

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[400px]
            w-[400px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-blue-600/20
            blur-[140px]
          "
        />

      </div>


      <Container>

        <div
          className="
            mx-auto
            max-w-4xl
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            px-6
            py-12
            text-center
            shadow-2xl
            backdrop-blur-xl
            sm:px-10
            sm:py-16
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-5xl
            "
          >
            Ready to build a predictable MSP growth engine?
          </h2>


          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-slate-400
              sm:text-lg
            "
          >
            Book a strategy call to discuss your current client acquisition
            approach, growth goals, and whether CloviraHQ can help create a
            repeatable outbound system for your MSP.
          </p>


          <div
            className="
              mt-8
              flex
              justify-center
            "
          >

            <Button href={bookingLink}>
              Book MSP Growth Strategy Call
            </Button>

          </div>


          <p
            className="
              mt-6
              text-sm
              text-slate-500
            "
          >
            Currently partnering with a limited number of MSPs.
          </p>


        </div>

      </Container>

    </section>
  );
}