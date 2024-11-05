import React from "react";
import styles from "./PaymentCard.module.scss";
import { Card } from "../../types/payment";
import { Button, Form, Input, Modal, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import type { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import specific icon
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import type { GetProps } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const PaymentCard: React.FC<Card> = ({
  id,
  card_number,
  card_holder,
  expiry_date,
  cvv,
  is_default,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    navigate("/home");
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  return (
    <div className={`${styles.card} ${is_default ? styles.defaultCard : ""}`}>
      <figure className={styles.cardImageContainer}>
        <img
          className={styles.cardImage}
          src="/src/assets/card_icon.png"
          alt=""
        />
      </figure>
      <div className={styles.cardContent}>
        <div className={styles.cardElement}>
          <p className={styles.title}>Card Number</p>
          <p className={styles.content}>{card_number}</p>
        </div>
        <div className={styles.cardElement}>
          <p className={styles.title}>Card Holder</p>
          <p className={styles.content}>{card_holder}</p>
        </div>
        <div className={styles.cardElement}>
          <p className={styles.title}>Expiry Date</p>
          <p className={styles.content}>
            {expiry_date?.toLocaleDateString() || "N/A"}
          </p>
        </div>
        <div className={styles.cardElement}>
          <p className={styles.title}>CVV</p>
          <p className={styles.content}>{cvv}</p>
        </div>
      </div>
      <Button color="primary" variant="text" onClick={showModal}>
        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#0e862c" }} />
      </Button>
      <Button color="primary" variant="text">
        <FontAwesomeIcon icon={faTrash} style={{ color: "#0e862c" }} />
      </Button>

      <Modal
        title="Update Card"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
        className={styles.formContainer}
      >
        <Form
          form={form}
          name="update-card"
          onFinish={onFinish}
          style={{ maxWidth: 500 }}
          scrollToFirstError
          className={styles.form}
        >
          <Form.Item
            name="card-number"
            rules={[
              {
                required: true,
                message: "Please input your card number!",
              },
              {
                pattern: /^\d{16}$/,
                message: "The input is not valid card number!",
              },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Card Number" defaultValue={card_number} />
          </Form.Item>

          <Form.Item
            name="card-holder"
            rules={[
              {
                required: true,
                message: "Please input your card holder!",
              },
              {
                pattern: /^[A-Za-z\s-]{2,50}$/,
                message: "The input is not valid card holder!",
              },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Card Holder" defaultValue={card_holder} />
          </Form.Item>

          <Form.Item
            name="expiry-date"
            rules={[
              {
                required: true,
                message: "Please input your expiry date!",
              },
              {
                pattern: /^\d{3,4}$/,
                message: "The input is not valid expiry date!",
              },
            ]}
            className={styles.formItem}
          >
            {/* <Input placeholder="CVV" defaultValue={cvv} /> */}
            {/* <DatePicker
              style={{ width: "100%" }}
              onChange={onChange}
              // defaultValue={expiry_date ? dayjs(expiry_date) : null}
              needConfirm
            /> */}
            <DatePicker
              picker="month"
              format="MM-YY"
              style={{ width: "100%" }}
              onChange={onChange}
              disabledDate={disabledDate}
              needConfirm
            />
          </Form.Item>

          <Form.Item
            name="cvv"
            rules={[
              {
                required: true,
                message: "Please input your CVV!",
              },
              {
                pattern: /^\d{3,4}$/,
                message: "The input is not valid CVV!",
              },
            ]}
            className={styles.formItem}
          >
            <Input placeholder="CVV" defaultValue={cvv} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default PaymentCard;
