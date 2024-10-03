import styles from "./LogInPage.module.scss";
import { Button, Checkbox, Form, Input, Flex } from "antd";

const LogInPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

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
          <Form
            name="login"
            initialValues={{ remember: false }}
            style={{ maxWidth: 360 }}
            onFinish={onFinish}
            className={styles.formContent}
          >
            <Form.Item
              name="username"
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
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input type="password" placeholder="Password" />
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
              <Button block type="primary" htmlType="submit">
                Log In
              </Button>
              Don't have an account? <a href="">Sign Up</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
