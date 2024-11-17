import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.scss";
import { ConfigProvider, Button, Form, Input, Spin } from "antd";
import { message as messageAnt } from "antd";
import { useState } from "react";
import { authService } from "../../services/auth";
// import { useDispatch } from "react-redux";
// import { DispatchApp } from "../../store";

// Match the proto naming
interface ForgotPasswordValues {
  email: string;
  new_password: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const dispatch: DispatchApp = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: ForgotPasswordValues) => {
    setIsLoading(true);
    authService
      .forgotPassword(values.email, values.new_password)
      .then(({ message }) => {
        console.log(message);
        messageAnt.success(
          "Verification email sent. Please check your inbox!!!"
        );
        navigate("/");
      })
      .catch((e) => {
        console.error("Forgot Password error:", e);
        alert("Forgot Password failed: Please check your information.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // const onFinishFailed = (({ values, errorFields, outOfDate }) => {
  //   console.log("Received values of form: ", values);
  // };

  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <div className={styles.container}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.message}>Welcome!</h1>
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
            <h3 className={styles.formHeader}>Reset Password</h3>
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
                name="reset-password"
                initialValues={{ remember: false }}
                // variant="filled"
                style={{ width: 300 }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                className={styles.formContent}
              >
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
                  name="new_password" // Match the proto naming
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
                  dependencies={["new_password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("new_password") === value) {
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
                    Reset Password
                  </Button>
                  Back? <Link to="/">Log In</Link>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default ForgotPasswordPage;
