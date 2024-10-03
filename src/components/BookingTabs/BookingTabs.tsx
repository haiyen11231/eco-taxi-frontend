import { ReactNode } from "react";
import styles from "./BookingTabs.module.scss";
import { ConfigProvider, Tabs } from "antd";

type TabItem = {
  label: ReactNode;
  key: string;
  children: ReactNode;
};

const tabItems: TabItem[] = [
  {
    label: "Trip Preview",
    key: "1",
    children: "Content of Tab Pane Trip Preview",
  },
  {
    label: "Booking Status",
    key: "2",
    children: "Content of Tab Pane Booking Status",
  },
  {
    label: "Booking History",
    key: "3",
    children: "Content of Tab Pane Booking History",
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const BookingTabs: React.FC = () => {
  return (
    <section className={styles.searchSection}>
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
