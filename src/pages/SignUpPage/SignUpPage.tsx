import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.scss";
import { ConfigProvider, Button, Form, Input, Select, Spin } from "antd";
// import { DispatchApp } from "../../store";
// import { useDispatch } from "react-redux";
import { authService } from "../../services/auth";
import { useState } from "react";

const { Option } = Select;

// Match the proto naming
interface SignUpValues {
  name: string;
  phone_number: string;
  email: string;
  password: string;
}

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch: DispatchApp = useDispatch();
  // const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: SignUpValues) => {
    setIsLoading(true);
    authService
      .signUp(values.name, values.phone_number, values.email, values.password)
      .then(({ message }) => {
        console.log(message);
        navigate("/");
      })
      .catch((e) => {
        console.error("Signup error:", e);
        alert("Signup failed: Please check your information.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 75 }}>
        <Option value="65">+65</Option>
        {/* <Option value="84">+84</Option> */}
      </Select>
    </Form.Item>
  );

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <div className={styles.container}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.message}>Start your journey with us today!!</h1>
          <figure className={styles.logoContainer}>
            <img
              src="/src/assets/ecotaxi_logo_big.png"
              alt=""
              className={styles.logo}
            />
          </figure>
        </div>
        <div className={styles.form}>
          <div className={styles.formContainer}>
            <h3 className={styles.formHeader}>Sign Up</h3>
            <ConfigProvider
              theme={{
                token: {
                  // Global Token
                  colorPrimary: "#0e862c",
                  fontSize: 16,
                  fontFamily: "Roboto, sans-serif",
                },
              }}
            >
              <Form
                // form={form}
                name="signup"
                onFinish={onFinish}
                initialValues={{
                  prefix: "+65",
                }}
                // variant="filled"
                style={{ maxWidth: 500 }}
                scrollToFirstError
                className={styles.formContent}
              >
                <Form.Item
                  name="name" // Match the proto naming
                  // label="Name"
                  // tooltip="What do you want others to call you?"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                      whitespace: true,
                    },
                    {
                      pattern: /^[A-Za-z]{2,}$/,
                      message: "The input is not valid name!",
                    },
                  ]}
                >
                  <Input placeholder="Name" />
                </Form.Item>

                <Form.Item
                  name="email" // Match the proto naming
                  // label="Email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="phone_number" // Match the proto naming
                  // label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: /^[1-9]\d{7}$/,
                      message: "The input is not valid phone number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                    placeholder="Phone Number"
                  />
                </Form.Item>

                <Form.Item
                  name="password" // Match the proto naming
                  // label="Password"
                  // tooltip="Password must have at least 8 characters long and be a combination of uppercase letters, lowercase letters, numbers, and symbols."
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
                      message: "The input is not valid password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  // label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The new password that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    className={styles.formButton}
                  >
                    Sign Up
                  </Button>
                  Already have an account? <Link to="/">Log In</Link>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default SignUpPage;
