// import {
//   Checkbox,
//   Col,
//   Collapse,
//   // Divider,
//   Form,
//   Row,
//   Select,
//   Space,
//   Typography,
// } from "antd";
// import stylesHistory from "./HistoryTab.module.scss";
// import HistoryCard from "../HistoryCard/HistoryCard";

// const { Title, Text } = Typography;
// const { Panel } = Collapse;

// export type BookingHistory = {
//   id: string;
//   pickup: string;
//   destination: string;
//   fare: number;
//   date: string;
//   status: string;
//   distance: number;
// };

// const bookingList: BookingHistory[] = [
//   {
//     id: "1",
//     pickup: "NTU",
//     destination: "Changi Airport",
//     fare: 39.5,
//     date: "15/11/2024",
//     status: "Cancelled",
//     distance: 37.5,
//   },
//   {
//     id: "2",
//     pickup: "NTU",
//     destination: "NUS",
//     fare: 15.6,
//     date: "12/11/2024",
//     status: "Completed",
//     distance: 14.1,
//   },
//   {
//     id: "3",
//     pickup: "NUS",
//     destination: "Changi Airport",
//     fare: 30.1,
//     date: "13/11/2024",
//     status: "Completed",
//     distance: 27.6,
//   },
// ];

// const HistoryTab = () => {
//   return (
//     <Row gutter={[32, 8]}>
//       <Col span={16}>
//         <div className={stylesHistory.historySort}>
//           <Space align="center">
//             <Text strong>Sort by</Text>
//             <Form.Item noStyle>
//               <Select
//                 defaultValue={"asce"}
//                 allowClear
//                 options={[
//                   {
//                     label: "Ascending",
//                     value: "asce",
//                   },
//                   {
//                     label: "Descending",
//                     value: "desc",
//                   },
//                 ]}
//               />
//             </Form.Item>
//           </Space>
//         </div>
//         {/* <HistoryCard /> */}
//         {bookingList.map((trip) => (
//           <HistoryCard
//             key={trip.id}
//             id={trip.id}
//             pickup={trip.pickup}
//             destination={trip.destination}
//             fare={trip.fare}
//             date={trip.date}
//             status={trip.status}
//             distance={trip.distance}
//           />
//         ))}
//       </Col>
//       <Col span={8}>
//         <Title level={5}>Filter</Title>
//         {/* <Collapse defaultActiveKey={["1"]} ghost>
//           <Panel key="1" header={<Text strong>Payment Method</Text>}>
//             <Form>
//               <Form.Item>
//                 <Checkbox>Cash</Checkbox>
//               </Form.Item>
//               <Form.Item>
//                 <Checkbox>Credit Card</Checkbox>
//               </Form.Item>
//             </Form>
//           </Panel>
//         </Collapse>

//         <Divider /> */}

//         <Collapse defaultActiveKey={["2"]} ghost>
//           <Panel key="2" header={<Text strong>Trip Completion Status</Text>}>
//             <Form>
//               <Form.Item>
//                 <Checkbox>Completed</Checkbox>
//               </Form.Item>
//               <Form.Item>
//                 <Checkbox>Cancelled</Checkbox>
//               </Form.Item>
//             </Form>
//           </Panel>
//         </Collapse>
//       </Col>
//     </Row>
//   );
// };

// export default HistoryTab;
import {
  Checkbox,
  Col,
  Collapse,
  Form,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import stylesHistory from "./HistoryTab.module.scss";
import HistoryCard from "../HistoryCard/HistoryCard";
import { useState } from "react";

const { Title, Text } = Typography;
const { Panel } = Collapse;

export type BookingHistory = {
  id: string;
  pickup: string;
  destination: string;
  fare: number;
  date: string; // Date as a string in DD/MM/YYYY format
  status: string;
  distance: number;
};

// Sample data
const bookingList: BookingHistory[] = [
  {
    id: "1",
    pickup: "NTU",
    destination: "Changi Airport",
    fare: 39.5,
    date: "15/11/2024",
    status: "Cancelled",
    distance: 37.5,
  },
  {
    id: "2",
    pickup: "NTU",
    destination: "NUS",
    fare: 15.6,
    date: "12/11/2024",
    status: "Completed",
    distance: 14.1,
  },
  {
    id: "3",
    pickup: "NUS",
    destination: "Changi Airport",
    fare: 30.1,
    date: "13/11/2024",
    status: "Completed",
    distance: 27.6,
  },
];

const HistoryTab = () => {
  const [sortOrder, setSortOrder] = useState("asce");
  const [filterStatus, setFilterStatus] = useState<string[]>([]);

  // Function to sort bookings by date
  const sortedBookings = [...bookingList].sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return sortOrder === "asce" ? dateA - dateB : dateB - dateA;
  });

  // Function to filter by status
  const filteredBookings = sortedBookings.filter((trip) =>
    filterStatus.length > 0 ? filterStatus.includes(trip.status) : true
  );

  return (
    <Row gutter={[32, 8]}>
      <Col span={16}>
        {/* Sort by date */}
        <div className={stylesHistory.historySort}>
          <Space align="center">
            <Text strong>Sort by Date</Text>
            <Select
              defaultValue={sortOrder}
              onChange={(value) => setSortOrder(value)}
              options={[
                { label: "Ascending", value: "asce" },
                { label: "Descending", value: "desc" },
              ]}
            />
          </Space>
        </div>

        {/* Display filtered and sorted bookings */}
        {filteredBookings.map((trip) => (
          <HistoryCard
            key={trip.id}
            id={trip.id}
            pickup={trip.pickup}
            destination={trip.destination}
            fare={trip.fare}
            date={trip.date}
            status={trip.status}
            distance={trip.distance}
          />
        ))}
      </Col>

      <Col span={8}>
        <Title level={5}>Filter</Title>

        {/* Filter by status */}
        <Collapse defaultActiveKey={["2"]} ghost>
          <Panel key="2" header={<Text strong>Trip Completion Status</Text>}>
            <Form>
              <Form.Item>
                <Checkbox
                  checked={filterStatus.includes("Completed")}
                  onChange={(e) => {
                    setFilterStatus((prev) =>
                      e.target.checked
                        ? [...prev, "Completed"]
                        : prev.filter((status) => status !== "Completed")
                    );
                  }}
                >
                  Completed
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Checkbox
                  checked={filterStatus.includes("Cancelled")}
                  onChange={(e) => {
                    setFilterStatus((prev) =>
                      e.target.checked
                        ? [...prev, "Cancelled"]
                        : prev.filter((status) => status !== "Cancelled")
                    );
                  }}
                >
                  Cancelled
                </Checkbox>
              </Form.Item>
            </Form>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default HistoryTab;
