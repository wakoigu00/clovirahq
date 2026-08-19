import Container from "../ui/Container";
import Button from "../ui/Button";

const bookingLink =
  "https://cal.com/mosesmaina/msp-growth-strategy-call";

export default function FinalCTA() {
  return (
    <section
      id="contact"
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
            sm:h-[550px]
            sm:w-[550px]
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
          <div
            className="
              mx-auto
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
            Limited MSP Pilot
          </div>

          <h2
            className="
              mx-auto
              mt-6
              max-w-3xl
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-5xl
            "
          >
            Is your MSP ready for a more predictable outbound channel?
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
            Let's look at your current client acquisition approach, ideal
            customer profile, growth goals, and whether an evidence-driven
            outbound system makes sense for your MSP.
          </p>

          <div
            className="
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-4
              sm:flex-row
            "
          >
            <Button href={bookingLink}>
              Book MSP Growth Strategy Call
            </Button>
          </div>

          <div
            className="
              mx-auto
              mt-8
              flex
              flex-col
              items-center
              justify-center
              gap-2
              text-sm
              text-slate-500
              sm:flex-row
              sm:gap-6
            "
          >
            <span>✓ No long-term commitment</span>
            <span>✓ Strategy-focused conversation</span>
            <span>✓ Limited pilot availability</span>
          </div>

          <p
            className="
              mx-auto
              mt-8
              max-w-xl
              text-xs
              leading-6
              text-slate-500
            "
          >
            CloviraHQ is currently working with a limited number of MSPs while
            the outbound system is being refined through real market
            execution.
          </p>
        </div>
      </Container>
    </section>
  );
}