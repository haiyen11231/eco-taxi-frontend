import React, { useContext, useEffect } from "react";
import { AppState, DispatchApp } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Col, DatePicker, Form, Input, Select } from "antd";
import type { DatePickerProps } from "antd";
import { Spin } from "antd";
import type { Dayjs } from "dayjs";
import PaymentCard from "../PaymentCard/PaymentCard";
import styles from "./PaymentTab.module.scss";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Card } from "../../types/payment";
import ConnectedPaymentCard from "../ConnectedPaymentCard/ConnectedPaymentCard";
// import { PaymentContext } from "../../pages/HomePage/HomePage";
import {
  useCardSelector,
  usePaymentLoadingSelector,
} from "../../store/payment/selector";
import { fetchCardById } from "../../store/payment/paymentSlice";
import customParseFormat from "dayjs/plugin/customParseFormat";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const data: Card[] = [
  {
    id: "1",
    card_number: "147852369",
    card_holder: "John Doe",
    expiry_date: dayjs("2025-06"),
    cvv: 703,
    is_default: false,
  },
  {
    id: "2",
    card_number: "149035369",
    card_holder: "John Doe",
    expiry_date: new Date(2025, 11),
    cvv: 241,
    is_default: true,
  },
  {
    id: "3",
    card_number: "905752369",
    card_holder: "John Doe",
    expiry_date: new Date(2027, 1),
    cvv: 351,
    is_default: false,
  },
];

const PaymentTab = () => {
  // const params = useParams<{ id: string }>();
  // const cardId = params.id;
  // const dispatch: DispatchApp = useDispatch();

  // if (!cardId) {
  //   throw Error("Card does not exist");
  // }

  // const card = useCardSelector(cardId ?? "0");
  // const isLoading = usePaymentLoadingSelector();

  // useEffect(() => {
  //   if (!card) {
  //     dispatch(fetchCardById(cardId));
  //   }
  // }, []);

  // if (isLoading) {
  //   <Spin tip="Loading..." spinning={isLoading}></Spin>;
  // }

  // if (!card) {
  //   return <>Not found</>;
  // }

  // const ids = useContext(PaymentContext);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

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

  const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>My Credit/Debit Cards</h3>

      {data.map((card) => (
        <PaymentCard
          key={card.id}
          id={card.id}
          card_number={card.card_number}
          card_holder={card.card_holder}
          expiry_date={card.expiry_date}
          cvv={card.cvv}
          is_default={card.is_default}
        />
      ))}

      {/* {ids?.map((id) => (
        <ConnectedPaymentCard id={id} />
      ))} */}

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
          name="create-card"
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
            <Input placeholder="Card Number" />
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
            <Input placeholder="Card Holder" />
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
            <Input placeholder="CVV" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentTab;
