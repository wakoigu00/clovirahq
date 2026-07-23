import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Services",
      href: "#services",
    },
    {
      name: "How It Works",
      href: "#process",
    },
    {
      name: "FAQ",
      href: "#faq",
    },
  ];

  const bookingLink =
    "https://calendly.com/moses-clovirahq/30min";

  const closeMenu = () => {
    setOpen(false);
  };

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
        "
      >

        {/* Logo */}
        <a
          href="#home"
          className="
            text-xl
            font-bold
            tracking-tight
            text-white
            sm:text-2xl
          "
        >
          CloviraHQ
        </a>


        {/* Desktop Navigation */}
        <div
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >

          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="
                text-sm
                font-medium
                text-slate-300
                transition
                hover:text-white
              "
            >
              {link.name}
            </a>
          ))}


          <a
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
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
            Book Discovery Call
          </a>


        </div>



        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
            text-white
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

          <div
            className="
              flex
              flex-col
              gap-5
            "
          >

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="
                  text-base
                  font-medium
                  text-slate-300
                  transition
                  hover:text-white
                "
              >
                {link.name}
              </a>
            ))}


            <a
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="
                mt-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-center
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Book Discovery Call
            </a>


          </div>

        </div>
      )}

    </header>
  );
}