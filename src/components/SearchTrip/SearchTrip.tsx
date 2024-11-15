import React from "react";
import { Button, Form, Input, message, Space, Flex } from "antd";
import styles from "./SearchTrip.module.scss";

const SearchTrip: React.FC = ({ next }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Submit success!");
    next(); // Move to the next step
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <Form
      className={styles.form}
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item
            className={styles.formInput}
            name="pickup"
            label="From"
            rules={[
              { required: true, message: "Please enter a pickup location" },
              //   { type: "url", warningOnly: true },
              { type: "string", min: 2 },
            ]}
          >
            <Input placeholder="Search Pickup" />
          </Form.Item>

          <Form.Item
            className={styles.formInput}
            name="destination"
            label="To"
            rules={[
              {
                required: true,
                message: "Please enter a destination location",
              },
              //   { type: "url", warningOnly: true },
              { type: "string", min: 2 },
            ]}
          >
            <Input placeholder="Search Destination" />
          </Form.Item>
        </Flex>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Preview
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchTrip;
