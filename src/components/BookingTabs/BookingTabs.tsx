import { ReactNode } from "react";
import styles from "./BookingTabs.module.scss";
import { ConfigProvider, Tabs } from "antd";
import BookingTab from "../BookingTab/BookingTab";
import StatusTab from "../StatusTab/StatusTab";
import HistoryTab from "../HistoryTab/HistoryTab";
import { useNavigate } from "react-router-dom";

type TabItem = {
  label: ReactNode;
  key: string;
  children: ReactNode;
};

const tabItems: TabItem[] = [
  {
    label: "Trip Preview",
    key: "1",
    children: <BookingTab />,
  },
  {
    label: "Booking Status",
    key: "2",
    children: <StatusTab />,
  },
  {
    label: "Booking History",
    key: "3",
    children: <HistoryTab />,
  },
];

const BookingTabs: React.FC = () => {
  const navigate = useNavigate();

  const onChange = (key: string) => {
    if (key === "1") {
      navigate("/home/booking");
    } else if (key === "2") {
      navigate("/home/booking/status");
    } else if (key === "3") {
      navigate("/home/booking/history");
    }
  };
  return (
    <section id="booking" className={styles.searchSection}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              // Component Token
              itemActiveColor: "#0e862c",
              itemHoverColor: "#0e862c",
              itemSelectedColor: "#ffffff",
            },
          },
          token: {
            // Global Token
            // colorPrimary: "#223a30",
            colorBgContainer: "#0e862c",
            fontSize: 16,
            fontFamily: "Roboto, sans-serif",
          },
        }}
      >
        <Tabs
          onChange={onChange}
          type="card"
          centered
          items={tabItems}
          className={styles.tabs}
        />
      </ConfigProvider>
    </section>
  );
};

export default BookingTabs;
