import { Button, Form, Input, Modal } from "antd";
import { Select } from "antd";
import styles from "./InfoCard.module.scss";
import {
  ChangePasswordRequest,
  GetUserResponse,
  UpdateUserRequest,
} from "../../types/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { DispatchApp } from "../../store";
import { useDispatch } from "react-redux";
import {
  changePasswordAction,
  getUserAction,
  updateUserAction,
} from "../../store/auth/authSlice";

const InfoCard: React.FC<GetUserResponse> = ({
  name,
  phone_number,
  email,
  distance_travelled,
}) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  // const [modalText, setModalText] = useState("Content of the modal");
  const dispatch: DispatchApp = useDispatch();

  const handleOkProfile = (values: UpdateUserRequest) => {
    // setModalText("The modal will be closed after two seconds");
    setIsLoadingProfile(true);

    try {
      dispatch(
        updateUserAction({
          name: values.name,
          phone_number: values.phone_number,
          email: values.email,
        })
      );
      dispatch(getUserAction());
    } catch (e) {
      console.error("Update user error:", e);
      alert("Update user failed: Please check your information and try again.");
    } finally {
      setOpenProfile(false);
      setIsLoadingProfile(false);
    }
  };

  const handleOkPassword = (values: ChangePasswordRequest) => {
    // setModalText("The modal will be closed after two seconds");
    setIsLoadingPassword(true);

    try {
      dispatch(
        changePasswordAction({
          old_password: values.old_password,
          new_password: values.new_password,
        })
      );
      dispatch(getUserAction());
    } catch (e) {
      console.error("Change password error:", e);
      alert(
        "Change password failed: Please check your information and try again."
      );
    } finally {
      setOpenPassword(false);
      setIsLoadingPassword(false);
    }
  };

  const handleCancelProfile = () => {
    console.log("Clicked cancel button");
    setOpenProfile(false);
  };

  const handleCancelPassword = () => {
    console.log("Clicked cancel button");
    setOpenPassword(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 75 }}>
        <Select.Option value="65">+65</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>My Account</h3>
      <div className={styles.subContainer}>
        <div className={styles.subHeaderContainer}>
          <h4 className={styles.subHeader}>Profile Details</h4>
          <Button
            color="primary"
            variant="text"
            onClick={() => setOpenProfile(true)}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#0e862c" }}
            />
          </Button>
        </div>

        <Modal
          title="Update Profile"
          open={openProfile}
          // onOk={handleOkProfile}
          confirmLoading={isLoadingProfile}
          onCancel={handleCancelProfile}
          footer={null}
          // footer={[
          //   <Button
          //     key="submit"
          //     type="primary"
          //     loading={isLoadingProfile}
          //     onClick={handleOkProfile}
          //   >
          //     Submit
          //   </Button>,
          // ]}
          className={styles.formContainer}
        >
          <Form
            // form={form}
            name="update-profile"
            onFinish={handleOkProfile}
            initialValues={{
              prefix: "+65",
            }}
            // variant="filled"
            style={{ maxWidth: 500 }}
            scrollToFirstError
            className={styles.form}
          >
            <Form.Item
              name="name" // Match the proto naming
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
              className={styles.formItem}
            >
              {/* <Input placeholder="Name" defaultValue={name} /> */}
              <Input placeholder="Name" />
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
                  pattern: /^(8|9)\d{7}$/,
                  message: "The input is not valid phone number!",
                },
              ]}
            >
              {/* <Input
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
                placeholder="Phone Number"
                defaultValue={phone_number}
              /> */}
              <Input
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
                placeholder="Phone Number"
              />
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
              className={styles.formItem}
            >
              {/* <Input placeholder="Email" defaultValue={email} /> */}
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingProfile}
              >
                Submit
              </Button>
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
              <p className={styles.content}>{`${distance_travelled} km`}</p>
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
            <p className={styles.content}>{`(+65) ${phone_number}`}</p>
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
          <Button
            color="primary"
            variant="text"
            onClick={() => setOpenPassword(true)}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: "#0e862c" }}
            />
          </Button>
        </div>
        <Modal
          title="Change Password"
          open={openPassword}
          // onOk={handleOkPassword}
          confirmLoading={isLoadingPassword}
          onCancel={handleCancelPassword}
          footer={null}
          // footer={[
          //   <Button
          //     key="submit"
          //     type="primary"
          //     loading={isLoadingPassword}
          //     onClick={handleOkPassword}
          //   >
          //     Submit
          //   </Button>,
          // ]}
        >
          <Form
            // form={form}
            name="change-password"
            onFinish={handleOkPassword}
            initialValues={{
              prefix: "+65",
            }}
            style={{ maxWidth: 500 }}
            scrollToFirstError
            className={styles.formContent}
          >
            <Form.Item
              name="old_password"
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
              name="new_password"
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
              dependencies={["new_password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
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
                type="primary"
                htmlType="submit"
                loading={isLoadingPassword}
              >
                Submit
              </Button>
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
