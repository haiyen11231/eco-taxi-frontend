import React from "react";
import styles from "./PaymentCard.module.scss";
import { Card } from "../../types/payment";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Import specific icon

// import { EditOutlined } from "@ant-design/icons";
// import { Avatar, Card } from "antd";

// const { Meta } = Card;
const PaymentCard: React.FC<Card> = ({
  id,
  card_number,
  card_holder,
  expiry_date,
  cvv,
  is_default,
}) => {
  return (
    // <Card
    //   style={{ width: 300 }}
    //   //   cover={
    //   //     <img
    //   //       alt="example"
    //   //       src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    //   //     />
    //   //   }
    //   actions={[<EditOutlined key="edit" />]}
    // >
    //   <img src="/src/assets/card_icon.png"></img>
    //   <Meta
    //     // avatar={<Avatar src="/src/assets/card_icon.png" />}
    //     title="Card title"
    //     description="This is the description"
    //   />
    // </Card>
    <div className={styles.card}>
      <figure className={styles.cardImageContainer}>
        <img
          className={styles.cardImage}
          src="/src/assets/card_icon.png"
          alt=""
        />
      </figure>
      <div className={styles.cardContent}>
        <p className={styles.cardNumber}>Card Number: {card_number}</p>
        <p className={styles.cardHolder}>Card Holder: {card_holder}</p>
        <p className={styles.expiryDate}>
          Expiry Date: {expiry_date?.toLocaleDateString() || "N/A"}
        </p>
        <p className={styles.cvv}>CVV: {cvv}</p>
      </div>
      <Button color="primary" variant="text">
        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#0e862c" }} />
      </Button>
    </div>
  );
};
export default PaymentCard;
