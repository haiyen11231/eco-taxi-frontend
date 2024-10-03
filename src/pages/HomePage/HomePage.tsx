import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import BookingTabs from "../../components/BookingTabs/BookingTabs";
import Section from "../../components/Section/Section";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <section id="booking">
        <BookingTabs />
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
