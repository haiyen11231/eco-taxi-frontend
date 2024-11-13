// import React, { useContext, useEffect } from "react";
// import { AppState, DispatchApp } from "../../store";
// import { useDispatch, useSelector } from "react-redux";
// import { PlusOutlined } from "@ant-design/icons";
// import { Modal, Button, Col, DatePicker, Form, Input, Select } from "antd";
// import type { DatePickerProps } from "antd";
// import { Spin } from "antd";
// import type { Dayjs } from "dayjs";
// import PaymentCard from "../PaymentCard/PaymentCard";
// import styles from "./PaymentTab.module.scss";
// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import dayjs from "dayjs";
// import { Card } from "../../types/payment";
// import ConnectedPaymentCard from "../ConnectedPaymentCard/ConnectedPaymentCard";
// // import { PaymentContext } from "../../pages/HomePage/HomePage";
// import {
//   useCardSelector,
//   usePaymentLoadingSelector,
// } from "../../store/payment/selector";
// import { fetchCardById } from "../../store/payment/paymentSlice";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// import { AppContext } from "../../pages/HomePage/HomePage";

// type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

// dayjs.extend(customParseFormat);

// // GetCardsResp:
// // {"result":[{"cardHolder":"Dog","cardNumber":"0076543678905678","cvv":"109","expiryDate":"2025-01-02T00:00:00Z","id":"7","userId":"9"},
// //   {"cardHolder":"Lan","cardNumber":"0896543678905678","cvv":"891","expiryDate":"2025-01-01T00:00:00Z","id":"8","isDefault":true,"userId":"9"},
// //   {"cardHolder":"Dog","cardNumber":"9076543678905678","cvv":"791","expiryDate":"2025-01-02T00:00:00Z","id":"9","userId":"9"},
// //   {"cardHolder":"Cat","cardNumber":"8076543678905678","cvv":"201","expiryDate":"2025-01-02T00:00:00Z","id":"10","userId":"9"}]}
// // or
// // {"result":[]}

// // CreateCardReq/UpdateCardReq:
// // {
// //   "card_number": "8076543678905678",
// //   "card_holder": "Cat",
// //   "expiry_date": {
// //       "seconds": 1735789792,
// //       "nanos": 0
// //   },
// //   "cvv": 201,
// //   "is_default": false
// // }

// // const data: Card[] = [
// //   {
// //     id: 1,
// //     card_number: "147852369",
// //     card_holder: "John Doe",
// //     expiry_date: dayjs("2025-06"),
// //     cvv: 703,
// //     is_default: false,
// //   },
// //   {
// //     id: 2,
// //     card_number: "149035369",
// //     card_holder: "John Doe",
// //     expiry_date: new Date(2025, 11),
// //     cvv: 241,
// //     is_default: true,
// //   },
// //   {
// //     id: 3,
// //     card_number: "905752369",
// //     card_holder: "John Doe",
// //     expiry_date: new Date(2027, 1),
// //     cvv: 351,
// //     is_default: false,
// //   },
// // ];

// const PaymentTab = () => {
//   const params = useParams<{ id: string }>();
//   const cardId = params.id;
//   // const dispatch: DispatchApp = useDispatch();

//   if (!cardId) {
//     throw Error("Card does not exist");
//   }

//   // const card = useCardSelector(cardId ?? "0");
//   // const isLoading = usePaymentLoadingSelector();

//   // useEffect(() => {
//   //   if (!card) {
//   //     dispatch(fetchCardById(cardId));
//   //   }
//   // }, []);

//   // if (isLoading) {
//   //   <Spin tip="Loading..." spinning={isLoading}></Spin>;
//   // }

//   // if (!card) {
//   //   return <>Not found</>;
//   // }

//   // const ids = useContext(PaymentContext);
//   const cards = useContext(AppContext)?.cards;

//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   // const [modalText, setModalText] = useState("Content of the modal");

//   const disabledDate: RangePickerProps["disabledDate"] = (current) => {
//     // Can not select days before today and today
//     return current && current < dayjs().endOf("day");
//   };

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     // setModalText("The modal will be closed after two seconds");
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setOpen(false);
//       setConfirmLoading(false);
//     }, 2000);
//   };

//   const handleCancel = () => {
//     console.log("Clicked cancel button");
//     setOpen(false);
//   };

//   const [form] = Form.useForm();
//   const navigate = useNavigate();

//   const onFinish = (values: unknown) => {
//     navigate("/home");
//   };

//   const onChange: DatePickerProps<Dayjs[]>["onChange"] = (date, dateString) => {
//     console.log(date, dateString);
//   };

//   return (
//     <div className={styles.container}>
//       <h3 className={styles.header}>My Credit/Debit Cards</h3>

//       {/* {data.map((card) => (
//         <PaymentCard
//           key={card.id}
//           id={card.id}
//           card_number={card.card_number}
//           card_holder={card.card_holder}
//           expiry_date={card.expiry_date}
//           cvv={card.cvv}
//           is_default={card.is_default}
//         />
//       ))} */}

//       {cards?.map((card) => (
//         <PaymentCard
//           key={card.id}
//           id={card.id}
//           card_number={card.card_number}
//           card_holder={card.card_holder}
//           expiry_date={card.expiry_date}
//           cvv={card.cvv}
//           is_default={card.is_default}
//           user_id={card.user_id}
//         />
//       ))}

//       <Button
//         type="primary"
//         onClick={showModal}
//         icon={<PlusOutlined />}
//         className={styles.btn}
//       >
//         New Card
//       </Button>

//       <Modal
//         title="Create New Card"
//         open={open}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//         footer={[
//           <Button
//             key="submit"
//             type="primary"
//             loading={confirmLoading}
//             onClick={handleOk}
//           >
//             Submit
//           </Button>,
//         ]}
//         className={styles.formContainer}
//       >
//         <Form
//           form={form}
//           name="create-card"
//           onFinish={onFinish}
//           style={{ maxWidth: 500 }}
//           scrollToFirstError
//           className={styles.form}
//         >
//           <Form.Item
//             name="card-number"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your card number!",
//               },
//               {
//                 pattern: /^\d{16}$/,
//                 message: "The input is not valid card number!",
//               },
//             ]}
//             className={styles.formItem}
//           >
//             <Input placeholder="Card Number" />
//           </Form.Item>

//           <Form.Item
//             name="card-holder"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your card holder!",
//               },
//               {
//                 pattern: /^[A-Za-z\s-]{2,50}$/,
//                 message: "The input is not valid card holder!",
//               },
//             ]}
//             className={styles.formItem}
//           >
//             <Input placeholder="Card Holder" />
//           </Form.Item>

//           <Form.Item
//             name="expiry-date"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your expiry date!",
//               },
//               {
//                 pattern: /^\d{3,4}$/,
//                 message: "The input is not valid expiry date!",
//               },
//             ]}
//             className={styles.formItem}
//           >
//             {/* <Input placeholder="CVV" defaultValue={cvv} /> */}
//             {/* <DatePicker
//               style={{ width: "100%" }}
//               onChange={onChange}
//               needConfirm
//             /> */}
//             <DatePicker
//               picker="month"
//               format="MM-YY"
//               style={{ width: "100%" }}
//               onChange={onChange}
//               disabledDate={disabledDate}
//               needConfirm
//             />
//           </Form.Item>

//           <Form.Item
//             name="cvv"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your CVV!",
//               },
//               {
//                 pattern: /^\d{3,4}$/,
//                 message: "The input is not valid CVV!",
//               },
//             ]}
//             className={styles.formItem}
//           >
//             <Input placeholder="CVV" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default PaymentTab;

import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Button, Form, Input, DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AppContext } from "../../pages/HomePage/HomePage";
import PaymentCard from "../PaymentCard/PaymentCard";
import styles from "./PaymentTab.module.scss";
import { Card } from "../../types/payment";

dayjs.extend(customParseFormat);

const PaymentTab = () => {
  // const params = useParams<{ id: string }>();
  // const cardId = params.id;
  const context = useContext(AppContext);
  const cards = context?.cards;
  console.log("Fetch Cards in PaymentTab:", cards);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => setOpen(true);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => setOpen(false);

  const onFinish = (values) => {
    const expiryTimestamp = dayjs(values["expiry_date"]).unix();
    const cardData = {
      ...values,
      expiry_date: { seconds: expiryTimestamp, nanos: 0 },
    };
    console.log("Submit Card Data:", cardData);
    navigate("/home");
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
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentTab;
