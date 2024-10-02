import { useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRightFromBracket,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

type NavItem = "Booking" | "Vouchers" | "Contact Us";

const Header: React.FC = () => {
  const [activeItem, setActiveItem] = useState<NavItem>("Booking");
  const items: MenuProps["items"] = [
    // {
    //   label: (
    //     <a href="/">
    //       <div
    //         className={classNames(
    //           styles.dropdownItem,
    //           styles.firstDropdownItem
    //         )}
    //       >
    //         <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
    //         <h3 className={styles.content}>John Doe</h3>{" "}
    //       </div>
    //     </a>
    //   ),
    //   key: "0",
    // },
    // {
    //   type: "divider",
    // },
    {
      label: (
        <a href="/">
          <div className={styles.dropdownItem}>
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "#223a30" }}
              className={styles.icon}
            />
            <h3 className={styles.content}>My account</h3>{" "}
          </div>
        </a>
      ),
      key: "2",
    },
    {
      label: (
        <a href="/">
          <div className={styles.dropdownItem}>
            {" "}
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "#223a30" }}
              className={styles.icon}
            />
            <h3 className={styles.content}>Logout</h3>{" "}
          </div>
        </a>
      ),
      key: "3",
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <a href="/" className={styles.logoLink}>
          <img
            src="/src/assets/ecotaxi_logo.png"
            alt=""
            className={styles.logoImage}
          />
        </a>
      </div>
      <nav className={styles.headerNav}>
        <ul className={styles.navList}>
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
        </ul>
      </nav>

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
              {/* <FontAwesomeIcon
                icon={faCircleUser}
                className={styles.accountIcon}
              /> */}
            </a>
          </Space>
        </a>
      </Dropdown>
    </header>
  );
};

export default Header;
