import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import styles from "./HomePage.module.scss";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import CommentSection from "../../components/CommentSection/CommentSection";
import ContactSection from "../../components/ContactSection/ContactSection";

const { Footer } = Layout;

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      <Outlet />
      <section id="about-us">
        <Section
          header="What Our Customers Have To Say"
          description="Here's what our customers say with EcoTaxi"
          content={<CommentSection />}
          className={styles.sectionWithPrimaryBg}
        />
      </section>
      <Footer className={styles.footer} id="contact-us">
        <Section
          header="Contact Us"
          description="Get in touch"
          content={<ContactSection />}
          // className={styles.contactSection}
        />
      </Footer>
    </Layout>
  );
};

export default HomePage;
