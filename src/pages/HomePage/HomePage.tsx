import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Section from "../../components/Section/Section";
import styles from "./HomePage.module.scss";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Spin } from "antd";
import CommentSection from "../../components/CommentSection/CommentSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import { DispatchApp } from "../../store";
import { useDispatch } from "react-redux";
import { createContext, useEffect } from "react";
import { fetchCardList } from "../../store/payment/paymentSlice";
import {
  useCardIdsSelector,
  usePaymentLoadingSelector,
} from "../../store/payment/selector";

const { Footer } = Layout;
export const PaymentContext = createContext<number[] | null>(null);

const HomePage: React.FC = () => {
  const dispatch: DispatchApp = useDispatch();
  const isLoading = usePaymentLoadingSelector();
  const cardIds = useCardIdsSelector();

  useEffect(() => {
    dispatch(fetchCardList());
  }, [dispatch]);

  return (
    <PaymentContext.Provider value={cardIds}>
      <Spin tip="Loading..." spinning={isLoading}>
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
            />
          </Footer>
        </Layout>
      </Spin>
    </PaymentContext.Provider>
  );
};

export default HomePage;
