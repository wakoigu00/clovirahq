import Hero from "../components/home/Hero";
import WhyClovira from "../components/home/WhyClovira";
import Services from "../components/home/Services";
import Process from "../components/home/Process";
import WhyChooseUs from "../components/home/WhyChooseUs";
import FAQ from "../components/home/FAQ";
import WhyWereStartingSmall from "../components/home/WhyWereStartingSmall";
import FinalCTA from "../components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>

      <section>
        <WhyClovira />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="process">
        <Process />
      </section>

      <section>
        <WhyChooseUs />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="pilot">
        <WhyWereStartingSmall />
      </section>

      <section id="contact">
        <FinalCTA />
      </section>
    </>
  );
}