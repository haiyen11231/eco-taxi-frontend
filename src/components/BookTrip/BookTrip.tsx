import { useState } from "react";
import { Button, message, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styles from "./BookTrip.module.scss";

// Custom marker icons with color options
const locationIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green marker for pickup, destination
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const positionIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker for your current location
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const BookTrip = ({ prev }) => {
  const NTU_COORDS = { lat: 1.3483, lng: 103.6831 };
  const CHANGI_AIRPORT_COORDS = { lat: 1.3644, lng: 103.9915 };
  const routeLinePositions = [NTU_COORDS, CHANGI_AIRPORT_COORDS];

  // State to store current position
  const [position, setPosition] = useState(null);

  // Component to detect location and update position
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={positionIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.trip}>
        <figure className={styles.tripImageContainer}>
          <img
            className={styles.tripImage}
            src="/src/assets/taxi_icon.png"
            alt="Taxi Icon"
          />
        </figure>
        <div className={styles.tripContent}>
          <div className={styles.tripLocation}>
            <div className={styles.tripElement}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <p className={styles.content}>NTU</p>
            </div>
            <div className={styles.tripElement}>
              <FontAwesomeIcon
                className={styles.arrow}
                icon={faArrowRightLong}
              />
            </div>
            <div className={styles.tripElement}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
              <p className={styles.content}>Changi Airport</p>
            </div>
          </div>
          <div className={styles.tripInfo}>
            <div className={styles.tripElement}>
              <img
                className={styles.iconImg}
                src="/src/assets/clock_waiting_time_icon.png"
                alt="Clock Icon"
              />
              <p className={styles.content}>Approx. 5mins</p>
            </div>
            <div className={styles.tripElement}>
              <img
                className={styles.iconImg}
                src="/src/assets/clock_arrival_time_icon.png"
                alt="Arrival Time Icon"
              />
              <p className={styles.content}>9.15PM</p>
            </div>
            <div className={styles.tripElement}>
              <img
                className={styles.iconImg}
                src="/src/assets/distance_icon.png"
                alt="Distance Icon"
              />
              <p className={styles.content}>37.5km</p>
            </div>
            <div className={styles.tripElement}>
              <img
                className={styles.iconImg}
                src="/src/assets/many_cars.png"
                alt="Available Taxis Icon"
              />
              <p className={styles.content}>3 available taxis</p>
            </div>
          </div>
        </div>
        <div className={styles.tripFare}>
          <p className={styles.fare}>S$39.5</p>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <MapContainer center={NTU_COORDS} zoom={13} className={styles.map}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Marker for NTU with custom icon */}
          <Marker position={NTU_COORDS} icon={locationIcon}>
            <Popup>Pickup: NTU</Popup>
          </Marker>

          {/* Marker for Changi Airport with custom icon */}
          <Marker position={CHANGI_AIRPORT_COORDS} icon={locationIcon}>
            <Popup>Destination: Changi Airport</Popup>
          </Marker>

          {/* Polyline between NTU and Changi Airport */}
          <Polyline positions={routeLinePositions} color="blue" weight={3} />

          {/* Marker for Current Location */}
          <LocationMarker />
        </MapContainer>
      </div>

      <Space className={styles.btnContainer}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => message.success("Processing complete!")}
        >
          Confirm Ride
        </Button>
        <Button htmlType="button" onClick={prev}>
          Search Trip
        </Button>
      </Space>
    </div>
  );
};

export default BookTrip;
