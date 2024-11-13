import React from "react";
import styles from "./PaymentCard.module.scss";
import { Card, UpdateCardRequest } from "../../types/payment";
import { Button, Form, Input, Modal, DatePicker, Checkbox, Flex } from "antd";
// import type { DatePickerProps } from "antd";
// import type { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons"; // Import specific icon
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import type { GetProps } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DispatchApp } from "../../store";
import { useDispatch } from "react-redux";
import {
  deleteCardAction,
  getCardsAction,
  updateCardAction,
} from "../../store/payment/paymentSlice";

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
  console.log(id, card_number, card_holder, expiry_date, cvv, is_default);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");
  const dispatch: DispatchApp = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  // const handleOk = () => {
  //   // setModalText("The modal will be closed after two seconds");
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //     setIsLoading(false);
  //   }, 2000);
  // };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const [form] = Form.useForm();
  // const navigate = useNavigate();

  const onFinish = (values: UpdateCardRequest) => {
    const expiryTimestamp = dayjs(values.expiry_date).unix();
    setIsLoading(true);

    try {
      dispatch(
        updateCardAction({
          id: id,
          card_number: values.card_number,
          card_holder: values.card_holder,
          expiry_date: { seconds: expiryTimestamp, nanos: 0 },
          cvv: values.cvv,
          is_default: values.is_default,
        })
      );
      dispatch(getCardsAction());
    } catch (e) {
      console.error("Update card error:", e);
      alert("Update card failed: Please check your information and try again.");
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  const onDelete = () => {
    setIsLoading(true);

    try {
      dispatch(deleteCardAction(id));
      dispatch(getCardsAction());
    } catch (e) {
      console.error("Delete card error:", e);
      alert("Delete card failed.");
    } finally {
      setIsLoading(false);
    }
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
          <p className={styles.content}>{expiry_date || "N/A"}</p>
        </div>
        <div className={styles.cardElement}>
          <p className={styles.title}>CVV</p>
          <p className={styles.content}>{cvv}</p>
        </div>
      </div>
      <Button color="primary" variant="text" onClick={showModal}>
        <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#0e862c" }} />
      </Button>
      <Button color="primary" variant="text" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash} style={{ color: "#0e862c" }} />
      </Button>

      <Modal
        title="Update Card"
        open={open}
        // onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        footer={null}
        // footer={[
        //   <Button
        //     key="submit"
        //     type="primary"
        //     loading={isLoading}
        //     onClick={handleOk}
        //   >
        //     Submit
        //   </Button>,
        // ]}
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
            name="card_number"
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
            <Input placeholder="Card Number" />
            {/* <Input placeholder="Card Number" defaultValue={card_number} /> */}
          </Form.Item>

          <Form.Item
            name="card_holder"
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
            {/* <Input placeholder="Card Holder" defaultValue={card_holder} /> */}
            <Input placeholder="Card Holder" />
          </Form.Item>

          <Form.Item
            name="expiry_date"
            rules={[
              { required: true, message: "Please select an expiry date!" },
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
              // onChange={onChange}
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
            {/* <Input placeholder="CVV" defaultValue={cvv} /> */}
            <Input placeholder="CVV" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="is_default" valuePropName="checked">
                <Checkbox>Default card</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Update
                </Button>
              </Form.Item>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default PaymentCard;
