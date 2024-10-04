import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import styles from "./HomePage.module.scss";
import { Outlet } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <Outlet />
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
