import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    {
      name: "MSP Outbound",
      href: "/msp-outbound",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "How It Works",
      href: "/how-it-works",
    },
    {
      name: "Results",
      href: "/results",
    },
    {
      name: "Insights",
      href: "/insights",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const bookingLink =
    "https://cal.com/mosesmaina/msp-growth-strategy-call";

  const closeMenu = () => {
    setOpen(false);
  };

  const isActive = (href) => location.pathname === href;

  return (
    <header
      className="
        fixed
        top-0
        z-50
        w-full
        border-b
        border-white/10
        bg-slate-950/80
        backdrop-blur-xl
      "
    >
      <nav
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-5
          py-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Logo */}

        <Link
          to="/"
          onClick={closeMenu}
          className="
            text-xl
            font-bold
            tracking-tight
            text-white
            transition
            hover:text-blue-300
            sm:text-2xl
          "
        >
          Clovira<span className="text-blue-400">HQ</span>
        </Link>

        {/* Desktop Navigation */}

        <div
          className="
            hidden
            items-center
            gap-6
            md:flex
          "
        >
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`
                  relative
                  py-2
                  text-sm
                  font-medium
                  transition
                  ${
                    active
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }
                `}
              >
                {link.name}

                {active && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-0.5
                      w-full
                      rounded-full
                      bg-blue-500
                    "
                  />
                )}
              </Link>
            );
          })}

          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              ml-2
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
              hover:shadow-blue-500/30
            "
          >
            Explore Partnership Fit
          </a>
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="
            rounded-lg
            p-2
            text-white
            transition
            hover:bg-white/5
            md:hidden
          "
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? (
            <X className="h-7 w-7" />
          ) : (
            <Menu className="h-7 w-7" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}

      {open && (
        <div
          className="
            border-t
            border-white/10
            bg-slate-950
            px-5
            py-6
            sm:px-6
            md:hidden
          "
        >
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={closeMenu}
                  className={`
                    rounded-xl
                    px-4
                    py-3
                    text-base
                    font-medium
                    transition
                    ${
                      active
                        ? "bg-blue-500/10 text-blue-300"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {link.name}
                </Link>
              );
            })}

            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="
                mt-3
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-center
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                hover:shadow-lg
                hover:shadow-blue-500/30
              "
            >
              Explore Partnership Fit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}