import { ReactNode, useEffect, useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames";
import type { MenuProps } from "antd";
import { ConfigProvider, Dropdown, Space, Anchor } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type NavItem = {
  key: string;
  href: string;
  title: ReactNode;
};

const items: MenuProps["items"] = [
  {
    key: "account",
    label: (
      <Link to="/home/account">
        <div className={styles.dropdownItem}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <h3 className={styles.content}>My account</h3>{" "}
        </div>
      </Link>
    ),
  },
  {
    key: "logout",
    label: (
      <Link to="/">
        <div className={styles.dropdownItem}>
          {" "}
          <FontAwesomeIcon icon={faRightFromBracket} className={styles.icon} />
          <h3 className={styles.content}>Logout</h3>{" "}
        </div>
      </Link>
    ),
  },
];

const navItems: NavItem[] = [
  {
    key: "booking",
    href: "/home#booking",
    title: <span className={styles.navItem}>Booking</span>,
  },
  {
    key: "vouchers",
    href: "#vouchers",
    title: <span className={styles.navItem}>Voucher</span>,
  },
  {
    key: "contact",
    href: "#contact-us",
    title: <span className={styles.navItem}>Contact Us</span>,
  },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // const onClick: MenuProps["onClick"] = (e) => {
  //   console.log("click ", e);
  //   setCurrent(e.key);
  // };

  return (
    <header
      className={`${styles.header} ${
        isScrolled ? styles["headerScrolled"] : ""
      }`}
    >
      <div className={styles.headerLogo}>
        <Link to="/home" className={styles.logoLink}>
          <img
            src="/src/assets/ecotaxi_logo.png"
            alt=""
            className={styles.logoImage}
          />
        </Link>
      </div>
      {/* <nav className={styles.headerNav}> */}
      {/* <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={navItems}
        className={styles.navList}
      /> */}
      <nav className={styles.headerNav}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#223a30",
            },
          }}
        >
          <Anchor
            direction="horizontal"
            items={navItems}
            className={styles.navList}
          />
        </ConfigProvider>
      </nav>
      {/* <ul className={styles.navList}>
          <li
            className={classNames(styles.navItem, {
              [styles["navItemActive"]]: activeItem === "Booking",
            })}
          >
            <a
              href="/"
              className={styles.navLink}
              onClick={() => setActiveItem("Booking")}
            >
              Booking
            </a>
          </li>
          <li
            className={classNames(styles.navItem, {
              [styles["navItemActive"]]: activeItem === "Vouchers",
            })}
          >
            <a
              href="/"
              className={styles.navLink}
              onClick={() => setActiveItem("Vouchers")}
            >
              Vouchers
            </a>
          </li>
          <li
            className={classNames(styles.navItem, {
              [styles["navItemActive"]]: activeItem === "Contact Us",
            })}
          >
            <a
              href="/"
              className={styles.navLink}
              onClick={() => setActiveItem("Contact Us")}
            >
              Contact Us
            </a>
          </li>
        </ul> */}
      {/* </nav> */}

      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        className={styles.headerAccount}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <a href="/" className={styles.accountLink}>
              <div className={classNames(styles.accountItem)}>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className={styles.accountIcon}
                />
                <p className={styles.accountName}>John Doe</p>
              </div>
            </a>
          </Space>
        </a>
      </Dropdown>
    </header>
  );
};

export default Header;
