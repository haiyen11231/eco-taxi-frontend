import { ReactNode } from "react";
import styles from "./AccountTab.module.scss";
import { ConfigProvider, Tabs } from "antd";

type TabItem = {
  label: ReactNode;
  key: string;
  children: ReactNode;
};

const tabItems: TabItem[] = [
  {
    label: "My Account",
    key: "1",
    children: "Content of Tab Pane My Account",
  },
];

const onChange = (key: string) => {
  console.log(key);
};

const AccountTab: React.FC = () => {
  return (
    <section id="account" className={styles.accountSection}>
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

export default AccountTab;
