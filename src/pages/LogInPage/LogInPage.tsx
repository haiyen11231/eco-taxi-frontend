import { Link, useNavigate } from "react-router-dom";
import styles from "./LogInPage.module.scss";
import { ConfigProvider, Button, Checkbox, Form, Input, Flex } from "antd";

const LogInPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    navigate("/home");
  };

  // const onFinishFailed = (({ values, errorFields, outOfDate }) => {
  //   console.log("Received values of form: ", values);
  // };

  return (
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
              style={{ maxWidth: 360 }}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              className={styles.formContent}
            >
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email or Phone Number!",
                  },
                ]}
              >
                <Input placeholder="Email or Phone Number" />
              </Form.Item>

              <Form.Item
                name="password"
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
                  <a href="">Forgot password</a>
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
  );
};

export default LogInPage;
