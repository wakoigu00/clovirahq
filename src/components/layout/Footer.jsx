import { Link } from "react-router-dom";
import Container from "../ui/Container";

export default function Footer() {
  const navigation = [
    ["Home", "/"],
    ["MSP Outbound", "/msp-outbound"],
    ["Services", "/services"],
    ["How It Works", "/how-it-works"],
    ["Results", "/results"],
    ["Insights", "/insights"],
    ["Pilot Program", "/pilot"],
    ["About", "/about"],
  ];

  const services = [
    "Prospect Research",
    "Personalized Outreach",
    "Campaign Execution",
    "Outbound Optimization",
  ];

  const bookingLink =
    "https://cal.com/mosesmaina/msp-growth-strategy-call";

  return (
    <footer className="border-t border-white/10 bg-slate-950 py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 sm:gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white">
              CloviraHQ
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
              Building predictable outbound systems that help Managed
              Service Providers create qualified sales conversations
              through research-driven targeting and personalized outreach.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-white">
              Navigation
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {navigation.map(([name, href]) => (
                <li key={name}>
                  <Link
                    to={href}
                    className="transition hover:text-white"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white">
              Services
            </h4>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              {services.map((service) => (
                <li key={service}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-white">
              Get Started
            </h4>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              Currently partnering with a limited number of MSPs to
              build and refine predictable outbound systems.
            </p>

            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Explore Partnership Fit
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} CloviraHQ. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}