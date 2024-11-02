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
import { createContext, useEffect, useState } from "react";
import { fetchCardList } from "../../store/payment/paymentSlice";
import {
  useCardIdsSelector,
  usePaymentLoadingSelector,
} from "../../store/payment/selector";
import { GetUserResponse } from "../../types/auth";
import {
  useAuthLoadingSelector,
  useUserSelector,
} from "../../store/auth/selector";

const { Footer } = Layout;

type AppContextType = {
  user: GetUserResponse | null;
  cardIds: string[] | null;
  isLoading: boolean;
  error: string | null;
};

export const AppContext = createContext<AppContextType | null>(null);

const HomePage: React.FC = () => {
  const dispatch: DispatchApp = useDispatch();
  const isAuthLoading = useAuthLoadingSelector();
  const userInfo = useUserSelector();
  const isPaymentLoading = usePaymentLoadingSelector();
  const cardIds = useCardIdsSelector();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error state before fetching
        await dispatch(fetchCardList()).unwrap(); // Assuming unwrap is available to handle errors
      } catch (err) {
        console.log(err);
        setError("Failed to fetch card list. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const contextValue = {
    user: userInfo,
    cardIds: cardIds,
    isLoading: isLoading || isPaymentLoading || isAuthLoading,
    error: error,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Spin tip="Loading..." spinning={isAuthLoading && isPaymentLoading}>
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
    </AppContext.Provider>
  );
};

export default HomePage;
