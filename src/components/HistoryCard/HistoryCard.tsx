// import styles from "../BookTrip/BookTrip.module.scss";
import styles from "./HistoryCard.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { BookingHistory } from "../HistoryTab/HistoryTab";

const HistoryCard: React.FC<BookingHistory> = ({
  id,
  pickup,
  destination,
  fare,
  date,
  status,
  distance,
}) => {
  const statusImageSrc =
    status === "Completed"
      ? "/src/assets/completed_status.png"
      : "/src/assets/cancelled_status.png";

  return (
    <div className={styles.trip}>
      <figure className={styles.tripImageContainer}>
        <img
          className={styles.tripImage}
          src="/src/assets/taxi_icon.png"
          alt=""
        />
      </figure>
      <div className={styles.tripContent}>
        <div className={styles.tripLocation}>
          <div className={styles.tripElement}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            <p className={styles.content}>{pickup}</p>
          </div>
          <div className={styles.tripElement}>
            <FontAwesomeIcon className={styles.arrow} icon={faArrowRightLong} />
          </div>
          <div className={styles.tripElement}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
            <p className={styles.content}>{destination}</p>
          </div>
        </div>

        <div className={styles.tripInfo}>
          <div className={styles.tripElement}>
            <img
              className={styles.iconImg}
              src="/src/assets/calendar_icon.png"
              alt=""
            />
            <p className={styles.content}>{date}</p>
          </div>
          <div className={styles.tripElement}>
            <img className={styles.iconImg} src={statusImageSrc} alt="" />
            <p className={styles.content}>{status}</p>
          </div>
          <div className={styles.tripElement}>
            <img
              className={styles.iconImg}
              src="/src/assets/distance_icon.png"
              alt=""
            />
            <p className={styles.content}>{`${distance}km`}</p>
          </div>
        </div>
      </div>
      <div className={styles.tripFare}>
        <p className={styles.fare}>{`S$${fare}`}</p>
      </div>
    </div>
  );
};

export default HistoryCard;
