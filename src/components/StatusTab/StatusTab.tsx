import { Button, message } from "antd";

import styles from "./StatusTab.module.scss";
import { useState } from "react";

const StatusTab = () => {
  const [bookingCancelled, setBookingCancelled] = useState(false);

  const handleCancelBooking = () => {
    message.success("Cancelling successfully!");
    setBookingCancelled(true);
  };

  return (
    <div className={styles.container}>
      {bookingCancelled ? (
        <p className={styles.noBookingMessage}>No booking trip is found!</p>
      ) : (
        <>
          <div className={styles.containerInfo}>
            <div className={styles.taxiContainer}>
              <p className={styles.desc}>
                Your Taxi has been <span className={styles.spec}>found</span>
              </p>
              <img
                className={styles.icon}
                src="/src/assets/taxi_icon.png"
                alt=""
              />
            </div>
            <div className={styles.timeContainer}>
              <div className={styles.timeElement}>
                <img
                  className={styles.iconTime}
                  src="/src/assets/clock_waiting_time_icon.png"
                  alt=""
                />
                <p className={styles.content}>Waiting Time for Taxi: 5mins</p>
              </div>
              <div className={styles.timeElement}>
                <img
                  className={styles.iconTime}
                  src="/src/assets/clock_arrival_time_icon.png"
                  alt=""
                />
                <p className={styles.content}>Estimated Arrival Time: 2.15PM</p>
              </div>
            </div>
          </div>
          <Button
            className={styles.btn}
            type="primary"
            htmlType="submit"
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </Button>
        </>
      )}
    </div>
  );
};

export default StatusTab;
