import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        border-white/10
        bg-slate-950
        py-14
        sm:py-16
      "
    >

      <Container>

        <div
          className="
            grid
            gap-10
            sm:gap-12
            md:grid-cols-4
          "
        >

          {/* Brand */}
          <div>

            <h3
              className="
                text-xl
                font-bold
                text-white
              "
            >
              CloviraHQ
            </h3>


            <p
              className="
                mt-4
                text-sm
                leading-7
                text-slate-400
                sm:text-base
              "
            >
              Building predictable outbound systems that help Managed
              Service Providers create qualified sales conversations and
              consistent growth opportunities.
            </p>

          </div>



          {/* Navigation */}
          <div>

            <h4 className="font-semibold text-white">
              Navigation
            </h4>


            <ul
              className="
                mt-5
                space-y-3
                text-sm
                text-slate-400
              "
            >

              {[
                ["Home", "#home"],
                ["Services", "#services"],
                ["How It Works", "#process"],
                ["FAQ", "#faq"],
                ["Contact", "#contact"],
              ].map(([name, href]) => (

                <li key={name}>
                  <a
                    href={href}
                    className="
                      transition
                      hover:text-white
                    "
                  >
                    {name}
                  </a>
                </li>

              ))}

            </ul>

          </div>



          {/* Services */}
          <div>

            <h4 className="font-semibold text-white">
              Services
            </h4>


            <ul
              className="
                mt-5
                space-y-3
                text-sm
                text-slate-400
              "
            >

              <li>Prospect Research</li>

              <li>Personalized Outreach</li>

              <li>Campaign Execution</li>

              <li>Qualified Sales Conversations</li>

            </ul>

          </div>



          {/* CTA */}
          <div>

            <h4 className="font-semibold text-white">
              Get Started
            </h4>


            <p
              className="
                mt-5
                text-sm
                leading-7
                text-slate-400
                sm:text-base
              "
            >
              Ready to build a predictable outbound pipeline for your MSP?
            </p>


            <a
              href="#contact"
              className="
                mt-6
                inline-flex
                items-center
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                hover:shadow-lg
                hover:shadow-blue-500/20
              "
            >
              Book Discovery Call
              <span className="ml-2">
                →
              </span>
            </a>

          </div>


        </div>



        {/* Bottom Footer */}

        <div
          className="
            mt-12
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            pt-8
            text-sm
            text-slate-500
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <p>
            © {new Date().getFullYear()} CloviraHQ. All rights reserved.
          </p>


          <div className="flex gap-6">

            <a
              href="#"
              className="
                transition
                hover:text-white
              "
            >
              Privacy Policy
            </a>


            <a
              href="#"
              className="
                transition
                hover:text-white
              "
            >
              Terms
            </a>

          </div>


        </div>


      </Container>

    </footer>
  );
}