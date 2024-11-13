import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, DatePicker, Checkbox, Flex } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppContext } from "../../pages/HomePage/HomePage";
import PaymentCard from "../PaymentCard/PaymentCard";
import styles from "./PaymentTab.module.scss";
import { CreateCardRequest } from "../../types/payment";
import { DispatchApp } from "../../store";
import { useDispatch } from "react-redux";
import {
  createCardAction,
  getCardsAction,
} from "../../store/payment/paymentSlice";

dayjs.extend(customParseFormat);

const PaymentTab = () => {
  // const params = useParams<{ id: string }>();
  // const cardId = params.id;
  const dispatch: DispatchApp = useDispatch();
  const context = useContext(AppContext);
  const cards = context?.cards;
  console.log("Fetch Cards in PaymentTab:", cards);

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  // const navigate = useNavigate();

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const onFinish = (values: CreateCardRequest) => {
    const expiryTimestamp = dayjs(values.expiry_date).unix();
    setIsLoading(true);

    try {
      dispatch(
        createCardAction({
          card_number: values.card_number,
          card_holder: values.card_holder,
          expiry_date: { seconds: expiryTimestamp, nanos: 0 },
          cvv: values.cvv,
          is_default: values.is_default,
        })
      );
      dispatch(getCardsAction());
    } catch (e) {
      console.error("Create card error:", e);
      alert("Create card failed: Please check your information and try again.");
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>My Credit/Debit Cards</h3>
      {/* {cards?.map((card) => (
        <PaymentCard
          key={card.id}
          {...card}
          expiry_date={dayjs(card.expiry_date).format("MM-YY")}
        />
      ))} */}
      {(Array.isArray(cards?.cards) ? cards.cards : []).map((card) => (
        <PaymentCard
          key={card.id}
          id={card.id}
          card_number={card.cardNumber}
          card_holder={card.cardHolder}
          expiry_date={dayjs(card.expiryDate).format("MM-YY")}
          cvv={card.cvv}
          is_default={card.isDefault}
        />
      ))}
      <Button
        type="primary"
        onClick={showModal}
        icon={<PlusOutlined />}
        className={styles.btn}
      >
        New Card
      </Button>
      <Modal
        title="Create New Card"
        open={open}
        // onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
        footer={null}
        // footer={[
        //   <Button
        //     key="submit"
        //     type="primary"
        //     loading={confirmLoading}
        //     onClick={handleOk}
        //   >
        //     Submit
        //   </Button>,
        // ]}
        className={styles.formContainer}
      >
        <Form
          form={form}
          name="create-card"
          onFinish={onFinish}
          style={{ maxWidth: 500 }}
          className={styles.form}
        >
          <Form.Item
            name="card_number"
            rules={[
              { required: true, message: "Please input your card number!" },
            ]}
          >
            <Input placeholder="Card Number" />
          </Form.Item>

          <Form.Item
            name="card_holder"
            rules={[
              { required: true, message: "Please input your card holder!" },
            ]}
          >
            <Input placeholder="Card Holder" />
          </Form.Item>

          <Form.Item
            name="expiry_date"
            rules={[
              { required: true, message: "Please select an expiry date!" },
            ]}
          >
            <DatePicker
              picker="month"
              format="MM-YY"
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current < dayjs().endOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="cvv"
            rules={[{ required: true, message: "Please input your CVV!" }]}
          >
            <Input placeholder="CVV" />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="is_default" valuePropName="checked">
                <Checkbox>Default card</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
              </Form.Item>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentTab;
