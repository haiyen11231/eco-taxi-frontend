import React from "react";
import { Button, Form, Input, message, Space, Flex } from "antd";
import styles from "./BookTrip.module.scss";

const BookTrip = ({ prev }) => {
  //   const [form] = Form.useForm();

  //   const onFinish = () => {
  //     message.success("Submit success!");
  //     next(); // Move to the next step
  //   };

  //   const onFinishFailed = () => {
  //     message.error("Submit failed!");
  //   };

  //   const onFill = () => {
  //     form.setFieldsValue({
  //       url: "https://taobao.com/",
  //     });
  //   };

  //   string pickup = 1;
  //   string destination = 2;
  //   double distance = 3;
  //   double fare = 4;
  //   google.protobuf.Timestamp estimated_arrival_date_time = 5;
  //   int64 estimated_waiting_time = 6;
  //   int64 num_of_available_taxis = 7;
  //   repeated double nearest_taxi_coordinates = 8;

  return (
    <div className={styles.container}>
      <div className={styles.trip}>
        <figure className={styles.tripImageContainer}>
          <img
            className={styles.tripImage}
            src="/src/assets/taxi_icon.png"
            alt=""
          />
        </figure>
        <div className={styles.tripContent}>
          <div className={styles.tripLocation}>
            <div className={styles.tripElement}>
              <p className={styles.title}>Card Number</p>
              <p className={styles.content}>Number</p>
            </div>
            <div className={styles.tripElement}>
              <p className={styles.title}>Card Number</p>
              <p className={styles.content}>Number</p>
            </div>
            <div className={styles.tripElement}>
              <p className={styles.title}>Card Number</p>
              <p className={styles.content}>Number</p>
            </div>
          </div>

          <div className={styles.tripInfo}>
            <div className={styles.tripElement}>
              <p className={styles.title}>Card Number</p>
              <p className={styles.content}>Number</p>
            </div>
            <div className={styles.tripElement}>
              <p className={styles.title}>Card Holder</p>
              <p className={styles.content}>sdf</p>
            </div>
            <div className={styles.tripElement}>
              <p className={styles.title}>Expiry Date</p>
              <p className={styles.content}>dfvcr</p>
            </div>
            <div className={styles.tripElement}>
              <p className={styles.title}>CVV</p>
              <p className={styles.content}>fdv</p>
            </div>
          </div>
        </div>
        <div className={styles.tripFare}>
          <p className={styles.fare}>S$35.70</p>
        </div>
      </div>
      <div className={styles.map}></div>
      <Space>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => message.success("Processing complete!")}
        >
          Confirm Ride
        </Button>
        <Button htmlType="button" onClick={prev}>
          Search Trip
        </Button>
      </Space>
    </div>

    // <Form
    //   className={styles.form}
    //   form={form}
    //   layout="vertical"
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    // >
    //   <Form.Item>
    //     <Flex justify="space-between" align="center">
    //       <Form.Item
    //         className={styles.formInput}
    //         name="pickup"
    //         label="From"
    //         rules={[
    //           { required: true, message: "Please enter a pickup location" },
    //           //   { type: "url", warningOnly: true },
    //           { type: "string", min: 6 },
    //         ]}
    //       >
    //         <Input placeholder="Search Pickup" />
    //       </Form.Item>

    //       <Form.Item
    //         className={styles.formInput}
    //         name="destination"
    //         label="To"
    //         rules={[
    //           {
    //             required: true,
    //             message: "Please enter a destination location",
    //           },
    //           //   { type: "url", warningOnly: true },
    //           { type: "string", min: 6 },
    //         ]}
    //       >
    //         <Input placeholder="Search Destination" />
    //       </Form.Item>
    //     </Flex>
    //   </Form.Item>

    //   {/* <Form.Item>
    //       <Space>
    //         <Button type="primary" htmlType="submit">
    //           Submit
    //         </Button>
    //         <Button htmlType="button" onClick={onFill}>
    //           Fill
    //         </Button>
    //       </Space>
    //     </Form.Item> */}
    //   <Form.Item>
    //     <Button type="primary" htmlType="submit">
    //       Preview
    //     </Button>
    //   </Form.Item>
    // </Form>
  );
};

export default BookTrip;
