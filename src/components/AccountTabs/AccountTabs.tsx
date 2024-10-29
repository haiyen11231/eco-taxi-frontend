import { ReactNode } from "react";
import styles from "./AccountTabs.module.scss";
import { ConfigProvider, Tabs } from "antd";
import PaymentTab from "../PaymentTab/PaymentTab";
import AccountTab from "../AccountTab/AccountTab";
import { useNavigate } from "react-router-dom";

type TabItem = {
  label: ReactNode;
  key: string;
  children: ReactNode;
};

const tabItems: TabItem[] = [
  {
    label: "My Account",
    key: "1",
    children: <AccountTab />,
  },
  {
    label: "My Payment",
    key: "2",
    children: <PaymentTab />,
  },
];

const AccountTabs: React.FC = () => {
  const navigate = useNavigate();

  const onChange = (key: string) => {
    if (key === "1") {
      navigate("/home/account");
    } else if (key === "2") {
      navigate("/home/account/payment");
    }
  };
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

export default AccountTabs;
