import { Button, Form, Input, Modal } from "antd";
import { Select } from "antd";
import styles from "./InfoCard.module.scss";
import { UserInfo } from "../../types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoCard: React.FC<UserInfo> = ({
  id,
  name,
  phoneNumber,
  email,
  distanceTravelled,
}) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [confirmLoadingProfile, setConfirmLoadingProfile] = useState(false);
  const [confirmLoadingPassword, setConfirmLoadingPassword] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModalProfile = () => {
    setOpenProfile(true);
  };

  const showModalPassword = () => {
    setOpenPassword(true);
  };

  const handleOkProfile = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoadingProfile(true);
    setTimeout(() => {
      setOpenProfile(false);
      setConfirmLoadingProfile(false);
    }, 2000);
  };

  const handleOkPassword = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoadingPassword(true);
    setTimeout(() => {
      setOpenPassword(false);
      setConfirmLoadingPassword(false);
    }, 2000);
  };

  const handleCancelProfile = () => {
    console.log("Clicked cancel button");
    setOpenProfile(false);
  };

  const handleCancelPassword = () => {
    console.log("Clicked cancel button");
    setOpenPassword(false);
  };

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: unknown) => {
    navigate("/home");
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 75 }}>
        <Option value="65">+65</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>My Account</h3>
      <div className={styles.subContainer}>
        <div className={styles.subHeaderContainer}>
          <h4 className={styles.subHeader}>Profile Details</h4>
          <Button color="primary" variant="text" onClick={showModalProfile}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#0e862c" }}
            />
          </Button>
        </div>

        <Modal
          title="Update Profile"
          open={openProfile}
          onOk={handleOkProfile}
          confirmLoading={confirmLoadingProfile}
          onCancel={handleCancelProfile}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={confirmLoadingProfile}
              onClick={handleOkProfile}
            >
              Submit
            </Button>,
          ]}
          className={styles.formContainer}
        >
          <Form
            form={form}
            name="update-profile"
            onFinish={onFinish}
            initialValues={{
              prefix: "+65",
            }}
            // variant="filled"
            style={{ maxWidth: 500 }}
            scrollToFirstError
            className={styles.form}
          >
            <Form.Item
              name="name"
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
              className={styles.formItem}
            >
              <Input placeholder="Name" defaultValue={name} />
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
              className={styles.formItem}
            >
              <Input placeholder="Email" defaultValue={email} />
            </Form.Item>
          </Form>
        </Modal>

        <div className={styles.subContent}>
          <FontAwesomeIcon icon={faCircleUser} className={styles.avatar} />
          <p className={styles.name}>{name}</p>
          <div className={styles.distanceContainer}>
            <div className={styles.contentContainer}>
              <img
                className={styles.icon}
                src="/src/assets/distance_icon.png"
                alt=""
              />
              <p className={styles.content}>{`${distanceTravelled} km`}</p>
            </div>

            <p className={styles.title}>Total Distance Travelled</p>
          </div>
        </div>
        <div className={styles.subContent}>
          <div className={styles.contentContainer}>
            <img
              className={styles.icon}
              src="/src/assets/phone_icon.png"
              alt=""
            />
            <p className={styles.content}>{`(+65) ${phoneNumber}`}</p>
          </div>
          <div className={styles.contentContainer}>
            <img
              className={styles.icon}
              src="/src/assets/email_icon.png"
              alt=""
            />
            <p className={styles.content}>{email}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.subContainer} ${styles.password}`}>
        <div className={styles.subHeaderContainer}>
          <h4 className={styles.subHeader}>Password</h4>
          <Button color="primary" variant="text" onClick={showModalPassword}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#0e862c" }}
            />
          </Button>
        </div>
        <Modal
          title="Change Password"
          open={openPassword}
          onOk={handleOkPassword}
          confirmLoading={confirmLoadingPassword}
          onCancel={handleCancelPassword}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={confirmLoadingPassword}
              onClick={handleOkPassword}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            form={form}
            name="signup"
            onFinish={onFinish}
            initialValues={{
              prefix: "+65",
            }}
            style={{ maxWidth: 500 }}
            scrollToFirstError
            className={styles.formContent}
          >
            <Form.Item
              name="old-password"
              rules={[
                {
                  required: true,
                  message: "Please input your old password!",
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
                  message: "The input is not valid password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Old Password" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
                  message: "The input is not valid password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="New Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
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
          </Form>
        </Modal>
        <div
          className={`${styles.contentContainer} ${styles.passwordContainer}`}
        >
          <img
            className={styles.icon}
            src="/src/assets/password_icon.png"
            alt=""
          />
          <p className={styles.content}>●●●●●●●</p>
        </div>
        {/* <p className={styles.password}>Password: ●●●●●●●</p> */}
      </div>
    </div>
  );
};

export default InfoCard;
