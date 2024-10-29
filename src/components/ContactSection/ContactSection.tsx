// import React from "react";
// import { Descriptions } from "antd";
// import type { DescriptionsProps } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPhoneVolume,
//   faMapMarkerAlt,
//   faEnvelope,
//   faClock,
// } from "@fortawesome/free-solid-svg-icons";

// const items: DescriptionsProps["items"] = [
//   {
//     key: "1",
//     label: (
//       <span>
//         <FontAwesomeIcon
//           icon={faPhoneVolume}
//           style={{ color: "#223a30", marginRight: "0.5rem" }}
//         />
//         Phone Number
//       </span>
//     ),
//     children: "(+65) 97503210",
//   },
//   {
//     key: "2",
//     label: (
//       <span>
//         <FontAwesomeIcon
//           icon={faMapMarkerAlt}
//           style={{ color: "#223a30", marginRight: "0.5rem" }}
//         />
//         Address
//       </span>
//     ),
//     children: "Nanyang Technological University (NTU)",
//   },
//   {
//     key: "3",
//     label: (
//       <span>
//         <FontAwesomeIcon
//           icon={faEnvelope}
//           style={{ color: "#223a30", marginRight: "0.5rem" }}
//         />
//         Email
//       </span>
//     ),
//     children: "eco-taxi@gmail.com",
//   },
//   {
//     key: "4",
//     label: (
//       <span>
//         <FontAwesomeIcon
//           icon={faClock}
//           style={{ color: "#223a30", marginRight: "0.5rem" }}
//         />
//         Office Hours
//       </span>
//     ),
//     children: "Mon - Fri (9AM - 5PM)",
//   },
// ];

// const ContactSection: React.FC = () => (
//   <Descriptions
//     items={items}
//     // column={1} // Stack items for smaller screens
//     // style={{ textAlign: "left" }}
//     column={{ xs: 1, sm: 1, md: 2 }} // Responsive columns: stack on small screens, 2 columns on medium+ screens
//     // bordered
//     layout="vertical" // Optional: makes each label stack above its content
//     // style={{ color: "white" }}
//   />
// );

// export default ContactSection;

import React from "react";
import { Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faMapMarkerAlt,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./ContactSection.module.scss";

const ContactSection: React.FC = () => (
  <div className={styles.container}>
    <Row gutter={[16, 24]}>
      {/* First Row: Phone Number and Address */}
      <Col xs={24} sm={12}>
        <div className={styles.contactItem}>
          <FontAwesomeIcon icon={faPhoneVolume} className={styles.icon} />
          <span className={styles.label}>Phone Number: </span> (+65) 97503210
        </div>
      </Col>
      <Col xs={24} sm={12}>
        <div className={styles.contactItem}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
          <span className={styles.label}>Address: </span> Nanyang Technological
          University (NTU)
        </div>
      </Col>

      {/* Second Row: Email and Office Hours */}
      <Col xs={24} sm={12}>
        <div className={styles.contactItem}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <span className={styles.label}>Email: </span> eco-taxi@gmail.com
        </div>
      </Col>
      <Col xs={24} sm={12}>
        <div className={styles.contactItem}>
          <FontAwesomeIcon icon={faClock} className={styles.icon} />
          <span className={styles.label}>Office Hours: </span> Mon - Fri (9AM -
          5PM)
        </div>
      </Col>
    </Row>
  </div>
);

export default ContactSection;
