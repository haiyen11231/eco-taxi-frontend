// import React from "react";
// import { Button, Form, Input, message, Space, Flex } from "antd";
// import styles from "./BookTrip.module.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faMapMarkerAlt,
//   faArrowRightLong,
// } from "@fortawesome/free-solid-svg-icons";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const BookTrip = ({ prev, lat, lng }) => {
//   const position: number[] = [lat || 51.505, lng || -0.09];
//   console.log(position);
//   //   const [form] = Form.useForm();

//   //   const onFinish = () => {
//   //     message.success("Submit success!");
//   //     next(); // Move to the next step
//   //   };

//   //   const onFinishFailed = () => {
//   //     message.error("Submit failed!");
//   //   };

//   //   const onFill = () => {
//   //     form.setFieldsValue({
//   //       url: "https://taobao.com/",
//   //     });
//   //   };

//   //   string pickup = 1;
//   //   string destination = 2;
//   //   double distance = 3;
//   //   double fare = 4;
//   //   google.protobuf.Timestamp estimated_arrival_date_time = 5;
//   //   int64 estimated_waiting_time = 6;
//   //   int64 num_of_available_taxis = 7;
//   //   repeated double nearest_taxi_coordinates = 8;

//   return (
//     <div className={styles.container}>
//       <div className={styles.trip}>
//         <figure className={styles.tripImageContainer}>
//           <img
//             className={styles.tripImage}
//             src="/src/assets/taxi_icon.png"
//             alt=""
//           />
//         </figure>
//         <div className={styles.tripContent}>
//           <div className={styles.tripLocation}>
//             <div className={styles.tripElement}>
//               <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
//               <p className={styles.content}>NTU</p>
//             </div>
//             <div className={styles.tripElement}>
//               <FontAwesomeIcon
//                 className={styles.arrow}
//                 icon={faArrowRightLong}
//               />
//             </div>
//             <div className={styles.tripElement}>
//               <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
//               <p className={styles.content}>Changi Airport</p>
//             </div>
//           </div>

//           <div className={styles.tripInfo}>
//             <div className={styles.tripElement}>
//               <img
//                 className={styles.iconImg}
//                 src="/src/assets/clock_waiting_time_icon.png"
//                 alt=""
//               />
//               <p className={styles.content}>Approx. 5mins</p>
//             </div>
//             <div className={styles.tripElement}>
//               <img
//                 className={styles.iconImg}
//                 src="/src/assets/clock_arrival_time_icon.png"
//                 alt=""
//               />
//               <p className={styles.content}>2.15PM</p>
//             </div>
//             <div className={styles.tripElement}>
//               <img
//                 className={styles.iconImg}
//                 src="/src/assets/distance_icon.png"
//                 alt=""
//               />
//               <p className={styles.content}>37.5km</p>
//             </div>

//             <div className={styles.tripElement}>
//               <img
//                 className={styles.iconImg}
//                 src="/src/assets/many_cars.png"
//                 alt=""
//               />
//               <p className={styles.content}>3 available taxis</p>
//             </div>
//           </div>
//         </div>
//         <div className={styles.tripFare}>
//           <p className={styles.fare}>S$39.5</p>
//         </div>
//       </div>

//       <div className={styles.mapContainer}>
//         <MapContainer
//           center={{ lat: lat || 51.505, lng: lng || -0.09 }}
//           zoom={13}
//           className={styles.map}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={{ lat: lat || 51.505, lng: lng || -0.09 }}>
//             <Popup>
//               Latitude: {lat}, Longitude: {lng}
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </div>

//       <Space className={styles.btnContainer}>
//         <Button
//           type="primary"
//           htmlType="submit"
//           onClick={() => message.success("Processing complete!")}
//         >
//           Confirm Ride
//         </Button>
//         <Button htmlType="button" onClick={prev}>
//           Search Trip
//         </Button>
//       </Space>
//     </div>

//     // <Form
//     //   className={styles.form}
//     //   form={form}
//     //   layout="vertical"
//     //   onFinish={onFinish}
//     //   onFinishFailed={onFinishFailed}
//     //   autoComplete="off"
//     // >
//     //   <Form.Item>
//     //     <Flex justify="space-between" align="center">
//     //       <Form.Item
//     //         className={styles.formInput}
//     //         name="pickup"
//     //         label="From"
//     //         rules={[
//     //           { required: true, message: "Please enter a pickup location" },
//     //           //   { type: "url", warningOnly: true },
//     //           { type: "string", min: 6 },
//     //         ]}
//     //       >
//     //         <Input placeholder="Search Pickup" />
//     //       </Form.Item>

//     //       <Form.Item
//     //         className={styles.formInput}
//     //         name="destination"
//     //         label="To"
//     //         rules={[
//     //           {
//     //             required: true,
//     //             message: "Please enter a destination location",
//     //           },
//     //           //   { type: "url", warningOnly: true },
//     //           { type: "string", min: 6 },
//     //         ]}
//     //       >
//     //         <Input placeholder="Search Destination" />
//     //       </Form.Item>
//     //     </Flex>
//     //   </Form.Item>

//     //   {/* <Form.Item>
//     //       <Space>
//     //         <Button type="primary" htmlType="submit">
//     //           Submit
//     //         </Button>
//     //         <Button htmlType="button" onClick={onFill}>
//     //           Fill
//     //         </Button>
//     //       </Space>
//     //     </Form.Item> */}
//     //   <Form.Item>
//     //     <Button type="primary" htmlType="submit">
//     //       Preview
//     //     </Button>
//     //   </Form.Item>
//     // </Form>
//   );
// };

// export default BookTrip;

import React, { useState } from "react";
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
              <p className={styles.content}>2.15PM</p>
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
