import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUpPage.module.scss";
import { ConfigProvider, Button, Form, Input, Select } from "antd";

const { Option } = Select;

const SignUpPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    navigate("/");
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
              // {...formItemLayout}
              form={form}
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
                name="name"
                // label="Name"
                // tooltip="What do you want others to call you?"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                    // whitespace: true,
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
                name="email"
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
                name="phone"
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
                name="password"
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
  );
};

export default SignUpPage;
