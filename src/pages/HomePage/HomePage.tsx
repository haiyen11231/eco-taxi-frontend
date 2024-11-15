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
// import { fetchCardList } from "../../store/payment/paymentSlice";
import {
  // useCardIdsSelector,
  useCardsSelector,
  usePaymentLoadingSelector,
} from "../../store/payment/selector";
import { GetUserResponse } from "../../types/auth";
import {
  useAuthLoadingSelector,
  useUserSelector,
} from "../../store/auth/selector";
import { Card } from "../../types/payment";
import { getCardsAction } from "../../store/payment/paymentSlice";
// import { getBookingHistoryAction } from "../../store/booking/bookingSlice";
// import { BookingStatus } from "../../types/booking";

const { Footer } = Layout;

type AppContextType = {
  user: GetUserResponse | null;
  // cardIds: string[] | null;
  cards: Card[] | [];
  isLoading: boolean;
  error: string | null;
};

export const AppContext = createContext<AppContextType | null>(null);

const HomePage: React.FC = () => {
  const dispatch: DispatchApp = useDispatch();
  const isAuthLoading = useAuthLoadingSelector();
  const userInfo = useUserSelector();
  const isPaymentLoading = usePaymentLoadingSelector();
  // const cardIds = useCardIdsSelector();
  const cards = useCardsSelector();
  console.log("Fetch Cards in HomePage: ", cards);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null); // Reset error state before fetching
        // await dispatch(fetchCardList()).unwrap(); // Assuming unwrap is available to handle errors
        await dispatch(getCardsAction()).unwrap();
        // await dispatch(
        //   getBookingHistoryAction({
        //     page: 1,
        //     limit: 5,
        //     booking_statuses: [
        //       BookingStatus.INCOMPLETED,
        //       BookingStatus.COMPLETED,
        //       BookingStatus.CANCELED,
        //     ],
        //     order_asc: true,
        //   })
        // );
      } catch (err) {
        console.log(err);
        // setError("Failed to get cards. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const contextValue = {
    user: userInfo,
    // cardIds: cardIds,
    cards: cards,
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
