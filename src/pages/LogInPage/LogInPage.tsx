import { Link, useNavigate } from "react-router-dom";
import styles from "./LogInPage.module.scss";
import {
  ConfigProvider,
  Button,
  Checkbox,
  Form,
  Input,
  Flex,
  Spin,
} from "antd";
import { useState } from "react";
import { authService } from "../../services/auth";
import { useDispatch } from "react-redux";
import { DispatchApp } from "../../store";
import { addAccessToken, getUserAction } from "../../store/auth/authSlice";

// Match the proto naming
interface LogInValues {
  phone_number: string;
  password: string;
}

const LogInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: DispatchApp = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: LogInValues) => {
    setIsLoading(true);
    authService
      .logIn(values.phone_number, values.password)
      .then(({ access_token }) => {
        dispatch(addAccessToken(access_token));
        dispatch(getUserAction());
        navigate("/home");
      })
      .catch((e) => {
        console.error("Login error:", e);
        alert("Login failed: Please check your credentials and try again.");
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
            <h3 className={styles.formHeader}>Log In</h3>
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
                name="login"
                initialValues={{ remember: false }}
                // variant="filled"
                style={{ width: 300 }}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                className={styles.formContent}
              >
                <Form.Item
                  name="phone_number" // Match the proto naming
                  rules={[
                    {
                      required: true,
                      message: "Please input your Phone Number!",
                    },
                    {
                      pattern: /^(8|9)\d{7}$/,
                      message: "The input is not valid phone number!",
                    },
                  ]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                  name="password" // Match the proto naming
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                    {
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
                      message: "The input is not valid password!",
                    },
                  ]}
                >
                  <Input.Password type="password" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Flex justify="space-between" align="center">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    {/* <a href="">Forgot password</a> */}
                    <Link to="/reset-password">Forgot password</Link>
                  </Flex>
                </Form.Item>

                <Form.Item>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    className={styles.formButton}
                  >
                    Log In
                  </Button>
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default LogInPage;
