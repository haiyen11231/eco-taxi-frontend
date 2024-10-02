import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import SearchSection from "../../components/SearchSection/SearchSection";
import Section from "../../components/Section/Section";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <section id="booking">
        <SearchSection />
      </section>
      <section id="vouchers">
        <Section section="Vouchers" />
      </section>
      <section id="contact-us">
        <Section section="Contact Us" />
      </section>
    </>
  );
};

export default HomePage;
